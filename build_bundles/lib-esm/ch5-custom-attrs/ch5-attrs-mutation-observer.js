import { Ch5AttrsLog } from './ch5-attrs-log';
export class Ch5AttrsMutationObserver {
    constructor() {
        this._mutationsObserver = null;
        this._mutationsObserverConfig = {};
        this._skipedNodesNamesPrefix = 'ch5-';
        this._skipedNodesNames = ['script', 'link', 'style'];
        this._nodeTypesToUse = [0, Node.ELEMENT_NODE];
    }
    _isValidObserver(observer) {
        return observer instanceof MutationObserver;
    }
    startBodyMutationsObserver() {
        if (this._mutationsObserver && this._isValidObserver(this._mutationsObserver)) {
            this._mutationsObserver.observe(document, this._mutationsObserverConfig);
        }
    }
    stopBodyMutationsObserver() {
        if (this._mutationsObserver && this._isValidObserver(this._mutationsObserver)) {
            this._mutationsObserver.disconnect();
        }
    }
    _hasCh5Attributes(node) {
        const attributes = typeof node.getAttributeNames === 'function'
            ? node.getAttributeNames()
            : [];
        return attributes.length > 0 &&
            attributes.some((attr) => this._mutationsObserverConfig.attributeFilter.indexOf(attr) > -1);
    }
    _viableForCh5Attributes(n) {
        const nodeName = n.nodeName.toLowerCase();
        return this._nodeTypesToUse.indexOf(n.nodeType) > -1 &&
            this._skipedNodesNames.indexOf(nodeName) === -1 &&
            nodeName.search(this._skipedNodesNamesPrefix) === -1;
    }
    _getNodesViableForCh5Attributes(nodeList) {
        let _viableForCh5 = [];
        for (const n of nodeList) {
            if (this._viableForCh5Attributes(n) && this._hasCh5Attributes(n)) {
                _viableForCh5.push(n);
            }
            const childElementsHavingCh5Attrs = this.getChildElementsHavingCh5Attr(n);
            _viableForCh5 = _viableForCh5.concat(childElementsHavingCh5Attrs);
        }
        return _viableForCh5;
    }
    _childNodesWereAdded(mutation) {
        return mutation.type === 'childList' &&
            mutation.addedNodes.length > 0;
    }
    _childNodesWereRemoved(mutation) {
        return mutation.type === 'childList' &&
            mutation.removedNodes.length > 0;
    }
    getAllRegularElementsHavingCh5Attr() {
        return this.getChildElementsHavingCh5Attr(document);
    }
    getChildElementsHavingCh5Attr(el) {
        if (!el || typeof el.querySelectorAll === 'undefined') {
            return [];
        }
        const elementsSelectors = this._mutationsObserverConfig.attributeFilter.map((attr) => `[${attr}]`).join(',');
        return Array.from(el.querySelectorAll(elementsSelectors))
            .filter((item) => this._viableForCh5Attributes(item));
    }
    getNewAttributeValue(mutation) {
        const newAttrValue = mutation.target.getAttribute(mutation.attributeName);
        const _debug = mutation.target.getAttribute('debug');
        Ch5AttrsLog.info(_debug, `The ${mutation.attributeName} attribute was modified to: 
                        ${newAttrValue} (previous value: ${mutation.oldValue}`, mutation);
        return newAttrValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF0dHJzLW11dGF0aW9uLW9ic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWN1c3RvbS1hdHRycy9jaDUtYXR0cnMtbXV0YXRpb24tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTVDLE1BQU0sT0FBTyx3QkFBd0I7SUFBckM7UUFFYyx1QkFBa0IsR0FBNEIsSUFBSSxDQUFDO1FBQ25ELDZCQUF3QixHQUFXLEVBQUUsQ0FBQztRQUV0Qyw0QkFBdUIsR0FBVyxNQUFNLENBQUM7UUFDekMsc0JBQWlCLEdBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELG9CQUFlLEdBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBaUdqRSxDQUFDO0lBL0ZhLGdCQUFnQixDQUFDLFFBQWE7UUFDcEMsT0FBTyxRQUFRLFlBQVksZ0JBQWdCLENBQUM7SUFDaEQsQ0FBQztJQUVNLDBCQUEwQjtRQUM3QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDM0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDNUU7SUFDTCxDQUFDO0lBRU0seUJBQXlCO1FBQzVCLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRVMsaUJBQWlCLENBQUMsSUFBUztRQUVqQyxNQUFNLFVBQVUsR0FBYSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxVQUFVO1lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVULE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUM1QixJQUFJLENBQUMsd0JBQWdDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFRUyx1QkFBdUIsQ0FBQyxDQUFVO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFHMUMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVTLCtCQUErQixDQUFDLFFBQWtCO1FBQ3hELElBQUksYUFBYSxHQUFjLEVBQUUsQ0FBQztRQUNsQyxLQUFLLE1BQU0sQ0FBQyxJQUFLLFFBQWdCLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBWSxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQVksQ0FBQyxFQUFFO2dCQUNwRixhQUFhLENBQUMsSUFBSSxDQUFDLENBQVksQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSwyQkFBMkIsR0FBYSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUNyRTtRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFUyxvQkFBb0IsQ0FBQyxRQUF3QjtRQUNuRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVztZQUNoQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLHNCQUFzQixDQUFDLFFBQXdCO1FBQ3JELE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXO1lBQ2hDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBS1Msa0NBQWtDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLUyw2QkFBNkIsQ0FBQyxFQUFtQjtRQUN2RCxJQUFJLENBQUMsRUFBRSxJQUFJLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixLQUFLLFdBQVcsRUFBRTtZQUNuRCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxpQkFBaUIsR0FBWSxJQUFJLENBQUMsd0JBQWdDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDeEYsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3BELE1BQU0sQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVTLG9CQUFvQixDQUFDLFFBQXdCO1FBQ25ELE1BQU0sWUFBWSxHQUNiLFFBQVEsQ0FBQyxNQUFjLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRSxNQUFNLE1BQU0sR0FBSSxRQUFRLENBQUMsTUFBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDbkIsT0FBTyxRQUFRLENBQUMsYUFBYTswQkFDZixZQUFZLHFCQUFxQixRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ2xFLFFBQVEsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztDQUNKIn0=