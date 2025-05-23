import { ICh5CommonForClass } from "../../ch5-common/interfaces/common/i-ch5-common-class";
import { ICh5CommonForDebug } from "../../ch5-common/interfaces/common/i-ch5-common-debug";
import { ICh5CommonForRole } from "../../ch5-common/interfaces/common/i-ch5-common-role";
import { ICh5CommonForStyle } from "../../ch5-common/interfaces/common/i-ch5-common-style";
import { ICh5QrCodeAttributes } from "./i-ch5-qrcode-attributes";
export interface ICh5QrCodeDocumentation extends ICh5CommonForDebug, ICh5CommonForRole, ICh5CommonForStyle, ICh5CommonForClass, ICh5QrCodeAttributes {
}
