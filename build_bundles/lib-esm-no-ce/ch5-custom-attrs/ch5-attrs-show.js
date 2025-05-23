import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsShow extends CustomAttribute {
    static checkAndSubscribeToSignal(el) {
        if (el.hasAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME)) {
            const _debug = el.hasAttribute('debug');
            const csf = Ch5SignalFactory.getInstance();
            const sigName = el.getAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME) || '';
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            const sig = csf.getBooleanSignal(subSigName);
            if (sig) {
                const subscriptionKey = sig.subscribe((dataCh5ShowVal) => {
                    Ch5AttrsShow.handleDataCh5ShowReceived(el, dataCh5ShowVal);
                });
                Ch5AttrsLog.info(_debug, `Signal subscription complete... ${subscriptionKey}`, el);
                el.setAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR, subscriptionKey);
            }
        }
    }
    static handleElAddedToDOM(el) {
        if (el.hasAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR)) {
            const _debug = el.hasAttribute('debug');
            Ch5AttrsLog.info(_debug, `Added node already has data-ch5-show 
                    subs: ${el.getAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR)}`, el);
        }
        else {
            Ch5AttrsShow.checkAndSubscribeToSignal(el);
        }
    }
    static elHasRemovableSigSubscription(el) {
        return el.hasAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR) &&
            el.hasAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME) &&
            !el.hasAttribute(Ch5AttrsShow.KEEP_SIG_SUBS_ATTR);
    }
    static unsubscribeDataCh5ShowSig(sigName, sigSubsKey) {
        const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const oldSig = Ch5SignalFactory.getInstance().getBooleanSignal(subSigName);
        if (oldSig) {
            oldSig.unsubscribe(sigSubsKey);
        }
    }
    static removeSigSubscription(el) {
        const sigSubsKey = el.getAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        Ch5AttrsLog.info(true, `Node removed without using signal value... signal subscription: 
                    ${sigSubsKey} needs to be canceled`, el);
        const sigName = el.getAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME) || '';
        Ch5AttrsShow.unsubscribeDataCh5ShowSig(sigName, sigSubsKey);
    }
    static handleCh5ShowAttributeChange(newValue, oldValue, n) {
        const _debug = n.hasAttribute('debug');
        const _currentSigSubsKey = n.getAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR) || '';
        if (typeof oldValue === 'string' && oldValue !== '' && _currentSigSubsKey !== '') {
            Ch5AttrsLog.info(_debug, `Unsubscribing ${_currentSigSubsKey}`, n);
            this.unsubscribeDataCh5ShowSig(oldValue, _currentSigSubsKey);
            n.removeAttribute(Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR);
        }
        if (typeof newValue === 'string' && newValue !== '') {
            Ch5AttrsShow.checkAndSubscribeToSignal(n);
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
        return (Ch5AttrsShow.NOSHOW_VALUES.indexOf(_noShowType) > -1)
            ? _noShowType
            : Ch5AttrsShow.DEFAULT_NOSHOW_VALUE;
    }
    static handleDataCh5ShowReceived(el, show) {
        if (!show) {
            const noshowType = Ch5AttrsShow.getNoShowType(el);
            Ch5AttrsShow.hideElement(el, noshowType);
        }
        else {
            Ch5AttrsShow.showElement(el);
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
                el.setAttribute(Ch5AttrsShow.KEEP_SIG_SUBS_ATTR, '');
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
            el.removeAttribute(Ch5AttrsShow.KEEP_SIG_SUBS_ATTR);
        }
        Ch5AttrsLog.info(el.hasAttribute('debug'), debugMsg, ...debugOtp);
        el.classList.remove('ch5-hide-vis');
        el.classList.remove('ch5-hide-dis');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsShow.DATA_CH5_ATTR_NAME, { direction: "state", booleanJoin: 1, contractName: true });
    }
}
Ch5AttrsShow.DATA_CH5_ATTR_NAME = 'data-ch5-show';
Ch5AttrsShow.NOSHOW_VALUES = ['visibility', 'display', 'remove'];
Ch5AttrsShow.DEFAULT_NOSHOW_VALUE = 'display';
Ch5AttrsShow.KEEP_SIG_SUBS_ATTR = 'data-ch5-keep-sig-subscription';
Ch5AttrsShow.SIGNAL_SUBSCRIPTION_KEY_ATTR = 'data-ch5-show-subs-key';
Ch5AttrsShow.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLXNob3cuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY3VzdG9tLWF0dHJzL2NoNS1hdHRycy1zaG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQW1DLE1BQU0sY0FBYyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXpGLE1BQU0sT0FBTyxZQUFhLFNBQVEsZUFBaUM7SUFReEQsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVc7UUFDL0MsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2xELE1BQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakQsTUFBTSxHQUFHLEdBQXFCLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdELE1BQU0sT0FBTyxHQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9FLE1BQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxNQUFNLEdBQUcsR0FBOEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhFLElBQUksR0FBRyxFQUFFO2dCQUNMLE1BQU0sZUFBZSxHQUFXLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUF1QixFQUFFLEVBQUU7b0JBQ3RFLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxDQUFDO2dCQUNILFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUFtQyxlQUFlLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkYsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDL0U7U0FDSjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBVztRQUN4QyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFDNUQsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDbkI7NEJBQ1ksRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JGO2FBQU07WUFFSCxZQUFZLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLDZCQUE2QixDQUFDLEVBQVc7UUFDbkQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQztZQUM3RCxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUNoRCxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVTLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDMUUsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sTUFBTSxHQUE4QixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RyxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQVc7UUFDM0MsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUYsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ2pCO3NCQUNVLFVBQVUsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0UsWUFBWSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QixDQUFDLFFBQXVCLEVBQUUsUUFBdUIsRUFBRSxDQUFVO1FBUW5HLE1BQU0sTUFBTSxHQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsTUFBTSxrQkFBa0IsR0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuRyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssRUFBRSxJQUFJLGtCQUFrQixLQUFLLEVBQUUsRUFBRTtZQUU5RSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNoRTtRQUVELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFFakQsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBVztRQUNuQyxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDekMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUVILFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDOUIsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLFdBQVcsR0FBRyxTQUFTLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLFdBQVcsR0FBRyxRQUFRLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1Y7b0JBRUksV0FBVyxHQUFHLFlBQVksQ0FBQzthQUNsQztTQUNKO1FBR0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxXQUFXO1lBQ2IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxDQUFDO0lBR00sTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVcsRUFBRSxJQUFhO1FBQzlELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFFUCxNQUFNLFVBQVUsR0FBVyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFFSCxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBVyxFQUFFLFVBQWtCO1FBQ3JELFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFDckMsbUNBQW1DLFVBQVUsRUFBRSxFQUMvQyxFQUFFLENBQUMsQ0FBQztRQUNSLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssU0FBUztnQkFDVixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDVixLQUFLLFlBQVk7Z0JBQ2IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1Y7Z0JBRUksRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBR3JELE1BQU0sTUFBTSxHQUFnQixFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsR0FBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFFeEMsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdEIsRUFBVSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQ2hDO2dCQUNELElBQUksR0FBRyxFQUFFO29CQUNKLEVBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUN6QjtTQUNSO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBVztRQUNqQyxNQUFNLE9BQU8sR0FBb0IsRUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNwRCxJQUFJLFFBQVEsR0FBVyxzQ0FBc0MsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksT0FBTyxFQUFFO1lBQ1QsTUFBTSxLQUFLLEdBQW9CLEVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxDQUFDLGFBQWEsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLFFBQVEsR0FBRyxzRUFBc0UsR0FBRyxRQUFRLENBQUM7Z0JBQzdGLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLE9BQVEsRUFBVSxDQUFDLEdBQUcsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixRQUFRLEdBQUcsbUZBQW1GO3NCQUN4RixRQUFRLENBQUM7YUFDbEI7WUFFRCxPQUFRLEVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDM0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2RDtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN0QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUN2RixFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDOztBQTNMYSwrQkFBa0IsR0FBVyxlQUFlLENBQUM7QUFDN0MsMEJBQWEsR0FBYSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUQsaUNBQW9CLEdBQVcsU0FBUyxDQUFDO0FBQ3pDLCtCQUFrQixHQUFXLGdDQUFnQyxDQUFDO0FBQzlELHlDQUE0QixHQUFXLHdCQUF3QixDQUFDO0FBMExsRixZQUFZLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyJ9