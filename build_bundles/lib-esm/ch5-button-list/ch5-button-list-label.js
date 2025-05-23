import { Ch5ButtonListLabelBase } from "./base-classes/ch5-button-list-label-base";
import { Ch5ButtonList } from "./ch5-button-list";
import { Ch5ButtonListMode } from "./ch5-button-list-mode";
import { Ch5ButtonListModeState } from "./ch5-button-list-mode-state";
export class Ch5ButtonListLabel extends Ch5ButtonListLabelBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ButtonListLabel.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ButtonListLabel.ELEMENT_NAME, Ch5ButtonListLabel);
        }
    }
    connectedCallback() {
        if (!(this.parentElement instanceof Ch5ButtonList || this.parentElement instanceof Ch5ButtonListMode || this.parentElement instanceof Ch5ButtonListModeState)) {
            throw new Error(`Invalid parent element for ${Ch5ButtonListLabel.ELEMENT_NAME}.`);
        }
        super.connectedCallback();
    }
}
Ch5ButtonListLabel.ELEMENT_NAME = 'ch5-button-list-label';
Ch5ButtonListLabel.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi1saXN0L2NoNS1idXR0b24tbGlzdC1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdEUsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjtJQVVyRCxNQUFNLENBQUMscUJBQXFCO1FBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUN6QixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7ZUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzdFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ25GO0lBQ0gsQ0FBQztJQU9NLGlCQUFpQjtRQUN0QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxZQUFZLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxZQUFZLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLFlBQVksc0JBQXNCLENBQUMsRUFBRTtZQUM3SixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ25GO1FBQ0QsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7QUF6QmEsK0JBQVksR0FBRyx1QkFBdUIsQ0FBQztBQTZCdkQsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyJ9