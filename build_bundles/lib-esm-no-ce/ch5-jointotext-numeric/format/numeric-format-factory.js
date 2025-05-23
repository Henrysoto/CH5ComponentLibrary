import { FloatFormat } from "./float-format";
import { HexFormat } from "./hex-format";
import { PercentageFormat } from "./percentage-format";
import { RawFormat } from "./raw-format";
import { SignedFormat } from "./signed-format";
import { TimeFormat } from "./time-format";
import { UnsignedFormat } from "./unsigned-format";
export class NumericFormatFactory {
    constructor() { }
    static getInstance() {
        if (!(this.INSTANCE instanceof NumericFormatFactory)) {
            this.INSTANCE = new NumericFormatFactory();
        }
        return this.INSTANCE;
    }
    getFormat(type) {
        switch (type.trim().toLowerCase()) {
            case "float":
                return new FloatFormat();
            case "percentage":
                return new PercentageFormat();
            case "hex":
                return new HexFormat();
            case "raw":
                return new RawFormat();
            case "unsigned":
                return new UnsignedFormat();
            case "signed":
                return new SignedFormat();
            case "time":
                return new TimeFormat();
            default:
                return new SignedFormat();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1mb3JtYXQtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1qb2ludG90ZXh0LW51bWVyaWMvZm9ybWF0L251bWVyaWMtZm9ybWF0LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsTUFBTSxPQUFPLG9CQUFvQjtJQUloQyxnQkFBd0IsQ0FBQztJQUVsQixNQUFNLENBQUMsV0FBVztRQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLG9CQUFvQixDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7U0FDM0M7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFnQztRQUNoRCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsQyxLQUFLLE9BQU87Z0JBQ1gsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzFCLEtBQUssWUFBWTtnQkFDaEIsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDL0IsS0FBSyxLQUFLO2dCQUNULE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUN4QixLQUFLLEtBQUs7Z0JBQ1QsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ3hCLEtBQUssVUFBVTtnQkFDZCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7WUFDN0IsS0FBSyxRQUFRO2dCQUNaLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUMzQixLQUFLLE1BQU07Z0JBQ1YsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ3pCO2dCQUVDLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUMzQjtJQUNGLENBQUM7Q0FFRCJ9