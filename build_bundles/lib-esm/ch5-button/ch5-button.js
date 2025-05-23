import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5ButtonBase } from "./ch5-button-base";
export class Ch5Button extends Ch5ButtonBase {
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Button.ELEMENT_NAME, Ch5Button.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerSignalAttributeDefaults() {
        Ch5SignalAttributeRegistry.instance.addElementDefaultAttributeEntries(Ch5Button.ELEMENT_NAME, {
            contractName: { attributes: ["contractname"], defaultValue: "" },
            booleanJoin: { attributes: ["booleanjoinoffset"], defaultValue: "0" },
            numericJoin: { attributes: ["numericjoinoffset"], defaultValue: "0" },
            stringJoin: { attributes: ["stringjoinoffset"], defaultValue: "0" }
        });
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Button.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Button.ELEMENT_NAME, Ch5Button);
        }
    }
    constructor(buttonListContractObj) {
        super(buttonListContractObj);
        this.buttonListContractObj = buttonListContractObj;
    }
}
Ch5Button.ELEMENT_NAME = 'ch5-button';
Ch5Button.registerCustomElement();
Ch5Button.registerSignalAttributeTypes();
Ch5Button.registerSignalAttributeDefaults();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1idXR0b24vY2g1LWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHbEQsTUFBTSxPQUFPLFNBQVUsU0FBUSxhQUFhO0lBSXBDLE1BQU0sQ0FBQyw0QkFBNEI7UUFDekMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVNLE1BQU0sQ0FBQywrQkFBK0I7UUFDNUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDN0YsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtZQUNoRSxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUU7WUFDckUsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQ3JFLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRTtTQUNuRSxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sTUFBTSxDQUFDLHFCQUFxQjtRQUNsQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7ZUFDMUIsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVE7ZUFDekMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxVQUFVO2VBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDcEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRTtJQUNGLENBQUM7SUFFRCxZQUFtQixxQkFBaUQ7UUFDbkUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFEWCwwQkFBcUIsR0FBckIscUJBQXFCLENBQTRCO0lBRXBFLENBQUM7O0FBMUJzQixzQkFBWSxHQUFHLFlBQVksQ0FBQztBQThCcEQsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDbEMsU0FBUyxDQUFDLDRCQUE0QixFQUFFLENBQUM7QUFDekMsU0FBUyxDQUFDLCtCQUErQixFQUFFLENBQUMifQ==