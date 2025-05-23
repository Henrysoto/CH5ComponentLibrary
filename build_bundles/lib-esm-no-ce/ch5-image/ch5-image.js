import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5Signal, Ch5SignalBridge, Ch5SignalFactory, subscribeInViewPortChange } from "../ch5-core";
import { Ch5Pressable } from "../ch5-common/ch5-pressable";
import { Ch5CoreIntersectionObserver } from "../ch5-core/ch5-core-intersection-observer";
import { isNil, isEmpty } from 'lodash';
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import _ from "lodash";
import { Ch5Properties } from "../ch5-core/ch5-properties";
export class Ch5Image extends Ch5Common {
    get alt() {
        return this._alt;
    }
    set alt(value) {
        if (value === undefined || value === null) {
            value = '';
        }
        const trValue = this._getTranslatedValue('alt', value);
        if (this._alt !== trValue || this._img.alt !== trValue) {
            this._alt = trValue;
            this._img.alt = trValue;
            this.setAttribute('alt', trValue);
            this._img.setAttribute('alt', trValue);
        }
    }
    get height() {
        return this._height;
    }
    set height(value) {
        if (this._height !== value) {
            this._height = value || '';
            this.style.height = value || '';
            this.setAttribute('height', this._height);
        }
    }
    get width() {
        return this._width;
    }
    set width(value) {
        if (this._width !== value) {
            this._width = value || '';
            this.style.width = value || '';
            this.setAttribute('width', this._width);
        }
    }
    get refreshRate() {
        return this._refreshRate;
    }
    set refreshRate(value) {
        value = Number(value);
        if (isNaN(value)) {
            value = 0;
        }
        if (this._refreshRate !== value) {
            this._refreshRate = value;
        }
    }
    get url() {
        return this._url;
    }
    set url(value) {
        var _a;
        if (_.isNil(this.receiveStateUrl) || this.receiveStateUrl === "") {
            if (!this._url) {
                (_a = this._img) === null || _a === void 0 ? void 0 : _a.removeAttribute('src');
            }
            if (this._url !== value) {
                this.setImageDisplay(value);
            }
        }
    }
    set allowPositionDataToBeSent(value) {
        this._ch5Properties.set("allowPositionDataToBeSent", value, null);
    }
    get allowPositionDataToBeSent() {
        return this._ch5Properties.get("allowPositionDataToBeSent");
    }
    set allowValuesOnMove(value) {
        this._ch5Properties.set("allowValuesOnMove", value, null);
    }
    get allowValuesOnMove() {
        return this._ch5Properties.get("allowValuesOnMove");
    }
    set sendEventXPosition(value) {
        this._ch5Properties.set("sendEventXPosition", value);
    }
    get sendEventXPosition() {
        return this._ch5Properties.get('sendEventXPosition');
    }
    set sendEventYPosition(value) {
        this._ch5Properties.set("sendEventYPosition", value);
    }
    get sendEventYPosition() {
        return this._ch5Properties.get('sendEventYPosition');
    }
    set receiveStateAllowValuesOnMove(value) {
        this._ch5Properties.set("receiveStateAllowValuesOnMove", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("allowValuesOnMove", newValue, null);
        });
    }
    get receiveStateAllowValuesOnMove() {
        return this._ch5Properties.get('receiveStateAllowValuesOnMove');
    }
    set receiveStateAllowPositionDataToBeSent(value) {
        this._ch5Properties.set("receiveStateAllowPositionDataToBeSent", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("allowPositionDataToBeSent", newValue, null);
        });
    }
    get receiveStateAllowPositionDataToBeSent() {
        return this._ch5Properties.get('receiveStateAllowPositionDataToBeSent');
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        if (value === this._direction) {
            return;
        }
        if (value == null) {
            value = Ch5Common.DIRECTION[0];
        }
        if (Ch5Common.DIRECTION.indexOf(value) >= 0) {
            this._direction = value;
        }
        else {
            this._direction = Ch5Common.DIRECTION[0];
        }
        this.setAttribute('dir', value);
    }
    set mode(value) {
        this.logger.log('set mode("' + value + '")');
        if (this._mode !== value) {
            if (Number.isNaN(value)) {
                this._mode = 0;
            }
            else {
                if (value >= this.MODES.MIN_LENGTH && value <= this.MODES.MAX_LENGTH) {
                    const buttonModesArray = this.getElementsByTagName("ch5-image-mode");
                    if (buttonModesArray && buttonModesArray.length > 0) {
                        if (value < buttonModesArray.length) {
                            this._mode = value;
                        }
                        else {
                            this._mode = 0;
                        }
                    }
                    else {
                        this._mode = 0;
                    }
                }
                else {
                    this._mode = 0;
                }
            }
            this.setAttribute('mode', String(this._mode));
            this.setImageDisplay();
        }
    }
    get mode() {
        return this._mode;
    }
    set receiveStateUser(value) {
        this.info('set receiveStateUser(\'' + value + '\')');
        if ('' === value
            || this._sigNameReceiveUser === value
            || null === value
            || undefined === value) {
            return;
        }
        this.user = '';
        if (this._sigNameReceiveUser !== ''
            && this._sigNameReceiveUser !== undefined
            && this._sigNameReceiveUser !== null) {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveUser);
            const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveUser);
            }
        }
        this._sigNameReceiveUser = value;
        this.setAttribute('receiveStateUser', value);
        const sigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveUser);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(sigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveUser = receiveSignal.subscribe((newValue) => {
            if ('' !== newValue && newValue !== this._user) {
                this.setAttribute('user', newValue);
                this.user = newValue;
                this._initRefreshRate();
            }
        });
    }
    get receiveStateUser() {
        return this._attributeValueAsString('receiveStateUser');
    }
    set receiveStatePassword(value) {
        this.info('set receiveStatePassword(\'' + value + '\')');
        if ('' === value
            || this._sigNameReceivePassword === value
            || null === value
            || undefined === value) {
            return;
        }
        this.password = '';
        if (this._sigNameReceivePassword !== ''
            && this._sigNameReceivePassword !== undefined
            && this._sigNameReceivePassword !== null) {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceivePassword);
            const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceivePassword);
            }
        }
        this._sigNameReceivePassword = value;
        this.setAttribute('receivestatepassword', value);
        const sigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceivePassword);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(sigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceivePassword = receiveSignal.subscribe((newValue) => {
            if ('' !== newValue && newValue !== this._password) {
                this.setAttribute('password', newValue);
                this.password = newValue;
                this._initRefreshRate();
            }
        });
    }
    get receiveStatePassword() {
        return this._attributeValueAsString('receiveStatePassword');
    }
    get receiveStateUrl() {
        return this._attributeValueAsString('receivestateurl');
    }
    set receiveStateUrl(value) {
        this.info('set receiveStateUrl(\'' + value + '\')');
        if ('' === value
            || this._sigNameReceiveUrl === value
            || null === value
            || undefined === value) {
            return;
        }
        this.url = '';
        if (this._sigNameReceiveUrl !== ''
            && this._sigNameReceiveUrl !== undefined
            && this._sigNameReceiveUrl !== null) {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveUrl);
            const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveUrl);
            }
        }
        this._sigNameReceiveUrl = value;
        this.setAttribute('receivestateurl', value);
        const sigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveUrl);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(sigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveUrl = receiveSignal.subscribe((newValue) => {
            if (newValue !== this._url || newValue === "") {
                this.logger.log("value from signal is ", newValue);
                if (newValue === "" && this.sendEventOnError !== "") {
                    newValue = this.receiveStateUrl;
                }
                this.setUrlByInput(newValue);
                if (this.canProcessUri()) {
                    this.processUri();
                }
            }
        });
    }
    get receiveStateMode() {
        return this._attributeValueAsString('receivestatemode');
    }
    set receiveStateMode(value) {
        this.info('set receivestatemode(\'' + value + '\')');
        if ('' === value
            || this._sigNameReceiveMode === value
            || null === value
            || undefined === value) {
            return;
        }
        this.mode = 0;
        if (this._sigNameReceiveMode !== ''
            && this._sigNameReceiveMode !== undefined
            && this._sigNameReceiveMode !== null) {
            const oldSigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveMode);
            const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveMode);
            }
        }
        this._sigNameReceiveMode = value;
        this.setAttribute('receivestatemode', value);
        const sigName = Ch5Signal.getSubscriptionSignalName(this._sigNameReceiveMode);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(sigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveMode = receiveSignal.subscribe((newValue) => {
            if (newValue !== this.mode) {
                this.mode = Number(newValue);
                this._initRefreshRate();
            }
        });
    }
    get sendEventOnClick() {
        return this._sigNameSendOnClick;
    }
    set sendEventOnClick(value) {
        this.info('set sendEventOnClick(\'' + value + '\')');
        if ('' === value) {
            return;
        }
        if (this._sigNameSendOnClick !== value) {
            this._sigNameSendOnClick = value;
            this.setAttribute('sendeventonclick', value);
        }
    }
    set sendEventOnError(value) {
        this.info('set sendEventOnError(\'' + value + '\')');
        if ('' === value) {
            return;
        }
        if (this._sigNameSendOnError !== value) {
            this._sigNameSendOnError = value;
            this.setAttribute('sendeventonerror', value);
        }
    }
    get sendEventOnError() {
        return this._sigNameSendOnError;
    }
    set sendEventOnTouch(value) {
        this.info('set sendEventOnTouch(\'' + value + '\')');
        if ('' === value) {
            return;
        }
        if (this._sigNameSendOnTouch !== value) {
            this._sigNameSendOnTouch = value;
            this.setAttribute('sendeventontouch', value);
        }
    }
    get sendEventOnTouch() {
        return this._sigNameSendOnTouch;
    }
    set user(userName) {
        if (isNil(userName) || this.user === userName) {
            return;
        }
        this._user = userName;
        if (this.canProcessUri()) {
            this.processUri();
        }
    }
    get user() {
        return this._user;
    }
    set password(password) {
        if (!isNil(password) && this.password === password) {
            return;
        }
        this._password = password;
        if (this.canProcessUri()) {
            this.processUri();
        }
    }
    get password() {
        return this._password;
    }
    set protocol(protocol) {
        if (isNil(protocol)) {
            return;
        }
        this._protocol = protocol;
    }
    get protocol() {
        return this._protocol;
    }
    constructor() {
        super();
        this.isDragging = false;
        this.MODES = {
            MIN_LENGTH: 0,
            MAX_LENGTH: 99
        };
        this.primaryCssClass = 'ch5-image';
        this._img = {};
        this._alt = '';
        this._height = '';
        this._width = '';
        this._refreshRate = 0;
        this._url = '';
        this._direction = Ch5Common.DIRECTION[0];
        this._sigNameReceiveUrl = '';
        this._sigNameReceiveUser = '';
        this._sigNameReceivePassword = '';
        this._sigNameReceiveMode = '';
        this._subReceiveUrl = '';
        this._subReceiveUser = '';
        this._subReceivePassword = '';
        this._subReceiveMode = '';
        this._sigNameSendOnClick = '';
        this._sigNameSendOnError = '';
        this._sigNameSendOnTouch = '';
        this._pressable = null;
        this._timerIdForTouch = null;
        this._longTouch = false;
        this._intervalIdForOnTouch = null;
        this._intervalTimeoutForOnTouch = 500;
        this._intervalIdForRefresh = null;
        this._imageWasLoaded = false;
        this._user = '';
        this._password = '';
        this._protocol = '';
        this._isPressedSubscription = null;
        this._buttonPressedInPressable = false;
        this._repeatDigitalInterval = 0;
        this.STATE_CHANGE_TIMEOUTS = 500;
        this._mode = 0;
        this._ch5Properties = new Ch5Properties(this, Ch5Image.COMPONENT_PROPERTIES);
        this.errorEvent = new CustomEvent("error", {
            bubbles: true,
            cancelable: false,
            detail: "ch5-image triggered error CustomEvent",
        });
        if (typeof this._img.classList === 'undefined') {
            this._img = document.createElement('img');
        }
        this._img.classList.add(this.primaryCssClass);
        this._img.classList.add(this.primaryCssClass + '__img');
        this._img.setAttribute('draggable', 'false');
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5ImageAttributes = [
            'alt',
            'width',
            'height',
            'user',
            'password',
            'url',
            'refreshrate',
            'dir',
            'mode',
            'allowpositiondatatobesent',
            'allowvaluesonmove',
            'receivestateurl',
            'receivestateallowvaluesonmove',
            'receivestateallowpositiondatatobesent',
            'sendeventonclick',
            'sendeventonerror',
            'sendeventontouch',
            'sendeventxposition',
            'sendeventyposition'
        ];
        for (let i = 0; i < Ch5Image.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Image.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                ch5ImageAttributes.push(Ch5Image.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return commonAttributes.concat(ch5ImageAttributes);
    }
    ;
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Image.ELEMENT_NAME, Ch5Image.SIGNAL_ATTRIBUTE_TYPES);
    }
    connectedCallback() {
        this.info(' connectedCallback() - start');
        this._pressable = new Ch5Pressable(this);
        this._onClick = this._onClick.bind(this);
        this._pointerDown = this._pointerDown.bind(this);
        this._pointerUp = this._pointerUp.bind(this);
        this._pointerCancel = this._pointerCancel.bind(this);
        this._pointerMove = this._pointerMove.bind(this);
        this._onError = this._onError.bind(this);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Image);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        if (null !== this._pressable) {
            this._pressable.init();
            this._subscribeToPressableIsPressed();
        }
        customElements.whenDefined('ch5-image').then(() => {
            this.cacheComponentChildrens();
            const img = this.querySelector('img');
            if (img) {
                img.remove();
            }
            if (this._img.parentElement !== this) {
                this.appendChild(this._img);
            }
            this.style.overflow = 'hidden';
            this.initAttributes();
            this.attachEventListeners();
            this.updateCssClasses();
            this._initRefreshRate();
            this.initCommonMutationObserver(this);
            this.info(' connectedCallback() - end');
        });
        subscribeInViewPortChange(this, () => {
            this.logger.log("subscribeInViewPortChange: " + this.elementIsInViewPort);
        });
    }
    disconnectedCallback() {
        this.removeEvents();
        this.unsubscribeFromSignals();
        this.disconnectCommonMutationObserver();
        if (null !== this._intervalIdForRefresh) {
            window.clearInterval(this._intervalIdForRefresh);
            if (Ch5CoreIntersectionObserver.getInstance() instanceof Ch5CoreIntersectionObserver) {
                Ch5CoreIntersectionObserver.getInstance().unobserve(this);
            }
        }
        if (null !== this._timerIdForTouch) {
            window.clearTimeout(this._timerIdForTouch);
            this._timerIdForTouch = null;
        }
        if (null !== this._intervalIdForOnTouch) {
            window.clearInterval(this._intervalIdForOnTouch);
            this._intervalIdForOnTouch = null;
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info('ch5-image attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        const attributeChangedProperty = Ch5Image.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
        if (attributeChangedProperty) {
            const thisRef = this;
            const key = attributeChangedProperty.name;
            thisRef[key] = newValue;
        }
        switch (attr) {
            case 'url':
                if (this.hasAttribute('url')) {
                    this.url = newValue;
                }
                else {
                    this.url = '';
                }
                break;
            case 'alt':
                if (this.hasAttribute('alt')) {
                    this.alt = newValue;
                    this.setAttribute('aria-label', this.alt);
                }
                else {
                    this.alt = '';
                    this.removeAttribute('aria-label');
                }
                break;
            case 'width':
                if (this.hasAttribute('width')) {
                    this.width = newValue;
                }
                else {
                    this.width = '';
                }
                break;
            case 'height':
                if (this.hasAttribute('height')) {
                    this.height = newValue;
                }
                else {
                    this.height = '';
                }
                break;
            case 'mode':
                this.mode = parseFloat(newValue);
                break;
            case 'refreshrate':
                if (this.hasAttribute('refreshrate')) {
                    this.refreshRate = Number(newValue);
                    if (this._refreshRate !== null &&
                        this._refreshRate !== 0) {
                        Ch5CoreIntersectionObserver.getInstance().observe(this, this.updateElementInViewportChange);
                    }
                }
                else {
                    this.refreshRate = 0;
                }
                this._initRefreshRate();
                break;
            case 'receivestateuser':
                if (this.hasAttribute('receivestateuser')) {
                    this.receiveStateUser = newValue;
                }
                break;
            case 'receivestatepassword':
                if (this.hasAttribute('receivestatepassword')) {
                    this.receiveStatePassword = newValue;
                }
                break;
            case 'receivestateurl':
                if (this.hasAttribute('receivestateurl')) {
                    this.receiveStateUrl = newValue;
                }
                else {
                    this.receiveStateUrl = '';
                }
                break;
            case 'receivestatemode':
                if (this.hasAttribute('receivestatemode')) {
                    this.receiveStateMode = newValue;
                }
                else {
                    this.receiveStateMode = '';
                }
                break;
            case 'sendeventonclick':
                if (this.hasAttribute('sendeventonclick')) {
                    this.sendEventOnClick = newValue;
                }
                else {
                    this.sendEventOnClick = '';
                }
                break;
            case 'sendeventontouch':
                if (this.hasAttribute('sendeventontouch')) {
                    this.sendEventOnTouch = newValue;
                }
                else {
                    this.sendEventOnTouch = '';
                }
                break;
            case 'sendeventonerror':
                if (this.hasAttribute('sendeventonerror')) {
                    this.sendEventOnError = newValue;
                }
                else {
                    this.sendEventOnError = '';
                }
                break;
            case 'dir':
                if (this.hasAttribute('dir')) {
                    this.direction = newValue.toLowerCase();
                }
                else {
                    this.direction = Ch5Common.DIRECTION[0];
                }
                this._img.classList.add(this.primaryCssClass + '--dir--' + this.direction);
                break;
            case 'user':
                if (this.hasAttribute('user')) {
                    this.user = newValue;
                }
                else {
                    this.user = "";
                }
                break;
            case 'password':
                if (this.hasAttribute('password')) {
                    this.password = newValue;
                }
                else {
                    this.password = "";
                }
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        const csf = Ch5SignalFactory.getInstance();
        if ('' !== this._subReceiveUrl && '' !== this._sigNameReceiveUrl) {
            const sigLabel = csf.getStringSignal(this._sigNameReceiveUrl);
            if (null !== sigLabel) {
                sigLabel.unsubscribe(this._subReceiveUrl);
                this._sigNameReceiveUrl = '';
            }
        }
    }
    setImageDisplay(value = "") {
        if (!this.hasAttribute('receivestateurl')) {
            const imagesModesArray = this.getElementsByTagName("ch5-image-mode");
            if (imagesModesArray && imagesModesArray.length > 0) {
                const selectedImageMode = imagesModesArray[this.mode];
                if (selectedImageMode) {
                    const urlValue = (!_.isNil(selectedImageMode.getAttribute("url")) && selectedImageMode.getAttribute("url") !== "") ? selectedImageMode.getAttribute("url") : (!_.isNil(value) && value !== "") ? value : "";
                    this.setUrlByInput(urlValue);
                }
            }
            else {
                const urlValue = (!_.isNil(value) && value !== "") ? value : this.getAttribute("url");
                this.setUrlByInput(urlValue);
            }
            if (this.canProcessUri()) {
                this.processUri();
            }
        }
    }
    setUrlByInput(url) {
        this.logger.log("setUrlByInput url: ", url);
        this._url = url;
        this.setAttribute('url', this._url);
        this._maybeLoadImage();
    }
    processUri() {
        const processUriPrams = {
            protocol: this.protocol,
            user: this.user,
            password: this.password,
            url: this._url
        };
        const imageUri = Ch5Common.processUri(processUriPrams);
        if (!!imageUri) {
            this._url = imageUri;
            this.setAttribute('url', this._url);
            this._maybeLoadImage();
        }
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Image.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Image.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Image.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Image.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        if (this.hasAttribute('receiveStateUrl')) {
            this.receiveStateUrl = this.getAttribute('receiveStateUrl');
        }
        if (this.hasAttribute('receivestateuser')) {
            this.receiveStateUser = this.getAttribute('receivestateuser');
        }
        if (this.hasAttribute('receivestatepassword')) {
            this.receiveStatePassword = this.getAttribute('receivestatepassword');
        }
        if (this.hasAttribute('receivestatemode')) {
            this.receiveStateMode = this.getAttribute('receivestatemode');
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this.addEventListener('click', this._onClick);
        this.addEventListener('pointerdown', this._pointerDown, { passive: true });
        this.addEventListener('pointerup', this._pointerUp);
        this.addEventListener('pointermove', this._pointerMove, { passive: true });
        this.addEventListener('pointercancel', this._pointerCancel);
        this._img.addEventListener('error', this._onError);
    }
    updateCssClasses() {
        super.updateCssClasses();
    }
    _subscribeToPressableIsPressed() {
        const REPEAT_DIGITAL_PERIOD = 200;
        const MAX_REPEAT_DIGITALS = 30000 / REPEAT_DIGITAL_PERIOD;
        if (this._isPressedSubscription === null && this._pressable !== null) {
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                this.info(`Ch5Button.pressableSubscriptionCb(${value})`);
                if (value !== this._buttonPressedInPressable) {
                    this._buttonPressedInPressable = value;
                    if (value === false) {
                        if (this._repeatDigitalInterval !== null) {
                            window.clearInterval(this._repeatDigitalInterval);
                        }
                        this.sendValueForRepeatDigitalWorking(false);
                        this.isDragging = false;
                    }
                    else {
                        this.sendValueForRepeatDigitalWorking(true);
                        if (this._repeatDigitalInterval !== null) {
                            window.clearInterval(this._repeatDigitalInterval);
                        }
                        let numRepeatDigitals = 0;
                        this._repeatDigitalInterval = window.setInterval(() => {
                            this.sendValueForRepeatDigitalWorking(true);
                            if (++numRepeatDigitals >= MAX_REPEAT_DIGITALS) {
                                console.warn("Ch5Button MAXIMUM Repeat digitals sent");
                                window.clearInterval(this._repeatDigitalInterval);
                                this.sendValueForRepeatDigitalWorking(false);
                            }
                        }, REPEAT_DIGITAL_PERIOD);
                    }
                }
            });
        }
    }
    sendValueForRepeatDigitalWorking(value) {
        this.info(`Ch5Button.sendValueForRepeatDigital(${value})`);
        if (!this._sigNameSendOnTouch && !this._sigNameSendOnClick) {
            return;
        }
        const touchSignal = Ch5SignalFactory.getInstance()
            .getObjectAsBooleanSignal(this._sigNameSendOnTouch);
        const clickSignal = Ch5SignalFactory.getInstance()
            .getObjectAsBooleanSignal(this._sigNameSendOnClick);
        if (clickSignal && touchSignal && clickSignal.name === touchSignal.name) {
            clickSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
            return;
        }
        if (touchSignal && touchSignal.name) {
            touchSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
        }
        if (clickSignal && clickSignal.name) {
            clickSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
        }
    }
    enableImageLoading() {
        this.info('enableImageLoading()');
        if (this._imageWasLoaded) {
            return;
        }
        this._img.src = '';
        if (null === this.refreshRate || this.refreshRate === 0) {
            this._maybeLoadImage(false);
        }
        else {
            this._initRefreshRate();
        }
    }
    disableImageLoading() {
        this.info('disableImageLoading()');
        if (null !== this._intervalIdForRefresh) {
            window.clearInterval(this._intervalIdForRefresh);
            this._imageWasLoaded = false;
        }
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    canProcessUri() {
        if ((isNil(this.password) || isEmpty(this.password)) ||
            (isNil(this.user) || isEmpty(this.user)) ||
            (isNil(this._url) || isEmpty(this._url))) {
            return false;
        }
        return true;
    }
    isVisible() {
        function _isVisible(el) {
            const p = el.parentNode;
            if (!_elementInDocument(el)) {
                return false;
            }
            if (9 === p.nodeType) {
                return true;
            }
            if (!_getStyle(el) || el.hasAttribute('inert')) {
                return false;
            }
            if (p) {
                return _isVisible(p);
            }
            return true;
        }
        function _getStyle(el) {
            let styles = {};
            if (document && document.defaultView) {
                styles = document.defaultView.getComputedStyle(el);
                if (styles.opacity === '0' || styles.visibility === 'hidden' || styles.display === 'none') {
                    return false;
                }
            }
            return true;
        }
        function _elementInDocument(element) {
            while (element = element.parentNode) {
                if (element === document) {
                    return true;
                }
            }
            return false;
        }
        return _isVisible(this);
    }
    afterHandlingShow() {
        this.info('afterHandlingShow()');
        if (null === this.refreshRate || this.refreshRate === 0) {
            this._maybeLoadImage(false);
        }
        else {
            this._initRefreshRate();
        }
    }
    afterHandlingHide() {
        this.info('afterHandlingHide()');
        if (null !== this._intervalIdForRefresh) {
            window.clearInterval(this._intervalIdForRefresh);
        }
        this._img.src = '';
    }
    removeEvents() {
        super.removeEventListeners();
        this.removeEventListener('click', this._onClick);
        this.removeEventListener('pointerdown', this._pointerDown);
        this.removeEventListener('pointerup', this._pointerUp);
        this.removeEventListener('pointermove', this._pointerMove);
        this.removeEventListener('pointercancel', this._pointerCancel);
        this._img.removeEventListener('error', this._onError);
        if (null !== this._pressable) {
            this._pressable.destroy();
        }
        if (this._isPressedSubscription !== null) {
            this._isPressedSubscription.unsubscribe();
            this._isPressedSubscription = null;
        }
    }
    _maybeLoadImage(refreshParam) {
        if (null !== this._url && '' !== this.url && true === this.show) {
            const candidateUrl = refreshParam ? this._insertParamToUrl('__cr_avoid_cache', new Date().getTime().toString()) : this._url;
            this._img.src = candidateUrl;
            this._imageWasLoaded = true;
            this.info('image source ', this._img.src);
        }
    }
    _initRefreshRate() {
        this.info('initRefreshRate');
        if (this._intervalIdForRefresh) {
            window.clearInterval(this._intervalIdForRefresh);
        }
        if (null !== this._url &&
            '' !== this._url &&
            null !== this._refreshRate &&
            0 !== this._refreshRate) {
            this._maybeLoadImage(true);
            this._intervalIdForRefresh = window.setInterval(() => { this._maybeLoadImage(true); }, this._refreshRate * 1000);
        }
    }
    _pointerDown(inEvent) {
        this.info("Ch5Image._pointerDown()");
        this.isDragging = true;
        if (this._timerIdForTouch) {
            window.clearTimeout(this._timerIdForTouch);
        }
    }
    handleAllowPositionDataToBeSent(event) {
        var _a, _b;
        const imagePos = this.getBoundingClientRect();
        const x = Math.round(event.clientX - imagePos.x);
        const y = Math.round(event.clientY - imagePos.y);
        const xPosition = this.getAnalogValue(x, this.clientWidth);
        const yPosition = this.getAnalogValue(y, this.clientHeight);
        if (this.sendEventXPosition && this.sendEventYPosition) {
            (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventXPosition)) === null || _a === void 0 ? void 0 : _a.publish((xPosition));
            (_b = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventYPosition)) === null || _b === void 0 ? void 0 : _b.publish((yPosition));
        }
    }
    getAnalogValue(val, input) {
        return Math.min(Math.max(Math.round(val * 65535 / input), 0), 65535);
    }
    _pointerUp(inEvent) {
        this.info("Ch5Image._pointerUp()");
        if (this.allowPositionDataToBeSent && this.sendEventXPosition && this.sendEventYPosition) {
            this.isDragging = false;
            this.handleAllowPositionDataToBeSent(inEvent);
        }
        this._stopSendSignalOnTouch();
    }
    _pointerMove(inEvent) {
        if (this.allowPositionDataToBeSent && this.allowValuesOnMove && this.sendEventXPosition && this.sendEventYPosition && this.isDragging) {
            this.handleAllowPositionDataToBeSent(inEvent);
        }
        this._stopSendSignalOnTouch();
    }
    _pointerCancel(inEvent) {
        this.isDragging = false;
        this._stopSendSignalOnTouch();
    }
    _onClick(inEvent) {
        this.info("Ch5Image._onClick()");
    }
    _onError(inEvent) {
        this.logger.log("onError called");
        this.dispatchEvent(this.errorEvent);
        const message = 'Error loading image with src: ' + this._url;
        this._sendValueForErrorSignal(message);
    }
    _onLongTouch() {
        if (!this._longTouch) {
            this._longTouch = true;
        }
        this._sendValueForTouchSignal(true);
        if (this._intervalIdForOnTouch) {
            window.clearInterval(this._intervalIdForOnTouch);
        }
        this._intervalIdForOnTouch = window.setInterval(() => this._sendValueForTouchSignal(true), this._intervalTimeoutForOnTouch);
    }
    _stopSendSignalOnTouch() {
        if (this._longTouch) {
            this._sendValueForTouchSignal(false);
            this._longTouch = false;
        }
        if (null !== this._timerIdForTouch) {
            window.clearTimeout(this._timerIdForTouch);
            this._timerIdForTouch = null;
        }
        if (null !== this._intervalIdForOnTouch) {
            window.clearInterval(this._intervalIdForOnTouch);
            this._intervalIdForOnTouch = null;
        }
    }
    _sendValueForTouchSignal(value) {
        if (this._sigNameSendOnTouch !== '' && !isNil(this._sigNameSendOnTouch)) {
            const touchSignal = Ch5SignalFactory.getInstance()
                .getObjectAsBooleanSignal(this._sigNameSendOnTouch);
            if (touchSignal !== null) {
                touchSignal.publish({ [Ch5SignalBridge.REPEAT_DIGITAL_KEY]: value });
            }
        }
    }
    _sendValueForClickSignal() {
        let sigClick = null;
        if ('' !== this._sigNameSendOnClick
            && undefined !== this._sigNameSendOnClick
            && null !== this._sigNameSendOnClick) {
            sigClick = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this._sigNameSendOnClick);
            if (sigClick !== null) {
                sigClick.publish(true);
                sigClick.publish(false);
            }
        }
    }
    _sendValueForErrorSignal(errorMessage) {
        let sigError = null;
        if ('' !== this._sigNameSendOnError
            && undefined !== this._sigNameSendOnError
            && null !== this._sigNameSendOnError) {
            sigError = Ch5SignalFactory.getInstance()
                .getStringSignal(this._sigNameSendOnError);
            if (null !== sigError) {
                sigError.publish(errorMessage);
            }
        }
    }
    _insertParamToUrl(key, value) {
        key = encodeURI(key);
        value = encodeURI(value);
        if (this._getUrlVars().size === 0) {
            return this._url + '?' + key + '=' + value;
        }
        const kvp = this.url.split('&');
        let i = kvp.length;
        let x;
        while (i--) {
            x = kvp[i].split('=');
            if (x[0] === key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }
        return kvp.join('&');
    }
    _getUrlVars() {
        const vars = new Map();
        let hash;
        const questionMarkIndex = this._url.indexOf('?');
        if (questionMarkIndex > 1) {
            const hashes = this._url.slice(questionMarkIndex + 1).split('&');
            for (const iterator of hashes) {
                hash = iterator.split('=');
                vars.set(hash[0], hash[1]);
            }
        }
        return vars;
    }
    updateElementInViewportChange(visibility) {
        if (visibility) {
            this._maybeLoadImage(true);
        }
    }
}
Ch5Image.ELEMENT_NAME = 'ch5-image';
Ch5Image.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateurl: { direction: "state", stringJoin: 1, contractName: true }, receivestatemode: { direction: "state", numericJoin: 1, contractName: true }, sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true }, sendeventontouch: { direction: "event", booleanJoin: 1, contractName: true }, sendeventonerror: { direction: "event", stringJoin: 1, contractName: true }, receivestateallowvaluesonmove: { direction: "state", booleanJoin: 1, contractName: true }, receivestateallowpositiondatatobesent: { direction: "state", booleanJoin: 1, contractName: true }, sendeventxposition: { direction: "event", numericJoin: 1, contractName: true }, sendeventyposition: { direction: "event", numericJoin: 1, contractName: true } });
Ch5Image.COMPONENT_DATA = {
    DIRECTIONS: {
        default: Ch5Common.DIRECTION[0],
        values: Ch5Common.DIRECTION,
        key: 'direction',
        classListPrefix: '--dir--'
    }
};
Ch5Image.COMPONENT_PROPERTIES = [
    {
        default: false,
        name: "allowValuesOnMove",
        nameForSignal: "receiveStateAllowValuesOnMove",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true,
    },
    {
        default: false,
        name: "allowPositionDataToBeSent",
        nameForSignal: "receiveStateAllowPositionDataToBeSent",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateAllowValuesOnMove",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateAllowPositionDataToBeSent",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventXPosition",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventYPosition",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
];
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5Image.ELEMENT_NAME, Ch5Image);
}
Ch5Image.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWltYWdlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWltYWdlL2NoNS1pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUVuSSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBUTNELE1BQU0sT0FBTyxRQUFTLFNBQVEsU0FBUztJQXdHdEMsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFXLEdBQUcsQ0FBQyxLQUFhO1FBQzNCLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQzFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWDtRQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDdkQsSUFBSSxDQUFDLElB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