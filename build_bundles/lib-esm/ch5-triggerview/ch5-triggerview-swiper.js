export class Ch5TriggerViewSwiper {
    get activeView() {
        return this._activeView;
    }
    set activeView(input) {
        this._activeView = input;
    }
    constructor(id) {
        this.slides = [];
        this._activeView = 0;
    }
    incrementActiveView(endless) {
        if (endless === true) {
            if (this._activeView !== this.slides.length - 1) {
                this._activeView += 1;
            }
            else {
                this._activeView = 0;
            }
        }
        else {
            if (this._activeView !== this.slides.length - 1) {
                this._activeView += 1;
            }
        }
    }
    decrementActiveView(endless) {
        if (endless === true) {
            if (this._activeView !== 0) {
                this._activeView -= 1;
            }
            else {
                this._activeView = this.slides.length - 1;
            }
        }
        else {
            if (this._activeView !== 0) {
                this._activeView -= 1;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyaWdnZXJ2aWV3LXN3aXBlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS10cmlnZ2Vydmlldy9jaDUtdHJpZ2dlcnZpZXctc3dpcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsS0FBYTtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBR0QsWUFBWSxFQUFVO1FBWmYsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFFMUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7SUFZaEMsQ0FBQztJQUNNLG1CQUFtQixDQUFDLE9BQWdCO1FBQ3pDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUN0QjtTQUNGO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztJQUVNLG1CQUFtQixDQUFDLE9BQWdCO1FBQ3pDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUMzQztTQUNGO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztDQUVGIn0=