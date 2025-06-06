import { ICh5StatesAtDefaultValueModel } from "./models/ch5-states-at-default-value-model";
import { ICh5ExcludePrefixesModel } from "./models/ch5-exclude-prefixes-model";
import { ICh5ClearRangeDataModel } from "./models/ch5-clear-range-data-model";
export declare class Ch5Resync {
    private static _instance;
    private static START_OF_UPDATE_TIME_LIMIT;
    _statesAtDefaultValue: ICh5StatesAtDefaultValueModel;
    private readonly statesRef;
    private ch5SignalFactory;
    private LOG_KEY;
    private startOfUpdateTimer;
    private startOfUpdateCounter;
    static checkIfStateShouldBeIncluded(excludeStatesWithThesePrefixes: ICh5ExcludePrefixesModel, state: string): boolean;
    static get Instance(): Ch5Resync;
    private constructor();
    onReceiveStartOfUpdate(excludeStatesWithThesePrefixes: ICh5ExcludePrefixesModel): void;
    onReceiveStartOfUpdateRange(startOfUpdateMsg: string, statesToReset: ICh5ClearRangeDataModel): void;
    onReceiveUpdatedState(stateName: string, value: any, type: any): void;
    onReceiveEndOfUpdate(): void;
    private resetRemainingStates;
    addDefaultJoinsOnClearRange(joinLow: number, joinHigh: number, eventType: string): void;
    addDefaultStatesOnClearRange(states: string[], eventType: string): void;
    setDefaultStatesOnStartOfUpdate(excludeStatesWithThesePrefixes: ICh5ExcludePrefixesModel): void;
    setRemainingStatesToDefaultValue(): void;
    private initializeStartOfUpdateTimer;
    private get InUpdateState();
}
