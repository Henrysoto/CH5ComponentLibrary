import { Ch5SignalFactory } from "../ch5-core";
import { Ch5ResyncConstants } from "./models/ch5-resync-constants";
import { Ch5Debug } from "../ch5-core";
import { ResetEventNames } from "./models/ch5-resync-reset-event-names-enum";
export class Ch5Resync {
    static checkIfStateShouldBeIncluded(excludeStatesWithThesePrefixes, state) {
        if (state === 'Csig.State_Synchronization') {
            return false;
        }
        for (const excludePrefix of excludeStatesWithThesePrefixes.excludePrefixes) {
            if (state && state.toString().startsWith(excludePrefix)) {
                return false;
            }
        }
        return true;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    constructor() {
        this.ch5SignalFactory = Ch5SignalFactory.getInstance();
        this.LOG_KEY = 'Ch5Resync';
        this.startOfUpdateCounter = 0;
        this.statesRef = this.ch5SignalFactory.getStates();
        this._statesAtDefaultValue = {};
    }
    onReceiveStartOfUpdate(excludeStatesWithThesePrefixes) {
        Ch5Debug.info(this.LOG_KEY, `Start of Update called with ${JSON.stringify(excludeStatesWithThesePrefixes)}`);
        this.initializeStartOfUpdateTimer();
        this.startOfUpdateCounter += 1;
        this.setDefaultStatesOnStartOfUpdate(excludeStatesWithThesePrefixes);
    }
    onReceiveStartOfUpdateRange(startOfUpdateMsg, statesToReset) {
        if (Ch5Debug.shouldDisplay(this.LOG_KEY)) {
            Ch5Debug.info(this.LOG_KEY, `Start of Update Range called with ${JSON.stringify(statesToReset)}`);
        }
        if (ResetEventNames.startOfUpdateRange === startOfUpdateMsg) {
            this.initializeStartOfUpdateTimer();
            this.startOfUpdateCounter += 1;
        }
        this.addDefaultJoinsOnClearRange(statesToReset.boolean.joinLow, statesToReset.boolean.joinHigh, 'boolean');
        this.addDefaultJoinsOnClearRange(statesToReset.numeric.joinLow, statesToReset.numeric.joinHigh, 'number');
        this.addDefaultJoinsOnClearRange(statesToReset.string.joinLow, statesToReset.string.joinHigh, 'string');
        this.addDefaultStatesOnClearRange(statesToReset.boolean.stateNames, 'boolean');
        this.addDefaultStatesOnClearRange(statesToReset.numeric.stateNames, 'number');
        this.addDefaultStatesOnClearRange(statesToReset.string.stateNames, 'string');
        if (Ch5Debug.shouldDisplay(this.LOG_KEY)) {
            Ch5Debug.info(this.LOG_KEY, `Start Of Update Range:${JSON.stringify(this._statesAtDefaultValue)}`);
        }
    }
    onReceiveUpdatedState(stateName, value, type) {
        if (!this.InUpdateState) {
            return;
        }
        Ch5Debug.info(this.LOG_KEY, `Updated ${type}:${stateName}`);
        if (this._statesAtDefaultValue[type] !== undefined && this._statesAtDefaultValue[type][stateName] !== undefined) {
            delete this._statesAtDefaultValue[type][stateName];
        }
    }
    onReceiveEndOfUpdate() {
        Ch5Debug.info(this.LOG_KEY, `End of Update called with counter ${this.startOfUpdateCounter}`);
        if (this.startOfUpdateCounter > 0) {
            this.startOfUpdateCounter -= 1;
            if (this.startOfUpdateCounter === 0) {
                this.resetRemainingStates();
            }
        }
    }
    resetRemainingStates() {
        this.startOfUpdateCounter = 0;
        if (this.startOfUpdateCounter !== undefined) {
            window.clearTimeout(this.startOfUpdateTimer);
            this.startOfUpdateTimer = undefined;
        }
        this.setRemainingStatesToDefaultValue();
        this._statesAtDefaultValue = {};
    }
    addDefaultJoinsOnClearRange(joinLow, joinHigh, eventType) {
        if (joinLow === 0 && joinHigh === 0) {
            return;
        }
        if (this._statesAtDefaultValue[eventType] === undefined) {
            this._statesAtDefaultValue[eventType] = {};
        }
        for (let i = joinLow; i <= joinHigh; i++) {
            this._statesAtDefaultValue[eventType][Ch5ResyncConstants.JOIN_NUMBER_SIGNAL_NAME_PREFIX + i.toString()] = true;
        }
    }
    addDefaultStatesOnClearRange(states, eventType) {
        if (states === undefined || states.length === 0) {
            return;
        }
        if (this._statesAtDefaultValue[eventType] === undefined) {
            this._statesAtDefaultValue[eventType] = {};
        }
        for (const state of states) {
            this._statesAtDefaultValue[eventType][state] = true;
        }
    }
    setDefaultStatesOnStartOfUpdate(excludeStatesWithThesePrefixes) {
        this._statesAtDefaultValue = {};
        for (const key in this.statesRef) {
            if (this.statesRef.hasOwnProperty(key)) {
                if (this._statesAtDefaultValue[key] === undefined) {
                    this._statesAtDefaultValue[key] = {};
                }
                for (const state in this.statesRef[key]) {
                    if (this.statesRef[key].hasOwnProperty(state)) {
                        const currentState = this.statesRef[key];
                        if (Ch5Resync.checkIfStateShouldBeIncluded(excludeStatesWithThesePrefixes, currentState[state]._name)
                            && currentState[state].receivedFromSignalBridge) {
                            this._statesAtDefaultValue[key][currentState[state]._name] = true;
                        }
                    }
                }
            }
        }
        if (Ch5Debug.shouldDisplay(this.LOG_KEY)) {
            Ch5Debug.info(this.LOG_KEY, `Start of Update:${JSON.stringify(this._statesAtDefaultValue)}`);
        }
    }
    setRemainingStatesToDefaultValue() {
        if (Ch5Debug.shouldDisplay(this.LOG_KEY)) {
            Ch5Debug.info(this.LOG_KEY, `End Of Update:${JSON.stringify(this._statesAtDefaultValue)}`);
        }
        for (const stateType in this._statesAtDefaultValue) {
            if (Object.prototype.hasOwnProperty.call(this._statesAtDefaultValue, stateType)) {
                const statesInType = this._statesAtDefaultValue[stateType];
                for (const stateName in statesInType) {
                    if (Object.prototype.hasOwnProperty.call(statesInType, stateName)) {
                        if (!this.statesRef[stateType][stateName]) {
                            continue;
                        }
                        try {
                            switch (stateType) {
                                case 'boolean':
                                    this.statesRef[stateType][stateName].fromSignalBridge(false);
                                    break;
                                case 'number':
                                    this.statesRef[stateType][stateName].fromSignalBridge(0);
                                    if (this.statesRef.object[stateName]) {
                                        this.statesRef.object[stateName].fromSignalBridge({ "rcb": { "value": 0, "time": 0 } });
                                    }
                                    break;
                                case 'string':
                                    this.statesRef[stateType][stateName].fromSignalBridge('');
                                    break;
                                default:
                                    break;
                            }
                        }
                        catch (exception) {
                            console.log('[INFO] Failed to publish signal: ' + stateName + ' of type: ' + stateType);
                        }
                    }
                }
            }
        }
    }
    initializeStartOfUpdateTimer(time = Ch5Resync.START_OF_UPDATE_TIME_LIMIT) {
        window.clearTimeout(this.startOfUpdateTimer);
        this.startOfUpdateTimer = window.setTimeout(() => {
            Ch5Debug.info(this.LOG_KEY, `Timeout waiting for EndOfUpdate remainingEOUs:${this.startOfUpdateCounter}`);
            this.resetRemainingStates();
        }, time);
    }
    get InUpdateState() {
        return this.startOfUpdateTimer !== undefined;
    }
}
Ch5Resync.START_OF_UPDATE_TIME_LIMIT = 60000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXJlc3luYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1yZXN5bmMvY2g1LXJlc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFPN0UsTUFBTSxPQUFPLFNBQVM7SUFrQlgsTUFBTSxDQUFDLDRCQUE0QixDQUFDLDhCQUF3RCxFQUFFLEtBQWE7UUFDOUcsSUFBSSxLQUFLLEtBQUssNEJBQTRCLEVBQUU7WUFDeEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxLQUFLLE1BQU0sYUFBYSxJQUFJLDhCQUE4QixDQUFDLGVBQWUsRUFBRTtZQUN4RSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNyRCxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdNLE1BQU0sS0FBSyxRQUFRO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDtRQTVCUSxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRCxZQUFPLEdBQUcsV0FBVyxDQUFDO1FBR3RCLHlCQUFvQixHQUFXLENBQUMsQ0FBQztRQXlCckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLHFCQUFx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