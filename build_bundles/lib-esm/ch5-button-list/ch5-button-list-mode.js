import _ from "lodash";
import { Ch5ButtonListModeBase } from "./base-classes/ch5-button-list-mode-base";
import { Ch5ButtonList } from "./ch5-button-list";
export class Ch5ButtonListMode extends Ch5ButtonListModeBase {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5ButtonListMode.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5ButtonListMode.ELEMENT_NAME, Ch5ButtonListMode);
        }
    }
    connectedCallback() {
        const _parentCh5ButtonList = this.getParentButton();
        if (!(this.parentElement instanceof Ch5ButtonList)) {
            throw new Error(`Invalid parent element for ch5-button-list-mode.`);
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
Ch5ButtonListMode.ELEMENT_NAME = 'ch5-button-list-mode';
Ch5ButtonListMode.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LW1vZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uLWxpc3QvY2g1LWJ1dHRvbi1saXN0LW1vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEscUJBQXFCO0lBVW5ELE1BQU0sQ0FBQyxxQkFBcUI7UUFDakMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2VBQ3pCLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRO2VBQ3pDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssVUFBVTtlQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDNUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO0lBT00saUJBQWlCO1FBQ3RCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLFlBQVksYUFBYSxDQUFDLEVBQUU7WUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDakU7UUFDRCxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDO0lBQzlDLENBQUM7SUFFTSxlQUFlO1FBQ3BCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFVLEVBQWlCLEVBQUU7WUFDekQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBaUIsRUFBRTtnQkFDbEYsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBa0IsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxJQUFxQixDQUFDO1FBQy9CLENBQUMsQ0FBQTtRQUNELE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLGFBQXFCLENBQUMsQ0FBQztJQUMxRCxDQUFDOztBQTFDYSw4QkFBWSxHQUFHLHNCQUFzQixDQUFDO0FBOEN0RCxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDIn0=