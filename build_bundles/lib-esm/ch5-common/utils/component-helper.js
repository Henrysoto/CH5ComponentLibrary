import { Ch5Signal } from "../../ch5-core";
export class ComponentHelper {
    constructor() {
    }
    static getInstance() {
        if (!ComponentHelper.instance) {
            ComponentHelper.instance = new ComponentHelper();
        }
        return ComponentHelper.instance;
    }
    static getAttributeAsString(thisRef, keyToCheck, defaultValue = '') {
        let retVal = defaultValue;
        keyToCheck = keyToCheck.toLowerCase();
        if (!!thisRef && thisRef.hasAttribute([keyToCheck])) {
            retVal = thisRef.getAttribute([keyToCheck]);
        }
        return retVal;
    }
    static getAttributeAsBool(thisRef, keyToCheck, defaultValue) {
        let retVal = defaultValue;
        keyToCheck = keyToCheck.toLowerCase();
        if (thisRef.hasAttribute([keyToCheck])) {
            retVal = (thisRef.getAttribute([keyToCheck]) === 'true' ||
                thisRef.getAttribute([keyToCheck]) === true);
        }
        return retVal;
    }
    static clearComponentContent(thisRef) {
        const containers = thisRef.getElementsByClassName(thisRef.primaryCssClass);
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    static isNullOrUndefined(input) {
        return (typeof (input) === 'undefined' || input === null);
    }
    static setAttributeToElement(thisRef, attr, defaultValue) {
        attr = attr.toLowerCase();
        let val = (defaultValue === null) ? '' : defaultValue;
        if (!thisRef.hasAttribute(attr) && val.length > 0) {
            thisRef.setAttribute(attr, val);
        }
        else if (thisRef.hasAttribute(attr)) {
            val = thisRef.getAttribute(attr);
        }
        return val;
    }
    static getBoolFromString(str) {
        return (!ComponentHelper.isNullOrUndefined(str) && (str === 'true'));
    }
    static clearSignalValue(csf, obj, receiveAttribute, signalReceiveAttribute) {
        if (obj[receiveAttribute] !== '' && obj[signalReceiveAttribute] !== '') {
            const receiveValueSigName = Ch5Signal.getSubscriptionSignalName(obj[signalReceiveAttribute]);
            const sigLabel = csf.getStringSignal(receiveValueSigName);
            if (null !== sigLabel) {
                sigLabel.unsubscribe(obj[receiveAttribute]);
                obj[signalReceiveAttribute] = '';
            }
        }
    }
    static setAttributesBasedValue(hasAttribute, valToAssign, defaultValue) {
        if (hasAttribute) {
            return valToAssign;
        }
        else {
            return defaultValue;
        }
    }
    static setAttributeValueOnControl(thisRef, attrKey, value, validValues, callback) {
        const pvtAttrKey = '_' + attrKey;
        if (value !== thisRef[pvtAttrKey]) {
            if (validValues.indexOf(value) >= 0) {
                thisRef[pvtAttrKey] = value;
            }
            else {
                thisRef[pvtAttrKey] = validValues[0];
            }
            if (thisRef[pvtAttrKey] !== null) {
                thisRef.setAttribute(attrKey, thisRef[pvtAttrKey]);
            }
            if (callback !== null) {
                callback();
            }
        }
    }
    static setAttributeValueOnControlAsBool(thisRef, attrKey, value, defaultValue, callback) {
        const pvtAttrKey = '_' + attrKey;
        if (value !== thisRef[pvtAttrKey]) {
            if (typeof (value) === 'boolean') {
                thisRef[pvtAttrKey] = value;
            }
            else {
                thisRef[pvtAttrKey] = defaultValue;
            }
            if (thisRef[pvtAttrKey] !== null) {
                thisRef.setAttribute(attrKey, thisRef[pvtAttrKey].toString());
            }
            if (callback !== null) {
                callback();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vdXRpbHMvY29tcG9uZW50LWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBRTdELE1BQU0sT0FBTyxlQUFlO0lBR3hCO0lBRUEsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQzNCLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUNwRDtRQUNELE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBU00sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQVksRUFBRSxVQUFrQixFQUFFLGVBQXVCLEVBQUU7UUFDMUYsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBQzFCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQVcsQ0FBQztTQUN6RDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFTTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBWSxFQUFFLFVBQWtCLEVBQUUsWUFBcUI7UUFDcEYsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBQzFCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUNwQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMs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