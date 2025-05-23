import { Ch5Button } from "./ch5-button";
import { Ch5ButtonMode } from "./ch5-button-mode";
import { Ch5ButtonModeState } from "./ch5-button-mode-state";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5Log } from "../ch5-common/ch5-log";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
export class Ch5ButtonLabel extends Ch5Log {
    constructor() {
        super();
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5ButtonLabel.ELEMENT_NAME, {
            contractname: { contractName: true },
            booleanjoinoffset: { booleanJoin: 1 },
            numericjoinoffset: { numericJoin: 1 },
            stringjoinoffset: { stringJoin: 1 },
        });
    }
    connectedCallback() {
        this.logger.start('connectedCallback');
        if (!(this.parentElement instanceof Ch5Button || this.parentElement instanceof Ch5ButtonMode || this.parentElement instanceof Ch5ButtonModeState)) {
            throw new Error(`Invalid parent element for ch5-button-label.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonLabel);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.log('Ch5ButtonLabel.disconnectedCallback()');
    }
}
Ch5ButtonLabel.ELEMENT_NAME = 'ch5-button-label';
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5ButtonLabel.ELEMENT_NAME, Ch5ButtonLabel);
}
Ch5ButtonLabel.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1idXR0b24vY2g1LWJ1dHRvbi1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFekYsTUFBTSxPQUFPLGNBQWUsU0FBUSxNQUFNO0lBSXpDO1FBQ0MsS0FBSyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtZQUMzRixZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO1lBQ3BDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRTtZQUNyQyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDckMsZ0JBQWdCLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFO1NBQ25DLENBQUMsQ0FBQztJQUNKLENBQUM7SUFNTSxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxZQUFZLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxZQUFZLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxZQUFZLGtCQUFrQixDQUFDLEVBQUU7WUFDbEosTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQU1NLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7O0FBdENzQiwyQkFBWSxHQUFXLGtCQUFrQixDQUFDO0FBMENsRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtPQUN2RSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtJQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQzFFO0FBRUQsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMifQ==