import { Ch5ButtonBase } from "../ch5-button";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import _ from "lodash";
import { Ch5SliderButtonLabel } from "./ch5-slider-button-label";
export class Ch5SliderButton extends Ch5ButtonBase {
    set key(value) {
        this._ch5Properties.set("key", value, () => {
            this.debounceCreateSliderButton();
        });
    }
    get key() {
        return this._ch5Properties.get("key");
    }
    set labelInnerHTML(value) {
        this._ch5Properties.set("labelInnerHTML", value, () => {
            this.createSliderButtonLabel();
            this.debounceCreateSliderButton();
        });
    }
    get labelInnerHTML() {
        return this._ch5Properties.get("labelInnerHTML");
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-button';
        this.debounceCreateSliderButton = this.debounce(() => {
            this.setButtonDisplay();
            this.updateInternalHtml();
        }, 50);
        this.logger.start('constructor()', Ch5SliderButton.ELEMENT_NAME);
        this.ignoreAttributes = ["disabled", "debug", "show", "customclass", "customstyle", "noshowtype", "receivestatecustomclass", "receivestatecustomstyle", "receivestateshow", "receivestateshowpulse", "receivestatehidepulse", "receivestateenable", "sendeventonshow", "gestureable", "dir", "appendclasswheninviewport"];
        this._ch5Properties = new Ch5Properties(this, Ch5SliderButton.COMPONENT_PROPERTIES);
    }
    static get observedAttributes() {
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SliderButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SliderButton.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return newObsAttrs.concat(Ch5SliderButton.inheritedObsAttrs);
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SliderButton.ELEMENT_NAME, Ch5SliderButton.SIGNAL_ATTRIBUTE_TYPES);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (Ch5SliderButton.inheritedObsAttrs.includes(attr.toLowerCase())) {
            if (oldValue !== newValue) {
                this.logger.log('ch5-slider-button attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
                const attributeChangedProperty = Ch5SliderButton.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
                if (attributeChangedProperty) {
                    const thisRef = this;
                    const key = attributeChangedProperty.name;
                    thisRef[key] = newValue;
                }
                else {
                    super.attributeChangedCallback(attr, oldValue, newValue);
                }
            }
            this.debounceCreateSliderButton();
        }
        this.logger.stop();
    }
    createSliderButtonLabel() {
        const buttonLabelList = this.getElementsByTagName("ch5-slider-button-label");
        const findButtonLabel = Array.prototype.slice.call(buttonLabelList).filter((x) => x.parentNode.nodeName.toString().toLowerCase() === this.nodeName.toString().toLowerCase());
        let childButtonLabel = null;
        if (findButtonLabel && findButtonLabel.length > 0 && !_.isNil(findButtonLabel[0].children[0])) {
            childButtonLabel = findButtonLabel[0];
        }
        else {
            childButtonLabel = document.createElement('ch5-slider-button-label');
            this.appendChild(childButtonLabel);
        }
        let templateEl = childButtonLabel.querySelector('template');
        if (templateEl !== null) {
            childButtonLabel.removeChild(templateEl);
        }
        templateEl = document.createElement('template');
        templateEl.innerHTML = this.decodeInnerHTMLForAttribute(this.labelInnerHTML);
        childButtonLabel.appendChild(templateEl);
    }
    buttonIgnoredAttributes() {
        const buttonIgnoredAttr = [
            'iconposition', 'orientation', 'checkboxshow', 'checkboxposition', 'pressdelaytime', 'pressdelaydistance', 'size', 'stretch', 'formtype', 'mode', 'customclassselected', 'customclasspressed', 'customclassdisabled', 'receivestatemode', 'receivestateselected', 'receivestatescriptlabelhtml', 'receivestatetype', 'sendeventontouch', 'backgroundimageurl', 'backgroundimagefilltype', 'receivestatebackgroundimageurl', 'receivestatecustomclass', 'receivestatecustomstyle', 'disabled', 'show', 'customclass', 'customstyle'
        ];
        for (let i = 0; i < buttonIgnoredAttr.length; i++) {
            if (this.hasAttribute(buttonIgnoredAttr[i].toLowerCase())) {
                this.removeAttribute(buttonIgnoredAttr[i].toLowerCase());
            }
        }
        this.setAttribute("iconPosition", "top");
    }
    connectedCallback() {
        var _a, _b, _c, _d;
        this.logger.start('connectedCallback()', Ch5SliderButton.ELEMENT_NAME);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.buttonIgnoredAttributes();
        if (!(((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('slider-on-button')) || ((_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.classList.contains('slider-off-button')))) {
            return;
        }
        if (this.getAttribute('key')) {
            if (((_c = this.getAttribute('key')) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== 'on' && ((_d = this.getAttribute('key')) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !== 'off') {
                return;
            }
        }
        super.connectedCallback();
        this.initAttributes();
        this.updateCssClass();
        this.handleLabel();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.logger.stop();
    }
    createInternalHtml() {
        super.createInternalHtml();
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5SliderButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SliderButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SliderButton.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SliderButton.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        for (let i = 0; i < Ch5SliderButton.inheritedObsAttrs.length; i++) {
            if (this.hasAttribute(Ch5SliderButton.inheritedObsAttrs[i].toLowerCase())) {
                const key = Ch5SliderButton.inheritedObsAttrs[i].toLowerCase();
                thisRef[key] = this.getAttribute(key);
            }
        }
        this.debounceCreateSliderButton();
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
    labelHelper() {
        const labelSlider = this.getElementsByTagName("ch5-slider-button-label");
        Array.from(labelSlider).forEach((label, index) => {
            if (index >= 1) {
                return;
            }
            const sliderTtl = new Ch5SliderButtonLabel(this);
            Ch5SliderButtonLabel.observedAttributes.forEach((attr) => {
                if (label.hasAttribute(attr)) {
                    sliderTtl.setAttribute(attr, label.getAttribute(attr) + '');
                }
            });
        });
    }
    setValues() {
        if (this.receiveStateLabel === "") {
            this.debounceCreateSliderButton();
        }
    }
    handleLabel() {
        if (this.receiveStateLabel !== null && this.receiveStateLabel.trim() !== "") {
        }
        else if (this.hasAttribute("labelInnerHtml")) {
        }
        else if (this.getElementsByTagName("ch5-slider-button-label").length >= 1) {
            this.labelHelper();
        }
    }
    setButtonDisplay() {
        this.setButtonDisplayDetails("ch5-slider-button");
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this.logger.stop();
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SliderButton.KEY = ['on', 'off'];
Ch5SliderButton.inheritedObsAttrs = ["key", "labelinnerhtml", "label", "sgicontheme", "iconclass", "pressed", "selected", "shape", "halignlabel", "valignlabel", "type", "iconurl", "iconurlfilltype", "sendeventonclick", "receivestatelabel", "receivestateiconclass", "receivestateiconurl"];
Ch5SliderButton.COMPONENT_DATA = {
    KEY: {
        default: Ch5SliderButton.KEY[0],
        values: Ch5SliderButton.KEY,
        key: 'key',
        attribute: 'key',
        classListPrefix: '--key-'
    }
};
Ch5SliderButton.COMPONENT_PROPERTIES = [
    {
        default: "",
        enumeratedValues: Ch5SliderButton.KEY,
        name: "key",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
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
Ch5SliderButton.ELEMENT_NAME = 'ch5-slider-button';
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5SliderButton.ELEMENT_NAME, Ch5SliderButton);
}
Ch5SliderButton.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNsaWRlci1idXR0b24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc2xpZGVyL2NoNS1zbGlkZXItYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFHekYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVqRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxhQUFhO0lBaURqRCxJQUFXLEdBQUcsQ0FBQyxLQUEwQjtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBc0IsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDL0QsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBc0IsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQVcsY0FBYyxDQUFDLEtBQWE7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM3RCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFNRDtRQUNDLEtBQUss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