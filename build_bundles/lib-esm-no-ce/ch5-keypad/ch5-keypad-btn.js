import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Pressable } from "../ch5-common/ch5-pressable";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5SignalFactory } from "../ch5-core";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { CH5KeypadUtils } from './ch5-keypad-utils';
import _ from "lodash";
export class Ch5KeypadButton extends Ch5Common {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function") {
            window.customElements.define(Ch5KeypadButton.ELEMENT_NAME, Ch5KeypadButton);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5KeypadButton.ELEMENT_NAME, Ch5KeypadButton.SIGNAL_ATTRIBUTE_TYPES);
    }
    set labelMajor(value) {
        this._ch5Properties.set("labelMajor", value, () => {
            if (this.labelMajor.trim() === "") {
                this.setAttribute('labelMajor', this.getDefaultValue('labelMajor'));
            }
            this.handleIconLabelMajor();
        });
    }
    get labelMajor() {
        return this._ch5Properties.get("labelMajor");
    }
    set labelMinor(value) {
        this._ch5Properties.set("labelMinor", value, () => {
            if (this.labelMinor.trim() === "") {
                this.setAttribute('labelMinor', this.getDefaultValue('labelMinor'));
            }
        });
        this.handleLabelMinor();
    }
    get labelMinor() {
        return this._ch5Properties.get("labelMinor");
    }
    set iconClass(value) {
        this._ch5Properties.set("iconClass", value, () => {
            this.handleIconLabelMajor();
        });
    }
    get iconClass() {
        return this._ch5Properties.get("iconClass");
    }
    set sendEventOnClick(value) {
        this._ch5Properties.set("sendEventOnClick", value);
    }
    get sendEventOnClick() {
        return this._ch5Properties.get("sendEventOnClick");
    }
    set key(value) {
        this._ch5Properties.set("key", value);
    }
    get key() {
        return this._ch5Properties.get('key');
    }
    set pressed(value) {
        this._ch5Properties.set("pressed", value, () => {
            this.handlePressed();
        });
    }
    get pressed() {
        return this._ch5Properties.get("pressed");
    }
    constructor(defaultObj) {
        super();
        this.primaryCssClass = 'keypad-btn';
        this.pressedCssClassPostfix = '-pressed';
        this.labelHasIconCssClass = 'has-icon';
        this.labelMajorCssClass = 'label-major';
        this.labelMinorCssClass = 'label-minor';
        this._elButton = {};
        this._elMajorSpan = {};
        this._elMinorSpan = {};
        this._elIcon = {};
        this.defaultValue = null;
        this._pressable = null;
        this._pressableIsPressedSubscription = null;
        this.logger.start('constructor()', Ch5KeypadButton.ELEMENT_NAME);
        this.ignoreAttributes = ["show", "disabled", "receivestateenable", "receivestateshow", "receivestateshowpulse", "receivestatehidepulse", "receivestatecustomclass", "receivestatecustomstyle", "sendeventonshow"];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this.defaultValue = defaultObj;
        this._ch5Properties = new Ch5Properties(this, Ch5KeypadButton.COMPONENT_PROPERTIES);
        this.logger.stop();
    }
    initAttributes() {
        this.logger.start("initAttributes", Ch5KeypadButton.ELEMENT_NAME);
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5KeypadButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5KeypadButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5KeypadButton.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5KeypadButton.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
                else {
                    const key = Ch5KeypadButton.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getDefaultValue(key);
                }
            }
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback() - start', Ch5KeypadButton.ELEMENT_NAME);
        if (this.parentElement && this.parentElement.classList.contains('ch5-keypad') === false) {
            this.logger.stop();
            return;
        }
        if (this._elButton.parentElement !== this) {
            this.classList.add('keypad-btn');
            this.appendChild(this._elButton);
        }
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5KeypadChild);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initPressable(this.primaryCssClass + this.pressedCssClassPostfix);
        this.initAttributes();
        this.setDefaultClasses();
        this.initCommonMutationObserver(this);
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback() - start', Ch5KeypadButton.ELEMENT_NAME);
        if (null !== this._pressable) {
            this._pressable.destroy();
            this._pressable = null;
        }
        if (this._pressableIsPressedSubscription !== null) {
            this._pressableIsPressedSubscription.unsubscribe();
        }
        this._pressableIsPressedSubscription = null;
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
        this.logger.stop();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5KeypadButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5KeypadButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5KeypadButton.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", Ch5KeypadButton.ELEMENT_NAME);
        if (oldValue !== newValue) {
            this.logger.log('ch5-keypad attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5KeypadButton.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elButton = document.createElement('button');
        this._elMajorSpan = document.createElement('span');
        this._elMinorSpan = document.createElement('span');
        this._elIcon = document.createElement('span');
        this._elMajorSpan.classList.add(this.labelMajorCssClass);
        this._elMinorSpan.classList.add(this.labelMinorCssClass);
        this._elButton.appendChild(this._elMajorSpan);
        this._elButton.appendChild(this._elMinorSpan);
        this.logger.stop();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    initPressable(pressedClass) {
        var _a;
        const parent = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent) {
            return;
        }
        this._pressable = new Ch5Pressable(this, {
            cssTargetElement: this.getTargetElementForCssClassesAndStyle(),
            cssPressedClass: pressedClass,
            enableSwipe: parent.swipeGestureEnabled
        });
        if (this._pressable) {
            this._pressable.init();
            this._subscribeToPressableIsPressed();
        }
    }
    updateSwipeGesture() {
        var _a;
        const parent = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent) {
            return;
        }
        if (this._pressable !== null && !_.isNil(this._pressable.options)) {
            this._pressable.options.enableSwipe = parent.swipeGestureEnabled;
        }
    }
    handleSendEventOnClick() {
        var _a, _b;
        if (this.sendEventOnClick) {
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _a === void 0 ? void 0 : _a.publish(true);
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _b === void 0 ? void 0 : _b.publish(false);
        }
    }
    _subscribeToPressableIsPressed() {
        if (this._pressableIsPressedSubscription !== null) {
            this._pressableIsPressedSubscription.unsubscribe();
            this._pressableIsPressedSubscription = null;
        }
        if (this._pressableIsPressedSubscription === null && this._pressable !== null) {
            this._pressableIsPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                if (value === false) {
                    this.handleSendEventOnClick();
                }
            });
        }
    }
    handleIconLabelMajor() {
        if (this.iconClass.trim()) {
            this._elIcon.setAttribute('class', '');
            this.iconClass.trim().split(' ').forEach((cls) => this._elIcon.classList.add(cls));
            this._elMajorSpan.innerText = "";
            this._elMajorSpan.appendChild(this._elIcon);
            this._elMajorSpan.classList.add(this.labelHasIconCssClass);
        }
        else {
            this._elIcon.remove();
            this._elMajorSpan.innerText = this.labelMajor;
            this._elMajorSpan.classList.remove(this.labelHasIconCssClass);
        }
    }
    handleLabelMinor() {
        var _a;
        const parent = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parent) {
            if (parent.displayLabelMajorOnly === false && (!this.labelMinor || this.labelMinor.trim() === "")) {
                const getDefaultValue = this.getDefaultValue("labelMinor");
                if (getDefaultValue !== "") {
                    this.labelMinor = "&nbsp;";
                }
            }
        }
        this._elMinorSpan.innerHTML = this.labelMinor;
    }
    handlePressed() {
        if (this._pressable) {
            if (this._pressable._pressed !== this.pressed) {
                this._pressable.setPressed(this.pressed);
            }
        }
    }
    getDefaultValue(attr) {
        if (this.defaultValue) {
            const defaultVal = this.defaultValue;
            if (defaultVal.hasOwnProperty(attr)) {
                return defaultVal[attr];
            }
        }
        const key = this.getAttribute('key') || "";
        const index = CH5KeypadUtils.KEYPAD_BUTTON_KEY.findIndex((ele) => ele === key);
        if (index === -1) {
            return "";
        }
        const defaultValue = CH5KeypadUtils.KEYPAD_DEFAULT_VALUES[index];
        if (defaultValue.hasOwnProperty(attr)) {
            return defaultValue[attr];
        }
    }
    setDefaultClasses() {
        var _a;
        const key = this.getAttribute('key') || "";
        const index = CH5KeypadUtils.KEYPAD_BUTTON_KEY.findIndex((ele) => ele === key);
        if (index === -1) {
            return;
        }
        const defaultValue = CH5KeypadUtils.KEYPAD_DEFAULT_VALUES[index];
        if (defaultValue.hasOwnProperty('defaultClasses')) {
            defaultValue.defaultClasses.forEach((cls) => this.classList.add(cls));
        }
        const parent = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent) {
            return;
        }
        if (parent.hideAsteriskButton && index === 9) {
            this.classList.add('ch5-hide-vis');
        }
        if (parent.hidePoundButton && index === 11) {
            this.classList.add('ch5-hide-vis');
        }
    }
}
Ch5KeypadButton.ELEMENT_NAME = 'ch5-keypad-button';
Ch5KeypadButton.COMPONENT_PROPERTIES = [
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
        name: "labelMajor",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "labelMinor",
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
        name: "sendEventOnClick",
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
    }
];
Ch5KeypadButton.registerSignalAttributeTypes();
Ch5KeypadButton.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWtleXBhZC1idG4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUta2V5cGFkL2NoNS1rZXlwYWQtYnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBSXZGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE1BQU0sT0FBTyxlQUFnQixTQUFRLFNBQVM7SUFxRnRDLE1BQU0sQ0FBQyxxQkFBcUI7UUFDbEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2VBQzFCLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRO2VBQ3pDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDNUU7SUFDRixDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0SSxDQUFDO0lBTUQsSUFBVyxVQUFVLENBQUMsS0FBYTtRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcs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