export declare class Ch5TranslationClass {
    currentLanguage: string | null;
    translatableObjects: any;
    constructor();
    protected translateCallback(section: string): void;
    _getTranslatedValue(valueToSave: string, valueToTranslate: string): string;
    _t(valueToTranslate: string): string;
}
