import _ from "lodash";
import { Ch5ButtonListIndividualButtonBase } from "./base-classes/ch5-button-list-individual-button-base";
export class Ch5ButtonListIndividualButton extends Ch5ButtonListIndividualButtonBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ButtonListIndividualButton.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ButtonListIndividualButton.ELEMENT_NAME, Ch5ButtonListIndividualButton);
        }
    }
    connectedCallback() {
        var _a;
        const _parentCh5ButtonList = this.getParentButton();
        if (_.isNil(_parentCh5ButtonList) || ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName.toString().toUpperCase()) !== "CH5-BUTTON-LIST") {
            throw new Error(`Invalid parent element for ch5-button-list-individual-button.`);
        }
        super.connectedCallback();
        this.parentComponent = _parentCh5ButtonList;
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-BUTTON-LIST") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
}
Ch5ButtonListIndividualButton.ELEMENT_NAME = 'ch5-button-list-individual-button';
Ch5ButtonListIndividualButton.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LWluZGl2aWR1YWwtYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi1saXN0L2NoNS1idXR0b24tbGlzdC1pbmRpdmlkdWFsLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFHMUcsTUFBTSxPQUFPLDZCQUE4QixTQUFRLGlDQUFpQztJQVU1RSxNQUFNLENBQUMscUJBQXFCO1FBQ2xDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUMxQixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7ZUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3hGLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLFlBQVksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1NBQ3hHO0lBQ0YsQ0FBQztJQU9NLGlCQUFpQjs7UUFDdkIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxFQUFFLE1BQUssaUJBQWlCLEVBQUU7WUFDakgsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQztJQUM3QyxDQUFDO0lBRU0sZUFBZTtRQUNyQixNQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBVSxFQUFpQixFQUFFO1lBQzFELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssaUJBQWlCLEVBQUU7Z0JBQ25GLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQWtCLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sSUFBcUIsQ0FBQztRQUM5QixDQUFDLENBQUE7UUFDRCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFxQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7QUFyQ2EsMENBQVksR0FBRyxtQ0FBbUMsQ0FBQztBQXlDbEUsNkJBQTZCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyJ9