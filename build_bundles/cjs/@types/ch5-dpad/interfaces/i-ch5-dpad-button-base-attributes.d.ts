import { ICh5CommonAttributesDpadChild } from "../../ch5-common/interfaces/i-ch5-common-attributes-dpad-child";
import { TCh5DpadChildButtonType } from "./t-ch5-dpad";
export interface ICh5DpadButtonBaseAttributes extends ICh5CommonAttributesDpadChild {
    iconClass: string;
    iconUrl: string;
    label: string;
    key: TCh5DpadChildButtonType;
    pressed: boolean;
}
