import Swiper from "swiper";
import { getCSSCustomProperty } from "./utils";
import { isNil } from "lodash";
import { Ch5CustomAttributes } from "../ch5-custom-attrs";
import { publishEvent } from "../ch5-core";
import { Ch5TriggerViewSwiper } from "./ch5-triggerview-swiper";
import _ from "lodash";
export class Ch5TriggerViewSlidesManager {
    constructor(el) {
        this.triggerViewEl = {};
        this._slidesGap = 0;
        this.isSwiperInitialized = false;
        this.isCh5SwiperInitialized = false;
        this._swiper = null;
        this._ch5Swiper = null;
        this._transitionSpeed = 200;
        this._externalWrapper = null;
        this._slidesWrapper = null;
        this._touchMoveListRelatedEventDisabled = false;
        this.triggerViewEl = el;
    }
    prepareSwiperSlides() {
        const slides = this.getTriggerViewChildSlides();
        if (this.triggerViewEl.flag === -1) {
            this.triggerViewEl.slidesNumber = slides.length;
            this.triggerViewEl.flag = 0;
        }
        if (!this._externalWrapper) {
            this._createSlidesWrappers();
        }
        this.initSlides(slides);
        this._computeSizes();
    }
    initSwiper() {
        const id = this.triggerViewEl.getCrId();
        if (this.triggerViewEl.gestureable === false && this.triggerViewEl.disableAnimation === true) {
            if (!_.isNil(this._slidesWrapper)) {
                this._slidesWrapper.classList.add("slider-full-width-page");
            }
            this._ch5Swiper = new Ch5TriggerViewSwiper(`#${id} .${Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDER_CONTAINER_CLASS}`);
            this.isSwiperInitialized = false;
            this.isCh5SwiperInitialized = true;
            const slides = this.getTriggerViewChildSlides();
            this._ch5Swiper.slides = slides;
            this._ch5Swiper.activeView = this.triggerViewEl.activeView;
            this.setActiveIndexForLite();
        }
        else {
            if (!_.isNil(this._slidesWrapper)) {
                this._slidesWrapper.classList.remove("slider-full-width-page");
            }
            this._swiper = new Swiper(`#${id} .${Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDER_CONTAINER_CLASS}`, {
                slidesPerView: 1,
                spaceBetween: this._slidesGap,
                loop: this.triggerViewEl.endless,
                speed: this._getSlidingSpeed(),
                touchRatio: 1.4,
                followFinger: true,
                threshold: this.triggerViewEl.swipeThreshold,
                touchStartPreventDefault: false,
                touchMoveStopPropagation: false,
                nested: this.triggerViewEl.nested,
                updateOnImagesReady: true,
                initialSlide: this.getInitialSlide()
            });
            this.isSwiperInitialized = true;
            this.isCh5SwiperInitialized = false;
            this._swiper.on('slideChange', () => {
                this._updateActiveSlideAttributes();
                this._updateTriggerViewElActiveViewWhenChangedBySwiper();
                publishEvent('b', 'triggerview.slidechange', true);
            });
            this._swiper.on('slideChangeTransitionStart', () => {
                publishEvent('b', 'triggerview.slidemove', true);
            });
            this.setAllowTouchMove(this.triggerViewEl.gestureable);
            this._swiper.on('touchStart', (...e) => {
                const target = e[0].target;
                if (this.eventTargetBelongsToCh5List(target)) {
                    this.setAllowTouchMove(false);
                    this._touchMoveListRelatedEventDisabled = true;
                }
            });
            this._swiper.on('touchEnd', (...e) => {
                const target = e[0].target;
                if (this.eventTargetBelongsToCh5List(target) || this._touchMoveListRelatedEventDisabled) {
                    this.setAllowTouchMove(this.triggerViewEl.gestureable);
                    this._touchMoveListRelatedEventDisabled = false;
                }
                publishEvent('b', 'triggerview.touchend', true);
            });
        }
    }
    getInitialSlide() {
        if (this.triggerViewEl && 0 !== this.triggerViewEl.activeView) {
            return this.triggerViewEl.activeView;
        }
        else {
            return 0;
        }
    }
    setActiveIndexForLite() {
        if (this._ch5Swiper) {
            const activeSlideIndex = this._ch5Swiper.activeView;
            if (activeSlideIndex !== this.triggerViewEl.activeView) {
                this.triggerViewEl.activeView = this._ch5Swiper.activeView;
            }
            const slides = this.getTriggerViewChildSlides();
            Array.from(slides).forEach((slide, index) => {
                slide.style.width = "100%";
                if (index !== activeSlideIndex) {
                    slide.setAttribute('tabindex', '-1');
                    slide.setAttribute('aria-hidden', 'true');
                    slide.setAttribute('inert', 'true');
                    slide.classList.add('ch5-hide-vis-position');
                    slide.removeAttribute('selected');
                }
                else {
                    slide.setAttribute('tabindex', '1');
                    slide.setAttribute('aria-hidden', 'false');
                    slide.removeAttribute('inert');
                    slide.classList.remove('ch5-hide-vis-position');
                    slide.setAttribute('selected', '');
                }
            });
        }
    }
    eventTargetBelongsToCh5List(el) {
        const isSlideEl = !!el && el.closest('ch5-slider') !== null;
        const isListEl = !!el && el.closest('ch5-list') !== null;
        let touchMoveForList = false;
        if (isListEl) {
            const listEl = el.closest('ch5-list');
            if (listEl.hasAttribute("orientation")) {
                const listOrientation = listEl.getAttribute("orientation");
                touchMoveForList = (listOrientation === "horizontal");
            }
        }
        return isSlideEl || touchMoveForList;
    }
    reinitializeSwiper() {
        if (this.swiperIsActive()) {
            this.destroySwiper();
            this.initSwiper();
        }
        else if (this.ch5SwiperIsActive()) {
            this._ch5Swiper = null;
            this.initSwiper();
        }
    }
    set swiperSensitivity(newThreshold) {
        this.triggerViewEl.swipeThreshold = newThreshold;
        if (this._swiper !== null) {
            this._swiper.params.threshold = newThreshold;
        }
    }
    swiperIsActive() {
        return ((this._swiper instanceof Swiper) && !_.isNil(this._swiper) && this.isSwiperInitialized === true);
    }
    ch5SwiperIsActive() {
        return ((this._ch5Swiper instanceof Ch5TriggerViewSwiper) && !_.isNil(this._ch5Swiper) && this.isCh5SwiperInitialized === true);
    }
    destroySwiper() {
        if (this.swiperIsActive()) {
            if (this._swiper && this._swiper.$el) {
                this._swiper.destroy(true, false);
            }
        }
    }
    getSlidesNumber() {
        if (this.triggerViewEl.slidesNumber === 0) {
            if (this.swiperIsActive() && !isNil(this._swiper) && !isNil(this._swiper.slides)) {
                return this._swiper.slides.length;
            }
            else if (this.ch5SwiperIsActive() && !isNil(this._ch5Swiper) && !isNil(this._ch5Swiper.slides)) {
                return this._ch5Swiper.slides.length;
            }
            else {
                const slides = this.getTriggerViewChildSlides();
                return slides.length;
            }
        }
        else {
            return this.triggerViewEl.slidesNumber;
        }
    }
    swiperActiveViewInitialized() {
        if (this._swiper) {
            if (typeof this._swiper.activeIndex === 'undefined') {
                return false;
            }
        }
        return true;
    }
    initSlides(slides) {
        Ch5CustomAttributes.preventUnsubscribe = true;
        const trvHasListRole = this.triggerViewEl.getAttribute('role') === 'list';
        Array.from(slides).forEach((slide, index) => {
            const isActive = slide.hasAttribute('selected') || (index === this.triggerViewEl.activeView);
            slide.setAttribute('tabindex', isActive ? '1' : '-1');
            slide.setAttribute('aria-hidden', String(!isActive));
            if (isActive) {
                slide.removeAttribute('inert');
                if (!slide.hasAttribute('selected')) {
                    slide.setAttribute('selected', '');
                }
            }
            else {
                slide.setAttribute('inert', 'true');
            }
            if (trvHasListRole) {
                slide.setAttribute('role', 'listitem');
            }
            slide.classList.add(Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDE_CLASS);
            this._slidesWrapper.appendChild(slide);
        });
    }
    swipeTo(slideBaseOneIndex, instantTransition = false, speed) {
        if (this.swiperIsActive()) {
            const _speed = !_.isNil(speed) ? speed : this._transitionSpeed;
            const slideIndex = this.triggerViewEl.endless ? slideBaseOneIndex + 1 : slideBaseOneIndex;
            if (slideIndex !== this._swiper.activeIndex && this._swiper.hasOwnProperty('snapGrid')) {
                const selectedSpeed = instantTransition ? 0 : _speed;
                try {
                    this._swiper.slideTo(slideIndex, selectedSpeed);
                }
                catch (e) {
                }
                this._updateActiveSlideAttributes();
            }
        }
        else if (this.ch5SwiperIsActive() && !_.isNil(this._ch5Swiper)) {
            this._ch5Swiper.activeView = slideBaseOneIndex;
            this.setActiveIndexForLite();
        }
    }
    getChildElSwipeIndex(childView) {
        let slideIndex = null;
        if (this.swiperIsActive()) {
            let slide = null;
            let index = null;
            if (!isNil(this._swiper) && !isNil(this._swiper.slides)) {
                Array.from(this._swiper.slides).forEach((s, i) => {
                    if (!s.classList.contains('swiper-slide-duplicate') && childView === s) {
                        slide = s;
                        index = i;
                    }
                });
            }
            if (slide !== null) {
                if (this.triggerViewEl.endless) {
                    slideIndex = Number(slide.getAttribute('data-swiper-slide-index'));
                }
                else {
                    slideIndex = index;
                }
            }
        }
        else if (this.ch5SwiperIsActive()) {
            if (!isNil(this._ch5Swiper)) {
                let slide = null;
                let index = null;
                Array.from(this._ch5Swiper.slides).forEach((s, i) => {
                    if (childView === s) {
                        slide = s;
                        index = i;
                    }
                });
                if (slide !== null) {
                    if (this.triggerViewEl.endless) {
                        slideIndex = Number(slide.getAttribute('data-swiper-slide-index'));
                    }
                    else {
                        slideIndex = index;
                    }
                }
            }
        }
        return isNaN(slideIndex) ? null : slideIndex;
    }
    slideNext() {
        if (this.swiperIsActive()) {
            this._swiper.slideNext(this._getSlidingSpeed());
        }
        else if (this.ch5SwiperIsActive() && !_.isNil(this._ch5Swiper)) {
            this._ch5Swiper.incrementActiveView(this.triggerViewEl.endless);
            this.setActiveIndexForLite();
        }
    }
    slidePrevious() {
        if (this.swiperIsActive()) {
            this._swiper.slidePrev(this._getSlidingSpeed());
        }
        else if (this.ch5SwiperIsActive() && !_.isNil(this._ch5Swiper)) {
            this._ch5Swiper.decrementActiveView(this.triggerViewEl.endless);
            this.setActiveIndexForLite();
        }
    }
    setAllowTouchMove(active) {
        if (this.swiperIsActive()) {
            this._swiper.allowTouchMove = active;
        }
    }
    refreshSlideSpeed() {
        if (this.swiperIsActive()) {
            this._swiper.params.speed = this._getSlidingSpeed();
        }
    }
    getActiveIndex() {
        if (this.swiperIsActive()) {
            return this._swiper.realIndex;
        }
        else if (this.ch5SwiperIsActive() && !_.isNil(this._ch5Swiper)) {
            return this._ch5Swiper.activeView;
        }
        else {
            return this._swiper.realIndex;
        }
    }
    getSwiperParam(paramName) {
        if (!this.swiperIsActive()) {
            return null;
        }
        return this._swiper.params[paramName];
    }
    getTriggerViewChildSlides() {
        if (this.swiperIsActive()) {
            const slidesElements = Array.from(this.triggerViewEl.children)
                .filter((e) => e.tagName.toLowerCase() === Ch5TriggerViewSlidesManager.TRIGGERVIEW_CHILD_SELECTOR);
            return slidesElements;
        }
        else if (this.ch5SwiperIsActive()) {
            if (this.triggerViewEl.children && this.triggerViewEl.children.length > 1 && this.triggerViewEl.children[1].children && this.triggerViewEl.children[1].children.length > 0) {
                const slidesElements = Array.from(this.triggerViewEl.children[1].children[0].children)
                    .filter((e) => e.tagName.toLowerCase() === Ch5TriggerViewSlidesManager.TRIGGERVIEW_CHILD_SELECTOR);
                return slidesElements;
            }
            else {
                return [];
            }
        }
        else {
            const slidesElements = Array.from(this.triggerViewEl.children)
                .filter((e) => e.tagName.toLowerCase() === Ch5TriggerViewSlidesManager.TRIGGERVIEW_CHILD_SELECTOR);
            return slidesElements;
        }
    }
    _createSlidesWrappers() {
        this._externalWrapper = document.createElement('div');
        this._externalWrapper.classList.add(Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDER_CONTAINER_CLASS);
        this._slidesWrapper = document.createElement('div');
        this._slidesWrapper.classList.add(Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDES_WRAPPER_CLASS);
        this._externalWrapper.appendChild(this._slidesWrapper);
        this.triggerViewEl.appendChild(this._externalWrapper);
    }
    _computeSizes() {
        this._slidesGap = this._getSlidesGap();
    }
    _getSlidesGap() {
        if (/\d$/.test(getCSSCustomProperty(this.triggerViewEl, '--ch5-triggerview-gap'))) {
            console.warn(`Warning: it looks like --ch5-triggerview-gap has a unitless value.
            Add CSS units to its value to avoid breaking the slides layout.`);
        }
        const firstSlideEl = this.triggerViewEl.querySelector(Ch5TriggerViewSlidesManager.TRIGGERVIEW_CHILD_SELECTOR);
        if (firstSlideEl) {
            const parsedGap = parseInt(window.getComputedStyle(firstSlideEl).getPropertyValue("margin-right"), 10);
            return !Number.isFinite(parsedGap) ? 0 : parsedGap;
        }
        return 0;
    }
    _updateActiveSlideAttributes() {
        if (this.swiperIsActive()) {
            const activeSlideIndex = this._swiper.activeIndex;
            Array.from(this._swiper.slides).forEach((slide, index) => {
                if (index !== activeSlideIndex) {
                    slide.setAttribute('tabindex', '-1');
                    slide.setAttribute('aria-hidden', 'true');
                    slide.setAttribute('inert', 'true');
                    slide.removeAttribute('selected');
                }
                else {
                    slide.setAttribute('tabindex', '1');
                    slide.setAttribute('aria-hidden', 'false');
                    slide.removeAttribute('inert');
                    slide.setAttribute('selected', '');
                }
            });
        }
    }
    _updateTriggerViewElActiveViewWhenChangedBySwiper() {
        this.triggerViewEl.setAttribute('activeView', String(this.getActiveIndex()));
    }
    _getSlidingSpeed() {
        if (this.triggerViewEl.disableAnimation) {
            return 0;
        }
        return this.triggerViewEl.gestureable ? this._transitionSpeed : 0;
    }
    getSlidesArray() {
        if (this.swiperIsActive() && !isNil(this._swiper) && !isNil(this._swiper.slides)) {
            return this._swiper.slides;
        }
        else if (this.ch5SwiperIsActive() && !isNil(this._ch5Swiper) && !isNil(this._ch5Swiper.slides)) {
            return this.getTriggerViewChildSlides();
        }
        else {
            return this.getTriggerViewChildSlides();
        }
    }
}
Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDER_CONTAINER_CLASS = 'swiper';
Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDES_WRAPPER_CLASS = 'swiper-wrapper';
Ch5TriggerViewSlidesManager.TRIGGERVIEW_SLIDE_CLASS = 'swiper-slide';
Ch5TriggerViewSlidesManager.TRIGGERVIEW_CHILD_SELECTOR = 'ch5-triggerview-child';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRyaWdnZXJ2aWV3LXNsaWRlcy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRyaWdnZXJ2aWV3L2NoNS10cmlnZ2Vydmlldy1zbGlkZXMtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRS9DLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsTUFBTSxPQUFPLDJCQUEyQjtJQXVEdEMsWUFBWSxFQUFrQjtRQTNDdkIsa0JBQWEsR0FBbUIsRUFBb0IsQ0FBQztRQU9wRCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQywyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFPeEMsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsZUFBVSxHQUFnQyxJQUFJLENBQUM7UUFPL0MscUJBQWdCLEdBQVcsR0FBRyxDQUFDO1FBTy9CLHFCQUFnQixHQUF1QixJQUFJLENBQUM7UUFPNUMsbUJBQWMsR0FBdUIsSUFBSSxDQUFDO1FBRTFDLHVDQUFrQyxHQUFZLEtBQUssQ0FBQztRQUcxRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBS00sbUJBQW1CO1FBQ3hCLE1BQU0sTUFBTSxHQUFrQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMs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