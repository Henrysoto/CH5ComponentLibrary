import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsShowPulse extends CustomAttribute {
    static checkAndSubscribeToSignal(el) {
        if (el.hasAttribute('data-ch5-noshow-type')) {
            const noshowType = Ch5AttrsShowPulse.getNoShowType(el);
            Ch5AttrsShowPulse.hideElement(el, noshowType);
        }
        if (el.hasAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME)) {
            const _debug = el.hasAttribute('debug');
            const csf = Ch5SignalFactory.getInstance();
            const sigName = el.getAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME) || '';
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            const sig = csf.getBooleanSignal(subSigName);
            if (sig !== null) {
                const subscriptionKey = sig.subscribe((dataCh5ShowVal) => {
                    if (false === sig.prevValue && true === dataCh5ShowVal) {
                        Ch5AttrsShowPulse.handleDataCh5ShowPulseReceived(el, dataCh5ShowVal);
                    }
                });
                Ch5AttrsLog.info(_debug, `Signal subscription complete... ${subscriptionKey}`, el);
                el.setAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR, subscriptionKey);
            }
        }
    }
    static handleElAddedToDOM(el) {
        if (el.hasAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR)) {
            const _debug = el.hasAttribute('debug');
            Ch5AttrsLog.info(_debug, `Added node already has data-ch5-showpulse 
                    subs: ${el.getAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR)}`, el);
        }
        else {
            Ch5AttrsShowPulse.checkAndSubscribeToSignal(el);
        }
    }
    static elHasRemovableSigSubscription(el) {
        return el.hasAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) &&
            el.hasAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME) &&
            !el.hasAttribute(Ch5AttrsShowPulse.KEEP_SIG_SUBS_ATTR);
    }
    static unsubscribeDataCh5ShowPulseSig(sigName, sigSubsKey) {
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const oldSig = Ch5SignalFactory.getInstance().getBooleanSignal(subSigName);
        if (oldSig) {
            oldSig.unsubscribe(sigSubsKey);
        }
    }
    static removeSigSubscription(el) {
        const sigSubsKey = el.getAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        Ch5AttrsLog.info(true, `Node removed without using signal value... signal subscription: 
                    ${sigSubsKey} needs to be canceled`, el);
        const sigName = el.getAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME) || '';
        Ch5AttrsShowPulse.unsubscribeDataCh5ShowPulseSig(sigName, sigSubsKey);
    }
    static handleCh5ShowPulseAttributeChange(newValue, oldValue, n) {
        const _debug = n.hasAttribute('debug');
        const _currentSigSubsKey = n.getAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        if (typeof oldValue === 'string' && oldValue !== '' && _currentSigSubsKey !== '') {
            Ch5AttrsLog.info(_debug, `Unsubscribing ${_currentSigSubsKey}`, n);
            this.unsubscribeDataCh5ShowPulseSig(oldValue, _currentSigSubsKey);
            n.removeAttribute(Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR);
        }
        if (typeof newValue === 'string' && newValue !== '') {
            Ch5AttrsShowPulse.checkAndSubscribeToSignal(n);
        }
    }
    static handleDataCh5ShowPulseReceived(el, show) {
        if (show) {
            Ch5AttrsShowPulse.showElement(el);
        }
    }
    static showElement(el) {
        const cachedP = el.cachedP;
        let debugMsg = 'Element visibility/display restored.';
        const debugOtp = [el];
        if (cachedP) {
            const elSib = el.sib;
            debugOtp.push(cachedP);
            if (elSib && cachedP === elSib.parentElement) {
                cachedP.insertBefore(el, elSib);
                debugMsg = 'Element re-stamped to DOM using cached parent and sibling elements. ' + debugMsg;
                debugOtp.push(elSib);
                delete el.sib;
            }
            else {
                cachedP.appendChild(el);
                debugMsg = 'Element re-stamped to DOM using only cached parent, no sibling element required. '
                    + debugMsg;
            }
            delete el.cachedP;
            el.removeAttribute(Ch5AttrsShowPulse.KEEP_SIG_SUBS_ATTR);
        }
        Ch5AttrsLog.info(el.hasAttribute('debug'), debugMsg, ...debugOtp);
        el.classList.remove('ch5-hide-vis');
        el.classList.remove('ch5-hide-dis');
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
        return (Ch5AttrsShowPulse.NOSHOW_VALUES.indexOf(_noShowType) > -1)
            ? _noShowType
            : Ch5AttrsShowPulse.DEFAULT_NOSHOW_VALUE;
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
                el.setAttribute(Ch5AttrsShowPulse.KEEP_SIG_SUBS_ATTR, '');
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
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME, { direction: "state", booleanJoin: 1, contractName: true });
    }
}
Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME = 'data-ch5-showpulse';
Ch5AttrsShowPulse.NOSHOW_VALUES = ['visibility', 'display', 'remove'];
Ch5AttrsShowPulse.DEFAULT_NOSHOW_VALUE = 'display';
Ch5AttrsShowPulse.KEEP_SIG_SUBS_ATTR = 'data-ch5-keep-sig-subscription';
Ch5AttrsShowPulse.SIGNAL_SUBSCRIPTION_KEY_ATTR = 'data-ch5-show-pulse-subs-key';
Ch5AttrsShowPulse.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLXNob3dwdWxzZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvY2g1LWF0dHJzLXNob3dwdWxzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUF3QyxNQUFNLGNBQWMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBaUM7SUFRN0QsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVc7UUFFL0MsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDekMsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDakQ7UUFFRCxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN2RCxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWpELE1BQU0sR0FBRyxHQUFxQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3RCxNQUFNLE9BQU8sR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BGLE1BQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxNQUFNLEdBQUcsR0FBOEIsR0FBRyxDQUFDLGdCQUFnQixD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