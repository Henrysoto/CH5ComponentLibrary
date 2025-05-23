import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5CommonInput } from "../ch5-common-input/ch5-common-input";
import { Ch5TextInputMask } from "./ch5-textinput-mask";
import HtmlCallback from "../ch5-common/utils/html-callback";
export class Ch5TextInput extends Ch5CommonInput {
    set pattern(value) {
        this._ch5Properties.set("pattern", value, () => {
            this.handlePattern();
        });
    }
    get pattern() {
        return this._ch5Properties.get("pattern");
    }
    set mask(value) {
        this._ch5Properties.set("mask", value, () => {
            this.handleMask();
        });
    }
    get mask() {
        return this._ch5Properties.get("mask");
    }
    set iconClass(value) {
        this._ch5Properties.set("iconClass", value, () => {
            this.handleIconClass();
        });
    }
    get iconClass() {
        return this._ch5Properties.get("iconClass");
    }
    set icon(value) {
        this._ch5Properties.set("icon", value, () => {
            this.handleIcon();
        });
    }
    get icon() {
        return this._ch5Properties.get("icon");
    }
    set label(value) {
        this._ch5Properties.set("label", value, () => {
            this.handleLabel();
        });
    }
    get label() {
        return this._ch5Properties.get("label");
    }
    set placeholder(value) {
        this._ch5Properties.set("placeholder", value, () => {
            this.handlePlaceholder();
        });
    }
    get placeholder() {
        return this._ch5Properties.get("placeholder");
    }
    set iconPosition(value) {
        this._ch5Properties.set("iconPosition", value, () => {
            this.iconClass === "" ? this.handleIcon() : this.handleIconClass();
        });
    }
    get iconPosition() {
        return this._ch5Properties.get("iconPosition");
    }
    set type(value) {
        this._ch5Properties.set("type", value, () => {
            this.handleType();
        });
    }
    get type() {
        return this._ch5Properties.get("type");
    }
    set minLength(value) {
        this._ch5Properties.set("minLength", value, () => {
            this._elInput.minLength = this.minLength;
            this._elInput.setAttribute('minlength', this.minLength + '');
        });
    }
    get minLength() {
        return this._ch5Properties.get("minLength");
    }
    set maxLength(value) {
        this._ch5Properties.set("maxLength", value, () => {
            this._elInput.maxLength = this.maxLength;
            this._elInput.setAttribute('maxlength', this.maxLength + '');
        });
    }
    get maxLength() {
        return this._ch5Properties.get("maxLength");
    }
    set minValue(value) {
        this._ch5Properties.set("minValue", value, () => {
            this.handleMinValue();
        });
    }
    get minValue() {
        return this._ch5Properties.get("minValue");
    }
    set maxValue(value) {
        this._ch5Properties.set("maxValue", value, () => {
            this.handleMaxValue();
        });
    }
    get maxValue() {
        return this._ch5Properties.get("maxValue");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.handleSize();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set textTransform(value) {
        this._ch5Properties.set("text-transform", value, () => {
            this.handleTextTransform();
        });
    }
    get textTransform() {
        return this._ch5Properties.get("text-transform");
    }
    set scaling(value) {
        this._ch5Properties.set("scaling", value, () => {
            this.handleScaling();
        });
    }
    get scaling() {
        return this._ch5Properties.get("scaling");
    }
    set minimumFontSize(value) {
        this._ch5Properties.set("minimumFontSize", value);
    }
    get minimumFontSize() {
        return this._ch5Properties.get("minimumFontSize");
    }
    set tabIndex(value) {
        this._ch5Properties.set("tabIndex", value, () => {
            this._elInput.tabIndex = value;
            this._elInput.setAttribute('tabindex', this.tabIndex + '');
        });
    }
    get tabIndex() {
        return this._ch5Properties.get("tabIndex");
    }
    set receiveStateFocus(value) {
        this._ch5Properties.set("receiveStateFocus", value, null, (newValue) => {
            newValue === true ? this._elInput.focus() : this._elInput.blur();
        });
    }
    get receiveStateFocus() {
        return this._ch5Properties.get('receiveStateFocus');
    }
    set receiveStateValue(value) {
        this._ch5Properties.set("receiveStateValue", value, null, (newValue) => {
            this.updateValue(newValue);
        });
    }
    get receiveStateValue() {
        return this._ch5Properties.get('receiveStateValue');
    }
    set sendEventOnChange(value) {
        this._ch5Properties.set("sendEventOnChange", value);
    }
    get sendEventOnChange() {
        return this._ch5Properties.get('sendEventOnChange');
    }
    set sendEventOnFocus(value) {
        this._ch5Properties.set("sendEventOnFocus", value);
    }
    get sendEventOnFocus() {
        return this._ch5Properties.get('sendEventOnFocus');
    }
    set sendEventOnBlur(value) {
        this._ch5Properties.set("sendEventOnBlur", value);
    }
    get sendEventOnBlur() {
        return this._ch5Properties.get('sendEventOnBlur');
    }
    set value(value) {
        this._ch5Properties.set("value", value);
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    set sendEventOnEnterKey(value) {
        this._ch5Properties.set("sendEventOnEnterKey", value);
    }
    get sendEventOnEnterKey() {
        return this._ch5Properties.get('sendEventOnEnterKey');
    }
    set sendEventOnEscKey(value) {
        this._ch5Properties.set("sendEventOnEscKey", value);
    }
    get sendEventOnEscKey() {
        return this._ch5Properties.get('sendEventOnEscKey');
    }
    set onValidityChange(callback) {
        if (callback === null || callback === undefined) {
            callback = {};
        }
        if (callback instanceof HtmlCallback && this.onValidityChange instanceof Function) {
            return;
        }
        this._onValidityChange = callback;
    }
    get onValidityChange() {
        return this._onValidityChange;
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5TextInput.ELEMENT_NAME, Ch5TextInput.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5TextInput.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5TextInput.ELEMENT_NAME, Ch5TextInput);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-textinput';
        this._elContainer = {};
        this._elInput = {};
        this._elIcon = {};
        this._labelElement = {};
        this._maskingUtility = null;
        this.previousLength = 0;
        this.lastValidState = false;
        this.dirtyCustomEvent = {};
        this.validityChangeEvent = {};
        this.cleanCustomEvent = {};
        this._onValidityChange = {};
        this.onChangeHandler = (inEvent) => {
            const currentElement = inEvent.currentTarget;
            this.value = inEvent.currentTarget.value;
            this._dirty = true;
            this._clean = false;
            if (this.feedbackMode === 'direct') {
                this._onChangeSignal(currentElement.value);
                this.dirtyTimerHandle();
            }
            else if (this.feedbackMode === 'submit') {
                this._createValidityChangeEvent(currentElement.value);
                this._createDirtyCustomEvent(currentElement.value);
                currentElement.dispatchEvent(this.dirtyCustomEvent);
                this.runEventHandlers('dirty', this.dirtyCustomEvent);
                if (this.lastValidState !== this.getValid()) {
                    currentElement.dispatchEvent(this.validityChangeEvent);
                    if (this.onValidityChange instanceof HtmlCallback) {
                        this.onValidityChange.run(this.validityChangeEvent);
                    }
                    else if (this.onValidityChange instanceof Function) {
                        this.onValidityChange.call(this, this.validityChangeEvent);
                    }
                }
                this.lastValidState = this.getValid();
            }
            this.highlightInputIfNotValid();
        };
        this.keyDownHandler = (inEvent) => {
            var _a, _b, _c, _d;
            const isEnterDown = inEvent.keyCode === 13 || inEvent.code === 'Enter' || inEvent.key === 'Enter';
            const isEscDown = inEvent.keyCode === 27 || inEvent.code.includes('Esc') || inEvent.key.includes('Esc');
            if (isEnterDown || isEscDown) {
                const currentElement = inEvent.currentTarget;
                this._dirty = true;
                this._clean = false;
                this.dirtyValue = currentElement.value;
            }
            if (isEnterDown && this.sendEventOnEnterKey) {
                (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnEnterKey)) === null || _a === void 0 ? void 0 : _a.publish(true);
                (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnEnterKey)) === null || _b === void 0 ? void 0 : _b.publish(false);
            }
            else if (isEscDown && this.sendEventOnEscKey) {
                (_c = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnEscKey)) === null || _c === void 0 ? void 0 : _c.publish(true);
                (_d = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnEscKey)) === null || _d === void 0 ? void 0 : _d.publish(false);
            }
            if (this.scaling) {
                this.handleInputScaling();
            }
        };
        this.onFocusHandler = () => {
            var _a, _b;
            if (this.lastValidState === undefined || this.lastValidState === null) {
                this.lastValidState = this.getValid();
            }
            if (this.sendEventOnFocus) {
                (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnFocus)) === null || _a === void 0 ? void 0 : _a.publish(true);
                (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnFocus)) === null || _b === void 0 ? void 0 : _b.publish(false);
            }
            this.classList.add(this.primaryCssClass + '--focused');
            this.highlightInputIfNotValid();
        };
        this.onBlurHandler = () => {
            var _a, _b;
            if (this.sendEventOnBlur) {
                (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnBlur)) === null || _a === void 0 ? void 0 : _a.publish(true);
                (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnBlur)) === null || _b === void 0 ? void 0 : _b.publish(false);
            }
            this.classList.remove(this.primaryCssClass + '--focused');
            this.highlightInputIfNotValid();
        };
        this.onKeyPressHandler = (inEvent) => {
            if (this.feedbackMode === 'direct') {
                const currentElement = inEvent.currentTarget;
                this._dirty = true;
                this._clean = false;
                this.dirtyValue = currentElement.value;
            }
        };
        this.logger.start('constructor()', Ch5TextInput.ELEMENT_NAME);
        this.ignoreAttributes = [];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5TextInput.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes.concat(Ch5CommonInput.observedAttributes);
        const newObsAttrs = [];
        for (let i = 0; i < Ch5TextInput.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TextInput.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5TextInput.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            if (attr.toLowerCase() === 'text-transform') {
                this.textTransform = newValue;
            }
            this.logger.log('ch5-textinput attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5TextInput.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
            this._addAriaAttributes();
        }
        if (attr === 'disabled') {
            this.disabled === true ? this._elInput.setAttribute('disabled', '') : this._elInput.removeAttribute('disabled');
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5TextInput.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5TextInput);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-textinput');
            this.appendChild(this._elContainer);
        }
        if (this.hasAttribute('value')) {
            this.value = this.getAttribute('value');
            this.cleanValue = this.value;
            this._elInput.value = this.cleanValue;
        }
        this.attachEventListeners();
        this.initAttributes();
        this._addAriaAttributes();
        this.initCommonMutationObserver(this);
        this.lastValidState = this.getValid();
        this.previousLength = this._elInput.value.length;
        customElements.whenDefined('ch5-textinput').then(() => {
            this.componentLoadedEvent(Ch5TextInput.ELEMENT_NAME, this.id);
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
        this.classList.add(this.primaryCssClass);
        this._elContainer = document.createElement('div');
        this._elContainer.classList.add(this.primaryCssClass + '-container');
        this._elIcon = document.createElement('i');
        this._elIcon.classList.add(this.primaryCssClass + '--icon');
        this._elInput = document.createElement('input');
        this._elInput.classList.add(this.primaryCssClass + '--input');
        this._labelElement = document.createElement('label');
        this._labelElement.classList.add(this.primaryCssClass + '--label');
        this._elContainer.appendChild(this._elInput);
        this._elIcon.setAttribute('role', 'icon');
        this._elInput.setAttribute('aria-multiline', 'false');
        this._elInput.setAttribute('role', 'textbox');
        this.appendChild(this._elContainer);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('text-transform')) {
            this.textTransform = this.getAttribute('text-transform');
        }
        const thisRef = this;
        for (let i = 0; i < Ch5TextInput.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TextInput.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5TextInput.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5TextInput.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._elInput.addEventListener('keyup', this.onChangeHandler);
        this._elInput.addEventListener('keydown', this.keyDownHandler);
        this._elInput.addEventListener('focus', this.onFocusHandler);
        this._elInput.addEventListener('blur', this.onBlurHandler);
        this._elInput.addEventListener('input', this.onKeyPressHandler);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elInput.removeEventListener('keyup', this.onChangeHandler);
        this._elInput.removeEventListener('keydown', this.keyDownHandler);
        this._elInput.removeEventListener('focus', this.onFocusHandler);
        this._elInput.removeEventListener('blur', this.onBlurHandler);
        this._elInput.removeEventListener('input', this.onKeyPressHandler);
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
    handlePattern() {
        this._elInput.setAttribute('pattern', this.pattern);
        if (this.mask !== "") {
            this._elInput.removeAttribute('mask');
            this.mask = "";
            this._maskingUtility = null;
            this.repaint();
        }
    }
    handleMask() {
        if (this.hasAttribute('pattern') && this.getAttribute('pattern') !== null && this.getAttribute('pattern') !== "") {
            return;
        }
        if (this._maskingUtility !== null) {
            this._maskingUtility.stop();
            Array.from(this._elContainer.children).forEach(child => child.remove());
            this._elContainer.appendChild(this._elIcon);
            this._elContainer.appendChild(this._elInput);
            this._maskingUtility = null;
            if (this.mask === "") {
                return;
            }
        }
        this._elInput.setAttribute('mask', this.mask);
        this._maskingUtility = new Ch5TextInputMask(this._elInput, this.mask);
        this._maskingUtility.init();
        if (this.hasAttribute('placeholder')) {
            this._maskingUtility.placeholder = this.placeholder;
        }
    }
    handleIconClass() {
        var _a, _b;
        this._elIcon.className = '';
        this._elIcon.classList.add(this.primaryCssClass + '--icon');
        this._elIcon.classList.add(this.primaryCssClass + '--icon-position-' + this.iconPosition);
        if (this.iconClass.trim() !== "") {
            this.iconClass.split(' ').forEach((clsName) => this._elIcon.classList.add(clsName));
        }
        this.iconClass === '' ? this._elIcon.remove() : this.iconPosition === 'first' ? (_a = this._elInput.parentElement) === null || _a === void 0 ? void 0 : _a.prepend(this._elIcon) : (_b = this._elInput.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(this._elIcon);
    }
    handleIcon() {
        var _a, _b;
        this._elIcon.className = '';
        this._elIcon.classList.add(this.primaryCssClass + '--icon');
        this._elIcon.classList.add(this.primaryCssClass + '--icon-position-' + this.iconPosition);
        if (this.icon.trim() !== "") {
            this.icon.split(' ').forEach((clsName) => this._elIcon.classList.add(clsName));
        }
        this.icon === '' ? this._elIcon.remove() : this.iconPosition === 'first' ? (_a = this._elInput.parentElement) === null || _a === void 0 ? void 0 : _a.prepend(this._elIcon) : (_b = this._elInput.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(this._elIcon);
    }
    handleLabel() {
        this.label = this._getTranslatedValue('label', this.label);
        this._labelElement.innerHTML = this.label;
        this.label === "" ? this.removeChild(this._labelElement) : this.prepend(this._labelElement);
    }
    handlePlaceholder() {
        this.placeholder = this._getTranslatedValue('placeholder', this.placeholder);
        this._elInput.setAttribute('placeholder', this.placeholder);
        if (this._maskingUtility !== null) {
            this._maskingUtility.placeholder = this.placeholder;
        }
    }
    handleType() {
        this._elInput.setAttribute('type', this.type);
    }
    handleMinValue() {
        this._elInput.setAttribute('min', this.minValue + '');
    }
    handleMaxValue() {
        this._elInput.setAttribute('max', this.maxValue + '');
    }
    handleSize() {
        var _a;
        Array.from(Ch5TextInput.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this.classList.remove(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        (_a = this._maskingUtility) === null || _a === void 0 ? void 0 : _a._makeMaskElementLookAsInputPlaceholder();
    }
    handleStretch() {
        Array.from(Ch5TextInput.COMPONENT_DATA.STRETCH.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.STRETCH.classListPrefix + e);
        });
        if (this.stretch) {
            this._elContainer.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.STRETCH.classListPrefix + this.stretch);
        }
    }
    handleTextTransform() {
        Array.from(Ch5TextInput.COMPONENT_DATA.TEXT_TRANSFORM.values).forEach((e) => {
            this._elInput.classList.remove(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.TEXT_TRANSFORM.classListPrefix + e);
        });
        this._elInput.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.TEXT_TRANSFORM.classListPrefix + this.textTransform);
    }
    handleScaling() {
        if (this.scaling) {
            this._elInput.classList.add('ch5-textinput--input-scaling');
        }
        else {
            this._elInput.classList.remove('ch5-textinput--input-scaling');
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this._elIcon.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.ICON_POSITION.classListPrefix + this.iconPosition);
        this._elInput.classList.add(this.primaryCssClass + Ch5TextInput.COMPONENT_DATA.TEXT_TRANSFORM.classListPrefix + this.textTransform);
        this.logger.stop();
    }
    handleCleanWithScale() {
        const { clientWidth, scrollWidth } = this._elInput;
        const overflow = clientWidth < scrollWidth;
        if (overflow === false) {
            this._elInput.style.removeProperty('font-size');
            this.previousLength = this._elInput.value.length;
            return;
        }
        while (overflow === true) {
            const currentFontStyle = window.getComputedStyle(this._elInput).fontSize;
            const currentFontSize = Number(currentFontStyle.replace('px', ''));
            if (currentFontSize === this.minimumFontSize) {
                break;
            }
            this._elInput.style.fontSize = (currentFontSize - Ch5TextInput.SCALING_INDEX) + 'px';
            const { clientWidth, scrollWidth } = this._elInput;
            if (clientWidth < scrollWidth === false) {
                break;
            }
        }
    }
    handleInputScaling() {
        const { clientWidth, scrollWidth } = this._elInput;
        const overflow = clientWidth < scrollWidth;
        if (overflow === false) {
            this._elInput.style.removeProperty('font-size');
            this.previousLength = this._elInput.value.length;
            return;
        }
        const currentFontStyle = window.getComputedStyle(this._elInput).fontSize;
        const currentFontSize = Number(currentFontStyle.replace('px', ''));
        if (this.previousLength > this._elInput.value.length) {
            this._elInput.style.fontSize = (currentFontSize + Ch5TextInput.SCALING_INDEX) + 'px';
        }
        else if (currentFontSize > this.minimumFontSize) {
            this._elInput.style.fontSize = (currentFontSize - Ch5TextInput.SCALING_INDEX) + 'px';
        }
        this.previousLength = this._elInput.value.length;
    }
    _onChangeSignal(value) {
        var _a;
        if (this.sendEventOnChange) {
            (_a = Ch5SignalFactory.getInstance().getStringSignal(this.sendEventOnChange)) === null || _a === void 0 ? void 0 : _a.publish(Ch5Common.handlingTextTransformValue(value, this.textTransform));
        }
    }
    dirtyTimerHandle() {
        if (this._dirtyTimerHandle !== null) {
            clearTimeout(this._dirtyTimerHandle);
        }
        this._dirtyTimerHandle = window.setTimeout(() => this.valueSync(), this.signalValueSyncTimeout);
    }
    valueSync() {
        this._dirtyTimerHandle = null;
        if (this._elInput.value !== this.cleanValue) {
            this._createCleanCustomEvent();
            this.dispatchEvent(this.cleanCustomEvent);
            this.runEventHandlers('clean', this.cleanCustomEvent);
            this.value = Ch5Common.handlingTextTransformValue(this.cleanValue, this.textTransform);
            this._elInput.value = this.value + '';
            this._clean = true;
            this._dirty = false;
            if (this.scaling) {
                this.handleCleanWithScale();
            }
            if (this.mask !== '' && this._maskingUtility !== null) {
                const lastValueLength = this._maskingUtility.lastValueLength;
                const valueLength = this.value.length;
                this._maskingUtility.dispatchMaskUpdateEvent();
                for (let i = lastValueLength; i >= valueLength; i--) {
                    this._maskingUtility._updateCharactersInMask();
                    this._maskingUtility.lastValueLength--;
                }
                if (this.value.length === 0) {
                    const focusEvent = new Event('focus');
                    this._elInput.dispatchEvent(focusEvent);
                }
            }
        }
    }
    highlightInputIfNotValid() {
        const modifierClassName = this.primaryCssClass + '--error';
        if (!this.getValid()) {
            this.classList.add(modifierClassName);
            this._elInput.classList.add(modifierClassName);
        }
        else {
            this.classList.remove(modifierClassName);
            this._elInput.classList.remove(modifierClassName);
        }
    }
    setValue(value) {
        this.value = value;
        this._elInput.value = value;
    }
    submit() {
        if (this.feedbackMode === 'submit' && this.getValid() === true) {
            if (this.value !== this.cleanValue && this.dirtyValue !== this.value) {
                this._onChangeSignal(this.value);
            }
            this._submitted = true;
            this._dirty = false;
            this.dirtyValue = this._elInput.value;
            this.dirtyTimerHandle();
            this._clean = true;
        }
    }
    reset() {
        this._clean = true;
        this._dirty = false;
        this.value = this._cleanValue;
        this._elInput.value = this.value + '';
        this._createCleanCustomEvent();
        this.dispatchEvent(this.cleanCustomEvent);
        if (this.onclean instanceof HtmlCallback) {
            this.onclean.run({});
        }
        else if (this.onclean instanceof Function) {
            this.onclean();
        }
    }
    updateValue(value) {
        this.dirtyValue = value;
        this.value = this._elInput.value = value;
        this.cleanValue = value;
        this._elInput.setAttribute('value', this.cleanValue + '');
        if (this.scaling) {
            this.handleCleanWithScale();
        }
    }
    getValid() {
        return this._elInput.validity.valid && !this._elInput.validity.tooLong && !this._elInput.validity.tooShort;
    }
    getTargetElementForCssClassesAndStyle() {
        return this;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    _createValidityChangeEvent(message) {
        this.validityChangeEvent = this._createCustomEvent('validitychange', message);
    }
    _createDirtyCustomEvent(message) {
        this.dirtyCustomEvent = this._createCustomEvent('dirty', message);
    }
    _createCleanCustomEvent() {
        this.cleanCustomEvent = this._createCustomEvent('clean');
    }
    _createCustomEvent(eventName, message = '') {
        const event = new CustomEvent(eventName, {
            detail: {
                message,
                time: new Date()
            },
            bubbles: true,
            cancelable: true
        });
        return event;
    }
    _addAriaAttributes() {
        this._elInput.setAttribute('aria-placeholder', this.placeholder);
        this._elInput.setAttribute('aria-required', this.required + '');
        this._labelElement.setAttribute('aria-label', this.label);
        this._elInput.setAttribute('aria-labeledby', this.label);
    }
}
Ch5TextInput.ICON_POSITION = ['first', 'last'];
Ch5TextInput.INPUT_TYPE = ['text', 'number', 'email', 'password'];
Ch5TextInput.SIZE = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5TextInput.STRETCH = ['fixed', 'width', 'content'];
Ch5TextInput.TEXT_TRANSFORM = ['none', 'capitalize', 'uppercase', 'lowercase'];
Ch5TextInput.COMPONENT_DATA = {
    ICON_POSITION: {
        default: Ch5TextInput.ICON_POSITION[0],
        values: Ch5TextInput.ICON_POSITION,
        key: 'iconPosition',
        attribute: 'iconPosition',
        classListPrefix: '--icon-position-'
    },
    INPUT_TYPE: {
        default: Ch5TextInput.INPUT_TYPE[0],
        values: Ch5TextInput.INPUT_TYPE,
        key: 'type',
        attribute: 'type',
        classListPrefix: '--input-type-'
    },
    SIZE: {
        default: Ch5TextInput.SIZE[0],
        values: Ch5TextInput.SIZE,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    },
    STRETCH: {
        default: Ch5TextInput.STRETCH[0],
        values: Ch5TextInput.STRETCH,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '-container--stretch-'
    },
    TEXT_TRANSFORM: {
        default: Ch5TextInput.TEXT_TRANSFORM[0],
        values: Ch5TextInput.TEXT_TRANSFORM,
        key: 'text-transform',
        attribute: 'text-transform',
        classListPrefix: '--text-transform-'
    },
};
Ch5TextInput.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatefocus: { direction: "state", booleanJoin: 1, contractName: true }, receivestatevalue: { direction: "state", stringJoin: 1, contractName: true }, sendeventonchange: { direction: "event", stringJoin: 1, contractName: true }, sendeventonfocus: { direction: "event", stringJoin: 1, contractName: true }, sendeventonblur: { direction: "event", stringJoin: 1, contractName: true }, sendeventonenterkey: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonesckey: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5TextInput.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "pattern",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "mask",
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
        name: "icon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "label",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "placeholder",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: Ch5TextInput.ICON_POSITION[0],
        enumeratedValues: Ch5TextInput.ICON_POSITION,
        name: "iconPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TextInput.ICON_POSITION[0],
        isObservableProperty: true,
    },
    {
        default: Ch5TextInput.INPUT_TYPE[0],
        enumeratedValues: Ch5TextInput.INPUT_TYPE,
        name: "type",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TextInput.INPUT_TYPE[0],
        isObservableProperty: true,
    },
    {
        default: 0,
        name: "minLength",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 99,
            conditionalMin: 0,
            conditionalMax: 99,
            conditionalMinValue: 0,
            conditionalMaxValue: 99
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "maxLength",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 99,
            conditionalMin: 0,
            conditionalMax: 99,
            conditionalMinValue: 0,
            conditionalMaxValue: 99
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "minValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 99,
            conditionalMin: 0,
            conditionalMax: 99,
            conditionalMinValue: 0,
            conditionalMaxValue: 99
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "maxValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 99,
            conditionalMin: 0,
            conditionalMax: 99,
            conditionalMinValue: 0,
            conditionalMaxValue: 99
        },
        isObservableProperty: true
    },
    {
        default: Ch5TextInput.SIZE[0],
        enumeratedValues: Ch5TextInput.SIZE,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TextInput.SIZE[0],
        isObservableProperty: true,
    },
    {
        default: null,
        enumeratedValues: Ch5TextInput.STRETCH,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true,
    },
    {
        default: Ch5TextInput.TEXT_TRANSFORM[0],
        enumeratedValues: Ch5TextInput.TEXT_TRANSFORM,
        name: "text-transform",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TextInput.TEXT_TRANSFORM[0],
        isObservableProperty: true,
    },
    {
        default: false,
        name: "scaling",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: 12,
        name: "minimumFontSize",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 10000,
            conditionalMin: 0,
            conditionalMax: 10000,
            conditionalMinValue: 0,
            conditionalMaxValue: 10000
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "tabIndex",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 100000,
            conditionalMin: 0,
            conditionalMax: 100000,
            conditionalMinValue: 0,
            conditionalMaxValue: 100000
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateFocus",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValue",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnChange",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnFocus",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBlur",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "onValidityChange",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "value",
        nameForSignal: "receiveStateValue",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnEnterKey",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnEscKey",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
Ch5TextInput.ELEMENT_NAME = 'ch5-textinput';
Ch5TextInput.SCALING_INDEX = 0.25;
Ch5TextInput.registerCustomElement();
Ch5TextInput.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRleHRpbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS10ZXh0aW5wdXQvY2g1LXRleHRpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFHN0QsTUFBTSxPQUFPLFlBQWEsU0FBUSxjQUFjO0lBaVg5QyxJQUFXLE9BQU8sQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3JELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsSUFBVyxJQUFJLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFB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