import { translationFactory } from "../ch5-translation-factory";
import { Ch5TranslationConfiguration } from "../ch5-translation-configuration";
import { Ch5TranslationUtility } from "../ch5-translation-utility";
export function registerTranslationInterface(translator, beginWith, endingWith) {
    if ((beginWith !== undefined && endingWith !== undefined) &&
        (beginWith.trim() !== '' && endingWith.trim() !== '')) {
        beginWith = beginWith.trim();
        endingWith = endingWith.trim();
        Ch5TranslationConfiguration.translationTokenStartDelimiter = Ch5TranslationUtility.getInstance().translatorBeginKey = beginWith;
        Ch5TranslationConfiguration.translationTokenEndDelimiter = Ch5TranslationUtility.getInstance().translatorEndKey = endingWith;
    }
    translationFactory.translator = translator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24taW50ZXJmYWNlLXJlZ2lzdGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvdXRpbGl0eS1mdW5jdGlvbnMvdHJhbnNsYXRpb24taW50ZXJmYWNlLXJlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRW5FLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxVQUFnQixFQUFFLFNBQWtCLEVBQUUsVUFBbUI7SUFFcEcsSUFDRSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksVUFBVSxLQUFLLFNBQVMsQ0FBQztRQUNyRCxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNyRDtRQUNBLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQiwyQkFBMkIsQ0FBQyw4QkFBOEIsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDaEksMkJBQTJCLENBQUMsNEJBQTRCLEdBQUcscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO0tBQzlIO0lBRUQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QyxDQUFDIn0=