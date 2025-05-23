import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { subscribeInViewPortChange, unSubscribeInViewPortChange } from '../ch5-core';
export class Ch5SignalLevelGauge extends Ch5Common {
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set minValue(value) {
        this._ch5Properties.set("minValue", value, () => {
            if (value >= this.maxValue) {
                this.minValue = 0;
            }
            this.handleValue();
        });
    }
    get minValue() {
        return this._ch5Properties.get("minValue");
    }
    set maxValue(value) {
        this._ch5Properties.set("maxValue", value, () => {
            if (value <= this.minValue) {
                this.maxValue = 65535;
            }
            this.handleValue();
        });
    }
    get maxValue() {
        return this._ch5Properties.get("maxValue");
    }
    set numberOfBars(value) {
        this._ch5Properties.set("numberOfBars", value, () => {
            this.handleNumberOfBars();
        });
    }
    get numberOfBars() {
        return this._ch5Properties.get("numberOfBars");
    }
    set signalBarSpacing(value) {
        this._ch5Properties.set("signalBarSpacing", value, () => {
            this._elContainer.style.gap = this.signalBarSpacing + 'px';
        });
    }
    get signalBarSpacing() {
        return this._ch5Properties.get("signalBarSpacing");
    }
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            if (value < this.minValue) {
                this.value = this.minValue;
            }
            else if (value > this.maxValue) {
                this.value = this.maxValue;
            }
            this.handleValue();
        });
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    set receiveStateValue(value) {
        this._ch5Properties.set("receiveStateValue", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("value", newValue, () => {
                this.handleValue();
            });
        });
    }
    get receiveStateValue() {
        return this._ch5Properties.get('receiveStateValue');
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.handleSize();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SignalLevelGauge.ELEMENT_NAME, Ch5SignalLevelGauge.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5SignalLevelGauge.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5SignalLevelGauge.ELEMENT_NAME, Ch5SignalLevelGauge);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-signal-level-gauge';
        this._resizeObserver = null;
        this._elContainer = {};
        this.ignoreAttributes = ["receivestatecustomclass", "receivestatecustomstyle", "receivestatehidepulse", "receivestateshowpulse", "sendeventonshow"];
        this.logger.start('constructor()', Ch5SignalLevelGauge.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._resizeObserverCallBack = this._resizeObserverCallBack.bind(this);
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5SignalLevelGauge.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SignalLevelGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SignalLevelGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SignalLevelGauge.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-signal-level-gauge attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5SignalLevelGauge.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5SignalLevelGauge.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5SignalLevelGauge);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.handleNumberOfBars();
        this._elContainer.style.gap = this.signalBarSpacing + 'px';
        customElements.whenDefined('ch5-signal-level-gauge').then(() => {
            this.componentLoadedEvent(Ch5SignalLevelGauge.ELEMENT_NAME, this.id);
        });
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort) {
                this.handleNumberOfBars();
            }
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        unSubscribeInViewPortChange(this);
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this._elContainer = document.createElement('div');
        this._elContainer.classList.add('ch5-signal-level-gauge');
        this.appendChild(this._elContainer);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5SignalLevelGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SignalLevelGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SignalLevelGauge.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SignalLevelGauge.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        this.updateCssClass();
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._resizeObserver = new ResizeObserver(this._resizeObserverCallBack);
        this._resizeObserver.observe(this._elContainer);
    }
    removeEventListeners() {
        var _a;
        super.removeEventListeners();
        (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this._elContainer);
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    _resizeObserverCallBack() {
        this.handleNumberOfBars();
    }
    handleOrientation() {
        Array.from(Ch5SignalLevelGauge.COMPONENT_DATA.ORIENTATION.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this.handleNumberOfBars();
    }
    handleValue() {
        this._elContainer.querySelectorAll('.ch5-signal-level-gauge--selected-bar-color').forEach((ele) => ele.classList.remove('ch5-signal-level-gauge--selected-bar-color'));
        const currBar = Math.floor(((this.value - this.minValue) * this.numberOfBars) / (this.maxValue - this.minValue));
        Array.from(this._elContainer.children).forEach((ele, i) => {
            if (i < currBar && i < this.numberOfBars) {
                ele.classList.add(this.primaryCssClass + '--selected-bar-color');
                ele.classList.remove(this.primaryCssClass + '--bar-color');
            }
            else {
                ele.classList.remove(this.primaryCssClass + '--selected-bar-color');
                ele.classList.add(this.primaryCssClass + '--bar-color');
            }
        });
    }
    handleNumberOfBars() {
        Array.from(this._elContainer.children).forEach((ele) => ele.remove());
        const heightBar = this._elContainer.offsetHeight / this.numberOfBars;
        const widthBar = this._elContainer.offsetWidth / this.numberOfBars;
        for (let i = 1; i <= this.numberOfBars; i++) {
            const bar = document.createElement("div");
            bar.classList.add('ch5-signal-level-gauge--bar-color');
            bar.style.height = this.orientation === 'horizontal' ? (heightBar * i) + 'px' : heightBar + 'px';
            bar.style.width = this.orientation === 'horizontal' ? widthBar + 'px' : (widthBar * i) + 'px';
            this._elContainer.appendChild(bar);
        }
        this.handleValue();
    }
    handleSize() {
        Array.from(Ch5SignalLevelGauge.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this.handleNumberOfBars();
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._elContainer.classList.add(Ch5SignalLevelGauge.ELEMENT_NAME + Ch5SignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this._elContainer.style.gap = this.signalBarSpacing + 'px';
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SignalLevelGauge.ORIENTATION = ['horizontal', 'vertical'];
Ch5SignalLevelGauge.SIZE = ['regular', 'small', 'large', 'x-large'];
Ch5SignalLevelGauge.COMPONENT_DATA = {
    ORIENTATION: {
        default: Ch5SignalLevelGauge.ORIENTATION[0],
        values: Ch5SignalLevelGauge.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    },
    SIZE: {
        default: Ch5SignalLevelGauge.SIZE[0],
        values: Ch5SignalLevelGauge.SIZE,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    }
};
Ch5SignalLevelGauge.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", numericJoin: 1, contractName: true } });
Ch5SignalLevelGauge.COMPONENT_PROPERTIES = [
    {
        default: Ch5SignalLevelGauge.ORIENTATION[0],
        enumeratedValues: Ch5SignalLevelGauge.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SignalLevelGauge.ORIENTATION[0],
        isObservableProperty: true
    },
    {
        default: 0,
        name: "value",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateValue",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 65535,
            conditionalMin: 0,
            conditionalMax: 65535,
            conditionalMinValue: 0,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "minValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 0,
        numberProperties: {
            min: 0,
            max: 65534,
            conditionalMin: 0,
            conditionalMax: 65534,
            conditionalMinValue: 0,
            conditionalMaxValue: 65534
        },
        isObservableProperty: true
    },
    {
        default: 65535,
        name: "maxValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 65535,
        numberProperties: {
            min: 1,
            max: 65535,
            conditionalMin: 1,
            conditionalMax: 65535,
            conditionalMinValue: 1,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: 6,
        name: "numberOfBars",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 6,
        numberProperties: {
            min: 1,
            max: 15,
            conditionalMin: 1,
            conditionalMax: 15,
            conditionalMinValue: 1,
            conditionalMaxValue: 15
        },
        isObservableProperty: true
    },
    {
        default: 1,
        name: "signalBarSpacing",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 1,
        numberProperties: {
            min: 0,
            max: 6,
            conditionalMin: 0,
            conditionalMax: 6,
            conditionalMinValue: 0,
            conditionalMaxValue: 6
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValue",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5SignalLevelGauge.SIZE[0],
        enumeratedValues: Ch5SignalLevelGauge.SIZE,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SignalLevelGauge.SIZE[0],
        isObservableProperty: true
    },
];
Ch5SignalLevelGauge.ELEMENT_NAME = 'ch5-signal-level-gauge';
Ch5SignalLevelGauge.registerCustomElement();
Ch5SignalLevelGauge.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1sZXZlbC1nYXVnZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1zaWduYWwtbGV2ZWwtZ2F1Z2UvY2g1LXNpZ25hbC1sZXZlbC1nYXVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFNBQVM7SUF5SmhELElBQVcsV0FBVyxDQUFDLEtBQXNDO1FBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFrQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNsRixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBa0MsYUFBYSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDdEQsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDbkI7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lB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