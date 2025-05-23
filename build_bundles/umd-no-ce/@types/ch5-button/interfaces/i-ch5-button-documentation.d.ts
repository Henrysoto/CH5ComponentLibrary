import { ICh5ButtonAttributes } from ".";
import { ICh5Common } from "../../ch5-common/interfaces";
export interface ICh5ButtonDocumentation extends ICh5Common, ICh5ButtonAttributes {
    onpress: string;
    onrelease: string;
    customClassSelected: string | null;
}
