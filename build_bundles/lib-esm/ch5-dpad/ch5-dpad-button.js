import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5DpadButtonBase } from "./ch5-dpad-button-base";
export class Ch5DpadButton extends Ch5DpadButtonBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function") {
            window.customElements.define(Ch5DpadButton.ELEMENT_NAME, Ch5DpadButton);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5DpadButton.ELEMENT_NAME, Ch5DpadButton.SIGNAL_ATTRIBUTE_TYPES);
    }
    constructor(parentDpad, isDisabled = false) {
        super(parentDpad, isDisabled);
    }
}
Ch5DpadButton.ELEMENT_NAME = 'ch5-dpad-button';
Ch5DpadButton.registerCustomElement();
Ch5DpadButton.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWRwYWQtYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWRwYWQvY2g1LWRwYWQtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXpGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzNELE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCO0lBVTVDLE1BQU0sQ0FBQyxxQkFBcUI7UUFDbEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2VBQzFCLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRO2VBQ3pDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEU7SUFDRixDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBTUQsWUFBbUIsVUFBbUIsRUFBRSxhQUFzQixLQUFLO1FBQ2xFLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7QUF4QnNCLDBCQUFZLEdBQUcsaUJBQWlCLENBQUM7QUE4QnpELGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDIn0=