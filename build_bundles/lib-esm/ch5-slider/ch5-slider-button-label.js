import { Ch5Label } from "../ch5-label";
import _ from "lodash";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
export class Ch5SliderButtonLabel extends Ch5Label {
    constructor(parent) {
        super("Ch5-slider-button");
        this.parent = parent;
        this.primaryCssClass = 'ch5-slider-button-label';
        this.debounceCreateBtnLabel = this.debounce(() => {
            if (_.isNil(this._parentCh5Slider)) {
                this._parentCh5Slider = this.getParentButton();
            }
            this._parentCh5Slider.setValues();
        }, 50);
        this.ignoreAttributes = ["disabled", "debug", "show", "customclass", "customstyle", "noshowtype", "receivestatecustomclass", "receivestatecustomstyle", "receivestateshow", "receivestateshowpulse", "receivestatehidepulse", "receivestateenable", "sendeventonshow", "gestureable", "dir", "appendclasswheninviewport", 'label', 'receivestatelabel'];
        this.logger.start('constructor()', Ch5SliderButtonLabel.ELEMENT_NAME);
        if (!_.isNil(parent)) {
            this._parentCh5Slider = parent;
        }
        else {
            this._parentCh5Slider = this.getParentButton();
        }
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Label.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SliderButtonLabel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderButtonLabel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SliderButtonLabel.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-slider-button attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5SliderButtonLabel.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
        }
        this.debounceCreateBtnLabel();
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5SliderButtonLabel.ELEMENT_NAME);
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5SliderButton);
        this.setAttribute('data-ch5-id', this.getCrId());
        super.connectedCallback();
        this.createInternalHtml();
        this.initAttributes();
        this.updateCssClass();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    createInternalHtml() {
        super.createInternalHtml();
        this.logger.start('createInternalHtml()');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5SliderButtonLabel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderButtonLabel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SliderButtonLabel.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SliderButtonLabel.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-SLIDER-BUTTON") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
    attachEventListeners() {
        super.attachEventListeners();
    }
    removeEventListeners() {
        super.removeEventListeners();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this.logger.stop();
    }
    handleLabel() {
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SliderButtonLabel.ELEMENT = 'ch5-slider-button-label';
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5SliderButtonLabel.ELEMENT, Ch5SliderButtonLabel);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNsaWRlci1idXR0b24tbGFiZWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc2xpZGVyL2NoNS1zbGlkZXItYnV0dG9uLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBR3ZGLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxRQUFRO0lBd0JqRCxZQUEwQixNQUF3QjtRQUNqRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQURGLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBbEIzQyxvQkFBZSxHQUFHLHlCQUF5QixDQUFDO1FBSTNDLDJCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ25ELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUMvQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUluQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFRTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hWLElBQUksQ0FBQyxNQUFNLENB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