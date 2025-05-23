import _ from 'lodash';
import { Ch5SignalFactory, Ch5Signal } from "../ch5-core";
import { Ch5ListAbstractHelper } from "./ch5-list-abstract-helper";
export class Ch5ListSignalManager extends Ch5ListAbstractHelper {
    unsubscribeFromSignals(clearStringSignalSubscription) {
        const _listComponent = this._list;
        this.clearSubscription(clearStringSignalSubscription, _listComponent.receiveStateScrollToSub, 'receiveStateScrollTo');
        this.clearSubscription(clearStringSignalSubscription, _listComponent.receiveStateSize, 'receiveStateSize');
        this.clearSubscription(clearStringSignalSubscription, _listComponent.receiveStateTemplateVarsSub, 'receiveStateTemplateVars');
    }
    subscribeToSignal(type, signalPropName, signalSub, callback) {
        if (signalPropName === undefined || signalSub === undefined) {
            return '';
        }
        signalPropName = Ch5Signal.getSubscriptionSignalName(signalPropName);
        if (signalPropName !== undefined && signalPropName !== null) {
            const oldSignal = this.getStateFromFactory(signalPropName, type);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(signalSub);
            }
        }
        const receiveSignal = this.getStateFromFactory(signalPropName, type);
        if (_.isNil(receiveSignal)) {
            return '';
        }
        return receiveSignal.subscribe(callback.bind(this._list));
    }
    getStateFromFactory(signalName, type) {
        const signal = Ch5SignalFactory.getInstance().getState(signalName, type);
        return signal;
    }
    clearSubscription(clearSubscription, signalSub, signalName) {
        const _listComponent = Object.assign({}, this._list);
        if ((signalName in _listComponent) && _listComponent[signalName] !== null) {
            clearSubscription(signalName, signalSub);
            _listComponent[signalName] = '';
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3Qtc2lnbmFsLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbGlzdC9jaDUtbGlzdC1zaWduYWwtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU9uRSxNQUFNLE9BQU8sb0JBQXFCLFNBQVEscUJBQXFCO0lBRXRELHNCQUFzQixDQUFDLDZCQUFpRDtRQUU3RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBZ0IsQ0FBQztRQUU3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsNkJBQTZCLEVBQUUsY0FBYyxDQUFDLHVCQUFpQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDaEksSUFBSSxDQUFDLGlCQUFpQixDQUFDLDZCQUE2QixFQUFFLGNBQWMsQ0FBQyxnQkFBMEIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsRUFBRSxjQUFjLENBQUMsMkJBQXFDLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUMxSSxDQUFDO0lBRU0saUJBQWlCLENBQW9CLElBQU8sRUFBRSxjQUFzQixFQUFFLFNBQWlCLEVBQUUsUUFBb0M7UUFDbEksSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0QsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUdELGNBQWMsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFHckUsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVqRSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbEM7U0FDRjtRQUdELE1BQU0sYUFBYSxHQUF3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFGLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQU9NLG1CQUFtQixDQUFvQixVQUFrQixFQUFFLElBQU87UUFDdkUsTUFBTSxNQUFNLEdBQXdCLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUYsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLGlCQUFxQyxFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFFcEcsTUFBTSxjQUFjLHFCQUNmLElBQUksQ0FBQyxLQUFLLENBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN6RSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDekMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7Q0FFRiJ9