export function isCrestronTouchscreen() {
    if (window.navigator.userAgent.toLowerCase().includes("crestron")) {
        return true;
    }
    if (typeof (JSInterface) !== "undefined" && typeof (JSInterface.bridgeSendBooleanToNative) !== "undefined") {
        return true;
    }
    if (typeof (webkit) !== "undefined" && typeof (webkit.messageHandlers) !== "undefined"
        && typeof (webkit.messageHandlers.bridgeSendBooleanToNative) !== "undefined") {
        return true;
    }
    if (typeof (CommunicationInterface) !== "undefined" && typeof (CommunicationInterface.bridgeSendBooleanToNative) !== "undefined") {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY3Jlc3Ryb24tdG91Y2hzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS91dGlsaXR5LWZ1bmN0aW9ucy9pcy1jcmVzdHJvbi10b3VjaHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQkEsTUFBTSxVQUFVLHFCQUFxQjtJQUNqQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMvRCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBSSxPQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU0sQ0FBQyxXQUFXLENBQUMseUJBQXlCLENBQUMsS0FBSyxXQUFXLEVBQUU7UUFDdEcsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsSUFBSSxPQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLFdBQVc7V0FDN0UsT0FBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsS0FBSyxXQUFXLEVBQUU7UUFDN0UsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksT0FBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU0sQ0FBQyxzQkFBc0IsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLFdBQVcsRUFBRTtRQUM1SCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9