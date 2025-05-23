import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5ButtonListBase } from "./base-classes/ch5-button-list-base";
export class Ch5ButtonList extends Ch5ButtonListBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ButtonList.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ButtonList.ELEMENT_NAME, Ch5ButtonList);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5ButtonList.ELEMENT_NAME, Ch5ButtonList.SIGNAL_ATTRIBUTE_TYPES);
    }
    constructor() {
        super();
        this.primaryCssClass = Ch5ButtonList.ELEMENT_NAME;
    }
}
Ch5ButtonList.ELEMENT_NAME = 'ch5-button-list';
Ch5ButtonList.SIGNAL_ATTRIBUTE_TYPES = Object.assign({}, Ch5ButtonListBase.SIGNAL_ATTRIBUTE_TYPES);
Ch5ButtonList.registerCustomElement();
Ch5ButtonList.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi1saXN0L2NoNS1idXR0b24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQTRDLE1BQU0sNkNBQTZDLENBQUM7QUFDbkksT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFeEUsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFjM0MsTUFBTSxDQUFDLHFCQUFxQjtRQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7ZUFDekIsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVE7ZUFDekMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxVQUFVO2VBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDeEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsNEJBQTRCO1FBQ3hDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ25JLENBQUM7SUFNRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBOEJwRCxDQUFDOztBQTNEYSwwQkFBWSxHQUFHLGlCQUFpQixDQUFDO0FBRXhCLG9DQUFzQixxQkFDeEMsaUJBQWlCLENBQUMsc0JBQXNCLEVBQzNDO0FBMERKLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDIn0=