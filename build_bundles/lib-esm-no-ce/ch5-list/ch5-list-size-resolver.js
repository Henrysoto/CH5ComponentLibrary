export class Ch5ListSizeResolver {
    constructor(elements, orientation) {
        this.elements = [];
        this.viewPortSize = 0;
        this.fullListSize = 0;
        this.hiddenListSize = 0;
        this.orientation = 'horizontal';
        this.elements = Array.from(elements);
        this.orientation = orientation;
        this.init();
    }
    getItemsPerPage() {
        let sizeAccumulator = 0;
        let numberOfVisibleItems = Array.from(this.elements).reduce((acc, curr) => {
            if (sizeAccumulator <= this.viewPortSize) {
                sizeAccumulator += this.getElementSize(curr);
                return ++acc;
            }
            else {
                return acc;
            }
        }, 0);
        numberOfVisibleItems = numberOfVisibleItems - 1;
        return numberOfVisibleItems;
    }
    getTotalSize() {
        const sizeOfVisibleItems = Array.from(this.elements).reduce((acc, curr) => acc + this.getElementSize(curr), 0);
        return sizeOfVisibleItems;
    }
    getOverflowSize() {
        const visibleItemsPerPage = this.getTotalSize();
        return visibleItemsPerPage - this.viewPortSize;
    }
    getFullSize() {
        return this.viewPortSize + this.getOverflowSize();
    }
    updateViewport(viewport) {
        const boundingClientRect = viewport.getBoundingClientRect();
        if (this.orientation === 'horizontal') {
            this.viewPortSize = boundingClientRect.width;
        }
        else {
            this.viewPortSize = boundingClientRect.height;
        }
        this.fullListSize = this.getFullSize();
        this.hiddenListSize = this.getOverflowSize();
    }
    init() {
        this.fullListSize = this.getFullSize();
        this.hiddenListSize = this.getOverflowSize();
    }
    getElementSize(element) {
        if (this.orientation === 'horizontal') {
            return element.offsetWidth;
        }
        return element.offsetHeight;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3Qtc2l6ZS1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1saXN0L2NoNS1saXN0LXNpemUtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV0EsTUFBTSxPQUFPLG1CQUFtQjtJQWdDOUIsWUFBWSxRQUF1QixFQUFFLFdBQXVDO1FBMUJyRSxhQUFRLEdBQWtCLEVBQW1CLENBQUM7UUFNOUMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFNekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFNekIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFNM0IsZ0JBQVcsR0FBK0IsWUFBWSxDQUFDO1FBRzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBT00sZUFBZTtRQUNwQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDeEUsSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDeEMsZUFBZSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDZDtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsQ0FBQzthQUNaO1FBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sb0JBQW9CLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRWhELE9BQU8sb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQVNNLFlBQVk7UUFDakIsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3pELENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQzlDLENBQUMsQ0FDRixDQUFDO1FBRUYsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBT00sZUFBZTtRQUNwQixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoRCxPQUFPLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDakQsQ0FBQztJQU9NLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBU00sY0FBYyxDQUFDLFFBQXFCO1FBQ3pDLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRU8sSUFBSTtRQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFRTyxjQUFjLENBQUMsT0FBb0I7UUFDekMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDNUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDOUIsQ0FBQztDQUVGIn0=