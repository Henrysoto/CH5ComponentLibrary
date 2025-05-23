import _ from "lodash";
import { Ch5Log } from "../ch5-common/ch5-log";
export class Ch5ImageMode extends Ch5Log {
    set url(value) {
        if (value && this._url !== value) {
            this._url = value;
            this.setAttribute('url', value);
            this._parentCh5Image.setImageDisplay();
        }
    }
    get url() {
        return this._url;
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        const ch5ButtonModeChildAttributes = [
            'url'
        ];
        return commonAttributes.concat(ch5ButtonModeChildAttributes);
    }
    constructor() {
        super();
        this._url = '';
        this.logger.start('constructor()');
        this._parentCh5Image = this.getParentImage();
        this.logger.stop();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (newValue === oldValue) {
            return;
        }
        switch (attr) {
            case 'url':
                this.url = newValue;
                break;
        }
    }
    getParentImage() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-IMAGE") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
}
Ch5ImageMode.ELEMENT_NAME = 'ch5-image-mode';
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5ImageMode.ELEMENT_NAME, Ch5ImageMode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWltYWdlLW1vZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtaW1hZ2UvY2g1LWltYWdlLW1vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUkvQyxNQUFNLE9BQU8sWUFBYSxTQUFRLE1BQU07SUFNdkMsSUFBVyxHQUFHLENBQUMsS0FBYTtRQUMzQixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQztJQUNELElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRU0sTUFBTSxLQUFLLGtCQUFrQjtRQUNuQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztRQUVuRCxNQUFNLDRCQUE0QixHQUFhO1lBQzlDLEtBQUs7U0FDTCxDQUFDO1FBRUYsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQXpCRixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBMEJ4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtRQUMvRSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTztTQUNQO1FBRUQsUUFBUSxJQUFJLEVBQUU7WUFDYixLQUFLLEtBQUs7Z0JBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ3BCLE1BQU07U0FDUDtJQUNGLENBQUM7SUFFTSxjQUFjO1FBQ3BCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFVLEVBQVksRUFBRTtZQUNyRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsRUFBRTtnQkFDN0UsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBa0IsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsT0FBTyxJQUFnQixDQUFDO1FBQ3pCLENBQUMsQ0FBQTtRQUNELE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLGFBQXFCLENBQUMsQ0FBQztJQUN6RCxDQUFDOztBQXBEc0IseUJBQVksR0FBVyxnQkFBZ0IsQUFBM0IsQ0FBNEI7QUF3RGhFLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRO09BQ3ZFLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO0lBQ3ZELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDdEUifQ==