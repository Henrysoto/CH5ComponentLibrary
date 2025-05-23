import { ICh5CommonForClass } from "./common/i-ch5-common-class";
import { ICh5CommonForDebug } from "./common/i-ch5-common-debug";
import { ICh5CommonForRole } from "./common/i-ch5-common-role";
import { ICh5CommonForStyle } from "./common/i-ch5-common-style";
import { ICh5AttributesDateTime } from "./i-ch5-common-attributes-datetime";
export interface ICh5CommonDateTime extends ICh5CommonForDebug, ICh5CommonForRole, ICh5CommonForStyle, ICh5CommonForClass, ICh5AttributesDateTime {
}
