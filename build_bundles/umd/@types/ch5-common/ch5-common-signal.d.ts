import { Ch5Signal } from "../ch5-core/ch5-signal";
export interface ICh5CommonSignalInfo {
    signalName: string;
    signalValue: string;
    signalState: string;
    currentValue: any;
}
export declare class Ch5CommonSignal {
    private signals;
    constructor(signalsForCh5Button: string[]);
    setSignal(signalName: string, signalValue: string): Ch5Signal<string> | null;
    getSignal(signalName: string): ICh5CommonSignalInfo;
    setVariable(attributeName: string, attributeValue: string): void;
    getVariable<T>(attributeName: string): T;
    unsubscribeAll(): void;
}
