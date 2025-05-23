import { Subject } from 'rxjs';
import { isSafariMobile } from '../ch5-core/utility-functions/is-safari-mobile';
var Ch5PressableFingerStateMode;
(function (Ch5PressableFingerStateMode) {
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Idle"] = 0] = "Idle";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Start"] = 1] = "Start";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["FingerDown"] = 2] = "FingerDown";
})(Ch5PressableFingerStateMode || (Ch5PressableFingerStateMode = {}));
export class Ch5Pressable {
    constructor(component, options) {
        this._fingerState = new Ch5Pressable.FingerState();
        this._pressed = false;
        this._released = true;
        this.TOUCH_TIMEOUT = 250;
        this.CLICK_MOVE_THRESHOLD = 10;
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
        this._onPointerDown = this._onPointerDown.bind(this);
        this._onPointerUp = this._onPointerUp.bind(this);
        this._onPointerLeave = this._onPointerLeave.bind(this);
        this._onPointerMove = this._onPointerMove.bind(this);
        this._onTouchHoldTimer = this._onTouchHoldTimer.bind(this);
        this._onHold = this._onHold.bind(this);
        this._onRelease = this._onRelease.bind(this);
    }
    get ch5Component() {
        return this._ch5Component;
    }
    get options() {
        return this._options;
    }
    init() {
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
        var _a;
        if (this._pressed === true) {
            this.setPressed(false);
        }
        (_a = this.observablePressed) === null || _a === void 0 ? void 0 : _a.complete();
        this.resetPressAndReleaseActions();
        this._removeEvents();
    }
    _attachEvents() {
        this._ch5Component.addEventListener('click', this._onClick);
        this._ch5Component.addEventListener('pointerdown', this._onPointerDown, { passive: true });
        this._ch5Component.addEventListener('pointerup', this._onPointerUp);
        this._ch5Component.addEventListener('pointermove', this._onPointerMove);
        this._ch5Component.addEventListener('pointerleave', this._onPointerLeave);
        if (isSafariMobile()) {
            this._ch5Component.addEventListener('pointerout', this._onPointerLeave);
        }
    }
    _removeEvents() {
        this._ch5Component.removeEventListener('click', this._onClick);
        this._ch5Component.removeEventListener('pointerdown', this._onPointerDown);
        this._ch5Component.removeEventListener('pointerup', this._onPointerUp);
        this._ch5Component.removeEventListener('pointermove', this._onPointerMove);
        this._ch5Component.removeEventListener('pointerleave', this._onPointerLeave);
        if (isSafariMobile()) {
            this._ch5Component.removeEventListener('pointerout', this._onPointerLeave);
        }
    }
    _onClick() {
        if (!this._ch5Component.elementIsInViewPort) {
            return;
        }
    }
    _onPointerDown(pointerEvent) {
        if (!this._ch5Component.elementIsInViewPort) {
            return;
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Idle) {
            this._fingerState.mode = Ch5PressableFingerStateMode.Start;
            this._fingerState.touchHoldTimer = window.setTimeout(this._onTouchHoldTimer, this.TOUCH_TIMEOUT);
            this._fingerState.touchStartLocationX = pointerEvent.clientX;
            this._fingerState.touchStartLocationY = pointerEvent.clientY;
        }
    }
    _onPointerMove(pointerEvent) {
        var _a;
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            this._ch5Component.logger.log("this._options?.enableSwipe", (_a = this._options) === null || _a === void 0 ? void 0 : _a.enableSwipe);
            if (this._options && this._options.enableSwipe === true) {
                if (pointerEvent !== null) {
                    const xMoveDistance = pointerEvent.clientX - this._fingerState.touchStartLocationX;
                    const yMoveDistance = pointerEvent.clientY - this._fingerState.touchStartLocationY;
                    const distanceMoved = Math.sqrt(Math.pow(xMoveDistance, 2) + Math.pow(yMoveDistance, 2));
                    this._ch5Component.info(`DELETE ME Ch5Pressable.onMouseMove() , ${pointerEvent.clientX}, ${pointerEvent.clientY}, ${distanceMoved}`);
                    if (distanceMoved > this.CLICK_MOVE_THRESHOLD) {
                        this._ch5Component.logger.log("Swipe is true");
                        this._ch5Component.info(`Ch5Pressable.onMouseMove() cancelling press, ${pointerEvent.clientX}, ${pointerEvent.clientY}, ${distanceMoved}`);
                        this._fingerState.reset();
                    }
                }
            }
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
            const rect = this._ch5Component.getBoundingClientRect();
            if (pointerEvent.clientX < rect.left ||
                pointerEvent.clientX > rect.right ||
                pointerEvent.clientY < rect.top ||
                pointerEvent.clientY > rect.bottom) {
                this.resetPressAndReleaseActions();
            }
        }
    }
    _onPointerUp(pointerEvent) {
        this._ch5Component.logger.log("_onPointerUp: ", this._ch5Component.getCrId());
        if (!this._ch5Component.elementIsInViewPort) {
            return;
        }
        if (pointerEvent !== null) {
            this.resetPressAndReleaseActions();
        }
    }
    resetPressAndReleaseActions() {
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            this._fingerIsDownActions();
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
            this._onRelease();
        }
        this._fingerState.reset();
    }
    _onPointerLeave(pointerEvent) {
        if (!this._ch5Component.elementIsInViewPort) {
            return;
        }
        if (pointerEvent !== null) {
            this.resetPressAndReleaseActions();
        }
    }
    _onTouchHoldTimer(event) {
        if (!this._ch5Component.elementIsInViewPort) {
            return;
        }
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
    _onHold() {
        this._ch5Component.info(`Ch5Pressable._onHold() alreadyPressed:${this._pressed}`);
        if (!this._pressed) {
            this._addCssPressClass();
            this._pressed = true;
            this._released = false;
            this.observablePressed.next(this._pressed);
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
        this._ch5Component.info(`Ch5Pressable._onRelease() alreadyReleased:${this._released}`);
        if (!this._released) {
            setTimeout(() => {
                this._removeCssPressClass();
            }, this.TOUCH_TIMEOUT);
            this._pressed = false;
            this._released = true;
            this.observablePressed.next(this._pressed);
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
Ch5Pressable.FingerState = class {
    constructor() {
        this.mode = Ch5PressableFingerStateMode.Idle;
        this.touchHoldTimer = null;
        this.touchStartLocationX = 0;
        this.touchStartLocationY = 0;
        this.touchPointId = -1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXByZXNzYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vY2g1LXByZXNzYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQVFoRixJQUFLLDJCQUlKO0FBSkQsV0FBSywyQkFBMkI7SUFDL0IsNkVBQUksQ0FBQTtJQUNKLCtFQUFLLENBQUE7SUFDTCx5RkFBVSxDQUFBO0FBQ1gsQ0FBQyxFQUpJLDJCQUEyQixLQUEzQiwyQkFBMkIsUUFJL0I7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQW9FeEIsWUFBWSxTQUFvQixFQUFFLE9BQThCO1FBekN4RCxpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBb0IvQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBSzFCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFRaEIsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFDNUIseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBUWxELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUdoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFB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