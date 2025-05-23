import { Ch5Common } from "../ch5-common/ch5-common";
import { subscribeState } from "../ch5-core";
import { Ch5SignalFactory } from "../ch5-core/index";
import { Ch5Signal } from "../ch5-core/ch5-signal";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5CoreIntersectionObserver } from "../ch5-core/ch5-core-intersection-observer";
import { CH5VideoUtils } from "./ch5-video-utils";
import { publishEvent } from '../ch5-core/utility-functions/publish-signal';
import { Ch5VideoSnapshot } from "./ch5-video-snapshot";
import { Ch5VideoTouchManager } from "./ch5-video-touch-manager";
import _ from "lodash";
export class Ch5Video extends Ch5Common {
    set indexId(value) {
        this._ch5Properties.set("indexId", value.trim());
    }
    get indexId() {
        return this._ch5Properties.get("indexId");
    }
    set aspectRatio(value) {
        this._ch5Properties.set("aspectRatio", value, () => {
            this.handleAspectRatio();
        });
    }
    get aspectRatio() {
        return this._ch5Properties.get("aspectRatio");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set url(value) {
        this._ch5Properties.set("url", value.trim(), () => {
            this.sendEvent(this.sendEventSelectionURL, this.url);
            this.checkUrlAndPublishVideo();
        });
    }
    get url() {
        return this._ch5Properties.get("url");
    }
    set sourceType(value) {
        this._ch5Properties.set("sourceType", value, () => {
            this.sendEvent(this.sendEventSelectionSourceType, this.sourceType);
            this.videoIntersectionObserver();
        });
    }
    get sourceType() {
        return this._ch5Properties.get("sourceType");
    }
    set userId(value) {
        this._ch5Properties.set("userId", value.trim(), () => {
            if (this.userId.trim().includes('@') || this.userId.trim().includes(':')) {
                console.warn("Please avoid using '@' and ':' characters for userid and password");
            }
            this.videoIntersectionObserver();
        });
    }
    get userId() {
        return this._ch5Properties.get("userId");
    }
    set password(value) {
        this._ch5Properties.set("password", value.trim(), () => {
            if (this.password.trim().includes('@') || this.password.trim().includes(':')) {
                console.warn("Please avoid using '@' and ':' characters for userid and password");
            }
            this.videoIntersectionObserver();
        });
    }
    get password() {
        return this._ch5Properties.get("password");
    }
    set snapshotURL(value) {
        this._ch5Properties.set("snapshotURL", value.trim(), () => {
            this.sendEvent(this.sendEventSnapshotURL, this.snapshotURL);
            this.validateAndAttachSnapshot();
        });
    }
    get snapshotURL() {
        return this._ch5Properties.get("snapshotURL");
    }
    set snapshotRefreshRate(value) {
        this._ch5Properties.set("snapshotRefreshRate", value, () => {
            this.validateAndAttachSnapshot();
        });
    }
    get snapshotRefreshRate() {
        return this._ch5Properties.get("snapshotRefreshRate");
    }
    set snapshotUserId(value) {
        this._ch5Properties.set("snapshotUserId", value, () => {
            this.validateAndAttachSnapshot();
        });
    }
    get snapshotUserId() {
        return this._ch5Properties.get("snapshotUserId");
    }
    set snapshotPassword(value) {
        this._ch5Properties.set("snapshotPassword", value, () => {
            this.validateAndAttachSnapshot();
        });
    }
    get snapshotPassword() {
        return this._ch5Properties.get("snapshotPassword");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.handleSize();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set receiveStatePlay(value) {
        this._ch5Properties.set("receiveStatePlay", value, null, (newValue) => {
            this.handleReceiveStatePlay(newValue);
        });
    }
    get receiveStatePlay() {
        return this._ch5Properties.get('receiveStatePlay');
    }
    set receiveStateSelect(value) {
        this._ch5Properties.set("receiveStateSelect", value, null, (newValue) => {
            if (this.selectedVideo === newValue) {
                return;
            }
            this.selectedVideo = newValue;
            if (newValue >= 0 && newValue < this.maxVideoCount) {
                this.sendEvent(this.sendEventSelectionChange, this.selectedVideo);
                this.handleReceiveStateSelect(newValue);
            }
        });
    }
    get receiveStateSelect() {
        return this._ch5Properties.get('receiveStateSelect');
    }
    set receiveStateURL(value) {
        this._ch5Properties.set("receiveStateURL", value, null);
    }
    get receiveStateURL() {
        return this._ch5Properties.get('receiveStateURL');
    }
    set receiveStateSourceType(value) {
        this._ch5Properties.set("receiveStateSourceType", value, null);
    }
    get receiveStateSourceType() {
        return this._ch5Properties.get('receiveStateSourceType');
    }
    set receiveStateUserId(value) {
        this._ch5Properties.set("receiveStateUserId", value, null);
    }
    get receiveStateUserId() {
        return this._ch5Properties.get('receiveStateUserId');
    }
    set receiveStatePassword(value) {
        this._ch5Properties.set("receiveStatePassword", value, null);
    }
    get receiveStatePassword() {
        return this._ch5Properties.get('receiveStatePassword');
    }
    set receiveStateSnapshotURL(value) {
        this._ch5Properties.set("receiveStateSnapshotURL", value, null);
    }
    get receiveStateSnapshotURL() {
        return this._ch5Properties.get('receiveStateSnapshotURL');
    }
    set receiveStateSnapshotRefreshRate(value) {
        this._ch5Properties.set("receiveStateSnapshotRefreshRate", value, null);
    }
    get receiveStateSnapshotRefreshRate() {
        return this._ch5Properties.get('receiveStateSnapshotRefreshRate');
    }
    set receiveStateSnapshotUserId(value) {
        this._ch5Properties.set("receiveStateSnapshotUserId", value, null);
    }
    get receiveStateSnapshotUserId() {
        return this._ch5Properties.get('receiveStateSnapshotUserId');
    }
    set receiveStateSnapshotPassword(value) {
        this._ch5Properties.set("receiveStateSnapshotPassword", value, null);
    }
    get receiveStateSnapshotPassword() {
        return this._ch5Properties.get('receiveStateSnapshotPassword');
    }
    set receiveStateVideoCount(value) {
        this._ch5Properties.set("receiveStateVideoCount", value, null, (newValue) => {
            if (newValue >= 1 && newValue <= 32) {
                this.maxVideoCount = newValue;
                if (this.selectedVideo >= 0 && this.selectedVideo < this.maxVideoCount) {
                    this.handleReceiveStateSelect(this.selectedVideo);
                }
            }
        });
    }
    get receiveStateVideoCount() {
        return this._ch5Properties.get('receiveStateVideoCount');
    }
    set sendEventOnClick(value) {
        this._ch5Properties.set("sendEventOnClick", value);
    }
    get sendEventOnClick() {
        return this._ch5Properties.get('sendEventOnClick');
    }
    set sendEventSelectionChange(value) {
        this._ch5Properties.set("sendEventSelectionChange", value);
    }
    get sendEventSelectionChange() {
        return this._ch5Properties.get('sendEventSelectionChange');
    }
    set sendEventSelectionSourceType(value) {
        this._ch5Properties.set("sendEventSelectionSourceType", value);
    }
    get sendEventSelectionSourceType() {
        return this._ch5Properties.get('sendEventSelectionSourceType');
    }
    set sendEventSelectionURL(value) {
        this._ch5Properties.set("sendEventSelectionURL", value);
    }
    get sendEventSelectionURL() {
        return this._ch5Properties.get('sendEventSelectionURL');
    }
    set sendEventSnapshotURL(value) {
        this._ch5Properties.set("sendEventSnapshotURL", value);
    }
    get sendEventSnapshotURL() {
        return this._ch5Properties.get('sendEventSnapshotURL');
    }
    set sendEventState(value) {
        this._ch5Properties.set("sendEventState", value);
    }
    get sendEventState() {
        return this._ch5Properties.get('sendEventState');
    }
    set sendEventErrorCode(value) {
        this._ch5Properties.set("sendEventErrorCode", value);
    }
    get sendEventErrorCode() {
        return this._ch5Properties.get('sendEventErrorCode');
    }
    set sendEventErrorMessage(value) {
        this._ch5Properties.set("sendEventErrorMessage", value);
    }
    get sendEventErrorMessage() {
        return this._ch5Properties.get('sendEventErrorMessage');
    }
    set sendEventRetryCount(value) {
        this._ch5Properties.set("sendEventRetryCount", value);
    }
    get sendEventRetryCount() {
        return this._ch5Properties.get('sendEventRetryCount');
    }
    set sendEventResolution(value) {
        this._ch5Properties.set("sendEventResolution", value);
    }
    get sendEventResolution() {
        return this._ch5Properties.get('sendEventResolution');
    }
    set sendEventSnapshotStatus(value) {
        this._ch5Properties.set("sendEventSnapshotStatus", value);
    }
    get sendEventSnapshotStatus() {
        return this._ch5Properties.get('sendEventSnapshotStatus');
    }
    set sendEventSnapshotLastUpdateTime(value) {
        this._ch5Properties.set("sendEventSnapshotLastUpdateTime", value);
    }
    get sendEventSnapshotLastUpdateTime() {
        return this._ch5Properties.get('sendEventSnapshotLastUpdateTime');
    }
    set show(value) {
        this._ch5Properties.set("show", value, () => {
            this.handleReceiveStateShow();
        });
    }
    get show() {
        return this._ch5Properties.get('show');
    }
    set receiveStateShow(value) {
        this._ch5Properties.set("receiveStateShow", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("show", newValue, () => {
                this.handleReceiveStateShow();
            });
        });
    }
    get receiveStateShow() {
        return this._ch5Properties.get('receiveStateShow');
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Video.ELEMENT_NAME, Ch5Video.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Video.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Video.ELEMENT_NAME, Ch5Video);
        }
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-video';
        this._elContainer = {};
        this._fullScreenIcon = {};
        this.responseObj = {};
        this.parentCh5Background = [];
        this.INTERSECTION_RATIO_VALUE = 0.98;
        this.playValue = true;
        this.lastResponseStatus = '';
        this.lastRequestStatus = '';
        this.orientationChanged = false;
        this.isVideoPublished = false;
        this.isFullScreen = false;
        this.snapshotImage = new Ch5VideoSnapshot();
        this.videoErrorMessages = new Map();
        this.maxVideoCount = 1;
        this.selectedVideo = 0;
        this.retryCount = 0;
        this.ch5UId = 0;
        this.videoTouchHandler = {};
        this.isTouchInProgress = false;
        this.swipeDeltaCheckNum = 1;
        this.touchCoordinates = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        };
        this.signalHolder = [];
        this.handleOrientation = () => {
            if (this.isFullScreen) {
                this.orientationChanged = true;
                this.publishVideo(CH5VideoUtils.VIDEO_ACTION.FULLSCREEN);
            }
            else {
                if (this.elementIntersectionEntry.intersectionRatio >= this.INTERSECTION_RATIO_VALUE && this.playValue && this.show) {
                    setTimeout(() => {
                        this.publishVideo(CH5VideoUtils.VIDEO_ACTION.RESIZE);
                        setTimeout(() => { this.ch5BackgroundRequest('resize'); }, 30);
                    }, 70);
                }
            }
        };
        this.ignoreAttributes = ['show', 'receiveStateShow', 'receivestateshowpulse', 'receivestatehidepulse', 'sendeventonshow'];
        this.logger.start('constructor()', Ch5Video.ELEMENT_NAME);
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Video.COMPONENT_PROPERTIES);
        this.updateCssClass();
        this.setErrorMessages();
        subscribeState('o', 'Csig.video.response', this._videoResponse.bind(this), this._errorResponse.bind(this));
        subscribeState('b', 'Csig.Backlight_Off_fb', this.standByOff.bind(this));
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Video.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Video.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Video.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        return inheritedObsAttrs.concat(newObsAttrs);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-video attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Video.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
        this.logger.start('connectedCallback()', Ch5Video.ELEMENT_NAME);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Video);
        }
        if (this._elContainer.parentElement !== this) {
            this.appendChild(this._elContainer);
        }
        this.ch5UId = parseInt(this.getCrId().split('cr-id-')[1], 0);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.attachEventListeners();
        this.initAttributes();
        this.initCommonMutationObserver(this);
        this.sendEvent(this.sendEventState, 0);
        this.handleMultiVideo();
        customElements.whenDefined('ch5-video').then(() => {
            this.componentLoadedEvent(Ch5Video.ELEMENT_NAME, this.getCrId());
        });
        Ch5CoreIntersectionObserver.getInstance().observe(this, this.videoIntersectionObserver.bind(this));
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.removeEventListeners();
        this.unsubscribeFromSignals();
        this.clearMultiSignal();
        this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        const parentCh5Background = [];
        if (this.isVideoPublished === true) {
            const bgElemList = document.querySelectorAll('ch5-background');
            Array.from(bgElemList).forEach((children) => {
                if (children.nodeName.toLowerCase() === 'ch5-background') {
                    parentCh5Background.push(children);
                }
            });
            Array.from(parentCh5Background).forEach(bg => bg.refillBackground());
        }
        this.selectedVideo = 0;
        this.maxVideoCount = 1;
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._elContainer.classList.add(this.primaryCssClass);
        this._fullScreenIcon = document.createElement("a");
        this._fullScreenIcon.classList.add("full-screen-icon");
        this._fullScreenIcon.classList.add("hide");
        this._fullScreenIcon.innerHTML = Ch5Video.SVG_ICONS.FULLSCREEN_ICON;
        this._elContainer.appendChild(this._fullScreenIcon);
        this._elContainer.appendChild(this.snapshotImage.getImage());
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Video.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Video.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Video.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Video.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
    }
    attachEventListeners() {
        super.attachEventListeners();
        this._elContainer.addEventListener('click', this._manageControls.bind(this));
        this._fullScreenIcon.addEventListener('click', this.toggleFullScreen.bind(this));
        window.addEventListener('resize', this.handleOrientation);
    }
    removeEventListeners() {
        super.removeEventListeners();
        this._elContainer.removeEventListener('click', this._manageControls.bind(this));
        this._fullScreenIcon.removeEventListener('click', this.toggleFullScreen.bind(this));
        window.removeEventListener('resize', this.handleOrientation);
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this._ch5Properties.unsubscribe();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    standByOff(data) {
        var _a, _b;
        if (data === false && ((_a = this.responseObj) === null || _a === void 0 ? void 0 : _a.id) && ((_b = this.responseObj) === null || _b === void 0 ? void 0 : _b.id) === this.ch5UId && this.isFullScreen) {
            this.orientationChanged = true;
        }
    }
    handleAspectRatio() {
        Array.from(Ch5Video.COMPONENT_DATA.ASPECT_RATIO.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Video.COMPONENT_DATA.ASPECT_RATIO.classListPrefix + e.replace(':', '-'));
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Video.COMPONENT_DATA.ASPECT_RATIO.classListPrefix + this.aspectRatio.replace(':', '-'));
    }
    handleStretch() {
        if (this.stretch === true) {
            this._elContainer.classList.add(this.primaryCssClass + '--stretch-true');
            this.style.width = '100%';
            this.style.height = '100%';
        }
        else {
            this._elContainer.classList.remove(this.primaryCssClass + '--stretch-true');
            this.style.removeProperty('width');
            this.style.removeProperty('height');
        }
    }
    handleSize() {
        Array.from(Ch5Video.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(this.primaryCssClass + Ch5Video.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(this.primaryCssClass + Ch5Video.COMPONENT_DATA.SIZE.classListPrefix + this.size);
    }
    handleReceiveStatePlay(value) {
        this.playValue = value;
        if (this.playValue === false) {
            this.snapshotImage.stopLoadingSnapshot();
            if (this.isFullScreen) {
                this.orientationChanged = true;
            }
            this.sendEvent(this.sendEventSnapshotStatus, 0);
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        }
        else {
            if (this.isFullScreen) {
                this.publishVideo(CH5VideoUtils.VIDEO_ACTION.START);
            }
            else {
                this.videoIntersectionObserver();
            }
        }
    }
    handleReceiveStateSelect(select) {
        const url = this.signalHolder[select].url.value;
        if (url) {
            this.urlCB(url);
        }
        const userId = this.signalHolder[select].userId.value;
        if (userId) {
            this.userIdCB(userId);
        }
        const password = this.signalHolder[select].password.value;
        if (password) {
            this.passwordCB(password);
        }
        const sourceType = this.signalHolder[select].sourceType.value;
        if (sourceType) {
            this.sourceTypeCB(sourceType);
        }
        const snapshotURL = this.signalHolder[select].snapshotURL.value;
        if (snapshotURL) {
            this.snapshotURLCB(snapshotURL);
        }
        const snapshotUserId = this.signalHolder[select].snapshotUserId.value;
        if (snapshotUserId) {
            this.snapshotUserIdCB(snapshotUserId);
        }
        const snapshotPassword = this.signalHolder[select].snapshotPassword.value;
        if (snapshotPassword) {
            this.snapshotPasswordCB(snapshotPassword);
        }
        const snapshotRefreshRate = this.signalHolder[select].snapshotRefreshRate.value;
        if (snapshotRefreshRate) {
            this.snapshotRefreshRateCB(snapshotRefreshRate);
        }
    }
    handleReceiveStateShow() {
        if (this.show === true) {
            if (this.isFullScreen) {
                this.publishVideo(CH5VideoUtils.VIDEO_ACTION.START);
            }
            else {
                this.videoIntersectionObserver();
            }
        }
        else {
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        }
    }
    updateCssClass() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this._elContainer.classList.add(this.primaryCssClass + Ch5Video.COMPONENT_DATA.ASPECT_RATIO.classListPrefix + this.aspectRatio.replace(':', '-'));
        this._elContainer.classList.add(this.primaryCssClass + Ch5Video.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this.logger.stop();
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    stopAndRefill() {
        this.ch5BackgroundRequest(CH5VideoUtils.VIDEO_ACTION.REFILL);
        this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
    }
    videoIntersectionObserver() {
        if (this.elementIntersectionEntry.intersectionRatio >= this.INTERSECTION_RATIO_VALUE && this.playValue && this.show) {
            this.validateAndAttachSnapshot();
            this.videoInViewPort();
        }
        else {
            this.videoNotInViewport();
        }
        if (this.elementIntersectionEntry.intersectionRatio > 0.1 && this.playValue) {
            this.addTouchEvent();
        }
        else {
            this.stopAndRefill();
            this.removeTouchEvent();
        }
    }
    videoInViewPort() {
        this.snapshotImage.startLoadingSnapshot();
        clearTimeout(this.isSwipeDebounce);
        this.isSwipeDebounce = setTimeout(() => {
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.START);
        }, 300);
    }
    videoNotInViewport() {
        if (this.isFullScreen) {
            return;
        }
        this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        this.ch5BackgroundRequest(CH5VideoUtils.VIDEO_ACTION.REFILL);
    }
    videoStopObjJSON(actionType, uId) {
        const retObj = {
            action: actionType,
            id: uId
        };
        this.logger.log('Stop Video Request:', retObj);
        this.sendEvent(this.sendEventState, 3);
        return retObj;
    }
    videoStartObjJSON(actionType) {
        let { left: xPosition, top: yPosition, width, height } = this._elContainer.getBoundingClientRect();
        if (actionType === CH5VideoUtils.VIDEO_ACTION.FULLSCREEN || this.isFullScreen) {
            if (actionType === CH5VideoUtils.VIDEO_ACTION.FULLSCREEN) {
                actionType = CH5VideoUtils.VIDEO_ACTION.RESIZE;
            }
            xPosition = 0;
            yPosition = 0;
            width = window.innerWidth;
            height = window.innerHeight;
            if (window.innerWidth < window.innerHeight) {
                if (this.aspectRatio === '4:3') {
                    width = window.innerWidth;
                    height = (window.innerWidth / 4) * 3;
                    yPosition = (window.innerHeight - height) / 2;
                }
                else {
                    width = window.innerWidth;
                    height = (window.innerWidth / 16) * 9;
                    yPosition = (window.innerHeight - height) / 2;
                }
            }
            else {
                if (this.aspectRatio === '4:3') {
                    height = window.innerHeight;
                    width = (window.innerHeight / 3) * 4;
                    if (width > window.innerWidth) {
                        width = window.innerWidth;
                    }
                    xPosition = (window.innerWidth - width) / 2;
                }
                else {
                    height = window.innerHeight;
                    width = (window.innerHeight / 9) * 16;
                    if (width > window.innerWidth) {
                        width = window.innerWidth;
                    }
                    xPosition = (window.innerWidth - width) / 2;
                }
            }
        }
        const retObj = {
            action: actionType,
            id: this.ch5UId,
            credentials: {
                userid: this.userId,
                password: this.password
            },
            source: {
                type: this.sourceType,
                url: this.sourceType.toLowerCase() === 'hdmi' ? 'http:hdmi' : this.url
            },
            location: {
                top: Math.ceil(yPosition),
                left: Math.ceil(xPosition),
                width: Math.ceil(width),
                height: Math.ceil(height),
                z: 0
            },
            alphablend: !this.isFullScreen,
            starttime: new Date().getMilliseconds(),
            endtime: new Date().getMilliseconds() + 2000,
            timing: "linear"
        };
        this.sendEvent(this.sendEventResolution, width + "x" + height);
        this.logger.log("Start Video Request:", retObj);
        return retObj;
    }
    validateVideoUrl(videoUrl) {
        return (videoUrl.startsWith('rtsp://') || videoUrl.startsWith('http://') || videoUrl.startsWith('https://'));
    }
    publishVideo(actionType) {
        switch (actionType) {
            case CH5VideoUtils.VIDEO_ACTION.START:
                if ((this.url === "" || this.validateVideoUrl(this.url) === false) && this.sourceType.toLowerCase() === 'network') {
                    this.checkUrlAndPublishVideo();
                }
                else {
                    this.isVideoPublished = true;
                    publishEvent('o', 'Csig.video.request', this.videoStartObjJSON(CH5VideoUtils.VIDEO_ACTION.START));
                }
                break;
            case CH5VideoUtils.VIDEO_ACTION.STOP:
                if (this.isVideoPublished === false) {
                    return;
                }
                window.clearTimeout(this.stopDebounce);
                this.stopDebounce = window.setTimeout(() => publishEvent('o', 'Csig.video.request', this.videoStopObjJSON(actionType, this.ch5UId)), 300);
                break;
            case CH5VideoUtils.VIDEO_ACTION.RESIZE:
                if (this.isVideoPublished === false) {
                    return;
                }
                publishEvent('o', 'Csig.video.request', this.videoStartObjJSON(actionType));
                break;
            case CH5VideoUtils.VIDEO_ACTION.FULLSCREEN:
                if (this.isVideoPublished === false) {
                    return;
                }
                publishEvent('o', 'Csig.video.request', this.videoStartObjJSON(actionType));
                break;
            default:
                break;
        }
        this.lastRequestStatus = actionType;
    }
    _videoResponse(response) {
        if (typeof response === 'string') {
            this.responseObj = JSON.parse(response);
        }
        else {
            this.responseObj = response;
        }
        const isMyObjectEmpty = !Object.keys(response).length;
        if (this.responseObj.id !== this.ch5UId || isMyObjectEmpty) {
            return;
        }
        if (this.responseObj.id === -1 || !this.responseObj.id) {
            return;
        }
        if (this.ch5UId !== this.responseObj.id) {
            return;
        }
        if (this.responseObj.status === 'queued') {
            return;
        }
        this.logger.log("Video Response:", this.responseObj);
        this.lastResponseStatus = this.responseObj.status.toLowerCase();
        if (!(this.lastResponseStatus === CH5VideoUtils.VIDEO_ACTION.STARTED || (this.lastRequestStatus === CH5VideoUtils.VIDEO_ACTION.RESIZE && this.lastResponseStatus === CH5VideoUtils.VIDEO_ACTION.RESIZED))) {
            this._fullScreenIcon.classList.add('hide');
        }
        switch (this.responseObj.status.toLowerCase()) {
            case 'started':
                this.ch5BackgroundRequest('started');
                this.sendEvent(this.sendEventState, 2);
                break;
            case 'stopped':
                this.ch5BackgroundRequest('stop');
                this.sendEvent(this.sendEventState, 1);
                break;
            case 'error':
                this.ch5BackgroundRequest('error');
                this.sendEvent(this.sendEventState, 7);
                break;
            case 'connecting':
                this.sendEvent(this.sendEventState, 4);
                break;
            case 'retrying':
                this.sendEvent(this.sendEventState, 6);
                this.retryCount = this.retryCount + 1;
                this.sendEvent(this.sendEventRetryCount, this.retryCount);
                break;
            case 'buffering':
                this.sendEvent(this.sendEventState, 5);
                break;
            default:
                this.logger.log('video is in ' + this.responseObj.status.toLowerCase() + ' state');
                break;
        }
        this.sendEvent(this.sendEventErrorCode, Number(this.responseObj.statuscode));
        this.sendEvent(this.sendEventErrorMessage, this.videoErrorMessages.get(Number(this.responseObj.statuscode)) || 'Unknown Error Message');
    }
    _errorResponse(error) {
        this.info("Ch5Video - Error when the video response", error);
    }
    sendEvent(signalName, signalValue) {
        var _a, _b, _c, _d;
        if ((signalName === null || signalName === void 0 ? void 0 : signalName.trim().length) === 0 || signalName === null || signalName === undefined) {
            return;
        }
        switch (typeof signalValue) {
            case 'boolean':
                (_a = Ch5SignalFactory.getInstance().getBooleanSignal(signalName)) === null || _a === void 0 ? void 0 : _a.publish(true);
                (_b = Ch5SignalFactory.getInstance().getBooleanSignal(signalName)) === null || _b === void 0 ? void 0 : _b.publish(false);
                break;
            case 'string':
                (_c = Ch5SignalFactory.getInstance().getStringSignal(signalName)) === null || _c === void 0 ? void 0 : _c.publish(signalValue);
                break;
            case 'number':
                (_d = Ch5SignalFactory.getInstance().getNumberSignal(signalName)) === null || _d === void 0 ? void 0 : _d.publish(signalValue);
                break;
        }
    }
    ch5BackgroundRequest(actionType) {
        switch (actionType) {
            case 'nourl':
                this.clearBackgroundOfVideoWrapper(false);
                this.snapshotImage.stopLoadingSnapshot();
                this.sendEvent(this.sendEventSnapshotStatus, 0);
                this._elContainer.style.borderBottom = '1rem solid #828282';
                break;
            case 'refill':
                if (this.isVideoPublished === false) {
                    return;
                }
                this.ch5BackgroundAction('refill');
                break;
            case 'resize':
                this.ch5BackgroundAction('resize');
                break;
            case 'started':
                this.clearBackgroundOfVideoWrapper(true);
                this._elContainer.style.removeProperty('border-bottom');
                this.snapshotImage.stopLoadingSnapshot();
                this.sendEvent(this.sendEventSnapshotStatus, 0);
                this.ch5BackgroundAction('started');
                break;
            case 'stop':
                this.clearBackgroundOfVideoWrapper(false);
                this._elContainer.style.removeProperty('border-bottom');
                this.ch5BackgroundAction('stop');
                break;
            case 'error':
                this.clearBackgroundOfVideoWrapper(false);
                this._elContainer.style.borderBottom = '1rem solid #CF142B';
                break;
            default:
                break;
        }
    }
    ch5BackgroundAction(actionStatus) {
        const videoInfo = {
            action: actionStatus,
            id: this.getCrId(),
            top: this._elContainer.getBoundingClientRect().top,
            left: this._elContainer.getBoundingClientRect().left,
            width: this._elContainer.getBoundingClientRect().width,
            height: this._elContainer.getBoundingClientRect().height,
        };
        if (videoInfo.id === '') {
            return;
        }
        this.parentCh5Background.length = 0;
        this.getParentBackground(this);
        Array.from(this.parentCh5Background).forEach(bg => bg.videoBGRequest(videoInfo));
    }
    clearBackgroundOfVideoWrapper(isShowVideoBehind) {
        this._elContainer.style.background = isShowVideoBehind ? 'transparent' : 'black';
    }
    _manageControls() {
        this.sendEvent(this.sendEventOnClick, true);
        if (this.isFullScreen) {
            this._elContainer.removeEventListener('touchmove', this.handleTouchEventOnFullScreen, false);
            this._exitFullScreen();
            return;
        }
        if (this.lastResponseStatus === CH5VideoUtils.VIDEO_ACTION.STARTED || (this.lastRequestStatus === CH5VideoUtils.VIDEO_ACTION.RESIZE && this.lastResponseStatus === CH5VideoUtils.VIDEO_ACTION.RESIZED)) {
            this._fullScreenIcon.classList.remove('hide');
        }
        clearTimeout(this.controlTimer);
        this.controlTimer = setTimeout(() => {
            this._fullScreenIcon.classList.add('hide');
        }, 10000);
    }
    toggleFullScreen(event) {
        this.isFullScreen = true;
        this.orientationChanged = false;
        this._elContainer.addEventListener('touchmove', this.handleTouchEventOnFullScreen, { passive: true });
        this.classList.add('full-screen');
        this._fullScreenIcon.classList.add('hide');
        document.body.classList.add('ch5-video-fullscreen');
        this.publishVideo(CH5VideoUtils.VIDEO_ACTION.FULLSCREEN);
        event.stopPropagation();
    }
    _exitFullScreen() {
        this.isFullScreen = false;
        this.classList.remove('full-screen');
        document.body.classList.remove('ch5-video-fullscreen');
        if (this.orientationChanged) {
            this.ch5BackgroundRequest('refill');
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
            this.videoIntersectionObserver();
        }
        else {
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.RESIZE);
            setTimeout(() => { this.ch5BackgroundRequest('resize'); }, 100);
        }
    }
    handleTouchEventOnFullScreen(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    }
    handleMultiVideo() {
        var _a;
        const indexId = ((_a = this.getAttribute('indexid')) === null || _a === void 0 ? void 0 : _a.trim()) + '' || this.indexId;
        for (let i = 0; i < 32; i++) {
            const url = this.receiveStateURL.replace(`{{${indexId}}}`, i.toString());
            const userId = this.receiveStateUserId.replace(`{{${indexId}}}`, i.toString());
            const password = this.receiveStatePassword.replace(`{{${indexId}}}`, i.toString());
            const sourceType = this.receiveStateSourceType.replace(`{{${indexId}}}`, i.toString());
            const snapshotURL = this.receiveStateSnapshotURL.replace(`{{${indexId}}}`, i.toString());
            const snapshotUserId = this.receiveStateSnapshotUserId.replace(`{{${indexId}}}`, i.toString());
            const snapshotPassword = this.receiveStateSnapshotPassword.replace(`{{${indexId}}}`, i.toString());
            const snapshotRefreshRate = this.receiveStateSnapshotRefreshRate.replace(`{{${indexId}}}`, i.toString());
            this.signalHolder.push({
                url: { signalState: "", url, value: null },
                userId: { signalState: "", userId, value: null },
                password: { signalState: "", password, value: null },
                sourceType: { signalState: "", sourceType, value: null },
                snapshotURL: { signalState: "", snapshotURL, value: null },
                snapshotUserId: { signalState: "", snapshotUserId, value: null },
                snapshotPassword: { signalState: "", snapshotPassword, value: null },
                snapshotRefreshRate: { signalState: "", snapshotRefreshRate, value: null }
            });
            if (url) {
                const urlSignalResponse = this.setSignalByString(url);
                if (!_.isNil(urlSignalResponse)) {
                    this.signalHolder[i].url.signalState = urlSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].url.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.urlCB(newValue);
                        }
                    });
                }
            }
            if (userId) {
                const userIdSignalResponse = this.setSignalByString(userId);
                if (!_.isNil(userIdSignalResponse)) {
                    this.signalHolder[i].userId.signalState = userIdSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].userId.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.userIdCB(newValue);
                        }
                    });
                }
            }
            if (password) {
                const passwordSignalResponse = this.setSignalByString(password);
                if (!_.isNil(passwordSignalResponse)) {
                    this.signalHolder[i].password.signalState = passwordSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].password.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.passwordCB(newValue);
                        }
                    });
                }
            }
            if (sourceType) {
                const sourceTypeSignalResponse = this.setSignalByString(sourceType);
                if (!_.isNil(sourceTypeSignalResponse)) {
                    this.signalHolder[i].sourceType.signalState = sourceTypeSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].sourceType.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.sourceTypeCB(newValue);
                        }
                    });
                }
            }
            if (snapshotURL) {
                const snapshotURLSignalResponse = this.setSignalByString(snapshotURL);
                if (!_.isNil(snapshotURLSignalResponse)) {
                    this.signalHolder[i].snapshotURL.signalState = snapshotURLSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].snapshotURL.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.snapshotURLCB(newValue);
                        }
                    });
                }
            }
            if (snapshotUserId) {
                const snapshotUserIdSignalResponse = this.setSignalByString(snapshotUserId);
                if (!_.isNil(snapshotUserIdSignalResponse)) {
                    this.signalHolder[i].snapshotUserId.signalState = snapshotUserIdSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].snapshotUserId.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.snapshotUserIdCB(newValue);
                        }
                    });
                }
            }
            if (snapshotPassword) {
                const snapshotPasswordSignalResponse = this.setSignalByString(snapshotPassword);
                if (!_.isNil(snapshotPasswordSignalResponse)) {
                    this.signalHolder[i].snapshotPassword.signalState = snapshotPasswordSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].snapshotPassword.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.snapshotPasswordCB(newValue);
                        }
                    });
                }
            }
            if (snapshotRefreshRate) {
                const snapshotRefreshRateSignalResponse = this.setSignalByNumber(snapshotRefreshRate);
                if (!_.isNil(snapshotRefreshRateSignalResponse)) {
                    this.signalHolder[i].snapshotRefreshRate.signalState = snapshotRefreshRateSignalResponse.subscribe((newValue) => {
                        this.signalHolder[i].snapshotRefreshRate.value = newValue;
                        if (this.selectedVideo === i && this.maxVideoCount > this.selectedVideo) {
                            this.snapshotRefreshRateCB(newValue);
                        }
                    });
                }
            }
        }
    }
    setSignalByNumber(value) {
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(value);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    setSignalByString(value) {
        const receiveLabelSigName = Ch5Signal.getSubscriptionSignalName(value);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(receiveLabelSigName);
        if (receiveSignal === null) {
            return null;
        }
        return receiveSignal;
    }
    addTouchEvent() {
        this.videoTouchHandler = new Ch5VideoTouchManager({
            onTouchStartHandler: this.touchBeginHandler.bind(this),
            onTouchMoveHandler: this.touchMoveHandler.bind(this),
            onTouchEndHandler: this.touchEndHandler.bind(this),
            onTouchCancelHandler: this.touchEndHandler.bind(this),
            pollingDuration: 300,
            componentID: this.getCrId()
        });
    }
    removeTouchEvent() {
        if (!!this.videoTouchHandler &&
            this.videoTouchHandler !== null &&
            typeof (this.videoTouchHandler) !== 'undefined' &&
            this.videoTouchHandler.destructor) {
            this.videoTouchHandler.destructor();
        }
    }
    touchBeginHandler() {
        const boundedRect = this._elContainer.getBoundingClientRect();
        this.touchCoordinates.startX = boundedRect.left;
        this.touchCoordinates.startY = boundedRect.top;
        this.isTouchInProgress = false;
    }
    touchMoveHandler() {
        if (!this.isTouchInProgress) {
            const boundedRect = this._elContainer.getBoundingClientRect();
            this.touchCoordinates.endX = boundedRect.left;
            this.touchCoordinates.endY = boundedRect.top;
            if (Math.abs(this.touchCoordinates.startX - this.touchCoordinates.endX) > this.swipeDeltaCheckNum ||
                Math.abs(this.touchCoordinates.startY - this.touchCoordinates.endY) > this.swipeDeltaCheckNum) {
                this.isTouchInProgress = true;
                this.clearBackgroundOfVideoWrapper(false);
                this.ch5BackgroundRequest(CH5VideoUtils.VIDEO_ACTION.STOP);
                this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
            }
        }
    }
    touchEndHandler() {
        this.isTouchInProgress ? setTimeout(() => this.videoIntersectionObserver(), 100) : this.isTouchInProgress = false;
    }
    validateAndAttachSnapshot() {
        if (this.snapshotURL.trim() === '') {
            this.sendEvent(this.sendEventSnapshotStatus, 0);
        }
        else if (this.snapshotURL.trim() !== '' && this.url !== '') {
            this.snapshotImage.url = this.snapshotURL;
            this.snapshotImage.userId = this.snapshotUserId;
            this.snapshotImage.password = this.snapshotPassword;
            this.snapshotImage.refreshRate = this.snapshotRefreshRate;
            this.snapshotImage.sendEventSnapshotStatus = this.sendEventSnapshotStatus;
            this.snapshotImage.sendEventSnapshotLastUpdateTime = this.sendEventSnapshotLastUpdateTime;
            if (this.lastResponseStatus !== CH5VideoUtils.VIDEO_ACTION.STARTED) {
                if (this.playValue === true) {
                    this.snapshotImage.startLoadingSnapshot();
                }
                if (this.snapshotImage.getImage().isConnected === false) {
                    this._elContainer.appendChild(this.snapshotImage.getImage());
                }
            }
        }
    }
    getParentBackground(node) {
        var _a;
        if (node && node.parentElement) {
            Array.from((_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.children).forEach((children) => {
                if (children.nodeName.toLowerCase() === 'ch5-background') {
                    this.parentCh5Background.push(children);
                }
            });
            this.getParentBackground(node.parentElement);
        }
    }
    checkUrlAndPublishVideo() {
        if (this.url === '' && this.sourceType.toLowerCase() === 'network') {
            this.ch5BackgroundRequest('nourl');
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        }
        else if (this.validateVideoUrl(this.url) === false && this.sourceType.toLowerCase() === 'network' && !this.hasAttribute('receiveStateSourceType')) {
            this.sendEvent(this.sendEventErrorMessage, 'Invalid URL');
            this.sendEvent(this.sendEventErrorCode, -9002);
            this.ch5BackgroundRequest(CH5VideoUtils.VIDEO_ACTION.ERROR);
            this.publishVideo(CH5VideoUtils.VIDEO_ACTION.STOP);
        }
        else {
            this.videoIntersectionObserver();
        }
    }
    setErrorMessages() {
        this.videoErrorMessages.set(0, "success");
        this.videoErrorMessages.set(1, "HDMI no sync");
        this.videoErrorMessages.set(2, "DM no stream");
        this.videoErrorMessages.set(-1, "connection refused / camera offline");
        this.videoErrorMessages.set(-2, "no network");
        this.videoErrorMessages.set(-1001, "Credentials required or invalid");
        this.videoErrorMessages.set(-1002, "Hostname invalid");
        this.videoErrorMessages.set(-1003, "Unsupported codec");
        this.videoErrorMessages.set(-9001, "Unsupported source type");
        this.videoErrorMessages.set(-9002, "Invalid URL");
        this.videoErrorMessages.set(-9003, "Request for greater than maximum simultaneous sessions per source type");
        this.videoErrorMessages.set(-9004, "Request for greater than maximum simultaneous sessions per device");
        this.videoErrorMessages.set(-9007, "Unknown Error Message");
        this.videoErrorMessages.set(-9008, "HDCP error when using HDMI input");
    }
    urlCB(newValue) {
        this._ch5Properties.setForSignalResponse("url", newValue, () => {
            this.sendEvent(this.sendEventSelectionURL, this.url);
            this.checkUrlAndPublishVideo();
        });
    }
    userIdCB(newValue) {
        this._ch5Properties.setForSignalResponse("userId", newValue, () => {
            this.videoIntersectionObserver();
        });
    }
    passwordCB(newValue) {
        this._ch5Properties.setForSignalResponse("password", newValue, () => {
            this.videoIntersectionObserver();
        });
    }
    sourceTypeCB(newValue) {
        this._ch5Properties.setForSignalResponse("sourceType", newValue, () => {
            this.sendEvent(this.sendEventSelectionSourceType, this.sourceType);
            this.videoIntersectionObserver();
        });
    }
    snapshotURLCB(newValue) {
        this._ch5Properties.setForSignalResponse("snapshotURL", newValue, () => {
            this.sendEvent(this.sendEventSnapshotURL, this.snapshotURL);
            this.validateAndAttachSnapshot();
        });
    }
    snapshotUserIdCB(newValue) {
        this._ch5Properties.setForSignalResponse("snapshotUserId", newValue, () => {
            this.validateAndAttachSnapshot();
        });
    }
    snapshotPasswordCB(newValue) {
        this._ch5Properties.setForSignalResponse("snapshotPassword", newValue, () => {
            this.validateAndAttachSnapshot();
        });
    }
    snapshotRefreshRateCB(newValue) {
        this._ch5Properties.setForSignalResponse("snapshotRefreshRate", newValue, () => {
            this.validateAndAttachSnapshot();
        });
    }
    clearOldSubscriptionNumber(signalValue, signalState) {
        const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldReceiveStateSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(signalState);
        }
    }
    clearOldSubscriptionString(signalValue, signalState) {
        const oldReceiveStateSigName = Ch5Signal.getSubscriptionSignalName(signalValue);
        const oldSignal = Ch5SignalFactory.getInstance().getBooleanSignal(oldReceiveStateSigName);
        if (oldSignal !== null) {
            oldSignal.unsubscribe(signalState);
        }
    }
    clearMultiSignal() {
        this.signalHolder.forEach((obj) => {
            this.clearOldSubscriptionString(obj.url.signalValue, obj.url.signalState);
            this.clearOldSubscriptionString(obj.userId.signalValue, obj.userId.signalState);
            this.clearOldSubscriptionString(obj.password.signalValue, obj.password.signalState);
            this.clearOldSubscriptionString(obj.sourceType.signalValue, obj.sourceType.signalState);
            this.clearOldSubscriptionString(obj.snapshotURL.signalValue, obj.snapshotURL.signalState);
            this.clearOldSubscriptionString(obj.snapshotUserId.signalValue, obj.snapshotUserId.signalState);
            this.clearOldSubscriptionString(obj.snapshotPassword.signalValue, obj.snapshotPassword.signalState);
            this.clearOldSubscriptionNumber(obj.snapshotRefreshRate.signalValue, obj.snapshotRefreshRate.signalState);
        });
    }
}
Ch5Video.SVG_ICONS = {
    FULLSCREEN_ICON: '<svg xmlns="http://www.w3.org/2000/svg" class="svgIconStyle" class="svgIconStyle" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
};
Ch5Video.ASPECT_RATIO = ['16:9', '4:3'];
Ch5Video.SOURCE_TYPE = ['Network', 'HDMI'];
Ch5Video.SIZE = ['regular', 'x-small', 'small', 'large', 'x-large', 'xx-large'];
Ch5Video.COMPONENT_DATA = {
    ASPECT_RATIO: {
        default: Ch5Video.ASPECT_RATIO[0],
        values: Ch5Video.ASPECT_RATIO,
        key: 'aspectRatio',
        attribute: 'aspectRatio',
        classListPrefix: '--aspect-ratio-'
    },
    SIZE: {
        default: Ch5Video.SIZE[0],
        values: Ch5Video.SIZE,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size-'
    }
};
Ch5Video.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestateplay: { direction: "state", booleanJoin: 1, contractName: true }, receivestateselect: { direction: "state", numericJoin: 1, contractName: true }, receivestateurl: { direction: "state", stringJoin: 1, contractName: true }, receivestatesourcetype: { direction: "state", stringJoin: 1, contractName: true }, receivestateuserid: { direction: "state", stringJoin: 1, contractName: true }, receivestatepassword: { direction: "state", stringJoin: 1, contractName: true }, receivestatesnapshoturl: { direction: "state", stringJoin: 1, contractName: true }, receivestatesnapshotrefreshrate: { direction: "state", numericJoin: 1, contractName: true }, receivestatesnapshotuserid: { direction: "state", stringJoin: 1, contractName: true }, receivestatesnapshotpassword: { direction: "state", stringJoin: 1, contractName: true }, receivestatevideocount: { direction: "state", numericJoin: 1, contractName: true }, sendeventonclick: { direction: "event", booleanJoin: 1, contractName: true }, sendeventselectionchange: { direction: "event", numericJoin: 1, contractName: true }, sendeventselectionsourcetype: { direction: "event", stringJoin: 1, contractName: true }, sendeventselectionurl: { direction: "event", stringJoin: 1, contractName: true }, sendeventsnapshoturl: { direction: "event", stringJoin: 1, contractName: true }, sendeventstate: { direction: "event", numericJoin: 1, contractName: true }, sendeventerrorcode: { direction: "event", numericJoin: 1, contractName: true }, sendeventerrormessage: { direction: "event", stringJoin: 1, contractName: true }, sendeventretrycount: { direction: "event", numericJoin: 1, contractName: true }, sendeventresolution: { direction: "event", stringJoin: 1, contractName: true }, sendeventsnapshotstatus: { direction: "event", numericJoin: 1, contractName: true }, sendeventsnapshotlastupdatetime: { direction: "event", stringJoin: 1, contractName: true } });
Ch5Video.COMPONENT_PROPERTIES = [
    {
        default: "",
        name: "indexId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5Video.ASPECT_RATIO[0],
        enumeratedValues: Ch5Video.ASPECT_RATIO,
        name: "aspectRatio",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Video.ASPECT_RATIO[0],
        isObservableProperty: true
    },
    {
        default: false,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: "",
        name: "url",
        nameForSignal: "receiveStateURL",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5Video.SOURCE_TYPE[0],
        enumeratedValues: Ch5Video.SOURCE_TYPE,
        name: "sourceType",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateSourceType",
        type: "enum",
        valueOnAttributeEmpty: Ch5Video.SOURCE_TYPE[0],
        isObservableProperty: true
    },
    {
        default: "",
        name: "userId",
        nameForSignal: "receiveStateUserId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "password",
        nameForSignal: "receiveStatePassword",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "snapshotURL",
        nameForSignal: "receiveStateSnapshotURL",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: 5,
        name: "snapshotRefreshRate",
        removeAttributeOnNull: true,
        nameForSignal: "receiveStateSnapshotRefreshRate",
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 0,
            max: 60,
            conditionalMin: 0,
            conditionalMax: 60,
            conditionalMinValue: 0,
            conditionalMaxValue: 60
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "snapshotUserId",
        nameForSignal: "receiveStateSnapshotUserId",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        name: "snapshotPassword",
        nameForSignal: "receiveStateSnapshotPassword",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: Ch5Video.SIZE[0],
        enumeratedValues: Ch5Video.SIZE,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Video.SIZE[0],
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStatePlay",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
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
        name: "receiveStateSelect",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateURL",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSourceType",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateUserId",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStatePassword",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSnapshotURL",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSnapshotRefreshRate",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSnapshotUserId",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateSnapshotPassword",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateVideoCount",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnClick",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSelectionChange",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSelectionSourceType",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSelectionURL",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSnapshotURL",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventState",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventErrorCode",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventErrorMessage",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventRetryCount",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventResolution",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSnapshotStatus",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventSnapshotLastUpdateTime",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
];
Ch5Video.ELEMENT_NAME = 'ch5-video';
Ch5Video.registerCustomElement();
Ch5Video.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXZpZGVvL2NoNS12aWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBR25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUV2QixNQUFNLE9BQU8sUUFBUyxTQUFRLFNBQVM7SUFxZHJDLElBQVcsT0FBTyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFD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