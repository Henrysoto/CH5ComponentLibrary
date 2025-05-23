import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5SegmentedGauge extends Ch5Common {
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set gaugeLedStyle(value) {
        this._ch5Properties.set("gaugeLedStyle", value, () => {
            this.handleGaugeLedStyle();
        });
    }
    get gaugeLedStyle() {
        return this._ch5Properties.get("gaugeLedStyle");
    }
    set primaryStateGraphic(value) {
        this._ch5Properties.set("primaryStateGraphic", value, () => {
            this.setValueForSegments();
        });
    }
    get primaryStateGraphic() {
        return this._ch5Properties.get("primaryStateGraphic");
    }
    set secondaryStateGraphic(value) {
        this._ch5Properties.set("secondaryStateGraphic", value, () => {
            this.setValueForSegments();
        });
    }
    get secondaryStateGraphic() {
        return this._ch5Properties.get("secondaryStateGraphic");
    }
    set tertiaryStateGraphic(value) {
        this._ch5Properties.set("tertiaryStateGraphic", value, () => {
            this.setValueForSegments();
        });
    }
    get tertiaryStateGraphic() {
        return this._ch5Properties.get("tertiaryStateGraphic");
    }
    set minValue(value) {
        this._ch5Properties.set("minValue", value, () => {
            if (value >= this.maxValue) {
                this.minValue = this.defaultMinValue;
            }
            this.setValueForSegments();
        });
    }
    get minValue() {
        return this._ch5Properties.get("minValue");
    }
    set maxValue(value) {
        this._ch5Properties.set("maxValue", value, () => {
            if (value <= this.minValue) {
                this.maxValue = this.defaultMaxValue;
            }
            this.setValueForSegments();
        });
    }
    get maxValue() {
        return this._ch5Properties.get("maxValue");
    }
    set numberOfSegments(value) {
        this._ch5Properties.set("numberOfSegments", value, () => {
            this.handleNumberOfSegments();
        });
    }
    get numberOfSegments() {
        return this._ch5Properties.get("numberOfSegments");
    }
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            if (value < this.minValue) {
                this.value = this.minValue;
            }
            else if (value > this.maxValue) {
                this.value = this.maxValue;
            }
            this._cleanValue = this.value;
            this.setValueForSegments();
        });
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    set touchSettable(value) {
        this._ch5Properties.set("touchSettable", value);
    }
    get touchSettable() {
        return this._ch5Properties.get("touchSettable");
    }
    set sendEventOnClick(value) {
        this._ch5Properties.set("sendEventOnClick", value);
    }
    get sendEventOnClick() {
        return this._ch5Properties.get('sendEventOnClick');
    }
    set sendEventOnChange(value) {
        this._ch5Properties.set("sendEventOnChange", value);
    }
    get sendEventOnChange() {
        return this._ch5Properties.get('sendEventOnChange');
    }
    set receiveStateValue(value) {
        this._ch5Properties.set("receiveStateValue", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("value", newValue, () => {
                this._cleanValue = this.value;
                this.setValueForSegments();
            });
        });
    }
    get receiveStateValue() {
        return this._ch5Properties.get('receiveStateValue');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SegmentedGauge.ELEMENT_NAME, Ch5SegmentedGauge.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5SegmentedGauge.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5SegmentedGauge.ELEMENT_NAME, Ch5SegmentedGauge);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-segmented-gauge';
        this._elContainer = {};
        this.defaultMaxValue = 65535;
        this.defaultMinValue = 0;
        this.mouseDown = false;
        this.mouseDragEnd = false;
        this.mouseLeave = true;
        this.eventHandler = { "mouseover": [], "mouseup": [], "dragend": [] };
        this._dirtyValue = 0;
        this._cleanValue = 0;
        this.debounceSignalHandling = this.debounce(() => {
            this.handleSendEventOnChange();
            this.setDirtyHandler();
        }, 50);
        this.handleDebounceSignal = this.debounce((idx) => {
            this.handleIndexValue(idx);
        }, 30);
        this.setDirtyHandler = this.debounce(() => {
            if (this._dirtyValue !== this._cleanValue) {
                this.value = this._cleanValue;
                this.setValueForSegments();
            }
        }, 500);
        this.ignoreAttributes = ["receivestatecustomclass", "receivestatecustomstyle", "receivestateshowpulse", "receivestatehidepulse", "sendeventonshow"];
        this.logger.start('constructor()', Ch5SegmentedGauge.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5SegmentedGauge.COMPONENT_PROPERTIES);
        this.initCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SegmentedGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SegmentedGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SegmentedGauge.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-segmented-gauge attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5SegmentedGauge.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5SegmentedGauge.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5SegmentedGauge);
        }
        if (this._elContainer !== this) {
            this.appendChild(this._elContainer);
        }
        this.handleTouchSettable = this.handleTouchSettable.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchMoveEvent = this.handleTouchMoveEvent.bind(this);
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.handleNumberOfSegments();
        customElements.whenDefined('ch5-segmented-gauge').then(() => {
            this.componentLoadedEvent(Ch5SegmentedGauge.ELEMENT_NAME, this.id);
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5SegmentedGauge.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SegmentedGauge.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SegmentedGauge.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SegmentedGauge.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._elContainer.addEventListener('click', this.handleTouchSettable);
        this._elContainer.addEventListener("mousedown", this.handleMouseDown);
        this._elContainer.addEventListener("mouseleave", this.handleMouseLeave);
        this._elContainer.addEventListener("touchstart", this.handleTouchStart);
        this._elContainer.addEventListener("touchmove", this.handleTouchMove);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elContainer.removeEventListener('click', this.handleTouchSettable);
        this._elContainer.removeEventListener("mousedown", this.handleMouseDown);
        this._elContainer.removeEventListener("mouseleave", this.handleMouseLeave);
        this._elContainer.removeEventListener("touchstart", this.handleTouchStart);
        this._elContainer.removeEventListener("touchmove", this.handleTouchMove);
        Array.from(this._elContainer.children).forEach((segments, i) => {
            segments.removeEventListener("mouseover", this.eventHandler.mouseover[i]);
            segments.removeEventListener("mouseup", this.eventHandler.mouseup[i]);
            segments.removeEventListener("touchmove", this.handleTouchMoveEvent);
            segments.removeEventListener("dragend", this.eventHandler.dragend[i]);
        });
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
    handleOrientation() {
        Array.from(Ch5SegmentedGauge.COMPONENT_DATA.ORIENTATION.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
    }
    handleGaugeLedStyle() {
        Array.from(Ch5SegmentedGauge.COMPONENT_DATA.GAUGE_LED_STYLE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.GAUGE_LED_STYLE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.GAUGE_LED_STYLE.classListPrefix + this.gaugeLedStyle);
    }
    handleNumberOfSegments() {
        Array.from(this._elContainer.querySelectorAll(".ch5-segmented-gauge-segment")).forEach((childEle) => childEle.remove());
        for (let i = 0; i <= this.numberOfSegments; i++) {
            const segments = document.createElement('div');
            segments.classList.add(this.primaryCssClass + "-segment");
            this._elContainer.appendChild(segments);
            if (i === 0) {
                segments.classList.add("ch5-segmented-gauge--segment--state-graphic-hidden");
            }
            this.eventHandler.mouseover.push(this.handleMouseOverEvent.bind(this, i));
            this.eventHandler.mouseup.push(this.handleMouseUpEvent.bind(this, i));
            this.eventHandler.dragend.push(this.handleDragEndEvent.bind(this, i));
            segments.addEventListener("mouseover", this.eventHandler.mouseover[i]);
            segments.addEventListener("mouseup", this.eventHandler.mouseup[i]);
            segments.addEventListener("touchmove", this.handleTouchMoveEvent);
            segments.addEventListener("dragend", this.eventHandler.dragend[i]);
        }
        this.setValueForSegments();
    }
    handleMouseOverEvent(idx) {
        if (this.mouseDragEnd === true && this.mouseLeave === true) {
            this.handleDebounceSignal(idx);
            this.mouseDragEnd = false;
            this.mouseDown = false;
        }
        else if (this.mouseDown === true) {
            this.handleDebounceSignal(idx);
        }
    }
    handleMouseUpEvent(idx) {
        if (this.mouseDown === true) {
            this.mouseDown = false;
            this.handleDebounceSignal(idx);
        }
    }
    handleTouchMoveEvent(event) {
        var _a;
        if (this.mouseDown === true) {
            const element = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);
            if (element === null || element === void 0 ? void 0 : element.classList.contains(this.primaryCssClass + "-segment")) {
                const index = Array.prototype.indexOf.call((_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.children, element);
                this.handleIndexValue(index);
            }
        }
    }
    handleDragEndEvent(idx, e) {
        this.mouseDragEnd = true;
        this.handleDebounceSignal(idx);
    }
    handleIndexValue(idx) {
        if (this.touchSettable === false) {
            return;
        }
        const segments = this._elContainer.querySelectorAll(".ch5-segmented-gauge-segment");
        for (let i = 0; i < segments.length - 1; i++) {
            if (idx > i) {
                segments[i + 1].classList.add("active");
            }
            else {
                segments[i + 1].classList.remove("active");
            }
        }
        this._dirtyValue = Math.round(((((idx / this.numberOfSegments) * 100) * (this.maxValue - this.minValue)) / 100) + this.minValue);
        this.debounceSignalHandling();
    }
    handleMouseDown() {
        this.mouseDown = true;
        this.mouseLeave = true;
    }
    handleMouseLeave() {
        this.mouseDown = false;
        this.mouseLeave = false;
    }
    handleTouchStart() {
        this.mouseDown = true;
        this.mouseLeave = true;
    }
    handleTouchMove(e) {
        const element = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
        if ((element === null || element === void 0 ? void 0 : element.classList.contains("ch5-segmented-gauge")) || (element === null || element === void 0 ? void 0 : element.classList.contains("ch5-segmented-gauge-segment"))) {
        }
        else {
            this.mouseDown = false;
            this.mouseLeave = false;
        }
    }
    handleTouchSettable(e) {
        if (this.touchSettable === true) {
            this.handleSendEventOnClick();
        }
    }
    handleSendEventOnClick() {
        var _a, _b;
        if (this.sendEventOnClick) {
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _a === void 0 ? void 0 : _a.publish(true);
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _b === void 0 ? void 0 : _b.publish(false);
        }
    }
    handleSendEventOnChange() {
        var _a;
        if (this.sendEventOnChange) {
            (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventOnChange)) === null || _a === void 0 ? void 0 : _a.publish(this._dirtyValue);
        }
    }
    setValueForSegments() {
        const segmentChildren = this._elContainer.querySelectorAll(".ch5-segmented-gauge-segment");
        const segmentBars = Math.round(((this.value - this.minValue) * this.numberOfSegments) / (this.maxValue - this.minValue));
        const primarySegments = Math.round((60 * this.numberOfSegments) / 100);
        const secondarySegments = Math.round((25 * this.numberOfSegments) / 100);
        const tertiarySegments = 100 - primarySegments - secondarySegments;
        for (let i = 0; i < segmentChildren.length - 1; i++) {
            if (i < this.numberOfSegments && i < primarySegments) {
                segmentChildren[i + 1].classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.PRIMARY_STATE_GRAPHIC.classListPrefix + this.primaryStateGraphic);
            }
            else if (i < this.numberOfSegments && i < primarySegments + secondarySegments) {
                segmentChildren[i + 1].classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.SECONDARY_STATE_GRAPHIC.classListPrefix + this.secondaryStateGraphic);
            }
            else if (i < this.numberOfSegments && i < primarySegments + secondarySegments + tertiarySegments) {
                segmentChildren[i + 1].classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.TERTIARY_STATE_GRAPHIC.classListPrefix + this.tertiaryStateGraphic);
            }
            if (i < segmentBars) {
                segmentChildren[i + 1].classList.add("active");
            }
            else {
                segmentChildren[i + 1].classList.remove("active");
            }
        }
    }
    initCssClass() {
        this.logger.start('initCssClass');
        this._elContainer.classList.add(this.primaryCssClass);
        this._elContainer.classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._elContainer.classList.add(Ch5SegmentedGauge.ELEMENT_NAME + Ch5SegmentedGauge.COMPONENT_DATA.GAUGE_LED_STYLE.classListPrefix + this.gaugeLedStyle);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SegmentedGauge.ORIENTATION = ['horizontal', 'vertical'];
Ch5SegmentedGauge.GAUGE_LED_STYLE = ['rectangle', 'circle'];
Ch5SegmentedGauge.STATE_GRAPHIC = ['green', 'yellow', 'red', 'blue', 'orange', 'white', 'inactive'];
Ch5SegmentedGauge.COMPONENT_DATA = {
    ORIENTATION: {
        default: Ch5SegmentedGauge.ORIENTATION[0],
        values: Ch5SegmentedGauge.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    },
    GAUGE_LED_STYLE: {
        default: Ch5SegmentedGauge.GAUGE_LED_STYLE[0],
        values: Ch5SegmentedGauge.GAUGE_LED_STYLE,
        key: 'gaugeLedStyle',
        attribute: 'gaugeLedStyle',
        classListPrefix: '--gauge-led-style-'
    },
    PRIMARY_STATE_GRAPHIC: {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[0],
        values: Ch5SegmentedGauge.STATE_GRAPHIC,
        key: 'primaryStateGraphic',
        attribute: 'primaryStateGraphic',
        classListPrefix: '--segment-state-graphic-'
    },
    SECONDARY_STATE_GRAPHIC: {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[1],
        values: Ch5SegmentedGauge.STATE_GRAPHIC,
        key: 'secondaryStateGraphic',
        attribute: 'secondaryStateGraphic',
        classListPrefix: '--segment-state-graphic-'
    },
    TERTIARY_STATE_GRAPHIC: {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[2],
        values: Ch5SegmentedGauge.STATE_GRAPHIC,
        key: 'tertiaryStateGraphic',
        attribute: 'tertiaryStateGraphic',
        classListPrefix: '--segment-state-graphic-'
    }
};
Ch5SegmentedGauge.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonchange: { direction: "event", numericJoin: 1, contractName: true }, receivestatevalue: { direction: "state", numericJoin: 1, contractName: true } });
Ch5SegmentedGauge.COMPONENT_PROPERTIES = [
    {
        default: Ch5SegmentedGauge.ORIENTATION[0],
        enumeratedValues: Ch5SegmentedGauge.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SegmentedGauge.ORIENTATION[0],
        isObservableProperty: true
    },
    {
        default: Ch5SegmentedGauge.GAUGE_LED_STYLE[0],
        enumeratedValues: Ch5SegmentedGauge.GAUGE_LED_STYLE,
        name: "gaugeLedStyle",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SegmentedGauge.GAUGE_LED_STYLE[0],
        isObservableProperty: true
    },
    {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[0],
        enumeratedValues: Ch5SegmentedGauge.STATE_GRAPHIC,
        name: "primaryStateGraphic",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SegmentedGauge.STATE_GRAPHIC[0],
        isObservableProperty: true
    },
    {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[1],
        enumeratedValues: Ch5SegmentedGauge.STATE_GRAPHIC,
        name: "secondaryStateGraphic",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SegmentedGauge.STATE_GRAPHIC[1],
        isObservableProperty: true
    },
    {
        default: Ch5SegmentedGauge.STATE_GRAPHIC[2],
        enumeratedValues: Ch5SegmentedGauge.STATE_GRAPHIC,
        name: "tertiaryStateGraphic",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SegmentedGauge.STATE_GRAPHIC[2],
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
        default: 20,
        name: "numberOfSegments",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 20,
        numberProperties: {
            min: 1,
            max: 50,
            conditionalMin: 1,
            conditionalMax: 50,
            conditionalMinValue: 1,
            conditionalMaxValue: 50
        },
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
        default: true,
        name: "touchSettable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnClick",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnChange",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
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
    }
];
Ch5SegmentedGauge.ELEMENT_NAME = 'ch5-segmented-gauge';
Ch5SegmentedGauge.registerCustomElement();
Ch5SegmentedGauge.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNlZ21lbnRlZC1nYXVnZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1zZWdtZW50ZWQtZ2F1Z2UvY2g1LXNlZ21lbnRlZC1nYXVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUczRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsU0FBUztJQThPOUMsSUFBVyxXQUFXLENBQUMsS0FBb0M7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQWdDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2hGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFnQyxhQUFhLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsSUFBVyxhQUFhLENBQUMsS0FBc0M7UUFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQWtDLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsYUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFrQyxlQUFlLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsSUFBVyxtQkFBbUIs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