import { languageChangedSignalName } from './ch5-translation-factory';
import { Ch5TranslationUtility } from './ch5-translation-utility';
import { Ch5SignalFactory } from './ch5-signal-factory';
import { isNotNil } from '../ch5-common/utils/common-functions';
export class Ch5TranslationClass {
    constructor() {
        this.currentLanguage = '';
        this.translatableObjects = {};
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(languageChangedSignalName);
        if (isNotNil(receiveSignal)) {
            receiveSignal === null || receiveSignal === void 0 ? void 0 : receiveSignal.subscribe((newValue) => {
                if (newValue !== '' && newValue !== this.currentLanguage) {
                    this.currentLanguage = newValue;
                    Object.keys(this.translatableObjects).forEach((propertyToTranslate) => {
                        let propertyReference = this;
                        if (propertyReference[propertyToTranslate] === undefined && propertyReference['attrModel'] !== undefined) {
                            propertyReference = propertyReference['attrModel'];
                        }
                        if (propertyReference[propertyToTranslate.toString()] !== undefined && this.translatableObjects[propertyToTranslate.toString()] !== undefined) {
                            propertyReference[propertyToTranslate.toString()] = this.translatableObjects[propertyToTranslate];
                            this.translateCallback(propertyToTranslate.toString());
                        }
                    });
                }
            });
        }
    }
    translateCallback(section) {
    }
    _getTranslatedValue(valueToSave, valueToTranslate) {
        const translationUtility = Ch5TranslationUtility.getInstance();
        let translationKey = valueToTranslate;
        ;
        let _value = valueToTranslate;
        let savedValue = this.translatableObjects[valueToSave];
        if (savedValue === valueToTranslate) {
            translationKey = savedValue;
        }
        const isTranslatableValue = translationUtility.isTranslationIdentifier(translationKey);
        if (!isTranslatableValue) {
            return valueToTranslate;
        }
        if (typeof savedValue === 'undefined') {
            savedValue = valueToTranslate;
            _value = this._t(valueToTranslate);
        }
        else {
            const isTranslatableLabel = translationUtility.isTranslationIdentifier(savedValue);
            if (!isTranslatableLabel) {
                if (savedValue !== valueToTranslate) {
                    savedValue = valueToTranslate;
                }
                _value = this._t(valueToTranslate);
            }
            else {
                if (this._t(savedValue) !== valueToTranslate && translationUtility.hasMultipleIdentifiers(savedValue)) {
                    savedValue = valueToTranslate;
                }
                _value = this._t(savedValue);
            }
        }
        this.translatableObjects[valueToSave] = savedValue;
        return _value;
    }
    _t(valueToTranslate) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyYW5zbGF0aW9uLWNsYXNzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LXRyYW5zbGF0aW9uLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVoRSxNQUFNLE9BQU8sbUJBQW1CO0lBTy9CO1FBSk8sb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLHdCQUFtQixHQUFRLEVBQVMsQ0FBQztRQUczQyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVoRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QixhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLFFBQVEsS0FBSyxFQUFFLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUEyQixFQUFFLEVBQUU7d0JBQzdFLElBQUksaUJBQWlCLEdBQThCLElBQVUsQ0FBQzt3QkFFOUQsSUFBSSxpQkFBaUIsQ0FBQyxtQkFBNkIsQ0FBQyxLQUFLLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFxQixDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUM3SCxpQkFB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