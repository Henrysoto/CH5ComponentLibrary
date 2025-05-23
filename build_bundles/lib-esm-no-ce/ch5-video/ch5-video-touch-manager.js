export class Ch5VideoTouchManager {
    constructor(params) {
        this._onTouchStart = this._onTouchStart.bind(this);
        document.addEventListener('touchstart', this._onTouchStart);
        this._onTouchMove = this._onTouchMove.bind(this);
        document.addEventListener('touchmove', this._onTouchMove);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        document.addEventListener('touchend', this._onTouchEnd);
        this._onTouchCancel = this._onTouchCancel.bind(this);
        document.addEventListener('touchcancel', this._onTouchCancel);
        this.customOnTouchHandlers = this.updateHandlersIfUnavailable(params);
    }
    updateHandlersIfUnavailable(params) {
        const retObj = {
            pollingDuration: this.checkAndReturnDefault(params.pollingDuration, 300),
            onTouchStartHandler: this.checkAndReturnDefault(params.onTouchStartHandler, () => { console.log('empty onTouchStartHandler'); }),
            onTouchMoveHandler: this.checkAndReturnDefault(params.onTouchMoveHandler, () => { console.log('empty onTouchMoveHandler'); }),
            onTouchEndHandler: this.checkAndReturnDefault(params.onTouchEndHandler, () => { console.log('empty onTouchEndHandler'); }),
            onTouchCancelHandler: this.checkAndReturnDefault(params.onTouchCancelHandler, () => { console.log('empty onTouchCancelHandler'); }),
            componentID: params.componentID
        };
        return retObj;
    }
    _onTouchStart(event) {
        this.customOnTouchHandlers.onTouchStartHandler();
    }
    _onTouchMove(event) {
        this.customOnTouchHandlers.onTouchMoveHandler();
    }
    _onTouchEnd(event) {
        this.customOnTouchHandlers.onTouchEndHandler();
    }
    _onTouchCancel(event) {
        this.customOnTouchHandlers.onTouchCancelHandler();
    }
    checkAndReturnDefault(item, defaultVal) {
        if (item !== null && typeof (item) !== 'undefined' && !!item) {
            return item;
        }
        else {
            return defaultVal;
        }
    }
    destructor() {
        document.removeEventListener('touchstart', this._onTouchStart);
        document.removeEventListener('touchmove', this._onTouchMove);
        document.removeEventListener('touchend', this._onTouchEnd);
        document.removeEventListener('touchcancel', this._onTouchCancel);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXRvdWNoLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdmlkZW8vY2g1LXZpZGVvLXRvdWNoLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsTUFBTSxPQUFPLG9CQUFvQjtJQUloQyxZQUFtQixNQUFnQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQU9PLDJCQUEyQixDQUFDLE1BQWdDO1FBQ25FLE1BQU0sTUFBTSxHQUE2QjtZQUN4QyxlQUFlLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDO1lBQ3hFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hJLGtCQUFrQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdILGlCQUFpQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFILG9CQUFvQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25JLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztTQUMvQixDQUFDO1FBRUYsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBT08sYUFBYSxDQUFDLEtBQVk7UUFFakMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDbEQsQ0FBQztJQU9PLFlBQVksQ0FBQyxLQUFZO1FBRWhDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFPTyxXQUFXLENBQUMsS0FBWTtRQUUvQixJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBT08sY0FBYyxDQUFDLEtBQVk7UUFFbEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQVFPLHFCQUFxQixDQUFDLElBQVMsRUFBRSxVQUFlO1FBQ3ZELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ04sT0FBTyxVQUFVLENBQUM7U0FDbEI7SUFDRixDQUFDO0lBS00sVUFBVTtRQUNoQixRQUFRLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBRUQifQ==