import { Ch5Label } from "../ch5-label";
import _ from "lodash";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5SliderTitleLabel extends Ch5Label {
    constructor(parent) {
        super("ch5-slider");
        this.parent = parent;
        this.primaryCssClass = 'ch5-slider-title-label';
        this.ignoreAttributes = ["disabled", "debug", "show", "customclass", "customstyle", "noshowtype", "receivestatecustomclass", "receivestatecustomstyle", "receivestateshow", "receivestateshowpulse", "receivestatehidepulse", "receivestateenable", "sendeventonshow", "gestureable", "dir", "appendclasswheninviewport"];
        this.logger.start('constructor()', Ch5SliderTitleLabel.ELEMENT_NAME);
        if (!_.isNil(parent)) {
            this._parentCh5Slider = parent;
            this.createInternalHtml();
            this.initAttributes();
            this.updateCssClass();
            this._parentCh5Slider.setValues("title", this.getTargetElementForCssClassesAndStyle());
        }
        else {
            this._parentCh5Slider = this.getParentButton();
        }
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Label.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SliderTitleLabel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderTitleLabel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SliderTitleLabel.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SliderTitleLabel.ELEMENT, Ch5SliderTitleLabel.SIGNAL_ATTRIBUTE_TYPES);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-slider-button attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5SliderTitleLabel.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
        }
        if (this._parentCh5Slider.setValues) {
            this._parentCh5Slider.setValues("title", this.getTargetElementForCssClassesAndStyle());
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5SliderTitleLabel.ELEMENT_NAME);
        super.connectedCallback();
        this.setAttribute('data-ch5-id', this.getCrId());
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
        for (let i = 0; i < Ch5SliderTitleLabel.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderTitleLabel.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SliderTitleLabel.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SliderTitleLabel.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-SLIDER") {
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
        super.updateCssClass();
        this.logger.stop();
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SliderTitleLabel.ELEMENT = 'ch5-slider-title-label';
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5SliderTitleLabel.ELEMENT, Ch5SliderTitleLabel);
}
Ch5SliderTitleLabel.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNsaWRlci10aXRsZS1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1zbGlkZXIvY2g1LXNsaWRlci10aXRsZS1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixNQUFNLE9BQU8sbUJBQW9CLFNBQVEsUUFBUTtJQWVoRCxZQUEwQixNQUFrQjtRQUMzQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFESyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBVHJDLG9CQUFlLEdBQUcsd0JBQXdCLENBQUM7UUFXakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzFULElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMs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