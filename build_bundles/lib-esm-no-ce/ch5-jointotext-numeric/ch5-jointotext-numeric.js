import { Ch5Common } from "../ch5-common/ch5-common";
import { isNil } from 'lodash';
import { NumericFormatFactory } from "./format/numeric-format-factory";
import { Ch5Signal, Ch5SignalFactory } from "..";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import _ from "lodash";
export class Ch5JoinToTextNumeric extends Ch5Common {
    set receiveStateValue(value) {
        if (isNil(value)) {
            return;
        }
        if (this.receiveStateValue !== ''
            && this.receiveStateValue !== undefined
            && this.receiveStateValue !== null) {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
            const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveStateValue);
            }
        }
        this._receiveStateValue = value;
        this.setAttribute('receivestatevalue', value);
        const sigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(sigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveStateValue = receiveSignal.subscribe((newValue) => {
            if (newValue !== parseFloat(this.value)) {
                this.setAttribute('value', newValue + '');
            }
        });
    }
    get receiveStateValue() {
        return this._receiveStateValue;
    }
    set value(value) {
        if (this._value !== value) {
            if (_.isNil(value)) {
                value = '';
            }
            this._value = value;
            this.setAttribute('value', value);
            this.formatValue();
        }
    }
    get value() {
        return this._value;
    }
    set type(value) {
        if (this._type !== value) {
            if (_.isNil(value)) {
                value = Ch5JoinToTextNumeric.NUMERIC_FORMAT_TYPES[0];
            }
            else {
                if (Ch5JoinToTextNumeric.NUMERIC_FORMAT_TYPES.indexOf(value) < 0) {
                    value = Ch5JoinToTextNumeric.NUMERIC_FORMAT_TYPES[0];
                }
            }
            this._type = value;
            this.setAttribute('type', value);
            this._currentNumericFormat = this._numericFormatFactory.getFormat(value);
            this.formatValue();
        }
    }
    get type() {
        return this._type;
    }
    set decimalLength(value) {
        if (this._decimalLength !== value) {
            const parseFloatValue = Number(value);
            if (isNaN(parseFloatValue) || _.isNil(parseFloatValue)) {
                this._decimalLength = 0;
            }
            else {
                if (parseFloatValue > 5) {
                    this._decimalLength = 5;
                }
                else {
                    this._decimalLength = parseFloatValue;
                }
            }
            this.setAttribute('decimalLength', this._decimalLength + '');
            this.formatValue();
        }
    }
    get decimalLength() {
        return this._decimalLength;
    }
    set length(value) {
        if (this._length !== value) {
            const parseFloatValue = Number(value);
            if (isNaN(parseFloatValue) || _.isNil(parseFloatValue)) {
                this._length = 0;
            }
            else {
                if (parseFloatValue > 5) {
                    this._length = 5;
                }
                else {
                    this._length = parseFloatValue;
                }
            }
            this.setAttribute('length', this._length + '');
            this.formatValue();
        }
    }
    get length() {
        return this._length;
    }
    set min(value) {
        if (this._min !== value) {
            if (isNil(value)) {
                this._min = 0;
                if (this.type === "percentage") {
                    this.setAttribute('min', value + '');
                    this.formatValue();
                }
                return;
            }
            this._min = value;
            this.setAttribute('min', value + '');
            this.formatValue();
        }
    }
    get min() {
        return this._min;
    }
    set max(value) {
        if (this._max !== value) {
            if (isNil(value)) {
                this._max = Ch5JoinToTextNumeric.PERCENTAGE_MAX;
                if (this.type === "percentage") {
                    this.setAttribute('max', value);
                    this.formatValue();
                }
                return;
            }
            this._max = value;
            this.setAttribute('max', value + '');
            this.formatValue();
        }
    }
    get max() {
        return this._max;
    }
    set formattedValue(value) {
        if (this._formattedValue !== value) {
            this._formattedValue = value;
            this.textContent = value + '';
        }
    }
    get formattedValue() {
        return this._formattedValue;
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5JoinToTextNumeric.ELEMENT_NAME, Ch5JoinToTextNumeric.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5JoinToTextNumeric.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5JoinToTextNumeric.ELEMENT_NAME, Ch5JoinToTextNumeric);
        }
    }
    constructor() {
        super();
        this._receiveStateValue = '';
        this._subReceiveStateValue = '';
        this._value = '';
        this._decimalLength = 0;
        this._length = 0;
        this._min = 0;
        this._max = Ch5JoinToTextNumeric.PERCENTAGE_MAX;
        this._formattedValue = null;
        this._type = 'signed';
        this._numericFormatFactory = NumericFormatFactory.getInstance();
        this.formatValue = this.debounce(() => {
            this.formatValueDebounce();
        }, 30);
        this._currentNumericFormat = this._numericFormatFactory.getFormat(this.type);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [
            'receivestatevalue',
            'value',
            'type',
            'length',
            'decimallength',
            'min',
            'max',
        ];
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (attr) {
            case 'value':
                this.value = newValue;
                break;
            case 'receivestatevalue':
                this.receiveStateValue = newValue;
                break;
            case 'type':
                this.type = newValue;
                break;
            case 'decimallength':
                this.decimalLength = parseFloat(newValue);
                break;
            case 'length':
                this.length = parseFloat(newValue);
                break;
            case 'min':
                this.min = parseFloat(newValue);
                break;
            case 'max':
                this.max = parseFloat(newValue);
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    connectedCallback() {
        this.initAttributes();
        customElements.whenDefined(Ch5JoinToTextNumeric.ELEMENT_NAME).then(() => {
            this.formatValue();
        });
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('value')) {
            this.value = this.getAttribute('value') + '';
        }
        if (this.hasAttribute('receivestatevalue')) {
            this.receiveStateValue = this.getAttribute('receivestatevalue') + '';
        }
        if (this.hasAttribute('type')) {
            this.type = this.getAttribute('type');
        }
    }
    disconnectedCallback() {
        const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
        const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(this._subReceiveStateValue);
            this._receiveStateValue = "";
        }
    }
    formatValueDebounce() {
        this.formattedValue = this._currentNumericFormat.format(Number(this.value), {
            decimalLength: this.decimalLength,
            length: this.length,
            min: this.min,
            max: this.max,
        });
    }
}
Ch5JoinToTextNumeric.PERCENTAGE_MAX = 65535;
Ch5JoinToTextNumeric.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", numericJoin: 1, contractName: true } });
Ch5JoinToTextNumeric.ELEMENT_NAME = 'ch5-jointotext-numeric';
Ch5JoinToTextNumeric.NUMERIC_FORMAT_TYPES = ['signed', 'float', 'percentage', 'hex', 'raw', 'unsigned', 'time'];
Ch5JoinToTextNumeric.registerCustomElement();
Ch5JoinToTextNumeric.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWpvaW50b3RleHQtbnVtZXJpYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1qb2ludG90ZXh0LW51bWVyaWMvY2g1LWpvaW50b3RleHQtbnVtZXJpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUV0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ2pELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUVuSSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHdkIsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFNBQVM7SUF3Q2xELElBQVcsaUJBQWlCLENBQUMsS0FBYTtRQUN6QyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixPQUFPO1NBQ1A7UUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxFQUFFO2VBQzdCLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO2VBQ3BDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQ2pDO1lBQ0QsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sU0FBUyxHQUE2QixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkcsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN2QixTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0Q7UUFFRCxJQUFJLENBQUMsa0JBQWtCLEdB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