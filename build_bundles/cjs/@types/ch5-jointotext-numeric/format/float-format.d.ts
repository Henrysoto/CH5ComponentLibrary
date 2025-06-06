import { NumericFormat } from "./numeric-format";
export type FloatFormatOptions = {
    decimalLength: number;
    length: number;
};
export declare class FloatFormat extends NumericFormat {
    static MAX_ANALOG: number;
    static HALF_MAX_ANALOG: number;
    static MIN_ANALOG: number;
    static HALF_MIN_ANALOG: number;
    format(value: number, { decimalLength, length }: FloatFormatOptions): string;
}
