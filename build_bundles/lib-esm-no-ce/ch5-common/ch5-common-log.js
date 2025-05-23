import { Ch5Debug } from "../ch5-core";
export class Ch5CommonLog {
    constructor(isDebugEnabled, isTraceEnabled = false, crId = "", componentId = "") {
        this.isDebugEnabled = isDebugEnabled;
        this.isTraceEnabled = isTraceEnabled;
        this.crId = crId;
        this.componentId = componentId;
    }
    start(message, componentName = "") {
        if (this.isTraceEnabled === true) {
            let ts = '';
            if (Ch5Debug.CONSOLE_OVERRIDDEN === false) {
                ts = (new Date()).toISOString();
            }
            console.group((componentName !== "" ? componentName + " " : "") + ts + ": " + this.componentId + ": " + this.crId + ": " + message);
        }
        else if (this.isDebugEnabled === true) {
            this.info(message, componentName);
        }
    }
    log(...message) {
        if (this.isTraceEnabled === true) {
            console.log(...message);
        }
        else {
            if (this.isDebugEnabled === true) {
                let ts = '';
                if (Ch5Debug.CONSOLE_OVERRIDDEN === false) {
                    ts = (new Date()).toISOString();
                }
                try {
                    let callerName = String(new Error().stack).trim();
                    if (callerName !== null) {
                        if (callerName) {
                            callerName = callerName.replace(/^Error\s+/, '');
                        }
                        if (callerName) {
                            callerName = callerName.split("\n")[1];
                        }
                        if (callerName) {
                            callerName = callerName.replace(/^\s+at Object./, '');
                        }
                        if (callerName) {
                            callerName = callerName.replace(/^\s+at HTMLElement./, '');
                        }
                        if (callerName) {
                            callerName = callerName.replace(/^\s+at /, '');
                        }
                        if (callerName) {
                            callerName = callerName.replace(/ \(.+\)$/, '');
                        }
                        if (callerName) {
                            callerName = callerName.replace(/\@.+/, '');
                        }
                        if (callerName && callerName !== "") {
                            callerName = "Method is " + callerName + ":";
                        }
                    }
                    console.log(ts + ':' + this.crId + ':' + this.componentId + ':' + callerName + ':', message);
                }
                catch (e) {
                    console.log(ts + ':' + this.crId + ':', message);
                }
            }
        }
    }
    info(message, ...optionalParams) {
        if (true === this.isDebugEnabled) {
            let ts = '';
            if (Ch5Debug.CONSOLE_OVERRIDDEN === false) {
                ts = (new Date()).toISOString();
            }
            try {
                let callerName = String(new Error().stack).trim();
                if (callerName !== null) {
                    if (callerName) {
                        callerName = callerName.replace(/^Error\s+/, '');
                    }
                    if (callerName) {
                        callerName = callerName.split("\n")[1];
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at Object./, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at HTMLElement./, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at /, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/ \(.+\)$/, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/\@.+/, '');
                    }
                    if (callerName && callerName !== "") {
                        callerName = "Method is " + callerName + ":";
                    }
                }
                console.info(ts + ':' + this.crId + ':' + callerName + message + ':' + optionalParams);
            }
            catch (e) {
                console.info(ts + ':' + this.crId + ':' + message + ':' + optionalParams);
            }
        }
    }
    error(message, ...optionalParams) {
        if (true === this.isDebugEnabled) {
            let ts = '';
            if (Ch5Debug.CONSOLE_OVERRIDDEN === false) {
                ts = (new Date()).toISOString();
            }
            try {
                let callerName = String(new Error().stack).trim();
                if (callerName !== null) {
                    if (callerName) {
                        callerName = callerName.replace(/^Error\s+/, '');
                    }
                    if (callerName) {
                        callerName = callerName.split("\n")[1];
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at Object./, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at HTMLElement./, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/^\s+at /, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/ \(.+\)$/, '');
                    }
                    if (callerName) {
                        callerName = callerName.replace(/\@.+/, '');
                    }
                    if (callerName && callerName !== "") {
                        callerName = "Method is " + callerName + ":";
                    }
                }
                console.error(ts + ':' + this.crId + ':' + callerName + message + ':' + optionalParams);
            }
            catch (e) {
                console.error(ts + ':' + this.crId + ':' + message + ':' + optionalParams);
            }
        }
    }
    stop() {
        if (this.isTraceEnabled === true) {
            console.groupEnd();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbW1vbi1sb2cuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1jb21tb24tbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxPQUFPLFlBQVk7SUFFdkIsWUFBbUIsY0FBdUIsRUFBUyxpQkFBMEIsS0FBSyxFQUFTLE9BQWUsRUFBRSxFQUFTLGNBQW9CLEVBQUU7UUFBeEgsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVc7SUFBSSxDQUFDO0lBRXpJLEtBQUssQ0FBQyxPQUFlLEVBQUUsZ0JBQXdCLEVBQUU7UUFFdEQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLEVBQUUsR0FBVyxFQUFFLENBQUM7WUFDcEIsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEtBQUssS0FBSyxFQUFFO2dCQUN6QyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDakM7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNySTthQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDbkM7SUFDSCxD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