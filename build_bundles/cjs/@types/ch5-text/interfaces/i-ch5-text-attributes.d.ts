import { ICh5CommonAttributesText } from "../../ch5-common/interfaces/i-ch5-common-attributes-text";
import { TCh5TextHorizontalAlignment, TCh5TextVerticalAlignment } from './t-ch5-text';
export interface ICh5TextAttributes extends ICh5CommonAttributesText {
    horizontalAlignment: TCh5TextHorizontalAlignment;
    verticalAlignment: TCh5TextVerticalAlignment;
    multilineSupport: boolean;
    truncateText: boolean;
    label: string;
    receiveStateLabel: string;
    labelInnerHtml: string;
    receiveStateScriptLabelHtml: string;
}
