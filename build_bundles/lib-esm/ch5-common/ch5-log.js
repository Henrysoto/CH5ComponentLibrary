import { Ch5Uid } from '../ch5-core';
import { Ch5CommonLog } from './ch5-common-log';
export class Ch5Log extends HTMLElement {
    constructor() {
        super();
        this._id = '';
        this._crId = '';
        this._crId = Ch5Uid.getUid();
        this.logger = new Ch5CommonLog(false, false, this._crId);
    }
    static get observedAttributes() {
        return [
            'debug',
            'trace'
        ];
    }
    getCrId() {
        return this._crId;
    }
    info(message, ...optionalParams) {
        this.logger.info(message, optionalParams);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('ch5-common attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
        switch (attr) {
            case 'debug':
                if (this.hasAttribute('debug') && this.toBoolean(this.getAttribute('debug'), true) === true) {
                    this.logger.isDebugEnabled = true;
                }
                else {
                    this.logger.isDebugEnabled = false;
                }
                break;
            case 'trace':
                if (this.hasAttribute('trace') && this.toBoolean(this.getAttribute('trace'), true) === true) {
                    this.logger.isTraceEnabled = true;
                }
                else {
                    this.logger.isTraceEnabled = false;
                }
                break;
            default:
                break;
        }
    }
    initAttributes() {
        if (this.hasAttribute('debug') && this.toBoolean(this.getAttribute('debug'), true) === true) {
            this.logger.isDebugEnabled = true;
        }
        else {
            this.logger.isDebugEnabled = false;
        }
        if (this.hasAttribute('trace') && this.toBoolean(this.getAttribute('trace'), true) === true) {
            this.logger.isTraceEnabled = true;
        }
        else {
            this.logger.isTraceEnabled = false;
        }
    }
    toBoolean(val, isEmptyValueEqualToTrue = false) {
        const str = String(val).toLowerCase().trim();
        switch (str) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
                return false;
            case "":
            case null:
            case undefined:
            case "null":
            case "undefined":
                if (isEmptyValueEqualToTrue === true) {
                    return true;
                }
                else {
                    return false;
                }
            default:
                return false;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxvZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vY2g1LWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxNQUFNLE9BQU8sTUFBTyxTQUFRLFdBQVc7SUFvQnRDO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFkQyxRQUFHLEdBQVcsRUFBRSxDQUFDO1FBS2pCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFVNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBU00sTUFBTSxLQUFLLGtCQUFrQjtRQUNuQyxPQUFPO1lBQ04sT0FBTztZQUNQLE9BQU87U0FDUCxDQUFBO0lBQ0YsQ0FBQztJQUtNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQU9NLElBQUksQ0FBQyxPQUFhLEVBQUUsR0FBRyxjQUFxQjtRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLHdCQUF3QixDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLFFBQWdCO1FBQy9FLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUMxQixPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkcsUUFBUSxJQUFJLEVBQUU7WUFDYixLQUFLLE9BQU87Z0JBQ1gsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDbEM7cUJBQU07b0JBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2lCQUNuQztnQkFDRCxNQUFNO1lBQ1AsS0FBSyxPQUFPO2dCQUNYLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM1RixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQ2xDO3FCQUFNO29CQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztpQkFDbkM7Z0JBQ0QsTUFBTTtZQUNQO2dCQUNDLE1BQU07U0FDUDtJQUNGLENBQUM7SUFLUyxjQUFjO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUNsQzthQUFNO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO2FBQU07WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDbkM7SUFDRixDQUFDO0lBU1MsU0FBUyxDQUFDLEdBQVEsRUFBRSx1QkFBdUIsR0FBRyxLQUFLO1FBQzVELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxRQUFRLEdBQUcsRUFBRTtZQUNaLEtBQUssTUFBTSxDQUFDO1lBQUMsS0FBSyxLQUFLLENBQUM7WUFBQyxLQUFLLEdBQUc7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDO1lBQ2IsS0FBSyxPQUFPLENBQUM7WUFBQyxLQUFLLElBQUksQ0FBQztZQUFDLEtBQUssR0FBRztnQkFDaEMsT0FBTyxLQUFLLENBQUM7WUFDZCxLQUFLLEVBQUUsQ0FBQztZQUFDLEtBQUssSUFBSSxDQUFDO1lBQUMsS0FBSyxTQUFTLENBQUM7WUFBQyxLQUFLLE1BQU0sQ0FBQztZQUFDLEtBQUssV0FBVztnQkFDaEUsSUFBSSx1QkFBdUIsS0FBSyxJQUFJLEVBQUU7b0JBQ3JDLE9BQU8sSUFBSSxDQUFDO2lCQUNaO3FCQUFNO29CQUNOLE9BQU8sS0FBSyxDQUFDO2lCQUNiO1lBQ0Y7Z0JBQ0MsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNGLENBQUM7Q0FJRCJ9