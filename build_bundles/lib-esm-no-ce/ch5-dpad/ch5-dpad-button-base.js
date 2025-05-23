import _ from "lodash";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Pressable } from "../ch5-common/ch5-pressable";
import { Ch5SignalBridge, Ch5SignalFactory } from "../ch5-core";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5Dpad } from "./ch5-dpad";
import { ComponentHelper } from "../ch5-common/utils/component-helper";
import { CH5DpadUtils } from "./ch5-dpad-utils";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5DpadButtonBase extends Ch5Common {
    set label(value) {
        this._ch5Properties.set("label", value, () => {
            this.handleLabel();
        });
    }
    get label() {
        return this._ch5Properties.get("label");
    }
    set key(value) {
        this._ch5Properties.set("key", value, () => {
            this.handleKey();
        });
    }
    get key() {
        return this._ch5Properties.get("key");
    }
    set iconClass(value) {
        const prevValue = this.iconClass;
        this._ch5Properties.set("iconClass", value, () => {
            this.handleIconClass(prevValue);
        });
    }
    get iconClass() {
        return this._ch5Properties.get("iconClass");
    }
    set iconUrl(value) {
        this._ch5Properties.set("iconUrl", value, () => {
            this.handleIconUrl(value);
        });
    }
    get iconUrl() {
        return this._ch5Properties.get("iconUrl");
    }
    set sendEventOnClick(value) {
        this._ch5Properties.set("sendEventOnClick", value);
    }
    get sendEventOnClick() {
        return this._ch5Properties.get("sendEventOnClick");
    }
    set pressed(value) {
        this._ch5Properties.set("pressed", value, () => {
            this.handlePressed();
        });
    }
    get pressed() {
        return this._ch5Properties.get("pressed");
    }
    constructor(parentDpad, isDisabledOrHidden = false) {
        super();
        this._isDisabledOrHiddenButton = false;
        this.PRESSED_CSS_CLASS_SUFFIX = '--pressed';
        this.LABEL_CLASS = 'dpad-btn-label';
        this.primaryCssClass = '';
        this.COMPONENT_NAME = "";
        this.componentPrefix = 'ch5-dpad-button-';
        this.CSS_CLASS_LIST = {
            commonBtnClass: 'ch5-dpad-child',
            primaryIconClass: 'fas',
            imageClassName: 'image-url',
            primaryTagClass: '',
            defaultIconClass: '',
            defaultArrowClass: ''
        };
        this._icon = {};
        this.buttonType = null;
        this._pressable = null;
        this._isPressedSubscription = null;
        this._repeatDigitalInterval = null;
        this.logger.start('constructor()', this.COMPONENT_NAME);
        this._isDisabledOrHiddenButton = isDisabledOrHidden;
        if (!_.isNil(parentDpad)) {
            this._parentDpad = parentDpad;
        }
        else {
            this._parentDpad = this.getParentDpad();
        }
        this.ignoreAttributes = ["show", "disabled", "receivestateenable", "receivestateshow", "receivestateshowpulse", "receivestatehidepulse", "receivestatecustomclass", "receivestatecustomstyle", "sendeventonshow"];
        this._ch5Properties = new Ch5Properties(this, Ch5DpadButtonBase.COMPONENT_PROPERTIES);
        ComponentHelper.clearComponentContent(this);
        this.logger.stop();
    }
    initializeParams(defaultIconClass, defaultArrowClass, btnType) {
        this.buttonType = btnType;
        this.COMPONENT_NAME = this.componentPrefix + btnType;
        this.CSS_CLASS_LIST.primaryTagClass = btnType;
        this.CSS_CLASS_LIST.defaultIconClass = defaultIconClass;
        if (Ch5Common.isNotNil(defaultArrowClass)) {
            this.CSS_CLASS_LIST.defaultArrowClass = defaultArrowClass;
        }
        this.primaryCssClass = this.componentPrefix + btnType;
        if (this.getDisabledOrHiddenDpadCenterButton() === false) {
            this.updatePressedClass(this.primaryCssClass + this.PRESSED_CSS_CLASS_SUFFIX);
        }
    }
    getParentDpad() {
        const getTheMatchingParent = (node) => {
            var _a;
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-DPAD") {
                return getTheMatchingParent((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
    getDisabledOrHiddenDpadCenterButton() {
        if (this._isDisabledOrHiddenButton === false && this.key === "center") {
            if (this._parentDpad.hideCenterButton === true || this._parentDpad.disableCenterButton === true) {
                this.setDisabledOrHidden(true);
            }
        }
        return this._isDisabledOrHiddenButton;
    }
    setDisabledOrHidden(disabledOrHiddenValue) {
        var _a;
        this._isDisabledOrHiddenButton = disabledOrHiddenValue;
        if (this._isDisabledOrHiddenButton === true) {
            this.pressed = false;
            if (null !== this._pressable) {
                this._pressable.destroy();
            }
            this._unsubscribeFromPressableIsPressed();
            this._pressable = null;
        }
        else {
            if (_.isNil(this._pressable)) {
                this._pressable = new Ch5Pressable(this, {
                    cssTargetElement: this.getTargetElementForCssClassesAndStyle(),
                    cssPressedClass: this.primaryCssClass + this.PRESSED_CSS_CLASS_SUFFIX,
                    enableSwipe: this._parentDpad.swipeGestureEnabled
                });
                (_a = this._pressable) === null || _a === void 0 ? void 0 : _a.init();
            }
            if (this._isPressedSubscription === null) {
                this._subscribeToPressableIsPressed();
            }
        }
    }
    updateSwipeGesture() {
        if (this._pressable !== null && !_.isNil(this._pressable.options)) {
            this._pressable.options.enableSwipe = this._parentDpad.swipeGestureEnabled;
        }
    }
    connectedCallback() {
        this.logger.start('connectedCallback() - start', this.COMPONENT_NAME);
        if (!this.parentElement || (this.parentElement && this.parentElement.nodeName.toLowerCase() === 'ch5-dpad')) {
            return;
        }
        if (this.parentElement && this.parentElement.parentElement && !(this.parentElement.parentElement instanceof Ch5Dpad)) {
            throw new Error(`Invalid parent element for ch5-dpad-button. 
            Please ensure the parent tag is ch5-dpad, and other mandatory sibling 
            elements are available too.`);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        this.createElementsAndInitialize();
        if (!_.isNil(this._pressable) && this.getDisabledOrHiddenDpadCenterButton() === false) {
            this._pressable.init();
            this._subscribeToPressableIsPressed();
        }
        this.initAttributes();
        customElements.whenDefined('ch5-dpad-button').then(() => {
            this.initCommonMutationObserver(this);
        });
        this.logger.stop();
    }
    createIconTag() {
        if (this._icon.classList === undefined || this._icon.classList.length <= 0) {
            this._icon = document.createElement('span');
        }
    }
    createElementsAndInitialize() {
        if (!this._wasInstatiated) {
            this.createIconTag();
        }
        this.initAttributes();
        if (!this._wasInstatiated) {
            this.createHtmlElements();
            this._wasInstatiated = true;
        }
        this.attachEventListeners();
        this.updateCssClasses();
    }
    createHtmlElements() {
        this.logger.start('createHtmlElements', this.COMPONENT_NAME);
        if (Ch5Common.isNotNil(this.primaryCssClass)) {
            this.classList.add(this.primaryCssClass);
        }
        this.classList.add(this.CSS_CLASS_LIST.commonBtnClass);
        if (Ch5Common.isNotNil(this.CSS_CLASS_LIST.primaryTagClass)) {
            this.classList.add(this.CSS_CLASS_LIST.primaryTagClass);
        }
        if (Ch5Common.isNotNil(this.CSS_CLASS_LIST.defaultArrowClass)) {
            this.classList.add(this.CSS_CLASS_LIST.defaultArrowClass);
        }
        if (this.iconUrl.length > 0) {
            this._icon = this.getImageContainer(this.iconUrl);
            this._icon.style.backgroundImage = `url(${this.iconUrl})`;
        }
        else if (this.iconClass) {
            this._icon = this.getIconContainer();
            this._icon.classList.add(...(this.iconClass.split(' ').filter(element => element)));
        }
        else if (this.label.length > 0 && this.key === 'center') {
            this._icon = this.getLabelContainer(this.LABEL_CLASS);
            this._icon.innerHTML = this.label;
        }
        else {
            this._icon = this.getIconContainer();
            this._icon.classList.add(this.CSS_CLASS_LIST.primaryIconClass);
            if (Ch5Common.isNotNil(this.CSS_CLASS_LIST.defaultIconClass)) {
                this._icon.classList.add(this.CSS_CLASS_LIST.defaultIconClass);
            }
        }
        if (this._icon.parentElement !== this) {
            this.appendChild(this._icon);
        }
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback() - start', this.COMPONENT_NAME);
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
        this.logger.stop();
    }
    removeEventListeners() {
        this.logger.start('removeEventListeners() - start', this.COMPONENT_NAME);
        super.removeEventListeners();
        this._unsubscribeFromPressableIsPressed();
        if (null !== this._pressable) {
            this._pressable.destroy();
        }
        this.logger.stop();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5DpadButtonBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5DpadButtonBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5DpadButtonBase.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.COMPONENT_NAME);
        this.logger.log('ch5-dpad-button key=' + this.key + ' attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        if (oldValue !== newValue) {
            attr = attr.toLowerCase();
            const attributeChangedProperty = Ch5DpadButtonBase.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    initAttributes() {
        var _a, _b;
        this.logger.start("initAttributes", this.COMPONENT_NAME);
        super.initAttributes();
        ComponentHelper.setAttributeToElement(this, 'role', Ch5RoleAttributeMapping.ch5DpadChild);
        const thisRef = this;
        for (let i = 0; i < Ch5DpadButtonBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5DpadButtonBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5DpadButtonBase.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5DpadButtonBase.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        const btnType = this.buttonType;
        this.logger.log("btnType", btnType);
        if (this.parentElement &&
            this.parentElement.parentElement) {
            const ele = this.parentElement.parentElement;
            const parentContractName = (_a = ComponentHelper.getAttributeAsString(ele, 'contractname', '')) === null || _a === void 0 ? void 0 : _a.trim();
            const parentContractEvent = (_b = ComponentHelper.getAttributeAsString(ele, 'sendeventonclickstart', '')) === null || _b === void 0 ? void 0 : _b.trim();
            if (parentContractName.length > 0) {
                this.sendEventOnClick = parentContractName + "." + CH5DpadUtils.contractSuffix[btnType];
            }
            else if (parentContractName.length <= 0 && parentContractEvent.length > 0) {
                this.sendEventOnClick = (parseInt(parentContractEvent, 10) + CH5DpadUtils.sendEventOnClickSigCountToAdd[btnType]).toString();
            }
            else {
                this.sendEventOnClick = "";
            }
        }
        if (this.hasAttribute('pressed')) {
            if (this._pressable) {
                this._pressable.setPressed(this.toBoolean((this.hasAttribute('pressed') && this.getAttribute('pressed') !== "false"), false));
            }
        }
        this.logger.stop();
    }
    attachEventListeners() {
        var _a;
        super.attachEventListeners();
        if (!_.isNil(this._pressable) && this.getDisabledOrHiddenDpadCenterButton() === false) {
            (_a = this._pressable) === null || _a === void 0 ? void 0 : _a.init();
            this._subscribeToPressableIsPressed();
        }
    }
    updateCssClasses() {
        super.updateCssClasses();
    }
    updatePressedClass(pressedClass) {
        this._pressable = new Ch5Pressable(this, {
            cssTargetElement: this.getTargetElementForCssClassesAndStyle(),
            cssPressedClass: pressedClass,
            enableSwipe: this._parentDpad.swipeGestureEnabled
        });
    }
    handleLabel() {
        if (this._icon.innerHTML !== undefined) {
            this._icon.classList.remove('dpad-btn-icon', 'fas', Ch5DpadButtonBase.DEFAULT_ICONS.center);
            this._icon.classList.add("dpad-btn-label");
            this._icon.innerHTML = this.label;
        }
    }
    handleKey() {
        this.createIconTag();
        this.initializeParams(Ch5DpadButtonBase.DEFAULT_ICONS[this.key], this.key === 'center' ? '' : 'direction-btn', this.key);
    }
    handleIconClass(prevValue) {
        this.createIconTag();
        if (this.iconUrl.length < 1) {
            if (this.iconClass.length > 0) {
                this._icon.classList.remove(this.CSS_CLASS_LIST.primaryIconClass);
                if (this.CSS_CLASS_LIST.defaultIconClass) {
                    this._icon.classList.remove(this.CSS_CLASS_LIST.defaultIconClass);
                }
                this._icon.classList.remove(...(prevValue.split(' ').filter(element => element)));
                this._icon.classList.add(...(this.iconClass.split(' ').filter(element => element)));
            }
            else {
                this._icon.classList.remove(...(prevValue.split(' ').filter(element => element)));
                this._icon.classList.add(this.CSS_CLASS_LIST.primaryIconClass);
                if (Ch5Common.isNotNil(this.CSS_CLASS_LIST.defaultIconClass)) {
                    this._icon.classList.add(this.CSS_CLASS_LIST.defaultIconClass);
                }
            }
        }
    }
    handleIconUrl(value) {
        this.createIconTag();
        if (this.iconUrl.length > 0) {
            this._icon.classList.add(this.CSS_CLASS_LIST.imageClassName);
            this._icon.style.backgroundImage = `url(${value})`;
        }
        else {
            this._icon.classList.remove(this.CSS_CLASS_LIST.imageClassName);
        }
    }
    handlePressed() {
        var _a, _b, _c;
        const stateDisabledHidden = this.getDisabledOrHiddenDpadCenterButton();
        if (stateDisabledHidden === false) {
            this.setDisabledOrHidden(stateDisabledHidden);
            if (((_a = this._pressable) === null || _a === void 0 ? void 0 : _a._pressed) !== this.pressed) {
                (_b = this._pressable) === null || _b === void 0 ? void 0 : _b.setPressed(this.pressed);
            }
        }
        else {
            (_c = this._pressable) === null || _c === void 0 ? void 0 : _c.setPressed(false);
            this.setDisabledOrHidden(stateDisabledHidden);
        }
    }
    _subscribeToPressableIsPressed() {
        if (this._isPressedSubscription === null && this._pressable !== null) {
            const REPEAT_DIGITAL_PERIOD = 200;
            const MAX_REPEAT_DIGITALS = 30000 / REPEAT_DIGITAL_PERIOD;
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                this.logger.log(`Ch5DpadButton.pressableSubscriptionCb(${value})`);
                if (value === false) {
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    this.sendValueForRepeatDigitalWorking(false);
                }
                else {
                    this.sendValueForRepeatDigitalWorking(true);
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    let numRepeatDigitals = 0;
                    this._repeatDigitalInterval = window.setInterval(() => {
                        this.sendValueForRepeatDigitalWorking(true);
                        if (++numRepeatDigitals >= MAX_REPEAT_DIGITALS) {
                            console.warn("Ch5DpadButton MAXIMUM Repeat digitals sent");
                            window.clearInterval(this._repeatDigitalInterval);
                            this.pressed = false;
                        }
                    }, REPEAT_DIGITAL_PERIOD);
                }
            });
        }
    }
    sendValueForRepeatDigitalWorking(value) {
        this.logger.log(`Ch5Button.sendValueForRepeatDigital(${value})`);
        if (Ch5Common.isNotNil(this.sendEventOnClick)) {
            const clickSignal = Ch5SignalFactory.getInstance().getObjectAsBooleanSignal(this.sendEventOnClick);
            if (clickSignal && clickSignal.name) {
                clickSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
                return;
            }
        }
    }
    _unsubscribeFromPressableIsPressed() {
        if (this._repeatDigitalInterval !== null) {
            window.clearInterval(this._repeatDigitalInterval);
        }
        if (this._isPressedSubscription !== null) {
            this._isPressedSubscription.unsubscribe();
            this._isPressedSubscription = null;
        }
    }
    getIconContainer() {
        const outputElement = document.createElement('span');
        outputElement.classList.add('dpad-btn-icon');
        outputElement.classList.add('fas');
        return outputElement;
    }
    getLabelContainer(labelClassName) {
        const outputElement = document.createElement('span');
        outputElement.classList.add(labelClassName);
        return outputElement;
    }
    getImageContainer(imageUrl) {
        const outputElement = document.createElement('span');
        outputElement.classList.add('dpad-btn-icon');
        outputElement.classList.add('image-url');
        outputElement.setAttribute('data-img-url', imageUrl);
        return outputElement;
    }
}
Ch5DpadButtonBase.DEFAULT_ICONS = {
    up: 'fa-caret-up',
    down: 'fa-caret-down',
    left: 'fa-caret-left',
    right: 'fa-caret-right',
    center: 'fa-circle'
};
Ch5DpadButtonBase.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "key",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "iconClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "iconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "label",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "pressed",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnClick",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    }
];
Ch5DpadButtonBase.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWRwYWQtYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtZHBhZC9jaDUtZHBhZC1idXR0b24tYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUtoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFNBQVM7SUEyRy9DLElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQVcsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQVcsR0FBRyxDQUFDLEtBQThCO1FBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUEwQixLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNuRSxJQUFJLENBQUMs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