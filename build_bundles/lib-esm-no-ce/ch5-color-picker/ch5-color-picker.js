import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import Ch5ColorUtils from "../ch5-common/utils/ch5-color-utils";
import { ColorPicker } from "./color-picker";
export class Ch5ColorPicker extends Ch5Common {
    set maxValue(value) {
        this._ch5Properties.set("maxValue", value);
    }
    get maxValue() {
        return this._ch5Properties.get("maxValue");
    }
    set receiveStateRedValue(value) {
        this._ch5Properties.set("receiveStateRedValue", value, null, (newValue) => {
            if (newValue <= this.maxValue) {
                this.redValuePrevious = this.redValue;
                this.redValue = Ch5ColorUtils.getDigitalValue(newValue, this.maxValue);
                this.setColor();
            }
        });
    }
    get receiveStateRedValue() {
        return this._ch5Properties.get('receiveStateRedValue');
    }
    set receiveStateGreenValue(value) {
        this._ch5Properties.set("receiveStateGreenValue", value, null, (newValue) => {
            if (newValue <= this.maxValue) {
                this.greenValuePrevious = this.greenValue;
                this.greenValue = Ch5ColorUtils.getDigitalValue(newValue, this.maxValue);
                this.setColor();
            }
        });
    }
    get receiveStateGreenValue() {
        return this._ch5Properties.get('receiveStateGreenValue');
    }
    set receiveStateBlueValue(value) {
        this._ch5Properties.set("receiveStateBlueValue", value, null, (newValue) => {
            if (newValue <= this.maxValue) {
                this.blueValuePrevious = this.blueValue;
                this.blueValue = Ch5ColorUtils.getDigitalValue(newValue, this.maxValue);
                this.setColor();
            }
        });
    }
    get receiveStateBlueValue() {
        return this._ch5Properties.get('receiveStateBlueValue');
    }
    set sendEventColorRedOnChange(value) {
        this._ch5Properties.set("sendEventColorRedOnChange", value);
    }
    get sendEventColorRedOnChange() {
        return this._ch5Properties.get('sendEventColorRedOnChange');
    }
    set sendEventColorGreenOnChange(value) {
        this._ch5Properties.set("sendEventColorGreenOnChange", value);
    }
    get sendEventColorGreenOnChange() {
        return this._ch5Properties.get('sendEventColorGreenOnChange');
    }
    set sendEventColorBlueOnChange(value) {
        this._ch5Properties.set("sendEventColorBlueOnChange", value);
    }
    get sendEventColorBlueOnChange() {
        return this._ch5Properties.get('sendEventColorBlueOnChange');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5ColorPicker.ELEMENT_NAME, Ch5ColorPicker.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ColorPicker.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ColorPicker.ELEMENT_NAME, Ch5ColorPicker);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-color-picker';
        this._elContainer = {};
        this._elColorPicker = {};
        this.redValue = 0;
        this.greenValue = 0;
        this.blueValue = 0;
        this.redValuePrevious = 0;
        this.greenValuePrevious = 0;
        this.blueValuePrevious = 0;
        this.pickerId = "";
        this.colorPicker = null;
        this._colorChangedSubscription = null;
        this.COLOR_BLACK = "#000000";
        this._dirty = false;
        this.isSendReceiveSignalEqual = false;
        this.sendingValue = false;
        this.receiveingValue = false;
        this._cleanValue = this.COLOR_BLACK;
        this.debounceSendSignals = this.debounce(() => {
            this.handleSendSignals();
            this.debounceSetColor();
        }, 100);
        this.debounceSetColor = this.debounce(() => {
            if (this.colorPicker && !((this.sendingValue && this.receiveingValue && this.isSendReceiveSignalEqual) || this.sendingValue)) {
                if (this.colorPicker.picker.get().css() !== Ch5ColorUtils.hexToRgb(this._cleanValue)) {
                    this.colorPicker.setColor(this._cleanValue);
                }
            }
            this.receiveingValue = false;
        }, 1500);
        this.logger.start('constructor()', Ch5ColorPicker.ELEMENT_NAME);
        this.ignoreAttributes = ["receivestatecustomclass", "receivestatecustomstyle", "receivestatehidepulse", "receivestateshowpulse", "sendeventonshow"];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5ColorPicker.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5ColorPicker.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ColorPicker.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5ColorPicker.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-color-picker attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5ColorPicker.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5ColorPicker.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5ColorPicker);
        }
        this._elContainer.classList.add('ch5-color-picker');
        if (this._elContainer.parentElement !== this) {
            this._elColorPicker = document.createElement('div');
            this.pickerId = this.getCrId();
            this._elColorPicker.setAttribute("id", this.pickerId);
            this._elContainer.appendChild(this._elColorPicker);
            this.appendChild(this._elContainer);
        }
        this.colorPicker = new ColorPicker(this.pickerId, this._cleanValue);
        this._colorChangedSubscription = this.colorPicker.colorChanged.subscribe((value) => {
            if (value.length > 0 && this.colorPicker) {
                if (this.redValuePrevious !== value[0] || this.greenValuePrevious !== value[1] || this.blueValuePrevious !== value[2]) {
                    this.redValue = value[0];
                    this.greenValue = value[1];
                    this.blueValue = value[2];
                    this.debounceSendSignals();
                    this._dirty = true;
                    if (this.isSendReceiveSignalEqual) {
                        this._cleanValue = Ch5ColorUtils.rgbToHex(this.redValue, this.greenValue, this.blueValue);
                        ;
                    }
                }
            }
        });
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        customElements.whenDefined('ch5-color-picker').then(() => {
            this.componentLoadedEvent(Ch5ColorPicker.ELEMENT_NAME, this.id);
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()', Ch5ColorPicker.ELEMENT_NAME);
        this._elColorPicker.replaceChildren();
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        if (this._colorChangedSubscription !== null) {
            this._colorChangedSubscription.unsubscribe();
            this._colorChangedSubscription = null;
        }
        this.logger.stop();
    }
    setColor() {
        this.receiveingValue = true;
        if (this.redValuePrevious === this.redValue && this.greenValuePrevious === this.greenValue && this.blueValuePrevious === this.blueValue && this._dirty === true) {
            this.isSendReceiveSignalEqual = true;
        }
        const color = Ch5ColorUtils.rgbToHex(this.redValue, this.greenValue, this.blueValue);
        this._cleanValue = color;
        if (this.colorPicker) {
            if ((this.colorPicker.picker.get().css() !== Ch5ColorUtils.hexToRgb(color))) {
                this.debounceSetColor();
            }
        }
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5ColorPicker.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ColorPicker.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ColorPicker.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ColorPicker.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
    }
    removeEventListeners() {
        super.removeEventListeners();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    handleSendSignals() {
        var _a, _b, _c;
        this.sendingValue = true;
        if (this.colorPicker) {
            const colorValue = Ch5ColorUtils.rgbFormat(this.colorPicker.picker.get().css());
            this.redValue = Number(colorValue[0]);
            this.greenValue = Number(colorValue[1]);
            this.blueValue = Number(colorValue[2]);
        }
        if (this.sendEventColorRedOnChange !== "" && this.redValue !== this.redValuePrevious) {
            (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventColorRedOnChange)) === null || _a === void 0 ? void 0 : _a.publish(Ch5ColorUtils.getAnalogValue(this.redValue, this.maxValue));
        }
        if (this.sendEventColorGreenOnChange !== "" && this.greenValue !== this.greenValuePrevious) {
            (_b = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventColorGreenOnChange)) === null || _b === void 0 ? void 0 : _b.publish(Ch5ColorUtils.getAnalogValue(this.greenValue, this.maxValue));
        }
        if (this.sendEventColorBlueOnChange !== "" && this.blueValue !== this.blueValuePrevious) {
            (_c = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventColorBlueOnChange)) === null || _c === void 0 ? void 0 : _c.publish(Ch5ColorUtils.getAnalogValue(this.blueValue, this.maxValue));
        }
        if (!this.receiveingValue) {
            this.sendingValue = false;
        }
    }
}
Ch5ColorPicker.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateredvalue: { direction: "state", numericJoin: 1, contractName: true }, receivestategreenvalue: { direction: "state", numericJoin: 1, contractName: true }, receivestatebluevalue: { direction: "state", numericJoin: 1, contractName: true }, sendeventcolorredonchange: { direction: "event", numericJoin: 1, contractName: true }, sendeventcolorgreenonchange: { direction: "event", numericJoin: 1, contractName: true }, sendeventcolorblueonchange: { direction: "event", numericJoin: 1, contractName: true } });
Ch5ColorPicker.COMPONENT_PROPERTIES = [
    {
        default: 255,
        name: "maxValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 255,
        numberProperties: {
            min: 50,
            max: 65535,
            conditionalMin: 50,
            conditionalMax: 65535,
            conditionalMinValue: 50,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateRedValue",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateGreenValue",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateBlueValue",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventColorRedOnChange",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventColorGreenOnChange",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventColorBlueOnChange",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
];
Ch5ColorPicker.ELEMENT_NAME = 'ch5-color-picker';
Ch5ColorPicker.registerCustomElement();
Ch5ColorPicker.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbG9yLXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb2xvci1waWNrZXIvY2g1LWNvbG9yLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBRW5JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLGFBQWEsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsTUFBTSxPQUFPLGNBQWUsU0FBUSxTQUFTO0lBcUkzQyxJQUFXLFFBQVEsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsVUFBVSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELElBQVcsb0JBQW9CLENBQUMsS0FBYTtRQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1lBQ2hGLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUMs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