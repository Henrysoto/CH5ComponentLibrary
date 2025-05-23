import "hammerjs";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { Ch5Select } from "../ch5-select/ch5-select";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5SelectOption extends Ch5Common {
    constructor() {
        super();
        this._idx = -1;
        this.receiveStateSelectedSubscription = '';
        this._iconPosition = Ch5SelectOption.ICON_POSITION_VALUES[0];
        this._useDefaultTmpl = false;
        this._receiveStateSelected = null;
        this._receiveStateLabel = null;
        this._receiveStateLabelSubscription = '';
        this._optLabel = '';
        this._receiveStateUrl = null;
        this._receiveStateScriptLabelHTML = null;
        this._sendEventOnClick = null;
        this._parentCh5Select = null;
        this._optionHammer = null;
        this._ch5Toggle = null;
        this._onClick = this._onClick.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onPressUp = this._onPressUp.bind(this);
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5SelectOptionAttributes = ['iconposition', 'receivestateselected', 'receivestatelabel',
            'receivestateurl', 'receivestatescriptlabelhtml', 'sendeventonclick', 'data-ch5-opt-idx'];
        return commonAttributes.concat(ch5SelectOptionAttributes);
    }
    get iconPosition() {
        return this._iconPosition;
    }
    set iconPosition(value) {
        value = this._checkAndSetStringValue(value);
        if (this._iconPosition !== value) {
            this._iconPosition = value;
            this.setAttribute('iconposition', value);
        }
    }
    get useDefaultTmpl() {
        return this._useDefaultTmpl;
    }
    set useDefaultTmpl(value) {
        value = this.checkIfValueIsTruey(value.toString());
        if (this._useDefaultTmpl !== value) {
            this._useDefaultTmpl = value;
        }
    }
    get receiveStateSelected() {
        return this._attributeValueAsString('receivestateselected');
    }
    set receiveStateSelected(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateSelected !== value) {
            this._receiveStateSelected = value;
            this.setAttribute('receivestateselected', value);
            this._handleReceiveSignalSelected();
            if (this._ch5Toggle !== null && this.defaultTmplIsUsed()) {
                this._ch5Toggle.setAttribute('receiveStateSelected', value);
            }
        }
    }
    get receiveStateLabel() {
        return this._attributeValueAsString('receivestatelabel');
    }
    set receiveStateLabel(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateLabel !== value) {
            this._receiveStateLabel = value;
            this.setAttribute('receivestatelabel', value);
            this._handleReceiveSignalLabel();
        }
    }
    get receiveStateUrl() {
        return this._receiveStateUrl;
    }
    set receiveStateUrl(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateUrl !== value) {
            this._receiveStateUrl = value;
            this.setAttribute('receivestateurl', value);
        }
    }
    get receiveStateScriptLabelHTML() {
        return this._receiveStateScriptLabelHTML;
    }
    set receiveStateScriptLabelHTML(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateScriptLabelHTML !== value) {
            this._receiveStateScriptLabelHTML = value;
            this.setAttribute('receivestatescriptlabelhtml', value);
            if (this._ch5Toggle !== null && this.defaultTmplIsUsed()) {
                this._ch5Toggle.setAttribute('receiveStateScriptLabelHTML', value);
            }
        }
    }
    get sendEventOnClick() {
        return this._sendEventOnClick;
    }
    set sendEventOnClick(value) {
        value = this._checkAndSetStringValue(value);
        if (this._sendEventOnClick !== value) {
            this._sendEventOnClick = value;
            this.setAttribute('sendeventonclick', value);
            if (this._ch5Toggle !== null && this.defaultTmplIsUsed()) {
                this._ch5Toggle.setAttribute('sendEventOnClick', value);
            }
        }
    }
    get idx() {
        return this._idx;
    }
    set idx(value) {
        if (this._idx !== value) {
            this._idx = value;
        }
    }
    get optLabel() {
        return this._optLabel;
    }
    set optLabel(value) {
        if (this._optLabel !== value) {
            this._optLabel = value;
            if (this.hasAttribute('useDefaultTmpl')) {
                const defaultTmplLabelEl = this.querySelector('#' + this._getDefaultTmplLabelId());
                if (defaultTmplLabelEl instanceof HTMLElement) {
                    defaultTmplLabelEl.textContent = value;
                }
            }
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SelectOption.ELEMENT_NAME, Ch5SelectOption.SIGNAL_ATTRIBUTE_TYPES);
    }
    connectedCallback() {
        this._parentCh5Select = this.closest('ch5-select');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5SelectOption);
        }
        this._initDefaultTemplate();
        this.intializations();
        this.attachEventListeners();
    }
    disconnectedCallback() {
        this.removeEventListeners();
        this.unsubscribeFromSignals();
    }
    unsubscribeFromSignals() {
        this.info('unsubscribeFromSignals()');
        super.unsubscribeFromSignals();
        this.clearBooleanSignalSubscription(this._receiveStateSelected, this.receiveStateSelectedSubscription);
        this._receiveStateSelected = '';
        this.clearStringSignalSubscription(this._receiveStateLabel, this._receiveStateLabelSubscription);
        this._receiveStateLabel = '';
    }
    intializations() {
        this.setAttribute('data-ch5-id', this.getCrId());
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5SelectOption);
        }
        if (!this.classList.contains(Ch5SelectOption.ITEM_STYLE_CLASS)) {
            this.classList.add(Ch5SelectOption.ITEM_STYLE_CLASS);
        }
        this.initializeAttributes();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('ch5-select-option attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')');
        switch (attr) {
            case 'iconposition':
                this.iconPosition = this.getAttribute('iconPosition') ||
                    Ch5SelectOption.ICON_POSITION_VALUES[0];
                break;
            case 'receivestateselected':
                this.receiveStateSelected = this.getAttribute('receiveStateSelected');
                break;
            case 'receivestatelabel':
                this.receiveStateLabel = this.getAttribute('receiveStateLabel');
                break;
            case 'receivestateurl':
                this.receiveStateUrl = this.getAttribute('receiveStateUrl');
                break;
            case 'receivestatescriptlabelhtml':
                this.receiveStateScriptLabelHTML = this.getAttribute('receiveStateScriptLabelHTML');
                break;
            case 'sendeventonclick':
                this.sendEventOnClick = this.getAttribute('sendEventOnClick');
                break;
            case 'data-ch5-opt-idx':
                this.idx = Number(newValue);
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    initializeAttributes() {
        super.initAttributes();
        this.iconPosition = this.getAttribute('iconPosition') ||
            Ch5SelectOption.ICON_POSITION_VALUES[0];
        this.receiveStateSelected = this.getAttribute('receiveStateSelected');
        this.receiveStateLabel = this.getAttribute('receiveStateLabel');
        this.receiveStateUrl = this.getAttribute('receiveStateUrl');
        this.receiveStateScriptLabelHTML = this.getAttribute('receiveStateScriptLabelHTML');
        this.sendEventOnClick = this.getAttribute('sendEventOnClick');
        this.idx = Number(this.getAttribute('data-ch5-opt-idx'));
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._optionHammer = new Hammer.Manager(this);
        this._optionHammer.add(new Hammer.Tap({ event: 'tap' }));
        this._optionHammer.on('tap', this._onClick);
        this._optionHammer.add(new Hammer.Press({ time: 500 }));
        this._optionHammer.on('press', this._onPress);
        this._optionHammer.on('pressup', this._onPressUp);
    }
    removeEventListeners() {
        super.removeEventListeners();
        if (this._optionHammer !== null) {
            this._optionHammer.off('tap', this._onClick);
            this._optionHammer.off('press', this._onPress);
            this._optionHammer.off('pressup', this._onPressUp);
        }
    }
    repaint() {
        this.info('<ch5-select-option /> doen\'t need repaint');
    }
    _initDefaultTemplate() {
        if (this.hasAttribute('useDefaultTmpl')) {
            this.innerHTML = this._getDefaultTemplate();
            this.classList.add(Ch5SelectOption.ITEM_STYLE_DEFAULT_TMPL_CLASS);
            this._ch5Toggle = this.querySelector('ch5-toggle');
        }
    }
    _isParentMultiselect() {
        return this._parentCh5Select !== null && this._parentCh5Select.multiselect;
    }
    _parentHasFeedbackModeSubmit() {
        return this._parentCh5Select !== null &&
            this._parentCh5Select.feedbackMode === Ch5Select.FEEDBACK_MODE_VALUES[1];
    }
    _getParentSyncTimeout() {
        return this._parentCh5Select.signalValueSyncTimeout;
    }
    _getDefaultTmplLabelId() {
        return this.getCrId() + '-opt-label';
    }
    _getDefaultTemplate() {
        let imgHTML = `<ch5-image refreshRate="0"`;
        if (this.receiveStateUrl !== null && this.receiveStateUrl !== '') {
            imgHTML += ` receiveStateUrl="${this.receiveStateUrl}"`;
        }
        imgHTML += '></ch5-image>';
        const labelHTML = `<span id="${this._getDefaultTmplLabelId()}">${this.optLabel}</span>`;
        let checkboxHTML = '<ch5-toggle';
        if (this.receiveStateScriptLabelHTML !== null && this.receiveStateScriptLabelHTML !== '') {
            checkboxHTML += ` receiveStateScriptLabelHTML="${this.receiveStateScriptLabelHTML}"`;
        }
        if (this.sendEventOnClick !== null && this.sendEventOnClick !== '') {
            checkboxHTML += ` sendEventOnClick="${this.sendEventOnClick}"`;
        }
        if (this.receiveStateSelected !== null && this.receiveStateSelected !== '') {
            checkboxHTML += ` receiveStateValue="${this.receiveStateSelected}"`;
        }
        if (this._parentHasFeedbackModeSubmit()) {
            checkboxHTML += ' feedbackMode="submit"';
        }
        checkboxHTML += ` signalValueSyncTimeout="${this._getParentSyncTimeout()}"></ch5-toggle>`;
        let tmplHtml = '';
        if (this.iconPosition === Ch5SelectOption.ICON_POSITION_VALUES[0]) {
            tmplHtml += imgHTML + (this._isParentMultiselect() ? checkboxHTML : '') + labelHTML;
        }
        else {
            tmplHtml += labelHTML + (this._isParentMultiselect() ? checkboxHTML : '') + imgHTML;
        }
        tmplHtml += '';
        return tmplHtml;
    }
    defaultTmplIsUsed() {
        return this.classList.contains(Ch5SelectOption.ITEM_STYLE_DEFAULT_TMPL_CLASS);
    }
    triggerToggleClickSignal(expectedOptSelectedState) {
        if (this._ch5Toggle === null) {
            return;
        }
        if (this._ch5Toggle.value !== expectedOptSelectedState) {
            this._ch5Toggle.toggleChecked();
        }
    }
    _clickReceivedFromCh5Toggle(targetEl) {
        if (targetEl.tagName.toLowerCase() === 'ch5-toggle') {
            return true;
        }
        else {
            const targetCh5ToggleParent = targetEl.closest('ch5-select-option > ch5-toggle');
            return !!targetCh5ToggleParent;
        }
    }
    setToggleValue(val) {
        if (this._ch5Toggle !== null) {
            this._ch5Toggle.setClean();
            this._ch5Toggle.value = val;
        }
    }
    _onClick(e) {
        this.info("Ch5SelectOption._onClick()");
        if (this.defaultTmplIsUsed() && this._isParentMultiselect()) {
            const expectedOptSelectedState = !this.classList.contains(Ch5Select.ITEM_SELECTED_STYLE_CLASS);
            this.dispatchEvent(this._getOptionSelectedEvent());
            if (!this._clickReceivedFromCh5Toggle(e.target)) {
                this.triggerToggleClickSignal(expectedOptSelectedState);
            }
            return;
        }
        this.dispatchEvent(this._getOptionSelectedEvent(true));
        if (!this._parentHasFeedbackModeSubmit()) {
            this.sendClickSignal();
        }
    }
    sendClickSignal() {
        if (typeof this.sendEventOnClick === 'string' && this.sendEventOnClick !== '') {
            const sigClick = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this.sendEventOnClick);
            if (sigClick !== null) {
                sigClick.publish(true);
                sigClick.publish(false);
            }
        }
    }
    _getOptionSelectedEvent(setAction, confirmed) {
        const eventPayload = {
            idx: this.idx,
            set: typeof setAction === 'boolean'
                ? setAction
                : !this.classList.contains(Ch5Select.ITEM_SELECTED_STYLE_CLASS)
        };
        confirmed = typeof confirmed !== 'boolean' ? false : confirmed;
        if (!this._isParentMultiselect()) {
            eventPayload.resetDirty = confirmed;
        }
        else {
            eventPayload.confirmed = confirmed;
        }
        return new CustomEvent("option-selected", {
            detail: eventPayload,
            bubbles: true,
            cancelable: false
        });
    }
    applySelectedStyleClass() {
        this.classList.add(Ch5Select.ITEM_SELECTED_STYLE_CLASS);
    }
    removeSelectedStyleClass() {
        this.classList.remove(Ch5Select.ITEM_SELECTED_STYLE_CLASS);
    }
    _handleReceiveSignalSelected() {
        if (this.receiveStateSelected !== '' && this.receiveStateSelectedSubscription !== '') {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateSelected);
            const oldSig = Ch5SignalFactory.getInstance()
                .getBooleanSignal(oldSigName);
            if (oldSig !== null && this.receiveStateSelectedSubscription !== '') {
                oldSig.unsubscribe(this.receiveStateSelectedSubscription);
                this.receiveStateSelectedSubscription = '';
            }
        }
        if (this.receiveStateSelected === '' || this.receiveStateSelected === null) {
            return;
        }
        const receiveSignalSelectedName = Ch5Signal.getSubscriptionSignalName(this.receiveStateSelected);
        const receiveStateSelected = Ch5SignalFactory.getInstance()
            .getBooleanSignal(receiveSignalSelectedName);
        if (receiveStateSelected !== null) {
            this.receiveStateSelectedSubscription = receiveStateSelected.subscribe((newValue) => {
                this.info(`Option ${this.idx} received selected signal value: ${newValue}`);
                this.dispatchEvent(this._getOptionSelectedEvent(newValue, true));
            });
        }
    }
    _handleReceiveSignalLabel() {
        if (this.receiveStateLabel !== '' && this._receiveStateLabelSubscription !== '') {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateLabel);
            const oldSig = Ch5SignalFactory.getInstance()
                .getStringSignal(oldSigName);
            if (oldSig !== null && this._receiveStateLabelSubscription !== '') {
                oldSig.unsubscribe(this._receiveStateLabelSubscription);
                this._receiveStateLabelSubscription = '';
            }
        }
        if (this.receiveStateLabel === '' || this.receiveStateLabel === null) {
            return;
        }
        const receiveSignalLabelSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateLabel);
        const receiveStateLabelSig = Ch5SignalFactory.getInstance()
            .getStringSignal(receiveSignalLabelSigName);
        if (receiveStateLabelSig !== null) {
            this._receiveStateLabelSubscription = receiveStateLabelSig.subscribe((labelVal) => {
                this.optLabel = labelVal;
            });
        }
    }
    getCssClassDisabled() {
        return 'ch5-select__panel__item--disabled';
    }
    _onPress() {
        if (this._parentCh5Select !== null) {
            this._parentCh5Select.classList.add('ch5-select—pressed');
        }
    }
    _onPressUp() {
        if (this._parentCh5Select !== null) {
            this._parentCh5Select.classList.remove('ch5-select—pressed');
        }
    }
}
Ch5SelectOption.ELEMENT_NAME = 'ch5-select-option';
Ch5SelectOption.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateselected: { direction: "state", booleanJoin: 1, contractName: true }, receivestatelabel: { direction: "state", stringJoin: 1, contractName: true }, receivestateurl: { direction: "state", stringJoin: 1, contractName: true }, receivestatescriptlabelhtml: { direction: "state", stringJoin: 1, contractName: true }, sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5SelectOption.ICON_POSITION_VALUES = ['first', 'last'];
Ch5SelectOption.ITEM_STYLE_CLASS = 'ch5-select__panel__item';
Ch5SelectOption.ITEM_STYLE_DEFAULT_TMPL_CLASS = 'ch5-select__panel__item__default_tmpl';
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5SelectOption.ELEMENT_NAME, Ch5SelectOption);
}
Ch5SelectOption.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNlbGVjdC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc2VsZWN0LW9wdGlvbi9jaDUtc2VsZWN0LW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUQsT0FBTyxFQUFDLDBCQUEwQixFQUEyQyxNQUFNLDZDQUE2QyxDQUFDO0FBRWpJLE1BQU0sT0FBTyxlQUFnQixTQUFRLFNBQVM7SUFFMUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQTJLSixTQUFJLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFbkIscUNBQWdDLEdBQVcsRUFBRSxDQUFDO1FBWTdDLGtCQUFhLEdBQVcsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhFLG9CQUFlLEdBQVksS0FBSyxDQUFBO1FBS2hDLDBCQUFxQixHQUFrQixJQUFJLENBQUM7UUFLNUMsdUJBQWtCLEdBQWtCLElBQUksQ0FBQztRQUN6QyxtQ0FBOEIsR0FBVyxFQUFFLENBQUM7UUFDN0MsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUt0QixxQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO1FBUXZDLGlDQUE0QixHQUFrQixJQUFJLENBQUM7UUFPbkQsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUV4QyxxQkFBZ0IsR0FBbUIsSUFBSSxDQUFDO1FBRXhDLGtCQUFhLEdBQXlCLElBQUksQ0FBQztRQUUzQyxlQUFVLEdBQXFCLElBQUksQ0FBQztRQS9OeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJ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