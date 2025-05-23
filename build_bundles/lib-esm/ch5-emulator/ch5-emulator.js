import * as core from '../ch5-core/index';
import { Ch5Signal, Ch5SignalBridge, Ch5SignalFactory } from "../ch5-core";
import { isNull, isUndefined, isBoolean, isString, isNumber, isObject } from 'lodash';
export class Ch5Emulator {
    constructor() { }
    static getInstance() {
        if (isUndefined(Ch5Emulator._instance)) {
            Ch5Emulator._instance = new Ch5Emulator();
        }
        return Ch5Emulator._instance;
    }
    static clear() {
        Ch5Emulator._instance = undefined;
        Ch5Emulator._scenario = {};
    }
    loadScenario(scenario) {
        if (Ch5Emulator._instance) {
            Ch5Emulator._scenario = scenario;
            if (isUndefined(scenario.cues)) {
                throw new Error('The loaded scenario has no cues');
            }
            scenario.cues.forEach(Ch5Emulator._instance.processCue);
        }
        else {
            throw new Error('The Ch5Emulator instance is not created');
        }
    }
    getScenario() {
        return Ch5Emulator._scenario;
    }
    processCue(cue, index) {
        let cueSignal;
        let cueSigSubUpdate;
        if (isUndefined(cue.event)) {
            throw new Error('Property "signal" is not set in cue.');
        }
        if (isUndefined(cue.actions) || typeof cue.actions.forEach !== "function") {
            throw new Error('Property "actions" is not set in cue.');
        }
        const cueSignalName = cue.event;
        switch (cue.type) {
            case 'b':
            case 'boolean':
                cueSignal = Ch5SignalFactory.getInstance().getBooleanSignal(cueSignalName);
                if (!isNull(cueSignal)) {
                    cueSigSubUpdate = (newCueSignalValue) => {
                        const em = Ch5Emulator.getInstance();
                        if (!isNull(em) && em.isTriggered(cue.trigger, newCueSignalValue, cueSignal)) {
                            cue.actions.forEach((actionItem, actionIndex, actionArray) => {
                                em.processAction(actionItem, actionIndex, actionArray, newCueSignalValue);
                            });
                        }
                    };
                    cueSignal.subscribe(cueSigSubUpdate);
                }
                else {
                    throw new Error(`Error processing boolean type signal named ${cueSignalName}`);
                }
                break;
            case 's':
            case 'string':
                cueSignal = Ch5SignalFactory.getInstance().getStringSignal(cueSignalName);
                if (!isNull(cueSignal)) {
                    cueSigSubUpdate = (newCueSignalValue) => {
                        const em = Ch5Emulator.getInstance();
                        if (!isNull(em) && em.isTriggered(cue.trigger, newCueSignalValue, cueSignal)) {
                            cue.actions.forEach((actionItem, actionIndex, actionArray) => {
                                em.processAction(actionItem, actionIndex, actionArray, newCueSignalValue);
                            });
                        }
                    };
                    cueSignal.subscribe(cueSigSubUpdate);
                }
                else {
                    throw new Error(`Error processing boolean type signal named ${cueSignalName}`);
                }
                break;
            case 'n':
            case 'numeric':
            case 'number':
                cueSignal = Ch5SignalFactory.getInstance().getNumberSignal(cueSignalName);
                if (!isNull(cueSignal)) {
                    cueSigSubUpdate = (newCueSignalValue) => {
                        const em = Ch5Emulator.getInstance();
                        if (!isNull(em) && em.isTriggered(cue.trigger, newCueSignalValue, cueSignal)) {
                            cue.actions.forEach((actionItem, actionIndex, actionArray) => {
                                em.processAction(actionItem, actionIndex, actionArray, newCueSignalValue);
                            });
                        }
                    };
                    cueSignal.subscribe(cueSigSubUpdate);
                }
                else {
                    throw new Error(`Error processing boolean type signal named ${cueSignalName}`);
                }
                break;
            case 'o':
            case 'object':
                cueSignal = Ch5SignalFactory.getInstance().getObjectSignal(cueSignalName);
                if (!isNull(cueSignal)) {
                    cueSigSubUpdate = (newCueSignalValue) => {
                        const em = Ch5Emulator.getInstance();
                        if (!isNull(em) && em.isTriggered(cue.trigger, newCueSignalValue, cueSignal)) {
                            cue.actions.forEach((actionItem, actionIndex, actionArray) => {
                                em.processAction(actionItem, actionIndex, actionArray, newCueSignalValue);
                            });
                        }
                    };
                    cueSignal.subscribe(cueSigSubUpdate);
                }
                else {
                    throw new Error(`Error processing object type signal named ${cueSignalName}`);
                }
                break;
            default:
                throw new Error(`Invalid cue type: ${cue.type}`);
        }
    }
    isTriggered(trigger, nextSignalValue, signal) {
        let _nextSignalValue = nextSignalValue;
        const repeatDigitalValue = _nextSignalValue[Ch5SignalBridge.REPEAT_DIGITAL_KEY];
        if (isObject(_nextSignalValue) && !isUndefined(repeatDigitalValue)) {
            _nextSignalValue = repeatDigitalValue;
        }
        const triggerType = typeof trigger;
        let isTriggered = false;
        switch (triggerType) {
            case 'boolean':
                isTriggered = (trigger === _nextSignalValue);
                break;
            case 'string':
                if (trigger === '&change') {
                    if (isObject(_nextSignalValue)) {
                        isTriggered = !isNull(signal) &&
                            (JSON.stringify(signal.prevValue) !== JSON.stringify(_nextSignalValue));
                    }
                    else {
                        isTriggered = !isNull(signal) && (signal.prevValue !== _nextSignalValue);
                    }
                }
                else {
                    isTriggered = (trigger === _nextSignalValue);
                }
                break;
            case 'number':
                isTriggered = (trigger === _nextSignalValue);
                break;
            case 'object':
                isTriggered = (JSON.stringify(trigger) === JSON.stringify(_nextSignalValue));
                break;
        }
        return isTriggered;
    }
    processAction(action, actionIndex, actionArray, cueSignalValue) {
        setTimeout(() => this.processActionAsync(action, actionIndex, actionArray, cueSignalValue), 30);
    }
    processActionAsync(action, actionIndex, actionArray, cueSignalValue) {
        if (isUndefined(action.state)) {
            throw new Error('Property "state" is not set in action.');
        }
        switch (action.type) {
            case 'b':
            case 'boolean':
                this.processBooleanAction(action, cueSignalValue);
                break;
            case 's':
            case 'string':
                this.processStringAction(action, cueSignalValue);
                break;
            case 'n':
            case 'numeric':
            case 'number':
                this.processNumberAction(action, cueSignalValue);
                break;
            case 'o':
            case 'object':
                this.processObjectAction(action, cueSignalValue);
                break;
            default:
                throw new Error(`Invalid cue type: ${action.type}`);
        }
    }
    castToBoolean(val) {
        let processedValue = false;
        if (typeof val === 'string') {
            switch (val.toLowerCase().trim()) {
                case 'true':
                case 'yes':
                case '1':
                    processedValue = true;
                    break;
                case 'false':
                case 'no':
                case '0':
                    processedValue = false;
                    break;
                default:
                    processedValue = Boolean(val);
                    break;
            }
        }
        else {
            processedValue = Boolean(val);
        }
        return processedValue;
    }
    processBooleanAction(action, cueSignalValue) {
        const signalName = Ch5Signal.getSubscriptionSignalName(action.state);
        const actionSignal = Ch5SignalFactory.getInstance().getBooleanSignal(signalName);
        if (!isNull(actionSignal)) {
            switch (action.logic) {
                case "set":
                    if (!isUndefined(action.value)) {
                        core.bridgeReceiveBooleanFromNative(signalName, action.value);
                    }
                    break;
                case "link":
                    core.bridgeReceiveBooleanFromNative(signalName, this.castToBoolean(cueSignalValue));
                    break;
                case "toggle":
                    core.bridgeReceiveBooleanFromNative(signalName, !actionSignal.value);
                    break;
                case "pulse":
                    core.bridgeReceiveBooleanFromNative(signalName, true);
                    core.bridgeReceiveBooleanFromNative(signalName, false);
                    break;
            }
        }
        else {
            throw new Error(`Error processing boolean type signal named ${signalName}`);
        }
    }
    processNumberAction(action, cueSignalValue) {
        const signalName = Ch5Signal.getSubscriptionSignalName(action.state);
        const actionSignal = Ch5SignalFactory.getInstance().getNumberSignal(signalName);
        if (!isNull(actionSignal)) {
            switch (action.logic) {
                case "set":
                    if (isNumber(action.value)) {
                        core.bridgeReceiveIntegerFromNative(signalName, action.value);
                    }
                    break;
                case "link":
                    let parsedVal = parseInt('' + cueSignalValue, 10);
                    if (isNaN(parsedVal)) {
                        parsedVal = 0;
                    }
                    core.bridgeReceiveIntegerFromNative(signalName, parsedVal);
                    break;
                case "increment":
                    let increment = 1;
                    if (!isUndefined(action.offset)) {
                        increment = action.offset;
                    }
                    core.bridgeReceiveIntegerFromNative(signalName, +actionSignal.value + increment);
                    break;
                case "decrement":
                    let decrement = 1;
                    if (!isUndefined(action.offset)) {
                        decrement = action.offset;
                    }
                    core.bridgeReceiveIntegerFromNative(signalName, +actionSignal.value - decrement);
                    break;
                case "rcb":
                    if (!isUndefined(action.value) && !isUndefined(action.time)) {
                        setTimeout((signal, val) => {
                            if (!isNull(signal)) {
                                core.bridgeReceiveIntegerFromNative(signalName, val);
                            }
                        }, action.time, actionSignal, action.value);
                    }
                    break;
            }
        }
        else {
            throw new Error(`Error processing numeric type signal named ${signalName}`);
        }
    }
    processStringAction(action, cueSignalValue) {
        const signalName = Ch5Signal.getSubscriptionSignalName(action.state);
        const actionSignal = Ch5SignalFactory.getInstance().getStringSignal(signalName);
        if (isNull(actionSignal)) {
            throw new Error(`Error processing string type signal named ${signalName}`);
        }
        switch (action.logic) {
            case "set":
                core.bridgeReceiveStringFromNative(signalName, String(action.value));
                break;
            case "link":
                core.bridgeReceiveStringFromNative(signalName, String(cueSignalValue));
                break;
        }
    }
    processObjectAction(action, cueSignalValue) {
        const signalName = Ch5Signal.getSubscriptionSignalName(action.state);
        const actionSignal = Ch5SignalFactory.getInstance().getObjectSignal(signalName);
        if (isNull(actionSignal)) {
            throw new Error(`Error processing object type signal named ${signalName}`);
        }
        switch (action.logic) {
            case "set":
                if (!isUndefined(action.value)) {
                    core.bridgeReceiveObjectFromNative(signalName, action.value);
                }
                break;
            case "link":
                core.bridgeReceiveObjectFromNative(signalName, cueSignalValue);
                break;
        }
    }
    run() {
        if (isUndefined(Ch5Emulator._scenario) || isUndefined(Ch5Emulator._scenario.cues)) {
            throw new Error('You must load a scenario before trying to run one.');
        }
        if (isUndefined(Ch5Emulator._scenario.onStart) || isUndefined(Ch5Emulator._scenario.onStart.forEach)) {
            return;
        }
        Ch5Emulator._scenario.onStart.forEach((item) => {
            const signalName = Ch5Signal.getSubscriptionSignalName(item.state);
            let signal;
            switch (item.type) {
                case "b":
                case "boolean":
                    signal = Ch5SignalFactory.getInstance().getBooleanSignal(signalName);
                    if (!isNull(signal) && isBoolean(item.value)) {
                        core.bridgeReceiveBooleanFromNative(signalName, item.value);
                    }
                    else {
                        throw new Error(`Error when setting initial value (${item.value}) for state: ${signalName}`);
                    }
                    break;
                case "n":
                case "numeric":
                case "number":
                    signal = Ch5SignalFactory.getInstance().getNumberSignal(signalName);
                    const signalValue = Number(item.value);
                    if (!isNull(signal) && !isNaN(signalValue)) {
                        core.bridgeReceiveIntegerFromNative(signalName, signalValue);
                    }
                    else {
                        throw new Error(`Error when setting initial value (${item.value}) for state: ${signalName}`);
                    }
                    break;
                case "s":
                case "string":
                    signal = Ch5SignalFactory.getInstance().getStringSignal(signalName);
                    if (!isNull(signal) && isString(item.value)) {
                        core.bridgeReceiveStringFromNative(signalName, item.value);
                    }
                    else {
                        throw new Error(`Error when setting initial value (${item.value}) for state: ${signalName}`);
                    }
                    break;
                case "o":
                case "object":
                    signal = Ch5SignalFactory.getInstance().getObjectSignal(signalName);
                    if (!isNull(signal) && isObject(item.value)) {
                        core.bridgeReceiveObjectFromNative(signalName, item.value);
                    }
                    else {
                        throw new Error(`Error when setting initial value (${item.value}) for signal: ${signalName}`);
                    }
                    break;
                default:
                    throw new Error(`Invalid 'onStart' type: ${item.type}`);
            }
        });
    }
}
Ch5Emulator._scenario = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWVtdWxhdG9yL2NoNS1lbXVsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEtBQUssSUFBSSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQXNDdEYsTUFBTSxPQUFPLFdBQVc7SUFRcEIsZ0JBQXdCLENBQUM7SUFFbEIsTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztTQUM3QztRQUNELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUs7UUFDZixXQUFXLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNsQyxXQUFXLENBQUMsU0FBUyxHQUFHLEVBQXVCLENBQUM7SUFDcEQsQ0FBQztJQUVNLFlBQVksQ0FBQyxRQUEyQjtRQUMzQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDdkIsV0FBVyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDakMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDdEQ7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDSCxNQUFNLElBQUks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