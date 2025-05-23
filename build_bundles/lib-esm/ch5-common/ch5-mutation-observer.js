import _ from "lodash";
export class Ch5MutationObserver {
    static checkElementValidity(target) {
        return (!_.isNil(target) &&
            target.nodeName !== 'BODY' &&
            ((target.classList === undefined) ||
                (target.classList.length <= 0) ||
                (Ch5MutationObserver.ELEMENTS_MO_EXCEPTION.indexOf(target.classList[0]) < 0)));
    }
    constructor(element) {
        this.isConnected = false;
        this._element = {};
        this._element = element;
        this._mutationsObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'inert')) {
                    this._updateComponentVisibility(mutation.target);
                }
            });
        });
        this._mutationsObserverConfig = {
            attributes: true,
            attributeOldValue: true,
            childList: false,
            subtree: false,
            attributeFilter: ['style', 'inert']
        };
    }
    observe(target) {
        this._mutationsObserver.observe(target, this._mutationsObserverConfig);
    }
    disconnectObserver() {
        if (this._mutationsObserver instanceof MutationObserver) {
            this.isConnected = false;
            this._mutationsObserver.disconnect();
        }
    }
    _updateComponentVisibility(node) {
        const htmlElement = node;
        if (_.isNil(htmlElement.offsetParent)) {
            this._element.updateElementVisibility(false);
        }
        else {
            if (this._shouldUpdateComponentVisibility(node) === false) {
                this._element.updateElementVisibility(false);
            }
            else {
                this._element.updateElementVisibility(true);
            }
        }
    }
    _shouldUpdateComponentVisibility(node) {
        let styles = {};
        if (document && document.defaultView) {
            styles = document.defaultView.getComputedStyle(node);
            if (styles.opacity === '0' || styles.visibility === 'hidden' || node.hasAttribute('inert')) {
                return false;
            }
        }
        return true;
    }
}
Ch5MutationObserver.ELEMENTS_MO_EXCEPTION = ['swiper-wrapper'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LW11dGF0aW9uLW9ic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvbW1vbi9jaDUtbXV0YXRpb24tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBT3ZCLE1BQU0sT0FBTyxtQkFBbUI7SUFtQnJCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFtQjtRQUNsRCxPQUFPLENBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQixNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU07WUFDMUIsQ0FDSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDO2dCQUNoQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUMvRSxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsWUFBWSxPQUFpQztRQXZCdEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFHbkIsYUFBUSxHQUE2QixFQUE4QixDQUFDO1FBcUJ4RSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3pELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLEVBQUU7b0JBQzlHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3BEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx3QkFBd0IsR0FBRztZQUM1QixVQUFVLEVBQUUsSUFBSTtZQUNoQixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFZO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxrQkFBa0I7UUFDckIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLFlBQVksZ0JBQWdCLEVBQUU7WUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQVNPLDBCQUEwQixDQUFDLElBQVU7UUFDekMsTUFBTSxXQUFXLEdBQUcsSUFBbUIsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7SUFDTCxDQUFDO0lBRU8sZ0NBQWdDLENBQUMsSUFBVTtRQUMvQyxJQUFJLE1BQU0sR0FBZSxFQUFnQixDQUFDO1FBRTFDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDbEMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBZSxDQUFlLENBQUM7WUFFOUUsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsSUFBSyxJQUFnQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckcsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O0FBeEZhLHlDQUFxQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsQUFBckIsQ0FBc0IifQ==