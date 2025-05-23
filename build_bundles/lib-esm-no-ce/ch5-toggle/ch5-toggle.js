import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5CommonInput } from "../ch5-common-input/ch5-common-input";
import HtmlCallback from "../ch5-common/utils/html-callback";
export class Ch5Toggle extends Ch5CommonInput {
    set handleShape(value) {
        this._ch5Properties.set("handleShape", value, () => {
            this.handleHandleShape();
        });
    }
    get handleShape() {
        return this._ch5Properties.get("handleShape");
    }
    set label(value) {
        this._ch5Properties.set("label", value, () => {
            this.handleLabel();
        });
    }
    get label() {
        return this._ch5Properties.get("label");
    }
    set labelOn(value) {
        this._ch5Properties.set("labelOn", value, () => {
            this._elLabelOn.innerText = this._getTranslatedValue('labelOn', this.labelOn);
        });
    }
    get labelOn() {
        return this._ch5Properties.get("labelOn");
    }
    set labelOff(value) {
        this._ch5Properties.set("labelOff", value, () => {
            this._elLabelOff.innerText = this._getTranslatedValue('labelOff', this.labelOff);
        });
    }
    get labelOff() {
        return this._ch5Properties.get("labelOff");
    }
    set iconOn(value) {
        this._ch5Properties.set("iconOn", value, () => {
            this.handleIconOn();
        });
    }
    get iconOn() {
        return this._ch5Properties.get("iconOn");
    }
    set iconOff(value) {
        this._ch5Properties.set("iconOff", value, () => {
            this.handleIconOff();
        });
    }
    get iconOff() {
        return this._ch5Properties.get("iconOff");
    }
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            this.handleValue();
        });
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.handleSize();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set receiveStateValue(value) {
        this._ch5Properties.set("receiveStateValue", value, null, (newValue) => {
            this.value = newValue;
            this.cleanValue = newValue;
            this._dirty = false;
            this._clean = true;
            if (this._dirtyTimerHandle !== null) {
                clearTimeout(this._dirtyTimerHandle);
            }
        });
    }
    get receiveStateValue() {
        return this._ch5Properties.get('receiveStateValue');
    }
    set receiveStateScriptLabelHTML(value) {
        this._ch5Properties.set("receiveStateScriptLabelHTML", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("label", newValue, () => {
                this.handleLabel();
            });
        });
    }
    get receiveStateScriptLabelHTML() {
        return this._ch5Properties.get('receiveStateScriptLabelHTML');
    }
    set sendEventOnClick(value) {
        this._ch5Properties.set("sendEventOnClick", value);
    }
    get sendEventOnClick() {
        return this._ch5Properties.get('sendEventOnClick');
    }
    set sendEventOnTouch(value) {
        this._ch5Properties.set("sendEventOnTouch", value);
    }
    get sendEventOnTouch() {
        return this._ch5Properties.get('sendEventOnTouch');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Toggle.ELEMENT_NAME, Ch5Toggle.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Toggle.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Toggle.ELEMENT_NAME, Ch5Toggle);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-toggle';
        this.changeEvent = {};
        this.cleanEvent = {};
        this.dirtyEvent = {};
        this._dirtyTimerHandle = null;
        this._dirty = false;
        this._clean = true;
        this._elContainer = {};
        this._elBody = {};
        this._elLabel = {};
        this._elHandle = {};
        this._elIconOn = {};
        this._elIconOff = {};
        this._elLabelOn = {};
        this._elLabelOff = {};
        this._elOnContainer = {};
        this._elOffContainer = {};
        this._elKnob = {};
        this.handleClick = () => {
            if (this.disabled) {
                return;
            }
            this.toggleChecked();
        };
        this.logger.start('constructor()', Ch5Toggle.ELEMENT_NAME);
        this.ignoreAttributes = [];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Toggle.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Toggle.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Toggle.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Toggle.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-toggle attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Toggle.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
        }
        this.addAriaAttributes();
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5Toggle.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Toggle);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-toggle');
            this.appendChild(this._elContainer);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this._cleanValue = this.value;
        customElements.whenDefined('ch5-toggle').then(() => {
            this.componentLoadedEvent(Ch5Toggle.ELEMENT_NAME, this.id);
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
        this._elBody = document.createElement('div');
        this._elLabel = document.createElement('span');
        this._elLabel.hidden = true;
        this._elLabel.classList.add(this.primaryCssClass + '__label');
        this._elHandle = document.createElement('span');
        this._elHandle.classList.add(this.primaryCssClass + '__handle');
        this._elIconOn = document.createElement('i');
        this._elIconOn.classList.add(this.primaryCssClass + '__on-icon');
        this._elLabelOn = document.createElement('span');
        this._elLabelOn.classList.add(this.primaryCssClass + '__on-label');
        this._elOnContainer = document.createElement('div');
        this._elOnContainer.appendChild(this._elIconOn);
        this._elOnContainer.appendChild(this._elLabelOn);
        this._elIconOff = document.createElement('i');
        this._elIconOff.classList.add(this.primaryCssClass + '__off-icon');
        this._elLabelOff = document.createElement('span');
        this._elLabelOff.classList.add(this.primaryCssClass + '__off-label');
        this._elOffContainer = document.createElement('div');
        this._elOffContainer.appendChild(this._elIconOff);
        this._elOffContainer.appendChild(this._elLabelOff);
        this._elKnob = document.createElement('a');
        this._elBody.appendChild(this._elLabel);
        this._elBody.appendChild(this._elHandle);
        this._elHandle.appendChild(this._elOffContainer);
        this._elHandle.appendChild(this._elOnContainer);
        this._elHandle.appendChild(this._elKnob);
        this._elContainer.appendChild(this._elBody);
        this.setAttribute('tabindex', '0');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Toggle.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Toggle.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Toggle.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Toggle.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this.addEventListener('click', this.handleClick);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.removeEventListener('click', this.handleClick);
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
    handleHandleShape() {
        Array.from(Ch5Toggle.COMPONENT_DATA.HANDLE_SHAPE.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + "--" + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + "--" + this.handleShape);
    }
    handleLabel() {
        this._elLabel.innerHTML = this._getTranslatedValue('label', this.label);
        this._elLabel.hidden = false;
    }
    handleIconOn() {
        this.iconOn.split(' ').forEach((className) => {
            if (className.trim() !== "") {
                this._elIconOn.classList.remove(className);
            }
        });
        this.iconOn.split(' ').forEach((className) => {
            if (className.trim() !== "") {
                this._elIconOn.classList.add(className);
            }
        });
    }
    handleIconOff() {
        this.iconOff.split(' ').forEach((className) => {
            if (className.trim() !== "") {
                this._elIconOff.classList.remove(className);
            }
        });
        this.iconOff.split(' ').forEach((className) => {
            if (className.trim() !== "") {
                this._elIconOff.classList.add(className);
            }
        });
    }
    handleOrientation() {
        Array.from(Ch5Toggle.COMPONENT_DATA.ORIENTATION.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + "--" + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + "--" + this.orientation);
    }
    handleSize() {
        Array.from(Ch5Toggle.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elHandle.classList.remove(this.primaryCssClass + '__handle' + Ch5Toggle.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elHandle.classList.add(this.primaryCssClass + '__handle' + Ch5Toggle.COMPONENT_DATA.SIZE.classListPrefix + this.size);
    }
    handleSendEventOnClick() {
        var _a, _b, _c, _d;
        if (this.sendEventOnClick) {
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _a === void 0 ? void 0 : _a.publish(true);
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnClick)) === null || _b === void 0 ? void 0 : _b.publish(false);
        }
        else if (this.sendEventOnTouch) {
            (_c = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnTouch)) === null || _c === void 0 ? void 0 : _c.publish(true);
            (_d = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnTouch)) === null || _d === void 0 ? void 0 : _d.publish(false);
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add(this.primaryCssClass + `--${this.handleShape}`);
        this._elContainer.classList.add(this.primaryCssClass + `--${this.orientation}`);
        this._elHandle.classList.add(this.primaryCssClass + '__handle' + Ch5Toggle.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this.logger.stop();
    }
    _dispatchEvents(detail) {
        this.dispatchEvent(this.changeEvent = new CustomEvent('change', {
            detail,
            bubbles: true
        }));
    }
    addAriaAttributes() {
        if (this.disabled) {
            this.removeAttribute('tabindex');
            this.blur();
        }
        else {
            this.setAttribute('tabindex', '0');
        }
        this.setAttribute('aria-checked', this.value + '');
        this.setAttribute('aria-disabled', this.disabled + '');
    }
    handleValue() {
        this.dirtyValue = this.value;
        this._clean = false;
        if (this.value) {
            this.setAttribute('checked', '');
            this._elContainer.classList.add(this.primaryCssClass + '--on');
        }
        else {
            this.removeAttribute('checked');
            this._elContainer.classList.remove(this.primaryCssClass + '--on');
        }
    }
    setDirtyHandler() {
        if (this._dirtyTimerHandle !== null) {
            clearTimeout(this._dirtyTimerHandle);
        }
        this._dirtyTimerHandle = window.setTimeout(() => this.valueSync(), this._signalValueSyncTimeout);
    }
    valueSync() {
        if (this._dirtyTimerHandle !== null) {
            clearTimeout(this._dirtyTimerHandle);
        }
        if (this.dirtyValue !== this.cleanValue) {
            this.value = this.cleanValue;
            this.setClean();
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    submit() {
        if (this.feedbackMode === 'submit' && this.dirtyValue !== this.cleanValue) {
            this._submitted = true;
            this.setDirtyHandler();
            this.handleSendEventOnClick();
        }
    }
    ;
    reset() {
        this.setClean();
        this.value = this.cleanValue;
    }
    toggleChecked() {
        this.value = !this.value;
        const detail = { value: this.value };
        if (!this._dirty) {
            this._dirtyValue = this.value;
            this.setDirty();
        }
        else {
            this.setClean();
        }
        if (this.feedbackMode !== 'submit') {
            this.setDirtyHandler();
            this.handleSendEventOnClick();
        }
        this._dispatchEvents(detail);
    }
    getDirty() {
        if (this.feedbackMode === 'submit') {
            return this._dirty;
        }
        return false;
    }
    setDirty() {
        this._dirty = true;
        this._clean = false;
        if (this.feedbackMode === 'submit') {
            const detail = { value: this.value };
            this.dispatchEvent(this.dirtyEvent = new CustomEvent('dirty', {
                bubbles: true,
                cancelable: false,
                detail
            }));
            if (this.ondirty instanceof HtmlCallback) {
                this.ondirty.run({});
            }
            else if (this.onclean instanceof Function) {
                this.onclean();
            }
        }
    }
    setClean() {
        if (this._dirtyTimerHandle !== null) {
            clearTimeout(this._dirtyTimerHandle);
        }
        this._dirty = false;
        this._clean = true;
        this._submitted = false;
        if (this.feedbackMode === 'submit') {
            const detail = { value: this.value };
            this.dispatchEvent(this.cleanEvent = new CustomEvent('clean', {
                bubbles: true,
                cancelable: false,
                detail
            }));
            if (this.onclean instanceof HtmlCallback) {
                this.onclean.run({});
            }
            else if (this.onclean instanceof Function) {
                this.onclean();
            }
        }
    }
}
Ch5Toggle.HANDLE_SHAPE = ['circle', 'rectangle'];
Ch5Toggle.ORIENTATION = ['horizontal', 'vertical'];
Ch5Toggle.SIZES = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5Toggle.MODES = ['direct', 'submit'];
Ch5Toggle.COMPONENT_DATA = {
    HANDLE_SHAPE: {
        default: Ch5Toggle.HANDLE_SHAPE[0],
        values: Ch5Toggle.HANDLE_SHAPE,
        key: 'handleShape',
        attribute: 'handleShape',
        classListPrefix: '--handle-shape-'
    },
    ORIENTATION: {
        default: Ch5Toggle.ORIENTATION[0],
        values: Ch5Toggle.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    },
    SIZE: {
        default: Ch5Toggle.SIZES[0],
        values: Ch5Toggle.SIZES,
        key: 'size',
        classListPrefix: '--size-'
    },
    MODES: {
        default: Ch5Toggle.MODES[0],
        values: Ch5Toggle.MODES,
        key: 'mode',
        classListPrefix: '--'
    },
};
Ch5Toggle.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", booleanJoin: 1, contractName: true }, receivestatescriptlabelhtml: { direction: "state", stringJoin: 1, contractName: true }, sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5Toggle.COMPONENT_PROPERTIES = [
    {
        default: Ch5Toggle.HANDLE_SHAPE[0],
        enumeratedValues: Ch5Toggle.HANDLE_SHAPE,
        name: "handleShape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Toggle.HANDLE_SHAPE[0],
        isObservableProperty: true,
    },
    {
        default: "",
        name: "label",
        nameForSignal: "receiveStateScriptLabelHTML",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "labelOn",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "labelOff",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "iconOn",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "iconOff",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: Ch5Toggle.ORIENTATION[0],
        enumeratedValues: Ch5Toggle.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Toggle.ORIENTATION[0],
        isObservableProperty: true,
    },
    {
        default: false,
        name: "value",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true,
    },
    {
        default: Ch5Toggle.SIZES[0],
        enumeratedValues: Ch5Toggle.SIZES,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Toggle.SIZES[0],
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValue",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateScriptLabelHTML",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "sendEventOnClick",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "sendEventOnTouch",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    }
];
Ch5Toggle.ELEMENT_NAME = 'ch5-toggle';
Ch5Toggle.registerCustomElement();
Ch5Toggle.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS10b2dnbGUvY2g1LXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFFN0QsTUFBTSxPQUFPLFNBQVUsU0FBUSxjQUFjO0lBMEwzQyxJQUFXLFdBQVcsQ0FBQyxLQUE0QjtRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBd0IsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDeEUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQXdCLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ25ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLE9B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