import _ from "lodash";
import { Ch5Log } from "../ch5-common/ch5-log";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
export class Ch5TabButtonIndividualButton extends Ch5Log {
    set parentComponent(value) {
        this._parentCh5TabButton = value;
    }
    get parentComponent() {
        return this._parentCh5TabButton;
    }
    set labelInnerHTML(value) {
        this._ch5Properties.set("labelInnerHTML", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get labelInnerHTML() {
        return this._ch5Properties.get("labelInnerHTML");
    }
    set iconUrl(value) {
        this._ch5Properties.set("iconUrl", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get iconUrl() {
        return this._ch5Properties.get("iconUrl");
    }
    set iconClass(value) {
        this._ch5Properties.set("iconClass", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get iconClass() {
        return this._ch5Properties.get("iconClass");
    }
    set onRelease(value) {
        this._ch5Properties.set("onRelease", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get onRelease() {
        return this._ch5Properties.get("onRelease");
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5TabButtonIndividualButton.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5TabButtonIndividualButton.ELEMENT_NAME, Ch5TabButtonIndividualButton);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-tab-button-individual-button';
        this._parentCh5TabButton = null;
        this.logger.start('constructor()');
        this._ch5Properties = new Ch5Properties(this, Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Log.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback");
        if (oldValue !== newValue) {
            this.logger.log(this.nodeName + ' attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        var _a;
        this.logger.start('connectedCallback()');
        const _parentCh5TabButton = this.getParentButton();
        if (_.isNil(_parentCh5TabButton) || ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName.toString().toUpperCase()) !== "CH5-TAB-BUTTON") {
            throw new Error(`Invalid parent element for ch5-tab-button-individual-button.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5TabButtonIndividualButton);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.parentComponent = _parentCh5TabButton;
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.logger.stop();
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-TAB-BUTTON") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
}
Ch5TabButtonIndividualButton.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "labelInnerHTML",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "iconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "iconClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "onRelease",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    }
];
Ch5TabButtonIndividualButton.ELEMENT_NAME = 'ch5-tab-button-individual-button';
Ch5TabButtonIndividualButton.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRhYi1idXR0b24taW5kaXZpZHVhbC1idXR0b24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdGFiLWJ1dHRvbi9jaDUtdGFiLWJ1dHRvbi1pbmRpdmlkdWFsLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUd2RixNQUFNLE9BQU8sNEJBQTZCLFNBQVEsTUFBTTtJQWlEdkQsSUFBVyxlQUFlLENBQUMsS0FBMEI7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBQ0QsSUFBVyxlQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFXLGNBQWMsQ0FBQyxLQUFhO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLGdCQUFnQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDN0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDN0M7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFXLE9BQU8sQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3RELElBQUksSUFBSSxDQUFDLGVB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