import { Ch5Button } from "../../ch5-button/ch5-button";
import { Ch5Common } from "../../ch5-common/ch5-common";
import { Ch5ButtonMode } from "../../ch5-button/ch5-button-mode";
import { Ch5ButtonLabel } from "../../ch5-button/ch5-button-label";
import { Ch5RoleAttributeMapping } from "../../utility-models/ch5-role-attribute-mapping";
import { Ch5Properties } from "../../ch5-core/ch5-properties";
import { Ch5ButtonListModeBase } from "./ch5-button-list-mode-base";
import { Ch5ButtonListModeStateBase } from "./ch5-button-list-mode-state-base";
import { Ch5ButtonModeState } from "../../ch5-button/ch5-button-mode-state";
import { resizeObserver } from "../../ch5-core/resize-observer";
import { Ch5AugmentVarSignalsNames } from '../../ch5-common/ch5-augment-var-signals-names';
import { Ch5Signal } from "../../ch5-core/ch5-signal";
import { Ch5SignalFactory } from "../../ch5-core/ch5-signal-factory";
import _ from "lodash";
export class Ch5ButtonListBase extends Ch5Common {
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set loadItems(value) {
        this._ch5Properties.set("loadItems", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get loadItems() {
        return this._ch5Properties.get("loadItems");
    }
    set scrollbar(value) {
        this._ch5Properties.set("scrollbar", value, () => {
            this.handleScrollbar();
        });
    }
    get scrollbar() {
        return this._ch5Properties.get("scrollbar");
    }
    set centerItems(value) {
        this._ch5Properties.set("centerItems", value, () => {
            this.handleCenterItems();
        });
    }
    get centerItems() {
        return this._ch5Properties.get("centerItems");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set buttonIconUrlFillType(value) {
        this._ch5Properties.set("buttonIconUrlFillType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonIconUrlFillType() {
        return this._ch5Properties.get("buttonIconUrlFillType");
    }
    set endless(value) {
        this._ch5Properties.set("endless", value, () => {
            this.handleEndless();
        });
    }
    get endless() {
        return this._ch5Properties.get("endless");
    }
    set numberOfItems(value) {
        this._ch5Properties.set("numberOfItems", value, () => {
            this.handleRowsAndColumn();
        });
    }
    get numberOfItems() {
        return this._ch5Properties.get("numberOfItems");
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
    set indexId(value) {
        this._ch5Properties.set("indexId", value);
    }
    get indexId() {
        return this._ch5Properties.get("indexId");
    }
    set receiveStateNumberOfItems(value) {
        this._ch5Properties.set("receiveStateNumberOfItems", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("numberOfItems", newValue, () => {
                this.handleRowsAndColumn();
            });
        });
    }
    get receiveStateNumberOfItems() {
        return this._ch5Properties.get('receiveStateNumberOfItems');
    }
    set scrollToPosition(value) {
        this._ch5Properties.set("scrollToPosition", value, () => {
            const withinValidRange = this.scrollToPosition < this.numberOfItems && this.scrollToPosition >= 0;
            const scrollToApplicable = ((this.orientation === 'horizontal' && this.rows === 1) || (this.orientation === "vertical" && this.columns === 1));
            if (withinValidRange && scrollToApplicable) {
                this.debounceButtonDisplay(true);
            }
        });
    }
    get scrollToPosition() {
        return this._ch5Properties.get("scrollToPosition");
    }
    set receiveStateScrollToPosition(value) {
        this._ch5Properties.set("receiveStateScrollToPosition", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("scrollToPosition", newValue, () => {
                const withinValidRange = this.scrollToPosition < this.numberOfItems && this.scrollToPosition >= 0;
                const scrollToApplicable = ((this.orientation === 'horizontal' && this.rows === 1) || (this.orientation === "vertical" && this.columns === 1));
                if (withinValidRange && scrollToApplicable) {
                    this.debounceButtonDisplay(true);
                }
            });
        });
    }
    get receiveStateScrollToPosition() {
        return this._ch5Properties.get('receiveStateScrollToPosition');
    }
    set receiveStateSelectedButton(value) {
        this._ch5Properties.set("receiveStateSelectedButton", value, null, (newValue) => {
            const fromJoin = this.contractName === "";
            const fromContract = this.contractName !== "" && this.useContractForEachButtonSelection === true && this.receiveStateSelectedButton === this.contractName + '.ItemSelected';
            if (fromJoin || fromContract) {
                this.selectedButton = newValue;
                this.handleReceiveStateSelectedButton();
            }
        });
    }
    get receiveStateSelectedButton() {
        return this._ch5Properties.get('receiveStateSelectedButton');
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
            this.debounceButtonDisplay();
        });
    }
    get useContractForEnable() {
        return this._ch5Properties.get("useContractForEnable");
    }
    set useContractForShow(value) {
        this._ch5Properties.set("useContractForShow", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForShow() {
        return this._ch5Properties.get("useContractForShow");
    }
    set useContractForItemEnable(value) {
        this._ch5Properties.set("useContractForItemEnable", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForItemEnable() {
        return this._ch5Properties.get("useContractForItemEnable");
    }
    set useContractForItemShow(value) {
        this._ch5Properties.set("useContractForItemShow", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForItemShow() {
        return this._ch5Properties.get("useContractForItemShow");
    }
    set useContractForCustomStyle(value) {
        this._ch5Properties.set("useContractForCustomStyle", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForCustomStyle() {
        return this._ch5Properties.get("useContractForCustomStyle");
    }
    set useContractForCustomClass(value) {
        this._ch5Properties.set("useContractForCustomClass", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForCustomClass() {
        return this._ch5Properties.get("useContractForCustomClass");
    }
    set useContractForEachButtonSelection(value) {
        this._ch5Properties.set("useContractForEachButtonSelection", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForEachButtonSelection() {
        return this._ch5Properties.get("useContractForEachButtonSelection");
    }
    set contractItemLabelType(value) {
        this._ch5Properties.set("contractItemLabelType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get contractItemLabelType() {
        return this._ch5Properties.get("contractItemLabelType");
    }
    set contractItemIconType(value) {
        this._ch5Properties.set("contractItemIconType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get contractItemIconType() {
        return this._ch5Properties.get("contractItemIconType");
    }
    set useContractForNumItems(value) {
        this._ch5Properties.set("useContractForNumItems", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get useContractForNumItems() {
        return this._ch5Properties.get("useContractForNumItems");
    }
    set buttonType(value) {
        this._ch5Properties.set("buttonType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonType() {
        return this._ch5Properties.get("buttonType");
    }
    set buttonHAlignLabel(value) {
        this._ch5Properties.set("buttonHAlignLabel", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonHAlignLabel() {
        return this._ch5Properties.get("buttonHAlignLabel");
    }
    set buttonVAlignLabel(value) {
        this._ch5Properties.set("buttonVAlignLabel", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonVAlignLabel() {
        return this._ch5Properties.get("buttonVAlignLabel");
    }
    set buttonCheckboxPosition(value) {
        this._ch5Properties.set("buttonCheckboxPosition", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonCheckboxPosition() {
        return this._ch5Properties.get("buttonCheckboxPosition");
    }
    set buttonIconPosition(value) {
        this._ch5Properties.set("buttonIconPosition", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonIconPosition() {
        return this._ch5Properties.get("buttonIconPosition");
    }
    set buttonShape(value) {
        this._ch5Properties.set("buttonShape", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonShape() {
        return this._ch5Properties.get("buttonShape");
    }
    set buttonCheckboxShow(value) {
        this._ch5Properties.set("buttonCheckboxShow", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonCheckboxShow() {
        return this._ch5Properties.get("buttonCheckboxShow");
    }
    set buttonSelected(value) {
        this._ch5Properties.set("buttonSelected", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonSelected() {
        return this._ch5Properties.get("buttonSelected");
    }
    set buttonPressed(value) {
        this._ch5Properties.set("buttonPressed", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonPressed() {
        return this._ch5Properties.get("buttonPressed");
    }
    set buttonMode(value) {
        this._ch5Properties.set("buttonMode", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonMode() {
        return +this._ch5Properties.get("buttonMode");
    }
    set buttonIconClass(value) {
        this._ch5Properties.set("buttonIconClass", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonIconClass() {
        return this._ch5Properties.get("buttonIconClass");
    }
    set buttonIconUrl(value) {
        this._ch5Properties.set("buttonIconUrl", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonIconUrl() {
        return this._ch5Properties.get("buttonIconUrl");
    }
    set buttonLabelInnerHtml(value) {
        this._ch5Properties.set("buttonLabelInnerHtml", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonLabelInnerHtml() {
        return this._ch5Properties.get("buttonLabelInnerHtml");
    }
    set buttonReceiveStateMode(value) {
        this._ch5Properties.set("buttonReceiveStateMode", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateMode() {
        return this._ch5Properties.get("buttonReceiveStateMode");
    }
    set buttonReceiveStateSelected(value) {
        this._ch5Properties.set("buttonReceiveStateSelected", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateSelected() {
        return this._ch5Properties.get("buttonReceiveStateSelected");
    }
    set buttonReceiveStateLabel(value) {
        this._ch5Properties.set("buttonReceiveStateLabel", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateLabel() {
        return this._ch5Properties.get("buttonReceiveStateLabel");
    }
    set buttonReceiveStateScriptLabelHtml(value) {
        this._ch5Properties.set("buttonReceiveStateScriptLabelHtml", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateScriptLabelHtml() {
        return this._ch5Properties.get("buttonReceiveStateScriptLabelHtml");
    }
    set buttonReceiveStateIconClass(value) {
        this._ch5Properties.set("buttonReceiveStateIconClass", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateIconClass() {
        return this._ch5Properties.get("buttonReceiveStateIconClass");
    }
    set buttonReceiveStateIconUrl(value) {
        this._ch5Properties.set("buttonReceiveStateIconUrl", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateIconUrl() {
        return this._ch5Properties.get("buttonReceiveStateIconUrl");
    }
    set buttonReceiveStateSGIconString(value) {
        this._ch5Properties.set("buttonReceiveStateSGIconString", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateSGIconString() {
        return this._ch5Properties.get("buttonReceiveStateSGIconString");
    }
    set buttonReceiveStateSGIconNumeric(value) {
        this._ch5Properties.set("buttonReceiveStateSGIconNumeric", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateSGIconNumeric() {
        return this._ch5Properties.get("buttonReceiveStateSGIconNumeric");
    }
    set buttonSgIconTheme(value) {
        this._ch5Properties.set("buttonSgIconTheme", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonSgIconTheme() {
        return this._ch5Properties.get("buttonSgIconTheme");
    }
    set buttonSendEventOnClick(value) {
        this._ch5Properties.set("buttonSendEventOnClick", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonSendEventOnClick() {
        return this._ch5Properties.get("buttonSendEventOnClick");
    }
    set buttonReceiveStateShow(value) {
        this._ch5Properties.set("buttonReceiveStateShow", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateShow() {
        return this._ch5Properties.get("buttonReceiveStateShow");
    }
    set buttonReceiveStateEnable(value) {
        this._ch5Properties.set("buttonReceiveStateEnable", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonReceiveStateEnable() {
        return this._ch5Properties.get("buttonReceiveStateEnable");
    }
    set clickHoldTime(value) {
        this._ch5Properties.set("clickHoldTime", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get clickHoldTime() {
        return this._ch5Properties.get("clickHoldTime");
    }
    constructor() {
        super();
        this.primaryCssClass = '';
        this._elContainer = {};
        this._scrollbarContainer = {};
        this._scrollbar = {};
        this.isDown = false;
        this.startX = 0;
        this.startY = 0;
        this.scrollListLeft = 0;
        this.scrollListTop = 0;
        this.scrollbarDimension = 0;
        this.buttonWidth = 0;
        this.buttonHeight = 0;
        this.signalNameOnContract = {
            contractName: "",
            receiveStateCustomClass: "",
            receiveStateCustomStyle: "",
            receiveStateEnable: "",
            receiveStateShow: "",
            receiveStateScrollToPosition: "",
            receiveStateNumberOfItems: "",
            receiveStateSelectedButton: ""
        };
        this.rowClassValue = 1;
        this.columnClassValue = 1;
        this.selectedButton = 0;
        this.showSignalHolder = [];
        this.loadButtonForShow = false;
        this.allButtonsVisible = false;
        this.debounceButtonDisplay = this.debounce((isReceiveStateScrollTo = false) => {
            if (this.loadItems === "visible-only") {
                this.buttonDisplay(isReceiveStateScrollTo);
            }
            else if (this.loadItems === "load-new") {
                this.buttonDisplayForLoadItemsNew(isReceiveStateScrollTo);
            }
            else {
                this.buttonDisplayForLoadItemsAll(isReceiveStateScrollTo);
            }
        }, 100);
        this.debounceButtonShow = this.debounce(() => {
            this.buttonShow();
        }, 150);
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
            if (!this.isDown)
                return;
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
                    this.buttonWidth = this._elContainer.children[0].getBoundingClientRect().width;
                    this.buttonHeight = this._elContainer.children[0].getBoundingClientRect().height;
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
        };
        this.resizeHandler = () => {
            this.debounceButtonDisplay();
        };
        this.ignoreAttributes = ['receivestatehidepulse', 'receivestateshowpulse', 'sendeventonshow'];
        this.logger.start('constructor()');
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5ButtonListBase.COMPONENT_PROPERTIES);
        this.initCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5ButtonListBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5ButtonListBase.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.nodeName);
        if (oldValue !== newValue) {
            this.logger.log('attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5ButtonListBase.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
            else {
                super.attributeChangedCallback(attr, oldValue, newValue);
            }
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonList);
        }
        this.checkInternalHTML();
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.debounceButtonDisplay();
        resizeObserver(this._elContainer, this.resizeHandler);
        customElements.whenDefined(this.nodeName.toLowerCase()).then(() => {
            this.componentLoadedEvent(this.nodeName.toLowerCase(), this.id);
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
        this.showSignalHolder = [];
        this.logger.stop();
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
        for (let i = 0; i < Ch5ButtonListBase.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5ButtonListBase.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5ButtonListBase.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5ButtonListBase.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
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
            if (scrollWidth - offsetWidth < this.buttonWidth) {
                return;
            }
            let lastElement = this.getLastChild();
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.buttonWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    this.createButton(++lastElement);
                    if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                        let showValue = lastElement;
                        while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                            this.createButton(++showValue);
                        }
                    }
                }
                this.initScrollbar();
            }
        }
        else if (this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.buttonWidth) {
                return;
            }
            let lastElement = this.getLastChild();
            if (scrollLeft + offsetWidth > scrollWidth - this.buttonWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createButton(++lastElement);
                        if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_b = this.showSignalHolder[showValue]) === null || _b === void 0 ? void 0 : _b.value) === false) {
                                this.createButton(++showValue);
                            }
                        }
                    }
                }
                this.initScrollbar();
            }
        }
        else {
            const { offsetHeight, scrollTop, scrollHeight } = this._elContainer;
            if (scrollHeight - offsetHeight < this.buttonHeight) {
                return;
            }
            let lastElement = this.getLastChild();
            if (scrollTop + offsetHeight > scrollHeight - this.buttonHeight && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.columns; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createButton(++lastElement);
                        if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                                this.createButton(++showValue);
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
            if (scrollWidth - offsetWidth < this.buttonWidth) {
                return;
            }
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.buttonWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    this.createButton(++lastElement);
                    if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                        let showValue = lastElement;
                        while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                            this.createButton(++showValue);
                        }
                    }
                    (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                }
                this._elContainer.scrollLeft += this.buttonWidth;
            }
            else if (Math.abs(scrollLeft) < this.buttonWidth && firstElement !== 0) {
                let lastColumnElements = (lastElement + 1) % this.rows;
                for (let i = 0; i < this.rows; i++) {
                    this.createButton(--firstElement, false);
                    if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                            this.createButton(--showValue, false);
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
                this._elContainer.scrollLeft -= this.buttonWidth;
            }
        }
        else if (this.orientation === 'horizontal') {
            const { offsetWidth, scrollLeft, scrollWidth } = this._elContainer;
            if (scrollWidth - offsetWidth < this.buttonWidth) {
                return;
            }
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (scrollLeft < this.buttonWidth && firstElement !== 0) {
                let lastColumnElements = (lastElement + 1) % this.rows;
                for (let i = 0; i < this.rows; i++) {
                    this.createButton(--firstElement, false);
                    if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_f = this.showSignalHolder[showValue]) === null || _f === void 0 ? void 0 : _f.value) === false) {
                            this.createButton(--showValue, false);
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
                this._elContainer.scrollLeft += this.buttonWidth;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - this.buttonWidth && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.rows; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createButton(++lastElement);
                        if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                                this.createButton(++showValue);
                            }
                        }
                    }
                    (_k = this._elContainer.firstElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                }
                this._elContainer.scrollLeft -= this.buttonWidth;
            }
        }
        else {
            const { offsetHeight, scrollTop, scrollHeight } = this._elContainer;
            if (scrollHeight - offsetHeight < this.buttonHeight) {
                return;
            }
            let firstElement = this.getFirstChild();
            let lastElement = this.getLastChild();
            if (scrollTop < this.buttonHeight && firstElement !== 0) {
                let lastRowElements = (lastElement + 1) % this.columns;
                for (let i = 0; i < this.columns; i++) {
                    this.createButton(--firstElement, false);
                    if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                        let showValue = firstElement;
                        while (showValue > 0 && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                            this.createButton(--showValue, false);
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
                this._elContainer.scrollTop += this.buttonHeight;
            }
            else if (scrollTop + offsetHeight > scrollHeight - this.buttonHeight && lastElement !== this.numberOfItems - 1) {
                for (let i = 0; i < this.columns; i++) {
                    if (lastElement + 1 < this.numberOfItems) {
                        this.createButton(++lastElement);
                        if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                            let showValue = lastElement;
                            while (showValue < this.numberOfItems && ((_p = this.showSignalHolder[showValue]) === null || _p === void 0 ? void 0 : _p.value) === false) {
                                this.createButton(++showValue);
                            }
                        }
                    }
                    (_q = this._elContainer.firstElementChild) === null || _q === void 0 ? void 0 : _q.remove();
                }
                this._elContainer.scrollTop -= this.buttonHeight;
            }
        }
    }
    endlessHelper() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const { offsetHeight, offsetWidth, scrollLeft, scrollTop, scrollWidth, scrollHeight } = this._elContainer;
        const endlessScrollable = this.orientation === 'horizontal' ? offsetWidth + this.buttonWidth < scrollWidth : offsetHeight + this.buttonHeight < scrollHeight;
        if (endlessScrollable === false) {
            return;
        }
        if (this.orientation === 'horizontal' && this.dir === 'rtl') {
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.buttonWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                this._elContainer.scrollLeft += this.buttonWidth / 2;
            }
            else if (Math.abs(scrollLeft) < this.buttonWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.remove();
                this._elContainer.scrollLeft -= this.buttonWidth / 2;
            }
        }
        else if (this.orientation === 'horizontal') {
            if (scrollLeft < this.buttonWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_e = this.showSignalHolder[showValue]) === null || _e === void 0 ? void 0 : _e.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                (_f = this._elContainer.lastElementChild) === null || _f === void 0 ? void 0 : _f.remove();
                this._elContainer.scrollLeft += this.buttonWidth / 2;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - this.buttonWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_g = this.showSignalHolder[showValue]) === null || _g === void 0 ? void 0 : _g.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                (_h = this._elContainer.firstElementChild) === null || _h === void 0 ? void 0 : _h.remove();
                this._elContainer.scrollLeft -= this.buttonWidth / 2;
            }
        }
        else {
            if (scrollTop < this.buttonHeight / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                (_k = this._elContainer.lastElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                this._elContainer.scrollTop += this.buttonHeight / 2;
            }
            else if (scrollTop + offsetHeight > scrollHeight - this.buttonHeight / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                (_m = this._elContainer.firstElementChild) === null || _m === void 0 ? void 0 : _m.remove();
                this._elContainer.scrollTop -= this.buttonHeight / 2;
                if (this.scrollToPosition === this.numberOfItems - 1 && index === 0) {
                    this._elContainer.scrollTop += this.buttonHeight;
                }
            }
        }
    }
    endlessHelperForNew() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const { offsetHeight, offsetWidth, scrollLeft, scrollTop, scrollWidth, scrollHeight } = this._elContainer;
        const endlessScrollable = this.orientation === 'horizontal' ? offsetWidth + this.buttonWidth < scrollWidth : offsetHeight + this.buttonHeight < scrollHeight;
        if (endlessScrollable === false) {
            return;
        }
        if (this.orientation === 'horizontal' && this.dir === 'rtl') {
            if (Math.abs(scrollLeft) + offsetWidth > scrollWidth - this.buttonWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_a = this.showSignalHolder[showValue]) === null || _a === void 0 ? void 0 : _a.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.remove();
                }
                this._elContainer.scrollLeft += this.buttonWidth / 2;
            }
            else if (Math.abs(scrollLeft) < this.buttonWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_c = this.showSignalHolder[showValue]) === null || _c === void 0 ? void 0 : _c.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.remove();
                }
                this._elContainer.scrollLeft -= this.buttonWidth / 2;
            }
        }
        else if (this.orientation === 'horizontal') {
            if (scrollLeft < this.buttonWidth / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_e = this.showSignalHolder[showValue]) === null || _e === void 0 ? void 0 : _e.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_f = this._elContainer.lastElementChild) === null || _f === void 0 ? void 0 : _f.remove();
                }
                this._elContainer.scrollLeft += this.buttonWidth / 2;
            }
            else if (scrollLeft + offsetWidth > scrollWidth - this.buttonWidth / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_g = this.showSignalHolder[showValue]) === null || _g === void 0 ? void 0 : _g.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_h = this._elContainer.firstElementChild) === null || _h === void 0 ? void 0 : _h.remove();
                }
                this._elContainer.scrollLeft -= this.buttonWidth / 2;
            }
        }
        else {
            if (scrollTop < this.buttonHeight / 4) {
                const firstElement = this.getFirstChild();
                const index = (this.numberOfItems + firstElement - 1) % this.numberOfItems;
                this.createButton(index, false);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue > 0 && ((_j = this.showSignalHolder[showValue]) === null || _j === void 0 ? void 0 : _j.value) === false) {
                        this.createButton(--showValue, false);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_k = this._elContainer.lastElementChild) === null || _k === void 0 ? void 0 : _k.remove();
                }
                this._elContainer.scrollTop += this.buttonHeight / 2;
            }
            else if (scrollTop + offsetHeight > scrollHeight - this.buttonHeight / 4) {
                const lastElement = this.getLastChild();
                const index = (this.numberOfItems + lastElement + 1) % this.numberOfItems;
                this.createButton(index);
                if (this.loadButtonForShow === true && this.allButtonsVisible === false) {
                    let showValue = index;
                    while (showValue < this.numberOfItems && ((_l = this.showSignalHolder[showValue]) === null || _l === void 0 ? void 0 : _l.value) === false) {
                        this.createButton(++showValue);
                    }
                }
                while (this._elContainer.children.length > this.numberOfItems) {
                    (_m = this._elContainer.firstElementChild) === null || _m === void 0 ? void 0 : _m.remove();
                }
                this._elContainer.scrollTop -= this.buttonHeight / 2;
                if (this.scrollToPosition === this.numberOfItems - 1 && index === 0) {
                    this._elContainer.scrollTop += this.buttonHeight;
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
        Array.from(Ch5ButtonListBase.COMPONENT_DATA.ORIENTATION.values).forEach((orientation) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.ORIENTATION.classListPrefix + orientation);
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this.handleRowsAndColumn();
    }
    handleScrollbar() {
        if (this.endless === true && this.scrollbar === true) {
            this.scrollbar = false;
        }
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + bool.toString());
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this.initScrollbar();
    }
    handleRowsAndColumn() {
        if (this.endless) {
            this.endless = this.orientation === 'horizontal' ? this.rows === 1 : this.columns === 1;
        }
        if (this.stretch === 'both') {
            this.stretch = this.orientation === 'horizontal' ? this.rows === 1 ? 'both' : null : this.columns === 1 ? 'both' : null;
        }
        if (this.orientation === "horizontal") {
            this._elContainer.style.removeProperty("grid-template-rows");
            this._elContainer.style.removeProperty("grid-template-columns");
            this.rowClassValue = this.rows < this.numberOfItems ? this.rows : this.numberOfItems;
            this._elContainer.style.setProperty("grid-template-rows", "repeat(" + this.rowClassValue + ", 1fr)");
        }
        else {
            this._elContainer.style.removeProperty("grid-template-columns");
            this._elContainer.style.removeProperty("grid-template-rows");
            this.columnClassValue = this.columns < this.numberOfItems ? this.columns : this.numberOfItems;
            this._elContainer.style.setProperty("grid-template-columns", "repeat(" + this.columnClassValue + ", 1fr)");
        }
        this.debounceButtonDisplay();
    }
    handleStretch() {
        if (this.stretch === 'both') {
            this.stretch = this.orientation === 'horizontal' ? this.rows === 1 ? 'both' : null : this.columns === 1 ? 'both' : null;
        }
        if (this.stretch === null) {
            this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        }
        else {
            this.debounceButtonDisplay();
        }
    }
    handleCenterItems() {
        [true, false].forEach((bool) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + bool.toString());
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + this.centerItems);
        if (this.centerItems === true) {
            this.debounceButtonDisplay();
        }
    }
    handleEndless() {
        if (this.endless) {
            this.endless = this.orientation === 'horizontal' ? this.rows === 1 : this.columns === 1;
        }
        if (this.endless && this.scrollbar === true) {
            this.scrollbar = false;
        }
    }
    handleScrollToPosition(value) {
        var _a, _b;
        if (value >= this.numberOfItems || value < 0) {
            return;
        }
        if ((this.orientation === 'horizontal' && this.rows !== 1) || (this.orientation === 'vertical' && this.columns !== 1)) {
            return;
        }
        if (this.buttonWidth === 0 || this.buttonHeight === 0) {
            this.createButton(0, false);
            this.buttonWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.buttonWidth;
            this.buttonHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height) || this.buttonHeight;
        }
        Array.from(this._elContainer.children).forEach(container => container.remove());
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true) || (this.buttonReceiveStateShow.length !== 0 && this.buttonReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true)) {
            this.loadButtonForShow = true;
            if (this.showSignalHolder.length === 0) {
                this.signalHolder();
            }
            const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
            this.allButtonsVisible = visibleButtons === this.numberOfItems ? true : false;
        }
        else {
            this.loadButtonForShow = false;
        }
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            const loadableButtons = Math.ceil(containerWidth / this.buttonWidth) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (value >= this.numberOfItems - (loadableButtons - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableButtons; i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = value === this.numberOfItems - 1 ? this.buttonWidth * 5 * -1 : this.buttonWidth * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER * -1;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToRightEdgeRange();
                }
            }
            else if (value >= Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER) {
                for (let i = value - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER; i < value + loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = this.buttonWidth * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER * -1;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToMiddleRange();
                }
            }
            else {
                for (let i = 0; i < loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = this.buttonWidth * value * -1;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToLeftEdgeRange();
                }
            }
        }
        else if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            const loadableButtons = Math.ceil(containerWidth / this.buttonWidth) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (value >= this.numberOfItems - (loadableButtons - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableButtons; i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = value === this.numberOfItems - 1 ? this.buttonWidth * 5 : this.buttonWidth * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToRightEdgeRange();
                }
            }
            else if (value >= Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER) {
                for (let i = value - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER; i < value + loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = this.buttonWidth * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToMiddleRange();
                }
            }
            else {
                for (let i = 0; i < loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollLeft = this.buttonWidth * value;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToLeftEdgeRange();
                }
            }
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height;
            const loadableButtons = Math.ceil(containerHeight / this.buttonHeight) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (containerHeight <= 10 || containerHeight <= this.buttonHeight + 10) {
                for (let i = 0; i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
            }
            else if (value >= this.numberOfItems - (loadableButtons - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER)) {
                for (let i = this.numberOfItems - loadableButtons; i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollTop = value === this.numberOfItems - 1 ? this.buttonHeight * 5 : this.buttonHeight * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToRightEdgeRange();
                }
            }
            else if (value >= Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER) {
                for (let i = value - Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER; i < value + loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollTop = this.buttonHeight * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToMiddleRange();
                }
            }
            else {
                for (let i = 0; i < loadableButtons && i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
                this._elContainer.scrollTop = this.buttonHeight * value;
                if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
                    this.scrollToLeftEdgeRange();
                }
            }
        }
        this.initScrollbar();
    }
    handleScrollToPositionForNew(value) {
        var _a, _b, _c, _d, _e;
        if (value >= this.numberOfItems || value < 0) {
            return;
        }
        if ((this.orientation === 'horizontal' && this.rows !== 1) || (this.orientation === 'vertical' && this.columns !== 1)) {
            return;
        }
        if (this.buttonWidth === 0 || this.buttonHeight === 0) {
            if (this._elContainer.children.length === 0) {
                this.createButton(0);
                this.buttonWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.buttonWidth;
                this.buttonHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height) || this.buttonHeight;
                (_c = this._elContainer.firstElementChild) === null || _c === void 0 ? void 0 : _c.remove();
            }
            else {
                this.buttonWidth = ((_d = this._elContainer.firstElementChild) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().width) || this.buttonWidth;
                this.buttonHeight = ((_e = this._elContainer.firstElementChild) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect().height) || this.buttonHeight;
            }
        }
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true) || (this.buttonReceiveStateShow.length !== 0 && this.buttonReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true)) {
            this.loadButtonForShow = true;
            if (this.showSignalHolder.length === 0) {
                this.signalHolder();
            }
            const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
            this.allButtonsVisible = visibleButtons === this.numberOfItems ? true : false;
        }
        else {
            this.loadButtonForShow = false;
        }
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            const loadableButtons = Math.ceil(containerWidth / this.buttonWidth) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (this._elContainer.children.length === 0) {
                for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                    this.createButton(index);
                }
            }
            else if (this.getLastChild() < value + loadableButtons) {
                for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                    this.createButton(index);
                }
            }
            this._elContainer.scrollLeft = value !== 0 ? (value * this.buttonWidth) * -1 : 0;
        }
        else if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            const loadableButtons = Math.ceil(containerWidth / this.buttonWidth) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (this._elContainer.children.length === 0) {
                for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                    this.createButton(index);
                }
            }
            else if (this.getLastChild() < value + loadableButtons) {
                for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                    this.createButton(index);
                }
            }
            this._elContainer.scrollLeft = value !== 0 ? value * this.buttonWidth : 0;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height;
            const loadableButtons = Math.ceil(containerHeight / this.buttonHeight) + Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            if (containerHeight <= 10 || containerHeight <= this.buttonHeight + 10) {
                for (let i = 0; i < this.numberOfItems; i++) {
                    this.createButton(i);
                }
            }
            else {
                if (this._elContainer.children.length === 0) {
                    for (let index = 0; index < this.numberOfItems && index < value + loadableButtons - 1; index++) {
                        this.createButton(index);
                    }
                }
                else if (this.getLastChild() < value + loadableButtons) {
                    for (let index = this.getLastChild() + 1; index < this.numberOfItems && index < value + loadableButtons; index++) {
                        this.createButton(index);
                    }
                }
            }
            this._elContainer.scrollTop = value !== 0 ? value * this.buttonHeight : 0;
        }
        if (this.allButtonsVisible === false && this.loadButtonForShow === true) {
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
                this.createButton(this.getLastChild() + 1);
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
        this.buttonWidth = ((_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || this.buttonWidth;
        this.buttonHeight = ((_b = this._elContainer.firstElementChild) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height) || this.buttonHeight;
        if (this.dir === 'rtl' && this.orientation === 'horizontal') {
            this._elContainer.scrollLeft = (value * this.buttonWidth) * -1;
        }
        else if (this.orientation === 'horizontal') {
            this._elContainer.scrollLeft = value * this.buttonWidth;
        }
        else {
            this._elContainer.scrollTop = value * this.buttonHeight;
        }
        this.initScrollbar();
    }
    buttonDisplay(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        if (isReceiveStateScrollTo === true) {
            return this.handleScrollToPosition(this.scrollToPosition);
        }
        this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this.createButton(0);
        this.buttonWidth = this._elContainer.children[0].getBoundingClientRect().width;
        this.buttonHeight = this._elContainer.children[0].getBoundingClientRect().height;
        let loadedButtons = 0;
        if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            loadedButtons = Math.floor(containerWidth / this.buttonWidth) * this.rows + this.rows * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height;
            if (containerHeight > this.buttonHeight + 10) {
                loadedButtons = Math.floor(containerHeight / this.buttonHeight) * this.columns + this.columns * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            }
            else {
                loadedButtons = this.numberOfItems;
            }
        }
        loadedButtons = loadedButtons > this.numberOfItems ? this.numberOfItems : loadedButtons;
        for (let index = 1; index < loadedButtons; index++) {
            this.createButton(index);
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
    buttonDisplayForLoadItemsNew(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        if (isReceiveStateScrollTo === true) {
            return this.handleScrollToPositionForNew(this.scrollToPosition);
        }
        this._elContainer.classList.remove(this.primaryCssClass + '--stretch-both');
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this.createButton(0);
        this.buttonWidth = this._elContainer.children[0].getBoundingClientRect().width;
        this.buttonHeight = this._elContainer.children[0].getBoundingClientRect().height;
        let loadedButtons = 0;
        if (this.orientation === 'horizontal') {
            const containerWidth = this._elContainer.getBoundingClientRect().width;
            loadedButtons = Math.floor(containerWidth / this.buttonWidth) * this.rows + this.rows * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
        }
        else {
            const containerHeight = this._elContainer.getBoundingClientRect().height;
            if (containerHeight > this.buttonHeight + 10) {
                loadedButtons = Math.floor(containerHeight / this.buttonHeight) * this.columns + this.columns * Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER;
            }
            else {
                loadedButtons = this.numberOfItems;
            }
        }
        loadedButtons = loadedButtons > this.numberOfItems ? this.numberOfItems : loadedButtons;
        for (let index = 1; index < loadedButtons; index++) {
            this.createButton(index);
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
    buttonDisplayForLoadItemsAll(isReceiveStateScrollTo = false) {
        this.contractDefaultHelper();
        Array.from(this._elContainer.children).forEach(container => container.remove());
        for (let index = 0; index < this.numberOfItems; index++) {
            this.createButton(index);
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
    createButton(index, append = true) {
        var _a, _b, _c, _d, _e;
        if (index < 0 || index >= this.numberOfItems) {
            return;
        }
        ;
        const buttonListContractObj = { index: index + 1, clickHoldTime: this.clickHoldTime, contractName: this.contractName, parentComponent: 'ch5-button-list' };
        const btn = new Ch5Button(buttonListContractObj);
        btn.setAttribute("swipeGestureEnabled", "true");
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute('id', this.getCrId() + '-' + index);
        if (this.contractName !== "" && this.useContractForItemShow === true) {
            btnContainer.setAttribute('data-ch5-noshow-type', 'display');
            btnContainer.setAttribute('data-ch5-show', this.contractName + `.Button${index + 1}Visible`);
        }
        else {
            if (((_a = this.getAttribute('buttonReceiveStateShow')) === null || _a === void 0 ? void 0 : _a.trim().includes(`{{${this.indexId}}}`)) === false) {
                const attrValue = (_b = this.getAttribute('buttonReceiveStateShow')) === null || _b === void 0 ? void 0 : _b.trim();
                if (attrValue) {
                    btnContainer.setAttribute('data-ch5-noshow-type', 'display');
                    btnContainer.setAttribute('data-ch5-show', attrValue.trim());
                }
            }
            else if (this.hasAttribute('buttonReceiveStateShow') && ((_c = this.getAttribute("buttonReceiveStateShow")) === null || _c === void 0 ? void 0 : _c.trim())) {
                const attrValue = this.replaceAll(((_d = this.getAttribute("buttonReceiveStateShow")) === null || _d === void 0 ? void 0 : _d.trim()) + '', `{{${this.indexId}}}`, '');
                const isNumber = /^[0-9]+$/.test(attrValue);
                btnContainer.setAttribute('data-ch5-noshow-type', 'display');
                if (isNumber) {
                    btnContainer.setAttribute('data-ch5-show', Number(attrValue) + index + '');
                }
                else {
                    btnContainer.setAttribute('data-ch5-show', this.replaceAll(((_e = this.getAttribute("buttonReceiveStateShow")) === null || _e === void 0 ? void 0 : _e.trim()) + '', `{{${this.indexId}}}`, index + ''));
                }
            }
        }
        btnContainer.classList.add(this.nodeName.toLowerCase() + "--button-container");
        btnContainer.appendChild(btn);
        append ? this._elContainer.appendChild(btnContainer) : this._elContainer.prepend(btnContainer);
        this.buttonModeHelper(btn, index);
        this.buttonLabelHelper(btn, index);
        this.buttonHelper(btn, index);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.BUTTON_TYPE.classListPrefix + this.buttonType);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.BUTTON_SHAPE.classListPrefix + this.buttonShape);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.BUTTON_ICON_POSITION.classListPrefix + this.buttonIconPosition);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.BUTTON_CHECKBOX_POSITION.classListPrefix + this.buttonCheckboxPosition);
    }
    buttonModeHelper(btn, i) {
        const buttonListModes = this.getElementsByTagName(this.nodeName.toLowerCase() + "-mode");
        if (buttonListModes && buttonListModes.length > 0) {
            Array.from(buttonListModes).forEach((buttonListMode, index) => {
                if (index < Ch5ButtonListBase.MODES_MAX_COUNT) {
                    if (buttonListMode.parentElement instanceof Ch5ButtonListBase) {
                        const ch5ButtonMode = new Ch5ButtonMode(btn);
                        Ch5ButtonMode.observedAttributes.forEach((attr) => {
                            if (buttonListMode.hasAttribute(attr)) {
                                ch5ButtonMode.setAttribute(attr, buttonListMode.getAttribute(attr) + '');
                            }
                        });
                        const buttonListModeStates = buttonListMode.getElementsByTagName(this.nodeName.toLowerCase() + "-mode-state");
                        if (buttonListModeStates && buttonListModeStates.length > 0) {
                            Array.from(buttonListModeStates).forEach(buttonListModeState => {
                                if (buttonListModeState.parentElement instanceof Ch5ButtonListModeBase) {
                                    const buttonModeState = new Ch5ButtonModeState(btn);
                                    Ch5ButtonModeState.observedAttributes.forEach((attr) => {
                                        if (buttonListModeState.hasAttribute(attr)) {
                                            buttonModeState.setAttribute(attr, buttonListModeState.getAttribute(attr) + '');
                                        }
                                    });
                                    const buttonModeStateLabels = buttonListModeState.getElementsByTagName(this.nodeName.toLowerCase() + "-label");
                                    if (buttonModeStateLabels && buttonModeStateLabels.length > 0) {
                                        Array.from(buttonModeStateLabels).forEach((buttonModeStateLabel) => {
                                            if (buttonModeStateLabel.parentElement instanceof Ch5ButtonListModeStateBase) {
                                                const buttonModeStateLabelTemplate = buttonModeStateLabel.getElementsByTagName("template");
                                                if (buttonModeStateLabelTemplate && buttonModeStateLabelTemplate.length > 0) {
                                                    const ch5ButtonLabel = new Ch5ButtonLabel();
                                                    const template = document.createElement('template');
                                                    template.innerHTML = buttonModeStateLabelTemplate[0].innerHTML;
                                                    Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(template, i, this.indexId);
                                                    Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(template, i, this.indexId);
                                                    ch5ButtonLabel.appendChild(template);
                                                    buttonModeState.appendChild(ch5ButtonLabel);
                                                }
                                            }
                                        });
                                    }
                                    ch5ButtonMode.appendChild(buttonModeState);
                                }
                            });
                        }
                        const buttonListModeLabels = buttonListMode.getElementsByTagName(this.nodeName.toLowerCase() + "-label");
                        if (buttonListModeLabels && buttonListModeLabels.length > 0) {
                            Array.from(buttonListModeLabels).forEach((buttonListModeLabel) => {
                                if (buttonListModeLabel.parentElement instanceof Ch5ButtonListModeBase) {
                                    const buttonListModeLabelTemplate = buttonListModeLabel.getElementsByTagName("template");
                                    if (buttonListModeLabelTemplate && buttonListModeLabelTemplate.length > 0) {
                                        const ch5ButtonLabel = new Ch5ButtonLabel();
                                        const template = document.createElement('template');
                                        template.innerHTML = buttonListModeLabelTemplate[0].innerHTML;
                                        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(template, i, this.indexId);
                                        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(template, i, this.indexId);
                                        ch5ButtonLabel.appendChild(template);
                                        ch5ButtonMode.appendChild(ch5ButtonLabel);
                                    }
                                }
                            });
                        }
                        btn.appendChild(ch5ButtonMode);
                    }
                }
            });
        }
    }
    buttonLabelHelper(btn, index) {
        const buttonListLabels = this.getElementsByTagName(this.nodeName.toLowerCase() + "-label");
        if (buttonListLabels && buttonListLabels.length > 0) {
            Array.from(buttonListLabels).forEach((buttonListLabel) => {
                if (buttonListLabel.parentElement instanceof Ch5ButtonListBase) {
                    const buttonListLabelTemplate = buttonListLabel.getElementsByTagName("template");
                    if (buttonListLabelTemplate && buttonListLabelTemplate.length > 0) {
                        const ch5ButtonLabel = new Ch5ButtonLabel();
                        const template = document.createElement('template');
                        template.innerHTML = buttonListLabelTemplate[0].innerHTML;
                        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(template, index, this.indexId);
                        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsContent(template, index, this.indexId);
                        ch5ButtonLabel.appendChild(template);
                        btn.appendChild(ch5ButtonLabel);
                    }
                }
            });
        }
    }
    buttonHelper(btn, index) {
        btn.setAttribute('stretch', 'both');
        btn.setAttribute('shape', Ch5ButtonListBase.BUTTON_SHAPES[0]);
        if (this.contractName !== "") {
            return this.contractButtonHelper(btn, index);
        }
        const individualButtons = this.getElementsByTagName(this.nodeName.toLowerCase() + '-individual-button');
        const individualButtonsLength = individualButtons.length;
        Ch5ButtonListBase.COMPONENT_PROPERTIES.forEach((attr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (index < individualButtonsLength) {
                if (attr.name.toLowerCase() === 'buttoniconclass') {
                    if (individualButtons[index] && individualButtons[index].hasAttribute('iconclass')) {
                        const attrValue = (_a = individualButtons[index].getAttribute('iconclass')) === null || _a === void 0 ? void 0 : _a.trim();
                        if (attrValue) {
                            btn.setAttribute('iconclass', attrValue);
                        }
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        const attrValue = (_b = this.getAttribute(attr.name)) === null || _b === void 0 ? void 0 : _b.trim().replace(`{{${this.indexId}}}`, index + '');
                        if (attrValue) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                        }
                    }
                }
                else if (attr.name.toLowerCase() === 'buttoniconurl') {
                    if (individualButtons[index] && individualButtons[index].hasAttribute('iconurl')) {
                        const attrValue = (_c = individualButtons[index].getAttribute('iconurl')) === null || _c === void 0 ? void 0 : _c.trim();
                        if (attrValue) {
                            btn.setAttribute('iconurl', attrValue);
                        }
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        const attrValue = (_d = this.getAttribute(attr.name)) === null || _d === void 0 ? void 0 : _d.trim().replace(`{{${this.indexId}}}`, index + '');
                        if (attrValue) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                        }
                    }
                }
                else {
                    if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        if (((_e = this.getAttribute(attr.name)) === null || _e === void 0 ? void 0 : _e.trim().includes(`{{${this.indexId}}}`)) === false) {
                            const attrValue = (_f = this.getAttribute(attr.name)) === null || _f === void 0 ? void 0 : _f.trim();
                            if (attrValue) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                            }
                        }
                        else if (((_g = this.getAttribute(attr.name)) === null || _g === void 0 ? void 0 : _g.trim().length) !== 0) {
                            const attrValue = this.replaceAll(((_h = this.getAttribute(attr.name)) === null || _h === void 0 ? void 0 : _h.trim()) + '', `{{${this.indexId}}}`, '');
                            const isNumber = /^[0-9]+$/.test(attrValue);
                            if (isNumber) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                            }
                            else {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_j = this.getAttribute(attr.name)) === null || _j === void 0 ? void 0 : _j.trim()) + '', `{{${this.indexId}}}`, index + ''));
                            }
                        }
                    }
                }
            }
            else {
                if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                    if (((_k = this.getAttribute(attr.name)) === null || _k === void 0 ? void 0 : _k.trim().includes(`{{${this.indexId}}}`)) === false) {
                        const attrValue = (_l = this.getAttribute(attr.name)) === null || _l === void 0 ? void 0 : _l.trim();
                        if (attrValue) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                        }
                    }
                    else if (((_m = this.getAttribute(attr.name)) === null || _m === void 0 ? void 0 : _m.trim().length) !== 0) {
                        const attrValue = this.replaceAll(((_o = this.getAttribute(attr.name)) === null || _o === void 0 ? void 0 : _o.trim()) + '', `{{${this.indexId}}}`, '');
                        const isNumber = /^[0-9]+$/.test(attrValue);
                        if (isNumber) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                        }
                        else {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_p = this.getAttribute(attr.name)) === null || _p === void 0 ? void 0 : _p.trim()) + '', `{{${this.indexId}}}`, index + ''));
                        }
                    }
                }
            }
        });
        if (this.receiveStateSelectedButton.trim() !== "") {
            btn.removeAttribute('receiveStateSelected');
            btn.removeAttribute('selected');
            if (this.selectedButton === index) {
                btn.setAttribute('selected', 'true');
            }
        }
        const individualButtonAttributes = ['onRelease', 'labelInnerHTML'];
        individualButtonAttributes.forEach((attr) => {
            var _a;
            if (index < individualButtonsLength && individualButtons[index] && individualButtons[index].hasAttribute(attr)) {
                const attrValue = (_a = individualButtons[index].getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.trim();
                if (attrValue) {
                    btn.setAttribute(attr, attrValue.trim());
                }
            }
        });
    }
    replaceAll(str, find, replace) {
        if (str && String(str).trim() !== "") {
            return String(str).split(find).join(replace);
        }
        else {
            return str;
        }
    }
    contractDefaultHelper() {
        if (this.contractName !== "") {
            if (this.useContractForCustomStyle === true) {
                this.receiveStateCustomStyle = this.contractName + '.CustomStyle';
            }
            if (this.useContractForCustomClass === true) {
                this.receiveStateCustomClass = this.contractName + '.CustomClass';
            }
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = this.contractName + '.ListEnabled';
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = this.contractName + '.ListVisible';
            }
            if (this.useContractForNumItems === true) {
                this.receiveStateNumberOfItems = this.contractName + `.ListNumberOfItems`;
            }
            if (this.useContractForEachButtonSelection === true) {
                this.receiveStateSelectedButton = this.contractName + `.ItemSelected`;
            }
            this.receiveStateScrollToPosition = this.contractName + `.ListScrollToItem`;
        }
    }
    contractButtonHelper(btn, index) {
        var _a, _b, _c, _d, _e, _f;
        if (this.useContractForItemEnable === true) {
            btn.setAttribute('receiveStateEnable', this.contractName + `.Button${index + 1}Enabled`);
        }
        else if (this.hasAttribute('buttonReceiveStateEnable') && ((_a = this.getAttribute('buttonReceiveStateEnable')) === null || _a === void 0 ? void 0 : _a.trim())) {
            this.indexIdReplaceHelper(btn, 'buttonReceiveStateEnable', index);
        }
        if (this.useContractForItemShow === true) {
            btn.setAttribute('receiveStateShow', this.contractName + `.Button${index + 1}Visible`);
        }
        else if (this.hasAttribute('buttonReceiveStateShow') && ((_b = this.getAttribute('buttonReceiveStateShow')) === null || _b === void 0 ? void 0 : _b.trim())) {
            this.indexIdReplaceHelper(btn, 'buttonReceiveStateShow', index);
        }
        if (this.contractItemIconType === "iconClass") {
            btn.setAttribute('receiveStateIconClass', this.contractName + `.Button${index + 1}IconClass`);
        }
        else if (this.contractItemIconType === "url") {
            btn.setAttribute('receiveStateIconUrl', this.contractName + `.Button${index + 1}IconURL`);
        }
        else if (this.contractItemIconType === "sgStateNumber") {
            btn.setAttribute('receiveStateSGIconNumeric', this.contractName + `.Button${index + 1}IconAnalog`);
        }
        else if (this.contractItemIconType === "sgStateName") {
            btn.setAttribute('receiveStateSGIconString', this.contractName + `.Button${index + 1}IconSerial`);
        }
        else if (this.contractItemIconType === "none") {
            if (this.hasAttribute('buttonReceiveStateIconClass') && ((_c = this.getAttribute('buttonReceiveStateIconClass')) === null || _c === void 0 ? void 0 : _c.trim())) {
                this.indexIdReplaceHelper(btn, 'buttonReceiveStateIconClass', index);
            }
            if (this.hasAttribute('buttonReceiveStateIconUrl') && ((_d = this.getAttribute('buttonReceiveStateIconUrl')) === null || _d === void 0 ? void 0 : _d.trim())) {
                this.indexIdReplaceHelper(btn, 'buttonReceiveStateIconUrl', index);
            }
        }
        if (this.contractItemLabelType === "textContent") {
            btn.setAttribute('receiveStateLabel', this.contractName + `.Button${index + 1}Text`);
        }
        else if (this.contractItemLabelType === "innerHTML") {
            btn.setAttribute('receiveStateScriptLabelHtml', this.contractName + `.Button${index + 1}Text`);
        }
        else {
            if (this.hasAttribute('buttonReceiveStateLabel') && ((_e = this.getAttribute('buttonReceiveStateLabel')) === null || _e === void 0 ? void 0 : _e.trim())) {
                this.indexIdReplaceHelper(btn, 'buttonReceiveStateLabel', index);
            }
            if (this.hasAttribute('buttonReceiveStateScriptLabelHtml') && ((_f = this.getAttribute('buttonReceiveStateScriptLabelHtml')) === null || _f === void 0 ? void 0 : _f.trim())) {
                this.indexIdReplaceHelper(btn, 'buttonReceiveStateScriptLabelHtml', index);
            }
        }
        btn.setAttribute('receiveStateMode', this.contractName + `.Button${index + 1}Mode`);
        if (this.useContractForEachButtonSelection === false) {
            btn.setAttribute('receiveStateSelected', this.contractName + `.Button${index + 1}ItemSelected`);
        }
        if (index === this.selectedButton && this.useContractForEachButtonSelection === true) {
            btn.setAttribute('selected', 'true');
        }
        btn.setAttribute('sgIconTheme', this.buttonSgIconTheme);
        const remainingAttributes = ['buttonCheckboxPosition', 'buttonCheckboxShow', 'buttonVAlignLabel', 'buttonHAlignLabel', 'buttonIconClass',
            'buttonIconPosition', 'buttonIconUrl', 'buttonShape', 'buttonType', 'buttonPressed', 'buttonLabelInnerHtml', 'buttonIconUrlFillType'];
        const individualButtons = this.getElementsByTagName(this.nodeName.toLowerCase() + '-individual-button');
        const individualButtonsLength = individualButtons.length;
        remainingAttributes.forEach((attr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            attr = attr.toLowerCase();
            if (index < individualButtonsLength) {
                if (attr === 'buttoniconclass') {
                    if (individualButtons[index] && individualButtons[index].hasAttribute('iconclass')) {
                        const attrValue = (_a = individualButtons[index].getAttribute('iconclass')) === null || _a === void 0 ? void 0 : _a.trim();
                        if (attrValue) {
                            btn.setAttribute('iconclass', attrValue);
                        }
                    }
                    else if (attr.startsWith('button') && this.hasAttribute(attr)) {
                        const attrValue = (_b = this.getAttribute(attr)) === null || _b === void 0 ? void 0 : _b.trim().replace(`{{${this.indexId}}}`, index + '');
                        if (attrValue) {
                            btn.setAttribute(attr.replace('button', ''), attrValue.trim());
                        }
                    }
                }
                else if (attr === 'buttoniconurl') {
                    if (individualButtons[index] && individualButtons[index].hasAttribute('iconurl')) {
                        const attrValue = (_c = individualButtons[index].getAttribute('iconurl')) === null || _c === void 0 ? void 0 : _c.trim();
                        if (attrValue) {
                            btn.setAttribute('iconurl', attrValue);
                        }
                    }
                    else if (attr.startsWith('button') && this.hasAttribute(attr)) {
                        const attrValue = (_d = this.getAttribute(attr)) === null || _d === void 0 ? void 0 : _d.trim().replace(`{{${this.indexId}}}`, index + '');
                        if (attrValue) {
                            btn.setAttribute(attr.replace('button', ''), attrValue.trim());
                        }
                    }
                }
                else {
                    if (attr === 'buttonreceivestateshow' && this.hasAttribute('receivestateshow')) {
                        btn.setAttribute('receivestateshow', this.getAttribute('receivestateshow') + '');
                    }
                    else if (attr === 'buttonreceivestateenable' && this.hasAttribute('receivestateenable')) {
                        btn.setAttribute('receivestateenable', this.getAttribute('receivestateenable') + '');
                    }
                    else if (attr.startsWith('button') && this.hasAttribute(attr)) {
                        if (((_e = this.getAttribute(attr)) === null || _e === void 0 ? void 0 : _e.trim().includes(`{{${this.indexId}}}`)) === false) {
                            const attrValue = (_f = this.getAttribute(attr)) === null || _f === void 0 ? void 0 : _f.trim();
                            if (attrValue) {
                                btn.setAttribute(attr.replace('button', ''), attrValue.trim());
                            }
                        }
                        else if (((_g = this.getAttribute(attr)) === null || _g === void 0 ? void 0 : _g.trim().length) !== 0) {
                            const attrValue = this.replaceAll(((_h = this.getAttribute(attr)) === null || _h === void 0 ? void 0 : _h.trim()) + '', `{{${this.indexId}}}`, '');
                            const isNumber = /^[0-9]+$/.test(attrValue);
                            if (isNumber) {
                                btn.setAttribute(attr.replace('button', ''), Number(attrValue) + index + '');
                            }
                            else {
                                btn.setAttribute(attr.replace('button', ''), this.replaceAll(((_j = this.getAttribute(attr)) === null || _j === void 0 ? void 0 : _j.trim()) + '', `{{${this.indexId}}}`, index + ''));
                            }
                        }
                    }
                }
            }
            else {
                if (attr === 'buttonreceivestateshow' && this.hasAttribute('receivestateshow')) {
                    btn.setAttribute('receivestateshow', this.getAttribute('receivestateshow') + '');
                }
                else if (attr === 'buttonreceivestateenable' && this.hasAttribute('receivestateenable')) {
                    btn.setAttribute('receivestateenable', this.getAttribute('receivestateenable') + '');
                }
                else if (attr.startsWith('button') && this.hasAttribute(attr)) {
                    if (((_k = this.getAttribute(attr)) === null || _k === void 0 ? void 0 : _k.trim().includes(`{{${this.indexId}}}`)) === false) {
                        const attrValue = (_l = this.getAttribute(attr)) === null || _l === void 0 ? void 0 : _l.trim();
                        if (attrValue) {
                            btn.setAttribute(attr.replace('button', ''), attrValue.trim());
                        }
                    }
                    else if (((_m = this.getAttribute(attr)) === null || _m === void 0 ? void 0 : _m.trim().length) !== 0) {
                        const attrValue = this.replaceAll(((_o = this.getAttribute(attr)) === null || _o === void 0 ? void 0 : _o.trim()) + '', `{{${this.indexId}}}`, '');
                        const isNumber = /^[0-9]+$/.test(attrValue);
                        if (isNumber) {
                            btn.setAttribute(attr.replace('button', ''), Number(attrValue) + index + '');
                        }
                        else {
                            btn.setAttribute(attr.replace('button', ''), this.replaceAll(((_p = this.getAttribute(attr)) === null || _p === void 0 ? void 0 : _p.trim()) + '', `{{${this.indexId}}}`, index + ''));
                        }
                    }
                }
            }
        });
        const individualButtonAttributes = ['onRelease', 'labelInnerHTML'];
        individualButtonAttributes.forEach((attr) => {
            var _a;
            if (index < individualButtonsLength && individualButtons[index] && individualButtons[index].hasAttribute(attr)) {
                const attrValue = (_a = individualButtons[index].getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.trim();
                if (attrValue) {
                    btn.setAttribute(attr, attrValue.trim());
                }
            }
        });
    }
    indexIdReplaceHelper(btn, attr, index) {
        var _a, _b, _c, _d, _e;
        if (((_a = this.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.trim().includes(`{{${this.indexId}}}`)) === false) {
            const attrValue = (_b = this.getAttribute(attr)) === null || _b === void 0 ? void 0 : _b.trim();
            if (attrValue) {
                btn.setAttribute(attr.toLowerCase().replace('button', ''), attrValue.trim());
            }
        }
        else if (((_c = this.getAttribute(attr)) === null || _c === void 0 ? void 0 : _c.trim().length) !== 0) {
            const attrValue = this.replaceAll(((_d = this.getAttribute(attr)) === null || _d === void 0 ? void 0 : _d.trim()) + '', `{{${this.indexId}}}`, '');
            const isNumber = /^[0-9]+$/.test(attrValue);
            if (isNumber) {
                btn.setAttribute(attr.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
            }
            else {
                btn.setAttribute(attr.toLowerCase().replace('button', ''), this.replaceAll(((_e = this.getAttribute(attr)) === null || _e === void 0 ? void 0 : _e.trim()) + '', `{{${this.indexId}}}`, index + ''));
            }
        }
    }
    initCssClass() {
        this.logger.start('initializeCssClass');
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._elContainer.style.setProperty("grid-template-rows", "repeat(" + this.rows + ", 1fr)");
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + this.scrollbar);
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + this.centerItems);
        this.logger.stop();
    }
    initScrollbar() {
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
        if (this.scrollbar) {
            if (this.scrollbarDimension === 100) {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + 'true');
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + 'false');
            }
            else {
                this.checkCenterItems();
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + 'false');
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX + 'true');
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
    handleContractName() {
        if (this.contractName.trim().length === 0) {
            this.signalNameOnContract.contractName = "";
            this.receiveStateShow = this.signalNameOnContract.receiveStateShow;
            this.receiveStateEnable = this.signalNameOnContract.receiveStateEnable;
            this.receiveStateCustomStyle = this.signalNameOnContract.receiveStateCustomStyle;
            this.receiveStateCustomClass = this.signalNameOnContract.receiveStateCustomClass;
            this.receiveStateNumberOfItems = this.signalNameOnContract.receiveStateNumberOfItems;
            this.receiveStateSelectedButton = this.signalNameOnContract.receiveStateSelectedButton;
            this.receiveStateScrollToPosition = this.signalNameOnContract.receiveStateScrollToPosition;
        }
        else if (this.signalNameOnContract.contractName === "") {
            this.signalNameOnContract.contractName = this.contractName;
            this.signalNameOnContract.receiveStateShow = this.receiveStateShow;
            this.signalNameOnContract.receiveStateEnable = this.receiveStateEnable;
            this.signalNameOnContract.receiveStateCustomStyle = this.receiveStateCustomStyle;
            this.signalNameOnContract.receiveStateCustomClass = this.receiveStateCustomClass;
            this.signalNameOnContract.receiveStateNumberOfItems = this.receiveStateNumberOfItems;
            this.signalNameOnContract.receiveStateSelectedButton = this.receiveStateSelectedButton;
            this.signalNameOnContract.receiveStateScrollToPosition = this.receiveStateScrollToPosition;
        }
        this.debounceButtonDisplay();
    }
    signalHolder() {
        var _a, _b;
        if ((this.contractName.length !== 0 && this.useContractForItemShow === true)) {
            this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
            this.showSignalHolder = [];
            this.loadButtonForShow = true;
            for (let i = 1; i <= this.numberOfItems; i++) {
                const signalValue = `${this.contractName}.Button${i}Visible`;
                const signalResponse = this.setSignalByBoolean(signalValue);
                this.showSignalHolder.push({ signalState: "", signalValue, value: false });
                if (!_.isNil(signalResponse)) {
                    this.showSignalHolder[i - 1].signalState = signalResponse.subscribe((newValue) => {
                        this.showSignalHolder[i - 1].value = newValue;
                        this.debounceButtonShow();
                        return true;
                    });
                }
            }
        }
        else if (this.buttonReceiveStateShow.length !== 0 && this.buttonReceiveStateShow.trim().includes(`{{${this.indexId}}}`) === true) {
            this.showSignalHolder.forEach((el) => this.clearOldSubscription(el.signalValue, el.signalState));
            this.showSignalHolder = [];
            this.loadButtonForShow = true;
            const attrValue = this.replaceAll(((_a = this.getAttribute('buttonReceiveStateShow')) === null || _a === void 0 ? void 0 : _a.trim()) + '', `{{${this.indexId}}}`, '');
            const isNumber = /^[0-9]+$/.test(attrValue);
            for (let i = 0; i < this.numberOfItems; i++) {
                const signalValue = isNumber ? Number(attrValue) + i + '' : this.replaceAll(((_b = this.getAttribute('buttonReceiveStateShow')) === null || _b === void 0 ? void 0 : _b.trim()) + '', `{{${this.indexId}}}`, i + '');
                this.showSignalHolder.push({ signalState: "", signalValue, value: false });
                const signalResponse = this.setSignalByBoolean(signalValue);
                if (!_.isNil(signalResponse)) {
                    this.showSignalHolder[i].signalState = signalResponse.subscribe((newValue) => {
                        this.showSignalHolder[i].value = newValue;
                        this.debounceButtonShow();
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
    buttonShow() {
        const visibleButtons = this.showSignalHolder.filter((btn) => (btn === null || btn === void 0 ? void 0 : btn.value) === true).length;
        this.allButtonsVisible = visibleButtons === this.numberOfItems ? true : false;
        if (this.allButtonsVisible === true) {
            return;
        }
        this.scrollToMiddleRange();
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
            this.createButton(this.getFirstChild() - 1, false);
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
            this.createButton(this.getFirstChild() - 1, false);
        }
        while (counter !== 0 && k < counter && this.getLastChild() !== this.numberOfItems - 1) {
            if (this.showSignalHolder[this.getLastChild() + 1].value === true) {
                k = k + 1;
            }
            this.createButton(this.getLastChild() + 1);
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
            this.createButton(this.getLastChild() + 1);
        }
    }
    handleReceiveStateSelectedButton() {
        Array.from(this._elContainer.children).forEach((btnContainer) => {
            var _a;
            const btn = btnContainer.children[0];
            btn.removeAttribute('selected');
            if (Number((_a = btnContainer.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.replace(this.getCrId() + '-', '')) === this.selectedButton) {
                btn.setAttribute('selected', 'true');
            }
        });
    }
    checkCenterItems() {
        if (this.centerItems === true) {
            if (this.scrollbarDimension < 100) {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + "true");
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + "false");
            }
            else {
                this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + "false");
                this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX + "true");
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
Ch5ButtonListBase.SCROLLBAR_CLASSLIST_PREFIX = '--scrollbar-';
Ch5ButtonListBase.CENTER_ITEMS_CLASSLIST_PREFIX = '--center-items-';
Ch5ButtonListBase.BUTTON_CONTAINER_BUFFER = 4;
Ch5ButtonListBase.MODES_MAX_COUNT = 5;
Ch5ButtonListBase.ORIENTATION = ['horizontal', 'vertical'];
Ch5ButtonListBase.LOAD_ITEMS = ['visible-only', 'load-new', 'all'];
Ch5ButtonListBase.STRETCH = ['both'];
Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE = ['none', 'textContent', 'innerHTML'];
Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE = ['none', 'iconClass', 'url', 'sgStateName', 'sgStateNumber'];
Ch5ButtonListBase.BUTTON_TYPES = ['default', 'danger', 'text', 'warning', 'info', 'success', 'primary', 'secondary'];
Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS = ['center', 'left', 'right'];
Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS = ['middle', 'top', 'bottom'];
Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS = ['left', 'right'];
Ch5ButtonListBase.BUTTON_ICON_POSITIONS = ['first', 'last', 'top', 'bottom'];
Ch5ButtonListBase.BUTTON_SHAPES = ['rounded-rectangle', 'rectangle'];
Ch5ButtonListBase.BUTTON_ICON_URL_FILL_TYPE = ['stretch', 'stretch-aspect', 'center', 'tile', 'initial'];
Ch5ButtonListBase.SG_ICON_THEME = ['icons-lg', 'icons-sm', 'media-transports-accents', 'media-transports-light', 'media-transports-dark'];
Ch5ButtonListBase.COMPONENT_DATA = {
    ORIENTATION: {
        default: Ch5ButtonListBase.ORIENTATION[0],
        values: Ch5ButtonListBase.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    },
    LOAD_ITEMS: {
        default: Ch5ButtonListBase.LOAD_ITEMS[0],
        values: Ch5ButtonListBase.LOAD_ITEMS,
        key: 'loadItems',
        attribute: 'loadItems',
        classListPrefix: '--load-items-'
    },
    STRETCH: {
        default: Ch5ButtonListBase.STRETCH[0],
        values: Ch5ButtonListBase.STRETCH,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '--stretch-'
    },
    BUTTON_TYPE: {
        default: Ch5ButtonListBase.BUTTON_TYPES[0],
        values: Ch5ButtonListBase.BUTTON_TYPES,
        key: 'buttonType',
        attribute: 'buttonType',
        classListPrefix: '--button-type-'
    },
    BUTTON_HALIGN_LABEL: {
        default: Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        values: Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS,
        key: 'buttonHAlignLabel',
        attribute: 'buttonHAlignLabel',
        classListPrefix: '--button-halign-label-'
    },
    BUTTON_VALIGN_LABEL: {
        default: Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        values: Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS,
        key: 'buttonVAlignLabel',
        attribute: 'buttonVAlignLabel',
        classListPrefix: '--button-valign-label-'
    },
    BUTTON_CHECKBOX_POSITION: {
        default: Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS[0],
        values: Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS,
        key: 'buttonCheckboxPosition',
        attribute: 'buttonCheckboxPosition',
        classListPrefix: '--button-checkbox-position-'
    },
    BUTTON_ICON_POSITION: {
        default: Ch5ButtonListBase.BUTTON_ICON_POSITIONS[0],
        values: Ch5ButtonListBase.BUTTON_ICON_POSITIONS,
        key: 'buttonIconPosition',
        attribute: 'buttonIconPosition',
        classListPrefix: '--button-icon-position-'
    },
    BUTTON_SHAPE: {
        default: Ch5ButtonListBase.BUTTON_SHAPES[0],
        values: Ch5ButtonListBase.BUTTON_SHAPES,
        key: 'buttonShape',
        attribute: 'buttonShape',
        classListPrefix: '--button-shape-'
    },
    BUTTON_ICON_URL_FILL_TYPE: {
        default: Ch5ButtonListBase.BUTTON_ICON_URL_FILL_TYPE[0],
        values: Ch5ButtonListBase.BUTTON_ICON_URL_FILL_TYPE,
        key: 'buttonIconUrlFillType',
        attribute: 'buttonIconUrlFillType',
        classListPrefix: '--button-icon-url-fill-type-'
    },
    CONTRACT_ITEM_LABEL_TYPE: {
        default: Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE[0],
        values: Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE,
        key: 'contractItemLabelType',
        attribute: 'contractItemLabelType',
        classListPrefix: 'ch5-general--contract-item-label-type-'
    },
    CONTRACT_ITEM_ICON_TYPE: {
        default: Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE[0],
        values: Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE,
        key: 'contractItemIconType',
        attribute: 'contractItemIconType',
        classListPrefix: 'ch5-general--contract-item-icon-type-'
    }
};
Ch5ButtonListBase.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receiveStateNumberOfItems: { direction: "state", numericJoin: 1, contractName: true }, receiveStateScrollToPosition: { direction: "state", numericJoin: 1, contractName: true }, receivestateselectedbutton: { direction: "state", numericJoin: 1, contractName: true } });
Ch5ButtonListBase.COMPONENT_PROPERTIES = [
    {
        default: Ch5ButtonListBase.ORIENTATION[0],
        enumeratedValues: Ch5ButtonListBase.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.ORIENTATION[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListBase.LOAD_ITEMS[0],
        enumeratedValues: Ch5ButtonListBase.LOAD_ITEMS,
        name: "loadItems",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.LOAD_ITEMS[0],
        isObservableProperty: true,
    },
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
        name: "centerItems",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: null,
        enumeratedValues: Ch5ButtonListBase.STRETCH,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true,
    },
    {
        default: false,
        name: "endless",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: 1,
        name: "rows",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 1,
        numberProperties: {
            min: 1,
            max: 500,
            conditionalMin: 1,
            conditionalMax: 500,
            conditionalMinValue: 1,
            conditionalMaxValue: 500
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
            max: 500,
            conditionalMin: 1,
            conditionalMax: 500,
            conditionalMinValue: 1,
            conditionalMaxValue: 500
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "indexId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
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
            max: 500,
            conditionalMin: 1,
            conditionalMax: 500,
            conditionalMinValue: 1,
            conditionalMaxValue: 500
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
        isObservableProperty: true,
    },
    {
        default: 0,
        name: "scrollToPosition",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateScrollToPosition",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 499,
            conditionalMin: 0,
            conditionalMax: 499,
            conditionalMinValue: 0,
            conditionalMaxValue: 499
        },
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateScrollToPosition",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSelectedButton",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "contractName",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
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
        name: "useContractForEachButtonSelection",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE[0],
        enumeratedValues: Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE,
        name: "contractItemLabelType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.CONTRACT_ITEM_LABEL_TYPE[0],
        isObservableProperty: true,
    },
    {
        default: Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE[0],
        enumeratedValues: Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE,
        name: "contractItemIconType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.CONTRACT_ITEM_ICON_TYPE[0],
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
        default: Ch5ButtonListBase.BUTTON_TYPES[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_TYPES,
        name: "buttonType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_TYPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS,
        name: "buttonHAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_HALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS,
        name: "buttonVAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_VALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS,
        name: "buttonCheckboxPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_CHECKBOX_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5ButtonListBase.BUTTON_ICON_POSITIONS[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_ICON_POSITIONS,
        name: "buttonIconPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_ICON_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5ButtonListBase.BUTTON_SHAPES[0],
        enumeratedValues: Ch5ButtonListBase.BUTTON_SHAPES,
        name: "buttonShape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.BUTTON_SHAPES[0],
        isObservableProperty: true
    },
    {
        default: null,
        enumeratedValues: Ch5ButtonListBase.BUTTON_ICON_URL_FILL_TYPE,
        name: "buttonIconUrlFillType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: Ch5ButtonListBase.SG_ICON_THEME[0],
        enumeratedValues: Ch5ButtonListBase.SG_ICON_THEME,
        name: "buttonSgIconTheme",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5ButtonListBase.SG_ICON_THEME[0],
        isObservableProperty: true,
    },
    {
        default: false,
        name: "buttonCheckboxShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "buttonSelected",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "buttonPressed",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: 0,
        name: "buttonMode",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 4,
            conditionalMin: 0,
            conditionalMax: 4,
            conditionalMinValue: 0,
            conditionalMaxValue: 0
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonIconClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonIconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonLabelInnerHtml",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateMode",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateSelected",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateLabel",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateScriptLabelHtml",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateIconClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateIconUrl",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateSGIconNumeric",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateSGIconString",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonSendEventOnClick",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "buttonReceiveStateShow",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        name: "buttonReceiveStateEnable",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: 1500,
        name: "clickHoldTime",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 120000,
            conditionalMin: 0,
            conditionalMax: 120000,
            conditionalMinValue: 0,
            conditionalMaxValue: 120000
        },
        isObservableProperty: true
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1saXN0LWJhc2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYnV0dG9uLWxpc3QvYmFzZS1jbGFzc2VzL2NoNS1idXR0b24tbGlzdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQVMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFNBQVM7SUE0cEI5QyxJQUFXLFdBQVcsQ0FBQyxLQUEwQztRQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBc0MsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDdEYsSUFBSSxD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