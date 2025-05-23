var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uriSchemaValidation } from "../utility/uriSchemaValidation";
import Axios from "axios";
export class RequestService {
    constructor(uri) {
        this._uri = '';
        this._requestAPI = {};
        this.uri = uri;
        this._requestAPI = Axios;
    }
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._requestAPI.post(`${this._uri}/${endpoint}`, JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json;charset=utf8'
                }
            });
            return response.status === 200;
        });
    }
    get(endpoint) {
        try {
            const response = this._requestAPI.get(`${this._uri}/${endpoint}`);
            return response;
        }
        catch (e) {
            return false;
        }
    }
    set uri(uri) {
        if (uriSchemaValidation(uri)) {
            this._uri = uri;
        }
        else {
            throw new Error('Invalid URI schema');
        }
    }
    get uri() {
        return this._uri;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbG9nZ2VyL3NlcnZpY2VzL1JlcXVlc3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sS0FBcUMsTUFBTSxPQUFPLENBQUM7QUFHMUQsTUFBTSxPQUFPLGNBQWM7SUFLdkIsWUFBWSxHQUFXO1FBSGYsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFnQixFQUFpQixDQUFDO1FBR2pELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVZLElBQUksQ0FBQyxRQUFnQixFQUFFLElBQWdCOztZQUNoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3RixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLCtCQUErQjtpQkFDbEQ7YUFDRixDQUFDLENBQUM7WUFFSCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVNLEdBQUcsQ0FBQyxRQUFnQjtRQUN6QixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbEUsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFHSCxDQUFDO0lBRUQsSUFBVyxHQUFHLENBQUMsR0FBVztRQUN0QixJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ25CO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSiJ9