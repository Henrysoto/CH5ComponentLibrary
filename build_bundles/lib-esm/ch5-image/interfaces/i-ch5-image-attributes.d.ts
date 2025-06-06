import { ICh5CommonAttributes } from "../../ch5-common/interfaces/";
export interface ICh5ImageAttributes extends ICh5CommonAttributes {
    alt: string;
    height: string;
    width: string;
    refreshRate: number;
    url: string;
    mode: number | undefined;
    password: string;
    dir: string;
    user: string;
    receiveStateUrl: string;
    receiveStateMode: string;
    sendEventOnTouch: string;
    sendEventOnClick: string;
    sendEventOnError: string;
    allowValuesOnMove: boolean;
    allowPositionDataToBeSent: boolean;
    receiveStateAllowValuesOnMove: string;
    receiveStateAllowPositionDataToBeSent: string;
    sendEventXPosition: string;
    sendEventYPosition: string;
}
