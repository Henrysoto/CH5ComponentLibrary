import _ from 'lodash';
import { Ch5Animation } from "./ch5-animation";
import { Ch5List } from "../ch5-list";
export class Ch5WebAnimation extends Ch5Animation {
    constructor() {
        super(...arguments);
        this._animation = {};
    }
    animate(element, currentPosition, mode, previousPosition, callback) {
        let keyframes = [
            { transform: `translate3d(0, ${previousPosition}px, 0)` },
            { transform: `translate3d(0, ${currentPosition}px, 0)` }
        ];
        if (mode === Ch5List.ORIENTATION[1]) {
            keyframes = [
                { transform: `translate3d(${previousPosition}px, 0, 0)` },
                { transform: `translate3d(${currentPosition}px, 0, 0)` }
            ];
        }
        const animation = element.animate(keyframes, {
            duration: this.duration,
            fill: 'forwards',
            easing: this.easeMode
        });
        if (!_.isNil(callback)) {
            animation.onfinish = () => {
                this.resetAnimation();
                callback();
            };
        }
        this._animation = animation;
    }
    resetAnimation() {
        this._animation = {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXdlYi1hbmltYXRpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbGlzdC9hbmltYXRpb24vY2g1LXdlYi1hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFFbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVd0QyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxZQUFZO0lBQWpEOztRQUVZLGVBQVUsR0FBYyxFQUFlLENBQUM7SUF5Q3BELENBQUM7SUF2Q1UsT0FBTyxDQUNWLE9BQW9CLEVBQ3BCLGVBQXVCLEVBQ3ZCLElBQWdDLEVBQ2hDLGdCQUF5QixFQUN6QixRQUE2QjtRQUc3QixJQUFJLFNBQVMsR0FBRztZQUNaLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixnQkFBZ0IsUUFBUSxFQUFFO1lBQ3pELEVBQUUsU0FBUyxFQUFFLGtCQUFrQixlQUFlLFFBQVEsRUFBRTtTQUMzRCxDQUFDO1FBRUYsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxTQUFTLEdBQUc7Z0JBQ1IsRUFBRSxTQUFTLEVBQUUsZUFBZSxnQkFBZ0IsV0FBVyxFQUFFO2dCQUN6RCxFQUFFLFNBQVMsRUFBRSxlQUFlLGVBQWUsV0FBVyxFQUFFO2FBQzNELENBQUE7U0FDSjtRQUVELE1BQU0sU0FBUyxHQUFJLE9BQStCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNsRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sY0FBYztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQWUsQ0FBQztJQUN0QyxDQUFDO0NBQ0oifQ==