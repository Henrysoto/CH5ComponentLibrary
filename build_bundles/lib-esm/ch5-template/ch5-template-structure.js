import { isEmpty, isNil } from 'lodash';
import { Ch5AugmentVarSignalsNames } from '../ch5-common/ch5-augment-var-signals-names';
export class Ch5TemplateStructure {
    static nextInstanceNum(templateIdentifier) {
        const priorNumber = Ch5TemplateStructure._numInstances[templateIdentifier];
        const nextNumber = (priorNumber === undefined ? 1 : priorNumber + 1);
        Ch5TemplateStructure._numInstances[templateIdentifier] = nextNumber;
        return nextNumber;
    }
    constructor(element) {
        this._element = {};
        this._templateElement = {};
        this._wrapperDiv = {};
        this._instanceId = null;
        this._elementIds = null;
        this.element = element;
        this.templateElement = document.querySelector('template');
    }
    set element(element) {
        if (!isNil(element)) {
            this._element = element;
        }
    }
    get element() {
        return this._element;
    }
    set templateElement(template) {
        if (!(isNil(template))) {
            this._templateElement = template;
        }
    }
    get templateElement() {
        return this._templateElement;
    }
    get instanceId() {
        return this._instanceId;
    }
    get elementIds() {
        return this._elementIds;
    }
    initializeWrapperDiv() {
        this._wrapperDiv = document.createElement("DIV");
        this._wrapperDiv.classList.add("ch5-template-content-wrapper");
    }
    getTemplateContent(templateId) {
        this.initializeWrapperDiv();
        let templateContent;
        if (!isNil(this.templateElement.firstElementChild)) {
            if (!this.templateElement.children[0].classList.contains("ch5-template-content-wrapper")) {
                while (this.templateElement.children.length > 0) {
                    this._wrapperDiv.appendChild(this.templateElement.children[0]);
                }
                this.templateElement.appendChild(this._wrapperDiv);
            }
            templateContent = this.templateElement.firstElementChild.cloneNode(true);
        }
        else if (!isNil(this.templateElement.content.firstElementChild)) {
            if (!this.templateElement.content.children[0].classList.contains("ch5-template-content-wrapper")) {
                while (this.templateElement.content.children.length > 0) {
                    this._wrapperDiv.appendChild(this.templateElement.content.children[0]);
                }
                this.templateElement.content.appendChild(this._wrapperDiv);
            }
            templateContent = this.templateElement.content.firstElementChild.cloneNode(true);
        }
        else {
            throw new Error(`[ch5-template] Error: The provided template with the id: "${templateId}" has no content`);
        }
        return templateContent;
    }
    generateTemplate(templateId, context) {
        this.element.info(`Ch5TemplateStructure.generateTemplate(templateId: ${templateId}, context: ${context})`);
        if (isEmpty(templateId)) {
            throw new Error('[ch5-template] Error: No templateId was provided');
        }
        const template = document.getElementById(templateId);
        let newElement = null;
        if (!(isNil(template))) {
            this.templateElement = template;
            this.element.info("Ch5TemplateStructure --- the following template will be used:", this.templateElement);
        }
        else {
            throw new Error(`[ch5-template] Error: No template with the id: "${templateId}" found`);
        }
        let contextPairs = [];
        if (isEmpty(context)) {
            this.element.info(`Context attribute is empty, nothing will be renamed`);
        }
        else {
            contextPairs = context.split(';');
            this.element.info(`Parsed context attribute: ${contextPairs}`);
        }
        const templateContent = this.getTemplateContent(templateId);
        if (isNil(templateContent)) {
            return;
        }
        try {
            this.element.info("Ch5TemplateStructure.generateTemplate() --- Copying attributes");
            if (!(isNil(templateContent))) {
                let newInnerHtml = templateContent.innerHTML;
                this.element.info("Original template inner HTML before rename: ", newInnerHtml);
                for (let i = 0; i < contextPairs.length; i++) {
                    const parsedContext = contextPairs[i].split(':');
                    this.element.info(`Processing original:replacement pair: ${parsedContext}`);
                    if (parsedContext.length !== 2 || isEmpty(parsedContext[0]) || isEmpty(parsedContext[1])) {
                        console.warn(`[ch5-template] Warning: Invalid context pair structure, expected: "original:replacement", but received "${parsedContext}", moving to the next context pair`);
                        continue;
                    }
                    parsedContext[0] = parsedContext[0].trim();
                    this.element.info(`Ch5TemplateStructure --- Count: [${i + 1}/${parsedContext.length}] 
                    Replace original string: ${parsedContext[0]} 
                    with provided replacement string: ${parsedContext[1]}`);
                    const patternIdentifier = new RegExp(parsedContext[0], "g");
                    newInnerHtml = newInnerHtml.replace(patternIdentifier, parsedContext[1]);
                }
                templateContent.innerHTML = newInnerHtml;
                Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(templateContent, this.element.contractName, parseInt(this.element.booleanJoinOffset, 10) || 0, parseInt(this.element.numericJoinOffset, 10) || 0, parseInt(this.element.stringJoinOffset, 10) || 0);
                if (this.element.isDebug()) {
                    this.element.info("After substitution and increment/prefix:", templateContent.innerHTML);
                }
            }
            if (!isNil(this.element.children) && this.element.children.length > 0) {
                this.element.info("Ch5TemplateStructure --- Removing children of: ", this.element);
                Array.from(this.element.children).forEach((element) => element.remove());
            }
            if (!isNil(this.element)) {
                newElement = this.element.appendChild(templateContent);
            }
        }
        catch (e) {
            throw new Error(`[ch5-template] Error: Failed to generate content: ${e}`);
        }
        finally {
            if (newElement !== null && newElement.children) {
                const thisInstanceNum = Ch5TemplateStructure.nextInstanceNum(templateId);
                this._instanceId = `${templateId}:${thisInstanceNum}`;
                newElement.id = this._instanceId;
                this._elementIds = [];
                for (let childcnt = 0; childcnt < newElement.children.length; childcnt++) {
                    if (!newElement.children[childcnt].id) {
                        newElement.children[childcnt].id = `${this._instanceId}:${childcnt}`;
                    }
                    this._elementIds.push(newElement.children[childcnt].id);
                }
                this.element.info(`Ch5TemplateStructure --- [FINAL] Adding content to ChTemplate: ${this._instanceId}`, newElement);
                this.element = newElement;
            }
        }
    }
}
Ch5TemplateStructure._numInstances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRlbXBsYXRlLXN0cnVjdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS10ZW1wbGF0ZS9jaDUtdGVtcGxhdGUtc3RydWN0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXhDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXhGLE1BQU0sT0FBTyxvQkFBb0I7SUFnRHJCLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQTBCO1FBQ3JELE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sVUFBVSxHQUFXLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0Usb0JBQW9CLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3BFLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZLE9BQW9CO1FBbkN4QixhQUFRLEdBQWdCLEVBQWlCLENBQUM7UUFTMUMscUJBQWdCLEdBQXdCLEVBQXlCLENBQUM7UUFLbEUsZ0JBQVcsR0FBbUIsRUFBb0IsQ0FBQztRQUtuRCxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFFbEMsZ0JBQVcsR0FBb0IsSUFBSSxDQUFDO1FBZXhDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQXdCLENBQUM7SUFDckYsQ0FBQztJQU9ELElBQVcsT0FBTyxDQUFDLE9BQW9CO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFB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