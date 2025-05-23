import { isNil } from "lodash";
import { Ch5Debug, Ch5Platform, Ch5SignalFactory, publishEvent } from "../ch5-core";
export var Ch5TouchActivitySignals;
(function (Ch5TouchActivitySignals) {
    Ch5TouchActivitySignals["CsigTime"] = "Csig.Time";
    Ch5TouchActivitySignals["CsigResetActivityTimer"] = "Csig.Reset_Activity_Timer";
    Ch5TouchActivitySignals["CsigTouchActivity"] = "Csig.Touch_Activity";
})(Ch5TouchActivitySignals || (Ch5TouchActivitySignals = {}));
export class Ch5TouchActivity {
    constructor(ch5SignalFactory, ch5Platform) {
        this._ch5TimeSignal = null;
        this._ch5ResetActivityTimerSignal = null;
        this._supportsTouchActivity = true;
        this._touchInactivityPeriod = 0;
        this._touchActivityTimeoutId = 0;
        this._ch5SignalFactory = ch5SignalFactory;
        this._ch5Platform = ch5Platform;
        this._onTouchStart = this._onTouchStart.bind(this);
        document.addEventListener('touchstart', this._onTouchStart);
        this._onTouchMove = this._onTouchMove.bind(this);
        document.addEventListener('touchmove', this._onTouchMove);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        document.addEventListener('touchend', this._onTouchEnd);
        this._onTouchCancel = this._onTouchCancel.bind(this);
        document.addEventListener('touchcancel', this._onTouchCancel);
    }
    static getInstance(ch5SignalFactory, ch5Platform) {
        if (isNil(this._instance)) {
            if (isNil(ch5Platform)) {
                ch5Platform = Ch5Platform.getInstance();
            }
            if (isNil(ch5SignalFactory)) {
                ch5SignalFactory = Ch5SignalFactory.getInstance();
            }
            this._instance = new Ch5TouchActivity(ch5SignalFactory, ch5Platform);
        }
        return this._instance;
    }
    init() {
        this.setSupportsTouchActivity(this._ch5Platform.getPlatformInfo());
        this._ch5Platform.registerUpdateCallback((platformInfo) => {
            this.setSupportsTouchActivity(platformInfo);
            if (!this._supportsTouchActivity) {
                const { CsigTime, CsigResetActivityTimer } = Ch5TouchActivitySignals;
                Ch5Debug.info('Ch5TouchActivity', `No support for touch activity, subscribing to ${CsigTime} and ${CsigResetActivityTimer}`);
                this.subscribeToTimeSignal();
                this.subscribeToResetActivityTimerSignal();
            }
            else {
                Ch5Debug.info('Ch5TouchActivity', `Touch activity is supported`);
            }
        });
    }
    setSupportsTouchActivity(ch5PlatformInfo) {
        this._supportsTouchActivity = !isNil(ch5PlatformInfo.capabilities) && ch5PlatformInfo.capabilities.supportsTouchActivity;
    }
    subscribeToTimeSignal() {
        this._ch5TimeSignal = this._ch5SignalFactory.getNumberSignal(Ch5TouchActivitySignals.CsigTime, true);
        if (!isNil(this._ch5TimeSignal)) {
            this._ch5TimeSignal.subscribe((time) => {
                Ch5Debug.info('Ch5TouchActivity', `CSIG_TIME: ${time}`);
                this._touchInactivityPeriod = time;
                this.clearTouchInactivityTimeout();
                this.setTouchInactivityTimeout();
            });
        }
    }
    subscribeToResetActivityTimerSignal() {
        this._ch5ResetActivityTimerSignal = this._ch5SignalFactory.getBooleanSignal(Ch5TouchActivitySignals.CsigResetActivityTimer, true);
        if (!isNil(this._ch5ResetActivityTimerSignal)) {
            this._ch5ResetActivityTimerSignal.subscribe((reset) => {
                Ch5Debug.info('Ch5TouchActivity', `CSIG_RESET_ACTIVITY_TIMER: ${reset}`);
                if (reset) {
                    this.clearTouchInactivityTimeout();
                    this.publishTouchActivityEvent(false);
                    this.setTouchInactivityTimeout();
                }
            });
        }
    }
    _onTouchStart(event) {
        Ch5Debug.info('Ch5TouchActivity', `_onTouchStart(${event.type})`);
        this.clearTouchInactivityTimeout();
        this.publishTouchActivity();
    }
    _onTouchMove(event) {
        Ch5Debug.info('Ch5TouchActivity', `_onTouchMove(${event.type})`);
        this.clearTouchInactivityTimeout();
        this.publishTouchActivity();
    }
    _onTouchEnd(event) {
        Ch5Debug.info('Ch5TouchActivity', `_onTouchEnd(${event.type})`);
        this.clearTouchInactivityTimeout();
        this.setTouchInactivityTimeout();
        this.publishTouchActivity();
    }
    _onTouchCancel(event) {
        Ch5Debug.info('Ch5TouchActivity', `_onTouchCancel(${event.type})`);
        this.clearTouchInactivityTimeout();
        this.setTouchInactivityTimeout();
        this.publishTouchActivity();
    }
    publishTouchActivity() {
        if (this._touchInactivityPeriod <= 0) {
            return;
        }
        Ch5Debug.info('Ch5TouchActivity', `Publish touch activity with true`);
        this.publishTouchActivityEvent(true);
    }
    setTouchInactivityTimeout() {
        if (this._touchInactivityPeriod <= 0) {
            return;
        }
        Ch5Debug.info('Ch5TouchActivity', `Publish touch activity with false after ${this._touchInactivityPeriod}s`);
        this._touchActivityTimeoutId = window.setTimeout(() => {
            this.clearTouchInactivityTimeout();
            this.publishTouchActivityEvent(false);
        }, this._touchInactivityPeriod * 1000);
    }
    clearTouchInactivityTimeout() {
        if (!isNil(this._touchActivityTimeoutId)) {
            window.clearTimeout(this._touchActivityTimeoutId);
        }
    }
    publishTouchActivityEvent(touchActivityFlag) {
        Ch5Debug.info('Ch5TouchActivity', `CSIG_TOUCH_ACTIVITY: ${touchActivityFlag}`);
        publishEvent('boolean', Ch5TouchActivitySignals.CsigTouchActivity, touchActivityFlag);
    }
}
Ch5TouchActivity.getInstance().init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRvdWNoLWFjdGl2aXR5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRvdWNoL2NoNS10b3VjaC1hY3Rpdml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQy9CLE9BQU8sRUFDTCxRQUFRLEVBQ1IsV0FBVyxFQUdYLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsTUFBTSxhQUFhLENBQUM7QUFFckIsTUFBTSxDQUFOLElBQVksdUJBSVg7QUFKRCxXQUFZLHVCQUF1QjtJQUNqQyxpREFBc0IsQ0FBQTtJQUN0QiwrRUFBb0QsQ0FBQTtJQUNwRCxvRUFBeUMsQ0FBQTtBQUMzQyxDQUFDLEVBSlcsdUJBQXVCLEtBQXZCLHVCQUF1QixRQUlsQztBQUVELE1BQU0sT0FBTyxnQkFBZ0I7SUE0QzNCLFlBQW9CLGdCQUFrQyxFQUFFLFdBQXdCO1FBOUJ4RSxtQkFBYyxHQUE2QixJQUFJLENBQUM7UUFNaEQsaUNBQTRCLEdBQThCLElBQUksQ0FBQztRQVkvRCwyQkFBc0IsR0FBWSxJQUFJLENBQUM7UUFLdkMsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBS25DLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUcxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVB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