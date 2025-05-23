import { Ch5Log } from "../../ch5-common/ch5-log";
import { Ch5Properties } from "../../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../../utility-models/ch5-role-attribute-mapping";
export class Ch5ButtonListModeBase extends Ch5Log {
    set parentComponent(value) {
        this._parentCh5ButtonList = value;
    }
    get parentComponent() {
        return this._parentCh5ButtonList;
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
        this._ch5Properties = new Ch5Properties(this, Ch5ButtonListModeBase.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        for (let i = 0; i < Ch5ButtonListModeBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListModeBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                commonAttributes.push(Ch5ButtonListModeBase.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return commonAttributes;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.logger.log(this.nodeName + ' attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5ButtonListModeBase.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonListMode);
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
        for (let i = 0; i < Ch5ButtonListModeBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListModeBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ButtonListModeBase.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ButtonListModeBase.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
}
Ch5ButtonListModeBase.BUTTON_TYPES = ['default', 'danger', 'text', 'warning', 'info', 'success', 'primary', 'secondary'];
Ch5ButtonListModeBase.BUTTON_HALIGN_LABEL_POSITIONS = ['center', 'left', 'right'];
Ch5ButtonListModeBase.BUTTON_VALIGN_LABEL_POSITIONS = ['middle', 'top', 'bottom'];
Ch5ButtonListModeBase.BUTTON_CHECKBOX_POSITIONS = ['left', 'right'];
Ch5ButtonListModeBase.BUTTON_ICON_POSITIONS = ['first', 'last', 'top', 'bottom'];
Ch5ButtonListModeBase.COMPONENT_PROPERTIES = [
    {
        default: Ch5ButtonListModeBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeBase.BUTTON_HALIGN_LABEL_POSITIONS,
        name: "hAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeBase.BUTTON_TYPES[0],
        enumeratedValues: Ch5ButtonListModeBase.BUTTON_TYPES,
        name: "type",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeBase.BUTTON_TYPES[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeBase.BUTTON_VALIGN_LABEL_POSITIONS,
        name: "vAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeBase.BUTTON_CHECKBOX_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeBase.BUTTON_CHECKBOX_POSITIONS,
        name: "checkboxPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeBase.BUTTON_CHECKBOX_POSITIONS[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListModeBase.BUTTON_ICON_POSITIONS[0],
        enumeratedValues: Ch5ButtonListModeBase.BUTTON_ICON_POSITIONS,
        name: "iconPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListModeBase.BUTTON_ICON_POSITIONS[0],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LW1vZGUtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1idXR0b24tbGlzdC9iYXNlLWNsYXNzZXMvY2g1LWJ1dHRvbi1saXN0LW1vZGUtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBTTFGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxNQUFNO0lBeUcvQyxJQUFXLGVBQWUsQ0FBQyxLQUErQjtRQUN4RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQStCO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUEyQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNwRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUM5QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQTJCLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxLQUFzQztRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBa0MsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDbEYsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN4QixJQUFJLENBQUMsZUFBZSxD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