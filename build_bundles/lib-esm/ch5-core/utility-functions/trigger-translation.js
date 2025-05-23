import { translationFactory, languageChangedSignalName } from "../ch5-translation-factory";
import { Ch5SignalFactory } from "../ch5-signal-factory";
export function triggerTranslation(language) {
    const languageChangedSig = Ch5SignalFactory.getInstance().getStringSignal(languageChangedSignalName);
    let changedLanguage = translationFactory.translator.language;
    if ((changedLanguage === undefined || changedLanguage === null) && language !== '') {
        changedLanguage = language;
    }
    if (languageChangedSig !== null) {
        languageChangedSig.publish(changedLanguage);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci10cmFuc2xhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL3RyaWdnZXItdHJhbnNsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFFBQWlCO0lBRWxELE1BQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDckcsSUFBSSxlQUFlLEdBQXVCLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFFakYsSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLElBQUksZUFBZSxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7UUFDbEYsZUFBZSxHQUFHLFFBQWtCLENBQUM7S0FDdEM7SUFFRCxJQUFJLGtCQUFrQixLQUFLLElBQUksRUFBRTtRQUMvQixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsZUFBeUIsQ0FBQyxDQUFDO0tBQ3ZEO0FBQ0gsQ0FBQyJ9