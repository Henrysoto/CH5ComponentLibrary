import { Ch5TranslationConfiguration } from './ch5-translation-configuration';
import { translationFactory } from './ch5-translation-factory';
export class Ch5TranslationUtility {
    static getInstance() {
        if (Ch5TranslationUtility._instance === undefined) {
            Ch5TranslationUtility._instance = new Ch5TranslationUtility();
        }
        return Ch5TranslationUtility._instance;
    }
    constructor() {
        this._translatorBeginKey = '';
        this._translatorEndKey = '';
        this.translatorBeginKey = Ch5TranslationConfiguration.translationTokenStartDelimiter;
        this.translatorEndKey = Ch5TranslationConfiguration.translationTokenEndDelimiter;
    }
    getTranslator() {
        return translationFactory.translator;
    }
    valuesToTranslation(valueToTranslation) {
        const patternIdentifier = new RegExp(`^${this.translatorBeginKey}[a-zA-Z0-9][a-zA-Z0-9_.]*[^_.]${this.translatorEndKey}$`);
        return valueToTranslation.match(patternIdentifier);
    }
    hasMultipleIdentifiers(valueToTranslation) {
        const patternIdentifier = new RegExp(`^${this.translatorBeginKey}[a-zA-Z0-9][a-zA-Z0-9_.]*[^_.]${this.translatorEndKey}$`);
        if (valueToTranslation.match(patternIdentifier) &&
            valueToTranslation.match(patternIdentifier).length > 1) {
            return true;
        }
        return false;
    }
    isTranslationIdentifier(value) {
        const patternIdentifier = new RegExp(`^${this.translatorBeginKey}[a-zA-Z0-9][a-zA-Z0-9_.]*[^_.]${this.translatorEndKey}$`);
        const pattern = patternIdentifier;
        return pattern.test(value);
    }
    stripDownTranslationCharacters(value) {
        const pattern = new RegExp("^(\\" + this.translatorBeginKey + ")([a-zA-Z0-9\\._]+)(\\" + this.translatorEndKey + ")$");
        let translatedCharacters = '';
        if (pattern.exec(value) && pattern.exec(value).length > 0) {
            translatedCharacters = pattern.exec(value)[2];
        }
        return translatedCharacters;
    }
    set translatorBeginKey(key) {
        if (key !== null && key !== undefined) {
            this._translatorBeginKey = key.split('').join('\\');
        }
    }
    get translatorBeginKey() {
        return this._translatorBeginKey;
    }
    set translatorEndKey(key) {
        if (key !== null && key !== undefined) {
            this._translatorEndKey = key.split('').join('\\');
        }
    }
    get translatorEndKey() {
        return this._translatorEndKey;
    }
    _t(valueToTranslate) {
        let translatedValue = valueToTranslate;
        const identifiedValues = this.valuesToTranslation(valueToTranslate);
        if (identifiedValues && identifiedValues.length > 0) {
            identifiedValues.forEach(identifier => {
                const isTranslatable = this.isTranslationIdentifier(identifier);
                if (isTranslatable) {
                    const characters = this.stripDownTranslationCharacters(identifier);
                    const existTranslation = this.getTranslator().exists(characters);
                    if (existTranslation) {
                        const identifierTranslated = this.getTranslator().t(characters);
                        translatedValue = translatedValue.replace(identifier, identifierTranslated);
                    }
                }
            });
        }
        return translatedValue;
    }
    translatedValue(valueToTranslate) {
        const isTranslatableValue = this.isTranslationIdentifier(valueToTranslate);
        let _value = valueToTranslate;
        if (isTranslatableValue) {
            _value = this._t(valueToTranslate);
        }
        else {
            _value = valueToTranslate;
        }
        return _value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyYW5zbGF0aW9uLXV0aWxpdHkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtdHJhbnNsYXRpb24tdXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUcvRCxNQUFNLE9BQU8scUJBQXFCO0lBTTFCLE1BQU0sQ0FBQyxXQUFXO1FBQ3hCLElBQUkscUJBQXFCLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNsRCxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1NBQzlEO1FBRUQsT0FBTyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7SUFDeEMsQ0FBQztJQUVEO1FBWk8sd0JBQW1CLEdBQVcsRUFBRSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQVlyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMkJBQTJCLENBQUMsOEJBQThCLENBQUM7UUFDckYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLDJCQUEyQixDQUFDLDRCQUE0QixDQUFDO0lBQ2xGLENBQUM7SUFFTSxhQUFhO1FBQ25CLE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxrQkFBMEI7UUFFcEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsaUNBQWlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFFM0gsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sc0JBQXNCLENBQUMsa0JBQTBCO1FBQ3ZELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxJ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