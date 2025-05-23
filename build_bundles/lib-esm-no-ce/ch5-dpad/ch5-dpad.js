import _ from "lodash";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { CH5DpadUtils } from "./ch5-dpad-utils";
import { ComponentHelper } from "../ch5-common/utils/component-helper";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5DpadButton } from "./ch5-dpad-button";
import { subscribeInViewPortChange, unSubscribeInViewPortChange } from "../ch5-core";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5Dpad extends Ch5Common {
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Dpad.ELEMENT_NAME, Ch5Dpad.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Dpad.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Dpad.ELEMENT_NAME, Ch5Dpad);
        }
    }
    set contractName(value) {
        this._ch5Properties.set("contractName", value, () => {
            this.updateContractNameBasedHandlers();
        });
    }
    get contractName() {
        var _a;
        return (_a = this._ch5Properties.get("contractName")) === null || _a === void 0 ? void 0 : _a.trim();
    }
    set type(value) {
        this._ch5Properties.set("type", value, () => {
            this.updateCssClasses();
        });
    }
    get type() {
        return this._ch5Properties.get("type");
    }
    set shape(value) {
        this._ch5Properties.set("shape", value, () => {
            this.checkAndRestructureDomOfDpad();
        });
    }
    get shape() {
        return this._ch5Properties.get("shape");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.stretchHandler();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.updateCssClasses();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set sendEventOnClickStart(value) {
        this._ch5Properties.set("sendEventOnClickStart", value === null || value === void 0 ? void 0 : value.trim(), () => {
            this.updateEventClickHandlers();
        });
    }
    get sendEventOnClickStart() {
        var _a;
        return (_a = this._ch5Properties.get("sendEventOnClickStart")) === null || _a === void 0 ? void 0 : _a.trim();
    }
    set useContractForEnable(value) {
        this._ch5Properties.set("useContractForEnable", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForEnable === true) {
                    this.receiveStateEnable = contractName + '.Enable';
                }
            }
        });
    }
    get useContractForEnable() {
        return this._ch5Properties.get("useContractForEnable");
    }
    set useContractForShow(value) {
        this._ch5Properties.set("useContractForShow", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForShow === true) {
                    this.receiveStateShow = contractName + '.Show';
                }
            }
        });
    }
    get useContractForShow() {
        return this._ch5Properties.get("useContractForShow");
    }
    set useContractForCustomStyle(value) {
        this._ch5Properties.set("useContractForCustomStyle", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForCustomStyle === true) {
                    this.receiveStateCustomStyle = contractName + '.CustomStyle';
                }
            }
        });
    }
    get useContractForCustomStyle() {
        return this._ch5Properties.get("useContractForCustomStyle");
    }
    set useContractForCustomClass(value) {
        this._ch5Properties.set("useContractForCustomClass", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForCustomClass === true) {
                    this.receiveStateCustomClass = contractName + '.CustomClass';
                }
            }
        });
    }
    get useContractForCustomClass() {
        return this._ch5Properties.get("useContractForCustomClass");
    }
    set hideCenterButton(value) {
        this._ch5Properties.set("hideCenterButton", value, () => {
            this.handleHideCenterButton();
        });
    }
    get hideCenterButton() {
        return this._ch5Properties.get("hideCenterButton");
    }
    set receiveStateHideCenterButton(value) {
        this._ch5Properties.set("receiveStateHideCenterButton", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("hideCenterButton", newValue, () => {
                this.handleHideCenterButton();
            });
        });
    }
    get receiveStateHideCenterButton() {
        return this._ch5Properties.get('receiveStateHideCenterButton');
    }
    set disableCenterButton(value) {
        this._ch5Properties.set("disableCenterButton", value, () => {
            this.handleDisableCenterButton();
        });
    }
    get disableCenterButton() {
        return this._ch5Properties.get("disableCenterButton");
    }
    set receiveStateDisableCenterButton(value) {
        this._ch5Properties.set("receiveStateDisableCenterButton", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("disableCenterButton", newValue, () => {
                this.handleDisableCenterButton();
            });
        });
    }
    get receiveStateDisableCenterButton() {
        return this._ch5Properties.get('receiveStateDisableCenterButton');
    }
    set useContractForDisableCenterButton(value) {
        this._ch5Properties.set("useContractForDisableCenterButton", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForDisableCenterButton === true) {
                    this.receiveStateDisableCenterButton = contractName + '.DisableCenterButton';
                }
            }
        });
    }
    get useContractForDisableCenterButton() {
        return this._ch5Properties.get("useContractForDisableCenterButton");
    }
    set useContractForHideCenterButton(value) {
        this._ch5Properties.set("useContractForHideCenterButton", value, () => {
            const contractName = this.contractName;
            if (contractName.length > 0) {
                if (this.useContractForHideCenterButton === true) {
                    this.receiveStateHideCenterButton = contractName + '.HideCenterButton';
                }
            }
        });
    }
    get useContractForHideCenterButton() {
        return this._ch5Properties.get("useContractForHideCenterButton");
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-dpad';
        this.isResizeInProgress = false;
        this.RESIZE_DEBOUNCE = 500;
        this.container = {};
        this.containerClass = 'dpad-container';
        this.logger.start('constructor()', Ch5Dpad.ELEMENT_NAME);
        ComponentHelper.clearComponentContent(this);
        this._ch5Properties = new Ch5Properties(this, Ch5Dpad.COMPONENT_PROPERTIES);
        this.initCssClasses();
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback() - start', Ch5Dpad.ELEMENT_NAME);
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort) {
                if (!_.isNil(this.stretch) && this.parentElement) {
                    const { offsetHeight: parentHeight, offsetWidth: parentWidth } = this.parentElement;
                    const setValue = parentWidth <= parentHeight ? parentWidth : parentHeight;
                    this.container.style.height = setValue + 'px';
                    this.container.style.width = setValue + 'px';
                }
            }
        });
        customElements.whenDefined('ch5-dpad').then(() => {
            if (!this._wasInstatiated) {
                this.createHtmlElements();
            }
            this._wasInstatiated = true;
            this.attachEventListeners();
            this.initAttributes();
            this.stretchHandler();
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.removeEvents();
        this.unsubscribeFromSignals();
        unSubscribeInViewPortChange(this);
        if (!!this.container && !!this.container.style) {
            this.container.style.removeProperty('height');
            this.container.style.removeProperty('width');
        }
        this.disconnectCommonMutationObserver();
    }
    removeEvents() {
        super.removeEventListeners();
        window.removeEventListener('resize', this.onWindowResizeHandler);
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Dpad.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Dpad.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Dpad.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-dpad attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Dpad.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    createHtmlElements() {
        var _a;
        this.logger.start('createHtmlElements', Ch5Dpad.ELEMENT_NAME);
        this.classList.add(this.primaryCssClass);
        const childItemsContainer = this.children;
        if (childItemsContainer.length === 0 || childItemsContainer[0].children.length === 0) {
            if (!_.cloneDeep((_a = childItemsContainer[0]) === null || _a === void 0 ? void 0 : _a.children)) {
                this.createAndAppendAllButtonsUnderDpad();
            }
            else {
                this.createAndAppendAllExistingButtonsUnderDpad(childItemsContainer);
            }
        }
        else {
            const isValidStructureInChildDiv = this.checkIfOrderOfTagsAreInTheRightOrder(childItemsContainer[0].children);
            if (!isValidStructureInChildDiv) {
                this.createAndAppendAllExistingButtonsUnderDpad(childItemsContainer[0].children);
            }
        }
        this.logger.stop();
    }
    updateHtmlElements() {
        var _a;
        this.logger.start('updateHtmlElements', Ch5Dpad.ELEMENT_NAME);
        const childItemsContainer = this.children;
        if (childItemsContainer.length === 0 || childItemsContainer[0].children.length === 0) {
            if (!_.cloneDeep((_a = childItemsContainer[0]) === null || _a === void 0 ? void 0 : _a.children)) {
                this.createAndAppendAllButtonsUnderDpad();
            }
            else {
                this.createAndAppendAllExistingButtonsUnderDpad(childItemsContainer[0].children);
            }
        }
        else {
            const isValidStructureInChildDiv = this.checkIfOrderOfTagsAreInTheRightOrder(childItemsContainer[0].children);
            if (!isValidStructureInChildDiv) {
                this.createAndAppendAllExistingButtonsUnderDpad(childItemsContainer[0].children);
            }
            else {
                this.updatePropertiesForHideAndDisableCenterButton(childItemsContainer[0].children);
            }
        }
        this.logger.stop();
    }
    createEmptyContainerDiv() {
        if (_.isNil(this.container) || _.isNil(this.container.classList) || this.container.classList.length === 0) {
            this.container = document.createElement('div');
            this.container.classList.add(this.containerClass);
        }
        if (this.container.parentElement !== this) {
            this.appendChild(this.container);
        }
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
    createAndAppendAllButtonsUnderDpad() {
        const disabledCenterButton = (this.disableCenterButton || this.hideCenterButton);
        const centerBtn = new Ch5DpadButton(this, disabledCenterButton);
        centerBtn.setAttribute('key', 'center');
        const upBtn = new Ch5DpadButton(this);
        upBtn.setAttribute('key', 'up');
        const rightBtn = new Ch5DpadButton(this);
        rightBtn.setAttribute('key', 'right');
        const downBtn = new Ch5DpadButton(this);
        downBtn.setAttribute('key', 'down');
        const leftBtn = new Ch5DpadButton(this);
        leftBtn.setAttribute('key', 'left');
        this.createEmptyContainerDiv();
        this.appendButtonsInRightOrder(centerBtn, upBtn, leftBtn, rightBtn, downBtn);
    }
    updatePropertiesForHideAndDisableCenterButton(buttonsList) {
        let centerBtn = null;
        Array.from(buttonsList).forEach(item => {
            switch (item.getAttribute('key')) {
                case 'center':
                    centerBtn = item;
                    const disabledCenterButton = (this.disableCenterButton || this.hideCenterButton);
                    centerBtn.setDisabledOrHidden(disabledCenterButton);
                    break;
            }
        });
    }
    createAndAppendAllExistingButtonsUnderDpad(buttonsList) {
        if (!buttonsList.length) {
            return;
        }
        let centerBtn = null;
        let upBtn = null;
        let rightBtn = null;
        let downBtn = null;
        let leftBtn = null;
        Array.from(buttonsList).forEach(item => {
            switch (item.getAttribute('key')) {
                case 'center':
                    centerBtn = item;
                    break;
                case 'up':
                    upBtn = item;
                    break;
                case 'right':
                    rightBtn = item;
                    break;
                case 'down':
                    downBtn = item;
                    break;
                case 'left':
                    leftBtn = item;
                    break;
                default: throw new Error("Seems to be an invalid dpad Button value ");
            }
        });
        const disabledCenterButton = (this.disableCenterButton || this.hideCenterButton);
        if (!centerBtn) {
            centerBtn = new Ch5DpadButton(this, disabledCenterButton);
            centerBtn.setAttribute('key', 'center');
        }
        else {
            centerBtn.setDisabledOrHidden(disabledCenterButton);
        }
        if (!upBtn) {
            upBtn = new Ch5DpadButton(this);
            upBtn.setAttribute('key', 'up');
        }
        if (!rightBtn) {
            rightBtn = new Ch5DpadButton(this);
            rightBtn.setAttribute('key', 'right');
        }
        if (!downBtn) {
            downBtn = new Ch5DpadButton(this);
            downBtn.setAttribute('key', 'down');
        }
        if (!leftBtn) {
            leftBtn = new Ch5DpadButton(this);
            leftBtn.setAttribute('key', 'left');
        }
        this.createEmptyContainerDiv();
        this.appendButtonsInRightOrder(centerBtn, upBtn, leftBtn, rightBtn, downBtn);
    }
    appendButtonsInRightOrder(centerBtn, upBtn, leftBtn, rightBtn, downBtn) {
        this.container.appendChild(centerBtn);
        this.container.appendChild(upBtn);
        if (this.shape === Ch5Dpad.SHAPES[0]) {
            this.container.appendChild(leftBtn);
            this.container.appendChild(rightBtn);
        }
        else if (this.shape === Ch5Dpad.SHAPES[1]) {
            this.container.appendChild(rightBtn);
            this.container.appendChild(leftBtn);
        }
        else {
            throw new Error("Seems to be an invalid shape. Must be 'plus' or 'circle' as values.");
        }
        this.container.appendChild(downBtn);
    }
    checkIfOrderOfTagsAreInTheRightOrder(childItems) {
        let ret = false;
        if (childItems.length === 5) {
            const firstTag = this.shape === Ch5Dpad.SHAPES[0] ? 'left' : 'right';
            const secondTag = this.shape === Ch5Dpad.SHAPES[0] ? 'right' : 'left';
            ret = ((childItems[0].getAttribute('key') === 'center') &&
                (childItems[1].getAttribute('key') === 'up') &&
                (childItems[2].getAttribute('key') === firstTag) &&
                (childItems[3].getAttribute('key') === secondTag) &&
                (childItems[4].getAttribute('key') === 'down'));
        }
        else {
            if (childItems.length > 0) {
                for (const item of Array.from(childItems)) {
                    item.remove();
                }
            }
        }
        return ret;
    }
    initAttributes() {
        this.logger.start("initAttributes", Ch5Dpad.ELEMENT_NAME);
        super.initAttributes();
        this.setAttribute('data-ch5-id', this.getCrId());
        ComponentHelper.setAttributeToElement(this, 'role', Ch5RoleAttributeMapping.ch5Dpad);
        const thisRef = this;
        for (let i = 0; i < Ch5Dpad.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Dpad.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Dpad.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Dpad.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
                else {
                    const key = Ch5Dpad.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = Ch5Dpad.COMPONENT_PROPERTIES[i].default;
                }
            }
        }
        this.handleHideCenterButton();
        this.handleDisableCenterButton();
        this.logger.stop();
    }
    attachEventListeners() {
        super.attachEventListeners();
        window.addEventListener('resize', this.onWindowResizeHandler.bind(this));
    }
    updateCssClasses() {
        super.updateCssClasses();
        for (const typeVal of Ch5Dpad.TYPES) {
            this.classList.remove(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_TYPE + typeVal);
        }
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_TYPE + this.type);
        for (const typeVal of Ch5Dpad.SHAPES) {
            this.classList.remove(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SHAPE + typeVal);
        }
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SHAPE + this.shape);
        for (const typeVal of Ch5Dpad.SIZES) {
            this.classList.remove(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SIZE + typeVal);
        }
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SIZE + this.size);
        for (const typeVal of Ch5Dpad.STRETCHES) {
            this.classList.remove(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_STRETCH + typeVal);
        }
        if (!!this.stretch && this.stretch.length > 0) {
            this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_STRETCH + this.stretch);
            if (!!this.size && this.size.length > 0) {
            }
        }
    }
    initCssClasses() {
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_TYPE + this.type);
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SHAPE + this.shape);
        this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SIZE + this.size);
        if (!!this.stretch && this.stretch.length > 0) {
            this.classList.add(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_STRETCH + this.stretch);
            if (!!this.size && this.size.length > 0) {
                this.classList.remove(Ch5Dpad.ELEMENT_NAME + Ch5Dpad.CSS_CLASS_PREFIX_SIZE + this.size);
            }
        }
    }
    checkAndRestructureDomOfDpad() {
        this.logger.start('checkAndRestructureDomOfDpad()', Ch5Dpad.ELEMENT_NAME);
        this.updateHtmlElements();
        this.updateCssClasses();
        this.logger.stop();
    }
    updateEventClickHandlers() {
        const valueInput = this.sendEventOnClickStart;
        const contractName = this.contractName;
        const buttonList = this.getElementsByTagName("ch5-dpad-button");
        let centerBtn = null;
        let upBtn = null;
        let rightBtn = null;
        let downBtn = null;
        let leftBtn = null;
        if (buttonList.length > 0) {
            for (let index = 0; index < buttonList.length; index++) {
                const elementKey = buttonList[index].getAttribute('key');
                if (elementKey) {
                    switch (elementKey) {
                        case 'center':
                            centerBtn = buttonList[index];
                            break;
                        case 'up':
                            upBtn = buttonList[index];
                            break;
                        case 'left':
                            leftBtn = buttonList[index];
                            break;
                        case 'right':
                            rightBtn = buttonList[index];
                            break;
                        case 'down':
                            downBtn = buttonList[index];
                            break;
                        default:
                            centerBtn = buttonList[index];
                            break;
                    }
                }
            }
        }
        if (Ch5Common.isNotNil(valueInput) && (valueInput === null || valueInput === void 0 ? void 0 : valueInput.trim()) !== "") {
            const eventKeyStart = parseInt(valueInput === null || valueInput === void 0 ? void 0 : valueInput.trim(), 10);
            if (contractName.length === 0 && !isNaN(eventKeyStart)) {
                if (!Ch5Common.isNil(centerBtn)) {
                    const contractVal = eventKeyStart + CH5DpadUtils.sendEventOnClickSigCountToAdd.center;
                    centerBtn.setAttribute('sendEventOnClick', contractVal.toString());
                }
                if (!Ch5Common.isNil(upBtn)) {
                    const contractVal = eventKeyStart + CH5DpadUtils.sendEventOnClickSigCountToAdd.up;
                    upBtn.setAttribute('sendEventOnClick', contractVal.toString());
                }
                if (!Ch5Common.isNil(rightBtn)) {
                    const contractVal = eventKeyStart + CH5DpadUtils.sendEventOnClickSigCountToAdd.right;
                    rightBtn.setAttribute('sendEventOnClick', contractVal.toString());
                }
                if (!Ch5Common.isNil(downBtn)) {
                    const contractVal = eventKeyStart + CH5DpadUtils.sendEventOnClickSigCountToAdd.down;
                    downBtn.setAttribute('sendEventOnClick', contractVal.toString());
                }
                if (!Ch5Common.isNil(leftBtn)) {
                    const contractVal = eventKeyStart + CH5DpadUtils.sendEventOnClickSigCountToAdd.left;
                    leftBtn.setAttribute('sendEventOnClick', contractVal.toString());
                }
            }
        }
        else {
            if (contractName.length === 0) {
                if (!Ch5Common.isNil(centerBtn)) {
                    centerBtn.removeAttribute('sendEventOnClick');
                }
                if (!Ch5Common.isNil(upBtn)) {
                    upBtn.removeAttribute('sendEventOnClick');
                }
                if (!Ch5Common.isNil(rightBtn)) {
                    rightBtn.removeAttribute('sendEventOnClick');
                }
                if (!Ch5Common.isNil(downBtn)) {
                    downBtn.removeAttribute('sendEventOnClick');
                }
                if (!Ch5Common.isNil(leftBtn)) {
                    leftBtn.removeAttribute('sendEventOnClick');
                }
            }
        }
    }
    updateContractNameBasedHandlers() {
        const contractName = this.contractName;
        const buttonList = this.getElementsByTagName("ch5-dpad-button");
        let centerBtn = null;
        let upBtn = null;
        let rightBtn = null;
        let downBtn = null;
        let leftBtn = null;
        if (buttonList.length > 0) {
            for (let index = 0; index < buttonList.length; index++) {
                const elementKey = buttonList[index].getAttribute('key');
                if (elementKey) {
                    switch (elementKey) {
                        case 'center':
                            centerBtn = buttonList[index];
                            break;
                        case 'up':
                            upBtn = buttonList[index];
                            break;
                        case 'left':
                            leftBtn = buttonList[index];
                            break;
                        case 'right':
                            rightBtn = buttonList[index];
                            break;
                        case 'down':
                            downBtn = buttonList[index];
                            break;
                        default:
                            centerBtn = buttonList[index];
                            break;
                    }
                }
            }
        }
        if (contractName.length > 0) {
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = contractName + '.Enable';
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = contractName + '.Show';
            }
            if (this.useContractForDisableCenterButton === true) {
                this.receiveStateDisableCenterButton = contractName + '.DisableCenterButton';
            }
            if (this.useContractForHideCenterButton === true) {
                this.receiveStateHideCenterButton = contractName + '.HideCenterButton';
            }
            if (!Ch5Common.isNil(centerBtn)) {
                const contractVal = contractName + "." + CH5DpadUtils.contractSuffix.center;
                centerBtn.setAttribute('sendEventOnClick', contractVal.toString());
            }
            if (!Ch5Common.isNil(upBtn)) {
                const contractVal = contractName + "." + CH5DpadUtils.contractSuffix.up;
                upBtn.setAttribute('sendEventOnClick', contractVal.toString());
            }
            if (!Ch5Common.isNil(rightBtn)) {
                const contractVal = contractName + "." + CH5DpadUtils.contractSuffix.right;
                rightBtn.setAttribute('sendEventOnClick', contractVal.toString());
            }
            if (!Ch5Common.isNil(downBtn)) {
                const contractVal = contractName + "." + CH5DpadUtils.contractSuffix.down;
                downBtn.setAttribute('sendEventOnClick', contractVal.toString());
            }
            if (!Ch5Common.isNil(leftBtn)) {
                const contractVal = contractName + "." + CH5DpadUtils.contractSuffix.left;
                leftBtn.setAttribute('sendEventOnClick', contractVal.toString());
            }
        }
        else {
            this.updateEventClickHandlers();
        }
    }
    stretchHandler() {
        this.logger.start(Ch5Dpad.ELEMENT_NAME + ' > stretchHandler');
        this.updateCssClasses();
        const dpadHeight = this.offsetHeight;
        const dpadWidth = this.offsetWidth;
        let dimensionVal = Math.min(dpadHeight, dpadWidth);
        if (!!this.stretch && this.stretch.length === 0) {
            dimensionVal = 0;
        }
        if (!!this.container && !!this.container.style) {
            if (dimensionVal === 0) {
                this.container.style.removeProperty('height');
                this.container.style.removeProperty('width');
            }
            const parentElement = this.parentElement;
            if (!!this.stretch && this.stretch.trim().length > 0 && !!parentElement) {
                dimensionVal = Math.min(parentElement.offsetHeight, parentElement.offsetWidth);
                this.container.style.height = dimensionVal + 'px';
                this.container.style.width = dimensionVal + 'px';
            }
        }
        this.logger.stop();
    }
    handleHideCenterButton() {
        const centerButton = this.querySelector('.ch5-dpad-button-center');
        centerButton === null || centerButton === void 0 ? void 0 : centerButton.classList.remove('ch5-hide-child-button');
        if (this.hideCenterButton) {
            centerButton === null || centerButton === void 0 ? void 0 : centerButton.classList.add('ch5-hide-child-button');
        }
        this.checkAndRestructureDomOfDpad();
    }
    handleDisableCenterButton() {
        const centerBtn = this.querySelector('.ch5-dpad-button-center');
        centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.remove('ch5-disable-child-button');
        if (this.disableCenterButton) {
            centerBtn === null || centerBtn === void 0 ? void 0 : centerBtn.classList.add('ch5-disable-child-button');
        }
        this.checkAndRestructureDomOfDpad();
    }
    onWindowResizeHandler() {
        if (!!this.stretch && this.stretch.length > 0 && !this.isResizeInProgress) {
            this.isResizeInProgress = true;
            setTimeout(() => {
                this.stretchHandler();
                this.isResizeInProgress = false;
            }, this.RESIZE_DEBOUNCE);
        }
    }
}
Ch5Dpad.ELEMENT_NAME = 'ch5-dpad';
Ch5Dpad.TYPES = ['default', 'primary', 'info', 'text', 'danger', 'warning', 'success', 'secondary'];
Ch5Dpad.SHAPES = ['plus', 'circle'];
Ch5Dpad.STRETCHES = ['both', 'width', 'height'];
Ch5Dpad.SIZES = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5Dpad.CSS_CLASS_PREFIX_STRETCH = "--stretch-";
Ch5Dpad.CSS_CLASS_PREFIX_TYPE = "--type-";
Ch5Dpad.CSS_CLASS_PREFIX_SHAPE = "--shape-";
Ch5Dpad.CSS_CLASS_PREFIX_SIZE = "--size-";
Ch5Dpad.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "contractName",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5Dpad.TYPES[0],
        enumeratedValues: Ch5Dpad.TYPES,
        name: "type",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Dpad.TYPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5Dpad.SHAPES[0],
        enumeratedValues: Ch5Dpad.SHAPES,
        name: "shape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Dpad.SHAPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5Dpad.SIZES[0],
        enumeratedValues: Ch5Dpad.SIZES,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Dpad.SIZES[0],
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5Dpad.STRETCHES,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true,
    },
    {
        default: false,
        name: "useContractForEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForCustomClass",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForCustomStyle",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: "",
        name: "sendEventOnClickStart",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "hideCenterButton",
        nameForSignal: "receiveStateHideCenterButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateHideCenterButton",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: false,
        name: "disableCenterButton",
        nameForSignal: "receiveStateDisableCenterButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateDisableCenterButton",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForDisableCenterButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForHideCenterButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    }
];
Ch5Dpad.COMPONENT_DATA = {
    TYPES: {
        default: Ch5Dpad.TYPES[0],
        values: Ch5Dpad.TYPES,
        key: 'type',
        attribute: 'type',
        classListPrefix: Ch5Dpad.CSS_CLASS_PREFIX_TYPE
    },
    STRETCHES: {
        default: null,
        values: Ch5Dpad.STRETCHES,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: Ch5Dpad.CSS_CLASS_PREFIX_STRETCH
    },
    SHAPES: {
        default: Ch5Dpad.SHAPES[0],
        values: Ch5Dpad.SHAPES,
        key: 'shape',
        attribute: 'shape',
        classListPrefix: Ch5Dpad.CSS_CLASS_PREFIX_SHAPE
    },
    SIZES: {
        default: Ch5Dpad.SIZES[0],
        values: Ch5Dpad.SIZES,
        key: 'size',
        attribute: 'size',
        classListPrefix: Ch5Dpad.CSS_CLASS_PREFIX_SIZE
    }
};
Ch5Dpad.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendeventonclickstart: { direction: "event", booleanJoin: 1, contractName: true }, contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 }, receivestatehidecenterbutton: { direction: "state", booleanJoin: 1, contractName: true }, receivestatedisablecenterbutton: { direction: "state", booleanJoin: 1, contractName: true } });
Ch5Dpad.registerCustomElement();
Ch5Dpad.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWRwYWQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtZHBhZC9jaDUtZHBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBQ25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE1BQU0sT0FBTyxPQUFRLFNBQVEsU0FBUztJQXNPOUIsTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBRU0sTUFBTSxDQUFDLHFCQUFxQjtRQUNsQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7ZUFDMUIsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVE7ZUFDekMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxVQUFVO2VBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMs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