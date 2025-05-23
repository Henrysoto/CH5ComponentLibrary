import { NumericFormat } from "./numeric-format";
export class RawFormat extends NumericFormat {
    format(value, options) {
        if (isNaN(value)) {
            return "0";
        }
        value = Math.abs(value);
        value = value > 65535 ? 65535 : value;
        return value.toString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3LWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1qb2ludG90ZXh0LW51bWVyaWMvZm9ybWF0L3Jhdy1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSWpELE1BQU0sT0FBTyxTQUFVLFNBQVEsYUFBYTtJQUdqQyxNQUFNLENBQUMsS0FBYSxFQUFFLE9BQXlCO1FBRWxELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ2IsT0FBTyxHQUFHLENBQUM7U0FDZjtRQUNELEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBRUoifQ==