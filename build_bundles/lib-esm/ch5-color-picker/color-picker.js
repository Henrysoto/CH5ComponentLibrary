import * as mycolorpicker from "@raghavendradabbir/mycolorpicker";
import { Subject } from "rxjs";
import Ch5ColorUtils from "../ch5-common/utils/ch5-color-utils";
export class ColorPicker {
    constructor(pickerId, newColor) {
        this.pickerId = pickerId;
        this.joe = null;
        this.colorChanged = new Subject();
        try {
            this.joe = mycolorpicker.hsl(this.pickerId, newColor, []).on('change', (c) => {
                var _a;
                const thisColorDiv = document.getElementById(this.pickerId);
                if (thisColorDiv) {
                    const queryObj = thisColorDiv.querySelectorAll('.oned')[0].querySelectorAll('.shape')[0];
                    queryObj.style.backgroundColor = "#d8d8d8";
                    queryObj.style.borderColor = "#696969";
                    const extrasObject = thisColorDiv.querySelectorAll('.extras')[0];
                    extrasObject.style.display = "none";
                }
                const colorObj = Ch5ColorUtils.rgbToObj(c.css());
                (_a = this.colorChanged) === null || _a === void 0 ? void 0 : _a.next([colorObj.red, colorObj.green, colorObj.blue]);
            }).update();
        }
        catch (e) {
        }
    }
    invertHex(hex) {
        var _a;
        return '#' + ((_a = hex.match(/[a-f0-9]{2}/ig)) === null || _a === void 0 ? void 0 : _a.map(e => (255 - parseInt(e, 16) || 0).toString(16).replace(/^([a-f0-9])$/, '0$1')).join(''));
    }
    setColor(newColor) {
        try {
            this.joe.set(newColor);
        }
        catch (e) {
        }
    }
    get picker() {
        return this.joe;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvbG9yLXBpY2tlci9jb2xvci1waWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLGFBQWEsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sYUFBYSxNQUFNLHFDQUFxQyxDQUFDO0FBRWhFLE1BQU0sT0FBTyxXQUFXO0lBU3RCLFlBQW1CLFFBQWdCLEVBQUUsUUFBZ0I7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQVAzQixRQUFHLEdBQVEsSUFBSSxDQUFDO1FBUXRCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVksQ0FBQztRQUM1QyxJQUFJO1lBR0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQ3JELENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7O2dCQUV6QixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBYyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBYyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkgsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO29CQUMzQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBYyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2lCQUNyQztnQkFDRCxNQUFNLFFBQVEsR0FBUSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUtiO1FBQUMsT0FBTyxDQUFDLEVBQUU7U0FFWDtJQUNILENBQUM7SUFFTyxTQUFTLENBQUMsR0FBVzs7UUFDM0IsT0FBTyxHQUFHLElBQUcsTUFBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQywwQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO0lBQ3ZJLENBQUM7SUFFTSxRQUFRLENBQUMsUUFBZ0I7UUFDOUIsSUFBSTtZQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxDQUFDLEVBQUU7U0FFWDtJQUNILENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUVGIn0=