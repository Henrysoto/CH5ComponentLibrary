import { Ch5AttrsLog } from './ch5-attrs-log';
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { CustomAttribute } from './interfaces';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5AttrsAppendclass extends CustomAttribute {
    static handleBeingAddedToDom(el) {
        const sigName = el.getAttribute(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsAppendclass.CH5_ATTR_SIG_SUB_KEY);
        if (oldSubKey !== '') {
            Ch5AttrsAppendclass.handleUnsubscribe(el, sigName, oldSubKey);
        }
        Ch5AttrsAppendclass.handleSubscribe(el, sigName);
    }
    static handleBeingRemovedFromDom(el) {
        const sigName = el.getAttribute(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME) || '';
        const oldSubKey = el.getAttribute(Ch5AttrsAppendclass.CH5_ATTR_SIG_SUB_KEY);
        Ch5AttrsAppendclass.handleUnsubscribe(el, sigName, oldSubKey);
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
                const newClassesList = sigVal.split(' ');
                const currentClasses = el.currentCh5AppendclassVal;
                if (typeof currentClasses === 'string' && currentClasses !== "") {
                    const currentClassesList = currentClasses.split(' ');
                    if (currentClassesList.length > 0) {
                        currentClassesList.forEach((elClass) => {
                            if (elClass !== '' && el.classList.contains(elClass) &&
                                newClassesList.indexOf(elClass) === -1) {
                                el.classList.remove(elClass);
                            }
                        });
                    }
                }
                if (newClassesList.length > 0) {
                    newClassesList.forEach((newClass) => {
                        if (!el.classList.contains(newClass) && newClass !== '') {
                            el.classList.add(newClass);
                        }
                    });
                }
                Ch5AttrsLog.info(_debug, `innerHTML updated to ${sigVal}`, el);
                el.currentCh5AppendclassVal = sigVal;
            });
            el.setAttribute(Ch5AttrsAppendclass.CH5_ATTR_SIG_SUB_KEY, subKey);
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
    static handleCh5AppendclassAttrChange(newValue, oldValue, el) {
        if (typeof oldValue === 'string' && oldValue !== '') {
            const oldSubKey = el.getAttribute(Ch5AttrsAppendclass.CH5_ATTR_SIG_SUB_KEY) || '';
            if (oldSubKey !== '') {
                Ch5AttrsAppendclass.handleUnsubscribe(el, oldValue, oldSubKey);
            }
        }
        if (typeof newValue === 'string' && newValue !== '' && newValue !== oldValue) {
            Ch5AttrsAppendclass.handleSubscribe(el, newValue);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addCustomAttributeEntry(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME, { direction: "state", stringJoin: 1, contractName: true });
    }
}
Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME = 'data-ch5-appendclass';
Ch5AttrsAppendclass.CH5_ATTR_SIG_SUB_KEY = 'data-ch5-appendclass-sub-key';
Ch5AttrsAppendclass.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWFwcGVuZGNsYXNzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWN1c3RvbS1hdHRycy9jaDUtYXR0cnMtYXBwZW5kY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBd0IsTUFBTSxjQUFjLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFNekYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGVBQXVCO0lBS3JELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFXO1FBQzNDLE1BQU0sT0FBTyxHQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEYsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBVyxDQUFDO1FBRXRGLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRTtZQUNsQixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsbUJBQW1CLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLEVBQVc7UUFDL0MsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFXLENBQUM7UUFFdEYsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFXLEVBQUUsT0FBZTtRQUN0RCxJQUFJLE9BQU8sS0FBSyxFQUFFLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQyxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFM0QsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFjLEVBQU8sRUFBRTtnQkFDM0MsTUFBTSxjQUFjLEdBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbkQsTUFBTSxjQUFjLEdBQVksRUFBVSxDQUFDLHdCQUF3QixDQUFDO2dCQUVwRSxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsSUFBSSxjQUFjLEtBQUssRUFBRSxFQUFFO29CQUM3RCxNQUFNLGtCQUFrQixHQUFhLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9ELElBQUksa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDL0Isa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBZSxFQUFFLEVBQUU7NEJBQzNDLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0NBQ2hELGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBRXhDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUNoQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtnQkFFRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTs0QkFDckQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQzlCO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHdCQUF3QixNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUQsRUFBVSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckU7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsT0FBTyxlQUFlLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBVyxFQUFFLE9BQWUsRUFBRSxNQUFjO1FBRXhFLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4RSxPQUFPO1NBQ1Y7UUFDRCxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNuQixvREFBb0QsT0FBTyxpQkFBaUIsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFOUYsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2RSxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUMvQixHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHNCQUFzQixPQUFPLGlCQUFpQixNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4RjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsOEJBQThCLENBQUMsUUFBdUIsRUFBRSxRQUF1QixFQUFFLEVBQVc7UUFPdEcsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xGLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRTtnQkFDbEIsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNsRTtTQUNKO1FBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxLQUFLLEVBQUUsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzFFLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN0QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQzlGLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O0FBNUdhLHNDQUFrQixHQUFXLHNCQUFzQixDQUFDO0FBQ3BELHdDQUFvQixHQUFXLDhCQUE4QixDQUFDO0FBK0doRixtQkFBbUIsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDIn0=