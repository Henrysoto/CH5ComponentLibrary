import { isNil } from "lodash";
import { subscribeState } from "../ch5-core/utility-functions/subscribe-signal";
import { publishEvent } from "../ch5-core/utility-functions/publish-signal";
var Ch5HeartbeateSignals;
(function (Ch5HeartbeateSignals) {
    Ch5HeartbeateSignals["CsigHeatbeatRequest"] = "Csig.HeartbeatRequest";
    Ch5HeartbeateSignals["CsigHeatbeatResponse"] = "Csig.HeartbeatResponse";
})(Ch5HeartbeateSignals || (Ch5HeartbeateSignals = {}));
export class Ch5Heartbeats {
    constructor() {
        this._heartbeatRequestSub = subscribeState('object', Ch5HeartbeateSignals.CsigHeatbeatRequest, (value) => {
            publishEvent('object', Ch5HeartbeateSignals.CsigHeatbeatResponse, value);
        });
    }
    static getInstance() {
        if (isNil(this._instance)) {
            this._instance = new Ch5Heartbeats();
        }
        return this._instance;
    }
}
Ch5Heartbeats.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWhlYXJ0YmVhdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL2NoNS1oZWFydGJlYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRTVFLElBQUssb0JBR0o7QUFIRCxXQUFLLG9CQUFvQjtJQUNyQixxRUFBOEMsQ0FBQTtJQUM5Qyx1RUFBK0MsQ0FBQTtBQUNuRCxDQUFDLEVBSEksb0JBQW9CLEtBQXBCLG9CQUFvQixRQUd4QjtBQUVELE1BQU0sT0FBTyxhQUFhO0lBU3hCO1FBRUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQy9DLG9CQUFvQixDQUFDLG1CQUFtQixFQUN4QyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBRWIsWUFBWSxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFPTSxNQUFNLENBQUMsV0FBVztRQUN2QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Q0FFRjtBQUVELGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyJ9