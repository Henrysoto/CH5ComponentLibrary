import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsEnable extends CustomAttribute {
    static checkAndSubscribeToSignal(el) {
        if (el.hasAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME)) {
            const _debug = el.hasAttribute('debug');
            const csf = Ch5SignalFactory.getInstance();
            const sigName = el.getAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME) || '';
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            const sig = csf.getBooleanSignal(subSigName);
            if (sig) {
                const subscriptionKey = sig.subscribe((dataCh5EnableVal) => {
                    Ch5AttrsEnable.handleDataCh5EnableReceived(el, dataCh5EnableVal);
                });
                Ch5AttrsLog.info(_debug, `Signal subscription complete... ${subscriptionKey}`, el);
                el.setAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR, subscriptionKey);
            }
        }
    }
    static handleElAddedToDOM(el) {
        if (!el.hasAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR)) {
            Ch5AttrsEnable.checkAndSubscribeToSignal(el);
        }
    }
    static elHasRemovableSigSubscription(el) {
        return el.hasAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR) &&
            el.hasAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME) &&
            !el.hasAttribute(Ch5AttrsEnable.KEEP_SIG_SUBS_ATTR);
    }
    static unsubscribeDataCh5EnableSig(sigName, sigSubsKey) {
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const oldSig = Ch5SignalFactory.getInstance().getBooleanSignal(subSigName);
        if (oldSig) {
            oldSig.unsubscribe(sigSubsKey);
        }
    }
    static removeSigSubscription(el) {
        const sigSubsKey = el.getAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        Ch5AttrsLog.info(true, `Node removed without using signal value... signal subscription: 
                    ${sigSubsKey} needs to be canceled`, el);
        const sigName = el.getAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME) || '';
        Ch5AttrsEnable.unsubscribeDataCh5EnableSig(sigName, sigSubsKey);
    }
    static handleCh5EnableAttributeChange(newValue, oldValue, n) {
        const _debug = n.hasAttribute('debug');
        const _currentSigSubsKey = n.getAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        if (typeof oldValue === 'string' && oldValue !== '' && _currentSigSubsKey !== '') {
            Ch5AttrsLog.info(_debug, `Unsubscribing ${_currentSigSubsKey}`, n);
            this.unsubscribeDataCh5EnableSig(oldValue, _currentSigSubsKey);
            n.removeAttribute(Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR);
        }
        if (typeof newValue === 'string' && newValue !== '') {
            Ch5AttrsEnable.checkAndSubscribeToSignal(n);
        }
    }
    static handleDataCh5EnableReceived(el, enable) {
        if (!enable) {
            el.classList.add('ch5-disabled');
        }
        else {
            el.classList.remove('ch5-disabled');
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsEnable.DATA_CH5_ATTR_NAME, { direction: "state", booleanJoin: 1, contractName: true });
    }
}
Ch5AttrsEnable.DATA_CH5_ATTR_NAME = 'data-ch5-enable';
Ch5AttrsEnable.KEEP_SIG_SUBS_ATTR = 'data-ch5-keep-sig-subscription';
Ch5AttrsEnable.SIGNAL_SUBSCRIPTION_KEY_ATTR = 'data-ch5-enable-subs-key';
Ch5AttrsEnable.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWVuYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvY2g1LWF0dHJzLWVuYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFtQixNQUFNLGNBQWMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixNQUFNLE9BQU8sY0FBZSxTQUFRLGVBQXVCO0lBTWxELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFXO1FBQ2pELElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN0RCxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWpELE1BQU0sR0FBRyxHQUFxQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3RCxNQUFNLE9BQU8sR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqRixNQUFNLFVBQVUsR0FBVyxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEUsTUFBTSxHQUFHLEdBQThCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4RSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLGVBQWUsR0FBVyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQXlCLEVBQUUsRUFBRTtvQkFDMUUsY0FBYyxDQUFDLDJCQUEyQixDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDLENBQUMs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