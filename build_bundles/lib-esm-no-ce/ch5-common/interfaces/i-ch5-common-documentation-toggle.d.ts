import { ICh5CommonForClass } from "./common/i-ch5-common-class";
import { ICh5CommonForDebug } from "./common/i-ch5-common-debug";
import { ICh5CommonForDisabled } from "./common/i-ch5-common-disabled";
import { ICh5CommonForRole } from "./common/i-ch5-common-role";
import { ICh5CommonForStyle } from "./common/i-ch5-common-style";
import { ICh5CommonAttributesToggle } from "./i-ch5-common-attributes-toggle";
export interface ICh5CommonToggle extends ICh5CommonForDisabled, ICh5CommonForDebug, ICh5CommonForRole, ICh5CommonForStyle, ICh5CommonForClass, ICh5CommonAttributesToggle {
}
