import { Ch5ButtonListLabelBase } from "./../ch5-button-list/base-classes/ch5-button-list-label-base";
import { Ch5TabButton } from "./ch5-tab-button";
export class Ch5TabButtonLabel extends Ch5ButtonListLabelBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5TabButtonLabel.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5TabButtonLabel.ELEMENT_NAME, Ch5TabButtonLabel);
        }
    }
    connectedCallback() {
        if (!(this.parentElement instanceof Ch5TabButton)) {
            throw new Error(`Invalid parent element for ${Ch5TabButtonLabel.ELEMENT_NAME}.`);
        }
        super.connectedCallback();
    }
}
Ch5TabButtonLabel.ELEMENT_NAME = 'ch5-tab-button-label';
Ch5TabButtonLabel.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRhYi1idXR0b24tbGFiZWwuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdGFiLWJ1dHRvbi9jaDUtdGFiLWJ1dHRvbi1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLHNCQUFzQjtJQVVwRCxNQUFNLENBQUMscUJBQXFCO1FBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUN6QixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7ZUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzVFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQztJQU9NLGlCQUFpQjtRQUN0QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxZQUFZLFlBQVksQ0FBQyxFQUFFO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLGlCQUFpQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDbEY7UUFDRCxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM1QixDQUFDOztBQXpCYSw4QkFBWSxHQUFHLHNCQUFzQixDQUFDO0FBNkJ0RCxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDIn0=