import { NumericFormat } from "./numeric-format";
import _ from "lodash";
export class FloatFormat extends NumericFormat {
    format(value, { decimalLength, length }) {
        if (isNaN(value)) {
            return "0".padStart(length - decimalLength, "0") + "." + "0".padEnd(decimalLength, "0");
        }
        let sign = (!_.isNil(value) && String(value) !== "" && !isNaN(value)) ? ((value < 0) ? "-" : "") : "";
        if (value > FloatFormat.HALF_MAX_ANALOG) {
            sign = "-";
            value = value > FloatFormat.MAX_ANALOG ? FloatFormat.MAX_ANALOG : value;
            value -= FloatFormat.MAX_ANALOG + 1;
        }
        else if (value < FloatFormat.HALF_MIN_ANALOG) {
            sign = "";
            value = value > FloatFormat.MIN_ANALOG ? value : FloatFormat.MIN_ANALOG;
            value += FloatFormat.MAX_ANALOG + 1;
        }
        value = Math.abs(value);
        const formattedText = (value / Math.pow(10, decimalLength)).toFixed(decimalLength);
        return sign + formattedText.padStart(length + 1, "0");
    }
}
FloatFormat.MAX_ANALOG = 65535;
FloatFormat.HALF_MAX_ANALOG = 32767;
FloatFormat.MIN_ANALOG = -65535;
FloatFormat.HALF_MIN_ANALOG = -32768;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWpvaW50b3RleHQtbnVtZXJpYy9mb3JtYXQvZmxvYXQtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFNdkIsTUFBTSxPQUFPLFdBQVksU0FBUSxhQUFhO0lBT25DLE1BQU0sQ0FBQyxLQUFhLEVBQUUsRUFBQyxhQUFhLEVBQUUsTUFBTSxFQUFxQjtRQUNwRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQztZQUNiLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxFQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQTtTQUN4RjtRQUVELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RHLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxlQUFlLEVBQUU7WUFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNYLEtBQUssR0FBRyxLQUFLLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3hFLEtBQUssSUFBSSxXQUFXLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QzthQUFNLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxlQUFlLEVBQUM7WUFDM0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLEtBQUssR0FBRyxLQUFLLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQ3hFLEtBQUssSUFBSSxXQUFXLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QztRQUNELEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sYUFBYSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xGLE9BQU8sSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDOztBQXZCYSxzQkFBVSxHQUFXLEtBQUssQ0FBQztBQUMzQiwyQkFBZSxHQUFXLEtBQUssQ0FBQztBQUNoQyxzQkFBVSxHQUFXLENBQUMsS0FBSyxDQUFDO0FBQzVCLDJCQUFlLEdBQVcsQ0FBQyxLQUFLLENBQUMifQ==