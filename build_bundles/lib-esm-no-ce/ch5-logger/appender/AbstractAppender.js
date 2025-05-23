import { timer, BehaviorSubject } from 'rxjs';
import isNil from 'lodash/isNil';
export class AbstractAppender {
    constructor(sendLogTimeOffsetInMiliseconds) {
        this._sendLogTimeOffset = {};
        this.isInitialized = false;
        this.isInitializedSubject = new BehaviorSubject(this.isInitialized);
        this.sendLogTimeOffset = timer(sendLogTimeOffsetInMiliseconds);
    }
    set sendLogTimeOffset(sendLogTimeOffset) {
        if (isNil(sendLogTimeOffset)) {
            return;
        }
        this._sendLogTimeOffset = sendLogTimeOffset;
    }
    get sendLogTimeOffset() {
        return this._sendLogTimeOffset;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RBcHBlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1sb2dnZXIvYXBwZW5kZXIvQWJzdHJhY3RBcHBlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQWMsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFakMsTUFBTSxPQUFnQixnQkFBZ0I7SUFNcEMsWUFBbUIsOEJBQXNDO1FBSmpELHVCQUFrQixHQUF1QixFQUF3QixDQUFDO1FBQ25FLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHlCQUFvQixHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHOUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFXLGlCQUFpQixDQUFDLGlCQUFxQztRQUNoRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBVyxpQkFBaUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztDQU9GIn0=