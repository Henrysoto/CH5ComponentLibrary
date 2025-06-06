import "hammerjs";
import { Ch5Common } from "../ch5-common/ch5-common";
import HtmlCallback from "../ch5-common/utils/html-callback";
import { TCh5CommonInputFeedbackModes } from "../ch5-common-input/interfaces/t-ch5-common-input";
import { ICh5SelectAttributes, TCh5SelectMode, TCh5SelectIconPosition } from "./interfaces";
import { Ch5SignalElementAttributeRegistryEntries } from '../ch5-common/ch5-signal-attribute-registry';
export declare class Ch5Select extends Ch5Common implements ICh5SelectAttributes {
    static readonly ELEMENT_NAME = "ch5-select";
    static readonly SIGNAL_ATTRIBUTE_TYPES: Ch5SignalElementAttributeRegistryEntries;
    static MAX_SIZE: number;
    static MODE_VALUES: TCh5SelectMode[];
    static FEEDBACK_MODE_VALUES: TCh5CommonInputFeedbackModes[];
    static readonly COMPONENT_DATA: any;
    static DEFAULT_SIGNAL_VALUE_SYNC_TIMEOUT: number;
    static PLACEHOLDER_DEFAULT: string;
    static CH5_SELECT_MAIN_STYLE_CLASS: string;
    static OPENED_STYLE_CLASS: string;
    static MAIN_PANEL_STYLE_CLASS: string;
    static SELECTED_ITEMS_STYLE_CLASS: string;
    static MODE_PANEL_STYLE_CLASS: string;
    static MODE_COMBO_STYLE_CLASS: string;
    static PANEL_ITEMS_STYLE_CLASS: string;
    static COMBO_TRIGGER_STYLE_CLASS: string;
    static PANEL_ITEM_STYLE_CLASS: string;
    static SELECTION_IN_PROGRESS_STYLE_CLASS: string;
    static ITEM_SELECTED_STYLE_CLASS: string;
    primaryCssClass: string;
    iconPosition: TCh5SelectIconPosition;
    mainPanel: HTMLElement;
    selectedOptionsPanel: HTMLElement;
    selectPanel: HTMLElement;
    comboTrigger: HTMLElement;
    templateVarsData: object[];
    _selectionTimeout: number | null;
    _multiselectionTimeout: number | null;
    receiveStateSizeSubscription: string;
    receiveStateValueSubscription: string;
    receiveStateTemplateVarsSubscription: string;
    private _optionTemplateHTML;
    private _lastReceivedSignalValue;
    private _cleanValue;
    private _lastSelectedOptIdx;
    private _size;
    private _multiselect;
    private _selectedValue;
    private _selectedValues;
    private _cleanValues;
    private _multiselectedValuesMap;
    private _panelScrollHeight;
    private _minWidth;
    private _maxWidth;
    private _minHeight;
    private _maxHeight;
    private _resize;
    private _mode;
    private _feedbackMode;
    private _signalValueSyncTimeout;
    private _indexId;
    private _receiveStateValue;
    private _receiveStateSize;
    private _receiveStateTemplateVars;
    private _sendEventOnFocus;
    private _sendEventOnChange;
    private _dirty;
    private _ondirtyCallback;
    private _oncleanCallback;
    private _noneSelectedPrompt;
    private _comboTriggerHammer;
    constructor();
    static registerSignalAttributeDefaults(): void;
    set ondirtyCallback(callback: HtmlCallback | {});
    get ondirtyCallback(): HtmlCallback | {};
    set ondirty(callback: {});
    get ondirty(): {};
    set oncleanCallback(callback: HtmlCallback | {});
    get oncleanCallback(): HtmlCallback | {};
    set onclean(callback: {});
    get onclean(): {};
    connectedCallback(): void;
    disconnectedCallback(): void;
    unsubscribeFromSignals(): void;
    private initializations;
    private shouldComputeDropdownHeight;
    private _initOptionTemplate;
    private _startReadyObserver;
    private _validateTmplFirstElAsCh5SelectOption;
    private _updateCh5SelectDimensions;
    private _createMainPanel;
    private _createSelectPanel;
    private _createComboTrigger;
    private _handleSelectPanelToggle;
    private _isOpened;
    openSelectPanel(): void;
    closeSelectPanel(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(attr: string, oldValue: string, newValue: string): void;
    protected initAttributes(): void;
    protected attachEventListeners(): void;
    protected removeEventListeners(): void;
    set size(value: string | number);
    get size(): number;
    set multiselect(value: boolean);
    get multiselect(): boolean;
    set selectedValue(value: string | number);
    get selectedValue(): string | number;
    set selectedValues(selectedValues: number[]);
    get selectedValues(): number[];
    set panelScrollHeight(value: any);
    get panelScrollHeight(): any;
    set minWidth(value: string | null);
    get minWidth(): string | null;
    set maxWidth(value: string | null);
    get maxWidth(): string | null;
    set minHeight(value: string | null);
    get minHeight(): string | null;
    set maxHeight(value: string | null);
    get maxHeight(): string | null;
    set resize(value: boolean);
    get resize(): boolean;
    set mode(value: TCh5SelectMode);
    get mode(): TCh5SelectMode;
    private _isPlain;
    private _isPanel;
    set feedbackMode(value: TCh5CommonInputFeedbackModes);
    get feedbackMode(): TCh5CommonInputFeedbackModes;
    set signalValueSyncTimeout(value: string | number);
    get signalValueSyncTimeout(): string | number;
    set indexId(value: string | null);
    get indexId(): string | null;
    set receiveStateValue(value: string | null);
    get receiveStateValue(): string | null;
    set receiveStateSize(value: string | null);
    get receiveStateSize(): string | null;
    set receiveStateTemplateVars(value: string | null);
    get receiveStateTemplateVars(): string | null;
    set sendEventOnFocus(value: string | null);
    get sendEventOnFocus(): string | null;
    set sendEventOnChange(value: string | null);
    get sendEventOnChange(): string | null;
    private _getStyleWidthProps;
    private _getStyleHeightProps;
    private _getCh5SelectOpenTriggerIcon;
    private _getCssDimensionsUsingParent;
    private _updateSelectPanelScrollHeight;
    private _applyResize;
    private _isValidElement;
    private _addMainClass;
    private _updateModeClass;
    private _getOptionTemplateWithReplacedVars;
    private _getProcessedOptionEl;
    getOptionsListSize(): number;
    buildOptions(startingIndex?: number): void;
    removeLastOptsFromList(startingIndex: number, oldOptsNr: number): void;
    renderCh5SelectOptions(): void;
    textReplace(fullText: string, toReplace: string, replaceWith: string, replaceGlobal: boolean): string;
    private _getTemplateVarsFromDefaultConfig;
    protected hasTemplateVars(): boolean;
    protected getOptionTemplateVars(index: number): object | null;
    private _unsubscribeOldSignal;
    private _handleReceiveSignalSize;
    private _handleReceiveSignalTemplateVars;
    private _setSelectionTimeoutCallback;
    private _handleOptionSelected;
    private _multiselectValuesAreAllConfirmed;
    private _optionsHaveReceiveSignalSelectedAttr;
    private _setMultiselectionTimeoutCallback;
    private _multiselectionTimeoutCallback;
    private _isCleanValue;
    private _updateMultiselectedValuesMap;
    private _hasFeedbackModeSubmit;
    private _fireChangeEvent;
    private _fireDirtyOrCleanEvent;
    private sendOnChangeSignal;
    private _markOptionAsSelected;
    private _setOptionSelected;
    private _unsetOptionSelected;
    private _getOptionElByIdx;
    private _handleReceiveSignalValue;
    private _addToSelectedOptions;
    private _removeFromSelectedOptions;
    private _closeSelectPanelIfPlain;
    submit(): void;
    private _triggerOptSendSignalOnClick;
    get dirty(): boolean;
    set dirty(isDirty: boolean);
    getDirty(): boolean;
    reset(): void;
    setValue(value: number | number[]): void;
    getValue(): number | number[];
    get lastReceivedSignalValue(): number;
    set lastReceivedSignalValue(val: number);
    private _updateSingleSelectionInMainPanel;
    get noneSelectedPrompt(): string | null;
    set noneSelectedPrompt(value: string | null);
    private _updateMultiSelectionInMainPanel;
    private _isFocused;
    private _onFocus;
    private _onBlur;
    private _sendFocusSignal;
    getCssClassDisabled(): string;
    private _setSelectedClass;
    private _updateOptionsDirAttr;
    static registerSignalAttributeTypes(): void;
}
