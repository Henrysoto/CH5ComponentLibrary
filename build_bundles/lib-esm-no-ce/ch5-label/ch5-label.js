import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5Label extends Ch5Common {
    set label(value) {
        this._ch5Properties.set("label", value, () => {
            this.handleLabel();
        });
    }
    get label() {
        return this._ch5Properties.get("label");
    }
    set labelInnerHTML(value) {
        this._ch5Properties.set("labelInnerHTML", value, () => {
            this.handleLabel();
        });
    }
    get labelInnerHTML() {
        return this._ch5Properties.get("labelInnerHTML");
    }
    set receiveStateLabel(value) {
        this._ch5Properties.set("receiveStateLabel", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("label", newValue, () => {
                this.labelRec = newValue;
                this.handleLabel();
            });
        });
    }
    get receiveStateLabel() {
        return this._ch5Properties.get('receiveStateLabel');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Label.ELEMENT_NAME, Ch5Label.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Label.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Label.ELEMENT_NAME, Ch5Label);
        }
    }
    constructor(_parent) {
        super();
        this._parent = _parent;
        this.primaryCssClass = 'ch5-label';
        this._elContainer = {};
        this.templateElement = {};
        this.parentElem = "";
        this.labelRec = "";
        this.logger.start('constructor()', Ch5Label.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        if (_parent) {
            this.parentElem = _parent;
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Label.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Label.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Label.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Label.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-label attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Label.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5Label.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
        }
        if (this._elContainer.parentElement !== this && this.parentElem === "") {
            this._elContainer.classList.add('ch5-label');
            this.appendChild(this._elContainer);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.updateCssClass();
        this.initCommonMutationObserver(this);
        this.handleLabel();
        customElements.whenDefined('ch5-label').then(() => {
            this.componentLoadedEvent(Ch5Label.ELEMENT_NAME, this.id);
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
        for (let i = 0; i < Ch5Label.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Label.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Label.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Label.COMPONENT_PROPERTIES[i].name;
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
    handleLabel() {
        if (!(this.templateElement instanceof HTMLTemplateElement)) {
            this.templateElement = this.getElementsByTagName('template')[0];
        }
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this._elContainer.innerText = '';
        if (this.receiveStateLabel !== null && this.receiveStateLabel.trim() !== "") {
            this._elContainer.innerText = this.label;
        }
        else if (Ch5Common.isNotNil(this.labelInnerHTML)) {
            this._elContainer.innerHTML = this.decodeInnerHTMLForAttribute(this.labelInnerHTML);
        }
        else if (this.templateElement instanceof HTMLTemplateElement) {
            const documentContainer = document.createElement('template');
            documentContainer.innerHTML = this.templateElement.innerHTML;
            this._elContainer.appendChild((documentContainer.content));
        }
        else {
            this._elContainer.innerText = this.label;
        }
    }
    decodeInnerHTMLForAttribute(innerHTML) {
        return innerHTML.replace('&amp;', "&")
            .replace('&lt;', "<")
            .replace('&gt;', ">")
            .replace('&quot;', '/"')
            .replace("&apos;", "/'");
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add("ch5-label");
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5Label.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatelabel: { direction: "state", stringJoin: 1, contractName: true } });
Ch5Label.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "label",
        nameForSignal: "receiveStateLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateLabel",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "labelInnerHTML",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    }
];
Ch5Label.ELEMENT_NAME = 'ch5-label';
Ch5Label.registerCustomElement();
Ch5Label.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxhYmVsL2NoNS1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUczRCxNQUFNLE9BQU8sUUFBUyxTQUFRLFNBQVM7SUFxRHRDLElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBTUosQ0FBQztJQUNELElBQVcsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQVcsY0FBYyxDQUFDLEtBQWE7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM3RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsSUFBVyxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFnQixFQUFFLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFB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