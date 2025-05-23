import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import _ from "lodash";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
const _parentTriggerViewNodeName = 'CH5-TRIGGERVIEW';
export class Ch5TriggerViewChild extends Ch5Common {
    get selected() {
        this.info('Ch5TriggerViewChild get selected()');
        return this.hasAttribute('selected');
    }
    set selected(value) {
        this.info('Ch5TriggerViewChild set selected()');
        value = Boolean(value);
        if (value) {
            this.setAttribute('selected', '');
            this.setAttribute('aria-selected', 'true');
        }
        else {
            this.removeAttribute('selected');
            this.setAttribute('aria-selected', 'false');
        }
    }
    get sendEventOnShow() {
        return this._sendEventOnShowSigName;
    }
    set sendEventOnShow(value) {
        this.info('set sendEventOnShow(\'' + value + '\')');
        if ('' === value) {
            return;
        }
        if (this._sendEventOnShowSigName !== value) {
            this._sendEventOnShowSigName = value;
            this.setAttribute('sendeventonshow', value);
        }
    }
    get receiveStateShow() {
        return this._attributeValueAsString('receivestateshow');
    }
    set receiveStateShow(value) {
        this.info('set receiveStateShow(\'' + value + '\')');
        if ('' === value
            || this._receiveStateShowSigName === value
            || null === value
            || undefined === value) {
            return;
        }
        if (this._receiveStateShowSigName !== ''
            && this._receiveStateShowSigName !== undefined
            && this._receiveStateShowSigName !== null) {
            const oldSignalName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowSigName);
            const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldSignalName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveSignalShowId);
            }
        }
        this._receiveStateShowSigName = value;
        this.setAttribute('receivestateshow', value);
        const receiveStateName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowSigName);
        const receiveState = Ch5SignalFactory.getInstance().getBooleanSignal(receiveStateName);
        if (receiveState === null) {
            return;
        }
        let hasSignalChanged = false;
        this._subReceiveSignalShowId = receiveState.subscribe((newValue) => {
            if (newValue && newValue === true && receiveState.hasChangedSinceInit()) {
                const parentElement = this.getTriggerViewParent();
                if (parentElement !== null) {
                    parentElement.setActiveViewChild(this);
                    hasSignalChanged = true;
                }
            }
            if (newValue !== this.show && hasSignalChanged) {
                this.show = newValue;
            }
        });
    }
    set sigNameReceiveShow(value) {
        return;
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-viewchild';
        this._noshowType = Ch5TriggerViewChild.SHOW_TYPES[0];
        this._sendEventOnShowSigName = '';
        this._receiveStateShowSigName = '';
        this._subReceiveSignalShowId = '';
        this.info('Ch5TriggerViewChild.constructor()');
        this._listOfAllPossibleComponentCssClasses = this._generateListOfAllPossibleComponentCssClasses();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5TriggerViewChildAttributes = [
            'selected',
            'sendeventonshow',
            'receivestateshow'
        ];
        return commonAttributes.concat(ch5TriggerViewChildAttributes);
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5TriggerViewChild.ELEMENT_NAME, Ch5TriggerViewChild.SIGNAL_ATTRIBUTE_TYPES);
    }
    connectedCallback() {
        this.info('Ch5TriggerViewChild.connectedCallback()');
        this.cacheComponentChildrens();
        this.setAttribute('noshowtype', Ch5TriggerViewChild.SHOW_TYPES[0]);
        this.updateCssClasses();
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5TriggerViewChild);
        this.setAttribute('data-ch5-id', this.getCrId());
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = -1;
        }
        this.initAttributes();
        this.initCommonMutationObserver(this);
    }
    disconnectedCallback() {
        this.info('Ch5TriggerViewChild.disconnectedCallback()');
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('Ch5TriggerViewChild.attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
        switch (attr) {
            case 'selected':
                if (this.hasAttribute('selected')) {
                    this.setAttribute('aria-selected', 'true');
                    this._sendSignalValueOnShow();
                }
                else {
                    this.setAttribute('aria-selected', 'false');
                }
                break;
            case 'sendeventonshow':
                if (this.hasAttribute('sendeventonshow')) {
                    this.sendEventOnShow = newValue;
                }
                else {
                    this.sendEventOnShow = '';
                }
                break;
            case 'receivestateshow':
                if (this.hasAttribute('receivestateshow')) {
                    this.receiveStateShow = newValue;
                }
                else {
                    this.receiveStateShow = '';
                }
                break;
            case 'noshowtype':
                this.noshowType = Ch5TriggerViewChild.SHOW_TYPES[0];
                break;
            case 'show':
                if (this.hasAttribute('show')) {
                    const tmpShow = this.getAttribute('show');
                    if ('false' === tmpShow || '0' === tmpShow) {
                        this.show = false;
                    }
                    else {
                        this.show = true;
                    }
                }
                else {
                    this.show = true;
                }
                this.noshowType = Ch5TriggerViewChild.SHOW_TYPES[0];
                this.updateForChangeInShowStatusOld();
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        const csf = Ch5SignalFactory.getInstance();
        if ('' !== this._subReceiveSignalShowId && '' !== this._receiveStateShowSigName) {
            const sigSelectedName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowSigName);
            const sigSelected = csf.getNumberSignal(sigSelectedName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveSignalShowId);
                this._receiveStateShowSigName = '';
            }
        }
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    getTriggerViewParent() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName !== _parentTriggerViewNodeName) {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        if (!_.isNil(this.parentElement)) {
            return getTheMatchingParent(this.parentElement);
        }
        return null;
    }
    initAttributes() {
        super.initAttributes();
        this._upgradeProperty('sendEventOnShow');
        this._upgradeProperty('receiveStateShow');
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
    attachEventListeners() {
        super.attachEventListeners();
    }
    removeEvents() {
        super.removeEventListeners();
    }
    _generateListOfAllPossibleComponentCssClasses() {
        const cssClasses = this._listOfAllPossibleComponentCssClasses;
        cssClasses.push(this.primaryCssClass);
        return cssClasses;
    }
    _sendSignalValueOnShow() {
        this.info('Ch5TriggerViewChild._sendSignalValueOnShow()');
        let sigShow = null;
        if ('' !== this._sendEventOnShowSigName
            && undefined !== this._sendEventOnShowSigName
            && null !== this._sendEventOnShowSigName) {
            sigShow = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this._sendEventOnShowSigName);
            if (sigShow !== null) {
                sigShow.publish(true);
                sigShow.publish(false);
            }
        }
    }
    _upgradeProperty(prop) {
        if (this.constructor.prototype.hasOwnProperty(prop)) {
            const val = this[prop];
            delete this[prop];
            this[prop] = val;
        }
    }
}
Ch5TriggerViewChild.ELEMENT_NAME = 'ch5-triggerview-child';
Ch5TriggerViewChild.SHOW_TYPES = ['visibility'];
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5TriggerViewChild.ELEMENT_NAME, Ch5TriggerViewChild);
}
Ch5TriggerViewChild.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyaWdnZXJ2aWV3LWNoaWxkLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRyaWdnZXJ2aWV3L2NoNS10cmlnZ2Vydmlldy1jaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxRCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFekYsTUFBTSwwQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQztBQUVyRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBUztJQUdqRCxJQUFJLFFBQVE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUVoRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFDSTtZQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUM7SUFDRixDQUFDO0lBVUQs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