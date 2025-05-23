import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Signal, Ch5SignalBridge, Ch5SignalFactory } from "../ch5-core/index";
import { subscribeInViewPortChange, unSubscribeInViewPortChange } from '../ch5-core';
import isNil from 'lodash/isNil';
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5Pressable } from "../ch5-common/ch5-pressable";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5ButtonUtils } from "./ch5-button-utils";
import { Ch5ButtonSignal } from "./ch5-button-signal";
import _ from "lodash";
import { Ch5AugmentVarSignalsNames } from "../ch5-common/ch5-augment-var-signals-names";
import { resizeObserver } from "../ch5-core/resize-observer";
export class Ch5ButtonBase extends Ch5Common {
    set label(value) {
        this.logger.log('set label("' + value + '")');
        if (isNil(value)) {
            value = '';
        }
        const trValue = this._getTranslatedValue('label', value);
        if (trValue !== this.label) {
            this.setAttribute('label', trValue);
            this.setButtonDisplay();
        }
    }
    get label() {
        return this._label;
    }
    set labelInnerHTML(value) {
        this.logger.log('set labelInnerHTML("' + value + '")');
        if (isNil(value)) {
            value = '';
        }
        if (value !== this.labelInnerHTML) {
            this.setAttribute('labelInnerHTML', value);
            this._labelInnerHTML = value;
            this.createButtonLabel(this);
            this.setButtonDisplay();
        }
    }
    get labelInnerHTML() {
        return this._labelInnerHTML;
    }
    set formType(value) {
        this.logger.log('set formType("' + value + '")');
        if (!isNil(value)) {
            this.setAttribute('formType', value);
        }
        else {
            this.removeAttribute('formType');
        }
    }
    get formType() {
        return this._formType;
    }
    set customClass(value) {
        this.setButtonAttribute('customClass', value);
    }
    get customClass() {
        return this._customClass;
    }
    set customStyle(value) {
        this.setButtonAttribute('customStyle', value);
    }
    get customStyle() {
        return this._customStyle;
    }
    set iconClass(value) {
        this.setButtonAttribute('iconClass', value);
    }
    get iconClass() {
        return this._iconClass;
    }
    set hAlignLabel(value) {
        this.setButtonAttribute('hAlignLabel', value, Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS, Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS[0]);
    }
    get hAlignLabel() {
        return this._hAlignLabel;
    }
    setButtonAttribute(attribute, value, enumeratedMasterData = [], defaultValue) {
        this.logger.log('setButtonAttribute: ' + attribute + ' - "' + value + '"');
        if (this[attribute] !== value) {
            if (enumeratedMasterData.length === 0) {
                if (_.isNil(value) || String(value).trim() === "") {
                    this.removeAttribute(attribute);
                    this.setButtonDisplay();
                }
                else {
                    this.setAttribute(attribute, String(value));
                    this.setButtonDisplay();
                }
            }
            else {
                if (enumeratedMasterData.indexOf(value) >= 0) {
                    this.setAttribute(attribute, String(value).trim());
                    this.setButtonDisplay();
                }
                else {
                    if (!_.isNil(defaultValue)) {
                        this.setAttribute(attribute, String(defaultValue).trim());
                        this.setButtonDisplay();
                    }
                    else {
                        this.removeAttribute(attribute);
                        this.setButtonDisplay();
                    }
                }
            }
        }
    }
    set vAlignLabel(value) {
        this.setAttributeAndProperty(this.BUTTON_PROPERTIES.VALIGN_LABEL, value);
    }
    get vAlignLabel() {
        return this._vAlignLabel;
    }
    set mode(value) {
        this.logger.log('set mode("' + value + '")');
        if (this._mode !== value) {
            if (Number.isNaN(value)) {
                this._mode = 0;
            }
            else {
                if (value >= Ch5ButtonBase.MODES.MIN_LENGTH && value <= Ch5ButtonBase.MODES.MAX_LENGTH) {
                    const buttonModesArray = this.getElementsByTagName("ch5-button-mode");
                    if (buttonModesArray && buttonModesArray.length > 0) {
                        if (value < buttonModesArray.length) {
                            this._mode = value;
                        }
                        else {
                            this._mode = 0;
                        }
                    }
                    else {
                        this._mode = 0;
                    }
                }
                else {
                    this._mode = 0;
                }
            }
            this.setAttribute('mode', String(this._mode));
            this.setButtonDisplay();
        }
    }
    get mode() {
        return this._mode;
    }
    set checkboxPosition(value) {
        this.setButtonAttribute('checkboxPosition', value, Ch5ButtonBase.CHECKBOX_POSITIONS, Ch5ButtonBase.CHECKBOX_POSITIONS[0]);
    }
    get checkboxPosition() {
        return this._checkboxPosition;
    }
    set checkboxShow(value) {
        this.logger.log('set checkboxShow("' + value + '")');
        this.setAttributeAndProperty(this.BUTTON_PROPERTIES.CHECKBOX_SHOW, value);
    }
    get checkboxShow() {
        return this._checkboxShow;
    }
    set iconPosition(value) {
        this.setButtonAttribute('iconPosition', value, Ch5ButtonBase.ICON_POSITIONS, Ch5ButtonBase.ICON_POSITIONS[0]);
    }
    get iconPosition() {
        return this._iconPosition;
    }
    set iconUrl(value) {
        this.setButtonAttribute('iconUrl', value);
    }
    get iconUrl() {
        return this._iconUrl;
    }
    set orientation(value) {
        this.logger.log('set orientation("' + value + '")');
        if (this._orientation !== value) {
            this._orientation = Ch5ButtonUtils.getValidInputValue(Ch5ButtonBase.ORIENTATIONS, value);
            this.setAttribute('orientation', this._orientation);
        }
    }
    get orientation() {
        return this._orientation;
    }
    set type(value) {
        this.logger.log('set type("' + value + '")');
        if (this._type !== value) {
            this.setAttribute('type', Ch5ButtonUtils.getValidInputValue(Ch5ButtonBase.TYPES, value));
            this.setButtonDisplay();
        }
    }
    get type() {
        return this._type;
    }
    set shape(value) {
        this.logger.log('set shape("' + value + '")');
        if (this._shape !== value && value !== null) {
            if (Ch5ButtonBase.SHAPES.indexOf(value) >= 0) {
                this._shape = value;
            }
            else {
                this._shape = Ch5ButtonBase.SHAPES[0];
            }
            this.setAttribute('shape', this._shape);
        }
    }
    get shape() {
        return this._shape;
    }
    set size(value) {
        this.logger.log('set size("' + value + '")');
        if (this._size !== value && null !== value) {
            if (Ch5ButtonBase.SIZES.indexOf(value) >= 0) {
                this._size = value;
            }
            else {
                this._size = Ch5ButtonBase.SIZES[0];
            }
            this.setAttribute('size', this._size);
        }
    }
    get size() {
        return this._size;
    }
    set stretch(value) {
        this.logger.log('set stretch("' + value + '")');
        if (value !== null) {
            if (this._stretch !== value) {
                if (Ch5ButtonBase.STRETCHES.indexOf(value) >= 0) {
                    this._stretch = value;
                    this.setAttribute('stretch', this._stretch);
                }
                else {
                    this._stretch = null;
                    this.removeAttribute('stretch');
                }
            }
        }
        else {
            this._stretch = null;
            this.removeAttribute('stretch');
        }
        this.updateCssClasses();
    }
    get stretch() {
        return this._stretch;
    }
    set selected(value) {
        this.logger.log('set selected("' + value + '")');
        if (_.isNil(this.receiveStateSelected) || this.receiveStateSelected === "") {
            this.setAttributeAndProperty(this.BUTTON_PROPERTIES.SELECTED, value);
        }
    }
    get selected() {
        return this._selected;
    }
    set pressed(value) {
        var _a;
        this.logger.log('set pressed("' + value + '")');
        this.setAttributeAndProperty(this.BUTTON_PROPERTIES.PRESSED, value);
        let valueToSet = false;
        if (typeof value === "boolean") {
            valueToSet = value;
        }
        else {
            if (this.hasAttribute("pressed")) {
                if ([true, false, "true", "false", "0", "1", 0, 1, '', null].indexOf(value) < 0) {
                    valueToSet = false;
                }
                else {
                    valueToSet = this.toBoolean(value, true);
                }
            }
            else {
                valueToSet = false;
            }
        }
        if (this._pressable) {
            if (((_a = this._pressable) === null || _a === void 0 ? void 0 : _a._pressed) !== valueToSet) {
                this._pressable.setPressed(valueToSet);
            }
        }
        this.updateCssClasses();
    }
    get pressed() {
        if (this._pressable) {
            return this._pressable._pressed;
        }
        else {
            return false;
        }
    }
    set customClassState(value) {
        this.logger.log('set customclassstate("' + value + '")');
        if (this._customClassState !== value) {
            this._customClassState = value;
        }
    }
    get customClassState() {
        return this._customClassState;
    }
    set customClassPressed(value) {
        this.logger.log('set customClassPressed("' + value + '")');
        if (this._customClassPressed !== value) {
            this._customClassPressed = value;
        }
    }
    get customClassPressed() {
        return this._customClassPressed;
    }
    set customClassDisabled(value) {
        this.logger.log('set customClassDisabled("' + value + '")');
        if (this._customClassDisabled !== value) {
            this._customClassDisabled = value;
        }
    }
    get customClassDisabled() {
        return this._customClassDisabled;
    }
    set backgroundImageUrl(value) {
        this._ch5Properties.set("backgroundImageUrl", value, () => {
            this.backgroundImageURLHandler();
        });
    }
    get backgroundImageUrl() {
        return this._ch5Properties.get("backgroundImageUrl");
    }
    set backgroundImageFillType(value) {
        this._ch5Properties.set("backgroundImageFillType", value, () => {
            this.updateCssClasses();
        });
    }
    get backgroundImageFillType() {
        return this._ch5Properties.get("backgroundImageFillType");
    }
    set iconUrlFillType(value) {
        this._ch5Properties.set("iconUrlFillType", value, () => {
            if (this._iconUrlFillType !== value) {
                this.setButtonDisplay();
                this.updateCssClasses();
            }
        });
    }
    get iconUrlFillType() {
        return this._iconUrlFillType;
    }
    set receiveStateBackgroundImageUrl(value) {
        this._ch5Properties.set("receiveStateBackgroundImageUrl", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("backgroundImageUrl", newValue, () => {
                this.backgroundImageURLHandler();
            });
        });
    }
    get receiveStateBackgroundImageUrl() {
        return this._ch5Properties.get('receiveStateBackgroundImageUrl');
    }
    set sendEventOnClick(value) {
        this.logger.log('set sendEventOnClick("' + value + '")');
        if ((value !== '') && (value !== this._sigNameSendOnClick)) {
            this._sigNameSendOnClick = value;
            this.setAttribute('sendeventonclick', value);
        }
    }
    get sendEventOnClick() {
        return this._sigNameSendOnClick;
    }
    set sendEventOnTouch(value) {
        this.logger.log('set sendEventOnTouch("' + value + '")');
        if ((value !== '') && (value !== this._sigNameSendOnTouch)) {
            this._sigNameSendOnTouch = value;
            this.setAttribute('sendeventontouch', value);
        }
    }
    get sendEventOnTouch() {
        return this._sigNameSendOnTouch;
    }
    set receiveStateSelected(value) {
        this.logger.log('set receiveStateSelected("' + value + '")');
        if (!value || this._sigNameReceiveSelected === value) {
            return;
        }
        if (this._sigNameReceiveSelected) {
            const oldReceiveSelectedSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveSelected);
            const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldReceiveSelectedSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveSelected);
            }
        }
        this._sigNameReceiveSelected = value;
        this.setAttribute('receiveStateSelected', value);
        const receiveSelectedSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveSelected);
        const receiveSignal = Ch5SignalFactory.getInstance().getBooleanSignal(receiveSelectedSigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveSelected = receiveSignal.subscribe((newValue) => {
            if (newValue !== this.selected) {
                this.setAttributeAndProperty(this.BUTTON_PROPERTIES.SELECTED, newValue, true);
            }
        });
    }
    get receiveStateSelected() {
        return this._attributeValueAsString('receivestateselected');
    }
    set receiveStateLabel(inputValue) {
        this.receiveSignalAsString(this, "receiveStateLabel", inputValue);
    }
    get receiveStateLabel() {
        return this._attributeValueAsString('receivestatelabel');
    }
    set receiveStateScriptLabelHtml(inputValue) {
        this.receiveSignalAsString(this, "receiveStateScriptLabelHtml", inputValue);
    }
    get receiveStateScriptLabelHtml() {
        return this._attributeValueAsString('receivestatescriptlabelhtml');
    }
    set receiveStateIconClass(inputValue) {
        this.receiveSignalAsString(this, "receiveStateIconClass", inputValue);
    }
    get receiveStateIconClass() {
        return this._attributeValueAsString('receivestateiconclass');
    }
    set receiveStateIconUrl(inputValue) {
        this.receiveSignalAsString(this, "receiveStateIconUrl", inputValue);
    }
    get receiveStateIconUrl() {
        return this._attributeValueAsString('receivestateiconurl');
    }
    set receiveStateMode(signalName) {
        this.logger.log('set receiveStateMode(\'' + signalName + '\')');
        this.logger.log('this._sigNameReceiveStateMode' + this._sigNameReceiveStateMode);
        if (this._sigNameReceiveStateMode === signalName || signalName === null) {
            return;
        }
        if (this._sigNameReceiveStateMode) {
            this.logger.log('_sigNameReceiveStateMode exists');
            const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveStateMode);
            const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldReceiveStateSigName);
            this.logger.log('oldReceiveStateSigName', oldReceiveStateSigName);
            this.logger.log('oldSignal', oldSignal);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveSignalMode);
            }
        }
        this._sigNameReceiveStateMode = signalName;
        this.setAttribute('receivestatemode', signalName);
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveStateMode);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveSignalMode = receiveSignal.subscribe((newValue) => {
            if (this.isModeSetUsingJavascript === false) {
                this.mode = Number(newValue);
                this.setButtonDisplay();
            }
        });
    }
    get receiveStateMode() {
        return this._attributeValueAsString('receivestatemode');
    }
    set receiveStateType(inputValue) {
        this.receiveSignalAsString(this, "receiveStateType", inputValue);
    }
    get receiveStateType() {
        return this._attributeValueAsString('receivestatetype');
    }
    set sgIconTheme(value) {
        this._ch5Properties.set("sgIconTheme", value, () => {
            Array.from(Ch5ButtonBase.SG_ICON_THEME).forEach((theme) => this._elIcon.classList.remove('sg-' + theme));
            this._elIcon.classList.add('sg-' + this.sgIconTheme);
        });
    }
    get sgIconTheme() {
        return this._ch5Properties.get("sgIconTheme");
    }
    set receiveStateSGIconNumeric(value) {
        this._ch5Properties.set("receiveStateSGIconNumeric", value, null, (newValue) => {
            if (newValue >= 0 && newValue <= Ch5ButtonBase.MAX_SG_NUMERIC) {
                this.sgIconNumeric = newValue;
                this.setButtonDisplay();
            }
        });
    }
    get receiveStateSGIconNumeric() {
        return this._ch5Properties.get('receiveStateSGIconNumeric');
    }
    set receiveStateSGIconString(value) {
        this._ch5Properties.set("receiveStateSGIconString", value, null, (newValue) => {
            this.sgIconString = newValue.trim().toLowerCase().split(' ').join('-');
            this.setButtonDisplay();
        });
    }
    get receiveStateSGIconString() {
        return this._ch5Properties.get('receiveStateSGIconString');
    }
    set receiveStateCustomClass(inputValue) {
        this.receiveSignalAsString(this, "receiveStateCustomClass", inputValue);
    }
    get receiveStateCustomClass() {
        return this._attributeValueAsString('receivestatecustomclass');
    }
    set receiveStateCustomStyle(inputValue) {
        this.receiveSignalAsString(this, "receiveStateCustomStyle", inputValue);
    }
    get receiveStateCustomStyle() {
        return this._attributeValueAsString('receivestatecustomstyle');
    }
    constructor(buttonListContractObj) {
        super();
        this.buttonListContractObj = buttonListContractObj;
        this.BUTTON_PROPERTIES = {
            CHECKBOX_SHOW: {
                default: false,
                valueOnAttributeEmpty: true,
                variableName: "_checkboxShow",
                attributeName: "checkboxShow",
                propertyName: "checkboxShow",
                type: "boolean",
                removeAttributeOnNull: true,
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this,
                callback: this.checkboxDisplay.bind(this)
            },
            SELECTED: {
                default: false,
                valueOnAttributeEmpty: true,
                variableName: "_selected",
                attributeName: "selected",
                propertyName: "selected",
                removeAttributeOnNull: true,
                type: "boolean",
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this,
                callback: this.setSelectionMethods.bind(this)
            },
            VALIGN_LABEL: {
                default: Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0],
                valueOnAttributeEmpty: Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0],
                variableName: "_vAlignLabel",
                attributeName: "vAlignLabel",
                propertyName: "vAlignLabel",
                removeAttributeOnNull: false,
                type: "enum",
                enumeratedValues: Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS,
                componentReference: this,
                callback: this.setButtonDisplay.bind(this)
            },
            PRESSED: {
                default: false,
                valueOnAttributeEmpty: true,
                variableName: "_pressed",
                attributeName: "pressed",
                propertyName: "pressed",
                removeAttributeOnNull: true,
                type: "boolean",
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this
            }
        };
        this.STATE_CHANGE_TIMEOUTS = 500;
        this.BUTTON_PRIMARY_CLASS = 'cb-btn';
        this.pressedCssClassPostfix = '--pressed';
        this.selectedCssClassPostfix = '--selected';
        this.repeatFlag = false;
        this.isResizeInProgress = false;
        this.RESIZE_DEBOUNCE = 500;
        this.ELEMENT_NAME = 'ch5-button';
        this.primaryCssClass = 'ch5-button';
        this.DEBOUNCE_BUTTON_DISPLAY = 25;
        this._elContainer = {};
        this._elButton = {};
        this._elSpanForLabelOnly = {};
        this._elSpanForLabelIconImg = {};
        this._elIcon = {};
        this._elCheckboxIcon = {};
        this._isPressedSubscription = null;
        this._mode = 0;
        this.isModeSetUsingJavascript = false;
        this._label = '';
        this._labelInnerHTML = '';
        this.isLabelSetUsingJavascript = false;
        this.labelSetByJavascriptValue = "";
        this._iconClass = '';
        this._previousIconClass = '';
        this._previousSgIconNumeric = -1;
        this._previousSgIconString = '';
        this._iconPosition = 'first';
        this._checkboxPosition = "left";
        this._checkboxShow = false;
        this.isButtonInitiated = false;
        this._hAlignLabel = 'center';
        this._vAlignLabel = 'middle';
        this._orientation = 'horizontal';
        this._shape = 'rounded-rectangle';
        this._size = 'regular';
        this._formType = null;
        this._stretch = null;
        this._type = 'default';
        this._iconUrlFillType = null;
        this._selected = false;
        this._customClassState = '';
        this._sigNameReceiveSelected = '';
        this._subReceiveSelected = '';
        this._sigNameSendOnTouch = '';
        this._sigNameSendOnClick = '';
        this._sigNameReceiveStateMode = null;
        this._subReceiveSignalMode = null;
        this._repeatDigitalInterval = null;
        this._pressable = null;
        this._iconUrl = '';
        this._previousIconUrl = '';
        this._customClassPressed = null;
        this._customClassDisabled = null;
        this.sgIconNumeric = -1;
        this.sgIconString = "";
        this.buttonListContract = {
            clickHoldTime: 0,
            index: -1,
            contractName: "",
            parentComponent: ""
        };
        this.previousExtendedProperties = {};
        this.debounceSetButtonDisplay = this.debounce(() => {
            this.setButtonDisplayDetails();
        }, this.DEBOUNCE_BUTTON_DISPLAY);
        this.logger.start('constructor()', this.primaryCssClass);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        if (buttonListContractObj) {
            this.buttonListContract = buttonListContractObj;
        }
        this._wasInstatiated = true;
        this._ch5ButtonSignal = new Ch5ButtonSignal();
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._ch5Properties = new Ch5Properties(this, Ch5ButtonBase.COMPONENT_PROPERTIES);
        this.updateCssClasses();
        this.logger.stop();
    }
    connectedCallback() {
        var _a, _b, _c;
        this.logger.start('connectedCallback()', this.primaryCssClass);
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort) {
                this.verticalOrientationHandler();
            }
            else {
                this.setAttribute("pressed", "false");
                if (this._pressable) {
                    this._pressable.resetPressAndReleaseActions();
                }
            }
        });
        this.isButtonInitiated = false;
        this.previousExtendedProperties = {};
        this._listOfAllPossibleComponentCssClasses = this.generateListOfAllPossibleComponentCssClasses();
        if (((_a = this.buttonListContract) === null || _a === void 0 ? void 0 : _a.parentComponent) === "ch5-tab-button" || ((_b = this.buttonListContract) === null || _b === void 0 ? void 0 : _b.parentComponent) === "ch5-button-list") {
            this.updatePressedClass(this.primaryCssClass + this.pressedCssClassPostfix + ' ' + ((_c = this.buttonListContract) === null || _c === void 0 ? void 0 : _c.parentComponent) + this.pressedCssClassPostfix);
        }
        else {
            this.updatePressedClass(this.primaryCssClass + this.pressedCssClassPostfix);
        }
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Button);
        }
        if (this._elContainer.parentElement !== this) {
            this.appendChild(this._elContainer);
        }
        if (this.customClassState && this.hasAttribute('customclasspressed')) {
            this.updatePressedClass(this.customClassState);
        }
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        if (!this.hasAttribute('customclasspressed')) {
            this.updateCssClassesForCustomState();
        }
        customElements.whenDefined('ch5-button').then(() => {
            this.isButtonInitiated = true;
            this.setButtonDisplay();
            this.updateCssClasses();
            this.componentLoadedEvent(this.ELEMENT_NAME, this.id);
        });
        this.logger.stop();
    }
    onWindowResizeHandler() {
        if (!this.isResizeInProgress) {
            this.isResizeInProgress = true;
            setTimeout(() => {
                this.verticalOrientationHandler();
                this.isResizeInProgress = false;
            }, this.RESIZE_DEBOUNCE);
        }
    }
    verticalOrientationHandler() {
        if (!_.isNil(this.stretch) && this.shape === "circle" && this.parentElement) {
            const { offsetHeight: parentHeight, offsetWidth: parentWidth } = this.parentElement;
            const setValue = parentWidth <= parentHeight ? parentWidth : parentHeight;
            if (setValue !== 0) {
                this.style.height = setValue + 'px';
                this.style.width = setValue + 'px';
            }
        }
        if (this.orientation === "vertical") {
            if (!_.isNil(this.stretch) && this.parentElement) {
                const { height, width } = this.parentElement.getBoundingClientRect();
                if (this.stretch === 'height') {
                    this._elButton.style.width = height + "px";
                    this._elButton.style.height = this._elContainer.getBoundingClientRect().width + "px";
                }
                else if (this.stretch === 'width') {
                    this._elButton.style.height = width + "px";
                    this._elButton.style.width = this._elContainer.getBoundingClientRect().height + "px";
                }
                else if (this.stretch === 'both') {
                    this._elButton.style.height = width + "px";
                    this._elButton.style.width = height + "px";
                }
            }
            else if (_.isNil(this.stretch) && this.shape !== "circle") {
                const { height, width } = this._elContainer.getBoundingClientRect();
                this._elButton.style.width = height + "px";
                this._elButton.style.height = width + "px";
            }
            else if (this.shape === "circle") {
                this._elButton.style.removeProperty('width');
                this._elButton.style.removeProperty('height');
            }
        }
        else {
            this._elButton.style.removeProperty('width');
            this._elButton.style.removeProperty('height');
        }
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [
            'label',
            'labelinnerhtml',
            'iconclass',
            'iconposition',
            'orientation',
            'iconurl',
            'checkboxshow',
            'checkboxposition',
            'halignlabel',
            'valignlabel',
            'shape',
            'size',
            'stretch',
            'type',
            'formtype',
            'mode',
            'pressed',
            'selected',
            'customclassselected',
            'customclasspressed',
            'customclassdisabled',
            'receivestatemode',
            'receivestateselected',
            'receivestatelabel',
            'receivestatescriptlabelhtml',
            'receivestateiconclass',
            'receivestateiconurl',
            'receivestatetype',
            'sendeventonclick',
            'sendeventontouch',
            'iconurlfilltype',
            'backgroundimageurl',
            'backgroundimagefilltype',
            'receivestatebackgroundimageurl'
        ];
        for (let i = 0; i < Ch5ButtonBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5ButtonBase.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5ButtonBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ButtonBase.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ButtonBase.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        this.logger.start("initAttributes", this.primaryCssClass);
        if (this.hasAttribute('checkboxposition')) {
            this.checkboxPosition = this.getAttribute('checkboxposition');
        }
        if (this.hasAttribute('checkboxshow')) {
            this.checkboxShow = this.getAttribute('checkboxshow');
        }
        if (this.hasAttribute('customclassselected')) {
            this.customClassState = this.getAttribute('customclassselected');
        }
        if (this.hasAttribute('customclasspressed')) {
            this.customClassPressed = this.getAttribute('customclasspressed');
            this.customClassState = this.customClassPressed;
        }
        if (this.hasAttribute('customclassdisabled')) {
            this.customClassDisabled = this.getAttribute('customclassdisabled');
            this.customClassState = this.customClassDisabled;
        }
        if (this.hasAttribute('formtype')) {
            this.formType = this.getAttribute('formtype');
        }
        if (this.hasAttribute('halignlabel')) {
            this.hAlignLabel = this.getAttribute('halignlabel');
        }
        if (this.hasAttribute('iconclass')) {
            this.iconClass = this.getAttribute('iconclass');
        }
        if (this.hasAttribute('iconposition')) {
            this.iconPosition = this.getAttribute('iconposition');
        }
        if (this.hasAttribute('iconurl')) {
            this.iconUrl = this.getAttribute('iconurl');
        }
        if (this.hasAttribute('label')) {
            this.label = this.getAttribute('label');
        }
        if (this.hasAttribute('mode')) {
            this.mode = Number(this.getAttribute('mode'));
        }
        if (this.hasAttribute('orientation')) {
            this.orientation = this.getAttribute('orientation');
        }
        if (this.hasAttribute('selected')) {
            this.selected = this.getAttribute('selected');
        }
        if (this.hasAttribute('shape')) {
            this.shape = this.getAttribute('shape');
        }
        if (this.hasAttribute('size')) {
            this.size = this.getAttribute('size');
        }
        if (this.hasAttribute('stretch')) {
            this.stretch = this.getAttribute('stretch');
        }
        if (this.hasAttribute('type')) {
            this.type = this.getAttribute('type');
        }
        if (this.hasAttribute('valignlabel')) {
            this.vAlignLabel = this.getAttribute('valignlabel');
        }
        if (this.hasAttribute('pressed')) {
            this.pressed = this.getAttribute('pressed');
        }
        if (this.hasAttribute('labelInnerHTML')) {
            this.labelInnerHTML = this.getAttribute('labelInnerHTML');
        }
        if (this.hasAttribute('receivestateselected')) {
            this.receiveStateSelected = this.getAttribute('receivestateselected');
        }
        if (this.hasAttribute('receivestatelabel')) {
            this.receiveStateLabel = this.getAttribute('receivestatelabel');
        }
        if (this.hasAttribute('receivestatescriptlabelhtml')) {
            this.receiveStateScriptLabelHtml = this.getAttribute('receivestatescriptlabelhtml');
        }
        if (this.hasAttribute('receivestateiconclass')) {
            this.receiveStateIconClass = this.getAttribute('receivestateiconclass');
        }
        if (this.hasAttribute('receivestateiconurl')) {
            this.receiveStateIconUrl = this.getAttribute('receivestateiconurl');
        }
        if (this.hasAttribute('receivestatetype')) {
            this.receiveStateType = this.getAttribute('receivestatetype');
        }
        if (this.hasAttribute('receivestatemode')) {
            this.receiveStateMode = this.getAttribute('receivestatemode');
        }
        if (this.hasAttribute('sendeventonclick')) {
            this.sendEventOnClick = this.getAttribute('sendeventonclick');
        }
        if (this.hasAttribute('sendeventontouch')) {
            this.sendEventOnTouch = this.getAttribute('sendeventontouch');
        }
        this.updateCssClasses();
        this.updateInternalHtml();
        this.logger.stop();
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._elButton.addEventListener('focus', this._onFocus);
        this._elButton.addEventListener('blur', this._onBlur);
        if (!isNil(this._pressable)) {
            this._pressable.init();
            this._subscribeToPressableIsPressed();
        }
        resizeObserver(this._elContainer, this.onWindowResizeHandler.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elButton.removeEventListener('focus', this._onFocus);
        this._elButton.removeEventListener('blur', this._onBlur);
        if (this.style) {
            this.style.removeProperty('height');
            this.style.removeProperty('width');
        }
        if (!isNil(this._pressable)) {
            this._unsubscribeFromPressableIsPressed();
        }
    }
    _onFocus(inEvent) {
        this.logger.start("_onFocus");
        const clonedEvent = new Event(inEvent.type, inEvent);
        this.dispatchEvent(clonedEvent);
        inEvent.preventDefault();
        inEvent.stopPropagation();
        this.logger.stop();
    }
    _onBlur(inEvent) {
        this.logger.start("_onBlur");
        this.pressed = false;
        const clonedEvent = new Event(inEvent.type, inEvent);
        this.dispatchEvent(clonedEvent);
        inEvent.preventDefault();
        inEvent.stopPropagation();
        this.logger.stop();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue === newValue) {
            this.logger.stop();
            return;
        }
        this.logger.log('ch5-button attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        const attributeChangedProperty = Ch5ButtonBase.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        switch (attr) {
            case 'customclass':
                this.customClass = Ch5ButtonUtils.getAttributeValue(this, 'customclass', newValue, '');
                break;
            case 'labelinnerhtml':
                this.labelInnerHTML = Ch5ButtonUtils.getAttributeValue(this, 'labelinnerhtml', newValue, '');
                break;
            case 'receivestatecustomclass':
                if (this.hasAttribute('receivestatecustomclass')) {
                    this.receiveStateCustomClass = this.getAttribute('receivestatecustomclass');
                }
                else {
                    this.clearStringSignalSubscription(this._receiveStateCustomClass, this._subKeySigReceiveCustomClass);
                    this._receiveStateCustomClass = '';
                }
                break;
            case 'customstyle':
                this.customStyle = Ch5ButtonUtils.getAttributeValue(this, 'customstyle', newValue, '');
                break;
            case 'receivestatecustomstyle':
                if (this.hasAttribute('receivestatecustomstyle')) {
                    this.receiveStateCustomStyle = this.getAttribute('receivestatecustomstyle');
                }
                else {
                    this.clearStringSignalSubscription(this._receiveStateCustomStyle, this._subKeySigReceiveCustomStyle);
                    this._receiveStateCustomStyle = '';
                }
                break;
            case 'label':
                this.label = Ch5ButtonUtils.getAttributeValue(this, 'label', newValue, '');
                break;
            case 'iconclass':
                this.iconClass = Ch5ButtonUtils.getAttributeValue(this, 'iconclass', newValue, '');
                break;
            case 'iconposition':
                this.iconPosition = Ch5ButtonUtils.getAttributeValue(this, 'iconposition', newValue, Ch5ButtonBase.ICON_POSITIONS[0]);
                break;
            case 'iconurl':
                this.iconUrl = Ch5ButtonUtils.getAttributeValue(this, 'iconurl', newValue, '');
                break;
            case 'mode':
                this.mode = Ch5ButtonUtils.getAttributeValue(this, 'mode', Number(newValue), 0);
                this.updateCssClasses();
                this.updateInternalHtml();
                break;
            case 'orientation':
                this.orientation = Ch5ButtonUtils.getAttributeValue(this, 'orientation', newValue, Ch5ButtonBase.ORIENTATIONS[0]);
                this.updateCssClasses();
                break;
            case 'type':
                this.type = Ch5ButtonUtils.getAttributeValue(this, 'type', newValue, Ch5ButtonBase.TYPES[0]);
                break;
            case 'shape':
                this.shape = Ch5ButtonUtils.getAttributeValue(this, 'shape', newValue, Ch5ButtonBase.SHAPES[0]);
                this.updateCssClasses();
                break;
            case 'halignlabel':
                this.hAlignLabel = Ch5ButtonUtils.getAttributeValue(this, 'halignlabel', newValue, Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS[0]);
                break;
            case 'valignlabel':
                this.vAlignLabel = Ch5ButtonUtils.getAttributeValue(this, 'valignlabel', newValue, Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0]);
                break;
            case 'size':
                this.size = Ch5ButtonUtils.getAttributeValue(this, 'size', newValue, Ch5ButtonBase.SIZES[0]);
                this.updateCssClasses();
                break;
            case 'stretch':
                this.stretch = Ch5ButtonUtils.getAttributeValue(this, 'stretch', newValue, null);
                this.updateCssClasses();
                break;
            case 'selected':
                this.selected = newValue;
                break;
            case 'pressed':
                this.pressed = newValue;
                break;
            case 'checkboxshow':
                this.checkboxShow = newValue;
                this.updateInternalHtml();
                break;
            case 'checkboxposition':
                this.checkboxPosition = Ch5ButtonUtils.getAttributeValue(this, 'checkboxposition', newValue, Ch5ButtonBase.CHECKBOX_POSITIONS[0]);
                break;
            case 'formtype':
                if (this.hasAttribute('formtype')) {
                    this.formType = this.getAttribute('formtype');
                }
                break;
            case 'customclassselected':
                this.customClassState = Ch5ButtonUtils.getAttributeValue(this, 'customclassselected', newValue, '');
                this.updateCssClassesForCustomState();
                break;
            case 'customclasspressed':
                this.customClassPressed = Ch5ButtonUtils.getAttributeValue(this, 'customclasspressed', newValue, '');
                this.customClassState = this.customClassPressed;
                this.updatePressedClass(this.customClassState);
                break;
            case 'customclassdisabled':
                this.customClassDisabled = Ch5ButtonUtils.getAttributeValue(this, 'customclassdisabled', newValue, '');
                this.customClassState = this.customClassDisabled;
                this.updateCssClassesForCustomState();
                break;
            case 'receivestateselected':
                this.receiveStateSelected = Ch5ButtonUtils.getAttributeValue(this, 'receivestateselected', newValue, '');
                break;
            case 'receivestatelabel':
                this.receiveStateLabel = Ch5ButtonUtils.getAttributeValue(this, 'receivestatelabel', newValue, '');
                break;
            case 'receivestatescriptlabelhtml':
                this.receiveStateScriptLabelHtml = Ch5ButtonUtils.getAttributeValue(this, 'receivestatescriptlabelhtml', newValue, '');
                break;
            case 'sendeventonclick':
                this.sendEventOnClick = Ch5ButtonUtils.getAttributeValue(this, 'sendeventonclick', newValue, '');
                break;
            case 'sendeventontouch':
                this.sendEventOnTouch = Ch5ButtonUtils.getAttributeValue(this, 'sendeventontouch', newValue, '');
                break;
            case 'receivestateiconclass':
                this.receiveStateIconClass = Ch5ButtonUtils.getAttributeValue(this, 'receivestateiconclass', newValue, '');
                break;
            case 'receivestateiconurl':
                this.receiveStateIconUrl = Ch5ButtonUtils.getAttributeValue(this, 'receivestateiconurl', newValue, '');
                break;
            case 'receivestatetype':
                this.receiveStateType = Ch5ButtonUtils.getAttributeValue(this, 'receivestatetype', newValue, '');
                break;
            case 'receivestatemode':
                this.receiveStateMode = Ch5ButtonUtils.getAttributeValue(this, 'receivestatemode', newValue, '');
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
        this.logger.stop();
    }
    updateSwipeGesture() {
        if (this._pressable !== null && !_.isNil(this._pressable.options)) {
            this._pressable.options.enableSwipe = this.swipeGestureEnabled;
        }
    }
    createButtonLabel(selectedObject) {
        const buttonLabelList = selectedObject.getElementsByTagName("ch5-button-label");
        const findButtonLabel = Array.prototype.slice.call(buttonLabelList).filter((x) => x.parentNode.nodeName.toString().toLowerCase() === selectedObject.nodeName.toString().toLowerCase());
        let childButtonLabel = null;
        if (findButtonLabel && findButtonLabel.length > 0 && !isNil(findButtonLabel[0].children[0])) {
            childButtonLabel = findButtonLabel[0];
        }
        else {
            childButtonLabel = document.createElement('ch5-button-label');
            selectedObject.appendChild(childButtonLabel);
        }
        let templateEl = childButtonLabel.querySelector('template');
        if (templateEl !== null) {
            childButtonLabel.removeChild(templateEl);
        }
        templateEl = document.createElement('template');
        templateEl.innerHTML = this.decodeInnerHTMLForAttribute(selectedObject.labelInnerHTML);
        childButtonLabel.appendChild(templateEl);
    }
    backgroundImageURLHandler() {
        if (this.backgroundImageUrl !== "" && !_.isNil(this.backgroundImageUrl)) {
            this._elButton.style.backgroundImage = "url(" + this.backgroundImageUrl + ")";
        }
    }
    _subscribeToPressableIsPressed() {
        if (this.buttonListContract.contractName.trim() !== "" && this.buttonListContract.parentComponent.trim() === 'ch5-button-list') {
            return this._subscribeToPressableIsPressedForButtonList();
        }
        if (this.buttonListContract.contractName.trim() !== "" && this.buttonListContract.parentComponent.trim() === 'ch5-tab-button') {
            return this._subscribeToPressableIsPressedForTabButton();
        }
        const REPEAT_DIGITAL_PERIOD = 200;
        if (this._isPressedSubscription === null && this._pressable !== null) {
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                this.logger.log(`Ch5Button.pressableSubscriptionCb(${value})`, this.pressed);
                if (value === false) {
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    this.sendValueForRepeatDigitalWorking(false);
                    this.repeatFlag = false;
                    try {
                        this.removeEventListener('touchmove', this._onTouchMove);
                        this.style.touchAction = '';
                        this._elContainer.style.touchAction = '';
                    }
                    catch (_a) {
                        console.info('removeEventListener');
                    }
                    setTimeout(() => {
                        this.setButtonDisplay();
                    }, this.STATE_CHANGE_TIMEOUTS);
                }
                else {
                    this.sendValueForRepeatDigitalWorking(true);
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    this._repeatDigitalInterval = window.setInterval(() => {
                        this.sendValueForRepeatDigitalWorking(true);
                        if (!this.repeatFlag) {
                            this.style.touchAction = 'none';
                            this._elContainer.style.touchAction = 'none';
                            this.addEventListener('touchmove', this._onTouchMove, { passive: false });
                            this.repeatFlag = true;
                        }
                    }, REPEAT_DIGITAL_PERIOD);
                    this.setButtonDisplay();
                }
            });
        }
    }
    _onTouchMove(event) {
        event.preventDefault();
    }
    _subscribeToPressableIsPressedForTabButton() {
        if (this._isPressedSubscription === null && this._pressable !== null) {
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                var _a, _b;
                this.logger.log(`Ch5Button.pressableSubscriptionCb(${value})`, this.pressed);
                if (value === false) {
                    (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.buttonListContract.contractName + `.Tab${this.buttonListContract.index}_Press`)) === null || _a === void 0 ? void 0 : _a.publish(value);
                    setTimeout(() => {
                        this.setButtonDisplay();
                    }, this.STATE_CHANGE_TIMEOUTS);
                }
                else {
                    (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.buttonListContract.contractName + `.Tab${this.buttonListContract.index}_Press`)) === null || _b === void 0 ? void 0 : _b.publish(value);
                    this.setButtonDisplay();
                }
            });
        }
    }
    _subscribeToPressableIsPressedForButtonList() {
        if (this._isPressedSubscription === null && this._pressable !== null) {
            let isHeld = false;
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                var _a, _b, _c, _d;
                this.logger.log(`Ch5Button.pressableSubscriptionCb(${value})`, this.pressed);
                if (value === false) {
                    (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.buttonListContract.contractName + `.Button${this.buttonListContract.index}ItemPress`)) === null || _a === void 0 ? void 0 : _a.publish(value);
                    if (isHeld === false) {
                        (_b = Ch5SignalFactory.getInstance().getNumberSignal(this.buttonListContract.contractName + '.ListItemClicked')) === null || _b === void 0 ? void 0 : _b.publish(this.buttonListContract.index);
                    }
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                        isHeld = false;
                    }
                    setTimeout(() => {
                        this.setButtonDisplay();
                    }, this.STATE_CHANGE_TIMEOUTS);
                }
                else {
                    (_c = Ch5SignalFactory.getInstance().getBooleanSignal(this.buttonListContract.contractName + `.Button${this.buttonListContract.index}ItemPress`)) === null || _c === void 0 ? void 0 : _c.publish(value);
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    if (this.buttonListContract.clickHoldTime === 0) {
                        isHeld = true;
                        (_d = Ch5SignalFactory.getInstance().getNumberSignal(this.buttonListContract.contractName + '.ListItemHeld')) === null || _d === void 0 ? void 0 : _d.publish(this.buttonListContract.index);
                    }
                    else {
                        this._repeatDigitalInterval = window.setInterval(() => {
                            var _a;
                            isHeld = true;
                            (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.buttonListContract.contractName + '.ListItemHeld')) === null || _a === void 0 ? void 0 : _a.publish(this.buttonListContract.index);
                            window.clearInterval(this._repeatDigitalInterval);
                        }, this.buttonListContract.clickHoldTime);
                    }
                    this.setButtonDisplay();
                }
            });
        }
    }
    _unsubscribeFromPressableIsPressed() {
        if (this._repeatDigitalInterval !== null) {
            window.clearInterval(this._repeatDigitalInterval);
        }
        if (this._isPressedSubscription !== null) {
            this._isPressedSubscription.unsubscribe();
            this._isPressedSubscription = null;
        }
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        unSubscribeInViewPortChange(this);
        if (null !== this._pressable) {
            this._pressable.destroy();
        }
        this.disconnectCommonMutationObserver();
        this.logger.stop();
    }
    updatePressedClass(pressedClass) {
        this._pressable = new Ch5Pressable(this, {
            cssTargetElement: this.getTargetElementForCssClassesAndStyle(),
            cssPressedClass: pressedClass,
            enableSwipe: this.swipeGestureEnabled
        });
    }
    updateForChangeInCustomCssClass() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.start("updateForChangeInCustomCssClass()");
        this._prevAddedCustomClasses.forEach((className) => {
            if (className !== '') {
                targetElement.classList.remove(className);
            }
        });
        this._prevAddedCustomClasses = [];
        this.customClass.split(' ').forEach((className) => {
            if (className !== '') {
                this._prevAddedCustomClasses.push(className);
                targetElement.classList.add(className);
            }
        });
        this.logger.stop();
    }
    updateForChangeInStyleCss() {
        this.logger.start("updateForChangeInStyleCss()");
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        targetElement.style.cssText = this.customStyle;
        this.logger.stop();
    }
    generateListOfAllPossibleComponentCssClasses() {
        var _a, _b, _c;
        const cssClasses = [];
        cssClasses.push(this.primaryCssClass);
        Ch5ButtonBase.SHAPES.forEach((shape) => {
            const newClass = this.primaryCssClass + '--' + shape;
            cssClasses.push(newClass);
        });
        Ch5ButtonBase.TYPES.forEach((type) => {
            const newCssClass = this.primaryCssClass + '--' + type;
            cssClasses.push(newCssClass);
        });
        Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS.forEach((type) => {
            const newCssClass = this.primaryCssClass + '--horizontal-' + type;
            cssClasses.push(newCssClass);
        });
        Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS.forEach((type) => {
            const newCssClass = this.primaryCssClass + '--vertical-' + type;
            cssClasses.push(newCssClass);
        });
        Ch5ButtonBase.SIZES.forEach((size) => {
            cssClasses.push(this.primaryCssClass + '--size-' + size);
        });
        Ch5ButtonBase.STRETCHES.forEach((stretch) => {
            cssClasses.push(this.primaryCssClass + '--stretch-' + stretch);
        });
        Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE.forEach((backgroundImageFillType) => {
            cssClasses.push(this.primaryCssClass + '--background-image-fill-type-' + backgroundImageFillType);
        });
        Ch5ButtonBase.ICON_URL_FILL_TYPE.forEach((iconUrlFillType) => {
            cssClasses.push(this.primaryCssClass + '--icon-url-fill-type-' + iconUrlFillType);
        });
        Ch5ButtonBase.ORIENTATIONS.forEach((orientation) => {
            cssClasses.push(this.primaryCssClass + '--' + orientation);
        });
        cssClasses.push(this.primaryCssClass + this.selectedCssClassPostfix);
        if (((_a = this.buttonListContract) === null || _a === void 0 ? void 0 : _a.parentComponent) === "ch5-tab-button" || ((_b = this.buttonListContract) === null || _b === void 0 ? void 0 : _b.parentComponent) === "ch5-button-list") {
            cssClasses.push(((_c = this.buttonListContract) === null || _c === void 0 ? void 0 : _c.parentComponent) + this.selectedCssClassPostfix);
        }
        return cssClasses;
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5ButtonSignal.unsubscribeAll();
    }
    updateIconDisplay() {
        var _a, _b;
        this.logger.start("updateIconDisplay");
        if (!isNil(this._previousIconUrl) && this._previousIconUrl !== '') {
            this._elIcon.style.backgroundImage = '';
        }
        if (!isNil(this._previousIconClass) && this._previousIconClass !== '') {
            this._previousIconClass.split(' ').forEach((className) => {
                className = className.trim();
                if (this._elIcon && this._elIcon.classList && className !== "") {
                    this._elIcon.classList.remove(className);
                }
            });
        }
        if (this._previousSgIconNumeric !== -1) {
            this._elIcon.classList.remove('sg-' + this._previousSgIconNumeric + '');
        }
        if (this._previousSgIconString !== '') {
            this._elIcon.classList.remove('sg-' + this._previousSgIconString);
        }
        this._elIcon.classList.remove('sg');
        Array.from(Ch5ButtonBase.SG_ICON_THEME).forEach((theme) => this._elIcon.classList.remove('sg-' + theme));
        if (!isNil(this.sgIconString) && this.sgIconString !== '') {
            this._elIcon.classList.add('sg-' + this.sgIconString);
            this._previousSgIconString = this.sgIconString;
            this._elIcon.classList.add('sg');
            this._elIcon.classList.add('sg-' + this.sgIconTheme);
        }
        else if (!isNil(this.sgIconNumeric) && this.sgIconNumeric !== -1) {
            this._elIcon.classList.add('sg-' + this.sgIconNumeric + '');
            this._previousSgIconNumeric = this.sgIconNumeric;
            this._elIcon.classList.add('sg');
            this._elIcon.classList.add('sg-' + this.sgIconTheme);
        }
        else if (!isNil(this.iconUrl) && this.iconUrl !== '' && this.iconUrl === ((_a = this._ch5ButtonSignal.getSignal('receiveStateIconUrl')) === null || _a === void 0 ? void 0 : _a.currentValue)) {
            this._elIcon.style.backgroundImage = this.iconUrl;
        }
        else if (!isNil(this.iconClass) && this.iconClass !== '' && this.iconClass === ((_b = this._ch5ButtonSignal.getSignal('receiveStateiconClass')) === null || _b === void 0 ? void 0 : _b.currentValue)) {
            this.iconClass.split(' ').forEach((className) => {
                className = className.trim();
                if (className !== '') {
                    this._elIcon.classList.add(className);
                }
            });
        }
        else if (!isNil(this.iconUrl) && this.iconUrl !== '') {
            this._elIcon.style.backgroundImage = this.iconUrl;
        }
        else if (!isNil(this.iconClass) && this.iconClass !== '') {
            this.iconClass.split(' ').forEach((className) => {
                className = className.trim();
                if (className !== '') {
                    this._elIcon.classList.add(className);
                }
            });
        }
        this.logger.stop();
    }
    setLabel(labelHtml) {
        this.labelSetByJavascriptValue = labelHtml;
        this.isLabelSetUsingJavascript = true;
        this.setButtonDisplay();
    }
    setMode(modeId) {
        this.mode = modeId;
        this.isModeSetUsingJavascript = true;
        this.setButtonDisplay();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._elButton = document.createElement('button');
        this._elButton.classList.add(this.BUTTON_PRIMARY_CLASS);
        this._elCheckboxIcon = document.createElement('i');
        this._elCheckboxIcon.classList.add('cb-checkbox-icon');
        this._elSpanForLabelIconImg = document.createElement('span');
        this._elSpanForLabelIconImg.classList.add('cb-lbl');
        this._elSpanForLabelOnly = document.createElement('span');
        this._elSpanForLabelOnly.classList.add('cb-lbl');
        this._elIcon = document.createElement('i');
        this._elIcon.classList.add('cb-icon');
        this._elContainer.classList.add(this.primaryCssClass);
        this._elButton.setAttribute('data-ch5-id', this.getCrId());
        this._elIcon.classList.add(this.primaryCssClass + '--icon');
        this._elSpanForLabelOnly.classList.add(this.primaryCssClass + '--label');
        this._elContainer.appendChild(this._elButton);
        this.logger.stop();
    }
    addContainerClass(input) {
        if (!this._elContainer.classList.contains(input)) {
            this._elContainer.classList.add(input);
        }
    }
    removeContainerClass(input) {
        if (this._elContainer.classList.contains(input)) {
            this._elContainer.classList.remove(input);
        }
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    sendValueForRepeatDigitalWorking(value) {
        this.info(`Ch5Button.sendValueForRepeatDigital(${value})`);
        if (!this._sigNameSendOnTouch && !this._sigNameSendOnClick) {
            return;
        }
        const touchSignal = Ch5SignalFactory.getInstance()
            .getObjectAsBooleanSignal(this._sigNameSendOnTouch);
        const clickSignal = Ch5SignalFactory.getInstance()
            .getObjectAsBooleanSignal(this._sigNameSendOnClick);
        if (clickSignal && touchSignal && clickSignal.name === touchSignal.name) {
            clickSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
            return;
        }
        if (touchSignal && touchSignal.name) {
            touchSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
        }
        if (clickSignal && clickSignal.name) {
            clickSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
        }
    }
    checkboxDisplay() {
        this.logger.start("checkboxDisplay");
        let classForCheckboxRemove = [];
        let classForCheckboxAdd = [];
        const checkboxCssClass = this.primaryCssClass + "__checkbox";
        classForCheckboxRemove = [checkboxCssClass, checkboxCssClass + "--unchecked", checkboxCssClass + "--checked"];
        if (this._checkboxShow === true && this._selected === true) {
            classForCheckboxAdd = [checkboxCssClass, checkboxCssClass + "--checked"];
        }
        else if (this._checkboxShow === false) {
        }
        else if (this._checkboxShow === true) {
            classForCheckboxAdd = [checkboxCssClass, checkboxCssClass + "--unchecked"];
        }
        classForCheckboxRemove.forEach((className) => {
            className = className.trim();
            if (className !== '') {
                this._elCheckboxIcon.classList.remove(className);
            }
        });
        classForCheckboxAdd.forEach((className) => {
            className = className.trim();
            if (className !== '') {
                this._elCheckboxIcon.classList.add(className);
            }
        });
        this._elCheckboxIcon.classList.remove('cx-button-checkbox-pos-left');
        this._elCheckboxIcon.classList.remove('cx-button-checkbox-pos-right');
        if (this.checkboxShow === true) {
            this._elCheckboxIcon.classList.add('cx-button-checkbox-pos-' + this.checkboxPosition);
        }
        let hasCheckboxIcon = false;
        if (this.hasAttribute("checkboxShow") && this.toBoolean((this.hasAttribute('checkboxshow') && this.getAttribute('checkboxshow') !== "false")) === true) {
            hasCheckboxIcon = true;
        }
        this.logger.log("hasCheckboxIcon", hasCheckboxIcon);
        if (this._elCheckboxIcon.parentNode) {
            this._elCheckboxIcon.remove();
        }
        if (hasCheckboxIcon) {
            if (this.checkboxPosition === 'right') {
                if (this._elCheckboxIcon.parentNode !== this._elButton) {
                    this._elButton.appendChild(this._elCheckboxIcon);
                }
                else {
                    this._elButton.insertBefore(this._elSpanForLabelIconImg, this._elCheckboxIcon);
                }
            }
            else if (this.checkboxPosition === 'left') {
                if (this._elSpanForLabelIconImg.isConnected === true) {
                    this._elButton.insertBefore(this._elCheckboxIcon, this._elSpanForLabelIconImg);
                }
            }
        }
        else {
            if (this._elCheckboxIcon.parentNode) {
                this._elCheckboxIcon.remove();
            }
        }
        this.logger.stop();
    }
    setButtonDisplay() {
        if (this.DEBOUNCE_BUTTON_DISPLAY === 0) {
            this.setButtonDisplayDetails();
        }
        else if (this.isButtonInitiated === true) {
            this.setButtonDisplayDetails();
        }
        else {
            this.debounceSetButtonDisplay();
        }
    }
    encodeInnerHTMLForAttribute(innerHTML) {
        return innerHTML.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    decodeInnerHTMLForAttribute(innerHTML) {
        return innerHTML.replace('&amp;', "&")
            .replace('&lt;', "<")
            .replace('&gt;', ">")
            .replace('&quot;', '/"')
            .replace("&apos;", "/'");
    }
    setButtonDisplayDetails(parentComponent = "ch5-button") {
        var _a;
        this.logger.start("setButtonDisplayDetails");
        this.DEBOUNCE_BUTTON_DISPLAY = 0;
        const extendedProperties = {};
        if (this.receiveStateType && this.receiveStateType !== '') {
            const receiveStateTypeResponseValue = this._ch5ButtonSignal.getVariable("receiveStateType");
            if (!isNil(receiveStateTypeResponseValue) && Ch5ButtonBase.TYPES.indexOf(receiveStateTypeResponseValue) >= 0) {
                extendedProperties.type = receiveStateTypeResponseValue;
            }
            else {
                extendedProperties.type = Ch5ButtonBase.TYPES[0];
                this._ch5ButtonSignal.setVariable("receiveStateType", Ch5ButtonBase.TYPES[0]);
            }
        }
        if (this.receiveStateIconClass && this.receiveStateIconClass !== '') {
            extendedProperties.iconClass = this._ch5ButtonSignal.getVariable("receiveStateIconClass");
        }
        if (this.receiveStateIconUrl && this.receiveStateIconUrl !== '') {
            extendedProperties.iconUrl = this._ch5ButtonSignal.getVariable("receiveStateIconUrl");
        }
        if (this.receiveStateCustomClass && this.receiveStateCustomClass !== '') {
            extendedProperties.customClass = this._ch5ButtonSignal.getVariable("receiveStateCustomClass");
        }
        if (this.receiveStateCustomStyle && this.receiveStateCustomStyle !== '') {
            extendedProperties.customStyle = this._ch5ButtonSignal.getVariable("receiveStateCustomStyle");
        }
        if (this.isLabelSetUsingJavascript === true) {
            extendedProperties.labelHtml = this.labelSetByJavascriptValue;
        }
        else if (this.receiveStateScriptLabelHtml && this.receiveStateScriptLabelHtml !== '') {
            extendedProperties.labelHtml = this._ch5ButtonSignal.getVariable("receiveStateScriptLabelHtml");
        }
        else if (this.receiveStateLabel && this.receiveStateLabel !== '') {
            extendedProperties.label = this._ch5ButtonSignal.getVariable("receiveStateLabel");
        }
        const buttonModesArray = this.getElementsByTagName("ch5-button-mode");
        if (buttonModesArray && buttonModesArray.length > 0) {
            const selectedButtonMode = buttonModesArray[this.mode];
            if (selectedButtonMode) {
                const buttonModeStatesArray = selectedButtonMode.getElementsByTagName("ch5-button-mode-state");
                if (buttonModeStatesArray && buttonModeStatesArray.length > 0) {
                    let selectedButtonModeState = null;
                    if (((_a = this._pressable) === null || _a === void 0 ? void 0 : _a._pressed) === true) {
                        selectedButtonModeState = Array.from(buttonModeStatesArray).find(buttonModeState => {
                            return (buttonModeState.getAttribute("state") === "pressed");
                        });
                    }
                    else if (this.selected === true) {
                        selectedButtonModeState = Array.from(buttonModeStatesArray).find(buttonModeState => {
                            return (buttonModeState.getAttribute("state") === "selected");
                        });
                    }
                    else {
                        selectedButtonModeState = Array.from(buttonModeStatesArray).find(buttonModeState => {
                            return (buttonModeState.getAttribute("state") === "normal");
                        });
                    }
                    if (selectedButtonModeState) {
                        if (isNil(extendedProperties.type) && !isNil(selectedButtonModeState.getAttribute("type"))) {
                            extendedProperties.type = selectedButtonModeState.getAttribute("type");
                        }
                        if (isNil(extendedProperties.iconUrl) && !isNil(selectedButtonModeState.getAttribute("iconurl"))) {
                            extendedProperties.iconUrl = selectedButtonModeState.getAttribute("iconurl");
                        }
                        if (isNil(extendedProperties.iconClass) && !isNil(selectedButtonModeState.getAttribute("iconclass"))) {
                            extendedProperties.iconClass = selectedButtonModeState.getAttribute("iconclass");
                        }
                        if (isNil(extendedProperties.iconPosition) && !isNil(selectedButtonModeState.getAttribute("iconposition"))) {
                            extendedProperties.iconPosition = selectedButtonModeState.getAttribute("iconposition");
                        }
                        if (isNil(extendedProperties.checkboxPosition) && !isNil(selectedButtonModeState.getAttribute("checkboxposition"))) {
                            extendedProperties.checkboxPosition = selectedButtonModeState.getAttribute("checkboxposition");
                        }
                        if (isNil(extendedProperties.customClass) && !isNil(selectedButtonModeState.getAttribute("customclass"))) {
                            extendedProperties.customClass = selectedButtonModeState.getAttribute("customclass");
                        }
                        if (isNil(extendedProperties.customStyle) && !isNil(selectedButtonModeState.getAttribute("customstyle"))) {
                            extendedProperties.customStyle = selectedButtonModeState.getAttribute("customstyle");
                        }
                        if (isNil(extendedProperties.hAlignLabel) && !isNil(selectedButtonModeState.getAttribute("halignlabel"))) {
                            extendedProperties.hAlignLabel = selectedButtonModeState.getAttribute("halignlabel");
                        }
                        if (isNil(extendedProperties.vAlignLabel) && !isNil(selectedButtonModeState.getAttribute("valignlabel"))) {
                            extendedProperties.vAlignLabel = selectedButtonModeState.getAttribute("valignlabel");
                        }
                        if (isNil(extendedProperties.iconUrlFillType) && !isNil(selectedButtonModeState.getAttribute("iconurlfilltype"))) {
                            extendedProperties.iconUrlFillType = selectedButtonModeState.getAttribute("iconurlfilltype");
                        }
                        const selectedButtonModeStateLabelButton = selectedButtonModeState.getElementsByTagName("ch5-button-label");
                        if ((isNil(extendedProperties.labelHtml) && isNil(extendedProperties.label)) && selectedButtonModeStateLabelButton && selectedButtonModeStateLabelButton.length > 0 &&
                            (selectedButtonModeStateLabelButton[0].children[0])) {
                            extendedProperties.labelHtml = selectedButtonModeStateLabelButton[0].children[0].innerHTML;
                        }
                    }
                }
                if (isNil(extendedProperties.type) && !isNil(selectedButtonMode.getAttribute("type"))) {
                    extendedProperties.type = selectedButtonMode.getAttribute("type");
                }
                if (isNil(extendedProperties.iconUrl) && !isNil(selectedButtonMode.getAttribute("iconurl"))) {
                    extendedProperties.iconUrl = selectedButtonMode.getAttribute("iconurl");
                }
                if (isNil(extendedProperties.iconClass) && !isNil(selectedButtonMode.getAttribute("iconclass"))) {
                    extendedProperties.iconClass = selectedButtonMode.getAttribute("iconclass");
                }
                if (isNil(extendedProperties.iconPosition) && !isNil(selectedButtonMode.getAttribute("iconposition"))) {
                    extendedProperties.iconPosition = selectedButtonMode.getAttribute("iconposition");
                }
                if (isNil(extendedProperties.checkboxPosition) && !isNil(selectedButtonMode.getAttribute("checkboxposition"))) {
                    extendedProperties.checkboxPosition = selectedButtonMode.getAttribute("checkboxposition");
                }
                if (isNil(extendedProperties.customClass) && !isNil(selectedButtonMode.getAttribute("customclass"))) {
                    extendedProperties.customClass = selectedButtonMode.getAttribute("customclass");
                }
                if (isNil(extendedProperties.customStyle) && !isNil(selectedButtonMode.getAttribute("customstyle"))) {
                    extendedProperties.customStyle = selectedButtonMode.getAttribute("customstyle");
                }
                if (isNil(extendedProperties.hAlignLabel) && !isNil(selectedButtonMode.getAttribute("halignlabel"))) {
                    extendedProperties.hAlignLabel = selectedButtonMode.getAttribute("halignlabel");
                }
                if (isNil(extendedProperties.vAlignLabel) && !isNil(selectedButtonMode.getAttribute("valignlabel"))) {
                    extendedProperties.vAlignLabel = selectedButtonMode.getAttribute("valignlabel");
                }
                if (isNil(extendedProperties.iconUrlFillType) && !isNil(selectedButtonMode.getAttribute("iconurlfilltype"))) {
                    extendedProperties.iconUrlFillType = selectedButtonMode.getAttribute("iconurlfilltype");
                }
                const selectedButtonModeLabelButton = selectedButtonMode.getElementsByTagName("ch5-button-label");
                if ((isNil(extendedProperties.labelHtml) && isNil(extendedProperties.label) &&
                    selectedButtonModeLabelButton && selectedButtonModeLabelButton.length > 0)) {
                    const checkDirectSelectedButtonModeLabelButton = Array.prototype.slice.call(selectedButtonModeLabelButton).filter((x) => x.parentNode.nodeName.toString().toLowerCase() === "ch5-button-mode");
                    if (checkDirectSelectedButtonModeLabelButton && checkDirectSelectedButtonModeLabelButton.length > 0 && !isNil(checkDirectSelectedButtonModeLabelButton[0].children[0])) {
                        extendedProperties.labelHtml = checkDirectSelectedButtonModeLabelButton[0].children[0].innerHTML;
                    }
                }
            }
        }
        if (isNil(extendedProperties.type) && !isNil(this.getAttribute("type"))) {
            extendedProperties.type = this.getAttribute("type");
        }
        if (isNil(extendedProperties.iconUrl) && this.getAttribute("iconurl") && this.getAttribute("iconurl") !== '') {
            extendedProperties.iconUrl = this.getAttribute("iconurl");
        }
        if (isNil(extendedProperties.iconClass) && this.getAttribute("iconclass") && this.getAttribute("iconclass") !== '') {
            extendedProperties.iconClass = this.getAttribute("iconclass");
        }
        if (isNil(extendedProperties.iconPosition) && !isNil(this.getAttribute("iconposition"))) {
            extendedProperties.iconPosition = this.getAttribute("iconposition");
        }
        if (isNil(extendedProperties.checkboxPosition) && !isNil(this.getAttribute("checkboxposition"))) {
            extendedProperties.checkboxPosition = this.getAttribute("checkboxposition");
        }
        if (isNil(extendedProperties.customClass) && !isNil(this.getAttribute("customclass"))) {
            extendedProperties.customClass = this.getAttribute("customclass");
        }
        if (isNil(extendedProperties.customStyle) && !isNil(this.getAttribute("customstyle"))) {
            extendedProperties.customStyle = this.getAttribute("customstyle");
        }
        if (isNil(extendedProperties.hAlignLabel) && !isNil(this.getAttribute("halignlabel"))) {
            extendedProperties.hAlignLabel = this.getAttribute("halignlabel");
        }
        if (isNil(extendedProperties.vAlignLabel) && !isNil(this.getAttribute("valignlabel"))) {
            extendedProperties.vAlignLabel = this.getAttribute("valignlabel");
        }
        if (isNil(extendedProperties.iconUrlFillType) && !isNil(this.getAttribute("iconurlfilltype"))) {
            extendedProperties.iconUrlFillType = this.getAttribute("iconurlfilltype");
        }
        if (isNil(extendedProperties.labelHtml) && isNil(extendedProperties.label)) {
            const templateData = this.getElementsByTagName(parentComponent + "-label");
            if (templateData && templateData.length > 0) {
                const checkDirectSelectedButtonModeLabelButton = Array.prototype.slice.call(templateData).filter((x) => x.parentNode.nodeName.toString().toLowerCase() === parentComponent);
                if (checkDirectSelectedButtonModeLabelButton && checkDirectSelectedButtonModeLabelButton.length > 0 && !isNil(checkDirectSelectedButtonModeLabelButton[0].children[0])) {
                    if (checkDirectSelectedButtonModeLabelButton && checkDirectSelectedButtonModeLabelButton.length > 0 && checkDirectSelectedButtonModeLabelButton[0].children) {
                        extendedProperties.labelHtml = checkDirectSelectedButtonModeLabelButton[0].children[0].innerHTML;
                    }
                    else if (!isNil(this.getAttribute("label"))) {
                        extendedProperties.label = this.getAttribute("label");
                    }
                }
            }
            else if (!isNil(this.getAttribute("label"))) {
                extendedProperties.label = this.getAttribute("label");
            }
        }
        if (isNil(extendedProperties.labelHtml) && isNil(extendedProperties.label)) {
            extendedProperties.labelHtml = "";
        }
        this.updatePropertiesObject(extendedProperties);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(this, this.getAttribute("contractname") || '', parseInt(this.getAttribute("booleanjoinoffset") || '0', 10) || 0, parseInt(this.getAttribute("numericJoinOffset") || '0', 10) || 0, parseInt(this.getAttribute("stringJoinOffset") || '0', 10) || 0);
        this.logger.stop();
    }
    updatePropertiesObject(updatedNodes) {
        this.logger.start("updatePropertiesObject");
        const updateUIMethods = {
            updateCssClasses: false,
            updateIconDisplay: false,
            updateInternalHtml: false,
            checkboxDisplay: false,
            updateForChangeInCustomCssClass: false,
            updateForChangeInStyleCss: false,
        };
        if (!isNil(updatedNodes.type)) {
            if (Ch5ButtonBase.TYPES.indexOf(updatedNodes.type) === -1) {
                updatedNodes.type = Ch5ButtonBase.TYPES[0];
            }
        }
        else {
            updatedNodes.type = Ch5ButtonBase.TYPES[0];
        }
        this._type = updatedNodes.type;
        if (this.previousExtendedProperties.type !== this.type) {
            updateUIMethods.updateCssClasses = true;
        }
        this._previousIconUrl = this._iconUrl;
        this._previousIconClass = this._iconClass;
        if (isNil(updatedNodes.iconUrl)) {
            updatedNodes.iconUrl = "";
        }
        this._iconUrl = updatedNodes.iconUrl;
        if (isNil(updatedNodes.iconClass)) {
            updatedNodes.iconClass = "";
        }
        this._iconClass = updatedNodes.iconClass;
        if (this._previousSgIconNumeric !== this.sgIconNumeric) {
            updateUIMethods.updateIconDisplay = true;
            updateUIMethods.updateInternalHtml = true;
        }
        else if (this._previousSgIconString !== this.sgIconString) {
            updateUIMethods.updateIconDisplay = true;
            updateUIMethods.updateInternalHtml = true;
        }
        else if (this.previousExtendedProperties.iconUrl !== this.iconUrl) {
            updateUIMethods.updateIconDisplay = true;
            updateUIMethods.updateInternalHtml = true;
        }
        else if (this.previousExtendedProperties.iconClass !== this.iconClass) {
            updateUIMethods.updateIconDisplay = true;
            updateUIMethods.updateInternalHtml = true;
        }
        if (isNil(updatedNodes.iconPosition)) {
            updatedNodes.iconPosition = Ch5ButtonBase.ICON_POSITIONS[0];
        }
        this._iconPosition = updatedNodes.iconPosition;
        if (this.previousExtendedProperties.iconPosition !== this.iconPosition) {
            updateUIMethods.updateCssClasses = true;
            updateUIMethods.updateInternalHtml = true;
        }
        if (isNil(updatedNodes.checkboxPosition)) {
            updatedNodes.checkboxPosition = Ch5ButtonBase.CHECKBOX_POSITIONS[0];
        }
        this._checkboxPosition = updatedNodes.checkboxPosition;
        if (this.previousExtendedProperties.checkboxPosition !== this.checkboxPosition) {
            updateUIMethods.checkboxDisplay = true;
        }
        if (isNil(updatedNodes.customClass)) {
            updatedNodes.customClass = "";
        }
        this._customClass = updatedNodes.customClass;
        if (this.previousExtendedProperties.customClass !== this.customClass) {
            updateUIMethods.updateForChangeInCustomCssClass = true;
        }
        if (isNil(updatedNodes.customStyle)) {
            updatedNodes.customStyle = "";
        }
        this._customStyle = updatedNodes.customStyle;
        if (this.previousExtendedProperties.customStyle !== this.customStyle) {
            updateUIMethods.updateForChangeInStyleCss = true;
        }
        if (!isNil(updatedNodes.hAlignLabel)) {
            if (Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS.indexOf(updatedNodes.hAlignLabel) === -1) {
                updatedNodes.hAlignLabel = Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS[0];
            }
        }
        else {
            updatedNodes.hAlignLabel = Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS[0];
        }
        this._hAlignLabel = updatedNodes.hAlignLabel;
        if (this.previousExtendedProperties.hAlignLabel !== this.hAlignLabel) {
            updateUIMethods.updateCssClasses = true;
        }
        if (!isNil(updatedNodes.vAlignLabel)) {
            if (Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS.indexOf(updatedNodes.vAlignLabel) === -1) {
                updatedNodes.vAlignLabel = Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0];
            }
        }
        else {
            updatedNodes.vAlignLabel = Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0];
        }
        this._vAlignLabel = updatedNodes.vAlignLabel;
        if (this.previousExtendedProperties.vAlignLabel !== this.vAlignLabel) {
            updateUIMethods.updateCssClasses = true;
        }
        if (!isNil(updatedNodes.iconUrlFillType)) {
            if (Ch5ButtonBase.ICON_URL_FILL_TYPE.indexOf(updatedNodes.iconUrlFillType) === -1) {
                updatedNodes.iconUrlFillType = null;
            }
        }
        else {
            updatedNodes.iconUrlFillType = null;
        }
        this._iconUrlFillType = updatedNodes.iconUrlFillType;
        if (this.previousExtendedProperties.iconUrlFillType !== this.iconUrlFillType) {
            updateUIMethods.updateCssClasses = true;
        }
        if (!isNil(updatedNodes.labelHtml)) {
            this._label = updatedNodes.labelHtml;
            updatedNodes.label = updatedNodes.labelHtml;
            this._elSpanForLabelOnly.innerHTML = this._label;
        }
        else if (!isNil(updatedNodes.label)) {
            this._label = updatedNodes.label;
            updatedNodes.labelHtml = updatedNodes.label;
            this._elSpanForLabelOnly.textContent = this._label;
        }
        if (!(this.previousExtendedProperties.labelHtml === this.label || this.previousExtendedProperties.label === this.label)) {
            updateUIMethods.updateInternalHtml = true;
        }
        if (updateUIMethods.updateCssClasses === true) {
            this.updateCssClasses();
        }
        if (updateUIMethods.updateIconDisplay === true) {
            this.updateIconDisplay();
        }
        if (updateUIMethods.updateForChangeInCustomCssClass === true) {
            this.updateForChangeInCustomCssClass();
        }
        if (updateUIMethods.updateForChangeInStyleCss === true) {
            this.updateForChangeInStyleCss();
        }
        if (updateUIMethods.checkboxDisplay === true) {
            this.checkboxDisplay();
        }
        if (updateUIMethods.updateInternalHtml === true) {
            this.updateInternalHtml();
        }
        this.previousExtendedProperties = updatedNodes;
        this.logger.stop();
    }
    receiveSignalAsString(thisButton, attributeName, attributeValue) {
        this.logger.log('set ' + attributeName + '("' + attributeValue + '")');
        const attributeNameLowerCase = attributeName.toLowerCase();
        if (!thisButton.hasAttribute(attributeNameLowerCase) || thisButton.getAttribute(attributeNameLowerCase) !== attributeValue) {
            thisButton.setAttribute(attributeNameLowerCase, attributeValue);
        }
        const signalResponse = thisButton._ch5ButtonSignal.setSignal(attributeName, attributeValue);
        if (!isNil(signalResponse)) {
            thisButton._ch5ButtonSignal.getSignal(attributeName).signalState = signalResponse.subscribe((newValue) => {
                thisButton._ch5ButtonSignal.getSignal(attributeName).currentValue = newValue;
                thisButton._ch5ButtonSignal.setVariable(attributeName, newValue);
                thisButton.setButtonDisplay();
            });
        }
    }
    isCheckboxVisible() {
        if (this.hasAttribute("checkboxShow") && this.toBoolean((this.hasAttribute('checkboxshow') && this.getAttribute('checkboxshow') !== "false")) === true) {
            return true;
        }
        return false;
    }
    updateInternalHtml() {
        var _a, _b, _c;
        this.logger.start("updateInternalHtml()");
        if (!(typeof this._elButton.insertBefore === "undefined"
            || typeof this._elIcon.classList === "undefined")) {
            Ch5ButtonBase.ICON_POSITIONS.forEach((iconPositionObj) => {
                if (this.iconPosition === iconPositionObj) {
                    this._elContainer.classList.add(`${this.primaryCssClass}--iconposition-${iconPositionObj}`);
                    this._elIcon.classList.add(`cx-button-icon-pos-${iconPositionObj}`);
                }
                else {
                    this._elContainer.classList.remove(`${this.primaryCssClass}--iconposition-${iconPositionObj}`);
                    this._elIcon.classList.remove(`cx-button-icon-pos-${iconPositionObj}`);
                }
            });
            let hasIcon = false;
            let hasLabel = false;
            let hasImage = false;
            let hasSgNumeric = false;
            let hasSgString = false;
            let hasAriaLabel = false;
            let hasCheckbox = false;
            if ((!isNil(this.iconClass) && this.iconClass !== "") || (this.receiveStateIconClass && this.receiveStateIconClass !== '')) {
                hasIcon = true;
            }
            if ((!isNil(this.iconUrl) && this.iconUrl !== "") || (this.receiveStateIconUrl && this.receiveStateIconUrl !== '')) {
                hasImage = true;
            }
            if ((!isNil(this.sgIconNumeric) && this.sgIconNumeric !== -1) || (this.receiveStateSGIconNumeric && this.receiveStateSGIconNumeric !== '')) {
                hasSgNumeric = true;
            }
            if ((!isNil(this.sgIconString) && this.sgIconString !== '') || (this.receiveStateSGIconString && this.receiveStateSGIconString !== '')) {
                hasSgString = true;
            }
            hasCheckbox = this.isCheckboxVisible();
            if ((!isNil(this.label) && this.label !== "") || (this.receiveStateLabel && this.receiveStateLabel !== '') || (this.receiveStateScriptLabelHtml && this.receiveStateScriptLabelHtml !== '')) {
                hasLabel = true;
            }
            if (this.hasAttribute('aria-label') && '' !== this.getAttribute('aria-label')) {
                hasAriaLabel = true;
            }
            this.logger.log("hasIcon", hasIcon);
            this.logger.log("hasLabel", hasLabel);
            this.logger.log("hasImage", hasImage);
            this.logger.log("hasAriaLabel", hasAriaLabel);
            this.logger.log("hasCheckbox", hasCheckbox);
            if (!hasLabel && hasAriaLabel && hasImage) {
                const ariaLabel = this.getAttribute('aria-label');
                if (ariaLabel) {
                    this._elIcon.setAttribute('alt', ariaLabel);
                }
            }
            if (hasSgString) {
                this._elIcon.classList.remove(this.primaryCssClass + '--icon');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                });
                if (this.iconUrlFillType !== null) {
                    this._elSpanForLabelIconImg.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                }
                this._elIcon.classList.add(this.primaryCssClass + '--img');
            }
            else if (hasSgNumeric) {
                this._elIcon.classList.remove(this.primaryCssClass + '--icon');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                });
                if (this.iconUrlFillType !== null) {
                    this._elSpanForLabelIconImg.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                }
                this._elIcon.classList.add(this.primaryCssClass + '--img');
            }
            else if (hasImage && this.iconUrl === ((_a = this._ch5ButtonSignal.getSignal('receiveStateIconUrl')) === null || _a === void 0 ? void 0 : _a.currentValue)) {
                this._elIcon.style.backgroundImage = `url(${this.iconUrl})`;
                this._elIcon.classList.remove(this.primaryCssClass + '--icon');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                    else {
                        this._elButton.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                });
                this._elIcon.classList.add(this.primaryCssClass + '--img');
                if (this.iconUrlFillType !== null) {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                    }
                    else {
                        this._elButton.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                    }
                }
            }
            else if (hasIcon && this.iconClass === ((_b = this._ch5ButtonSignal.getSignal('receiveStateiconClass')) === null || _b === void 0 ? void 0 : _b.currentValue)) {
                this._elIcon.classList.remove(this.primaryCssClass + '--img');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                    else {
                        this._elButton.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                });
                this._elIcon.classList.add(this.primaryCssClass + '--icon');
            }
            else if (hasImage) {
                this._elIcon.style.backgroundImage = `url(${this.iconUrl})`;
                this._elIcon.classList.remove(this.primaryCssClass + '--icon');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                    else {
                        this._elButton.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                });
                this._elIcon.classList.add(this.primaryCssClass + '--img');
                if (this.iconUrlFillType !== null) {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                    }
                    else {
                        this._elButton.classList.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
                    }
                }
            }
            else if (hasIcon) {
                this._elIcon.classList.remove(this.primaryCssClass + '--img');
                Array.from(Ch5ButtonBase.ICON_URL_FILL_TYPE).forEach((cls) => {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                    else {
                        this._elButton.classList.remove(this.primaryCssClass + '--icon-url-fill-type-' + cls);
                    }
                });
                this._elIcon.classList.add(this.primaryCssClass + '--icon');
            }
            if (hasCheckbox === true) {
                this._elButton.appendChild(this._elSpanForLabelIconImg);
                this._elSpanForLabelIconImg.appendChild(this._elSpanForLabelOnly);
                this._elButton.classList.remove(this.primaryCssClass + '--span');
                this._elSpanForLabelIconImg.classList.add(this.primaryCssClass + '--span');
                this.updateCssClasses();
            }
            else {
                this._elButton.innerHTML = '';
                this._elButton.appendChild(this._elSpanForLabelOnly);
                (_c = this._elSpanForLabelIconImg) === null || _c === void 0 ? void 0 : _c.classList.remove(this.primaryCssClass + '--span');
                this._elButton.classList.add(this.primaryCssClass + '--span');
                this.updateCssClasses();
            }
            if (hasLabel && (hasIcon || hasImage || hasSgNumeric || hasSgString)) {
                this.logger.log("Has Label and Icon");
                if (this._elSpanForLabelOnly.isConnected === false) {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.appendChild(this._elSpanForLabelOnly);
                    }
                    else {
                        this._elButton.appendChild(this._elSpanForLabelOnly);
                    }
                }
                else if (this._elIcon.parentNode !== this._elSpanForLabelOnly) {
                    if (hasCheckbox === true) {
                        this._elSpanForLabelIconImg.appendChild(this._elSpanForLabelOnly);
                    }
                    else {
                        this._elButton.appendChild(this._elSpanForLabelOnly);
                    }
                }
                if (['last', 'bottom'].indexOf(this.iconPosition) >= 0) {
                    if (this._elIcon.parentNode !== this._elButton) {
                        if (hasCheckbox === true) {
                            this._elSpanForLabelIconImg.appendChild(this._elIcon);
                        }
                        else {
                            this._elButton.appendChild(this._elIcon);
                        }
                    }
                    else {
                        if (hasCheckbox === true) {
                            this._elSpanForLabelIconImg.insertBefore(this._elSpanForLabelOnly, this._elIcon);
                        }
                        else {
                            this._elButton.insertBefore(this._elSpanForLabelOnly, this._elIcon);
                        }
                    }
                }
                else if (['first', 'top'].indexOf(this.iconPosition) >= 0) {
                    this.logger.log('insert icon before label');
                    if (this._elSpanForLabelOnly.isConnected === true) {
                        if (hasCheckbox === true) {
                            this._elSpanForLabelIconImg.insertBefore(this._elIcon, this._elSpanForLabelOnly);
                        }
                        else {
                            this._elButton.insertBefore(this._elIcon, this._elSpanForLabelOnly);
                        }
                    }
                }
            }
            else if (hasLabel && !(hasIcon || hasImage || hasSgNumeric || hasSgString)) {
                this.logger.log("Has Label Only");
                if (this._elIcon.parentNode) {
                    this._elIcon.remove();
                }
            }
            else if (!hasLabel && (hasIcon || hasImage || hasSgNumeric || hasSgString)) {
                this.logger.log("Has Icon Only");
                if (hasCheckbox === true) {
                    this._elSpanForLabelIconImg.appendChild(this._elIcon);
                    if (this._elSpanForLabelOnly.parentNode) {
                        this._elSpanForLabelOnly.remove();
                    }
                }
                else {
                    this._elButton.appendChild(this._elIcon);
                    if (this._elSpanForLabelOnly.parentNode) {
                        this._elSpanForLabelOnly.remove();
                    }
                }
            }
            else {
                this.logger.log("No Label and No Icon");
                if (this._elIcon.parentNode) {
                    this._elIcon.remove();
                }
                if (this._elSpanForLabelOnly.parentNode) {
                    this._elSpanForLabelOnly.remove();
                }
            }
        }
        this.checkboxDisplay();
        this.logger.stop();
    }
    updateCssClasses() {
        var _a, _b, _c, _d, _e, _f;
        this.logger.start('updateCssClasses()');
        super.updateCssClasses();
        const setOfCssClassesToBeApplied = new Set();
        setOfCssClassesToBeApplied.add(this.primaryCssClass);
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--' + this.shape);
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--background-image-fill-type-' + this.backgroundImageFillType);
        if (this.isButtonInitiated === true) {
            setOfCssClassesToBeApplied.add(this.primaryCssClass + '--' + this.type);
        }
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--size-' + this.size);
        if (!_.isNil(this.stretch)) {
            setOfCssClassesToBeApplied.add(this.primaryCssClass + '--stretch-' + this.stretch);
        }
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--' + this.orientation);
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (typeof targetEl.classList !== 'undefined') {
            this._listOfAllPossibleComponentCssClasses.forEach((cssClass) => {
                if (setOfCssClassesToBeApplied.has(cssClass)) {
                    targetEl.classList.add(cssClass);
                }
                else {
                    targetEl.classList.remove(cssClass);
                }
            });
            const selectedCssClass = this.primaryCssClass + this.selectedCssClassPostfix;
            if (this._selected) {
                targetEl.classList.add(selectedCssClass);
                if (((_a = this.buttonListContract) === null || _a === void 0 ? void 0 : _a.parentComponent) === "ch5-tab-button" || ((_b = this.buttonListContract) === null || _b === void 0 ? void 0 : _b.parentComponent) === "ch5-button-list") {
                    targetEl.classList.add(((_c = this.buttonListContract) === null || _c === void 0 ? void 0 : _c.parentComponent) + this.selectedCssClassPostfix);
                }
            }
            else {
                targetEl.classList.remove(selectedCssClass);
                if (((_d = this.buttonListContract) === null || _d === void 0 ? void 0 : _d.parentComponent) === "ch5-tab-button" || ((_e = this.buttonListContract) === null || _e === void 0 ? void 0 : _e.parentComponent) === "ch5-button-list") {
                    targetEl.classList.remove(((_f = this.buttonListContract) === null || _f === void 0 ? void 0 : _f.parentComponent) + this.selectedCssClassPostfix);
                }
            }
        }
        this.verticalOrientationHandler();
        const setOfCssClassesToBeAppliedForLabelAlignment = new Set();
        setOfCssClassesToBeAppliedForLabelAlignment.add(this.primaryCssClass + '--horizontal-' + this.hAlignLabel);
        setOfCssClassesToBeAppliedForLabelAlignment.add(this.primaryCssClass + '--vertical-' + this.vAlignLabel);
        if (this.iconUrlFillType !== null) {
            setOfCssClassesToBeAppliedForLabelAlignment.add(this.primaryCssClass + `--icon-url-fill-type-${this.iconUrlFillType}`);
        }
        const arrayListTwo = [];
        if (this.hasAttribute("checkboxShow") && this.toBoolean((this.hasAttribute('checkboxshow') && this.getAttribute('checkboxshow') !== "false")) === true) {
            for (let i = 0; i < this._listOfAllPossibleComponentCssClasses.length; i++) {
                if (setOfCssClassesToBeAppliedForLabelAlignment.has(this._listOfAllPossibleComponentCssClasses[i])) {
                    arrayListTwo.push(this._listOfAllPossibleComponentCssClasses[i]);
                }
            }
            this._elSpanForLabelIconImg.className = this.primaryCssClass + '--span' + ' ' + arrayListTwo.join(' ');
        }
        else {
            for (let i = 0; i < this._listOfAllPossibleComponentCssClasses.length; i++) {
                if (setOfCssClassesToBeAppliedForLabelAlignment.has(this._listOfAllPossibleComponentCssClasses[i])) {
                    arrayListTwo.push(this._listOfAllPossibleComponentCssClasses[i]);
                }
            }
            this._elButton.className = this.BUTTON_PRIMARY_CLASS + ' ' + this.primaryCssClass + '--span' + ' ' + arrayListTwo.join(' ');
        }
        this.logger.stop();
    }
    updateCssClassesForCustomState() {
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (typeof targetEl.classList === 'undefined') {
            return;
        }
        const customStateCssClass = this.customClassState;
        if (this._customClassState) {
            targetEl.classList.add(customStateCssClass);
        }
    }
    setSelectionMethods() {
        this.setButtonDisplay();
        this.checkboxDisplay();
        this.updateCssClasses();
    }
}
Ch5ButtonBase.TYPES = ['default', 'primary', 'info', 'text', 'danger', 'warning', 'success', 'secondary'];
Ch5ButtonBase.SHAPES = ['rounded-rectangle', 'rectangle', 'tab', 'circle', 'oval'];
Ch5ButtonBase.SIZES = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5ButtonBase.STRETCHES = ['both', 'width', 'height'];
Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE = ['stretch-aspect', 'stretch', 'center', 'tile'];
Ch5ButtonBase.ICON_URL_FILL_TYPE = ['stretch', 'stretch-aspect', 'center', 'tile', 'initial'];
Ch5ButtonBase.ICON_POSITIONS = ['first', 'last', 'top', 'bottom'];
Ch5ButtonBase.CHECKBOX_POSITIONS = ['left', 'right'];
Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS = ['center', 'left', 'right'];
Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS = ['middle', 'top', 'bottom'];
Ch5ButtonBase.ORIENTATIONS = ['horizontal', 'vertical'];
Ch5ButtonBase.SG_ICON_THEME = ['icons-lg', 'icons-sm', 'media-transports-accents', 'media-transports-light', 'media-transports-dark'];
Ch5ButtonBase.MODES = {
    MIN_LENGTH: 0,
    MAX_LENGTH: 99
};
Ch5ButtonBase.MAX_SG_NUMERIC = 214;
Ch5ButtonBase.COMPONENT_DATA = {
    TYPES: {
        default: Ch5ButtonBase.TYPES[0],
        values: Ch5ButtonBase.TYPES,
        key: 'type',
        attribute: 'type',
        classListPrefix: '--'
    },
    SHAPES: {
        default: Ch5ButtonBase.SHAPES[0],
        values: Ch5ButtonBase.SHAPES,
        key: 'shape',
        attribute: 'shape',
        classListPrefix: '--'
    },
    SIZES: {
        default: Ch5ButtonBase.SIZES[0],
        values: Ch5ButtonBase.SIZES,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    },
    STRETCH: {
        default: null,
        values: Ch5ButtonBase.STRETCHES,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '--stretch-'
    },
    ICON_POSITIONS: {
        default: Ch5ButtonBase.ICON_POSITIONS[0],
        values: Ch5ButtonBase.ICON_POSITIONS,
        key: 'iconposition',
        attribute: 'iconPosition',
        classListPrefix: '--iconposition-'
    },
    CHECKBOX_POSITIONS: {
        default: Ch5ButtonBase.CHECKBOX_POSITIONS[0],
        values: Ch5ButtonBase.CHECKBOX_POSITIONS,
        key: 'checkboxposition',
        attribute: 'checkboxPosition',
        classListPrefix: 'cx-button-checkbox-pos-'
    },
    HORIZONTAL_LABEL_ALIGNMENTS: {
        default: Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS[0],
        values: Ch5ButtonBase.HORIZONTAL_LABEL_ALIGNMENTS,
        key: 'halignlabel',
        attribute: 'hAlignLabel',
        classListPrefix: '--horizontal-'
    },
    VERTICAL_LABEL_ALIGNMENTS: {
        default: Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS[0],
        values: Ch5ButtonBase.VERTICAL_LABEL_ALIGNMENTS,
        key: 'valignlabel',
        attribute: 'vAlignLabel',
        classListPrefix: '--vertical-'
    },
    ORIENTATIONS: {
        default: Ch5ButtonBase.ORIENTATIONS[0],
        values: Ch5ButtonBase.ORIENTATIONS,
        key: 'orientation',
        classListPrefix: '--'
    },
    BACKGROUND_IMAGE_FILL_TYPE: {
        default: Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE[0],
        values: Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE,
        key: 'backgroundImageFillType',
        attribute: 'backgroundImageFillType',
        classListPrefix: '--background-image-fill-type-'
    },
    ICON_URL_FILL_TYPE: {
        default: Ch5ButtonBase.ICON_URL_FILL_TYPE[0],
        values: Ch5ButtonBase.ICON_URL_FILL_TYPE,
        key: 'iconUrlFillType',
        attribute: 'iconUrlFillType',
        classListPrefix: '--icon-url-fill-type-'
    },
    SG_ICON_THEME: {
        default: Ch5ButtonBase.SG_ICON_THEME[0],
        values: Ch5ButtonBase.SG_ICON_THEME,
        key: 'sgIconTheme',
        attribute: 'sgIconTheme',
        classListPrefix: '--sg-icon-theme-'
    }
};
Ch5ButtonBase.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatemode: { direction: "state", numericJoin: 1, contractName: true }, receivestateselected: { direction: "state", booleanJoin: 1, contractName: true }, receivestatelabel: { direction: "state", stringJoin: 1, contractName: true }, receivestatescriptlabelhtml: { direction: "state", stringJoin: 1, contractName: true }, receivestateiconclass: { direction: "state", stringJoin: 1, contractName: true }, receivestateiconurl: { direction: "state", stringJoin: 1, contractName: true }, receivestatetype: { direction: "state", stringJoin: 1, contractName: true }, receivestatesgiconnumeric: { direction: "state", numericJoin: 1, contractName: true }, receivestatesgiconstring: { direction: "state", stringJoin: 1, contractName: true }, sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true }, sendeventontouch: { direction: "event", booleanJoin: 1, contractName: true }, contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 }, receivestatebackgroundimageurl: { direction: "state", stringJoin: 1, contractName: true } });
Ch5ButtonBase.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "backgroundImageUrl",
        nameForSignal: "receiveStateBackgroundImageUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE[0],
        enumeratedValues: Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE,
        name: "backgroundImageFillType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonBase.BACKGROUND_IMAGE_FILL_TYPE[0],
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5ButtonBase.ICON_URL_FILL_TYPE,
        name: "iconUrlFillType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateBackgroundImageUrl",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonBase.SG_ICON_THEME[0],
        enumeratedValues: Ch5ButtonBase.SG_ICON_THEME,
        name: "sgIconTheme",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonBase.SG_ICON_THEME[0],
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSGIconNumeric",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSGIconString",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1iYXNlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi9jaDUtYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFNBQVMsRUFBb0MsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyRixPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBb0IzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFdkYsT0FBTyxFQUFnQyxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxNQUFNLE9BQU8sYUFBYyxTQUFRLFNBQVM7SUErZ0IzQyxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFOUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLG1CQUFtQixDQUFD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