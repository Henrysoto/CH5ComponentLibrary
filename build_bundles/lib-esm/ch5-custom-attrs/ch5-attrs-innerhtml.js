import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsInnerhtml extends CustomAttribute {
    static handleBeingAddedToDom(el) {
        const sigName = el.getAttribute(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsInnerhtml.CH5_ATTR_SIG_SUB_KEY);
        if (oldSubKey !== '') {
            Ch5AttrsInnerhtml.handleUnsubscribe(el, sigName, oldSubKey);
        }
        Ch5AttrsInnerhtml.handleSubscribe(el, sigName);
    }
    static handleBeingRemovedFromDom(el) {
        const sigName = el.getAttribute(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsInnerhtml.CH5_ATTR_SIG_SUB_KEY);
        Ch5AttrsInnerhtml.handleUnsubscribe(el, sigName, oldSubKey);
    }
    static handleSubscribe(el, sigName) {
        if (sigName === '' || sigName === null) {
            return '';
        }
        const _debug = el.hasAttribute('debug');
        Ch5AttrsLog.info(_debug, `handleSubscribe ${sigName}`, el);
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const sig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
        let subKey = '';
        if (null !== sig) {
            subKey = sig.subscribe((sigVal) => {
                if (el.innerHTML !== sigVal) {
                    el.innerHTML = sigVal;
                    Ch5AttrsLog.info(_debug, `innerHTML updated to ${sigVal}`, el);
                }
            });
            el.setAttribute(Ch5AttrsInnerhtml.CH5_ATTR_SIG_SUB_KEY, subKey);
        }
        Ch5AttrsLog.info(_debug, ` subscribed to ${sigName}, subKey is ${subKey}`, el);
        return subKey;
    }
    static handleUnsubscribe(el, sigName, subKey) {
        if (sigName === '' || subKey === '' || sigName === null || subKey === null) {
            return;
        }
        const _debug = el.hasAttribute('debug');
        Ch5AttrsLog.info(_debug, `handleUnsubscribe: preparing to unsubscribe from ${sigName} with subKey: ${subKey}`, el);
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const sig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
        if (null !== sig && subKey !== '') {
            sig.unsubscribe(subKey);
            Ch5AttrsLog.info(_debug, ` unsubscribed from ${sigName} with subKey: ${subKey}`, el);
        }
    }
    static handleCh5InnerhtmlAttrChange(newValue, oldValue, el) {
        if (typeof oldValue === 'string' && oldValue !== '') {
            const oldSubKey = el.getAttribute(Ch5AttrsInnerhtml.CH5_ATTR_SIG_SUB_KEY) || '';
            if (oldSubKey !== '') {
                Ch5AttrsInnerhtml.handleUnsubscribe(el, oldValue, oldSubKey);
            }
        }
        if (typeof newValue === 'string' && newValue !== '' && newValue !== oldValue) {
            Ch5AttrsInnerhtml.handleSubscribe(el, newValue);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME, { direction: "state", stringJoin: 1, contractName: true });
    }
}
Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME = 'data-ch5-innerhtml';
Ch5AttrsInnerhtml.CH5_ATTR_SIG_SUB_KEY = 'data-ch5-innerhtml-sub-key';
Ch5AttrsInnerhtml.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWlubmVyaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvY2g1LWF0dHJzLWlubmVyaHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFzQixNQUFNLGNBQWMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQU16RixNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBdUI7SUFLbkQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQVc7UUFDM0MsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFXLENBQUM7UUFFcEYsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxNQUFNLENBQUMseUJBQXlCLENBQUMsRUFBVztRQUMvQyxNQUFNLE9BQU8sR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BGLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQVcsQ0FBQztRQUVwRixpQkFB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