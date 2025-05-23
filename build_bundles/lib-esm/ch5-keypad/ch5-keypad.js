import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5KeypadButton } from "./ch5-keypad-btn";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { CH5KeypadUtils } from "./ch5-keypad-utils";
import { resizeObserver } from "../ch5-core/resize-observer";
export class Ch5Keypad extends Ch5Common {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function") {
            window.customElements.define(Ch5Keypad.ELEMENT_NAME, Ch5Keypad);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Keypad.ELEMENT_NAME, Ch5Keypad.SIGNAL_ATTRIBUTE_TYPES);
    }
    set contractName(value) {
        this._ch5Properties.set("contractName", value, () => {
            this.debounceContract();
        });
    }
    get contractName() {
        var _a;
        return (_a = this._ch5Properties.get("contractName")) === null || _a === void 0 ? void 0 : _a.trim();
    }
    set type(value) {
        this._ch5Properties.set("type", value, () => {
            this.handleType();
        });
    }
    get type() {
        return this._ch5Properties.get("type");
    }
    set shape(value) {
        this._ch5Properties.set("shape", value, () => {
            this.handleShape();
        });
    }
    get shape() {
        return this._ch5Properties.get("shape");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.handleSize();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set textOrientation(value) {
        this._ch5Properties.set("textOrientation", value, () => {
            this.handleTextOrientation();
        });
    }
    get textOrientation() {
        return this._ch5Properties.get("textOrientation");
    }
    set showExtraButton(value) {
        this._ch5Properties.set("showExtraButton", value, () => {
            this.handleShowExtraButton();
        });
    }
    get showExtraButton() {
        return this._ch5Properties.get("showExtraButton");
    }
    set sendEventOnClickStart(value) {
        this._ch5Properties.set("sendEventOnClickStart", value, () => {
            this.handleSendEventOnClickStart();
        });
    }
    get sendEventOnClickStart() {
        return this._ch5Properties.get("sendEventOnClickStart");
    }
    set useContractForEnable(value) {
        this._ch5Properties.set("useContractForEnable", value, () => {
            this.debounceContract();
        });
    }
    get useContractForEnable() {
        return this._ch5Properties.get("useContractForEnable");
    }
    set useContractForShow(value) {
        this._ch5Properties.set("useContractForShow", value, () => {
            this.debounceContract();
        });
    }
    get useContractForShow() {
        return this._ch5Properties.get("useContractForShow");
    }
    set useContractForCustomStyle(value) {
        this._ch5Properties.set("useContractForCustomStyle", value, () => {
            this.debounceContract();
        });
    }
    get useContractForCustomStyle() {
        return this._ch5Properties.get("useContractForCustomStyle");
    }
    set useContractForCustomClass(value) {
        this._ch5Properties.set("useContractForCustomClass", value, () => {
            this.debounceContract();
        });
    }
    get useContractForCustomClass() {
        return this._ch5Properties.get("useContractForCustomClass");
    }
    set useContractForExtraButtonShow(value) {
        this._ch5Properties.set("useContractForExtraButtonShow", value, () => {
            this.debounceContract();
        });
    }
    get useContractForExtraButtonShow() {
        return this._ch5Properties.get("useContractForExtraButtonShow");
    }
    set receiveStateExtraButtonShow(value) {
        this._ch5Properties.set("receiveStateExtraButtonShow", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("showExtraButton", newValue, () => {
                this.handleShowExtraButton();
            });
        });
    }
    get receiveStateExtraButtonShow() {
        return this._ch5Properties.get("receiveStateExtraButtonShow");
    }
    set hidePoundButton(value) {
        this._ch5Properties.set("hidePoundButton", value, () => {
            this.handleHidePoundButton();
        });
    }
    get hidePoundButton() {
        return this._ch5Properties.get("hidePoundButton");
    }
    set hideAsteriskButton(value) {
        this._ch5Properties.set("hideAsteriskButton", value, () => {
            this.handleHideAsteriskButton();
        });
    }
    get hideAsteriskButton() {
        return this._ch5Properties.get("hideAsteriskButton");
    }
    set receiveStateHideAsteriskButton(value) {
        this._ch5Properties.set("receiveStateHideAsteriskButton", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("hideAsteriskButton", newValue, () => {
                this.handleHideAsteriskButton();
            });
        });
    }
    get receiveStateHideAsteriskButton() {
        return this._ch5Properties.get('receiveStateHideAsteriskButton');
    }
    set receiveStateHidePoundButton(value) {
        this._ch5Properties.set("receiveStateHidePoundButton", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("hidePoundButton", newValue, () => {
                this.handleHidePoundButton();
            });
        });
    }
    get receiveStateHidePoundButton() {
        return this._ch5Properties.get('receiveStateHidePoundButton');
    }
    set useContractForHidePoundButton(value) {
        this._ch5Properties.set("useContractForHidePoundButton", value, () => {
            this.debounceContract();
        });
    }
    get useContractForHidePoundButton() {
        return this._ch5Properties.get("useContractForHidePoundButton");
    }
    set useContractForHideAsteriskButton(value) {
        this._ch5Properties.set("useContractForHideAsteriskButton", value, () => {
            this.debounceContract();
        });
    }
    get useContractForHideAsteriskButton() {
        return this._ch5Properties.get("useContractForHideAsteriskButton");
    }
    set displayLabelMajorOnly(value) {
        this._ch5Properties.set("displayLabelMajorOnly", value, () => {
            this.handleDisplayLabelMajorOnly();
        });
    }
    get displayLabelMajorOnly() {
        return this._ch5Properties.get("displayLabelMajorOnly");
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-keypad';
        this.displayLabelMajorOnlyCssClass = '--display-label-major-only-';
        this._elContainer = {};
        this.keypadButtons = new Array(Ch5Keypad.TOTAL_KEYPAD_BUTTONS).fill(null);
        this.signalNameOnContract = {
            contractName: "",
            receiveStateEnable: "",
            receiveStateShow: "",
            receiveStateCustomClass: "",
            receiveStateCustomStyle: "",
            receiveStateExtraButtonShow: "",
            receiveStateHideAsteriskButton: "",
            receiveStateHidePoundButton: ""
        };
        this.resizeHandler = () => {
            this.handleStretchResize();
        };
        this.debounceContract = this.debounce(() => {
            this.handleContract();
        }, 10);
        this.logger.start('constructor()', Ch5Keypad.ELEMENT_NAME);
        this.ignoreAttributes = [];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Keypad.COMPONENT_PROPERTIES);
        resizeObserver(this._elContainer, this.resizeHandler);
        this.updateCssClass();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    initAttributes() {
        this.logger.start("initAttributes", Ch5Keypad.ELEMENT_NAME);
        super.initAttributes();
        this.setAttribute('data-ch5-id', this.getCrId());
        const thisRef = this;
        for (let i = 0; i < Ch5Keypad.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Keypad.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Keypad.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Keypad.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5Keypad.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Keypad);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-keypad');
            this.appendChild(this._elContainer);
        }
        this.buildRuntimeChildButtonList();
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.createKeyPadButtons();
        customElements.whenDefined('ch5-keypad').then(() => {
            this.componentLoadedEvent(Ch5Keypad.ELEMENT_NAME, this.id);
        });
        this.logger.stop();
    }
    handleDisplayLabelMajorOnly() {
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.primaryCssClass + this.displayLabelMajorOnlyCssClass + bool.toString());
        });
        this._elContainer.classList.add(this.primaryCssClass + this.displayLabelMajorOnlyCssClass + this.displayLabelMajorOnly);
    }
    createKeyPadButtons() {
        this._elContainer.innerHTML = "";
        for (let i = 0; i < Ch5Keypad.TOTAL_KEYPAD_BUTTONS; i++) {
            const defaultObj = CH5KeypadUtils.KEYPAD_DEFAULT_VALUES[i];
            const keypadButton = this.keypadButtons[i];
            if (keypadButton === null) {
                const newBtn = new Ch5KeypadButton(defaultObj);
                this._elContainer.appendChild(newBtn);
            }
            else {
                this._elContainer.appendChild(keypadButton);
            }
        }
        this.handleSendEventOnClickStart();
    }
    disconnectedCallback() {
        this.logger.log("disconnectedCallback");
        this.removeEvents();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
    }
    removeEvents() {
        super.removeEventListeners();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Keypad.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Keypad.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Keypad.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-keypad attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Keypad.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    attachEventListeners() {
        super.attachEventListeners();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this.logger.stop();
    }
    buildRuntimeChildButtonList() {
        var _a;
        const childElements = Array.from(this.children);
        if (childElements.length > 0) {
            const keypadButtonKey = CH5KeypadUtils.KEYPAD_BUTTON_KEY;
            for (const ele of childElements) {
                if (ele.tagName.toLowerCase() === 'ch5-keypad-button') {
                    const key = ((_a = ele.getAttribute('key')) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) || '';
                    const index = keypadButtonKey.findIndex((ele) => ele === key);
                    if (index !== -1 && this.keypadButtons[index] === null) {
                        this.keypadButtons[index] = ele;
                    }
                    else {
                        ele.remove();
                    }
                }
            }
        }
    }
    handleType() {
        Array.from(Ch5Keypad.COMPONENT_DATA.TYPE.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TYPE.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TYPE.classListPrefix + this.type);
    }
    handleShape() {
        Array.from(Ch5Keypad.COMPONENT_DATA.SHAPE.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SHAPE.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SHAPE.classListPrefix + this.shape);
    }
    handleStretch() {
        Array.from(Ch5Keypad.COMPONENT_DATA.STRETCH.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.STRETCH.classListPrefix + e);
        });
        if (this.stretch === 'both' || this.stretch === 'height' || this.stretch === 'width') {
            this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.STRETCH.classListPrefix + this.stretch);
        }
        this.handleStretchResize();
    }
    handleTextOrientation() {
        Array.from(Ch5Keypad.COMPONENT_DATA.TEXT_ORIENTATION.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TEXT_ORIENTATION.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TEXT_ORIENTATION.classListPrefix + this.textOrientation);
    }
    handleSize() {
        Array.from(Ch5Keypad.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SIZE.classListPrefix + this.size);
    }
    handleShowExtraButton() {
        if (this.showExtraButton === true) {
            this._elContainer.classList.add(this.primaryCssClass + '--show-extra-button');
        }
        else {
            this._elContainer.classList.remove(this.primaryCssClass + '--show-extra-button');
        }
    }
    handleContract() {
        if (this.contractName.length === 0) {
            this.signalNameOnContract.contractName = "";
            this.receiveStateShow = this.signalNameOnContract.receiveStateShow || this.receiveStateShow;
            this.receiveStateEnable = this.signalNameOnContract.receiveStateEnable || this.receiveStateEnable;
            this.receiveStateCustomStyle = this.signalNameOnContract.receiveStateCustomStyle || this.receiveStateCustomStyle;
            this.receiveStateCustomClass = this.signalNameOnContract.receiveStateCustomClass || this.receiveStateCustomClass;
            this.receiveStateExtraButtonShow = this.signalNameOnContract.receiveStateExtraButtonShow || this.receiveStateExtraButtonShow;
            this.receiveStateHideAsteriskButton = this.signalNameOnContract.receiveStateHideAsteriskButton || this.receiveStateHideAsteriskButton;
            this.receiveStateHidePoundButton = this.signalNameOnContract.receiveStateHidePoundButton || this.receiveStateHidePoundButton;
        }
        else if (this.signalNameOnContract.contractName === "") {
            this.signalNameOnContract.contractName = this.contractName;
            this.signalNameOnContract.receiveStateShow = this.receiveStateShow;
            this.signalNameOnContract.receiveStateEnable = this.receiveStateEnable;
            this.signalNameOnContract.receiveStateCustomStyle = this.receiveStateCustomStyle;
            this.signalNameOnContract.receiveStateCustomClass = this.receiveStateCustomClass;
            this.signalNameOnContract.receiveStateExtraButtonShow = this.receiveStateExtraButtonShow;
            this.signalNameOnContract.receiveStateHideAsteriskButton = this.receiveStateHideAsteriskButton;
            this.signalNameOnContract.receiveStateHidePoundButton = this.receiveStateHidePoundButton;
        }
        this.contractDefaultHelper();
        this.handleSendEventOnClickStart();
    }
    contractDefaultHelper() {
        if (this.contractName !== "") {
            if (this.useContractForCustomStyle === true) {
                this.receiveStateCustomStyle = this.contractName + '.CustomStyle';
            }
            if (this.useContractForCustomClass === true) {
                this.receiveStateCustomClass = this.contractName + '.CustomClass';
            }
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = this.contractName + '.Enable';
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = this.contractName + '.Show';
            }
            if (this.useContractForHideAsteriskButton === true) {
                this.receiveStateHideAsteriskButton = this.contractName + '.HideAsteriskButton';
            }
            if (this.useContractForHidePoundButton === true) {
                this.receiveStateHidePoundButton = this.contractName + '.HidePoundButton';
            }
            if (this.useContractForExtraButtonShow === true) {
                this.receiveStateExtraButtonShow = this.contractName + '.ExtraButtonShow';
            }
        }
    }
    handleSendEventOnClickStart() {
        const containerChildren = Array.from(this._elContainer.children);
        if (this.contractName !== "") {
            containerChildren.forEach((ele, index) => {
                const value = this.contractName + '.' + CH5KeypadUtils.CONTRACT_SEND_EVENT_ON_CLICK[index];
                ele.setAttribute('sendEventOnClick', value);
            });
            return;
        }
        const start = parseInt(this.sendEventOnClickStart, 10);
        if (isNaN(start)) {
            containerChildren.forEach((ele) => ele.removeAttribute('sendEventOnClick'));
            return;
        }
        containerChildren.forEach((ele, index) => {
            if (index === 10) {
                ele.setAttribute('sendEventOnClick', start + '');
            }
            else if (index === 11 || index === 12) {
                ele.setAttribute('sendEventOnClick', start + index + '');
            }
            else {
                ele.setAttribute('sendEventOnClick', (start + index + 1) + '');
            }
        });
    }
    handleStretchResize() {
        if (this.stretch === null || (this.stretch !== 'both' && this.stretch !== 'height' && this.stretch !== 'width')) {
            this._elContainer.style.removeProperty('width');
            this._elContainer.style.removeProperty('height');
            this.style.removeProperty('display');
            return;
        }
        if (!this.parentElement) {
            return;
        }
        const { offsetHeight: parentHeight, offsetWidth: parentWidth } = this.parentElement;
        const heightUnit = this.showExtraButton ? parentHeight / 5 : parentHeight / 4;
        const widthUnit = parentWidth / 3;
        if (heightUnit / widthUnit < 1) {
            this._elContainer.style.width = "unset";
            this._elContainer.style.height = parentHeight + 'px';
        }
        else {
            this._elContainer.style.width = parentWidth + 'px';
        }
        this.style.display = "block";
    }
    handleHidePoundButton() {
        const centerBtn = this.querySelector('.keypad-btn.misc-btn-two');
        centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.remove('ch5-hide-vis');
        if (this.hidePoundButton) {
            centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.add('ch5-hide-vis');
        }
    }
    handleHideAsteriskButton() {
        const centerBtn = this.querySelector('.keypad-btn.misc-btn-one');
        centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.remove('ch5-hide-vis');
        if (this.hideAsteriskButton) {
            centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.add('ch5-hide-vis');
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TYPE.classListPrefix + this.type);
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SHAPE.classListPrefix + this.shape);
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.TEXT_ORIENTATION.classListPrefix + this.textOrientation);
        this._elContainer.classList.add(this.primaryCssClass + Ch5Keypad.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this._elContainer.classList.add(this.primaryCssClass + this.displayLabelMajorOnlyCssClass + this.displayLabelMajorOnly);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5Keypad.ELEMENT_NAME = 'ch5-keypad';
Ch5Keypad.TOTAL_KEYPAD_BUTTONS = 13;
Ch5Keypad.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateextrabuttonshow: { direction: "state", booleanJoin: 1, contractName: true }, receivestatehideasteriskbutton: { direction: "state", booleanJoin: 1, contractName: true }, receivestatehidepoundbutton: { direction: "state", booleanJoin: 1, contractName: true }, sendeventonclickstart: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5Keypad.TYPES = ['default', 'primary', 'info', 'text', 'danger', 'warning', 'success', 'secondary'];
Ch5Keypad.SHAPES = ['rounded-rectangle', 'square', 'circle'];
Ch5Keypad.STRETCHES = ['both', 'width', 'height'];
Ch5Keypad.TEXT_ORIENTATIONS = ['top', 'right', 'bottom', 'left'];
Ch5Keypad.SIZES = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5Keypad.COMPONENT_DATA = {
    TYPE: {
        default: Ch5Keypad.TYPES[0],
        values: Ch5Keypad.TYPES,
        key: 'type',
        attribute: 'type',
        classListPrefix: "--type-"
    },
    STRETCH: {
        default: null,
        values: Ch5Keypad.STRETCHES,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: "--stretch-"
    },
    SHAPE: {
        default: Ch5Keypad.SHAPES[0],
        values: Ch5Keypad.SHAPES,
        key: 'shape',
        attribute: 'shape',
        classListPrefix: "--shape-"
    },
    TEXT_ORIENTATION: {
        default: Ch5Keypad.TEXT_ORIENTATIONS[0],
        values: Ch5Keypad.TEXT_ORIENTATIONS,
        key: 'textOrientation',
        attribute: 'textOrientation',
        classListPrefix: "--orientation-"
    },
    SIZE: {
        default: Ch5Keypad.SIZES[0],
        values: Ch5Keypad.SIZES,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    },
};
Ch5Keypad.COMPONENT_PROPERTIES = [
    {
        default: Ch5Keypad.TYPES[0],
        enumeratedValues: Ch5Keypad.TYPES,
        name: "type",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Keypad.TYPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5Keypad.SHAPES[0],
        enumeratedValues: Ch5Keypad.SHAPES,
        name: "shape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Keypad.SHAPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5Keypad.SIZES[0],
        enumeratedValues: Ch5Keypad.SIZES,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Keypad.SIZES[0],
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5Keypad.STRETCHES,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Keypad.STRETCHES[0],
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: false,
        name: "showExtraButton",
        nameForSignal: "receiveStateExtraButtonShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateExtraButtonShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5Keypad.TEXT_ORIENTATIONS[0],
        enumeratedValues: Ch5Keypad.TEXT_ORIENTATIONS,
        name: "textOrientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Keypad.TEXT_ORIENTATIONS[0],
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForCustomStyle",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForCustomClass",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForExtraButtonShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        name: "contractName",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnClickStart",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "hidePoundButton",
        nameForSignal: "receiveStateHidePoundButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "hideAsteriskButton",
        nameForSignal: "receiveStateHideAsteriskButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateHideAsteriskButton",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateHidePoundButton",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForHideAsteriskButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForHidePoundButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "displayLabelMajorOnly",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    }
];
Ch5Keypad.registerSignalAttributeTypes();
Ch5Keypad.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWtleXBhZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1rZXlwYWQvY2g1LWtleXBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUVuSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc3RCxNQUFNLE9BQU8sU0FBVSxTQUFRLFNBQVM7SUFvUmhDLE1BQU0sQ0FBQyxxQkFBcUI7UUFDbEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2VBQzFCLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRO2VBQ3pDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDaEU7SUFDRixDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMxSCxDQUFDO0lBS0QsSUFBVyxZQUFZLENBQUMsS0FBYTtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUMz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