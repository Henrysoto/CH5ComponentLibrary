import isNil from 'lodash/isNil';
import { Ch5List } from './ch5-list';
import { Ch5ListAbstractHelper } from './ch5-list-abstract-helper';
import { Ch5AugmentVarSignalsNames } from '../ch5-common/ch5-augment-var-signals-names';
import { Ch5Common } from '../ch5-common/ch5-common';
import { debounce } from '../ch5-core/utility-functions/debounce';
import { Ch5ListSizeResolver } from './ch5-list-size-resolver';
export class Ch5ListTemplate extends Ch5ListAbstractHelper {
    constructor() {
        super(...arguments);
        this.scrollbarSize = 0;
        this.endless = false;
        this._tmplString = '';
        this._scrollbarElement = {};
        this._lastScrollbarPosition = 0;
        this.resizeDebouncer = {};
    }
    set scrollbarElement(element) {
        if (element !== undefined || element !== null) {
            this._scrollbarElement = element;
        }
    }
    get scrollbarElement() {
        return this._scrollbarElement;
    }
    checkForTemplate() {
        let tplEl;
        if (!(this._list.templateElement instanceof HTMLTemplateElement)) {
            tplEl = this._list.templateElement = this._list.getElementsByTagName('template')[0];
        }
        else {
            tplEl = this._list.templateElement;
        }
        let tmplString = '';
        if (tplEl && tplEl.innerHTML && tplEl.innerHTML.length > 0) {
            this._list.info('ch5-list-template - tpEL.innerHtml ', tplEl.innerHTML);
            tmplString = tplEl.innerHTML;
        }
        else if (tplEl && tplEl.firstElementChild && tplEl.firstElementChild.outerHTML
            && tplEl.firstElementChild.outerHTML.length > 0) {
            this._list.info('ch5-list-template - tplEl.firstElementChild.outerHTML ', tplEl.firstElementChild.outerHTML);
            tmplString = tplEl.firstElementChild.outerHTML;
        }
        this._tmplString = tmplString;
        return tmplString;
    }
    updateTemplateString(tmplString) {
        this._tmplString = tmplString;
    }
    processTemplate(uid, index, templateVars) {
        this._list.info(`ch5-list-template - processTemplate`);
        const divTemplate = document.createElement('div');
        divTemplate.id = `${uid}_${index}`;
        divTemplate.classList.add(Ch5List.ITEMCLASS);
        const documentContainer = document.createElement('template');
        documentContainer.innerHTML = this._tmplString;
        if (this._list.indexId !== null) {
            Ch5AugmentVarSignalsNames
                .replaceIndexIdInTmplElemsAttrs(documentContainer, (index), this._list.indexId);
            Ch5AugmentVarSignalsNames
                .replaceIndexIdInTmplElemsContent(documentContainer, (index), this._list.indexId);
        }
        const templateContent = documentContainer === null || documentContainer === void 0 ? void 0 : documentContainer.content;
        this.setCustomAttributesInChildComponents(templateContent);
        divTemplate.appendChild(templateContent);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(divTemplate, this._list.getAttribute("contractname") || '', parseInt(this._list.getAttribute("booleanjoinoffset") || '0', 10) || 0, parseInt(this._list.getAttribute("numericJoinOffset") || '0', 10) || 0, parseInt(this._list.getAttribute("stringJoinOffset") || '0', 10) || 0);
        if (templateVars !== null && templateVars !== "") {
            const inputData = JSON.parse(templateVars);
            divTemplate.innerHTML = this.processTemplateForVars(divTemplate.innerHTML, inputData[index]);
        }
        if (this._list.isDebug()) {
            this._list.info(`after update ${divTemplate.innerHTML}`);
        }
        return divTemplate;
    }
    setCustomAttributesInChildComponents(parentElement) {
        const found = [];
        const allElements = parentElement.querySelectorAll('*');
        for (const element of allElements) {
            const elementTagName = element.tagName;
            if (elementTagName.startsWith('CH5-')) {
                element.setAttribute("swipeGestureEnabled", "true");
                found.push(element);
            }
        }
        return found;
    }
    listItemCSS() {
        this._list.info(`ch5-list-template - listItemCSS, process list item CSS`);
        const _orientationClass = this._list.orientation === Ch5List.ORIENTATION[0] ? '' : 'inline-block';
        const _cssWidth = this._list.itemWidth == null ? '' : this._list.itemWidth;
        const _cssHeight = this._list.itemHeight == null ? '' : this._list.itemHeight;
        return {
            display: _orientationClass,
            width: _cssWidth,
            height: _cssHeight
        };
    }
    attachCSS() {
        this._list.info(`ch5-list-template - attachCSS`);
        const existingStyleElement = this._list.getElementsByTagName('style');
        const style = (existingStyleElement.length === 0)
            ? document.createElement('style')
            : existingStyleElement[0];
        if (existingStyleElement.length === 0) {
            this._list.appendChild(style);
        }
        style.innerHTML = this.prepareStyleSheet().toString();
    }
    updateListMainElStyle() {
        this._list.info(`ch5-list-template - updateListMainElStyle`);
        let cssText = '';
        if (this._list.minWidth) {
            cssText += `min-width: ${this._list.minWidth};`;
        }
        if (this._list.maxWidth) {
            cssText += `max-width: ${this._list.maxWidth};`;
        }
        if (this._list.minHeight) {
            cssText += `min-height: ${this._list.minHeight};`;
        }
        if (this._list.maxHeight) {
            cssText += `max-height: ${this._list.maxHeight};`;
        }
        if (cssText) {
            this._list.style.cssText += cssText;
        }
    }
    resizeList(element, templateVars, resize = false) {
        this._list.info('ch5-list-template - resizeList()');
        this._list.animationHelper.minOffsetTranslate = 0;
        if (this._list.isHorizontal
            && !isNaN(this._list.currentXPosition)
            && this._list.getItemSize() > 0) {
            this._list.currentXPosition = this.computeItemLocation(this._list.currentXPosition);
            this.setWrapperTranslateX(this._list.currentXPosition);
            this.updateScrollBarPosition(this._list.currentXPosition);
        }
        else if (!this._list.isHorizontal
            && !isNaN(this._list.currentYPosition)
            && this._list.getItemSize() > 0) {
            this._list.currentYPosition = this.computeItemLocation(this._list.currentYPosition);
            this.setWrapperTranslateY(this._list.currentYPosition);
            this.updateScrollBarPosition(this._list.currentYPosition);
        }
        const uid = this._list.getCrId();
        const _scrollbarClassName = this._list.orientation === Ch5List.ORIENTATION[0] ? 'ch5-list-vertical-scrollbar' : 'ch5-list-horizontal-scrollbar';
        const _scrollOrientationClassName = this._list.orientation === Ch5List.ORIENTATION[0] ? 'ch5-list-vertical' : 'ch5-list-horizontal';
        const _scrollbarClass = this._list.scrollbar === true ? _scrollbarClassName : '';
        element.id = uid;
        element.className = `${_scrollbarClass} ${_scrollOrientationClassName}`;
        if (isNil(element.parentElement)) {
            this._list.appendChild(element);
        }
        if (this._list.size === 0) {
            return;
        }
        this.attachCSS();
        this.updateListMainElStyle();
        this.checkAndSetSizes();
        if (!resize) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(this.processTemplate(uid, 0, templateVars));
            const firstRenderVisibleItemsNr = this._list.getFirstRenderVisibleItemsNr(true);
            this._list._appendPosition = firstRenderVisibleItemsNr;
            const listFragment = document.createDocumentFragment();
            for (let index = 1; index < firstRenderVisibleItemsNr; index++) {
                listFragment.appendChild(this.processTemplate(uid, index, templateVars));
            }
            element.appendChild(listFragment);
            this._list._bufferedItems.bufferActive = this._list._canUseBufferAmount(firstRenderVisibleItemsNr);
            if (this._list._bufferedItems.bufferActive) {
                this._list._bufferedItems.bufferForwardStartIndex = firstRenderVisibleItemsNr;
                if (this._list.size !== null) {
                    this._list._bufferedItems.bufferBackwardsStartIndex = Number(this._list.size);
                }
            }
            this._list.bufferdItemsHelper.bufferItems();
        }
        else {
            this._list.items = this._list.items.map((elData) => {
                elData.element.style.transform = '';
                return Object.assign(Object.assign({}, elData), { translateX: 0, translateY: 0 });
            });
        }
        this._list.onResizeList();
        if (this._list.scrollbar !== false) {
            const newScrollbarPosition = this._list.isHorizontal
                ? this._list.currentXPosition
                : (this._list.currentYPosition - this.scrollbarSize);
            this.updateScrollBarPosition(newScrollbarPosition);
        }
        this._list.previousSize = this._list.size;
        const elements = this._list.items.map((itemInfo) => itemInfo.element);
        this._list.sizeResolver = new Ch5ListSizeResolver(elements, this._list.orientation);
        clearTimeout(this.initializationTask);
        this.initializationTask = window.setTimeout(() => {
            this._list.sizeResolver.updateViewport(this._list);
            this.customScrollbar(element);
            const { fullListSize, viewPortSize } = this._list.sizeResolver;
            this._list.animationHelper.maxOffsetTranslate = undefined;
            if (this._list.endless || fullListSize <= viewPortSize) {
                return;
            }
        });
    }
    resetListLayout() {
        clearTimeout(this.resetListLayoutTask);
        this.resetListLayoutTask = window.setTimeout(() => {
            if (!(this._list.sizeResolver instanceof Ch5ListSizeResolver)) {
                clearTimeout(this.resetListLayoutTask);
                return;
            }
            this.checkAndSetSizes();
            this._list.sizeResolver.updateViewport(this._list);
            this.resetItemsTransform();
            this._list.items.sort((listElement, nextListElement) => listElement.layoutIndex - nextListElement.layoutIndex);
            if (this._list.endless) {
                this._list.animationHelper.stop();
            }
            this._list.animationHelper.minOffsetTranslate = 0;
            this._list.animationHelper.maxOffsetTranslate = -this._list.sizeResolver.hiddenListSize;
            if (this._list.isHorizontal) {
                this._list.currentXPosition = this._list.currentXPosition % this._list.sizeResolver.fullListSize;
            }
            else {
                this._list.currentYPosition = this._list.currentYPosition % this._list.sizeResolver.fullListSize;
            }
            if (this.isPositionExceedingMaximumBoundary()) {
                if (this._list.isHorizontal) {
                    this._list.currentXPosition = this._list.animationHelper.maxOffsetTranslate;
                }
                else {
                    this._list.currentYPosition = this._list.animationHelper.maxOffsetTranslate;
                }
            }
            if (this._list.sizeResolver.viewPortSize > 0) {
                this._list.templateHelper.customScrollbar(this._list.divList);
            }
            const axisPosition = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
            this._list.templateHelper.updateScrollBarPosition(axisPosition);
            this._list.animationHelper.updateDragPosition(axisPosition);
            const { fullListSize, viewPortSize } = this._list.sizeResolver;
            if (fullListSize > 0 && viewPortSize > 0 && fullListSize <= viewPortSize) {
                this.resetItemsTransform();
            }
            const isBufferAmount = !isNil(this._list.bufferAmount);
            if (fullListSize <= viewPortSize) {
                this._list.setCurrentPosition(0);
                this._list.templateHelper.setWrapperTranslateX(0);
                this._list.templateHelper.setWrapperTranslateY(0);
                return;
            }
            if (this._list.endless) {
                return;
            }
            this._list.animationHelper.maxOffsetTranslate = this._list.animationHelper.adjustMaxOffset(isBufferAmount);
            if (this._list.animationHelper.maxOffsetTranslate) {
                let position = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
                if (position < this._list.animationHelper.maxOffsetTranslate) {
                    position = this._list.animationHelper.maxOffsetTranslate;
                    this._list.animationHelper.updateDragPosition(position);
                }
            }
        });
    }
    triggerResizeDueWidthAndHeightUpdates() {
        debounce(this.resizeDebouncer, () => {
            this.updateListMainElStyle();
            this.checkAndSetSizes();
            this.customScrollbar(this._list.divList);
        });
    }
    removeScrollbar() {
        if (this._scrollbarElement !== null && this._scrollbarElement instanceof HTMLElement) {
            if (this._scrollbarElement.parentElement !== null) {
                this._scrollbarElement.parentElement.remove();
            }
            this._scrollbarElement.remove();
            this._scrollbarElement = null;
        }
    }
    customScrollbar(additionalElement) {
        this.createScrollbar();
        if (this._list.scrollbar &&
            this._list.size !== null &&
            additionalElement !== undefined &&
            additionalElement.children !== undefined &&
            this._scrollbarElement &&
            this._scrollbarElement.parentElement !== undefined) {
            const layoutInfo = this._list.getLayoutInfo();
            const listSize = layoutInfo.fullListSize;
            const container = this._scrollbarElement.parentElement;
            const event = new Event('scroll');
            const scroll = this._scrollbarElement;
            const containerSize = layoutInfo.viewPortSize;
            if (container !== null && layoutInfo.fullListSize <= layoutInfo.viewPortSize) {
                container.remove();
                this._scrollbarElement = null;
                return;
            }
            const relativeScrollSize = Math.ceil((containerSize / listSize) * 100);
            if (scroll !== undefined) {
                container.addEventListener('scroll', () => {
                    if (scroll.style !== undefined && container) {
                        if (relativeScrollSize === 100) {
                            container.style.display = 'none';
                        }
                        else {
                            container.style.display = 'block';
                        }
                        if (this._list.isHorizontal) {
                            scroll.style.width = relativeScrollSize + "%";
                        }
                        else {
                            scroll.style.height = relativeScrollSize + "%";
                        }
                    }
                });
                this.scrollbarSize = (relativeScrollSize / 100) * containerSize;
                window.addEventListener('resize', container.dispatchEvent.bind(container, event));
                container.dispatchEvent(event);
            }
        }
        else {
            this.removeScrollbar();
        }
    }
    updateScrollBarPosition(newPosition, animate) {
        if (this._list.size !== null) {
            const layoutInfo = this._list.getLayoutInfo();
            const containerSize = layoutInfo.viewPortSize;
            const fullListSize = layoutInfo.fullListSize;
            let divListSize = layoutInfo.viewPortSize;
            if (this._list.endless) {
                divListSize = divListSize - this.scrollbarSize;
            }
            const maxScrollbarRightOffset = containerSize;
            let pxScrollPosition = this.getRelativeScrollbarPosition(newPosition, fullListSize, divListSize);
            let negativeCurrentPosition = -pxScrollPosition;
            if (pxScrollPosition < 0 && Math.abs(pxScrollPosition) > maxScrollbarRightOffset) {
                pxScrollPosition = negativeCurrentPosition = 0;
            }
            if (this.scrollbarElement instanceof HTMLElement) {
                if (animate === undefined) {
                    if (this._list.isHorizontal) {
                        if (this._list.direction === Ch5Common.DIRECTION[1]) {
                            this.scrollbarElement.style.transform = `translate3d(${-negativeCurrentPosition}px, 0, 0)`;
                        }
                        this.scrollbarElement.style.transform = `translate3d(${negativeCurrentPosition}px, 0, 0)`;
                    }
                    else {
                        this.scrollbarElement.style.transform = `translate3d(0, ${negativeCurrentPosition}px, 0)`;
                    }
                }
                else {
                    const orientation = this._list.isHorizontal ? Ch5List.ORIENTATION[1] : Ch5List.ORIENTATION[0];
                    animate(this.scrollbarElement, negativeCurrentPosition, orientation, -this._lastScrollbarPosition);
                }
            }
            this._lastScrollbarPosition = pxScrollPosition;
        }
    }
    setWrapperTranslateX(tx, animate) {
        if (!isNil(this._list)) {
            if (animate === undefined) {
                this._list.divList.style.transform = `translate3d(${tx}px, 0, 0)`;
                this._list.wrapperTranslateX = tx;
            }
            else {
                animate(this._list.divList, tx, Ch5List.ORIENTATION[1], this._list.wrapperTranslateX);
                this._list.wrapperTranslateX = tx;
            }
        }
    }
    setWrapperTranslateY(ty, animate) {
        if (!isNil(this._list)) {
            if (animate === undefined) {
                this._list.wrapperTranslateY = ty;
                this._list.divList.style.transform = `translate3d(0, ${ty}px, 0)`;
            }
            else {
                animate(this._list.divList, ty, Ch5List.ORIENTATION[0], this._list.wrapperTranslateY);
                this._list.wrapperTranslateY = ty;
            }
        }
    }
    setItemTranslateX(tx, item) {
        if (!isNil(item)) {
            item.translateX = tx;
            item.element.style.transform = `translateX(${item.translateX}px)`;
        }
    }
    setItemTranslateY(ty, item) {
        if (!isNil(item)) {
            item.translateY = ty;
            item.element.style.transform = `translateY(${item.translateY}px)`;
        }
    }
    computePage(coord, start, end) {
        const itemSize = this._list.getItemSize();
        const pageSize = itemSize * this._list.getVisibleItemsPerPage();
        let directionDiff = 0;
        let currentPage = this._list.currentPage;
        if (Math.abs(coord) <= 0) {
            return currentPage;
        }
        if (!isNil(start) && !isNil(end)) {
            directionDiff = Math.abs(start) - Math.abs(end);
        }
        if (coord < 0) {
            if (!isNil(start) && !isNil(end) && directionDiff < 0) {
                this._list.currentPage = currentPage = Math.floor(coord / pageSize);
            }
            else {
                this._list.currentPage = currentPage = Math.ceil(coord / pageSize);
            }
        }
        else {
            if (!isNil(start) && !isNil(end) && directionDiff < 0) {
                this._list.currentPage = currentPage = Math.ceil(coord / pageSize);
            }
            else {
                this._list.currentPage = currentPage = Math.floor(coord / pageSize);
            }
        }
        return currentPage;
    }
    checkAndSetSizes() {
        if (this._list.divList.childElementCount > 0) {
            const divListSizeDetails = this._list.divList.getBoundingClientRect();
            const firstItem = this._list.divList.children[0];
            this._list.divListWidth = divListSizeDetails.width;
            this._list.divListHeight = divListSizeDetails.height;
            this.updateViewportSize();
            if (this._list.orientation === 'vertical') {
                this._list.style.width = '100%';
            }
            setTimeout(() => {
                this._list.itemOffsetHeight = firstItem.offsetHeight;
                this._list.itemOffsetWidth = firstItem.offsetWidth;
                this._list.divListWidth = divListSizeDetails.width;
                this._list.divListHeight = divListSizeDetails.height;
                if (this._list.sizeResolver.fullListSize > this._list.sizeResolver.viewPortSize) {
                    this._list.style.width = '100%';
                }
                this.updateViewportSize();
            });
            if (firstItem instanceof HTMLElement) {
                this._list.itemOffsetHeight = firstItem.offsetHeight;
                this._list.itemOffsetWidth = firstItem.offsetWidth;
            }
            this._list.storedOffsetWidth = this._list.offsetWidth;
            this._list.storedOffsetHeight = this._list.offsetHeight;
        }
    }
    updateViewportSize(viewportSize = 0) {
        if (!viewportSize) {
            const listViewportBoundingRect = this._list.getBoundingClientRect();
            viewportSize = this._list.isHorizontal ? listViewportBoundingRect.width : listViewportBoundingRect.height;
        }
        if (!this._list.isHorizontal) {
            this._list.viewportClientHeight = viewportSize;
            return;
        }
        this._list.viewportClientWidth = viewportSize;
    }
    resolveEndlessViewportSize() {
        if (!this.endless) {
            return;
        }
        const itemsPerPage = this._list.sizeResolver.getItemsPerPage();
        const listSize = this._list.size;
        if (Math.floor(itemsPerPage) === listSize) {
            this._list.endless = false;
        }
        else {
            this._list.endless = true;
        }
    }
    resetItemsTransform() {
        this._list.items = this._list.items.map((elData) => {
            elData.element.style.transform = 'translate3d(0,0,0)';
            return Object.assign(Object.assign({}, elData), { translateX: 0, translateY: 0 });
        });
    }
    isPositionExceedingMaximumBoundary() {
        if (!this._list.animationHelper) {
            return false;
        }
        const { maxOffsetTranslate } = this._list.animationHelper;
        const { currentYPosition, currentXPosition, isHorizontal } = this._list;
        if (!maxOffsetTranslate) {
            return false;
        }
        if (this._list && this._list.isLtr()) {
            if ((isHorizontal && currentXPosition < maxOffsetTranslate)
                || (!isHorizontal && currentYPosition < maxOffsetTranslate)) {
                return true;
            }
        }
        else {
            if ((isHorizontal && currentXPosition > maxOffsetTranslate)
                || (!isHorizontal && currentYPosition > maxOffsetTranslate)) {
                return true;
            }
            ;
        }
        return false;
    }
    getRelativeScrollbarPosition(position, listSize, viewPortsize) {
        let percentageScrollPosition = (position / listSize * 100) % 100;
        let direction = 1;
        if ((this._list.isVertical || this._list.direction === Ch5Common.DIRECTION[0]) && position > 0) {
            percentageScrollPosition = 100 - percentageScrollPosition;
            direction = -1;
        }
        if (this._list.isHorizontal && this._list.direction === Ch5Common.DIRECTION[1] && position < 0) {
            percentageScrollPosition = 100 + percentageScrollPosition;
        }
        const pxScrollPosition = Math.round(percentageScrollPosition / 100 * viewPortsize) * direction;
        return pxScrollPosition;
    }
    computeItemLocation(currentListPosition) {
        const currentPosition = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
        const listContainerSize = this._list.previousSize * this._list.getItemSize();
        let initialListPosition = currentPosition % listContainerSize;
        if (currentListPosition > 0) {
            initialListPosition = listContainerSize - currentPosition;
        }
        initialListPosition = initialListPosition <= 0 ? initialListPosition : -initialListPosition;
        return initialListPosition;
    }
    processTemplateForVars(template, currentVars) {
        for (const key in currentVars) {
            const strReplace = `{{${key}}}`;
            const replaceWith = currentVars[key];
            template = this.textReplace(template, strReplace, replaceWith, true);
        }
        return template;
    }
    textReplace(fullText, toReplace, replaceWith, replaceGlobal) {
        let result = "";
        if (fullText !== null && fullText !== undefined) {
            if (replaceGlobal === true) {
                result = fullText.replace(new RegExp(toReplace, 'g'), replaceWith);
            }
            else {
                result = fullText.replace(new RegExp(toReplace), replaceWith);
            }
        }
        return result;
    }
    createScrollbar() {
        if (!this._list.scrollbar) {
            return;
        }
        if (this._scrollbarElement instanceof HTMLElement) {
            this.removeScrollbar();
        }
        const _scrollbarContainer = document.createElement('div');
        const listPosition = this._list.isHorizontal ? this._list.currentXPosition : this._list.currentYPosition;
        this._scrollbarElement = document.createElement('div');
        this._scrollbarElement.classList.add('scrollbar');
        _scrollbarContainer.classList.add('scrollbar-container');
        _scrollbarContainer.appendChild(this._scrollbarElement);
        this._list.appendChild(_scrollbarContainer);
        this.updateScrollBarPosition(listPosition);
    }
    prepareStyleSheet() {
        const stylesheet = {
            [`#${this._list.getCrId()}`]: {
                'white-space': this._list.orientation === Ch5List.ORIENTATION[0] ? 'none' : 'nowrap',
                'will-change': 'transform',
                'transition': 'height .3s ease-out'
            },
            [`#${this._list.getCrId()} .${Ch5List.ITEMCLASS}`]: Object.assign({}, this.listItemCSS())
        };
        return {
            toString: () => {
                let _stylesheet = '';
                for (const element in stylesheet) {
                    if (stylesheet.hasOwnProperty(element)) {
                        _stylesheet += ` ${element}{`;
                        for (const property in stylesheet[element]) {
                            if (stylesheet[element].hasOwnProperty(property)) {
                                let propertyValue = stylesheet[element][property];
                                if (!isNil(propertyValue) && propertyValue !== '') {
                                    propertyValue = propertyValue.trim();
                                    _stylesheet += `${property}: ${propertyValue};`;
                                }
                            }
                        }
                        _stylesheet += '}';
                    }
                }
                return _stylesheet;
            }
        };
    }
    initListMaxWidthAndHeight() {
        if (!this._list.maxWidth) {
            this._list.maxWidth = '100%';
        }
        if (!this._list.maxHeight) {
            this._list.maxHeight = '100%';
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3QtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbGlzdC9jaDUtbGlzdC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBb0IsTUFBTSxZQUFZLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSxRQUFRLEVBQXFCLE1BQU0sd0NBQXdDLENBQUM7QUFDckYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPL0QsTUFBTSxPQUFPLGVBQWdCLFNBQVEscUJBQXFCO0lBQTFEOztRQUVRLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBUzFCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsc0JBQWlCLEdBQXVCLEVBQWlCLENBQUM7UUFDMUQsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBRW5DLG9CQUFlLEdBQXNCLEVBQXVCLENBQUM7SUF5MkJ0RSxDQUFDO0lBcjJCQSxJQUFXLGdCQUFnQixDQUFDLE9BQTJCO1FBQ3RELElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzlDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7U0FDakM7SUFDRixDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQztJQUVNLGdCQUFnQjtRQUV0QixJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxZQUFZLG1CQUFtQixDQUFDLEVBQUU7WUFDakUsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUF3QixDQUFDO1NBQzNHO2FBQU07WUFDTixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDbkM7UUFFRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hFLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO2VBQzVFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3REFBd0QsRUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0csVUFBVSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUU5QixPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBRU0sb0JBQW9CLENBQUMsVUFBa0I7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQU9NLGVBQWUsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLFlBQTJCO1FBQzdFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFFdkQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsRCxXQUFXLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25DLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUc3QyxNQUFNLGlCQUFpQixHQUF3QixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBRWhDLHlCQUF5QjtpQkFDdkIsOEJBQThCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQWlCLENBQUMsQ0FBQztZQUUzRix5QkFBeUI7aUJBQ3ZCLGdDQUFnQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFpQixDQUFDLENBQUM7U0FDN0Y7UUFFRCxNQUFNLGVBQWUsR0FBSSxpQkFBeUMsYUFBekMsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBMEIsT0FBTyxDQUFDO1FBQzVFLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRCxXQUFXLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR3pDLHlCQUF5QixDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQy9HLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUd4RSxJQUFJLFlBQVksS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsT0FBTyxXQUEwQixDQUFDO0lBQ25DLENBQUM7SUFFTyxvQ0FBb0MsQ0FBQyxhQUFrQjtRQUM5RCxNQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7UUFDdEIsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELEtBQUssTUFBTSxPQUFPLElBQUksV0FBVyxFQUFFO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Q7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFJTSxXQUFXO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDMUUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNsRyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDM0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBRTlFLE9BQU87WUFDTixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxVQUFVO1NBQ2xCLENBQUE7SUFDRixDQUFDO0lBRU0sU0FBUztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFakQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sS0FBSyxHQUFxQixDQUFDLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQixJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUU3RCxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN4QixPQUFPLElBQUksY0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN4QixPQUFPLElBQUksY0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN6QixPQUFPLElBQUksZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN6QixPQUFPLElBQUksZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDO1NBQ3BDO0lBQ0YsQ0FBQztJQUtNLFVBQVUsQ0FBQyxPQUFvQixFQUFFLFlBQTJCLEVBQUUsU0FBa0IsS0FBSztRQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUVsRCxJQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtlQUNwQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2VBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUM5QjtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUNOLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO2VBQ3JCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7ZUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQzlCO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMxRDtRQUdELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsK0JBQStCLENBQUM7UUFDaEosTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUM7UUFDcEksTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRWpGLE9BQU8sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxlQUFlLElBQUksMkJBQTJCLEVBQUUsQ0FBQztRQUd4RSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUMxQixPQUFPO1NBQ1A7UUFNRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLE9BQU8sT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7WUFJRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsQ0FBQztZQUV2RCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUd2RCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcseUJBQXlCLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQy9ELFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDekU7WUFFRCxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBR2xDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDbkcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBRTNDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO2dCQUc5RSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFFN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlFO2FBRUQ7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVDO2FBQU07WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUU7Z0JBQ3BFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLHVDQUFZLE1BQU0sS0FBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUU7WUFDbkQsQ0FBQyxDQUFDLENBQUM7U0FDSDtRQUlELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDbkMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0JBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQkFDN0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUUxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUl0RSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixDQUNoRCxRQUFRLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUF5QyxDQUNwRCxDQUFDO1FBRUYsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUVoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUIsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUUvRCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFFMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxZQUFZLElBQUksWUFBWSxFQUFFO2dCQUN2RCxPQUFPO2FBQ1A7UUFDRixDQUFDLENBQUMsQ0FBQztJQUVKLENBQUM7SUFFTSxlQUFlO1FBQ3JCLFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFakQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLFlBQVksbUJBQW1CLENBQUMsRUFBRTtnQkFDOUQsWUFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPO2FBQ1A7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1lBRTFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9HLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1lBRXhGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7YUFDakc7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQzthQUNqRztZQUVELElBQUksSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEVBQUU7Z0JBQzlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUM7aUJBQzVFO3FCQUFNO29CQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUM7aUJBQzVFO2FBQ0Q7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlEO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFFekcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFNUQsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUUvRCxJQUFJLFlBQVksR0FBRyxDQUFDLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLElBQUksWUFBWSxFQUFFO2dCQUN6RSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUMzQjtZQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFdkQsSUFBSSxZQUFZLElBQUksWUFBWSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELE9BQU87YUFDUDtZQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUDtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUUzRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2dCQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFFbkcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUU7b0JBQzdELFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFFekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3hEO2FBQ0Q7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFNTSxxQ0FBcUM7UUFHM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1lBQ25DLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFLTSxlQUFlO1FBRXJCLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLFlBQVksV0FBVyxFQUFFO1lBR3JGLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDOUM7WUFHRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUM5QjtJQUNGLENBQUM7SUFHTSxlQUFlLENBQUMsaUJBQThCO1FBRXBELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixJQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ3hCLGlCQUFpQixLQUFLLFNBQVM7WUFDL0IsaUJBQWlCLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDeEMsSUFBSSxDQUFDLGlCQUFpQjtZQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFDakQ7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRTlDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDekMsTUFBTSxTQUFTLEdBQUksSUFBSSxDQUFDLGlCQUFpQyxDQUFDLGFBQWEsQ0FBQztZQUN4RSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFdEMsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUU5QyxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksVUFBVSxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUM1RSxTQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixPQUFPO2FBQ1A7WUFFRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFXLENBQUM7WUFHakYsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixTQUF5QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQzFELElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksU0FBUyxFQUFFO3dCQUs1QyxJQUFJLGtCQUFrQixLQUFLLEdBQUcsRUFBRTs0QkFDL0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3lCQUNqQzs2QkFBTTs0QkFDTixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7eUJBQ2xDO3dCQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7NEJBQzNCLE1BQXNCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7eUJBQy9EOzZCQUFNOzRCQUNMLE1BQXNCLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7eUJBQ2hFO3FCQUNEO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2dCQUlILElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7Z0JBRWhFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUcsU0FBeUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxTQUF5QixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRDtTQUNEO2FBQU07WUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDdkI7SUFDRixDQUFDO0lBT00sdUJBQXVCLENBQUMsV0FBbUIsRUFBRSxPQUEwQjtRQUM3RSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUU3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQzdDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDOUMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQTtZQUc1QyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBRTFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUMvQztZQUVELE1BQU0sdUJBQXVCLEdBQUcsYUFBYSxDQUFDO1lBQzlDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDakcsSUFBSSx1QkFBdUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1lBRWhELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyx1QkFBdUIsRUFBRTtnQkFDakYsZ0JBQWdCLEdBQUcsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO1lBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLFlBQVksV0FBVyxFQUFFO2dCQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7d0JBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLHVCQUF1QixXQUFXLENBQUM7eUJBQzNGO3dCQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGVBQWUsdUJBQXVCLFdBQVcsQ0FBQztxQkFDMUY7eUJBQU07d0JBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLHVCQUF1QixRQUFRLENBQUM7cUJBQzFGO2lCQUNEO3FCQUFNO29CQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5RixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2lCQUNuRzthQUNEO1lBRUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO1NBQy9DO0lBQ0YsQ0FBQztJQU1NLG9CQUFvQixDQUFDLEVBQVUsRUFBRSxPQUEwQjtRQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZUFBZSxFQUFFLFdBQVcsQ0FBQTtnQkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7YUFDbEM7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7YUFDbEM7U0FDRDtJQUNGLENBQUM7SUFNTSxvQkFBb0IsQ0FBQyxFQUFVLEVBQUUsT0FBMEI7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsRUFBRSxRQUFRLENBQUE7YUFDakU7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7YUFDbEM7U0FDRDtJQUNGLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxFQUFVLEVBQUUsSUFBc0I7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUM7U0FDbEU7SUFDRixDQUFDO0lBRU0saUJBQWlCLENBQUMsRUFBVSxFQUFFLElBQXNCO1FBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGNBQWMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDO1NBQ2xFO0lBQ0YsQ0FBQztJQVVNLFdBQVcsQ0FBQyxLQUFhLEVBQUUsS0FBYyxFQUFFLEdBQVk7UUFFN0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUsxQyxNQUFNLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sV0FBVyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2FBQ25FO1NBQ0Q7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQzthQUNwRTtTQUNEO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVNLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtZQUM3QyxNQUFNLGtCQUFrQixHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQWdCLENBQUM7WUFFaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUNyRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUNoQztZQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBR2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztnQkFFckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO29CQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2lCQUNoQztnQkFFRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksU0FBUyxZQUFZLFdBQVcsRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO2FBQ25EO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1NBQ3hEO0lBQ0YsQ0FBQztJQU9NLGtCQUFrQixDQUFDLGVBQXVCLENBQUM7UUFFakQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNsQixNQUFNLHdCQUF3QixHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDMUYsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQztTQUMxRztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFlBQVksQ0FBQztZQUMvQyxPQUFPO1NBQ1A7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLFlBQVksQ0FBQztJQUMvQyxDQUFDO0lBUU0sMEJBQTBCO1FBR2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE9BQU87U0FDUDtRQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWpDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQzNCO2FBQU07WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDRixDQUFDO0lBRU8sbUJBQW1CO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRTtZQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7WUFDdEQsdUNBQVksTUFBTSxLQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBRztRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxrQ0FBa0M7UUFFekMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUMxRCxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV4RSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLElBQ0MsQ0FBQyxZQUFZLElBQUksZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7bUJBQ3BELENBQUMsQ0FBQyxZQUFZLElBQUksZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsRUFDMUQ7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDWjtTQUNEO2FBQU07WUFDTixJQUNDLENBQUMsWUFBWSxJQUFJLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO21CQUNwRCxDQUFDLENBQUMsWUFBWSxJQUFJLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLEVBQzFEO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ1o7WUFBQSxDQUFDO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFVTyw0QkFBNEIsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsWUFBb0I7UUFDNUYsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2pFLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUdsQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDL0Ysd0JBQXdCLEdBQUcsR0FBRyxHQUFHLHdCQUF3QixDQUFDO1lBQzFELFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDL0Ysd0JBQXdCLEdBQUcsR0FBRyxHQUFHLHdCQUF3QixDQUFDO1NBQzFEO1FBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFL0YsT0FBTyxnQkFBZ0IsQ0FBQztJQUN6QixDQUFDO0lBU08sbUJBQW1CLENBQUMsbUJBQTJCO1FBRXRELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQzVHLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5RSxJQUFJLG1CQUFtQixHQUFHLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUU5RCxJQUFJLG1CQUFtQixHQUFHLENBQUMsRUFBRTtZQUM1QixtQkFBbUIsR0FBRyxpQkFBaUIsR0FBRyxlQUFlLENBQUM7U0FDMUQ7UUFHRCxtQkFBbUIsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1FBRTVGLE9BQU8sbUJBQW1CLENBQUM7SUFDNUIsQ0FBQztJQUVPLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFFbkUsS0FBSyxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUU7WUFDOUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNoQyxNQUFNLFdBQVcsR0FBSSxXQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUdPLFdBQVcsQ0FBQyxRQUFnQixFQUFFLFNBQWlCLEVBQUUsV0FBbUIsRUFBRSxhQUFzQjtRQUNuRyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDaEQsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ04sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDOUQ7U0FDRDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUtPLGVBQWU7UUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQzFCLE9BQU87U0FDUDtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixZQUFZLFdBQVcsRUFBRTtZQUNsRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDdkI7UUFFRCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFFekcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEQsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8saUJBQWlCO1FBRXhCLE1BQU0sVUFBVSxHQUF1QjtZQUN0QyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQ3BGLGFBQWEsRUFBRSxXQUFXO2dCQUMxQixZQUFZLEVBQUUscUJBQXFCO2FBQ25DO1lBRUQsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLG9CQUM5QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQ3JCO1NBQ0QsQ0FBQztRQUVGLE9BQU87WUFDTixRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNkLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFFckIsS0FBSyxNQUFNLE9BQU8sSUFBSSxVQUFVLEVBQUU7b0JBQ2pDLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDdkMsV0FBVyxJQUFJLElBQUksT0FBTyxHQUFHLENBQUM7d0JBRTlCLEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUMzQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ2pELElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLEtBQUssRUFBRSxFQUFFO29DQUNsRCxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO29DQUNyQyxXQUFXLElBQUksR0FBRyxRQUFRLEtBQUssYUFBYSxHQUFHLENBQUM7aUNBQ2hEOzZCQUNEO3lCQUNEO3dCQUVELFdBQVcsSUFBSSxHQUFHLENBQUM7cUJBQ25CO2lCQUNEO2dCQUVELE9BQU8sV0FBVyxDQUFDO1lBQ3BCLENBQUM7U0FDRCxDQUFBO0lBQ0YsQ0FBQztJQUVPLHlCQUF5QjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUM5QjtJQUNGLENBQUM7Q0FDRCJ9