import { Ch5SignalFactory } from "../ch5-core";
import { Ch5Signal } from "../ch5-core/ch5-signal";
export class Ch5ButtonSignal {
    constructor() {
        this.signals = [];
        const signalsForCh5Button = ["receiveStateType", "receiveStateCustomClass", "receiveStateCustomStyle", "receiveStateIconClass", "receiveStateIconUrl", "receiveStateLabel", "receiveStateScriptLabelHtml"];
        for (const eachSignal of signalsForCh5Button) {
            this.signals.push({
                signalName: eachSignal,
                signalValue: "",
                signalState: "",
                currentValue: ""
            });
        }
    }
    setSignal(signalName, signalValue) {
        const thisSignal = this.signals.find((signal) => signal.signalName.toLowerCase() === signalName.toLowerCase());
        if (thisSignal.signalValue === signalValue || signalValue === null) {
            return null;
        }
        if (thisSignal.signalValue) {
            const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(thisSignal.signalValue);
            const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldReceiveStateSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(thisSignal.signalState);
            }
        }
        thisSignal.signalValue = signalValue;
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(thisSignal.signalValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    getSignal(signalName) {
        const thisSignal = (this.signals.find(signal => signal.signalName.toLowerCase() === signalName.toLowerCase()));
        return thisSignal;
    }
    setVariable(attributeName, attributeValue) {
        this.getSignal(attributeName).currentValue = attributeValue;
    }
    getVariable(attributeName) {
        return this.getSignal(attributeName).currentValue;
    }
    unsubscribeAll() {
        const csf = Ch5SignalFactory.getInstance();
        for (const eachSignal of this.signals) {
            if (eachSignal.signalState !== '' && eachSignal.signalValue !== '') {
                const receiveValueSigName = Ch5Signal.getSubscriptionSignalName(eachSignal.signalValue);
                const receiveSignal = csf.getStringSignal(receiveValueSigName);
                if (null !== receiveSignal) {
                    receiveSignal.unsubscribe(eachSignal.signalState);
                    eachSignal.signalValue = "";
                    eachSignal.signalState = "";
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1zaWduYWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uL2NoNS1idXR0b24tc2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTbkQsTUFBTSxPQUFPLGVBQWU7SUFJM0I7UUFGUSxZQUFPLEdBQThCLEVBQUUsQ0FBQztRQUcvQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUMzTSxLQUFLLE1BQU0sVUFBVSxJQUFJLG1CQUFtQixFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNqQixVQUFVLEVBQUUsVUFBVTtnQkFDdEIsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsWUFBWSxFQUFFLEVBQUU7YUFDaEIsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRU0sU0FBUyxDQUFDLFVBQWtCLEVBQUUsV0FBbUI7UUFDdkQsTUFBTSxVQUFVLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDekgsSUFBSSxVQUFVLENBQUMsV0FBVyxLQUFLLFdBQVcsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ25FLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFHRCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsTUFBTSxzQkFBc0IsR0FBVyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25HLE1BQU0sU0FBUyxHQUE2QixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUVuSCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQXFCLENBQUMsQ0FBQzthQUN4RDtTQUNEO1FBRUQsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFHckMsTUFBTSxtQkFBbUIsR0FBVyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sYUFBYSxHQUE2QixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVwSCxJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxTQUFTLENBQUMsVUFBa0I7UUFDbEMsTUFBTSxVQUFVLEdBQTRCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUE0QixDQUFDO1FBQ25LLE9BQU8sVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFFTSxXQUFXLENBQUMsYUFBcUIsRUFBRSxjQUFzQjtRQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7SUFDN0QsQ0FBQztJQUVNLFdBQVcsQ0FBSSxhQUFxQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBaUIsQ0FBQztJQUN4RCxDQUFDO0lBRU0sY0FBYztRQUNwQixNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDdEMsSUFBSSxVQUFVLENBQUMsV0FBVyxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTtnQkFDbkUsTUFBTSxtQkFBbUIsR0FBVyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRyxNQUFNLGFBQWEsR0FBNkIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RixJQUFJLElBQUksS0FBSyxhQUFhLEVBQUU7b0JBQzNCLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNsRCxVQUFVLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsVUFBVSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7aUJBQzVCO2FBQ0Q7U0FDRDtJQUNGLENBQUM7Q0FFRCJ9