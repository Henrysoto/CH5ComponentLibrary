import { BehaviorSubject } from 'rxjs';
import { Ch5TranslationUtility } from './ch5-translation-utility';
export class Ch5SignalBehaviorSubject extends BehaviorSubject {
    constructor(value, prevValue) {
        super(value);
        this._prevValue = prevValue;
    }
    get prevValue() {
        return this.getPrevValue();
    }
    getPrevValue() {
        return this._prevValue;
    }
    next(value) {
        this._prevValue = this.value;
        if (typeof value === 'string') {
            let newValue = value;
            if (Ch5TranslationUtility.getInstance().isTranslationIdentifier(value)) {
                newValue = Ch5TranslationUtility.getInstance().translatedValue(value);
            }
            super.next(newValue);
        }
        else {
            super.next(value);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1iZWhhdmlvci1zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LXNpZ25hbC1iZWhhdmlvci1zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPbEUsTUFBTSxPQUFPLHdCQUE0QyxTQUFRLGVBQWtCO0lBRy9FLFlBQW1CLEtBQU8sRUFBRSxTQUFZO1FBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLFlBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxJQUFJLENBQUMsS0FBUTtRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsSUFBSyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFFNUIsSUFBSSxRQUFRLEdBQU0sS0FBSyxDQUFDO1lBRXhCLElBQUkscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BFLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFNLENBQUM7YUFDOUU7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBRSxDQUFDO1NBQzFCO2FBQU07WUFDSCxLQUFLLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztDQUNKIn0=