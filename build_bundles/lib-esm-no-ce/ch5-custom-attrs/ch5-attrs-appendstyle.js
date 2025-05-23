import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsAppendstyle extends CustomAttribute {
    static handleBeingAddedToDom(el) {
        const sigName = el.getAttribute(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsAppendstyle.CH5_ATTR_SIG_SUB_KEY);
        if (oldSubKey !== '') {
            Ch5AttrsAppendstyle.handleUnsubscribe(el, sigName, oldSubKey);
        }
        Ch5AttrsAppendstyle.handleSubscribe(el, sigName);
    }
    static handleBeingRemovedFromDom(el) {
        const sigName = el.getAttribute(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsAppendstyle.CH5_ATTR_SIG_SUB_KEY);
        Ch5AttrsAppendstyle.handleUnsubscribe(el, sigName, oldSubKey);
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
                if (el.style.cssText !== sigVal) {
                    el.style.cssText = sigVal;
                    Ch5AttrsLog.info(_debug, `style updated to ${sigVal}`, el);
                }
            });
            el.setAttribute(Ch5AttrsAppendstyle.CH5_ATTR_SIG_SUB_KEY, subKey);
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
    static handleCh5AppendstyleAttrChange(newValue, oldValue, el) {
        if (typeof oldValue === 'string' && oldValue !== '') {
            const oldSubKey = el.getAttribute(Ch5AttrsAppendstyle.CH5_ATTR_SIG_SUB_KEY) || '';
            if (oldSubKey !== '') {
                Ch5AttrsAppendstyle.handleUnsubscribe(el, oldValue, oldSubKey);
            }
        }
        if (typeof newValue === 'string' && newValue !== '' && newValue !== oldValue) {
            Ch5AttrsAppendstyle.handleSubscribe(el, newValue);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME, { direction: "state", stringJoin: 1, contractName: true });
    }
}
Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME = 'data-ch5-appendstyle';
Ch5AttrsAppendstyle.CH5_ATTR_SIG_SUB_KEY = 'data-ch5-appendstyle-sub-key';
Ch5AttrsAppendstyle.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWFwcGVuZHN0eWxlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWN1c3RvbS1hdHRycy9jaDUtYXR0cnMtYXBwZW5kc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBd0IsTUFBTSxjQUFjLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFNekYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGVBQXVCO0lBS3JELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFXO1FBQzNDLE1BQU0sT0FBTyxHQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEYsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBVyxDQUFDO1FBRXRGLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRTtZQUNsQixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsbUJBQW1CLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVc7UUFDL0MsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFXLENBQUM7UUFFdEYs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