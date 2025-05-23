import { Ch5Button } from "../ch5-button/ch5-button";
import { Ch5ButtonLabel } from "../ch5-button/ch5-button-label";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5AugmentVarSignalsNames } from "../ch5-common/ch5-augment-var-signals-names";
import { Ch5Common } from "../ch5-common/ch5-common";
export class Ch5TabButton extends Ch5Common {
    set buttonType(value) {
        this._ch5Properties.set("buttonType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonType() {
        return this._ch5Properties.get("buttonType");
    }
    set buttonIconUrlFillType(value) {
        this._ch5Properties.set("buttonIconUrlFillType", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get buttonIconUrlFillType() {
        return this._ch5Properties.get("buttonIconUrlFillType");
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
    set numberOfItems(value) {
        this._ch5Properties.set("numberOfItems", value, () => {
            this.debounceButtonDisplay();
        });
    }
    get numberOfItems() {
        return this._ch5Properties.get("numberOfItems");
    }
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set indexId(value) {
        this._ch5Properties.set("indexId", value);
    }
    get indexId() {
        return this._ch5Properties.get("indexId");
    }
    set receiveStateSelectedButton(value) {
        this._ch5Properties.set("receiveStateSelectedButton", value, null, (newValue) => {
            const fromJoin = this.contractName === "";
            const fromContract = this.contractName !== "" && this.useContractForEachButtonSelection === true && this.receiveStateSelectedButton === this.contractName + '.TabSelected';
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
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5TabButton.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5TabButton.ELEMENT_NAME, Ch5TabButton);
        }
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5TabButton.ELEMENT_NAME, Ch5TabButton.SIGNAL_ATTRIBUTE_TYPES);
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-tab-button';
        this._elContainer = {};
        this.selectedButton = 0;
        this.signalNameOnContract = {
            contractName: "",
            receiveStateCustomClass: "",
            receiveStateCustomStyle: "",
            receiveStateEnable: "",
            receiveStateShow: "",
            receiveStateSelectedButton: "",
        };
        this.debounceButtonDisplay = this.debounce(() => {
            this.tabButtonDisplay();
        }, 50);
        this.ignoreAttributes = ['receivestateshowpulse', 'receivestatehidepulse', 'sendeventonshow'];
        this.logger.start('constructor()');
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5TabButton.COMPONENT_PROPERTIES);
        this.initCssClass();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5TabButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TabButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5TabButton.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.nodeName);
        if (oldValue !== newValue) {
            this.logger.log('attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5TabButton.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5TabButton);
        }
        this.checkInternalHTML();
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.debounceButtonDisplay();
        customElements.whenDefined(this.nodeName.toLowerCase()).then(() => {
            this.componentLoadedEvent(this.nodeName.toLowerCase(), this.id);
        });
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5TabButton.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5TabButton.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5TabButton.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5TabButton.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
    }
    removeEventListeners() {
        super.removeEventListeners();
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    initCssClass() {
        this.logger.start('UpdateCssClass');
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this.logger.stop();
    }
    checkInternalHTML() {
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add(this.nodeName.toLowerCase());
            this.appendChild(this._elContainer);
        }
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    handleOrientation() {
        Array.from(Ch5TabButton.COMPONENT_DATA.ORIENTATION.values).forEach((orientation) => {
            this._elContainer.classList.remove(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.ORIENTATION.classListPrefix + orientation);
        });
        this._elContainer.classList.add(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
    }
    tabButtonDisplay() {
        var _a, _b, _c, _d, _e, _f;
        Array.from(this._elContainer.children).forEach(container => container.remove());
        this.contractDefaultHelper();
        for (let i = 0; i < this.numberOfItems; i++) {
            this.createButton(i);
        }
        Array.from(this._elContainer.children).forEach(container => { var _a, _b; return (_b = (_a = container.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.classList.add(this.primaryCssClass + '--center-tab-style'); });
        (_c = (_b = (_a = this._elContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.classList.replace(`${this.primaryCssClass + '--center-tab-style'}`, `${this.primaryCssClass + '--start-tab-style'}`);
        (_f = (_e = (_d = this._elContainer.lastElementChild) === null || _d === void 0 ? void 0 : _d.firstElementChild) === null || _e === void 0 ? void 0 : _e.firstElementChild) === null || _f === void 0 ? void 0 : _f.classList.replace(`${this.primaryCssClass + '--center-tab-style'}`, `${this.primaryCssClass + '--end-tab-style'}`);
    }
    contractDefaultHelper() {
        if (this.contractName !== "") {
            if (this.useContractForEnable === true) {
                this.receiveStateEnable = this.contractName + '.Enable';
            }
            if (this.useContractForShow === true) {
                this.receiveStateShow = this.contractName + '.Visible';
            }
            if (this.useContractForCustomStyle === true) {
                this.receiveStateCustomStyle = this.contractName + '.CustomStyle';
            }
            if (this.useContractForCustomClass === true) {
                this.receiveStateCustomClass = this.contractName + '.CustomClass';
            }
            if (this.useContractForEachButtonSelection === true) {
                this.receiveStateSelectedButton = this.contractName + `.TabSelected`;
            }
        }
    }
    createButton(index, append = true) {
        var _a, _b, _c, _d, _e;
        if (index < 0 || index >= this.numberOfItems) {
            return;
        }
        ;
        const buttonListContractObj = { index: index + 1, clickHoldTime: 0, contractName: this.contractName, parentComponent: 'ch5-tab-button' };
        const btn = new Ch5Button(buttonListContractObj);
        btn.setAttribute("swipeGestureEnabled", "true");
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute('id', this.getCrId() + '-' + index);
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
        btnContainer.classList.add(this.nodeName.toLowerCase() + "--button-container");
        btnContainer.appendChild(btn);
        append ? this._elContainer.appendChild(btnContainer) : this._elContainer.prepend(btnContainer);
        this.buttonLabelHelper(btn, index);
        this.buttonHelper(btn, index);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.BUTTON_TYPE.classListPrefix + this.buttonType);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.BUTTON_SHAPE.classListPrefix + this.buttonShape);
        btn.addContainerClass(this.nodeName.toLowerCase() + Ch5TabButton.COMPONENT_DATA.BUTTON_ICON_POSITION.classListPrefix + this.buttonIconPosition);
    }
    buttonLabelHelper(btn, index) {
        const buttonListLabels = this.getElementsByTagName(this.nodeName.toLowerCase() + "-label");
        if (buttonListLabels && buttonListLabels.length > 0) {
            Array.from(buttonListLabels).forEach((buttonListLabel) => {
                if (buttonListLabel.parentElement instanceof Ch5TabButton) {
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
        const individualButtons = this.getElementsByTagName(this.nodeName.toLowerCase() + '-individual-button');
        const individualButtonsLength = individualButtons.length;
        btn.setAttribute('stretch', 'both');
        btn.setAttribute('shape', Ch5TabButton.BUTTON_SHAPES[0]);
        Ch5TabButton.COMPONENT_PROPERTIES.forEach((attr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
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
                else if (attr.name.toLowerCase() === 'buttonreceivestateselected') {
                    if (this.contractName !== "") {
                        if (this.useContractForEachButtonSelection === false) {
                            btn.setAttribute('receiveStateSelected', this.contractName + `.Tab${index + 1}_Selected`);
                        }
                        if (index === this.selectedButton && this.useContractForEachButtonSelection === true) {
                            btn.setAttribute('selected', 'true');
                        }
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
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
                else if (attr.name.toLowerCase() === 'buttonsendeventonclick') {
                    if (this.contractName !== "") {
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
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
                else {
                    if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        if (((_q = this.getAttribute(attr.name)) === null || _q === void 0 ? void 0 : _q.trim().includes(`{{${this.indexId}}}`)) === false) {
                            const attrValue = (_r = this.getAttribute(attr.name)) === null || _r === void 0 ? void 0 : _r.trim();
                            if (attrValue) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                            }
                        }
                        else if (((_s = this.getAttribute(attr.name)) === null || _s === void 0 ? void 0 : _s.trim().length) !== 0) {
                            const attrValue = this.replaceAll(((_t = this.getAttribute(attr.name)) === null || _t === void 0 ? void 0 : _t.trim()) + '', `{{${this.indexId}}}`, '');
                            const isNumber = /^[0-9]+$/.test(attrValue);
                            if (isNumber) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                            }
                            else {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_u = this.getAttribute(attr.name)) === null || _u === void 0 ? void 0 : _u.trim()) + '', `{{${this.indexId}}}`, index + ''));
                            }
                        }
                    }
                }
            }
            else {
                if (attr.name.toLowerCase() === 'buttonreceivestateselected') {
                    if (this.contractName !== "") {
                        btn.setAttribute('receiveStateSelected', this.contractName + `.Tab${index + 1}_Selected`);
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        if (((_v = this.getAttribute(attr.name)) === null || _v === void 0 ? void 0 : _v.trim().includes(`{{${this.indexId}}}`)) === false) {
                            const attrValue = (_w = this.getAttribute(attr.name)) === null || _w === void 0 ? void 0 : _w.trim();
                            if (attrValue) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                            }
                        }
                        else if (((_x = this.getAttribute(attr.name)) === null || _x === void 0 ? void 0 : _x.trim().length) !== 0) {
                            const attrValue = this.replaceAll(((_y = this.getAttribute(attr.name)) === null || _y === void 0 ? void 0 : _y.trim()) + '', `{{${this.indexId}}}`, '');
                            const isNumber = /^[0-9]+$/.test(attrValue);
                            if (isNumber) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                            }
                            else {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_z = this.getAttribute(attr.name)) === null || _z === void 0 ? void 0 : _z.trim()) + '', `{{${this.indexId}}}`, index + ''));
                            }
                        }
                    }
                }
                else if (attr.name.toLowerCase() === 'buttonsendeventonclick') {
                    if (this.contractName !== "") {
                    }
                    else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                        if (((_0 = this.getAttribute(attr.name)) === null || _0 === void 0 ? void 0 : _0.trim().includes(`{{${this.indexId}}}`)) === false) {
                            const attrValue = (_1 = this.getAttribute(attr.name)) === null || _1 === void 0 ? void 0 : _1.trim();
                            if (attrValue) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                            }
                        }
                        else if (((_2 = this.getAttribute(attr.name)) === null || _2 === void 0 ? void 0 : _2.trim().length) !== 0) {
                            const attrValue = this.replaceAll(((_3 = this.getAttribute(attr.name)) === null || _3 === void 0 ? void 0 : _3.trim()) + '', `{{${this.indexId}}}`, '');
                            const isNumber = /^[0-9]+$/.test(attrValue);
                            if (isNumber) {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                            }
                            else {
                                btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_4 = this.getAttribute(attr.name)) === null || _4 === void 0 ? void 0 : _4.trim()) + '', `{{${this.indexId}}}`, index + ''));
                            }
                        }
                    }
                }
                else if (attr.name.toLowerCase().startsWith('button') && this.hasAttribute(attr.name)) {
                    if (((_5 = this.getAttribute(attr.name)) === null || _5 === void 0 ? void 0 : _5.trim().includes(`{{${this.indexId}}}`)) === false) {
                        const attrValue = (_6 = this.getAttribute(attr.name)) === null || _6 === void 0 ? void 0 : _6.trim();
                        if (attrValue) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), attrValue.trim());
                        }
                    }
                    else if (((_7 = this.getAttribute(attr.name)) === null || _7 === void 0 ? void 0 : _7.trim().length) !== 0) {
                        const attrValue = this.replaceAll(((_8 = this.getAttribute(attr.name)) === null || _8 === void 0 ? void 0 : _8.trim()) + '', `{{${this.indexId}}}`, '');
                        const isNumber = /^[0-9]+$/.test(attrValue);
                        if (isNumber) {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), Number(attrValue) + index + '');
                        }
                        else {
                            btn.setAttribute(attr.name.toLowerCase().replace('button', ''), this.replaceAll(((_9 = this.getAttribute(attr.name)) === null || _9 === void 0 ? void 0 : _9.trim()) + '', `{{${this.indexId}}}`, index + ''));
                        }
                    }
                }
            }
        });
        if ((this.receiveStateSelectedButton.trim() !== "" && this.contractName === "") || (this.contractName !== "" && this.useContractForEachButtonSelection === true && this.receiveStateSelectedButton === this.contractName + '.TabSelected')) {
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
    handleContractName() {
        if (this.contractName.length === 0) {
            this.signalNameOnContract.contractName = "";
            this.receiveStateShow = this.signalNameOnContract.receiveStateShow;
            this.receiveStateEnable = this.signalNameOnContract.receiveStateEnable;
            this.receiveStateCustomStyle = this.signalNameOnContract.receiveStateCustomStyle;
            this.receiveStateCustomClass = this.signalNameOnContract.receiveStateCustomClass;
            this.receiveStateSelectedButton = this.signalNameOnContract.receiveStateSelectedButton;
        }
        else if (this.signalNameOnContract.contractName === "") {
            this.signalNameOnContract.contractName = this.contractName;
            this.signalNameOnContract.receiveStateShow = this.receiveStateShow;
            this.signalNameOnContract.receiveStateEnable = this.receiveStateEnable;
            this.signalNameOnContract.receiveStateCustomStyle = this.receiveStateCustomStyle;
            this.signalNameOnContract.receiveStateCustomClass = this.receiveStateCustomClass;
            this.signalNameOnContract.receiveStateSelectedButton = this.receiveStateSelectedButton;
        }
        this.debounceButtonDisplay();
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
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
}
Ch5TabButton.ELEMENT_NAME = 'ch5-tab-button';
Ch5TabButton.BUTTON_TYPES = ['default', 'danger', 'text', 'warning', 'info', 'success', 'primary', 'secondary'];
Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS = ['center', 'left', 'right'];
Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS = ['middle', 'top', 'bottom'];
Ch5TabButton.BUTTON_SHAPES = ['rounded-rectangle', 'rectangle', 'tab'];
Ch5TabButton.BUTTON_ICON_POSITIONS = ['first', 'last', 'top', 'bottom'];
Ch5TabButton.ORIENTATION = ['horizontal', 'vertical'];
Ch5TabButton.BUTTON_ICON_URL_FILL_TYPE = ['stretch', 'stretch-aspect', 'center', 'tile', 'initial'];
Ch5TabButton.COMPONENT_DATA = {
    ORIENTATION: {
        default: Ch5TabButton.ORIENTATION[0],
        values: Ch5TabButton.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation-'
    },
    BUTTON_TYPE: {
        default: Ch5TabButton.BUTTON_TYPES[0],
        values: Ch5TabButton.BUTTON_TYPES,
        key: 'buttonType',
        attribute: 'buttonType',
        classListPrefix: '--button-type-'
    },
    BUTTON_HALIGN_LABEL: {
        default: Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS[0],
        values: Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS,
        key: 'buttonHAlignLabel',
        attribute: 'buttonHAlignLabel',
        classListPrefix: '--button-halign-label-'
    },
    BUTTON_VALIGN_LABEL: {
        default: Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS[0],
        values: Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS,
        key: 'buttonVAlignLabel',
        attribute: 'buttonVAlignLabel',
        classListPrefix: '--button-valign-label-'
    },
    BUTTON_ICON_POSITION: {
        default: Ch5TabButton.BUTTON_ICON_POSITIONS[0],
        values: Ch5TabButton.BUTTON_ICON_POSITIONS,
        key: 'buttonIconPosition',
        attribute: 'buttonIconPosition',
        classListPrefix: '--button-icon-position-'
    },
    BUTTON_SHAPE: {
        default: Ch5TabButton.BUTTON_SHAPES[0],
        values: Ch5TabButton.BUTTON_SHAPES,
        key: 'buttonShape',
        attribute: 'buttonShape',
        classListPrefix: '--button-shape-'
    },
    BUTTON_ICON_URL_FILL_TYPE: {
        default: Ch5TabButton.BUTTON_ICON_URL_FILL_TYPE[0],
        values: Ch5TabButton.BUTTON_ICON_URL_FILL_TYPE,
        key: 'buttonIconUrlFillType',
        attribute: 'buttonIconUrlFillType',
        classListPrefix: '--button-icon-url-fill-type-'
    },
};
Ch5TabButton.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateselectedbutton: { direction: "state", numericJoin: 1, contractName: true } });
Ch5TabButton.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "indexId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: 3,
        name: "numberOfItems",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 3,
        numberProperties: {
            min: 2,
            max: 15,
            conditionalMin: 2,
            conditionalMax: 15,
            conditionalMinValue: 2,
            conditionalMaxValue: 15
        },
        isObservableProperty: true
    },
    {
        default: Ch5TabButton.ORIENTATION[0],
        enumeratedValues: Ch5TabButton.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.ORIENTATION[0],
        isObservableProperty: true,
    },
    {
        default: null,
        enumeratedValues: Ch5TabButton.BUTTON_ICON_URL_FILL_TYPE,
        name: "buttonIconUrlFillType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: null,
        isObservableProperty: true,
        isNullable: true
    },
    {
        default: Ch5TabButton.BUTTON_TYPES[0],
        enumeratedValues: Ch5TabButton.BUTTON_TYPES,
        name: "buttonType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.BUTTON_TYPES[0],
        isObservableProperty: true
    },
    {
        default: Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS,
        name: "buttonHAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.BUTTON_HALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS[0],
        enumeratedValues: Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS,
        name: "buttonVAlignLabel",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.BUTTON_VALIGN_LABEL_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5TabButton.BUTTON_ICON_POSITIONS[0],
        enumeratedValues: Ch5TabButton.BUTTON_ICON_POSITIONS,
        name: "buttonIconPosition",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.BUTTON_ICON_POSITIONS[0],
        isObservableProperty: true
    },
    {
        default: Ch5TabButton.BUTTON_SHAPES[0],
        enumeratedValues: Ch5TabButton.BUTTON_SHAPES,
        name: "buttonShape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5TabButton.BUTTON_SHAPES[0],
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
];
Ch5TabButton.registerCustomElement();
Ch5TabButton.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRhYi1idXR0b24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdGFiLWJ1dHRvbi9jaDUtdGFiLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQU1uSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFHdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE1BQU0sT0FBTyxZQUFhLFNBQVEsU0FBUztJQTJWekMsSUFBVyxVQUFVLENBQUMsS0FBOEI7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQTBCLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUEwQixZQUFZLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBVyxxQkFBcUIsQ0FBQyxLQUFnRDtRQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBNEMsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUN0RyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFXLHFCQUFxQjtRQUM5QixPQUFP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