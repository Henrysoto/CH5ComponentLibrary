import isNil from "lodash/isNil";
import { Ch5ListItemAxis } from "./ch5-list";
import { getEvtListenerOptions } from "../ch5-list/passiveEventListeners";
import { normalizeEvent } from "../ch5-triggerview/utils";
import { Ch5ListAbstractHelper } from "./ch5-list-abstract-helper";
import { isCrestronDevice } from "../ch5-core/utility-functions/is-crestron-device";
export const stepAllowancePx = 50;
export class Ch5ListEventManager extends Ch5ListAbstractHelper {
    constructor(list) {
        super(list);
        this._dragAllowanceAngle = 45;
        this._currentDragAngle = 0;
        this._listHasMoved = false;
        this._hammer = null;
        this._updateManager = 0;
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerEnd = this.onPointerEnd.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onPointerCancel = this.onPointerCancel.bind(this);
        this.onOrientationChange = this.onOrientationChange.bind(this);
    }
    removeEvents(additionalElement) {
        this._list.info(`ch5-list-event-manager - removeEvents`);
        if (this._hammer !== null) {
            this._hammer.destroy();
            this._hammer = null;
        }
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('touchcancel', this.onPointerCancel);
        window.removeEventListener('orientationchange', this.onOrientationChange);
        additionalElement.removeEventListener('touchstart', this.onPointerDown);
        additionalElement.removeEventListener('mousedown', this.onPointerDown);
        additionalElement.removeEventListener('touchmove', this.onPointerMove);
        additionalElement.removeEventListener('mousemove', this.onPointerMove);
        additionalElement.removeEventListener('touchend', this.onPointerEnd);
        additionalElement.removeEventListener('mouseup', this.onPointerEnd);
    }
    initializeEvents(additionalElement) {
        this._list.info(`ch5-list-event-manager - initializeEvents`);
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('orientationchange', this.onOrientationChange);
        if (isCrestronDevice()) {
            this.initializeTouchEvents(additionalElement);
        }
        else {
            this.initializeMouseEvents(additionalElement);
            this.initializeTouchEvents(additionalElement);
        }
        window.addEventListener('touchmove', () => { return; });
    }
    initializeTouchEvents(additionalElement) {
        this._list.info(`ch5-list-event-manager - initializeTouchEvents`);
        window.addEventListener('touchcancel', this.onPointerCancel);
        additionalElement.addEventListener('touchstart', this.onPointerDown, { passive: true });
        additionalElement.addEventListener('touchmove', this.onPointerMove, { passive: true });
        additionalElement.addEventListener('touchend', this.onPointerEnd, true);
    }
    initializeMouseEvents(additionalElement) {
        this._list.info(`initializeMouseEvents`);
        additionalElement.addEventListener('mousedown', this.onPointerDown);
        additionalElement.addEventListener('mousemove', this.onPointerMove, getEvtListenerOptions(false));
        additionalElement.addEventListener('mouseup', this.onPointerEnd, true);
    }
    checkTouchSupport() {
        if (('ontouchstart' in window && 'ontouchmove' in window && 'ontouchend' in window && 'ontouchcancel' in window)
            || (navigator.maxTouchPoints > 0)) {
            return true;
        }
        return false;
    }
    onWindowResize() {
        this._list.templateHelper.resetListLayout();
    }
    onPointerDown(event) {
        this._list.info(`ch5-list-event-manager - onPointerDown: ${event}`);
        const e = normalizeEvent(event);
        if (this._list.decelerating) {
            e.event.stopPropagation();
        }
        if ((this._list.endless && !this._animationHelper.maxOffsetTranslate) || !this._list.endless) {
            this._list.sizeResolver.updateViewport(this._list);
            const bufferAmountState = !isNil(this._list.bufferAmount) && this._list.bufferAmount > 0;
            const maxOffsetTranslate = this._animationHelper.adjustMaxOffset(bufferAmountState);
            this._animationHelper.maxOffsetTranslate = maxOffsetTranslate;
        }
        const containerBounding = this._list.getBoundingClientRect();
        const firstChildBounding = this._list.items[0].element.getBoundingClientRect();
        let containerSize = containerBounding.width;
        let totalItemsSize = firstChildBounding.width * this._list.size;
        this._templateHelper.resolveEndlessViewportSize();
        if (!this._list.isHorizontal) {
            containerSize = containerBounding.height;
            totalItemsSize = firstChildBounding.height * this._list.size;
        }
        if (totalItemsSize > containerSize) {
            this._list.decelerating = false;
            this._list.isPointerActive = true;
            this._list.pointerId = e.id;
            this._list.pointerFirstX = this._list.pointerLastX = this._list.pointerCurrentX = e.x;
            this._list.pointerFirstY = this._list.pointerLastY = this._list.pointerCurrentY = e.y;
            this._list.lastDraggedLayoutIndex = this._list.items[this._list.selected].layoutIndex;
            this._list.pointerStartTime = this._list.pointerEndTime = Date.now();
            this._list.stepOnX = this._list.currentXPosition;
            this._list.stepOnY = this._list.currentYPosition;
            this._list.trackingPointsX = [];
            this._list.trackingPointsY = [];
            this._addTrackingPoint(this._list.pointerLastX, Ch5ListItemAxis.X);
            this._addTrackingPoint(this._list.pointerLastY, Ch5ListItemAxis.Y);
            this._list.animationHelper.stop();
            window.addEventListener('touchcancel', this.onPointerEnd);
        }
    }
    onPointerMove(event) {
        const e = normalizeEvent(event);
        const oppositeVectorSize = Math.abs(this._list.pointerFirstX - e.x);
        const adjacentVectorSize = Math.abs(this._list.pointerFirstY - e.y);
        let dragAngle = Math.atan2(oppositeVectorSize, adjacentVectorSize) * (180 / Math.PI);
        if (this._list.isHorizontal) {
            dragAngle = Math.atan2(adjacentVectorSize, oppositeVectorSize) * (180 / Math.PI);
        }
        this._currentDragAngle = dragAngle;
        if (this._currentDragAngle >= 0 &&
            this._currentDragAngle <= this._dragAllowanceAngle &&
            this._list.isPointerActive) {
            this._list.info(`ch5-list-event-manager - onPointerMove: ${event}`);
            this._list.pointerCurrentX = e.x;
            this._list.pointerCurrentY = e.y;
            this._listHasMoved = true;
            const dX = this._list.currentXPosition + this._list.pointerCurrentX - this._list.pointerFirstX;
            const dY = this._list.currentYPosition + this._list.pointerCurrentY - this._list.pointerFirstY;
            const startingPoint = this._list.isHorizontal ? dX : dY;
            const endingPoint = this._list.isHorizontal ? this._list.stepOnX : this._list.stepOnY;
            if (Math.abs(endingPoint - startingPoint) > 1) {
                this._list.animationHelper.direction = this._list.animationHelper.resolveDirection(startingPoint, endingPoint);
            }
            clearTimeout(this._updateManager);
            this._updateManager = window.setTimeout(() => {
                this._list.stepOnX = dX;
                this._list.stepOnY = dY;
                this._list.pointerStartTime = Date.now();
            }, 50);
            let coord = dX;
            if (!this._list.isHorizontal) {
                coord = dY;
            }
            this._templateHelper.computePage(Math.abs(coord));
            this._addTrackingPoint(this._list.pointerLastX, Ch5ListItemAxis.X);
            this._addTrackingPoint(this._list.pointerLastY, Ch5ListItemAxis.Y);
            if (this._animationHelper !== null) {
                this._animationHelper.updateDragPosition(coord);
            }
        }
        else {
            this._list.isPointerActive = false;
        }
    }
    onPointerEnd(event) {
        this._list.info(`ch5-list-event-manager - onPointerEnd: ${event}`);
        this._list.pointerEndTime = Date.now();
        if (this._listHasMoved) {
            this._list.currentXPosition += this._list.pointerCurrentX - this._list.pointerFirstX;
            this._list.currentYPosition += this._list.pointerCurrentY - this._list.pointerFirstY;
            this.stopPointerTracking();
        }
        clearTimeout(this._updateManager);
        this._listHasMoved = false;
    }
    onPointerCancel() {
        this._list.info(`ch5-list-event-manager - onPointerCancel`);
        this.stopPointerTracking();
    }
    updateDragEventListeners(element) {
        this._list.info(`ch5-list-event-manager - updateDragEventListeners`);
        element.addEventListener('touchstart', this.onPointerDown, getEvtListenerOptions(true));
        element.addEventListener('mousedown', this.onPointerDown, getEvtListenerOptions(true));
    }
    onOrientationChange() {
        this._templateHelper.customScrollbar(this._list);
    }
    stopPointerTracking() {
        this._list.info(`ch5-list-event-manager - stopPointerTracking`);
        this._list.isPointerActive = false;
        this._list.pointerId = 0;
        if (this._animationHelper !== null) {
            this._animationHelper.startDecelerating();
        }
    }
    _addTrackingPoint(num, axis) {
        const time = Date.now();
        switch (axis) {
            case Ch5ListItemAxis.X:
                while (this._list.trackingPointsX.length > 0) {
                    if (time - this._list.trackingPointsX[0].time <= 100) {
                        break;
                    }
                    this._list.trackingPointsX.shift();
                }
                this._list.trackingPointsX.push({ num, time });
                break;
            case Ch5ListItemAxis.Y:
                while (this._list.trackingPointsY.length > 0) {
                    if (time - this._list.trackingPointsY[0].time <= 100) {
                        break;
                    }
                    this._list.trackingPointsY.shift();
                }
                this._list.trackingPointsY.push({ num, time });
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3QtZXZlbnQtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1saXN0L2NoNS1saXN0LWV2ZW50LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sRUFBVyxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBU3BGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFbEMsTUFBTSxPQUFPLG1CQUFvQixTQUFRLHFCQUFxQjtJQThCN0QsWUFBWSxJQUFhO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXRCSCx3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFRakMsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBRTlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRWpDLFlBQU8sR0FBeUIsSUFBSSxDQUFDO1FBT3JDLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBS2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFD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