import _ from 'lodash';
export class Ch5Animation {
    constructor(duration, easeMode, wrapper) {
        this._duration = 0;
        this._defaultDuration = 0;
        this._easeMode = 'linear';
        this._wrapper = {};
        this.duration = duration;
        this.defaultDuration = duration;
        this.easeMode = easeMode;
        this.wrapper = wrapper;
    }
    set duration(duration) {
        if (_.isNil(duration)) {
            return;
        }
        this._duration = duration;
    }
    get duration() {
        return this._duration;
    }
    set defaultDuration(duration) {
        if (_.isNil(duration)) {
            return;
        }
        this._defaultDuration = duration;
    }
    get defaultDuration() {
        return this._defaultDuration;
    }
    set easeMode(easeMode) {
        if (_.isNil(easeMode)) {
            return;
        }
        this._easeMode = easeMode;
    }
    get easeMode() {
        return this._easeMode;
    }
    set wrapper(wrapper) {
        if (_.isNil(wrapper)) {
            return;
        }
        this._wrapper = wrapper;
    }
    get wrapper() {
        return this._wrapper;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1saXN0L2FuaW1hdGlvbi9jaDUtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUt2QixNQUFNLE9BQWdCLFlBQVk7SUFPOUIsWUFBWSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsT0FBb0I7UUFMNUQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IsY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUM3QixhQUFRLEdBQWdCLEVBQWlCLENBQUM7UUFHOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLFFBQWdCO1FBQ2hDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLGVBQWUsQ0FBQyxRQUFnQjtRQUN2QyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxlQUFlO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFXLFFBQVEsQ0FBQyxRQUFnQjtRQUNoQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsT0FBb0I7UUFDbkMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztDQWVKIn0=