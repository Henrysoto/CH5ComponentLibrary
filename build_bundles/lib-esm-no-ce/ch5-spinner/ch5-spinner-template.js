import { Ch5Spinner } from "./ch5-spinner";
import { Ch5AugmentVarSignalsNames } from "../ch5-common/ch5-augment-var-signals-names";
export class Ch5SpinnerTemplate {
    constructor(element) {
        this._templateDefined = false;
        this._element = {};
        this._wrapperElement = {};
        this._scrollableArea = {};
        this._highlightElement = {};
        this._overlayElement = {};
        this._templateElement = {};
        this._childrenObject = null;
        this._initialchildrenObject = null;
        this._appendedItemIndex = 0;
        this._prependedItemIndex = 0;
        this._clonedItems = {};
        this.element = element;
        this.checkTemplateDefined();
        if (this._templateDefined === true) {
            this.templateElement = this._element.querySelector('template');
        }
    }
    destruct() {
        this.childrenObject = null;
        this.wrapperElement = {};
        this.scrollableArea = {};
        this.templateElement = {};
        this.prependedItemIndex = this.element.size;
    }
    set element(element) {
        if (element !== undefined || element !== null) {
            this._element = element;
        }
    }
    get element() {
        return this._element;
    }
    set wrapperElement(element) {
        if (element !== undefined || element !== null) {
            this._wrapperElement = element;
        }
    }
    get wrapperElement() {
        return this._wrapperElement;
    }
    set scrollableArea(area) {
        if (area !== undefined || area !== null) {
            this._scrollableArea = area;
        }
    }
    get scrollableArea() {
        return this._scrollableArea;
    }
    set highlightElement(element) {
        if (element !== undefined || element !== null) {
            this._highlightElement = element;
        }
    }
    get highlightElement() {
        return this._highlightElement;
    }
    set templateElement(template) {
        if (template !== undefined || template !== null) {
            this._templateElement = template;
            this.iconPositioning();
        }
    }
    get templateElement() {
        return this._templateElement;
    }
    set childrenObject(childrenObject) {
        if (childrenObject !== undefined || childrenObject !== null) {
            this._childrenObject = childrenObject;
        }
    }
    get childrenObject() {
        return this._childrenObject;
    }
    set initialchildrenObject(childrenObject) {
        if (childrenObject !== undefined || childrenObject !== null) {
            this._initialchildrenObject = childrenObject;
        }
    }
    get initialchildrenObject() {
        return this._initialchildrenObject;
    }
    set overlayElement(element) {
        if (element !== undefined || element !== null) {
            this._overlayElement = element;
        }
    }
    get overlayElement() {
        return this._overlayElement;
    }
    set appendedItemIndex(index) {
        if (index > this.element.size ||
            (index !== this.appendedItemIndex &&
                (index === undefined || index === null))) {
            index = 0;
        }
        if (index >= this.element.size) {
            index = 0;
        }
        this._appendedItemIndex = index;
    }
    get appendedItemIndex() {
        return this._appendedItemIndex;
    }
    set prependedItemIndex(index) {
        if (index > this.element.size ||
            (index !== this.prependedItemIndex &&
                (index === undefined || index === null))) {
            index = 0;
        }
        if (index <= 0) {
            index = this.element.size - 1;
        }
        this._prependedItemIndex = index;
    }
    get prependedItemIndex() {
        return this._prependedItemIndex;
    }
    addChild(child) {
        if (child !== undefined && child !== null) {
            child.classList.add(Ch5Spinner.primaryCssClass + '__item');
            child.style.display = 'flex';
            if (this.childrenObject === undefined || this.childrenObject === null) {
                this.childrenObject = [child];
                this.initialchildrenObject = [child];
            }
            else {
                this.childrenObject.push(child);
                this.initialchildrenObject.push(child);
            }
        }
        return child;
    }
    generateTemplate(size) {
        const itemHeightValue = this.element.getItemHeightValue();
        const itemHeightMeasurementUnit = this.element.getItemHeightMeasurementUnit();
        const visibleItemScroll = this.element.visibleItemScroll;
        const endless = this.element.endless;
        this.overlayElement = document.createElement('div');
        this.overlayElement.classList.add(Ch5Spinner.primaryCssClass + '__overlay');
        this.wrapperElement = document.createElement('div');
        this.wrapperElement.classList.add(Ch5Spinner.primaryCssClass + '__wrapper');
        if (this.element.resize === true) {
            this.wrapperElement.style.width = 'auto';
        }
        this.scrollableArea = document.createElement('div');
        this.scrollableArea.classList.add(Ch5Spinner.primaryCssClass + '__scrollarea--animate');
        this.highlightElement = document.createElement('div');
        this.highlightElement.style.height = this._element.itemHeight;
        this.highlightElement.style.top = this.element.getHighlightOffset();
        this.highlightElement.classList.add(Ch5Spinner.primaryCssClass + '__highlight');
        if (this._templateDefined === false) {
            this.addDefaultTemplate();
        }
        else {
            this.cleanTheTemplate();
            this.element.label = '';
        }
        for (let i = 0; i < size; i++) {
            this.invokeChildElement(i);
        }
        if (this.childrenObject !== null) {
            if (endless === true) {
                const childrenObject = this.childrenObject;
                for (let i = childrenObject.length - 1; i >= childrenObject.length - Math.ceil(visibleItemScroll / 2); i--) {
                    this.pushElementToClonedItemsList('prepended', i, true);
                }
                for (let i = 0; i < Math.ceil(visibleItemScroll / 2); i++) {
                    this.pushElementToClonedItemsList('appended', i);
                }
                const clonedItemsLength = this._clonedItems.prepended.length;
                const marginTopNegativeOffset = -(clonedItemsLength * itemHeightValue) + itemHeightMeasurementUnit;
                this._clonedItems.prepended[0].style.marginTop = marginTopNegativeOffset;
                this._clonedItems.prepended.forEach((element, index) => {
                    this.scrollableArea.appendChild(element);
                });
            }
            this.childrenObject.forEach(spinnerItem => {
                this.scrollableArea.appendChild(spinnerItem);
            });
            if (endless === true) {
                this._clonedItems.appended.forEach(element => {
                    this.scrollableArea.appendChild(element);
                });
            }
            if (this.childrenObject !== undefined && this.childrenObject !== null) {
                for (let i = this.childrenObject.length - 1; i >= 0; i--) {
                    this.childrenObject[i].style.height = this._element.itemHeight;
                }
            }
        }
        this.wrapperElement.style.height = itemHeightValue * visibleItemScroll + itemHeightMeasurementUnit;
        this.wrapperElement.appendChild(this.highlightElement);
        this.wrapperElement.appendChild(this.scrollableArea);
        if (this._element.querySelectorAll('.' + Ch5Spinner.primaryCssClass + '__overlay').length
            || this._element.querySelectorAll('.' + Ch5Spinner.primaryCssClass + '__wrapper').length) {
            const overlayEle = Array.from(this._element.querySelectorAll('.' + Ch5Spinner.primaryCssClass + '__overlay'));
            const wrapperEle = Array.from(this._element.querySelectorAll('.' + Ch5Spinner.primaryCssClass + '__wrapper'));
            overlayEle.forEach(e => e.parentNode.removeChild(e));
            wrapperEle.forEach(e => e.parentNode.removeChild(e));
        }
        this._element.appendChild(this.wrapperElement);
        this._element.appendChild(this.overlayElement);
        if (this.childrenObject !== null && this.childrenObject !== undefined) {
            for (let i = this.childrenObject.length - 1; i >= 0; i--) {
                const child = this.childrenObject[i];
                const label = child.querySelector('.' + Ch5Spinner.primaryCssClass + '__label');
                if (label !== null && label.hasAttribute('data-ch5-textcontent-placeholder')) {
                    const textcontent = label.getAttribute('data-ch5-textcontent-placeholder');
                    label.removeAttribute('data-ch5-textcontent-placeholder');
                    label.setAttribute('data-ch5-textcontent', textcontent);
                }
            }
            if (parseInt(this._element.itemHeight, 10) <= 0 || isNaN(parseInt(this._element.itemHeight, 10))) {
                this.handleDefaultItemHeight(this.childrenObject[0]);
            }
        }
    }
    toggleOverlay(show = false, onTop = false) {
        if (onTop === true) {
            this.overlayElement.style.zIndex = '999999';
        }
        else {
            this.overlayElement.style.zIndex = '';
        }
        if (show === true) {
            this.overlayElement.style.display = 'block';
            return;
        }
        this.overlayElement.style.display = 'none';
    }
    setActiveItem(item) {
        try {
            const element = this.getSelectedItem(item);
            if (element !== null) {
                this.removeActiveItemClass();
                element.classList.add(Ch5Spinner.primaryCssClass + '--active');
                this.element.selectedItem = element;
            }
        }
        catch (e) {
            console.error(Ch5SpinnerTemplate.ERROR.structure);
        }
    }
    getSelectedItem(index) {
        try {
            if (this.childrenObject !== null) {
                const element = this.childrenObject[index];
                if (element !== undefined && element !== null) {
                    return element;
                }
            }
        }
        catch (e) {
            console.error(Ch5SpinnerTemplate.ERROR.structure);
        }
        return null;
    }
    handleDefaultItemHeight(child) {
        let image = null;
        let time = 1;
        let label = null;
        let count = 0;
        let itemHeight = 0;
        const getBoundingRect = () => {
            if (count % 8 === 0) {
                itemHeight = (image && (image.offsetHeight || image.getBoundingClientRect().height) ||
                    (label && (label.offsetHeight || label.getBoundingClientRect().height)) ||
                    (child.offsetHeight || child.getBoundingClientRect().height));
            }
            count++;
        };
        time += this.element.signalValueSyncTimeout / 60;
        if (this.element.signalValueSyncTimeout > time) {
            this.toggleOverlay(true, true);
            if (child) {
                image = child.querySelector('ch5-image');
                label = child.querySelector('label');
                getBoundingRect();
                if (itemHeight > 0) {
                    this.element.itemHeight = itemHeight + '';
                }
            }
        }
        else {
            this.toggleOverlay(false);
        }
    }
    resolveId(index, elements) {
        if (elements.length === 0) {
            return;
        }
        const documentContainer = document.createElement('template');
        Array.from(elements).forEach((e) => documentContainer.content.appendChild(e));
        if (this.element.indexId !== '') {
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(documentContainer, index, this.element.indexId);
            Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(documentContainer, index, this.element.indexId);
        }
        return documentContainer.content;
    }
    iconPositioning() {
        try {
            if (this.templateElement !== null && this.templateElement.content !== undefined) {
                const icon = this.templateElement.content.querySelector('.' + Ch5Spinner.primaryCssClass + '__icon');
                const label = this.templateElement.content.querySelector('.' + Ch5Spinner.primaryCssClass + '__label');
                const iconPosition = this.element.iconPosition;
                if (icon !== null && label !== null) {
                    if (iconPosition === 'last') {
                        label.parentNode.insertBefore(icon, label.nextSibling);
                    }
                    else {
                        label.parentNode.insertBefore(icon, label.previousSibling);
                    }
                }
            }
        }
        catch (e) {
            console.error(Ch5SpinnerTemplate.ERROR.structure, e);
        }
    }
    pushElementToClonedItemsList(type = 'append', elementIndex, addOnTop = false) {
        if (this.childrenObject !== null && this.childrenObject[elementIndex] !== undefined) {
            const clonedNode = this.childrenObject[elementIndex].cloneNode(true);
            clonedNode.classList.add('cloned');
            clonedNode.style.height = this.element.itemHeight;
            if (this._clonedItems[type.toString()] === undefined) {
                this._clonedItems[type.toString()] = [clonedNode];
                return;
            }
            if (!addOnTop) {
                this._clonedItems[type].push(clonedNode);
            }
            else {
                this._clonedItems[type].unshift(clonedNode);
            }
        }
    }
    invokeChildElement(index) {
        const template = this.element.querySelector('template');
        let childrenObject = document.importNode(template.content, true);
        if (childrenObject.children.length > 0) {
            const childrenObjectUpdated = this.resolveId(index, childrenObject.childNodes);
            if (childrenObjectUpdated !== undefined) {
                childrenObject = childrenObjectUpdated;
            }
            const children = childrenObject.children[0];
            children.setAttribute('data-initial-index', String(index));
            children.setAttribute('role', 'option');
            Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(children, this.element.getAttribute("contractname") || '', parseInt(this.element.getAttribute("booleanjoinoffset") || '0', 10) || 0, parseInt(this.element.getAttribute("numericJoinOffset") || '0', 10) || 0, parseInt(this.element.getAttribute("stringJoinOffset") || '0', 10) || 0);
            this.addChild(childrenObject.children[0]);
        }
    }
    checkTemplateDefined() {
        if (this._element.querySelector('template') !== null) {
            this._templateDefined = true;
        }
    }
    addDefaultTemplate() {
        const template = document.createElement('template');
        const icon = document.createElement('ch5-image');
        const label = document.createElement('label');
        const wrapper = document.createElement('div');
        const fragment = document.createDocumentFragment();
        icon.classList.add(Ch5Spinner.primaryCssClass + '__icon');
        if (this.element.receiveStateUrl !== '') {
            icon.setAttribute('receiveStateUrl', this.element.receiveStateUrl);
            icon.setAttribute('refreshrate', '0');
            wrapper.appendChild(icon);
        }
        label.classList.add(Ch5Spinner.primaryCssClass + '__label');
        if (this.element.receiveStateLabel !== '') {
            label.setAttribute('data-ch5-textcontent-placeholder', this.element.receiveStateLabel);
        }
        else {
            label.innerHTML = this.element.label;
        }
        wrapper.appendChild(label);
        fragment.appendChild(wrapper);
        template.content.appendChild(fragment);
        this._element.appendChild(template);
        this.templateElement = template;
    }
    cleanTheTemplate() {
        const template = this.element.querySelector('template');
        if (template !== undefined && template !== null) {
            let templateNodes = template.content.children;
            if (templateNodes.length === 0 && template.childNodes.length > 0) {
                templateNodes = template.children;
            }
            for (let i = templateNodes.length - 1; i >= 0; i--) {
                const node = templateNodes[i];
                if (node.nodeType !== 1) {
                    templateNodes[i].remove();
                }
            }
        }
    }
    removeActiveItemClass() {
        try {
            const childrenObject = this.childrenObject;
            for (let i = childrenObject.length - 1; i >= 0; i--) {
                const element = childrenObject[i];
                const activeClassName = Ch5Spinner.primaryCssClass + '--active';
                if (element.classList.contains(activeClassName)) {
                    element.classList.remove(activeClassName);
                }
            }
        }
        catch (e) {
            console.error(Ch5SpinnerTemplate.ERROR.structure);
        }
    }
}
Ch5SpinnerTemplate.ERROR = {
    structure: 'Wrong template structure'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNwaW5uZXItdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc3Bpbm5lci9jaDUtc3Bpbm5lci10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXhGLE1BQU0sT0FBTyxrQkFBa0I7SUF5SDdCLFlBQVksT0FBbUI7UUFoSHhCLHFCQUFnQixHQUFZLEtBQWdCLENBQUM7UUFTNUMsYUFBUSxHQUFlLEVBQWdCLENBQUM7UUFTeEMsb0JBQWUsR0FBZ0IsRUFBaUIsQ0FBQztRQVFqRCxvQkFBZSxHQUFnQixFQUFpQixDQUFDO1FBT2pELHNCQUFpQixHQUFnQixFQUFpQixDQUFDO1FBVW5ELG9CQUFlLEdBQWdCLEVBQWlCLENBQUM7UUFTakQscUJBQWdCLEdBQXdCLEVBQXlCLENBQUM7UUFTbEUsb0JBQWUsR0FBeUIsSUFBSSxDQUFDO1FBVzdDLDJCQUFzQixHQUF5QixJQUFJLENBQUM7UUFXcEQsdUJBQWtCLEdBQVcsQ0FBVyxDQUFDO1FBV3pDLHdCQUFtQixHQUFXLENBQVcsQ0FBQztRQVEzQyxpQkFBWSxHQUlmLEVBR0gsQ0FBQztRQUlBLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBd0IsQ0FBQztTQUN2RjtJQUNILENBQUM7SUFFTSxRQUFRO1FBRWIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFpQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBaUIsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQXlCLENBQUM7UUFFakQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFPRCxJQUFXLE9BQU8sQ0FBQyxPQUFtQjtRQUVwQyxJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUN6QjtJQUNILENBQUM7SUFPRCxJQUFXLE9BQU87UUFFaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFPRCxJQUFXLGNBQWMsQ0FBQyxPQUFvQjtRQUU1QyxJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUNoQztJQUNILENBQUM7SUFPRCxJQUFXLGNBQWM7UUFFdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFPRCxJQUFXLGNBQWMsQ0FBQyxJQUFpQjtRQUV6QyxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNILENBQUM7SUFPRCxJQUFXLGNBQWM7UUFFdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFPRCxJQUFXLGdCQUFnQixDQUFDLE9BQW9CO1FBRTlDLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBT0QsSUFBVyxnQkFBZ0I7UUFFekIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQU9ELElBQVcsZUFBZSxDQUFDLFFBQTZCO1FBRXRELElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQU9ELElBQVcsZUFBZTtRQUV4QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBT0QsSUFBVyxjQUFjLENBQUMsY0FBb0M7UUFDNUQsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDM0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBT0QsSUFBVyxjQUFjO1FBRXZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBT0QsSUFBVyxxQkFBcUIsQ0FBQyxjQUFvQztRQUNuRSxJQUFJLGNBQWMsS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUMzRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsY0FBYyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQU9ELElBQVcscUJBQXFCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JDLENBQUM7SUFPRCxJQUFXLGNBQWMsQ0FBQyxPQUFvQjtRQUU1QyxJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUNoQztJQUNILENBQUM7SUFPRCxJQUFXLGNBQWM7UUFFdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFPRCxJQUFXLGlCQUFpQixDQUFDLEtBQWE7UUFFeEMsSUFDRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3pCLENBQ0UsS0FBSyxLQUFLLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ2hDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQ3hDLEVBQ0Q7WUFDQSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUM5QixLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFPRCxJQUFXLGlCQUFpQjtRQUUxQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNqQyxDQUFDO0lBT0QsSUFBVyxrQkFBa0IsQ0FBQyxLQUFhO1FBRXpDLElBQ0UsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN6QixDQUNFLEtBQUssS0FBSyxJQUFJLENBQUMsa0JBQWtCO2dCQUNqQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUN4QyxFQUNEO1lBQ0EsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBRUQsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQU9ELElBQVcsa0JBQWtCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFRTSxRQUFRLENBQUMsS0FBa0I7UUFFaEMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUMzRCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFFN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtnQkFDckUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFvQixDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxxQkFBdUMsQ0FBQyxJQUFJLENBQUMsS0FBb0IsQ0FBQyxDQUFDO2FBQzFFO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFTTSxnQkFBZ0IsQ0FBQyxJQUFZO1FBRWxDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxRCxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUM5RSxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDekQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFNckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBSTVFLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUc1RSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDLENBQUM7UUFFeEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFJaEYsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxFQUFFO1lBQ25DLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDekI7UUFHRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFFaEMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUNwQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBK0IsQ0FBQztnQkFHNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekQ7Z0JBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2xEO2dCQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM3RCxNQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLENBQUMsR0FBRyx5QkFBeUIsQ0FBQztnQkFFbkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztnQkFHekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7YUFFSjtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JFLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7aUJBQ2pGO2FBQ0Y7U0FDRjtRQUdELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLEdBQUcsaUJBQWlCLEdBQUcseUJBQXlCLENBQUM7UUFDbkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBR3JELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxNQUFNO2VBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQzFGLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlHLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3JFLEtBQUssSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDLGNBQWdDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzRSxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsY0FBZ0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQWdCLENBQUM7Z0JBRS9GLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7b0JBQzVFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsa0NBQWtDLENBQVcsQ0FBQztvQkFDckYsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO29CQUMxRCxLQUFLLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUN6RDthQUNGO1lBS0QsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDaEcsSUFBSSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxjQUFnQyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDO2FBQ3hGO1NBRUY7SUFDSCxDQUFDO0lBU00sYUFBYSxDQUFDLE9BQWdCLEtBQUssRUFBRSxRQUFpQixLQUFLO1FBRWhFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDNUMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBUU0sYUFBYSxDQUFDLElBQVk7UUFFL0IsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0MsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUNwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQ3JDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQVFNLGVBQWUsQ0FBQyxLQUFhO1FBRWxDLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO2dCQUNoQyxNQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsY0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFOUQsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7b0JBQzdDLE9BQU8sT0FBTyxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBR00sdUJBQXVCLENBQUMsS0FBa0I7UUFFL0MsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBVyxDQUFDLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7UUFFM0IsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBRW5CLFVBQVUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO29CQUNqRixDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZFLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsS0FBSyxFQUFFLENBQUM7UUFDVixDQUFDLENBQUM7UUFFRixJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLElBQUksRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFekMsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXJDLGVBQWUsRUFBRSxDQUFDO2dCQUVsQixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7aUJBQzNDO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFRTSxTQUFTLENBQUMsS0FBYSxFQUFFLFFBQWlEO1FBRS9FLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBRUQsTUFBTSxpQkFBaUIsR0FBd0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBRy9CLHlCQUF5QixDQUFDLDhCQUE4QixDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpHLHlCQUF5QixDQUFDLGdDQUFnQyxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVHO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQVVNLGVBQWU7UUFFcEIsSUFBSTtZQUVGLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMvRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFnQixDQUFDO2dCQUNwSCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFnQixDQUFDO2dCQUN0SCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQXNCLENBQUM7Z0JBRXpELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUNuQyxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUU7d0JBQzFCLEtBQUssQ0FBQyxVQUEwQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUN6RTt5QkFBTTt3QkFDSixLQUFLLENBQUMsVUFBMEIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDN0U7aUJBQ0Y7YUFDRjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBVVMsNEJBQTRCLENBQUMsT0FBZSxRQUFRLEVBQUUsWUFBb0IsRUFBRSxXQUFvQixLQUFLO1FBRTdHLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbkYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFnQixDQUFDO1lBQ3BGLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBRWxELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQWtCLENBQUM7Z0JBQ25FLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FDRjtJQUNILENBQUM7SUFTUyxrQkFBa0IsQ0FBQyxLQUFhO1FBRXhDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBd0IsQ0FBQztRQVEvRSxJQUFJLGNBQWMsR0FBcUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5GLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRXRDLE1BQU0scUJBQXFCLEdBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxVQUFxQyxDQUFDLENBQUM7WUFFOUUsSUFBSSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQzthQUN4QztZQUVELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRCxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUV4Qyx5QkFBeUIsQ0FBQywyQkFBMkIsQ0FDbkQsUUFBdUIsRUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUN4RSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUN4RSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUN4RSxDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQVFTLG9CQUFvQjtRQUU1QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQU9TLGtCQUFrQjtRQUUxQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRW5ELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBRTVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLEVBQUU7WUFDekMsS0FBSyxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEY7YUFBTTtZQUNMLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDdEM7UUFFRCxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQVNTLGdCQUFnQjtRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4RCxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUMvQyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUU5QyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEUsYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDbkM7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFHOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtvQkFDdkIsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMzQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBS08scUJBQXFCO1FBRTNCLElBQUk7WUFFRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBK0IsQ0FBQztZQUU1RCxLQUFLLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7Z0JBRWhFLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7QUFyMkJhLHdCQUFLLEdBQUc7SUFDcEIsU0FBUyxFQUFFLDBCQUEwQjtDQUN0QyxBQUZrQixDQUVqQiJ9