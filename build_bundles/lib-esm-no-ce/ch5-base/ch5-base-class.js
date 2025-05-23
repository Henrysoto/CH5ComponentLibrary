var _a;
import { Ch5Signal, Ch5SignalFactory, Ch5Uid, publishEvent, subscribeInViewPortChange } from '../ch5-core';
import { Ch5Config } from '../ch5-common/ch5-config';
import { Ch5MutationObserver } from '../ch5-common/ch5-mutation-observer';
import isEmpty from 'lodash/isEmpty';
import { Ch5BaseLog } from './ch5-base-log';
import { Ch5Properties } from '../ch5-core/ch5-properties';
import * as util from '../ch5-common/utils';
export class Ch5BaseClass extends HTMLElement {
    set appendClassWhenInViewPort(value) {
        this._ch5Properties.set("appendClassWhenInViewPort", value, () => {
            if (!this._subscribeAppendClassWhenInViewPort) {
                this._subscribeAppendClassWhenInViewPort = true;
                subscribeInViewPortChange(this, (isInViewPort) => {
                    this.updateElementVisibility(isInViewPort);
                    this.updateInViewPortClass();
                });
            }
        });
    }
    get appendClassWhenInViewPort() {
        return this._ch5Properties.get("appendClassWhenInViewPort");
    }
    set customClass(value) {
        this._ch5Properties.set("customClass", value, () => {
            this.updateForChangeInCustomCssClass(this._ch5Properties.getPrevious("customClass").split(" "));
        });
    }
    get customClass() {
        return this._ch5Properties.get("customClass");
    }
    set customStyle(value) {
        this._ch5Properties.set("customStyle", value, () => {
            this.updateForChangeInCustomStyle();
        });
    }
    get customStyle() {
        return this._ch5Properties.get("customStyle");
    }
    set debug(value) {
        this._ch5Properties.set("debug", value, () => {
            this.logger.isDebugEnabled = this.debug;
        });
    }
    get debug() {
        return this._ch5Properties.get("debug");
    }
    set dir(value) {
        this._ch5Properties.set("dir", value);
    }
    get dir() {
        return this._ch5Properties.get("dir");
    }
    set disabled(value) {
        this._ch5Properties.set("disabled", value, () => {
            this.updateForChangeInDisabledStatus();
        });
    }
    get disabled() {
        return this._ch5Properties.get("disabled");
    }
    set id(value) {
        this._ch5Properties.set("id", value);
    }
    get id() {
        return this._ch5Properties.get("id");
    }
    set noshowType(value) {
        this._ch5Properties.set("noshowType", value, () => {
            this.updateForChangeInShowStatus();
        });
    }
    get noshowType() {
        return this._ch5Properties.get("noshowType");
    }
    set receiveStateCustomClass(value) {
        this._ch5Properties.set("receiveStateCustomClass", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("customClass", newValue, () => {
                this.updateForChangeInCustomCssClass(this._ch5Properties.getPrevious("customClass").split(" "));
            });
        });
    }
    get receiveStateCustomClass() {
        return this._ch5Properties.get("receiveStateCustomClass");
    }
    set receiveStateCustomStyle(value) {
        this._ch5Properties.set("receiveStateCustomStyle", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("customStyle", newValue, () => {
                this.updateForChangeInCustomStyle();
            });
        });
    }
    get receiveStateCustomStyle() {
        return this._ch5Properties.get("receiveStateCustomStyle");
    }
    set show(value) {
        this._ch5Properties.set("show", value, () => {
            this.updateForChangeInShowStatus();
        });
    }
    get show() {
        return this._ch5Properties.get("show");
    }
    set receiveStateEnable(value) {
        this._ch5Properties.set("receiveStateEnable", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("disabled", newValue, () => {
                this.updateForChangeInDisabledStatus();
            });
        });
    }
    get receiveStateEnable() {
        return this._ch5Properties.get("receiveStateEnable");
    }
    set receiveStateHidePulse(value) {
        this._ch5Properties.set("receiveStateHidePulse", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("show", newValue, () => {
                const targetElement = this;
                this.handleHide(targetElement);
            });
        });
    }
    get receiveStateHidePulse() {
        return this._ch5Properties.get("receiveStateHidePulse");
    }
    set receiveStateShowPulse(value) {
        this._ch5Properties.set("receiveStateShowPulse", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("show", newValue, () => {
                const targetElement = this;
                this.handleShow(targetElement);
            });
        });
    }
    get receiveStateShowPulse() {
        return this._ch5Properties.get("receiveStateShowPulse");
    }
    set receiveStateShow(value) {
        this._ch5Properties.set("receiveStateShow", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("show", newValue, () => {
                this.updateForChangeInShowStatus();
            });
        });
    }
    get receiveStateShow() {
        return this._ch5Properties.get("receiveStateShow");
    }
    set sendEventOnShow(value) {
        this._ch5Properties.set("sendEventOnShow", value, () => {
            this.sendShowSignal(Boolean(value));
        });
    }
    get sendEventOnShow() {
        return this._ch5Properties.get("sendEventOnShow");
    }
    set onrelease(callback) {
        this._onrelease = callback;
    }
    get onrelease() {
        return this._onrelease;
    }
    set onpress(callback) {
        this.logger.log("set onpress");
        this._onpress = callback;
    }
    get onpress() {
        this.logger.log("get onpress");
        return this._onpress;
    }
    set trace(value) {
        this._ch5Properties.set("trace", value, () => {
            this.logger.isTraceEnabled = this.trace;
        });
    }
    get trace() {
        return this._ch5Properties.get("trace");
    }
    set swipeGestureEnabled(value) {
        this.logger.log('set swipeGestureEnabled(\'' + value + '\')');
        this._ch5Properties.set("swipeGestureEnabled", value);
    }
    get swipeGestureEnabled() {
        return this.swipeGestureEnabled;
    }
    get util() {
        return util;
    }
    constructor(componentInputProperties) {
        super();
        this.COMPONENT_NAME = "Ch5BaseClass";
        this.primaryCssClass = 'ch5-base-class';
        this.childrenOfCurrentNode = null;
        this._isInstantiated = false;
        this._nextSiblingIndexInParentChildNodes = 0;
        this._onrelease = {};
        this._onpress = {};
        this._crId = '';
        this.CSS_CLASS_FOR_HIDE_VISIBILITY = 'ch5-hide-vis';
        this.CSS_CLASS_FOR_HIDE_DISPLAY = 'ch5-hide-dis';
        this._cachedParentEl = null;
        this._cachedNextSibling = null;
        this._isDetachedFromDom = false;
        this._keepListeningOnSignalsAfterRemoval = false;
        this.elementIsInViewPort = true;
        this.elementIntersectionEntry = {};
        this.elementIsVisible = true;
        this._commonMutationObserver = {};
        this._subscribeAppendClassWhenInViewPort = false;
        this.componentProperties = [];
        this._crId = Ch5Uid.getUid();
        const debugAttribute = this.hasAttribute("debug") ? this.util.toBoolean(this.getAttribute("debug"), true) : false;
        const traceAttribute = this.hasAttribute("trace") ? this.util.toBoolean(this.getAttribute("trace"), true) : false;
        this.logger = new Ch5BaseLog(this.COMPONENT_NAME, debugAttribute, traceAttribute, this._crId);
        this.componentProperties = componentInputProperties;
        _a.selectedComponentProperties = componentInputProperties;
        this._ch5Properties = new Ch5Properties(this, this.componentProperties);
    }
    resolveTemplateChildren(template) {
        if (!template) {
            return;
        }
        if (this.util.isNotNil(template.content) && template.content.childElementCount === 0 && template.children.length > 0) {
            Array.from(template.children).forEach((child) => {
                template.content.appendChild(child);
            });
        }
    }
    static get selectedComponentProperties() {
        return this.COMPONENT_PROPERTIES;
    }
    static set selectedComponentProperties(value) {
        this.COMPONENT_PROPERTIES = value;
    }
    static get observedAttributes() {
        const inheritedObsAttrs = this.selectedComponentProperties;
        const newObsAttrs = [];
        for (let i = 0; i < inheritedObsAttrs.length; i++) {
            if (inheritedObsAttrs[i].isObservableProperty === true) {
                newObsAttrs.push(inheritedObsAttrs[i].name.toLowerCase());
            }
        }
        return newObsAttrs;
    }
    getCrId() {
        return this._crId;
    }
    static getCommonProperty(name) {
        return JSON.parse(JSON.stringify(_a.BASE_COMPONENT_PROPERTIES.find((data) => data.name === name)));
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.log('attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        if (oldValue !== newValue) {
            const attributeChangedProperty = this.componentProperties.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
            if (attributeChangedProperty) {
                const thisRef = this;
                const key = attributeChangedProperty.name;
                thisRef[key] = newValue;
            }
        }
        this.logger.stop();
    }
    connectedCallback() {
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    cacheComponentChildrens() {
        this.childrenOfCurrentNode = Array.from(this.children).filter((element) => {
            return element.isConnected;
        });
    }
    repaint() {
        try {
            const parentNode = this.parentNode;
            this._isInstantiated = false;
            if (this.hasChildNodes() === true) {
                for (let i = this.childNodes.length; i--;) {
                    let validToRemove = true;
                    if (this.childrenOfCurrentNode && this.childrenOfCurrentNode.length > 0) {
                        Array.from(this.childrenOfCurrentNode).filter((element) => {
                            if (element !== null && Object.is(element, this.childNodes[i])) {
                                validToRemove = false;
                            }
                        });
                    }
                    if (validToRemove === true) {
                        this.removeChild(this.childNodes[i]);
                    }
                }
                const _shortLifeElement = document.createElement('div');
                if (parentNode !== null) {
                    parentNode.insertBefore(_shortLifeElement, this.nextSibling);
                    this.remove();
                    _shortLifeElement.parentNode.insertBefore(this, _shortLifeElement.nextSibling);
                    _shortLifeElement.remove();
                }
            }
        }
        catch (e) {
            console.log('Error encountered during repaint ' + ' crId: ' + this.getCrId() + ' error ', e);
        }
    }
    updateCssClasses() {
        this.logger.log("from common - updateCssClasses()");
    }
    updateForChangeInCustomCssClass(_prevAddedCustomClasses) {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.start("updateForChangeInCustomCssClass()");
        this.logger.log("updateForChangeInCustomCssClass(): _prevAddedCustomClasses - ", _prevAddedCustomClasses);
        this.logger.log("from common - updateForChangeInCustomCssClass()", this.customClass);
        _prevAddedCustomClasses.forEach((className) => {
            if ('' !== className) {
                targetElement.classList.remove(className);
            }
        });
        _prevAddedCustomClasses = [];
        this.customClass.split(' ').forEach((className) => {
            if ('' !== className) {
                _prevAddedCustomClasses.push(className);
                targetElement.classList.add(className);
            }
        });
        this.logger.stop();
    }
    updateForChangeInCustomStyle() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        targetElement.style.cssText = this.customStyle;
    }
    updateForChangeInShowStatus() {
        const targetElement = this;
        if (this.show === false) {
            this.handleHide(targetElement);
        }
        else {
            this.handleShow(targetElement);
        }
    }
    handleHide(targetElement) {
        var _b, _c;
        this.beforeHandlingHide();
        this.logger.log('handleHide');
        this.sendShowSignal(false);
        targetElement.classList.remove(this.CSS_CLASS_FOR_HIDE_DISPLAY);
        targetElement.classList.remove(this.CSS_CLASS_FOR_HIDE_VISIBILITY);
        switch (this.noshowType) {
            case 'visibility':
                targetElement.classList.add(this.CSS_CLASS_FOR_HIDE_VISIBILITY);
                break;
            case 'display':
                targetElement.classList.add(this.CSS_CLASS_FOR_HIDE_DISPLAY);
                break;
            case 'remove':
                if (((_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.tagName.toLowerCase()) === "ch5-modal-dialog" || ((_c = this.parentElement) === null || _c === void 0 ? void 0 : _c.tagName.toLowerCase()) === "ch5-overlay-panel") {
                    setTimeout(() => {
                        if (null !== this.parentElement && undefined !== this.parentElement) {
                            this._cachedParentEl = this.parentElement;
                            this.logger.log(' removes element from DOM due to change in show signal, cached parent element');
                            if (null !== this.nextElementSibling && undefined !== this.nextElementSibling) {
                                this._nextSiblingIndexInParentChildNodes = (Array.from(this.parentElement.childNodes)).findIndex(item => item === this.nextElementSibling);
                                this._cachedNextSibling = this.nextElementSibling;
                                this.logger.log(' cached sibling element');
                            }
                            this._keepListeningOnSignalsAfterRemoval = true;
                            this._isDetachedFromDom = true;
                            this.parentElement.removeChild(this);
                        }
                    });
                }
                else {
                    if (null !== this.parentElement && undefined !== this.parentElement) {
                        this._cachedParentEl = this.parentElement;
                        this.logger.log(' removes element from DOM due to change in show signal, cached parent element');
                        if (null !== this.nextElementSibling && undefined !== this.nextElementSibling) {
                            this._nextSiblingIndexInParentChildNodes = (Array.from(this.parentElement.childNodes)).findIndex(item => item === this.nextElementSibling);
                            this._cachedNextSibling = this.nextElementSibling;
                            this.logger.log(' cached sibling element');
                        }
                        this._keepListeningOnSignalsAfterRemoval = true;
                        this._isDetachedFromDom = true;
                        this.parentElement.removeChild(this);
                    }
                }
                break;
        }
        this.afterHandlingHide();
    }
    handleShow(targetElement) {
        this.beforeHandlingShow();
        this.logger.log('handleShow');
        targetElement.classList.remove(this.CSS_CLASS_FOR_HIDE_DISPLAY);
        targetElement.classList.remove(this.CSS_CLASS_FOR_HIDE_VISIBILITY);
        if (null !== this._cachedParentEl && typeof this._cachedParentEl !== 'undefined') {
            const cp = this._cachedParentEl;
            this._cachedParentEl = null;
            if (null !== this._cachedNextSibling
                && typeof this._cachedNextSibling !== 'undefined'
                && cp === this._cachedNextSibling.parentElement) {
                const cs = this._cachedNextSibling;
                this._cachedNextSibling = null;
                cp.insertBefore(this, cs);
                this.logger.log(' inserted element before cached sibling due to change in show signal');
                this._keepListeningOnSignalsAfterRemoval = false;
            }
            else {
                if (this._nextSiblingIndexInParentChildNodes) {
                    const cs = cp.childNodes[this._nextSiblingIndexInParentChildNodes];
                    cp.insertBefore(this, cs);
                }
                else {
                    cp.appendChild(this);
                }
                this.logger.log(' appended element to parent due to change in show signal');
                this._keepListeningOnSignalsAfterRemoval = false;
            }
            this._isDetachedFromDom = false;
        }
        this.sendShowSignal(true);
        this.afterHandlingShow();
    }
    beforeHandlingShow() {
        return;
    }
    afterHandlingShow() {
        return;
    }
    beforeHandlingHide() {
        return;
    }
    afterHandlingHide() {
        return;
    }
    updateForChangeInDisabledStatus() {
        this.logger.log("updateForChangeInDisabledStatus()");
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        targetElement.classList.remove(this.getCssClassDisabled());
        if (this.disabled === true) {
            targetElement.classList.add(this.getCssClassDisabled());
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this;
    }
    initAttributes() {
        const thisRef = this;
        for (let i = 0; i < this.componentProperties.length; i++) {
            if (this.componentProperties[i].isObservableProperty === true) {
                if (this.hasAttribute(this.componentProperties[i].name.toLowerCase())) {
                    const key = this.componentProperties[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    clearStringSignalSubscription(sigName, subscriptionKey) {
        let oldSig = null;
        if (sigName) {
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            oldSig = Ch5SignalFactory.getInstance().getStringSignal(subSigName);
        }
        if (null !== oldSig && '' !== subscriptionKey) {
            oldSig.unsubscribe(subscriptionKey);
        }
    }
    clearBooleanSignalSubscription(sigName, subscriptionKey) {
        let oldSig = null;
        if (sigName) {
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            oldSig = Ch5SignalFactory.getInstance().getBooleanSignal(subSigName);
        }
        if (null !== oldSig && '' !== subscriptionKey) {
            oldSig.unsubscribe(subscriptionKey);
        }
    }
    sendShowSignal(value) {
        if ('' !== this.sendEventOnShow) {
            const sig = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnShow);
            if (null !== sig) {
                sig.publish(value);
            }
        }
    }
    attributeChangeHandler(attr, oldValue, newValue) {
        let attributeValue = '';
        if (this.hasAttribute(attr)) {
            if (oldValue !== newValue) {
                attributeValue = newValue;
            }
            else {
                attributeValue = oldValue;
            }
        }
        return attributeValue;
    }
    applyPreConfiguredAttributes() {
        const preConfiguredAttributes = Ch5Config.getAttributesForElement(this);
        for (const attrName in preConfiguredAttributes) {
            if (preConfiguredAttributes.hasOwnProperty(attrName)) {
                if (!this.hasAttribute(attrName)) {
                    this.setAttribute(attrName, preConfiguredAttributes[attrName]);
                }
            }
        }
    }
    _attributeValueAsString(attrName) {
        let attributeValue = '';
        attrName = attrName.toLowerCase();
        if (this.hasAttribute(attrName)) {
            attributeValue = '' + this.getAttribute(attrName);
        }
        return attributeValue;
    }
    contentCleanUp() {
        if (this.children.length) {
            const children = Array.from(this.children);
            children.forEach(item => item.nodeName !== 'TEMPLATE' && item.remove());
        }
    }
    getCssClassDisabled() {
        return 'ch5-disabled';
    }
    unsubscribeFromSignals() {
        if (this._keepListeningOnSignalsAfterRemoval === false) {
        }
    }
    componentLoadedEvent(elementName, idValue) {
        publishEvent('object', elementName, { loaded: true, id: idValue });
    }
    updateInViewPortClass() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        if (this.elementIsInViewPort) {
            targetElement.classList.add(this.appendClassWhenInViewPort);
        }
        else {
            targetElement.classList.remove(this.appendClassWhenInViewPort);
        }
    }
    updateElementVisibility(visible) {
        this.elementIsVisible = visible;
    }
    initCommonMutationObserver(element) {
        this._commonMutationObserver = new Ch5MutationObserver(this);
        this._commonMutationObserver.isConnected = true;
        let target = element;
        while (Ch5MutationObserver.checkElementValidity(target)) {
            this._commonMutationObserver.observe(target);
            target = target.parentNode;
        }
    }
    disconnectCommonMutationObserver() {
        if (this.util.isNotNil(this._commonMutationObserver) && !isEmpty(this._commonMutationObserver)) {
            this._commonMutationObserver.disconnectObserver();
        }
    }
    convertAnalogValueBasedOnSignalResponse(input) {
        const MAX_ANALOG = 65535;
        const HALF_MAX_ANALOG = 32767;
        const MIN_ANALOG = -65535;
        const HALF_MIN_ANALOG = -32768;
        let outputValue = input;
        if (outputValue > HALF_MAX_ANALOG) {
            outputValue = outputValue > MAX_ANALOG ? MAX_ANALOG : outputValue;
            outputValue -= MAX_ANALOG + 1;
        }
        else if (outputValue < HALF_MIN_ANALOG) {
            outputValue = outputValue > MIN_ANALOG ? outputValue : MIN_ANALOG;
            outputValue += MAX_ANALOG + 1;
        }
        return outputValue;
    }
    static getSignalElementAttributeRegistryEntries(customComponentProperties) {
        const signalAttributeTypes = {};
        for (let i = 0; i < customComponentProperties.length; i++) {
            if (customComponentProperties[i].isSignal === true) {
                const inputObject = {};
                if (customComponentProperties[i].name.toLowerCase().startsWith("receivestate")) {
                    inputObject.direction = "state";
                }
                else if (customComponentProperties[i].name.toLowerCase().startsWith("sendevent")) {
                    inputObject.direction = "event";
                }
                inputObject.contractName = true;
                if (customComponentProperties[i].signalType === "string") {
                    inputObject.stringJoin = 1;
                }
                else if (customComponentProperties[i].signalType === "boolean") {
                    inputObject.booleanJoin = 1;
                }
                else if (customComponentProperties[i].signalType === "number") {
                    inputObject.numericJoin = 1;
                }
                signalAttributeTypes[customComponentProperties[i].name.toLowerCase()] = inputObject;
            }
        }
        return signalAttributeTypes;
    }
}
_a = Ch5BaseClass;
Ch5BaseClass.DIRECTION = ['ltr', 'rtl'];
Ch5BaseClass.NO_SHOW_TYPES = ['display', 'visibility', 'remove'];
Ch5BaseClass.ELEMENT_NAME = "Ch5BaseClass";
Ch5BaseClass.COMPONENT_PROPERTIES = [];
Ch5BaseClass.BASE_COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "appendClassWhenInViewPort",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "id",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "customClass",
        nameForSignal: "receiveStateCustomClass",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "customStyle",
        nameForSignal: "receiveStateCustomStyle",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: true,
        name: "disabled",
        nameForSignal: "receiveStateEnable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: _a.DIRECTION[0],
        name: "dir",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: _a.DIRECTION[0],
        isObservableProperty: true
    },
    {
        default: true,
        name: "show",
        nameForSignal: "receiveStateShow",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "debug",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: false,
        name: "trace",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: _a.NO_SHOW_TYPES[0],
        enumeratedValues: _a.NO_SHOW_TYPES,
        name: "noshowType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: _a.NO_SHOW_TYPES[0],
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateCustomClass",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateCustomStyle",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateEnable",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateShowPulse",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateHidePulse",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnShow",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: false,
        name: "swipeGestureEnabled",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
];
Ch5BaseClass.COMMON_PROPERTIES = {
    appendClassWhenInViewPort: _a.getCommonProperty("appendClassWhenInViewPort"),
    customClass: _a.getCommonProperty("customClass"),
    customStyle: _a.getCommonProperty("customStyle"),
    debug: _a.getCommonProperty("debug"),
    dir: _a.getCommonProperty("dir"),
    disabled: _a.getCommonProperty("disabled"),
    id: _a.getCommonProperty("id"),
    noshowType: _a.getCommonProperty("noshowType"),
    receiveStateCustomClass: _a.getCommonProperty("receiveStateCustomClass"),
    receiveStateCustomStyle: _a.getCommonProperty("receiveStateCustomStyle"),
    receiveStateEnable: _a.getCommonProperty("receiveStateEnable"),
    receiveStateShow: _a.getCommonProperty("receiveStateShow"),
    receiveStateShowPulse: _a.getCommonProperty("receiveStateShowPulse"),
    receiveStateHidePulse: _a.getCommonProperty("receiveStateHidePulse"),
    sendEventOnShow: _a.getCommonProperty("sendEventOnShow"),
    show: _a.getCommonProperty("show"),
    trace: _a.getCommonProperty("trace"),
    swipeGestureEnabled: _a.getCommonProperty('swipeGestureEnabled')
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJhc2UtY2xhc3MuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYmFzZS9jaDUtYmFzZS1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sS0FBSyxJQUFJLE1BQU0scUJBQXFCLENBQUM7QUF1QjVDLE1BQU0sT0FBZ0IsWUFBYSxTQUFRLFdBQVc7SUFtUXJELElBQVcseUJBQXlCLENBQUMsS0FBYTtRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUywyQkFBMkIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2hELHlCQUF5QixDQUFDLElBQUksRUFBRSxDQUFDLFlBQXFCLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQVcseUJBQXlCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFH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