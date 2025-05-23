import 'hammerjs';
import { Subject } from 'rxjs';
import _ from 'lodash';
var Ch5PressableFingerStateMode;
(function (Ch5PressableFingerStateMode) {
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Idle"] = 0] = "Idle";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Start"] = 1] = "Start";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["FingerDown"] = 2] = "FingerDown";
})(Ch5PressableFingerStateMode || (Ch5PressableFingerStateMode = {}));
export class Ch5PressableSlider {
    constructor(component, options) {
        this._fingerState = new Ch5PressableSlider.FingerState();
        this._touchStart = false;
        this._touchEnd = false;
        this._pressed = false;
        this._released = true;
        this._hammerManager = null;
        this._gestureableSubscription = null;
        this.TOUCH_TIMEOUT = 250;
        this.PRESS_MOVE_THRESHOLD = 10;
        this.CLICK_MOVE_THRESHOLD = 1;
        this.isTouch = false;
        this.isMouse = false;
        this.sliderValue = '';
        this._ch5Component = component;
        this._options = options || null;
        this.observablePressed = new Subject();
        this._pressEvent = new CustomEvent("press", {
            bubbles: true,
            cancelable: false
        });
        this._releaseEvent = new CustomEvent("release", {
            bubbles: true,
            cancelable: false
        });
        this._onClick = this._onClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onTouchCancel = this._onTouchCancel.bind(this);
        this._onTouchHoldTimer = this._onTouchHoldTimer.bind(this);
        this._onHold = this._onHold.bind(this);
        this._onRelease = this._onRelease.bind(this);
        this._onPanEnd = this._onPanEnd.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }
    get ch5Component() {
        return this._ch5Component;
    }
    get options() {
        return this._options;
    }
    get pressDelayTime() {
        if (this._options !== null && !_.isNil(this._options.pressDelayTime)) {
            return this._options.pressDelayTime;
        }
        else {
            return this.TOUCH_TIMEOUT;
        }
    }
    get pressDelayMoveDistance() {
        if (this._options !== null && !_.isNil(this._options.pressDelayDistance)) {
            return this._options.pressDelayDistance;
        }
        else {
            return this.PRESS_MOVE_THRESHOLD;
        }
    }
    get clickDelayMoveDistance() {
        if (this.options !== null && !_.isNil(this.options.clickDelayDistance)) {
            return this.options.clickDelayDistance;
        }
        else {
            return this.CLICK_MOVE_THRESHOLD;
        }
    }
    init() {
        this._hammerManager = new Hammer(this._ch5Component, {
            touchAction: 'auto'
        });
        this._subscribeToGestureableProp();
        this._attachEvents();
    }
    setPressed(value) {
        if (this._pressed === true) {
            if (value === false) {
                this._onRelease();
            }
        }
        else {
            if (value === true) {
                this._onHold();
            }
        }
    }
    destroy() {
        this._unsubscribeFromGestureableProp();
        this._removeEvents();
    }
    _attachEvents() {
        this._ch5Component.addEventListener('click', this._onClick);
        this._ch5Component.addEventListener('mousedown', this._onMouseDown, { passive: true });
        this._ch5Component.addEventListener('mouseup', this._onMouseUp);
        this._ch5Component.addEventListener('mousemove', this._onMouseMove);
        this._ch5Component.addEventListener('mouseleave', this._onMouseLeave);
        this._ch5Component.addEventListener('mouseout', this._onMouseLeave);
        this._ch5Component.addEventListener('touchstart', this._onTouchStart, { passive: true });
        this._ch5Component.addEventListener('touchmove', this._onTouchMove);
        this._ch5Component.addEventListener('touchend', this._onTouchEnd);
        this._ch5Component.addEventListener('touchcancel', this._onTouchCancel);
    }
    _removeEvents() {
        this._ch5Component.removeEventListener('click', this._onClick);
        this._ch5Component.removeEventListener('mousedown', this._onMouseDown);
        this._ch5Component.removeEventListener('mouseup', this._onMouseUp);
        this._ch5Component.removeEventListener('mouseleave', this._onMouseLeave);
        this._ch5Component.removeEventListener('touchstart', this._onTouchStart);
        this._ch5Component.removeEventListener('touchmove', this._onTouchMove);
        this._ch5Component.removeEventListener('touchend', this._onTouchEnd);
        this._ch5Component.removeEventListener('touchcancel', this._onTouchCancel);
        this._removeEventsFromHammer();
    }
    _subscribeToGestureableProp() {
        this._attachEventsFromHammer();
    }
    _unsubscribeFromGestureableProp() {
        if (this._gestureableSubscription !== null) {
            this._gestureableSubscription.unsubscribe();
            this._gestureableSubscription = null;
        }
    }
    _attachEventsFromHammer() {
        if (this._hammerManager !== null) {
            this._hammerManager.on('press', this._onHold);
            this._hammerManager.on('pressup', this._onRelease);
            this._hammerManager.on('panend', this._onPanEnd);
        }
    }
    _removeEventsFromHammer() {
        if (this._hammerManager !== null) {
            this._hammerManager.off('press', this._onHold);
            this._hammerManager.off('pressup', this._onRelease);
            this._hammerManager.off('panend', this._onPanEnd);
            this._hammerManager.destroy();
            this._hammerManager = null;
        }
    }
    _onClick(inEvent) {
        this._touchStart = false;
        this._touchEnd = false;
    }
    _onMouseDown(inEvent) {
        if (this._touchStart) {
            return;
        }
        if (this.isTouch) {
            return;
        }
        this.isMouse = true;
        this.isTouch = false;
        const mouseEvent = inEvent;
        const clientX = inEvent.clientX;
        const clientY = inEvent.clientY;
        const { left, width, height, top } = this._ch5Component.getBoundingClientRect();
        const value = width > height ? (clientX - left) / width : (1 - (clientY - top) / height);
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Idle) {
            this._fingerState.mode = Ch5PressableFingerStateMode.Start;
            this._fingerState.touchHoldTimer = window.setTimeout(this._onTouchHoldTimer, this.pressDelayTime);
            this._fingerState.touchStartLocationX = mouseEvent.clientX;
            this._fingerState.touchStartLocationY = mouseEvent.clientY;
        }
        if (value <= 0.25) {
            this.sliderValue = 'lower';
        }
        else if (value >= 0.75) {
            this.sliderValue = 'upper';
        }
        else {
            this.sliderValue = '';
        }
    }
    _onMouseMove(inEvent) {
        if (this.isTouch) {
            return;
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            const mouseEvent = inEvent;
            if (mouseEvent !== null) {
                const xMoveDistance = mouseEvent.clientX - this._fingerState.touchStartLocationX;
                const yMoveDistance = mouseEvent.clientY - this._fingerState.touchStartLocationY;
                const distanceMoved = Math.sqrt(Math.pow(xMoveDistance, 2) + Math.pow(yMoveDistance, 2));
                if (distanceMoved > this.clickDelayMoveDistance) {
                    this._touchStart = false;
                    this._fingerState.reset();
                }
            }
        }
    }
    _onMouseUp(inEvent) {
        if (this._pressed === true) {
            this._onRelease();
        }
        if (this.isTouch) {
            return;
        }
        const mouseEvent = inEvent;
        if (mouseEvent !== null) {
            if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
                this._fingerIsDownActions();
            }
            if (!this._touchEnd) {
                this._touchEnd = true;
            }
            if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
                this._onRelease();
            }
            this._fingerState.reset();
        }
    }
    _onMouseLeave(inEvent) {
        if (this.isTouch) {
            return;
        }
        const mouseEvent = inEvent;
        if (mouseEvent !== null) {
            if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
                this._fingerIsDownActions();
            }
            if (!this._touchEnd) {
                this._touchEnd = true;
            }
            if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
                this._onRelease();
            }
            this._fingerState.reset();
        }
    }
    _onTouchStart(inEvent) {
        const clientX = inEvent.touches[0].clientX;
        const clientY = inEvent.touches[0].clientY;
        const { left, width, height, top } = this._ch5Component.getBoundingClientRect();
        const value = width > height ? (clientX - left) / width : (1 - (clientY - top) / height);
        if (value <= 0.25) {
            this.sliderValue = 'lower';
        }
        else if (value >= 0.75) {
            this.sliderValue = 'upper';
        }
        else {
            this.sliderValue = '';
        }
    }
    _onTouchMove(inEvent) {
        if (this.isMouse) {
            return;
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            const touchEvent = inEvent;
            const touch = this._fingerState.getTouchFromTouchList(touchEvent);
            if (touch !== null) {
                const xMoveDistance = touch.clientX - this._fingerState.touchStartLocationX;
                const yMoveDistance = touch.clientY - this._fingerState.touchStartLocationY;
                const distanceMoved = Math.sqrt(Math.pow(xMoveDistance, 2) + Math.pow(yMoveDistance, 2));
                if (distanceMoved > this.pressDelayMoveDistance) {
                    this._touchStart = false;
                    this._fingerState.reset();
                }
            }
        }
    }
    _onTouchHoldTimer(event) {
        this._fingerState.touchHoldTimer = null;
        this._fingerIsDownActions();
    }
    _fingerIsDownActions() {
        this._fingerState.mode = Ch5PressableFingerStateMode.FingerDown;
        this._onHold();
        if (this._fingerState.touchHoldTimer !== null) {
            window.clearTimeout(this._fingerState.touchHoldTimer);
            this._fingerState.touchHoldTimer = null;
        }
    }
    _onTouchEnd(inEvent) {
        if (this._pressed) {
            this._onRelease();
        }
        if (this.isMouse) {
            return;
        }
        const touchEvent = inEvent;
        const touch = this._fingerState.getTouchFromTouchList(touchEvent);
        if (touch !== null) {
            if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
                this._fingerIsDownActions();
            }
            if (!this._touchEnd) {
                this._touchEnd = true;
            }
            if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
                this._onRelease();
            }
            this._fingerState.reset();
        }
    }
    _onTouchCancel(inEvent) {
        this._onTouchEnd(inEvent);
    }
    _onHold() {
        if (!this._pressed) {
            this._addCssPressClass();
            this._pressed = true;
            this._released = false;
            if (this.sliderValue !== '') {
                this.observablePressed.next({ pressed: this._pressed, range: this.sliderValue });
            }
            this._ch5Component.setAttribute("pressed", "true");
            this._ch5Component.dispatchEvent(this._pressEvent);
            const onPressAttrib = this._ch5Component.getAttribute('onpress');
            if (onPressAttrib !== null) {
                try {
                    eval(onPressAttrib);
                }
                catch (e) {
                }
                ;
            }
        }
    }
    _onRelease() {
        if (!this._released) {
            setTimeout(() => {
                this._removeCssPressClass();
            }, this.pressDelayTime);
            this._pressed = false;
            this._released = true;
            if (this.sliderValue !== '') {
                this.observablePressed.next({ pressed: this._pressed, range: this.sliderValue });
            }
            this._ch5Component.removeAttribute("pressed");
            this._ch5Component.dispatchEvent(this._releaseEvent);
            const onReleaseAttrib = this._ch5Component.getAttribute('onrelease');
            if (onReleaseAttrib !== null) {
                try {
                    eval(onReleaseAttrib);
                }
                catch (e) {
                }
                ;
            }
        }
    }
    _onPanEnd() {
        this._onRelease();
    }
    _addCssPressClass() {
        if (this._options !== null &&
            this._options.cssTargetElement.classList !== undefined) {
            this._options.cssPressedClass.split(' ').forEach((ele) => {
                var _a;
                (_a = this._options) === null || _a === void 0 ? void 0 : _a.cssTargetElement.classList.add(ele);
            });
        }
    }
    _removeCssPressClass() {
        if (this._options !== null &&
            this._options.cssTargetElement.classList !== undefined) {
            this._options.cssPressedClass.split(' ').forEach((ele) => {
                var _a;
                (_a = this._options) === null || _a === void 0 ? void 0 : _a.cssTargetElement.classList.remove(ele);
            });
        }
    }
}
Ch5PressableSlider.FingerState = class {
    constructor() {
        this.touchHoldTimer = null;
        this.touchPointId = -1;
        this.mode = Ch5PressableFingerStateMode.Idle;
        this.touchStartLocationX = 0;
        this.touchStartLocationY = 0;
        this.touchPointId = -1;
        this.touchHoldTimer = null;
    }
    getTouchFromTouchList(touchEvent) {
        if (touchEvent.changedTouches !== undefined) {
            for (let i = 0; i < touchEvent.changedTouches.length; i++) {
                if (touchEvent.changedTouches[i].identifier === this.touchPointId) {
                    return touchEvent.changedTouches[i];
                }
            }
        }
        return null;
    }
    reset() {
        this.mode = Ch5PressableFingerStateMode.Idle;
        this.touchStartLocationX = 0;
        this.touchStartLocationY = 0;
        this.touchPointId = -1;
        if (this.touchHoldTimer !== null) {
            window.clearTimeout(this.touchHoldTimer);
            this.touchHoldTimer = null;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXByZXNzYWJsZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1wcmVzc2FibGUtc2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBVXZCLElBQUssMkJBSUo7QUFKRCxXQUFLLDJCQUEyQjtJQUMvQiw2RUFBSSxDQUFBO0lBQ0osK0VBQUssQ0FBQTtJQUNMLHlGQUFVLENBQUE7QUFDWCxDQUFDLEVBSkksMkJBQTJCLEtBQTNCLDJCQUEyQixRQUkvQjtBQUVELE1BQU0sT0FBTyxrQkFBa0I7SUF1SDlCLFlBQVksU0FBc0IsRUFBRSxPQUE4QjtRQXhFMUQsaUJBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBbUJwRCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUs3QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBTzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFPMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQVF6QixtQkFBYyxHQUF5QixJQUFJLENBQUM7UUFLNUMsNkJBQXdCLEdBQXdCLElBQUksQ0FBQztRQVE1QyxrQkFBYSxHQUFXLEdBQUcsQ0FBQztRQUM1Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMseUJBQW9CLEdBQVcsQ0FBQyxDQUFDO1FBRTFDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQVFoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksT0FB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