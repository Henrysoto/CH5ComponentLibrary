import { Subject } from 'rxjs';
var Ch5PressableFingerStateMode;
(function (Ch5PressableFingerStateMode) {
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Idle"] = 0] = "Idle";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["Start"] = 1] = "Start";
    Ch5PressableFingerStateMode[Ch5PressableFingerStateMode["FingerDown"] = 2] = "FingerDown";
})(Ch5PressableFingerStateMode || (Ch5PressableFingerStateMode = {}));
export class Ch5PressableButton {
    constructor(component, options) {
        this._fingerState = new Ch5PressableButton.FingerState();
        this._pressed = false;
        this._released = true;
        this._isDestroyed = false;
        this.TOUCH_TIMEOUT = 250;
        this.PRESS_MOVE_THRESHOLD = 10;
        this.CLICK_MOVE_THRESHOLD = 1;
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
        this._onMouseMove = this._onMouseMove.bind(this);
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
        this._isDestroyed = true;
        this._onReleaseAsap();
        (_a = this.observablePressed) === null || _a === void 0 ? void 0 : _a.complete();
        this._removeEvents();
    }
    _attachEvents() {
        this._ch5Component.addEventListener('click', this._onClick);
        this._ch5Component.addEventListener('pointerdown', this._onMouseDown);
        this._ch5Component.addEventListener('pointerup', this._onMouseUp);
        this._ch5Component.addEventListener('pointermove', this._onMouseMove);
        this._ch5Component.addEventListener('pointerleave', this._onMouseLeave);
        this._ch5Component.addEventListener('contextmenu', this._onContextMenu);
    }
    _removeEvents() {
        this._ch5Component.removeEventListener('click', this._onClick);
        this._ch5Component.removeEventListener('pointerdown', this._onMouseDown);
        this._ch5Component.removeEventListener('pointerup', this._onMouseUp);
        this._ch5Component.removeEventListener('pointermove', this._onMouseMove);
        this._ch5Component.removeEventListener('pointerleave', this._onMouseLeave);
        this._ch5Component.removeEventListener('contextmenu', this._onContextMenu);
    }
    _onClick() {
    }
    _onContextMenu(inEvent) {
        inEvent.preventDefault();
    }
    _onMouseDown(inEvent) {
        this._ch5Component.logger.log("this._onMouseDown");
        const mouseEvent = inEvent;
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Idle) {
            this._fingerState.mode = Ch5PressableFingerStateMode.Start;
            this._fingerIsDownActions();
            this._fingerState.touchStartLocationX = mouseEvent.clientX;
            this._fingerState.touchStartLocationY = mouseEvent.clientY;
        }
    }
    _onMouseMove(inEvent) {
        this._ch5Component.logger.log("this._onMouseMove");
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            const mouseEvent = inEvent;
            if (mouseEvent !== null) {
                const xMoveDistance = mouseEvent.clientX - this._fingerState.touchStartLocationX;
                const yMoveDistance = mouseEvent.clientY - this._fingerState.touchStartLocationY;
                const distanceMoved = Math.sqrt(Math.pow(xMoveDistance, 2) + Math.pow(yMoveDistance, 2));
                this._ch5Component.logger.log(`DELETE ME Ch5PressableButton.onMouseMove() , ${mouseEvent.clientX}, ${mouseEvent.clientY}, ${distanceMoved}`);
                if (distanceMoved > this.CLICK_MOVE_THRESHOLD) {
                    this._ch5Component.logger.log(`Ch5PressableButton.onMouseMove() cancelling press, ${mouseEvent.clientX}, ${mouseEvent.clientY}, ${distanceMoved}`);
                    this.resetFingerObject();
                }
            }
        }
    }
    resetFingerObject() {
        this._fingerState.reset();
    }
    _onMouseUp(inEvent) {
        this._ch5Component.logger.log("this._onMouseUp");
        this._onMouseLeave(inEvent);
    }
    _onMouseLeave(inEvent) {
        this._ch5Component.logger.log("this._onMouseLeave");
        const mouseEvent = inEvent;
        if (mouseEvent !== null) {
            this.fingerStateActions();
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
    fingerStateActions() {
        if (this._fingerState.mode === Ch5PressableFingerStateMode.Start) {
            this._fingerIsDownActions();
        }
        if (this._fingerState.mode === Ch5PressableFingerStateMode.FingerDown) {
            this._onRelease();
        }
        this.resetFingerObject();
    }
    _onHold() {
        this._ch5Component.logger.log(`Ch5PressableButton._onHold() alreadyPressed:${this._pressed}`);
        if (!this._pressed) {
            this.addCssPressClass();
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
        this._ch5Component.logger.log(`Ch5PressableButton._onRelease() alreadyReleased:${this._released}`);
        if (!this._released) {
            setTimeout(() => {
                this.removeCssPressClass();
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
    _onReleaseAsap() {
        this._ch5Component.logger.log(`Ch5PressableButton._onRelease() alreadyReleased:${this._released}`);
        if (!this._released) {
            this.removeCssPressClass();
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
    addCssPressClass() {
        if (this._options !== null &&
            this._options.cssTargetElement.classList !== undefined) {
            this._options.cssPressedClass.split(' ').forEach((ele) => {
                var _a;
                (_a = this._options) === null || _a === void 0 ? void 0 : _a.cssTargetElement.classList.add(ele);
            });
        }
    }
    removeCssPressClass() {
        if (this._options !== null &&
            this._options.cssTargetElement.classList !== undefined) {
            this._options.cssPressedClass.split(' ').forEach((ele) => {
                var _a;
                (_a = this._options) === null || _a === void 0 ? void 0 : _a.cssTargetElement.classList.remove(ele);
            });
        }
    }
}
Ch5PressableButton.FingerState = class {
    constructor() {
        this.mode = Ch5PressableFingerStateMode.Idle;
        this.touchHoldTimer = null;
        this.touchStartLocationX = 0;
        this.touchStartLocationY = 0;
        this.touchPointId = -1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXByZXNzYWJsZS1idXR0b24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1wcmVzc2FibGUtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFPL0IsSUFBSywyQkFJSjtBQUpELFdBQUssMkJBQTJCO0lBQy9CLDZFQUFJLENBQUE7SUFDSiwrRUFBSyxDQUFBO0lBQ0wseUZBQVUsQ0FBQTtBQUNYLENBQUMsRUFKSSwyQkFBMkIsS0FBM0IsMkJBQTJCLFFBSS9CO0FBRUQsTUFBTSxPQUFPLGtCQUFrQjtJQWlGOUIsWUFBWSxTQUFvQixFQUFFLE9BQThCO1FBeEN4RCxpQkFBWSxHQUFHLElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFtQnJELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFLMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQU9wQixrQkFBYSxHQUFXLEdBQUcsQ0FBQztRQUM1Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMseUJBQW9CLEdBQVcsQ0FBQyxDQUFDO1FBTWpELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUdoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLEtBQUs7U0FD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