import { Ch5Common } from "../ch5-common/ch5-common";
import { isEmpty, isNil } from 'lodash';
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { resizeObserver } from "../ch5-core/resize-observer";
import { Ch5AugmentVarSignalsNames } from '../ch5-common/ch5-augment-var-signals-names';
import { subscribeInViewPortChange, unSubscribeInViewPortChange } from '../ch5-core';
import { ch5subpageReferenceListSubject } from "./refresh-ch5-subpage-reference-list";
import { Ch5Signal } from "../ch5-core/ch5-signal";
import { Ch5SignalFactory } from "./../ch5-core/ch5-signal-factory";
import _ from "lodash";
export class Ch5SubpageReferenceList extends Ch5Common {
    setCustomAttributesInChildComponents(parentElement) {
        const found = [];
        const allElements = parentElement.getElementsByTagName('*');
        for (const element of allElements) {
            const elementTagName = element.tagName;
            if (elementTagName.startsWith('CH5-')) {
                element.setAttribute("swipeGestureEnabled", "true");
                found.push(element);
            }
        }
        return found;
    }
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set contractName(value) {
        this._ch5Properties.set("contractName", value, () => {
            this.handleContractName();
        });
    }
    get contractName() {
        return this._ch5Properties.get("contractName");
    }
    set useContractForEnable(value) {
        this._ch5Properties.set("useContractForEnable", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForEnable() {
        return this._ch5Properties.get("useContractForEnable");
    }
    set useContractForShow(value) {
        this._ch5Properties.set("useContractForShow", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForShow() {
        return this._ch5Properties.get("useContractForShow");
    }
    set useContractForItemEnable(value) {
        this._ch5Properties.set("useContractForItemEnable", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForItemEnable() {
        return this._ch5Properties.get("useContractForItemEnable");
    }
    set useContractForItemShow(value) {
        this._ch5Properties.set("useContractForItemShow", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForItemShow() {
        return this._ch5Properties.get("useContractForItemShow");
    }
    set useContractForCustomStyle(value) {
        this._ch5Properties.set("useContractForCustomStyle", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForCustomStyle() {
        return this._ch5Properties.get("useContractForCustomStyle");
    }
    set useContractForCustomClass(value) {
        this._ch5Properties.set("useContractForCustomClass", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForCustomClass() {
        return this._ch5Properties.get("useContractForCustomClass");
    }
    set useContractForNumItems(value) {
        this._ch5Properties.set("useContractForNumItems", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get useContractForNumItems() {
        return this._ch5Properties.get("useContractForNumItems");
    }
    set endless(value) {
        this._ch5Properties.set("endless", value, () => {
            this.handleEndless();
        });
    }
    get endless() {
        return this._ch5Properties.get("endless");
    }
    set centerItems(value) {
        this._ch5Properties.set("centerItems", value, () => {
            this.handleCenterItems();
        });
    }
    get centerItems() {
        return this._ch5Properties.get("centerItems");
    }
    set loadItems(value) {
        this._ch5Properties.set("loadItems", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get loadItems() {
        return this._ch5Properties.get("loadItems");
    }
    set rows(value) {
        this._ch5Properties.set("rows", value, () => {
            this.handleRowsAndColumn();
        });
    }
    get rows() {
        return this._ch5Properties.get("rows");
    }
    set columns(value) {
        this._ch5Properties.set("columns", value, () => {
            this.handleRowsAndColumn();
        });
    }
    get columns() {
        return this._ch5Properties.get("columns");
    }
    set scrollToPosition(value) {
        this._ch5Properties.set("scrollToPosition", value, () => {
            const withinValidRange = this.scrollToPosition < this.numberOfItems && this.scrollToPosition >= 0;
            const scrollToApplicable = ((this.orientation === 'horizontal' && this.rows === 1) || (this.orientation === "vertical" && this.columns === 1));
            if (withinValidRange && scrollToApplicable) {
                this.debounceSubpageDisplay(true);
            }
        });
    }
    get scrollToPosition() {
        return this._ch5Properties.get("scrollToPosition");
    }
    set scrollbar(value) {
        this._ch5Properties.set("scrollbar", value, () => {
            this.handleScrollbar();
        });
    }
    get scrollbar() {
        return this._ch5Properties.get("scrollbar");
    }
    set booleanJoinIncrement(value) {
        this._ch5Properties.set("booleanJoinIncrement", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get booleanJoinIncrement() {
        return this._ch5Properties.get('booleanJoinIncrement');
    }
    set numericJoinIncrement(value) {
        this._ch5Properties.set("numericJoinIncrement", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get numericJoinIncrement() {
        return this._ch5Properties.get('numericJoinIncrement');
    }
    set stringJoinIncrement(value) {
        this._ch5Properties.set("stringJoinIncrement", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get stringJoinIncrement() {
        return this._ch5Properties.get('stringJoinIncrement');
    }
    set subpageReceiveStateEnable(value) {
        this._ch5Properties.set("subpageReceiveStateEnable", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get subpageReceiveStateEnable() {
        return this._ch5Properties.get('subpageReceiveStateEnable');
    }
    set subpageReceiveStateShow(value) {
        this._ch5Properties.set("subpageReceiveStateShow", value, () => {
            this.debounceSubpageDisplay();
        });
    }
    get subpageReceiveStateShow() {
        return this._ch5Properties.get('subpageReceiveStateShow');
    }
    set widgetId(value) {
        this._ch5Properties.set("widgetId", value, () => {
            this.handleWidgetID();
        });
    }
    get widgetId() {
        return this._ch5Properties.get("widgetId");
    }
    set subpageReceiveStateScrollTo(value) {
        this._ch5Properties.set("subpageReceiveStateScrollTo", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("scrollToPosition", newValue, () => {
                const withinValidRange = this.scrollToPosition < this.numberOfItems && this.scrollToPosition >= 0;
                const scrollToApplicable = ((this.orientation === 'horizontal' && this.rows === 1) || (this.orientation === "vertical" && this.columns === 1));
                if (withinValidRange && scrollToApplicable) {
                    this.reInit = true;
                    this.debounceSubpageDisplay(true);
                }
            });
        });
    }
    get subpageReceiveStateScrollTo() {
        return this._ch5Properties.get('subpageReceiveStateScrollTo');
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set numberOfItems(value) {
        this._ch5Properties.set("numberOfItems", value, () => {
            this.handleRowsAndColumn();
        });
    }
    get numberOfItems() {
        return this._ch5Properties.get("numberOfItems");
    }
    set receiveStateNumberOfItems(value) {
        this._ch5Properties.set("receiveStateNumberOfItems", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("numberOfItems", newValue, () => {
                if (this.useContractForNumItems === false) {
                    this.previousSignalValues.receiveStateNumberOfItems = this.receiveStateNumberOfItems;
                }
                this.handleRowsAndColumn();
            });
        });
    }
    get receiveStateNumberOfItems() {
        return this._ch5Properties.get('receiveStateNumberOfItems');
    }
    set indexId(value) {
        this._ch5Properties.set("indexId", value);
    }
    get indexId() {
        return this._ch5Properties.get("indexId");
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5SubpageReferenceList.ELEMENT_NAME, Ch5SubpageReferenceList.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5SubpageReferenceList.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5SubpageReferenceList.ELEMENT_NAME, Ch5SubpageReferenceList);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-subpage-reference-list';
        this._elContainer = {};
        this._scrollbarContainer = {};
        this._scrollbar = {};
        this._templateElement = {};
        this.isDown = false;
        this.startX = 0;
        this.startY = 0;
        this.scrollListLeft = 0;
        this.scrollListTop = 0;
        this.scrollbarDimension = 0;
        this.subpageWidth = 0;
        this.subpageHeight = 0;
        this.containerHeight = 0;
        this.containerWidth = 0;
        this.reInit = true;
        this._refreshSubId = null;
        this.previousSignalValues = {
            contractName: "",
            receiveStateCustomClass: "",
            receiveStateCustomStyle: "",
            receiveStateEnable: "",
            receiveStateShow: "",
            subpageReceiveStateScrollTo: "",
            receiveStateNumberOfItems: ""
        };
        this.rowClassValue = 1;
        this.columnClassValue = 1;
        this.showSignalHolder = [];
        this.loadSubpageForShow = false;
        this.allSubpageVisible = false;
        this.debounceSubpageShow = this.debounce(() => {
            this.subpageShow();
        }, 150);
        this.debounceSubpageDisplay = this.debounce((isReceiveStateScrollTo = false) => {
            if (this.loadItems === "visible-only") {
                this.subpageDisplay(isReceiveStateScrollTo);
            }
            else if (this.loadItems === "load-new") {
                this.subpageDisplayForLoadItemsNew(isReceiveStateScrollTo);
            }
            else {
                this.subpageDisplayForLoadItemsAll(isReceiveStateScrollTo);
            }
            this.setCustomAttributesInChildComponents(this);
        }, 100);
        this.debounceInitScrollBar = this.debounce(() => {
            this.initScrollbar();
        }, 400);
        this.scrollAfterSomeTime = this.debounce((dir, value) => {
            dir === "left" ? this._elContainer.scrollLeft = value : this._elContainer.scrollTop = value;
        }, 400);
        this.handleMouseDown = (e) => {
            this.isDown = true;
            this._elContainer.classList.add('active');
            this.startX = e.pageX - this._elContainer.offsetLeft;
            this.startY = e.pageY - this._elContainer.offsetTop;
            this.scrollListLeft = this._elContainer.scrollLeft;
            this.scrollListTop = this._elContainer.scrollTop;
        };
        this.handleMouseUpAndLeave = this.debounce(() => {
            this.isDown = false;
            this._elContainer.classList.remove('active');
        }, 10);
        this.handleMouseMove = this.debounce((e) => {
            if (!this.isDown) {
                return;
            }
            e.preventDefault();
            const x = e.pageX - this._elContainer.offsetLeft;
            const y = e.pageY - this._elContainer.offsetTop;
            const walkX = (x - this.startX) * 3;
            const walkY = (y - this.startY) * 3;
            this._elContainer.scrollLeft = this.scrollListLeft - walkX;
            this._elContainer.scrollTop = this.scrollListTop - walkY;
        }, 10);
        this.handleScrollEvent = () => {
            this.initScrollbar();
            if (this.endless) {
                if (this.loadItems === "all") {
                    this.subpageWidth = this._elContainer.children[0].getBoundingClientRect().width;
                    this.subpageHeight = this._elContainer.children[0].getBoundingClientRect().height;
                    return this.endlessHelper();
                }
                else if (this.loadItems === "load-new") {
                    return this.endlessHelperForNew();
                }
                return this.endlessHelper();
            }
            if (this.loadItems === "visible-only") {
                this.scrollHelper();
            }
            else if (this.loadItems === "load-new") {
                this.scrollHelperForNew();
            }
            this.setCustomAttributesInChildComponents(this);
        };
        this.resizeHandler = (event) => {
            const { width, height } = this._elContainer.getBoundingClientRect();
            if (this.containerWidth === 0 && width !== 0) {
                this.containerWidth = width;
                this.debounceSubpageDisplay();
            }
            else if (this.containerHeight === 0 && height !== 0) {
                this.containerHeight = height;
                this.debounceSubpageDisplay();
            }
            this.debounceInitScrollBar();
        };
        this.ignoreAttributes = ["receivestatehidepulse", "receivestateshowpulse", "sendeventonshow"];
        this.logger.start('constructor()', Ch5SubpageReferenceList.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5SubpageReferenceList.COMPONENT_PROPERTIES);
        this.updateCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5SubpageReferenceList.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SubpageReferenceList.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5SubpageReferenceList.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-subpage-reference-list attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5SubpageReferenceList.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                attr = attr.toLowerCase();
                if (attr === "receivestatecustomclass") {
                    if (this.useContractForCustomClass === false) {
                        super.attributeChangedCallback(attr, oldValue, newValue);
                        this.previousSignalValues.receiveStateCustomClass = this.receiveStateCustomClass;
                    }
                }
                else if (attr === "receivestatecustomstyle") {
                    if (this.useContractForCustomStyle === false) {
                        super.attributeChangedCallback(attr, oldValue, newValue);
                        this.previousSignalValues.receiveStateCustomStyle = this.receiveStateCustomStyle;
                    }
                }
                else if (attr === "receivestateshow") {
                    if (this.useContractForShow === false) {
                        super.attributeChangedCallback(attr, oldValue, newValue);
                        this.previousSignalValues.receiveStateShow = this.receiveStateShow;
                    }
                }
                else if (attr === "receivestateenable") {
                    if (this.useContractForEnable === false) {
                        super.attributeChangedCallback(attr, oldValue, newValue);
                        this.previousSignalValues.receiveStateEnable = this.receiveStateEnable;
                    }
                }
                super.attributeChangedCallback(attr, oldValue, newValue);
                this.debounceSubpageDisplay();
            }
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', Ch5SubpageReferenceList.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5SubpageReferenceList);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-subpage-reference-list');
            this.appendChild(this._elContainer);
        }
        this.checkInternalHTML();
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.debounceSubpageDisplay();
        resizeObserver(this._elContainer, this.resizeHandler);
        customElements.whenDefined(this.nodeName.toLowerCase()).then(() => {
            this.componentLoadedEvent(this.nodeName.toLowerCase(), this.id);
        });
        subscribeInViewPortChange(this, () => {
            if (this.elementIsInViewPort && this.reInit) {
                this.reInit = false;
                this.debounceSubpageDisplay();
                this.debounceInitScrollBar();
            }
        });
        this.listenForCh5SubpageReferenceListRefreshRequests();
        this.logger.stop();
    }
    listenForCh5SubpageReferenceListRefreshRequests() {
        this.info('Ch5SubpageReferenceList.listenForCh5SubpageReferenceListRefreshRequests()');
        this._refreshSubId = ch5subpageReferenceListSubject.subscribe((ch5SubpageReferenceListId) => {
            this.info(`Ch5SubpageReferenceList.listenForCh5SubpageReferenceListRefreshRequests() new request for ${ch5SubpageReferenceListId}`);
            if (this.getAttribute('widgetId') === ch5SubpageReferenceListId) {
                this.initializations();
            }
        });
    }
    initializations() {
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-subpage-reference-list');
            this.appendChild(this._elContainer);
        }
        this.checkInternalHTML();
        this.attachEventListeners();
        this.initAttributes();
        this.handleWidgetID();
        this.initCommonMutationObserver(this);
        this.debounceSubpageDisplay();
        this.info('Ch5SubpageReferenceList --- Initialization Finished');
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        unSubscribeInViewPortChange(this);
        this.reInitialize();
        if (this._refreshSubId !== null) {
            this._refreshSubId.unsubscribe();
            this._refreshSubId = null;
        }
        this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
        this.showSignalHolder = [];
        this.logger.stop();
    }
    reInitialize() {
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.reInit = true;
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._scrollbarContainer = document.createElement('div');
        this._scrollbar = document.createElement('div');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5SubpageReferenceList.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5SubpageReferenceList.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5SubpageReferenceList.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5SubpageReferenceList.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        this.initialize();
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._elContainer.addEventListener('mousedown', this.handleMouseDown);
        this._elContainer.addEventListener('mouseleave', this.handleMouseUpAndLeave);
        this._elContainer.addEventListener('mouseup', this.handleMouseUpAndLeave);
        this._elContainer.addEventListener('mousemove', this.handleMouseMove);
        this._elContainer.addEventListener('scroll', this.handleScrollEvent);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elContainer.removeEventListener('mouseleave', this.handleMouseUpAndLeave);
        this._elContainer.removeEventListener('mouseup', this.handleMouseUpAndLeave);
        this._elContainer.removeEventListener('mousedown', this.handleMouseDown);
        this._elContainer.removeEventListener('mousemove', this.handleMouseMove);
        this._elContainer.removeEventListener('scroll', this.handleScrollEvent);
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    scrollHelperForNew() {
        var _a, _b, _c;
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.subpageWidth) {
                return;
            }
            let lastElement = this.getLastChild();
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.subpageWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    this.createSubpage(++lastElement);
                    if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                        let showValue = lastElement;
                        while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                            this.createSubpage(++showValue);
                        }
                    }
                }
                this.initScrollbar();
            }
        }
        else if (this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.subpageWidth) {
                return;
            }
            let lastElement = this.getLastChild();
            if (scrollLeft + offsetWidth > scrollWidth - this.subpageWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createSubpage(++lastElement);
                        if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_b = this.showSignalHolder[showValue]) === null || _b === void 0 ? void 0 : _b.value) === false) {
                                this.createSubpage(++showValue);
                            }
                        }
                    }
                }
                this.initScrollbar();
            }
        }
        else {
            const { offsetHeight, scrollTop, scrollHeight } = this._elContainer;
            if (scrollHeight - offsetHeight < this.subpageHeight) {
                return;
            }
            let lastElement = this.getLastChild();
            if (scrollTop + offsetHeight > scrollHeight - this.subpageHeight && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.columns; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createSubpage(++lastElement);
                        if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                                this.createSubpage(++showValue);
                            }
                        }
                    }
                }
                this.initScrollbar();
            }
        }
    }
    scrollHelper() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.subpageWidth) {
                return;
            }
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.subpageWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    this.createSubpage(++lastElement);
                    if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                        let showValue = lastElement;
                        while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                            this.createSubpage(++showValue);
                        }
                    }
                    (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                }
                this._elContainer.scrollLeft += this.subpageWidth;
            }
            else if (Math.abs(scrollLeft) < this.subpageWidth && firstElement !== 0) {
                let lastColumnElements = (lastElement + 1) % this.rows;
                for (let i = 0; i < this.rows; i++) {
                    this.createSubpage(--firstElement, false);
                    if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                            this.createSubpage(--showValue, false);
                        }
                    }
                    if ((lastElement + 1) % this.rows !== 0) {
                        if (lastColumnElements-- > 0) {
                            (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.remove();
                        }
                    }
                    else {
                        (_e = this._elContainer.lastElementChild) === null || _e === void 0 ? void 0 : _e.remove();
                    }
                }
                this._elContainer.scrollLeft -= this.subpageWidth;
            }
        }
        else if (this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.subpageWidth) {
                return;
            }
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (scrollLeft < 5 && firstElement !== 0) {
                let lastColumnElements = (lastElement + 1) % this.rows;
                for (let i = 0; i < this.rows; i++) {
                    this.createSubpage(--firstElement, false);
                    if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_f = this.showSignalHolder[showValue]) === null || _f === void 0 ? void 0 : _f.value) === false) {
                            this.createSubpage(--showValue, false);
                        }
                    }
                    if ((lastElement + 1) % this.rows !== 0) {
                        if (lastColumnElements-- > 0) {
                            (_g = this._elContainer.lastElementChild) === null || _g === void 0 ? void 0 : _g.remove();
                        }
                    }
                    else {
                        (_h = this._elContainer.lastElementChild) === null || _h === void 0 ? void 0 : _h.remove();
                    }
                }
                this._elContainer.scrollLeft += 5;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - 5 && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createSubpage(++lastElement);
                        if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                                this.createSubpage(++showValue);
                            }
                        }
                    }
                    (_k = this._elContainer.firstElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                }
                this._elContainer.scrollLeft -= 5;
            }
        }
        else {
            const { offsetHeight, scrollTop, scrollHeight } = this._elContainer;
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (scrollTop < 5 && firstElement !== 0) {
                let lastRowElements = (lastElement + 1) % this.columns;
                for (let i = 0; i < this.columns; i++) {
                    this.createSubpage(--firstElement, false);
                    if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                            this.createSubpage(--showValue, false);
                        }
                    }
                    if ((lastElement + 1) % this.columns !== 0) {
                        if (lastRowElements-- > 0) {
                            (_m = this._elContainer.lastElementChild) === null || _m === void 0 ? void 0 : _m.remove();
                        }
                    }
                    else {
                        (_o = this._elContainer.lastElementChild) === null || _o === void 0 ? void 0 : _o.remove();
                    }
                }
                this._elContainer.scrollTop += 5;
            }
            else if (scrollTop + offsetHeight > scrollHeight - 5 && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.columns; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createSubpage(++lastElement);
                        if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_p = this.showSignalHolder[showValue]) === null || _p === void 0 ? void 0 : _p.value) === false) {
                                this.createSubpage(++showValue);
                            }
                        }
                    }
                    (_q = this._elContainer.firstElementChild) === null || _q === void 0 ? void 0 : _q.remove();
                }
                this._elContainer.scrollTop -= 5;
            }
        }
    }
    endlessHelper() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const { offsetHeight, offsetWidth, scrollLeft, scrollTop, scrollWidth, scrollHeight } = this._elContainer;
        const endlessScrollable = this.orientation === 'horizontal' ? offsetWidth + this.subpageWidth < scrollWidth : offsetHeight + this.subpageHeight < scrollHeight;
        if (endlessScrollable === false) {
            return;
        }
        if (this.orientation === 'horizontal' && this.dir === 'rtl') {
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.subpageWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                this._elContainer.scrollLeft += this.subpageWidth / 2;
            }
            else if (Math.abs(scrollLeft) < this.subpageWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.remove();
                this._elContainer.scrollLeft -= this.subpageWidth / 2;
            }
        }
        else if (this.orientation === 'horizontal') {
            if (scrollLeft < this.subpageWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_e = this.showSignalHolder[showValue]) === null || _e === void 0 ? void 0 : _e.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                (_f = this._elContainer.lastElementChild) === null || _f === void 0 ? void 0 : _f.remove();
                this._elContainer.scrollLeft += this.subpageWidth / 2;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - this.subpageWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_g = this.showSignalHolder[showValue]) === null || _g === void 0 ? void 0 : _g.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                (_h = this._elContainer.firstElementChild) === null || _h === void 0 ? void 0 : _h.remove();
                this._elContainer.scrollLeft -= this.subpageWidth / 2;
            }
        }
        else {
            if (scrollTop < this.subpageHeight / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                (_k = this._elContainer.lastElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                this._elContainer.scrollTop += this.subpageHeight / 2;
            }
            else if (scrollTop + offsetHeight > scrollHeight - this.subpageHeight / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                (_m = this._elContainer.firstElementChild) === null || _m === void 0 ? void 0 : _m.remove();
                this._elContainer.scrollTop -= this.subpageHeight / 2;
                if (this.scrollToPosition === this.numberOfItems - 1 && index === 0) {
                    this._elContainer.scrollTop += this.subpageHeight;
                }
            }
        }
    }
    endlessHelperForNew() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const { offsetHeight, offsetWidth, scrollLeft, scrollTop, scrollWidth, scrollHeight } = this._elContainer;
        const endlessScrollable = this.orientation === 'horizontal' ? offsetWidth + this.subpageWidth < scrollWidth : offsetHeight + this.subpageHeight < scrollHeight;
        if (endlessScrollable === false) {
            return;
        }
        if (this.orientation === 'horizontal' && this.dir === 'rtl') {
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.subpageWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                }
                this._elContainer.scrollLeft += this.subpageWidth / 2;
            }
            else if (Math.abs(scrollLeft) < this.subpageWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.remove();
                }
                this._elContainer.scrollLeft -= this.subpageWidth / 2;
            }
        }
        else if (this.orientation === 'horizontal') {
            if (scrollLeft < this.subpageWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_e = this.showSignalHolder[showValue]) === null || _e === void 0 ? void 0 : _e.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_f = this._elContainer.lastElementChild) === null || _f === void 0 ? void 0 : _f.remove();
                }
                this._elContainer.scrollLeft += this.subpageWidth / 2;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - this.subpageWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_g = this.showSignalHolder[showValue]) === null || _g === void 0 ? void 0 : _g.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_h = this._elContainer.firstElementChild) === null || _h === void 0 ? void 0 : _h.remove();
                }
                this._elContainer.scrollLeft -= this.subpageWidth / 2;
            }
        }
        else {
            if (scrollTop < this.subpageHeight / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createSubpage(index, false);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                        this.createSubpage(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_k = this._elContainer.lastElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                }
                this._elContainer.scrollTop += this.subpageHeight / 2;
            }
            else if (scrollTop + offsetHeight > scrollHeight - this.subpageHeight / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createSubpage(index);
                if (this.loadSubpageForShow === true && this.allSubpageVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                        this.createSubpage(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_m = this._elContainer.firstElementChild) === null || _m === void 0 ? void 0 : _m.remove();
                }
                this._elContainer.scrollTop -= this.subpageHeight / 2;
                if (this.scrollToPosition === this.numberOfItems - 1 && index === 0) {
                    this._elContainer.scrollTop += this.subpageHeight;
                }
            }
        }
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    handleOrientation() {
        Array.from(Ch5SubpageReferenceList.COMPONENT_DATA.ORIENTATION.values).forEach((orientation) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.COMPONENT_DATA.ORIENTATION.classListPrefix + orientation);
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this.handleRowsAndColumn();
    }
    handleEndless() {
        if (this.endless) {
            this.endless = this.orientation === 'horizontal' ? this.rows === 1 : this.columns === 1;
        }
        if (this.endless && this.scrollbar === true) {
            this.scrollbar = false;
        }
    }
    handleCenterItems() {
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + bool.toString());
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + this.centerItems);
        if (this.centerItems === true) {
            this.debounceSubpageDisplay();
        }
    }
    handleRowsAndColumn() {
        if (this.endless) {
            this.endless = this.orientation === 'horizontal' ? this.rows === 1 : this.columns === 1;
        }
        if (this.stretch === 'both') {
            this.stretch = this.orientation === 'horizontal' ? this.rows === 1 ? 'both' : null : this.columns === 1 ? 'both' : null;
        }
        if (this.orientation === "horizontal") {
            this._elContainer.style.removeProperty("grid-template-columns");
            this._elContainer.style.removeProperty("grid-template-rows");
            this.rowClassValue = this.rows < this.numberOfItems ? this.rows : this.numberOfItems;
            this._elContainer.style.setProperty("grid-template-rows", "repeat(" + this.rowClassValue + ", 1fr)");
        }
        else {
            this._elContainer.style.removeProperty("grid-template-columns");
            this._elContainer.style.removeProperty("grid-template-rows");
            this.columnClassValue = this.columns < this.numberOfItems ? this.columns : this.numberOfItems;
            this._elContainer.style.setProperty("grid-template-columns", "repeat(" + this.columnClassValue + ", 1fr)");
        }
        this.debounceSubpageDisplay();
    }
    handleScrollbar() {
        if (this.endless === true && this.scrollbar === true) {
            this.scrollbar = false;
        }
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + bool.toString());
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this.initScrollbar();
    }
    handleScrollToPosition(value) {
        var _a, _b;
        if (value >= this.numberOfItems || value < 0) {
            return;
        }
        if ((this.orientation === 'horizontal' && this.rows !== 1) || (this.orientation === 'vertical' && this.columns !== 1)) {
            return;
        }
        this.subpageWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.subpageWidth;
        this.subpageHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().width) || this.subpageHeight;
        Array.from(this._elContainer.children).forEach(container => container.remove());
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true) || (this.subpageReceiveStateShow.length !== 0 && this.subpageReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true)) {
            this.loadSubpageForShow = true;
            if (this.showSignalHolder.length === 0) {
                this.signalHolder();
            }
            const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
            this.allSubpageVisible = visibleButtons === this.numberOfItems ? true : false;
        }
        else {
            this.loadSubpageForShow = false;
        }
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            const loadableSubpages = Math.ceil(containerWidth / this.subpageWidth) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (value >= this.numberOfItems - (loadableSubpages - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableSubpages; i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollLeft = value === this.numberOfItems - 1 ? this.subpageWidth * 5 * -1 : this.subpageWidth * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER * -1;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToRightEdgeRange();
                }
            }
            else if (value >= Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER) {
                for (let i = value - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER; i < value + loadableSubpages && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollLeft = this.subpageWidth * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER * -1;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToMiddleRange();
                }
            }
            else {
                for (let i = 0; i < loadableSubpages && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollLeft = this.subpageWidth * value * -1;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToLeftEdgeRange();
                }
            }
        }
        else if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            const loadableSubPageList = Math.ceil(containerWidth / this.subpageWidth) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (value >= this.numberOfItems - (loadableSubPageList - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableSubPageList; i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this.scrollAfterSomeTime("left", value === this.numberOfItems - 1 ? this.subpageWidth * 5 : this.subpageWidth * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER);
            }
            else if (value >= Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER) {
                for (let i = value - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER; i < value + loadableSubPageList && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this.scrollAfterSomeTime("left", this.subpageWidth * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER);
            }
            else {
                for (let i = 0; i < loadableSubPageList && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this.scrollAfterSomeTime("left", this.subpageWidth * value);
            }
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height || this.containerHeight;
            const loadableSubpages = Math.ceil(containerHeight / this.subpageHeight) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (containerHeight === 0) {
                for (let i = 0; i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
            }
            else if (value >= this.numberOfItems - (loadableSubpages - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableSubpages; i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollTop = value === this.numberOfItems - 1 ? this.subpageHeight * 5 : this.subpageHeight * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToRightEdgeRange();
                }
            }
            else if (value >= Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER) {
                for (let i = value - Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER; i < value + loadableSubpages && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollTop = this.subpageHeight * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToMiddleRange();
                }
            }
            else {
                for (let i = 0; i < loadableSubpages && i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
                this._elContainer.scrollTop = this.subpageHeight * value;
                if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
                    this.scrollToLeftEdgeRange();
                }
            }
        }
        this.debounceInitScrollBar();
    }
    handleScrollToPositionForNew(value) {
        var _a, _b, _c, _d, _e;
        if (value >= this.numberOfItems || value < 0) {
            return;
        }
        if ((this.orientation === 'horizontal' && this.rows !== 1) || (this.orientation === 'vertical' && this.columns !== 1)) {
            return;
        }
        if (this.subpageWidth === 0 || this.subpageHeight === 0) {
            if (this._elContainer.children.length === 0) {
                this.createSubpage(0);
                this.subpageWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.subpageWidth;
                this.subpageHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height) || this.subpageHeight;
                (_c = this._elContainer.firstElementChild) === null || _c === void 0 ? void 0 : _c.remove();
            }
            else {
                this.subpageWidth = ((_d = this._elContainer.firstElementChild) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().width) || this.subpageWidth;
                this.subpageHeight = ((_e = this._elContainer.firstElementChild) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect().height) || this.subpageHeight;
            }
        }
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true) || (this.subpageReceiveStateShow.length !== 0 && this.subpageReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true)) {
            this.loadSubpageForShow = true;
            if (this.showSignalHolder.length === 0) {
                this.signalHolder();
            }
            const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
            this.allSubpageVisible = visibleButtons === this.numberOfItems ? true : false;
        }
        else {
            this.loadSubpageForShow = false;
        }
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            const loadableButtons = Math.ceil(containerWidth / this.subpageWidth) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (this._elContainer.children.length === 0) {
                for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                    this.createSubpage(index);
                }
            }
            else if (this.getLastChild() < value + loadableButtons) {
                for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                    this.createSubpage(index);
                }
            }
            this._elContainer.scrollLeft = value !== 0 ? (value * this.subpageWidth) * -1 : 0;
        }
        else if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            const loadableButtons = Math.ceil(containerWidth / this.subpageWidth) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (this._elContainer.children.length === 0) {
                for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                    this.createSubpage(index);
                }
            }
            else if (this.getLastChild() < value + loadableButtons) {
                for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                    this.createSubpage(index);
                }
            }
            this._elContainer.scrollLeft = value !== 0 ? value * this.subpageWidth : 0;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height || this.containerHeight;
            const loadableButtons = Math.ceil(containerHeight / this.subpageHeight) + Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            if (containerHeight <= 10 || containerHeight <= this.subpageHeight + 10) {
                for (let i = 0; i < this.numberOfItems; i++) {
                    this.createSubpage(i);
                }
            }
            else {
                if (this._elContainer.children.length === 0) {
                    for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                        this.createSubpage(index);
                    }
                }
                else if (this.getLastChild() < value + loadableButtons) {
                    for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                        this.createSubpage(index);
                    }
                }
            }
            this._elContainer.scrollTop = value !== 0 ? value * this.subpageHeight : 0;
        }
        if (this.allSubpageVisible === false && this.loadSubpageForShow === true) {
            let counter = 0;
            for (let j = this.getFirstChild(); j <= this.getLastChild(); j++) {
                if (this.showSignalHolder[j].value === false) {
                    counter = counter + 1;
                }
            }
            let k = 0;
            while (counter !== 0 && k < counter && this.getLastChild() !== this.numberOfItems - 1) {
                if (this.showSignalHolder[this.getLastChild() + 1].value === true) {
                    k = k + 1;
                }
                this.createSubpage(this.getLastChild() + 1);
            }
        }
        this.initScrollbar();
    }
    handleScrollToPositionForAll(value) {
        var _a, _b;
        if (value >= this.numberOfItems || value < 0) {
            return;
        }
        if ((this.orientation === 'horizontal' && this.rows !== 1) || (this.orientation === 'vertical' && this.columns !== 1)) {
            return;
        }
        this.subpageWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.subpageWidth;
        this.subpageHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height) || this.subpageHeight;
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            this._elContainer.scrollLeft = (value * this.subpageWidth) * -1;
        }
        else if (this.orientation === 'horizontal') {
            this._elContainer.scrollLeft = value * this.subpageWidth;
        }
        else {
            this._elContainer.scrollTop = value * this.subpageHeight;
        }
        this.initScrollbar();
    }
    handleWidgetID() {
        if (isEmpty(this.widgetId)) {
            throw new Error('[ch5-subpage-reference-list] Error: No widgetId was provided');
        }
        const template = document.getElementById(this.widgetId);
        if (!(isNil(template))) {
            this._templateElement = template;
        }
        else {
            throw new Error(`[ch5-subpage-reference-list] Error: No template with the id: "${this.widgetId}" found`);
        }
        this.debounceSubpageDisplay();
    }
    handleStretch() {
        if (this.stretch === 'both') {
            this.stretch = this.orientation === 'horizontal' ? this.rows === 1 ? 'both' : null : this.columns === 1 ? 'both' : null;
        }
        if (this.stretch === null) {
            this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        }
        else {
            this.debounceSubpageDisplay();
        }
    }
    subpageDisplay(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        if (isReceiveStateScrollTo === true) {
            return this.handleScrollToPosition(this.scrollToPosition);
        }
        this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this.createSubpage(0);
        this.subpageWidth = this._elContainer.children[0].getBoundingClientRect().width;
        this.subpageHeight = this._elContainer.children[0].getBoundingClientRect().height;
        let loadedSubpages = 0;
        if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            loadedSubpages = Math.floor(containerWidth / this.subpageWidth) * this.rows + this.rows * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height || this.containerHeight;
            if (containerHeight > this.subpageHeight) {
                loadedSubpages = Math.floor(containerHeight / this.subpageHeight) * this.columns + this.columns * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
                ;
            }
            else {
                loadedSubpages = this.numberOfItems;
            }
        }
        loadedSubpages = loadedSubpages > this.numberOfItems ? this.numberOfItems : loadedSubpages;
        for (let index = 1; index < loadedSubpages; index++) {
            this.createSubpage(index);
        }
        if (this.endless) {
            this.orientation === 'horizontal' ? this._elContainer.scrollLeft = 5 : this._elContainer.scrollTop = 5;
        }
        this.initScrollbar();
        if (this.stretch === 'both') {
            this._elContainer.classList.add(this.primaryCssClass + '--stretch-both');
        }
        this.checkCenterItems();
        this.signalHolder();
        if (this.scrollToPosition !== 0) {
            this.handleScrollToPosition(this.scrollToPosition);
        }
    }
    subpageDisplayForLoadItemsNew(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        if (isReceiveStateScrollTo === true) {
            return this.handleScrollToPositionForNew(this.scrollToPosition);
        }
        this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this.createSubpage(0);
        this.subpageWidth = this._elContainer.children[0].getBoundingClientRect().width;
        this.subpageHeight = this._elContainer.children[0].getBoundingClientRect().height;
        let loadedButtons = 0;
        if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width || this.containerWidth;
            loadedButtons = Math.floor(containerWidth / this.subpageWidth) * this.rows + this.rows * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height || this.containerHeight;
            if (containerHeight > this.subpageHeight + 10) {
                loadedButtons = Math.floor(containerHeight / this.subpageHeight) * this.columns + this.columns * Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER;
            }
            else {
                loadedButtons = this.numberOfItems;
            }
        }
        loadedButtons = loadedButtons > this.numberOfItems ? this.numberOfItems : loadedButtons;
        for (let index = 1; index < loadedButtons; index++) {
            this.createSubpage(index);
        }
        if (this.endless) {
            this.orientation === 'horizontal' ? this._elContainer.scrollLeft = 5 : this._elContainer.scrollTop = 5;
        }
        this.initScrollbar();
        if (this.stretch === 'both') {
            this._elContainer.classList.add(this.primaryCssClass + '--stretch-both');
        }
        this.checkCenterItems();
        this.signalHolder();
        if (this.scrollToPosition !== 0) {
            this.handleScrollToPositionForNew(this.scrollToPosition);
        }
    }
    subpageDisplayForLoadItemsAll(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        Array.from(this._elContainer.children).forEach(container => container.remove());
        for (let index = 0; index < this.numberOfItems; index++) {
            this.createSubpage(index);
        }
        if (this.endless) {
            this.orientation === 'horizontal' ? this._elContainer.scrollLeft = 5 : this._elContainer.scrollTop = 5;
        }
        this.initScrollbar();
        if (this.stretch === 'both') {
            this._elContainer.classList.add(this.primaryCssClass + '--stretch-both');
        }
        this.checkCenterItems();
        if (isReceiveStateScrollTo === true && this.scrollToPosition === 0) {
            this.orientation === "horizontal" ? this._elContainer.scrollLeft = 0 : this._elContainer.scrollTop = 0;
        }
        if (this.scrollToPosition !== 0) {
            this.handleScrollToPositionForAll(this.scrollToPosition);
        }
    }
    replaceAll(str, find, replace) {
        if (str && String(str).trim() !== "") {
            return String(str).split(find).join(replace);
        }
        else {
            return str;
        }
    }
    createSubpage(index, append = true) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (index < 0 || index >= this.numberOfItems) {
            return;
        }
        ;
        if (isNil(this._templateElement)) {
            throw new Error('[ch5-subpage-reference-list] Error: Incorrect tag used');
        }
        const documentContainer = document.createElement('template');
        documentContainer.innerHTML = this._templateElement.innerHTML;
        const spgContainer = document.createElement("div");
        spgContainer.setAttribute('id', this.getCrId() + '-' + index);
        if (this.contractName !== "" && this.useContractForItemShow === true) {
            spgContainer.setAttribute('data-ch5-noshow-type', 'display');
            spgContainer.setAttribute('data-ch5-show', this.contractName + `.List_Item${index + 1}_Visible`);
        }
        else {
            if (((_a = this.getAttribute('subpageReceiveStateShow')) === null || _a === void 0 ? void 0 : _a.trim().includes(`{{${this.indexId}}}`)) === false) {
                const attrValue = (_b = this.getAttribute('subpageReceiveStateShow')) === null || _b === void 0 ? void 0 : _b.trim();
                if (attrValue) {
                    spgContainer.setAttribute('data-ch5-noshow-type', 'display');
                    spgContainer.setAttribute('data-ch5-show', attrValue.trim());
                }
            }
            else if (this.hasAttribute('subpageReceiveStateShow') && ((_c = this.getAttribute("subpageReceiveStateShow")) === null || _c === void 0 ? void 0 : _c.trim())) {
                const attrValue = this.replaceAll(((_d = this.getAttribute("subpageReceiveStateShow")) === null || _d === void 0 ? void 0 : _d.trim()) + '', `{{${this.indexId}}}`, '');
                const isNumber = /^[0-9]+$/.test(attrValue);
                spgContainer.setAttribute('data-ch5-noshow-type', 'display');
                if (isNumber) {
                    spgContainer.setAttribute('data-ch5-show', Number(attrValue) + index + '');
                }
                else {
                    spgContainer.setAttribute('data-ch5-show', this.replaceAll(((_e = this.getAttribute("subpageReceiveStateShow")) === null || _e === void 0 ? void 0 : _e.trim()) + '', `{{${this.indexId}}}`, index + ''));
                }
            }
        }
        if (this.contractName !== "" && this.useContractForItemEnable === true) {
            spgContainer.setAttribute('data-ch5-enable', this.contractName + `.List_Item${index + 1}_Enable`);
        }
        else {
            if (((_f = this.getAttribute('subpageReceiveStateEnable')) === null || _f === void 0 ? void 0 : _f.trim().includes(`{{${this.indexId}}}`)) === false) {
                const attrValue = (_g = this.getAttribute('subpageReceiveStateEnable')) === null || _g === void 0 ? void 0 : _g.trim();
                if (attrValue) {
                    spgContainer.setAttribute('data-ch5-enable', attrValue.trim());
                }
            }
            else if (this.hasAttribute('subpageReceiveStateEnable') && ((_h = this.getAttribute("subpageReceiveStateEnable")) === null || _h === void 0 ? void 0 : _h.trim())) {
                const attrValue = this.replaceAll(((_j = this.getAttribute("subpageReceiveStateEnable")) === null || _j === void 0 ? void 0 : _j.trim()) + '', `{{${this.indexId}}}`, '');
                const isNumber = /^[0-9]+$/.test(attrValue);
                if (isNumber) {
                    spgContainer.setAttribute('data-ch5-enable', Number(attrValue) + index + '');
                }
                else {
                    spgContainer.setAttribute('data-ch5-enable', this.replaceAll(((_k = this.getAttribute("subpageReceiveStateEnable")) === null || _k === void 0 ? void 0 : _k.trim()) + '', `{{${this.indexId}}}`, index + ''));
                }
            }
        }
        spgContainer.classList.add(this.nodeName.toLowerCase() + "--subpage-container");
        if (this.indexId !== null) {
            Ch5AugmentVarSignalsNames
                .replaceIndexIdInTmplElemsAttrs(documentContainer, (index), this.indexId);
            Ch5AugmentVarSignalsNames
                .replaceIndexIdInTmplElemsContent(documentContainer, (index), this.indexId);
        }
        spgContainer.appendChild((documentContainer.content));
        if (this.contractName !== "") {
            Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(spgContainer, this.contractName + '.Items[' + index + '].', 0, 0, 0);
        }
        else {
            Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(spgContainer, '', parseInt(this.booleanJoinIncrement, 10) * index || 0, parseInt(this.numericJoinIncrement, 10) * index || 0, parseInt(this.stringJoinIncrement, 10) * index || 0);
        }
        append ? this._elContainer.appendChild(spgContainer) : this._elContainer.prepend(spgContainer);
    }
    handleContractName() {
        if (this.contractName.trim().length === 0) {
            this.previousSignalValues.contractName = "";
            this.receiveStateShow = this.previousSignalValues.receiveStateShow;
            this.receiveStateEnable = this.previousSignalValues.receiveStateEnable;
            this.receiveStateCustomStyle = this.previousSignalValues.receiveStateCustomStyle;
            this.receiveStateCustomClass = this.previousSignalValues.receiveStateCustomClass;
            this.receiveStateNumberOfItems = this.previousSignalValues.receiveStateNumberOfItems;
            this.subpageReceiveStateScrollTo = this.previousSignalValues.subpageReceiveStateScrollTo;
        }
        this.debounceSubpageDisplay();
    }
    initialize() {
        if (this.previousSignalValues.contractName === "") {
            this.previousSignalValues.contractName = this.contractName;
            this.previousSignalValues.receiveStateShow = this.receiveStateShow;
            this.previousSignalValues.receiveStateEnable = this.receiveStateEnable;
            this.previousSignalValues.receiveStateCustomStyle = this.receiveStateCustomStyle;
            this.previousSignalValues.receiveStateCustomClass = this.receiveStateCustomClass;
            this.previousSignalValues.receiveStateNumberOfItems = this.receiveStateNumberOfItems;
            this.previousSignalValues.subpageReceiveStateScrollTo = this.subpageReceiveStateScrollTo;
        }
    }
    contractDefaultHelper() {
        if (this.contractName !== "") {
            if (this.useContractForCustomStyle === true) {
                this.receiveStateCustomStyle = this.contractName + '.CustomStyle';
            }
            else {
                this.receiveStateCustomStyle = this.previousSignalValues.receiveStateCustomStyle;
            }
            if (this.useContractForCustomClass === true) {
                this.receiveStateCustomClass = this.contractName + '.CustomClass';
            }
            else {
                this.receiveStateCustomClass = this.previousSignalValues.receiveStateCustomClass;
            }
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = this.contractName + '.List_Enable';
            }
            else {
                this.receiveStateEnable = this.previousSignalValues.receiveStateEnable;
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = this.contractName + '.List_Visible';
            }
            else {
                this.receiveStateShow = this.previousSignalValues.receiveStateShow;
            }
            if (this.useContractForNumItems === true) {
                this.receiveStateNumberOfItems = this.contractName + `.Set_Number_Of_Items`;
            }
            else {
                this.receiveStateNumberOfItems = this.previousSignalValues.receiveStateNumberOfItems;
            }
            this.subpageReceiveStateScrollTo = this.contractName + `.ListScrollToItem`;
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        if (this.stretch) {
            this._elContainer.classList.add(Ch5SubpageReferenceList.COMPONENT_DATA.STRETCH.classListPrefix + this.stretch);
        }
        this._elContainer.classList.add(Ch5SubpageReferenceList.ELEMENT_NAME + Ch5SubpageReferenceList.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._elContainer.style.setProperty("grid-template-rows", "repeat(" + this.rows + ", 1fr)");
        this._elContainer.classList.add(Ch5SubpageReferenceList.ELEMENT_NAME + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this._elContainer.classList.add(Ch5SubpageReferenceList.ELEMENT_NAME + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + this.centerItems);
        this.logger.stop();
    }
    initScrollbar() {
        var _a, _b, _c, _d;
        this.subpageWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.subpageWidth;
        this.subpageHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().width) || this.subpageHeight;
        if (this.orientation === "horizontal" && this.dir === 'rtl') {
            const { scrollWidth, offsetWidth, scrollLeft } = this._elContainer;
            this.scrollbarDimension = Math.floor(offsetWidth / scrollWidth * 100);
            const scrollbarLeft = Math.ceil(Math.abs(scrollLeft) / scrollWidth * 100);
            this._scrollbar.style.removeProperty('height');
            this._scrollbar.style.removeProperty('top');
            this._scrollbar.style.width = this.scrollbarDimension + '%';
            this._scrollbar.style.left = (100 - this.scrollbarDimension) - scrollbarLeft + '%';
        }
        else if (this.orientation === "horizontal") {
            const { scrollWidth, offsetWidth, scrollLeft } = this._elContainer;
            this.scrollbarDimension = Math.floor(offsetWidth / scrollWidth * 100);
            const scrollbarLeft = Math.ceil(scrollLeft / scrollWidth * 100);
            this._scrollbar.style.removeProperty('height');
            this._scrollbar.style.removeProperty('top');
            this._scrollbar.style.width = this.scrollbarDimension + '%';
            this._scrollbar.style.left = scrollbarLeft + '%';
        }
        else {
            const { scrollHeight, offsetHeight, scrollTop } = this._elContainer;
            this.scrollbarDimension = Math.floor(offsetHeight / scrollHeight * 100);
            const scrollbarTop = Math.ceil(scrollTop / scrollHeight * 100);
            this._scrollbar.style.removeProperty('width');
            this._scrollbar.style.removeProperty('left');
            this._scrollbar.style.height = this.scrollbarDimension + '%';
            this._scrollbar.style.top = scrollbarTop + '%';
        }
        this.subpageWidth = ((_c = this._elContainer.firstElementChild) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width) || this.subpageWidth;
        this.subpageHeight = ((_d = this._elContainer.firstElementChild) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().height) || this.subpageHeight;
        if (this.scrollbar) {
            if (this.scrollbarDimension === 100) {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + 'true');
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + 'false');
            }
            else {
                this.checkCenterItems();
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + 'false');
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX + 'true');
            }
        }
    }
    checkInternalHTML() {
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add(this.nodeName.toLowerCase());
            this.appendChild(this._elContainer);
        }
        if (this._scrollbar.parentElement !== this._scrollbarContainer) {
            this._scrollbar.classList.add('scrollbar');
            this._scrollbarContainer.appendChild(this._scrollbar);
        }
        if (this._scrollbarContainer.parentElement !== this) {
            this._scrollbarContainer.classList.add('scrollbar-container');
            this.appendChild(this._scrollbarContainer);
        }
    }
    signalHolder() {
        var _a, _b;
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true)) {
            this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
            this.showSignalHolder = [];
            this.loadSubpageForShow = true;
            for (let i = 1; i <= this.numberOfItems; i++) {
                const signalValue = `${this.contractName}.List_Item${i}_Visible`;
                const signalResponse = this.setSignalByBoolean(signalValue);
                this.showSignalHolder.push({ signalState: "", signalValue, value: false });
                if (!_.isNil(signalResponse)) {
                    this.showSignalHolder[i - 1].signalState = signalResponse.subscribe((newValue) => {
                        this.showSignalHolder[i - 1].value = newValue;
                        this.debounceSubpageShow();
                        return true;
                    });
                }
            }
        }
        else if (this.subpageReceiveStateShow.length !== 0 && this.subpageReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true) {
            this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
            this.showSignalHolder = [];
            this.loadSubpageForShow = true;
            const attrValue = this.replaceAll(((_a = this.getAttribute('subpageReceiveStateShow')) === null || _a === void 0 ? void 0 : _a.trim()) + '', `{{${this.indexId}}}`, '');
            const isNumber = /^[0-9]+$/.test(attrValue);
            for (let i = 0; i < this.numberOfItems; i++) {
                const signalValue = isNumber ? Number(attrValue) + i + '' : this.replaceAll(((_b = this.getAttribute('subpageReceiveStateShow')) === null || _b === void 0 ? void 0 : _b.trim()) + '', `{{${this.indexId}}}`, i + '');
                this.showSignalHolder.push({ signalState: "", signalValue, value: false });
                const signalResponse = this.setSignalByBoolean(signalValue);
                if (!_.isNil(signalResponse)) {
                    this.showSignalHolder[i].signalState = signalResponse.subscribe((newValue) => {
                        this.showSignalHolder[i].value = newValue;
                        this.debounceSubpageShow();
                        return true;
                    });
                }
            }
        }
    }
    clearOldSubscription(signalValue, signalState) {
        const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldReceiveStateSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(signalState);
        }
    }
    setSignalByBoolean(signalValue) {
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const receiveSignal = Ch5SignalFactory.getInstance().getBooleanSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    subpageShow() {
        const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
        this.allSubpageVisible = visibleButtons === this.numberOfItems ? true : false;
        if (this.allSubpageVisible === true) {
            return;
        }
        this.scrollToMiddleRange();
        if (this.centerItems === true) {
            const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } = this._elContainer;
            this.scrollbarDimension = this.orientation === "horizontal" ? Math.floor(offsetWidth / scrollWidth * 100) : Math.floor(offsetHeight / scrollHeight * 100);
            this.checkCenterItems();
        }
    }
    getFirstChild() {
        var _a, _b;
        return Number((_b = (_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) === null || _b === void 0 ? void 0 : _b.replace(this.getCrId() + '-', ''));
    }
    getLastChild() {
        var _a, _b;
        return Number((_b = (_a = this._elContainer.lastElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) === null || _b === void 0 ? void 0 : _b.replace(this.getCrId() + '-', ''));
    }
    scrollToRightEdgeRange() {
        let counter = 0;
        for (let j = this.getFirstChild(); j <= this.getLastChild(); j++) {
            if (this.showSignalHolder[j].value === false) {
                counter = counter + 1;
            }
        }
        let k = 0;
        while (counter !== 0 && k < counter && this.getFirstChild() !== 0) {
            if (this.showSignalHolder[this.getFirstChild() - 1].value === true) {
                k = k + 1;
            }
            this.createSubpage(this.getFirstChild() - 1, false);
        }
    }
    scrollToMiddleRange() {
        let counter = 0;
        for (let j = this.getFirstChild(); j <= this.getLastChild(); j++) {
            if (this.showSignalHolder[j].value === false) {
                counter = counter + 1;
            }
        }
        let k = 0;
        while (counter !== 0 && k < counter && this.getFirstChild() !== 0) {
            if (this.showSignalHolder[this.getFirstChild() - 1].value === true) {
                k = k + 1;
            }
            this.createSubpage(this.getFirstChild() - 1, false);
        }
        while (counter !== 0 && k < counter && this.getLastChild() !== this.numberOfItems - 1) {
            if (this.showSignalHolder[this.getLastChild() + 1].value === true) {
                k = k + 1;
            }
            this.createSubpage(this.getLastChild() + 1);
        }
    }
    scrollToLeftEdgeRange() {
        let counter = 0;
        for (let j = this.getFirstChild(); j <= this.getLastChild(); j++) {
            if (this.showSignalHolder[j].value === false) {
                counter = counter + 1;
            }
        }
        let k = 0;
        while (counter !== 0 && k < counter && this.getLastChild() !== this.numberOfItems - 1) {
            if (this.showSignalHolder[this.getLastChild() + 1].value === true) {
                k = k + 1;
            }
            this.createSubpage(this.getLastChild() + 1);
        }
    }
    checkCenterItems() {
        if (this.centerItems === true) {
            if (this.scrollbarDimension < 100) {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + "true");
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + "false");
            }
            else {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + "false");
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX + "true");
            }
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5SubpageReferenceList.SCROLLBAR_CLASSLIST_PREFIX = '--scrollbar-';
Ch5SubpageReferenceList.CENTER_ITEMS_CLASSLIST_PREFIX = '--center-items-';
Ch5SubpageReferenceList.SUBPAGE_CONTAINER_BUFFER = 4;
Ch5SubpageReferenceList.STRETCH = ['both'];
Ch5SubpageReferenceList.ORIENTATION = ['horizontal', 'vertical'];
Ch5SubpageReferenceList.LOAD_ITEMS = ['visible-only', 'load-new', 'all'];
Ch5SubpageReferenceList.COMPONENT_DATA = {
    ORIENTATION: {
        default: Ch5SubpageReferenceList.ORIENTATION[0],
        values: Ch5SubpageReferenceList.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    }, LOAD_ITEMS: {
        default: Ch5SubpageReferenceList.LOAD_ITEMS[0],
        values: Ch5SubpageReferenceList.LOAD_ITEMS,
        key: 'loadItems',
        attribute: 'loadItems',
        classListPrefix: '--load-items-'
    },
    STRETCH: {
        default: Ch5SubpageReferenceList.STRETCH[0],
        values: Ch5SubpageReferenceList.STRETCH,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '--stretch-'
    }
};
Ch5SubpageReferenceList.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { booleanjoinincrement: { direction: "state", booleanJoin: 1, contractName: true }, numericjoinincrement: { direction: "state", numericJoin: 1, contractName: true }, stringjoinincrement: { direction: "state", stringJoin: 1, contractName: true }, subpagereceivestatescrollto: { direction: "state", numericJoin: 1, contractName: true }, receivestatenumberofitems: { direction: "state", numericJoin: 1, contractName: true } });
Ch5SubpageReferenceList.COMPONENT_PROPERTIES = [
    {
        default: Ch5SubpageReferenceList.ORIENTATION[0],
        enumeratedValues: Ch5SubpageReferenceList.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SubpageReferenceList.ORIENTATION[0],
        isObservableProperty: true
    },
    {
        default: "",
        name: "contractName",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "useContractForEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForItemEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForItemShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForCustomStyle",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForCustomClass",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "useContractForNumItems",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "endless",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "centerItems",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: 1,
        name: "rows",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 1,
        numberProperties: {
            min: 1,
            max: 600,
            conditionalMin: 1,
            conditionalMax: 600,
            conditionalMinValue: 1,
            conditionalMaxValue: 600
        },
        isObservableProperty: true
    },
    {
        default: 1,
        name: "columns",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 1,
        numberProperties: {
            min: 1,
            max: 600,
            conditionalMin: 1,
            conditionalMax: 600,
            conditionalMinValue: 1,
            conditionalMaxValue: 600
        },
        isObservableProperty: true
    },
    {
        default: 0,
        name: "scrollToPosition",
        removeAttributeOnNull: true,
        nameForSignal: "subpageReceiveStateScrollTo",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 599,
            conditionalMin: 0,
            conditionalMax: 599,
            conditionalMinValue: 0,
            conditionalMaxValue: 599
        },
        isObservableProperty: true
    },
    {
        default: false,
        name: "scrollbar",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "0",
        isSignal: true,
        name: "booleanJoinIncrement",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "0",
        isSignal: true,
        name: "numericJoinIncrement",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "0",
        isSignal: true,
        name: "stringJoinIncrement",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "subpageReceiveStateEnable",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "subpageReceiveStateShow",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "widgetId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "subpageReceiveStateScrollTo",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5SubpageReferenceList.STRETCH,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: 10,
        name: "numberOfItems",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateNumberOfItems",
        type: "number",
        valueOnAttributeEmpty: 10,
        numberProperties: {
            min: 1,
            max: 600,
            conditionalMin: 1,
            conditionalMax: 600,
            conditionalMinValue: 1,
            conditionalMaxValue: 600
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateNumberOfItems",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "indexId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5SubpageReferenceList.LOAD_ITEMS[0],
        enumeratedValues: Ch5SubpageReferenceList.LOAD_ITEMS,
        name: "loadItems",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5SubpageReferenceList.LOAD_ITEMS[0],
        isObservableProperty: true,
    },
];
Ch5SubpageReferenceList.ELEMENT_NAME = 'ch5-subpage-reference-list';
Ch5SubpageReferenceList.registerCustomElement();
Ch5SubpageReferenceList.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXN1YnBhZ2UtcmVmZXJlbmNlLWxpc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc3VicGFnZS1yZWZlcmVuY2UtbGlzdC9jaDUtc3VicGFnZS1yZWZlcmVuY2UtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLDJCQUEyQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFNBQVM7SUFvWDVDLG9DQUFvQyxDQUFDLGFBQWtCO1FBQzdELE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUN0QixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUQsS0FBSyxNQUFNLE9BQU8sSUFBSSxXQUFXLEVBQUU7WUFDakMsTUFBTSxjQUFj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