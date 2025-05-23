import isNil from 'lodash/isNil';
import { Ch5Common } from '../ch5-common/ch5-common';
import { Ch5Config } from '..';
import { clamp } from '../ch5-triggerview/utils';
import { Ch5ListTemplate } from './ch5-list-template';
import { Ch5ListEventManager } from './ch5-list-event-manager';
import { Ch5ListSignalManager } from './ch5-list-signal-manager';
import { Ch5ListAnimation } from './ch5-list-animation';
import { Ch5ListBufferedItems } from './ch5-list-buffered-items';
import { Ch5AnimationFactory } from './animation/ch5-animation-factory';
import { subscribeInViewPortChange, unSubscribeInViewPortChange } from '../ch5-core';
import { Ch5RoleAttributeMapping } from '../utility-models';
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { noop } from '../ch5-common/utils';
export var Ch5ListItemAxis;
(function (Ch5ListItemAxis) {
    Ch5ListItemAxis[Ch5ListItemAxis["X"] = 0] = "X";
    Ch5ListItemAxis[Ch5ListItemAxis["Y"] = 1] = "Y";
})(Ch5ListItemAxis || (Ch5ListItemAxis = {}));
export const duration = 300;
export const easeMode = 'ease-out';
export class Ch5List extends Ch5Common {
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5List.ELEMENT_NAME, Ch5List.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerSignalAttributeDefaults() {
        Ch5SignalAttributeRegistry.instance.addElementDefaultAttributeEntries(Ch5List.ELEMENT_NAME, {
            contractName: { attributes: ["contractname"], defaultValue: "" },
            booleanJoin: { attributes: ["booleanjoinoffset"], defaultValue: "0" },
            numericJoin: { attributes: ["numericjoinoffset"], defaultValue: "0" },
            stringJoin: { attributes: ["stringjoinoffset"], defaultValue: "0" }
        });
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5List.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5List.ELEMENT_NAME, Ch5List);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-list';
        this._bufferedItems = {
            bufferActive: false,
            bufferingComplete: false,
            bufferForwardStartIndex: 0,
            forwardBufferedItems: [],
            bufferBackwardsStartIndex: 0,
            backwardsBufferedItems: []
        };
        this._appendPosition = 0;
        this._divListWidth = 0;
        this._divListHeight = 0;
        this.itemOffsetWidth = 0;
        this.itemOffsetHeight = 0;
        this.viewportClientHeight = 0;
        this.viewportClientWidth = 0;
        this.divList = document.createElement('div');
        this.pointerStartTime = 0;
        this.pointerEndTime = 0;
        this.stepOnX = 0;
        this.stepOnY = 0;
        this.currentPage = 0;
        this.templateElement = {};
        this.sizeResolver = {};
        this._currentXPosition = 0;
        this._currentYPosition = 0;
        this._defaultScrollToTime = 500;
        this._size = 1;
        this._previousSize = 1;
        this._orientation = Ch5List.ORIENTATION[0];
        this._bufferAmount = 0;
        this._itemHeight = null;
        this._itemWidth = null;
        this._minWidth = null;
        this._maxWidth = null;
        this._minHeight = null;
        this._maxHeight = null;
        this._pagedSwipe = false;
        this._scrollToTime = 500;
        this._indexId = null;
        this._direction = Ch5Common.DIRECTION[0];
        this._templateVars = null;
        this._receiveStateSize = null;
        this._receiveStateSizeSub = '';
        this._receiveStateScrollTo = null;
        this._receiveStateScrollToSub = '';
        this._receiveStateTemplateVars = null;
        this._receiveStateTemplateVarsSub = '';
        this._processingPan = false;
        this._storedOffsetWidth = 0;
        this._storedOffsetHeight = 0;
        this._tplHtmlString = '';
        this._updateTimer = undefined;
        this._isPointerActive = false;
        this._pointerId = 0;
        this._pointerFirstX = 0;
        this._pointerFirstY = 0;
        this._pointerLastX = 0;
        this._pointerLastY = 0;
        this._pointerCurrentX = 0;
        this._pointerCurrentY = 0;
        this._lastDraggedLayoutIndex = 0;
        this._trackingPointsX = [];
        this._trackingPointsY = [];
        this._dragTicking = false;
        this._maxDecelVelocity = 50;
        this._minDecelVelocity = 20;
        this._friction = 0.7;
        this._attraction = 0.04;
        this._decelVelocity = 0;
        this._decelerating = false;
        this._scrollToTimeReference = 0;
        this._initCompleted = false;
        this._cachedFirstRenderVisibleItemsNr = 0;
        this._items = [];
        this._lastViewIndex = -1;
        this._infiniteLoop = false;
        this._wrapperTranslateX = 0;
        this._wrapperTranslateY = 0;
        this._selectedIteration = 0;
        this._previousEffectiveLayoutIndex = 0;
        this._isListVisible = true;
        this.receiveStateScrollToChanged = false;
        this.templateHelper = new Ch5ListTemplate(this);
        this.signalManager = new Ch5ListSignalManager(this);
        this.animationHelper = new Ch5ListAnimation(this);
        this.eventManager = new Ch5ListEventManager(this);
        this.bufferdItemsHelper = new Ch5ListBufferedItems(this);
        this._ch5Properties = new Ch5Properties(this, Ch5List.COMPONENT_PROPERTIES);
        this.eventManager.addAnimationHelper(this.animationHelper);
        this.eventManager.addTemplateHelper(this.templateHelper);
        this.animationHelper.addTemplateHelper(this.templateHelper);
        this.animationHelper.addEventManager(this.eventManager);
        this.bufferdItemsHelper.addTemplateHelper(this.templateHelper);
    }
    getCssClassDisabled() {
        return `${this.primaryCssClass}--disabled`;
    }
    connectedCallback() {
        this._isListVisible = true;
        this.contentCleanUp();
        subscribeInViewPortChange(this, () => {
            this.info(`Ch5List.subscribeInViewPortChange() with elementIsInViewPort: ${this.elementIsInViewPort}, this.receiveStateScrollToChanged: ${this.receiveStateScrollToChanged}, _isListVisible: ${this._isListVisible},  this.hasAttribute('scrollbar'): ${this.hasAttribute('scrollbar')}`);
            if (this.elementIsInViewPort && (this._isListVisible || this.receiveStateScrollToChanged)) {
                this.info("Updating View");
                if (this.hasAttribute('scrollbar') && String(this.getAttribute('scrollbar')) === 'true') {
                    this.templateHelper.customScrollbar(this.divList);
                    setTimeout(() => {
                        this.templateHelper.resizeList(this.divList, this.templateVars);
                    }, 0.5);
                }
                else {
                    this.templateHelper.resetListLayout();
                }
                this.templateHelper.checkAndSetSizes();
                this.templateHelper.customScrollbar(this.divList);
                this._isListVisible = false;
                this.receiveStateScrollToChanged = false;
                if (this.hasAttribute('receiveStateScrollTo') && String(this.getAttribute('receiveStateScrollTo')) !== '') {
                    this.setScrollToContent();
                }
            }
        });
        const listInitialization = () => {
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', Ch5RoleAttributeMapping.ch5List);
            }
            if (this.hasAttribute('endless') && this.getAttribute('endless') !== 'false' && this.getAttribute('endless') !== null) {
                this.templateHelper.endless = true;
            }
            this.info('connectedCallback');
            this.setAttribute('data-ch5-id', this.getCrId());
            const templateFound = () => {
                this.info('connectedCallback initializations');
                this.initializations();
            };
            const templateNotFound = () => {
                this.info('add mutation observer in order to extract template data');
                this._startReadyObserver();
                this.initializations();
            };
            this._tplHtmlString = this.templateHelper.checkForTemplate();
            if (this._tplHtmlString === '') {
                templateNotFound();
                this.templateHelper.updateTemplateString(this._tplHtmlString);
            }
            else {
                templateFound();
            }
            this.initCommonMutationObserver(this);
            const animationFactory = new Ch5AnimationFactory();
            const animationApi = animationFactory.getAnimation(duration, easeMode, this.divList);
            this.animationHelper.addAnimationApi(animationApi);
            this.info("Callback loaded - ch5 list");
        };
        Promise.all([
            customElements.whenDefined('ch5-list'),
        ]).then(() => {
            listInitialization();
            this.componentLoadedEvent('ch5-list', this.id);
        });
    }
    initializations() {
        this.cacheComponentChildrens();
        this.initializeAttributes();
        this.resolveTemplateChildren(this.templateElement);
        const tplVars = Ch5Config.getTemplateVarsForElement(this);
        if (tplVars.length > 0) {
            this.templateVars = JSON.stringify(tplVars);
        }
        this._previousEffectiveLayoutIndex = this.selected;
        if (this._tplHtmlString.length <= 0) {
            return;
        }
        this.templateHelper.resizeList(this.divList, this.templateVars);
        if (!this.isPagedSwipeCompatible(this.pagedSwipe)) {
            this.pagedSwipe = false;
        }
        this.initializeEvents();
        this._initCompleted = true;
    }
    disconnectedCallback() {
        this.removeEvents();
        this.unsubscribeFromSignals();
        unSubscribeInViewPortChange(this);
        this.disconnectCommonMutationObserver();
    }
    unsubscribeFromSignals() {
        this.info('unsubscribeFromSignals()');
        super.unsubscribeFromSignals();
        this.signalManager.unsubscribeFromSignals(this.clearStringSignalSubscription);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('ch5-list attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        this.info('attribute changed callback:', attr);
        const attributeChangedProperty = Ch5List.COMPONENT_PROPERTIES.find((property) => {
            return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true;
        });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        else {
            switch (attr) {
                case 'selected':
                    const parsedNewValue = parseInt(newValue, 10);
                    if (!Number.isFinite(parsedNewValue) ||
                        parsedNewValue > this._lastViewIndex ||
                        parsedNewValue < 0) {
                        this.selected = Number(oldValue) || 0;
                        return;
                    }
                    if (this._infiniteLoop) {
                        const effectiveLayoutIndex = this.selected +
                            this._selectedIteration * (this._lastViewIndex + 1);
                        const selectionDelta = this._previousEffectiveLayoutIndex -
                            effectiveLayoutIndex;
                        const itemsInViewIndexes = [];
                        const indexOffset = selectionDelta < 0 ?
                            this.getItemsPerPage() + selectionDelta : 0;
                        for (let i = -1; i < Math.abs(selectionDelta); i++) {
                            itemsInViewIndexes.push(i + effectiveLayoutIndex + indexOffset);
                        }
                        this._previousEffectiveLayoutIndex = effectiveLayoutIndex;
                    }
                    break;
                case 'disableanimation':
                    this.animationHelper.disableAnimation = (newValue !== null);
                    break;
                case 'size':
                    const newSize = newValue ? Number(newValue) : 1;
                    if (this._initCompleted && newSize !== this.size) {
                        this.size = newSize;
                        this.templateHelper.resizeList(this.divList, this.templateVars);
                    }
                    break;
                case 'orientation':
                    if (this.hasAttribute('orientation')) {
                        this.orientation = newValue;
                    }
                    else {
                        this.orientation = Ch5List.ORIENTATION[0];
                    }
                    break;
                case 'bufferamount':
                    if (this.hasAttribute('bufferamount')) {
                        this.bufferAmount = Number(newValue);
                    }
                    else {
                        this.bufferAmount = 0;
                    }
                    break;
                case 'itemheight':
                    if (this.hasAttribute('itemheight')) {
                        this.itemHeight = newValue;
                    }
                    break;
                case 'itemwidth':
                    if (this.hasAttribute('itemwidth')) {
                        this.itemWidth = newValue;
                    }
                    break;
                case 'minwidth':
                    if (this.hasAttribute('minwidth')) {
                        this.minWidth = newValue;
                    }
                    break;
                case 'maxwidth':
                    if (this.hasAttribute('maxwidth')) {
                        this.maxWidth = newValue;
                    }
                    break;
                case 'minheight':
                    if (this.hasAttribute('minheight')) {
                        this.minHeight = newValue;
                    }
                    break;
                case 'maxheight':
                    if (this.hasAttribute('maxheight')) {
                        this.maxHeight = newValue;
                    }
                    break;
                case 'indexid':
                    if (this.hasAttribute('indexid')) {
                        this.indexId = newValue;
                    }
                    break;
                case 'pagedswipe':
                    if (this.hasAttribute('pagedswipe')) {
                        this.pagedSwipe = newValue === 'true' ? true : false;
                    }
                    break;
                case 'scrolltotime':
                    if (this.hasAttribute('scrolltotime')) {
                        this.scrollToTime = Number(newValue);
                    }
                    break;
                case 'dir':
                    if (this.hasAttribute('dir')) {
                        this.direction = newValue;
                    }
                    break;
                case 'receivestatesize':
                    if (this.hasAttribute('receivestatesize')) {
                        this.receiveStateSize = newValue;
                    }
                    else {
                        this.receiveStateSize = '';
                    }
                    break;
                case 'receivestatescrollto':
                    if (this.hasAttribute('receivestatescrollto')) {
                        this.receiveStateScrollTo = newValue;
                    }
                    else {
                        this.receiveStateScrollTo = '';
                    }
                    break;
                case 'receivestatetemplatevars':
                    if (this.hasAttribute('receivestatetemplatevars')) {
                        this.receiveStateTemplateVars = newValue;
                    }
                    else {
                        this.receiveStateTemplateVars = '';
                    }
                    break;
                default:
                    super.attributeChangedCallback(attr, oldValue, newValue);
                    break;
            }
        }
    }
    getItemSize() {
        return this.isHorizontal ? this.itemOffsetWidth : this.itemOffsetHeight;
    }
    getItemsPerPage() {
        let numberOfItems = 0;
        if (this.isHorizontal) {
            numberOfItems = this.viewportClientWidth / this.itemOffsetWidth;
        }
        else {
            numberOfItems = this.viewportClientHeight / this.itemOffsetHeight;
        }
        return numberOfItems;
    }
    getVisibleItemsPerPage() {
        const itemsPerPage = this.getItemsPerPage();
        return Math.floor(itemsPerPage);
    }
    _canUseBufferAmount(firstRenderVisibleItemsNr) {
        const size = Number(this.size);
        return firstRenderVisibleItemsNr < size;
    }
    getFirstRenderVisibleItemsNr(resetFirstRenderVisItemsNrCache = false) {
        if (resetFirstRenderVisItemsNrCache) {
            this._cachedFirstRenderVisibleItemsNr = 0;
        }
        if (this._cachedFirstRenderVisibleItemsNr > 0) {
            return this._cachedFirstRenderVisibleItemsNr;
        }
        const size = Number(this.size);
        const bAmount = Number(this.bufferAmount);
        if (bAmount === 0 || size <= bAmount) {
            this._cachedFirstRenderVisibleItemsNr = size;
        }
        else {
            this._cachedFirstRenderVisibleItemsNr = this._getFirstRenderedItemsNr(size);
        }
        return this._cachedFirstRenderVisibleItemsNr;
    }
    swipe(func) {
        if (!this._processingPan) {
            this._processingPan = true;
            if (this.divList.childElementCount > 0) {
                func.then(() => {
                    this._processingPan = false;
                }).catch((error) => {
                    this._processingPan = false;
                    this.error('Error while processing a swipe operation. More details: ', error);
                }).then(noop);
            }
        }
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5List.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5List.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5List.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        const listAttributes = [
            'selected',
            'disableanimation',
            'size',
            'orientation',
            'bufferamount',
            'itemheight',
            'itemwidth',
            'minwidth',
            'maxwidth',
            'minheight',
            'maxheight',
            'indexid',
            'pagedswipe',
            'endless',
            'scrolltotime',
            'direction',
            'receivestateshow',
            'receivestatesize',
            'receivestatescrollto',
            'receivestatetemplatevars',
        ];
        return commonAttributes.concat(listAttributes);
    }
    set currentXPosition(position) {
        if (isNil(position)) {
            return;
        }
        this._currentXPosition = position;
    }
    get currentXPosition() {
        return this._currentXPosition;
    }
    set currentYPosition(position) {
        if (isNil(position)) {
            return;
        }
        this._currentYPosition = position;
    }
    get currentYPosition() {
        return this._currentYPosition;
    }
    get isVertical() {
        return this.orientation === Ch5List.ORIENTATION[0];
    }
    get isHorizontal() {
        return this.orientation === Ch5List.ORIENTATION[1];
    }
    get size() {
        if (this._size === undefined) {
            this._size = 1;
        }
        return this._size;
    }
    set size(value) {
        if (isNil(value)) {
            value = 1;
        }
        if (value > 1000) {
            value = 1000;
        }
        if (value !== this._size) {
            this._size = Number(value);
            this.setAttribute('size', this._size.toString());
        }
    }
    get previousSize() {
        if (isNil(this._previousSize)) {
            this._previousSize = 1;
        }
        return this._previousSize;
    }
    set previousSize(value) {
        if (isNil(value)) {
            value = 1;
        }
        if (value > 1000) {
            value = 1000;
        }
        this._previousSize = Number(value);
    }
    get orientation() {
        if (this._orientation == null) {
            this._orientation = Ch5List.ORIENTATION[0];
        }
        return this._orientation;
    }
    set orientation(value) {
        if (isNil(value)) {
            value = Ch5List.ORIENTATION[0];
        }
        if (value === this._orientation) {
            return;
        }
        if (Ch5List.ORIENTATION.indexOf(value) >= 0) {
            this._orientation = value;
        }
        else {
            this._orientation = Ch5List.ORIENTATION[0];
        }
        this.setAttribute('orientation', this._orientation);
    }
    get bufferAmount() {
        return this._bufferAmount;
    }
    set bufferAmount(value) {
        if (isNil(value)) {
            value = 0;
        }
        if (value === this.bufferAmount) {
            return;
        }
        this._bufferAmount = Number(value);
        this.setAttribute('bufferamount', this._bufferAmount.toString());
    }
    get itemHeight() {
        return this._itemHeight;
    }
    set itemHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._itemHeight) {
            return;
        }
        this._itemHeight = value;
        this.setAttribute('itemheight', value);
        this.templateHelper.attachCSS();
        this.templateHelper.checkAndSetSizes();
    }
    get itemWidth() {
        return this._itemWidth;
    }
    set itemWidth(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._itemWidth) {
            return;
        }
        this._itemWidth = value;
        this.setAttribute('itemwidth', value);
        this.templateHelper.attachCSS();
        this.templateHelper.checkAndSetSizes();
    }
    get minWidth() {
        return this._minWidth;
    }
    set minWidth(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._minWidth) {
            return;
        }
        this._minWidth = value;
        this.setAttribute('minwidth', this._minWidth);
        this.templateHelper.triggerResizeDueWidthAndHeightUpdates();
        this.templateHelper.resetListLayout();
    }
    get maxWidth() {
        if (isNil(this._maxWidth)) {
            this._maxWidth = '';
        }
        return this._maxWidth;
    }
    set maxWidth(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._maxWidth) {
            return;
        }
        this._maxWidth = value;
        this.setAttribute('maxwidth', this._maxWidth);
    }
    isLtr() {
        if (this.isVertical) {
            return true;
        }
        return this.direction === Ch5Common.DIRECTION[0];
    }
    getMaxWidthInPxFromPercentage() {
        let _value = this.maxWidth;
        if (this.parentElement) {
            const listParentSizingDetails = this.parentElement.getBoundingClientRect();
            const sizePercentage = Ch5Common.extractMeasurementNumber(_value);
            _value = `${String(listParentSizingDetails.width * sizePercentage / 100)}px`;
        }
        return _value;
    }
    getMaxHeightInPxFromPercentage() {
        let _value = this.maxHeight;
        if (this.parentElement) {
            const listParentSizingDetails = this.parentElement.getBoundingClientRect();
            const sizePercentage = Ch5Common.extractMeasurementNumber(_value);
            _value = `${String(listParentSizingDetails.height * sizePercentage / 100)}px`;
        }
        return _value;
    }
    calculatePxSize(value, percentageCallback) {
        const measurementUnit = Ch5Common.getMeasurementUnitFromSizeValue(value);
        switch (measurementUnit) {
            case '%':
                if (typeof percentageCallback === 'function') {
                    return percentageCallback();
                }
                break;
            case 'vw':
                const unitNr = Ch5Common.extractMeasurementNumber(value);
                return `${Ch5Common.convertVwUnitsToPx(unitNr)}px`;
        }
        return value;
    }
    get minHeight() {
        if (isNil(this._minHeight)) {
            this._minHeight = '';
        }
        return this._minHeight;
    }
    set minHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._minHeight) {
            return;
        }
        this._minHeight = value;
        this.setAttribute('minheight', value);
        this.templateHelper.triggerResizeDueWidthAndHeightUpdates();
        this.templateHelper.resetListLayout();
    }
    get maxHeight() {
        return this._maxHeight;
    }
    set maxHeight(value) {
        value = this._checkAndSetStringValue(value);
        if (value === this._maxHeight) {
            return;
        }
        this._maxHeight = value;
        this.setAttribute('maxheight', value);
        this.templateHelper.triggerResizeDueWidthAndHeightUpdates();
        this.templateHelper.resetListLayout();
    }
    get indexId() {
        if (isNil(this._indexId)) {
            this._indexId = "1";
        }
        return this._indexId;
    }
    set indexId(value) {
        if (isNil(value)) {
            value = '1';
        }
        if (value === this._indexId) {
            return;
        }
        this._indexId = value;
        this.setAttribute('indexid', value);
    }
    get pagedSwipe() {
        if (this._pagedSwipe == null) {
            this._pagedSwipe = false;
        }
        return this._pagedSwipe;
    }
    set pagedSwipe(value) {
        if (value == null) {
            value = false;
        }
        if (value === this._pagedSwipe) {
            return;
        }
        this._pagedSwipe = value;
        if (value === true) {
            this.setAttribute('pagedswipe', value.toString());
        }
        else {
            this.removeAttribute('pagedswipe');
        }
    }
    set endless(value) {
        this._ch5Properties.set("endless", value, () => {
            this.handleScrollbar();
        });
    }
    get endless() {
        return this._ch5Properties.get("endless");
    }
    set scrollbar(value) {
        this._ch5Properties.set("scrollbar", value, () => {
            this.templateHelper.removeScrollbar();
            if (this.hasAttribute('scrollbar')) {
                this.templateHelper.customScrollbar(this.divList);
            }
            this.handleScrollbar();
        });
    }
    get scrollbar() {
        return this._ch5Properties.get("scrollbar");
    }
    get scrollToTime() {
        if (this._scrollToTime == null) {
            return this._defaultScrollToTime;
        }
        return this._scrollToTime;
    }
    set scrollToTime(value) {
        if (isNil(value)) {
            value = this._defaultScrollToTime;
        }
        if (value === this._scrollToTime) {
            return;
        }
        this._scrollToTime = value;
        this.setAttribute('scrolltotime', value.toString());
    }
    get templateVars() {
        return this._templateVars;
    }
    set templateVars(value) {
        this._templateVars = value;
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        if (value == null) {
            value = "ltr";
        }
        if (Ch5Common.DIRECTION.indexOf(value) >= 0) {
            this._direction = value;
        }
        else {
            this._direction = Ch5Common.DIRECTION[0];
        }
    }
    set isPointerActive(status) {
        if (this._isPointerActive === status ||
            (isNil(status))) {
            return;
        }
        this._isPointerActive = status;
    }
    get isPointerActive() {
        return this._isPointerActive;
    }
    set pointerId(id) {
        this._pointerId = id;
    }
    get pointerId() {
        return this._pointerId;
    }
    set decelerating(decelerate) {
        if (isNil(decelerate) ||
            this.decelerating === decelerate) {
            return;
        }
        this._decelerating = decelerate;
    }
    get decelerating() {
        return this._decelerating;
    }
    set decelVelocity(velocity) {
        if (isNil(velocity) ||
            this._decelVelocity === velocity) {
            return;
        }
        this._decelVelocity = velocity;
    }
    get decelVelocity() {
        return this._decelVelocity;
    }
    get receiveStateSize() {
        return this._attributeValueAsString('receivestatesize');
    }
    set receiveStateSize(value) {
        if (this._receiveStateSize === value || isNil(value)) {
            return;
        }
        this._receiveStateSize = value;
        this.setAttribute('receivestatesize', value);
        const callback = (newValue) => {
            const _newValue = newValue;
            if (_newValue !== null || _newValue !== undefined) {
                if (_newValue >= 0 && _newValue < 1001) {
                    const previousItemsCount = this._items.length;
                    this.setAttribute('size', '' + _newValue);
                    if (this.endless) {
                        this.animationHelper.maxOffsetTranslate = undefined;
                        this.shouldUpdateListAndPosition(previousItemsCount);
                    }
                    else {
                        const bufferAmount = this.bufferAmount || 0;
                        const maxOffsetTranslate = this.animationHelper.adjustMaxOffset(bufferAmount > 0);
                        this.animationHelper.maxOffsetTranslate = maxOffsetTranslate;
                        this.shouldUpdateListAndPosition(previousItemsCount);
                    }
                }
                else if (_newValue > 1000) {
                    this.info(`List size exceeded : ${_newValue} ; `);
                }
            }
        };
        this._receiveStateSizeSub = this.signalManager.subscribeToSignal(0, this._receiveStateSize, this.receiveStateSizeSub, callback);
    }
    getLayoutInfo() {
        if (!this.bufferAmount) {
            return this.sizeResolver;
        }
        const itemsPerPage = this.getItemsPerPage();
        const firstItemSize = this.getItemSize();
        const definedListSize = this.size || 0;
        const listSize = (definedListSize - itemsPerPage) * firstItemSize;
        return {
            hiddenListSize: listSize,
            fullListSize: definedListSize * firstItemSize,
            viewPortSize: this.sizeResolver.viewPortSize,
        };
    }
    get receiveStateScrollTo() {
        return this._attributeValueAsString('receivestatescrollto');
    }
    set receiveStateScrollTo(value) {
        if (this._receiveStateScrollTo === value || isNil(value)) {
            return;
        }
        this._receiveStateScrollTo = value;
        this.setAttribute('receivestatescrollto', value);
    }
    handleScrollbar() {
        if (this.endless) {
            this.scrollbar = false;
        }
    }
    setScrollToContent() {
        setTimeout(() => {
            const callback = (newValue) => {
                const _newValue = newValue;
                this.info("SignalSubscriptionCallback value is ", _newValue);
                if (_newValue !== null || _newValue !== undefined) {
                    const bufferAmount = this.bufferAmount || 0;
                    const maxOffsetTranslate = this.animationHelper.adjustMaxOffset(bufferAmount > 0);
                    this.animationHelper.maxOffsetTranslate = maxOffsetTranslate;
                    this.animationHelper.signalScrollTo(_newValue);
                    this.receiveStateScrollToChanged = true;
                }
            };
            this._receiveStateScrollToSub = this.signalManager.subscribeToSignal(0, this.receiveStateScrollTo, this.receiveStateScrollToSub, callback);
        }, 100);
    }
    get receiveStateTemplateVars() {
        return this._attributeValueAsString('receivestatetemplatevars');
    }
    set receiveStateTemplateVars(value) {
        if (this._receiveStateTemplateVars === value || isNil(value)) {
            return;
        }
        this._receiveStateTemplateVars = value;
        this.setAttribute('receivestatetemplatevars', value);
        const subscriptionCallback = (newValue) => {
            const _newValue = newValue;
            if (!isNil(_newValue)) {
                this.templateVars = _newValue;
                this.templateHelper.resizeList(this.divList, this.templateVars);
            }
        };
        this._receiveStateTemplateVarsSub = this.signalManager.subscribeToSignal('', this.receiveStateTemplateVars, this.receiveStateTemplateVarsSub, subscriptionCallback);
    }
    get receiveStateSizeSub() {
        return this._receiveStateSizeSub;
    }
    set receiveStateSizeSub(subscription) {
        this._receiveStateSizeSub = subscription;
    }
    get receiveStateScrollToSub() {
        return this._receiveStateScrollToSub;
    }
    set receiveStateScrollToSub(subscription) {
        this._receiveStateScrollToSub = subscription;
    }
    get receiveStateTemplateVarsSub() {
        return this._receiveStateTemplateVarsSub;
    }
    set receiveStateTemplateVarsSub(subscription) {
        this._receiveStateTemplateVarsSub = subscription;
    }
    get selected() {
        const value = this.getAttribute('selected');
        return isNil(value) ? 0 : parseInt(value, 10);
    }
    set selected(index) {
        this.setAttribute('selected', index.toString());
    }
    set disableAnimation(value) {
        value = Boolean(value);
        if (value) {
            this.setAttribute('disableAnimation', '');
        }
        else {
            this.removeAttribute('disableAnimation');
        }
    }
    get disableAnimation() {
        return this.hasAttribute('disableAnimation');
    }
    get appendPosition() {
        return this._appendPosition;
    }
    set appendPosition(position) {
        if (isNil(position) ||
            this._appendPosition === position) {
            return;
        }
        this._appendPosition = position;
    }
    set pointerFirstX(pointer) {
        if (isNil(pointer) ||
            this.pointerFirstX === pointer) {
            return;
        }
        this._pointerFirstX = pointer;
    }
    get pointerFirstX() {
        return this._pointerFirstX;
    }
    set pointerLastX(pointer) {
        if (isNil(pointer) ||
            this._pointerLastX === pointer) {
            return;
        }
        this._pointerLastX = pointer;
    }
    get pointerLastX() {
        return this._pointerLastX;
    }
    set pointerCurrentX(pointer) {
        if (isNil(pointer) ||
            this._pointerCurrentX === pointer) {
            return;
        }
        this._pointerCurrentX = pointer;
    }
    get pointerCurrentX() {
        return this._pointerCurrentX;
    }
    set pointerCurrentY(pointer) {
        if (isNil(pointer) || this._pointerCurrentY === pointer) {
            return;
        }
        this._pointerCurrentY = pointer;
    }
    get pointerCurrentY() {
        return this._pointerCurrentY;
    }
    set pointerFirstY(pointer) {
        if (isNil(pointer) ||
            this._pointerFirstY === pointer) {
            return;
        }
        this._pointerFirstY = pointer;
    }
    get pointerFirstY() {
        return this._pointerFirstY;
    }
    set pointerLastY(pointer) {
        if (isNil(pointer) ||
            this._pointerLastY === pointer) {
            return;
        }
        this._pointerLastY = pointer;
    }
    get pointerLastY() {
        return this._pointerLastY;
    }
    set lastDraggedLayoutIndex(index) {
        if (isNil(index) ||
            this._lastDraggedLayoutIndex === index) {
            return;
        }
        this._lastDraggedLayoutIndex = index;
    }
    get lastDraggedLayoutIndex() {
        return this._lastDraggedLayoutIndex;
    }
    set trackingPointsX(points) {
        if (isNil(points)) {
            return;
        }
        this._trackingPointsX = points;
    }
    get trackingPointsX() {
        return this._trackingPointsX;
    }
    set trackingPointsY(points) {
        if (isNil(points)) {
            return;
        }
        this._trackingPointsY = points;
    }
    get trackingPointsY() {
        return this._trackingPointsY;
    }
    set items(items) {
        if (isNil(items)) {
            return;
        }
        this._items = items;
    }
    get items() {
        return this._items;
    }
    set selectedIteration(iterationNumber) {
        if (isNil(iterationNumber) ||
            this._selectedIteration === iterationNumber) {
            return;
        }
        this._selectedIteration = iterationNumber;
    }
    get selectedIteration() {
        return this._selectedIteration;
    }
    set wrapperTranslateX(value) {
        if (isNil(value) ||
            this._wrapperTranslateX === value) {
            return;
        }
        this._wrapperTranslateX = value;
    }
    get wrapperTranslateX() {
        return this._wrapperTranslateX;
    }
    set wrapperTranslateY(value) {
        if (isNil(value) ||
            this._wrapperTranslateY === value) {
            return;
        }
        this._wrapperTranslateY = value;
    }
    get wrapperTranslateY() {
        return this._wrapperTranslateY;
    }
    set minDecelVelocity(value) {
        if (isNil(value) ||
            this._minDecelVelocity === value) {
            return;
        }
        this._minDecelVelocity = value;
    }
    get minDecelVelocity() {
        return this._minDecelVelocity;
    }
    set maxDecelVelocity(value) {
        if (isNil(value) ||
            this._maxDecelVelocity === value) {
            return;
        }
        this._maxDecelVelocity = value;
    }
    set divListWidth(value) {
        if (isNil(value) ||
            this._divListWidth === value) {
            return;
        }
        this._divListWidth = value;
    }
    get divListWidth() {
        return this._divListWidth;
    }
    set divListHeight(value) {
        if (isNil(value) ||
            this._divListHeight === value) {
            return;
        }
        this._divListHeight = value;
    }
    get divListHeight() {
        return this._divListHeight;
    }
    set lastViewIndex(index) {
        if (isNil(index) || this._lastViewIndex === index) {
            return;
        }
        this._lastViewIndex = index;
    }
    get lastViewIndex() {
        return this._lastViewIndex;
    }
    set attraction(value) {
        if (isNil(value) || this._lastViewIndex === value) {
            return;
        }
        this._attraction = value;
    }
    get attraction() {
        return this._attraction;
    }
    set friction(value) {
        if (isNil(value) || this._lastViewIndex === value) {
            return;
        }
        this._friction = value;
    }
    get friction() {
        return this._friction;
    }
    set dragTicking(tick) {
        if (isNil(tick) ||
            this._dragTicking === tick) {
            return;
        }
        this._dragTicking = tick;
    }
    get dragTicking() {
        return this._dragTicking;
    }
    set infiniteLoop(loop) {
        if (isNil(loop) ||
            this._infiniteLoop === loop) {
            return;
        }
        this._infiniteLoop = loop;
    }
    get infiniteLoop() {
        return this._infiniteLoop;
    }
    set bufferedItems(bufferedItems) {
        if (isNil(bufferedItems) ||
            this._bufferedItems === bufferedItems) {
            return;
        }
        this._bufferedItems = bufferedItems;
    }
    get bufferedItems() {
        return this._bufferedItems;
    }
    set scrollToTimeReference(ref) {
        if (isNil(ref) ||
            this._scrollToTimeReference === ref) {
            return;
        }
        this._scrollToTimeReference = ref;
    }
    get scrollToTimeReference() {
        return this._scrollToTimeReference;
    }
    set storedOffsetWidth(width) {
        if (isNil(width)) {
            return;
        }
        this._storedOffsetWidth = width;
    }
    get storedOffsetWidth() {
        return this._storedOffsetWidth;
    }
    set storedOffsetHeight(height) {
        if (isNil(height)) {
            return;
        }
        this._storedOffsetHeight = height;
    }
    get storedOffsetHeight() {
        return this._storedOffsetHeight;
    }
    previousViewChild() {
        this.selected = this.computePrevious(this.selected);
    }
    nextViewChild() {
        this.selected = this.computeNext(this.selected);
    }
    onResizeList() {
        this._items = this._getItems();
        this._internalUpdate();
    }
    getItemDataIndexFromLayoutIndex(layoutIndex) {
        let positiveLayoutIndex = layoutIndex;
        while (positiveLayoutIndex < 0) {
            positiveLayoutIndex += this._items.length;
        }
        return positiveLayoutIndex % this._items.length;
    }
    computeNext(i) {
        let nextItemIndex = i;
        if (i < this._lastViewIndex) {
            nextItemIndex = i + 1;
        }
        else if (this.endless) {
            if (this._infiniteLoop) {
                this._selectedIteration += 1;
            }
            nextItemIndex = 0;
        }
        return clamp(nextItemIndex, 0, this._lastViewIndex);
    }
    computePrevious(i) {
        let previousItemIndex = i;
        if (i > 0) {
            previousItemIndex = i - 1;
        }
        else if (this.endless) {
            if (this._infiniteLoop) {
                this._selectedIteration -= 1;
            }
            previousItemIndex = this._lastViewIndex;
        }
        return clamp(previousItemIndex, 0, this._lastViewIndex);
    }
    update() {
        clearTimeout(this._updateTimer);
        this._updateTimer = window.setTimeout(() => {
            this._internalUpdate();
        }, 50);
    }
    handleShow(targetElement) {
        super.handleShow(targetElement);
        this.templateHelper.resizeList(this.divList, this.templateVars);
    }
    isPagedSwipeCompatible(pagedSwipe) {
        if (!pagedSwipe) {
            return true;
        }
        const listSize = this.size || 0;
        const numberOfItemsPerPage = this.sizeResolver.getItemsPerPage();
        const amountOfHiddenListItems = listSize - numberOfItemsPerPage;
        if (numberOfItemsPerPage > amountOfHiddenListItems) {
            this.invokePropIncompatibility('pagedSwipe');
            return false;
        }
        return true;
    }
    invokePropIncompatibility(attribute) {
        switch (attribute) {
            case 'pagedSwipe':
                console.warn(this.definePropIncompatibilityInfo(attribute, [
                    'size',
                    'endless'
                ]));
                break;
        }
    }
    definePropIncompatibilityInfo(attribute, reasons) {
        const reasonsList = reasons.join(',');
        return `For element #${this.id} - ${attribute} doesn't work as expected. See(${reasonsList})`;
    }
    _getCssBiggestSizeValue(maxSize, actualValue) {
        let s = actualValue;
        if (maxSize) {
            const max = Ch5Common.getMeasurementPxNumber(maxSize);
            if (s < max) {
                s = max;
            }
        }
        return s;
    }
    shouldUpdateListAndPosition(previousItemsCount) {
        this._items = this._getItems();
        if (this._items.length < previousItemsCount) {
            if (this.isVertical) {
                this.resetListAndPosition();
            }
            else if (this.isHorizontal) {
                this.resetListAndPosition();
            }
        }
        else if (this.endless) {
            this.animationHelper.stop();
        }
        else if (this._items.length > previousItemsCount && this.direction === Ch5Common.DIRECTION[1]) {
            this.resetListAndPosition();
        }
    }
    resetListAndPosition() {
        this.animationHelper.stop();
        this.currentXPosition = 0;
        this.currentYPosition = 0;
        this.templateHelper.resizeList(this.divList, this.templateVars);
    }
    _getFirstRenderedItemsNr(size) {
        const divListSizingDetails = this.divList.getBoundingClientRect();
        const firstItemSizingDetails = this.getFirstItemSizingDetails();
        let itemsToShowNrOnFirstRender = 0;
        if (this.orientation === Ch5List.ORIENTATION[0]) {
            const _maxHeight = this.calculatePxSize(this.maxHeight, this.getMaxHeightInPxFromPercentage.bind(this));
            const listH = this._getCssBiggestSizeValue(_maxHeight, divListSizingDetails.height);
            const itemH = Math.max(this.itemOffsetHeight, firstItemSizingDetails.height);
            itemsToShowNrOnFirstRender = Math.ceil(listH / itemH);
        }
        else {
            const _maxWidth = this.calculatePxSize(this.maxWidth, this.getMaxWidthInPxFromPercentage.bind(this));
            const listW = this._getCssBiggestSizeValue(_maxWidth, divListSizingDetails.width);
            const itemW = Math.max(this.itemOffsetWidth, firstItemSizingDetails.width);
            itemsToShowNrOnFirstRender = Math.ceil(listW / itemW);
        }
        itemsToShowNrOnFirstRender = itemsToShowNrOnFirstRender * 2;
        itemsToShowNrOnFirstRender = itemsToShowNrOnFirstRender <= size ? itemsToShowNrOnFirstRender : size;
        return itemsToShowNrOnFirstRender;
    }
    getFirstItemSizingDetails() {
        const firstItem = this.divList.children[0];
        return firstItem.getBoundingClientRect();
    }
    setCurrentPosition(position) {
        if (this.isHorizontal) {
            this.currentXPosition = position;
            return;
        }
        this.currentYPosition = position;
    }
    _startReadyObserver() {
        const templateNodeName = 'template';
        const observer = new MutationObserver((mutations) => {
            this.info('mutationObserver Callback');
            mutations.forEach((mutation) => {
                this.info('mutation', mutation);
                if ((mutation.type !== 'childList') || !mutation.addedNodes) {
                    return;
                }
                if (mutation.addedNodes.length > 0) {
                    let templateElement = null;
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        if (mutation.addedNodes[i].nodeName.toLowerCase() === templateNodeName) {
                            templateElement = mutation.addedNodes[i];
                            break;
                        }
                    }
                    if (null !== templateElement) {
                        this.info('templateElement innerhtml', templateElement.innerHTML);
                        let tplHtml = templateElement.innerHTML;
                        if (tplHtml.trim() === '') {
                            tplHtml = templateElement.firstElementChild.outerHTML;
                            this._tplHtmlString = tplHtml;
                            this.initializations();
                            observer.disconnect();
                            templateElement.remove();
                        }
                    }
                }
            });
        });
        observer.observe(this, {
            childList: true,
            subtree: false,
            attributes: false,
            characterData: false
        });
    }
    _getItems() {
        const items = Array.from(this.divList.children);
        return items.map((element, index) => ({
            element: element,
            layoutIndex: index,
            translateX: 0,
            translateY: 0
        })) || [];
    }
    ;
    _internalUpdate() {
        this._updateInfiniteLoop();
        this._computeItemsPerViewLayout();
        this.templateHelper.checkAndSetSizes();
    }
    _updateInfiniteLoop() {
        this._infiniteLoop = this.endless && this._computeLastViewIndex() > 1;
    }
    _computeItemsPerViewLayout() {
        this._lastViewIndex = this._infiniteLoop ? this._items.length - 1 :
            this._computeLastViewIndex();
        if (!this._infiniteLoop && this.selected > this._lastViewIndex) {
            this.selected = this._lastViewIndex;
        }
    }
    _computeLastViewIndex() {
        return Math.max(0, this._items.length - this.getItemsPerPage());
    }
    initializeAttributes() {
        this.info('initializeAttributes()');
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5List.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5List.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5List.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5List.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        if (this.hasAttribute('size')) {
            this.size = this.previousSize = Number(this.getAttribute('size'));
        }
        else {
            this.size = this.previousSize = 1;
        }
        if (this.hasAttribute('orientation')) {
            this.orientation = this.getAttribute('orientation');
        }
        else {
            this.orientation = Ch5List.ORIENTATION[0];
        }
        if (this.hasAttribute('bufferamount')) {
            this.bufferAmount = Number(this.getAttribute('bufferamount'));
        }
        if (this.hasAttribute('itemheight')) {
            this.itemHeight = this.getAttribute('itemheight');
        }
        if (this.hasAttribute('itemwidth')) {
            this.itemWidth = this.getAttribute('itemwidth');
        }
        if (this.hasAttribute('minwidth')) {
            this.minWidth = this.getAttribute('minwidth');
        }
        if (this.hasAttribute('maxwidth')) {
            this.maxWidth = this.getAttribute('maxwidth');
        }
        if (this.hasAttribute('minheight')) {
            this.minHeight = this.getAttribute('minheight');
        }
        if (this.hasAttribute('maxheight')) {
            this.maxHeight = this.getAttribute('maxheight');
        }
        if (this.hasAttribute('indexid')) {
            this.indexId = this.getAttribute('indexid');
        }
        if (this.hasAttribute('pagedswipe')) {
            this.pagedSwipe = this.toBoolean(this.getAttribute('pagedswipe'));
        }
        if (this.hasAttribute('endless')) {
            this.endless = this.toBoolean(this.getAttribute('endless'));
        }
        else {
            this.endless = false;
        }
        if (this.hasAttribute('scrolltotime')) {
            this.scrollToTime = Number(this.getAttribute('scrolltotime'));
        }
        else {
            this.scrollToTime = 500;
        }
        if (this.hasAttribute('dir')) {
            this.direction = this.getAttribute('dir');
        }
        if (this.hasAttribute('receivestatesize')) {
            this.receiveStateSize = this.getAttribute('receivestatesize');
        }
        if (this.hasAttribute('receivestatescrollto')) {
            this.receiveStateScrollTo = this.getAttribute('receivestatescrollto');
        }
        if (this.hasAttribute('receivestatetemplatevars')) {
            this.receiveStateTemplateVars = this.getAttribute('receivestatetemplatevars');
        }
        this.info("Ch5 list initialized");
    }
    initializeEvents() {
        super.attachEventListeners();
        this.eventManager.initializeEvents(this.divList);
        this.info("Ch5 list - events");
    }
    removeEvents() {
        super.removeEventListeners();
        this.eventManager.removeEvents(this.divList);
    }
}
Ch5List.ELEMENT_NAME = 'ch5-list';
Ch5List.ORIENTATION = ['vertical', 'horizontal'];
Ch5List.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestatesize: { direction: "state", numericJoin: 1, contractName: true }, receivestatescrollto: { direction: "state", numericJoin: 1, contractName: true }, receivestatetemplatevars: { direction: "state", stringJoin: 1, contractName: true }, contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 } });
Ch5List.COMPONENT_DATA = {
    SCALE: {
        default: Ch5List.ORIENTATION[0],
        values: Ch5List.ORIENTATION,
        key: 'scale',
        classListPrefix: '--'
    },
};
Ch5List.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "scrollbar",
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
        isObservableProperty: true,
    },
];
Ch5List.ENABLED_CLASS_NAME = 'ch5-list';
Ch5List.ITEMCLASS = 'list-item';
Ch5List.registerCustomElement();
Ch5List.registerSignalAttributeTypes();
Ch5List.registerSignalAttributeDefaults();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbGlzdC9jaDUtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDL0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQThCLE1BQU0sMkJBQTJCLENBQUM7QUFDN0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUF5QixNQUFNLDJCQUEyQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR3hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQTRDLE1BQU0sNkNBQTZDLENBQUM7QUFDbkksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWlCM0MsTUFBTSxDQUFOLElBQVksZUFBd0I7QUFBcEMsV0FBWSxlQUFlO0lBQUcsK0NBQUMsQ0FBQTtJQUFFLCtDQUFDLENBQUE7QUFBQyxDQUFDLEVBQXhCLGVBQWUsS0FBZixlQUFlLFFBQVM7QUFHcEMsTUFBTSxDQUFD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