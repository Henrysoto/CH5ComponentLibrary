import { Ch5Signal, Ch5SignalFactory, Ch5TranslationUtility, Ch5Uid, languageChangedSignalName, subscribeInViewPortChange, Ch5Platform, publishEvent } from '../ch5-core';
import { Subject } from 'rxjs';
import { Ch5Config } from './ch5-config';
import { Ch5MutationObserver } from './ch5-mutation-observer';
import { Ch5ImageUriModel } from "../ch5-image/ch5-image-uri-model";
import isEmpty from 'lodash/isEmpty';
import { Ch5CommonLog } from './ch5-common-log';
import _ from 'lodash';
;
export class Ch5Common extends HTMLElement {
    set ignoreAttributes(value) {
        this._ignoreAttributes = value.map((attrName) => attrName.toLowerCase());
    }
    get ignoreAttributes() {
        return this._ignoreAttributes;
    }
    set customClass(value) {
        this.logger.log('set customClass(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if (value !== this._customClass) {
            this._customClass = value;
            this.setAttribute('customclass', value);
        }
    }
    get customClass() {
        return this._customClass;
    }
    set customStyle(value) {
        this.logger.log('set customStyle(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if (value !== this._customStyle) {
            this._prevAddedStyle = this._customStyle;
            this._customStyle = value;
            this.setAttribute('customstyle', value);
        }
    }
    get customStyle() {
        return this._customStyle;
    }
    set show(value) {
        this.logger.log('set show(\'' + value + '\')');
        if (_.isNil(this.receiveStateShow) || this.receiveStateShow === "") {
            this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, value);
        }
    }
    get show() {
        return this._show;
    }
    set noshowType(value) {
        this.logger.log('set noshowType(\'' + value + '\')');
        value = this._checkAndSetStringValue(value, 'none');
        if (value !== this._noshowType) {
            if (this.showTypes.indexOf(value) > 0) {
                this._noshowType = value;
            }
            else {
                this._noshowType = this.showTypes[0];
            }
            this.setAttribute('noshowtype', this._noshowType);
        }
    }
    get noshowType() {
        return this._noshowType;
    }
    set disabled(value) {
        this.logger.log('set disabled(\'' + value + '\')');
        if (_.isNil(this.receiveStateEnable) || this.receiveStateEnable === "") {
            this.setAttributeAndProperty(this.COMMON_PROPERTIES.DISABLED, value);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set gestureable(value) {
        this.logger.log('set gestureable(\'' + value + '\')');
        const booleanValue = this.toBoolean(value);
        if (value !== this._gestureable) {
            this.observableGestureableProperty.next(booleanValue);
            this._gestureable = booleanValue;
            this.setAttribute('gestureable', booleanValue.toString());
        }
    }
    get gestureable() {
        return this._gestureable;
    }
    set swipeGestureEnabled(value) {
        this.logger.log('set swipeGestureEnabled(\'' + value + '\')');
        this.setAttributeAndProperty(this.COMMON_PROPERTIES.SWIPE_GESTURE_ENABLED, value);
    }
    get swipeGestureEnabled() {
        return this._swipeGestureEnabled;
    }
    set receiveStateCustomClass(value) {
        this.logger.log('set receiveStateCustomClass(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateCustomClass) {
            return;
        }
        this.customClass = "";
        this.clearStringSignalSubscription(this._receiveStateCustomClass, this._subKeySigReceiveCustomClass);
        this._receiveStateCustomClass = value;
        this.setAttribute('receivestatecustomclass', value);
        const recSigCustomClassName = Ch5Signal.getSubscriptionSignalName(this._receiveStateCustomClass);
        const recSig = Ch5SignalFactory.getInstance().getStringSignal(recSigCustomClassName);
        if (null === recSig) {
            return;
        }
        let hasSignalChanged = false;
        this._subKeySigReceiveCustomClass = recSig.subscribe((newVal) => {
            this.logger.log('subs callback for signalReceiveCustomClass: ', this._receiveStateCustomClass, ' Signal has value ', newVal);
            if ('' !== newVal) {
                hasSignalChanged = true;
            }
            if (newVal !== this.customClass && hasSignalChanged) {
                this.customClass = newVal;
            }
        });
    }
    get receiveStateCustomClass() {
        return this._attributeValueAsString('receivestatecustomclass');
    }
    set receiveStateCustomStyle(value) {
        this.logger.log('set receiveStateCustomStyle(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateCustomStyle) {
            return;
        }
        this.customStyle = "";
        this.clearStringSignalSubscription(this._receiveStateCustomStyle, this._subKeySigReceiveCustomStyle);
        this._receiveStateCustomStyle = value;
        this.setAttribute('receivestatecustomstyle', value);
        const recSigCustomStyleName = Ch5Signal.getSubscriptionSignalName(this._receiveStateCustomStyle);
        const recSig = Ch5SignalFactory.getInstance().getStringSignal(recSigCustomStyleName);
        if (null === recSig) {
            return;
        }
        let hasSignalChanged = false;
        this._subKeySigReceiveCustomStyle = recSig.subscribe((newVal) => {
            this.logger.log(' subs callback for signalReceiveCustomStyle: ', this._subKeySigReceiveCustomStyle, ' Signal has value ', newVal);
            if ('' !== newVal) {
                hasSignalChanged = true;
            }
            if (newVal !== this.customStyle && hasSignalChanged) {
                this.setAttribute('customStyle', newVal);
            }
        });
    }
    get receiveStateCustomStyle() {
        return this._attributeValueAsString('receivestatecustomstyle');
    }
    set receiveStateEnable(value) {
        this.logger.log('set receiveStateEnable(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateEnable) {
            return;
        }
        this.clearBooleanSignalSubscription(this._receiveStateEnable, this._subKeySigReceiveEnable);
        this._receiveStateEnable = value;
        this.setAttribute('receivestateenable', value);
        const recSigEnableName = Ch5Signal.getSubscriptionSignalName(this._receiveStateEnable);
        const recSig = Ch5SignalFactory.getInstance().getBooleanSignal(recSigEnableName);
        if (null === recSig) {
            return;
        }
        this._subKeySigReceiveEnable = recSig.subscribe((newValue) => {
            this.logger.log(' subs callback for signalReceiveEnable: ', this._subKeySigReceiveEnable, ' Signal has value ', newValue);
            if ((!this.disabled) !== newValue) {
                this.setAttributeAndProperty(this.COMMON_PROPERTIES.DISABLED, !newValue, true);
            }
        });
    }
    get receiveStateEnable() {
        return this._attributeValueAsString('receivestateenable');
    }
    set receiveStateHidePulse(value) {
        this.logger.log('set receiveStateHidePulse(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateHidePulse) {
            return;
        }
        this.clearBooleanSignalSubscription(this._receiveStateHidePulse, this._subKeySigReceiveHidePulse);
        this._receiveStateHidePulse = value;
        this.setAttribute('receivestatehidepulse', value);
        const recSigHidePulseName = Ch5Signal.getSubscriptionSignalName(this._receiveStateHidePulse);
        const recSig = Ch5SignalFactory.getInstance().getBooleanSignal(recSigHidePulseName);
        if (null === recSig) {
            return;
        }
        this._subKeySigReceiveHidePulse = recSig.subscribe((newVal) => {
            this.logger.log(' subs callback for signalReceiveHidePulse: ', this._subKeySigReceiveHidePulse, ' Signal has value ', newVal);
            if (null !== recSig) {
                if (false === recSig.prevValue && true === newVal) {
                    this.setAttribute('show', 'false');
                }
            }
            else {
                this.logger.log(' subs callback for signalReceiveHidePulse: ', this._subKeySigReceiveHidePulse, ' recSig is null');
            }
        });
    }
    get receiveStateHidePulse() {
        return this._attributeValueAsString('receivestatehidepulse');
    }
    set receiveStateShowPulse(value) {
        this.logger.log('set receiveStateShowPulse(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateShowPulse) {
            return;
        }
        this.clearBooleanSignalSubscription(this._receiveStateShowPulse, this._subKeySigReceiveShowPulse);
        this._receiveStateShowPulse = value;
        this.setAttribute('receivestateshowpulse', value);
        const recSigShowPulseName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowPulse);
        const recSig = Ch5SignalFactory.getInstance().getBooleanSignal(recSigShowPulseName);
        if (null === recSig) {
            return;
        }
        this._subKeySigReceiveShowPulse = recSig.subscribe((newVal) => {
            this.logger.log(' subs callback for signalReceiveShowPulse: ', this._subKeySigReceiveShowPulse, ' Signal has value ', newVal);
            if (null !== recSig) {
                const _newVal = newVal.repeatdigital !== undefined ? newVal.repeatdigital : newVal;
                if (recSig.prevValue.repeatdigital !== undefined) {
                    if (false === recSig.prevValue.repeatdigital && true === _newVal) {
                        this.setAttribute('show', 'true');
                    }
                    return;
                }
                if (false === recSig.prevValue && true === _newVal) {
                    this.setAttribute('show', 'true');
                }
            }
        });
    }
    get receiveStateShowPulse() {
        return this._attributeValueAsString('receivestateshowpulse');
    }
    set receiveStateShow(value) {
        this.logger.log('set receiveStateShow(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateShow) {
            return;
        }
        this.clearBooleanSignalSubscription(this._receiveStateShow, this._subKeySigReceiveShow);
        this._receiveStateShow = value;
        this.setAttribute('receivestateshow', value);
        const recSigShowName = Ch5Signal.getSubscriptionSignalName(this._receiveStateShow);
        const recSig = Ch5SignalFactory.getInstance().getBooleanSignal(recSigShowName);
        if (null === recSig) {
            this.logger.log('recSig for signalReceiveShow is null');
            return;
        }
        this._subKeySigReceiveShow = recSig.subscribe((newValue) => {
            this.logger.log('subs callback for signalReceiveShow: ', this._subKeySigReceiveShow, ' Signal has value ', newValue, ' this.show', this.show);
            if (newValue !== this.show) {
                this.setAttributeAndProperty(this.COMMON_PROPERTIES.SHOW, newValue, true);
            }
        });
    }
    get receiveStateShow() {
        return this._attributeValueAsString('receivestateshow');
    }
    set sendEventOnShow(value) {
        this.sigNameSendOnShow = value;
    }
    get sendEventOnShow() {
        return this.sigNameSendOnShow;
    }
    set sigNameSendOnShow(value) {
        this.logger.log('set sigNameSendOnShow(\'' + value + '\')');
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._sigNameSendOnShow) {
            return;
        }
        this._sigNameSendOnShow = value;
        this.setAttribute('sendeventonshow', value);
        this._sigSendOnShow = Ch5SignalFactory.getInstance().getBooleanSignal(this._sigNameSendOnShow);
    }
    get sigNameSendOnShow() {
        return this._sigNameSendOnShow;
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
    set appendClassWhenInViewPort(value) {
        if (value !== this._appendClassWhenInViewPort) {
            this._appendClassWhenInViewPort = value;
            this.setAttribute('appendClassWhenInViewPort', value.toString());
        }
    }
    get appendClassWhenInViewPort() {
        return this._appendClassWhenInViewPort;
    }
    constructor() {
        super();
        this.COMMON_PROPERTIES = {
            SWIPE_GESTURE_ENABLED: {
                default: false,
                valueOnAttributeEmpty: true,
                variableName: "_swipeGestureEnabled",
                attributeName: "swipeGestureEnabled",
                propertyName: "swipeGestureEnabled",
                type: "boolean",
                removeAttributeOnNull: true,
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this,
                callback: this.updateSwipeGesture.bind(this)
            },
            SHOW: {
                default: true,
                valueOnAttributeEmpty: true,
                variableName: "_show",
                attributeName: "show",
                propertyName: "show",
                type: "boolean",
                removeAttributeOnNull: true,
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this,
                callback: this.updateForChangeInShowStatus.bind(this)
            },
            DISABLED: {
                default: false,
                valueOnAttributeEmpty: true,
                variableName: "_disabled",
                attributeName: "disabled",
                propertyName: "disabled",
                type: "boolean",
                removeAttributeOnNull: true,
                enumeratedValues: ['true', 'false', '', true, false],
                componentReference: this,
                callback: this.updateForChangeInDisabledStatus.bind(this)
            }
        };
        this.showTypes = ['display', 'visibility', 'remove'];
        this._ignoreAttributes = [];
        this.primaryCssClass = 'ch5-common';
        this.currentLanguage = '';
        this.translatableObjects = {};
        this.childrenOfCurrentNode = null;
        this._customClass = '';
        this._prevAddedCustomClasses = [];
        this._customStyle = '';
        this._prevAddedStyle = '';
        this._show = true;
        this._noshowType = 'display';
        this._disabled = false;
        this._gestureable = false;
        this._swipeGestureEnabled = false;
        this._receiveStateCustomClass = '';
        this._subKeySigReceiveCustomClass = '';
        this._receiveStateCustomStyle = '';
        this._subKeySigReceiveCustomStyle = '';
        this._receiveStateShow = '';
        this._subKeySigReceiveShow = '';
        this._receiveStateShowPulse = '';
        this._subKeySigReceiveShowPulse = '';
        this._receiveStateHidePulse = '';
        this._nextSiblingIndexInParentChildNodes = 0;
        this._subKeySigReceiveHidePulse = '';
        this._receiveStateEnable = '';
        this._subKeySigReceiveEnable = '';
        this._sigNameSendOnShow = '';
        this._sigSendOnShow = null;
        this._onrelease = {};
        this._onpress = {};
        this._isDebugEnabled = false;
        this._isTraceEnabled = false;
        this._listOfAllPossibleComponentCssClasses = [];
        this._crId = '';
        this._cssClassHideVisibility = 'ch5-hide-vis';
        this._cssClassHideDisplay = 'ch5-hide-dis';
        this._cachedParentEl = null;
        this._cachedNextSibling = null;
        this._isDetachedFromDom = false;
        this._keepListeningOnSignalsAfterRemoval = false;
        this._wasInstatiated = false;
        this.wasInstantiatedInViewport = false;
        this._appendClassWhenInViewPort = '';
        this.elementIsInViewPort = true;
        this.elementIntersectionEntry = {};
        this.elementIsVisible = true;
        this._commonMutationObserver = {};
        this.debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    window.clearTimeout(timeout);
                    func(...args);
                };
                window.clearTimeout(timeout);
                timeout = window.setTimeout(later, wait);
            };
        };
        this._crId = Ch5Uid.getUid();
        this.logger = new Ch5CommonLog(false, false, this._crId, this.id);
        const cssClasses = [];
        cssClasses.push(this.primaryCssClass + '--disabled');
        this._listOfAllPossibleComponentCssClasses = cssClasses;
        this.observableGestureableProperty = new Subject();
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(languageChangedSignalName);
        if (receiveSignal === null) {
            return;
        }
        receiveSignal.subscribe((newValue) => {
            if (newValue !== '' && newValue !== this.currentLanguage) {
                this.currentLanguage = newValue;
                Object.keys(this.translatableObjects).forEach((propertyToTranslate) => {
                    let propertyReference = this;
                    if (propertyReference[propertyToTranslate] === undefined && propertyReference['attrModel'] !== undefined) {
                        propertyReference = propertyReference['attrModel'];
                    }
                    if (propertyReference[propertyToTranslate.toString()] !== undefined && this.translatableObjects[propertyToTranslate.toString()] !== undefined) {
                        propertyReference[propertyToTranslate.toString()] = this.translatableObjects[propertyToTranslate];
                        this.translateCallback(propertyToTranslate.toString());
                    }
                });
            }
        });
    }
    static getMeasurementUnitFromSizeValue(sizeValue) {
        const pattern = new RegExp("^(?:[0-9]+)(\\w*|%)$");
        let measurementUnit = 'px';
        if (!_.isNil(sizeValue)) {
            const matchedValues = sizeValue.match(pattern);
            if (matchedValues !== null) {
                if (Ch5Common.isNotNil(matchedValues[1])) {
                    measurementUnit = matchedValues[1];
                }
            }
        }
        return measurementUnit;
    }
    static extractMeasurementNumber(sizeValue) {
        const pattern = new RegExp("^-?\\d+\\.?\\d*");
        let n = 0;
        if (sizeValue !== null && sizeValue !== undefined) {
            const matchedValues = sizeValue.match(pattern);
            if (matchedValues !== null && matchedValues[0] !== undefined) {
                n = Number(matchedValues[0]);
            }
        }
        return n;
    }
    static getMeasurementPxNumber(sizeValue) {
        const actualUnit = Ch5Common.getMeasurementUnitFromSizeValue(sizeValue);
        return actualUnit !== 'px'
            ? Ch5Common.convertAltUnitsToPx(sizeValue)
            : Math.round(Ch5Common.extractMeasurementNumber(sizeValue));
    }
    static convertAltUnitsToPx(sizeValue) {
        const measurementUnit = Ch5Common.getMeasurementUnitFromSizeValue(sizeValue);
        const size = parseFloat(sizeValue);
        let _size = size;
        switch (measurementUnit) {
            case 'vh':
                _size = Ch5Common.convertVhUnitsToPx(size);
                break;
            case 'vw':
                _size = Ch5Common.convertVwUnitsToPx(size);
                break;
        }
        return Math.round(_size);
    }
    static convertPxUnitToAlt(px, measurementUnit) {
        let altValue = px;
        switch (measurementUnit) {
            case 'vw':
                altValue = Ch5Common.convertPxUnitToVw(px);
                break;
            case 'vh':
                altValue = Ch5Common.convertPxUnitToVh(px);
                break;
        }
        return Math.ceil(altValue);
    }
    static convertVhUnitsToPx(vh) {
        const height = window.innerHeight || document.documentElement.clientHeight;
        return (vh * height) / 100;
    }
    static convertVwUnitsToPx(vw) {
        const width = window.innerWidth || document.documentElement.clientWidth;
        return (vw * width) / 100;
    }
    static convertPxUnitToVh(px) {
        const height = window.innerHeight || document.documentElement.clientHeight;
        return (px / height) * 100;
    }
    static convertPxUnitToVw(px) {
        const width = window.innerWidth || document.documentElement.clientWidth;
        return (px / width) * 100;
    }
    static handlingTextTransformValue(value, textTransform) {
        let processedValue = value;
        if (value === undefined || value === null) {
            return '';
        }
        switch (textTransform) {
            case 'capitalize':
                processedValue = processedValue.replace(/\b\w/g, (firstLetterOfWord) => firstLetterOfWord.toUpperCase());
                break;
            case 'uppercase':
                processedValue = processedValue.toUpperCase();
                break;
            case 'lowercase':
                processedValue = processedValue.toLowerCase();
                break;
            default:
                break;
        }
        return processedValue;
    }
    static processUri(processUriParams) {
        let uriStr = "";
        const platformInfo = Ch5Platform.getInstance();
        platformInfo.registerUpdateCallback((info) => {
            if (processUriParams.protocol) {
                return;
            }
            const { http, https } = info.capabilities.supportCredentialIntercept;
            const protocols = { http, https };
            if (!http && !https) {
                return;
            }
            processUriParams.protocol = https ? https : http;
            const uri = new Ch5ImageUriModel(protocols, processUriParams.user, processUriParams.password, processUriParams.url);
            if (!uri.isValidAuthenticationUri()) {
                return;
            }
            uriStr = uri.toString();
        });
        return uriStr;
    }
    static isNil(value, validateWithTrim = true) {
        if (validateWithTrim === true) {
            return _.isNil(value) || (value === "") || value.toString().trim() === "";
        }
        else {
            return _.isNil(value) || (value === "");
        }
    }
    static isNotNil(value, validateWithTrim = true) {
        return !Ch5Common.isNil(value, validateWithTrim);
    }
    _t(valueToTranslate) {
        let translatedValue = valueToTranslate;
        const translationUtility = Ch5TranslationUtility.getInstance();
        const identifiedValues = translationUtility.valuesToTranslation(valueToTranslate);
        if (identifiedValues && identifiedValues.length > 0) {
            identifiedValues.forEach(identifier => {
                const isTranslatable = translationUtility.isTranslationIdentifier(identifier);
                if (isTranslatable) {
                    const characters = translationUtility.stripDownTranslationCharacters(identifier);
                    const existTranslation = translationUtility.getTranslator().exists(characters);
                    if (existTranslation) {
                        const identifierTranslated = translationUtility.getTranslator().t(characters);
                        translatedValue = translatedValue.replace(identifier, identifierTranslated);
                    }
                }
            });
        }
        return translatedValue;
    }
    resolveTemplateChildren(template) {
        if (!template) {
            return;
        }
        if (!Ch5Common.isNil(template.content) && template.content.childElementCount === 0 && template.children.length > 0) {
            Array.from(template.children).forEach((child) => {
                template.content.appendChild(child);
            });
        }
    }
    _getTranslatedValue(valueToSave, valueToTranslate) {
        const translationUtility = Ch5TranslationUtility.getInstance();
        let translationKey = valueToTranslate;
        ;
        let _value = valueToTranslate;
        let savedValue = this.translatableObjects[valueToSave];
        if (savedValue === valueToTranslate) {
            translationKey = savedValue;
        }
        const isTranslatableValue = translationUtility.isTranslationIdentifier(translationKey);
        if (!isTranslatableValue) {
            return valueToTranslate;
        }
        if (typeof savedValue === 'undefined') {
            savedValue = valueToTranslate;
            _value = this._t(valueToTranslate);
        }
        else {
            const isTranslatableLabel = translationUtility.isTranslationIdentifier(savedValue);
            if (!isTranslatableLabel) {
                if (savedValue !== valueToTranslate) {
                    savedValue = valueToTranslate;
                }
                _value = this._t(valueToTranslate);
            }
            else {
                if (this._t(savedValue) !== valueToTranslate && translationUtility.hasMultipleIdentifiers(savedValue)) {
                    savedValue = valueToTranslate;
                }
                _value = this._t(savedValue);
            }
        }
        this.translatableObjects[valueToSave] = savedValue;
        return _value;
    }
    static get observedAttributes() {
        return [
            'customclass',
            'customstyle',
            'show',
            'noshowtype',
            'disabled',
            'gestureable',
            'swipegestureenabled',
            'receivestatecustomclass',
            'receivestatecustomstyle',
            'receivestateshow',
            'receivestateshowpulse',
            'receivestatehidepulse',
            'receivestateenable',
            'sendeventonshow',
            'debug',
            'trace',
            'dir',
            'appendclasswheninviewport'
        ];
    }
    getCrId() {
        return this._crId;
    }
    info(message, ...optionalParams) {
        this.logger.info(message, optionalParams);
    }
    error(message, ...optionalParams) {
        this.logger.error(message, optionalParams);
    }
    isDebug() {
        return this._isDebugEnabled;
    }
    isTrace() {
        return this._isTraceEnabled;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue || this.ignoreAttributes.includes(attr.toLowerCase())) {
            return;
        }
        this.logger.log('ch5-common attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
        switch (attr) {
            case 'customclass':
                this.logger.log("CustomClass Set in Common");
                if (this.hasAttribute('customclass')) {
                    this.customClass = this.getAttribute('customclass');
                }
                else {
                    this.customClass = '';
                }
                this.updateForChangeInCustomCssClass();
                break;
            case 'customstyle':
                if (this.hasAttribute('customstyle')) {
                    this.customStyle = this.getAttribute('customstyle');
                }
                else {
                    this.customStyle = '';
                }
                this.updateForChangeInStyleCss();
                break;
            case 'show':
                this.show = newValue;
                break;
            case 'swipegestureenabled':
                this.swipeGestureEnabled = newValue;
                break;
            case 'noshowtype':
                this.updateForChangeInShowStatus();
                break;
            case 'receivestatecustomclass':
                if (this.hasAttribute('receivestatecustomclass')) {
                    this.receiveStateCustomClass = this.getAttribute('receivestatecustomclass');
                }
                else {
                    this.clearStringSignalSubscription(this._receiveStateCustomClass, this._subKeySigReceiveCustomClass);
                    this._receiveStateCustomClass = '';
                }
                break;
            case 'receivestatecustomstyle':
                if (this.hasAttribute('receivestatecustomstyle')) {
                    this.receiveStateCustomStyle = this.getAttribute('receivestatecustomstyle');
                }
                else {
                    this.clearStringSignalSubscription(this._receiveStateCustomStyle, this._subKeySigReceiveCustomStyle);
                    this._receiveStateCustomStyle = '';
                }
                break;
            case 'receivestateshow':
                if (this.hasAttribute('receivestateshow')) {
                    this.receiveStateShow = this.getAttribute('receivestateshow');
                }
                else {
                    this.clearBooleanSignalSubscription(this._receiveStateShow, this._subKeySigReceiveShow);
                    this._sigNameSendOnShow = '';
                }
                break;
            case 'receivestateshowpulse':
                if (this.hasAttribute('receivestateshowpulse')) {
                    this.receiveStateShowPulse = this.getAttribute('receivestateshowpulse');
                }
                else {
                    this.clearBooleanSignalSubscription(this._receiveStateShowPulse, this._subKeySigReceiveShowPulse);
                    this._receiveStateShowPulse = '';
                }
                break;
            case 'receivestatehidepulse':
                if (this.hasAttribute('receivestatehidepulse')) {
                    this.receiveStateHidePulse = this.getAttribute('receivestatehidepulse');
                }
                else {
                    this.clearBooleanSignalSubscription(this._receiveStateHidePulse, this._subKeySigReceiveHidePulse);
                    this._receiveStateHidePulse = '';
                }
                break;
            case 'receivestateenable':
                if (this.hasAttribute('receivestateenable')) {
                    this.receiveStateEnable = this.getAttribute('receivestateenable');
                }
                else {
                    this.clearBooleanSignalSubscription(this._receiveStateEnable, this._subKeySigReceiveEnable);
                    this._receiveStateEnable = '';
                }
                break;
            case 'sendeventonshow':
                if (this.hasAttribute('sendeventonshow')) {
                    this.sigNameSendOnShow = this.getAttribute('sendeventonshow');
                }
                else {
                    this._sigSendOnShow = null;
                    this._sigNameSendOnShow = '';
                }
                break;
            case 'disabled':
                if (!this.hasAttribute('customclassdisabled')) {
                    this.disabled = newValue;
                }
                break;
            case 'gestureable':
                if (this.hasAttribute('gestureable')) {
                    this.gestureable = this.toBoolean(newValue);
                }
                else {
                    this.gestureable = false;
                }
                break;
            case 'debug':
                if (this.hasAttribute('debug')) {
                    this._isDebugEnabled = true;
                }
                else {
                    this._isDebugEnabled = false;
                }
                this.logger.isDebugEnabled = this._isDebugEnabled;
                break;
            case 'trace':
                let _isTraceEnabled = false;
                if (this.hasAttribute('trace')) {
                    _isTraceEnabled = true;
                }
                else {
                    _isTraceEnabled = false;
                }
                this.logger.isTraceEnabled = _isTraceEnabled;
                break;
            case 'dir':
                const newDir = this.getAttribute('dir') || '';
                if (newDir !== this.dir) {
                    this.dir = newDir;
                }
                break;
            case 'appendclasswheninviewport':
                if (this.hasAttribute('appendclasswheninviewport')) {
                    this.appendClassWhenInViewPort = this.getAttribute('appendClassWhenInViewPort');
                }
                break;
            default:
                break;
        }
    }
    cacheComponentChildrens() {
        this.childrenOfCurrentNode = Array.from(this.children).filter((element) => {
            return element.isConnected;
        });
    }
    repaint() {
        try {
            const parentNode = this.parentNode;
            this._wasInstatiated = false;
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
    updateForChangeInCustomCssClass() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.start("updateForChangeInCustomCssClass()");
        this.logger.log("updateForChangeInCustomCssClass()", this._prevAddedCustomClasses);
        this.logger.log("from common - updateForChangeInCustomCssClass()", this.customClass);
        this._prevAddedCustomClasses.forEach((className) => {
            if ('' !== className) {
                targetElement.classList.remove(className);
            }
        });
        this._prevAddedCustomClasses = [];
        this.customClass.split(' ').forEach((className) => {
            if ('' !== className) {
                this._prevAddedCustomClasses.push(className);
                targetElement.classList.add(className);
            }
        });
        this.logger.stop();
    }
    updateForChangeInStyleCss() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.log("from common - updateForChangeInStyleCss()");
        targetElement.style.cssText = this.customStyle;
    }
    updateForChangeInShowStatusOld() {
        const targetElement = this;
        this.logger.log("from common - updateForChangeInShowStatus()");
        if (false === this._show) {
            this.handleHide(targetElement);
        }
        else {
            this.handleShow(targetElement);
        }
    }
    updateSwipeGesture() {
        return;
    }
    updateForChangeInShowStatus() {
        const targetElement = this;
        this.logger.log("from common - updateForChangeInShowStatus()");
        if (this.hasAttribute('noshowtype')) {
            this.noshowType = this.getAttribute('noshowtype');
        }
        else {
            this.noshowType = 'display';
        }
        if (false === this._show) {
            this.handleHide(targetElement);
        }
        else {
            this.handleShow(targetElement);
        }
    }
    handleHide(targetElement) {
        var _a, _b;
        this.beforeHandlingHide();
        this.logger.log('handleHide');
        this.sendShowSignal(false);
        switch (this._noshowType) {
            case 'visibility':
                targetElement.classList.add(this._cssClassHideVisibility);
                targetElement.classList.remove(this._cssClassHideDisplay);
                break;
            case 'display':
                targetElement.classList.add(this._cssClassHideDisplay);
                targetElement.classList.remove(this._cssClassHideVisibility);
                break;
            case 'remove':
                targetElement.classList.remove(this._cssClassHideDisplay);
                targetElement.classList.remove(this._cssClassHideVisibility);
                if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === "ch5-modal-dialog" || ((_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.tagName.toLowerCase()) === "ch5-overlay-panel") {
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
        targetElement.classList.remove(this._cssClassHideDisplay);
        targetElement.classList.remove(this._cssClassHideVisibility);
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
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.log("from common - updateForChangeInDisabledStatus()");
        if (this._disabled === true) {
            targetElement.classList.add(this.getCssClassDisabled());
        }
        else {
            targetElement.classList.remove(this.getCssClassDisabled());
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this;
    }
    initAttributes() {
        this.applyPreConfiguredAttributes();
        if (this.hasAttribute('disabled') && !this.hasAttribute('customclassdisabled') && this.ignoreAttributes.includes('disabled') === false) {
            this.disabled = this.getAttribute('disabled');
        }
        if (this.hasAttribute('debug') && this.ignoreAttributes.includes('debug') === false) {
            this._isDebugEnabled = true;
        }
        if (this.hasAttribute('show') && this.ignoreAttributes.includes('show') === false) {
            this.show = this.getAttribute('show');
        }
        if (this.hasAttribute('swipegestureenabled') && this.ignoreAttributes.includes('swipegestureenabled') === false) {
            this.swipeGestureEnabled = this.getAttribute('swipegestureenabled');
        }
        if (this.hasAttribute('customclass') && this.ignoreAttributes.includes('customclass') === false) {
            this.customClass = this.getAttribute('customclass');
            this.updateForChangeInCustomCssClass();
        }
        if (this.hasAttribute('customstyle') && this.ignoreAttributes.includes('customstyle') === false) {
            this.customStyle = this.getAttribute('customstyle');
            this.updateForChangeInStyleCss();
        }
        if (this.hasAttribute('noshowtype') && this.ignoreAttributes.includes('noshowtype') === false) {
            this.noshowType = this.getAttribute('noshowtype');
        }
        if (this.hasAttribute('receivestatecustomclass') && this.ignoreAttributes.includes('receivestatecustomclass') === false) {
            this.receiveStateCustomClass = this.getAttribute('receivestatecustomclass');
        }
        if (this.hasAttribute('receivestatecustomstyle') && this.ignoreAttributes.includes('receivestatecustomstyle') === false) {
            this.receiveStateCustomStyle = this.getAttribute('receivestatecustomstyle');
        }
        if (this.hasAttribute('receivestateshow') && this.ignoreAttributes.includes('receivestateshow') === false) {
            this.receiveStateShow = this.getAttribute('receivestateshow');
        }
        if (this.hasAttribute('receivestateshowpulse') && this.ignoreAttributes.includes('receivestateshowpulse') === false) {
            this.receiveStateShowPulse = this.getAttribute('receivestateshowpulse');
        }
        if (this.hasAttribute('receivestatehidepulse') && this.ignoreAttributes.includes('receivestatehidepulse') === false) {
            this.receiveStateHidePulse = this.getAttribute('receivestatehidepulse');
        }
        if (this.hasAttribute('receivestateenable') && this.ignoreAttributes.includes('receivestateenable') === false) {
            this.receiveStateEnable = this.getAttribute('receivestateenable');
        }
        if (this.hasAttribute('sendeventonshow') && this.ignoreAttributes.includes('sendeventonshow') === false) {
            this.sigNameSendOnShow = this.getAttribute('sendeventonshow');
        }
        if (this.hasAttribute('gestureable') && this.ignoreAttributes.includes('gestureable') === false) {
            this.gestureable = this.toBoolean(this.getAttribute('gestureable'));
        }
        this.dir = this.getAttribute('dir') || Ch5Common.DIRECTION[0];
        if (this.hasAttribute('appendclasswheninviewport') && this.ignoreAttributes.includes('appendclasswheninviewport') === false) {
            this.appendClassWhenInViewPort = this.getAttribute('appendclasswheninviewport');
            subscribeInViewPortChange(this, (isInViewPort) => {
                this.updateElementVisibility(isInViewPort);
                this.updateInViewPortClass();
            });
        }
    }
    attachEventListeners() {
    }
    removeEventListeners() {
    }
    _checkAndSetStringValue(value, defaultValue = '') {
        if (Ch5Common.isNil(value)) {
            value = defaultValue;
        }
        return value;
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
    clearNumberSignalSubscription(sigName, subscriptionKey) {
        let oldSig = null;
        if (Ch5Common.isNotNil(sigName)) {
            const subSigName = Ch5Signal.getSubscriptionSignalName(sigName);
            oldSig = Ch5SignalFactory.getInstance().getNumberSignal(subSigName);
        }
        if (null !== oldSig && '' !== subscriptionKey) {
            oldSig.unsubscribe(subscriptionKey);
        }
    }
    sendShowSignal(value) {
        this.logger.log('sendShowSignal ' + value + ' ' + this._sigNameSendOnShow);
        if ('' !== this._sigNameSendOnShow) {
            const sig = Ch5SignalFactory.getInstance().getBooleanSignal(this._sigNameSendOnShow);
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
        if (false === this._keepListeningOnSignalsAfterRemoval) {
            this.clearBooleanSignalSubscription(this._receiveStateEnable, this._subKeySigReceiveEnable);
            this._receiveStateEnable = '';
            this.clearBooleanSignalSubscription(this._receiveStateShow, this._subKeySigReceiveShow);
            this._receiveStateShow = '';
            this.clearBooleanSignalSubscription(this._receiveStateShowPulse, this._subKeySigReceiveShowPulse);
            this._receiveStateShowPulse = '';
            this.clearBooleanSignalSubscription(this._receiveStateHidePulse, this._subKeySigReceiveHidePulse);
            this._receiveStateHidePulse = '';
            this.clearStringSignalSubscription(this._receiveStateCustomStyle, this._subKeySigReceiveCustomStyle);
            this._receiveStateCustomStyle = '';
            this.clearStringSignalSubscription(this._receiveStateCustomClass, this._subKeySigReceiveCustomClass);
            this._receiveStateCustomClass = '';
        }
    }
    toBoolean(val, isEmptyValueEqualToTrue = false) {
        const str = String(val).toLowerCase().trim();
        switch (str) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
                return false;
            case "":
            case null:
            case undefined:
            case "null":
            case "undefined":
                if (isEmptyValueEqualToTrue === true) {
                    return true;
                }
                else {
                    return false;
                }
            default:
                return false;
        }
    }
    translateCallback(section) {
    }
    componentLoadedEvent(elementName, idValue) {
        publishEvent('object', elementName, { loaded: true, id: idValue });
    }
    updateInViewPortClass() {
        const targetElement = this.getTargetElementForCssClassesAndStyle();
        this.logger.log("from common - updateInViewPortClass()");
        if (this._appendClassWhenInViewPort !== '') {
            if (this.elementIsInViewPort) {
                targetElement.classList.add(this._appendClassWhenInViewPort);
            }
            else {
                targetElement.classList.remove(this._appendClassWhenInViewPort);
            }
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
    updateElementVisibilityInViewport(visibility) {
        this.elementIsInViewPort = visibility;
        this.updateInViewPortClass();
    }
    disconnectCommonMutationObserver() {
        if (!Ch5Common.isNil(this._commonMutationObserver) && !isEmpty(this._commonMutationObserver)) {
            this._commonMutationObserver.disconnectObserver();
        }
    }
    checkIfValueIsTruey(str = '') {
        return (!!str && str.length > 0 && str !== 'false' && str !== '0' && str !== null);
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
    setAttributeAndProperty(property, value, setFromSignal = false) {
        this.logger.log('setAttributeAndProperty: ' + property.attributeName + ' - "' + value + '"');
        const attribute = property.attributeName.toLowerCase();
        const thisRef = property.componentReference;
        if (property.type === "boolean") {
            let valueToSet = false;
            if (typeof value === property.type) {
                valueToSet = value;
            }
            else {
                if (this.hasAttribute(attribute)) {
                    let tempVal = value;
                    if ([true, false, "true", "false", "0", "1", 0, 1, '', null].indexOf(tempVal) < 0) {
                        tempVal = property.default;
                    }
                    valueToSet = this.toBoolean(tempVal, property.valueOnAttributeEmpty);
                }
                else {
                    valueToSet = property.default;
                }
            }
            if (thisRef[property.propertyName] !== valueToSet || setFromSignal === true || thisRef[property.variableName + "Initialized"] !== true || String(value) !== String(valueToSet)) {
                thisRef[property.variableName] = valueToSet;
                thisRef[property.variableName + "Initialized"] = true;
                if (property.enumeratedValues && property.enumeratedValues.length > 0 && property.enumeratedValues.indexOf(String(thisRef.getAttribute(value))) < 0) {
                    if (property.removeAttributeOnNull === true) {
                        if (!this.hasAttribute(attribute)) {
                            if (setFromSignal === true) {
                                thisRef.setAttribute(attribute, valueToSet.toString());
                            }
                            else {
                                thisRef.removeAttribute(attribute);
                            }
                        }
                        else {
                            thisRef.setAttribute(attribute, valueToSet.toString());
                        }
                    }
                    else {
                        thisRef.setAttribute(attribute, valueToSet.toString());
                    }
                }
                else {
                    thisRef.setAttribute(attribute, valueToSet.toString());
                }
                if (!_.isNil(property.callback)) {
                    property.callback();
                }
            }
        }
        else if (property.type === "enum") {
            if (thisRef[attribute] !== value) {
                if (property.enumeratedValues.indexOf(value) >= 0) {
                    thisRef.setAttribute(attribute, String(value));
                    thisRef[property.variableName] = String(value);
                }
                else {
                    if (!_.isNil(property.default)) {
                        thisRef.setAttribute(attribute, String(property.default));
                        thisRef[property.variableName] = String(property.default);
                    }
                    else {
                        thisRef.removeAttribute(attribute);
                        thisRef[property.variableName] = String(property.default);
                    }
                }
                if (!_.isNil(property.callback)) {
                    property.callback();
                }
            }
        }
        else if (property.type === "string") {
            if (thisRef[attribute] !== value) {
                if (_.isNil(value) || String(value).trim() === "") {
                    thisRef.removeAttribute(attribute);
                    thisRef[property.variableName] = String(property.default);
                }
                else {
                    thisRef.setAttribute(attribute, String(value));
                    thisRef[property.variableName] = String(value);
                }
                if (!_.isNil(property.callback)) {
                    property.callback();
                }
            }
        }
    }
}
Ch5Common.DIRECTION = ['ltr', 'rtl'];
Ch5Common.SIGNAL_ATTRIBUTE_TYPES = {
    receivestatecustomclass: { direction: "state", stringJoin: 1, contractName: true },
    receivestatecustomstyle: { direction: "state", stringJoin: 1, contractName: true },
    receivestateshow: { direction: "state", booleanJoin: 1, contractName: true },
    receivestateshowpulse: { direction: "state", booleanJoin: 1, contractName: true },
    receivestatehidepulse: { direction: "state", booleanJoin: 1, contractName: true },
    receivestateenable: { direction: "state", booleanJoin: 1, contractName: true },
    sendeventonshow: { direction: "event", booleanJoin: 1, contractName: true }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vY2g1LWNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxXQUFXLEVBQW9CLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1TCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2hELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQWF0QixDQUFDO0FBRUYsTUFBTSxPQUFPLFNBQVUsU0FBUSxXQUFXO0lBZ1V6QyxJQUFjLGdCQUFnQixDQUFDLEtBQWU7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0QsSUFBYyxnQkFBZ0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsV0FBVyxDQUFDLEtBQWE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RELEtBQUssR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMs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