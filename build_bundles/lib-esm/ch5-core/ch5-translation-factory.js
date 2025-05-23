import translateEngine from 'i18next';
import { Ch5TranslationListeners } from "./ch5-translation-listeners";
export class Ch5TranslationFactory {
    constructor() {
        this.receiveUpdateSub = '';
        this._translator = {};
    }
    get translator() {
        return this._translator;
    }
    set translator(translator) {
        if (Object.keys(translator).length > 0) {
            this._translator = translator;
            this.runListeners();
        }
    }
    runListeners() {
        return new Ch5TranslationListeners(this.translator);
    }
}
export const translationFactory = new Ch5TranslationFactory;
translationFactory.translator = translateEngine;
export const languageChangedSignalName = 'language_changed';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyYW5zbGF0aW9uLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtdHJhbnNsYXRpb24tZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLGVBQXlCLE1BQU0sU0FBUyxDQUFDO0FBQ2hELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE1BQU0sT0FBTyxxQkFBcUI7SUFBbEM7UUFRUSxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFRM0IsZ0JBQVcsR0FBUyxFQUFVLENBQUM7SUEwQjFDLENBQUM7SUFuQkEsSUFBVyxVQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBT0QsSUFBVyxVQUFVLENBQUMsVUFBZ0I7UUFDckMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVPLFlBQVk7UUFDbkIsT0FBTyxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Q7QUFFRCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFxQixDQUFDO0FBQzVELGtCQUFrQixDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsa0JBQWtCLENBQUMifQ==