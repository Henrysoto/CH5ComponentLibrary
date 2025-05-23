import { intSetter, intGetter } from './utils';
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Signal, Ch5SignalFactory, subscribeInViewPortChange } from "../ch5-core";
import { Ch5TriggerViewSlidesManager } from "./ch5-triggerview-slides-manager";
import { isNil } from 'lodash';
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Properties } from "../ch5-core/ch5-properties";
const SPEED_BETWEEN_PAGES = 300;
const triggerViewHtml = `
  <slot id="slidesSlot">
    <p class="slidesFallback">No content available</p>
  </slot>
  <div id="aria-live">
    <slot id="ariaSlot" name="ariaSlot"></slot>
  </div>`;
const triggerViewStyles = `
/*******************************************************************************
 Host and CSS properties
*******************************************************************************/

:host {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    contain: content;

    -webkit-tap-highlight-color: rgba(0,0,0,0);

    --ch5-triggerview-gap: 16px;

    --ch5-triggerview-background-color: transparent;

    --ch5-triggerview-slide-min-height: 0px;
    --ch5-triggerview-slide-max-height: none;

    --ch5-triggerview-transition-duration: 0.6s;
    --ch5-triggerview-transition-timing-function: ease-in-out;

    --ch5-triggerview-fallback-message-color-background: #fff;

    --ch5-triggerview__internal__slides-per-view: 1;
    
    overflow: hidden;
}

:host([hidden]) {
    display: none
}

/*******************************************************************************
Slides wrapper: flexbox container, is the transitioning element when moving the slides.
*******************************************************************************/
#slidesWrapper {
    display: flex;
    align-items: stretch;

    height: 100%;
    min-height: var(--ch5-triggerview-slide-min-height);
    max-height: var(--ch5-triggerview-slide-max-height);

    will-change: transform;
}

:host([transitioning]) #slidesWrapper {
    transition-property: transform;
    transition-duration: var(--ch5-triggerview-transition-duration);
    transition-timing-function: var(--ch5-triggerview-transition-timing-function);
}

/*******************************************************************************
Slides: width is calculated with a css formula
*******************************************************************************/
#slidesWrapper ::slotted(*) {
    flex-grow: 0;
    flex-shrink: 0;
    /* (100% - gap * (slidesPerView - 1)) / slidesPerView */
    flex-basis: calc((100% - (var(--ch5-triggerview__internal__slides-per-view) - 1) *
        var(--ch5-triggerview-gap)) / var(--ch5-triggerview__internal__slides-per-view));

    min-height: var(--ch5-triggerview-slide-min-height);
    max-height: var(--ch5-triggerview-slide-max-height);

    margin-right: var(--ch5-triggerview-gap);

    /*
        * Enforces the slides to keep their size even if the content requires
        * a bigger slide size.
        */
    overflow: hidden;

    outline: 0;

    user-select: auto;
}

.slidesFallback {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: .5em 1em;

    width: 100%;

    background-color: var(--ch5-triggerview-fallback-message-color-background);
}

:host([gestureable=true]) #slidesWrapper ::slotted(*) {
    user-select: none;
}

/*******************************************************************************
  aria-live styles
*******************************************************************************/
#aria-live ::slotted(*) {
    position: absolute;
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    clip: rect(0 0 0 0);
    overflow: hidden;
    border: 0;
}

/*******************************************************************************
 * Print styles:
 * - Show all slides and stack them vertically
 * - Eliminate the slide gap, show an outline
 * - make sure the page doesn't break a slide in half
 *******************************************************************************/

@media print {
    #slidesWrapper ::slotted(*) {
        margin-right: 0;
        margin-bottom: .2em;
        outline: 1px solid #000;
        color: #000;
        page-break-inside: avoid;
    }

    /* Stack the slides */
    #slidesWrapper {
        display: block;
        transform: none !important;
        transition: 0s;
    }
}
`;
const template = document.createElement('template');
template.innerHTML = `<style>${triggerViewStyles}</style> ${triggerViewHtml}`;
export class Ch5TriggerView extends Ch5Common {
    constructor() {
        super();
        this.primaryCssClass = 'ch5-triggerview';
        this._activeViewCallback = {};
        this._swipeThreshold = 30.0;
        this._activeView = 0;
        this._ariaLiveRegion = {};
        this._sendEventShowChildIndexSigName = '';
        this._receiveStateShowChildIndexSigName = '';
        this._subReceiveStateShowChildIndexId = '';
        this._signalIsReceived = false;
        this.slidesManager = {};
        this.flag = -1;
        this.slidesNumber = 0;
        this.info('Ch5TriggerView.constructor()');
        this._listOfAllPossibleComponentCssClasses = this.generateListOfAllPossibleComponentCssClasses();
        this._ch5Properties = new Ch5Properties(this, Ch5TriggerView.COMPONENT_PROPERTIES);
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._slidesSlot = this.shadowRoot.querySelector('#slidesSlot');
        this._ariaSlot = this.shadowRoot.querySelector('#ariaSlot');
        this.slidesManager = new Ch5TriggerViewSlidesManager(this);
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5TriggerView.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TriggerView.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5TriggerView.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        const ch5TriggerViewAttributes = [
            'activeview',
            'sendeventshowchildindex',
            'receivestateshowchildindex',
        ];
        return commonAttributes.concat(ch5TriggerViewAttributes.concat(newObsAttrs));
    }
    set endless(value) {
        this._ch5Properties.set("endless", value, () => {
            const swiperLoop = this.slidesManager.getSwiperParam('loop');
            if (typeof swiperLoop === 'boolean' && swiperLoop !== this.endless) {
                this.slidesManager.reinitializeSwiper();
            }
        });
    }
    get endless() {
        return this._ch5Properties.get("endless");
    }
    set gestureable(value) {
        this._ch5Properties.set("gestureable", value, () => {
            if (this.disableAnimation) {
                this.slidesManager.reinitializeSwiper();
            }
            else {
                this.slidesManager.setAllowTouchMove(this.gestureable);
                this.slidesManager.refreshSlideSpeed();
            }
        });
    }
    get gestureable() {
        return this._ch5Properties.get("gestureable");
    }
    set nested(value) {
        this._ch5Properties.set("nested", value, () => {
            this.slidesManager.reinitializeSwiper();
        });
    }
    get nested() {
        return this._ch5Properties.get("nested");
    }
    set disableAnimation(value) {
        this._ch5Properties.set("disableAnimation", value, () => {
            const swiperFollowFinger = this.slidesManager.getSwiperParam('followFinger');
            if (typeof swiperFollowFinger === 'boolean' && !swiperFollowFinger !== this.disableAnimation) {
                this.slidesManager.reinitializeSwiper();
            }
        });
    }
    get disableAnimation() {
        return this._ch5Properties.get("disableAnimation");
    }
    set activeViewCallback(callback) {
        if (!(callback instanceof Function)) {
            return;
        }
        this._activeViewCallback = callback;
    }
    get activeViewCallback() {
        return this._activeViewCallback;
    }
    set activeView(index) {
        index = Number(index);
        if (isNaN(index)) {
            index = 0;
        }
        if (this.slidesManager.swiperIsActive()) {
            const speed = this.computeTransitionByDistance(index);
            this.slidesManager.swipeTo(this.activeView, this.disableAnimation, speed);
        }
        else if (this.slidesManager.ch5SwiperIsActive()) {
            this.slidesManager.swipeTo(this.activeView, false, 0);
        }
        this.dispatchEvent(new CustomEvent('select', {
            detail: index,
            bubbles: false,
        }));
        if (this._sendEventShowChildIndexSigName !== this._receiveStateShowChildIndexSigName) {
            let sigSelect = null;
            if ('' !== this._sendEventShowChildIndexSigName
                && undefined !== this._sendEventShowChildIndexSigName
                && null !== this._sendEventShowChildIndexSigName) {
                sigSelect = Ch5SignalFactory.getInstance().getNumberSignal(this._sendEventShowChildIndexSigName);
                if (sigSelect !== null) {
                    sigSelect.publish(this.activeView);
                }
            }
        }
        this._updateAriaLiveDom();
        if (this.activeViewCallback instanceof Function) {
            this.activeViewCallback();
        }
        if (this.slidesManager.swiperActiveViewInitialized() === true || this.slidesManager.ch5SwiperIsActive()) {
            intSetter(this, 'activeview', index);
            this._activeView = index;
        }
        else {
            intSetter(this, 'activeview', this.activeView);
            this._activeView = this.activeView;
        }
    }
    get activeView() {
        return intGetter(this, 'activeview', 0);
    }
    get getSwiperSensitivity() {
        return this.swipeThreshold;
    }
    get sendEventShowChildIndex() {
        return this._sendEventShowChildIndexSigName;
    }
    set sendEventShowChildIndex(value) {
        this.info('set _sendEventShowChildIndexSigName(\'' + value + '\')');
        if ('' === value) {
            return;
        }
        if (this._sendEventShowChildIndexSigName !== value) {
            this._sendEventShowChildIndexSigName = value;
            this.setAttribute('sendeventshowchildindex', value);
        }
    }
    get receiveStateShowChildIndex() {
        return this._attributeValueAsString('receivestateshowchildindex');
    }
    set receiveStateShowChildIndex(value) {
        this.info('set receiveStateShowChildIndex(\'' + value + '\')');
        if ('' === value
            || this._receiveStateShowChildIndexSigName === value
            || null === value
            || undefined === value) {
            return;
        }
        if (this._receiveStateShowChildIndexSigName !== ''
            && this._receiveStateShowChildIndexSigName !== undefined
            && this._receiveStateShowChildIndexSigName !== null) {
            const oldStateName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowChildIndexSigName);
            const oldState = Ch5SignalFactory.getInstance().getNumberSignal(oldStateName);
            if (oldState !== null) {
                oldState.unsubscribe(this._subReceiveStateShowChildIndexId);
            }
        }
        this._receiveStateShowChildIndexSigName = value;
        this.setAttribute('receivestateshowchildindex', value);
        const receiveStateName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowChildIndexSigName);
        const receiveState = Ch5SignalFactory.getInstance().getNumberSignal(receiveStateName);
        if (receiveState === null) {
            return;
        }
        this._subReceiveStateShowChildIndexId = receiveState.subscribe((newValue) => {
            if (!isNaN(newValue) && receiveState.hasChangedSinceInit()) {
                this._signalIsReceived = true;
                setTimeout(() => {
                    this.activeView = newValue;
                }, 50);
            }
            else {
                this.info('Ch5TriggerView receiveStateShowChildIndex signal value for ' + this.getAttribute('data-ch5-id') + ' is invalid');
            }
        });
    }
    set swipeThreshold(sensitivity) {
        if (isNil(sensitivity) || isNaN(sensitivity)) {
            return;
        }
        this._swipeThreshold = sensitivity;
    }
    get swipeThreshold() {
        return this._swipeThreshold;
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5TriggerView.ELEMENT_NAME, Ch5TriggerView.SIGNAL_ATTRIBUTE_TYPES);
    }
    connectedCallback() {
        const setup = () => {
            this.info('Ch5TriggerView.connectedCallback()');
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', Ch5RoleAttributeMapping.ch5TriggerView);
            }
            this.cacheComponentChildrens();
            this.initAttributes();
            this.updateCssClasses();
            this.attachEventListeners();
            this._onSlidesSlotChange();
            this.id = this.getCrId();
            this.slidesManager.prepareSwiperSlides();
            this.slidesManager.initSwiper();
        };
        if (!this.closest('ch5-modal-dialog')) {
            setTimeout(setup);
            return;
        }
        subscribeInViewPortChange(this, () => {
            this.info('ch5-triggerview.subscribeInViewPortChange()');
            if (this.elementIsInViewPort && !this.wasInstantiatedInViewport) {
                this._updateSizeStyleProperties();
                setup();
                this.wasInstantiatedInViewport = true;
            }
        });
    }
    disconnectedCallback() {
        this.info('Ch5TriggerView.disconnectedCallback()');
        this.removeEvents();
        this.unsubscribeFromSignals();
        this.slidesManager.destroySwiper();
    }
    handleEvent(e) {
        if (e.type === 'slotchange' && e.target === this._slidesSlot) {
            this._onSlidesSlotChange();
        }
    }
    previousViewChild() {
        this.slidesManager.slidePrevious();
    }
    nextViewChild() {
        this.slidesManager.slideNext();
    }
    setActiveViewChild(childView) {
        const slideIndex = this.slidesManager.getChildElSwipeIndex(childView);
        if (slideIndex !== null) {
            this.activeView = slideIndex;
        }
    }
    setActiveView(index) {
        this.activeView = index;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('Ch5TriggerView attributeChangedCallback("' + name + '","' + oldValue + '","' + newValue + ')"');
        if (this.slidesManager.getSlidesNumber() === 0) {
            this._onSlidesSlotChange();
        }
        const attributeChangedProperty = Ch5TriggerView.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === name.toLowerCase() && property.isObservableProperty === true; });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        else {
            switch (name) {
                case 'activeview':
                    if (oldValue !== newValue) {
                        const parsedNewValue = parseInt(newValue, 10);
                        if (this.slidesManager.getSlidesNumber() >= 0 &&
                            (parsedNewValue > this.slidesManager.getSlidesNumber() || parsedNewValue < 0)) {
                            this.activeView = 0;
                            return;
                        }
                        this.activeView = parsedNewValue;
                    }
                    break;
                case 'sendeventshowchildindex':
                    if (this.hasAttribute('sendeventshowchildindex')) {
                        this.sendEventShowChildIndex = newValue;
                    }
                    else {
                        this.sendEventShowChildIndex = '';
                    }
                    break;
                case 'receivestateshowchildindex':
                    if (this.hasAttribute('receivestateshowchildindex')) {
                        this.receiveStateShowChildIndex = newValue;
                    }
                    else {
                        this.receiveStateShowChildIndex = '';
                    }
                    break;
                default:
                    super.attributeChangedCallback(name, oldValue, newValue);
                    break;
            }
        }
        if (name === 'dir') {
            this.style.setProperty('direction', 'ltr');
            this._updateChildrenDirAttr();
        }
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this.info('Ch5TriggerView.unsubscribeFromSignals()');
        const csf = Ch5SignalFactory.getInstance();
        if ('' !== this._subReceiveStateShowChildIndexId && '' !== this._receiveStateShowChildIndexSigName) {
            const sigSelected = csf.getNumberSignal(this._receiveStateShowChildIndexSigName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveStateShowChildIndexId);
                this._receiveStateShowChildIndexSigName = '';
            }
        }
    }
    getSlidesAsArray() {
        return Array.prototype.slice.call(this.slidesManager.getSlidesArray(), 0);
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    getPlainActiveView() {
        return this._activeView;
    }
    setSwiperSensitivity(sensitivity) {
        this.slidesManager.swiperSensitivity = sensitivity;
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5TriggerView.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TriggerView.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5TriggerView.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5TriggerView.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        if (!this.hasAttribute('activeView')) {
            this.setAttribute('activeView', '0');
        }
        if (this.hasAttribute('receiveStateShowChildIndex')) {
            this._upgradeProperty('receiveStateShowChildIndex');
        }
        if (this.hasAttribute('sendEventShowChildIndex')) {
            this._upgradeProperty('sendEventShowChildIndex');
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._slidesSlot.addEventListener('slotchange', this);
    }
    removeEvents() {
        super.removeEventListeners();
        this._slidesSlot.removeEventListener('slotchange', this);
    }
    _updateSizeStyleProperties() {
        this.style.width = `${this.offsetWidth}px`;
    }
    updateCssClasses() {
        super.updateCssClasses();
        const setOfCssClassesToBeApplied = new Set();
        setOfCssClassesToBeApplied.add(this.primaryCssClass);
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (typeof targetEl.classList !== 'undefined') {
            this._listOfAllPossibleComponentCssClasses.forEach((cssClass) => {
                if (setOfCssClassesToBeApplied.has(cssClass)) {
                    targetEl.classList.add(cssClass);
                    this.info('add CSS class', cssClass);
                }
                else {
                    targetEl.classList.remove(cssClass);
                    this.info('remove CSS class', cssClass);
                }
            });
        }
    }
    generateListOfAllPossibleComponentCssClasses() {
        const cssClasses = this._listOfAllPossibleComponentCssClasses;
        cssClasses.push(this.primaryCssClass);
        return cssClasses;
    }
    computeTransitionByDistance(viewToLoad) {
        const pageGap = Math.abs(this._activeView - viewToLoad);
        return SPEED_BETWEEN_PAGES * pageGap;
    }
    _onSlidesSlotChange() {
        this._slidesSlot.assignedNodes({ flatten: true }).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    }
    _updateAriaLiveDom() {
        if (this._ariaSlot.assignedNodes().length !== 1) {
            this._ariaLiveRegion = document.createElement('div');
            this._ariaLiveRegion.setAttribute('slot', 'ariaSlot');
            this._ariaLiveRegion.setAttribute('aria-live', 'polite');
            this._ariaLiveRegion.setAttribute('aria-atomic', 'true');
            this.appendChild(this._ariaLiveRegion);
        }
        this._ariaLiveRegion.textContent =
            `Item ${this.activeView} of ${this.slidesManager.getSlidesNumber()} visible`;
    }
    _updateChildrenDirAttr() {
        customElements.whenDefined('ch5-triggerview-child').then(() => {
        });
    }
    _upgradeProperty(prop) {
        if (this.constructor.prototype.hasOwnProperty(prop)) {
            const val = this[prop];
            delete this[prop];
            this[prop] = val;
        }
    }
}
Ch5TriggerView.ELEMENT_NAME = 'ch5-triggerview';
Ch5TriggerView.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateshowchildindex: { direction: "state", numericJoin: 1, contractName: true }, sendeventshowchildindex: { direction: "event", numericJoin: 1, contractName: true } });
Ch5TriggerView.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "endless",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "gestureable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "nested",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "disableAnimation",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
];
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5TriggerView.ELEMENT_NAME, Ch5TriggerView);
}
Ch5TriggerView.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyaWdnZXJ2aWV3LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRyaWdnZXJ2aWV3L2NoNS10cmlnZ2Vydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVyRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQy9CLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTVELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLM0QsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUM7QUFFaEMsTUFBTSxlQUFlLEdBQUc7Ozs7OztTQU1mLENBQUM7QUFFVixNQUFNLGlCQUFpQixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlJekIsQ0FBQztBQUtGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLGlCQUFpQixZQUFZLGVBQWUsRUFBRSxDQUFDO0FBRTlFLE1BQU0sT0FBTyxjQUFlLFNBQVEsU0FBUztJQWtE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