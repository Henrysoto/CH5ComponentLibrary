import { Ch5SignalFactory } from "../ch5-signal-factory";
export function publishEvent(signalType, signalName, value) {
    const csf = Ch5SignalFactory.getInstance();
    switch (signalType.toLowerCase()) {
        case 'b':
        case 'boolean':
            const bSig = csf.getBooleanSignal(signalName);
            if (null !== bSig) {
                bSig.publish(value);
            }
            break;
        case 'n':
        case 'number':
        case 'numeric':
            const nSig = csf.getNumberSignal(signalName);
            if (null !== nSig) {
                nSig.publish(value);
            }
            break;
        case 's':
        case 'string':
            const sSig = csf.getStringSignal(signalName);
            if (null !== sSig) {
                sSig.publish(value);
            }
            break;
        case 'o':
        case 'object':
            const oSig = csf.getObjectSignal(signalName);
            if (null !== oSig) {
                oSig.publish(value);
            }
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC1zaWduYWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS91dGlsaXR5LWZ1bmN0aW9ucy9wdWJsaXNoLXNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUt2RCxNQUFNLFVBQVUsWUFBWSxDQUFDLFVBQXFDLEVBQUUsVUFBaUIsRUFBRSxLQUFrQjtJQUlyRyxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUUzQyxRQUFRLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssU0FBUztZQUNWLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QyxJQUFLLElBQUksS0FBSyxJQUFJLEVBQUc7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBZ0IsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTTtRQUNWLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFNBQVM7WUFDVixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUssSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFlLENBQUMsQ0FBQzthQUNqQztZQUNELE1BQU07UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUTtZQUNULE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFBSyxJQUFJLEtBQUssSUFBSSxFQUFDO2dCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBZSxDQUFDLENBQUM7YUFDakM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLFFBQVE7WUFDVCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUssSUFBSSxLQUFLLElBQUksRUFBRztnQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFlLENBQUMsQ0FBQzthQUNqQztZQUNELE1BQU07S0FDYjtBQUNMLENBQUMifQ==