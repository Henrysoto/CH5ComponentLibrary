import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalElementAttributeRegistryEntries } from "../ch5-common/ch5-signal-attribute-registry";
import { ICh5TemplateAttributes } from "./interfaces/i-ch5-template-attributes";
export declare class Ch5Template extends Ch5Common implements ICh5TemplateAttributes {
    static CH5_TEMPLATE_STYLE_CLASS: string;
    static readonly ELEMENT_NAME = "ch5-template";
    static readonly SIGNAL_ATTRIBUTE_TYPES: Ch5SignalElementAttributeRegistryEntries;
    private _templateId;
    private _context;
    private _contractName;
    private _booleanJoinOffset;
    private _numericJoinOffset;
    private _stringJoinOffset;
    private _templateHelper;
    private _refreshSubId;
    static registerSignalAttributeTypes(): void;
    static registerSignalAttributeDefaults(): void;
    static registerCustomElement(): void;
    static get observedAttributes(): string[];
    set templateId(value: string);
    get templateId(): string;
    set context(value: string);
    get context(): string;
    set contractName(value: string);
    get contractName(): string;
    set booleanJoinOffset(value: string);
    get booleanJoinOffset(): string;
    set numericJoinOffset(value: string);
    get numericJoinOffset(): string;
    set stringJoinOffset(value: string);
    get stringJoinOffset(): string;
    connectedCallback(): void;
    private listenForCh5TemplateRefreshRequests;
    private shouldRefresh;
    protected initAttributes(): void;
    private initializations;
    attributeChangedCallback(attr: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
}
