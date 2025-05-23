import { Ch5Button } from "./ch5-button";
import { Ch5RoleAttributeMapping } from "../utility-models/ch5-role-attribute-mapping";
import { Ch5Log } from "../ch5-common/ch5-log";
import _ from "lodash";
const COMPONENT_NAME = "ch5-button-mode";
export class Ch5ButtonMode extends Ch5Log {
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
        this.logger.log('set type("' + value + '")');
        this.validateAndSetAttributeWithCustomType("type", Ch5Button.TYPES, value);
    }
    get type() {
        return this.getAttribute("type");
    }
    set customClass(value) {
        this.logger.log('set customClass("' + value + '")');
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
        this.logger.start('constructor()');
        if (!_.isNil(parentButton)) {
            this._parentCh5Button = parentButton;
        }
        else {
            this._parentCh5Button = this.getParentButton();
        }
        this.logger.stop();
    }
    connectedCallback() {
        this.logger.start('connectedCallback()', COMPONENT_NAME);
        if (!(this._parentCh5Button instanceof Ch5Button)) {
            throw new Error(`Invalid parent element for ch5-button-mode.`);
        }
        this.setAttribute('role', Ch5RoleAttributeMapping.ch5ButtonMode);
        this.setAttribute('data-ch5-id', this.getCrId());
        this.initAttributes();
        this.logger.stop();
    }
    disconnectedCallback() {
        this.logger.start('disconnectedCallback()', COMPONENT_NAME);
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
            'customclass',
            'customstyle',
            'labelinnerhtml',
            'iconurlfilltype'
        ];
        return commonAttributes.concat(ch5ButtonModeChildAttributes);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.logger.start("attributeChangedCallback", COMPONENT_NAME);
        if (oldValue !== newValue) {
            this.logger.log('Ch5ButtonMode.attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + ')"');
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
    validateAndSetAttributeWithCustomType(attributeName, parentMasterData, value) {
        if (value !== null) {
            if (parentMasterData.indexOf(value) >= 0) {
                this.setAttribute(attributeName.toLowerCase(), value);
                this._parentCh5Button.setButtonDisplay();
            }
            else {
                this.removeAttribute(attributeName);
            }
        }
        else {
            this.removeAttribute(attributeName);
            this._parentCh5Button.setButtonDisplay();
        }
    }
    validateAndSetAttributeWithStringType(attributeName, value) {
        if (value !== null) {
            this.setAttribute(attributeName.toLowerCase(), value);
        }
        else {
            this.removeAttribute(attributeName);
        }
        this._parentCh5Button.setButtonDisplay();
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
Ch5ButtonMode.ELEMENT_NAME = 'ch5-button-mode';
if (typeof window === "object" &&
    typeof window.customElements === "object" &&
    typeof window.customElements.define === "function") {
    window.customElements.define(Ch5ButtonMode.ELEMENT_NAME, Ch5ButtonMode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWJ1dHRvbi1tb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWJ1dHRvbi9jaDUtYnV0dG9uLW1vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE1BQU0sY0FBYyxHQUFXLGlCQUFpQixDQUFDO0FBRWpELE1BQU0sT0FBTyxhQUFjLFNBQVEsTUFBTTtJQVF2QyxJQUFXLGNBQWMsQ0FBQyxLQUFhO1FBQ3JDLE1BQU0sYUFBYSxHQUFXLGdCQUFnQixDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBVyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FB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