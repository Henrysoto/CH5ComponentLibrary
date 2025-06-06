export default class Ch5ColorUtils {
    static getDigitalValue: (analog: number, maxValue: number) => number;
    static getAnalogValue: (digital: number, maxValue: number) => number;
    static rgbFormat: (color: string) => string[];
    static rgbToHex(red: number, green: number, blue: number): string;
    static checkHex(hex: string): boolean;
    static checkRgb(rgb: string): boolean;
    static modifyHex(hex: string): string;
    static hexToRgb(hex: string): string;
    static validateColorName(color: string): boolean;
    static convert(color: string): string;
    static col2rgb(color: string): string[];
    static col2hex(color: string): string;
    static rgbToObj(rgb: string): any;
}
