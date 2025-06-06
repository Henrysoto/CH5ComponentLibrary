import { ICh5AttributesDateTime } from "../../ch5-common/interfaces/i-ch5-common-attributes-datetime";
import { TCh5DateTimeStyleForDate, TCh5DateTimeHorizontalAlignment, TCh5DateTimeDisplayType } from "./t-ch5-datetime";
export interface ICh5DateTimeAttributes extends ICh5AttributesDateTime {
    display24HourFormat: boolean;
    displayAmPm: boolean;
    displayTwoDigitsHour: boolean;
    displaySeconds: boolean;
    styleForDate: TCh5DateTimeStyleForDate;
    horizontalAlignment: TCh5DateTimeHorizontalAlignment;
    displayType: TCh5DateTimeDisplayType;
    timeOffsetHours: number;
    receiveStateOffsetTime: string;
    receiveStateDisplay24HourFormat: string;
    receiveStateDisplayAmPm: string;
    receiveStateDisplaySeconds: string;
    receiveStateDisplayTwoDigitsHour: string;
    receiveStateStyleForDate: string;
    receiveStateDisplayType: string;
}
