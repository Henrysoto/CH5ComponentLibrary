import { ICh5CommonAttributes } from "../../ch5-common/interfaces";
import { TCh5KeypadShape, TCh5KeypadSize, TCh5KeypadStretch, TCh5KeypadTextOrientation, TCh5KeypadType } from "./t-ch5-keypad";
export interface ICh5KeypadAttributes extends ICh5CommonAttributes {
    contractName: string;
    type: TCh5KeypadType;
    shape: TCh5KeypadShape;
    stretch: TCh5KeypadStretch | null;
    textOrientation: TCh5KeypadTextOrientation;
    size: TCh5KeypadSize;
    useContractForEnable: boolean;
    useContractForShow: boolean;
    useContractForCustomClass: boolean;
    useContractForCustomStyle: boolean;
    useContractForExtraButtonShow: boolean;
    showExtraButton: boolean;
    receiveStateExtraButtonShow: string;
    sendEventOnClickStart: string;
    hidePoundButton: boolean;
    hideAsteriskButton: boolean;
    receiveStateHideAsteriskButton: string;
    useContractForHideAsteriskButton: boolean;
    receiveStateHidePoundButton: string;
    useContractForHidePoundButton: boolean;
    displayLabelMajorOnly: boolean;
}
