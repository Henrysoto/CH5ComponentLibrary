import { Ch5SignalFactory } from "../ch5-core";
import { Ch5MouseVelocity } from "./ch5-mouse-velocity";
import { Ch5SpinnerTemplate } from "./ch5-spinner-template";
export class Ch5SpinnerScroll {
    constructor(element) {
        this.element = {};
        this.mouseDown = false;
        this.initialMousePos = 0;
        this.currentYOffset = 0;
        this.direction = '';
        this.dragTimeout = 0;
        this.readyToFocus = true;
        this._currentElement = 0;
        this._mouseDownListener = {};
        this._mouseUpListener = {};
        this._mouseMoveListener = {};
        this._touchstartListener = {};
        this._toucheendUpListener = {};
        this._touchmoveListener = {};
        this._mouseLeaveListener = {};
        this._touchendLeaveListener = {};
        this.mouseVelocity = {};
        this._runTimeout = 0;
        this.element = element;
        this.attachEventListeners();
        const selectedValue = this.element.selectedValue;
        this.selectTheItem(selectedValue);
    }
    destruct() {
        this.detachEventListeners();
    }
    set currentElement(index) {
        this._currentElement = index;
    }
    get currentElement() {
        const childrenObject = this.element.templateHelper.childrenObject;
        if (this._currentElement <= 0 && !this.element.endless) {
            return 0;
        }
        else if (childrenObject !== null &&
            !this.element.endless &&
            this._currentElement >= childrenObject.length - 1) {
            return childrenObject.length - 1;
        }
        if (childrenObject !== null && this.element.endless && childrenObject.length < this._currentElement) {
            return this._currentElement % childrenObject.length;
        }
        return this._currentElement;
    }
    getCleanCurrentElement() {
        try {
            const childrenObject = this.element.templateHelper.childrenObject;
            if (childrenObject !== null && this.currentElement >= 0 && this.currentElement <= childrenObject.length - 1) {
                return parseFloat(childrenObject[this.currentElement].getAttribute('data-initial-index') + '');
            }
            return 0;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    }
    getCleanCurrentElementIndex() {
        return this.getCleanCurrentElement();
    }
    selectTheItem(item) {
        if (isNaN(item) === false) {
            const itemHeightValue = this.element.getItemHeightValue();
            const highlightOffset = this.element.getHighlightOffsetValue();
            this.direction = '';
            this.currentElement = item;
            this.currentYOffset = highlightOffset - (this.getCleanCurrentElementIndex() * itemHeightValue);
            this.moveTheList();
        }
    }
    attachEventListeners() {
        try {
            if (this.element.templateHelper instanceof Ch5SpinnerTemplate &&
                this.element.templateHelper.wrapperElement instanceof HTMLElement) {
                this._mouseDownListener = this._onMouseDown.bind(this);
                this._mouseUpListener = this._onMouseUp.bind(this);
                this._mouseMoveListener = this._onMouseMove.bind(this);
                this._touchstartListener = this._onMouseDown.bind(this);
                this._toucheendUpListener = this._onMouseUp.bind(this);
                this._touchmoveListener = this._onMouseMove.bind(this);
                this._mouseLeaveListener = this._onMouseLeave.bind(this);
                this._touchendLeaveListener = this._onMouseLeave.bind(this);
                this.element.templateHelper.wrapperElement.addEventListener('mousedown', this._mouseDownListener, { passive: true });
                this.element.addEventListener('mouseup', this._mouseUpListener);
                this.element.addEventListener('mousemove', this._mouseMoveListener);
                this.element.templateHelper.wrapperElement.addEventListener('touchstart', this._touchstartListener, { passive: true });
                this.element.addEventListener('touchend', this._toucheendUpListener);
                this.element.addEventListener('touchmove', this._touchmoveListener, { passive: true });
                this.element.addEventListener('mouseleave', this._mouseLeaveListener);
                this.element.addEventListener('touchend', this._touchendLeaveListener);
            }
        }
        catch (e) {
            console.log('Adding listeners have problems', e);
        }
    }
    detachEventListeners() {
        try {
            if (this.element.templateHelper instanceof Ch5SpinnerTemplate &&
                this.element.templateHelper.wrapperElement instanceof HTMLElement) {
                this.element.templateHelper.wrapperElement.removeEventListener('mousedown', this._mouseDownListener);
                this.element.removeEventListener('mouseup', this._mouseUpListener);
                this.element.removeEventListener('mousemove', this._mouseMoveListener);
                this.element.templateHelper.wrapperElement.removeEventListener('touchstart', this._touchstartListener);
                this.element.removeEventListener('touchend', this._toucheendUpListener);
                this.element.removeEventListener('touchmove', this._touchmoveListener);
                this.element.removeEventListener('mouseleave', this._mouseLeaveListener);
                this.element.removeEventListener('touchend', this._touchendLeaveListener);
            }
        }
        catch (e) {
            console.log('Removing listeners have problems', e);
        }
    }
    moveTheList(velocity = 1) {
        if (velocity === 0) {
            velocity = 1;
        }
        if (this.direction === 'up') {
            this.currentYOffset += this.element.getItemHeightValue() * velocity;
            this.currentElement--;
            this.currentElement -= velocity - 1;
        }
        else if (this.direction === 'down') {
            this.currentYOffset -= this.element.getItemHeightValue() * velocity;
            this.currentElement++;
            this.currentElement += velocity - 1;
        }
        const yTranslate = this.currentYOffset + this.element.getItemHeightMeasurementUnit();
        if (this.element.templateHelper.scrollableArea instanceof HTMLElement) {
            this.element.templateHelper.scrollableArea.style.transition = "all .1s ease";
            this.element.templateHelper.scrollableArea.style.transform = "translate3d(0," + yTranslate + ",0)";
        }
        this.toggleActiveItem();
    }
    detectDirection(currentPosition) {
        if (this.initialMousePos < currentPosition) {
            this.direction = 'up';
        }
        else {
            this.direction = 'down';
        }
        return this.direction;
    }
    _onMouseDown(event) {
        event.stopPropagation();
        this.initialMousePos = this.getMousePosition(event).y;
        const visibleItemScroll = this.element.visibleItemScroll;
        const size = this.element.size;
        if (this.mouseVelocity.constructor !== Ch5MouseVelocity) {
            this.mouseVelocity = new Ch5MouseVelocity(visibleItemScroll / size);
        }
        this.mouseVelocity.start = {
            x: this.getMousePosition(event).y,
            y: this.getMousePosition(event).y,
            time: new Date()
        };
        if (this.readyToFocus === true) {
            this.element.eventsHelper.dispatchFocus();
            this.readyToFocus = false;
        }
        this.dragTimeout = window.setTimeout(() => {
            this.mouseDown = true;
            this.handleCursor('drag');
            this.element.templateHelper.toggleOverlay(true);
        }, 50);
    }
    sendEventOnOverflow() {
        const _sendEventOnOverflow = this.element.sendEventOnOverflow;
        if ('' !== _sendEventOnOverflow &&
            null !== _sendEventOnOverflow &&
            undefined !== _sendEventOnOverflow) {
            const sigClick = Ch5SignalFactory.getInstance()
                .getBooleanSignal(_sendEventOnOverflow);
            if (sigClick !== null) {
                sigClick.publish(true);
                sigClick.publish(false);
            }
        }
    }
    sendEventOnUnderflow() {
        const _sendEventOnUnderflow = this.element.sendEventOnUnderflow;
        if ('' !== _sendEventOnUnderflow &&
            null !== _sendEventOnUnderflow &&
            undefined !== _sendEventOnUnderflow) {
            const sigClick = Ch5SignalFactory.getInstance()
                .getBooleanSignal(_sendEventOnUnderflow);
            if (sigClick !== null) {
                sigClick.publish(true);
                sigClick.publish(false);
            }
        }
    }
    _onMouseUp(event) {
        this.mouseDown = false;
        this.handleCursor();
        this.element.templateHelper.toggleOverlay(false);
        window.clearTimeout(this.dragTimeout);
        this.element.dirtyTimeHandler();
        this.mouseVelocity.end = {
            x: event.pageX,
            y: event.pageY,
            time: new Date()
        };
        this.element.eventsHelper.dispatchBlur();
        this.readyToFocus = true;
        if (this.getCleanCurrentElementIndex() !== this.element.cleanItem) {
            if (this.element.dirtyFlag === false) {
                this.element.eventsHelper.dispatchDirty(this.getCleanCurrentElement() + '');
                this.element.dirtyFlag = true;
            }
            this.element.eventsHelper.dispatchChange(this.getCleanCurrentElement() + '');
        }
        if (this.element.feedbackMode === 'direct') {
            this.element.cleanItem = this.element.selectedValueIndex;
        }
    }
    _onMouseMove(event) {
        const mouseYPos = this.getMousePosition(event).y;
        let offsetX = 0;
        let offsetY = 0;
        let sliderElement = this.element;
        while (sliderElement && !isNaN(sliderElement.offsetLeft) && !isNaN(sliderElement.offsetTop)) {
            offsetX += sliderElement.offsetLeft - sliderElement.scrollLeft + sliderElement.clientLeft;
            offsetY += sliderElement.offsetTop - sliderElement.scrollTop + sliderElement.clientTop;
            sliderElement = sliderElement.offsetParent;
        }
        let eventOffsetX = null;
        let eventOffsetY = null;
        const maxOffsetLeft = offsetX;
        const maxOffsetRight = offsetX + this.element.clientWidth;
        const maxOffsetTop = offsetY;
        const maxOffsetBottom = offsetY + this.element.clientHeight;
        if (event.type === 'touchmove') {
            const touch = event.touches[0] || event.changedTouches[0];
            eventOffsetX = touch.clientX;
            eventOffsetY = touch.clientY;
        }
        else {
            eventOffsetX = event.clientX;
            eventOffsetY = event.clientY;
        }
        if (eventOffsetX < maxOffsetLeft ||
            eventOffsetX > maxOffsetRight ||
            eventOffsetY < maxOffsetTop ||
            eventOffsetY > maxOffsetBottom) {
            if (this.mouseDown === true && event.type === 'touchmove') {
                this.mouseDown = false;
                this.moveTheList();
                this.element.eventsHelper.dispatchTouchEnd();
            }
            return;
        }
        if (this.mouseDown === true) {
            if ((Math.abs(this.initialMousePos - mouseYPos)) >= this.element.selectedItem.getBoundingClientRect().height * 0.3) {
                this.detectDirection(mouseYPos);
                const size = this.element.size;
                const highlightSectionTopOffset = this.element.getHighlightOffsetValue();
                const itemHeightValue = this.element.getItemHeightValue();
                const childrenObject = this.element.templateHelper.childrenObject;
                const endless = this.element.endless;
                let velocity = 1;
                let offset = Number(this.element.visibleItemScroll) <= Number(size) ? this.element.visibleItemScroll : size;
                if (offset < Number(this.element.visibleItemScroll) && this.element.endless) {
                    offset = this.element.visibleItemScroll;
                }
                const minimumTopOffset = (Math.ceil(offset / 2) - 1) * itemHeightValue;
                const maximumTopOffset = -(childrenObject.length * itemHeightValue - (minimumTopOffset + itemHeightValue));
                this.mouseVelocity.end = {
                    x: this.getMousePosition(event).x,
                    y: this.getMousePosition(event).y,
                    time: new Date()
                };
                if (endless === true &&
                    this._isBoundary(this.currentYOffset, minimumTopOffset, maximumTopOffset) &&
                    childrenObject !== null) {
                    if (this.direction === 'down') {
                        this.currentElement = -1;
                        this._forceMovingTheSpinner(highlightSectionTopOffset + itemHeightValue);
                        window.clearTimeout(this._runTimeout);
                        this._runTimeout = 0;
                        this.sendEventOnOverflow();
                    }
                    else if (this.direction === 'up') {
                        this.currentElement = childrenObject.length;
                        this._forceMovingTheSpinner(maximumTopOffset - itemHeightValue);
                        this.sendEventOnUnderflow();
                    }
                }
                if (this._runTimeout === 0) {
                    this._runTimeout = window.setTimeout(() => {
                        if (this.mouseVelocity.getYSteps() > 1) {
                            velocity = this._handleVelocity(this.mouseVelocity.getYSteps(), minimumTopOffset, maximumTopOffset);
                        }
                        if (!this._isBoundary(this.currentYOffset, minimumTopOffset, maximumTopOffset) || endless) {
                            this.moveTheList(velocity);
                        }
                        window.clearTimeout(this._runTimeout);
                        this._runTimeout = 0;
                    }, 50);
                }
                this.initialMousePos = mouseYPos;
            }
        }
    }
    _handleVelocity(velocity, minimumTopOffset, maximumTopOffset) {
        let offsetWithVelocity;
        if (this.direction === 'up') {
            offsetWithVelocity = this.currentYOffset + (this.element.getItemHeightValue() * velocity);
        }
        else {
            offsetWithVelocity = this.currentYOffset - (this.element.getItemHeightValue() * velocity);
        }
        if (this._isBoundary(offsetWithVelocity, minimumTopOffset, maximumTopOffset) && velocity > 0) {
            return this._handleVelocity(--velocity, minimumTopOffset, maximumTopOffset);
        }
        return velocity;
    }
    _forceMovingTheSpinner(position) {
        this.currentYOffset = position;
        this.element.templateHelper.scrollableArea.setAttribute('style', 'transition: all 0s ease; transform: translate3d(0px,' + this.currentYOffset + this.element.getItemHeightMeasurementUnit() + ',0px)');
    }
    _isBoundary(currentOffset, minimumTopOffset, maximumTopOffset) {
        if (this.direction === 'up' &&
            currentOffset < minimumTopOffset ||
            this.direction === 'down' &&
                currentOffset > maximumTopOffset) {
            return false;
        }
        return true;
    }
    _onMouseLeave(event) {
        if (this.mouseDown === true) {
            this.mouseDown = false;
            this.moveTheList();
            this.element.eventsHelper.dispatchMouseUp();
        }
    }
    getMousePosition(event) {
        const mousePosition = {
            x: 0,
            y: 0
        };
        if ((typeof TouchEvent !== "undefined" && TouchEvent !== null) &&
            event.constructor === TouchEvent) {
            const touch = event.touches[0];
            mousePosition.x = touch.clientX;
            mousePosition.y = touch.clientY;
        }
        else {
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        }
        return mousePosition;
    }
    handleCursor(action = 'click') {
        if (action === 'click') {
            this.element.templateHelper.wrapperElement.style.cursor = 'pointer';
        }
        else if (action === 'drag') {
            this.element.templateHelper.wrapperElement.style.cursor = 'grabbing';
        }
    }
    toggleActiveItem() {
        this.element.templateHelper.setActiveItem(this.currentElement);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNwaW5uZXItc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXNwaW5uZXIvY2g1LXNwaW5uZXItc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxNQUFNLE9BQU8sZ0JBQWdCO0lBd0kzQixZQUFZLE9BQW1CO1FBakl2QixZQUFPLEdBQWUsRUFBZ0IsQ0FBQztRQVV2QyxjQUFTLEdBQVksS0FBZ0IsQ0FBQztRQVV0QyxvQkFBZSxHQUFXLENBQVcsQ0FBQztRQVN0QyxtQkFBYyxHQUFXLENBQVcsQ0FBQztRQU9yQyxjQUFTLEdBQVcsRUFBWSxDQUFDO1FBT2pDLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBU3hCLGlCQUFZLEdBQVksSUFBZSxDQUFDO1FBT3hDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBTzVCLHVCQUFrQixHQUF1QyxFQUF3QyxDQUFDO1FBT2xHLHFCQUFnQixHQUF1QyxFQUF3QyxDQUFDO1FBT2hHLHVCQUFrQixHQUF1QyxFQUF3QyxDQUFDO1FBT2xHLHdCQUFtQixHQUF1QyxFQUF3QyxDQUFDO1FBT25HLHlCQUFvQixHQUF1QyxFQUF3QyxDQUFDO1FBT3BHLHVCQUFrQixHQUF1QyxFQUF3QyxDQUFDO1FBT2xHLHdCQUFtQixHQUF1QyxFQUF3QyxDQUFDO1FBT25HLDJCQUFzQixHQUF1QyxFQUF3QyxDQUFDO1FBVXRHLGtCQUFhLEdBQXFCLEVBQXNCLENBQUM7UUFFekQsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFHOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFPRCxJQUFXLGNBQWMsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFPRCxJQUFXLGNBQWM7UUFDdkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBK0IsQ0FBQztRQUVuRixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDdEQsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQ0wsY0FBYyxLQUFLLElBQUk7WUFDdkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDckIsSUFBSSxDQUFDLGVBQWUsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDakQ7WUFDQSxPQUFPLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNuRyxPQUFPLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztTQUNyRDtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBT00sc0JBQXNCO1FBRTNCLElBQUk7WUFDRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUErQixDQUFDO1lBRW5GLElBQUksY0FBYyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzRyxPQUFPLFVBQVUsQ0FBRSxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBaUIsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFZLENBQUMsQ0FBQzthQUMzSDtZQUVELE9BQU8sQ0FBQyxDQUFDO1NBRVY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQU9NLDJCQUEyQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFTTSxhQUFhLENBQUMsSUFBWTtRQUUvQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDekIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUUvRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBRS9GLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFRUyxvQkFBb0I7UUFFNUIsSUFBSTtZQUNGLElBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLFlBQVksa0JBQWtCO2dCQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLFlBQVksV0FBVyxFQUNqRTtnQkFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNuRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUMvRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNuRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNwRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNuRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNuRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUNyRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUE2QixDQUFDO2dCQUV4RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNySCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRXBFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3ZILElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFHdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBUVMsb0JBQW9CO1FBRTVCLElBQUk7WUFDRixJQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxZQUFZLGtCQUFrQjtnQkFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxZQUFZLFdBQVcsRUFDakU7Z0JBRUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDckcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUV2RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN2RyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBR3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUMzRTtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ25EO0lBQ0gsQ0FBQztJQU9TLFdBQVcsQ0FBQyxXQUFtQixDQUFDO1FBRXhDLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtZQUNsQixRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLFFBQVEsQ0FBQztZQUNwRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxRQUFRLENBQUM7WUFDcEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNyQztRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBRXJGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxZQUFZLFdBQVcsRUFBRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7WUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUNwRztRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFPUyxlQUFlLENBQUMsZUFBdUI7UUFFL0MsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsRUFBRTtZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDekI7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQVFPLFlBQVksQ0FBQyxLQUFpQjtRQUNwQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxLQUFLLGdCQUFnQixFQUFFO1lBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNyRTtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHO1lBQ3pCLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ2pCLENBQUE7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBU08sbUJBQW1CO1FBRXpCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUU5RCxJQUNFLEVBQUUsS0FBSyxvQkFBb0I7WUFDM0IsSUFBSSxLQUFLLG9CQUFvQjtZQUM3QixTQUFTLEtBQUssb0JBQW9CLEVBQ2xDO1lBQ0EsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO2lCQUM1QyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRTFDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDckIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLG9CQUFvQjtRQUUxQixNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFFaEUsSUFDRSxFQUFFLEtBQUsscUJBQXFCO1lBQzVCLElBQUksS0FBSyxxQkFBcUI7WUFDOUIsU0FBUyxLQUFLLHFCQUFxQixFQUNuQztZQUNBLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtpQkFDNUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUUzQyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7SUFTTyxVQUFVLENBQUMsS0FBaUI7UUFFbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUc7WUFDdkIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2QsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2QsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ2pCLENBQUE7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ2pFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBWSxDQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUMvQjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFZLENBQUMsQ0FBQztTQUV4RjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBUU8sWUFBWSxDQUFDLEtBQVU7UUFFN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUF5QixDQUFDO1FBQ25ELE9BQU8sYUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0YsT0FBTyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQzFGLE9BQU8sSUFBSSxhQUFhLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUN2RixhQUFhLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztTQUM1QztRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFeEIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzlCLE1BQU0sY0FBYyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUMxRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDN0IsTUFBTSxlQUFlLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBRTVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDOUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzdCLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzlCO2FBQU07WUFDTCxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM3QixZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM5QjtRQUVELElBQUksWUFBWSxHQUFHLGFBQWE7WUFDOUIsWUFBWSxHQUFHLGNBQWM7WUFDN0IsWUFBWSxHQUFHLFlBQVk7WUFDM0IsWUFBWSxHQUFHLGVBQWUsRUFDOUI7WUFDQSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO2dCQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzlDO1lBQ0QsT0FBTztTQUNSO1FBR0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNsSCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDL0IsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ3pFLE1BQU0sZUFBZSxHQUFJLElBQUksQ0FBQyxPQUFzQixDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFFLE1BQU0sY0FBYyxHQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBcUMsQ0FBQyxjQUErQixDQUFDO2dCQUMzRyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFFckMsSUFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUU1RyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUMzRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztpQkFDekM7Z0JBRUQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQztnQkFDdkUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxlQUFlLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUUzRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRztvQkFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtpQkFDakIsQ0FBQTtnQkFDRCxJQUNFLE9BQU8sS0FBSyxJQUFJO29CQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUM7b0JBRXpFLGNBQWMsS0FBSyxJQUFJLEVBQ3ZCO29CQUVBLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7d0JBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx5QkFBeUIsR0FBRyxlQUFlLENBQUMsQ0FBQzt3QkFDekUsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztxQkFFNUI7eUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTt3QkFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO3dCQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLENBQUM7d0JBQ2hFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3FCQUM3QjtpQkFFRjtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO29CQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUV4QyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUN0QyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7eUJBQ3JHO3dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxPQUFPLEVBQUU7NEJBQ3pGLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQzVCO3dCQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2FBQ2xDO1NBQ0Y7SUFDSCxDQUFDO0lBYU8sZUFBZSxDQUFDLFFBQWdCLEVBQUUsZ0JBQXdCLEVBQUUsZ0JBQXdCO1FBRTFGLElBQUksa0JBQWtCLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzNGO2FBQU07WUFDTCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzNGO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUM1RixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUM3RTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFPTyxzQkFBc0IsQ0FBQyxRQUFnQjtRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUNyRCxPQUFPLEVBQUUsc0RBQXNELEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUE7SUFDbEosQ0FBQztJQVVPLFdBQVcsQ0FBQyxhQUFxQixFQUFFLGdCQUF3QixFQUFFLGdCQUF3QjtRQUMzRixJQUNFLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSTtZQUN2QixhQUFhLEdBQUcsZ0JBQWdCO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTTtnQkFDekIsYUFBYSxHQUFHLGdCQUFnQixFQUNoQztZQUNBLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFVTyxhQUFhLENBQUMsS0FBaUI7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsS0FBOEI7UUFFckQsTUFBTSxhQUFhLEdBQUc7WUFDcEIsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUE7UUFFRCxJQUNFLENBQUMsT0FBTyxVQUFVLEtBQUssV0FBVyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUM7WUFDMUQsS0FBSyxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQ2hDO1lBQ0EsTUFBTSxLQUFLLEdBQVcsS0FBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFVLENBQUM7WUFFL0QsYUFBYSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2hDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUNqQzthQUFNO1lBQ0wsYUFBYSxDQUFDLENBQUMsR0FBSSxLQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNoRCxhQUFhLENBQUMsQ0FBQyxHQUFJLEtBQW9CLENBQUMsT0FBTyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQVNPLFlBQVksQ0FBQyxTQUFpQixPQUFPO1FBQzNDLElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDckU7YUFBTSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FFRiJ9