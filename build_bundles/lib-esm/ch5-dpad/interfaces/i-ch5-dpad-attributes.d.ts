import { ICh5CommonAttributes } from "../../ch5-common/interfaces/i-ch5-common-attributes";
import { TCh5DpadShape, TCh5DpadSize, TCh5DpadStretch, TCh5DpadType } from "./t-ch5-dpad";
export interface ICh5DpadAttributes extends ICh5CommonAttributes {
    contractName: string;
    type: TCh5DpadType;
    shape: TCh5DpadShape;
    stretch: TCh5DpadStretch | null;
    size: TCh5DpadSize;
    useContractForEnable: boolean;
    useContractForShow: boolean;
    useContractForCustomClass: boolean;
    useContractForCustomStyle: boolean;
    sendEventOnClickStart: string;
    hideCenterButton: boolean;
    receiveStateHideCenterButton: string;
    disableCenterButton: boolean;
    receiveStateDisableCenterButton: string;
    useContractForDisableCenterButton: boolean;
    useContractForHideCenterButton: boolean;
}
