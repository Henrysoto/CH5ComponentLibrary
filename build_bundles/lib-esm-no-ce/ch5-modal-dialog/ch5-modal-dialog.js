import { Ch5OverlayPanel, } from "../ch5-overlay-panel/index";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5Button } from "../ch5-button/ch5-button";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Common } from '../ch5-common/ch5-common';
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5ModalDialog extends Ch5OverlayPanel {
    set width(value) {
        this._ch5Properties.set("width", this._parseSizeAttr(value), () => {
            this.handleWidth();
        });
    }
    get width() {
        return this._ch5Properties.get("width");
    }
    set height(value) {
        this._ch5Properties.set("height", this._parseSizeAttr(value), () => {
            this.handleHeight();
        });
    }
    get height() {
        return this._ch5Properties.get("height");
    }
    set stretch(value) {
        const prevValue = this.stretch;
        this._ch5Properties.set("stretch", value, () => {
            if (prevValue !== null) {
                this.updateChangeInStretch(prevValue);
            }
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set closable(value) {
        this._ch5Properties.set("closable", value, () => {
            this.adjustInternalHtmlStructure();
        });
    }
    get closable() {
        return this._ch5Properties.get("closable");
    }
    set title(value) {
        const trValue = this._getTranslatedValue('title', value);
        this._ch5Properties.set("title", trValue, () => {
            this.handleTitle(trValue);
        });
    }
    get title() {
        return this._ch5Properties.get("title");
    }
    set mask(value) {
        this._ch5Properties.set("mask", value, () => {
            this.handleMask();
        });
    }
    get mask() {
        return this._ch5Properties.get("mask");
    }
    set maskStyle(value) {
        this._ch5Properties.set("maskStyle", value, () => {
            this.handleMaskStyle();
        });
    }
    get maskStyle() {
        return this._ch5Properties.get("maskStyle");
    }
    set hideOkButton(value) {
        this._ch5Properties.set("hideOkButton", value, () => {
            this.adjustInternalHtmlStructure();
        });
    }
    get hideOkButton() {
        return this._ch5Properties.get("hideOkButton");
    }
    set okButtonLabel(value) {
        const trValue = this._getTranslatedValue('okButtonLabel', value);
        this._ch5Properties.set("okButtonLabel", trValue, () => {
            this.handleOkButtonLabel(trValue);
        });
    }
    get okButtonLabel() {
        return this._ch5Properties.get("okButtonLabel");
    }
    set okButtonIcon(value) {
        this._ch5Properties.set("okButtonIcon", value, () => {
            this.handleOkButtonIcon();
        });
    }
    get okButtonIcon() {
        return this._ch5Properties.get("okButtonIcon");
    }
    set okButtonStyle(value) {
        this._ch5Properties.set("okButtonStyle", value, () => {
            this.handleOkButtonStyle();
        });
    }
    get okButtonStyle() {
        return this._ch5Properties.get("okButtonStyle");
    }
    set hideCancelButton(value) {
        this._ch5Properties.set("hideCancelButton", value, () => {
            this.adjustInternalHtmlStructure();
        });
    }
    get hideCancelButton() {
        return this._ch5Properties.get("hideCancelButton");
    }
    set cancelButtonLabel(value) {
        const trValue = this._getTranslatedValue('cancelButtonLabel', value);
        this._ch5Properties.set("cancelButtonLabel", trValue, () => {
            this.handleCancelButtonLabel(trValue);
        });
    }
    get cancelButtonLabel() {
        return this._ch5Properties.get("cancelButtonLabel");
    }
    set cancelButtonIcon(value) {
        this._ch5Properties.set("cancelButtonIcon", value, () => {
            this.handleCancelButtonIcon();
        });
    }
    get cancelButtonIcon() {
        return this._ch5Properties.get("cancelButtonIcon");
    }
    set cancelButtonStyle(value) {
        this._ch5Properties.set("cancelButtonStyle", value, () => {
            this.handleCancelButtonStyle();
        });
    }
    get cancelButtonStyle() {
        return this._ch5Properties.get("cancelButtonStyle");
    }
    set prompt(value) {
        const trValue = this._getTranslatedValue('prompt', value);
        this._ch5Properties.set("prompt", trValue, () => {
            this.handlePrompt(trValue);
        });
    }
    get prompt() {
        return this._ch5Properties.get("prompt");
    }
    set promptIcon(value) {
        this._ch5Properties.set("promptIcon", value, () => {
            this.handlePromptIcon(value);
        });
    }
    get promptIcon() {
        return this._ch5Properties.get("promptIcon");
    }
    set sendEventOnOk(value) {
        this._ch5Properties.set("sendEventOnOk", value, () => {
            this._elBtnOk.setAttribute('sendEventOnClick', value);
        });
    }
    get sendEventOnOk() {
        return this._ch5Properties.get('sendEventOnOk');
    }
    set sendEventOnCancel(value) {
        this._ch5Properties.set("sendEventOnCancel", value, () => {
            this._elBtnCancel.setAttribute('sendEventOnClick', value);
        });
    }
    get sendEventOnCancel() {
        return this._ch5Properties.get('sendEventOnCancel');
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-modal-dialog';
        this._elMask = {};
        this._elHeader = {};
        this._elPrompt = {};
        this._elPromptIcon = {};
        this._elPromptText = {};
        this._elFooter = {};
        this._elBtnOk = {};
        this._elBtnCancel = {};
        this._crModalWasInstatiated = false;
        this.info('Ch5ModalDialog.constructor()');
        this._listOfAllPossibleComponentCssClasses = this.generateListOfAllPossibleComponentCssClasses();
        this._ch5Properties = new Ch5Properties(this, Ch5ModalDialog.COMPONENT_PROPERTIES);
        if (!this._crModalWasInstatiated) {
            this._rebindEventCallbacks();
            this.createInternalHtml();
        }
        this._crModalWasInstatiated = true;
        this.updateCssClasses();
        this._okEvent = new CustomEvent('ok', {
            bubbles: true,
            cancelable: false
        });
        this._cancelEvent = new CustomEvent('cancel', {
            bubbles: true,
            cancelable: false
        });
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5ModalDialog.ELEMENT_NAME, Ch5ModalDialog.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function") {
            window.customElements.define(Ch5ModalDialog.ELEMENT_NAME, Ch5ModalDialog);
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        if (!this._elBtnCancel) {
            return;
        }
        if (!this._elBtnOk) {
            return;
        }
        if (!this.hideOkButton) {
            this._elBtnOk.addEventListener('click', this._onOkClick);
        }
        if (!this.hideCancelButton) {
            this._elBtnCancel.addEventListener('click', this._onCancelClick);
        }
        this._elMask.addEventListener('click', this._clickedOnMask);
    }
    removeEventListeners() {
        super.removeEventListeners();
        if (this._elBtnOk.childNodes !== undefined) {
            this._elBtnOk.removeEventListener('click', this._onOkClick);
        }
        if (this._elBtnCancel.childNodes !== undefined) {
            this._elBtnCancel.removeEventListener('click', this._onCancelClick);
        }
        this._elMask.removeEventListener('click', this._clickedOnMask);
    }
    _rebindEventCallbacks() {
        super._rebindEventCallbacks();
        this._onOkClick = this._onOkClick.bind(this);
        this._onCancelClick = this._onCancelClick.bind(this);
        this._clickedOnMask = this._clickedOnMask.bind(this);
    }
    _onOkClick(inEvent) {
        this.info('_onOkClick()');
        this.dispatchEvent(this._okEvent);
        this.setShowBasedOnAttributes();
    }
    _onCancelClick(inEvent) {
        this.info('_onCancelClick()');
        this.dispatchEvent(this._cancelEvent);
        this.setShowBasedOnAttributes();
    }
    _parseSizeAttr(value) {
        let retVal = value.trim().toLowerCase();
        if (retVal.indexOf('px') === -1) {
            retVal += 'px';
        }
        return retVal;
    }
    _clickedOnMask(inEvent) {
        this.info('_clickedOnMask()');
        if (true === this.mask && true === this.dismissable) {
            this.setShowBasedOnAttributes();
        }
        inEvent.stopPropagation();
        return false;
    }
    _checkAndAttachMaskIfNeeded() {
        if (true === this.mask
            && this._elMask.parentElement !== this
            && this._elContainer.parentElement === this) {
            this.insertBefore(this._elMask, this._elContainer);
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    connectedCallback() {
        this.info('ch5-modal connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5ModalDialog);
        }
        if (!this.hasAttribute('show')) {
            this.setShowBasedOnAttributes();
        }
        this.initializeButton();
        this._ready.then(() => {
            this._initialize();
            this.initCommonMutationObserver(this);
        });
        this.attachEventListeners();
    }
    disconnectedCallback() {
        this.info('ch5-modal disconnectedCallback()');
        super.disconnectedCallback();
        this.disconnectCommonMutationObserver();
        this.removeEventListeners();
    }
    setShowBasedOnAttributes() {
        this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, false, true);
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5ModalDialog.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ModalDialog.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5ModalDialog.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    _initialize() {
        this.info('ch5-modal _initialize()');
        const existingModal = this.querySelector(`.${this.primaryCssClass}`);
        if (!existingModal) {
            while (this.childNodes.length) {
                this._elContents.appendChild(this.childNodes[0]);
            }
            this.appendChild(this._elContainer);
            this.adjustInternalHtmlStructure();
            this.cacheComponentChildrens();
        }
        this.initAttributes();
        this._checkAndAttachMaskIfNeeded();
        this.updateCssClasses();
    }
    updateSwipeGesture() {
        if (this._elBtnCancel) {
            this._elBtnCancel.setAttribute('sendEventOnClick', String(this.swipeGestureEnabled));
        }
        if (this._elBtnOk) {
            this._elBtnOk.setAttribute('sendEventOnClick', String(this.swipeGestureEnabled));
        }
    }
    initializeButton() {
        if (!this.hideOkButton && this._elBtnOk.childNodes === undefined) {
            this._elBtnOk = new Ch5Button();
            this._elBtnOk.classList.add(this.primaryCssClass + '-btn-ok');
            this._elBtnOk.setAttribute('type', 'success');
            this._elBtnOk.setAttribute('label', this.okButtonLabel);
            this._elFooter.append(this._elBtnOk);
        }
        if (!this.hideCancelButton && this._elBtnCancel.childNodes === undefined) {
            this._elBtnCancel = new Ch5Button();
            this._elBtnCancel.classList.add(this.primaryCssClass + '-btn-cancel');
            this._elBtnCancel.setAttribute('type', 'warning');
            this._elBtnCancel.setAttribute('label', this.cancelButtonLabel);
            this._elFooter.append(this._elBtnCancel);
        }
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5ModalDialog.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ModalDialog.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ModalDialog.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ModalDialog.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    generateListOfAllPossibleComponentCssClasses() {
        return super.generateListOfAllPossibleComponentCssClasses();
    }
    updateCssClasses() {
        super.updateCssClasses();
        this.info('called updateCssClasses()');
        const setOfCssClassesToBeApplied = new Set();
        setOfCssClassesToBeApplied.add(this.primaryCssClass);
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--overflow-' + this.overflow);
        setOfCssClassesToBeApplied.add(this.primaryCssClass + '--stretch-' + this.stretch);
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (typeof targetEl.classList !== 'undefined') {
            this._listOfAllPossibleComponentCssClasses.forEach((cssClass) => {
                if (setOfCssClassesToBeApplied.has(cssClass)) {
                    targetEl.classList.add(cssClass);
                    this.info('add CSS class', cssClass);
                }
                else {
                    targetEl.classList.remove(cssClass);
                    this.info('remove CSS class', cssClass);
                }
            });
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-modal-dialog-prasaanth attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5ModalDialog.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    handleMask() {
        if (this.mask === true) {
            this._elMask.classList.add(this.primaryCssClass + '-mask-default-style');
        }
        else {
            this._elMask.remove();
        }
        this._checkAndAttachMaskIfNeeded();
    }
    handleMaskStyle() {
        this._elMask.style.cssText = this.maskStyle;
    }
    handleWidth() {
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (targetEl) {
            targetEl.style.width = this._parseSizeAttr(this.width);
        }
    }
    handleHeight() {
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        if (targetEl) {
            targetEl.style.height = this._parseSizeAttr(this.height);
        }
    }
    handleTitle(value) {
        if (this._elHeader instanceof HTMLElement) {
            this._elHeader.textContent = value;
        }
    }
    updateChangeInStretch(prevValue) {
        const targetEl = this.getTargetElementForCssClassesAndStyle();
        targetEl.classList.remove(this.primaryCssClass + '--stretch-' + prevValue);
        targetEl.classList.add(this.primaryCssClass + '--stretch-' + this.stretch);
    }
    handleOkButtonLabel(trValue) {
        this._elBtnOk.setAttribute('label', trValue);
    }
    handleOkButtonIcon() {
        this._elBtnOk.setAttribute('iconClass', this.okButtonIcon);
    }
    handleOkButtonStyle() {
        this._elBtnOk.setAttribute('customStyle', this.okButtonStyle);
    }
    handleCancelButtonLabel(trValue) {
        if (this._elBtnCancel instanceof HTMLElement) {
            this._elBtnCancel.setAttribute('label', trValue);
        }
    }
    handleCancelButtonIcon() {
        this._elBtnCancel.setAttribute('iconClass', this.cancelButtonIcon);
    }
    handleCancelButtonStyle() {
        this._elBtnCancel.setAttribute('customStyle', this.cancelButtonStyle);
    }
    handlePrompt(trValue) {
        if (this._elPromptText instanceof HTMLElement) {
            this._elPromptText.textContent = trValue;
        }
    }
    handlePromptIcon(value) {
        if (this._elPromptIcon instanceof HTMLElement) {
            this._elPromptIcon.setAttribute('src', value);
        }
    }
    createInternalHtml() {
        const existingModal = this.querySelector(`.${this.primaryCssClass}`);
        if (!existingModal) {
            this.info('ch5-modal-dialog create internal Html');
            this._elContainer = document.createElement('div');
            this._elCloseIconBtn = document.createElement('button');
            this._elCloseIconBtn.setAttribute('type', 'button');
            this._elCloseIconBtn.classList.add(this.primaryCssClass + '-close-icon-btn');
            this._elCloseIconBtn.setAttribute('aria-label', 'Close');
            this._elCloseIcon = document.createElement('span');
            this._elCloseIcon.setAttribute('aria-hidden', 'true');
            this._elCloseIcon.classList.add(this.primaryCssClass + '-close-icon');
            this._elCloseIcon.classList.add(this.primaryCssClass + '-default-close-icon');
            this._elCloseIconBtn.appendChild(this._elCloseIcon);
            this._elHeader = document.createElement('div');
            this._elHeader.classList.add(this.primaryCssClass + '-header');
            this._elPrompt = document.createElement('div');
            this._elPrompt.classList.add(this.primaryCssClass + '-prompt');
            this._elPromptIcon = document.createElement('img');
            this._elPromptIcon.classList.add(this.primaryCssClass + '-prompt-icon');
            this._elPromptText = document.createElement('span');
            this._elPromptText.classList.add(this.primaryCssClass + '-prompt-text');
            this._elFooter = document.createElement('div');
            this._elFooter.classList.add(this.primaryCssClass + '-footer');
            this._elContents = document.createElement('div');
            this._elContents.classList.add(this.primaryCssClass + '-contents');
            this._elContainer.classList.add(this.primaryCssClass);
            this._elContainer.setAttribute('data-ch5-id', this.getCrId());
            this._elMask = document.createElement('div');
            this._elMask.classList.add(this.primaryCssClass + '-mask');
            this._elMask.classList.add(this.primaryCssClass + '-mask-default-style');
            this._elMask.setAttribute('cr-id', this.getCrId() + '-mask');
        }
        else {
            this._elCloseIconBtn = this.querySelector(`.${this.primaryCssClass}-close-icon-btn`);
            this._elCloseIcon = this.querySelector(`.${this.primaryCssClass}-close-icon`);
            this._elHeader = this.querySelector(`.${this.primaryCssClass}-header`);
            this._elPrompt = this.querySelector(`.${this.primaryCssClass}-prompt`);
            this._elPromptIcon = this.querySelector(`.${this.primaryCssClass}-prompt-icon`);
            this._elPromptText = this.querySelector(`.${this.primaryCssClass}-prompt-text`);
            this._elFooter = this.querySelector(`.${this.primaryCssClass}-footer`);
            this._elBtnOk = this.querySelector(`.${this.primaryCssClass}-btn-ok`);
            this._elBtnCancel = this.querySelector(`.${this.primaryCssClass}-btn-cancel`);
            this._elContents = this.querySelector(`.${this.primaryCssClass}-contents`);
            this._elContainer = existingModal;
            this._elMask = this.querySelector(`.${this.primaryCssClass}-mask`);
        }
    }
    adjustInternalHtmlStructure() {
        const docFrag = document.createDocumentFragment();
        if (this.closable) {
            docFrag.appendChild(this._elCloseIconBtn);
        }
        else {
            this._elCloseIconBtn.remove();
        }
        if (this.title !== '') {
            this._elHeader.textContent = this.title;
            docFrag.appendChild(this._elHeader);
        }
        else if (this._elHeader) {
            this._elHeader.remove();
        }
        if (this.prompt !== '' || this.promptIcon !== '') {
            if (this.promptIcon !== '') {
                this._elPromptIcon.setAttribute('src', this.promptIcon);
                this._elPrompt.appendChild(this._elPromptIcon);
            }
            else if (this._elPromptIcon) {
                this._elPromptIcon.remove();
            }
            if (this.prompt !== '' && this._elPromptText instanceof Node) {
                this._elPromptText.textContent = this.prompt;
                this._elPrompt.appendChild(this._elPromptText);
                if (this._elPromptIcon instanceof Node) {
                    this._elPrompt.insertBefore(this._elPromptIcon, this._elPromptText);
                }
            }
            else if (this._elPromptText instanceof Node) {
                this._elPromptText.remove();
            }
            docFrag.appendChild(this._elPrompt);
        }
        else if (this._elPrompt) {
            this._elPrompt.remove();
        }
        docFrag.appendChild(this._elContents);
        if (!this.hideOkButton || !this.hideCancelButton) {
            this.initializeButton();
            if (!this.hideOkButton) {
                this._elFooter.appendChild(this._elBtnOk);
            }
            else if (this.hideOkButton && this._elBtnOk.childNodes !== undefined) {
                this._elBtnOk.remove();
            }
            if (!this.hideCancelButton) {
                this._elFooter.appendChild(this._elBtnCancel);
            }
            else if (this.hideCancelButton && this._elBtnCancel.childNodes !== undefined) {
                this._elBtnCancel.remove();
            }
            docFrag.appendChild(this._elFooter);
        }
        else if (this._elFooter) {
            this._elFooter.remove();
        }
        this._elContainer.appendChild(docFrag);
    }
}
Ch5ModalDialog.COMPONENT_DATA = {
    STRETCH: {
        default: Ch5OverlayPanel.STRETCHES[0],
        values: Ch5OverlayPanel.STRETCHES,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '--stretch-'
    },
    OVERFLOWS: {
        default: Ch5OverlayPanel.OVERFLOWS[0],
        values: Ch5OverlayPanel.OVERFLOWS,
        key: 'overflow',
        attribute: 'overflow',
        classListPrefix: '--overflow-'
    }
};
Ch5ModalDialog.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendsignalonbeforeshow: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonaftershow: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonbeforehide: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonafterhide: { direction: "event", booleanJoin: 1, contractName: true }, sendsignalonok: { direction: "event", booleanJoin: 1, contractName: true }, sendsignaloncancel: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5ModalDialog.COMPONENT_PROPERTIES = [
    {
        default: true,
        name: "dismissable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "closable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        name: "closeIcon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "mask",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        name: "maskStyle",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5OverlayPanel.STRETCHES,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: Ch5OverlayPanel.OVERFLOWS[0],
        enumeratedValues: Ch5OverlayPanel.OVERFLOWS,
        name: "overflow",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5OverlayPanel.OVERFLOWS[0],
        isObservableProperty: true
    },
    {
        default: "",
        name: "width",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "height",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "title",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "hideOkButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "Ok",
        name: "okButtonLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "Ok",
        isObservableProperty: true
    },
    {
        default: "",
        name: "okButtonIcon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "okButtonStyle",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "hideCancelButton",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "Cancel",
        name: "cancelButtonLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "Cancel",
        isObservableProperty: true
    },
    {
        default: "",
        name: "cancelButtonIcon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "cancelButtonStyle",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "prompt",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "promptIcon",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBeforeShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnAfterShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnBeforeHide",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnAfterHide",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnOk",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnCancel",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    }
];
Ch5ModalDialog.ELEMENT_NAME = 'ch5-modal-dialog';
Ch5ModalDialog.registerCustomElement();
Ch5ModalDialog.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LW1vZGFsLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1tb2RhbC1kaWFsb2cvY2g1LW1vZGFsLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxHQUFHLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuSSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSTNELE1BQU0sT0FBTyxjQUFlLFNBQVEsZUFBZTtJQWtUbEQsSUFBVyxLQUFLLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQVcsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFXLE1BQU07UUFDaEIsT0FBTyxJQUFJ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