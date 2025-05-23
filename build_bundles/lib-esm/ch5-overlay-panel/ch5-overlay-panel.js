import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5OverlayPanel extends Ch5Common {
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5OverlayPanel.ELEMENT_NAME, Ch5OverlayPanel.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function") {
            window.customElements.define(Ch5OverlayPanel.ELEMENT_NAME, Ch5OverlayPanel);
        }
    }
    set dismissable(value) {
        this._ch5Properties.set("dismissable", value);
    }
    get dismissable() {
        return this._ch5Properties.get("dismissable");
    }
    set closable(value) {
        this._ch5Properties.set("closable", value, () => {
            this.updateForChangeInClosable();
        });
    }
    get closable() {
        return this._ch5Properties.get("closable");
    }
    set closeIcon(value) {
        const prevValue = this.closeIcon === "" ? this.primaryCssClass + '-default-close-icon' : this.closeIcon;
        this._ch5Properties.set("closeIcon", value, () => {
            this.handleCloseIcon(prevValue, value);
        });
    }
    get closeIcon() {
        return this._ch5Properties.get("closeIcon");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.updateForChangeInStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set overflow(value) {
        this._ch5Properties.set("overflow", value, () => {
            this.updateCssClasses();
        });
    }
    get overflow() {
        return this._ch5Properties.get("overflow");
    }
    set positionTo(value) {
        this._ch5Properties.set("positionTo", value, () => {
            this.updatePosition();
        });
    }
    get positionTo() {
        return this._ch5Properties.get("positionTo");
    }
    set positionOffset(value) {
        this._ch5Properties.set("positionOffset", value, () => {
            this.updatePosition();
        });
    }
    get positionOffset() {
        return this._ch5Properties.get("positionOffset");
    }
    set receiveStatePositionTo(value) {
        this._ch5Properties.set("receiveStatePositionTo", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("positionTo", newValue, () => {
                this.updatePosition();
            });
        });
    }
    get receiveStatePositionTo() {
        return this._ch5Properties.get('receiveStatePositionTo');
    }
    set receiveStatePositionOffset(value) {
        this._ch5Properties.set("receiveStatePositionOffset", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("positionOffset", newValue, () => {
                this.updatePosition();
            });
        });
    }
    get receiveStatePositionOffset() {
        return this._ch5Properties.get('receiveStatePositionOffset');
    }
    set sendEventOnBeforeShow(value) {
        this._ch5Properties.set("sendEventOnBeforeShow", value);
    }
    get sendEventOnBeforeShow() {
        return this._ch5Properties.get("sendEventOnBeforeShow");
    }
    set sendEventOnAfterShow(value) {
        this._ch5Properties.set("sendEventOnAfterShow", value);
    }
    get sendEventOnAfterShow() {
        return this._ch5Properties.get("sendEventOnAfterShow");
    }
    set sendEventOnBeforeHide(value) {
        this._ch5Properties.set("sendEventOnBeforeHide", value);
    }
    get sendEventOnBeforeHide() {
        return this._ch5Properties.get("sendEventOnBeforeHide");
    }
    set sendEventOnAfterHide(value) {
        this._ch5Properties.set("sendEventOnAfterHide", value);
    }
    get sendEventOnAfterHide() {
        return this._ch5Properties.get("sendEventOnAfterHide");
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-overlay-panel';
        this._elContainer = {};
        this._elContents = {};
        this._elCloseIcon = {};
        this._elCloseIconBtn = {};
        this._wasInstatiated = false;
        this._isShown = false;
        this.info('Ch5OverlayPanel.constructor()');
        if (!this._wasInstatiated) {
            this.createInternalHtml();
            this._rebindEventCallbacks();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5OverlayPanel.COMPONENT_PROPERTIES);
        this._showEvent = new CustomEvent('show', {
            bubbles: true,
            cancelable: false
        });
        this._hideEvent = new CustomEvent('hide', {
            bubbles: true,
            cancelable: false
        });
        this._beforeShowEvent = new CustomEvent('beforeShow', {
            bubbles: true,
            cancelable: false
        });
        this._afterShowEvent = new CustomEvent('afterShow', {
            bubbles: true,
            cancelable: false
        });
        this._beforeHideEvent = new CustomEvent('beforeHide', {
            bubbles: true,
            cancelable: false
        });
        this._afterHideEvent = new CustomEvent('afterHide', {
            bubbles: true,
            cancelable: false
        });
        this._ready = this._getReadyCheckPromise();
    }
    connectedCallback() {
        this.info('called connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5OverlayPanel);
        }
        if (!this.hasAttribute('show')) {
            this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, false, true);
        }
        this._ready.then(() => {
            this._initialize();
            this.initCommonMutationObserver(this);
        });
    }
    disconnectedCallback() {
        this.info('called disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
    }
    _initialize() {
        this.info('ch5-overlay-panel _initialize()');
        if (this._elContainer.parentElement !== this) {
            while (this.childNodes.length) {
                this._elContents.appendChild(this.childNodes[0]);
            }
            this.appendChild(this._elContainer);
        }
        this.cacheComponentChildrens();
        this.initAttributes();
        this.updateCssClasses();
        this.attachEventListeners();
    }
    generateListOfAllPossibleComponentCssClasses() {
        const cssClasses = [];
        cssClasses.push(this.primaryCssClass);
        Ch5OverlayPanel.POSITION_OFFSETS.forEach((posOffset) => {
            const newCssClass = this.primaryCssClass + '--pos-' + posOffset;
            cssClasses.push(newCssClass);
        });
        Ch5OverlayPanel.OVERFLOWS.forEach((overflow) => {
            cssClasses.push(this.primaryCssClass + '--overflow-' + overflow);
        });
        Ch5OverlayPanel.STRETCHES.forEach((stretch) => {
            if (stretch !== null) {
                cssClasses.push(this.primaryCssClass + '--stretch-' + stretch);
            }
        });
        return cssClasses;
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    createInternalHtml() {
        this.info('ch5-overlay-panel create internal Html');
        this._elContainer = document.createElement('div');
        this._elCloseIconBtn = document.createElement('button');
        this._elCloseIconBtn.setAttribute('type', 'button');
        this._elCloseIconBtn.classList.add(this.primaryCssClass + '-close-icon-btn');
        this._elCloseIconBtn.setAttribute('aria-label', 'Close');
        this._elCloseIcon = document.createElement('span');
        this._elCloseIcon.setAttribute('aria-hidden', 'true');
        this._elCloseIcon.classList.add(this.primaryCssClass + '-close-icon');
        this._elCloseIcon.classList.add(this.primaryCssClass + '-default-close-icon');
        this._elCloseIconBtn.appendChild(this._elCloseIcon);
        this._elContents = document.createElement('div');
        this._elContents.classList.add(this.primaryCssClass + '-contents');
        this._elContainer.classList.add(this.primaryCssClass);
        this._elContainer.setAttribute('data-ch5-id', this.getCrId());
        this._elContainer.appendChild(this._elContents);
    }
    updateCssClasses() {
        super.updateCssClasses();
        this.info('called updateCssClasses()');
        const setOfCssClassesToBeApplied = new Set();
        setOfCssClassesToBeApplied.add(this.primaryCssClass);
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--overflow-' + this.overflow);
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (typeof targetEl.classList !== 'undefined') {
            this.generateListOfAllPossibleComponentCssClasses().forEach((cssClass) => {
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
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5OverlayPanel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5OverlayPanel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5OverlayPanel.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5OverlayPanel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5OverlayPanel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5OverlayPanel.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5OverlayPanel.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        if (this._elCloseIconBtn) {
            this._elCloseIconBtn.addEventListener('click', this._clickedOnClose);
            window.addEventListener('keydown', this._handleKeyPress);
        }
        this.addEventListener('click', this._clickAndTouchEvent);
        this.addEventListener('touch', this._clickAndTouchEvent);
        this.addEventListener('show', this._onShow);
        this.addEventListener('hide', this._onHide);
        this.addEventListener('beforeShow', this._onBeforeShow);
        this.addEventListener('afterShow', this._onAfterShow);
        this.addEventListener('beforeHide', this._onBeforeHide);
        this.addEventListener('afterHide', this._onAfterHide);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elCloseIconBtn.removeEventListener('click', this._clickedOnClose);
        window.removeEventListener('keydown', this._handleKeyPress);
        this.removeEventListener('show', this._onShow);
        this.removeEventListener('hide', this._onHide);
        this.removeEventListener('beforeShow', this._onBeforeShow);
        this.removeEventListener('afterShow', this._onAfterShow);
        this.removeEventListener('beforeHide', this._onBeforeHide);
        this.removeEventListener('afterHide', this._onAfterHide);
    }
    _rebindEventCallbacks() {
        this._onShow = this._onShow.bind(this);
        this._onHide = this._onHide.bind(this);
        this._onBeforeShow = this._onBeforeShow.bind(this);
        this._onAfterShow = this._onAfterShow.bind(this);
        this._onBeforeHide = this._onBeforeHide.bind(this);
        this._onAfterHide = this._onAfterHide.bind(this);
        this._clickedOnClose = this._clickedOnClose.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._dismissElement = this._dismissElement.bind(this);
        this._clickAndTouchEvent = this._clickAndTouchEvent.bind(this);
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    _handleKeyPress(event) {
        if (this.getAttribute('show') !== 'false' && event.key === 'Escape') {
            this.info('_handleKeyPress()');
            this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, false, true);
        }
    }
    _clickedOnClose(inEvent) {
        this.info('_clickedOnClose()');
        this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, false, true);
    }
    _getReadyCheckPromise() {
        return Promise.all([
            customElements.whenDefined('ch5-button'),
            customElements.whenDefined('ch5-form'),
            customElements.whenDefined('ch5-image'),
            customElements.whenDefined('ch5-list'),
            customElements.whenDefined('ch5-modal-dialog'),
            customElements.whenDefined('ch5-overlay-panel'),
            customElements.whenDefined('ch5-select'),
            customElements.whenDefined('ch5-slider'),
            customElements.whenDefined('ch5-spinner'),
            customElements.whenDefined('ch5-textinput'),
            customElements.whenDefined('ch5-toggle'),
            customElements.whenDefined('ch5-triggerview'),
            customElements.whenDefined('ch5-triggerview-child'),
        ]);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-overlay-panel attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5OverlayPanel.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
        }
        this.logger.stop();
    }
    updateForChangeInStretch() {
        const parentEl = this.parentElement;
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (!parentEl) {
            this.info('updateForChangeInStretch() - parent element not found');
            return;
        }
        switch (this.stretch) {
            case 'width':
                targetEl.style.width = parentEl.offsetWidth + 'px';
                targetEl.style.height = "";
                break;
            case 'height':
                targetEl.style.height = parentEl.offsetHeight + 'px';
                targetEl.style.width = "";
                break;
            case 'both':
                targetEl.style.width = parentEl.offsetWidth + 'px';
                targetEl.style.height = parentEl.offsetHeight + 'px';
                break;
        }
    }
    updatePosition() {
        let refElementId = this.positionTo || '';
        if (refElementId === '') {
            this.info('updateForChangeInPositionTo() - incorrect reference id ');
            return;
        }
        if (refElementId.charAt(0) !== '#') {
            refElementId = '#' + refElementId;
        }
        const referenceElement = document.querySelector(refElementId);
        if (referenceElement && this.parentElement !== referenceElement.parentElement) {
            this._insertAfter(this, referenceElement);
        }
        const elementToReposition = this.getTargetElementForCssClassesAndStyle();
        if (!referenceElement) {
            this.info('updateForChangeInPositionTo() - reference element not found for id ' + refElementId);
            return;
        }
        switch (this.positionOffset) {
            case 'top-left':
                elementToReposition.style.top = (referenceElement.offsetTop - elementToReposition.offsetHeight) + 'px';
                elementToReposition.style.left = referenceElement.offsetLeft + 'px';
                break;
            case 'top-center':
                elementToReposition.style.top = (referenceElement.offsetTop - elementToReposition.offsetHeight) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft
                    + Math.floor(referenceElement.offsetWidth / 2)
                    - Math.floor(elementToReposition.offsetWidth / 2)) + 'px';
                break;
            case 'top-right':
                elementToReposition.style.top = (referenceElement.offsetTop - elementToReposition.offsetHeight) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft
                    + referenceElement.offsetWidth
                    - elementToReposition.offsetWidth) + 'px';
                break;
            case 'bottom-left':
                elementToReposition.style.top = (referenceElement.offsetTop + referenceElement.offsetHeight) + 'px';
                elementToReposition.style.left = referenceElement.offsetLeft + 'px';
                break;
            case 'bottom-center':
                elementToReposition.style.top = (referenceElement.offsetTop + referenceElement.offsetHeight) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft
                    + Math.floor(referenceElement.offsetWidth / 2)
                    - Math.floor(elementToReposition.offsetWidth / 2)) + 'px';
                break;
            case 'bottom-right':
                elementToReposition.style.top = (referenceElement.offsetTop + referenceElement.offsetHeight) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft
                    + referenceElement.offsetWidth
                    - elementToReposition.offsetWidth) + 'px';
                break;
            case 'left-center':
                elementToReposition.style.top = (referenceElement.offsetTop
                    - Math.floor(elementToReposition.offsetHeight / 2)
                    + Math.floor(referenceElement.offsetHeight / 2)) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft - elementToReposition.offsetWidth) + 'px';
                break;
            case 'right-center':
                elementToReposition.style.top = (referenceElement.offsetTop
                    - Math.floor(elementToReposition.offsetHeight / 2)
                    + Math.floor(referenceElement.offsetHeight / 2)) + 'px';
                elementToReposition.style.left = (referenceElement.offsetLeft + referenceElement.offsetWidth) + 'px';
                break;
        }
    }
    handleCloseIcon(prevValue, value) {
        if (typeof this._elCloseIcon.classList === "undefined") {
            return;
        }
        if (prevValue !== value) {
            if ('' !== prevValue) {
                prevValue.split(' ').forEach((className) => {
                    className = className.trim();
                    if ('' !== className) {
                        this._elCloseIcon.classList.remove(className);
                    }
                });
            }
            if ('' !== value) {
                value.split(' ').forEach((className) => {
                    className = className.trim();
                    if ('' !== className) {
                        this._elCloseIcon.classList.add(className);
                    }
                });
            }
        }
    }
    _dismissElement(inEvent) {
        this.info('_dismissElement()');
        if (false === this.dismissable) {
            this.info('_dismissElement() return ( dismissable is false)');
            return;
        }
        if (false === this._isShown) {
            this.info('_dismissElement() return ( _isShown is false)');
            return;
        }
        this.info('_dismissElement() inEvent', inEvent);
        this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, false, true);
    }
    _clickAndTouchEvent(event) {
        event.stopPropagation();
    }
    updateForChangeInClosable() {
        if (true === this.closable) {
            this._elContainer.insertBefore(this._elCloseIconBtn, this._elContents);
        }
        else {
            this._elCloseIconBtn.remove();
        }
    }
    beforeHandlingShow() {
        this.info('beforeHandlingShow()');
        this.dispatchEvent(this._beforeShowEvent);
        this.dispatchEvent(this._showEvent);
        this._sendPulse(this.sendEventOnBeforeShow);
        return;
    }
    afterHandlingShow() {
        this.info('afterHandlingShow()');
        this.dispatchEvent(this._afterShowEvent);
        this._sendPulse(this.sendEventOnAfterShow);
        this.updatePosition();
        this._isShown = true;
        setTimeout(() => {
            document.addEventListener("click", this._dismissElement);
        }, 250);
    }
    beforeHandlingHide() {
        this.info('beforeHandlingHide()');
        this.dispatchEvent(this._beforeHideEvent);
        this._sendPulse(this.sendEventOnBeforeHide);
        document.removeEventListener("click", this._dismissElement);
    }
    afterHandlingHide() {
        this.info('afterHandlingHide()');
        this.dispatchEvent(this._hideEvent);
        this.dispatchEvent(this._afterHideEvent);
        this._sendPulse(this.sendEventOnAfterHide);
        this._isShown = false;
        return;
    }
    _onShow(inEvent) {
        this.info('_onShow()');
    }
    _onHide(inEvent) {
        this.info('_onHide()');
        this._onAfterHide(inEvent);
    }
    _onBeforeShow(inEvent) {
        this.info('_onBeforeShow()');
    }
    _onAfterShow(inEvent) {
        this.info('_onAfterShow()');
    }
    _onBeforeHide(inEvent) {
        this.info('_onBeforeHide()');
    }
    _onAfterHide(inEvent) {
        this.info('_onAfterHide()');
    }
    _sendPulse(sigName) {
        let sigToSend = null;
        if ('' !== sigName
            && 'undefined' !== typeof sigName
            && null !== sigName) {
            sigToSend = Ch5SignalFactory.getInstance().getBooleanSignal(sigName);
            if (null !== sigToSend) {
                sigToSend.publish(true);
                sigToSend.publish(false);
            }
        }
    }
    _insertAfter(el, referenceNode) {
        if (null !== referenceNode && null !== referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
    }
}
Ch5OverlayPanel.ELEMENT_NAME = 'ch5-overlay-panel';
Ch5OverlayPanel.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatepositionto: { direction: "state", stringJoin: 1, contractName: true }, receivestatepositionoffset: { direction: "state", stringJoin: 1, contractName: true }, sendsignalonshow: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonhide: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonbeforeshow: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonaftershow: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonbeforehide: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonafterhide: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5OverlayPanel.POSITION_OFFSETS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'left-center', 'right-center'];
Ch5OverlayPanel.STRETCHES = ['both', 'width', 'height'];
Ch5OverlayPanel.OVERFLOWS = ['scroll', 'show'];
Ch5OverlayPanel.COMPONENT_DATA = {
    POSITION_OFFSETS: {
        default: Ch5OverlayPanel.POSITION_OFFSETS[0],
        values: Ch5OverlayPanel.POSITION_OFFSETS,
        key: 'position_offset',
        classListPrefix: '--pos-'
    },
    STRETCH: {
        default: Ch5OverlayPanel.STRETCHES[0],
        values: Ch5OverlayPanel.STRETCHES,
        key: 'stretch',
        classListPrefix: '--stretch-'
    },
    OVERFLOWS: {
        default: Ch5OverlayPanel.OVERFLOWS[0],
        values: Ch5OverlayPanel.OVERFLOWS,
        key: 'overflow',
        classListPrefix: '--overflow-'
    }
};
Ch5OverlayPanel.COMPONENT_PROPERTIES = [
    {
        default: true,
        name: "dismissable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "closable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        name: "closeIcon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5OverlayPanel.STRETCHES,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: Ch5OverlayPanel.OVERFLOWS[0],
        enumeratedValues: Ch5OverlayPanel.OVERFLOWS,
        name: "overflow",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5OverlayPanel.OVERFLOWS[0],
        isObservableProperty: true
    },
    {
        default: "",
        name: "positionTo",
        nameForSignal: "receiveStatePositionTo",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5OverlayPanel.POSITION_OFFSETS[0],
        enumeratedValues: Ch5OverlayPanel.POSITION_OFFSETS,
        name: "positionOffset",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStatePositionOffset",
        type: "enum",
        valueOnAttributeEmpty: Ch5OverlayPanel.POSITION_OFFSETS[0],
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBeforeShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnHide",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBeforeShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnAfterShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBeforeHide",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnAfterHide",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStatePositionTo",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStatePositionOffset",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    }
];
Ch5OverlayPanel.registerCustomElement();
Ch5OverlayPanel.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LW92ZXJsYXktcGFuZWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtb3ZlcmxheS1wYW5lbC9jaDUtb3ZlcmxheS1wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFhLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUQsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBRW5JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBaVB0QyxNQUFNLENBQUMsNEJBQTRCO1FBQ3pDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFTSxNQUFNLENBQUMscUJBQXFCO1FBQ2xDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUMxQixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQzVFO0lBQ0YsQ0FBQztJQUlELElBQVcsV0FBVyxDQUFDLEtBQWM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxJQUFXLFdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxhQUFh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