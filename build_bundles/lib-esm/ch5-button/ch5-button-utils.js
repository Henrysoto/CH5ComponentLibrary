export class Ch5ButtonUtils {
    static getAttributeValue(thisClass, attributeName, value, defaultOutputValue) {
        if (thisClass.hasAttribute(attributeName.toString().toLowerCase())) {
            return value;
        }
        else {
            return defaultOutputValue;
        }
    }
    static getValidInputValue(masterData, value) {
        if (masterData.indexOf(value) >= 0) {
            return value;
        }
        else {
            return masterData[0];
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1idXR0b24vY2g1LWJ1dHRvbi11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQ0EsTUFBTSxPQUFPLGNBQWM7SUFFbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFJLFNBQXlELEVBQUUsYUFBcUIsRUFBRSxLQUFRLEVBQUUsa0JBQXFCO1FBQ25KLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtZQUNuRSxPQUFPLEtBQVUsQ0FBQztTQUNsQjthQUFNO1lBQ04sT0FBTyxrQkFBdUIsQ0FBQztTQUUvQjtJQUNGLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCLENBQUksVUFBZSxFQUFFLEtBQVE7UUFDNUQsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNiO2FBQU07WUFDTixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtJQUNGLENBQUM7Q0FFRCJ9