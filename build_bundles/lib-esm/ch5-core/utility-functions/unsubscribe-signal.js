import { Ch5SignalFactory } from "../ch5-signal-factory";
import { Ch5Signal } from "../ch5-signal";
export function unsubscribeState(signalType, signalName, subscriptionId) {
    const csf = Ch5SignalFactory.getInstance();
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    switch (signalType.toLowerCase()) {
        case 'b':
        case 'boolean':
            const bSig = csf.getBooleanSignal(signalName);
            if (null !== bSig) {
                bSig.unsubscribe(subscriptionId);
            }
            break;
        case 'n':
        case 'number':
        case 'numeric':
            const nSig = csf.getNumberSignal(signalName);
            if (null !== nSig) {
                nSig.unsubscribe(subscriptionId);
            }
            break;
        case 's':
        case 'string':
            const sSig = csf.getStringSignal(signalName);
            if (null !== sSig) {
                sSig.unsubscribe(subscriptionId);
            }
            break;
        case 'o':
        case 'object':
            const oSig = csf.getObjectSignal(signalName);
            if (null !== oSig) {
                oSig.unsubscribe(subscriptionId);
            }
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zdWJzY3JpYmUtc2lnbmFsLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvdXRpbGl0eS1mdW5jdGlvbnMvdW5zdWJzY3JpYmUtc2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLMUMsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFVBQXNDLEVBQUUsVUFBa0IsRUFBRSxjQUFzQjtJQUlsSCxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUkzQyxVQUFVLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTdELFFBQVEsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ2pDLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxTQUFTO1lBQ2IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNqQztZQUNELE1BQU07UUFDUCxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ2IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDakM7WUFDRCxNQUFNO1FBQ1AsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLFFBQVE7WUFDWixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNqQztZQUNELE1BQU07UUFDUCxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUTtZQUNaLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsTUFBTTtLQUNQO0FBQ0YsQ0FBQyJ9