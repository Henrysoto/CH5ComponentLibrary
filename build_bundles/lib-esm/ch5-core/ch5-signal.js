import { Ch5SignalBridge } from './ch5-signal-bridge';
import { Ch5SignalBehaviorSubject } from "./ch5-signal-behavior-subject";
import { Ch5Resync } from "../ch5-resync/ch5-resync";
import { subscribeState } from '.';
import { ResetEventNames } from "../ch5-resync/models/ch5-resync-reset-event-names-enum";
import { Ch5ResyncConstants } from "../ch5-resync/models/ch5-resync-constants";
export class Ch5Signal {
    static isIntegerSignalName(name) {
        const n = parseInt(name, 10);
        return !isNaN(n) && n.toString() === name;
    }
    static getJoinNumberSignalName(name) {
        return Ch5ResyncConstants.JOIN_NUMBER_SIGNAL_NAME_PREFIX + name;
    }
    static getSubscriptionSignalName(name) {
        return Ch5Signal.isIntegerSignalName(name)
            ? Ch5Signal.getJoinNumberSignalName(name)
            : name;
    }
    static _resetEventsInitialization() {
        if (Ch5Signal._resetEventsInitialized) {
            return;
        }
        Ch5Signal._resetEventsInitialized = true;
        const ch5Resync = Ch5Resync.Instance;
        const processResyncronizationCallback = (resyncRequest) => {
            if (Ch5Signal._initialSubscriptionToResyncEvents) {
                Ch5Signal._initialSubscriptionToResyncEvents = false;
                return;
            }
            if (resyncRequest.state === ResetEventNames.startOfUpdate) {
                if (resyncRequest.value !== undefined && resyncRequest.value.excludePrefixes !== undefined) {
                    const excludePrefixes = {
                        excludePrefixes: resyncRequest.value.excludePrefixes
                    };
                    ch5Resync.onReceiveStartOfUpdate(excludePrefixes);
                }
                else {
                    throw new Error('Invalid resyncRequest object');
                }
            }
            else if (resyncRequest.state === ResetEventNames.startOfUpdateRange || resyncRequest.state === ResetEventNames.startOfUpdateRangeSO) {
                if (resyncRequest.value !== undefined
                    && resyncRequest.value.range !== undefined
                    && resyncRequest.value.excludePrefixes !== undefined) {
                    ch5Resync.onReceiveStartOfUpdateRange(resyncRequest.state, resyncRequest.value.range);
                }
                else {
                    throw new Error('Invalid resyncRequest object');
                }
            }
            else if (resyncRequest.state === ResetEventNames.endOfUpdate) {
                ch5Resync.onReceiveEndOfUpdate();
            }
        };
        subscribeState('object', 'Csig.State_Synchronization', processResyncronizationCallback);
    }
    constructor(name, typeInstance) {
        this._hasChangedSinceInit = false;
        this._receivedFromSignalBridge = false;
        this._name = name;
        this._uninitializedValue = this.uninitializedCreate(typeInstance);
        this._subject = new Ch5SignalBehaviorSubject(this._uninitializedValue, this._uninitializedValue);
        this._lastSubId = 0;
        this._subscriptions = {};
        this._signalBridge = new Ch5SignalBridge();
        this._ch5Resync = Ch5Resync.Instance;
        Ch5Signal._resetEventsInitialization();
        this.subscribeToStates();
    }
    subscribeToStates() {
        const subKey = 'stateSubscription';
        this._subscriptions[subKey] = this._subject.subscribe(() => {
            this._ch5Resync.onReceiveUpdatedState(this._name, this.value, this.type);
        });
    }
    uninitializedCreate(typeInstance) {
        switch (typeof typeInstance) {
            case 'boolean':
                return false;
            case 'number':
                return 0;
            case 'string':
                return '';
            case 'object':
                return {};
            default:
                return {};
        }
    }
    get name() {
        return this._name;
    }
    get type() {
        return typeof (this._uninitializedValue);
    }
    get value() {
        return this._subject.value;
    }
    get prevValue() {
        return this._subject.prevValue;
    }
    hasChangedSinceInit() {
        return this._hasChangedSinceInit;
    }
    get receivedFromSignalBridge() {
        return this._receivedFromSignalBridge;
    }
    publish(value) {
        this._hasChangedSinceInit = true;
        this._subject.next(value);
        this._signalBridge.publish(this._name, value);
    }
    fromSignalBridge(value) {
        this._receivedFromSignalBridge = true;
        this._hasChangedSinceInit = true;
        if (this._subject.getValue() !== value) {
            this._subject.next(value);
        }
        else {
            this._ch5Resync.onReceiveUpdatedState(this._name, this.value, this.type);
        }
    }
    subscribe(updatecb, errorcb) {
        this._lastSubId++;
        const subKey = this._name + '-' + ('00000' + this._lastSubId).slice(-5);
        let newSub;
        if (errorcb !== undefined && errorcb !== null) {
            newSub = this._subject.subscribe(updatecb, errorcb);
        }
        else {
            newSub = this._subject.subscribe(updatecb);
        }
        this._subscriptions[subKey] = newSub;
        if (Object.keys(this._subscriptions).length === 1) {
            this._signalBridge.subscribe(this._name, typeof (this._uninitializedValue));
        }
        return subKey;
    }
    unsubscribe(subKey) {
        const oldSub = this._subscriptions[subKey];
        if (oldSub !== undefined) {
            oldSub.unsubscribe();
            delete this._subscriptions[subKey];
            if (Object.keys(this._subscriptions).length === 1) {
                this._signalBridge.unsubscribe(this._name, typeof (this._uninitializedValue));
            }
        }
    }
}
Ch5Signal._resetEventsInitialized = false;
Ch5Signal._initialSubscriptionToResyncEvents = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL2NoNS1zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUd6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUUvRSxNQUFNLE9BQU8sU0FBUztJQWNYLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFZO1FBQzFDLE1BQU0sQ0FBQyxHQUFXLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFFTSxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBWTtRQUM5QyxPQUFPLGtCQUFrQixDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQztJQUNwRSxDQUFDO0lBRU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQVk7UUFDaEQsT0FBTyxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDZixDQUFDO0lBRU8sTUFBTSxDQUFDLDBCQUEwQjtRQUNyQyxJQUFJLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFFRCxTQUFT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