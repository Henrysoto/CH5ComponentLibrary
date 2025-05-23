import { Ch5Log } from "../ch5-common/ch5-log";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import _ from "lodash";
export class Ch5VideoSwitcherScreen extends Ch5Log {
    set alignLabel(value) {
        this._ch5Properties.set("alignLabel", value, () => {
            var _a, _b;
            const index = (_a = this.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-').pop();
            const screenContainer = (_b = this.parentComponent) === null || _b === void 0 ? void 0 : _b._screenListContainer.querySelector(`[screenid="${index}"]`);
            if (this.parentComponent && screenContainer) {
                Array.from(Ch5VideoSwitcherScreen.ALIGN_LABEL).forEach((label) => {
                    screenContainer.classList.remove('ch5-video-switcher--screen-list-label-' + label);
                });
                screenContainer.classList.add('ch5-video-switcher--screen-list-label-' + this.alignLabel);
            }
        });
    }
    get alignLabel() {
        return this._ch5Properties.get("alignLabel");
    }
    set labelInnerHTML(value) {
        this._ch5Properties.set("labelInnerHTML", value, () => {
            const screenEleId = this.getAttribute('id');
            const indexOfScreen = (screenEleId === null || screenEleId === void 0 ? void 0 : screenEleId.split('-')) ? screenEleId === null || screenEleId === void 0 ? void 0 : screenEleId.split('-') : [];
            if (this.parentComponent) {
                this.parentComponent.screenLabelHelperCreate(+indexOfScreen[4], this.labelInnerHTML);
            }
        });
    }
    get labelInnerHTML() {
        return this._ch5Properties.get("labelInnerHTML");
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5VideoSwitcherScreen.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5VideoSwitcherScreen.ELEMENT_NAME, Ch5VideoSwitcherScreen);
        }
    }
    constructor() {
        super();
        this.parentComponent = null;
        this.logger.start('constructor()');
        this._ch5Properties = new Ch5Properties(this, Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES);
        this.parentComponent = this.getParentElement();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        for (let i = 0; i < Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                commonAttributes.push(Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return commonAttributes;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.logger.log(this.nodeName + ' attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) !== 'ch5-video-switcher') {
            throw new Error(`Invalid parent element for ch5-video-switcher-screen.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5VideoSwitcherScreen);
        this.screenLabelHelper();
        this.initAttributes();
        this.logger.stop();
    }
    getParentElement() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-VIDEO-SWITCHER") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    screenLabelHelper() {
        const screenEleId = this.getAttribute('id');
        const indexOfScreen = (screenEleId === null || screenEleId === void 0 ? void 0 : screenEleId.split('-')) ? screenEleId === null || screenEleId === void 0 ? void 0 : screenEleId.split('-') : [];
        if (this.parentComponent) {
            this.parentComponent.screenLabelHelperCreate(+indexOfScreen[4]);
        }
    }
}
Ch5VideoSwitcherScreen.ELEMENT_NAME = 'ch5-video-switcher-screen';
Ch5VideoSwitcherScreen.ALIGN_LABEL = ['center', 'left', 'right'];
Ch5VideoSwitcherScreen.COMPONENT_PROPERTIES = [
    {
        default: Ch5VideoSwitcherScreen.ALIGN_LABEL[0],
        enumeratedValues: Ch5VideoSwitcherScreen.ALIGN_LABEL,
        name: "alignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5VideoSwitcherScreen.ALIGN_LABEL[0],
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
Ch5VideoSwitcherScreen.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXN3aXRjaGVyLXNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS12aWRlby1zd2l0Y2hlci9jaDUtdmlkZW8tc3dpdGNoZXItc2NyZWVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFLdkYsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxNQUFNO0lBbUNoRCxJQUFXLFVBQVUsQ0FBQyxLQUF3QztRQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBb0MsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7O1lBQ25GLE1BQU0sS0FBSyxHQUFHLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN4RCxNQUFNLGVBQWUsR0FBRyxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDMUcsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLGVBQWUsRUFBRTtnQkFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtvQkFDdkUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0NBQXdDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ3JGLENBQUMsQ0FBQyxDQUFBO2dCQUNGLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxHQUFHLElB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