import _ from "lodash";
import { Ch5Property } from "./ch5-property";
import { Ch5SignalFactory } from "./ch5-signal-factory";
import { Ch5Signal } from "./ch5-signal";
export class Ch5Properties {
    constructor(ch5Component, propertiesArray) {
        this.ch5Component = ch5Component;
        this.propertiesArray = propertiesArray;
        this._properties = [];
        for (let i = 0; i < propertiesArray.length; i++) {
            const newProperty = new Ch5Property(ch5Component, propertiesArray[i]);
            this._properties.push(newProperty);
        }
    }
    addProperty(propertiesObject) {
        const newProperty = new Ch5Property(this.ch5Component, propertiesObject);
        this._properties.push(newProperty);
    }
    unsubscribe() {
        const csf = Ch5SignalFactory.getInstance();
        for (const eachSignal of this._properties) {
            if (eachSignal.signalState !== '' && eachSignal.signalValue !== '') {
                const receiveValueSigName = Ch5Signal.getSubscriptionSignalName(eachSignal.signalValue);
                if (eachSignal.signalType === "string") {
                    const receiveSignal = csf.getStringSignal(receiveValueSigName);
                    if (null !== receiveSignal) {
                        receiveSignal.unsubscribe(eachSignal.signalState);
                        eachSignal.signalValue = "";
                        eachSignal.signalState = "";
                    }
                }
                else if (eachSignal.signalType === "number") {
                    const receiveSignal = csf.getNumberSignal(receiveValueSigName);
                    if (null !== receiveSignal) {
                        receiveSignal.unsubscribe(eachSignal.signalState);
                        eachSignal.signalValue = "";
                        eachSignal.signalState = "";
                    }
                }
                else if (eachSignal.signalType === "boolean") {
                    const receiveSignal = csf.getBooleanSignal(receiveValueSigName);
                    if (null !== receiveSignal) {
                        receiveSignal.unsubscribe(eachSignal.signalState);
                        eachSignal.signalValue = "";
                        eachSignal.signalState = "";
                    }
                }
            }
            eachSignal.clearProperty();
        }
    }
    getPrevious(propertyName) {
        var _a;
        return (_a = this.getPropertyByName(propertyName)) === null || _a === void 0 ? void 0 : _a.previousValue;
    }
    get(propertyName) {
        var _a;
        return (_a = this.getPropertyByName(propertyName)) === null || _a === void 0 ? void 0 : _a.value;
    }
    set(propertyName, value, callback, signalCallback) {
        const selectedProperty = this.getPropertyByName(propertyName);
        if (selectedProperty) {
            if ((_.isNil(selectedProperty.property.nameForSignal) || selectedProperty.property.nameForSignal === "")) {
                selectedProperty.setValue(value, callback, signalCallback);
            }
            else {
                if (this.isAttributeAvailableInComponent(selectedProperty.property.nameForSignal) === false) {
                    selectedProperty.setValue(value, callback, signalCallback);
                }
            }
        }
    }
    setForSignalResponse(propertyName, value, callback, signalCallback) {
        const selectedProperty = this.getPropertyByName(propertyName);
        if (selectedProperty) {
            selectedProperty.setValueFromSignal(value, callback, signalCallback);
        }
    }
    isAttributeAvailableInComponent(selectedPropertyName) {
        var _a;
        return this.ch5Component.hasAttribute(selectedPropertyName) && ((_a = this.ch5Component.getAttribute(selectedPropertyName)) === null || _a === void 0 ? void 0 : _a.trim()) !== "";
    }
    getPropertyByName(propertyName) {
        const propertyObject = this._properties.find((componentProperty) => { return componentProperty.name === propertyName; });
        if (propertyObject) {
            return propertyObject;
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtcHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBd0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBTXpDLE1BQU0sT0FBTyxhQUFhO0lBSXpCLFlBQW1CLFlBQStDLEVBQVMsZUFBdUM7UUFBL0YsaUJBQVksR0FBWixZQUFZLENBQW1DO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBRjFHLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUd2QyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7SUFDRixDQUFDO0lBRU0sV0FBVyxDQUFDLGdCQUFzQztRQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLFdBQVc7UUFDakIsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFM0MsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxF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