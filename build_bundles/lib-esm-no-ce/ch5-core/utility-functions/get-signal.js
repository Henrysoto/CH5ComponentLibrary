import { Ch5SignalFactory } from "../ch5-signal-factory";
import { Ch5Signal } from "../ch5-signal";
export function getState(signalType, signalName, defaultValue) {
    let sigVal = null;
    switch (signalType.toLowerCase()) {
        case 'b':
        case 'boolean':
            if (typeof defaultValue !== 'undefined') {
                sigVal = getBooleanSignalValue(signalName, defaultValue);
            }
            else {
                sigVal = getBooleanSignalValue(signalName);
            }
            break;
        case 'n':
        case 'number':
        case 'numeric':
            if (typeof defaultValue !== 'undefined') {
                sigVal = getNumericSignalValue(signalName, defaultValue);
            }
            else {
                sigVal = getNumericSignalValue(signalName);
            }
            break;
        case 's':
        case 'string':
            if (typeof defaultValue !== 'undefined') {
                sigVal = getStringSignalValue(signalName, defaultValue);
            }
            else {
                sigVal = getStringSignalValue(signalName);
            }
            break;
        case 'o':
        case 'object':
            if (typeof defaultValue !== 'undefined') {
                sigVal = getObjectSignalValue(signalName, defaultValue);
            }
            else {
                sigVal = getObjectSignalValue(signalName);
            }
            break;
    }
    return sigVal;
}
export function getBooleanSignalValue(signalName, defaultValue) {
    const csf = Ch5SignalFactory.getInstance();
    let retVal = null;
    if (typeof defaultValue !== "undefined"
        && null !== defaultValue) {
        retVal = defaultValue;
    }
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    const booleanSig = csf.getBooleanSignal(signalName, false);
    if (null !== booleanSig && booleanSig.hasChangedSinceInit()) {
        retVal = booleanSig.value;
    }
    return retVal;
}
export function getNumericSignalValue(signalName, defaultValue) {
    const csf = Ch5SignalFactory.getInstance();
    let retVal = null;
    if (typeof defaultValue !== "undefined"
        && null !== defaultValue) {
        retVal = defaultValue;
    }
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    const numberSig = csf.getNumberSignal(signalName, false);
    if (null !== numberSig && numberSig.hasChangedSinceInit()) {
        retVal = numberSig.value;
    }
    return retVal;
}
export function getStringSignalValue(signalName, defaultValue) {
    const csf = Ch5SignalFactory.getInstance();
    let retVal = null;
    if (typeof defaultValue !== "undefined"
        && null !== defaultValue) {
        retVal = defaultValue;
    }
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    const stringSig = csf.getStringSignal(signalName, false);
    if (null !== stringSig && stringSig.hasChangedSinceInit()) {
        retVal = stringSig.value;
    }
    return retVal;
}
export function getObjectSignalValue(signalName, defaultValue) {
    const csf = Ch5SignalFactory.getInstance();
    let retVal = null;
    if (typeof defaultValue !== "undefined"
        && null !== defaultValue) {
        retVal = defaultValue;
    }
    signalName = Ch5Signal.getSubscriptionSignalName(signalName);
    const objSig = csf.getObjectSignal(signalName, false);
    if (null !== objSig && objSig.hasChangedSinceInit()) {
        retVal = objSig.value;
    }
    return retVal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNpZ25hbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL2dldC1zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUt4QyxNQUFNLFVBQVUsUUFBUSxDQUFDLFVBQXFDLEVBQUUsVUFBaUIsRUFBRSxZQUEwQjtJQUl6RyxJQUFJLE1BQU0sR0FBcUIsSUFBSSxDQUFDO0lBRXBDLFFBQVEsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzlCLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxTQUFTO1lBQ1YsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7Z0JBQ3JDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsWUFBdUIsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM5QztZQUNELE1BQU07UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ1YsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7Z0JBQ3JDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsWUFBc0IsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM5QztZQUNELE1BQU07UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUTtZQUNULElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxFQUFFO2dCQUNyQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFlBQXNCLENBQUMsQ0FBQzthQUNyRTtpQkFBTTtnQkFDSCxN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