import isNil from "lodash/isNil";
import isUndefined from "lodash/isUndefined";
import { Ch5ListAbstractHelper } from "./ch5-list-abstract-helper";
import { Ch5Animation } from "./animation/ch5-animation";
export const defaultTransitionDuration = 0;
export var EDragDirection;
(function (EDragDirection) {
    EDragDirection[EDragDirection["next"] = 1] = "next";
    EDragDirection[EDragDirection["previous"] = 0] = "previous";
})(EDragDirection || (EDragDirection = {}));
const _frictionForce = 0.95555;
const _defaultVelocityMultiplicationFactor = 25;
const _maxVelocityAmount = 2000;
export class Ch5ListAnimation extends Ch5ListAbstractHelper {
    constructor(list, animationApi) {
        super(list);
        this.disableAnimation = false;
        this.animationAPI = {};
        this.animationFrame = 0;
        this.minOffsetTranslate = 0;
        this.direction = 1;
        if (animationApi instanceof Ch5Animation) {
            this.animationAPI = animationApi;
        }
    }
    stop() {
        if (this._list.pagedSwipe) {
            return;
        }
        this._list.decelerating = false;
        cancelAnimationFrame(this.animationFrame);
    }
    onFinishAnimation() {
        this._list.decelerating = false;
    }
    addAnimationApi(api) {
        if (api instanceof Ch5Animation) {
            this.animationAPI = api;
            return true;
        }
        return false;
    }
    startDecelerating() {
        this._list.info(`ch5-list-template - startDecelerating`);
        if (!this._list.pagedSwipe && !this._list.endless) {
            this.minOffsetTranslate = 0;
        }
        this.listDeceleration();
    }
    listDeceleration() {
        if (this.disableAnimation) {
            this._list.decelerating = false;
            return;
        }
        else {
            this._list.decelerating = true;
        }
        let coord = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
        let velocity;
        const timeDiff = this._list.pointerEndTime - this._list.pointerStartTime;
        const isHorizontal = this._list.isHorizontal;
        const endCoord = isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
        const startCoord = isHorizontal ? this._list.stepOnX : this._list.stepOnY;
        const distanceDiff = Math.abs(endCoord - startCoord);
        velocity = Math.round(distanceDiff / timeDiff) * _defaultVelocityMultiplicationFactor;
        if (this._list.endless) {
            this._infiniteLoopManager(coord);
        }
        else {
            coord = this.fixOffset(coord);
        }
        if (distanceDiff === 0) {
            this._list.decelerating = false;
            return;
        }
        else if (velocity > _maxVelocityAmount) {
            velocity = _maxVelocityAmount;
        }
        if (!this._list.pagedSwipe) {
            cancelAnimationFrame(this.animationFrame);
            const deceleration = () => {
                const isLtr = this._list.isLtr();
                const minOffsetTranslate = this.minOffsetTranslate || 0;
                const maxOffsetTranslate = this.maxOffsetTranslate || 0;
                const listPosition = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
                if (velocity < 1
                    || (!this._list.endless
                        && (velocity < 1
                            || (isLtr && (listPosition <= maxOffsetTranslate || listPosition >= 0))
                            || (!isLtr && (listPosition <= minOffsetTranslate || listPosition >= -maxOffsetTranslate))))) {
                    cancelAnimationFrame(this.animationFrame);
                    this._list.decelerating = false;
                    return;
                }
                velocity *= _frictionForce;
                if (this._list.isHorizontal) {
                    if (this._list.pointerFirstX < this._list.pointerLastX) {
                        this._list.currentXPosition += velocity;
                    }
                    else {
                        this._list.currentXPosition -= velocity;
                    }
                    coord = this._list.currentXPosition;
                }
                else {
                    if (this._list.pointerFirstY < this._list.pointerLastY) {
                        this._list.currentYPosition += velocity;
                    }
                    else {
                        this._list.currentYPosition -= velocity;
                    }
                    coord = this._list.currentYPosition;
                }
                this.updateDragPosition(coord);
                this.animationFrame = requestAnimationFrame(deceleration);
            };
            if (velocity > 0) {
                deceleration();
            }
        }
        else {
            const viewportWidth = this._list.viewportClientWidth;
            const viewportHeight = this._list.viewportClientHeight;
            const pageSize = this._list.isHorizontal ? viewportWidth : viewportHeight;
            this._templateHelper.computePage(coord, startCoord, endCoord);
            coord = this._list.currentPage * pageSize;
            if (this._list.isHorizontal) {
                this._list.currentXPosition = coord;
            }
            else {
                this._list.currentYPosition = coord;
            }
            this.updateDragPosition(coord, this.animationAPI.animate);
        }
        if (this._list.bufferAmount) {
            this._list.bufferdItemsHelper.maybeAddBufferItems(coord);
        }
    }
    fixOffset(coord) {
        this._list.info(`ch5-list-animation - fixOffset, coord: ${coord}`);
        const isLtr = this._list.isLtr();
        let maxOffset;
        let allowedOffset = 0;
        if (isUndefined(this.maxOffsetTranslate)) {
            this.maxOffsetTranslate = 0;
        }
        if (this._list.isHorizontal) {
            if (!isNil(this._list.itemOffsetWidth)) {
                maxOffset = this.maxOffsetTranslate;
                allowedOffset = fix(coord, maxOffset, this.minOffsetTranslate);
            }
        }
        else {
            if (!isNil(this._list.itemOffsetHeight)) {
                maxOffset = this.maxOffsetTranslate;
                allowedOffset = fix(coord, maxOffset, this.minOffsetTranslate);
            }
        }
        return allowedOffset;
        function fix(_coord, _maxOffset, _minOffset) {
            let maxOffsetDistance = _maxOffset;
            let minOffsetDistance = _minOffset;
            if (!isLtr) {
                const maxOffsetPlaceholder = maxOffsetDistance;
                maxOffsetDistance = minOffsetDistance;
                minOffsetDistance = -maxOffsetPlaceholder;
            }
            if (_coord < maxOffsetDistance) {
                return maxOffsetDistance;
            }
            else if (_coord > minOffsetDistance) {
                return minOffsetDistance;
            }
            return _coord;
        }
    }
    signalScrollTo(position) {
        this._list.info(`ch5-list-animation - signalScrollTo, position: ${position}`);
        const isLtr = this._list.isLtr();
        let positionCondition = position >= 0;
        if (this._list.isHorizontal && !isLtr) {
            position = -position;
            positionCondition = position <= 0;
        }
        if (this._list.divList.childElementCount > 0 && positionCondition) {
            const firstChild = this._list.divList.firstChild;
            const firstChildSizeData = firstChild.getBoundingClientRect();
            if (firstChildSizeData !== null) {
                const firstChildSize = this._list.isHorizontal ? firstChildSizeData.width : firstChildSizeData.height;
                const animate = this.animationAPI.animate.bind(this.animationAPI);
                const coord = -(firstChildSize * position);
                if (this._list.isHorizontal) {
                    this._list.currentXPosition = coord;
                }
                else {
                    this._list.currentYPosition = coord;
                }
                this._list.templateHelper.updateScrollBarPosition(coord, animate);
                this.updateDragPosition(coord, animate);
            }
        }
    }
    slideTo(coord) {
        if (this._list.isHorizontal) {
            this._templateHelper.setWrapperTranslateX(coord);
            return;
        }
        this._templateHelper.setWrapperTranslateY(coord);
    }
    resolveDirection(last, current) {
        if (last >= current) {
            return 0;
        }
        return 1;
    }
    updateDragPosition(newPosition, animate) {
        if (!this._list.endless) {
            newPosition = this._computeNewPosition(newPosition);
        }
        else {
            this._infiniteLoopManager(newPosition);
        }
        let _animate;
        if (animate !== undefined) {
            _animate = animate.bind(this.animationAPI);
        }
        if (this._list.isHorizontal) {
            this._templateHelper.setWrapperTranslateX(newPosition, _animate);
        }
        else {
            this._templateHelper.setWrapperTranslateY(newPosition, _animate);
        }
        if (this._list.scrollbar === true) {
            this._templateHelper.updateScrollBarPosition(newPosition, _animate);
        }
        this._list.pointerLastX = this._list.pointerCurrentX;
        this._list.pointerLastY = this._list.pointerCurrentY;
        this._list.dragTicking = false;
        this._list.bufferdItemsHelper.maybeAddBufferItems(newPosition);
    }
    adjustMaxOffset(isBuffered = false) {
        if (!isBuffered) {
            return -this._list.sizeResolver.hiddenListSize;
        }
        this._templateHelper.updateViewportSize(this._list.sizeResolver.viewPortSize);
        const itemsPerPage = this._list.getItemsPerPage();
        const firstItemSize = this._list.getItemSize();
        const definedListSize = this._list.size || 0;
        const listSize = (definedListSize - itemsPerPage) * firstItemSize;
        return -listSize;
    }
    resetOffsets() {
        this.maxOffsetTranslate = undefined;
        this.minOffsetTranslate = 0;
    }
    _infiniteLoopManager(newPosition) {
        const firstElement = this._list.items[0];
        const isLtr = this._list.isLtr();
        if (!firstElement) {
            return;
        }
        const itemSize = this._list.isHorizontal ? firstElement.element.offsetWidth : firstElement.element.offsetHeight;
        if (isNil(this.maxOffsetTranslate)) {
            return;
        }
        let currentItemToMove;
        let arrangementFn;
        this._log(newPosition);
        if ((this._list.isVertical || isLtr) && this._arrangementCondition(newPosition)) {
            if (this.direction === EDragDirection.next) {
                currentItemToMove = Math.ceil(Math.abs((newPosition - this.maxOffsetTranslate)) / itemSize);
                arrangementFn = this.stackInfinite;
            }
            else {
                currentItemToMove = Math.ceil(Math.abs(newPosition - this.minOffsetTranslate) / itemSize);
                arrangementFn = this.queueInfinite;
            }
            this._loop(currentItemToMove, arrangementFn);
        }
        if (this._list.isHorizontal && !isLtr && this._arrangementCondition(newPosition)) {
            if (this.direction === EDragDirection.next) {
                currentItemToMove = Math.ceil(Math.abs((newPosition - this.minOffsetTranslate)) / itemSize);
                arrangementFn = this.queueInfinite;
            }
            else {
                currentItemToMove = Math.ceil(Math.abs(newPosition - this.minOffsetTranslate) / itemSize) - 1;
                arrangementFn = this.stackInfinite;
            }
            this._loop(currentItemToMove, arrangementFn);
        }
    }
    stackInfinite() {
        const elementToMove = this._list.items.shift();
        const isLtr = this._list.isLtr();
        if (!elementToMove || isNil(this.maxOffsetTranslate)) {
            return;
        }
        const nextPosition = this._list.sizeResolver.fullListSize;
        let itemSize = elementToMove.element.offsetWidth;
        let signedNextPosition = nextPosition;
        if (this._list.isHorizontal && !isLtr) {
            signedNextPosition = -nextPosition;
        }
        this._list.items.push(elementToMove);
        if (this._list.isHorizontal) {
            const stackPosition = elementToMove.translateX + signedNextPosition;
            this._templateHelper.setItemTranslateX(stackPosition, elementToMove);
        }
        else {
            const stackPosition = elementToMove.translateY + signedNextPosition;
            this._templateHelper.setItemTranslateY(stackPosition, elementToMove);
            itemSize = elementToMove.element.offsetHeight;
        }
        let signedItemSize = -itemSize;
        if (this._list.isHorizontal && !isLtr) {
            signedItemSize = itemSize;
        }
        this.maxOffsetTranslate = this.maxOffsetTranslate + signedItemSize;
        this.minOffsetTranslate = this.minOffsetTranslate + signedItemSize;
    }
    queueInfinite() {
        const elementToMove = this._list.items.pop();
        const isLtr = this._list.isLtr();
        if (!elementToMove || isNil(this.maxOffsetTranslate)) {
            return;
        }
        const nextPosition = this._list.sizeResolver.fullListSize;
        let itemSize = elementToMove.element.offsetWidth;
        let signedNextPosition = -nextPosition;
        if (this._list.isHorizontal && !isLtr) {
            signedNextPosition = nextPosition;
        }
        this._list.items.unshift(elementToMove);
        if (this._list.isHorizontal) {
            const queuedPosition = elementToMove.translateX + signedNextPosition;
            this._templateHelper.setItemTranslateX(queuedPosition, elementToMove);
        }
        else {
            const queuedPosition = elementToMove.translateY + signedNextPosition;
            this._templateHelper.setItemTranslateY(queuedPosition, elementToMove);
            itemSize = elementToMove.element.offsetHeight;
        }
        let signedItemSize = itemSize;
        if (this._list.isHorizontal && !isLtr) {
            signedItemSize = -itemSize;
        }
        this.maxOffsetTranslate = this.maxOffsetTranslate + signedItemSize;
        this.minOffsetTranslate = this.minOffsetTranslate + signedItemSize;
    }
    _calculateNextPosition() {
        const itemSize = this._list.getItemSize();
        return this._list.items.length * itemSize;
    }
    _loop(currentItemToMove, arrangementFn) {
        let itemIndex = 0;
        while (itemIndex < currentItemToMove) {
            arrangementFn.apply(this);
            if (itemIndex > this._list.items.length) {
                itemIndex = 0;
                currentItemToMove = currentItemToMove - this._list.items.length;
            }
            else {
                itemIndex++;
            }
        }
    }
    _arrangementCondition(newPosition) {
        const isLtr = this._list.isLtr();
        if (isNil(this.maxOffsetTranslate)) {
            return false;
        }
        if (this.direction === EDragDirection.next) {
            let threshold = this.maxOffsetTranslate;
            if (this._list.isHorizontal && !isLtr) {
                threshold = this.minOffsetTranslate;
            }
            return newPosition < threshold;
        }
        return newPosition > this.minOffsetTranslate;
    }
    _computeNewPosition(newPosition) {
        const offsetLimit = this.maxOffsetTranslate || 0;
        const positionCoord = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
        const isLtr = this._list.isLtr();
        if (this._list.isHorizontal && !isLtr) {
            if (positionCoord > -offsetLimit || newPosition > -offsetLimit) {
                return this._list.currentXPosition = this._list.currentYPosition = -offsetLimit;
            }
            else if (positionCoord < 0 || newPosition < 0) {
                return this._list.currentXPosition = this._list.currentYPosition = 0;
            }
        }
        else {
            if (positionCoord < offsetLimit || newPosition < offsetLimit) {
                return this._list.currentXPosition = this._list.currentYPosition = offsetLimit;
            }
            else if (positionCoord > 0 || newPosition > 0) {
                return this._list.currentXPosition = this._list.currentYPosition = 0;
            }
        }
        return newPosition;
    }
    _log(newPosition) {
        const isLtr = this._list.isLtr();
        if (isNil(this.maxOffsetTranslate)) {
            return;
        }
        let shouldStack;
        let shouldQueue;
        if (this._list.isHorizontal && !isLtr) {
            shouldStack = newPosition > this.maxOffsetTranslate;
            shouldQueue = newPosition < this.minOffsetTranslate;
        }
        else {
            shouldStack = newPosition < this.maxOffsetTranslate;
            shouldQueue = newPosition > this.minOffsetTranslate;
        }
        this._list.info({
            'dir': this.direction,
            shouldStack,
            shouldQueue,
            'minOffset': this.minOffsetTranslate,
            'maxOffset': this.maxOffsetTranslate,
            'pos': newPosition,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3QtYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxpc3QvY2g1LWxpc3QtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFzQixNQUFNLDJCQUEyQixDQUFDO0FBSTdFLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHLENBQUMsQ0FBQztBQVMzQyxNQUFNLENBQU4sSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3pCLG1EQUFRLENBQUE7SUFDUiwyREFBWSxDQUFBO0FBQ2IsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCO0FBRUQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBQy9CLE1BQU0sb0NBQW9DLEdBQUcsRUFBRSxDQUFDO0FBQ2hELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBRWhDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxxQkFBcUI7SUFZMUQsWUFBWSxJQUFhLEVBQUUsWUFBMkI7UUFDckQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBWE4scUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGlCQUFZLEdBQWlCLEVBQWtCLENBQUM7UUFDaEQsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFHM0IsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFNNUIsSUFBSSxZQUFZLFlBQVksWUFBWSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ2pDO0lBQ0YsQ0FBQztJQUVNLElBQUk7UUFDVixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQzFCLE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNoQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVNLGVBQWUsQ0FBQyxHQUFpQjtRQUN2QyxJQUFJLEdBQUcsWUFBWSxZQUFZLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFFeEIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUtNLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0sZ0JBQWdCO1FBRXRCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNoQyxPQUFPO1NBQ1A7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMvQjtRQUVELElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBRXhHLElBQUksUUFBZ0IsQ0FBQztRQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQ3pFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxRixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMxRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUVyRCxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsb0NBQW9DLENBQUM7UUFFdEYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNOLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNoQyxPQUFPO1NBQ1A7YUFBTSxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsRUFBRTtZQUN6QyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFFM0Isb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtnQkFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2dCQUV6RyxJQUFJLFFBQVEsR0FBRyxDQUFDO3VCQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87MkJBQ25CLENBQUMsUUFBUSxHQUFHLENBQUM7K0JBQ1osQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksa0JBQWtCLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDOytCQUNwRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLGtCQUFrQixJQUFJLFlBQVksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FDMUYsQ0FBQyxFQUNGO29CQUNELG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxPQUFPO2lCQUNQO2dCQUNELFFBQVEsSUFBSSxjQUFjLENBQUM7Z0JBRzNCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7b0JBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksUUFBUSxDQUFDO3FCQUN4Qzt5QkFBTTt3QkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQztxQkFDeEM7b0JBRUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNOLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksUUFBUSxDQUFDO3FCQUN4Qzt5QkFBTTt3QkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQztxQkFDeEM7b0JBRUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3BDO2dCQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUE7WUFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLFlBQVksRUFBRSxDQUFDO2FBQ2Y7U0FDRDthQUFNO1lBRU4sTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUNyRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUUxRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFFMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDcEM7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekQ7SUFDRixDQUFDO0lBRU0sU0FBUyxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMENBQTBDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFbkUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxhQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTlCLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDdkMsU0FBUyxHQUFJLElBQUksQ0FBQyxrQkFBNkIsQ0FBQztnQkFDaEQsYUFBYSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQy9EO1NBQ0Q7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUN4QyxTQUFTLEdBQUksSUFBSSxDQUFDLGtCQUE2QixDQUFDO2dCQUNoRCxhQUFhLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDL0Q7U0FDRDtRQUVELE9BQU8sYUFBYSxDQUFDO1FBRXJCLFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBRSxVQUFrQixFQUFFLFVBQWtCO1lBRWxFLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBQ25DLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztnQkFDL0MsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3RDLGlCQUFpQixHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDMUM7WUFFRCxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsRUFBRTtnQkFDL0IsT0FBTyxpQkFBaUIsQ0FBQzthQUN6QjtpQkFBTSxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsRUFBRTtnQkFDdEMsT0FBTyxpQkFBaUIsQ0FBQzthQUN6QjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBRWYsQ0FBQztJQUVGLENBQUM7SUFLTSxjQUFjLENBQUMsUUFBZ0I7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0RBQWtELFFBQVEsRUFBRSxDQUFDLENBQUM7UUFHOUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxJQUFJLGlCQUFpQixHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFHdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDckIsaUJBQWlCLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLGlCQUFpQixFQUFFO1lBQ2xFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNqRCxNQUFNLGtCQUFrQixHQUFJLFVBQTBCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUUvRSxJQUFJLGtCQUFrQixLQUFLLElBQUksRUFBRTtnQkFDaEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUV0RyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUUzQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO29CQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztpQkFDcEM7cUJBQU07b0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7aUJBQ3BDO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN4QztTQUNEO0lBQ0YsQ0FBQztJQU1NLE9BQU8sQ0FBQyxLQUFhO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFVTSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsT0FBZTtRQUNwRCxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDVDtRQUVELE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUtNLGtCQUFrQixDQUFDLFdBQW1CLEVBQUUsT0FBMEI7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3hCLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNOLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksUUFBc0MsQ0FBQztRQUUzQyxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDMUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNDO1FBR0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDakU7UUFJRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwRTtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUcvQixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFtQk0sZUFBZSxDQUFDLGFBQXNCLEtBQUs7UUFFakQsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1NBQy9DO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUNwQyxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNsRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUM7UUFFbEUsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBUU0sWUFBWTtRQUNsQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFdBQW1CO1FBQy9DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNsQixPQUFPO1NBQ1A7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBRWhILElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ25DLE9BQU87U0FDUDtRQUVELElBQUksaUJBQXlCLENBQUM7UUFDOUIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoRixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRTtnQkFDM0MsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQzVGLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNOLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQzFGLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ25DO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUM3QztRQUdELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2pGLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFO2dCQUMzQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFDNUYsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDbkM7aUJBQU07Z0JBRU4saUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlGLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ25DO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUM3QztJQUNGLENBQUM7SUFFTyxhQUFhO1FBQ3BCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDckQsT0FBTztTQUNQO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQzFELElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBR2pELElBQUksa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsa0JBQWtCLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBaUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDNUIsTUFBTSxhQUFhLEdBQUksYUFBa0MsQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLENBQUM7WUFDMUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsYUFBaUMsQ0FBQyxDQUFDO1NBQ3pGO2FBQU07WUFDTixNQUFNLGFBQWEsR0FBSSxhQUFrQyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUMxRixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxhQUFpQyxDQUFDLENBQUM7WUFDekYsUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQzlDO1FBR0QsSUFBSSxjQUFjLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QyxjQUFjLEdBQUcsUUFBUSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7UUFDbkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7SUFDcEUsQ0FBQztJQUVPLGFBQWE7UUFDcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNyRCxPQUFPO1NBQ1A7UUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDMUQsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFHakQsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3RDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFpQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM1QixNQUFNLGNBQWMsR0FBSSxhQUFrQyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUMzRixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxhQUFpQyxDQUFDLENBQUM7U0FDMUY7YUFBTTtZQUNOLE1BQU0sY0FBYyxHQUFJLGFBQWtDLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1lBQzNGLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLGFBQWlDLENBQUMsQ0FBQztZQUMxRixRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDOUM7UUFHRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUE7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QyxjQUFjLEdBQUcsQ0FBQyxRQUFRLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUNuRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sc0JBQXNCO1FBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQXlCLEVBQUUsYUFBeUI7UUFDakUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sU0FBUyxHQUFHLGlCQUFpQixFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN4QyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNoRTtpQkFBTTtnQkFDTixTQUFTLEVBQUUsQ0FBQzthQUNaO1NBQ0Q7SUFDRixDQUFDO0lBRU8scUJBQXFCLENBQUMsV0FBbUI7UUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFHM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDcEM7WUFDRCxPQUFPLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDOUMsQ0FBQztJQVNPLG1CQUFtQixDQUFDLFdBQW1CO1FBRTlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFDMUcsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUdqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3RDLElBQUksYUFBYSxHQUFHLENBQUMsV0FBVyxJQUFJLFdBQVcsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDL0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxXQUFXLENBQUM7YUFDaEY7aUJBQU0sSUFBSSxhQUFhLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQzthQUNyRTtTQUNEO2FBQU07WUFDTixJQUFJLGFBQWEsR0FBRyxXQUFXLElBQUksV0FBVyxHQUFHLFdBQVcsRUFBRTtnQkFDN0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO2FBQy9FO2lCQUFNLElBQUksYUFBYSxHQUFHLENBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7YUFDckU7U0FDRDtRQUdELE9BQU8sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFFTyxJQUFJLENBQUMsV0FBbUI7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNuQyxPQUFPO1NBQ1A7UUFFRCxJQUFJLFdBQW9CLENBQUM7UUFDekIsSUFBSSxXQUFvQixDQUFDO1FBR3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDcEQsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7U0FDcEQ7YUFBTTtZQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3BELFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ3BEO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDckIsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtZQUNwQyxLQUFLLEVBQUUsV0FBVztTQUNsQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QifQ==