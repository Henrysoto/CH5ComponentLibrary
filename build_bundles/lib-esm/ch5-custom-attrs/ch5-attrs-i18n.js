import { Ch5AttrsLog } from './ch5-attrs-log';
import { CH5_I18N_ATTRIBUTE_CONSTANT } from './utils/ch5-attrs-constants';
import { randomFixedInteger } from './utils/ch5-attrs-utility';
import { Ch5TranslationUtility } from "../ch5-core/ch5-translation-utility";
import { CustomAttribute } from './interfaces';
export class Ch5AttrsI18n extends CustomAttribute {
    constructor() {
        super(...arguments);
        this.translatableData = [];
        this.initialIndexValue = CH5_I18N_ATTRIBUTE_CONSTANT.defaultIndex;
    }
    updateOnChange() {
        this.removeExtraNode();
        this.translatableData.map((savedItem, index) => {
            const el = document.getElementById(savedItem.uniqueElementId);
            const localeText = el.getAttribute(savedItem.attributeName) || '';
            this.updateValueToDom(el, localeText, index);
        });
    }
    handleBeingAddedToDom(el) {
        const localeText = el.getAttribute(Ch5AttrsI18n.DATA_CH5_ATTR_NAME) || '';
        const _debug = el.hasAttribute('debug');
        if (!el.id) {
            const elementUniqueId = Ch5AttrsI18n.DATA_CH5_EL_ID_PREFIX
                + randomFixedInteger(Ch5AttrsI18n.RANDOM_NUMBER_LENGTH).toString();
            el.setAttribute('id', elementUniqueId);
            Ch5AttrsLog.info(_debug, `unique id:-${elementUniqueId} added to element`, el);
        }
        this.updateValueToDom(el, localeText);
    }
    getTextDisplayInfo(attributeValue) {
        const subAttributeInfo = { typeOfAttribute: '', attributeSelector: '', valueToTranslate: '', hasAttribute: false };
        const subAttributeInput = attributeValue.trim();
        const hasSubAttribute = subAttributeInput.match(/\[(.*?)\]/);
        if (!subAttributeInput && !hasSubAttribute) {
            return subAttributeInfo;
        }
        if (subAttributeInput.indexOf('[') === Ch5AttrsI18n.EXPECTED_SUBATTRIBUTE_POSITION) {
            const [subAttribute, selector] = subAttributeInput.match(/\[(.*?)\]/)[1].split('=');
            subAttributeInfo.valueToTranslate = subAttributeInput.replace(subAttributeInput.match(/\[(.*?)\]/)[0], '');
            subAttributeInfo.typeOfAttribute = subAttribute;
            subAttributeInfo.attributeSelector = selector;
            subAttributeInfo.hasAttribute = true;
        }
        return subAttributeInfo;
    }
    updateValueToDom(el, localeText, indexValue = this.initialIndexValue) {
        const _debug = el.hasAttribute('debug');
        if (indexValue === this.initialIndexValue && this.translatableData) {
            this.removeExtraNode();
        }
        const subAttribuite = this.getTextDisplayInfo(localeText);
        let newTextValue = '';
        if (subAttribuite.hasAttribute) {
            newTextValue = this.getTranslatedValue(el, subAttribuite.valueToTranslate, indexValue);
            if (subAttribuite.typeOfAttribute === Ch5AttrsI18n.SUBATTRIBUTE_TYPE) {
                const newEl = el.querySelector(subAttribuite.attributeSelector);
                newEl.innerHTML = newTextValue;
                Ch5AttrsLog.info(_debug, `updated value ${newTextValue} to inner html`, el);
            }
            else {
                if (el.hasAttribute(subAttribuite.attributeSelector)) {
                    el.removeAttribute(subAttribuite.attributeSelector);
                }
                el.setAttribute(subAttribuite.attributeSelector, newTextValue);
                Ch5AttrsLog.info(_debug, `updated value ${newTextValue} of atrribute ${subAttribuite.attributeSelector}`, el);
            }
        }
        else {
            newTextValue = this.getTranslatedValue(el, localeText, indexValue);
            el.innerHTML = newTextValue;
            Ch5AttrsLog.info(_debug, `updated text content ${newTextValue} `, el);
        }
    }
    checkElementExistInDom(uniqueElementId) {
        const isElementExist = document.getElementById(uniqueElementId);
        return !!isElementExist;
    }
    removeExtraNode() {
        this.translatableData = this.translatableData.filter((item) => this.checkElementExistInDom(item.uniqueElementId));
    }
    getTranslatedValue(el, valueToTranslate, indexValue = this.initialIndexValue) {
        const saveTranslatedValues = {};
        const translationUtility = Ch5TranslationUtility.getInstance();
        const isTranslatableValue = translationUtility.isTranslationIdentifier(valueToTranslate);
        const translatedValue = isTranslatableValue ? this.doTranslation(valueToTranslate) : '';
        if (!!translatedValue) {
            saveTranslatedValues.uniqueElementId = el.id;
            saveTranslatedValues.attributeName = Ch5AttrsI18n.DATA_CH5_ATTR_NAME;
            saveTranslatedValues.attributeValue = valueToTranslate;
            indexValue !== this.initialIndexValue
                ? this.translatableData[indexValue] = saveTranslatedValues
                : this.translatableData.push(saveTranslatedValues);
        }
        return translatedValue;
    }
    doTranslation(valueToTranslate) {
        let translatedValue = valueToTranslate;
        const translationUtility = Ch5TranslationUtility.getInstance();
        const identifiedValues = translationUtility.valuesToTranslation(valueToTranslate);
        if (identifiedValues && identifiedValues.length > 0) {
            identifiedValues.forEach(identifier => {
                const isTranslatable = translationUtility.isTranslationIdentifier(identifier);
                if (isTranslatable) {
                    const characters = translationUtility.stripDownTranslationCharacters(identifier);
                    const existTranslation = translationUtility.getTranslator().exists(characters);
                    if (existTranslation) {
                        const identifierTranslated = translationUtility.getTranslator().t(characters);
                        translatedValue = translatedValue.replace(identifier, identifierTranslated);
                    }
                }
            });
        }
        return translatedValue;
    }
}
Ch5AttrsI18n.DATA_CH5_ATTR_NAME = CH5_I18N_ATTRIBUTE_CONSTANT.dataCh5AttrName;
Ch5AttrsI18n.DATA_CH5_EL_ID_PREFIX = CH5_I18N_ATTRIBUTE_CONSTANT.elementIdPrefix;
Ch5AttrsI18n.RANDOM_NUMBER_LENGTH = CH5_I18N_ATTRIBUTE_CONSTANT.randomNumberLength;
Ch5AttrsI18n.EXPECTED_SUBATTRIBUTE_POSITION = CH5_I18N_ATTRIBUTE_CONSTANT.subAttributePosition;
Ch5AttrsI18n.SUBATTRIBUTE_TYPE = CH5_I18N_ATTRIBUTE_CONSTANT.subAttributeType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLWkxOG4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY3VzdG9tLWF0dHJzL2NoNS1hdHRycy1pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZUFBZSxFQUFpRCxNQUFNLGNBQWMsQ0FBQztBQUU5RixNQUFNLE9BQU8sWUFBYSxTQUFRLGVBQXVCO0lBQXpEOztRQVFXLHFCQUFnQixHQUF1QixFQUF3QixDQUFDO1FBQy9ELHNCQUFpQixHQUFXLDJCQUEyQixDQUFDLFlBQVksQ0FBQztJQXlKakYsQ0FBQztJQXBKVSxjQUFjO1FBRWpCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzNDLE1BQU0sRUFBRSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQWdCLENBQUM7WUFDMUYsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU9NLHFCQUFxQixDQUFDLEVBQVc7UUFDcEMsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEYsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNSLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxxQkFBcUI7a0JBQ3BELGtCQUFrQixDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLGNBQWMsZUFBZSxtQkFBbUIsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUNoRjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFPTyxrQkFBa0IsQ0FBQyxjQUFzQjtRQUM3QyxNQUFNLGdCQUFnQixHQUFpQixFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDakksTUFBTSxpQkFBaUIsR0FBVyxjQUFjLENBQUMsSUFBSSxFQUFZLENBQUM7UUFDbEUsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QyxPQUFPLGdCQUFnQixDQUFDO1NBQzNCO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssWUFBWSxDQUFDLDhCQUE4QixFQUFFO1lBQ2hGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRixnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBVyxDQUFDO1lBQ3RILGdCQUFnQixDQUFDLGVBQWUsR0FBRyxZQUFzQixDQUFDO1lBQzFELGdCQUFnQixDQUFDLGlCQUFpQixHQUFHLFFBQWtCLENBQUM7WUFDeEQsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN4QztRQUNELE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQVFPLGdCQUFnQixDQUFDLEVBQWUsRUFBRSxVQUFrQixFQUFFLGFBQXFCLElBQUksQ0FBQyxpQkFBaUI7UUFDckcsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2hFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtRQUNELE1BQU0sYUFBYSxHQUFpQixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRTtZQUM1QixZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDdkYsSUFBSSxhQUFhLENBQUMsZUFBZSxLQUFLLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbEUsTUFBTSxLQUFLLEdBQWdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFnQixDQUFDO2dCQUM1RixLQUFLLENBQUMsU0FBUyxHQUFHLFlBQXNCLENBQUM7Z0JBQ3pDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlCQUFpQixZQUFZLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQy9FO2lCQUFNO2dCQUNILElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDbEQsRUFBRSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ0QsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQy9ELFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlCQUFpQixZQUFZLGlCQUFpQixhQUFhLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNqSDtTQUVKO2FBQU07WUFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDLFNBQVMsR0FBRyxZQUFzQixDQUFDO1lBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHdCQUF3QixZQUFZLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RTtJQUNMLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxlQUF1QjtRQUNsRCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBRSxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUM1QixDQUFDO0lBS08sZUFBZTtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUUsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFRTyxrQkFBa0IsQ0FBQyxFQUFlLEVBQUUsZ0JBQXdCLEVBQUUsYUFBcUIsSUFBSSxDQUFDLGlCQUFpQjtRQUM3RyxNQUFNLG9CQUFvQixHQUFxQixFQUFzQixDQUFDO1FBQ3RFLE1BQU0sa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0QsTUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sZUFBZSxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV4RixJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUU7WUFDbkIsb0JBQW9CLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDN0Msb0JBQW9CLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUNyRSxvQkFBb0IsQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkQsVUFBVSxLQUFLLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEdBQUcsb0JBQW9CO2dCQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQU9PLGFBQWEsQ0FBQyxnQkFBd0I7UUFDMUMsSUFBSSxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkMsTUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvRCxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEYsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlFLElBQUksY0FBYyxFQUFFO29CQUNoQixNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakYsTUFBTSxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRS9FLElBQUksZ0JBQWdCLEVBQUU7d0JBQ2xCLE1BQU0sb0JBQW9CLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM5RSxlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztxQkFDL0U7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO1FBRUQsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQzs7QUEvSmEsK0JBQWtCLEdBQVcsMkJBQTJCLENBQUMsZUFBZSxBQUF0RCxDQUF1RDtBQUN6RSxrQ0FBcUIsR0FBVywyQkFBMkIsQ0FBQyxlQUFlLEFBQXRELENBQXVEO0FBQzVFLGlDQUFvQixHQUFXLDJCQUEyQixDQUFDLGtCQUFrQixBQUF6RCxDQUEwRDtBQUU5RSwyQ0FBOEIsR0FBVywyQkFBMkIsQ0FBQyxvQkFBb0IsQUFBM0QsQ0FBNEQ7QUFDMUYsOEJBQWlCLEdBQVcsMkJBQTJCLENBQUMsZ0JBQWdCLEFBQXZELENBQXdEIn0=