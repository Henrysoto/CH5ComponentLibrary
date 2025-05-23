import { Ch5SignalFactory } from "../ch5-signal-factory";
import { Ch5Signal } from "../ch5-signal";
import { isNil } from 'lodash';
export function subscribeState(signalType, signalName, callback, errCallback) {
    const csf = Ch5SignalFactory.getInstance();
    let subId = '';
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    switch (signalType.toLowerCase()) {
        case 'b':
        case 'boolean':
            const bSig = csf.getBooleanSignal(signalName);
            if (!isNil(bSig)) {
                subId = bSig.subscribe(callback, errCallback);
            }
            break;
        case 'n':
        case 'number':
        case 'numeric':
            const nSig = csf.getNumberSignal(signalName);
            if (!isNil(nSig)) {
                subId = nSig.subscribe(callback, errCallback);
            }
            break;
        case 's':
        case 'string':
            const sSig = csf.getStringSignal(signalName);
            if (!isNil(sSig)) {
                subId = sSig.subscribe(callback, errCallback);
            }
            break;
        case 'o':
        case 'object':
            const oSig = csf.getObjectSignal(signalName);
            if (!isNil(oSig)) {
                subId = oSig.subscribe(callback, errCallback);
            }
            break;
        default:
            if (!isNil(errCallback)) {
                errCallback(`Signal: ${signalName}, has unsupported type: ${signalType}`);
            }
    }
    return subId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLXNpZ25hbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL3N1YnNjcmliZS1zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0xQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBUS9CLE1BQU0sVUFBVSxjQUFjLENBQUMsVUFBc0MsRUFBRSxVQUFrQixFQUMxRCxRQUErQyxFQUMvQyxXQUFvQztJQUUvRCxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxJQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7SUFHdkIsVUFBVSxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU3RCxRQUFRLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssU0FBUztZQUNWLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQTRDLEVBQy9ELFdBQStDLENBQUMsQ0FBQzthQUN4RDtZQUNELE1BQU07UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ1YsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQTJDLEVBQzlELFdBQThDLENBQUMsQ0FBQzthQUN2RDtZQUNELE1BQU07UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUTtZQUNULE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUEyQyxFQUM5RCxXQUE4QyxDQUFDLENBQUM7YUFDdkQ7WUFDRCxNQUFNO1FBQ1YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLFFBQVE7WUFDVCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBMkMsRUFDOUQsV0FBOEMsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsTUFBTTtRQUNWO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDckIsV0FBVyxDQUFDLFdBQVcsVUFBVSwyQkFBMkIsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUM3RTtLQUNSO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9