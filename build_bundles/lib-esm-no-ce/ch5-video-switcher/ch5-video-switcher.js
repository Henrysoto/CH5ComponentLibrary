import { DragDropTouch } from "./drag-drop-touch";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import _ from "lodash";
import { Ch5AugmentVarSignalsNames } from "../ch5-common/ch5-augment-var-signals-names";
export class Ch5VideoSwitcher extends Ch5Common {
    set sourceListPosition(value) {
        this._ch5Properties.set("sourceListPosition", value, () => {
            this.handleSourceListPosition();
        });
    }
    get sourceListPosition() {
        return this._ch5Properties.get("sourceListPosition");
    }
    set endless(value) {
        this._ch5Properties.set("endless", value, () => {
            this.handleEndless();
        });
    }
    get endless() {
        return this._ch5Properties.get("endless");
    }
    set numberOfSourceListDivisions(value) {
        this._ch5Properties.set("numberOfSourceListDivisions", value, () => {
            this.handleNumberOfSourceListDivisions();
        });
    }
    get numberOfSourceListDivisions() {
        return this._ch5Properties.get("numberOfSourceListDivisions");
    }
    set scrollbar(value) {
        this._ch5Properties.set("scrollbar", value, () => {
            this.handleScrollbar();
        });
    }
    get scrollbar() {
        return this._ch5Properties.get("scrollbar");
    }
    set numberOfSources(value) {
        this._ch5Properties.set("numberOfSources", value, () => {
            this.createSource();
        });
    }
    get numberOfSources() {
        return this._ch5Properties.get("numberOfSources");
    }
    set numberOfScreenColumns(value) {
        this._ch5Properties.set("numberOfScreenColumns", value, () => {
            this.handleNumberOfScreenColumns();
        });
    }
    get numberOfScreenColumns() {
        return this._ch5Properties.get("numberOfScreenColumns");
    }
    set indexId(value) {
        this._ch5Properties.set("indexId", value);
    }
    get indexId() {
        return this._ch5Properties.get("indexId");
    }
    set displayScreenLabel(value) {
        this._ch5Properties.set("displayScreenLabel", value, () => {
            this.handleDisplayScreenLabel();
        });
    }
    get displayScreenLabel() {
        return this._ch5Properties.get("displayScreenLabel");
    }
    set screenAspectRatio(value) {
        this._ch5Properties.set("screenAspectRatio", value, () => {
            this.handleScreenAspectRatio();
        });
    }
    get screenAspectRatio() {
        return this._ch5Properties.get("screenAspectRatio");
    }
    set numberOfScreens(value) {
        this._ch5Properties.set("numberOfScreens", value, () => {
            this.createScreen();
        });
    }
    get numberOfScreens() {
        return this._ch5Properties.get("numberOfScreens");
    }
    set sourceIconClass(value) {
        this._ch5Properties.set("sourceIconClass", value, () => {
            this.createSource();
        });
    }
    get sourceIconClass() {
        return this._ch5Properties.get("sourceIconClass");
    }
    set sourceIconUrl(value) {
        this._ch5Properties.set("sourceIconUrl", value, () => {
            this.createSource();
        });
    }
    get sourceIconUrl() {
        return this._ch5Properties.get("sourceIconUrl");
    }
    set sendEventOnDrop(value) {
        this._ch5Properties.set("sendEventOnDrop", value);
    }
    get sendEventOnDrop() {
        return this._ch5Properties.get('sendEventOnDrop');
    }
    set sendEventOnChange(value) {
        this._ch5Properties.set("sendEventOnChange", value);
    }
    get sendEventOnChange() {
        return this._ch5Properties.get('sendEventOnChange');
    }
    set receiveStateSourceChanged(value) {
        this._ch5Properties.set("receiveStateSourceChanged", value, () => {
            this.handleReceiveStateSourceChanged();
        });
    }
    get receiveStateSourceChanged() {
        return this._ch5Properties.get('receiveStateSourceChanged');
    }
    set receiveStateSourceLabel(value) {
        this._ch5Properties.set("receiveStateSourceLabel", value, () => {
            this.handleSourceLabel();
        });
    }
    get receiveStateSourceLabel() {
        return this._ch5Properties.get('receiveStateSourceLabel');
    }
    set receiveStateScriptSourceLabelHtml(value) {
        this._ch5Properties.set("receiveStateScriptSourceLabelHtml", value, () => {
            this.handleSourceLabel();
        });
    }
    get receiveStateScriptSourceLabelHtml() {
        return this._ch5Properties.get('receiveStateScriptSourceLabelHtml');
    }
    set receiveStateScreenLabel(value) {
        this._ch5Properties.set("receiveStateScreenLabel", value, () => {
            this.handleScreenLabel();
        });
    }
    get receiveStateScreenLabel() {
        return this._ch5Properties.get('receiveStateScreenLabel');
    }
    set receiveStateScriptScreenLabelHtml(value) {
        this._ch5Properties.set("receiveStateScriptScreenLabelHtml", value, () => {
            this.handleScreenLabel();
        });
    }
    get receiveStateScriptScreenLabelHtml() {
        return this._ch5Properties.get('receiveStateScriptScreenLabelHtml');
    }
    set receiveStateNumberOfScreens(value) {
        this._ch5Properties.set("receiveStateNumberOfScreens", value, null, (newValue) => {
            this.debounceNumberOfItems(newValue);
        });
    }
    get receiveStateNumberOfScreens() {
        return this._ch5Properties.get('receiveStateNumberOfScreens');
    }
    set contractName(value) {
        this._ch5Properties.set("contractName", value, () => {
            this.handleContractName();
        });
    }
    get contractName() {
        return this._ch5Properties.get("contractName");
    }
    set useContractForEnable(value) {
        this._ch5Properties.set("useContractForEnable", value, () => {
            this.contractDefaultHelper();
        });
    }
    get useContractForEnable() {
        return this._ch5Properties.get("useContractForEnable");
    }
    set useContractForShow(value) {
        this._ch5Properties.set("useContractForShow", value, () => {
            this.contractDefaultHelper();
        });
    }
    get useContractForShow() {
        return this._ch5Properties.get("useContractForShow");
    }
    set contractSourceLabelType(value) {
        this._ch5Properties.set("contractSourceLabelType", value, () => {
            this.contractDefaultHelper();
        });
    }
    get contractSourceLabelType() {
        return this._ch5Properties.get("contractSourceLabelType");
    }
    set contractScreenLabelType(value) {
        this._ch5Properties.set("contractScreenLabelType", value, () => {
            this.contractDefaultHelper();
        });
    }
    get contractScreenLabelType() {
        return this._ch5Properties.get("contractScreenLabelType");
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5VideoSwitcher.ELEMENT_NAME, Ch5VideoSwitcher.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5VideoSwitcher.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5VideoSwitcher.ELEMENT_NAME, Ch5VideoSwitcher);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-video-switcher';
        this.sourceListCssClass = '--source-list';
        this.screenListCssClass = '--screen-list';
        this.screenListParentCssClass = '--screen-list-parent';
        this._elContainer = {};
        this._sourceListContainer = {};
        this._screenListParentContainer = {};
        this._screenListContainer = {};
        this._scrollbarContainer = {};
        this._scrollbar = {};
        this.isDown = false;
        this.startX = 0;
        this.startY = 0;
        this.scrollListLeft = 0;
        this.scrollListTop = 0;
        this.scrollbarDimension = 0;
        this.signalHolder = [];
        this.numberOfScreenBackup = 1;
        this.signalHolderForSourceLabel = {
            receiveStateScriptSourceLabelHtml: [],
            receiveStateSourceLabel: [],
        };
        this.signalHolderForScreenLabel = {
            receiveStateScriptScreenLabelHtml: [],
            receiveStateScreenLabel: [],
        };
        this.signalNameOnContract = {
            contractName: "",
            receiveStateEnable: "",
            receiveStateShow: "",
            receiveStateNumberOfScreens: ""
        };
        this.validDrop = false;
        this.resizeObserver = null;
        this.debounceNumberOfItems = this.debounce((newValue) => {
            this.setNumberOfItems(newValue);
        }, 150);
        this.handleMouseDown = this.debounce((e) => {
            this.isDown = true;
            this._sourceListContainer.classList.add('active');
            this.startX = e.pageX - this._sourceListContainer.offsetLeft;
            this.startY = e.pageY - this._sourceListContainer.offsetTop;
            this.scrollListLeft = this._sourceListContainer.scrollLeft;
            this.scrollListTop = this._sourceListContainer.scrollTop;
        }, 10);
        this.handleMouseUpAndLeave = this.debounce(() => {
            this.isDown = false;
            this._sourceListContainer.classList.remove('active');
        }, 10);
        this.handleMouseMove = this.debounce((e) => {
            if (!this.isDown)
                return;
            e.preventDefault();
            const x = e.pageX - this._sourceListContainer.offsetLeft;
            const y = e.pageY - this._sourceListContainer.offsetTop;
            const walkX = (x - this.startX) * (this.endless ? 1 : 3);
            const walkY = (y - this.startY) * (this.endless ? 1 : 3);
            this._sourceListContainer.scrollLeft = this.scrollListLeft - walkX;
            this._sourceListContainer.scrollTop = this.scrollListTop - walkY;
        }, 10);
        this.handleScrollEvent = this.debounce(() => {
            const draggedElement = this.querySelector(".dragging");
            if (!draggedElement) {
                this.initScrollbar();
                if (this.endless) {
                    return this.endlessHelper();
                }
            }
        }, 10);
        this.resizeObserverHandler = () => {
            if (this._elContainer.getBoundingClientRect().width === 0) {
                return;
            }
            this.handleNumberOfScreenColumns();
            this.handleResizeComponent();
        };
        DragDropTouch.getInstance();
        this.logger.start('constructor()', Ch5VideoSwitcher.ELEMENT_NAME);
        this.ignoreAttributes = ["receivestatecustomclass", "receivestatecustomstyle", "sendeventonshow",];
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5VideoSwitcher.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5VideoSwitcher.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcher.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5VideoSwitcher.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-video-switcher attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            if (attr.toLowerCase() === 'receivestatenumberofscreens' && this.contractName !== '' && newValue.startsWith(this.contractName) === false) {
                return;
            }
            const attributeChangedProperty = Ch5VideoSwitcher.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5VideoSwitcher.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5VideoSwitcher);
        }
        this.checkInternalHTML();
        this.attachEventListeners();
        const sourceChild = this.getElementsByTagName(this.nodeName.toLowerCase() + "-source");
        Array.from(sourceChild).forEach((element, index) => {
            element.setAttribute('id', this.getCrId() + '-source-' + index);
            const labelEle = element.getElementsByTagName(this.nodeName.toLowerCase() + "-source-label");
            if (labelEle.length !== 0) {
                labelEle[0].setAttribute('id', this.getCrId() + '-source-label-' + index);
            }
        });
        const screenChild = this.getElementsByTagName(this.nodeName.toLowerCase() + "-screen");
        Array.from(screenChild).forEach((element, index) => {
            element.setAttribute('id', this.getCrId() + '-screen-' + index);
            const labelEle = element.getElementsByTagName(this.nodeName.toLowerCase() + "-screen-label");
            if (labelEle.length !== 0) {
                labelEle[0].setAttribute('id', this.getCrId() + '-screen-label-' + index);
            }
        });
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.createSource();
        this.createScreen();
        customElements.whenDefined('ch5-video-switcher').then(() => {
            this.componentLoadedEvent(Ch5VideoSwitcher.ELEMENT_NAME, this.id);
            this.createSource();
            this.createScreen();
        });
        this.logger.stop();
    }
    contractDefaultHelper() {
        if (this.contractName !== "" && this.contractName !== null && this.contractName !== undefined) {
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = this.contractName + '.Enable';
            }
            else {
                this.receiveStateEnable = this.signalNameOnContract.receiveStateEnable;
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = this.contractName + '.Visible';
            }
            else {
                this.receiveStateShow = this.signalNameOnContract.receiveStateShow;
            }
            this.receiveStateNumberOfScreens = this.contractName + '.NumberOfScreens';
        }
        this.handleSourceLabel();
        this.handleScreenLabel();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
        this.clearSubscriptions();
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._sourceListContainer = document.createElement('div');
        this._screenListParentContainer = document.createElement('div');
        this._screenListContainer = document.createElement('div');
        this._scrollbarContainer = document.createElement('div');
        this._scrollbar = document.createElement('div');
        this._screenListParentContainer.classList.add(this.primaryCssClass + this.screenListParentCssClass);
        this._screenListContainer.classList.add(this.primaryCssClass + this.screenListCssClass);
        this._sourceListContainer.classList.add(this.primaryCssClass + this.sourceListCssClass);
        this._screenListParentContainer.appendChild(this._screenListContainer);
        this._elContainer.appendChild(this._sourceListContainer);
        this._elContainer.appendChild(this._screenListParentContainer);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5VideoSwitcher.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5VideoSwitcher.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5VideoSwitcher.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5VideoSwitcher.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._sourceListContainer.addEventListener('mousedown', this.handleMouseDown);
        this._sourceListContainer.addEventListener('mouseleave', this.handleMouseUpAndLeave);
        this._sourceListContainer.addEventListener('mouseup', this.handleMouseUpAndLeave);
        this._sourceListContainer.addEventListener('mousemove', this.handleMouseMove);
        this._sourceListContainer.addEventListener('scroll', this.handleScrollEvent);
        this.resizeObserver = new ResizeObserver(this.resizeObserverHandler);
        this.resizeObserver.observe(this._elContainer);
    }
    removeEventListeners() {
        var _a;
        super.removeEventListeners();
        this._sourceListContainer.removeEventListener('mouseleave', this.handleMouseUpAndLeave);
        this._sourceListContainer.removeEventListener('mouseup', this.handleMouseUpAndLeave);
        this._sourceListContainer.removeEventListener('mousedown', this.handleMouseDown);
        this._sourceListContainer.removeEventListener('mousemove', this.handleMouseMove);
        this._sourceListContainer.removeEventListener('scroll', this.handleScrollEvent);
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this._elContainer);
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
    checkInternalHTML() {
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-video-switcher');
            this.appendChild(this._elContainer);
        }
        if (this._scrollbar.parentElement !== this._scrollbarContainer) {
            this._scrollbar.classList.add('scrollbar');
            this._scrollbarContainer.appendChild(this._scrollbar);
        }
        if (this._scrollbarContainer.parentElement !== this._elContainer) {
            this._scrollbarContainer.classList.add('scrollbar-container');
            this._elContainer.appendChild(this._scrollbarContainer);
        }
    }
    handleSourceListPosition() {
        Array.from(Ch5VideoSwitcher.COMPONENT_DATA.SOURCE_LIST_POSITION.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SOURCE_LIST_POSITION.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SOURCE_LIST_POSITION.classListPrefix + this.sourceListPosition);
        this.initScrollbar();
        this.handleNumberOfScreenColumns();
    }
    handleEndless() {
        if (this.endless) {
            this.endless = this.numberOfSourceListDivisions === 1;
        }
        if (this.endless && this.scrollbar === true) {
            this.scrollbar = false;
        }
    }
    handleNumberOfSourceListDivisions() {
        this._sourceListContainer.style.setProperty('--number-of-source-list-divisions', this.numberOfSourceListDivisions + '');
        this.initScrollbar();
    }
    handleScrollbar() {
        if (this.endless === true && this.scrollbar === true) {
            this.scrollbar = false;
        }
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + bool.toString());
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this.initScrollbar();
    }
    handleDisplayScreenLabel() {
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.DISPLAY_SCREEN_LABEL + bool.toString());
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.DISPLAY_SCREEN_LABEL + this.displayScreenLabel);
    }
    handleScreenAspectRatio() {
        Array.from(Ch5VideoSwitcher.COMPONENT_DATA.SCREEN_ASPECT_RATIO.values).forEach((e) => {
            this._screenListContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SCREEN_ASPECT_RATIO.classListPrefix + e.replace(':', '-'));
        });
        this._screenListContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SCREEN_ASPECT_RATIO.classListPrefix + this.screenAspectRatio.replace(':', '-'));
        this.handleNumberOfScreenColumns();
    }
    handleSendEventOnDrop(signalName, value) {
        var _a, _b;
        if (this.contractName) {
            signalName = this.contractName + '.Source' + ((+signalName) + 1) + '_Selection';
            (_a = Ch5SignalFactory.getInstance().getNumberSignal(signalName)) === null || _a === void 0 ? void 0 : _a.publish((+value + 1));
        }
        else {
            if (this.sendEventOnDrop) {
                const sigName = this.getSignalName(this.sendEventOnDrop, +signalName);
                (_b = Ch5SignalFactory.getInstance().getNumberSignal(sigName)) === null || _b === void 0 ? void 0 : _b.publish((+value + 1));
            }
        }
    }
    handleSendEventOnChange(signalName) {
        var _a, _b, _c, _d;
        if (this.contractName) {
            signalName = this.contractName + '.Screen_' + ((+signalName) + 1) + '_Changed';
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(signalName)) === null || _a === void 0 ? void 0 : _a.publish(true);
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(signalName)) === null || _b === void 0 ? void 0 : _b.publish(false);
        }
        else if (this.sendEventOnChange) {
            const sigName = this.getSignalName(this.sendEventOnChange, +signalName);
            (_c = Ch5SignalFactory.getInstance().getBooleanSignal(sigName)) === null || _c === void 0 ? void 0 : _c.publish(true);
            (_d = Ch5SignalFactory.getInstance().getBooleanSignal(sigName)) === null || _d === void 0 ? void 0 : _d.publish(false);
        }
    }
    handleReceiveStateSourceChanged() {
        this.signalHolder.forEach((obj) => {
            this.clearOldSubscriptionNumber(obj.signalValue, obj.signalState);
        });
        for (let i = 0; i < this.numberOfScreens; i++) {
            const screen = this.contractName ? this.contractName + `.Source${i + 1}_Feedback` : this.getSignalName(this.receiveStateSourceChanged, i);
            this.signalHolder.push({ signalState: "", signalValue: screen, value: null });
            if (screen) {
                const screenSignalResponse = this.setSignalByNumber(screen);
                if (!_.isNil(screenSignalResponse)) {
                    this.signalHolder[i].signalState = screenSignalResponse.subscribe((newValue) => {
                        if (this.signalHolder[i])
                            this.signalHolder[i].value = newValue;
                        this.addSourceToScreenOnFB(i, newValue);
                    });
                }
            }
        }
    }
    getSignalName(attr, index) {
        var _a;
        const indexId = ((_a = this.getAttribute('indexid')) === null || _a === void 0 ? void 0 : _a.trim()) + '' || this.indexId;
        if (attr.includes(`{{${indexId}}}`) === false) {
            return attr;
        }
        else {
            const screen = this.replaceAll(attr, `{{${indexId}}}`, '');
            const isNumber = /^[0-9]+$/.test(screen);
            if (isNumber) {
                return (+screen + index) + '';
            }
            else {
                return this.replaceAll(attr, `{{${indexId}}}`, index + '');
            }
        }
    }
    clearOldSubscriptionNumber(signalValue, signalState) {
        const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldReceiveStateSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(signalState);
        }
    }
    clearOldSubscriptionString(signalValue, signalState) {
        const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldReceiveStateSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(signalState);
        }
    }
    setSignalByNumber(value) {
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(value);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    setSignalByString(value) {
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(value);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    handleSourceLabel() {
        Object.keys(this.signalHolderForSourceLabel).forEach((key) => {
            this.signalHolderForSourceLabel[key].forEach((item) => {
                this.clearOldSubscriptionString(item.signalValue, item.signalState);
            });
            this.signalHolderForSourceLabel[key] = [];
        });
        for (let i = 0; i < this.numberOfSources; i++) {
            if (this.contractName && this.contractSourceLabelType === 'innerHTML') {
                const sigValue = this.contractName + `.Source_${i + 1}_Label`;
                this.getSubscription(this.signalHolderForSourceLabel['receiveStateScriptSourceLabelHtml'], this.sourcelabelHelper, i, sigValue, true);
            }
            else if (this.contractName && this.contractSourceLabelType === 'textContent') {
                const sigValue = this.contractName + `.Source_${i + 1}_Label`;
                this.getSubscription(this.signalHolderForSourceLabel['receiveStateSourceLabel'], this.sourcelabelHelper, i, sigValue);
            }
            else if (this.receiveStateScriptSourceLabelHtml) {
                const sigValue = this.getSignalName(this.receiveStateScriptSourceLabelHtml, i);
                this.getSubscription(this.signalHolderForSourceLabel['receiveStateScriptSourceLabelHtml'], this.sourcelabelHelper, i, sigValue, true);
            }
            else if (this.receiveStateSourceLabel) {
                const sigValue = this.getSignalName(this.receiveStateSourceLabel, i);
                this.getSubscription(this.signalHolderForSourceLabel['receiveStateSourceLabel'], this.sourcelabelHelper, i, sigValue);
            }
            else {
                this.sourceLabelHelperCreate(i);
            }
        }
    }
    handleScreenLabel() {
        Object.keys(this.signalHolderForScreenLabel).forEach((key) => {
            this.signalHolderForScreenLabel[key].forEach((item) => {
                this.clearOldSubscriptionString(item.signalValue, item.signalState);
            });
            this.signalHolderForScreenLabel[key] = [];
        });
        for (let i = 0; i < this.numberOfScreens; i++) {
            if (this.contractName && this.contractScreenLabelType === 'innerHTML') {
                const sigValue = this.contractName + `.Screen${i + 1}_Label`;
                this.getSubscription(this.signalHolderForScreenLabel['receiveStateScriptScreenLabelHtml'], this.screenlabelHelper, i, sigValue, true);
            }
            else if (this.contractName && this.contractScreenLabelType === 'textContent') {
                const sigValue = this.contractName + `.Screen${i + 1}_Label`;
                this.getSubscription(this.signalHolderForScreenLabel['receiveStateScreenLabel'], this.screenlabelHelper, i, sigValue);
            }
            else if (this.receiveStateScriptScreenLabelHtml) {
                const sigValue = this.getSignalName(this.receiveStateScriptScreenLabelHtml, i);
                this.getSubscription(this.signalHolderForScreenLabel['receiveStateScriptScreenLabelHtml'], this.screenlabelHelper, i, sigValue, true);
            }
            else if (this.receiveStateScreenLabel) {
                const sigValue = this.getSignalName(this.receiveStateScreenLabel, i);
                this.getSubscription(this.signalHolderForScreenLabel['receiveStateScreenLabel'], this.screenlabelHelper, i, sigValue);
            }
            else {
                this.screenLabelHelperCreate(i);
            }
        }
    }
    getSubscription(input, cb, index, sigValue, innerHTML = false) {
        input.push({ signalState: "", signalValue: sigValue, value: null });
        const strSignalResponse = this.setSignalByString(sigValue);
        if (!_.isNil(strSignalResponse)) {
            input[index].signalState = strSignalResponse.subscribe((newValue) => {
                input[index].value = newValue;
                cb.call(this, newValue, index, innerHTML);
            });
        }
    }
    sourcelabelHelper(newValue, index, isInnerHTML) {
        const spanEl = this._sourceListContainer.querySelector(`[sourceid="${index}"] > span`);
        if (spanEl) {
            isInnerHTML ? spanEl.innerHTML = newValue : spanEl.textContent = newValue;
        }
        const screenSpanEl = this._screenListContainer.querySelectorAll(`[sourceid="${index}"] > span`);
        Array.from(screenSpanEl).forEach((spanEl) => {
            isInnerHTML ? spanEl.innerHTML = newValue : spanEl.textContent = newValue;
        });
    }
    screenlabelHelper(newValue, index, isInnerHTML) {
        const spanEl = this._screenListContainer.querySelector(`[screenid="${index}"] > span`);
        if (spanEl) {
            isInnerHTML ? spanEl.innerHTML = newValue : spanEl.textContent = newValue;
        }
    }
    handleContractName() {
        if (this.contractName.length === 0) {
            this.signalNameOnContract.contractName = "";
            this.receiveStateShow = this.signalNameOnContract.receiveStateShow;
            this.receiveStateEnable = this.signalNameOnContract.receiveStateEnable;
            this.receiveStateNumberOfScreens = this.signalNameOnContract.receiveStateNumberOfScreens;
        }
        else if (this.signalNameOnContract.contractName === "") {
            this.signalNameOnContract.contractName = this.contractName;
            this.signalNameOnContract.receiveStateShow = this.receiveStateShow;
            this.signalNameOnContract.receiveStateEnable = this.receiveStateEnable;
            this.signalNameOnContract.receiveStateNumberOfScreens = this.receiveStateNumberOfScreens;
        }
        this.contractDefaultHelper();
    }
    endlessHelper() {
        const { offsetWidth, scrollLeft, scrollWidth, offsetHeight, scrollTop, scrollHeight } = this._sourceListContainer;
        const { width: sourceWidth, height: sourceHeight } = this._sourceListContainer.children[0].getBoundingClientRect();
        const isHorizontal = (this.sourceListPosition === 'top' || this.sourceListPosition === 'bottom');
        const endlessScrollable = isHorizontal ? (scrollWidth - offsetWidth) > sourceWidth : (scrollHeight - offsetHeight) > sourceHeight;
        if (endlessScrollable) {
            if (isHorizontal) {
                if (scrollLeft < sourceWidth / 4) {
                    const length = this._sourceListContainer.children.length;
                    const lastElement = this._sourceListContainer.children[length - 1];
                    this._sourceListContainer.prepend(lastElement);
                    this._sourceListContainer.scrollLeft += sourceWidth / 2;
                }
                else if (scrollLeft + offsetWidth > scrollWidth - (sourceWidth / 4)) {
                    const firstChild = this._sourceListContainer.children[0];
                    this._sourceListContainer.appendChild(firstChild);
                    this._sourceListContainer.scrollLeft -= sourceWidth / 2;
                }
            }
            else {
                if (scrollTop < sourceHeight / 4) {
                    const length = this._sourceListContainer.children.length;
                    const lastElement = this._sourceListContainer.children[length - 1];
                    this._sourceListContainer.prepend(lastElement);
                    this._sourceListContainer.scrollTop += sourceHeight / 2;
                }
                else if (scrollTop + offsetHeight > scrollHeight - (sourceHeight / 4)) {
                    const firstChild = this._sourceListContainer.children[0];
                    this._sourceListContainer.appendChild(firstChild);
                    this._sourceListContainer.scrollTop -= sourceHeight / 2;
                }
            }
        }
    }
    initScrollbar() {
        if (this.sourceListPosition === "top" || this.sourceListPosition === "bottom") {
            const { scrollWidth: scrollWidth, offsetWidth: offsetWidth, scrollLeft: scrollLeft } = this._sourceListContainer;
            this.scrollbarDimension = Math.floor(offsetWidth / scrollWidth * 100);
            const scrollbarLeft = Math.ceil(scrollLeft / scrollWidth * 100);
            this._scrollbar.style.removeProperty('height');
            this._scrollbar.style.removeProperty('top');
            this._scrollbar.style.width = this.scrollbarDimension + '%';
            this._scrollbar.style.left = scrollbarLeft + '%';
        }
        else {
            const { scrollHeight: scrollHeight, offsetHeight: offsetHeight, scrollTop: scrollTop } = this._sourceListContainer;
            this.scrollbarDimension = Math.floor(offsetHeight / scrollHeight * 100);
            const scrollbarTop = Math.ceil(scrollTop / scrollHeight * 100);
            this._scrollbar.style.removeProperty('width');
            this._scrollbar.style.removeProperty('left');
            this._scrollbar.style.height = this.scrollbarDimension + '%';
            this._scrollbar.style.top = scrollbarTop + '%';
        }
        if (this.scrollbar) {
            if (this.scrollbarDimension === 100) {
                this._elContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + 'true');
                this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + 'false');
            }
            else {
                this._elContainer.classList.remove(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + 'false');
                this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + 'true');
            }
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add(this.primaryCssClass);
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SOURCE_LIST_POSITION.classListPrefix + this.sourceListPosition);
        this._screenListContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.COMPONENT_DATA.SCREEN_ASPECT_RATIO.classListPrefix + this.screenAspectRatio.replace(':', '-'));
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this._elContainer.classList.add(this.primaryCssClass + Ch5VideoSwitcher.DISPLAY_SCREEN_LABEL + this.displayScreenLabel);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    createSource() {
        Array.from(this._sourceListContainer.querySelectorAll(".source-container")).forEach((childEle) => childEle.remove());
        for (let i = 0; i < this.numberOfSources; i++) {
            const source = document.createElement("div");
            source.setAttribute('sourceId', i + '');
            const sourceIcon = document.createElement('i');
            const label = document.createElement('span');
            source.setAttribute('draggable', 'true');
            source.classList.add('source-container');
            source.classList.add('draggable');
            sourceIcon.classList.add('source-icon');
            label.classList.add(this.primaryCssClass + this.sourceListCssClass + '-label');
            source.appendChild(sourceIcon);
            source.appendChild(label);
            this._sourceListContainer.appendChild(source);
            this.sourceLabelHelperCreate(i);
            this.sourceIconHelperCreate(i, sourceIcon);
            source.addEventListener('dragstart', this.handleDragStartSource.bind(this, i));
            source.addEventListener('dragend', this.handleDragEndSource.bind(this, i));
        }
        if (this.endless) {
            if (this.sourceListPosition === 'top' || this.sourceListPosition === 'bottom') {
                this._sourceListContainer.scrollLeft += 5;
            }
            else {
                this._sourceListContainer.scrollTop += 5;
            }
        }
        setTimeout(() => {
            this.initScrollbar();
        }, 50);
        this.handleSourceLabel();
    }
    createScreen() {
        Array.from(this._screenListContainer.querySelectorAll(".screen-container")).forEach((childEle) => childEle.remove());
        for (let i = 0; i < this.numberOfScreens; i++) {
            const screen = document.createElement("div");
            const label = document.createElement('span');
            screen.setAttribute('screenId', i + '');
            screen.appendChild(label);
            screen.classList.add('screen-container');
            label.classList.add(this.primaryCssClass + this.screenListCssClass + '-label');
            this._screenListContainer.appendChild(screen);
            this.screenLabelHelperCreate(i);
            this.screenAlignLabelHelperCreate(i, screen);
            if (this.signalHolder[i] && this.signalHolder[i].value && this.signalHolder[i].value > 0) {
                this.addSourceToScreenOnFB(i, this.signalHolder[i].value);
            }
            screen.addEventListener('dragover', this.handleDragoverScreen.bind(this, i));
            screen.addEventListener('drop', this.handleDropScreen.bind(this, i));
        }
        this.handleNumberOfScreenColumns();
        this.handleReceiveStateSourceChanged();
        this.handleScreenLabel();
    }
    handleNumberOfScreenColumns() {
        const containerHeight = (this._screenListParentContainer.offsetHeight - 10);
        const containerWidth = (this._screenListParentContainer.offsetWidth - 10);
        const possibleCol = containerWidth / 82;
        const possibleRow = containerHeight / 62;
        const minColWidth = 80;
        const minRowHieght = 60;
        let finalColNumber = 0;
        let finalRowNumber = 0;
        let setCol = true;
        let setRow = true;
        let requiredRows = 1;
        let visible_screens = 0;
        let rowHeight = 0;
        let colWidth = 0;
        this._screenListContainer.style.removeProperty('grid-template-columns');
        this._screenListContainer.style.removeProperty('grid-template-rows');
        if (this.numberOfScreenColumns > 0) {
            if (Math.floor(possibleCol) >= this.numberOfScreenColumns) {
                requiredRows = this.numberOfScreens / Math.floor(this.numberOfScreenColumns);
                finalColNumber = this.numberOfScreenColumns;
            }
            else if (Math.floor(possibleCol) >= this.numberOfScreens) {
                requiredRows = this.numberOfScreens / Math.floor(possibleCol);
                finalColNumber = Math.floor(possibleCol);
            }
            else {
                requiredRows = this.numberOfScreens / Math.floor(possibleCol);
                finalColNumber = Math.floor(possibleCol);
                setCol = false;
            }
            if (Math.floor(possibleRow) <= Math.ceil(requiredRows)) {
                visible_screens = finalColNumber * Math.floor(possibleRow);
                finalRowNumber = Math.floor(possibleRow);
            }
            else {
                visible_screens = finalColNumber * Math.ceil(requiredRows);
                finalRowNumber = Math.ceil(requiredRows);
            }
            let col = setCol ? finalColNumber : 'auto-fit';
            let row = 'repeat(' + finalRowNumber + ', minmax(' + minRowHieght + 'px, 1fr) )';
            if (setCol && (col > this.numberOfScreens + '')) {
                colWidth = (Math.floor(possibleCol) > this.numberOfScreenColumns) ? (containerWidth / this.numberOfScreenColumns) : (containerWidth / Math.floor(possibleCol));
                col = 'repeat(' + this.numberOfScreens + ',' + colWidth + 'px)';
            }
            else {
                if (this.screenAspectRatio === "16:9" || this.screenAspectRatio === "4:3") {
                    if ((Math.floor(possibleCol) >= finalColNumber) && (Math.floor(possibleRow) >= finalRowNumber)) {
                        const SW = containerWidth / finalColNumber;
                        const SH = containerHeight / finalRowNumber;
                        const reHeight = this.screenAspectRatio === '16:9' ? (SW * (9 / 16)) : (SW * (3 / 4));
                        if (SH >= reHeight) {
                            colWidth = (containerWidth / finalColNumber) - 2;
                            rowHeight = reHeight;
                        }
                        else {
                            rowHeight = this.getRowHeightColWidth(false, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                            colWidth = this.getRowHeightColWidth(true, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                        }
                    }
                    else {
                        rowHeight = this.getRowHeightColWidth(false, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                        colWidth = this.getRowHeightColWidth(true, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                    }
                    col = 'repeat(' + col + ',' + colWidth + 'px)';
                }
                else {
                    col = 'repeat(' + col + ',minmax(' + minColWidth + 'px, 1fr))';
                }
            }
            if (rowHeight > 0) {
                row = 'repeat(' + finalRowNumber + ',' + rowHeight + 'px)';
            }
            this._screenListContainer.style.setProperty('grid-template-columns', col);
            this._screenListContainer.style.setProperty('grid-template-rows', row);
        }
        else {
            requiredRows = this.numberOfScreens / Math.floor(possibleCol);
            if (this.screenAspectRatio === '16:9' || this.screenAspectRatio === '4:3') {
                if (Math.floor(possibleCol) >= this.numberOfScreens) {
                    finalColNumber = this.numberOfScreens;
                }
                else {
                    finalColNumber = Math.floor(possibleCol);
                }
            }
            if (Math.floor(possibleRow) <= Math.ceil(requiredRows)) {
                visible_screens = Math.floor(possibleRow) * Math.floor(possibleCol);
                finalRowNumber = Math.floor(possibleRow);
            }
            else if (Math.floor(possibleRow) >= Math.ceil(requiredRows)) {
                finalRowNumber = Math.ceil(requiredRows);
                visible_screens = Math.ceil(requiredRows) * Math.floor(possibleCol);
            }
            else {
                setRow = false;
            }
            let col = 'repeat(auto-fit, minmax(' + minColWidth + 'px, 1fr) )';
            let rowHeight = 0;
            if (this.screenAspectRatio === "16:9" || this.screenAspectRatio === "4:3") {
                let colWidth = 0;
                if ((Math.floor(possibleCol) >= finalColNumber) && (Math.floor(possibleRow) >= finalRowNumber)) {
                    const SW = containerWidth / finalColNumber;
                    const SH = containerHeight / finalRowNumber;
                    const reHeight = this.screenAspectRatio === '16:9' ? (SW * (9 / 16)) : (SW * (3 / 4));
                    if (SH >= reHeight) {
                        colWidth = (containerWidth / finalColNumber) - 2;
                        rowHeight = reHeight;
                    }
                    else {
                        rowHeight = this.getRowHeightColWidth(false, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                        colWidth = this.getRowHeightColWidth(true, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                    }
                }
                else {
                    rowHeight = this.getRowHeightColWidth(false, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                    colWidth = this.getRowHeightColWidth(true, containerHeight, containerWidth, finalRowNumber, finalColNumber, this.screenAspectRatio);
                }
                col = 'repeat(auto-fit,' + colWidth + 'px)';
            }
            let row = '';
            if (rowHeight > 0) {
                row = 'repeat(' + finalRowNumber + ',' + rowHeight + 'px)';
            }
            else {
                row = setRow ? 'repeat(' + finalRowNumber + ', minmax(' + minRowHieght + 'px, 1fr) )' : 'minmax(' + minRowHieght + 'px, 1fr)';
            }
            this._screenListContainer.style.setProperty('grid-template-columns', col);
            this._screenListContainer.style.setProperty('grid-template-rows', row);
        }
        for (let i = 0; i < this.numberOfScreens; i++) {
            const screen = this._screenListContainer.querySelector(`[screenid="${i}"]`);
            if (!screen) {
                continue;
            }
            screen.style.removeProperty('width');
            screen.style.removeProperty('height');
            screen.classList.remove('hideScreen');
            if (i >= visible_screens && !screen.classList.contains('hideScreen')) {
                screen.classList.add('hideScreen');
            }
            if (this.screenAspectRatio === '4:3' || this.screenAspectRatio === '16:9') {
                if ((Math.floor(possibleCol) >= finalColNumber) && (Math.floor(possibleRow) >= finalRowNumber)) {
                    const SW = containerWidth / finalColNumber;
                    const SH = containerHeight / finalRowNumber;
                    const reHeight = this.screenAspectRatio === '16:9' ? (SW * (9 / 16)) : (SW * (3 / 4));
                    if (SH >= reHeight) {
                        screen.style.width = (containerWidth / finalColNumber) - 2 + 'px';
                    }
                    else {
                        if ((containerHeight / finalRowNumber) < (containerWidth / finalColNumber)) {
                            screen.style.height = (containerHeight / finalRowNumber) - 2 + 'px';
                        }
                        else {
                            screen.style.height = (containerWidth / finalColNumber) - 2 + 'px';
                        }
                    }
                }
                else {
                    if ((containerHeight / finalRowNumber) < (containerWidth / finalColNumber)) {
                        screen.style.height = (containerHeight / finalRowNumber) - 2 + 'px';
                    }
                    else {
                        screen.style.height = (containerWidth / finalColNumber) - 2 + 'px';
                    }
                }
            }
        }
    }
    getRowHeightColWidth(colWidth = false, containerHeight, containerWidth, finalRowNumber, finalColNumber, aspectRatio) {
        let colWidthSize = 0;
        let rowHeightSize = 0;
        if ((containerHeight / finalRowNumber) < (containerWidth / finalColNumber)) {
            rowHeightSize = (containerHeight / finalRowNumber) - 2;
            colWidthSize = aspectRatio === '4:3' ? (((containerHeight / finalRowNumber) - 2) * (4 / 3)) : (((containerHeight / finalRowNumber) - 2) * (16 / 9));
        }
        else {
            rowHeightSize = (containerWidth / finalColNumber) - 2;
            colWidthSize = aspectRatio === '4:3' ? (((containerWidth / finalColNumber) - 2) * (4 / 3)) : (((containerWidth / finalColNumber) - 2) * (16 / 9));
        }
        return colWidth ? colWidthSize : rowHeightSize;
    }
    screenLabelHelperCreate(index, labelInnerHTML = '') {
        var _a, _b, _c, _d;
        if (!this._screenListContainer.children[index]) {
            return;
        }
        const labelEl = this.querySelector(`#${this.getCrId()}-screen-label-${index}`);
        const content = labelEl ? labelEl.children[0] : null;
        const screen = this.querySelector(`#${this.getCrId()}-screen-${index}`);
        labelInnerHTML = screen ? screen.labelInnerHTML : labelInnerHTML;
        if (this.contractName && this.contractScreenLabelType === 'innerHTML') {
            this._screenListContainer.children[index].getElementsByTagName('span')[0].innerHTML = (_a = this.signalHolderForScreenLabel.receiveStateScriptScreenLabelHtml[index]) === null || _a === void 0 ? void 0 : _a.value;
        }
        else if (this.contractName && this.contractScreenLabelType === 'textContent') {
            this._screenListContainer.children[index].getElementsByTagName('span')[0].textContent = (_b = this.signalHolderForScreenLabel.receiveStateScreenLabel[index]) === null || _b === void 0 ? void 0 : _b.value;
        }
        else if (this.hasAttribute('receiveStateScriptScreenLabelHtml') && this.receiveStateScriptScreenLabelHtml) {
            this._screenListContainer.children[index].getElementsByTagName('span')[0].innerHTML = (_c = this.signalHolderForScreenLabel.receiveStateScriptScreenLabelHtml[index]) === null || _c === void 0 ? void 0 : _c.value;
        }
        else if (this.hasAttribute('receiveStateScreenLabel') && this.receiveStateScreenLabel) {
            this._screenListContainer.children[index].getElementsByTagName('span')[0].textContent = (_d = this.signalHolderForScreenLabel.receiveStateScreenLabel[index]) === null || _d === void 0 ? void 0 : _d.value;
        }
        else if (content) {
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(content, index, this.indexId);
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(content, index, this.indexId);
            this._screenListContainer.children[index].getElementsByTagName('span')[0].innerHTML = content.innerHTML.trim();
        }
        else if (labelInnerHTML) {
            this._screenListContainer.children[index].getElementsByTagName('span')[0].innerHTML = labelInnerHTML.trim();
        }
    }
    sourceLabelHelperCreate(index, labelInnerHTML = '') {
        var _a, _b, _c, _d;
        if (!this._sourceListContainer.children[index]) {
            return;
        }
        const labelEl = this.querySelector(`#${this.getCrId()}-source-label-${index}`);
        const content = labelEl ? labelEl.children[0] : null;
        const screen = this.querySelector(`#${this.getCrId()}-source-${index}`);
        labelInnerHTML = screen ? screen.labelInnerHTML : labelInnerHTML;
        if (this.contractName && this.contractSourceLabelType === 'innerHTML') {
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].innerHTML = (_a = this.signalHolderForSourceLabel.receiveStateScriptSourceLabelHtml[index]) === null || _a === void 0 ? void 0 : _a.value;
        }
        else if (this.contractName && this.contractSourceLabelType === 'textContent') {
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].textContent = (_b = this.signalHolderForSourceLabel.receiveStateSourceLabel[index]) === null || _b === void 0 ? void 0 : _b.value;
        }
        else if (this.hasAttribute('receiveStateScriptSourceLabelHtml') && this.receiveStateScriptSourceLabelHtml) {
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].innerHTML = (_c = this.signalHolderForSourceLabel.receiveStateScriptSourceLabelHtml[index]) === null || _c === void 0 ? void 0 : _c.value;
        }
        else if (this.hasAttribute('receiveStateSourceLabel') && this.receiveStateSourceLabel) {
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].textContent = (_d = this.signalHolderForSourceLabel.receiveStateSourceLabel[index]) === null || _d === void 0 ? void 0 : _d.value;
        }
        else if (content) {
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(content, index, this.indexId);
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(content, index, this.indexId);
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].innerHTML = content.innerHTML.trim();
        }
        else if (labelInnerHTML) {
            this._sourceListContainer.children[index].getElementsByTagName('span')[0].innerHTML = labelInnerHTML.trim();
        }
    }
    sourceIconHelperCreate(index, sourceIcon) {
        const source = this.querySelector(`#${this.getCrId()}-source-${index}`);
        if (source && source.iconUrl) {
            sourceIcon.style.removeProperty('backgroundImage');
            sourceIcon.classList.add('source-icon-url');
            sourceIcon.style.backgroundImage = `url(${source.iconUrl})`;
        }
        else if (this.sourceIconUrl) {
            sourceIcon.style.removeProperty('backgroundImage');
            sourceIcon.classList.add('source-icon-url');
            sourceIcon.style.backgroundImage = `url(${this.sourceIconUrl})`;
        }
        else {
            const iconClass = source && source.iconClass ? source.iconClass : this.sourceIconClass ? this.sourceIconClass : Ch5VideoSwitcher.DEFAULT_SOURCE_ICON;
            iconClass.split(' ').forEach((className) => {
                className = className.trim();
                if (className !== '') {
                    sourceIcon.classList.add(className);
                }
            });
        }
    }
    screenAlignLabelHelperCreate(index, screenEl) {
        const alignLabelClassPrefix = this.primaryCssClass + '--screen-list-label-';
        const screenAlignLabel = ['center', 'left', 'right'];
        Array.from(screenAlignLabel).forEach((alignLabel) => {
            screenEl.classList.remove(alignLabelClassPrefix + alignLabel);
        });
        const screen = this.querySelector(`#${this.getCrId()}-screen-${index}`);
        if (screen && screen.alignLabel) {
            screenEl.classList.add(alignLabelClassPrefix + screen.alignLabel);
        }
        else {
            screenEl.classList.add(alignLabelClassPrefix + screenAlignLabel[0]);
        }
    }
    handleDragStartSource(srcNumber) {
        const source = this._sourceListContainer.querySelector(`[sourceid="${srcNumber}"]`);
        source === null || source === void 0 ? void 0 : source.classList.add('dragging');
    }
    handleDragEndSource(srcNumber) {
        const source = this._sourceListContainer.querySelector(`[sourceid="${srcNumber}"]`);
        source === null || source === void 0 ? void 0 : source.classList.remove('dragging');
    }
    handleDragoverScreen(scrNumber, event) {
        event.preventDefault();
    }
    handleDropScreen(scrNumber) {
        var _a, _b, _c;
        this.validDrop = true;
        const draggedElement = this.querySelector(".dragging");
        if (scrNumber !== +(((_a = draggedElement.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('screenid')) + '')) {
            if (draggedElement && draggedElement.classList.contains('source-onscreen')) {
                const screenEl = this.querySelector(`[screenid="${scrNumber}"]`);
                const existingSource = screenEl.children.length === 2 ? Number(screenEl.children[1].getAttribute('sourceId')) : -1;
                this.handleSendEventOnDrop(((_b = draggedElement.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('screenid')) + '', existingSource);
                this.handleSendEventOnDrop(scrNumber + '', draggedElement.getAttribute('sourceId'));
                this.handleSendEventOnChange(scrNumber + '');
                this.handleSendEventOnChange(((_c = draggedElement.parentElement) === null || _c === void 0 ? void 0 : _c.getAttribute('screenid')) + '');
            }
            else {
                this.handleSendEventOnChange(scrNumber + '');
                if (draggedElement && draggedElement.getAttribute('sourceId')) {
                    this.handleSendEventOnDrop(scrNumber + '', draggedElement.getAttribute('sourceId'));
                }
                if (!this.receiveStateSourceChanged && !this.contractName) {
                    this.addSourceToScreen(draggedElement, this._screenListContainer.children[scrNumber], scrNumber, false);
                }
            }
        }
    }
    addSourceToScreenOnFB(scrNumber, sourceId) {
        const sourceEle = this._sourceListContainer.querySelector(`[sourceid="${sourceId - 1}"]`);
        const screenEle = this._screenListContainer.querySelector(`[screenid="${scrNumber}"]`);
        if (sourceId === 0) {
            if ((screenEle === null || screenEle === void 0 ? void 0 : screenEle.children.length) === 2) {
                screenEle === null || screenEle === void 0 ? void 0 : screenEle.removeChild(screenEle === null || screenEle === void 0 ? void 0 : screenEle.children[1]);
            }
        }
        if (sourceEle && screenEle) {
            this.addSourceToScreen(sourceEle, screenEle, scrNumber, true);
        }
    }
    addSourceToScreen(ele, screen, scrNumber, drop) {
        const se = document.createElement('div');
        se.innerHTML = ele === null || ele === void 0 ? void 0 : ele.innerHTML;
        se.classList.add('draggable');
        se.classList.add('source-onscreen');
        se.setAttribute('draggable', 'true');
        if (ele && (ele === null || ele === void 0 ? void 0 : ele.getAttribute('sourceid'))) {
            se.setAttribute('sourceId', (ele === null || ele === void 0 ? void 0 : ele.getAttribute('sourceid')) + '');
        }
        const iconElement = se.children[0];
        if (iconElement.classList.contains('source-icon-url')) {
            iconElement.style.height = screen.offsetHeight * 0.27 + 'px';
            iconElement.style.width = '100%';
        }
        se.style.fontSize = screen.offsetHeight * 0.27 + 'px';
        if ((screen === null || screen === void 0 ? void 0 : screen.children.length) === 2) {
            screen === null || screen === void 0 ? void 0 : screen.removeChild(screen === null || screen === void 0 ? void 0 : screen.children[1]);
        }
        if (drop) {
            se.addEventListener('dragstart', this.handleDragStartForSourceOnScreen.bind(this, scrNumber));
            se.addEventListener('dragend', this.handleDragEndForSourceOnScreen.bind(this, scrNumber));
            screen.appendChild(se);
        }
        else {
            screen.appendChild(se);
            setTimeout(() => {
                if ((screen === null || screen === void 0 ? void 0 : screen.children.length) === 2) {
                    screen === null || screen === void 0 ? void 0 : screen.removeChild(screen === null || screen === void 0 ? void 0 : screen.children[1]);
                }
            }, 1500);
        }
    }
    handleResizeComponent() {
        for (let i = 0; i < this.numberOfScreens; i++) {
            if (this._screenListContainer.children[i].children.length > 1) {
                const screen = this._screenListContainer.children[i];
                const sourceOnScreen = this._screenListContainer.children[i].children[1];
                sourceOnScreen.style.fontSize = screen.offsetHeight * 0.27 + 'px';
                const iconElement = sourceOnScreen.children[0];
                if (iconElement.classList.contains('source-icon-url')) {
                    iconElement.style.height = screen.offsetHeight * 0.27 + 'px';
                    iconElement.style.width = '100%';
                }
            }
        }
        if (this.endless) {
            if (this.sourceListPosition === 'top' || this.sourceListPosition === 'bottom') {
                this._sourceListContainer.scrollLeft += 5;
            }
            else {
                this._sourceListContainer.scrollTop += 5;
            }
        }
        this.initScrollbar();
    }
    handleDragStartForSourceOnScreen(index) {
        this.validDrop = false;
        this._screenListContainer.children[index].children[1].classList.add('dragging');
    }
    handleDragEndForSourceOnScreen(index, event) {
        var _a, _b, _c;
        (_c = (_b = (_a = this._screenListContainer.children[index]) === null || _a === void 0 ? void 0 : _a.children[1]) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.remove('dragging');
        if (event.dataTransfer.dropEffect !== 'copy' && !this.validDrop) {
            this.handleSendEventOnDrop(index + '', -1);
            this.handleSendEventOnChange(index + '');
            event.target.remove();
        }
    }
    clearSubscriptions() {
        this.signalHolder.forEach((obj) => {
            this.clearOldSubscriptionNumber(obj.signalValue, obj.signalState);
        });
        this.signalHolder.length = 0;
        Object.keys(this.signalHolderForSourceLabel).forEach((key) => {
            this.signalHolderForSourceLabel[key].forEach((item) => {
                this.clearOldSubscriptionString(item.signalValue, item.signalState);
            });
            this.signalHolderForSourceLabel[key] = [];
        });
        Object.keys(this.signalHolderForScreenLabel).forEach((key) => {
            this.signalHolderForScreenLabel[key].forEach((item) => {
                this.clearOldSubscriptionString(item.signalValue, item.signalState);
            });
            this.signalHolderForScreenLabel[key] = [];
        });
    }
    setNumberOfItems(newValue) {
        this._ch5Properties.setForSignalResponse("numberOfScreens", newValue, () => {
            if (this.numberOfScreenBackup > this.numberOfScreens) {
                for (let i = this.numberOfScreens; i < this.numberOfScreenBackup; i++) {
                    this.handleSendEventOnDrop(i + '', -1);
                    this.handleSendEventOnChange(i + '');
                }
            }
            this.numberOfScreenBackup = this.numberOfScreens;
            this.createScreen();
        });
    }
    replaceAll(str, find, replace) {
        if (str && String(str).trim() !== "") {
            return String(str).split(find).join(replace);
        }
        else {
            return str;
        }
    }
}
Ch5VideoSwitcher.SOURCE_LIST_POSITION = ['top', 'left', 'right', 'bottom'];
Ch5VideoSwitcher.SCREEN_ASPECT_RATIO = ['stretch', '16:9', '4:3'];
Ch5VideoSwitcher.CONTRACT_SOURCE_LABEL_TYPE = ['none', 'textContent', 'innerHTML'];
Ch5VideoSwitcher.CONTRACT_SCREEN_LABEL_TYPE = ['none', 'textContent', 'innerHTML'];
Ch5VideoSwitcher.DEFAULT_SOURCE_ICON = 'fa-solid fa-video';
Ch5VideoSwitcher.COMPONENT_DATA = {
    SOURCE_LIST_POSITION: {
        default: Ch5VideoSwitcher.SOURCE_LIST_POSITION[0],
        values: Ch5VideoSwitcher.SOURCE_LIST_POSITION,
        key: 'sourceListPosition',
        attribute: 'sourceListPosition',
        classListPrefix: '--source-list-position-'
    },
    SCREEN_ASPECT_RATIO: {
        default: Ch5VideoSwitcher.SCREEN_ASPECT_RATIO[0],
        values: Ch5VideoSwitcher.SCREEN_ASPECT_RATIO,
        key: 'screenAspectRatio',
        attribute: 'screenAspectRatio',
        classListPrefix: '--screen-aspect-ratio-'
    },
};
Ch5VideoSwitcher.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendeventondrop: { direction: "event", numericJoin: 1, contractName: true }, sendeventonchange: { direction: "event", booleanJoin: 1, contractName: true }, receivestatesourcechanged: { direction: "state", numericJoin: 1, contractName: true }, receivestatesourcelabel: { direction: "state", stringJoin: 1, contractName: true }, receivestateScriptsourcelabelhtml: { direction: "state", stringJoin: 1, contractName: true }, receivestatescreenlabel: { direction: "state", stringJoin: 1, contractName: true }, receiveStatescriptscreenlabelhtml: { direction: "state", stringJoin: 1, contractName: true }, receivestatenumberofscreens: { direction: "state", numericJoin: 1, contractName: true } });
Ch5VideoSwitcher.COMPONENT_PROPERTIES = [
    {
        default: Ch5VideoSwitcher.SOURCE_LIST_POSITION[0],
        enumeratedValues: Ch5VideoSwitcher.SOURCE_LIST_POSITION,
        name: "sourceListPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5VideoSwitcher.SOURCE_LIST_POSITION[0],
        isObservableProperty: true,
    },
    {
        default: false,
        name: "endless",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: 1,
        name: "numberOfSourceListDivisions",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 1,
            max: 10,
            conditionalMin: 1,
            conditionalMax: 10,
            conditionalMinValue: 1,
            conditionalMaxValue: 10
        },
        isObservableProperty: true
    },
    {
        default: false,
        name: "scrollbar",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: 5,
        name: "numberOfSources",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 1,
            max: 256,
            conditionalMin: 1,
            conditionalMax: 256,
            conditionalMinValue: 1,
            conditionalMaxValue: 256
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "numberOfScreenColumns",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 10,
            conditionalMin: 0,
            conditionalMax: 10,
            conditionalMinValue: 0,
            conditionalMaxValue: 10
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "indexId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: true,
        name: "displayScreenLabel",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: Ch5VideoSwitcher.SCREEN_ASPECT_RATIO[0],
        enumeratedValues: Ch5VideoSwitcher.SCREEN_ASPECT_RATIO,
        name: "screenAspectRatio",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5VideoSwitcher.SCREEN_ASPECT_RATIO[0],
        isObservableProperty: true,
    },
    {
        default: 2,
        name: "numberOfScreens",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateNumberOfScreens",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 1,
            max: 36,
            conditionalMin: 1,
            conditionalMax: 36,
            conditionalMinValue: 1,
            conditionalMaxValue: 36
        },
        isObservableProperty: true
    },
    {
        default: Ch5VideoSwitcher.DEFAULT_SOURCE_ICON,
        name: "sourceIconClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: Ch5VideoSwitcher.DEFAULT_SOURCE_ICON,
        isObservableProperty: true,
    },
    {
        default: "",
        name: "sourceIconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "sendEventOnDrop",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "sendEventOnChange",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "receiveStateSourceChanged",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "receiveStateSourceLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "receiveStateScriptSourceLabelHtml",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "receiveStateScreenLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "receiveStateScriptScreenLabelHtml",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateNumberOfScreens",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "contractName",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: Ch5VideoSwitcher.CONTRACT_SOURCE_LABEL_TYPE[0],
        enumeratedValues: Ch5VideoSwitcher.CONTRACT_SOURCE_LABEL_TYPE,
        name: "contractSourceLabelType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5VideoSwitcher.CONTRACT_SOURCE_LABEL_TYPE[0],
        isObservableProperty: true,
    },
    {
        default: Ch5VideoSwitcher.CONTRACT_SCREEN_LABEL_TYPE[0],
        enumeratedValues: Ch5VideoSwitcher.CONTRACT_SCREEN_LABEL_TYPE,
        name: "contractScreenLabelType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5VideoSwitcher.CONTRACT_SCREEN_LABEL_TYPE[0],
        isObservableProperty: true,
    },
];
Ch5VideoSwitcher.ELEMENT_NAME = 'ch5-video-switcher';
Ch5VideoSwitcher.SCROLLBAR_CLASSLIST_PREFIX = '--source-list-scrollbar-';
Ch5VideoSwitcher.DISPLAY_SCREEN_LABEL = '--screen-list-display-screen-label-';
Ch5VideoSwitcher.registerCustomElement();
Ch5VideoSwitcher.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXN3aXRjaGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXZpZGVvLXN3aXRjaGVyL2NoNS12aWRlby1zd2l0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUduSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFJeEYsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQVM7SUEyVTdDLElBQVcsa0JBQWtCLENBQUMsS0FBMEM7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQXNDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDN0YsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBVyxrQkFBa0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBc0Msb0JBQW9CLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFD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