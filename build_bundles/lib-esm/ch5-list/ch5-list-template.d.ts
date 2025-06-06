import { ICh5ListItemInfo } from './ch5-list';
import { Ch5ListAbstractHelper } from './ch5-list-abstract-helper';
import { TAnimateCallback } from './ch5-list-animation';
export interface ICh5ListStylesheet {
    [key: string]: any;
}
export declare class Ch5ListTemplate extends Ch5ListAbstractHelper {
    scrollbarSize: number;
    cachedListFullSize: number | undefined;
    endless: boolean;
    private _tmplString;
    private _scrollbarElement;
    private _lastScrollbarPosition;
    private resizeDebouncer;
    initializationTask: number | undefined;
    resetListLayoutTask: number | undefined;
    set scrollbarElement(element: HTMLElement | null);
    get scrollbarElement(): HTMLElement | null;
    checkForTemplate(): string;
    updateTemplateString(tmplString: string): void;
    processTemplate(uid: string, index: number, templateVars: string | null): HTMLElement;
    private setCustomAttributesInChildComponents;
    listItemCSS(): {
        display: string;
        width: string;
        height: string;
    };
    attachCSS(): void;
    updateListMainElStyle(): void;
    resizeList(element: HTMLElement, templateVars: string | null, resize?: boolean): void;
    resetListLayout(): void;
    triggerResizeDueWidthAndHeightUpdates(): void;
    removeScrollbar(): void;
    customScrollbar(additionalElement: HTMLElement): void;
    updateScrollBarPosition(newPosition: number, animate?: TAnimateCallback): void;
    setWrapperTranslateX(tx: number, animate?: TAnimateCallback): void;
    setWrapperTranslateY(ty: number, animate?: TAnimateCallback): void;
    setItemTranslateX(tx: number, item: ICh5ListItemInfo): void;
    setItemTranslateY(ty: number, item: ICh5ListItemInfo): void;
    computePage(coord: number, start?: number, end?: number): number;
    checkAndSetSizes(): void;
    updateViewportSize(viewportSize?: number): void;
    resolveEndlessViewportSize(): void;
    private resetItemsTransform;
    private isPositionExceedingMaximumBoundary;
    private getRelativeScrollbarPosition;
    private computeItemLocation;
    private processTemplateForVars;
    private textReplace;
    private createScrollbar;
    private prepareStyleSheet;
    private initListMaxWidthAndHeight;
}
