import { Ch5Common } from './../ch5-common/ch5-common';
import { Ch5Signal, Ch5SignalFactory, unsubscribeState, publishEvent } from '../ch5-core';
import { Ch5CoreIntersectionObserver } from "../ch5-core/ch5-core-intersection-observer";
import { resizeObserver } from '../ch5-core/resize-observer';
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import _ from 'lodash';
export class Ch5Background extends Ch5Common {
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Background.ELEMENT_NAME, Ch5Background.SIGNAL_ATTRIBUTE_TYPES);
    }
    get url() {
        return this._url;
    }
    set url(value) {
        if (this._url !== value && !_.isNil(value) && value !== "") {
            this._url = value;
            this.getBackgroundUrl(this._url);
            this.setAttribute('url', this._url);
        }
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        if (!this.hasAttribute('url') && !this.hasAttribute('receivestateurl')) {
            this._backgroundColor = (value.trim() !== "") ? this.imgBackgroundColor : 'value';
            this._backgroundColor = value;
            this.getBackgroundColor(this._backgroundColor);
            this.setAttribute('backgroundcolor', this._backgroundColor);
        }
    }
    get repeat() {
        return this._repeat;
    }
    set repeat(value) {
        if (!_.isNil(value)) {
            if (this._repeat !== value) {
                if (Ch5Background.REPEAT.indexOf(value) >= 0) {
                    this._repeat = value;
                    this.setAttribute('repeat', this._repeat);
                }
                else {
                    this._repeat = null;
                    this.removeAttribute('repeat');
                }
            }
        }
        else {
            this._repeat = null;
            this.removeAttribute('repeat');
        }
        this.updateBackground();
    }
    get scale() {
        return this._scale;
    }
    set scale(value) {
        if (this._scale !== value) {
            if (Ch5Background.SCALE.indexOf(value) >= 0) {
                this._scale = value;
            }
            else {
                this._scale = Ch5Background.SCALE[0];
            }
            this.setAttribute('scale', this._scale);
        }
    }
    get refreshRate() {
        return this._refreshRate;
    }
    set refreshRate(value) {
        if (isNaN(value)) {
            value = Ch5Background.REFRESHRATE;
        }
        else {
            value = Number(value);
        }
        if (value < 10) {
            value = 10;
        }
        else if (value > 604800) {
            value = 604800;
        }
        if (this._refreshRate !== value) {
            this._refreshRate = value;
            this.setAttribute('refreshrate', this._refreshRate.toString());
        }
    }
    get videoCrop() {
        return this._videoCrop;
    }
    set videoCrop(value) {
        if (this._videoCrop !== value) {
            this._videoCrop = value;
            this.setAttribute('videocrop', this._videoCrop);
        }
    }
    get imgBackgroundColor() {
        return this._imgBackgroundColor;
    }
    set imgBackgroundColor(value) {
        if (this._imgBackgroundColor !== value) {
            if (Ch5Background.IMGBGCOLOR) {
                this._imgBackgroundColor = value;
            }
            else {
                this._imgBackgroundColor = Ch5Background.IMGBGCOLOR;
            }
            this.setAttribute('imgbackgroundcolor', this._imgBackgroundColor);
        }
    }
    get transitionEffect() {
        return this._transitionEffect;
    }
    set transitionEffect(value) {
        if (this._transitionEffect !== value) {
            this._transitionEffect = value;
            this.setAttribute('transitioneffect', this._transitionEffect);
        }
    }
    get transitionDuration() {
        return this._transitionDuration;
    }
    set transitionDuration(value) {
        if (this._transitionDuration !== value) {
            this._transitionDuration = value;
            this.setAttribute('transitionduration', this._transitionDuration);
        }
        let countCharacter = 0;
        Array.from(this._transitionDuration).forEach((attribute) => {
            if (attribute.toUpperCase() !== attribute.toLowerCase()) {
                countCharacter++;
            }
        });
        if (countCharacter > 1) {
            this.setAttribute('transitionduration', '1s');
        }
        const specialChars = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/);
        if (specialChars.test(this._transitionDuration) === true) {
            this._transitionDuration = '1s';
            this.setAttribute('transitionduration', this._transitionDuration);
        }
        if (this._transitionDuration === '') {
            this.setAttribute('transitionduration', '1s');
        }
    }
    set receiveStateRefreshRate(value) {
        this.info("set receiveStateRefreshRate('" + value + "')");
        if (!value || this._receiveStateRefreshRate === value) {
            return;
        }
        if (this._receiveStateRefreshRate) {
            const oldReceiveIntervalSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateRefreshRate);
            const oldSignal = Ch5SignalFactory.getInstance().getNumberSignal(oldReceiveIntervalSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveRefreshRate);
            }
        }
        this._receiveStateRefreshRate = value;
        this.setAttribute('receivestaterefreshrate', value);
        const receiveIntervalSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateRefreshRate);
        const receiveSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveIntervalSigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveRefreshRate = receiveSignal.subscribe((newValue) => {
            if (Number(newValue) !== this.refreshRate) {
                this.setAttribute('refreshrate', String(newValue));
            }
        });
    }
    get receiveStateRefreshRate() {
        return this._attributeValueAsString('receivestaterefreshrate');
    }
    set receiveStateUrl(value) {
        this.info('set receiveStateUrl(\'' + value + '\')');
        if ('' === value
            || this._sigNameReceiveUrl === value
            || null === value
            || undefined === value) {
            return;
        }
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
            if (newValue !== this._url) {
                this.setAttribute('url', newValue);
            }
        });
    }
    get receiveStateUrl() {
        return this._attributeValueAsString('receivestateurl');
    }
    set receiveStateBackgroundColor(value) {
        this.info("set receivestatebackgroundcolor('" + value + "')");
        if (!value || this._receiveStateBackgroundColor === value) {
            return;
        }
        if (this._receiveStateBackgroundColor) {
            const oldReceiveBackgroundColorSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateBackgroundColor);
            const oldSignal = Ch5SignalFactory.getInstance().getStringSignal(oldReceiveBackgroundColorSigName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveBackgroundColor);
            }
        }
        this._receiveStateBackgroundColor = value;
        this.setAttribute('receivestatebackgroundcolor', value);
        const receiveBackgroundColorSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateBackgroundColor);
        const receiveSignal = Ch5SignalFactory.getInstance().getStringSignal(receiveBackgroundColorSigName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveBackgroundColor = receiveSignal.subscribe((newValue) => {
            if (newValue !== this.backgroundColor) {
                this.setAttribute('backgroundcolor', newValue);
            }
        });
    }
    get receiveStateBackgroundColor() {
        return this._attributeValueAsString('receivestatebackgroundcolor');
    }
    constructor() {
        super();
        this.primaryCssClass = 'ch5-background';
        this.parentCssClassPrefix = '--parent';
        this.canvasCssClassPrefix = '--canvas';
        this.isCanvasCreated = false;
        this._elCanvas = {};
        this._prevCanvasList = [];
        this._imgUrls = [];
        this._elImages = [];
        this._elBackupImages = [];
        this._bgColors = [];
        this._bgIdx = 0;
        this._videoRes = {};
        this._isVisible = false;
        this._videoDimensions = [];
        this._isRefilled = true;
        this.isInitialized = false;
        this.VIDEO_ACTION = {
            STARTED: 'started',
            STOP: 'stop',
            STOPPED: 'stopped',
            RESIZE: 'resize',
            REFILL: 'refill',
            SNAPSHOT: 'snapshot',
            MARK: 'mark',
            NOURL: 'nourl',
            ERROR: 'error'
        };
        this.MARK_COLORS = new Map();
        this._url = '';
        this._backgroundColor = Ch5Background.IMGBGCOLOR;
        this._repeat = null;
        this._scale = Ch5Background.SCALE[0];
        this._refreshRate = Ch5Background.REFRESHRATE;
        this._videoCrop = '';
        this._imgBackgroundColor = '';
        this._transitionEffect = 'ease';
        this._transitionDuration = '';
        this._receiveStateRefreshRate = '';
        this._subReceiveRefreshRate = '';
        this._receiveStateUrl = '';
        this._sigNameReceiveUrl = '';
        this._subReceiveUrl = '';
        this._receiveStateBackgroundColor = '';
        this._subReceiveBackgroundColor = '';
        this._videoSubscriptionId = '';
        this._canvasSubscriptionId = '';
        customElements.whenDefined('ch5-background').then(() => {
            this.classList.add(this.primaryCssClass);
            if (this.parentElement && !this._isVisible) {
                this.parentElement.classList.add(this.primaryCssClass + this.parentCssClassPrefix);
            }
            this.MARK_COLORS.set('mark', '#FFBF00');
            this.MARK_COLORS.set('error', '#CF142B');
            this.MARK_COLORS.set('nourl', '#828282');
            this.MARK_COLORS.set('stop', '#828282');
            if (this.parentElement) {
                resizeObserver(this.parentElement, this.updateCanvasDimensions.bind(this));
            }
            this.info("From connectedCallback of ch5-background");
        });
    }
    connectedCallback() {
        this.initAttributes();
        this.setAttribute('data-ch5-id', this.getCrId());
        customElements.whenDefined('ch5-background').then(() => {
            Ch5CoreIntersectionObserver.getInstance().observe(this, () => {
                if (this.elementIsInViewPort) {
                    if (!this._isVisible) {
                        if (this.parentElement) {
                            this.parentElement.classList.add(this.primaryCssClass + this.parentCssClassPrefix);
                        }
                        this.updateCanvasDimensions();
                        this._isVisible = true;
                    }
                }
                else {
                    this._isVisible = false;
                }
                this.isInitialized = true;
            });
        });
    }
    isInViewport(elId) {
        const el = document.querySelector(`[data-ch5-id="${elId}"]`);
        if (el) {
            const rect = el.getBoundingClientRect();
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth));
        }
        return false;
    }
    videoBGRequest(request) {
        this.info("In videoBGRequest(): Video Tag Id -> " + request.id + " action: " + request.action);
        if (!this.isInitialized || !this.elementIsInViewPort || request.id === '') {
            return;
        }
        if (request && Object.keys(request).length) {
            const tempObj = Object.assign({}, request);
            this.setAttribute('videocrop', JSON.stringify(tempObj));
            if (request.action === this.VIDEO_ACTION.REFILL && !this._isRefilled) {
                if (!this.isInViewport(request.id)) {
                    this.refillBackground();
                }
            }
            else if (request.action === this.VIDEO_ACTION.STOP) {
                this.manageVideoInfo(request);
            }
            else if (request.action === this.VIDEO_ACTION.STARTED) {
                this.manageVideoInfo(request);
                this.videoBGAction();
            }
            else if (request.action === this.VIDEO_ACTION.RESIZE) {
                this.manageVideoInfo(request);
                this.refillBackground();
                this.videoBGAction();
            }
        }
    }
    disconnectedCallback() {
        this.info('called disconnectedCallback()');
        if (Ch5CoreIntersectionObserver.getInstance() instanceof Ch5CoreIntersectionObserver) {
            Ch5CoreIntersectionObserver.getInstance().unobserve(this);
        }
        unsubscribeState('o', 'ch5.video.background', this._videoSubscriptionId);
        unsubscribeState('b', 'canvas.created', this._canvasSubscriptionId);
        this.unsubscribeFromSignals();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5BackgroundAttributes = [
            'url',
            'backgroundcolor',
            'repeat',
            'scale',
            'refreshrate',
            'videocrop',
            'imgbackgroundcolor',
            'transitioneffect',
            'transitionduration',
            'receivestaterefreshrate',
            'receivestateurl',
            'receivestatebackgroundcolor'
        ];
        return commonAttributes.concat(ch5BackgroundAttributes);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (attr) {
            case 'url':
                if (this.hasAttribute('url')) {
                    this.url = newValue;
                }
                else {
                    this.url = '';
                }
                this.createCanvas();
                this.updateBackground();
                break;
            case 'backgroundcolor':
                if (!this.hasAttribute('url') && !this.hasAttribute('receivestateurl')) {
                    if (this.hasAttribute('backgroundcolor')) {
                        this.backgroundColor = newValue;
                    }
                    else {
                        this.backgroundColor = '';
                    }
                    this.createCanvas();
                    this.updateBackground();
                }
                break;
            case 'repeat':
                this.repeat = this.getAttribute('repeat');
                break;
            case 'scale':
                if (this.hasAttribute('scale')) {
                    this.scale = newValue;
                }
                else {
                    this.scale = Ch5Background.SCALE[0];
                }
                this.updateBackground();
                break;
            case 'refreshrate':
                if (this.hasAttribute('refreshrate')) {
                    this.refreshRate = Number(newValue);
                }
                else {
                    this.refreshRate = Ch5Background.REFRESHRATE;
                }
                this.updateBackground();
                break;
            case 'videocrop':
                if (this.hasAttribute('videocrop')) {
                    this.videoCrop = newValue;
                }
                else {
                    this.videoCrop = '';
                }
                break;
            case 'imgbackgroundcolor':
                if (this.hasAttribute('imgbackgroundcolor')) {
                    this.imgBackgroundColor = newValue;
                }
                else {
                    this.imgBackgroundColor = Ch5Background.IMGBGCOLOR;
                }
                this.updateBackground();
                break;
            case 'transitioneffect':
                if (this.hasAttribute('transitioneffect')) {
                    this.transitionEffect = newValue;
                }
                else {
                    this.transitionEffect = 'ease';
                }
                this.setBgTransition();
                break;
            case 'transitionduration':
                if (this.hasAttribute('transitionduration')) {
                    this.transitionDuration = newValue;
                }
                else {
                    this.transitionDuration = '';
                }
                this.setBgTransition();
                break;
            case 'receivestaterefreshrate':
                if (this.hasAttribute('receivestaterefreshrate')) {
                    this.receiveStateRefreshRate = newValue;
                }
                else {
                    this.receiveStateRefreshRate = '';
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
            case 'receivestatebackgroundcolor':
                if (!this.hasAttribute('url') && !this.hasAttribute('receivestateurl')) {
                    if (this.hasAttribute('receivestatebackgroundcolor')) {
                        this.receiveStateBackgroundColor = newValue;
                    }
                    else {
                        this.receiveStateBackgroundColor = '';
                    }
                }
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    unsubscribeFromSignals() {
        this.info('unsubscribeFromSignals()');
        super.unsubscribeFromSignals();
        const csf = Ch5SignalFactory.getInstance();
        if (this._subReceiveRefreshRate !== '' && this._receiveStateRefreshRate !== '') {
            const receiveIntervalSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateRefreshRate);
            const sigInterval = csf.getStringSignal(receiveIntervalSigName);
            if (null !== sigInterval) {
                sigInterval.unsubscribe(this._subReceiveRefreshRate);
                this._receiveStateRefreshRate = '';
            }
        }
        if (this._subReceiveUrl !== '' && this._receiveStateUrl !== '') {
            const receiveUrlSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateUrl);
            const sigUrl = csf.getStringSignal(receiveUrlSigName);
            if (null !== sigUrl) {
                sigUrl.unsubscribe(this._subReceiveUrl);
                this._receiveStateUrl = '';
            }
        }
        if (this._subReceiveBackgroundColor !== '' && this._receiveStateBackgroundColor !== '') {
            const receiveBackgroundColorSigName = Ch5Signal.getSubscriptionSignalName(this._receiveStateBackgroundColor);
            const sigBgColor = csf.getStringSignal(receiveBackgroundColorSigName);
            if (null !== sigBgColor) {
                sigBgColor.unsubscribe(this._subReceiveBackgroundColor);
                this._receiveStateBackgroundColor = '';
            }
        }
        this.info('unsubscribeFromSignals() end');
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('url')) {
            this.url = this.getAttribute('url');
        }
        if (this.hasAttribute('backgroundcolor') && !this.hasAttribute('url') && !this.hasAttribute('receivestateurl')) {
            this.backgroundColor = this.getAttribute('backgroundcolor');
        }
        this.repeat = this.getAttribute('repeat');
        if (this.hasAttribute('scale')) {
            this.scale = this.getAttribute('scale');
        }
        if (this.hasAttribute('refreshrate')) {
            this.refreshRate = Number(this.getAttribute('refreshrate'));
        }
        if (this.hasAttribute('videocrop')) {
            this.videoCrop = this.getAttribute('videocrop');
        }
        if (this.hasAttribute('imgbackgroundcolor')) {
            this.imgBackgroundColor = this.getAttribute('imgbackgroundcolor');
        }
        if (this.hasAttribute('transitioneffect')) {
            this.transitionEffect = this.getAttribute('transitioneffect');
        }
        if (this.hasAttribute('transitionduration')) {
            this.transitionDuration = this.getAttribute('transitionduration');
        }
        if (this.hasAttribute('receivestaterefreshrate')) {
            this.receiveStateRefreshRate = this.getAttribute('receivestaterefreshrate');
        }
        if (this.hasAttribute('receivestateurl')) {
            this.receiveStateUrl = this.getAttribute('receivestateurl');
        }
        if (this.hasAttribute('receivestatebackgroundcolor') && !this.hasAttribute('url') && !this.hasAttribute('receivestateurl')) {
            this.receiveStateBackgroundColor = this.getAttribute('receivestatebackgroundcolor');
        }
    }
    updateBackground() {
        if (this._imgUrls.length) {
            this.setBgImage();
        }
        else if (this._bgColors.length) {
            this.setBgColor();
        }
        else {
            this.info('Something went wrong. One attribute is mandatory - either URL or backgroundColor.');
        }
    }
    updateBackgroundForEachCanvas(canvas, idx) {
        if (this._imgUrls.length) {
            this.setBgImageByCanvas(canvas, idx);
        }
        else if (this._bgColors.length) {
            this.setBgColorByCanvas(canvas, idx);
        }
        else {
            this.info('Something went wrong. One attribute is mandatory - either URL or backgroundColor.');
        }
    }
    getBackgroundUrl(values) {
        this._imgUrls = values.split('|');
        this._imgUrls = this._imgUrls.map(url => url.trim());
    }
    getBackgroundColor(values) {
        this._bgColors = values.split('|');
        this._bgColors = this._bgColors.map(color => color.trim());
    }
    scaleToFill(img, canvas, ctx) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        setTimeout(() => {
            if (this._videoDimensions.length === 1 && this._videoDimensions[0].action === "started") {
                ctx.clearRect(this._videoDimensions[0].left, this._videoDimensions[0].top, this._videoDimensions[0].width, this._videoDimensions[0].height);
            }
        }, 100);
        publishEvent('b', 'canvas.created', true);
    }
    scaleToFit(img, canvas, ctx) {
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        setTimeout(() => {
            if (this._videoDimensions.length === 1 && this._videoDimensions[0].action === "started") {
                ctx.clearRect(this._videoDimensions[0].left, this._videoDimensions[0].top, this._videoDimensions[0].width, this._videoDimensions[0].height);
            }
        }, 100);
        publishEvent('b', 'canvas.created', true);
    }
    scaleToStretch(img, canvas, ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            if (this._videoDimensions.length === 1 && this._videoDimensions[0].action === "started") {
                ctx.clearRect(this._videoDimensions[0].left, this._videoDimensions[0].top, this._videoDimensions[0].width, this._videoDimensions[0].height);
            }
        }, 100);
        publishEvent('b', 'canvas.created', true);
    }
    updateBgImageScale(img, canvas, ctx) {
        switch (this._scale) {
            case 'fill':
                this.scaleToFill(img, canvas, ctx);
                break;
            case 'fit':
                this.scaleToFit(img, canvas, ctx);
                break;
            case 'stretch':
                this.scaleToStretch(img, canvas, ctx);
                break;
            default:
                this.info('Scale value is wrong. it should be fill, fit or stretch(default)');
                break;
        }
    }
    updateBgImageRepeat(img, canvas, ctx) {
        switch (this._repeat) {
            case 'repeat':
            case 'repeat-x':
            case 'repeat-y':
            case 'no-repeat':
                ctx.fillStyle = ctx.createPattern(img, this._repeat);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                setTimeout(() => {
                    if (this._videoDimensions.length === 1 && this._videoDimensions[0].action === "started") {
                        ctx.clearRect(this._videoDimensions[0].left, this._videoDimensions[0].top, this._videoDimensions[0].width, this._videoDimensions[0].height);
                    }
                }, 100);
                publishEvent('b', 'canvas.created', true);
                break;
            default:
                break;
        }
    }
    canvasTemplate(count) {
        this.innerHTML = '';
        for (let i = 0; i < count; ++i) {
            this._elCanvas = document.createElement('canvas');
            this._elCanvas.classList.add(this.primaryCssClass + this.canvasCssClassPrefix);
            this.appendChild(this._elCanvas);
            this.setCanvasDimensions(this._elCanvas);
            if (i === (count - 1)) {
                this._canvasList = this.querySelectorAll('canvas');
            }
        }
        this.isCanvasCreated = true;
    }
    manageVideoInfo(response) {
        const index = this._videoDimensions.findIndex((item) => item.id === response.id);
        if (response.action === this.VIDEO_ACTION.STARTED || response.action === this.VIDEO_ACTION.RESIZE) {
            if (index > -1) {
                this._videoDimensions[index] = response;
                this.refillBackground();
            }
            else {
                this._videoDimensions.push(response);
                this.refillBackground();
            }
        }
        else if (response.action === this.VIDEO_ACTION.STOP) {
            if (index >= 0) {
                const dimensions = this._videoDimensions[index];
                this._videoDimensions.splice(index, 1);
                this.refillBackgroundforOneVideo(dimensions);
            }
        }
    }
    isScrollBar(elm, dir) {
        dir = (dir === 'vertical') ? 'scrollTop' : 'scrollLeft';
        let res = !!elm[dir];
        if (!res) {
            elm[dir] = 1;
            res = !!elm[dir];
            elm[dir] = 0;
        }
        return res;
    }
    setCanvasDimensions(canvas) {
        canvas.width = 0;
        canvas.height = 0;
        if (this.parentElement) {
            canvas.width = this.isScrollBar(this.parentElement, 'horizontal') ? this.parentElement.scrollWidth : this.parentElement.clientWidth;
            canvas.height = this.isScrollBar(this.parentElement, 'vertical') ? this.parentElement.scrollHeight : this.parentElement.clientHeight;
        }
    }
    updateCanvasDimensions() {
        if (this.isCanvasListValid()) {
            this._canvasList.forEach((canvas, idx) => {
                let processCanvasObject = true;
                if (this._prevCanvasList && this._prevCanvasList.length > 0) {
                    let newWidth = canvas.width;
                    let newHeight = canvas.height;
                    if (this.parentElement) {
                        newWidth = this.isScrollBar(this.parentElement, 'horizontal') ? this.parentElement.scrollWidth : this.parentElement.clientWidth;
                        newHeight = this.isScrollBar(this.parentElement, 'vertical') ? this.parentElement.scrollHeight : this.parentElement.clientHeight;
                    }
                    if (this._prevCanvasList[idx] && this._prevCanvasList[idx].width === newWidth &&
                        this._prevCanvasList[idx].height === newHeight) {
                        processCanvasObject = false;
                    }
                    else if (newWidth === 0 && newHeight === 0) {
                        processCanvasObject = false;
                    }
                }
                if (processCanvasObject === true) {
                    canvas.width = 0;
                    canvas.height = 0;
                    if (this.parentElement) {
                        canvas.width = this.isScrollBar(this.parentElement, 'horizontal') ? this.parentElement.scrollWidth : this.parentElement.clientWidth;
                        canvas.height = this.isScrollBar(this.parentElement, 'vertical') ? this.parentElement.scrollHeight : this.parentElement.clientHeight;
                    }
                    this.updateBackgroundForEachCanvas(canvas, idx);
                    const prevListObj = this._prevCanvasList.find(getObj => getObj.id === idx);
                    if (prevListObj) {
                        this._prevCanvasList[idx].width = canvas.width;
                        this._prevCanvasList[idx].height = canvas.height;
                    }
                    else {
                        this._prevCanvasList.push({ id: idx, width: canvas.width, height: canvas.height });
                    }
                }
            });
        }
    }
    createCanvas() {
        if (this._imgUrls.length) {
            this.canvasTemplate(this._imgUrls.length);
        }
        else if (this._bgColors.length) {
            this.canvasTemplate(this._bgColors.length);
        }
        else {
            this.info('Something went wrong. One attribute is mandatory either URL or backgroundColor.');
        }
    }
    setBgTransition() {
        setTimeout(() => {
            if (this.isCanvasListValid()) {
                this._canvasList.forEach((canvas) => {
                    if (this._transitionEffect) {
                        canvas.style.transitionTimingFunction = this._transitionEffect;
                    }
                    if (this._transitionDuration) {
                        canvas.style.transitionDuration = this._transitionDuration;
                    }
                });
            }
        });
    }
    setBgImage() {
        if (this._canvasList && this._canvasList.length) {
            if (this.isCanvasListValid()) {
                this._canvasList.forEach((canvas, idx) => {
                    this.setBgImageByCanvas(canvas, idx);
                });
                this._elBackupImages = [...this._elImages];
            }
        }
    }
    setBgImageByCanvas(canvas, idx) {
        const ctx = canvas.getContext('2d');
        this._elImages[idx] = new Image();
        this._elImages[idx].src = this._imgUrls[idx];
        this._elImages[idx].onload = () => {
            this.updateBgImage(this._elImages[idx], ctx);
            if (this._imgUrls.length === idx + 1) {
                this.changeBackground(this._imgUrls.length);
            }
            this.videoBGUpdateAction();
            this._elImages[idx].onload = null;
        };
        ctx.fillStyle = this._imgBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setBgColor() {
        if (this.isCanvasListValid()) {
            this._canvasList.forEach((canvas, idx) => {
                this.setBgColorByCanvas(canvas, idx);
            });
        }
    }
    setBgColorByCanvas(canvas, idx) {
        const ctx = canvas.getContext('2d');
        this.updateBgColor(this._bgColors[idx], ctx);
        if (this._bgColors.length === idx + 1) {
            this.changeBackground(this._bgColors.length);
        }
        this.videoBGUpdateAction();
    }
    videoBGUpdateAction() {
        if (this._videoCrop !== "") {
            this._videoDimensions.forEach((video) => {
                if (this.isCanvasListValid()) {
                    this._canvasList.forEach((canvas) => {
                        const ctx = canvas.getContext('2d');
                        if (video.action === this.VIDEO_ACTION.STARTED) {
                            ctx.clearRect(video.left, video.top, video.width, video.height);
                            this._isRefilled = false;
                        }
                    });
                }
            });
        }
    }
    updateBgColor(color, ctx, videoData = null) {
        ctx.fillStyle = color;
        if (videoData && videoData.left && videoData.top) {
            ctx.fillRect(videoData.left, videoData.top, videoData.width, videoData.height);
        }
        else {
            ctx.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height);
        }
        publishEvent('b', 'canvas.created', true);
    }
    changeBackground(count) {
        clearInterval(this._interval);
        if (count > 1) {
            let isBackgroundSet = false;
            this._canvasList.forEach((c) => {
                if (c.classList && c.classList.contains('ch5bg-fadein')) {
                    isBackgroundSet = true;
                    return;
                }
            });
            if (isBackgroundSet === false) {
                this._canvasList[0].classList.add('ch5bg-fadein');
            }
            this._interval = setInterval(() => {
                if (this.isCanvasListValid()) {
                    this._canvasList.forEach((c) => c.classList.remove('ch5bg-fadein'));
                    this._canvasList[this._bgIdx].classList.add('ch5bg-fadein');
                    this._bgIdx++;
                    if (this._bgIdx === count) {
                        this._bgIdx = 0;
                    }
                }
            }, this._refreshRate * 1000);
        }
        else {
            this._canvasList[0].classList.add('ch5bg-fadein');
        }
    }
    updateBgImage(img, ctx) {
        if (!_.isNil(this._repeat)) {
            this.updateBgImageRepeat(img, this._elCanvas, ctx);
        }
        else {
            this.updateBgImageScale(img, this._elCanvas, ctx);
        }
    }
    refillBackground() {
        if (this.isCanvasListValid()) {
            this._canvasList.forEach((canvas, idx) => {
                const ctx = canvas.getContext('2d');
                switch (this._canvasList.length) {
                    case this._imgUrls.length:
                        this._elImages = [...this._elBackupImages];
                        this.updateBgImage(this._elImages[idx], ctx);
                        break;
                    case this._bgColors.length:
                        this.updateBgColor(this._bgColors[idx], ctx);
                        break;
                }
                this._isRefilled = true;
            });
        }
    }
    refillBackgroundforOneVideo(videoData) {
        if (this.isCanvasListValid()) {
            this._canvasList.forEach((canvas, idx) => {
                const ctx = canvas.getContext('2d');
                switch (this._canvasList.length) {
                    case this._imgUrls.length:
                        this._elImages = [...this._elBackupImages];
                        this.updateBgImage(this._elImages[idx], ctx);
                        break;
                    case this._bgColors.length:
                        this.updateBgColor(this._bgColors[idx], ctx, videoData);
                        publishEvent('b', 'canvas.created', true);
                        break;
                }
                this._isRefilled = true;
            });
        }
    }
    videoBGAction() {
        if (this._elCanvas && Object.keys(this._elCanvas).length === 0 && this._elCanvas.constructor === Object) {
            return;
        }
        if (this._videoCrop && typeof this._videoCrop === 'string') {
            this._videoRes = JSON.parse(this._videoCrop);
        }
        if (this._videoRes && this._videoRes.action !== this.VIDEO_ACTION.REFILL) {
            const topOffset = this._elCanvas.getBoundingClientRect().top;
            const leftOffset = this._elCanvas.getBoundingClientRect().left;
            this._videoRes.left = this._videoRes.left - leftOffset;
            this._videoRes.top = this._videoRes.top - topOffset;
            this._videoRes.left = Math.ceil(this._videoRes.left);
            this._videoRes.top = Math.ceil(this._videoRes.top);
            this.manageVideoInfo(this._videoRes);
            if (this._videoDimensions.length) {
                this._videoDimensions.map((video) => {
                    this.info("\nvideoBGAction() -> Video Tag Id " + video.id + " is in Viewport: " + this.isInViewport(video.id));
                    if (this.isInViewport(video.id)) {
                        if (this.isCanvasListValid()) {
                            this._canvasList.forEach((canvas) => {
                                const ctx = canvas.getContext('2d');
                                if (video.action === this.VIDEO_ACTION.STARTED || video.action === this.VIDEO_ACTION.RESIZE) {
                                    ctx.clearRect(video.left, video.top, video.width, video.height);
                                    this._isRefilled = false;
                                }
                                else if (video.action === this.VIDEO_ACTION.STOP || video.action === this.VIDEO_ACTION.MARK ||
                                    video.action === this.VIDEO_ACTION.ERROR || video.action === this.VIDEO_ACTION.NOURL) {
                                    ctx.fillStyle = Ch5Background.IMGBGCOLOR;
                                    ctx.fillRect(video.left, video.top, video.width, video.height);
                                    ctx.beginPath();
                                    const lHeight = Math.ceil(video.height * 0.04);
                                    ctx.lineWidth = lHeight;
                                    ctx.moveTo(video.left, (video.top + video.height) - Math.ceil(lHeight / 2));
                                    ctx.lineTo((video.width + video.left), (video.top + video.height) - Math.ceil(lHeight / 2));
                                    ctx.strokeStyle = this.MARK_COLORS.get(video.action);
                                    ctx.setLineDash([]);
                                    if (video.action === this.VIDEO_ACTION.STOP) {
                                        ctx.setLineDash([Math.ceil(video.width / 2), 4, 6, 4]);
                                    }
                                    ctx.stroke();
                                    this._isRefilled = false;
                                }
                            });
                        }
                    }
                });
            }
        }
    }
    isCanvasListValid() {
        return (!!this._canvasList && this._canvasList != null && this._canvasList.length > 0);
    }
}
Ch5Background.ELEMENT_NAME = 'ch5-background';
Ch5Background.SCALE = ['stretch', 'fill', 'fit'];
Ch5Background.REPEAT = ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'];
Ch5Background.REFRESHRATE = 600;
Ch5Background.IMGBGCOLOR = 'black';
Ch5Background.COMPONENT_DATA = {
    SCALE: {
        default: Ch5Background.SCALE[0],
        values: Ch5Background.SCALE,
        key: 'scale',
        classListPrefix: '--'
    },
    REPEAT: {
        default: null,
        values: Ch5Background.REPEAT,
        key: 'repeat',
        classListPrefix: '--'
    }
};
Ch5Background.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { receivestaterefreshrate: { direction: "state", numericJoin: 1, contractName: true }, receivestateurl: { direction: "state", stringJoin: 1, contractName: true }, receivestatebackgroundcolor: { direction: "state", stringJoin: 1, contractName: true } });
if (typeof window === 'object' && typeof window.customElements === 'object' && typeof window.customElements.define === 'function') {
    window.customElements.define(Ch5Background.ELEMENT_NAME, Ch5Background);
}
Ch5Background.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJhY2tncm91bmQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtYmFja2dyb3VuZC9jaDUtYmFja2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHMUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSwwQkFBMEIsRUFBNEMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuSSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBaU5wQyxNQUFNLENBQUMsNEJBQTRCO1FBQ3pDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2xJLENBQUM7SUFNRCxJQUFXLEdBQUc7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztT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