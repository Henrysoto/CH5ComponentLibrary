import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5JoinToTextBoolean extends Ch5Common {
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            this.toggleText();
        });
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    set textWhenTrue(value) {
        this._ch5Properties.set("textWhenTrue", value, () => {
            this.toggleText();
        });
    }
    get textWhenTrue() {
        return this._ch5Properties.get("textWhenTrue");
    }
    set textWhenFalse(value) {
        this._ch5Properties.set("textWhenFalse", value, () => {
            this.toggleText();
        });
    }
    get textWhenFalse() {
        return this._ch5Properties.get("textWhenFalse");
    }
    set receiveStateValue(value) {
        this._ch5Properties.set("receiveStateValue", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("value", newValue, () => {
                this.toggleText();
            });
        });
    }
    get receiveStateValue() {
        return this._ch5Properties.get('receiveStateValue');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5JoinToTextBoolean.ELEMENT_NAME, Ch5JoinToTextBoolean.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5JoinToTextBoolean.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5JoinToTextBoolean.ELEMENT_NAME, Ch5JoinToTextBoolean);
        }
    }
    constructor() {
        super();
        this._ch5Properties = new Ch5Properties(this, Ch5JoinToTextBoolean.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5JoinToTextBoolean.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5JoinToTextBoolean.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5JoinToTextBoolean.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    connectedCallback() {
        this.initAttributes();
        customElements.whenDefined(Ch5JoinToTextBoolean.ELEMENT_NAME).then(() => {
            this.toggleText();
        });
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5JoinToTextBoolean.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5JoinToTextBoolean.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5JoinToTextBoolean.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5JoinToTextBoolean.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    disconnectedCallback() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-jointotext-boolean attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5JoinToTextBoolean.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    toggleText() {
        if (this.value === true) {
            this.textContent = this._getTranslatedValue('textwhentrue', this.textWhenTrue);
            return;
        }
        else if (this.value === false) {
            this.textContent = this._getTranslatedValue('textwhenfalse', this.textWhenFalse);
            return;
        }
        this.textContent = '';
    }
}
Ch5JoinToTextBoolean.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", booleanJoin: 1, contractName: true } });
Ch5JoinToTextBoolean.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "value",
        nameForSignal: "receiveStateValue",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: "",
        name: "textWhenTrue",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "textWhenFalse",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValue",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
Ch5JoinToTextBoolean.ELEMENT_NAME = 'ch5-jointotext-boolean';
Ch5JoinToTextBoolean.registerCustomElement();
Ch5JoinToTextBoolean.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWpvaW50b3RleHQtYm9vbGVhbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1qb2ludG90ZXh0LWJvb2xlYW4vY2g1LWpvaW50b3RleHQtYm9vbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBQ25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUczRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsU0FBUztJQXVEbEQsSUFBVyxLQUFLLENBQUMsS0FBYztRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBVyxZQUFZLENBQUMsS0FBYTtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUMzRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxZQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsY0FBYyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDNUQsSUFBSSxDQUFDLFVB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