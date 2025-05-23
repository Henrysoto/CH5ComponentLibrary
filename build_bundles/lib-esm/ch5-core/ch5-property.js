import _ from "lodash";
import { Ch5Signal } from "./ch5-signal";
import { Ch5SignalFactory } from "./ch5-signal-factory";
;
export class Ch5Property {
    constructor(ch5Component, property) {
        this.ch5Component = ch5Component;
        this.property = property;
        this._attributeName = "";
        this._signalName = "";
        this._signalValue = "";
        this._signalState = "";
        this._propertyName = "";
        this._propertyPreviousValue = null;
        this._propertySignalValue = null;
        this.initializedValue = false;
        this._propertySignalType = "";
        this._attributeName = property.name.toLowerCase();
        this._propertyName = property.name;
        this._propertyPreviousValue = null;
        this._propertyValue = property.default;
        if (property.signalType) {
            this._propertySignalType = property.signalType;
        }
    }
    get signalType() {
        return this._propertySignalType;
    }
    get previousValue() {
        return this._propertyPreviousValue;
    }
    get value() {
        return this._propertyValue;
    }
    set value(value) {
        this.processValue(value, false);
    }
    get name() {
        return this._propertyName;
    }
    get attributeName() {
        return this._attributeName;
    }
    get signalName() {
        return this._signalName;
    }
    set signalName(value) {
        this._signalName = value;
    }
    get signalValue() {
        return this._signalValue;
    }
    set signalValue(value) {
        this._signalValue = value;
    }
    get signalState() {
        return this._signalState;
    }
    set signalState(value) {
        this._signalState = value;
    }
    setValue(value, callback, signalCallback) {
        this.processValue(value, false, callback, signalCallback);
    }
    setValueFromSignal(value, callback, signalCallback) {
        this.processValue(value, true, callback, signalCallback);
    }
    clearProperty() {
        this._signalName = "";
        this._signalValue = "";
        this._signalState = "";
        this._propertyPreviousValue = null;
        this._propertyValue = this.property.default;
        this._propertySignalValue = null;
        this.initializedValue = false;
    }
    processValue(value, setFromSignal, callback, signalCallback) {
        if (_.isNil(value) && this.property.isNullable && this.property.isNullable === true) {
            this._propertyPreviousValue = this._propertyValue;
            this._propertyValue = null;
            this.ch5Component.removeAttribute(this._attributeName);
            if (!_.isNil(callback)) {
                callback();
            }
            return true;
        }
        else {
            if (this.property.type === "boolean") {
                let valueToSet;
                if (typeof value === this.property.type) {
                    valueToSet = value;
                }
                else {
                    if (this.ch5Component.hasAttribute(this._attributeName)) {
                        let tempVal = value;
                        if ([true, false, "true", "false", "0", "1", 0, 1, '', null].indexOf(tempVal) < 0) {
                            tempVal = this.property.default;
                        }
                        valueToSet = this.toBoolean(tempVal, this.property.valueOnAttributeEmpty);
                    }
                    else {
                        valueToSet = this.property.default;
                    }
                }
                if (this._propertyValue !== valueToSet || setFromSignal === true || this.initializedValue === false || value !== valueToSet) {
                    this._propertyPreviousValue = this._propertyValue;
                    this._propertyValue = valueToSet;
                    this.initializedValue = true;
                    if (["true", "false", ''].indexOf(String(this.ch5Component.getAttribute(this._attributeName))) < 0) {
                        if (this.property.removeAttributeOnNull === true) {
                            if (!this.ch5Component.hasAttribute(this._attributeName)) {
                                if (setFromSignal === true) {
                                    this.ch5Component.setAttribute(this._attributeName, String(valueToSet));
                                }
                                else {
                                    this.ch5Component.removeAttribute(this._attributeName);
                                }
                            }
                            else {
                                this.ch5Component.setAttribute(this._attributeName, String(valueToSet));
                            }
                        }
                        else {
                            this.ch5Component.setAttribute(this._attributeName, String(valueToSet));
                        }
                    }
                    else {
                        this.ch5Component.setAttribute(this._attributeName, String(valueToSet));
                    }
                    if (!_.isNil(callback)) {
                        callback();
                    }
                    return true;
                }
            }
            else if (this.property.type === "enum") {
                if (this._propertyValue !== value) {
                    if (this.property.enumeratedValues && this.property.enumeratedValues.length > 0 && this.property.enumeratedValues.indexOf(value) >= 0) {
                        this._propertyPreviousValue = this._propertyValue;
                        this._propertyValue = String(value);
                        this.ch5Component.setAttribute(this._attributeName, String(value));
                    }
                    else {
                        if (!_.isNil(this.property.default)) {
                            this._propertyPreviousValue = this._propertyValue;
                            this._propertyValue = String(this.property.default);
                            this.ch5Component.setAttribute(this._attributeName, String(this.property.default));
                        }
                        else {
                            this.ch5Component.removeAttribute(this._attributeName);
                            this._propertyPreviousValue = this._propertyValue;
                            this._propertyValue = String(this.property.default);
                        }
                    }
                    if (!_.isNil(callback)) {
                        callback();
                    }
                    return true;
                }
            }
            else if (this.property.type === "number") {
                if (isNaN(value) || !Number.isInteger(parseInt(value, 10))) {
                    value = this.property.default;
                    this.ch5Component.setAttribute(this._attributeName, String(value));
                }
                value = Number(value);
                if (this._propertyValue !== value) {
                    if (this.property.numberProperties) {
                        if (value < this.property.numberProperties.min || value > this.property.numberProperties.max) {
                            if (value > this.property.numberProperties.conditionalMax) {
                                value = this.property.numberProperties.conditionalMaxValue;
                            }
                            else if (value < this.property.numberProperties.conditionalMin) {
                                value = this.property.numberProperties.conditionalMinValue;
                            }
                        }
                        this._propertyPreviousValue = this._propertyValue;
                        this._propertyValue = value;
                        this.ch5Component.setAttribute(this._attributeName, String(value));
                    }
                    else {
                        this._propertyPreviousValue = this._propertyValue;
                        this._propertyValue = this.property.default;
                        this.ch5Component.setAttribute(this._attributeName, String(this.property.default));
                    }
                    if (!_.isNil(callback)) {
                        callback();
                    }
                    return true;
                }
            }
            else if (this.property.type === "string") {
                if (this._propertyValue !== String(value).trim()) {
                    if (_.isNil(value) || String(value).trim() === "") {
                        this._propertyPreviousValue = this._propertyValue;
                        this._propertyValue = String(this.property.default);
                        this.ch5Component.removeAttribute(this._attributeName);
                    }
                    else {
                        this._propertyPreviousValue = this._propertyValue;
                        this._propertyValue = String(value).trim();
                        this.ch5Component.setAttribute(this._attributeName, String(value).trim());
                    }
                    if (!_.isNil(callback)) {
                        callback();
                    }
                    if (this.property.isSignal === true) {
                        if (this.property.signalType === "number") {
                            const signalResponse = this.setSignalByNumber(value);
                            if (!_.isNil(signalResponse)) {
                                this.signalState = signalResponse.subscribe((newValue) => {
                                    if (!_.isNil(signalCallback)) {
                                        if (newValue !== this._propertySignalValue) {
                                            this._propertySignalValue = newValue;
                                            signalCallback(newValue);
                                        }
                                    }
                                    return true;
                                });
                            }
                        }
                        else if (this.property.signalType === "string") {
                            const signalResponse = this.setSignalByString(value);
                            if (!_.isNil(signalResponse)) {
                                this.signalState = signalResponse.subscribe((newValue) => {
                                    if (!_.isNil(signalCallback)) {
                                        if (newValue !== this._propertySignalValue) {
                                            this._propertySignalValue = newValue;
                                            signalCallback(newValue);
                                        }
                                    }
                                    return true;
                                });
                            }
                        }
                        else if (this.property.signalType === "boolean") {
                            const signalResponse = this.setSignalByBoolean(value);
                            if (!_.isNil(signalResponse)) {
                                this.signalState = signalResponse.subscribe((newValue) => {
                                    if (!_.isNil(signalCallback)) {
                                        if (newValue !== this._propertySignalValue) {
                                            this._propertySignalValue = newValue;
                                            signalCallback(newValue);
                                        }
                                    }
                                    return true;
                                });
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    setSignalByNumber(signalValue) {
        if (this.signalValue === signalValue || signalValue === null) {
            return null;
        }
        if (this.signalValue) {
            const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
            const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldReceiveStateSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this.signalState);
            }
        }
        this.signalValue = signalValue;
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    setSignalByString(signalValue) {
        if (this.signalValue === signalValue || signalValue === null) {
            return null;
        }
        if (this.signalValue) {
            const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
            const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldReceiveStateSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this.signalState);
            }
        }
        this.signalValue = signalValue;
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    setSignalByBoolean(signalValue) {
        if (this.signalValue === signalValue || signalValue === null) {
            return null;
        }
        if (this.signalValue) {
            const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
            const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldReceiveStateSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this.signalState);
            }
        }
        this.signalValue = signalValue;
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(this.signalValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getBooleanSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LXByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBbUN2RCxDQUFDO0FBRUYsTUFBTSxPQUFPLFdBQVc7SUFjdkIsWUFBbUIsWUFBK0MsRUFBUyxRQUE4QjtRQUF0RixpQkFBWSxHQUFaLFlBQVksQ0FBbUM7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQVpqRyxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQiwyQkFBc0IsR0FBb0MsSUFBSSxDQUFDO1FBRS9ELHlCQUFvQixHQUFvQyxJQUFJLENBQUM7UUFDN0QscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHdCQUFtQixHQUFXLEVBQUUsQ0FBQztRQUl4QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUMvQztJQUNGLENBQUM7SUFDRCxJQUFXLFVB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