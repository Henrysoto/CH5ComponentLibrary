import { isFunction } from 'lodash';
import { Ch5Debug } from "./ch5-debug";
export class Ch5SignalBridge {
    constructor() {
        this._isWebView = false;
        this._isWebKit = false;
        const dbgKey = 'Ch5SignalBridge.constructor';
        Ch5Debug.info(dbgKey, ' start ');
        this._subscriptions = {
            "boolean": new Set(),
            "number": new Set(),
            "object": new Set(),
            "string": new Set()
        };
        this._localPublishers = {
            "boolean": new Set(),
            "number": new Set(),
            "object": new Set(),
            "string": new Set()
        };
        this._isWebView = typeof (JSInterface) !== 'undefined'
            && typeof (JSInterface.bridgeSendBooleanToNative) === 'function'
            && typeof (JSInterface.bridgeSendIntegerToNative) === 'function'
            && typeof (JSInterface.bridgeSendStringToNative) === 'function';
        this._isWebKit = typeof (webkit) !== 'undefined'
            && typeof (webkit.messageHandlers) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSendBooleanToNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSendIntegerToNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSendStringToNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSendObjectToNative) !== 'undefined';
    }
    subscribe(signalName, type) {
        const dbgKey = 'Ch5SignalBridge.subscribe';
        Ch5Debug.info(dbgKey, '"' + signalName + '":"' + type + '"');
        if (this._subscriptions[type].has(signalName) || this._localPublishers[type].has(signalName)) {
            return;
        }
        this._subscriptions[type].add(signalName);
        if (this._isWebView
            && typeof (JSInterface.bridgeSubscribeBooleanSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeSubscribeIntegerSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeSubscribeStringSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeSubscribeObjectSignalFromNative) === 'function') {
            switch (type) {
                case 'boolean':
                    JSInterface.bridgeSubscribeBooleanSignalFromNative(signalName);
                    break;
                case 'number':
                    JSInterface.bridgeSubscribeIntegerSignalFromNative(signalName);
                    break;
                case 'string':
                    JSInterface.bridgeSubscribeStringSignalFromNative(signalName);
                    break;
                case 'object':
                default:
                    JSInterface.bridgeSubscribeObjectSignalFromNative(signalName);
                    break;
            }
        }
        else if (this._isWebKit
            && typeof (webkit.messageHandlers.bridgeSubscribeBooleanSignalFromNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSubscribeIntegerSignalFromNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSubscribeStringSignalFromNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeSubscribeObjectSignalFromNative) !== 'undefined') {
            switch (type) {
                case 'boolean':
                    webkit.messageHandlers.bridgeSubscribeBooleanSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'number':
                    webkit.messageHandlers.bridgeSubscribeIntegerSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'string':
                    webkit.messageHandlers.bridgeSubscribeStringSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'object':
                default:
                    webkit.messageHandlers.bridgeSubscribeObjectSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
            }
        }
    }
    unsubscribe(signalName, type) {
        const dbgKey = 'Ch5SignalBridge.unsubscribe';
        Ch5Debug.info(dbgKey, '"' + signalName + '":"' + type + '"');
        if (!this._subscriptions[type].has(signalName)) {
            return;
        }
        this._subscriptions[type].delete(signalName);
        if (this._isWebView
            && typeof (JSInterface.bridgeUnsubscribeBooleanSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeUnsubscribeIntegerSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeUnsubscribeStringSignalFromNative) === 'function'
            && typeof (JSInterface.bridgeUnsubscribeObjectSignalFromNative) === 'function') {
            switch (type) {
                case 'boolean':
                    JSInterface.bridgeUnsubscribeBooleanSignalFromNative(signalName);
                    break;
                case 'number':
                    JSInterface.bridgeUnsubscribeIntegerSignalFromNative(signalName);
                    break;
                case 'string':
                    JSInterface.bridgeUnsubscribeStringSignalFromNative(signalName);
                    break;
                case 'object':
                    JSInterface.bridgeUnsubscribeObjectSignalFromNative(signalName);
                    break;
                default:
                    JSInterface.bridgeUnsubscribeObjectSignalFromNative(signalName);
                    break;
            }
        }
        else if (this._isWebKit
            && typeof (webkit.messageHandlers.bridgeUnsubscribeBooleanSignalFromNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeUnsubscribeIntegerSignalFromNative) !== 'undefined'
            && typeof (webkit.messageHandlers.bridgeUnsubscribeStringSignalFromNative) !== 'undefined') {
            switch (type) {
                case 'boolean':
                    webkit.messageHandlers.bridgeUnsubscribeBooleanSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'number':
                    webkit.messageHandlers.bridgeUnsubscribeIntegerSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'string':
                    webkit.messageHandlers.bridgeUnsubscribeStringSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
                case 'object':
                default:
                    webkit.messageHandlers.bridgeUnsubscribeStringSignalFromNative.postMessage(this.createPMParam(signalName));
                    break;
            }
        }
    }
    publish(signalName, value) {
        const dbgKey = 'Ch5SignalBridge.publish';
        Ch5Debug.info(dbgKey, '"' + signalName + '":' + value);
        const valueType = typeof (value);
        this.unsubscribe(signalName, valueType);
        this._localPublishers[valueType].add(signalName);
        switch (valueType) {
            case 'boolean':
                this.sendBooleanToNative(signalName, value);
                break;
            case 'number':
                this.sendIntegerToNative(signalName, value);
                break;
            case 'string':
                this.sendStringToNative(signalName, value);
                break;
            default:
                this.sendObjectToNative(signalName, value);
                break;
        }
    }
    sendBooleanToNative(signalName, value) {
        const dbgKey = 'Ch5SignalBridge.sendBooleanToNative';
        Ch5Debug.info(dbgKey, '"' + signalName + '":' + value);
        if (this._isWebView) {
            JSInterface.bridgeSendBooleanToNative(signalName, value);
        }
        else if (this._isWebKit) {
            webkit.messageHandlers.bridgeSendBooleanToNative.postMessage(this.createPMParam(signalName, value));
        }
        else if (this._isWebXPanel()) {
            CommunicationInterface.bridgeSendBooleanToNative(signalName, value);
        }
        else {
        }
    }
    sendIntegerToNative(signalName, value) {
        const dbgKey = 'Ch5SignalBridge.sendIntegerToNative';
        Ch5Debug.info(dbgKey, '"' + signalName + '":' + value);
        if (this._isWebView) {
            JSInterface.bridgeSendIntegerToNative(signalName, value);
        }
        else if (this._isWebKit) {
            webkit.messageHandlers.bridgeSendIntegerToNative.postMessage(this.createPMParam(signalName, value));
        }
        else if (this._isWebXPanel()) {
            CommunicationInterface.bridgeSendIntegerToNative(signalName, value);
        }
        else {
        }
    }
    sendStringToNative(signalName, value) {
        const dbgKey = 'Ch5SignalBridge.sendStringToNative';
        Ch5Debug.info(dbgKey, '"' + signalName + '":"' + value + '"');
        if (this._isWebView) {
            JSInterface.bridgeSendStringToNative(signalName, value);
        }
        else if (this._isWebKit) {
            webkit.messageHandlers.bridgeSendStringToNative.postMessage(this.createPMParam(signalName, value));
        }
        else if (this._isWebXPanel()) {
            CommunicationInterface.bridgeSendStringToNative(signalName, value);
        }
        else {
        }
    }
    sendObjectToNative(signalName, value) {
        const dbgKey = 'Ch5SignalBridge.sendObjectToNative';
        if (Ch5Debug.shouldDisplay(dbgKey)) {
            Ch5Debug.info(dbgKey, `"${signalName}": ${JSON.stringify(value)}`);
        }
        if (this._isWebView) {
            JSInterface.bridgeSendObjectToNative(signalName, JSON.stringify(value));
        }
        else if (this._isWebKit) {
            webkit.messageHandlers.bridgeSendObjectToNative.postMessage(this.createPMParam(signalName, value));
        }
        else if (this._isWebXPanel()) {
            CommunicationInterface.bridgeSendObjectToNative(signalName, JSON.stringify(value));
        }
        else {
        }
    }
    _isWebXPanel() {
        const isWebXPanel = (typeof (CommunicationInterface) !== 'undefined'
            && (isFunction(CommunicationInterface.bridgeSendBooleanToNative)
                && isFunction(CommunicationInterface.bridgeSendIntegerToNative)
                && isFunction(CommunicationInterface.bridgeSendStringToNative)
                && isFunction(CommunicationInterface.bridgeSendObjectToNative)));
        if (isWebXPanel) {
            this._isWebView = false;
        }
        return isWebXPanel;
    }
    createPMParam(signalName, value) {
        let paramValue;
        if (value !== undefined) {
            paramValue = { 'signal': signalName, 'value': value };
        }
        else {
            paramValue = { 'signal': signalName };
        }
        return JSON.stringify(paramValue);
    }
}
Ch5SignalBridge.REPEAT_DIGITAL_KEY = 'repeatdigital';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1icmlkZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtc2lnbmFsLWJyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxPQUFPLGVBQWU7SUFTeEI7UUFIUSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHL0IsTUFBTSxNQUFNLEdBQUcsNkJBQTZCLENBQUM7UUFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixTQUFTLEVBQUUsSUFBSSxHQUFHLEVBQVU7WUFDNUIsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQVU7U0FDOUIsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixTQUFTLEVBQUUsSUFBSSxHQUFHLEVBQVU7WUFDNUIsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQVU7U0FDOUIsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFdBQVc7ZUFDL0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLFVBQVU7ZUFDN0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLFVBQVU7ZUFDN0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLFVBQVUsQ0FB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