import { Ch5Common } from "../ch5-common/ch5-common";
import { ICh5JoinToTextBooleanAttributes } from "./interfaces";
import { Ch5SignalElementAttributeRegistryEntries } from "../ch5-common/ch5-signal-attribute-registry";
import { ICh5PropertySettings } from "../ch5-core/ch5-property";
export declare class Ch5JoinToTextBoolean extends Ch5Common implements ICh5JoinToTextBooleanAttributes {
    static readonly SIGNAL_ATTRIBUTE_TYPES: Ch5SignalElementAttributeRegistryEntries;
    static readonly COMPONENT_PROPERTIES: ICh5PropertySettings[];
    static readonly ELEMENT_NAME = "ch5-jointotext-boolean";
    private _ch5Properties;
    set value(value: boolean);
    get value(): boolean;
    set textWhenTrue(value: string);
    get textWhenTrue(): string;
    set textWhenFalse(value: string);
    get textWhenFalse(): string;
    set receiveStateValue(value: string);
    get receiveStateValue(): string;
    static registerSignalAttributeTypes(): void;
    static registerCustomElement(): void;
    constructor();
    static get observedAttributes(): string[];
    connectedCallback(): void;
    protected initAttributes(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attr: string, oldValue: string, newValue: string): void;
    private toggleText;
}
