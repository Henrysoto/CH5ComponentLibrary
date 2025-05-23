import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Button } from "../ch5-button/ch5-button";
import { isEmpty, isNil } from 'lodash';
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5Form extends Ch5Common {
    set hideCancelButton(value) {
        this._ch5Properties.set("hideCancelButton", value, () => {
            this.hideCancelButton ? this.cancelButton.setAttribute('hidden', '') : this.cancelButton.removeAttribute('hidden');
        });
    }
    get hideCancelButton() {
        return this._ch5Properties.get("hideCancelButton");
    }
    set hideSubmitButton(value) {
        this._ch5Properties.set("hideSubmitButton", value, () => {
            this.hideSubmitButton ? this.submitButton.setAttribute('hidden', '') : this.submitButton.removeAttribute('hidden');
        });
    }
    get hideSubmitButton() {
        return this._ch5Properties.get("hideSubmitButton");
    }
    get inputElements() {
        return this._inputElements;
    }
    get submitButton() {
        return this._submitButton;
    }
    set submitButton(value) {
        this._submitButton = value;
    }
    get cancelButton() {
        return this._cancelButton;
    }
    set cancelButton(value) {
        this._cancelButton = value;
    }
    get submitButtonLabel() {
        return this._submitButtonLabel;
    }
    set submitButtonLabel(value) {
        this.info('Ch5Form set submitButtonLabel("' + value + '")');
        if (Ch5Common.isNil(value)) {
            value = Ch5Form.SUBMIT_LABEL;
        }
        const trValue = this._getTranslatedValue('submitbuttonlabel', value);
        if (trValue !== this.submitButtonLabel) {
            this._submitButtonLabel = value;
            this.submitButton.setAttribute('label', trValue);
            this.setAttribute('submitbuttonlabel', trValue);
        }
    }
    get submitButtonIcon() {
        return this._submitButtonIcon;
    }
    set submitButtonIcon(value) {
        this.info('Ch5Form set submitButtonIcon("' + value + '")');
        if (this._submitButtonIcon !== value) {
            if (Ch5Common.isNil(value)) {
                value = '';
            }
            const iconClass = `${value} ${this.primaryCssClass}__submit__icon`;
            this._submitButtonIcon = value;
            this.setAttribute('submitbuttonicon', value);
            this.submitButton.setAttribute('iconClass', iconClass);
        }
    }
    get submitButtonStyle() {
        return this._submitButtonStyle;
    }
    set submitButtonStyle(value) {
        this.info('Ch5Form set submitButtonStyle("' + value + '")');
        if (this._submitButtonStyle !== value) {
            if (Ch5Common.isNil(value)) {
                value = '';
            }
            this._submitButtonStyle = value;
            this.setAttribute('submitbuttonstyle', value);
            this.submitButton.setAttribute('customStyle', value);
        }
    }
    get submitButtonType() {
        return this._submitButtonType;
    }
    set submitButtonType(value) {
        this.info('Ch5Form set submitButtonType("' + value + '")');
        if (this._submitButtonType !== value) {
            if (Ch5Common.isNil(value)) {
                value = 'default';
            }
            this._submitButtonType = value;
            this.setAttribute('submitbuttontype', value);
            this.submitButton.setAttribute('type', value);
        }
    }
    get cancelButtonLabel() {
        return this._cancelButtonLabel;
    }
    set cancelButtonLabel(value) {
        this.info('Ch5Form set cancelButtonLabel("' + value + '")');
        if (Ch5Common.isNil(value)) {
            value = Ch5Form.CANCEL_LABEL;
        }
        const trValue = this._getTranslatedValue('cancelButtonLabel', value);
        if (trValue !== this.cancelButtonLabel) {
            this._cancelButtonLabel = trValue;
            this.cancelButton.setAttribute('label', trValue);
            this.setAttribute('cancelbuttonlabel', trValue);
        }
    }
    get cancelButtonIcon() {
        return this._cancelButtonIcon;
    }
    set cancelButtonIcon(value) {
        this.info('Ch5Form set cancelButtonIcon("' + value + '")');
        if (this._cancelButtonIcon !== value) {
            if (Ch5Common.isNil(value)) {
                value = '';
            }
            const iconClass = `${value} ${this.primaryCssClass}__cancel__icon`;
            this._cancelButtonIcon = value;
            this.setAttribute('cancelbuttonicon', value);
            this.cancelButton.setAttribute('iconclass', iconClass);
        }
    }
    get cancelButtonStyle() {
        return this._cancelButtonStyle;
    }
    set cancelButtonStyle(value) {
        this.info('Ch5Form set cancelButtonStyle("' + value + '")');
        if (this._cancelButtonStyle !== value) {
            if (value === undefined || value === null || value === '') {
                value = '';
            }
            this._cancelButtonStyle = value;
            this.setAttribute('cancelbuttonstyle', value);
            this.cancelButton.setAttribute('customstyle', value);
        }
    }
    get cancelButtonType() {
        return this._cancelButtonType;
    }
    set cancelButtonType(value) {
        this.info('Ch5Form set cancelButtonType("' + value + '")');
        if (this._cancelButtonType !== value) {
            if (isNil(value)) {
                value = 'default';
            }
            this._cancelButtonType = value;
            this.setAttribute('cancelbuttontype', value);
            this.cancelButton.setAttribute('type', value);
        }
    }
    get submitId() {
        return this._submitId;
    }
    set submitId(value) {
        this.info('Ch5Form set submitId("' + value + '")');
        if (this._submitId !== value && !isNil(value)) {
            this._submitId = value;
        }
    }
    get cancelId() {
        return this._cancelId;
    }
    set cancelId(value) {
        this.info('Ch5Form set cancelId("' + value + '")');
        if (this._cancelId !== value && !isNil(value)) {
            this._cancelId = value;
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-form';
        this._submitButtonLabel = '';
        this._submitButtonIcon = '';
        this._submitButtonStyle = '';
        this._submitButtonType = 'default';
        this._cancelButtonLabel = '';
        this._cancelButtonIcon = '';
        this._cancelButtonStyle = '';
        this._cancelButtonType = 'default';
        this._submitId = '';
        this._cancelId = '';
        this._inputElements = [];
        this._submitButton = {};
        this._cancelButton = {};
        this._submitShouldBeDisable = true;
        this._cancelShouldBeDisabled = true;
        this._customCancelButtonRef = null;
        this._customSubmitButtonRef = null;
        this._onClickSubmitButton = this._onClickSubmitButton.bind(this);
        this._onClickCancelButton = this._onClickCancelButton.bind(this);
        this._checkIfCancelOrSubmitShouldBeDisabled = this._checkIfCancelOrSubmitShouldBeDisabled.bind(this);
        this._ch5Properties = new Ch5Properties(this, Ch5Form.COMPONENT_PROPERTIES);
        this._initFormButtons();
        this.ready = Promise.all([
            customElements.whenDefined('ch5-button'),
            customElements.whenDefined('ch5-toggle'),
            customElements.whenDefined('ch5-slider'),
            customElements.whenDefined('ch5-select'),
            customElements.whenDefined('ch5-list'),
            customElements.whenDefined('ch5-textinput'),
            customElements.whenDefined('ch5-spinner')
        ]).then(() => {
            this._linkInputElements();
            this._linkFormButtons();
            this._wasInstatiated = true;
        });
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Form.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Form.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Form.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        const ch5FormAttributes = [
            'submitbuttonlabel',
            'submitbuttonicon',
            'submitbuttonstyle',
            'submitbuttontype',
            'cancelbuttonlabel',
            'cancelbuttonicon',
            'cancelbuttonstyle',
            'cancelbuttontype',
            'submitid',
            'cancelid'
        ];
        return commonAttributes.concat(ch5FormAttributes.concat(newObsAttrs));
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Form.ELEMENT_NAME, Ch5Form.SIGNAL_ATTRIBUTE_TYPES);
    }
    setCustomCancelBtn() {
        if (isNil(this.cancelId) || isEmpty(this.cancelId)) {
            return;
        }
        this.info(`Ch5Form setCustomCancelBtn with id :${this.cancelId} ready`);
        this._customCancelButtonRef = document.getElementById(this.cancelId);
        if (isNil(this._customCancelButtonRef)) {
            this.info(`Ch5Form Cannot find cancel button with id :${this.cancelId}`);
            return;
        }
        this._customCancelButtonRef.removeEventListener('click', this._onClickCancelButton);
        this._customCancelButtonRef.addEventListener('click', this._onClickCancelButton);
        this.info(`Ch5Form canel button with ${this.cancelId} found, events added`);
    }
    setCustomSubmitBtn() {
        if (isNil(this.submitId) || isEmpty(this.submitId)) {
            return;
        }
        this.info(`Ch5Form setCustomSubmitBtn with id :${this.submitId} ready`);
        this._customSubmitButtonRef = document.getElementById(this.submitId);
        if (isNil(this._customSubmitButtonRef)) {
            this.info(`Ch5Form cannot find submit button with id :${this.submitId}`);
            return;
        }
        this._customSubmitButtonRef.addEventListener('click', this._onClickSubmitButton);
        this.info(`Ch5Form submit button with ${this.submitId} found, events added`);
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Form);
        }
        this.ready.then(() => {
            this.cacheComponentChildrens();
            this.initAttributes();
            this.appendChild(this.submitButton);
            this.appendChild(this.cancelButton);
            this.attachEventListeners();
            this.initCommonMutationObserver(this);
            this.setCustomCancelBtn();
            this.setCustomSubmitBtn();
            this.checkIfCustomSubmitShouldBeDisabled(true);
            this.checkIfCustomCancelShouldBeDisabled(true);
        });
    }
    disconnectedCallback() {
        this.removeEvents();
        this.disconnectCommonMutationObserver();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('Ch5Form attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
        const attributeChangedProperty = Ch5Form.COMPONENT_PROPERTIES.find((property) => {
            return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true;
        });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        else {
            switch (attr) {
                case 'submitbuttonlabel':
                    if (this.hasAttribute('submitbuttonlabel')) {
                        this.submitButtonLabel = newValue;
                    }
                    else {
                        this.submitButtonLabel = '';
                    }
                    break;
                case 'submitbuttonicon':
                    if (this.hasAttribute('submitbuttonicon')) {
                        this.submitButtonIcon = newValue;
                    }
                    else {
                        this.submitButtonIcon = '';
                    }
                    break;
                case 'submitbuttonstyle':
                    if (this.hasAttribute('submitbuttonstyle')) {
                        this.submitButtonStyle = newValue;
                    }
                    else {
                        this.submitButtonStyle = '';
                    }
                    break;
                case 'submitbuttontype':
                    if (this.hasAttribute('submitbuttontype')) {
                        this.submitButtonType = newValue;
                    }
                    else {
                        this.submitButtonType = 'default';
                    }
                    break;
                case 'cancelbuttonlabel':
                    if (this.hasAttribute('cancelbuttonlabel')) {
                        this.cancelButtonLabel = newValue;
                    }
                    else {
                        this.cancelButtonLabel = '';
                    }
                    break;
                case 'cancelbuttonicon':
                    if (this.hasAttribute('cancelbuttonicon')) {
                        this.cancelButtonIcon = newValue;
                    }
                    else {
                        this.cancelButtonIcon = '';
                    }
                    break;
                case 'cancelbuttonstyle':
                    if (this.hasAttribute('cancelbuttonstyle')) {
                        this.cancelButtonStyle = newValue;
                    }
                    else {
                        this.cancelButtonStyle = '';
                    }
                    break;
                case 'cancelbuttontype':
                    if (this.hasAttribute('cancelbuttontype')) {
                        this.cancelButtonType = newValue;
                    }
                    else {
                        this.cancelButtonType = 'default';
                    }
                    break;
                case 'submitid':
                    if (this.hasAttribute('submitid')) {
                        this.submitId = newValue;
                    }
                    else {
                        this.submitId = '';
                    }
                    break;
                case 'cancelid':
                    if (this.hasAttribute('cancelid')) {
                        this.cancelId = newValue;
                    }
                    else {
                        this.cancelId = '';
                    }
                    break;
                default:
                    super.attributeChangedCallback(attr, oldValue, newValue);
                    break;
            }
        }
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Form.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Form.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Form.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Form.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        this._upgradeProperty('submitButtonLabel');
        this._upgradeProperty('submitButtonIcon');
        this._upgradeProperty('submitButtonStyle');
        this._upgradeProperty('submitButtonType');
        this._upgradeProperty('cancelButtonLabel');
        this._upgradeProperty('cancelButtonIcon');
        this._upgradeProperty('cancelButtonStyle');
        this._upgradeProperty('cancelButtonType');
        this._upgradeProperty('submitId');
        this._upgradeProperty('cancelId');
    }
    attachEventListeners() {
        super.attachEventListeners();
        this.submitButton.addEventListener('click', this._onClickSubmitButton);
        this.cancelButton.addEventListener('click', this._onClickCancelButton);
        this._inputElements.forEach(element => {
            element.addEventListener('dirty', this._checkIfCancelOrSubmitShouldBeDisabled);
            element.addEventListener('validitychange', this._checkIfCancelOrSubmitShouldBeDisabled);
            element.addEventListener('clean', this._checkIfCancelOrSubmitShouldBeDisabled);
        });
    }
    removeEvents() {
        super.removeEventListeners();
        this.submitButton.removeEventListener('click', this._onClickSubmitButton);
        this.cancelButton.removeEventListener('click', this._onClickCancelButton);
        this._inputElements.forEach(element => {
            element.removeEventListener('dirty', this._checkIfCancelOrSubmitShouldBeDisabled);
            element.removeEventListener('validitychange', this._checkIfCancelOrSubmitShouldBeDisabled);
            element.removeEventListener('clean', this._checkIfCancelOrSubmitShouldBeDisabled);
        });
        if (!isNil(this._customSubmitButtonRef)) {
            this._customSubmitButtonRef.removeEventListener('click', this._onClickSubmitButton);
        }
        if (!isNil(this._customCancelButtonRef)) {
            this._customCancelButtonRef.removeEventListener('click', this._onClickSubmitButton);
        }
    }
    updateSwipeGesture() {
        if (this.submitButton) {
            this.submitButton.swipeGestureEnabled = this.swipeGestureEnabled;
        }
        if (this.cancelButton) {
            this.cancelButton.swipeGestureEnabled = this.swipeGestureEnabled;
        }
    }
    submit() {
        if (!this._submitShouldBeDisable) {
            this._inputElements.forEach(element => {
                element.submit();
            });
        }
    }
    cancel() {
        this.submitButton.setAttribute('disabled', 'true');
        this._inputElements.forEach(element => {
            element.reset();
        });
    }
    _linkInputElements() {
        this._inputElements = Array.from(this.querySelectorAll("[feedbackmode='submit']"));
    }
    _getInputElements() {
        return this._inputElements;
    }
    _initFormButtons() {
        this.submitButton = this._createButton(Ch5Form.SUBMIT_LABEL, Ch5Form.SUBMIT_TYPE, 'submit', true);
        this.cancelButton = this._createButton(Ch5Form.CANCEL_LABEL, Ch5Form.CANCEL_TYPE, 'cancel', true);
    }
    _linkFormButtons() {
        const submit = this.querySelector("[formtype='submit']");
        const cancel = this.querySelector("[formtype='cancel']");
        if (null !== submit) {
            submit.setAttribute('disabled', 'true');
            this.submitButton = submit;
        }
        if (null !== cancel) {
            this.cancelButton = cancel;
        }
    }
    _checkIfCancelOrSubmitShouldBeDisabled() {
        const elementsAreClean = this._inputElements.every((elem) => elem.getDirty() === false);
        this._cancelShouldBeDisabled = elementsAreClean;
        if (this._cancelShouldBeDisabled) {
            this.cancelButton.setAttribute('disabled', 'true');
            this.cancelButton.classList.add(this.primaryCssClass + '__submit--disabled');
        }
        else {
            this.cancelButton.removeAttribute('disabled');
            this.cancelButton.classList.remove(this.primaryCssClass + '__submit--disabled');
        }
        this.checkIfCustomCancelShouldBeDisabled(this._cancelShouldBeDisabled);
        this._inputElements.forEach((element) => {
            if (element.getDirty() === true) {
                this._submitShouldBeDisable = false;
                this.checkIfCustomSubmitShouldBeDisabled(this._submitShouldBeDisable);
                return;
            }
        });
        this._submitShouldBeDisable = elementsAreClean;
        if (this._submitShouldBeDisable) {
            this.checkIfCustomSubmitShouldBeDisabled(this._submitShouldBeDisable);
        }
        this._inputElements.forEach(element => {
            if (typeof element.getValid !== 'undefined' && element.getValid() === false) {
                this._submitShouldBeDisable = true;
                this.checkIfCustomSubmitShouldBeDisabled(this._submitShouldBeDisable);
                return;
            }
        });
        if (this._submitShouldBeDisable) {
            this.submitButton.setAttribute('disabled', 'true');
            this.submitButton.classList.add(this.primaryCssClass + '__submit--disabled');
            return;
        }
        this.submitButton.removeAttribute('disabled');
        this.submitButton.classList.remove(this.primaryCssClass + '__submit--disabled');
    }
    checkIfCustomSubmitShouldBeDisabled(disable) {
        if (!isNil(this._customSubmitButtonRef)) {
            disable ? this._customSubmitButtonRef.classList.add('ch5-button--disabled') : this._customSubmitButtonRef.classList.remove('ch5-button--disabled');
        }
    }
    checkIfCustomCancelShouldBeDisabled(disable) {
        if (!isNil(this._customCancelButtonRef)) {
            disable ? this._customCancelButtonRef.classList.add('ch5-button--disabled') : this._customCancelButtonRef.classList.remove('ch5-button--disabled');
        }
    }
    _createButton(label, type, formType, disable = false) {
        const button = new Ch5Button();
        button.setAttribute('label', label);
        button.setAttribute('type', type);
        button.setAttribute('formType', formType);
        button.classList.add(this.primaryCssClass + '__' + formType);
        if (disable) {
            button.setAttribute('disabled', 'true');
            button.classList.add(this.primaryCssClass + '__' + formType + '--disabled');
        }
        return button;
    }
    _onClickSubmitButton() {
        this.submit();
    }
    _onClickCancelButton() {
        this.cancel();
    }
    _upgradeProperty(prop) {
        if (this.constructor.prototype.hasOwnProperty(prop)) {
            const val = this[prop];
            delete this[prop];
            this[prop] = val;
        }
    }
}
Ch5Form.ELEMENT_NAME = 'ch5-form';
Ch5Form.SUBMIT_LABEL = 'Submit';
Ch5Form.CANCEL_LABEL = 'Cancel';
Ch5Form.SUBMIT_TYPE = 'default';
Ch5Form.CANCEL_TYPE = 'warning';
Ch5Form.SIGNAL_ATTRIBUTE_TYPES = Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES);
Ch5Form.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "hideCancelButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "hideSubmitButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    }
];
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5Form.ELEMENT_NAME, Ch5Form);
}
Ch5Form.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWZvcm0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtZm9ybS9jaDUtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXhDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBNEMsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHM0QsTUFBTSxPQUFPLE9BQVEsU0FBUSxTQUFTO0lBOEJyQyxJQUFXLGdCQUFnQixDQUFDLEtBQWM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDbkgsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLGdCQUFnQixDQUFDLEtBQWM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDbkgsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFXLFlBQVksQ0FBQyxLQUFnQjtRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBVyxZQUFZLENBQUMsS0FBZ0I7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQVcsaUJBQWlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLGlCQUFpQixDQUFDLEtBQWE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQzdCO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJFLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO0lBQ0YsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFXLGdCQUFnQixDQUFDLEtBQWE7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO1lBQ3JDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNYO1lBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsZ0JBQWdCLENBQUM7WUFFbkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2RDtJQUNGLENBQUM7SUFFRCxJQUFXLGlCQUFpQjtRQUMzQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBVyxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRTVELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLEtBQUssRUFBRTtZQUN0QyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDWDtZQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckQ7SUFDRixDQUFDO0lBTUQsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQztJQU1ELElBQVcsZ0JBQWdCLENBQUMsS0FBcUI7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO1lBQ3JDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsS0FBSyxHQUFHLFNBQVMsQ0FBQzthQUNsQjtZQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7SUFDRixDQUFDO0lBRUQsSUFBVyxpQkFBaUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsaUJBQWlCLENBQUMsS0FBYTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUU1RCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDN0I7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFckUsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDRixDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQVcsZ0JBQWdCLENBQUMsS0FBYTtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxLQUFLLEVBQUU7WUFDckMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ1g7WUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxnQkFBZ0IsQ0FBQztZQUVuRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0YsQ0FBQztJQU1ELElBQVcsaUJBQWlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLGlCQUFpQixDQUFDLEtBQWE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssS0FBSyxFQUFFO1lBQ3RDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQzFELEtBQUssR0FBRyxFQUFFLENBQUM7YUFDWDtZQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckQ7SUFDRixDQUFDO0lBTUQsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQztJQU1ELElBQVcsZ0JBQWdCLENBQUMsS0FBcUI7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO1lBQ3JDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QztJQUNGLENBQUM7SUFNRCxJQUFXLFFBQVE7UUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFNRCxJQUFXLFFBQVEsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRW5ELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDRixDQUFDO0lBTUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBTUQsSUFBVyxRQUFRLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVuRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0YsQ0FBQztJQUVEO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFpRUYsb0JBQWUsR0FBRyxVQUFVLENBQUM7UUEwQjVCLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQVNoQyxzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFTL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBU2hDLHNCQUFpQixHQUFtQixTQUFTLENBQUM7UUFTOUMsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBU2hDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQVMvQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFTaEMsc0JBQWlCLEdBQW1CLFNBQVMsQ0FBQztRQVU5QyxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBU3ZCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFpQnZCLG1CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQVF0QyxrQkFBYSxHQUFjLEVBQWUsQ0FBQztRQVEzQyxrQkFBYSxHQUFjLEVBQWUsQ0FBQztRQUszQywyQkFBc0IsR0FBWSxJQUFJLENBQUM7UUFLdkMsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBS3hDLDJCQUFzQixHQUE2QixJQUFJLENBQUM7UUFLeEQsMkJBQXNCLEdBQTZCLElBQUksQ0FBQztRQWhPL0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLHNDQUFzQyxHQUFHLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFHNUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFHeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3hCLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3hDLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3hDLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3hDLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3hDLGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQ3RDLGNBQWMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQzNDLGNBQWMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBTUQsTUFBTSxLQUFLLGtCQUFrQjtRQUM1QixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztRQUN0RCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckUsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEtBQUssSUFBSSxFQUFFO2dCQUNsRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUNyRTtTQUNEO1FBQ0QsTUFBTSxpQkFBaUIsR0FBYTtZQUNuQyxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLFVBQVU7WUFDVixVQUFVO1NBQ1YsQ0FBQztRQUVGLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFrTE0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBS08sa0JBQWtCO1FBQ3pCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBRW5ELE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsdUNBQXVDLElBQUksQ0FBQyxRQUFRLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQXNCLENBQUM7UUFFMUYsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDekUsT0FBTztTQUNQO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLElBQUksQ0FBQyxRQUFRLHNCQUFzQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUtPLGtCQUFrQjtRQUN6QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUVuRCxPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxJQUFJLENBQUMsUUFBUSxRQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFzQixDQUFDO1FBQzFGLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsOENBQThDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFFBQVEsc0JBQXNCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBTU0saUJBQWlCO1FBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFNTSxvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3BCLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFLTSx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtRQUMvRSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXBHLE1BQU0sd0JBQXdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQThCLEVBQUUsRUFBRTtZQUNyRyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUM7UUFDckcsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLHdCQUF3QixFQUFFO1lBQzdCLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQztZQUMxQixNQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUN4QjthQUFNO1lBQ04sUUFBUSxJQUFJLEVBQUU7Z0JBQ2IsS0FBSyxtQkFBbUI7b0JBQ3ZCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO3dCQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO3FCQUNsQzt5QkFBTTt3QkFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO3FCQUM1QjtvQkFDRCxNQUFNO2dCQUNQLEtBQUssa0JBQWtCO29CQUN0QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztxQkFDakM7eUJBQU07d0JBQ04sSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztxQkFDM0I7b0JBQ0QsTUFBTTtnQkFDUCxLQUFLLG1CQUFtQjtvQkFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7d0JBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7cUJBQ2xDO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7cUJBQzVCO29CQUNELE1BQU07Z0JBQ1AsS0FBSyxrQkFBa0I7b0JBQ3RCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO3dCQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBMEIsQ0FBQztxQkFDbkQ7eUJBQU07d0JBQ04sSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztxQkFDbEM7b0JBQ0QsTUFBTTtnQkFDUCxLQUFLLG1CQUFtQjtvQkFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7d0JBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7cUJBQ2xDO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7cUJBQzVCO29CQUNELE1BQU07Z0JBQ1AsS0FBSyxrQkFBa0I7b0JBQ3RCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO3dCQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO3FCQUNqQzt5QkFBTTt3QkFDTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO3FCQUMzQjtvQkFDRCxNQUFNO2dCQUNQLEtBQUssbUJBQW1CO29CQUN2QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRTt3QkFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztxQkFDbEM7eUJBQU07d0JBQ04sSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztxQkFDNUI7b0JBQ0QsTUFBTTtnQkFDUCxLQUFLLGtCQUFrQjtvQkFDdEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7d0JBQzFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUEwQixDQUFDO3FCQUNuRDt5QkFBTTt3QkFDTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO3FCQUNsQztvQkFDRCxNQUFNO2dCQUNQLEtBQUssVUFBVTtvQkFDZCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3FCQUN6Qjt5QkFBTTt3QkFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsTUFBTTtnQkFDUCxLQUFLLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztxQkFDekI7eUJBQU07d0JBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7cUJBQ25CO29CQUNELE1BQU07Z0JBQ1A7b0JBQ0MsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3pELE1BQU07YUFDUDtTQUNEO0lBQ0YsQ0FBQztJQU1TLGNBQWM7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyRSxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7b0JBQzFFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QzthQUNEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFNUyxvQkFBb0I7UUFDN0IsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUMvRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDeEYsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFNUyxZQUFZO1FBQ3JCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDbEYsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQzNGLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDcEY7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDcEY7SUFDRixDQUFDO0lBRVMsa0JBQWtCO1FBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUNqRTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUNqRTtJQUNGLENBQUM7SUFTTSxNQUFNO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRU0sTUFBTTtRQUVaLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBUU8sa0JBQWtCO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBcUIsQ0FBQztJQUN4RyxDQUFDO0lBUU8saUJBQWlCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM1QixDQUFDO0lBS08sZ0JBQWdCO1FBRXZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFPTyxnQkFBZ0I7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBYyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQWMsQ0FBQztRQUd0RSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDM0I7UUFHRCxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDM0I7SUFDRixDQUFDO0lBUU8sc0NBQXNDO1FBRzdDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7UUFHaEQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDLENBQUM7U0FDN0U7YUFBTTtZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLENBQUMsbUNBQW1DLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFHdkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFFdEUsT0FBTzthQUNQO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3RFO1FBR0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFFdEUsT0FBTzthQUNQO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztZQUM3RSxPQUFPO1NBQ1A7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTyxtQ0FBbUMsQ0FBQyxPQUFnQjtRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBRXhDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNuSjtJQUNGLENBQUM7SUFFTyxtQ0FBbUMsQ0FBQyxPQUFnQjtRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBRXhDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNuSjtJQUNGLENBQUM7SUFVTyxhQUFhLENBQUMsS0FBYSxFQUFFLElBQVksRUFBRSxRQUFnQixFQUFFLFVBQW1CLEtBQUs7UUFDNUYsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUUvQixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQTtRQUc1RCxJQUFJLE9BQU8sRUFBRTtZQUNaLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQztTQUM1RTtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQWNPLG9CQUFvQjtRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBUU8sb0JBQW9CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFTTyxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELE1BQU0sR0FBRyxHQUFJLElBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxPQUFRLElBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzFCO0lBQ0YsQ0FBQzs7QUFwOEJzQixvQkFBWSxHQUFHLFVBQVUsQUFBYixDQUFjO0FBQ25DLG9CQUFZLEdBQVcsUUFBUSxBQUFuQixDQUFvQjtBQUNoQyxvQkFBWSxHQUFXLFFBQVEsQUFBbkIsQ0FBb0I7QUFDaEMsbUJBQVcsR0FBVyxTQUFTLEFBQXBCLENBQXFCO0FBQ2hDLG1CQUFXLEdBQVcsU0FBUyxBQUFwQixDQUFxQjtBQUN2Qiw4QkFBc0IscUJBQ3pDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FEUyxDQUUzQztBQUNxQiw0QkFBb0IsR0FBMkI7SUFDckU7UUFDQyxPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxrQkFBa0I7UUFDeEIscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixJQUFJLEVBQUUsU0FBUztRQUNmLHFCQUFxQixFQUFFLElBQUk7UUFDM0Isb0JBQW9CLEVBQUUsSUFBSTtLQUMxQjtJQUNEO1FBQ0MsT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLHFCQUFxQixFQUFFLElBQUk7UUFDM0IsSUFBSSxFQUFFLFNBQVM7UUFDZixxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLG9CQUFvQixFQUFFLElBQUk7S0FDMUI7Q0FDRCxBQWpCMEMsQ0FpQnpDO0FBODZCSCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtPQUN2RSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtJQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQzVEO0FBRUQsT0FBTyxDQUFDLDRCQUE0QixFQUFFLENBQUMifQ==