import * as Easings from '../math/easings';
import { GetViewportDetails } from '../viewport';
import { AddTick } from '../tick';
import { USER_SCROLL_EVENTS } from './user-scroll-events';
const win = window;
const body = document.body;
export var Easing;
(function (Easing) {
    Easing["easeInQuad"] = "easeInQuad";
    Easing["easeOutQuad"] = "easeOutQuad";
    Easing["easeInOutQuad"] = "easeInOutQuad";
    Easing["easeInCubic"] = "easeInCubic";
    Easing["easeOutCubic"] = "easeOutCubic";
    Easing["easeInOutCubic"] = "easeInOutCubic";
    Easing["easeInQuart"] = "easeInQuart";
    Easing["easeOutQuart"] = "easeOutQuart";
    Easing["easeInOutQuart"] = "easeInOutQuart";
    Easing["easeInQuint"] = "easeInQuint";
    Easing["easeOutQuint"] = "easeOutQuint";
    Easing["easeInOutQuint"] = "easeInOutQuint";
    Easing["easeInSine"] = "easeInSine";
    Easing["easeOutSine"] = "easeOutSine";
    Easing["easeInOutSine"] = "easeInOutSine";
    Easing["easeInExpo"] = "easeInExpo";
    Easing["easeOutExpo"] = "easeOutExpo";
    Easing["easeInOutExpo"] = "easeInOutExpo";
    Easing["easeInCirc"] = "easeInCirc";
    Easing["easeOutCirc"] = "easeOutCirc";
    Easing["easeInOutCirc"] = "easeInOutCirc";
    Easing["easeInElastic"] = "easeInElastic";
    Easing["easeOutElastic"] = "easeOutElastic";
    Easing["easeInOutElastic"] = "easeInOutElastic";
    Easing["easeInBack"] = "easeInBack";
    Easing["easeOutBack"] = "easeOutBack";
    Easing["easeInOutBack"] = "easeInOutBack";
    Easing["easeInBounce"] = "easeInBounce";
    Easing["easeOutBounce"] = "easeOutBounce";
    Easing["easeInOutBounce"] = "easeInOutBounce";
})(Easing || (Easing = {}));
const defaultOptions = {
    offset: [0, 0],
    duration: [200, 5000],
    easing: Easing.easeInOutQuart,
    cancelOnUserScroll: true,
    animate: true,
    autoDurationMultiplier: 2,
};
export class ScrollableArea {
    constructor(scrollContainer) {
        this.scrollContainer = scrollContainer;
        this.ticking = false;
        this._scrolling = false;
        this.scrollFrom = null;
        this.scrollTo = null;
        this.duration = 0;
        this.timestamp = 0;
        this.scrollX = 0;
        this.scrollY = 0;
        this.easing = null;
        this.resolve = null;
    }
    ScrollToTarget(target, options) {
        if (!Array.isArray(target)) {
            target = [target.offsetLeft, target.offsetTop];
        }
        const { offset, easing, animate, duration, cancelOnUserScroll, autoDurationMultiplier } = Object.assign(defaultOptions, options);
        this.setScrollPosition();
        this.easing = Easings[easing];
        this.scrollFrom = [this.scrollX, this.scrollY];
        this.scrollTo = [target[0] + offset[0], target[1] + offset[1]];
        return new Promise(resolve => {
            if (this.scrollFrom === this.scrollTo) {
                resolve();
            }
            else {
                if (animate) {
                    if (!this.ticking) {
                        this.ticking = true;
                        AddTick(this.tick.bind(this));
                    }
                    let scrollHeight;
                    let scrollWidth;
                    if (this.scrollContainer instanceof Window) {
                        const viewport = GetViewportDetails();
                        scrollWidth = body.offsetWidth - viewport.width;
                        scrollHeight = body.offsetHeight - viewport.heightCollapsedControls;
                    }
                    else {
                        scrollWidth = this.scrollContainer.scrollWidth;
                        scrollHeight = this.scrollContainer.scrollHeight;
                    }
                    this.scrollTo[0] = Math.max(Math.min(this.scrollTo[0], scrollWidth), 0);
                    this.scrollTo[1] = Math.max(Math.min(this.scrollTo[1], scrollHeight), 0);
                    const distanceX = Math.abs(this.scrollFrom[0] - this.scrollTo[0]);
                    const distanceY = Math.abs(this.scrollFrom[1] - this.scrollTo[1]);
                    const autoDuration = Math.max(distanceX, distanceY) * autoDurationMultiplier;
                    if (Array.isArray(duration)) {
                        this.duration = Math.round(Math.min(Math.max(Math.round(autoDuration), duration[0]), duration[1]));
                    }
                    else {
                        this.duration = duration;
                    }
                    this.timestamp = Date.now();
                    this.resolve = resolve;
                    this.scrolling = true;
                    if (cancelOnUserScroll) {
                        this.addEventListeners();
                    }
                }
                else {
                    this.scrollContainer.scrollTo(...this.scrollTo);
                    resolve();
                }
            }
        });
    }
    get scrolling() {
        return this._scrolling;
    }
    set scrolling(scrolling) {
        this._scrolling = scrolling;
        win.autoScrolling = scrolling;
    }
    setScrollPosition() {
        if (this.scrollContainer instanceof Window) {
            this.scrollX = win.pageXOffset;
            this.scrollY = win.pageYOffset;
        }
        else {
            this.scrollX = this.scrollContainer.scrollLeft;
            this.scrollY = this.scrollContainer.scrollTop;
        }
    }
    addEventListeners() {
        USER_SCROLL_EVENTS.forEach(event => {
            this.scrollContainer.addEventListener(event, this.cancelScroll.bind(this));
        });
    }
    removeEventListeners() {
        USER_SCROLL_EVENTS.forEach(event => {
            this.scrollContainer.removeEventListener(event, this.cancelScroll.bind(this));
        });
    }
    cancelScroll() {
        this.scrolling = false;
        this.removeEventListeners();
    }
    tick() {
        this.setScrollPosition();
        if (this.scrolling) {
            this.scroll();
        }
    }
    scroll() {
        const elapsed = Date.now() - this.timestamp;
        let x;
        let y;
        if (elapsed < this.duration) {
            x = this.calculateNextPosition(0, elapsed);
            y = this.calculateNextPosition(1, elapsed);
        }
        else {
            this.scrolling = false;
            x = this.scrollTo[0];
            y = this.scrollTo[1];
            this.removeEventListeners();
            this.resolve();
        }
        if (this.scrollContainer instanceof Window) {
            this.scrollContainer.scrollTo(x, y);
        }
        else {
            this.scrollContainer.scrollLeft = x;
            this.scrollContainer.scrollTop = y;
        }
    }
    calculateNextPosition(index, elapsed) {
        const from = this.scrollFrom[index];
        const to = this.scrollTo[index];
        if (from > to) {
            return from - this.easing(elapsed, 0, from - to, this.duration);
        }
        else {
            return from + this.easing(elapsed, 0, to - from, this.duration);
        }
    }
}
const scrollableAreas = [];
export function ScrollTo(target, options) {
    return new Promise(resolve => {
        const scrollContainer = options ? options.scrollContainer || window : window;
        let scrollableArea = scrollableAreas.find(a => a.element === scrollContainer);
        if (!scrollableArea) {
            scrollableArea = {
                element: scrollContainer,
                class: new ScrollableArea(scrollContainer),
            };
            scrollableAreas.push(scrollableArea);
        }
        scrollableArea.class.ScrollToTarget(target, options).then(resolve);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0b3IuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL3V0aWxzL2FuaW1hdGlvbi9hbmltYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEtBQUssT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQztBQUNuQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBaUMzQixNQUFNLENBQU4sSUFBWSxNQStCWDtBQS9CRCxXQUFZLE1BQU07SUFDZCxtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix5Q0FBK0IsQ0FBQTtJQUMvQixxQ0FBMkIsQ0FBQTtJQUMzQix1Q0FBNkIsQ0FBQTtJQUM3QiwyQ0FBaUMsQ0FBQTtJQUNqQyxxQ0FBMkIsQ0FBQTtJQUMzQix1Q0FBNkIsQ0FBQTtJQUM3QiwyQ0FBaUMsQ0FBQTtJQUNqQyxxQ0FBMkIsQ0FBQTtJQUMzQix1Q0FBNkIsQ0FBQTtJQUM3QiwyQ0FBaUMsQ0FBQTtJQUNqQyxtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix5Q0FBK0IsQ0FBQTtJQUMvQixtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix5Q0FBK0IsQ0FBQTtJQUMvQixtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix5Q0FBK0IsQ0FBQTtJQUMvQix5Q0FBK0IsQ0FBQTtJQUMvQiwyQ0FBaUMsQ0FBQTtJQUNqQywrQ0FBcUMsQ0FBQTtJQUNyQyxtQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBMkIsQ0FBQTtJQUMzQix5Q0FBK0IsQ0FBQTtJ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