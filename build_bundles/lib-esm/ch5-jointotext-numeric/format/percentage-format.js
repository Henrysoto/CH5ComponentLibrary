import { NumericFormat } from "./numeric-format";
import { isNaN } from 'lodash';
export class PercentageFormat extends NumericFormat {
    format(value, options) {
        const { min, max, length, decimalLength } = options;
        if (isNaN(value) || max < min) {
            return "".padStart(length, "0") + "." + "".padEnd(decimalLength, "0");
        }
        let maxValue = max;
        const decimalPointIndex = length - decimalLength;
        if (decimalPointIndex > 0) {
            maxValue = max;
        }
        else {
            maxValue = max;
        }
        if (maxValue === 0 || isNaN(maxValue)) {
            maxValue = max;
        }
        if (value > maxValue) {
            value = maxValue;
        }
        if (min === value && max === value) {
            return "100".padStart(length, "0") + "." + "".padEnd(decimalLength, "0");
        }
        const roundedPercent = (((value - min) * 100.0 + Number.EPSILON) / (max - min)).toFixed(decimalLength);
        if (decimalLength === 0) {
            return roundedPercent.padStart(length, "0");
        }
        else {
            return roundedPercent.padStart(length + decimalLength + 1, "0");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudGFnZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtam9pbnRvdGV4dC1udW1lcmljL2Zvcm1hdC9wZXJjZW50YWdlLWZvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQVMvQixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsYUFBYTtJQUV4QyxNQUFNLENBQUMsS0FBYSxFQUFFLE9BQWdDO1FBQ3pELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDcEQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUMzQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RTtRQUVELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNuQixNQUFNLGlCQUFpQixHQUFHLE1BQU0sR0FBRyxhQUFhLENBQUM7UUFJakQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7WUFFdkIsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNsQjthQUFNO1lBQ0gsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNsQjtRQUNELElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkMsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxHQUFHLFFBQVEsRUFBRTtZQUNsQixLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDaEMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUU7UUFNRCxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RyxJQUFJLGFBQWEsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0gsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztDQUVKIn0=