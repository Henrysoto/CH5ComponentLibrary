import "hammerjs";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Config } from "../ch5-common/ch5-config";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import HtmlCallback from "../ch5-common/utils/html-callback";
import { Ch5AugmentVarSignalsNames } from "../ch5-common/ch5-augment-var-signals-names";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { isNil } from "lodash";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5Select extends Ch5Common {
    constructor() {
        super();
        this.primaryCssClass = 'ch5-select';
        this.iconPosition = 'first';
        this.mainPanel = {};
        this.selectedOptionsPanel = {};
        this.selectPanel = {};
        this.comboTrigger = {};
        this.templateVarsData = [];
        this._selectionTimeout = null;
        this._multiselectionTimeout = null;
        this.receiveStateSizeSubscription = '';
        this.receiveStateValueSubscription = '';
        this.receiveStateTemplateVarsSubscription = '';
        this._optionTemplateHTML = '';
        this._lastReceivedSignalValue = -1;
        this._cleanValue = -1;
        this._lastSelectedOptIdx = null;
        this._size = 0;
        this._multiselect = false;
        this._selectedValue = -1;
        this._selectedValues = [];
        this._cleanValues = [];
        this._multiselectedValuesMap = [];
        this._panelScrollHeight = "0px";
        this._minWidth = '';
        this._maxWidth = '';
        this._minHeight = '';
        this._maxHeight = '';
        this._resize = false;
        this._mode = Ch5Select.MODE_VALUES[0];
        this._feedbackMode = Ch5Select.FEEDBACK_MODE_VALUES[0];
        this._signalValueSyncTimeout = Ch5Select.DEFAULT_SIGNAL_VALUE_SYNC_TIMEOUT;
        this._indexId = '';
        this._receiveStateValue = null;
        this._receiveStateSize = null;
        this._receiveStateTemplateVars = null;
        this._sendEventOnFocus = null;
        this._sendEventOnChange = null;
        this._dirty = false;
        this._ondirtyCallback = {};
        this._oncleanCallback = {};
        this._noneSelectedPrompt = Ch5Select.PLACEHOLDER_DEFAULT;
        this._comboTriggerHammer = null;
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._handleSelectPanelToggle = this._handleSelectPanelToggle.bind(this);
        this._handleOptionSelected = this._handleOptionSelected.bind(this);
        this.closeSelectPanel = this.closeSelectPanel.bind(this);
        this._wasInstatiated = false;
    }
    static registerSignalAttributeDefaults() {
        Ch5SignalAttributeRegistry.instance.addElementDefaultAttributeEntries(Ch5Select.ELEMENT_NAME, {
            contractName: { attributes: ["contractname"], defaultValue: "" },
            booleanJoin: { attributes: ["booleanjoinoffset"], defaultValue: "0" },
            numericJoin: { attributes: ["numericjoinoffset"], defaultValue: "0" },
            stringJoin: { attributes: ["stringjoinoffset"], defaultValue: "0" }
        });
    }
    set ondirtyCallback(callback) {
        if (callback === undefined || callback === null) {
            callback = {};
        }
        this._ondirtyCallback = callback;
    }
    get ondirtyCallback() {
        return this._ondirtyCallback;
    }
    set ondirty(callback) {
        this.ondirtyCallback = callback;
    }
    get ondirty() {
        return this.ondirtyCallback;
    }
    set oncleanCallback(callback) {
        if (callback === undefined || callback === null) {
            callback = {};
        }
        this._oncleanCallback = callback;
    }
    get oncleanCallback() {
        return this._oncleanCallback;
    }
    set onclean(callback) {
        this.oncleanCallback = callback;
    }
    get onclean() {
        return this.oncleanCallback;
    }
    connectedCallback() {
        const setup = () => {
            this.info('connectedCallback()');
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', Ch5RoleAttributeMapping.ch5Select);
            }
            this.setAttribute('data-ch5-id', this.getCrId());
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', Ch5RoleAttributeMapping.ch5Spinner);
            }
            if (!this.hasAttribute('tabindex')) {
                this.setAttribute('tabindex', '0');
            }
            this._initOptionTemplate();
            if (this._optionTemplateHTML === '') {
                this.info('add mutation observer in order to extract template data');
                this._startReadyObserver();
            }
            else {
                this.info('connectedCallback initializations');
                this.initializations();
            }
            this.initCommonMutationObserver(this);
            this.info("Callback loaded - ch5-select");
            this._wasInstatiated = true;
        };
        Promise.all([
            customElements.whenDefined('ch5-select')
        ]).then(setup);
    }
    disconnectedCallback() {
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
    }
    unsubscribeFromSignals() {
        this.info('unsubscribeFromSignal()');
        super.unsubscribeFromSignals();
        this.clearStringSignalSubscription(this._receiveStateSize, this.receiveStateSizeSubscription);
        this._receiveStateSize = '';
        this.clearStringSignalSubscription(this._receiveStateTemplateVars, this.receiveStateTemplateVarsSubscription);
        this._receiveStateTemplateVars = '';
        this.clearStringSignalSubscription(this._receiveStateValue, this.receiveStateValueSubscription);
        this._receiveStateValue = '';
    }
    initializations() {
        this._addMainClass();
        this._updateModeClass();
        this.initAttributes();
        if (!this.multiselect) {
            this._cleanValue = this.selectedValue;
        }
        else {
            this._cleanValues = this.selectedValues.slice(0);
        }
        this._createMainPanel();
        this.templateVarsData = this._getTemplateVarsFromDefaultConfig();
        this.selectedOptionsPanel.innerHTML = this.noneSelectedPrompt;
        this._updateCh5SelectDimensions();
        this.shouldComputeDropdownHeight();
        this._createSelectPanel();
        this.attachEventListeners();
    }
    shouldComputeDropdownHeight() {
        if (this.panelScrollHeight.toString().includes('%') && !isNil(this.parentElement) &&
            this.parentElement.offsetHeight > 0) {
            const panelScrollHeightPercentage = parseInt(this.panelScrollHeight, 10);
            if (panelScrollHeightPercentage > 0) {
                this.panelScrollHeight = `${(this.parentElement.offsetHeight / 100) * panelScrollHeightPercentage}px`;
            }
            else {
                this.panelScrollHeight = '';
            }
        }
    }
    _initOptionTemplate() {
        if (this._optionTemplateHTML !== '' || this._wasInstatiated === true) {
            return;
        }
        const optionTemplate = this.getElementsByTagName('template')[0];
        if (optionTemplate && optionTemplate.innerHTML && optionTemplate.innerHTML.length > 0) {
            this.info('optionTemplate.innerHtml ', optionTemplate.innerHTML);
            this._validateTmplFirstElAsCh5SelectOption(optionTemplate.content);
            this._optionTemplateHTML = optionTemplate.innerHTML.trim();
            optionTemplate.remove();
        }
        else if (optionTemplate && optionTemplate.firstElementChild &&
            optionTemplate.firstElementChild.outerHTML && optionTemplate.firstElementChild.outerHTML.length > 0) {
            this.info('optionTemplate.firstElementChild.outerHTML ', optionTemplate.firstElementChild.outerHTML);
            this._validateTmplFirstElAsCh5SelectOption(optionTemplate);
            this._optionTemplateHTML = optionTemplate.firstElementChild.outerHTML.trim();
            optionTemplate.remove();
        }
    }
    _startReadyObserver() {
        if (this.querySelector('.' + Ch5Select.MAIN_PANEL_STYLE_CLASS)) {
            this.mainPanel = this.querySelector('.' + Ch5Select.MAIN_PANEL_STYLE_CLASS);
            this.selectedOptionsPanel = this.querySelector('.' + Ch5Select.SELECTED_ITEMS_STYLE_CLASS);
            this.selectPanel = this.querySelector('.' + Ch5Select.PANEL_ITEMS_STYLE_CLASS);
            this.attachEventListeners();
            return;
        }
        const templateNodeName = 'template';
        const observer = new MutationObserver((mutations) => {
            this.info('mutationObserver Callback');
            mutations.forEach((mutation) => {
                this.info('mutation', mutation);
                if ((mutation.type !== 'childList') || !mutation.addedNodes) {
                    return;
                }
                if (mutation.addedNodes.length > 0) {
                    let templateElement = null;
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        if (mutation.addedNodes[i].nodeName.toLowerCase() === templateNodeName) {
                            templateElement = mutation.addedNodes[i];
                            break;
                        }
                    }
                    if (null !== templateElement) {
                        this.info('templateElement innerhtml', templateElement.innerHTML);
                        this._validateTmplFirstElAsCh5SelectOption(templateElement);
                        let tplHtml = templateElement.innerHTML;
                        if (tplHtml.trim() === '') {
                            tplHtml = templateElement.firstElementChild.outerHTML;
                            this._optionTemplateHTML = tplHtml;
                            this.initializations();
                            observer.disconnect();
                            templateElement.remove();
                        }
                    }
                }
            });
        });
        observer.observe(this, { childList: true, subtree: false, attributes: false, characterData: false });
    }
    _validateTmplFirstElAsCh5SelectOption(tmpl) {
        if (tmpl.firstElementChild.nodeName.toLowerCase() !== 'ch5-select-option') {
            throw new Error(`ch5-select, id: ${this.getAttribute('data-ch5-id')}
                - no ch5-select-option provided`);
        }
    }
    _updateCh5SelectDimensions() {
        let styleText = (this._getStyleWidthProps() + this._getStyleHeightProps()).trim();
        if (styleText === '') {
            styleText = this._getCssDimensionsUsingParent(true);
        }
        this.style.cssText += styleText;
        if (this._isValidElement(this.mainPanel)) {
            this.mainPanel.style.cssText = this._getStyleHeightProps();
        }
    }
    _createMainPanel() {
        if (this._wasInstatiated === true) {
            return;
        }
        this.mainPanel = document.createElement('div');
        this.mainPanel.classList.add(Ch5Select.MAIN_PANEL_STYLE_CLASS);
        this.selectedOptionsPanel = document.createElement('div');
        this.selectedOptionsPanel.classList.add(Ch5Select.SELECTED_ITEMS_STYLE_CLASS);
        this.mainPanel.appendChild(this.selectedOptionsPanel);
        this._createComboTrigger();
        this.appendChild(this.mainPanel);
    }
    _createSelectPanel() {
        if (this.selectPanel instanceof HTMLElement) {
            this.selectPanel.remove();
            this.selectPanel = {};
        }
        this.selectPanel = document.createElement('div');
        this.selectPanel.classList.add(Ch5Select.PANEL_ITEMS_STYLE_CLASS);
        this.appendChild(this.selectPanel);
        this._updateSelectPanelScrollHeight();
        this._applyResize();
        this.renderCh5SelectOptions();
    }
    _createComboTrigger() {
        if (this._isPanel() || !this._isValidElement(this.mainPanel)) {
            return;
        }
        this.comboTrigger = document.createElement('span');
        this.comboTrigger.classList.add(Ch5Select.COMBO_TRIGGER_STYLE_CLASS);
        this.comboTrigger.innerHTML = this._getCh5SelectOpenTriggerIcon();
        this.mainPanel.appendChild(this.comboTrigger);
    }
    _handleSelectPanelToggle() {
        if (!this._isOpened()) {
            this.openSelectPanel();
        }
        else {
            this.closeSelectPanel();
        }
    }
    _isOpened() {
        return this.classList.contains(Ch5Select.OPENED_STYLE_CLASS);
    }
    openSelectPanel() {
        if (this.classList.contains(Ch5Select.SELECTION_IN_PROGRESS_STYLE_CLASS)) {
            return;
        }
        this.classList.add(Ch5Select.OPENED_STYLE_CLASS);
    }
    closeSelectPanel() {
        this.classList.remove(Ch5Select.OPENED_STYLE_CLASS);
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5SelectAttributes = ['size', 'iconposition', 'multiselect', 'selectedvalue',
            'panelscrollheight', 'minwidth', 'maxwidth', 'minheight', 'maxheight', 'resize', 'mode', 'feedbackmode',
            'signalvaluesynctimeout', 'indexid', 'receivestatevalue', 'receivestatesize', 'receivestatetemplatevars',
            'sendeventonfocus', 'sendeventonchange', 'noneselectedprompt', 'ondirty', 'onclean'];
        return commonAttributes.concat(ch5SelectAttributes);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('ch5-select attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')');
        switch (attr) {
            case 'size':
                this.size = this.getAttribute('size') || 1;
                break;
            case 'multiselect':
                this.multiselect = this.hasAttribute('multiselect');
                break;
            case 'selectedvalue':
                this.selectedValue = this.getAttribute('selectedValue') || 0;
                break;
            case 'panelscrollheight':
                this.panelScrollHeight = this.getAttribute('panelScrollHeight') || '';
                break;
            case 'minwidth':
                this.minWidth = this.getAttribute('minWidth') || '';
                break;
            case 'maxwidth':
                this.maxWidth = this.getAttribute('maxWidth') || '';
                break;
            case 'minheight':
                this.minHeight = this.getAttribute('minHeight') || '';
                break;
            case 'maxheight':
                this.maxHeight = this.getAttribute('maxHeight') || '';
                break;
            case 'resize':
                this.resize = this.hasAttribute('resize');
                break;
            case 'mode':
                this.mode = (this.getAttribute('mode') || Ch5Select.MODE_VALUES[0]);
                break;
            case 'feedbackmode':
                this.feedbackMode = (this.getAttribute('feedbackMode') ||
                    Ch5Select.FEEDBACK_MODE_VALUES[0]);
                break;
            case 'signalvaluesynctimeout':
                this.signalValueSyncTimeout = this.getAttribute('signalValueSyncTimeout') ||
                    Ch5Select.DEFAULT_SIGNAL_VALUE_SYNC_TIMEOUT;
                break;
            case 'indexid':
                this.indexId = this.getAttribute('indexId') || '';
                break;
            case 'receivestatevalue':
                this.receiveStateValue = this.getAttribute('receiveStateValue') || '';
                break;
            case 'receivestatesize':
                this.receiveStateSize = this.getAttribute('receiveStateSize') || '';
                break;
            case 'receivestatetemplatevars':
                this.receiveStateTemplateVars = this.getAttribute('receiveStateTemplateVars') || '';
                break;
            case 'sendeventonfocus':
                this.sendEventOnFocus = this.getAttribute('sendEventOnFocus') || '';
                break;
            case 'sendeventonchange':
                this.sendEventOnChange = this.getAttribute('sendEventOnChange') || '';
                break;
            case 'noneselectedprompt':
                this.noneSelectedPrompt = this.getAttribute('noneSelectedPrompt');
                break;
            case 'ondirty':
                this.ondirtyCallback = new HtmlCallback(this, this.getAttribute('ondirty'));
                break;
            case 'onclean':
                this.oncleanCallback = new HtmlCallback(this, this.getAttribute('onclean'));
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
        if (attr === 'dir') {
            this._updateOptionsDirAttr();
        }
    }
    initAttributes() {
        super.initAttributes();
        this.info('initAttributes()');
        if (this.hasAttribute('size')) {
            this.size = this.getAttribute('size');
        }
        this.multiselect = this.hasAttribute('multiselect');
        if (this.hasAttribute('selectedValue')) {
            this.selectedValue = this.getAttribute('selectedValue');
        }
        if (this.hasAttribute('panelScrollHeight')) {
            this.panelScrollHeight = this.getAttribute('panelScrollHeight');
        }
        if (this.hasAttribute('minWidth')) {
            this.minWidth = this.getAttribute('minWidth');
        }
        if (this.hasAttribute('maxWidth')) {
            this.maxWidth = this.getAttribute('maxWidth');
        }
        if (this.hasAttribute('minHeight')) {
            this.minHeight = this.getAttribute('minHeight');
        }
        if (this.hasAttribute('maxHeight')) {
            this.maxHeight = this.getAttribute('maxHeight');
        }
        this.resize = this.hasAttribute('resize');
        if (this.hasAttribute('mode')) {
            this.mode = this.getAttribute('mode');
        }
        if (this.hasAttribute('feedbackMode')) {
            this.feedbackMode = this.getAttribute('feedbackMode');
        }
        if (this.hasAttribute('signalValueSyncTimeout')) {
            this.signalValueSyncTimeout = this.getAttribute('signalValueSyncTimeout');
        }
        if (this.hasAttribute('indexId')) {
            this.indexId = this.getAttribute('indexId');
        }
        if (this.hasAttribute('receiveStateValue')) {
            this.receiveStateValue = this.getAttribute('receiveStateValue');
        }
        if (this.hasAttribute('receiveStateSize')) {
            this.receiveStateSize = this.getAttribute('receiveStateSize');
        }
        if (this.hasAttribute('receiveStateTemplateVars')) {
            this.receiveStateTemplateVars = this.getAttribute('receiveStateTemplateVars');
        }
        if (this.hasAttribute('sendEventOnFocus')) {
            this.sendEventOnFocus = this.getAttribute('sendEventOnFocus');
        }
        if (this.hasAttribute('sendEventOnChange')) {
            this.sendEventOnChange = this.getAttribute('sendEventOnChange');
        }
        if (this.hasAttribute('noneSelectedPrompt')) {
            this.noneSelectedPrompt = this.getAttribute('noneSelectedPrompt');
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this.removeEventListeners();
        this.addEventListener('focus', this._onFocus);
        this.addEventListener('blur', this._onBlur);
        this.addEventListener('option-selected', this._handleOptionSelected);
        if (this._isPlain()) {
            this.addEventListener('blur', this.closeSelectPanel);
            this._comboTriggerHammer = new Hammer.Manager(this.mainPanel);
            this._comboTriggerHammer.add(new Hammer.Tap({ event: 'tap' }));
            this._comboTriggerHammer.on('tap', this._handleSelectPanelToggle);
        }
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.removeEventListener('focus', this._onFocus);
        this.removeEventListener('blur', this._onBlur);
        this.removeEventListener('option-selected', this._handleOptionSelected);
        if (this._isPlain()) {
            if (this._comboTriggerHammer !== null) {
                this._comboTriggerHammer.off('tap', this._handleSelectPanelToggle);
            }
            this.removeEventListener('blur', this.closeSelectPanel);
        }
    }
    set size(value) {
        value = Number(value);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        if (this._size !== value) {
            this._size = value;
            this.setAttribute('size', value.toString());
            this.renderCh5SelectOptions();
        }
    }
    get size() {
        if (this.hasTemplateVars() && this.templateVarsData.length > this._size) {
            return this._size;
        }
        else if (this.hasTemplateVars()) {
            return this.templateVarsData.length;
        }
        else {
            return this._size;
        }
    }
    set multiselect(value) {
        if (this._multiselect !== value) {
            this._multiselect = value;
            if (value === true) {
                this.setAttribute('multiselect', value.toString());
            }
            else {
                this.removeAttribute('multiselect');
            }
        }
    }
    get multiselect() {
        return this._multiselect;
    }
    set selectedValue(value) {
        value = Number(value);
        if (isNaN(value)) {
            value = 0;
        }
        if (this._selectedValue !== value) {
            this._selectedValue = value;
            this.setAttribute('selectedvalue', value.toString());
            this._markOptionAsSelected(this.selectedValue);
            this._updateSingleSelectionInMainPanel();
            if (this.getDirty() === true && this._selectedValue === this._cleanValue) {
                this.dirty = false;
            }
        }
    }
    get selectedValue() {
        return this._selectedValue;
    }
    set selectedValues(selectedValues) {
        if (selectedValues instanceof Array === false) {
            selectedValues = [];
        }
        this._selectedValues = selectedValues;
        this._updateMultiSelectionInMainPanel();
    }
    get selectedValues() {
        return this._selectedValues;
    }
    set panelScrollHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (this._panelScrollHeight !== value) {
            this._panelScrollHeight = value;
            this.setAttribute('panelscrollheight', value.toString());
            this._updateSelectPanelScrollHeight();
        }
    }
    get panelScrollHeight() {
        return this._panelScrollHeight;
    }
    set minWidth(value) {
        value = this._checkAndSetStringValue(value);
        if (this._minWidth !== value) {
            this._minWidth = value;
            this.setAttribute('minwidth', value);
        }
    }
    get minWidth() {
        return this._minWidth;
    }
    set maxWidth(value) {
        value = this._checkAndSetStringValue(value);
        if (this._maxWidth !== value) {
            this._maxWidth = value;
            this.setAttribute('maxwidth', value);
        }
    }
    get maxWidth() {
        return this._maxWidth;
    }
    set minHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (this._minHeight !== value) {
            this._minHeight = value;
            this.setAttribute('minheight', value);
        }
    }
    get minHeight() {
        return this._minHeight;
    }
    set maxHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (this._maxHeight !== value) {
            this._maxHeight = value;
            this.setAttribute('maxheight', value);
        }
    }
    get maxHeight() {
        return this._maxHeight;
    }
    set resize(value) {
        if (this._resize !== value) {
            this._resize = value;
            if (value === true) {
                this.setAttribute('resize', value.toString());
            }
            else {
                this.removeAttribute('resize');
            }
            this._applyResize();
        }
    }
    get resize() {
        return this._resize;
    }
    set mode(value) {
        if (!Ch5Select.MODE_VALUES.some(v => v === value)) {
            value = Ch5Select.MODE_VALUES[0];
        }
        if (this._mode !== value) {
            this._mode = value;
            this.setAttribute('mode', value.toString());
            this._updateModeClass();
        }
    }
    get mode() {
        return this._mode;
    }
    _isPlain() {
        return this.mode === Ch5Select.MODE_VALUES[0];
    }
    _isPanel() {
        return this.mode === Ch5Select.MODE_VALUES[1];
    }
    set feedbackMode(value) {
        if (!Ch5Select.FEEDBACK_MODE_VALUES.some(v => v === value)) {
            value = Ch5Select.FEEDBACK_MODE_VALUES[0];
        }
        if (this._feedbackMode !== value) {
            this._feedbackMode = value;
            this.setAttribute('feedbackmode', value.toString());
        }
    }
    get feedbackMode() {
        return this._feedbackMode;
    }
    set signalValueSyncTimeout(value) {
        value = Number(value);
        if (isNaN(value) || value < 0) {
            value = Ch5Select.DEFAULT_SIGNAL_VALUE_SYNC_TIMEOUT;
        }
        if (this._signalValueSyncTimeout !== value) {
            this._signalValueSyncTimeout = value;
            this.setAttribute('signalvaluesynctimeout', value.toString());
        }
    }
    get signalValueSyncTimeout() {
        return this._signalValueSyncTimeout;
    }
    set indexId(value) {
        value = this._checkAndSetStringValue(value);
        if (this._indexId !== value) {
            this._indexId = value;
            this.setAttribute('indexid', value);
        }
    }
    get indexId() {
        return this._indexId;
    }
    set receiveStateValue(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateValue !== value) {
            this._receiveStateValue = value;
            this.setAttribute('receivestatevalue', value);
            this._handleReceiveSignalValue();
        }
    }
    get receiveStateValue() {
        return this._attributeValueAsString('receivestatevalue');
    }
    set receiveStateSize(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateSize !== value) {
            this._receiveStateSize = value;
            this.setAttribute('receivestatesize', value);
            this._handleReceiveSignalSize();
        }
    }
    get receiveStateSize() {
        return this._attributeValueAsString('receivestatesize');
    }
    set receiveStateTemplateVars(value) {
        value = this._checkAndSetStringValue(value);
        if (this._receiveStateTemplateVars !== value) {
            this._receiveStateTemplateVars = value;
            this.setAttribute('receivestatetemplatevars', value);
            this._handleReceiveSignalTemplateVars();
        }
    }
    get receiveStateTemplateVars() {
        return this._attributeValueAsString('receivestatetemplatevars');
    }
    set sendEventOnFocus(value) {
        value = this._checkAndSetStringValue(value);
        if (this._sendEventOnFocus !== value) {
            this._sendEventOnFocus = value;
            this.setAttribute('sendeventonfocus', value);
        }
    }
    get sendEventOnFocus() {
        return this._sendEventOnFocus;
    }
    set sendEventOnChange(value) {
        value = this._checkAndSetStringValue(value);
        if (this._sendEventOnChange !== value) {
            this._sendEventOnChange = value;
            this.setAttribute('sendeventonchange', value);
        }
    }
    get sendEventOnChange() {
        return this._sendEventOnChange;
    }
    _getStyleWidthProps() {
        const _minWidth = (this.minWidth === null || this.minWidth === '') ? '' : `min-width:${this.minWidth};`;
        const _maxWidth = (this.maxWidth == null || this._maxWidth === '') ? '' : `max-width:${this.maxWidth};`;
        return `${_minWidth} ${_maxWidth}`;
    }
    _getStyleHeightProps() {
        const _minHeight = (this.minHeight === null || this.minHeight === '') ? '' : `min-height:${this.minHeight};`;
        const _maxHeight = (this.maxHeight === null || this.maxHeight === '') ? '' : `max-height:${this.maxHeight};`;
        return `${_minHeight} ${_maxHeight}`;
    }
    _getCh5SelectOpenTriggerIcon() {
        return '<svg role="img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">'
            + '<path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 '
            + '0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';
    }
    _getCssDimensionsUsingParent(onlyWidth) {
        const _parent = this.parentElement;
        if (_parent && this._isValidElement(_parent)) {
            const _parentSize = _parent.getBoundingClientRect();
            let wCss = '';
            if (_parentSize.width > 0) {
                wCss = `min-width: 0; max-width:${_parentSize.width}px;`;
            }
            if (onlyWidth) {
                return wCss;
            }
            let hCss = '';
            if (_parentSize.height > 0) {
                hCss = `min-height: 0; max-height:${_parentSize.height}px;`;
            }
            return wCss + hCss;
        }
        return '';
    }
    _updateSelectPanelScrollHeight() {
        if (this._isValidElement(this.selectPanel)) {
            this.selectPanel.style.maxHeight = (parseFloat(this.panelScrollHeight) > 0) ? this.panelScrollHeight : '';
        }
    }
    _applyResize() {
        const _parent = this.parentElement;
        if (!_parent || !this._isValidElement(this.selectPanel)) {
            return;
        }
        _parent.style.position = 'relative';
        if (this.resize) {
            const _parentSize = _parent.getBoundingClientRect();
            this.selectPanel.style.width = 'auto';
            this.selectPanel.style.maxWidth = `${_parentSize.width}px`;
            const _ch5SelectSize = this.getBoundingClientRect();
            const _left = Math.abs(_parentSize.left - _ch5SelectSize.left);
            this.selectPanel.style.left = `${_left}px`;
        }
        else {
            this.selectPanel.style.removeProperty('width');
            this.selectPanel.style.removeProperty('maxWidth');
            this.selectPanel.style.removeProperty('left');
        }
    }
    _isValidElement(el) {
        return typeof el === 'object' && el instanceof HTMLElement;
    }
    _addMainClass() {
        this.classList.add(Ch5Select.CH5_SELECT_MAIN_STYLE_CLASS);
    }
    _updateModeClass() {
        if (this._isPlain()) {
            this.classList.remove(Ch5Select.MODE_PANEL_STYLE_CLASS);
            this.classList.add(Ch5Select.MODE_COMBO_STYLE_CLASS);
        }
        else {
            this.classList.remove(Ch5Select.MODE_COMBO_STYLE_CLASS);
            this.classList.add(Ch5Select.MODE_PANEL_STYLE_CLASS);
        }
    }
    _getOptionTemplateWithReplacedVars(optHTML, index) {
        const templateVars = this.getOptionTemplateVars(index);
        if (templateVars !== null) {
            Object.keys(templateVars).forEach((k) => {
                const keyToReplace = '{{' + k + '}}';
                const keyValue = templateVars[k];
                optHTML = this.textReplace(optHTML, keyToReplace, keyValue, true);
            });
        }
        return optHTML;
    }
    _getProcessedOptionEl(index) {
        let optHTML = this._optionTemplateHTML;
        if (this.hasTemplateVars()) {
            optHTML = this._getOptionTemplateWithReplacedVars(optHTML, index);
        }
        const documentContainer = document.createElement('template');
        documentContainer.innerHTML = optHTML;
        if (this.indexId !== null) {
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(documentContainer, index, this.indexId);
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(documentContainer, index, this.indexId);
        }
        return documentContainer.content.firstChild;
    }
    getOptionsListSize() {
        const optionsList = this.selectPanel.querySelectorAll('ch5-select-option');
        return optionsList.length;
    }
    buildOptions(startingIndex) {
        startingIndex = typeof startingIndex !== 'undefined' ? startingIndex : 0;
        this.info(`Build ch5-select options starting with index: ${startingIndex}`);
        for (let i = startingIndex; i < this.size; i++) {
            const o = this._getProcessedOptionEl(i);
            const optIdx = i;
            o.setAttribute('data-ch5-opt-idx', String(optIdx));
            o.classList.add(Ch5Select.PANEL_ITEM_STYLE_CLASS);
            o.dir = this.dir;
            this.selectPanel.appendChild(o);
        }
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(this, this.getAttribute("contractname") || '', parseInt(this.getAttribute("booleanjoinoffset") || '0', 10) || 0, parseInt(this.getAttribute("numericJoinOffset") || '0', 10) || 0, parseInt(this.getAttribute("stringJoinOffset") || '0', 10) || 0);
    }
    removeLastOptsFromList(startingIndex, oldOptsNr) {
        for (let i = startingIndex; i < oldOptsNr; i++) {
            const oIdx = i;
            const o = this._getOptionElByIdx(oIdx);
            if (o instanceof HTMLElement) {
                this.info(`Removing ch5-select-option ${oIdx}`);
                o.remove();
            }
        }
    }
    renderCh5SelectOptions() {
        if (!this._isValidElement(this.selectPanel)) {
            return;
        }
        const optionsNr = this.getOptionsListSize();
        if (optionsNr === 0) {
            this.buildOptions();
        }
        else if (this.size < optionsNr) {
            this.removeLastOptsFromList(this.size, optionsNr);
        }
        else if (this.size > optionsNr) {
            this.buildOptions(optionsNr);
        }
        if (!this.multiselect) {
            this._markOptionAsSelected(this.selectedValue);
            this._updateSingleSelectionInMainPanel();
        }
        else {
            this.selectedValues.forEach((optIdx) => {
                const ch5SelectOption = this._getOptionElByIdx(optIdx);
                if (ch5SelectOption) {
                    this._setOptionSelected(ch5SelectOption);
                }
            });
            this._updateMultiSelectionInMainPanel();
        }
    }
    textReplace(fullText, toReplace, replaceWith, replaceGlobal) {
        let result = '';
        if (typeof fullText === 'string' && fullText !== '') {
            if (replaceGlobal === true) {
                result = fullText.replace(new RegExp(toReplace, 'g'), replaceWith);
            }
            else {
                result = fullText.replace(new RegExp(toReplace), replaceWith);
            }
        }
        return result;
    }
    _getTemplateVarsFromDefaultConfig() {
        return Ch5Config.getTemplateVarsForElement(this);
    }
    hasTemplateVars() {
        return this.templateVarsData.length > 0;
    }
    getOptionTemplateVars(index) {
        const tVarsObj = this.templateVarsData[index];
        return (tVarsObj !== null && typeof tVarsObj === 'object' &&
            Object.keys(tVarsObj).length > 0) ? tVarsObj : null;
    }
    _unsubscribeOldSignal(sigName, sigSubsKey, type) {
        let oldSig = null;
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        switch (type) {
            case 'number':
                oldSig = Ch5SignalFactory.getInstance().getNumberSignal(subSigName);
                break;
            case 'string':
                oldSig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
                break;
        }
        if (oldSig !== null && sigSubsKey !== '') {
            oldSig.unsubscribe(sigSubsKey);
            this.receiveStateSizeSubscription = '';
        }
    }
    _handleReceiveSignalSize() {
        if (this.receiveStateSize !== '' && this.receiveStateSizeSubscription !== '') {
            this._unsubscribeOldSignal(this.receiveStateSize, this.receiveStateSizeSubscription, 'number');
            this.receiveStateSizeSubscription = '';
        }
        if (this.receiveStateSize === '' || this.receiveStateSize === null) {
            return;
        }
        const subReceiveStateSignalName = Ch5Signal.getSubscriptionSignalName(this.receiveStateSize);
        const receiveSizeSignal = Ch5SignalFactory.getInstance()
            .getNumberSignal(subReceiveStateSignalName);
        if (receiveSizeSignal !== null) {
            this.receiveStateSizeSubscription = receiveSizeSignal.subscribe((newValue) => {
                const newNrVal = Number(newValue);
                if (!isNaN(newNrVal) && receiveSizeSignal.hasChangedSinceInit()) {
                    this.info(`Received new size signal value: ${newValue}`);
                    this.setAttribute('size', String(newNrVal));
                }
                else {
                    this.info('Ch5Select receiveSizeSignal signal value for ' +
                        this.getAttribute('data-ch5-id') + ' is invalid');
                }
            });
        }
    }
    _handleReceiveSignalTemplateVars() {
        if (this.receiveStateTemplateVars !== '' && this.receiveStateTemplateVarsSubscription !== '') {
            this._unsubscribeOldSignal(this.receiveStateTemplateVars, this.receiveStateTemplateVarsSubscription, 'string');
            this.receiveStateTemplateVarsSubscription = '';
        }
        if (this.receiveStateTemplateVars === '' || this.receiveStateTemplateVars === null) {
            return;
        }
        const subReceiveTmplVarsSignalName = Ch5Signal.getSubscriptionSignalName(this.receiveStateTemplateVars);
        const receiveTmplVarsSignal = Ch5SignalFactory.getInstance()
            .getStringSignal(subReceiveTmplVarsSignalName);
        if (receiveTmplVarsSignal !== null) {
            this.receiveStateTemplateVarsSubscription = receiveTmplVarsSignal.subscribe((newValue) => {
                let newTmplVarsVal = null;
                try {
                    newTmplVarsVal = JSON.parse(newValue);
                }
                catch (e) {
                    this.info('Ch5Select receiveTemplateVarsSignal signal value for ' +
                        this.getAttribute('data-ch5-id') + ' cannot be parsed');
                }
                if (newTmplVarsVal instanceof Array && newTmplVarsVal !== null) {
                    this.templateVarsData = newTmplVarsVal;
                    this.selectPanel.innerHTML = '';
                    this.renderCh5SelectOptions();
                }
                else {
                    this.info('Ch5Select receiveTemplateVarsSignal signal value for ' +
                        this.getAttribute('data-ch5-id') + ' is invalid');
                }
            });
        }
    }
    _setSelectionTimeoutCallback(newSelectedVal) {
        const emptyReceiveSignalValAttr = this.receiveStateValue === '' || this.receiveStateValue === null ||
            typeof this.receiveStateValue === 'undefined' || this.receiveStateValueSubscription === '';
        const receiveSigSelectedIsUsed = this._optionsHaveReceiveSignalSelectedAttr();
        if (emptyReceiveSignalValAttr && !receiveSigSelectedIsUsed) {
            return;
        }
        if (this._selectionTimeout !== null) {
            clearTimeout(this._selectionTimeout);
            this._selectionTimeout = null;
        }
        this.info(`New selection timeout set...`);
        this._selectionTimeout = window.setTimeout(() => {
            const lastReceivedValue = receiveSigSelectedIsUsed ? this._cleanValue : this.lastReceivedSignalValue;
            if (lastReceivedValue !== newSelectedVal) {
                this.setAttribute('selectedValue', String(lastReceivedValue));
                this._fireChangeEvent(lastReceivedValue, newSelectedVal);
                this.info('Selection timeout: selectedValue was updated to the last value received ' +
                    'from receivedSignalValue or receiveStateSelected signals: ' + lastReceivedValue);
                this.dirty = false;
            }
            clearTimeout(this._selectionTimeout);
            this._selectionTimeout = null;
        }, this._signalValueSyncTimeout);
    }
    _handleOptionSelected(e) {
        const setSelected = e.detail.set;
        let newSelectedVal = e.detail.idx;
        if (!this.multiselect) {
            const oldSelectedVal = this.selectedValue;
            if (e.detail.resetDirty) {
                this.dirty = false;
                this._cleanValue = (!setSelected && oldSelectedVal === newSelectedVal) ? 0 : newSelectedVal;
            }
            if (!setSelected) {
                if (oldSelectedVal === newSelectedVal) {
                    newSelectedVal = -1;
                    this._lastSelectedOptIdx = oldSelectedVal;
                }
                else {
                    return;
                }
            }
            if (oldSelectedVal !== newSelectedVal) {
                const ch5SelectOption = this._getOptionElByIdx(setSelected ? newSelectedVal : oldSelectedVal);
                if (ch5SelectOption instanceof HTMLElement) {
                    if (setSelected) {
                        this._markOptionAsSelected(newSelectedVal, ch5SelectOption);
                    }
                    else {
                        this._unsetOptionSelected(ch5SelectOption);
                    }
                    this._closeSelectPanelIfPlain();
                    this.setAttribute('selectedValue', String(newSelectedVal));
                    if (e.detail.resetDirty !== true && newSelectedVal !== this._cleanValue) {
                        this.dirty = true;
                    }
                    this._fireChangeEvent(newSelectedVal, oldSelectedVal);
                    if (!this._hasFeedbackModeSubmit()) {
                        this._setSelectionTimeoutCallback(newSelectedVal);
                        this.sendOnChangeSignal(newSelectedVal);
                    }
                }
            }
            else if (oldSelectedVal === newSelectedVal) {
                this._closeSelectPanelIfPlain();
            }
        }
        else {
            const ch5SelectOption = this._getOptionElByIdx(newSelectedVal);
            const confirmed = e.detail.confirmed || false;
            this._updateMultiselectedValuesMap(setSelected, newSelectedVal, confirmed);
            if (setSelected) {
                this._addToSelectedOptions(newSelectedVal);
                this._setOptionSelected(ch5SelectOption);
            }
            else {
                this._removeFromSelectedOptions(newSelectedVal);
                this._unsetOptionSelected(ch5SelectOption);
            }
            this.dirty = true;
            if (!this._hasFeedbackModeSubmit()) {
                this._setMultiselectionTimeoutCallback();
            }
            if (this._multiselectValuesAreAllConfirmed()) {
                this.info(`Multi-selection confirmed, cancel confirmation timeout fallback...`);
                if (this._multiselectionTimeout !== null) {
                    clearTimeout(this._multiselectionTimeout);
                    this._multiselectionTimeout = null;
                }
                this._multiselectionTimeoutCallback();
            }
        }
    }
    _multiselectValuesAreAllConfirmed() {
        return this._multiselectedValuesMap.every((m) => m.confirmed === true);
    }
    _optionsHaveReceiveSignalSelectedAttr() {
        const tempTmpl = document.createElement('template');
        tempTmpl.innerHTML = this._optionTemplateHTML;
        const optElTmpl = tempTmpl.content.firstChild;
        return optElTmpl !== null && optElTmpl.hasAttribute('receiveStateSelected') &&
            optElTmpl.getAttribute('receiveStateSelected') !== null;
    }
    _setMultiselectionTimeoutCallback() {
        if (!this._optionsHaveReceiveSignalSelectedAttr()) {
            return;
        }
        if (this._multiselectionTimeout !== null) {
            clearTimeout(this._multiselectionTimeout);
            this._multiselectionTimeout = null;
        }
        this.info(`New multi-selection timeout set...`);
        this._multiselectionTimeout = window.setTimeout(() => {
            this._multiselectionTimeoutCallback();
            clearTimeout(this._multiselectionTimeout);
            this._multiselectionTimeout = null;
        }, this._signalValueSyncTimeout);
    }
    _multiselectionTimeoutCallback() {
        const newSelectedVals = this._multiselectedValuesMap.length > 0
            ? this._multiselectedValuesMap.filter((m) => {
                const _isCleanVal = this._isCleanValue(m.idx);
                if ((!_isCleanVal && m.selected && m.confirmed) ||
                    (_isCleanVal && !m.selected && !m.confirmed)) {
                    return m.idx === 0 ? '0' : m.idx;
                }
            }).map((m) => m.idx)
            : [];
        const unselectedCleanVals = this._multiselectedValuesMap.length > 0
            ? this._multiselectedValuesMap.filter((m) => {
                const _isCleanVal = this._isCleanValue(m.idx);
                if ((_isCleanVal || _isCleanVal === 0) && !m.selected && m.confirmed) {
                    return m.idx === 0 ? '0' : m.idx;
                }
            }).map((m) => m.idx)
            : [];
        const prevSelected = this._cleanValues.filter(cVal => newSelectedVals.indexOf(cVal) === -1 && unselectedCleanVals.indexOf(cVal) === -1);
        const newValues = [...newSelectedVals, ...prevSelected].sort((a, b) => a - b);
        this.info('Update multiselect selected values using confirmed values ' +
            'and previous unchanged selected values', newValues);
        this.setValue(newValues);
    }
    _isCleanValue(optionIdx) {
        return this._cleanValues.filter(cVal => cVal === optionIdx)[0];
    }
    _updateMultiselectedValuesMap(setSelected, optionIdx, confirmed) {
        if (typeof optionIdx !== 'number') {
            return;
        }
        const _isCleanVal = this._isCleanValue(optionIdx);
        const mappedSelection = this._multiselectedValuesMap
            .filter(sOpt => sOpt.idx === optionIdx)[0];
        if (this._hasFeedbackModeSubmit() && mappedSelection && !_isCleanVal && !setSelected) {
            this._multiselectedValuesMap = this._multiselectedValuesMap
                .filter(sOpt => sOpt.idx !== optionIdx);
            return;
        }
        if (!mappedSelection) {
            this._multiselectedValuesMap.push({
                idx: optionIdx,
                selected: setSelected,
                confirmed: confirmed
            });
        }
        else {
            mappedSelection.selected = setSelected;
            mappedSelection.confirmed = confirmed;
        }
    }
    _hasFeedbackModeSubmit() {
        return this.feedbackMode === Ch5Select.FEEDBACK_MODE_VALUES[1];
    }
    _fireChangeEvent(newVal, oldVal) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { newValue: newVal, oldValue: oldVal },
            bubbles: true,
            cancelable: false
        }));
    }
    _fireDirtyOrCleanEvent() {
        if (!this._hasFeedbackModeSubmit()) {
            return;
        }
        if (this.dirty) {
            this.dispatchEvent(new CustomEvent('dirty', {
                bubbles: true,
                cancelable: false
            }));
            if (this.ondirtyCallback instanceof HtmlCallback) {
                this.ondirtyCallback.run({});
            }
            else if (this.ondirtyCallback instanceof Function) {
                this.ondirtyCallback();
            }
        }
        else {
            this.dispatchEvent(new CustomEvent('clean', {
                bubbles: true,
                cancelable: false
            }));
            if (this.oncleanCallback instanceof HtmlCallback) {
                this.oncleanCallback.run({});
            }
            else if (this.oncleanCallback instanceof Function) {
                this.oncleanCallback();
            }
        }
    }
    sendOnChangeSignal(selectedIdx) {
        if (!(typeof this.sendEventOnChange === 'string' && this.sendEventOnChange !== '')) {
            return;
        }
        const sigOnChange = Ch5SignalFactory.getInstance()
            .getNumberSignal(this.sendEventOnChange);
        if (sigOnChange !== null) {
            sigOnChange.publish(selectedIdx);
        }
    }
    _markOptionAsSelected(selectedIndex, ch5SelectOption) {
        if (this.multiselect || !this._isValidElement(this.selectPanel)) {
            return;
        }
        const selectedOption = this.querySelector('ch5-select-option.' + Ch5Select.ITEM_SELECTED_STYLE_CLASS);
        this._unsetOptionSelected(selectedOption);
        if (selectedIndex >= 0) {
            if (typeof ch5SelectOption === 'undefined') {
                ch5SelectOption = null;
            }
            const optToMarkAsSelected = (ch5SelectOption !== null) ? ch5SelectOption
                : this._getOptionElByIdx(selectedIndex);
            this._setOptionSelected(optToMarkAsSelected);
        }
    }
    _setOptionSelected(opt) {
        if (opt instanceof HTMLElement &&
            typeof opt.applySelectedStyleClass === 'function') {
            opt.applySelectedStyleClass();
        }
    }
    _unsetOptionSelected(opt) {
        if (opt instanceof HTMLElement &&
            typeof opt.removeSelectedStyleClass === 'function') {
            opt.removeSelectedStyleClass();
        }
    }
    _getOptionElByIdx(idx) {
        return this.querySelector(`ch5-select-option[data-ch5-opt-idx="${idx}"]`);
    }
    _handleReceiveSignalValue() {
        if (this.receiveStateValue !== '' && this.receiveStateValueSubscription !== '') {
            this._unsubscribeOldSignal(this.receiveStateValue, this.receiveStateValueSubscription, 'number');
            this.receiveStateValueSubscription = '';
        }
        if (this.multiselect || this.receiveStateValue === '' || this.receiveStateValue === null) {
            return;
        }
        const subReceiveValueSignalName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
        const receiveValueSignal = Ch5SignalFactory.getInstance()
            .getNumberSignal(subReceiveValueSignalName);
        if (receiveValueSignal !== null) {
            this.receiveStateValueSubscription = receiveValueSignal.subscribe((newValue) => {
                const newNrVal = Number(newValue);
                if (!isNaN(newNrVal) && receiveValueSignal.hasChangedSinceInit()) {
                    this.info(`Received signal value: ${newValue}`);
                    this.lastReceivedSignalValue = newNrVal;
                    if (this._selectionTimeout === null) {
                        const oldSelectedVal = this.selectedValue;
                        this.setAttribute('selectedValue', String(this.lastReceivedSignalValue));
                        this.dirty = false;
                        this._fireChangeEvent(this.lastReceivedSignalValue, oldSelectedVal);
                    }
                    else {
                        if (Number(this.selectedValue) === this.lastReceivedSignalValue) {
                            this.dirty = false;
                        }
                    }
                }
                else {
                    this.info('Ch5Select receiveStateValue signal value for ' +
                        this.getAttribute('data-ch5-id') + ' is invalid');
                }
            });
        }
    }
    _addToSelectedOptions(optionIdx) {
        if (typeof optionIdx !== 'number') {
            return;
        }
        if (this.selectedValues.indexOf(optionIdx) === -1) {
            this.selectedValues.push(optionIdx);
            this.selectedValues.sort((a, b) => a - b);
            this._updateMultiSelectionInMainPanel();
        }
    }
    _removeFromSelectedOptions(optionIdx) {
        if (typeof optionIdx !== 'number') {
            return;
        }
        this.selectedValues = this.selectedValues.filter(o => o !== optionIdx);
    }
    _closeSelectPanelIfPlain() {
        if (this._isPlain()) {
            setTimeout(() => {
                this.closeSelectPanel();
            }, 100);
        }
    }
    submit() {
        if (!(this._hasFeedbackModeSubmit() && this.getDirty())) {
            return;
        }
        if (!this.multiselect) {
            this._setSelectionTimeoutCallback(this.selectedValue);
            this.sendOnChangeSignal(this.selectedValue);
            let optIdxForSendSignalOnClick = this.selectedValue;
            if (optIdxForSendSignalOnClick === 0) {
                if (Number(this._lastSelectedOptIdx) > 0) {
                    optIdxForSendSignalOnClick = this._lastSelectedOptIdx;
                }
            }
            this.info('submit():', optIdxForSendSignalOnClick);
            this._triggerOptSendSignalOnClick(optIdxForSendSignalOnClick);
        }
        else {
            this.info('submit():', this._multiselectedValuesMap);
            this._setMultiselectionTimeoutCallback();
            if (this._multiselectedValuesMap.length > 0) {
                this._multiselectedValuesMap.forEach((opt) => this._triggerOptSendSignalOnClick(opt.idx));
            }
        }
    }
    _triggerOptSendSignalOnClick(optIdx) {
        const ch5SelectOption = this._getOptionElByIdx(optIdx);
        if (ch5SelectOption instanceof HTMLElement) {
            ch5SelectOption.sendClickSignal();
        }
    }
    get dirty() {
        return this._dirty;
    }
    set dirty(isDirty) {
        if (this._dirty !== isDirty) {
            this._dirty = isDirty;
            this._fireDirtyOrCleanEvent();
        }
    }
    getDirty() {
        return this.dirty;
    }
    reset() {
        if (!this._hasFeedbackModeSubmit() && !this.getDirty()) {
            return;
        }
        if (!this.multiselect) {
            this.info('reset() to:', this._cleanValue);
            this.setAttribute('selectedValue', String(this._cleanValue));
            this.dirty = false;
            this._fireChangeEvent(this.lastReceivedSignalValue, this.selectedValue);
        }
        else {
            this.info('reset() to:', this._cleanValues);
            this.setValue(this._cleanValues);
        }
    }
    setValue(value) {
        this.info('setValue() to:', value);
        if (!this.multiselect) {
            const oldVal = this.selectedValue;
            this.lastReceivedSignalValue = value;
            this.dirty = false;
            this.setAttribute('selectedValue', String(value));
            this._fireChangeEvent(value, oldVal);
        }
        else {
            const optsToUnselect = this.selectedValues.filter((sVal) => value.indexOf(sVal) === -1);
            if (optsToUnselect.length > 0) {
                optsToUnselect.forEach((optIdx) => {
                    const optUnselected = this._getOptionElByIdx(optIdx);
                    this._removeFromSelectedOptions(optIdx);
                    this._unsetOptionSelected(optUnselected);
                    if (optUnselected !== null && optUnselected.defaultTmplIsUsed()) {
                        optUnselected.setToggleValue(false);
                    }
                });
            }
            const newOptsToSelect = value.filter((sVal) => this.selectedValues.indexOf(sVal) === -1);
            if (newOptsToSelect.length > 0) {
                newOptsToSelect.forEach((optIdx) => {
                    const ch5SelectOption = this._getOptionElByIdx(optIdx);
                    this._addToSelectedOptions(optIdx);
                    this._setOptionSelected(ch5SelectOption);
                    if (ch5SelectOption !== null && ch5SelectOption.defaultTmplIsUsed()) {
                        ch5SelectOption.setToggleValue(true);
                    }
                });
            }
            this.dirty = false;
            this._multiselectedValuesMap = [];
            this._cleanValues = this.selectedValues.slice(0);
        }
    }
    getValue() {
        if (!this.multiselect) {
            this.info('getValue():', this.selectedValue);
            return this.selectedValue;
        }
        else {
            this.info('getValue():', this.selectedValues);
            return this.selectedValues;
        }
    }
    get lastReceivedSignalValue() {
        return this._lastReceivedSignalValue;
    }
    set lastReceivedSignalValue(val) {
        if (this._lastReceivedSignalValue !== val) {
            this._lastReceivedSignalValue = val;
            this._cleanValue = val;
        }
    }
    _updateSingleSelectionInMainPanel() {
        const ch5SelectOption = this._getOptionElByIdx(this.selectedValue);
        if (ch5SelectOption instanceof HTMLElement) {
            this.selectedOptionsPanel.innerHTML = ch5SelectOption.innerHTML;
            this._setSelectedClass(true);
        }
        else {
            this.selectedOptionsPanel.innerHTML = this.noneSelectedPrompt;
            this._setSelectedClass(false);
        }
    }
    get noneSelectedPrompt() {
        return this._getTranslatedValue('noneSelectedPrompt', this._noneSelectedPrompt) || this._noneSelectedPrompt;
    }
    set noneSelectedPrompt(value) {
        value = this._checkAndSetStringValue(value, Ch5Select.PLACEHOLDER_DEFAULT);
        const trValue = this._getTranslatedValue('noneSelectedPrompt', value);
        if (trValue === this._noneSelectedPrompt) {
            return;
        }
        this.setAttribute('noneSelectedPrompt', trValue);
        this._noneSelectedPrompt = value;
        if ((!this.multiselect && this.selectedValue === -1) ||
            (this.multiselect && this.selectedValues.length === 0)) {
            this.selectedOptionsPanel.innerHTML = trValue;
        }
    }
    _updateMultiSelectionInMainPanel() {
        if (this.selectedValues.length > 0) {
            const labels = [];
            this.selectedValues.forEach((optIdx) => {
                const ch5SelectOption = this._getOptionElByIdx(optIdx);
                if (ch5SelectOption instanceof HTMLElement) {
                    labels.push(ch5SelectOption.innerHTML);
                }
            });
            const labelsStr = labels.join(', ');
            const selectedOptionsPanelSize = this.selectedOptionsPanel.getBoundingClientRect();
            const labelsEl = document.createElement('span');
            labelsEl.style.position = 'absolute';
            labelsEl.style.visibility = 'hidden';
            labelsEl.style.fontSize = window.getComputedStyle(this.mainPanel).fontSize;
            labelsEl.textContent = labelsStr;
            this.appendChild(labelsEl);
            const labelsElSize = labelsEl.getBoundingClientRect();
            if (labelsElSize.width <= selectedOptionsPanelSize.width) {
                this.selectedOptionsPanel.innerHTML = labelsStr;
            }
            else {
                this.selectedOptionsPanel.innerHTML = `${this.selectedValues.length} items selected`;
            }
            this.removeChild(labelsEl);
            this._setSelectedClass(true);
        }
        else {
            this.selectedOptionsPanel.innerHTML = this.noneSelectedPrompt;
            this._setSelectedClass(false);
        }
    }
    _isFocused() {
        return this.hasAttribute('focused');
    }
    _onFocus(e) {
        if (this._isFocused()) {
            e.stopImmediatePropagation();
            return;
        }
        this.info('Ch5Select._onFocus()');
        this.setAttribute('focused', '');
        this._sendFocusSignal(true);
        const clonedEvent = new Event(e.type, e);
        this.dispatchEvent(clonedEvent);
        e.preventDefault();
        e.stopPropagation();
    }
    _onBlur(e) {
        if (!this._isFocused()) {
            e.stopImmediatePropagation();
            return;
        }
        this.info('Ch5Select._onBlur()');
        this.removeAttribute('focused');
        this._sendFocusSignal(false);
        const clonedEvent = new Event(e.type, e);
        this.dispatchEvent(clonedEvent);
        e.preventDefault();
        e.stopPropagation();
    }
    _sendFocusSignal(focus) {
        const hasOnFocusSignal = typeof this.sendEventOnFocus === 'string' && this.sendEventOnFocus !== '';
        if (!hasOnFocusSignal) {
            return;
        }
        const focusSig = Ch5SignalFactory.getInstance()
            .getBooleanSignal(this.sendEventOnFocus);
        if (focusSig !== null) {
            focusSig.publish(focus);
        }
    }
    getCssClassDisabled() {
        return `${this.primaryCssClass}--disabled`;
    }
    _setSelectedClass(set) {
        if (set) {
            this.classList.add('ch5-select—selected');
        }
        else {
            this.classList.remove('ch5-select—selected');
        }
    }
    _updateOptionsDirAttr() {
        if (!this._isValidElement(this.selectPanel)) {
            return;
        }
        const opts = this.selectPanel.querySelectorAll('.' + Ch5Select.PANEL_ITEM_STYLE_CLASS);
        if (opts.length === 0) {
            return;
        }
        for (let i = 0; i < opts.length; i++) {
            opts[i].dir = this.dir;
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Select.ELEMENT_NAME, Ch5Select.SIGNAL_ATTRIBUTE_TYPES);
    }
}
Ch5Select.ELEMENT_NAME = 'ch5-select';
Ch5Select.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatevalue: { direction: "state", stringJoin: 1, contractName: true }, receivestatesize: { direction: "state", numericJoin: 1, contractName: true }, receivestatetemplatevars: { direction: "state", stringJoin: 1, contractName: true }, sendeventonfocus: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonchange: { direction: "event", booleanJoin: 1, contractName: true }, contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 } });
Ch5Select.MAX_SIZE = 30;
Ch5Select.MODE_VALUES = ['plain', 'panel'];
Ch5Select.FEEDBACK_MODE_VALUES = ['direct', 'submit'];
Ch5Select.COMPONENT_DATA = {
    MODE_VALUES: {
        default: Ch5Select.MODE_VALUES[0],
        values: Ch5Select.MODE_VALUES,
        key: 'mode_values',
        classListPrefix: '--'
    },
    FEEDBACK_MODE_VALUES: {
        default: Ch5Select.FEEDBACK_MODE_VALUES[0],
        values: Ch5Select.FEEDBACK_MODE_VALUES,
        key: 'feedback_mode_values',
        classListPrefix: '--'
    },
};
Ch5Select.DEFAULT_SIGNAL_VALUE_SYNC_TIMEOUT = 1500;
Ch5Select.PLACEHOLDER_DEFAULT = '';
Ch5Select.CH5_SELECT_MAIN_STYLE_CLASS = 'ch5-select';
Ch5Select.OPENED_STYLE_CLASS = 'ch5-select__panel-open';
Ch5Select.MAIN_PANEL_STYLE_CLASS = 'ch5-select__main';
Ch5Select.SELECTED_ITEMS_STYLE_CLASS = 'ch5-select__selected_items';
Ch5Select.MODE_PANEL_STYLE_CLASS = 'ch5-select__panel';
Ch5Select.MODE_COMBO_STYLE_CLASS = 'ch5-select__combo';
Ch5Select.PANEL_ITEMS_STYLE_CLASS = 'ch5-select__panel__items';
Ch5Select.COMBO_TRIGGER_STYLE_CLASS = 'ch5-select__combo_trigger';
Ch5Select.PANEL_ITEM_STYLE_CLASS = 'ch5-select__panel__item';
Ch5Select.SELECTION_IN_PROGRESS_STYLE_CLASS = 'ch5-select__selection-in-progress';
Ch5Select.ITEM_SELECTED_STYLE_CLASS = 'ch5-select__panel__item--selected';
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5Select.ELEMENT_NAME, Ch5Select);
}
Ch5Select.registerSignalAttributeTypes();
Ch5Select.registerSignalAttributeDefaults();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1zZWxlY3QvY2g1LXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFELE9BQU8sWUFBWSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHL0IsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBRW5JLE1BQU0sT0FBTyxTQUFVLFNBQVEsU0FBUztJQTJPdkM7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQXJMRixvQkFBZSxHQUFHLFlBQVksQ0FBQztRQU0vQixpQkFBWSxHQUEyQixPQUFPLENBQUM7UUFDL0MsY0FBUyxHQUFnQixFQUFpQixDQUFDO1FBQzNDLHlCQUFvQixHQUFnQixFQUFpQixDQUFDO1FBQ3RELGdCQUFXLEdBQWdCLEVBQWlCLENBQUM7UUFDN0MsaUJBQVksR0FBZ0IsRUFBaUIsQ0FBQztRQUM5QyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDaEMsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN4QywyQkFBc0IsR0FBa0IsSUFBSSxDQUFDO1FBQzdDLGlDQUE0QixHQUFXLEVBQUUsQ0FBQztRQUMxQyxrQ0FBNkIsR0FBVyxFQUFFLENBQUM7UUFDM0MseUNBQW9DLEdBQVcsRUFBRSxDQUFDO1FBRWpELHdCQUFt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