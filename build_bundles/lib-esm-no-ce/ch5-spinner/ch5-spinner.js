import { isNil } from 'lodash';
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SpinnerTemplate } from "./ch5-spinner-template";
import { Ch5SpinnerMutationObserver } from "./ch5-spinner-mutation-observer";
import { Ch5SpinnerScroll } from "./ch5-spinner-scroll";
import { Ch5SpinnerEvents } from "./ch5-spinner-events";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import HtmlCallback from "../ch5-common/utils/html-callback";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5Spinner extends Ch5Common {
    static get observedAttributes() {
        const commonObservedAttributes = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Spinner.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Spinner.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Spinner.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        const contextObservedAttributes = [
            'size',
            'iconposition',
            'selectedvalue',
            'itemheight',
            'visibleitemscroll',
            'resize',
            'endless',
            'indexid',
            'label',
            'feedbackmode',
            'signalvaluesynctimeout',
            'sendeventonchange',
            'sendeventonfocus',
            'sendeventonoverflow',
            'sendEventOnUnderflow',
            'receivestatevalue',
            'receivestatesize',
            'receivestatelabel',
            'receivestateurl',
            'show'
        ];
        return contextObservedAttributes.concat(commonObservedAttributes.concat(newObsAttrs));
    }
    constructor() {
        super();
        this._size = 1;
        this._iconPosition = '';
        this._selectedValue = 0;
        this._itemHeight = '';
        this._visibleItemScroll = 0;
        this._resize = false;
        this._endless = false;
        this._feedbackMode = '';
        this._signalValueSyncTimeout = 0;
        this._indexId = '';
        this._label = '';
        this._receiveStateValue = '';
        this._receiveStateSize = '';
        this._receiveStateUrl = '';
        this._sendEventOnFocus = '';
        this._sendEventOnChange = '';
        this._sendEventOnOverflow = '';
        this._sendEventOnUnderflow = '';
        this._templateHelper = {};
        this._scrollHelper = {};
        this._eventsHelper = {};
        this._selectedItem = {};
        this._cleanItem = 0;
        this._receiveStateValueSub = '';
        this._receiveStateLabelSub = '';
        this._receiveStateSizeSub = '';
        this._receiveStateLabel = '';
        this._onclean = {};
        this._ondirty = {};
        this._wasInstantiated = false;
        this.dirtyFlag = false;
        this._mutationObserver = {};
        this._ch5Properties = new Ch5Properties(this, Ch5Spinner.COMPONENT_PROPERTIES);
        this._mutationObserver = new Ch5SpinnerMutationObserver(this);
    }
    set ondirty(callback) {
        if (isNil(callback)) {
            callback = {};
        }
        if (callback instanceof HtmlCallback && this.ondirty instanceof Function) {
            return;
        }
        this._ondirty = callback;
    }
    get ondirty() {
        return this._ondirty;
    }
    set onclean(callback) {
        if (isNil(callback)) {
            callback = {};
        }
        if (callback instanceof HtmlCallback && this.onclean instanceof Function) {
            return;
        }
        this._onclean = callback;
    }
    get onclean() {
        return this._onclean;
    }
    set templateHelper(templateHelper) {
        this.info("<ch5-spinner />.set templateHelper");
        this._templateHelper = templateHelper;
    }
    get templateHelper() {
        this.info("<ch5-spinner />.get templateHelper");
        return this._templateHelper;
    }
    get scrollHelper() {
        return this._scrollHelper;
    }
    set scrollHelper(value) {
        this._scrollHelper = value;
    }
    get eventsHelper() {
        return this._eventsHelper;
    }
    set eventsHelper(value) {
        this._eventsHelper = value;
    }
    get selectedItem() {
        return this._selectedItem;
    }
    set selectedItem(value) {
        this._selectedItem = value;
    }
    get cleanItem() {
        return this._cleanItem;
    }
    set cleanItem(value) {
        this._cleanItem = value;
    }
    get receiveStateValueSub() {
        return this._receiveStateValueSub;
    }
    set receiveStateValueSub(value) {
        this._receiveStateValueSub = value;
    }
    get receiveStateSizeSub() {
        return this._receiveStateSizeSub;
    }
    set receiveStateSizeSub(value) {
        this._receiveStateSizeSub = value;
    }
    get wasInstantiated() {
        return this._wasInstantiated;
    }
    set wasInstantiated(value) {
        this._wasInstantiated = value;
    }
    set size(size) {
        const _size = (this.size !== size && isNil(size))
            ? 1
            : this.adjustMaxSizeValue(size);
        if (this.size !== _size) {
            this.setAttribute('size', _size + '');
        }
        this._size = _size;
    }
    get size() {
        return this._size;
    }
    set iconPosition(position) {
        if (this.iconPosition !== position && isNil(position)) {
            position = 'first';
        }
        const iconPosition = Ch5Spinner.ICONPOSITIONS.filter(_pos => position.trim() === _pos);
        if (iconPosition.length > 0) {
            position = iconPosition[0];
        }
        else {
            position = Ch5Spinner.ICONPOSITIONS[0];
        }
        if (document.dir === 'rtl') {
            if (position === Ch5Spinner.ICONPOSITIONS[0]) {
                position = Ch5Spinner.ICONPOSITIONS[1];
            }
            else {
                position = Ch5Spinner.ICONPOSITIONS[0];
            }
        }
        if (position !== this._iconPosition) {
            this.setAttribute('iconposition', position);
            this.repaint();
        }
        this._iconPosition = position;
    }
    get iconPosition() {
        return this._iconPosition;
    }
    set selectedValue(value) {
        if (this.selectedValue !== value && isNil(value)) {
            value = 0;
        }
        if (this.size < value) {
            value = this.size - 1;
        }
        else if (value < 0) {
            value = 0;
        }
        if (value !== this.selectedValue) {
            this.setAttribute('selectedValue', value + '');
            if (this.scrollHelper instanceof Ch5SpinnerScroll) {
                this._scrollHelper.selectTheItem(value);
            }
        }
        this._selectedValue = value;
    }
    get selectedValue() {
        return this._selectedValue;
    }
    get selectedValueIndex() {
        return this.selectedValue;
    }
    set itemHeight(height) {
        if (this.itemHeight !== height && isNil(height)) {
            height = '';
        }
        if (height.indexOf('px') === -1 && height.indexOf('vh') === -1) {
            height = height + 'px';
        }
        if (height !== '' && this.itemHeight !== height) {
            this.setAttribute('itemheight', height);
        }
        this._itemHeight = height;
    }
    get itemHeight() {
        return this._itemHeight;
    }
    set visibleItemScroll(items) {
        if (this.visibleItemScroll !== items && isNil(items)) {
            items = Ch5Spinner.VISIBLEITEMSCROLL;
        }
        if (items > this.size) {
            items = this.size;
        }
        if (isNaN(items) || items <= 0)
            items = 3;
        if (items !== this.visibleItemScroll) {
            this.setAttribute('visibleItemScroll', items.toString() + '');
        }
        this._visibleItemScroll = items;
    }
    get visibleItemScroll() {
        return this._visibleItemScroll;
    }
    set resize(resize) {
        if (this.resize !== resize && isNil(resize)) {
            resize = false;
        }
        if (resize !== this.resize) {
            this.setAttribute('resize', resize + '');
        }
        this._resize = resize;
    }
    get resize() {
        return this._resize;
    }
    set endless(endless) {
        if (this.endless !== endless && isNil(endless)) {
            endless = false;
        }
        if (endless !== this._endless) {
            this.setAttribute('endless', endless + '');
            this.repaint();
        }
        this._endless = endless;
    }
    get endless() {
        return this._endless;
    }
    set indexId(id) {
        if (this.indexId !== id && isNil(id)) {
            id = '';
        }
        if (id !== this.indexId) {
            this.setAttribute('indexId', id);
            this.repaint();
        }
        this._indexId = id;
    }
    get indexId() {
        return this._indexId;
    }
    set receiveStateValue(value) {
        if (this.receiveStateValue !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.receiveStateValue) {
            this.setAttribute('receiveStateValue', value);
            this.registerReceiveSignalValue();
        }
        this._receiveStateValue = value;
    }
    get receiveStateValue() {
        return this._attributeValueAsString('receivestatevalue');
    }
    set receiveStateSize(value) {
        if (this.receiveStateSize !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.receiveStateSize) {
            this.setAttribute('receiveStateSize', value);
            this.repaint();
        }
        this._receiveStateSize = value;
    }
    get receiveStateSize() {
        return this._attributeValueAsString('receivestatesize');
    }
    set receiveStateLabel(value) {
        if (this.receiveStateLabel !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.receiveStateLabel) {
            this.setAttribute('receiveStateLabel', value);
            this.repaint();
        }
        this._receiveStateLabel = value;
    }
    get receiveStateLabel() {
        return this._attributeValueAsString('receivestatelabel');
    }
    set receiveStateUrl(value) {
        if (this.receiveStateValue !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.receiveStateUrl) {
            this.setAttribute('receiveStateUrl', value);
            this.repaint();
        }
        this._receiveStateUrl = value;
    }
    get receiveStateUrl() {
        return this._attributeValueAsString('receivestateurl');
    }
    set sendEventOnFocus(value) {
        if (this.sendEventOnFocus !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.sendEventOnFocus) {
            this.setAttribute('sendEventOnFocus', value);
        }
        this._sendEventOnFocus = value;
    }
    get sendEventOnFocus() {
        return this._sendEventOnFocus;
    }
    set sendEventOnChange(value) {
        if (this.sendEventOnChange !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.sendEventOnChange) {
            this.setAttribute('sendEventOnChange', value);
        }
        this._sendEventOnChange = value;
    }
    get sendEventOnChange() {
        return this._sendEventOnChange;
    }
    set sendEventOnOverflow(value) {
        if (this.sendEventOnOverflow !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.sendEventOnOverflow) {
            this.setAttribute('sendEventOnOverflow', value);
        }
        this._sendEventOnOverflow = value;
    }
    get sendEventOnOverflow() {
        return this._sendEventOnOverflow;
    }
    set sendEventOnUnderflow(value) {
        if (this.sendEventOnUnderflow !== value && isNil(value)) {
            value = '';
        }
        if (value !== this.sendEventOnUnderflow) {
            this.setAttribute('sendEventOnUnderflow', value);
        }
        this._sendEventOnUnderflow = value;
    }
    get sendEventOnUnderflow() {
        return this._sendEventOnUnderflow;
    }
    set feedbackMode(value) {
        if (this.feedbackMode !== value && isNil(value)) {
            value = 'direct';
        }
        if (Ch5Spinner.FEEDBACKMODES.indexOf(value) < 0) {
            value = Ch5Spinner.FEEDBACKMODES[0];
        }
        if (value !== this._feedbackMode) {
            this.setAttribute('feedbackMode', value);
        }
        this._feedbackMode = value;
    }
    get feedbackMode() {
        return this._feedbackMode;
    }
    set signalValueSyncTimeout(value) {
        if (this.signalValueSyncTimeout !== value && isNil(value)) {
            value = 1500;
        }
        if (value !== this.signalValueSyncTimeout) {
            this.setAttribute('signalValueSyncTimeout', value + '');
        }
        this._signalValueSyncTimeout = value;
    }
    get signalValueSyncTimeout() {
        return this._signalValueSyncTimeout;
    }
    set label(value) {
        const _value = value;
        if (this.label !== value && isNil(value)) {
            value = '';
        }
        else {
            value = this._getTranslatedValue('label', value);
        }
        if (value !== '' && this.label !== value && _value !== value) {
            this.setAttribute('label', value);
        }
        this._label = value;
    }
    get label() {
        return this._label;
    }
    set autoSetItemHeight(value) {
        this._ch5Properties.set("autoSetItemHeight", value, () => {
        });
    }
    get autoSetItemHeight() {
        return this._ch5Properties.get("autoSetItemHeight");
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Spinner.ELEMENT_NAME, Ch5Spinner.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerSignalAttributeDefaults() {
        Ch5SignalAttributeRegistry.instance.addElementDefaultAttributeEntries(Ch5Spinner.ELEMENT_NAME, {
            contractName: { attributes: ["contractname"], defaultValue: "" },
            booleanJoin: { attributes: ["booleanjoinoffset"], defaultValue: "0" },
            numericJoin: { attributes: ["numericjoinoffset"], defaultValue: "0" },
            stringJoin: { attributes: ["stringjoinoffset"], defaultValue: "0" }
        });
    }
    connectedCallback() {
        this.info("<ch5-spinner />.connectedCallback()");
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Spinner);
        }
        this.contentCleanUp();
        Promise.all([
            customElements.whenDefined('ch5-spinner')
        ]).then(() => {
            if (!this._wasInstantiated) {
                this.cacheComponentChildrens();
                this._wasInstantiated = true;
                this.initUtilities();
                this.initCommonMutationObserver(this);
            }
        });
    }
    initSignals() {
        this.info("<ch5-spinner />.initSignals()");
        if (this.hasAttribute('receiveStateValue')) {
            this.registerReceiveSignalValue();
        }
        if (this.hasAttribute('receiveStateSize')) {
            this.registerReceiveSignalSize();
        }
        if (this.hasAttribute('receiveStateLabel')) {
            this.registerReceiveSignalLabel();
        }
    }
    dirtyTimeHandler() {
        this.info("<ch5-spinner />.dirtyTimeHandler()");
        window.setTimeout(this.dirtyHandler.bind(this), this.signalValueSyncTimeout);
    }
    disconnectedCallback() {
        this.info("<ch5-spinner />.disconnectedCallback()");
        this._wasInstantiated = false;
        if (typeof this._scrollHelper.destruct !== "undefined") {
            this._scrollHelper.destruct();
        }
        if (typeof this.templateHelper.destruct !== "undefined") {
            this.templateHelper.destruct();
        }
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
    }
    unsubscribeFromSignals() {
        this.info("<ch5-spinner />.unsubscribeFromSignals()");
        super.unsubscribeFromSignals();
        if (false === this._keepListeningOnSignalsAfterRemoval) {
            this.clearNumberSignalSubscription(this._receiveStateSize, this._receiveStateSizeSub);
            this._receiveStateUrl = '';
            this.clearNumberSignalSubscription(this._receiveStateValue, this._receiveStateValueSub);
            this._receiveStateValue = '';
            this.clearStringSignalSubscription(this._receiveStateLabel, this._receiveStateLabelSub);
            this._receiveStateLabel = '';
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('<ch5-spinner />.attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        super.attributeChangedCallback(attr, oldValue, newValue);
        const attributeChangedProperty = Ch5Spinner.COMPONENT_PROPERTIES.find((property) => {
            return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true;
        });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        else {
            if (this._wasInstantiated && oldValue !== newValue) {
                switch (attr) {
                    case 'size':
                        if (this.hasAttribute('receiveStateSize') === false) {
                            this.size = parseFloat(newValue);
                            this.repaint();
                        }
                        break;
                    case 'iconposition':
                        this.iconPosition = newValue;
                        break;
                    case 'selectedvalue':
                        this.selectedValue = parseFloat(newValue);
                        this._cleanItem = parseFloat(newValue);
                        if (this._scrollHelper.constructor === Ch5SpinnerScroll) {
                            this._scrollHelper.selectTheItem(parseFloat(newValue));
                        }
                        break;
                    case 'itemheight':
                        this.itemHeight = newValue;
                        this.repaint();
                        break;
                    case 'visibleitemscroll':
                        this.visibleItemScroll = parseFloat(newValue);
                        this.repaint();
                        break;
                    case 'indexid':
                        this.indexId = newValue;
                        break;
                    case 'feedbackmode':
                        this.feedbackMode = newValue;
                        break;
                    case 'signalvaluesynctimeout':
                        this.signalValueSyncTimeout = parseFloat(newValue);
                        break;
                    case 'sendeventonchange':
                        this.sendEventOnChange = newValue;
                        break;
                    case 'sendeventonfocus':
                        this.sendEventOnFocus = newValue;
                        break;
                    case 'sendeventonoverflow':
                        this.sendEventOnOverflow = newValue;
                        break;
                    case 'sendEventOnUnderflow':
                        this.sendEventOnUnderflow = newValue;
                        break;
                    case 'receivestatevalue':
                        this.receiveStateValue = newValue;
                        break;
                    case 'receivestatesize':
                        this.receiveStateSize = newValue;
                        break;
                    case 'receivestatelabel':
                        this.receiveStateLabel = newValue;
                        break;
                    case 'receivestateurl':
                        this.receiveStateUrl = newValue;
                        break;
                    case 'show':
                        if (!this.itemHeight && newValue) {
                            this.templateHelper.handleDefaultItemHeight(this.templateHelper.childrenObject[0]);
                        }
                }
                this.addAriaAttributes();
            }
        }
    }
    addAriaAttributes() {
        if (this.templateHelper.constructor === Ch5SpinnerTemplate &&
            this.templateHelper.wrapperElement.constructor === HTMLDivElement) {
            this.templateHelper.wrapperElement.setAttribute('role', 'listbox');
        }
    }
    registerReceiveSignalValue() {
        this.info("<ch5-spinner />.registerReceiveSignalValue()");
        this.clearStringSignalSubscription(this.receiveStateValue, this._receiveStateValueSub);
        const receiveStateName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
        const receiveState = Ch5SignalFactory.getInstance()
            .getNumberSignal(receiveStateName);
        if (receiveState === null) {
            return;
        }
        this._receiveStateValueSub = receiveState.subscribe((newValue) => {
            if ((newValue !== null || newValue !== undefined) && newValue >= 0) {
                this.selectedValue = newValue;
                this._cleanItem = newValue;
                this._scrollHelper.selectTheItem(newValue);
            }
        });
    }
    registerReceiveSignalLabel() {
        this.info("<ch5-spinner />.registerReceiveSignalLabel()");
        this.clearStringSignalSubscription(this.receiveStateLabel, this._receiveStateLabelSub);
        const receiveStateName = Ch5Signal.getSubscriptionSignalName(this.receiveStateLabel);
        const receiveState = Ch5SignalFactory.getInstance()
            .getStringSignal(receiveStateName);
        if (receiveState === null) {
            return;
        }
        this._receiveStateLabelSub = receiveState.subscribe((newValue) => {
            if (newValue !== null || newValue !== undefined) {
                this.setAttribute('label', newValue);
            }
        });
    }
    registerReceiveSignalSize() {
        this.info("<ch5-spinner />.registerReceiveSignalSize()");
        this.clearStringSignalSubscription(this.receiveStateSize, this._receiveStateSizeSub);
        const receiveStateName = Ch5Signal.getSubscriptionSignalName(this.receiveStateSize);
        const receiveState = Ch5SignalFactory.getInstance()
            .getNumberSignal(receiveStateName);
        if (receiveState === null) {
            return;
        }
        this._receiveStateSizeSub = receiveState.subscribe((newValue) => {
            newValue = this.adjustMaxSizeValue(newValue);
            if (isNil(newValue) || newValue === 0 || this.size === newValue) {
                return;
            }
            this.size = newValue;
            this.repaint();
        });
    }
    repaint() {
        this.info("<ch5-spinner />.repaint()");
        try {
            if (this.templateHelper.constructor === Ch5SpinnerTemplate && this.parentNode !== null && this.hasChildNodes()) {
                for (let i = this.childNodes.length - 1; i >= 0; i--) {
                    if (this.childNodes[i].tagName === 'TEMPLATE') {
                        continue;
                    }
                    this.removeChild(this.childNodes[i]);
                }
                if (!this.hasChildNodes() ||
                    (this.childNodes[0] !== null &&
                        this.childNodes[0].tagName === 'TEMPLATE')) {
                    const _shortLifeElement = document.createElement('div');
                    this.parentNode.insertBefore(_shortLifeElement, this.nextSibling);
                    this.remove();
                    _shortLifeElement.parentNode.insertBefore(this, _shortLifeElement.nextSibling);
                    _shortLifeElement.remove();
                }
            }
        }
        catch (e) {
            console.error('Something wrong with component regeneration', e);
        }
    }
    submit() {
        this.info("<ch5-spinner />.submit()");
        if (this.feedbackMode === 'submit') {
            this.dirtyTimeHandler();
            if (this._scrollHelper.getCleanCurrentElementIndex() !== this._cleanItem) {
                const sendEventOnChange = this.sendEventOnChange;
                if ('' !== sendEventOnChange && null !== sendEventOnChange && undefined !== sendEventOnChange) {
                    const sigClick = Ch5SignalFactory.getInstance()
                        .getNumberSignal(this.sendEventOnChange);
                    if (sigClick !== null) {
                        sigClick.publish(this._scrollHelper.getCleanCurrentElement());
                    }
                }
            }
        }
    }
    reset() {
        this.info("<ch5-spinner />.reset()");
        this._scrollHelper.selectTheItem(this.selectedValue);
        this._cleanItem = this._scrollHelper.getCleanCurrentElementIndex();
        this.dirtyFlag = false;
        this._eventsHelper.dispatchClean();
    }
    getValue() {
        this.info("<ch5-spinner />.getValue()");
        return this._scrollHelper.getCleanCurrentElement();
    }
    setValue(value) {
        this.info("<ch5-spinner />.setValue()");
        this._scrollHelper.selectTheItem(value);
    }
    getDirty() {
        this.info("<ch5-spinner />.getDirty()");
        if (this._cleanItem !== this._scrollHelper.getCleanCurrentElementIndex()) {
            return true;
        }
        return false;
    }
    adjustMaxSizeValue(size) {
        return size > Ch5Spinner.MAX_SIZE ? Ch5Spinner.MAX_SIZE : size;
    }
    getItemHeightValue() {
        const value = parseFloat(this.itemHeight);
        if (isNaN(value) !== true) {
            return value;
        }
        else {
            return 0;
        }
    }
    getItemHeightMeasurementUnit() {
        if (this.itemHeight.indexOf('px') > -1) {
            return 'px';
        }
        else if (this.itemHeight.indexOf('vh') > -1) {
            return 'vh';
        }
        else {
            return 'px';
        }
    }
    getHighlightOffsetValue() {
        const visibleItemScroll = this.visibleItemScroll;
        const itemHeightValue = this.getItemHeightValue();
        return (Math.ceil(visibleItemScroll / 2) - 1) * itemHeightValue;
    }
    getHighlightOffset() {
        return this.getHighlightOffsetValue() + this.getItemHeightMeasurementUnit();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Spinner.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Spinner.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Spinner.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Spinner.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        if (this.hasAttribute('itemHeight')) {
            this.itemHeight = this.getAttribute('itemHeight') !== null ? this.getAttribute('itemHeight') : '';
        }
        if (this.hasAttribute('itemHeight') === false || this.itemHeight === null) {
            this.autoSetItemHeight = true;
            if (isNil(this.templateHelper.element)) {
                this.itemHeight = Ch5Spinner.ITEM_HEIGHT_WHEN_EMPTY;
            }
            this.setAttribute('autosetitemheight', '');
        }
        if (this.hasAttribute('size')) {
            this.size = this.getAttribute('size') !== null ? parseFloat(this.getAttribute('size')) : this.size;
        }
        if (this.hasAttribute('iconPosition')) {
            this.iconPosition = this.getAttribute('iconPosition') !== null ? this.getAttribute('iconPosition') : Ch5Spinner.ICONPOSITIONS[0];
        }
        else {
            this.iconPosition = Ch5Spinner.ICONPOSITIONS[0];
        }
        if (this.hasAttribute('selectedValue')) {
            this.selectedValue = this.getAttribute('selectedvalue') !== null ? parseFloat(this.getAttribute('selectedvalue')) : this.selectedValue;
        }
        if (this.hasAttribute('visibleItemScroll')) {
            this.visibleItemScroll = this.getAttribute('visibleItemScroll') !== null ? parseFloat(this.getAttribute('visibleItemScroll')) : this.visibleItemScroll;
        }
        else {
            this.visibleItemScroll = Ch5Spinner.VISIBLEITEMSCROLL;
        }
        if (this.hasAttribute('resize')) {
            this.resize = this.hasAttribute('resize') ? true : false;
        }
        if (this.hasAttribute('endless')) {
            const endless = this.getAttribute('endless') === 'false' ? false : true;
            this.endless = endless;
        }
        if (this.hasAttribute('indexId')) {
            this.indexId = this.getAttribute('indexId') !== null ? this.getAttribute('indexId') : '';
        }
        if (this.hasAttribute('label')) {
            this.label = this.getAttribute('label') !== null ? this.getAttribute('label') : '';
        }
        if (this.hasAttribute('feedbackMode')) {
            this.feedbackMode = this.getAttribute('feedbackMode') !== null ? this.getAttribute('feedbackMode') : 'direct';
        }
        else {
            this.feedbackMode = Ch5Spinner.FEEDBACKMODES[0];
        }
        if (this.hasAttribute('signalValueSyncTimeout')) {
            this.signalValueSyncTimeout = this.getAttribute('signalValueSyncTimeout') !== null ? parseFloat(this.getAttribute('signalValueSyncTimeout') + '') : 1500;
        }
        else {
            this.signalValueSyncTimeout = Ch5Spinner.SYNCTIMEOUT;
        }
        if (this.hasAttribute('sendEventOnChange')) {
            this.sendEventOnChange = this.getAttribute('sendEventOnChange') !== null ? this.getAttribute('sendEventOnChange') : '';
        }
        if (this.hasAttribute('sendEventOnFocus')) {
            this.sendEventOnFocus = this.getAttribute('sendEventOnFocus') !== null ? this.getAttribute('sendEventOnFocus') : '';
        }
        if (this.hasAttribute('sendEventOnOverflow')) {
            this.sendEventOnOverflow = this.getAttribute('sendEventOnOverflow') !== null ? this.getAttribute('sendEventOnOverflow') : '';
        }
        if (this.hasAttribute('sendEventOnUnderflow')) {
            this.sendEventOnUnderflow = this.getAttribute('sendEventOnUnderflow') !== null ? this.getAttribute('sendEventOnUnderflow') : '';
        }
        if (this.hasAttribute('receiveStateValue')) {
            this.receiveStateValue = this.getAttribute('receiveStateValue') !== null ? this.getAttribute('receiveStateValue') : '';
        }
        if (this.hasAttribute('receiveStateSize')) {
            this.receiveStateSize = this.getAttribute('receiveStateSize') !== null ? this.getAttribute('receiveStateSize') : '';
        }
        if (this.hasAttribute('receiveStateLabel')) {
            this.receiveStateLabel = this.getAttribute('receiveStateLabel') !== null ? this.getAttribute('receiveStateLabel') : '';
        }
        if (this.hasAttribute('receiveStateUrl')) {
            this.receiveStateUrl = this.getAttribute('receiveStateUrl') !== null ? this.getAttribute('receiveStateUrl') : '';
        }
        if (this.hasAttribute('onclean')) {
            this.onclean = new HtmlCallback(this, this.getAttribute('onclean'));
        }
        if (this.hasAttribute('ondirty')) {
            this.ondirty = new HtmlCallback(this, this.getAttribute('ondirty'));
        }
    }
    initUtilities() {
        this.info("<ch5-spinner />.initUtilities()");
        this.classList.add(Ch5Spinner.primaryCssClass);
        this.initAttributes();
        this._eventsHelper = new Ch5SpinnerEvents(this);
        this._templateHelper = new Ch5SpinnerTemplate(this);
        this.resolveTemplateChildren(this._templateHelper.templateElement);
        this._templateHelper.generateTemplate(this.size);
        this._scrollHelper = new Ch5SpinnerScroll(this);
        this.addAriaAttributes();
        this.initSignals();
    }
    dirtyHandler() {
        this.info("<ch5-spinner />.dirtyHandler()");
        if (this.dirtyFlag) {
            this._scrollHelper.selectTheItem(this._cleanItem);
            this._eventsHelper.dispatchClean();
            this.dirtyFlag = false;
        }
    }
    translateCallback(section) {
        this.info("<ch5-spinner />.translateCallback()");
        if (section === 'label') {
            if (this.templateHelper.childrenObject !== null && this.templateHelper.childrenObject.length > 0) {
                this.templateHelper.childrenObject.forEach((child, index) => {
                    const clonedChild = child.cloneNode(true);
                    clonedChild.innerHTML = this._getTranslatedValue('label', child.innerHTML);
                    const childWithIndexIdReplaced = this.templateHelper.resolveId(index, [clonedChild]);
                    if (childWithIndexIdReplaced !== undefined) {
                        child.innerHTML = childWithIndexIdReplaced.children[0].innerHTML;
                    }
                    else {
                        child.innerHTML = clonedChild.innerHTML;
                    }
                });
            }
        }
    }
}
Ch5Spinner.ELEMENT_NAME = 'ch5-spinner';
Ch5Spinner.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", stringJoin: 1, contractName: true }, receivestatesize: { direction: "state", numericJoin: 1, contractName: true }, receivestatelabel: { direction: "state", stringJoin: 1, contractName: true }, receivestateurl: { direction: "state", stringJoin: 1, contractName: true }, sendeventonchange: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonfocus: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonoverflow: { direction: "event", booleanJoin: 1, contractName: true }, sendEventonunderflow: { direction: "event", booleanJoin: 1, contractName: true }, contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 } });
Ch5Spinner.primaryCssClass = 'ch5-spinner';
Ch5Spinner.VISIBLEITEMSCROLL = 3;
Ch5Spinner.SYNCTIMEOUT = 1500;
Ch5Spinner.ITEM_HEIGHT_WHEN_EMPTY = '33';
Ch5Spinner.ICONPOSITIONS = ['first', 'last'];
Ch5Spinner.FEEDBACKMODES = ['direct', 'submit'];
Ch5Spinner.COMPONENT_DATA = {
    ICON_POSITIONS: {
        default: Ch5Spinner.ICONPOSITIONS[0],
        values: Ch5Spinner.ICONPOSITIONS,
        key: 'icon_position',
        classListPrefix: '--'
    },
    FEEDBACK_MODES: {
        default: Ch5Spinner.FEEDBACKMODES[0],
        values: Ch5Spinner.FEEDBACKMODES,
        key: 'feedback_modes',
        classListPrefix: '--'
    },
};
Ch5Spinner.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "autoSetItemHeight",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
];
Ch5Spinner.MAX_SIZE = 30;
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5Spinner.ELEMENT_NAME, Ch5Spinner);
}
Ch5Spinner.registerSignalAttributeTypes();
Ch5Spinner.registerSignalAttributeDefaults();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNwaW5uZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc3Bpbm5lci9jaDUtc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFELE9BQU8sWUFBWSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSTVELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHM0QsTUFBTSxPQUFPLFVBQVcsU0FBUSxTQUFTO0lBb0JoQyxNQUFNLEtBQUssa0JBQWtCO1FBRWxDLE1BQU0sd0JBQXdCLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDO1FBRTlELE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RSxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7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QUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDM0k7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbEk7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0g7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbEk7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzVIO1FBRUQsSUFB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