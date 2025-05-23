import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { subscribeInViewPortChange } from "../ch5-core/utility-functions/subscribe-in-view-port-change";
import { resizeObserver } from "../ch5-core/resize-observer";
export class Ch5WifiSignalLevelGauge extends Ch5Common {
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            if (this.value < this.minValue) {
                this.value = this.minValue;
            }
            else if (this.value > this.maxValue) {
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
    set gaugeStyle(value) {
        this._ch5Properties.set("gaugeStyle", value, () => {
            this.handleGaugeStyle();
        });
    }
    get gaugeStyle() {
        return this._ch5Properties.get("gaugeStyle");
    }
    set alignment(value) {
        this._ch5Properties.set("alignment", value, () => {
            this.handleAlignment();
        });
    }
    get alignment() {
        return this._ch5Properties.get("alignment");
    }
    set minValue(value) {
        this._ch5Properties.set("minValue", value, () => {
            if (this.minValue >= this.maxValue) {
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
            if (this.maxValue <= this.minValue) {
                this.maxValue = 100;
            }
            this.handleValue();
        });
    }
    get maxValue() {
        return this._ch5Properties.get("maxValue");
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
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5WifiSignalLevelGauge.ELEMENT_NAME, Ch5WifiSignalLevelGauge.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5WifiSignalLevelGauge.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5WifiSignalLevelGauge.ELEMENT_NAME, Ch5WifiSignalLevelGauge);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-wifi-signal-level-gauge';
        this._elContainer = {};
        this._elInnerContainer = {};
        this._elTopSignal = {};
        this._elMiddleSignal = {};
        this._elBottomSignal = {};
        this.ignoreAttributes = ["receivestatecustomclass", "receivestatecustomstyle", "receivestatehidepulse", "receivestateshowpulse", "sendeventonshow"];
        this.logger.start('constructor()', Ch5WifiSignalLevelGauge.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES);
        this.initCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-wifi-signal-level-gauge attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5WifiSignalLevelGauge.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5WifiSignalLevelGauge);
        }
        if (this._elContainer.parentElement !== this) {
            this.appendChild(this._elContainer);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.handleValue();
        customElements.whenDefined('ch5-wifi-signal-level-gauge').then(() => {
            this.componentLoadedEvent(Ch5WifiSignalLevelGauge.ELEMENT_NAME, this.id);
        });
        resizeObserver(this._elContainer, this.setContainerBorderWidth.bind(this));
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort) {
                this.setContainerBorderWidth();
            }
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    setContainerBorderWidth() {
        let containerWidth = this.offsetWidth;
        let containerHeight = this.offsetHeight;
        if (this.alignment === "left" || this.alignment === "right") {
            containerWidth = this.offsetHeight;
            containerHeight = this.offsetWidth;
        }
        this._elTopSignal.style.borderWidth = Math.floor(containerWidth / 6) + 'px';
        this._elMiddleSignal.style.borderWidth = Math.floor(containerWidth / 6) + 'px';
        this._elBottomSignal.style.borderWidth = Math.floor(containerHeight / 3) + 'px';
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._elInnerContainer = document.createElement('div');
        this._elTopSignal = document.createElement('div');
        this._elMiddleSignal = document.createElement('div');
        this._elBottomSignal = document.createElement('div');
        this._elContainer.classList.add("ch5-wifi-signal-level-gauge");
        this._elInnerContainer.classList.add("ch5-wifi-signal-level-gauge--inner-container");
        this._elTopSignal.classList.add("ch5-wifi-signal-level-gauge-top-signal");
        this._elMiddleSignal.classList.add("ch5-wifi-signal-level-gauge-middle-signal");
        this._elBottomSignal.classList.add("ch5-wifi-signal-level-gauge-bottom-signal");
        this._elTopSignal.classList.add("ch5-wifi-signal-level-gauge--selected-false");
        this._elMiddleSignal.classList.add("ch5-wifi-signal-level-gauge--selected-false");
        this._elBottomSignal.classList.add("ch5-wifi-signal-level-gauge--selected-false");
        this._elInnerContainer.appendChild(this._elTopSignal);
        this._elInnerContainer.appendChild(this._elMiddleSignal);
        this._elInnerContainer.appendChild(this._elBottomSignal);
        this._elContainer.appendChild(this._elInnerContainer);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
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
    handleGaugeStyle() {
        Array.from(Ch5WifiSignalLevelGauge.COMPONENT_DATA.GAUGE_STYLE.values).forEach((gaugeStyle) => {
            this._elContainer.classList.remove(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.GAUGE_STYLE.classListPrefix + gaugeStyle);
        });
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.GAUGE_STYLE.classListPrefix + this.gaugeStyle);
    }
    handleAlignment() {
        Array.from(Ch5WifiSignalLevelGauge.COMPONENT_DATA.ALIGNMENT.values).forEach((alignment) => {
            this._elContainer.classList.remove(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.ALIGNMENT.classListPrefix + alignment);
        });
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.ALIGNMENT.classListPrefix + this.alignment);
    }
    handleValue() {
        let currBar = Math.round(((this.value - this.minValue) * Ch5WifiSignalLevelGauge.MAX_NUMBER_OF_BARS) / (this.maxValue - this.minValue));
        if (currBar > Ch5WifiSignalLevelGauge.MAX_NUMBER_OF_BARS) {
            currBar = Ch5WifiSignalLevelGauge.MAX_NUMBER_OF_BARS;
        }
        else if (currBar < Ch5WifiSignalLevelGauge.MIN_NUMBER_OF_BARS) {
            currBar = Ch5WifiSignalLevelGauge.MIN_NUMBER_OF_BARS;
        }
        if (currBar === 0) {
            this.setClassForWifiBasedOnValue(this._elTopSignal, false);
            this.setClassForWifiBasedOnValue(this._elMiddleSignal, false);
            this.setClassForWifiBasedOnValue(this._elBottomSignal, false);
        }
        else if (currBar === 1) {
            this.setClassForWifiBasedOnValue(this._elTopSignal, false);
            this.setClassForWifiBasedOnValue(this._elMiddleSignal, false);
            this.setClassForWifiBasedOnValue(this._elBottomSignal, true);
        }
        else if (currBar === 2) {
            this.setClassForWifiBasedOnValue(this._elTopSignal, false);
            this.setClassForWifiBasedOnValue(this._elMiddleSignal, true);
            this.setClassForWifiBasedOnValue(this._elBottomSignal, true);
        }
        else if (currBar === 3) {
            this.setClassForWifiBasedOnValue(this._elTopSignal, true);
            this.setClassForWifiBasedOnValue(this._elMiddleSignal, true);
            this.setClassForWifiBasedOnValue(this._elBottomSignal, true);
        }
    }
    setClassForWifiBasedOnValue(container, selected) {
        if (!container.classList.contains("ch5-wifi-signal-level-gauge--selected-" + String(selected))) {
            container.classList.remove("ch5-wifi-signal-level-gauge--selected-" + String(!selected));
            container.classList.add("ch5-wifi-signal-level-gauge--selected-" + String(selected));
        }
    }
    handleSize() {
        Array.from(Ch5WifiSignalLevelGauge.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + this.size);
    }
    initCssClass() {
        this.logger.start('initCssClass');
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.GAUGE_STYLE.classListPrefix + this.gaugeStyle);
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.ALIGNMENT.classListPrefix + this.alignment);
        this._elContainer.classList.add(Ch5WifiSignalLevelGauge.ELEMENT_NAME + Ch5WifiSignalLevelGauge.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5WifiSignalLevelGauge.MIN_NUMBER_OF_BARS = 0;
Ch5WifiSignalLevelGauge.MAX_NUMBER_OF_BARS = 3;
Ch5WifiSignalLevelGauge.GAUGE_STYLES = ['light', 'accents', 'dark'];
Ch5WifiSignalLevelGauge.ALIGNMENTS = ['up', 'down', 'left', 'right'];
Ch5WifiSignalLevelGauge.SIZES = ['regular', 'small', 'large', 'x-large'];
Ch5WifiSignalLevelGauge.COMPONENT_DATA = {
    GAUGE_STYLE: {
        default: Ch5WifiSignalLevelGauge.GAUGE_STYLES[0],
        values: Ch5WifiSignalLevelGauge.GAUGE_STYLES,
        key: 'gaugeStyle',
        attribute: 'gaugeStyle',
        classListPrefix: '--gauge-style-'
    },
    ALIGNMENT: {
        default: Ch5WifiSignalLevelGauge.ALIGNMENTS[0],
        values: Ch5WifiSignalLevelGauge.ALIGNMENTS,
        key: 'alignment',
        attribute: 'alignment',
        classListPrefix: '--alignment-'
    },
    SIZE: {
        default: Ch5WifiSignalLevelGauge.SIZES[0],
        values: Ch5WifiSignalLevelGauge.SIZES,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    }
};
Ch5WifiSignalLevelGauge.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", numericJoin: 1, contractName: true } });
Ch5WifiSignalLevelGauge.COMPONENT_PROPERTIES = [
    {
        default: 0,
        name: "value",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateValue",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 100,
            conditionalMin: 0,
            conditionalMax: 100,
            conditionalMinValue: 0,
            conditionalMaxValue: 100
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
        default: Ch5WifiSignalLevelGauge.GAUGE_STYLES[0],
        enumeratedValues: Ch5WifiSignalLevelGauge.GAUGE_STYLES,
        name: "gaugeStyle",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5WifiSignalLevelGauge.GAUGE_STYLES[0],
        isObservableProperty: true
    },
    {
        default: Ch5WifiSignalLevelGauge.ALIGNMENTS[0],
        enumeratedValues: Ch5WifiSignalLevelGauge.ALIGNMENTS,
        name: "alignment",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5WifiSignalLevelGauge.ALIGNMENTS[0],
        isObservableProperty: true
    },
    {
        default: 0,
        name: "minValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 99,
            conditionalMin: 0,
            conditionalMax: 99,
            conditionalMinValue: 0,
            conditionalMaxValue: 99
        },
        isObservableProperty: true
    },
    {
        default: 100,
        name: "maxValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 1,
            max: 100,
            conditionalMin: 1,
            conditionalMax: 100,
            conditionalMinValue: 1,
            conditionalMaxValue: 100
        },
        isObservableProperty: true
    },
    {
        default: Ch5WifiSignalLevelGauge.SIZES[0],
        enumeratedValues: Ch5WifiSignalLevelGauge.SIZES,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5WifiSignalLevelGauge.SIZES[0],
        isObservableProperty: true
    }
];
Ch5WifiSignalLevelGauge.ELEMENT_NAME = 'ch5-wifi-signal-level-gauge';
Ch5WifiSignalLevelGauge.registerCustomElement();
Ch5WifiSignalLevelGauge.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXdpZmktc2lnbmFsLWxldmVsLWdhdWdlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXdpZmktc2lnbmFsLWxldmVsLWdhdWdlL2NoNS13aWZpLXNpZ25hbC1sZXZlbC1nYXVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUN4RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFNBQVM7SUErSXBELElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDbkQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxDQUFDLENBQUM7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