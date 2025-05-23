import { Ch5Log } from "../ch5-common/ch5-log";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
export class Ch5VideoSwitcherScreenLabel extends Ch5Log {
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5VideoSwitcherScreenLabel.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5VideoSwitcherScreenLabel.ELEMENT_NAME, Ch5VideoSwitcherScreenLabel);
        }
    }
    constructor() {
        super();
        this.logger.start('constructor()');
        this.logger.stop();
    }
    connectedCallback() {
        var _a;
        this.logger.start('connectedCallback()');
        if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) !== 'ch5-video-switcher-screen') {
            throw new Error(`Invalid parent element for ch5-video-switcher-screen-label.`);
        }
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5VideoSwitcherScreenLabel);
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
Ch5VideoSwitcherScreenLabel.ELEMENT_NAME = 'ch5-video-switcher-screen-label';
Ch5VideoSwitcherScreenLabel.registerCustomElement();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXN3aXRjaGVyLXNjcmVlbi1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS12aWRlby1zd2l0Y2hlci9jaDUtdmlkZW8tc3dpdGNoZXItc2NyZWVuLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUd2RixNQUFNLE9BQU8sMkJBQTRCLFNBQVEsTUFBTTtJQVE5QyxNQUFNLENBQUMscUJBQXFCO1FBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUN6QixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7ZUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3RGLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLFlBQVksRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0gsQ0FBQztJQUtEO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFLTSxpQkFBaUI7O1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFLLDJCQUEyQixFQUFFO1lBQzlFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztTQUNoRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sb0JBQW9CO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOztBQXpDYSx3Q0FBWSxHQUFHLGlDQUFpQyxDQUFDO0FBK0NqRSwyQkFBMkIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDIn0=