import { Ch5SignalFactory, languageChangedSignalName } from '../ch5-core';
import { Ch5AttrsMutationObserver } from "./ch5-attrs-mutation-observer";
import { Ch5AttrsShow } from './ch5-attrs-show';
import { Ch5AttrsShowPulse } from './ch5-attrs-showpulse';
import { Ch5AttrsHidePulse } from './ch5-attrs-hidepulse';
import { Ch5AttrsTextContent } from "./ch5-attrs-text-content";
import { Ch5AttrsInnerhtml } from "./ch5-attrs-innerhtml";
import { Ch5AttrsAppendstyle } from "./ch5-attrs-appendstyle";
import { Ch5AttrsAppendclass } from "./ch5-attrs-appendclass";
import { Ch5AttrsI18n } from "./ch5-attrs-i18n";
import { Ch5AttrsEnable } from './ch5-attrs-enable';
export class Ch5CustomAttributes extends Ch5AttrsMutationObserver {
    constructor() {
        super();
        this._mutationsObserverConfig = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            attributeFilter: [
                Ch5AttrsEnable.DATA_CH5_ATTR_NAME,
                Ch5AttrsShow.DATA_CH5_ATTR_NAME,
                Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME,
                Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME,
                Ch5AttrsTextContent.DATA_CH5_ATTR_NAME,
                Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME,
                Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME,
                Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME,
                Ch5AttrsI18n.DATA_CH5_ATTR_NAME
            ]
        };
        Ch5CustomAttributes.ch5AttrsI18nInstance = new Ch5AttrsI18n();
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(languageChangedSignalName);
        if (!!receiveSignal) {
            receiveSignal.subscribe((newValue) => {
                if (newValue !== '') {
                    Ch5CustomAttributes.ch5AttrsI18nInstance.updateOnChange();
                }
            });
        }
    }
    static getInstance() {
        if (!Ch5CustomAttributes._instance) {
            Ch5CustomAttributes._instance = new Ch5CustomAttributes();
        }
        return Ch5CustomAttributes._instance;
    }
    initCh5Attributes() {
        if (document.readyState !== 'loading') {
            this.initCh5AttributesOnLoad();
        }
        else {
            document.addEventListener('DOMContentLoaded', this.initCh5AttributesOnLoad.bind(Ch5CustomAttributes._instance));
        }
    }
    initCh5AttrsMutationsObserver() {
        this._mutationsObserver = new MutationObserver(this._mutationsCallback.bind(Ch5CustomAttributes._instance));
        this.startBodyMutationsObserver();
    }
    _mutationsCallback(mutationsList) {
        for (const mutation of mutationsList) {
            switch (mutation.type) {
                case 'attributes':
                    this.handleAttributeChanges(mutation);
                    break;
                default:
                    if (this._childNodesWereRemoved(mutation)) {
                        const removedNodes = this._getNodesViableForCh5Attributes(mutation.removedNodes);
                        if (removedNodes.length) {
                            this.handleNodesRemovalFromDOM(removedNodes);
                        }
                    }
                    if (this._childNodesWereAdded(mutation)) {
                        const addedNodes = this._getNodesViableForCh5Attributes(mutation.addedNodes);
                        if (addedNodes.length) {
                            this.handleNodesStampedIntoDOM(addedNodes);
                        }
                    }
            }
        }
    }
    initCh5AttributesOnLoad() {
        const elements = this.getAllRegularElementsHavingCh5Attr();
        if (elements.length > 0) {
            for (const el of elements) {
                if (el.hasAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsEnable.checkAndSubscribeToSignal(el);
                }
                if (el.hasAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsShow.checkAndSubscribeToSignal(el);
                }
                if (el.hasAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsShowPulse.checkAndSubscribeToSignal(el);
                }
                if (el.hasAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsHidePulse.checkAndSubscribeToSignal(el);
                }
                if (el.hasAttribute(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsTextContent.handleBeingAddedToDom(el);
                }
                if (el.hasAttribute(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsInnerhtml.handleBeingAddedToDom(el);
                }
                if (el.hasAttribute(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsAppendstyle.handleBeingAddedToDom(el);
                }
                if (el.hasAttribute(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME)) {
                    Ch5AttrsAppendclass.handleBeingAddedToDom(el);
                }
                if (el.hasAttribute(Ch5AttrsI18n.DATA_CH5_ATTR_NAME)) {
                    Ch5CustomAttributes.ch5AttrsI18nInstance.handleBeingAddedToDom(el);
                }
            }
        }
        this.initCh5AttrsMutationsObserver();
    }
    handleNodesStampedIntoDOM(addedNodes) {
        addedNodes.forEach((n) => {
            if (n.hasAttribute(Ch5AttrsEnable.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsEnable.handleElAddedToDOM(n);
            }
            if (n.hasAttribute(Ch5AttrsShow.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsShow.handleElAddedToDOM(n);
            }
            if (n.hasAttribute(Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsShowPulse.handleElAddedToDOM(n);
            }
            if (n.hasAttribute(Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsHidePulse.handleElAddedToDOM(n);
            }
            if (n.hasAttribute(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsTextContent.handleBeingAddedToDom(n);
            }
            if (n.hasAttribute(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsInnerhtml.handleBeingAddedToDom(n);
            }
            if (n.hasAttribute(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsAppendstyle.handleBeingAddedToDom(n);
            }
            if (n.hasAttribute(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsAppendclass.handleBeingAddedToDom(n);
            }
            if (n.hasAttribute(Ch5AttrsI18n.DATA_CH5_ATTR_NAME)) {
                Ch5CustomAttributes.ch5AttrsI18nInstance.handleBeingAddedToDom(n);
            }
        });
    }
    handleNodesRemovalFromDOM(removedNodes) {
        if (Ch5CustomAttributes.preventUnsubscribe === true) {
            Ch5CustomAttributes.preventUnsubscribe = true;
            return;
        }
        removedNodes.forEach((el) => {
            if (Ch5AttrsEnable.elHasRemovableSigSubscription(el)) {
                Ch5AttrsEnable.removeSigSubscription(el);
            }
            if (Ch5AttrsShow.elHasRemovableSigSubscription(el)) {
                Ch5AttrsShow.removeSigSubscription(el);
            }
            if (Ch5AttrsShowPulse.elHasRemovableSigSubscription(el)) {
                Ch5AttrsShowPulse.removeSigSubscription(el);
            }
            if (Ch5AttrsHidePulse.elHasRemovableSigSubscription(el)) {
                Ch5AttrsHidePulse.removeSigSubscription(el);
            }
            if (el.hasAttribute(Ch5AttrsTextContent.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsTextContent.handleBeingRemovedFromDom(el);
            }
            if (el.hasAttribute(Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsInnerhtml.handleBeingRemovedFromDom(el);
            }
            if (el.hasAttribute(Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsAppendstyle.handleBeingRemovedFromDom(el);
            }
            if (el.hasAttribute(Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME)) {
                Ch5AttrsAppendclass.handleBeingRemovedFromDom(el);
            }
        });
    }
    handleAttributeChanges(mutation) {
        const newAttrValue = this.getNewAttributeValue(mutation);
        if (mutation.attributeName === Ch5AttrsEnable.DATA_CH5_ATTR_NAME) {
            Ch5AttrsEnable.handleCh5EnableAttributeChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsShow.DATA_CH5_ATTR_NAME) {
            Ch5AttrsShow.handleCh5ShowAttributeChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsShowPulse.DATA_CH5_ATTR_NAME) {
            Ch5AttrsShowPulse.handleCh5ShowPulseAttributeChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsHidePulse.DATA_CH5_ATTR_NAME) {
            Ch5AttrsHidePulse.handleCh5HidePulseAttributeChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsTextContent.DATA_CH5_ATTR_NAME) {
            Ch5AttrsTextContent.handleCh5TextContentAttrChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsInnerhtml.DATA_CH5_ATTR_NAME) {
            Ch5AttrsInnerhtml.handleCh5InnerhtmlAttrChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsAppendstyle.DATA_CH5_ATTR_NAME) {
            Ch5AttrsAppendstyle.handleCh5AppendstyleAttrChange(newAttrValue, mutation.oldValue, mutation.target);
        }
        if (mutation.attributeName === Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME) {
            Ch5AttrsAppendclass.handleCh5AppendclassAttrChange(newAttrValue, mutation.oldValue, mutation.target);
        }
    }
}
Ch5CustomAttributes.preventUnsubscribe = false;
Ch5CustomAttributes.getInstance().initCh5Attributes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWN1c3RvbS1hdHRyaWJ1dGVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWN1c3RvbS1hdHRycy9jaDUtY3VzdG9tLWF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSx3QkFBd0I7SUE4QjdEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUF4QkYsNkJBQXdCLEdBTTlCO1lBQ0ksVUFBVSxFQUFFLElBQUk7WUFDaEIsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsZUFBZSxFQUFFO2dCQUNiLGNBQWMsQ0FBQyxrQkFBa0I7Z0JBQ2pDLFlBQVksQ0FBQyxrQkFBa0I7Z0JBQy9CLGlCQUFpQixDQUFDLGtCQUFrQjtn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