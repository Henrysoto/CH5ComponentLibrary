export class JSInterface {
    static bridgeSendBooleanToNative(signalName, value) {
        if (JSInterface.debug) {
            console.log('JSInterface send event to native -> ', ' type:', ' boolean   ', 'event name: ', signalName, ' value: ', value);
        }
    }
    ;
    static bridgeSendIntegerToNative(signalName, value) {
        if (JSInterface.debug) {
            console.log('JSInterface send event to native -> ', ' type:', ' integer   ', 'event name: ', signalName, ' value: ', value);
        }
    }
    ;
    static bridgeSendStringToNative(signalName, value) {
        if (JSInterface.debug) {
            console.log('JSInterface send event to native -> ', ' type:', ' string   ', 'event name: ', signalName, ' value: ', value);
        }
    }
    ;
    static bridgeSendObjectToNative(signalName, object) {
        if (JSInterface.debug) {
            console.log('JSInterface send event to native -> ', ' type:', ' object   ', 'event name: ', signalName, ' value: ', object);
        }
    }
    ;
    static bridgeSendArrayToNative(jsonEncodedArray) {
        if (JSInterface.debug) {
            console.log('JSInterface send array to native -> ', jsonEncodedArray);
        }
    }
    ;
    static bridgeSubscribeBooleanSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface subscribe:', ' state name:', signalName, ' type ', 'boolean');
        }
    }
    static bridgeSubscribeIntegerSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface subscribe:', ' state name:', signalName, ' type ', 'integer');
        }
    }
    static bridgeSubscribeStringSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface subscribe:', ' state name:', signalName, ' type ', 'string');
        }
    }
    static bridgeSubscribeObjectSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface subscribe:', ' state name:', signalName, ' type ', 'object');
        }
    }
    static bridgeUnsubscribeBooleanSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface unsubscribe:', ' state name:', signalName, ' type ', 'boolean');
        }
    }
    static bridgeUnsubscribeIntegerSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface unsubscribe:', ' state name:', signalName, ' type ', 'integer');
        }
    }
    static bridgeUnsubscribeStringSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface unsubscribe:', ' state name:', signalName, ' type ', 'string');
        }
    }
    static bridgeUnsubscribeObjectSignalFromNative(signalName) {
        if (JSInterface.debug) {
            console.log('JSInterface unsubscribe:', ' state name:', signalName, ' type ', 'object');
        }
    }
}
JSInterface.debug = false;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtaW50ZXJmYWNlLW1vY2suanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtZW11bGF0b3IvanMtaW50ZXJmYWNlLW1vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsTUFBTSxPQUFPLFdBQVc7SUFHYixNQUFNLENBQUMseUJBQXlCLENBQUMsVUFBa0IsRUFBRSxLQUFjO1FBQ3RFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUg7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVLLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxVQUFpQixFQUFFLEtBQVk7UUFDbkUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvSDtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUssTUFBTSxDQUFDLHdCQUF3QixDQUFDLFVBQWtCLEVBQUUsS0FBYTtRQUNwRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlIO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFFSyxNQUFNLENBQUMsd0JBQXdCLENBQUMsVUFBa0IsRUFBRSxNQUFjO1FBQ3JFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsY0FB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