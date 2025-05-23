;
;
;
export class Ch5SignalAttributeRegistry {
    static get instance() {
        if (Ch5SignalAttributeRegistry._instance === undefined) {
            Ch5SignalAttributeRegistry._instance = new Ch5SignalAttributeRegistry();
        }
        return Ch5SignalAttributeRegistry._instance;
    }
    constructor() {
        this._registry = {};
    }
    addElementAttributeEntries(elementName, entries) {
        if (!this._registry[elementName.toUpperCase()]) {
            this._registry[elementName.toUpperCase()] = { attributes: entries };
        }
        else {
            this._registry[elementName.toUpperCase()].attributes = entries;
        }
    }
    addCustomAttributeEntry(attributeName, entry) {
        if (!this._registry[Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME]) {
            this._registry[Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME] = { attributes: {} };
        }
        this._registry[Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME].attributes[attributeName] = entry;
    }
    addElementDefaultAttributeEntries(elementName, entries) {
        if (!this._registry[elementName.toUpperCase()]) {
            this._registry[elementName.toUpperCase()] = { attributes: {} };
        }
        this._registry[elementName.toUpperCase()].addAttributeWhen = entries;
    }
    getElementAttributeEntry(elementName, attributeName) {
        if (this._registry[elementName] !== undefined) {
            return this._registry[elementName].attributes[attributeName];
        }
        else if (this._registry[Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME] !== undefined) {
            return this._registry[Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME].attributes[attributeName];
        }
        return undefined;
    }
    getElementDefaultAttributeEntries(elementName) {
        if (this._registry[elementName] !== undefined) {
            return this._registry[elementName].addAttributeWhen;
        }
        return undefined;
    }
}
Ch5SignalAttributeRegistry.BOOLEAN_JOIN = "booleanJoin";
Ch5SignalAttributeRegistry.NUMERIC_JOIN = "numericJoin";
Ch5SignalAttributeRegistry.STRING_JOIN = "stringJoin";
Ch5SignalAttributeRegistry.CONTRACT_NAME = "contractName";
Ch5SignalAttributeRegistry.CUSTOM_ATTRIBUTE_PSUEDO_ELEMENT_NAME = "*";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1hdHRyaWJ1dGUtcmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1zaWduYWwtYXR0cmlidXRlLXJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNDLENBQUM7QUFJRCxDQUFDO0FBS0QsQ0FBQztBQWtCRixNQUFNLE9BQU8sMEJBQTBCO0lBVy9CLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLElBQUksMEJBQTBCLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN2RCwwQkFBMEIsQ0FBQyxTQUFTLEdBQUcsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1NBQ3hFO1FBQ0QsT0FBTywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7SUFDN0MsQ0FBQztJQUlEO1FBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUlNLDBCQUEwQixDQUFDLFdBQW1CLEVBQUUsT0FBaUQ7UUFDdkcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUNwRTthQUNJO1lBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1NBQy9EO0lBQ0YsQ0FBQztJQUNNLHVCQUF1QixDQUFDLGFBQXFCLEVBQUUsS0FBNkM7UUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsb0NBQW9DLENBQUMsRUFBRTtZQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLG9DQUFvQyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDckc7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLG9DQUFvQyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNuSCxDQUFDO0lBRU0saUNBQWlDLENBQUMsV0FBbUIsRUFBRSxPQUFnRDtRQUM3RyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7SUFDdEUsQ0FBQztJQUVNLHdCQUF3QixDQUFDLFdBQW1CLEVBQUUsYUFBcUI7UUFDekUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUM5QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzdEO2FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLG9DQUFvQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBRXZHLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqSDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxpQ0FBaUMsQ0FBQyxXQUFtQjtRQUMzRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNwRDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7O0FBOURzQix1Q0FBWSxHQUFHLGFBQWEsQ0FBQztBQUM3Qix1Q0FBWSxHQUFHLGFBQWEsQ0FBQztBQUM3QixzQ0FBVyxHQUFHLFlBQVksQ0FBQztBQUMzQix3Q0FBYSxHQUFHLGNBQWMsQ0FBQztBQUU5QiwrREFBb0MsR0FBRyxHQUFHLENBQUMifQ==