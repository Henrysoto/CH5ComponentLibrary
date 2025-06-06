import isNil from 'lodash/isNil';
export class Ch5ButtonPressInfo {
    constructor() {
        this._threshold = 15;
        this._startX = 0;
        this._startY = 0;
        this._endX = 0;
        this._endY = 0;
    }
    valid() {
        const diffBetweenPoints = this.calculatePointDiff();
        return diffBetweenPoints < this._threshold;
    }
    saveStart(x, y) {
        this.startX = x;
        this.startY = y;
    }
    saveEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
    set startX(x) {
        if (isNil(x)) {
            return;
        }
        this._startX = x;
    }
    get startX() {
        return this._startX;
    }
    set startY(y) {
        if (isNil(y)) {
            return;
        }
        this._startY = y;
    }
    get startY() {
        return this._startY;
    }
    set endX(x) {
        if (isNil(x)) {
            return;
        }
        this._endX = x;
    }
    get endX() {
        return this._endX;
    }
    set endY(y) {
        if (isNil(y)) {
            return;
        }
        this._endY = y;
    }
    get endY() {
        return this._endY;
    }
    calculatePointDiff() {
        const diff = Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
        return diff;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1wcmVzc2luZm8uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uL2NoNS1idXR0b24tcHJlc3NpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUVqQyxNQUFNLE9BQU8sa0JBQWtCO0lBQS9CO1FBRWtCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFakMsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFXLENBQUMsQ0FBQztJQTBGM0IsQ0FBQztJQW5GTyxLQUFLO1FBQ1gsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNwRCxPQUFPLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDNUMsQ0FBQztJQVFNLFNBQVMsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBUU0sT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBVyxNQUFNLENBQUMsQ0FBUztRQUMxQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxDQUFTO1FBQzFCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsT0FBTztTQUNQO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLENBQVM7UUFDeEIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxDQUFTO1FBQ3hCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsT0FBTztTQUNQO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBT08sa0JBQWtCO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUMzRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QifQ==