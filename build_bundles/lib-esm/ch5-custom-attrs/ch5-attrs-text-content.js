import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { Ch5TranslationUtility } from "../ch5-core/ch5-translation-utility";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsTextContent extends CustomAttribute {
    static handleBeingAddedToDom(el) {
        const sigName = el.getAttribute(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsTextContent.CH5_ATTR_SIG_SUB_KEY);
        if (oldSubKey !== '') {
            Ch5AttrsTextContent.handleUnsubscribe(el, sigName, oldSubKey);
        }
        Ch5AttrsTextContent.handleSubscribe(el, sigName);
    }
    static handleBeingRemovedFromDom(el) {
        const sigName = el.getAttribute(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsTextContent.CH5_ATTR_SIG_SUB_KEY);
        Ch5AttrsTextContent.handleUnsubscribe(el, sigName, oldSubKey);
    }
    static handleSubscribe(el, sigName) {
        const _debug = el.hasAttribute('debug');
        Ch5AttrsLog.info(_debug, `handleSubscribe ${sigName}`, el);
        if (sigName === '') {
            return '';
        }
        let oldTextContent = el.textContent;
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const sig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
        let subKey = '';
        if (null !== sig) {
            subKey = sig.subscribe((sigVal) => {
                if (el.textContent !== sigVal) {
                    el.textContent = Ch5TranslationUtility.getInstance().translatedValue(sigVal);
                    Ch5AttrsLog.info(_debug, `textContent changed from ${oldTextContent} to ${el.textContent}`, el);
                    oldTextContent = el.textContent;
                }
            });
            el.setAttribute(Ch5AttrsTextContent.CH5_ATTR_SIG_SUB_KEY, subKey);
        }
        Ch5AttrsLog.info(_debug, ` subscribed to ${sigName}, subKey is ${subKey}`, el);
        return subKey;
    }
    static handleUnsubscribe(el, sigName, subKey) {
        const _debug = el.hasAttribute('debug');
        Ch5AttrsLog.info(_debug, `handleUnsubscribe ${sigName}`, el);
        if (sigName === '' || subKey === '') {
            return;
        }
        Ch5AttrsLog.info(_debug, ` preparing to unsubscribe from ${sigName} with subKey: ${subKey}`, el);
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const sig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
        if (null !== sig && subKey !== '') {
            sig.unsubscribe(subKey);
            Ch5AttrsLog.info(_debug, ` unsubscribed from ${sigName} with subKey: ${subKey}`, el);
        }
    }
    static handleCh5TextContentAttrChange(newValue, oldValue, el) {
        if (typeof oldValue === 'string' && oldValue !== '') {
            const oldSubKey = el.getAttribute(Ch5AttrsTextContent.CH5_ATTR_SIG_SUB_KEY) || '';
            if (oldSubKey !== '') {
                Ch5AttrsTextContent.handleUnsubscribe(el, oldValue, oldSubKey);
            }
        }
        if (typeof newValue === 'string' && newValue !== '' && newValue !== oldValue) {
            Ch5AttrsTextContent.handleSubscribe(el, newValue);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME, { direction: "state", stringJoin: 1, contractName: true });
    }
}
Ch5AttrsTextContent.DATA_CH5_ATTR_NAME = 'data-ch5-textcontent';
Ch5AttrsTextContent.CH5_ATTR_SIG_SUB_KEY = 'data-ch5-sub-key';
Ch5AttrsTextContent.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLXRleHQtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvY2g1LWF0dHJzLXRleHQtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUF3QixNQUFNLGNBQWMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixNQUFNLE9BQU8sbUJBQW9CLFNBQVEsZUFBdUI7SUFPckQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQVU7UUFFMUMsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RixNQUFNLFNBQVMsR0FBSSxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFXLENBQUM7UUFFdkYsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUFDO1lBQ2pCLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDakU7UUFDRCxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxNQUFNLENBQUMseUJBQXlCLENBQUMsRUFBVztRQUUvQyxNQUFNLE9BQU8sR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RGLE1BQU0sU0FBUyxHQUFJLEVBQUUsQ0FB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