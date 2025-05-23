import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { toFormat } from "./date-time-util";
export class Ch5DateTime extends Ch5Common {
    set display24HourFormat(value) {
        this._ch5Properties.set("display24HourFormat", value, () => {
            this.debounceRender();
        });
    }
    get display24HourFormat() {
        return this._ch5Properties.get("display24HourFormat");
    }
    set displayAmPm(value) {
        this._ch5Properties.set("displayAmPm", value, () => {
            this.debounceRender();
        });
    }
    get displayAmPm() {
        return this._ch5Properties.get("displayAmPm");
    }
    set displayTwoDigitsHour(value) {
        this._ch5Properties.set("displayTwoDigitsHour", value, () => {
            this.debounceRender();
        });
    }
    get displayTwoDigitsHour() {
        return this._ch5Properties.get("displayTwoDigitsHour");
    }
    set displaySeconds(value) {
        this._ch5Properties.set("displaySeconds", value, () => {
            this.debounceRender();
        });
    }
    get displaySeconds() {
        return this._ch5Properties.get("displaySeconds");
    }
    set styleForDate(value) {
        this._ch5Properties.set("styleForDate", value, () => {
            this.debounceRender();
        });
    }
    get styleForDate() {
        return this._ch5Properties.get("styleForDate");
    }
    set horizontalAlignment(value) {
        this._ch5Properties.set("horizontalAlignment", value, () => {
            this.updateCssClass();
        });
    }
    get horizontalAlignment() {
        return this._ch5Properties.get("horizontalAlignment");
    }
    set displayType(value) {
        this._ch5Properties.set("displayType", value, () => {
            this.debounceRender();
        });
    }
    get displayType() {
        return this._ch5Properties.get("displayType");
    }
    set timeOffsetHours(value) {
        this._ch5Properties.set("timeOffsetHours", value, () => {
            this.changeTime();
        });
    }
    get timeOffsetHours() {
        return this._ch5Properties.get("timeOffsetHours");
    }
    set receiveStateOffsetTime(value) {
        this._ch5Properties.set("receiveStateOffsetTime", value, null, (newValue) => {
            const convertedNewValue = this.convertAnalogValueBasedOnSignalResponse(newValue) / 100;
            this._ch5Properties.setForSignalResponse("timeOffsetHours", (convertedNewValue), () => {
                this.changeTime();
            });
        });
    }
    get receiveStateOffsetTime() {
        return this._ch5Properties.get('receiveStateOffsetTime');
    }
    set receiveStateDisplay24HourFormat(value) {
        this._ch5Properties.set("receiveStateDisplay24HourFormat", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("display24HourFormat", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateDisplay24HourFormat() {
        return this._ch5Properties.get('receiveStateDisplay24HourFormat');
    }
    set receiveStateDisplayAmPm(value) {
        this._ch5Properties.set("receiveStateDisplayAmPm", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("displayAmPm", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateDisplayAmPm() {
        return this._ch5Properties.get('receiveStateDisplayAmPm');
    }
    set receiveStateDisplaySeconds(value) {
        this._ch5Properties.set("receiveStateDisplaySeconds", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("displaySeconds", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateDisplaySeconds() {
        return this._ch5Properties.get('receiveStateDisplaySeconds');
    }
    set receiveStateDisplayTwoDigitsHour(value) {
        this._ch5Properties.set("receiveStateDisplayTwoDigitsHour", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("displayTwoDigitsHour", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateDisplayTwoDigitsHour() {
        return this._ch5Properties.get('receiveStateDisplayTwoDigitsHour');
    }
    set receiveStateStyleForDate(value) {
        this._ch5Properties.set("receiveStateStyleForDate", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("styleForDate", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateStyleForDate() {
        return this._ch5Properties.get('receiveStateStyleForDate');
    }
    set receiveStateDisplayType(value) {
        this._ch5Properties.set("receiveStateDisplayType", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("displayType", newValue, () => {
                this.debounceRender();
            });
        });
    }
    get receiveStateDisplayType() {
        return this._ch5Properties.get('receiveStateDisplayType');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5DateTime.ELEMENT_NAME, Ch5DateTime.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5DateTime.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5DateTime.ELEMENT_NAME, Ch5DateTime);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-datetime';
        this._elContainer = {};
        this.dateTimeId = null;
        this.componentFormat = "";
        this.debounceRender = this.debounce(() => {
            this.render();
        }, 50);
        this.logger.start('constructor()', Ch5DateTime.ELEMENT_NAME);
        this.ignoreAttributes = ["disabled", "appendClassWhenInViewPort", "sendEventOnShow", "receiveStateEnable", "receiveStateHidePulse", "receiveStateShowPulse"];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5DateTime.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5DateTime.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5DateTime.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5DateTime.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-datetime attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5DateTime.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5DateTime.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5DateTime);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-datetime');
            this.appendChild(this._elContainer);
        }
        this.initAttributes();
        this.debounceRender();
        this.updateCssClass();
        this.initCommonMutationObserver(this);
        customElements.whenDefined('ch5-datetime').then(() => {
            this.componentLoadedEvent(Ch5DateTime.ELEMENT_NAME, this.id);
            this.changeTime();
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.unsubscribeFromSignals();
        if (this.dateTimeId !== null) {
            window.clearTimeout(this.dateTimeId);
        }
        this.componentFormat = "";
        this.logger.stop();
    }
    changeTime() {
        if (this.dateTimeId !== null) {
            window.clearTimeout(this.dateTimeId);
        }
        if (this.componentFormat !== "") {
            const newDate = new Date();
            const dateInNumberFormat = this.calculateTimeOffset(newDate);
            this._elContainer.textContent = toFormat(dateInNumberFormat, this.componentFormat);
            this.dateTimeId = window.setTimeout(() => {
                this.changeTime();
            }, 1000);
        }
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
        for (let i = 0; i < Ch5DateTime.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5DateTime.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5DateTime.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5DateTime.COMPONENT_PROPERTIES[i].name;
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
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        Array.from(Ch5DateTime.HORIZONTAL_ALIGNMENT).forEach((alignment) => {
            this._elContainer.classList.remove(Ch5DateTime.ELEMENT_NAME + Ch5DateTime.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.classListPrefix + alignment);
        });
        this._elContainer.classList.add(Ch5DateTime.ELEMENT_NAME + Ch5DateTime.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.classListPrefix + this.horizontalAlignment);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    render() {
        const dateFormat = this.styleForDate.replaceAll('d', 'D').replaceAll('y', 'Y').replaceAll('_', '/');
        let timeFormat = '';
        if ([Ch5DateTime.DISPLAY_TYPE[0], Ch5DateTime.DISPLAY_TYPE[2]].includes(this.displayType)) {
            timeFormat = `H:MI`;
            if (this.display24HourFormat) {
                timeFormat = timeFormat.replace('H', 'H24');
            }
            if (this.displaySeconds) {
                timeFormat = `${timeFormat}:SS`;
            }
            if (this.displayAmPm && !this.display24HourFormat) {
                timeFormat = `${timeFormat} PP`;
            }
            if (this.displayTwoDigitsHour) {
                timeFormat = timeFormat.replace('H', 'HH');
            }
        }
        let format = '';
        if (this.displayType === 'datetime') {
            format = dateFormat + " " + timeFormat;
        }
        else if (this.displayType === 'date') {
            format = dateFormat;
        }
        else if (this.displayType === 'time') {
            format = timeFormat;
        }
        this.componentFormat = format.trim();
        this.changeTime();
    }
    calculateTimeOffset(dateValue) {
        const timeSetHours = this.timeOffsetHours;
        if (timeSetHours && timeSetHours !== 0 && timeSetHours >= -32768 && timeSetHours <= 32767) {
            const resultDate = dateValue;
            resultDate.setMinutes(resultDate.getMinutes() + Math.round((timeSetHours * 60)));
            return resultDate;
        }
        else {
            return dateValue;
        }
    }
}
Ch5DateTime.STYLE_FOR_DATE = ['MM-dd-yyyy', 'M-dd-yyyy', 'M-d-yyyy', 'MM-dd-yy', 'M-dd-yy', 'M-d-yy', 'dd_MM_yyyy', 'd_MM_yyyy', 'd_M_yyyy', 'dd_MM_yy', 'd_MM_yy', 'd_M_yy', 'd MMM yyyy', 'MMM d yyyy', 'd MMMM yyyy', 'MMMM d yyyy', 'yyyy-MM-dd', 'yyyy_MM_dd', 'MMM d, yyyy', 'yyyy MM, dd', 'yyyy MMMM, dd', 'MMMM d, yyyy'];
Ch5DateTime.HORIZONTAL_ALIGNMENT = ['center', 'left', 'right'];
Ch5DateTime.DISPLAY_TYPE = ['datetime', 'date', 'time'];
Ch5DateTime.COMPONENT_DATA = {
    STYLE_FOR_DATE: {
        default: Ch5DateTime.STYLE_FOR_DATE[0],
        values: Ch5DateTime.STYLE_FOR_DATE,
        key: 'styleForDate',
        attribute: 'styleForDate'
    },
    HORIZONTAL_ALIGNMENT: {
        default: Ch5DateTime.HORIZONTAL_ALIGNMENT[0],
        values: Ch5DateTime.HORIZONTAL_ALIGNMENT,
        key: 'horizontalAlignment',
        attribute: 'horizontalAlignment',
        classListPrefix: '--horizontal-alignment-'
    },
    DISPLAY_TYPE: {
        default: Ch5DateTime.DISPLAY_TYPE[0],
        values: Ch5DateTime.DISPLAY_TYPE,
        key: 'displayType',
        attribute: 'displayType'
    }
};
Ch5DateTime.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateoffsettime: { direction: "state", numericJoin: 1, contractName: true }, receivestatedisplay24hourformat: { direction: "state", booleanJoin: 1, contractName: true }, receivestatedisplayampm: { direction: "state", booleanJoin: 1, contractName: true }, receivestatedisplayseconds: { direction: "state", booleanJoin: 1, contractName: true }, receivestatedisplaytwodigitshour: { direction: "state", booleanJoin: 1, contractName: true }, receivestatestylefordate: { direction: "state", stringJoin: 1, contractName: true }, receivestatedisplaytype: { direction: "state", stringJoin: 1, contractName: true } });
Ch5DateTime.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "display24HourFormat",
        nameForSignal: "receiveStateDisplay24HourFormat",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: true,
        name: "displayAmPm",
        nameForSignal: "receiveStateDisplayAmPm",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "displayTwoDigitsHour",
        nameForSignal: "receiveStateDisplayTwoDigitsHour",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "displaySeconds",
        nameForSignal: "receiveStateDisplaySeconds",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: Ch5DateTime.STYLE_FOR_DATE[0],
        enumeratedValues: Ch5DateTime.STYLE_FOR_DATE,
        name: "styleForDate",
        nameForSignal: "receiveStateStyleForDate",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5DateTime.STYLE_FOR_DATE[0],
        isObservableProperty: true,
    },
    {
        default: Ch5DateTime.HORIZONTAL_ALIGNMENT[0],
        enumeratedValues: Ch5DateTime.HORIZONTAL_ALIGNMENT,
        name: "horizontalAlignment",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5DateTime.HORIZONTAL_ALIGNMENT[0],
        isObservableProperty: true,
    },
    {
        default: Ch5DateTime.DISPLAY_TYPE[0],
        enumeratedValues: Ch5DateTime.DISPLAY_TYPE,
        name: "displayType",
        nameForSignal: "receiveStateDisplayType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5DateTime.DISPLAY_TYPE[0],
        isObservableProperty: true,
    },
    {
        default: 0,
        name: "timeOffsetHours",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateOffsetTime",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: -32768,
            max: 32767,
            conditionalMin: -32768,
            conditionalMax: 32767,
            conditionalMinValue: -32768,
            conditionalMaxValue: 32767
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateOffsetTime",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisplay24HourFormat",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisplayAmPm",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisplaySeconds",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisplayTwoDigitsHour",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateStyleForDate",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisplayType",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    }
];
Ch5DateTime.ELEMENT_NAME = 'ch5-datetime';
Ch5DateTime.registerCustomElement();
Ch5DateTime.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWRhdGV0aW1lLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWRhdGV0aW1lL2NoNS1kYXRldGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsTUFBTSxPQUFPLFdBQVksU0FBUSxTQUFTO0lBbU54QyxJQUFXLG1CQUFtQixDQUFDLEtBQWM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNsRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBVyxtQkFBbUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxLQUFjO1FBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFVLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQzFELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBVyxvQkFBb0IsQ0FBQyxLQUFjO1FBQzVDLElBQUksQ0FBQyxj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