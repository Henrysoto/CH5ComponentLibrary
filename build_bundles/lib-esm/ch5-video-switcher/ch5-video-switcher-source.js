import { Ch5Log } from "../ch5-common/ch5-log";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import _ from "lodash";
export class Ch5VideoSwitcherSource extends Ch5Log {
    set iconClass(value) {
        this._ch5Properties.set("iconClass", value, () => {
            this.handleIcon();
        });
    }
    get iconClass() {
        return this._ch5Properties.get("iconClass");
    }
    set iconUrl(value) {
        this._ch5Properties.set("iconUrl", value, () => {
            this.handleIcon();
        });
    }
    get iconUrl() {
        return this._ch5Properties.get("iconUrl");
    }
    set labelInnerHTML(value) {
        this._ch5Properties.set("labelInnerHTML", value, () => {
            var _a;
            const index = Number((_a = this.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-').pop());
            if (this.parentComponent) {
                this.parentComponent.sourceLabelHelperCreate(index, this.labelInnerHTML);
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
            && window.customElements.get(Ch5VideoSwitcherSource.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5VideoSwitcherSource.ELEMENT_NAME, Ch5VideoSwitcherSource);
        }
    }
    constructor() {
        super();
        this.parentComponent = null;
        this.logger.start('constructor()');
        this._ch5Properties = new Ch5Properties(this, Ch5VideoSwitcherSource.COMPONENT_PROPERTIES);
        this.parentComponent = this.getParentElement();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        for (let i = 0; i < Ch5VideoSwitcherSource.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcherSource.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                commonAttributes.push(Ch5VideoSwitcherSource.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return commonAttributes;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.logger.log(this.nodeName + ' attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5VideoSwitcherSource.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
            throw new Error(`Invalid parent element for ch5-video-switcher-source.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5VideoSwitcherSource);
        this.sourceLabelHelper();
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
        for (let i = 0; i < Ch5VideoSwitcherSource.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcherSource.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5VideoSwitcherSource.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5VideoSwitcherSource.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    sourceLabelHelper() {
        const sourceEleId = this.getAttribute('id');
        const indexOfSource = (sourceEleId === null || sourceEleId === void 0 ? void 0 : sourceEleId.split('-')) ? sourceEleId === null || sourceEleId === void 0 ? void 0 : sourceEleId.split('-') : [];
        if (this.parentComponent) {
            this.parentComponent.sourceLabelHelperCreate(+indexOfSource[4]);
        }
    }
    handleIcon() {
        var _a, _b;
        if (this.iconUrl) {
            const index = Number((_a = this.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-').pop());
            if (this.parentComponent && this.parentComponent._sourceListContainer.children[index]) {
                const ele = this.parentComponent._sourceListContainer.children[index].getElementsByTagName('i');
                ele[0].setAttribute('class', '');
                ele[0].classList.add('source-icon');
                ele[0].classList.add('source-icon-url');
                ele[0].style.backgroundImage = `url(${this.iconUrl})`;
            }
        }
        else {
            const index = Number((_b = this.getAttribute('id')) === null || _b === void 0 ? void 0 : _b.split('-').pop());
            if (this.parentComponent && this.parentComponent._sourceListContainer.children[index]) {
                const ele = this.parentComponent._sourceListContainer.children[index].getElementsByTagName('i');
                ele[0].setAttribute('class', '');
                ele[0].classList.add('source-icon');
                this.iconClass.split(' ').forEach((className) => {
                    className = className.trim();
                    if (className !== '') {
                        ele[0].classList.add(className);
                    }
                });
            }
        }
    }
}
Ch5VideoSwitcherSource.ELEMENT_NAME = 'ch5-video-switcher-source';
Ch5VideoSwitcherSource.COMPONENT_PROPERTIES = [
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
        name: "labelInnerHTML",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
Ch5VideoSwitcherSource.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXN3aXRjaGVyLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS12aWRlby1zd2l0Y2hlci9jaDUtdmlkZW8tc3dpdGNoZXItc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFJdkYsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxNQUFNO0lBd0NoRCxJQUFXLFNBQVMsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsU0FBUyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQVcsY0FBYyxDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTs7WUFDNUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBTU0sTUFBTSxDQUFDLHFCQUFxQjtRQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7ZUFDekIsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVE7ZUFDekMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxVQUFVO2VBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUMzRjtJQUNILENBQUM7SUFNRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBdERGLG9CQUFlLEdBQTRCLElBQUksQ0FBQztRQXVEdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLEtBQUssa0JBQWtCO1FBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1FBQ25ELEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkYsSUFBSSxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUMxRjtTQUNGO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRU0sd0JBQXdCLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7UUFDOUUsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsNkJBQTZCLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNuSCxNQUFNLHdCQUF3QixHQUFHLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQThCLEVBQUUsRUFBRSxHQUFHLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9OLElBQUksd0JBQXdCLEVBQUU7Z0JBQzVCLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQztnQkFDMUIsTUFBTSxHQUFHLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFLTSxpQkFBaUI7O1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFLLG9CQUFvQixFQUFFO1lBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztTQUMxRTtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixNQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBVSxFQUFvQixFQUFFO1lBQzVELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7Z0JBQ3JGLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQWtCLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sSUFBd0IsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFDRCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFxQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLG9CQUFvQjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQU1TLGNBQWM7UUFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25GLElBQUksc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEtBQUssSUFBSSxFQUFFO2dCQUNoRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7b0JBQ3hGLE1BQU0sR0FBRyxHQUFHLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLGFBQWEsR0FBRyxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVPLFVBQVU7O1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN4QyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQzthQUN2RDtTQUNGO2FBQU07WUFDTCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFpQixFQUFFLEVBQUU7b0JBQ3RELFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzdCLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRTt3QkFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2pDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7O0FBbE1hLG1DQUFZLEdBQUcsMkJBQTJCLEFBQTlCLENBQStCO0FBRWxDLDJDQUFvQixHQUEyQjtJQUNwRTtRQUNFLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLFdBQVc7UUFDakIscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixJQUFJLEVBQUUsUUFBUTtRQUNkLHFCQUFxQixFQUFFLEVBQUU7UUFDekIsb0JBQW9CLEVBQUUsSUFBSTtLQUMzQjtJQUNEO1FBQ0UsT0FBTyxFQUFFLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLHFCQUFxQixFQUFFLElBQUk7UUFDM0IsSUFBSSxFQUFFLFFBQVE7UUFDZCxxQkFBcUIsRUFBRSxFQUFFO1FBQ3pCLG9CQUFvQixFQUFFLElBQUk7S0FDM0I7SUFDRDtRQUNFLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLElBQUksRUFBRSxRQUFRO1FBQ2QscUJBQXFCLEVBQUUsRUFBRTtRQUN6QixvQkFBb0IsRUFBRSxJQUFJO0tBQzNCO0NBQ0YsQUF6QjBDLENBeUJ6QztBQTZLSixzQkFBc0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDIn0=