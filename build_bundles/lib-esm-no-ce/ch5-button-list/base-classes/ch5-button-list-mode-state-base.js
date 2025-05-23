import _ from "lodash";
import { Ch5Log } from "../../ch5-common/ch5-log";
import { Ch5Properties } from "../../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../../utility-models/ch5-role-attribute-mapping";
export class Ch5ButtonListModeStateBase extends Ch5Log {
    set parentComponent(value) {
        this._parentCh5ButtonList = value;
    }
    get parentComponent() {
        return this._parentCh5ButtonList;
    }
    set state(value) {
        this._ch5Properties.set("state", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get state() {
        return this._ch5Properties.get("state");
    }
    set type(value) {
        this._ch5Properties.set("type", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get type() {
        return this._ch5Properties.get("type");
    }
    set hAlignLabel(value) {
        this._ch5Properties.set("hAlignLabel", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get hAlignLabel() {
        return this._ch5Properties.get("hAlignLabel");
    }
    set vAlignLabel(value) {
        this._ch5Properties.set("vAlignLabel", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get vAlignLabel() {
        return this._ch5Properties.get("vAlignLabel");
    }
    set checkboxPosition(value) {
        this._ch5Properties.set("checkboxPosition", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get checkboxPosition() {
        return this._ch5Properties.get("checkboxPosition");
    }
    set iconPosition(value) {
        this._ch5Properties.set("iconPosition", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get iconPosition() {
        return this._ch5Properties.get("iconPosition");
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
    set customClass(value) {
        this._ch5Properties.set("customClass", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get customClass() {
        return this._ch5Properties.get("customClass");
    }
    set customStyle(value) {
        this._ch5Properties.set("customStyle", value, () => {
            if (this.parentComponent) {
                this.parentComponent.debounceButtonDisplay();
            }
        });
    }
    get customStyle() {
        return this._ch5Properties.get("customStyle");
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
    constructor() {
        super();
        this._parentCh5ButtonList = null;
        this.logger.start('constructor()');
        this._ch5Properties = new Ch5Properties(this, Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES);
        this._parentCh5ButtonList = this.getParentButton();
        this.logger.stop();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        for (let i = 0; i < Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                commonAttributes.push(Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return commonAttributes;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback");
        if (oldValue !== newValue) {
            this.logger.log('attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonListModeState);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-BUTTON-LIST") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
}
Ch5ButtonListModeStateBase.STATES = ['normal', 'pressed', 'selected'];
Ch5ButtonListModeStateBase.BUTTON_TYPES = ['default', 'danger', 'text', 'warning', 'info', 'success', 'primary', 'secondary'];
Ch5ButtonListModeStateBase.BUTTON_HALIGN_LABEL_POSITIONS = ['center', 'left', 'right'];
Ch5ButtonListModeStateBase.BUTTON_VALIGN_LABEL_POSITIONS = ['middle', 'top', 'bottom'];
Ch5ButtonListModeStateBase.BUTTON_CHECKBOX_POSITIONS = ['left', 'right'];
Ch5ButtonListModeStateBase.BUTTON_ICON_POSITIONS = ['first', 'last', 'top', 'bottom'];
Ch5ButtonListModeStateBase.COMPONENT_PROPERTIES = [
    {
        default: Ch5ButtonListModeStateBase.STATES[0],
        enumeratedValues: Ch5ButtonListModeStateBase.STATES,
        name: "state",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.STATES[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeStateBase.BUTTON_TYPES[0],
        enumeratedValues: Ch5ButtonListModeStateBase.BUTTON_TYPES,
        name: "type",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.BUTTON_TYPES[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeStateBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeStateBase.BUTTON_HALIGN_LABEL_POSITIONS,
        name: "hAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeStateBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeStateBase.BUTTON_VALIGN_LABEL_POSITIONS,
        name: "vAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeStateBase.BUTTON_CHECKBOX_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeStateBase.BUTTON_CHECKBOX_POSITIONS,
        name: "checkboxPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.BUTTON_CHECKBOX_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeStateBase.BUTTON_ICON_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeStateBase.BUTTON_ICON_POSITIONS,
        name: "iconPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeStateBase.BUTTON_ICON_POSITIONS[0],
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
        name: "iconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "customClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "customStyle",
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
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LW1vZGUtc3RhdGUtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1idXR0b24tbGlzdC9iYXNlLWNsYXNzZXMvY2g1LWJ1dHRvbi1saXN0LW1vZGUtc3RhdGUtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUsxRixNQUFNLE9BQU8sMEJBQTJCLFNBQVEsTUFBTTtJQW1IcEQsSUFBVyxlQUFlLENBQUMsS0FBK0I7UUFDeEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBQ0QsSUFBVyxlQUFlO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFHRCxJQUFXLEtBQUssQ0FBQyxLQUFvQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBZ0MsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDMUUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDOUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFnQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsS0FBK0I7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQTJCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3BFLElBQUks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