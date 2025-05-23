import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { resizeObserver } from "../ch5-core/resize-observer";
import { subscribeInViewPortChange } from "../ch5-core";
export class Ch5Text extends Ch5Common {
    set horizontalAlignment(value) {
        this._ch5Properties.set("horizontalAlignment", value, () => {
            this.handleHorizontalAlignment();
        });
    }
    get horizontalAlignment() {
        return this._ch5Properties.get("horizontalAlignment");
    }
    set verticalAlignment(value) {
        this._ch5Properties.set("verticalAlignment", value, () => {
            this.handleVerticalAlignment();
        });
    }
    get verticalAlignment() {
        return this._ch5Properties.get("verticalAlignment");
    }
    set multilineSupport(value) {
        this._ch5Properties.set("multilineSupport", value, () => {
            this.debounceHandleMultilineSupport();
        });
    }
    get multilineSupport() {
        return this._ch5Properties.get("multilineSupport");
    }
    set truncateText(value) {
        this._ch5Properties.set("truncateText", value, () => {
            this.handleTruncateText();
        });
    }
    get truncateText() {
        return this._ch5Properties.get("truncateText");
    }
    set label(value) {
        this._ch5Properties.set("label", value, () => {
            this.handleLabel();
        });
    }
    get label() {
        return this._ch5Properties.get("label");
    }
    set receiveStateLabel(value) {
        this._ch5Properties.set("receiveStateLabel", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("label", newValue, () => {
                this.handleLabel();
            });
        });
    }
    get receiveStateLabel() {
        return this._ch5Properties.get('receiveStateLabel');
    }
    set labelInnerHtml(value) {
        this._ch5Properties.set("labelInnerHtml", value, () => {
            this.handleLabel();
        });
    }
    get labelInnerHtml() {
        return this._ch5Properties.get("labelInnerHtml");
    }
    set receiveStateScriptLabelHtml(value) {
        this._ch5Properties.set("receiveStateScriptLabelHtml", value, null, (newValue) => {
            this.scriptLabelHtml = newValue;
            this.handleLabel();
        });
    }
    get receiveStateScriptLabelHtml() {
        return this._ch5Properties.get("receiveStateScriptLabelHtml");
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Text.ELEMENT_NAME, Ch5Text.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Text.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Text.ELEMENT_NAME, Ch5Text);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-text';
        this._elContainer = {};
        this._elSpan = {};
        this.templateElement = {};
        this.scriptLabelHtml = '';
        this.debounceHandleMultilineSupport = this.debounce(() => {
            this.handleMultilineSupport();
        }, 150);
        this.logger.start('constructor()', Ch5Text.ELEMENT_NAME);
        this.ignoreAttributes = ["appendclasswheninviewport", "receivestateshowpulse", "receivestatehidepulse", "sendeventonshow",];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Text.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Text.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Text.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Text.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-text attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Text.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5Text.ELEMENT_NAME);
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort) {
                this.debounceHandleMultilineSupport();
            }
        });
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Text);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-text');
            this.appendChild(this._elContainer);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        customElements.whenDefined('ch5-text').then(() => {
            this.componentLoadedEvent(Ch5Text.ELEMENT_NAME, this.id);
            this.handleLabel();
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
        this._elSpan = document.createElement('span');
        this._elSpan.classList.add(this.primaryCssClass + '--span');
        this._elContainer.appendChild(this._elSpan);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Text.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Text.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Text.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Text.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        resizeObserver(this._elContainer, this.onWindowResizeHandler.bind(this));
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
    handleHorizontalAlignment() {
        Array.from(Ch5Text.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.values).forEach((e) => {
            this._elSpan.classList.remove(this.primaryCssClass + Ch5Text.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.classListPrefix + e);
        });
        this._elSpan.classList.add(this.primaryCssClass + Ch5Text.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.classListPrefix + this.horizontalAlignment);
    }
    handleVerticalAlignment() {
        Array.from(Ch5Text.COMPONENT_DATA.VERTICAL_ALIGNMENT.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Text.COMPONENT_DATA.VERTICAL_ALIGNMENT.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Text.COMPONENT_DATA.VERTICAL_ALIGNMENT.classListPrefix + this.verticalAlignment);
    }
    handleMultilineSupport() {
        ['true', 'false'].forEach((e) => {
            this._elSpan.classList.remove(this.primaryCssClass + '--multiline-support-' + e);
        });
        this._elSpan.classList.add(this.primaryCssClass + '--multiline-support-' + this.multilineSupport.toString());
        if (this.multilineSupport) {
            this.fitEllipsisForMultiline();
        }
    }
    handleTruncateText() {
        ['true', 'false'].forEach((e) => {
            this._elSpan.classList.remove(this.primaryCssClass + '--truncate-text-' + e);
        });
        this._elSpan.classList.add(this.primaryCssClass + '--truncate-text-' + this.truncateText.toString());
        if (this.multilineSupport) {
            this.fitEllipsisForMultiline();
        }
        else {
            this._elSpan.style.removeProperty('word-wrap');
            this._elSpan.style.removeProperty('display');
            this._elSpan.style.removeProperty('max-height');
        }
    }
    handleLabel() {
        if (!(this.templateElement instanceof HTMLTemplateElement)) {
            this.templateElement = this.getElementsByTagName('template')[0];
        }
        Array.from(this._elSpan.children).forEach(container => container.remove());
        this._elSpan.innerText = '';
        if (this.receiveStateScriptLabelHtml !== null && this.receiveStateScriptLabelHtml.trim() !== "") {
            this._elSpan.innerHTML = this.decodeInnerHTMLForAttribute(this.scriptLabelHtml);
        }
        else if (this.receiveStateLabel !== null && this.receiveStateLabel.trim() !== "") {
            this._elSpan.innerText = this.label;
        }
        else if (Ch5Common.isNotNil(this.labelInnerHtml)) {
            this._elSpan.innerHTML = this.decodeInnerHTMLForAttribute(this.labelInnerHtml);
        }
        else if (this.templateElement instanceof HTMLTemplateElement) {
            const documentContainer = document.createElement('template');
            documentContainer.innerHTML = this.templateElement.innerHTML;
            this._elSpan.appendChild((documentContainer.content));
        }
        else {
            this._elSpan.innerText = this.label;
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
        this._elSpan.classList.add(this.primaryCssClass + Ch5Text.COMPONENT_DATA.HORIZONTAL_ALIGNMENT.classListPrefix + this.horizontalAlignment);
        this._elContainer.classList.add(this.primaryCssClass + Ch5Text.COMPONENT_DATA.VERTICAL_ALIGNMENT.classListPrefix + this.verticalAlignment);
        this._elSpan.classList.add(this.primaryCssClass + '--multiline-support-' + this.multilineSupport.toString());
        this._elSpan.classList.add(this.primaryCssClass + '--truncate-text-' + this.truncateText.toString());
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    fitEllipsisForMultiline() {
        let numberOfLines = 0;
        const lineHeight = this.getLineHeightSuper(this._elSpan);
        const topAndBottomPadding = 20;
        const containerHeight = this.getContainerHeight(this._elContainer) - topAndBottomPadding;
        if (containerHeight < lineHeight) {
            numberOfLines = 1;
        }
        else {
            numberOfLines = Math.floor(containerHeight / lineHeight);
        }
        if (this.truncateText) {
            this._elSpan.setAttribute("style", "-webkit-line-clamp:" + numberOfLines);
        }
        else {
            this._elSpan.setAttribute("style", "max-height: " + (numberOfLines * lineHeight) + "px" + ";");
        }
    }
    getLineHeight(el) {
        return window.getComputedStyle(el).lineHeight;
    }
    getLineHeightSuper(element) {
        const oldHtml = element.innerHTML;
        element.innerHTML = "&nbsp;";
        const lineHeight = element.offsetHeight;
        element.innerHTML = oldHtml;
        return lineHeight;
    }
    getContainerHeight(element) {
        return element.clientHeight;
    }
    onWindowResizeHandler() {
        this.debounceHandleMultilineSupport();
    }
}
Ch5Text.HORIZONTAL_ALIGNMENT = ['center', 'left', 'right'];
Ch5Text.VERTICAL_ALIGNMENT = ['middle', 'top', 'bottom'];
Ch5Text.COMPONENT_DATA = {
    HORIZONTAL_ALIGNMENT: {
        default: Ch5Text.HORIZONTAL_ALIGNMENT[0],
        values: Ch5Text.HORIZONTAL_ALIGNMENT,
        key: 'horizontalAlignment',
        attribute: 'horizontalAlignment',
        classListPrefix: '--horizontal-alignment-'
    },
    VERTICAL_ALIGNMENT: {
        default: Ch5Text.VERTICAL_ALIGNMENT[0],
        values: Ch5Text.VERTICAL_ALIGNMENT,
        key: 'verticalAlignment',
        attribute: 'verticalAlignment',
        classListPrefix: '--vertical-alignment-'
    },
};
Ch5Text.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatelabel: { direction: "state", stringJoin: 1, contractName: true }, receivestatescriptlabelhtml: { direction: "state", stringJoin: 1, contractName: true } });
Ch5Text.COMPONENT_PROPERTIES = [
    {
        default: Ch5Text.HORIZONTAL_ALIGNMENT[0],
        enumeratedValues: Ch5Text.HORIZONTAL_ALIGNMENT,
        name: "horizontalAlignment",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Text.HORIZONTAL_ALIGNMENT[0],
        isObservableProperty: true,
    },
    {
        default: Ch5Text.VERTICAL_ALIGNMENT[0],
        enumeratedValues: Ch5Text.VERTICAL_ALIGNMENT,
        name: "verticalAlignment",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Text.VERTICAL_ALIGNMENT[0],
        isObservableProperty: true,
    },
    {
        default: false,
        name: "multilineSupport",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "truncateText",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: "",
        name: "label",
        nameForSignal: "receiveStateLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
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
        isSignal: true,
        name: "receiveStateScriptLabelHtml",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "labelInnerHtml",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
Ch5Text.ELEMENT_NAME = 'ch5-text';
Ch5Text.registerCustomElement();
Ch5Text.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRleHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdGV4dC9jaDUtdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhELE1BQU0sT0FBTyxPQUFRLFNBQVEsU0FBUztJQXFIcEMsSUFBVyxtQkFBbUIsQ0FBQyxLQUFrQztRQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBOEIscUJBQXFCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUN0RixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLG1CQUFtQjtRQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUE4QixxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxJQUFXLGlCQUFpQixDQUFDLEtBQWdDO1FBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUE0QixtQkFBbUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2xGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsaUJBQWlCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQTRCLG1CQUFtQixDQUFDLENBQUM7SUFDakYs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