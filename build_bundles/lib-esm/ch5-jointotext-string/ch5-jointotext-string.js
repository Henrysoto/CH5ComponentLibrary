import { Ch5Common } from "../ch5-common/ch5-common";
import { isNil } from 'lodash';
import { Ch5Signal, Ch5SignalFactory } from "..";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
export class Ch5JoinToTextString extends Ch5Common {
    constructor() {
        super(...arguments);
        this._receiveStateValue = '';
        this._textWhenEmpty = '';
        this._value = '';
        this._subReceiveStateValue = '';
    }
    set textWhenEmpty(value) {
        if (this._textWhenEmpty !== value) {
            if (isNil(value)) {
                value = "";
            }
            this._textWhenEmpty = value;
            this.setAttribute('textWhenEmpty', value);
        }
        this.setTextContent();
    }
    get textWhenEmpty() {
        return this._textWhenEmpty;
    }
    set receiveStateValue(value) {
        if (this._receiveStateValue !== value) {
            if (isNil(value)) {
                return;
            }
            if (this.receiveStateValue !== ''
                && this.receiveStateValue !== undefined
                && this.receiveStateValue !== null) {
                const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
                const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldSigName);
                if (oldSignal !== null) {
                    oldSignal.unsubscribe(this._subReceiveStateValue);
                }
            }
            this._receiveStateValue = value;
            this.setAttribute('receivestatevalue', value);
            const sigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
            const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(sigName);
            if (receiveSignal === null) {
                return;
            }
            this._subReceiveStateValue = receiveSignal.subscribe((newValue) => {
                if (newValue !== this.value) {
                    this.setAttribute('value', newValue + '');
                }
            });
        }
    }
    get receiveStateValue() {
        return this._receiveStateValue;
    }
    set value(value) {
        if (this._value !== value) {
            if (isNil(value)) {
                value = "";
            }
            this._value = value;
            this.setAttribute('value', value + '');
        }
        this.setTextContent();
    }
    get value() {
        return this._value;
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5JoinToTextString.ELEMENT_NAME, Ch5JoinToTextString.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5JoinToTextString.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5JoinToTextString.ELEMENT_NAME, Ch5JoinToTextString);
        }
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [
            'value',
            'textwhenempty',
            'receivestatevalue'
        ];
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    connectedCallback() {
        this.initAttributes();
        customElements.whenDefined(Ch5JoinToTextString.ELEMENT_NAME).then(() => {
            this.setTextContent();
        });
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('textwhenempty')) {
            this.textWhenEmpty = this.getAttribute('textwhenempty');
        }
        else {
            this.textWhenEmpty = '';
        }
        if (this.hasAttribute('value')) {
            this.value = this.getAttribute('value');
        }
        else {
            this.value = '';
        }
        if (this.hasAttribute('receivestatevalue')) {
            this.receiveStateValue = this.getAttribute('receivestatevalue');
        }
    }
    disconnectedCallback() {
        const oldSigName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
        const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(this._subReceiveStateValue);
            this._receiveStateValue = "";
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        const attrValue = attr.toLowerCase();
        switch (attrValue) {
            case 'value':
                this.value = newValue;
                break;
            case 'textwhenempty':
                this.textWhenEmpty = newValue;
                break;
            case 'receivestatevalue':
                this.receiveStateValue = newValue;
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    setTextContent() {
        if (!this.value || this.value === "") {
            this.textContent = this._getTranslatedValue('textWhenEmpty', this.textWhenEmpty);
            return;
        }
        this.textContent = this._getTranslatedValue('value', this.value);
    }
}
Ch5JoinToTextString.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", stringJoin: 1, contractName: true } });
Ch5JoinToTextString.ELEMENT_NAME = 'ch5-jointotext-string';
Ch5JoinToTextString.registerCustomElement();
Ch5JoinToTextString.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWpvaW50b3RleHQtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWpvaW50b3RleHQtc3RyaW5nL2NoNS1qb2ludG90ZXh0LXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ2pELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUduSSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBUztJQUFsRDs7UUFVUyx1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFDaEMsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQiwwQkFBcUIsR0FBVyxFQUFFLENBQUM7SUEyTDVDLENBQUM7SUFyTEEsSUFBVyxhQUFhLENBQUMsS0FBYTtRQUNyQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO1lBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ1g7WUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBVyxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3pDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLEtBQUssRUFBRTtZQUN0QyxJQUFJ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