import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsHidePulse extends CustomAttribute {
    static checkAndSubscribeToSignal(el) {
        if (el.hasAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME)) {
            const _debug = el.hasAttribute('debug');
            const csf = Ch5SignalFactory.getInstance();
            const sigName = el.getAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME) || '';
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            const sig = csf.getBooleanSignal(subSigName);
            if (sig !== null) {
                const subscriptionKey = sig.subscribe((dataCh5ShowVal) => {
                    if (false === sig.prevValue && true === dataCh5ShowVal) {
                        Ch5AttrsHidePulse.handleDataCh5HidePulseReceived(el, dataCh5ShowVal);
                    }
                });
                Ch5AttrsLog.info(_debug, `Signal subscription complete... ${subscriptionKey}`, el);
                el.setAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR, subscriptionKey);
            }
        }
    }
    static handleElAddedToDOM(el) {
        if (el.hasAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR)) {
            const _debug = el.hasAttribute('debug');
            Ch5AttrsLog.info(_debug, `Added node already has data-ch5-show 
                    subs: ${el.getAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR)}`, el);
        }
        else {
            Ch5AttrsHidePulse.checkAndSubscribeToSignal(el);
        }
    }
    static elHasRemovableSigSubscription(el) {
        return el.hasAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) &&
            el.hasAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME) &&
            !el.hasAttribute(Ch5AttrsHidePulse.KEEP_SIG_SUBS_ATTR);
    }
    static unsubscribeDataCh5HidePulseSig(sigName, sigSubsKey) {
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const oldSig = Ch5SignalFactory.getInstance().getBooleanSignal(subSigName);
        if (oldSig) {
            oldSig.unsubscribe(sigSubsKey);
        }
    }
    static removeSigSubscription(el) {
        const sigSubsKey = el.getAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        Ch5AttrsLog.info(true, `Node removed without using signal value... signal subscription: 
                    ${sigSubsKey} needs to be canceled`, el);
        const sigName = el.getAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME) || '';
        Ch5AttrsHidePulse.unsubscribeDataCh5HidePulseSig(sigName, sigSubsKey);
    }
    static handleCh5HidePulseAttributeChange(newValue, oldValue, n) {
        const _debug = n.hasAttribute('debug');
        const _currentSigSubsKey = n.getAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        if (typeof oldValue === 'string' && oldValue !== '' && _currentSigSubsKey !== '') {
            Ch5AttrsLog.info(_debug, `Unsubscribing ${_currentSigSubsKey}`, n);
            this.unsubscribeDataCh5HidePulseSig(oldValue, _currentSigSubsKey);
            n.removeAttribute(Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR);
        }
        if (typeof newValue === 'string' && newValue !== '') {
            Ch5AttrsHidePulse.checkAndSubscribeToSignal(n);
        }
    }
    static getNoShowType(el) {
        let _noShowType = '';
        if (el.hasAttribute('data-ch5-noshow-type')) {
            _noShowType = el.getAttribute('data-ch5-noshow-type') || '';
        }
        else {
            switch (el.tagName.toLowerCase()) {
                case 'p':
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    _noShowType = 'display';
                    break;
                case 'div':
                    _noShowType = 'remove';
                    break;
                default:
                    _noShowType = 'visibility';
            }
        }
        return (Ch5AttrsHidePulse.NOSHOW_VALUES.indexOf(_noShowType) > -1)
            ? _noShowType
            : Ch5AttrsHidePulse.DEFAULT_NOSHOW_VALUE;
    }
    static handleDataCh5HidePulseReceived(el, show) {
        if (show) {
            const noshowType = Ch5AttrsHidePulse.getNoShowType(el);
            Ch5AttrsHidePulse.hideElement(el, noshowType);
        }
    }
    static hideElement(el, noshowType) {
        Ch5AttrsLog.info(el.hasAttribute('debug'), `Hide element using NOSHOW_TYPE: ${noshowType}`, el);
        switch (noshowType) {
            case 'display':
                el.classList.add('ch5-hide-dis');
                el.classList.remove('ch5-hide-vis');
                break;
            case 'visibility':
                el.classList.add('ch5-hide-vis');
                el.classList.remove('ch5-hide-dis');
                break;
            default:
                el.setAttribute(Ch5AttrsHidePulse.KEEP_SIG_SUBS_ATTR, '');
                const parent = el.parentElement;
                const sib = el.nextSibling;
                if (parent) {
                    parent.removeChild(el);
                    el.cachedP = parent;
                }
                if (sib) {
                    el.sib = sib;
                }
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME, { direction: "state", booleanJoin: 1, contractName: true });
    }
}
Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME = 'data-ch5-hidepulse';
Ch5AttrsHidePulse.NOSHOW_VALUES = ['visibility', 'display', 'remove'];
Ch5AttrsHidePulse.DEFAULT_NOSHOW_VALUE = 'display';
Ch5AttrsHidePulse.KEEP_SIG_SUBS_ATTR = 'data-ch5-keep-sig-subscription';
Ch5AttrsHidePulse.SIGNAL_SUBSCRIPTION_KEY_ATTR = 'data-ch5-hide-pulse-subs-key';
Ch5AttrsHidePulse.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWhpZGVwdWxzZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvY2g1LWF0dHJzLWhpZGVwdWxzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFtQyxNQUFNLGNBQWMsQ0FBQztBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBaUM7SUFRN0QsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVc7UUFDL0MsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdkQsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqRCxNQUFNLEdBQUcsR0FBcUIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0QsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwRixNQUFNLFVBQVUsR0FBVyxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEUsTUFBTSxHQUFHLEdBQThCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4RSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ2QsTUFBTSxlQUFlLEdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQXVCLEVBQUUsRUFBRTtvQkFFdEUsSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDLFNBQVMsSUFBSSxJQUFJLEtBQUss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