import { LogLevelEnum } from '../ch5-logger/enums/index';
export class Ch5Debug {
    static shouldDisplay(key) {
        return (Ch5Debug._config.hasOwnProperty(key) && true === Ch5Debug._config[key]);
    }
    static info(key, message, ...optionalParams) {
        if (Ch5Debug.shouldDisplay(key)) {
            console.log(key + ':' + message, optionalParams);
        }
    }
    static loadConfig(config) {
        Ch5Debug._config = config;
    }
    static setConfigKeyValue(key, value) {
        Ch5Debug._config[key] = value;
    }
    static getConfig() {
        return Ch5Debug._config;
    }
    static getConfigKeyValue(key) {
        return Ch5Debug._config[key];
    }
    static enableAll() {
        for (const prop in Ch5Debug._config) {
            if (Ch5Debug._config.hasOwnProperty(prop)) {
                Ch5Debug._config[prop] = true;
            }
        }
    }
    static disableAll() {
        for (const prop in Ch5Debug._config) {
            if (Ch5Debug._config.hasOwnProperty(prop)) {
                Ch5Debug._config[prop] = false;
            }
        }
    }
}
Ch5Debug.DEBUG_MESSAGE_FILTER_SOURCE_KEY = 'Logger.messagesFilter.source';
Ch5Debug.DEBUG_MESSAGE_FILTER_LEVEL_KEY = 'Logger.messagesFilter.defaultLevel';
Ch5Debug.CONSOLE_OVERRIDDEN = false;
Ch5Debug._defaultConfig = {
    'Ch5SignalBridge.constructor': false,
    'Ch5SignalBridge.subscribe': false,
    'Ch5SignalBridge.unsubscribe': false,
    'Ch5SignalBridge.publish': false,
    'Ch5SignalBridge.sendBooleanToNative': false,
    'Ch5SignalBridge.sendIntegerToNative': false,
    'Ch5SignalBridge.sendStringToNative': false,
    'Ch5SignalBridge.sendObjectToNative': false,
    'bridgeReceiveIntegerFromNative': false,
    'bridgeReceiveBooleanFromNative': false,
    'bridgeReceiveStringFromNative': false,
    'bridgeReceiveObjectFromNative': false,
    'bridge.rcbTimerCallback': false,
    'bridge.clearTimersForSignal': false,
    'bridge.rcbIntervalTimerCallback': false,
    'Ch5Resync': false,
    'Logger.messagesFilter.defaultLevel': LogLevelEnum.warning
};
Ch5Debug._config = Ch5Debug._defaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWRlYnVnLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LWRlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQU12RCxNQUFNLE9BQU8sUUFBUTtJQXFDVixNQUFNLENBQUMsYUFBYSxDQUFDLEdBQVU7UUFDbEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBVSxFQUFFLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBRWxFLElBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUc5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQU1NLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBc0I7UUFDM0MsUUFBUSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUtNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFVLEVBQUUsS0FBcUM7UUFDN0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTO1FBQ25CLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVU7UUFDdEMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxNQUFNLENBQUMsU0FBUztRQUNuQixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDakM7U0FDSjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVTtRQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDbEM7U0FDSjtJQUNMLENBQUM7O0FBbEZhLHdDQUErQixHQUFXLDhCQUE4QixDQUFDO0FBS3pFLHVDQUE4QixHQUFXLG9DQUFvQyxDQUFDO0FBRTlFLDJCQUFrQixHQUFZLEtBQUssQ0FBQztBQUVqQyx1QkFBYyxHQUFvQjtJQUMvQyw2QkFBNkIsRUFBQyxLQUFLO0lBQ25DLDJCQUEyQixFQUFDLEtBQUs7SUFDakMsNkJBQTZCLEVBQUMsS0FBSztJQUNuQyx5QkFBeUIsRUFBQyxLQUFLO0lBQy9CLHFDQUFxQyxFQUFDLEtBQUs7SUFDM0MscUNBQXFDLEVBQUMsS0FBSztJQUMzQyxvQ0FBb0MsRUFBQyxLQUFLO0lBQzFDLG9DQUFvQyxFQUFDLEtBQUs7SUFDMUMsZ0NBQWdDLEVBQUMsS0FBSztJQUN0QyxnQ0FBZ0MsRUFBQyxLQUFLO0lBQ3RDLCtCQUErQixFQUFDLEtBQUs7SUFDckMsK0JBQStCLEVBQUMsS0FBSztJQUNyQyx5QkFBeUIsRUFBQyxLQUFLO0lBQy9CLDZCQUE2QixFQUFDLEtBQUs7SUFDbkMsaUNBQWlDLEVBQUMsS0FBSztJQUN2QyxXQUFXLEVBQUUsS0FBSztJQUNsQixvQ0FBb0MsRUFBRSxZQUFZLENBQUMsT0FBTztDQUM3RCxDQUFDO0FBRWUsZ0JBQU8sR0FBbUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyJ9