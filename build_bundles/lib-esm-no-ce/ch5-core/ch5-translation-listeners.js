import { triggerTranslation } from "./utility-functions/trigger-translation";
export class Ch5TranslationListeners {
    constructor(translator) {
        this.translator = {};
        this.translator = translator;
        this.init();
    }
    init() {
        this.translator.on('initialized', this.onInitialized.bind(this));
        this.translator.on('loaded', this.onLoaded.bind(this));
        this.translator.on('added', this.onAdded.bind(this));
        this.translator.on('languageChanged', this.onLanguageChanged.bind(this));
    }
    onInitialized(options) {
        this.translate(options.language);
    }
    onLanguageChanged(lng) {
        this.translate(lng);
    }
    onLoaded(loaded) {
        this.translate();
    }
    onAdded(lng, ns) {
        this.translate();
    }
    translate(language) {
        triggerTranslation(language);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyYW5zbGF0aW9uLWxpc3RlbmVycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL2NoNS10cmFuc2xhdGlvbi1saXN0ZW5lcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFHN0UsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFZLFVBQWdCO1FBRnJCLGVBQVUsR0FBUyxFQUFVLENBQUM7UUFHbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVTLElBQUk7UUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQVFTLGFBQWEsQ0FBQyxPQUFpQjtRQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBUVMsaUJBQWlCLENBQUMsR0FBVztRQUVyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFTUyxRQUFRLENBQUMsTUFBZTtRQUVoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQVNTLE9BQU8sQ0FBQyxHQUFXLEVBQUUsRUFBVTtRQUV2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQVNTLFNBQVMsQ0FBQyxRQUFpQjtRQUNuQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBRUYifQ==