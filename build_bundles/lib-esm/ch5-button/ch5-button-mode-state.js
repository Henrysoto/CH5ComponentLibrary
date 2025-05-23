import { Ch5Button } from "./ch5-button";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5ButtonMode } from "./ch5-button-mode";
import { Ch5Log } from "../ch5-common/ch5-log";
import _ from "lodash";
export class Ch5ButtonModeState extends Ch5Log {
    set labelInnerHTML(value) {
        const attributeName = "labelInnerHTML";
        this.logger.start('set ' + attributeName + '("' + value + '")');
        if (value !== null) {
            this.setAttribute(attributeName.toLowerCase(), value);
        }
        else {
            this.removeAttribute(attributeName);
        }
        this._parentCh5Button.createButtonLabel(this);
        this._parentCh5Button.setButtonDisplay();
        this.logger.stop();
    }
    get labelInnerHTML() {
        return this.getAttribute("labelinnerhtml");
    }
    set state(value) {
        this.logger.log('set state("' + value + '")');
        if (this._state !== value) {
            if (Ch5ButtonModeState.STATES.indexOf(value) >= 0) {
                this._state = value;
            }
            else {
                this._state = Ch5ButtonModeState.STATES[0];
            }
            this.setAttribute("state", this._state);
            this._parentCh5Button.setButtonDisplay();
        }
    }
    get state() {
        return this._state;
    }
    set iconClass(value) {
        this.validateAndSetAttributeWithStringType("iconClass", value);
    }
    get iconClass() {
        return this.getAttribute("iconclass");
    }
    set hAlignLabel(value) {
        this.validateAndSetAttributeWithCustomType("hAlignLabel", Ch5Button.HORIZONTAL_LABEL_ALIGNMENTS, value);
    }
    get hAlignLabel() {
        return this.getAttribute("halignlabel");
    }
    set vAlignLabel(value) {
        this.validateAndSetAttributeWithCustomType("vAlignLabel", Ch5Button.VERTICAL_LABEL_ALIGNMENTS, value);
    }
    get vAlignLabel() {
        return this.getAttribute("valignlabel");
    }
    set checkboxPosition(value) {
        this.validateAndSetAttributeWithCustomType("checkboxPosition", Ch5Button.CHECKBOX_POSITIONS, value);
    }
    get checkboxPosition() {
        return this.getAttribute("checkboxposition");
    }
    set iconPosition(value) {
        this.validateAndSetAttributeWithCustomType("iconPosition", Ch5Button.ICON_POSITIONS, value);
    }
    get iconPosition() {
        return this.getAttribute("iconposition");
    }
    set iconUrl(value) {
        this.validateAndSetAttributeWithStringType("iconUrl", value);
    }
    get iconUrl() {
        return this.getAttribute("iconurl");
    }
    set type(value) {
        this.validateAndSetAttributeWithCustomType("type", Ch5Button.TYPES, value);
    }
    get type() {
        return this.getAttribute("type");
    }
    set customClass(value) {
        this.validateAndSetAttributeWithStringType("customClass", value);
    }
    get customClass() {
        return this.getAttribute("customclass");
    }
    set customStyle(value) {
        this.validateAndSetAttributeWithStringType("customStyle", value);
    }
    get customStyle() {
        return this.getAttribute("customstyle");
    }
    set iconUrlFillType(value) {
        this.validateAndSetAttributeWithCustomType("iconUrlFillType", Ch5Button.ICON_URL_FILL_TYPE, value);
    }
    get iconUrlFillType() {
        return this.getAttribute("iconurlfilltype");
    }
    constructor(parentButton) {
        super();
        this.parentButton = parentButton;
        this._state = "normal";
        this.logger.start('constructor');
        if (!_.isNil(parentButton)) {
            this._parentCh5Button = parentButton;
        }
        else {
            this._parentCh5Button = this.getParentButton();
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback');
        if (!(this.parentElement instanceof Ch5ButtonMode)) {
            throw new Error(`Invalid parent element for ch5-button-mode-state.`);
        }
        if (_.isNil(this._parentCh5Button)) {
            throw new Error(`Missing parent ch5-button element for ch5-button-mode-state.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonModeState);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback');
        this.logger.stop();
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Log.observedAttributes;
        const ch5ButtonModeChildAttributes = [
            'type',
            'iconclass',
            'halignlabel',
            'valignlabel',
            'checkboxposition',
            'iconposition',
            'iconurl',
            'state',
            'customclass',
            'customstyle',
            'labelinnerhtml',
            'iconurlfilltype'
        ];
        return commonAttributes.concat(ch5ButtonModeChildAttributes);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback");
        if (oldValue !== newValue) {
            this.logger.log('Ch5ButtonModeState.attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
            switch (attr) {
                case 'type':
                    if (this.hasAttribute('type')) {
                        this.type = newValue;
                    }
                    else {
                        this.type = null;
                    }
                    break;
                case 'labelinnerhtml':
                    if (this.hasAttribute('labelinnerhtml')) {
                        this.labelInnerHTML = newValue;
                    }
                    break;
                case 'iconclass':
                    if (this.hasAttribute('iconclass')) {
                        this.iconClass = newValue;
                    }
                    break;
                case 'customclass':
                    if (this.hasAttribute('customclass')) {
                        this.customClass = newValue;
                    }
                    break;
                case 'customstyle':
                    if (this.hasAttribute('customstyle')) {
                        this.customStyle = newValue;
                    }
                    break;
                case 'halignlabel':
                    if (this.hasAttribute('halignlabel')) {
                        this.hAlignLabel = newValue;
                    }
                    else {
                        this.hAlignLabel = null;
                    }
                    break;
                case 'valignlabel':
                    if (this.hasAttribute('valignlabel')) {
                        this.vAlignLabel = newValue;
                    }
                    else {
                        this.vAlignLabel = null;
                    }
                    break;
                case 'checkboxposition':
                    if (this.hasAttribute('checkboxposition')) {
                        this.checkboxPosition = newValue;
                    }
                    break;
                case 'iconposition':
                    if (this.hasAttribute('iconposition')) {
                        this.iconPosition = newValue;
                    }
                    break;
                case 'iconurl':
                    if (this.hasAttribute('iconurl')) {
                        this.iconUrl = newValue;
                    }
                    break;
                case 'state':
                    if (this.hasAttribute('state')) {
                        this.state = newValue;
                    }
                    break;
                case 'iconurlfilltype':
                    if (this.hasAttribute('iconurlfilltype')) {
                        this.iconUrlFillType = newValue;
                    }
                    break;
                default:
                    super.attributeChangedCallback(attr, oldValue, newValue);
                    break;
            }
        }
        this.logger.stop();
    }
    validateAndSetAttributeWithCustomType(attributeName, parentMasterData, value, removeAttribute = true) {
        this.logger.start('set ' + attributeName + '("' + value + '")');
        if (value !== null) {
            if (parentMasterData.indexOf(value) >= 0) {
                this.setAttribute(attributeName.toLowerCase(), String(value));
                this._parentCh5Button.setButtonDisplay();
            }
            else {
                if (removeAttribute === true) {
                    this.removeAttribute(attributeName);
                }
                else {
                    this.setAttribute(attributeName.toLowerCase(), String(parentMasterData[0]));
                    this._parentCh5Button.setButtonDisplay();
                }
            }
        }
        else {
            if (removeAttribute === true) {
                this.removeAttribute(attributeName);
                this._parentCh5Button.setButtonDisplay();
            }
            else {
                this.setAttribute(attributeName.toLowerCase(), String(parentMasterData[0]));
                this._parentCh5Button.setButtonDisplay();
            }
        }
        this.logger.stop();
    }
    validateAndSetAttributeWithStringType(attributeName, value) {
        this.logger.start('set ' + attributeName + '("' + value + '")');
        if (value !== null) {
            this.setAttribute(attributeName.toLowerCase(), value);
        }
        else {
            this.removeAttribute(attributeName);
        }
        this._parentCh5Button.setButtonDisplay();
        this.logger.stop();
    }
    getParentButton() {
        const getTheMatchingParent = (node) => {
            if (!_.isNil(node) && node.nodeName.toString().toUpperCase() !== "CH5-BUTTON") {
                return getTheMatchingParent(node.parentNode);
            }
            return node;
        };
        return getTheMatchingParent(this.parentElement);
    }
}
Ch5ButtonModeState.ELEMENT_NAME = 'ch5-button-mode-state';
Ch5ButtonModeState.STATES = ["normal", "pressed", "selected"];
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5ButtonModeState.ELEMENT_NAME, Ch5ButtonModeState);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1tb2RlLXN0YXRlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi9jaDUtYnV0dG9uLW1vZGUtc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUV2QixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsTUFBTTtJQWM1QyxJQUFXLGNBQWMsQ0FBQyxLQUFhO1FBQ3JDLE1BQU0sYUFBYSxHQUFXLGdCQUFnQixDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBVyxDQUFDO0lBQ3ZE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