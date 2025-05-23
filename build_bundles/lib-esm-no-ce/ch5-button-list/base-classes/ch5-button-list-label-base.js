import { Ch5Log } from "../../ch5-common/ch5-log";
import { Ch5RoleAttributeMapping } from "../../utility-models/ch5-role-attribute-mapping";
export class Ch5ButtonListLabelBase extends Ch5Log {
    constructor() {
        super();
        this.logger.start('constructor()');
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonListLabel);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.logger.stop();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LWxhYmVsLWJhc2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uLWxpc3QvYmFzZS1jbGFzc2VzL2NoNS1idXR0b24tbGlzdC1sYWJlbC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUcxRixNQUFNLE9BQU8sc0JBQXVCLFNBQVEsTUFBTTtJQUloRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBS00saUJBQWlCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxvQkFBb0I7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FJRiJ9