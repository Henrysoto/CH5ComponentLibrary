import { Ch5Animation } from "./ch5-animation";
import _ from 'lodash';
import { Ch5List } from "../ch5-list";
export class Ch5StandardAnimation extends Ch5Animation {
    constructor(duration, easeMode, wrapper) {
        super(duration, easeMode, wrapper);
        this.animationTimeWatcher = 0;
    }
    animate(element, currentPosition, mode) {
        this.handleTransition(element);
        if (mode === Ch5List.ORIENTATION[1]) {
            element.style.transform = `translate3d(${currentPosition}px, 0, 0)`;
        }
        else {
            element.style.transform = `translate3d(0, ${currentPosition}px, 0)`;
        }
    }
    handleTransition(element) {
        if (_.isEmpty(element.style.transition) || _.isNil(element.style.transition)) {
            element.style.transition = `transform ${this.duration}ms ${this.easeMode}`;
        }
        if (element.style.transitionDuration === '0ms' || _.isEmpty(element.style.transitionDuration)) {
            element.style.transitionDuration = `${this.duration}ms`;
        }
        else if (parseFloat(element.style.transitionDuration) !== this.duration) {
            element.style.transitionDuration = `${this.duration}ms`;
        }
        clearTimeout(this.animationTimeWatcher);
        this.animationTimeWatcher = window.setTimeout(() => {
            element.style.transitionDuration = '0ms';
        }, this.duration);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXN0YW5kYXJkLWFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1saXN0L2FuaW1hdGlvbi9jaDUtc3RhbmRhcmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUlsRCxZQUFZLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxPQUFvQjtRQUNoRSxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUg3Qix5QkFBb0IsR0FBVyxDQUFDLENBQUM7SUFJM0MsQ0FBQztJQUVNLE9BQU8sQ0FDVixPQUFvQixFQUNwQixlQUF1QixFQUN2QixJQUFnQztRQUVoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0IsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLGVBQWUsV0FBVyxDQUFDO1NBQ3ZFO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsZUFBZSxRQUFRLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRVMsZ0JBQWdCLENBQUMsT0FBb0I7UUFFM0MsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGFBQWEsSUFBSSxDQUFDLFFBQVEsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDN0U7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUM7U0FDM0Q7YUFBTSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUE0QixDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqRixPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDO1NBQzNEO1FBRUQsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUM3QyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXJCLENBQUM7Q0FDSiJ9