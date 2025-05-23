import { Ch5SignalFactory } from "../ch5-core";
import { Ch5Signal } from "../ch5-core/ch5-signal";
export class Ch5CommonSignal {
    constructor(signalsForCh5Button) {
        this.signals = [];
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
        thisSignal.signalState = receiveSignal;
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
                const sigLabel = csf.getStringSignal(receiveValueSigName);
                if (null !== sigLabel) {
                    sigLabel.unsubscribe(eachSignal.signalState);
                    eachSignal.signalValue = "";
                    eachSignal.signalState = "";
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbW1vbi1zaWduYWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1jb21tb24tc2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTbkQsTUFBTSxPQUFPLGVBQWU7SUFJM0IsWUFBWSxtQkFBNkI7UUFGakMsWUFBTyxHQUEyQixFQUFFLENBQUM7UUFJNUMsS0FBSyxNQUFNLFVBQVUsSUFBSSxtQkFBbUIsRUFBRTtZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDakIsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFlBQVksRUFBRSxFQUFFO2FBQ2hCLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVNLFNBQVMsQ0FBQyxVQUFrQixFQUFFLFdBQW1CO1FBQ3ZELE1BQU0sVUFBVSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3pILElBQUksVUFBVSxDQUFDLFdBQVcsS0FBSyxXQUFXLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUNuRSxPQUFPLElBQUksQ0FBQztTQUNaO1FBR0QsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQzNCLE1BQU0sc0JBQXNCLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRyxNQUFNLFNBQVMsR0FBNkIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFbkgsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN2QixTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFxQixDQUFDLENBQUM7YUFDeEQ7U0FDRDtRQUVELFVBQVUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBR3JDLE1BQU0sbUJBQW1CLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRyxNQUFNLGFBQWEsR0FBNkIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFcEgsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxVQUFVLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztRQUN2QyxPQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDO0lBRU0sU0FBUyxDQUFDLFVBQWtCO1FBQ2xDLE1BQU0sVUFBVSxHQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBeUIsQ0FBQztRQUM3SixPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBRU0sV0FBVyxDQUFDLGFBQXFCLEVBQUUsY0FBc0I7UUFDL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO0lBQzdELENBQUM7SUFFTSxXQUFXLENBQUksYUFBcUI7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQWlCLENBQUM7SUFDeEQsQ0FBQztJQUVNLGNBQWM7UUFDcEIsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3RDLElBQUksVUFBVSxDQUFDLFdBQVcsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQUU7Z0JBQ25FLE1BQU0sbUJBQW1CLEdBQVcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEcsTUFBTSxRQUFRLEdBQTZCLEdBQUcsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUN0QixRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDN0MsVUFBVSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2lCQUM1QjthQUNEO1NBQ0Q7SUFDRixDQUFDO0NBRUQifQ==