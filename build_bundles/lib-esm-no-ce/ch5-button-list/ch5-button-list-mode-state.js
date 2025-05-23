import _ from "lodash";
import { Ch5ButtonListModeBase } from "./base-classes/ch5-button-list-mode-base";
import { Ch5ButtonListModeStateBase } from "./base-classes/ch5-button-list-mode-state-base";
export class Ch5ButtonListModeState extends Ch5ButtonListModeStateBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ButtonListModeState.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ButtonListModeState.ELEMENT_NAME, Ch5ButtonListModeState);
        }
    }
    connectedCallback() {
        const _parentCh5ButtonList = this.getParentButton();
        if (!(this.parentElement instanceof Ch5ButtonListModeBase)) {
            throw new Error(`Invalid parent element for ch5-button-list-mode-state.`);
        }
        if (_.isNil(_parentCh5ButtonList)) {
            throw new Error(`Invalid parent element for ${this.nodeName}.`);
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
Ch5ButtonListModeState.ELEMENT_NAME = 'ch5-button-list-mode-state';
Ch5ButtonListModeState.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LW1vZGUtc3RhdGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uLWxpc3QvY2g1LWJ1dHRvbi1saXN0LW1vZGUtc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRzVGLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSwwQkFBMEI7SUFVN0QsTUFBTSxDQUFDLHFCQUFxQjtRQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7ZUFDekIsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVE7ZUFDekMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxVQUFVO2VBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUMzRjtJQUNILENBQUM7SUFPTSxpQkFBaUI7UUFDdEIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsWUFBWSxxQkFBcUIsQ0FBQyxFQUFFO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQztJQUM5QyxDQUFDO0lBRU0sZUFBZTtRQUNwQixNQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBVSxFQUFpQixFQUFFO1lBQ3pELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssaUJBQWlCLEVBQUU7Z0JBQ2xGLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQWtCLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sSUFBcUIsQ0FBQztRQUMvQixDQUFDLENBQUE7UUFDRCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFxQixDQUFDLENBQUM7SUFDMUQsQ0FBQzs7QUExQ2EsbUNBQVksR0FBRyw0QkFBNEIsQ0FBQztBQThDNUQsc0JBQXNCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyJ9