import QRCode from "qrcode";
import { Ch5ComponentLibrary } from "../ch5-core/ch5-component";
import Ch5ColorUtils from '../ch5-common/utils/ch5-color-utils';
import { Ch5BaseClass } from "../ch5-base/ch5-base-class";
import { resizeObserver } from "../ch5-core/resize-observer";
export class Ch5QrCode extends Ch5BaseClass {
    set color(value) {
        this._ch5Properties.set("color", value, () => {
            this.debounceBuildQrCode();
        });
    }
    get color() {
        return this._ch5Properties.get("color");
    }
    set backgroundColor(value) {
        this._ch5Properties.set("backgroundColor", value, () => {
            this.debounceBuildQrCode();
        });
    }
    get backgroundColor() {
        return this._ch5Properties.get("backgroundColor");
    }
    set size(value) {
        this._ch5Properties.set("size", value, () => {
            this.debounceBuildQrCode();
        });
    }
    get size() {
        return this._ch5Properties.get("size");
    }
    set qrCode(value) {
        this._ch5Properties.set("qrCode", value, () => {
            this.debounceBuildQrCode();
        });
    }
    get qrCode() {
        return this._ch5Properties.get("qrCode");
    }
    set receiveStateQrCode(value) {
        this._ch5Properties.set("receiveStateQrCode", value, null, (newValue) => {
            this._ch5Properties.setForSignalResponse("qrCode", newValue, () => {
                this.debounceBuildQrCode();
            });
        });
    }
    get receiveStateQrCode() {
        return this._ch5Properties.get('receiveStateQrCode');
    }
    constructor() {
        super(Ch5QrCode.COMPONENT_PROPERTIES);
        this.COMPONENT_NAME = "Ch5QrCode";
        this.primaryCssClass = 'ch5-qrcode';
        this._elContainer = {};
        this._canvasContainer = {};
        this.calcuatedSizeFromCSS = 0;
        this.debounceBuildQrCode = this.util.debounce(() => {
            this.handleQrCode();
        }, 50);
        if (!this._isInstantiated) {
            this.createInternalHtml();
        }
        this._isInstantiated = true;
        this.initializeCssClasses();
    }
    connectedCallback() {
        super.connectedCallback();
        this.logger.start('connectedCallback()');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', Ch5ComponentLibrary.ROLES.Ch5QrCode);
        }
        if (this._elContainer.parentElement !== this) {
            this._elContainer.classList.add('ch5-qrcode');
            this.appendChild(this._elContainer);
        }
        this.initAttributes();
        this.initCommonMutationObserver(this);
        resizeObserver(this._elContainer, this.onWindowResizeHandler.bind(this));
        customElements.whenDefined(Ch5QrCode.ELEMENT_NAME).then(() => {
            this.componentLoadedEvent(Ch5QrCode.ELEMENT_NAME, this.id);
            this.debounceBuildQrCode();
        });
        this.logger.stop();
    }
    initializeCssClasses() {
        if (!this._elContainer.classList.contains("ch5-qrcode--size-css")) {
            this._elContainer.classList.add("ch5-qrcode--size-css");
        }
    }
    onWindowResizeHandler() {
        if (!this.hasAttribute("size")) {
            const computedStyle = getComputedStyle(this);
            const calcuatedSizeFromCSS = Number(computedStyle.getPropertyValue('--ch5-qrcode--size'));
            const calculatedSizeObj = Ch5QrCode.COMPONENT_PROPERTIES.find((colorCode) => colorCode.name === "size");
            if (calculatedSizeObj && calculatedSizeObj.numberProperties) {
                if (calcuatedSizeFromCSS >= Number(calculatedSizeObj.numberProperties.min) && calcuatedSizeFromCSS <= Number(calculatedSizeObj.numberProperties.max)) {
                    this.calcuatedSizeFromCSS = calcuatedSizeFromCSS;
                }
                else if (calcuatedSizeFromCSS < Number(calculatedSizeObj.numberProperties.min)) {
                    this.calcuatedSizeFromCSS = calculatedSizeObj.numberProperties.min;
                }
                else if (calcuatedSizeFromCSS > Number(calculatedSizeObj.numberProperties.max)) {
                    this.calcuatedSizeFromCSS = calculatedSizeObj.numberProperties.max;
                }
                else {
                    this.calcuatedSizeFromCSS = 0;
                }
            }
            else {
                this.calcuatedSizeFromCSS = 0;
            }
        }
        else {
            this.calcuatedSizeFromCSS = 0;
        }
        this.handleQrCode();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()');
        this.unsubscribeFromSignals();
        this.logger.stop();
    }
    createInternalHtml() {
        this.logger.start('createInternalHtml()');
        this.clearComponentContent();
        this._elContainer = document.createElement('div');
        this._canvasContainer = document.createElement('canvas');
        this._elContainer.appendChild(this._canvasContainer);
        this._elContainer.classList.add(this.primaryCssClass);
        this.appendChild(this._elContainer);
        this.logger.stop();
    }
    clearComponentContent() {
        const containers = this.getElementsByTagName("div");
        Array.from(containers).forEach((container) => {
            container.remove();
        });
    }
    handleQrCode() {
        var _a, _b;
        const data = this.qrCode;
        const canvasForQRCode = this.querySelector('canvas');
        let calculatedSize = this.size;
        if (!this.hasAttribute("size") && this.calcuatedSizeFromCSS > 0) {
            calculatedSize = this.calcuatedSizeFromCSS;
        }
        if (this.hasAttribute("size")) {
            this._elContainer.style.setProperty('--ch5-qrcode--size', String(calculatedSize));
        }
        else {
            this._elContainer.style.removeProperty('--ch5-qrcode--size');
        }
        if (canvasForQRCode) {
            canvasForQRCode.setAttribute("width", String(calculatedSize));
            canvasForQRCode.setAttribute("height", String(calculatedSize));
        }
        if (data && data !== "") {
            let foregroundColor = Ch5ColorUtils.col2hex(this.color);
            if (!Ch5ColorUtils.validateColorName(this.color)) {
                foregroundColor = (_a = Ch5QrCode.COMPONENT_PROPERTIES.find((colorCode) => colorCode.name === "color")) === null || _a === void 0 ? void 0 : _a.default;
            }
            let backgroundColor = Ch5ColorUtils.col2hex(this.backgroundColor);
            if (!Ch5ColorUtils.validateColorName(this.backgroundColor)) {
                backgroundColor = (_b = Ch5QrCode.COMPONENT_PROPERTIES.find((colorCode) => colorCode.name === "backgroundColor")) === null || _b === void 0 ? void 0 : _b.default;
            }
            const opts = {
                errorCorrectionLevel: 'H',
                type: 'image/svg',
                width: calculatedSize,
                margin: 3,
                color: {
                    light: backgroundColor,
                    dark: foregroundColor
                }
            };
            QRCode.toCanvas(this._canvasContainer, data, opts, function (error) {
                if (error) {
                    console.error(error);
                }
            });
        }
        else {
            if (canvasForQRCode) {
                const context = canvasForQRCode.getContext('2d');
                if (context) {
                    context.clearRect(0, 0, calculatedSize, calculatedSize);
                }
            }
        }
    }
    getTargetElementForCssClassesAndStyle() {
        return this._elContainer;
    }
}
Ch5QrCode.COMPONENT_PROPERTIES = [
    Ch5BaseClass.COMMON_PROPERTIES.debug,
    Ch5BaseClass.COMMON_PROPERTIES.trace,
    Ch5BaseClass.COMMON_PROPERTIES.id,
    Ch5BaseClass.COMMON_PROPERTIES.noshowType,
    Ch5BaseClass.COMMON_PROPERTIES.receiveStateShow,
    Ch5BaseClass.COMMON_PROPERTIES.show,
    {
        default: "#000000",
        name: "color",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "#000000",
        isObservableProperty: true
    },
    {
        default: "#ffffff",
        name: "backgroundColor",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "#ffffff",
        isObservableProperty: true
    },
    {
        default: 160,
        name: "size",
        removeAttributeOnNull: true,
        type: "number",
        valueOnAttributeEmpty: 160,
        numberProperties: {
            min: 160,
            max: 4000,
            conditionalMin: 160,
            conditionalMax: 4000,
            conditionalMinValue: 160,
            conditionalMaxValue: 4000
        },
        isObservableProperty: true
    },
    {
        default: "",
        name: "qrCode",
        nameForSignal: "receiveStateQrCode",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    },
    {
        default: "",
        isSignal: true,
        name: "receiveStateQrCode",
        signalType: "string",
        removeAttributeOnNull: true,
        type: "string",
        valueOnAttributeEmpty: "",
        isObservableProperty: true
    }
];
Ch5QrCode.ELEMENT_NAME = 'ch5-qrcode';
Ch5ComponentLibrary.registerComponent(Ch5QrCode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1xcmNvZGUvY2g1LXFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxhQUFhLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxNQUFNLE9BQU8sU0FBVSxTQUFRLFlBQVk7SUE4RTFDLElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBVyxlQUFlLENBQUMsS0FBYTtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBUyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQzlELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQVcsZUFBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFTLGlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQVMsTUFBTSxFQUFFLEtBQUss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