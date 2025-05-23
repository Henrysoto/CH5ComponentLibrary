import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
import { Ch5TemplateStructure } from "./ch5-template-structure";
import { publishEvent } from "../ch5-core";
import { ch5TemplateSubject } from "./refresh-ch5-template";
export class Ch5Template extends Ch5Common {
    constructor() {
        super(...arguments);
        this._templateId = '';
        this._context = '';
        this._contractName = '';
        this._booleanJoinOffset = '';
        this._numericJoinOffset = '';
        this._stringJoinOffset = '';
        this._templateHelper = {};
        this._refreshSubId = null;
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5Template.ELEMENT_NAME, Ch5Template.SIGNAL_ATTRIBUTE_TYPES);
    }
    static registerSignalAttributeDefaults() {
        Ch5SignalAttributeRegistry.instance.addElementDefaultAttributeEntries(Ch5Template.ELEMENT_NAME, {
            contractName: { attributes: ["contractname"], defaultValue: "" },
            booleanJoin: { attributes: ["booleanjoinoffset"], defaultValue: "0" },
            numericJoin: { attributes: ["numericjoinoffset"], defaultValue: "0" },
            stringJoin: { attributes: ["stringjoinoffset"], defaultValue: "0" }
        });
    }
    static registerCustomElement() {
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(Ch5Template.ELEMENT_NAME) === undefined) {
            window.customElements.define(Ch5Template.ELEMENT_NAME, Ch5Template);
        }
    }
    static get observedAttributes() {
        const commonObservedAttributes = Ch5Common.observedAttributes;
        const contextObservedAttributes = [
            'templateid',
            'context',
            'contractname',
            'booleanjoinoffset',
            'numericjoinoffset',
            'stringjoinoffset'
        ];
        return contextObservedAttributes.concat(commonObservedAttributes);
    }
    set templateId(value) {
        if (this._templateId !== value) {
            this._templateId = value;
            this.setAttribute('templateid', value.toString());
        }
    }
    get templateId() {
        return this._templateId;
    }
    set context(value) {
        if (this._context !== value) {
            this._context = value;
            this.setAttribute('context', value.toString());
        }
    }
    get context() {
        return this._context;
    }
    set contractName(value) {
        if (this._contractName !== value) {
            this._contractName = value;
            this.setAttribute('contractname', value);
        }
    }
    get contractName() {
        return this._contractName;
    }
    set booleanJoinOffset(value) {
        if (this._booleanJoinOffset !== value) {
            this._booleanJoinOffset = value;
            this.setAttribute('booleanjoinoffset', value);
        }
    }
    get booleanJoinOffset() {
        return this._booleanJoinOffset;
    }
    set numericJoinOffset(value) {
        if (this._numericJoinOffset !== value) {
            this._numericJoinOffset = value;
            this.setAttribute('numericjoinoffset', value);
        }
    }
    get numericJoinOffset() {
        return this._numericJoinOffset;
    }
    set stringJoinOffset(value) {
        if (this._stringJoinOffset !== value) {
            this._stringJoinOffset = value;
            this.setAttribute('stringjoinoffset', value);
        }
    }
    get stringJoinOffset() {
        return this._stringJoinOffset;
    }
    connectedCallback() {
        this.info('Ch5Template.connectedCallback()');
        Promise.all([
            customElements.whenDefined('ch5-template'),
        ]).then(() => {
            this.initializations();
            this.info('Ch5Template --- Callback loaded');
            if (this._templateHelper && this._templateHelper.instanceId) {
                publishEvent('object', `ch5-template:${this._templateId}`, { loaded: true, id: this._templateHelper.instanceId, elementIds: this._templateHelper.elementIds });
            }
        });
        this.listenForCh5TemplateRefreshRequests();
    }
    listenForCh5TemplateRefreshRequests() {
        this.info('Ch5Template.listenForCh5TemplateRefreshRequests()');
        this._refreshSubId = ch5TemplateSubject.subscribe((ch5TemplateId) => {
            this.info(`Ch5Template.listenForCh5TemplateRefreshRequests() new request for ${ch5TemplateId}`);
            if (!this.shouldRefresh(ch5TemplateId)) {
                return;
            }
            this.initializations(true);
        });
    }
    shouldRefresh(id) {
        this.info(`Ch5Template.shouldRefresh() got called for id ${id}`);
        return this.getAttribute('templateId') === id;
    }
    initAttributes() {
        super.initAttributes();
        this.info('Ch5Template.initAttributes()');
        if (this.hasAttribute('templateid')) {
            this.templateId = this.getAttribute('templateid');
        }
        if (this.hasAttribute('context')) {
            this.context = this.getAttribute('context');
        }
    }
    initializations(force) {
        this.info(`Ch5Template.initializations(${force === true})`);
        if (force === true || !this._templateHelper || !this._templateHelper.instanceId) {
            this.classList.add(Ch5Template.CH5_TEMPLATE_STYLE_CLASS);
            this.initAttributes();
            this._templateHelper = new Ch5TemplateStructure(this);
            this._templateHelper.generateTemplate(this.templateId, this.context);
            this.info('Ch5Template --- Initialization Finished');
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.info(`Ch5Template.attributeChangedCallback("${attr}", "${oldValue}", "${newValue}")`);
        switch (attr) {
            case 'templateId':
                this.templateId = this.getAttribute('templateId');
                break;
            case 'context':
                this.context = this.getAttribute('context');
                break;
            case 'contractname':
                this.contractName = this.getAttribute('contractname');
                break;
            case 'booleanjoinoffset':
                this.booleanJoinOffset = this.getAttribute('booleanjoinoffset');
                break;
            case 'numericjoinoffset':
                this.numericJoinOffset = this.getAttribute('numericjoinoffset');
                break;
            case 'stringjoinoffset':
                this.stringJoinOffset = this.getAttribute('stringjoinoffset');
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    disconnectedCallback() {
        this.info('Ch5Template.disconnectedCallback()');
        if (this._templateHelper && this._templateHelper.instanceId) {
            publishEvent('object', `ch5-template:${this.templateId}`, { loaded: false, id: this._templateHelper.instanceId });
        }
        if (this._refreshSubId !== null) {
            this._refreshSubId.unsubscribe();
            this._refreshSubId = null;
        }
    }
}
Ch5Template.CH5_TEMPLATE_STYLE_CLASS = 'ch5-template';
Ch5Template.ELEMENT_NAME = 'ch5-template';
Ch5Template.SIGNAL_ATTRIBUTE_TYPES = Object.assign(Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES), { contractname: { contractName: true }, booleanjoinoffset: { booleanJoin: 1 }, numericjoinoffset: { numericJoin: 1 }, stringjoinoffset: { stringJoin: 1 } });
Ch5Template.registerCustomElement();
Ch5Template.registerSignalAttributeTypes();
Ch5Template.registerSignalAttributeDefaults();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRlbXBsYXRlL2NoNS10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUE0QyxNQUFNLDZDQUE2QyxDQUFDO0FBQ25JLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHNUQsTUFBTSxPQUFPLFdBQVksU0FBUSxTQUFTO0lBQTFDOztRQXFCUyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQVV6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBS3RCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBSzNCLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUtoQyx1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFLaEMsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBSy9CLG9CQUFlLEdBQXlCLEVBQTBCLENBQUM7UUFLbkUsa0JBQWEsR0FBc0IsSUFBSSxDQUFDO0lBeU9qRCxDQUFDO0lBdk9PLE1BQU0sQ0FBQyw0QkFBNEI7UUFDekMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUVNLE1BQU0sQ0FBQywrQkFBK0I7UUFDNUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDL0YsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtZQUNoRSxXQUFX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