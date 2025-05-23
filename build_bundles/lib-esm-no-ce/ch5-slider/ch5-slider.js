import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5CommonInput } from "../ch5-common-input";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { create } from "nouislider";
import { Ch5PressableSlider } from "../ch5-common/ch5-pressable-slider";
import HtmlCallback from "../ch5-common/utils/html-callback";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { TCh5SliderHandle, } from './interfaces/t-ch5-slider';
import _ from "lodash";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5Properties } from "../ch5-core/ch5-properties";
import { Ch5SliderTitleLabel } from "./ch5-slider-title-label";
import { resizeObserver } from "../ch5-core/resize-observer";
export class Ch5Slider extends Ch5CommonInput {
    set range(value) {
        this._ch5Properties.set("range", value, () => {
            this._render();
        });
    }
    get range() {
        return this._ch5Properties.get("range");
    }
    set showTickValues(value) {
        this._ch5Properties.set("showTickValues", value, () => {
            this._render();
        });
    }
    get showTickValues() {
        return this._ch5Properties.get("showTickValues");
    }
    set tapSettable(value) {
        this._ch5Properties.set("tapSettable", value, () => {
            this._render();
        });
    }
    get tapSettable() {
        return this._ch5Properties.get("tapSettable");
    }
    set handleShape(value) {
        this._ch5Properties.set("handleShape", value, () => {
            this.handleHandleShape();
        });
    }
    get handleShape() {
        return this._ch5Properties.get("handleShape");
    }
    set value(value) {
        this._ch5Properties.set("value", value, () => {
            this.handleValue();
            this.setCleanValue(this.value);
        });
    }
    get value() {
        return this._ch5Properties.get("value");
    }
    get valueHigh() {
        return this._ch5Properties.get("valueHigh");
    }
    set valueHigh(value) {
        this._ch5Properties.set("valueHigh", value, () => {
            this.handleValueHigh();
            this._cleanValueHigh = this.valueHigh;
        });
    }
    set noHandle(value) {
        this._ch5Properties.set("noHandle", value, () => {
            this.handleTapSettable();
        });
    }
    get noHandle() {
        return this._ch5Properties.get("noHandle");
    }
    get max() {
        return this._ch5Properties.get("max");
    }
    set max(value) {
        this._ch5Properties.set("max", value, () => {
            this.handleMax();
        });
    }
    get min() {
        return this._ch5Properties.get("min");
    }
    set min(value) {
        this._ch5Properties.set("min", value, () => {
            this.handleMin();
        });
    }
    set orientation(value) {
        this._ch5Properties.set("orientation", value, () => {
            this.handleOrientation();
        });
    }
    get orientation() {
        return this._ch5Properties.get("orientation");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.sizeHandler();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set handleSize(value) {
        this._ch5Properties.set("handleSize", value, () => {
            this.handleHandleSize();
        });
    }
    get handleSize() {
        return this._ch5Properties.get("handleSize");
    }
    set step(value) {
        this._ch5Properties.set("step", value, () => {
            if (this.ticks) {
                this.step = 1;
            }
            this.handleMax();
        });
    }
    get step() {
        return this._ch5Properties.get("step");
    }
    set stretch(value) {
        this._ch5Properties.set("stretch", value, () => {
            this.handleStretch();
        });
    }
    get stretch() {
        return this._ch5Properties.get("stretch");
    }
    set ticks(value) {
        this._ch5Properties.set("ticks", value, () => {
            if (this.ticks) {
                this._elContainer.classList.add("ch5-slider-ticks");
            }
            else {
                this._elContainer.classList.remove("ch5-slider-ticks");
            }
            this._render();
        });
    }
    get ticks() {
        return this._ch5Properties.get("ticks");
    }
    set toolTipShowType(value) {
        this._ch5Properties.set("toolTipShowType", value, () => {
            this.handleToolTipShowType();
            if (this.toolTipShowType === Ch5Slider.TOOL_TIP_SHOW_TYPE[1]) {
                this.subscribeToAnalogSignal();
                this.subscribeToAnalogHighSignal();
            }
            else {
                this.unsubscribeFromAnalogSignals();
            }
        });
    }
    get toolTipShowType() {
        return this._ch5Properties.get("toolTipShowType");
    }
    set toolTipDisplayType(value) {
        this._ch5Properties.set("toolTipDisplayType", value, () => {
            this.handleToolTipDisplayType();
        });
    }
    get toolTipDisplayType() {
        return this._ch5Properties.get("toolTipDisplayType");
    }
    set sendEventOnChange(value) {
        this._ch5Properties.set("sendEventOnChange", value);
    }
    get sendEventOnChange() {
        return this._ch5Properties.get('sendEventOnChange');
    }
    set sendEventOnChangeHigh(value) {
        this._ch5Properties.set("sendEventOnChangeHigh", value);
    }
    get sendEventOnChangeHigh() {
        return this._ch5Properties.get('sendEventOnChangeHigh');
    }
    set sendEventOnHandleClick(value) {
        this._ch5Properties.set("sendEventOnHandleClick", value);
    }
    get sendEventOnHandleClick() {
        return this._ch5Properties.get('sendEventOnHandleClick');
    }
    get receiveStateValue() {
        return this._attributeValueAsString('receivestatevalue');
    }
    set receiveStateValue(value) {
        if ('' === value
            || this._receiveStateValueSignal === value
            || null === value
            || undefined === value) {
            return;
        }
        if (this._receiveStateValueSignal !== ''
            && this._receiveStateValueSignal !== undefined
            && this._receiveStateValueSignal !== null) {
            const oldSignalName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignal);
            const oldSignal = Ch5SignalFactory.getInstance().getObjectSignal(oldSignalName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveValueId);
            }
        }
        this._receiveStateValueSignal = value;
        const recSignalName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignal);
        const receiveSignal = Ch5SignalFactory.getInstance().getObjectSignal(recSignalName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveValueId = receiveSignal.subscribe((object) => {
            if (undefined === object ||
                !object.hasOwnProperty('rcb') ||
                !object.rcb.hasOwnProperty('value') ||
                !receiveSignal.hasChangedSinceInit()) {
                return;
            }
            const rcb = object.rcb;
            const animationDuration = rcb.time;
            let newValue = rcb.value;
            if (this.min < 0 && newValue > 0x7FFF) {
                newValue -= 0x10000;
            }
            this._rcbSignalValue = {
                'rcb': {
                    'value': newValue,
                    'time': animationDuration,
                    'startv': undefined !== rcb.startv ? rcb.startv : this.value,
                    'startt': undefined !== rcb.startt ? rcb.startt : Date.now()
                }
            };
            this.setCleanValue(newValue);
            this._wasRendered = false;
            this._ch5Properties.setForSignalResponse("value", newValue, () => {
            });
            this._wasRendered = true;
            if (this._dirtyTimerHandle === null) {
                if (this._wasRendered && animationDuration === 0) {
                    this._render();
                    this._tooltipValueFromSignal = newValue;
                    this._adjustTooltipValue(TCh5SliderHandle.VALUE);
                }
                else {
                    this._setSliderValue(newValue, TCh5SliderHandle.VALUE, animationDuration);
                }
                this._setCleanLow();
                this.setClean();
            }
        });
    }
    get receiveStateValueHigh() {
        return this._attributeValueAsString('receivestatevaluehigh');
    }
    set receiveStateValueHigh(value) {
        if (Ch5Common.isNil(value) || this._receiveStateValueSignalHigh === value) {
            return;
        }
        if (this._receiveStateValueSignalHigh !== ''
            && this._receiveStateValueSignalHigh !== undefined
            && this._receiveStateValueSignalHigh !== null) {
            const oldSignalName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignalHigh);
            const oldSignal = Ch5SignalFactory.getInstance().getObjectSignal(oldSignalName);
            if (oldSignal !== null) {
                oldSignal.unsubscribe(this._subReceiveValueHighId);
            }
        }
        this._receiveStateValueSignalHigh = value;
        const recSignalName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignalHigh);
        const receiveSignal = Ch5SignalFactory.getInstance().getObjectSignal(recSignalName);
        if (receiveSignal === null) {
            return;
        }
        this._subReceiveValueHighId = receiveSignal.subscribe((object) => {
            if (undefined === object ||
                !object.hasOwnProperty('rcb') ||
                !object.rcb.hasOwnProperty('value') ||
                !receiveSignal.hasChangedSinceInit()) {
                return;
            }
            const rcb = object.rcb;
            const animationDuration = rcb.time;
            let newValue = rcb.value;
            if (this.min < 0 && newValue > 0x7FFF) {
                newValue -= 0x10000;
            }
            this._rcbSignalValueHigh = {
                'rcb': {
                    'value': newValue,
                    'time': animationDuration,
                    'startv': undefined !== rcb.startv ? rcb.startv : this.valueHigh,
                    'startt': undefined !== rcb.startt ? rcb.startt : Date.now()
                }
            };
            this._cleanValueHigh = newValue;
            this._wasRendered = false;
            this._ch5Properties.setForSignalResponse("valueHigh", newValue, () => {
            });
            this._wasRendered = true;
            if (this._dirtyTimerHandleHigh === null) {
                if (this._wasRendered && animationDuration === 0) {
                    this._render();
                    this._tooltipHighValueFromSignal = newValue;
                    this._adjustTooltipValue(TCh5SliderHandle.HIGHVALUE);
                }
                else {
                    this._setSliderValue(newValue, TCh5SliderHandle.HIGHVALUE, animationDuration);
                }
                this._setCleanHigh();
                this.setClean();
            }
        });
    }
    set onOffOnly(value) {
        this._ch5Properties.set("onOffOnly", value, () => {
            this.handleOnOffOnly();
        });
    }
    get onOffOnly() {
        return this._ch5Properties.get("onOffOnly");
    }
    set receiveStateShowOnOffOnly(value) {
        this._ch5Properties.set("receiveStateShowOnOffOnly", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("onOffOnly", newValue, () => {
                this.handleOnOffOnly();
            });
        });
    }
    get receiveStateShowOnOffOnly() {
        return this._ch5Properties.get('receiveStateShowOnOffOnly');
    }
    set sendEventOnUpper(value) {
        this._ch5Properties.set("sendEventOnUpper", value, null, (newValue) => {
            if (this.toolTipDisplayType === "%") {
                this.toolTipShowType = "off";
            }
        });
    }
    get sendEventOnUpper() {
        return this._ch5Properties.get('sendEventOnUpper');
    }
    set sendEventOnLower(value) {
        this._ch5Properties.set("sendEventOnLower", value, null, (newValue) => {
            if (this.toolTipDisplayType === "%") {
                this.toolTipShowType = "off";
            }
        });
    }
    get sendEventOnLower() {
        return this._ch5Properties.get('sendEventOnLower');
    }
    constructor() {
        super();
        this._render = this.debounce(() => {
            this.createSlider();
        }, 25);
        this.isAdvancedSlider = false;
        this._elContainer = {};
        this._elTitleContainer = {};
        this._elSliderContainer = {};
        this._elOnContainer = {};
        this._elOffContainer = {};
        this._innerContainer = {};
        this._tgtEls = [];
        this._tooltip = {};
        this._titlePresent = -1;
        this._userLowValue = -1;
        this._userHighValue = -1;
        this.isResizeInProgress = false;
        this.RESIZE_DEBOUNCE = 500;
        this.primaryCssClass = 'ch5-slider';
        this._wasRendered = false;
        this.isSliderStarted = false;
        this.sliderTouch = null;
        this._isPressedSubscription = null;
        this._repeatDigitalInterval = null;
        this._receiveStateValueSignal = '';
        this._subReceiveValueId = '';
        this._subReceiveAnalogValueId = '';
        this._receiveStateValueSignalHigh = '';
        this._subReceiveValueHighId = '';
        this._subReceiveAnalogValueHighId = '';
        this._pressable = null;
        this.sliderEvent = {};
        this.sliderStartEvent = {};
        this.sliderEndEvent = {};
        this.focusEvent = {};
        this.blurEvent = {};
        this.changeEvent = {};
        this.dirtyEvent = {};
        this.cleanEvent = {};
        this._cleanValueHigh = '';
        this._dirtyValueHigh = '';
        this._dirtyTimerHandleHigh = null;
        this._cleanLow = true;
        this._dirtyLow = false;
        this._cleanHigh = true;
        this._dirtyHigh = false;
        this._animationTimer = undefined;
        this._tooltipValueFromSignal = undefined;
        this._tooltipHighValueFromSignal = undefined;
        this._rcbSignalValue = undefined;
        this._rcbSignalValueHigh = undefined;
        this._animatingHandle = {
            0: false,
            1: false
        };
        this.logger.start('Ch5Slider.constructor()');
        if (!this._wasInstatiated) {
            this.createInternalHtml();
        }
        this._wasInstatiated = true;
        this._ch5Properties = new Ch5Properties(this, Ch5Slider.COMPONENT_PROPERTIES);
        this.eventBinding();
        this.logger.stop();
    }
    static get observedAttributes() {
        const inheritedObsAttrs = Ch5Common.observedAttributes;
        const newObsAttrs = [];
        for (let i = 0; i < Ch5Slider.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Slider.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                newObsAttrs.push(Ch5Slider.COMPONENT_PROPERTIES[i].name.toLowerCase());
            }
        }
        const ch5SliderAttributes = [
            'feedbackmode',
            'signalvaluesynctimeout',
            'dir'
        ];
        return inheritedObsAttrs.concat(newObsAttrs.concat(ch5SliderAttributes));
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Slider.ELEMENT_NAME, Ch5Slider.SIGNAL_ATTRIBUTE_TYPES);
    }
    connectedCallback() {
        this.logger.start('Ch5Slider.connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5RoleAttributeMapping.ch5Slider);
        }
        this.setAttribute('data-ch5-id', this.getCrId());
        this._pressable = new Ch5PressableSlider(this._innerContainer, {
            cssTargetElement: this._innerContainer,
            cssPressedClass: this.primaryCssClass + '--pressed'
        });
        Promise.all([customElements.whenDefined('ch5-slider')]).then(() => {
            this.cacheComponentChildrens();
            const existingSliderElement = this.querySelector('.noUi-target');
            if (existingSliderElement instanceof HTMLElement) {
                existingSliderElement.remove();
            }
            if (this._elContainer.parentElement !== this) {
                this.appendChild(this._elContainer);
            }
            this.initAttributes();
            this.updateCssClasses();
            if (!this._wasRendered ||
                'undefined' === typeof this._innerContainer.noUiSlider ||
                null === this._innerContainer.noUiSlider) {
                this._renderPromise()
                    .then(() => {
                    this._wasRendered = true;
                    window.setTimeout(() => {
                        this._applySignalReceivedBeforeRender();
                    }, 0);
                });
            }
            this.attachEventListeners();
            this.initCommonMutationObserver(this);
            this.setCleanValue(this.value);
            this._cleanValueHigh = this.valueHigh;
        });
        this.titleHelper();
        this.onOffButtonHelper();
        this.handleOnOffOnly();
        if (this._innerContainer.isConnected === false) {
            this._elSliderContainer.insertBefore(this._innerContainer, this._elOnContainer);
        }
        this.logger.stop();
    }
    eventBinding() {
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onSliderSlide = this._onSliderSlide.bind(this);
        this._onSliderStart = this._onSliderStart.bind(this);
        this._onSliderStop = this._onSliderStop.bind(this);
        this._onSliderChange = this._onSliderChange.bind(this);
        this._stopRcbAnimation = this._stopRcbAnimation.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onTouchMoveEnd = this._onTouchMoveEnd.bind(this);
        this.sendEventOnHandleClickHandle = this.sendEventOnHandleClickHandle.bind(this);
    }
    setCleanValue(value) {
        this._cleanValue = value;
    }
    disconnectedCallback() {
        this.logger.start('Ch5Slider.disconnectedCallback()');
        this.removeEvents();
        this.unsubscribeFromSignals();
        const innerContainer = this._innerContainer;
        if (!_.isNil(innerContainer) && !_.isNil(innerContainer.noUiSlider)) {
            innerContainer.noUiSlider.destroy();
        }
        if (null !== this._pressable) {
            this._pressable.destroy();
        }
        this.disconnectCommonMutationObserver();
        this.logger.stop();
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", this.primaryCssClass);
        if (oldValue !== newValue) {
            this.logger.log('ch5-slider attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
            const attributeChangedProperty = Ch5Slider.COMPONENT_PROPERTIES.find((property) => { return property.name.toLowerCase() === attr.toLowerCase() && property.isObservableProperty === true; });
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
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        this.unsubscribeFromObjectSignals();
        this.unsubscribeFromAnalogSignals();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    getCssClassDisabled() {
        return this.primaryCssClass + '--disabled';
    }
    submit() {
        this.logger.start('Ch5Slider.submit()');
        if (this.feedbackMode === 'submit' && this._dirtyLow === true) {
            this._submitted = true;
            this._setDirtyHandler(TCh5SliderHandle.VALUE);
            this._sendValueForChangeSignal(this._userLowValue);
        }
        if (this.feedbackMode === 'submit' && this.range === true && this._dirtyHigh === true) {
            this._submitted = true;
            this._setDirtyHandler(TCh5SliderHandle.HIGHVALUE);
            this._sendHighValueForChangeSignal(this._userHighValue);
        }
        this.logger.stop();
    }
    reset() {
        this.logger.start('Ch5Slider.reset()');
        if (this._dirtyLow) {
            this._setSliderValue(Number(this._cleanValue), TCh5SliderHandle.VALUE);
            this.value = Number(this._cleanValue);
            this._setCleanLow();
        }
        if (this._dirtyHigh) {
            this._setSliderValue(Number(this._cleanValueHigh), TCh5SliderHandle.HIGHVALUE);
            this.valueHigh = Number(this._cleanValueHigh);
            this._setCleanHigh();
        }
        this.setClean();
        this.logger.stop();
    }
    setClean() {
        if (this._cleanLow && this._cleanHigh) {
            this._clean = true;
            this._dirty = false;
            this._submitted = false;
            if (this.feedbackMode === 'submit') {
                this.dispatchEvent(this.cleanEvent = new CustomEvent('clean', {
                    bubbles: true,
                    cancelable: false
                }));
                if (this.onclean instanceof HtmlCallback) {
                    this.onclean.run({});
                }
                else if (this.onclean instanceof Function) {
                    this.onclean();
                }
            }
        }
    }
    setDirty() {
        super.setDirty();
        if (this.feedbackMode === 'submit') {
            this.dispatchEvent(this.dirtyEvent = new CustomEvent('dirty', {
                bubbles: true,
                cancelable: false
            }));
            if (this.ondirty instanceof HtmlCallback) {
                this.ondirty.run({});
            }
            else if (this.ondirty instanceof Function) {
                this.ondirty();
            }
        }
    }
    setDirtyValue(handle, value) {
        switch (handle) {
            case TCh5SliderHandle.VALUE:
                this._setDirtyLow();
                this._dirtyValue = Number(value[handle]);
                break;
            case TCh5SliderHandle.HIGHVALUE:
                this._setDirtyHigh();
                this._dirtyValueHigh = Number(value[handle]);
                break;
            default:
                break;
        }
    }
    updateForChangeInDisabledStatus() {
        super.updateForChangeInDisabledStatus();
        if (this.disabled === true) {
            this._innerContainer.setAttribute('disabled', 'true');
        }
        else {
            this._innerContainer.removeAttribute('disabled');
        }
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._elOnContainer = document.createElement('div');
        this._elOnContainer.classList.add('slider-on-button');
        this._elOffContainer = document.createElement('div');
        this._elOffContainer.classList.add('slider-off-button');
        this._innerContainer = document.createElement('div');
        this._elTitleContainer = document.createElement('div');
        this._elTitleContainer.classList.add('ch5-title-container');
        this._elSliderContainer = document.createElement('div');
        this._elSliderContainer.classList.add('ch5-slider-button-container');
        this._elContainer.classList.add('ch5-slider');
        this._elSliderContainer.appendChild(this._elOffContainer);
        this._elSliderContainer.appendChild(this._innerContainer);
        this._elSliderContainer.appendChild(this._elOnContainer);
        this._elContainer.appendChild(this._elTitleContainer);
        this._elContainer.appendChild(this._elSliderContainer);
        this.logger.stop();
    }
    initAttributes() {
        super.initAttributes();
        const thisRef = this;
        for (let i = 0; i < Ch5Slider.COMPONENT_PROPERTIES.length; i++) {
            if (Ch5Slider.COMPONENT_PROPERTIES[i].isObservableProperty === true) {
                if (this.hasAttribute(Ch5Slider.COMPONENT_PROPERTIES[i].name.toLowerCase())) {
                    const key = Ch5Slider.COMPONENT_PROPERTIES[i].name;
                    thisRef[key] = this.getAttribute(key);
                }
            }
        }
        if (this._innerContainer.isConnected === false) {
            this._elSliderContainer.insertBefore(this._innerContainer, this._elOnContainer);
        }
    }
    updateCssClasses() {
        this.logger.start('UpdateCssClass');
        super.updateCssClasses();
        this.handleTapSettable();
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SHAPE.classListPrefix + this.handleShape);
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.classListPrefix + this.onOffOnly);
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SIZE.classListPrefix + this.handleSize);
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.TOOL_TIP_SHOW_TYPE.classListPrefix + this.toolTipShowType);
        this.logger.stop();
    }
    attachEventListeners() {
        super.attachEventListeners();
        if (this._innerContainer.querySelector('.noUi-handle') !== null) {
            this._innerContainer.addEventListener('mouseleave', this._onMouseLeave);
            this._innerContainer.addEventListener('touchmove', this._onMouseLeave);
        }
        if (null !== this._pressable) {
            this._pressable.init();
            this._subscribeToPressableIsPressed();
        }
        if (this.stretch) {
            resizeObserver(this.parentElement, this.onWindowResizeHandler.bind(this));
        }
    }
    removeEvents() {
        super.removeEventListeners();
        if (null !== this._innerContainer.querySelector('.noUi-handle')) {
            const noUiHandle = this._innerContainer.querySelector('.noUi-handle');
            noUiHandle.removeEventListener('focus', this._onFocus);
            noUiHandle.removeEventListener('blur', this._onBlur);
            noUiHandle.removeEventListener('click', this.sendEventOnHandleClickHandle);
            this._innerContainer.removeEventListener('mouseleave', this._onMouseLeave);
            this._innerContainer.removeEventListener('touchmove', this._onMouseLeave);
            noUiHandle.removeEventListener('pointermove', (event) => { event.stopPropagation(); });
        }
        if (!_.isNil(this._pressable)) {
            this._unsubscribeFromPressableIsPressed();
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
    createSlider() {
        this._renderPromise().then(() => {
            window.setTimeout(() => {
                this._applySignalReceivedBeforeRender();
            }, 0);
        });
    }
    _renderPromise() {
        return new Promise((resolve, reject) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (this._innerContainer === null || this._innerContainer === undefined) {
                return reject(false);
            }
            const options = this._parsedSliderOptions();
            try {
                if (!Ch5Common.isNil(this._innerContainer.noUiSlider)) {
                    (_b = (_a = this._innerContainer) === null || _a === void 0 ? void 0 : _a.noUiSlider) === null || _b === void 0 ? void 0 : _b.destroy();
                }
                const slider = create(this._innerContainer, options);
                (_d = (_c = this._innerContainer) === null || _c === void 0 ? void 0 : _c.noUiSlider) === null || _d === void 0 ? void 0 : _d.on('slide', this._onSliderChange);
                (_f = (_e = this._innerContainer) === null || _e === void 0 ? void 0 : _e.noUiSlider) === null || _f === void 0 ? void 0 : _f.on('start', this._onSliderStart);
                (_h = (_g = this._innerContainer) === null || _g === void 0 ? void 0 : _g.noUiSlider) === null || _h === void 0 ? void 0 : _h.on('end', this._onSliderStop);
                const noUiHandle = this._innerContainer.querySelector('.noUi-handle');
                noUiHandle.addEventListener('focus', this._onFocus);
                noUiHandle.addEventListener('blur', this._onBlur);
                noUiHandle.addEventListener('click', this.sendEventOnHandleClickHandle);
                noUiHandle.addEventListener('pointermove', (event) => { event.stopPropagation(); });
                this._tgtEls = [];
                this._tgtEls.push(this._innerContainer.querySelectorAll('.noUi-connect'));
                this._tgtEls.push(this._innerContainer.querySelectorAll('.noUi-origin'));
                this._tooltip = this._innerContainer.querySelectorAll('.noUi-tooltip');
                resolve(slider);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    onWindowResizeHandler() {
        if (!this.isResizeInProgress) {
            this.isResizeInProgress = true;
            setTimeout(() => {
                if (this.stretch) {
                    this.stretchHandler();
                    this._render();
                }
                this.isResizeInProgress = false;
            }, this.RESIZE_DEBOUNCE);
        }
    }
    _subscribeToPressableIsPressed() {
        const REPEAT_DIGITAL_PERIOD = 400;
        const MAX_REPEAT_DIGITALS = 30000 / REPEAT_DIGITAL_PERIOD;
        if (this._isPressedSubscription === null && this._pressable !== null) {
            this._isPressedSubscription = this._pressable.observablePressed.subscribe((value) => {
                if (value.pressed === false) {
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    this.handleSendEvent(value.range, false);
                }
                else {
                    this.handleSendEvent(value.range, true);
                    if (this._repeatDigitalInterval !== null) {
                        window.clearInterval(this._repeatDigitalInterval);
                    }
                    let numRepeatDigitals = 0;
                    this._repeatDigitalInterval = window.setInterval(() => {
                        this.handleSendEvent(value.range, true);
                        if (++numRepeatDigitals >= MAX_REPEAT_DIGITALS) {
                            window.clearInterval(this._repeatDigitalInterval);
                            this.handleSendEvent(value.range, false);
                        }
                    }, REPEAT_DIGITAL_PERIOD);
                }
            });
        }
    }
    _unsubscribeFromPressableIsPressed() {
        if (this._repeatDigitalInterval !== null) {
            window.clearInterval(this._repeatDigitalInterval);
        }
        if (this._isPressedSubscription !== null) {
            this._isPressedSubscription.unsubscribe();
            this._isPressedSubscription = null;
        }
    }
    _setSliderValue(value, handle, time) {
        var _a, _b, _c, _d;
        if (!_.isNil(this._innerContainer) && !_.isNil(this._innerContainer.noUiSlider)) {
            const animationLength = time !== undefined ? Math.round(time) : 0;
            if (value < this.min)
                value = this.min;
            else if (value > this.max)
                value = this.max;
            let slideValue = [value, null];
            if (handle === TCh5SliderHandle.HIGHVALUE) {
                if (value < this.value)
                    value = this.value + 1;
                else if (value > this.max)
                    value = this.max;
                slideValue = [null, value];
            }
            if (isNaN(animationLength) || animationLength <= 0 || animationLength > 120000) {
                this._stopRcbAnimation(handle);
                (_b = (_a = this._innerContainer) === null || _a === void 0 ? void 0 : _a.noUiSlider) === null || _b === void 0 ? void 0 : _b.set(slideValue);
            }
            else {
                (_d = (_c = this._innerContainer) === null || _c === void 0 ? void 0 : _c.noUiSlider) === null || _d === void 0 ? void 0 : _d.set(slideValue);
                this._adjustTooltipValue(handle);
                this._startRcbAnimation(animationLength, handle);
            }
        }
    }
    _onSliderSlide(value, handle) {
        this.logger.start('Ch5Slider._onSliderSlide()');
        this.dispatchEvent(this.sliderEvent = new CustomEvent('slider', {
            bubbles: true,
            cancelable: false,
            detail: {
                handle,
                value
            }
        }));
        this.logger.stop();
    }
    _onSliderStart(value, handle) {
        this.logger.start('Ch5Slider._onSliderStart()');
        this._innerContainer.removeEventListener('touchmove', this._onTouchMoveEnd);
        this._innerContainer.addEventListener('touchmove', this._onMouseLeave);
        this.dispatchEvent(this.sliderStartEvent = new CustomEvent('slidestart', {
            bubbles: true,
            cancelable: false,
            detail: {
                handle,
                value
            }
        }));
        this.isSliderStarted = true;
        this.logger.stop();
    }
    _onSliderStop(value, handle) {
        this.logger.start('Ch5Slider._onSliderStop()');
        this.isSliderStarted = false;
        this.sliderTouch = null;
        this.dispatchEvent(this.sliderEndEvent = new CustomEvent('slideend', {
            bubbles: true,
            cancelable: false,
            detail: {
                handle,
                value
            }
        }));
        this.logger.stop();
    }
    _onSliderChange(value, handle) {
        this.logger.start('Ch5Slider._onSliderChange()');
        this._applyHandleValueToComponent(handle, value);
        if (undefined !== value
            && this._feedbackMode === 'direct') {
            this._sendHandleValueSignal(handle, value);
        }
        this.dispatchEvent(this.sliderEvent = new CustomEvent('slider', {
            bubbles: true,
            cancelable: false,
            detail: {
                handle,
                value
            }
        }));
        if (!this._dirty) {
            this.setDirty();
        }
        if (this._dirty) {
            this.setDirtyValue(handle, value);
        }
        this._maybeSetComponentClean();
        this.logger.stop();
    }
    _onFocus(inEvent) {
        this.logger.start('Ch5Slider._onFocus()');
        if (inEvent.cancelable) {
            inEvent.preventDefault();
        }
        inEvent.stopPropagation();
        this.dispatchEvent(this.focusEvent = new CustomEvent('focus', {
            bubbles: true,
            cancelable: false,
        }));
        this.logger.stop();
    }
    _onTouchMoveEnd(inEvent) {
        this.isSliderStarted = false;
        if (inEvent.cancelable) {
            inEvent.preventDefault();
        }
        inEvent.stopPropagation();
    }
    _onMouseLeave(inEvent) {
        if (this.isSliderStarted === true) {
            const noUiHandle = this._innerContainer.querySelector('.noUi-handle');
            let eventOffsetX = null;
            let eventOffsetY = null;
            if (inEvent.type === 'touchmove') {
                if (_.isNil(this.sliderTouch)) {
                    const touchToCheck = inEvent.touches[0] || inEvent.changedTouches[0];
                    this.sliderTouch = {
                        clientX: touchToCheck.clientX,
                        clientY: touchToCheck.clientY
                    };
                }
                const touch = inEvent.touches[0] || inEvent.changedTouches[0];
                eventOffsetX = touch.clientX;
                eventOffsetY = touch.clientY;
                let touchPositionValue = 0;
                let calculationValue = 0;
                if (!eventOffsetX || !eventOffsetY)
                    return;
                if (this.orientation === 'vertical') {
                    touchPositionValue = Math.abs(this.sliderTouch.clientX - eventOffsetX);
                    calculationValue = this._innerContainer.clientWidth + Ch5Slider.OFFSET_THRESHOLD;
                }
                else {
                    touchPositionValue = Math.abs(this.sliderTouch.clientY - eventOffsetY);
                    calculationValue = this._innerContainer.clientHeight + Ch5Slider.OFFSET_THRESHOLD;
                }
                if (calculationValue < touchPositionValue) {
                    this.isSliderStarted = false;
                    this._innerContainer.addEventListener('touchmove', this._onTouchMoveEnd);
                    this.dispatchEvent(this.blurEvent = new CustomEvent('touchend', {
                        bubbles: false,
                        cancelable: false,
                    }));
                }
            }
            else {
                eventOffsetX = inEvent.clientX;
                eventOffsetY = inEvent.clientY;
                let touchPositionValue = 0;
                let calculationValue = 0;
                if (!eventOffsetX || !eventOffsetY)
                    return;
                if (this.orientation === 'vertical') {
                    touchPositionValue = Math.abs(this._innerContainer.clientLeft - eventOffsetX);
                    calculationValue = this._innerContainer.clientWidth + Ch5Slider.OFFSET_THRESHOLD;
                }
                else {
                    touchPositionValue = Math.abs(this._innerContainer.clientTop - eventOffsetY);
                    calculationValue = this._innerContainer.clientHeight + Ch5Slider.OFFSET_THRESHOLD;
                }
                if (calculationValue < touchPositionValue) {
                    this.isSliderStarted = false;
                    this.dispatchEvent(this.blurEvent = new CustomEvent('mouseup', {
                        bubbles: true,
                        cancelable: false
                    }));
                    noUiHandle.blur();
                }
            }
        }
    }
    _onBlur(inEvent) {
        this.logger.start('Ch5Slider._onBlur()');
        if (inEvent.cancelable) {
            inEvent.preventDefault();
        }
        inEvent.stopPropagation();
        this.dispatchEvent(this.blurEvent = new CustomEvent('blur', {
            bubbles: true,
            cancelable: false,
        }));
        this.logger.stop();
    }
    _applyHandleValueToComponent(handle, value) {
        switch (handle) {
            case TCh5SliderHandle.VALUE:
                this._userLowValue = Number(value[handle]);
                break;
            case TCh5SliderHandle.HIGHVALUE:
                this._userHighValue = Number(value[handle]);
                break;
            default:
                break;
        }
    }
    _sendHandleValueSignal(handle, value) {
        const numberVal = Math.round(Number(value[handle]));
        switch (handle) {
            case TCh5SliderHandle.VALUE:
                this._setDirtyHandler(handle);
                this._sendValueForChangeSignal(numberVal);
                break;
            case TCh5SliderHandle.HIGHVALUE:
                this._setDirtyHandler(handle);
                this._sendHighValueForChangeSignal(numberVal);
                break;
            default:
                break;
        }
    }
    _sendValueForChangeSignal(value) {
        let sigChange = null;
        if (Ch5Common.isNotNil(this.sendEventOnChange)) {
            sigChange = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventOnChange);
            if (sigChange !== null && sigChange.value !== value) {
                sigChange.publish(value);
            }
        }
    }
    _sendHighValueForChangeSignal(value) {
        let sigChange = null;
        if (this.range && Ch5Common.isNotNil(this.sendEventOnChangeHigh)) {
            sigChange = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventOnChangeHigh);
            if (sigChange !== null) {
                sigChange.publish(value);
            }
        }
    }
    _setDirtyHandler(handle) {
        this.logger.start('Ch5Slider._setDirtyHandler');
        switch (handle) {
            case TCh5SliderHandle.VALUE:
                if (this._dirtyTimerHandle !== null) {
                    clearTimeout(this._dirtyTimerHandle);
                }
                this._dirtyTimerHandle = window.setTimeout(() => this._onDirtyTimerFinished(handle), this._signalValueSyncTimeout);
                break;
            case TCh5SliderHandle.HIGHVALUE:
                if (this._dirtyTimerHandleHigh !== null) {
                    clearTimeout(this._dirtyTimerHandleHigh);
                }
                this._dirtyTimerHandleHigh = window.setTimeout(() => this._onDirtyTimerFinished(handle), this._signalValueSyncTimeout);
                break;
            default:
                break;
        }
        this.logger.stop();
    }
    _onDirtyTimerFinished(handle) {
        this.logger.start('Ch5Slider._onDirtyTimerFinished');
        switch (handle) {
            case TCh5SliderHandle.VALUE:
                this._dirtyTimerHandle = null;
                if (this._dirtyValue !== this._cleanValue) {
                    const nrCleanValue = Number(this._cleanValue);
                    this._setSliderValue(nrCleanValue, TCh5SliderHandle.VALUE);
                    this.value = nrCleanValue;
                    this._setCleanLow();
                    this._applyTooltipValue(this._tooltip[TCh5SliderHandle.VALUE], nrCleanValue);
                }
                break;
            case TCh5SliderHandle.HIGHVALUE:
                this._dirtyTimerHandleHigh = null;
                if (this._dirtyValueHigh !== this._cleanValueHigh) {
                    const nrCleanValue = Number(this._cleanValueHigh);
                    this._setSliderValue(nrCleanValue, TCh5SliderHandle.HIGHVALUE);
                    this.valueHigh = nrCleanValue;
                    this._setCleanHigh();
                    this._applyTooltipValue(this._tooltip[TCh5SliderHandle.HIGHVALUE], nrCleanValue);
                }
                break;
            default:
                break;
        }
        this.setClean();
        this.logger.stop();
    }
    _maybeSetComponentClean() {
        if ((this._dirtyValue === this._cleanValue)) {
            this._setCleanLow();
        }
        if ((this._dirtyValueHigh === this._cleanValueHigh)) {
            this._setCleanHigh();
        }
        this.setClean();
    }
    _parsedSliderOptions() {
        let behaviour = this.tapSettable ? 'tap' : 'none';
        if (this.tapSettable === false) {
            if ((this.sendEventOnUpper || this.sendEventOnLower) && this.isAdvancedSlider === true) {
                behaviour = 'hover';
                if (this.toolTipDisplayType === "%") {
                    this.toolTipShowType = "off";
                }
            }
        }
        let direction = "ltr";
        if (this.orientation === 'vertical') {
            if (this.dir === "rtl") {
                direction = "ltr";
            }
            else {
                direction = "rtl";
            }
        }
        else {
            direction = this.dir;
        }
        if (Ch5Common.isNil(direction)) {
            direction = "ltr";
        }
        const connect = this._connectDisplayFormatter();
        const step = this.step;
        let range = { 'min': this.min, 'max': this.max };
        const pips = this._parsedTicks();
        let pipsOptions = {};
        if (typeof pips === 'object') {
            this._maybeSetMinAndMaxFromPips(pips);
            range = this._getRangeFromPips(pips);
            pipsOptions = {
                mode: 'positions',
                density: 100,
                values: Object.keys(pips).map(value => Number(value)),
                format: {
                    to: (value) => {
                        return this.showTickValues ? value : '';
                    }
                }
            };
            this.handleValue();
            this.handleValueHigh();
        }
        const tooltips = this.toolTipShowType === "off"
            ? false
            : this.range ? [{ to: this._toolTipDisplayTypeFormatter.bind(this) }, { to: this._toolTipDisplayTypeFormatter.bind(this) }] : [{ to: this._toolTipDisplayTypeFormatter.bind(this) }];
        const start = this._getStartValue();
        return {
            start,
            animate: false,
            step,
            behaviour,
            connect,
            direction,
            range,
            orientation: this.orientation,
            pips: Object.getOwnPropertyNames(pips).length !== 0 ? pipsOptions : undefined,
            tooltips
        };
    }
    _getRangeFromPips(pips) {
        const range = {};
        for (const key in pips) {
            if (pips.hasOwnProperty(key)) {
                if ((Object.keys(pips)[0]) === key) {
                    if (Number(key) === 0) {
                        range.min = Number(this.min);
                        continue;
                    }
                    range.min = Number(this.min);
                }
                if (Object.keys(pips)[Object.keys(pips).length - 1] === key) {
                    if (Number(key) === 100) {
                        range.max = Number(this.max);
                        continue;
                    }
                    range.max = Number(this.max);
                }
                range[key + '%'] = Number(pips[key]);
            }
        }
        return range;
    }
    _maybeSetMinAndMaxFromPips(pips) {
        for (const key in pips) {
            if (pips.hasOwnProperty(key)) {
                if ((Object.keys(pips)[0]) === key &&
                    Number(key) === 0) {
                    this.min = Number(pips[key]);
                }
                if (Object.keys(pips)[Object.keys(pips).length - 1] === key &&
                    Number(key) === 100) {
                    this.max = Number(pips[key]);
                }
            }
        }
    }
    _parsedTicks() {
        if (Ch5Common.isNotNil(this.ticks)) {
            try {
                const ticksObj = JSON.parse(this.ticks);
                if (ticksObj && typeof ticksObj === "object") {
                    return ticksObj;
                }
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }
    _setDirtyHigh() {
        this._dirtyHigh = true;
        this._cleanHigh = false;
    }
    _setDirtyLow() {
        this._dirtyLow = true;
        this._cleanLow = false;
    }
    _setCleanLow() {
        this._cleanLow = true;
        this._dirtyLow = false;
    }
    _setCleanHigh() {
        this._cleanHigh = true;
        this._dirtyHigh = false;
    }
    _toolTipDisplayTypeFormatter(value) {
        if (this.toolTipDisplayType === '%') {
            return this._tooltipValueToPercent(value);
        }
        return Math.round(value).toString();
    }
    _tooltipValueToPercent(value) {
        const v = Math.round(value);
        if (isNaN(v)) {
            return value;
        }
        const percent = Math.round((100 * (v - this.min)) / (this.max - this.min));
        return percent.toString() + '%';
    }
    _connectDisplayFormatter() {
        if (this.range === true) {
            return [false, true, false];
        }
        return [true, false];
    }
    _startRcbAnimation(animationLength, handle) {
        const styleParams = {
            'transitionProperty': 'transform',
            'transitionTimingFunction': 'linear'
        };
        styleParams.transitionDuration = animationLength.toString() + 'ms';
        this._setStyleParameters(styleParams);
        if (this._animationTimer !== undefined) {
            window.clearTimeout(this._animationTimer);
            this._animationTimer = undefined;
        }
        this._animatingHandle[handle] = true;
        this._animationTimer = window.setTimeout(() => this._stopRcbAnimation(handle), animationLength);
    }
    _stopRcbAnimation(handle) {
        if (this._animationTimer === undefined) {
            return;
        }
        this._animatingHandle[handle] = false;
        window.clearTimeout(this._animationTimer);
        this._animationTimer = undefined;
        const styleParams = {
            'transitionProperty': 'none',
            'transitionDuration': '0ms',
            'transitionTimingFunction': 'ease'
        };
        this._setStyleParameters(styleParams);
    }
    _setStyleParameters(styleParams) {
        for (const elList of this._tgtEls) {
            for (const itemList of Array.from(elList)) {
                for (const styleName in styleParams) {
                    if (styleParams.hasOwnProperty(styleName)) {
                        const styleVal = styleParams[styleName];
                        itemList.style[styleName] = styleVal;
                    }
                }
            }
        }
    }
    subscribeToAnalogSignal() {
        if (this.receiveStateValue) {
            const receiveAnalogSignalName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValue);
            const receiveAnalogSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveAnalogSignalName);
            if (null !== receiveAnalogSignal) {
                this._subReceiveAnalogValueId = receiveAnalogSignal.subscribe((value) => {
                    if (this._dirtyTimerHandle === null) {
                        this._applyTooltipValue(this._tooltip[TCh5SliderHandle.VALUE], value);
                    }
                    this._tooltipValueFromSignal = value;
                });
            }
        }
    }
    subscribeToAnalogHighSignal() {
        if (this.receiveStateValueHigh) {
            const receiveAnalogSignalName = Ch5Signal.getSubscriptionSignalName(this.receiveStateValueHigh);
            const receiveAnalogSignal = Ch5SignalFactory.getInstance().getNumberSignal(receiveAnalogSignalName);
            if (null !== receiveAnalogSignal) {
                this._subReceiveAnalogValueHighId = receiveAnalogSignal.subscribe((value) => {
                    if (this._dirtyTimerHandleHigh === null) {
                        this._applyTooltipValue(this._tooltip[TCh5SliderHandle.HIGHVALUE], value);
                    }
                    this._tooltipHighValueFromSignal = value;
                });
            }
        }
    }
    unsubscribeFromAnalogSignals() {
        const csf = Ch5SignalFactory.getInstance();
        if ('' !== this._subReceiveAnalogValueId && '' !== this._receiveStateValueSignal) {
            const recSigValName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignal);
            const sigSelected = csf.getNumberSignal(recSigValName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveAnalogValueId);
                this._subReceiveAnalogValueId = '';
            }
        }
        if ('' !== this._subReceiveAnalogValueHighId && '' !== this._receiveStateValueSignalHigh) {
            const recSigValHighName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignalHigh);
            const sigSelected = csf.getNumberSignal(recSigValHighName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveAnalogValueHighId);
                this._subReceiveAnalogValueHighId = '';
            }
        }
    }
    unsubscribeFromObjectSignals() {
        const csf = Ch5SignalFactory.getInstance();
        if ('' !== this._subReceiveValueId && '' !== this._receiveStateValueSignal) {
            const recSigValName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignal);
            const sigSelected = csf.getObjectSignal(recSigValName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveValueId);
                this._receiveStateValueSignal = '';
            }
        }
        if ('' !== this._subReceiveValueHighId && '' !== this._receiveStateValueSignalHigh) {
            const recSigHighValName = Ch5Signal.getSubscriptionSignalName(this._receiveStateValueSignalHigh);
            const sigSelected = csf.getObjectSignal(recSigHighValName);
            if (null !== sigSelected) {
                sigSelected.unsubscribe(this._subReceiveValueHighId);
                this._receiveStateValueSignalHigh = '';
            }
        }
    }
    _applyTooltipValue(tooltip, value) {
        if (undefined !== tooltip
            && null !== tooltip) {
            if (this.min < 0 && value > 0x7FFF) {
                value -= 0x10000;
            }
            if (value > this.max) {
                value = this.max;
            }
            else {
                if (value < this.min) {
                    value = this.min;
                }
            }
            tooltip.textContent = this._toolTipDisplayTypeFormatter(value);
        }
    }
    _calculatedValueWhileInRamp() {
        let scalarValue = this.value;
        if (undefined !== this._rcbSignalValue && undefined !== this._rcbSignalValue.rcb.startv && undefined !== this._rcbSignalValue.rcb.startt) {
            const slope = (this._rcbSignalValue.rcb.value - this._rcbSignalValue.rcb.startv) / this._rcbSignalValue.rcb.time;
            const x = (Date.now() - this._rcbSignalValue.rcb.startt);
            scalarValue = Math.round(slope * x + this._rcbSignalValue.rcb.startv);
        }
        return scalarValue;
    }
    _calculatedHighValueWhileInRamp() {
        let scalarValue = this.value;
        if (undefined !== this._rcbSignalValueHigh && undefined !== this._rcbSignalValueHigh.rcb.startv && undefined !== this._rcbSignalValueHigh.rcb.startt) {
            const slope = (this._rcbSignalValueHigh.rcb.value - this._rcbSignalValueHigh.rcb.startv) / this._rcbSignalValueHigh.rcb.time;
            const x = (Date.now() - this._rcbSignalValueHigh.rcb.startt);
            scalarValue = Math.round(slope * x + this._rcbSignalValueHigh.rcb.startv);
        }
        return scalarValue;
    }
    _applySignalReceivedBeforeRender() {
        if (this._rcbSignalValue !== undefined
            && this._rcbSignalValue.rcb.time !== 0
            && this._rcbSignalValue.rcb.startv !== undefined
            && this._rcbSignalValue.rcb.startt !== undefined) {
            this._setSliderValue(this._rcbSignalValue.rcb.value, TCh5SliderHandle.VALUE, this._rcbSignalValue.rcb.time - (Date.now() - this._rcbSignalValue.rcb.startt));
        }
        if (this._rcbSignalValueHigh !== undefined
            && this._rcbSignalValueHigh.rcb.time !== 0
            && this._rcbSignalValueHigh.rcb.startv !== undefined
            && this._rcbSignalValueHigh.rcb.startt !== undefined) {
            this._setSliderValue(this._rcbSignalValueHigh.rcb.value, TCh5SliderHandle.HIGHVALUE, this._rcbSignalValueHigh.rcb.time - (Date.now() - this._rcbSignalValueHigh.rcb.startt));
        }
    }
    _adjustTooltipValue(handle) {
        const index = (handle === TCh5SliderHandle.VALUE) ? TCh5SliderHandle.VALUE : TCh5SliderHandle.HIGHVALUE;
        if (undefined !== this._tooltipValueFromSignal && handle === TCh5SliderHandle.VALUE) {
            this._applyTooltipValue(this._tooltip[index], this._tooltipValueFromSignal);
        }
        if (undefined !== this._tooltipHighValueFromSignal && handle === TCh5SliderHandle.HIGHVALUE) {
            this._applyTooltipValue(this._tooltip[index], this._tooltipHighValueFromSignal);
        }
    }
    _getStartValue() {
        let val = this.value;
        let valHigh = this.valueHigh;
        if (this.value < this.min)
            val = this.min;
        if (this.value > this.max)
            val = this.max;
        if (this.valueHigh > this.max)
            valHigh = this.max;
        if (this.valueHigh <= this.value)
            valHigh = this.value;
        let start = (this.range === false) ? val : [val, valHigh];
        this._cleanValue = val;
        if (this.range === true) {
            this._cleanValueHigh = valHigh;
        }
        if (!this._wasRendered) {
            start = this._getStartValueWhileInRamp();
        }
        return start;
    }
    _getStartValueWhileInRamp() {
        let value;
        let valueHigh;
        if (undefined !== this._rcbSignalValue
            && undefined !== this._rcbSignalValue.rcb.startv
            && this._rcbSignalValue.rcb.time !== 0) {
            value = this._calculatedValueWhileInRamp();
        }
        else {
            value = this.value;
        }
        if (undefined !== this._rcbSignalValueHigh
            && undefined !== this._rcbSignalValueHigh.rcb.startv
            && this._rcbSignalValueHigh.rcb.time !== 0) {
            valueHigh = this._calculatedHighValueWhileInRamp();
        }
        else {
            valueHigh = this.valueHigh;
        }
        if (this.value < this.min)
            value = this.min;
        if (this.value > this.max)
            value = this.max;
        if (this.valueHigh > this.max)
            valueHigh = this.max;
        if (this.valueHigh <= this.value)
            valueHigh = this.value;
        this._cleanValue = value;
        if (this.range === true) {
            this._cleanValueHigh = valueHigh;
        }
        return this.range ? [value, valueHigh] : value;
    }
    handleHandleShape() {
        Array.from(Ch5Slider.COMPONENT_DATA.HANDLE_SHAPE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SHAPE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SHAPE.classListPrefix + this.handleShape);
    }
    handleSendEvent(eventName, value) {
        var _a, _b;
        if (this.range || this.isAdvancedSlider === false || this.disabled) {
            return;
        }
        if (this.sendEventOnUpper !== '' && this.sendEventOnUpper !== null && this.sendEventOnUpper !== undefined && eventName === 'upper') {
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnUpper)) === null || _a === void 0 ? void 0 : _a.publish(value);
        }
        else if (this.sendEventOnLower !== '' && this.sendEventOnLower !== null && this.sendEventOnLower !== undefined && eventName === 'lower') {
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnLower)) === null || _b === void 0 ? void 0 : _b.publish(value);
        }
    }
    sendEventOnHandleClickHandle() {
        var _a, _b;
        if (this.sendEventOnHandleClick && !this.disabled) {
            (_a = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnHandleClick)) === null || _a === void 0 ? void 0 : _a.publish(true);
            (_b = Ch5SignalFactory.getInstance().getBooleanSignal(this.sendEventOnHandleClick)) === null || _b === void 0 ? void 0 : _b.publish(false);
        }
    }
    handleValue() {
        var _a, _b;
        if (this.value > this.max) {
            this.value = this.max;
        }
        else if (this.value < this.min) {
            this.value = this.min;
        }
        if (this.range && this.value > this.valueHigh) {
            this.value = this.valueHigh - 1;
        }
        if (this._dirtyTimerHandle !== null) {
            clearTimeout(this._dirtyTimerHandle);
            this._dirtyTimerHandle = null;
        }
        if (this._wasRendered) {
            (_b = (_a = this._innerContainer) === null || _a === void 0 ? void 0 : _a.noUiSlider) === null || _b === void 0 ? void 0 : _b.set(this.value);
        }
    }
    handleValueHigh() {
        var _a, _b;
        if (this.range === false) {
            return;
        }
        if (this.valueHigh > this.max) {
            this.valueHigh = this.max;
        }
        else if (this.valueHigh < this.min) {
            this.valueHigh = this.min;
        }
        if (this.valueHigh <= this.value) {
            this.valueHigh = this.value;
        }
        if (this._dirtyTimerHandleHigh !== null) {
            clearTimeout(this._dirtyTimerHandleHigh);
            this._dirtyTimerHandleHigh = null;
        }
        if (this._wasRendered) {
            (_b = (_a = this._innerContainer) === null || _a === void 0 ? void 0 : _a.noUiSlider) === null || _b === void 0 ? void 0 : _b.set([this.value, this.valueHigh]);
        }
    }
    handleMax() {
        if (this.max <= this.min) {
            this.max = this.min + 1;
        }
        if (this.value > this.max) {
            this.value = this.max;
        }
        const numberOfSteps = (this.max - this.min) / this.step;
        const modulus = (this.max - this.min) % this.step;
        if (modulus !== 0) {
            this.max = this.min + (Math.floor(numberOfSteps) * this.step);
        }
        this._render();
    }
    handleMin() {
        if (this.min >= this.max) {
            this.min = this.max - 1;
        }
        if (this.value < this.min) {
            this.value = this.min;
        }
        this._render();
    }
    handleOrientation() {
        Array.from(Ch5Slider.COMPONENT_DATA.ORIENTATION.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ORIENTATION.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ORIENTATION.classListPrefix + this.orientation);
        this._render();
    }
    sizeHandler() {
        Array.from(Ch5Slider.COMPONENT_DATA.SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.SIZE.classListPrefix + this.size);
        this._render();
    }
    handleHandleSize() {
        Array.from(Ch5Slider.COMPONENT_DATA.HANDLE_SIZE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SIZE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.HANDLE_SIZE.classListPrefix + this.handleSize);
        this._render();
    }
    handleStretch() {
        Array.from(Ch5Slider.COMPONENT_DATA.STRETCH.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.STRETCH.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.STRETCH.classListPrefix + this.stretch);
        this.stretchHandler();
        this._render();
    }
    stretchHandler() {
        let sliderHeight = this.offsetHeight;
        let sliderWidth = this.offsetWidth;
        let titleHeight = this.offsetHeight;
        if (!this.stretch) {
            sliderHeight = 0;
            sliderWidth = 0;
        }
        if (this._elContainer && this._elContainer.style) {
            const parentElement = this.parentElement;
            if (this.stretch && this.stretch.trim().length > 0 && parentElement) {
                sliderWidth = parentElement.offsetWidth;
                sliderHeight = parentElement.offsetHeight;
                if (this._titlePresent === 1) {
                    titleHeight = sliderHeight - 24;
                }
                else {
                    titleHeight = sliderHeight;
                }
                if (this.stretch === 'height') {
                    if (this.isAdvancedSlider === true) {
                        this._elSliderContainer.style.height = titleHeight + 'px';
                        this._elContainer.style.height = sliderHeight + 'px';
                        this._elSliderContainer.style.removeProperty("width");
                    }
                    else {
                        this._elContainer.style.height = sliderHeight + 'px';
                    }
                    this._elContainer.style.removeProperty("width");
                }
                else if (this.stretch === 'width') {
                    if (this.isAdvancedSlider === true) {
                        this._elSliderContainer.style.width = sliderWidth + 'px';
                        this._elContainer.style.width = sliderWidth + 'px';
                        this._elSliderContainer.style.removeProperty("height");
                    }
                    else {
                        this._elContainer.style.width = sliderWidth + 'px';
                    }
                    this._elContainer.style.removeProperty("height");
                }
                else if (this.stretch === "both") {
                    if (this.isAdvancedSlider === true) {
                        this._elSliderContainer.style.width = sliderWidth + 'px';
                        this._elSliderContainer.style.height = titleHeight + 'px';
                        this._elContainer.style.width = sliderWidth + 'px';
                        this._elContainer.style.height = sliderHeight + 'px';
                    }
                    else {
                        this._elContainer.style.width = sliderWidth + 'px';
                        this._elContainer.style.height = sliderHeight + 'px';
                    }
                }
            }
        }
    }
    handleOnOffOnly() {
        if (this.range || this.isAdvancedSlider === false) {
            Array.from(Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.values).forEach((e) => {
                this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.classListPrefix + String(e));
            });
        }
        else {
            Array.from(Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.values).forEach((e) => {
                this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.classListPrefix + String(e));
            });
            if (this.onOffOnly === true) {
                this._innerContainer.classList.add("ch5-hide-vis");
            }
            else {
                this._innerContainer.classList.remove("ch5-hide-vis");
            }
            this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.ON_OFF_ONLY.classListPrefix + String(this.onOffOnly));
        }
    }
    handleTapSettable() {
        if (this.noHandle === true) {
            this._elContainer.classList.add("nohandle");
        }
        else {
            this._elContainer.classList.remove("nohandle");
        }
    }
    handleToolTipShowType() {
        Array.from(Ch5Slider.COMPONENT_DATA.TOOL_TIP_SHOW_TYPE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.TOOL_TIP_SHOW_TYPE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.TOOL_TIP_SHOW_TYPE.classListPrefix + this.toolTipShowType);
        this._render();
    }
    onOffButtonHelper() {
        let onBtn = null;
        let offBtn = null;
        if (this.range === true) {
            this._elOffContainer.classList.remove("ch5-advanced-slider-button");
            this._elOnContainer.classList.remove("ch5-advanced-slider-button");
            this.isAdvancedSlider = false;
            this._elContainer.classList.remove('ch5-advanced-slider-container');
        }
        else {
            const buttonSlider = this.getElementsByTagName("ch5-slider-button");
            if (buttonSlider.length === 0) {
                this._elOffContainer.classList.add("ch5-advanced-slider-button");
                this._elOnContainer.classList.add("ch5-advanced-slider-button");
                const titleSlider = this.getElementsByTagName("ch5-slider-title-label");
                if (titleSlider.length !== 0) {
                    this.isAdvancedSlider = true;
                    this._elContainer.classList.add('ch5-advanced-slider-container');
                }
                else {
                    this.isAdvancedSlider = false;
                    this._elContainer.classList.remove('ch5-advanced-slider-container');
                }
            }
            else {
                this._elOffContainer.classList.remove("ch5-advanced-slider-button");
                this._elOnContainer.classList.remove("ch5-advanced-slider-button");
                this.isAdvancedSlider = true;
                this._elContainer.classList.add('ch5-advanced-slider-container');
                Array.from(buttonSlider).forEach(btn => {
                    if (btn.getAttribute("key") === 'off') {
                        offBtn = btn;
                        if (this.stretch && this.orientation === "horizontal") {
                            btn.classList.add("ch5-slider-horizontal-stretch");
                        }
                        else if (this.orientation === "vertical" && (this.stretch === "both" || this.stretch === "width")) {
                            btn.classList.add("ch5-slider-vertical-stretch");
                        }
                        this._elContainer.classList.add('ch5-slider-off-button');
                    }
                    else if (btn.getAttribute("key") === 'on') {
                        onBtn = btn;
                        if (this.stretch && this.orientation === "horizontal") {
                            btn.classList.add("ch5-slider-horizontal-stretch");
                        }
                        else if (this.orientation === "vertical" && (this.stretch === "both" || this.stretch === "width")) {
                            btn.classList.add("ch5-slider-vertical-stretch");
                        }
                        this._elContainer.classList.add('ch5-slider-on-button');
                    }
                });
                if (onBtn) {
                    this._elOnContainer.appendChild(onBtn);
                }
                if (offBtn) {
                    this._elOffContainer.appendChild(offBtn);
                }
            }
        }
    }
    titleHelper() {
        if (this.range === false) {
            const titleSlider = this.getElementsByTagName("ch5-slider-title-label");
            Array.from(titleSlider).forEach((title, index) => {
                if (index >= 1) {
                    return;
                }
                if (title.parentElement instanceof Ch5Slider) {
                    const sliderTtl = new Ch5SliderTitleLabel(this);
                    Ch5SliderTitleLabel.observedAttributes.forEach((attr) => {
                        if (title.hasAttribute(attr)) {
                            sliderTtl.setAttribute(attr, title.getAttribute(attr) + '');
                        }
                    });
                }
                this._elContainer.classList.add('ch5-slider-title');
            });
        }
        else {
            this._elContainer.classList.remove('ch5-slider-title');
        }
    }
    helper(elem, val) {
        Array.from(elem.children).forEach(container => container.remove());
        elem.appendChild(val);
    }
    setValues(elem, val) {
        if (this.range === false) {
            if (elem === "title") {
                if (val.innerHTML !== "") {
                    this._titlePresent = 1;
                }
                else {
                    this._titlePresent = -1;
                }
                this.helper(this._elTitleContainer, val);
            }
            else if (elem === "on") {
                this.helper(this._elOnContainer, val);
            }
            else if (elem === "off") {
                this.helper(this._elOffContainer, val);
            }
        }
    }
    handleToolTipDisplayType() {
        Array.from(Ch5Slider.COMPONENT_DATA.TOOL_TIP_DISPLAY_TYPE.values).forEach((e) => {
            this._elContainer.classList.remove(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.TOOL_TIP_DISPLAY_TYPE.classListPrefix + e);
        });
        this._elContainer.classList.add(Ch5Slider.ELEMENT_NAME + Ch5Slider.COMPONENT_DATA.TOOL_TIP_DISPLAY_TYPE.classListPrefix + this.toolTipDisplayType);
        this._render();
    }
}
Ch5Slider.ELEMENT_NAME = 'ch5-slider';
Ch5Slider.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { sendeventonchange: { direction: "event", numericJoin: 1, contractName: true }, sendeventonchangehigh: { direction: "event", numericJoin: 1, contractName: true }, receivestatevalue: { direction: "state", numericJoin: 1, contractName: true }, receivestatevaluehigh: { direction: "state", numericJoin: 1, contractName: true }, receivestateshowonoffonly: { direction: "state", booleanJoin: 1, contractName: true }, sendeventonupper: { direction: "event", booleanJoin: 1, contractName: true }, receivestateupper: { direction: "state", booleanJoin: 1, contractName: true }, sendeventonlower: { direction: "event", booleanJoin: 1, contractName: true }, receivestatelower: { direction: "state", booleanJoin: 1, contractName: true }, sendeventonhandleclick: { direction: "event", booleanJoin: 1, contractName: true } });
Ch5Slider.MIN_VALUE = 0;
Ch5Slider.MAX_VALUE = 65535;
Ch5Slider.DEFAULT_STEP = 1;
Ch5Slider.HANDLE_SHAPE = ['rounded-rectangle', 'rectangle', 'circle', 'oval'];
Ch5Slider.ORIENTATION = ['horizontal', 'vertical'];
Ch5Slider.SIZE = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5Slider.HANDLE_SIZE = ['regular', 'x-small', 'small', 'large', 'x-large'];
Ch5Slider.STRETCH = ['both', 'height', 'width'];
Ch5Slider.TOOL_TIP_SHOW_TYPE = ['off', 'on', 'auto'];
Ch5Slider.TOOL_TIP_DISPLAY_TYPE = ['%', 'value'];
Ch5Slider.COMPONENT_DATA = {
    HANDLE_SHAPE: {
        default: Ch5Slider.HANDLE_SHAPE[0],
        values: Ch5Slider.HANDLE_SHAPE,
        key: 'handleShape',
        attribute: 'handleShape',
        classListPrefix: '--shape--'
    },
    ORIENTATION: {
        default: Ch5Slider.ORIENTATION[0],
        values: Ch5Slider.ORIENTATION,
        key: 'orientation',
        attribute: 'orientation',
        classListPrefix: '--orientation--'
    },
    SIZE: {
        default: Ch5Slider.SIZE[0],
        values: Ch5Slider.SIZE,
        key: 'size',
        attribute: 'size',
        classListPrefix: '--size--'
    },
    HANDLE_SIZE: {
        default: Ch5Slider.HANDLE_SIZE[0],
        values: Ch5Slider.HANDLE_SIZE,
        key: 'handleSize',
        attribute: 'handleSize',
        classListPrefix: '--handle-size--'
    },
    STRETCH: {
        default: Ch5Slider.STRETCH[0],
        values: Ch5Slider.STRETCH,
        key: 'stretch',
        attribute: 'stretch',
        classListPrefix: '--stretch--'
    },
    TOOL_TIP_SHOW_TYPE: {
        default: Ch5Slider.TOOL_TIP_SHOW_TYPE[0],
        values: Ch5Slider.TOOL_TIP_SHOW_TYPE,
        key: 'toolTipShowType',
        attribute: 'toolTipShowType',
        classListPrefix: '--tooltip--'
    },
    TOOL_TIP_DISPLAY_TYPE: {
        default: Ch5Slider.TOOL_TIP_DISPLAY_TYPE[0],
        values: Ch5Slider.TOOL_TIP_DISPLAY_TYPE,
        key: 'toolTipDisplayType',
        attribute: 'toolTipDisplayType',
        classListPrefix: '--tooltip-display-type-'
    },
    ON_OFF_ONLY: {
        default: false,
        values: [true, false],
        key: 'onOffOnly',
        attribute: 'onOffOnly',
        classListPrefix: '--on-off-only-'
    }
};
Ch5Slider.COMPONENT_PROPERTIES = [
    {
        default: 0,
        name: "min",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 0,
        numberProperties: {
            min: -65535,
            max: 65534,
            conditionalMin: -65535,
            conditionalMax: 65534,
            conditionalMinValue: -65535,
            conditionalMaxValue: 65534
        },
        isObservableProperty: true
    },
    {
        default: 65535,
        name: "max",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 65535,
        numberProperties: {
            min: -65534,
            max: 65535,
            conditionalMin: -65534,
            conditionalMax: 65535,
            conditionalMinValue: -65534,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "ticks",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true,
    },
    {
        default: Ch5Slider.HANDLE_SHAPE[0],
        enumeratedValues: Ch5Slider.HANDLE_SHAPE,
        name: "handleShape",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.HANDLE_SHAPE[0],
        isObservableProperty: true
    },
    {
        default: false,
        name: "range",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: Ch5Slider.ORIENTATION[0],
        enumeratedValues: Ch5Slider.ORIENTATION,
        name: "orientation",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.ORIENTATION[0],
        isObservableProperty: true
    },
    {
        default: Ch5Slider.SIZE[0],
        enumeratedValues: Ch5Slider.SIZE,
        name: "size",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.SIZE[0],
        isObservableProperty: true
    },
    {
        default: Ch5Slider.HANDLE_SIZE[0],
        enumeratedValues: Ch5Slider.HANDLE_SIZE,
        name: "handleSize",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.HANDLE_SIZE[0],
        isObservableProperty: true
    },
    {
        default: "",
        enumeratedValues: Ch5Slider.STRETCH,
        name: "stretch",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.STRETCH[0],
        isObservableProperty: true
    },
    {
        default: false,
        name: "noHandle",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: 1,
        name: "step",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: 1,
            max: 65535,
            conditionalMin: 1,
            conditionalMax: 65535,
            conditionalMinValue: 1,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: false,
        name: "showTickValues",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: Ch5Slider.TOOL_TIP_SHOW_TYPE[0],
        enumeratedValues: Ch5Slider.TOOL_TIP_SHOW_TYPE,
        name: "toolTipShowType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.TOOL_TIP_SHOW_TYPE[0],
        isObservableProperty: true
    },
    {
        default: Ch5Slider.TOOL_TIP_DISPLAY_TYPE[0],
        enumeratedValues: Ch5Slider.TOOL_TIP_DISPLAY_TYPE,
        name: "toolTipDisplayType",
        removeAttributeOnNull: true,
        type: "enum",
        valueOnAttributeEmpty: Ch5Slider.TOOL_TIP_DISPLAY_TYPE[0],
        isObservableProperty: true
    },
    {
        default: false,
        name: "tapSettable",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: true,
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValue",
        signalType: "object",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateValueHigh",
        signalType: "object",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: 0,
        name: "value",
        nameForSignal: "receiveStateValue",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: -65535,
            max: 65535,
            conditionalMin: -65535,
            conditionalMax: 65535,
            conditionalMinValue: -65535,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: 65535,
        name: "valueHigh",
        nameForSignal: "receiveStateValueHigh",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: null,
        numberProperties: {
            min: -65534,
            max: 65535,
            conditionalMin: -65534,
            conditionalMax: 65535,
            conditionalMinValue: -65534,
            conditionalMaxValue: 65535
        },
        isObservableProperty: true
    },
    {
        default: false,
        name: "onOffOnly",
        nameForSignal: "receiveStateShowOnOffOnly",
        removeAttributeOnNull: true,
        type: "boolean",
        valueOnAttributeEmpty: false,
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateShowOnOffOnly",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnUpper",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnLower",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnChange",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnChangeHigh",
        signalType: "number",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "sendEventOnHandleClick",
        signalType: "boolean",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    }
];
Ch5Slider.OFFSET_THRESHOLD = 30;
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5Slider.ELEMENT_NAME, Ch5Slider);
}
Ch5Slider.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1zbGlkZXIvY2g1LXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFtQixNQUFNLEVBQU8sTUFBTSxZQUFZLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFrSyxnQkFBZ0IsR0FBRyxNQUFNLDJCQUEyQixDQUFDO0FBQzlOLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsMEJBQTBCLEVBQTRDLE1BQU0sNkNBQTZDLENBQUM7QUFDbkksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQWdCN0QsTUFBTSxPQUFPLFNBQVUsU0FBUSxjQUFjO0lBOGhCNUMsSUFBVyxLQUFLLENBQUMsS0FBYztRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBVSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMs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