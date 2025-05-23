import _ from 'lodash';
export class Ch5CoreIntersectionObserver {
    constructor(customRootMargin) {
        this._intersectionObserverConfig = {
            root: null,
            rootMargin: (!!customRootMargin && customRootMargin.length > 0) ? customRootMargin : Ch5CoreIntersectionObserver.observerRootMargin,
            threshold: Ch5CoreIntersectionObserver.observerThreshold
        };
        this._intersectionObserver = new IntersectionObserver(this.intersectionObserverCallback, this._intersectionObserverConfig);
    }
    static getInstance(customRootMargin) {
        if (Ch5CoreIntersectionObserver._instance instanceof Ch5CoreIntersectionObserver) {
            return Ch5CoreIntersectionObserver._instance;
        }
        else {
            const margin = (!!customRootMargin && customRootMargin.length > 0) ? customRootMargin : '';
            Ch5CoreIntersectionObserver._instance = new Ch5CoreIntersectionObserver(margin);
        }
        return Ch5CoreIntersectionObserver._instance;
    }
    intersectionObserverCallback(entries, observer) {
        entries.forEach((entry) => {
            const ch5Component = entry.target;
            ch5Component.elementIntersectionEntry = entry;
            ch5Component.elementIsInViewPort = entry.isIntersecting;
            entry.target.viewportCallBack(entry.target, entry.isIntersecting);
        });
    }
    observe(element, callback) {
        if (!_.isNil(element)) {
            element.viewportCallBack = callback;
            this._intersectionObserver.observe(element);
        }
    }
    unobserve(element) {
        if (!_.isNil(element)) {
            delete element.viewportCallBack;
            this._intersectionObserver.unobserve(element);
        }
    }
    disconnect() {
        if (this._intersectionObserver instanceof IntersectionObserver) {
            this._intersectionObserver.disconnect();
        }
    }
}
Ch5CoreIntersectionObserver.observerThreshold = [0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 0.91, 0.92, 0.93, 1.00];
Ch5CoreIntersectionObserver.observerRootMargin = '0px';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvcmUtaW50ZXJzZWN0aW9uLW9ic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LWNvcmUtaW50ZXJzZWN0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUd2QixNQUFNLE9BQU8sMkJBQTJCO0lBUXBDLFlBQW9CLGdCQUF5QjtRQUN6QyxJQUFJLENBQUMsMkJBQTJCLEdBQUc7WUFDL0IsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsa0JBQWtCO1lBQ25JLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxpQkFBaUI7U0FDM0QsQ0FBQztRQUVGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMvSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBeUI7UUFDL0MsSUFBSSwyQkFBMkIsQ0FBQyxTQUFTLFlBQVksMkJBQTJCLEVBQUU7WUFDOUUsT0FBTywyQkFBMkIsQ0FBQyxTQUFTLENBQUM7U0FDaEQ7YUFBTTtZQUNILE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRiwyQkFBMkIsQ0FBQyxTQUFTLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuRjtRQUVELE9BQU8sMkJBQTJCLENBQUMsU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFHTyw0QkFBNEIsQ0FBQyxPQUFjLEVBQUUsUUFBOEI7UUFDL0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFtQixDQUFDO1lBQy9DLFlBQVksQ0FBQyx3QkFBd0IsR0FBRyxLQUFrQyxDQUFDO1lBQzNFLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ3ZELEtBQUssQ0FBQyxNQUFjLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQXFCLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLE9BQU8sQ0FBQyxPQUFnQixFQUFFLFFBQTJDO1FBQ3hFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xCLE9BQWUsQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDN0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFFTSxTQUFTLENBQUMsT0FBZ0I7UUFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsT0FBUSxPQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDekMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTSxVQUFVO1FBQ2IsSUFBSSxJQUFJLENBQUMscUJBQXFCLFlBQVksb0JBQW9CLEVBQUU7WUFDNUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQzs7QUF2RGEsNkNBQWlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdGLDhDQUFrQixHQUFXLEtBQUssQ0FBQyJ9