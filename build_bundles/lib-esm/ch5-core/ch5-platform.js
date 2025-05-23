import { isNil } from "lodash";
import { Ch5SignalFactory } from "./ch5-signal-factory";
export class Ch5Platform {
    constructor(ch5SignalFactory) {
        this._ch5PlatformInfoSignal = ch5SignalFactory.getObjectSignal(Ch5Platform.CSIG_PLATFORM_INFO, true);
        this._ch5PlatformInfo = {
            capabilities: {
                supportsTouchActivity: true,
                supportCredentialIntercept: {
                    http: '',
                    https: '',
                }
            },
            version: '',
            name: '',
        };
        this._updateCallbacks = new Array();
    }
    static getInstance(ch5SignalFactory) {
        if (isNil(this._instance)) {
            if (isNil(ch5SignalFactory)) {
                ch5SignalFactory = Ch5SignalFactory.getInstance();
            }
            this._instance = new Ch5Platform(ch5SignalFactory);
        }
        return this._instance;
    }
    init() {
        if (isNil(this._ch5PlatformInfoSignal)) {
            return;
        }
        this._ch5PlatformInfoSignal.subscribe((platformInfo) => {
            if (isNil(platformInfo) || Object.keys(platformInfo).length === 0) {
                return;
            }
            if (!Object.isFrozen(this._ch5PlatformInfo)) {
                const ch5PlatformInfo = platformInfo;
                this._ch5PlatformInfo = Object.freeze(ch5PlatformInfo);
            }
            this._updateCallbacks.forEach(callback => {
                callback(this._ch5PlatformInfo);
            });
        });
    }
    registerUpdateCallback(callback) {
        callback(this._ch5PlatformInfo);
        this._updateCallbacks.push(callback);
    }
    getPlatformInfo() {
        return this._ch5PlatformInfo;
    }
}
Ch5Platform.CSIG_PLATFORM_INFO = "Csig.Platform_Info";
Ch5Platform.getInstance().init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXBsYXRmb3JtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LXBsYXRmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFTeEQsTUFBTSxPQUFPLFdBQVc7SUFxQnRCLFlBQW9CLGdCQUFrQztRQUNwRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdEIsWUFBWSxFQUFFO2dCQUNaLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLDBCQUEwQixFQUFFO29CQUMxQixJQUFJLEVBQUUsRUFBRTtvQkFDUixLQUFLLEVBQUUsRUFBRTtpQkFDVjthQUNGO1lBQ0QsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtTQUNXLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksS0FBSyxFQUE4QixDQUFDO0lBQ2xFLENBQUM7SUFTTSxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFtQztRQUMzRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekIsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDM0IsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkQ7WUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUtNLElBQUk7UUFDVCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBb0IsRUFBRSxFQUFFO1lBRTdELElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDakUsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQzNDO2dCQUNFLE1BQU0sZUFBZSxHQUFHLFlBQWdDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBT00sc0JBQXNCLENBQUMsUUFBb0M7UUFDaEUsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9NLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQzs7QUFoR3VCLDhCQUFrQixHQUFXLG9CQUFvQixDQUFDO0FBbUc1RSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMifQ==