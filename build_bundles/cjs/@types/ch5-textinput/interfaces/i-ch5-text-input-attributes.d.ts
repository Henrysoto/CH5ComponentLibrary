import { ICh5CommonInputAttributes } from "../../ch5-common-input/interfaces/i-ch5-common-input-attributes";
import { TCh5TextInputStretch, TCh5TextInputSize, TCh5TextInputType, TCh5TextInputTextTransform, TCh5TextInputIconPosition } from "./index";
export interface ICh5TextInputAttributes extends ICh5CommonInputAttributes {
    mask: string;
    iconClass: string;
    icon: string;
    label: string;
    placeholder: string;
    iconPosition: TCh5TextInputIconPosition;
    type: TCh5TextInputType;
    minLength: number;
    maxLength: number;
    minValue: number;
    maxValue: number;
    size: TCh5TextInputSize;
    stretch: TCh5TextInputStretch | null;
    textTransform: TCh5TextInputTextTransform;
    scaling: boolean;
    receiveStateFocus: string;
    receiveStateValue: string;
    sendEventOnChange: string;
    sendEventOnEnterKey: string;
    sendEventOnEscKey: string;
    sendEventOnFocus: string;
    sendEventOnBlur: string;
    minimumFontSize: number;
    tabIndex: number;
    value: string;
}
