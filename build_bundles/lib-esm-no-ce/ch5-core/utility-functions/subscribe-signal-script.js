import { subscribeState } from "./subscribe-signal";
import { getState } from "./get-signal";
import { unsubscribeState } from "./unsubscribe-signal";
import { Ch5Signal } from "../ch5-signal";
export const subscribeStateScriptSigSubs = {};
let subSigScriptIndex = 0;
export function generateSubSigScriptKey() {
    return 'ch5SubSigScript-' + (++subSigScriptIndex);
}
export function unsubscribeStateScript(subKey) {
    if (!subscribeStateScriptSigSubs.hasOwnProperty(subKey)) {
        return;
    }
    subscribeStateScriptSigSubs[subKey].forEach((item) => {
        unsubscribeState(item.sigType, item.sigName, item.sigSub);
    });
}
export function subscribeStateScript(signalScript, callback, defaultValue) {
    const signalTokens = new Set();
    if (typeof defaultValue === "undefined"
        || null === defaultValue) {
        defaultValue = "undefined";
    }
    signalScript.replace(/{{([bns]\.([A-Za-z]|[0-9])([A-Za-z0-9_.])*)}}/g, (substring, ...args) => {
        if (typeof args[0] === "undefined") {
            return '';
        }
        signalTokens.add(args[0]);
        return '';
    });
    let sigName = '';
    let sigType = '';
    const sigTokensIterator = signalTokens.values();
    let item = sigTokensIterator.next();
    const subKeys = [];
    while (typeof item.value !== "undefined") {
        sigType = item.value.split('.')[0];
        const joinsList = (item.value.split('.')).slice(1);
        sigName = joinsList.join(".");
        sigName = Ch5Signal.getSubscriptionSignalName(sigName);
        const subCallback = () => {
            const processedTempl = _callbackForSignalScriptOnSignalUpdate(signalTokens, signalScript, defaultValue);
            if (typeof callback === 'function') {
                callback.bind(null, processedTempl)();
            }
        };
        const subId = subscribeState(sigType, sigName, subCallback);
        const sigNameTypeSub = {
            'sigName': sigName,
            'sigType': sigType,
            'sigSub': subId
        };
        subKeys.push(sigNameTypeSub);
        item = sigTokensIterator.next();
    }
    const sigSubScriptKey = generateSubSigScriptKey();
    subscribeStateScriptSigSubs[sigSubScriptKey] = subKeys;
    const pTpl = _callbackForSignalScriptOnSignalUpdate(signalTokens, signalScript, defaultValue);
    if (typeof callback === 'function') {
        callback.bind(null, pTpl)();
    }
    return sigSubScriptKey;
}
function _callbackForSignalScriptOnSignalUpdate(signalTokens, scriptTemplate, defaultValue) {
    let processedTemplate = scriptTemplate;
    const sigTokensIterator = signalTokens.values();
    let item = sigTokensIterator.next();
    let sigName = '';
    let sigType = '';
    while (typeof item.value !== "undefined") {
        sigType = item.value.split('.')[0];
        const joinsList = (item.value.split('.')).slice(1);
        sigName = joinsList.join(".");
        const sigVal = getState(sigType, sigName);
        if (sigVal === null) {
            processedTemplate = defaultValue;
            break;
        }
        else {
            processedTemplate = processedTemplate.replace(new RegExp('\\{\\{' + item.value + '\\}\\}', 'g'), sigVal);
        }
        item = sigTokensIterator.next();
    }
    if (defaultValue !== processedTemplate) {
        processedTemplate = (new Function("return " + processedTemplate))();
    }
    return processedTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLXNpZ25hbC1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS91dGlsaXR5LWZ1bmN0aW9ucy9zdWJzY3JpYmUtc2lnbmFsLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTFDLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUVwQyxFQUFFLENBQUM7QUFFUCxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUMxQixNQUFNLFVBQVUsdUJBQXVCO0lBQ25DLE9BQU8sa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDdEQsQ0FBQztBQVFELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxNQUFjO0lBQ2pELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckQsT0FBTztLQUNWO0lBQ0QsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBcUIsRUFBRSxFQUFFO1FBQ2xFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBV0QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQW9CLEVBQ3JELFFBQWdDLEVBQ2hDLFlBQXFCO0lBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7SUFFdkMsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXO1dB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