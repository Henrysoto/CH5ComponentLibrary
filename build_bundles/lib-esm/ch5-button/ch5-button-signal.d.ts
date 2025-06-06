import { Ch5Signal } from "../ch5-core/ch5-signal";
export interface ICh5ButtonSignalDetails {
    signalName: string;
    signalValue: string;
    signalState: string;
    currentValue: any;
}
export declare class Ch5ButtonSignal {
    private signals;
    constructor();
    setSignal(signalName: string, signalValue: string): Ch5Signal<string> | null;
    getSignal(signalName: string): ICh5ButtonSignalDetails;
    setVariable(attributeName: string, attributeValue: string): void;
    getVariable<T>(attributeName: string): T;
    unsubscribeAll(): void;
}
