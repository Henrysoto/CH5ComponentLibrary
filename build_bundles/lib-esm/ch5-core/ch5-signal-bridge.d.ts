import { TSignalStandardTypeName, TRepeatDigitalSignalValue } from './types/core';
export declare class Ch5SignalBridge {
    static readonly REPEAT_DIGITAL_KEY: string;
    private _subscriptions;
    private _localPublishers;
    private _isWebView;
    private _isWebKit;
    constructor();
    subscribe(signalName: string, type: TSignalStandardTypeName): void;
    unsubscribe(signalName: string, type: string): void;
    publish(signalName: string, value: boolean | number | string | object | TRepeatDigitalSignalValue): void;
    private sendBooleanToNative;
    private sendIntegerToNative;
    private sendStringToNative;
    private sendObjectToNative;
    private _isWebXPanel;
    private createPMParam;
}
