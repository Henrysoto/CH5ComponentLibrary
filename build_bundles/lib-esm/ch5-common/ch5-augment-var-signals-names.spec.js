import { assert } from 'chai';
import { describe } from 'mocha';
import { Ch5AugmentVarSignalsNames } from './ch5-augment-var-signals-names';
import { Ch5Button } from '../ch5-button/ch5-button';
import { Ch5Template } from '../ch5-template/ch5-template';
import { Ch5AttrsShow } from '../ch5-custom-attrs/ch5-attrs-show';
import { Ch5AttrsAppendclass } from '../ch5-custom-attrs/ch5-attrs-appendclass';
import { Ch5AttrsTextContent } from '../ch5-custom-attrs/ch5-attrs-text-content';
describe('Ch5AugmentVarSignalsNames', () => {
    let ch5TemplateParentEl;
    let ch5ButtonEl;
    let stdDivEl;
    let ch5TemplateChildEl;
    before(() => {
        Ch5AttrsShow.registerSignalAttributeTypes();
        Ch5AttrsTextContent.registerSignalAttributeTypes();
        Ch5AttrsAppendclass.registerSignalAttributeTypes();
        Ch5Button.registerSignalAttributeTypes();
        Ch5Template.registerSignalAttributeTypes();
        Ch5Template.registerSignalAttributeDefaults();
    });
    beforeEach(() => {
        ch5TemplateParentEl = document.createElement('template');
        ch5ButtonEl = document.createElement('ch5-button');
        stdDivEl = document.createElement('div');
        ch5TemplateChildEl = document.createElement('ch5-template');
        ch5TemplateParentEl.content.appendChild(ch5ButtonEl);
        ch5TemplateParentEl.content.appendChild(ch5TemplateChildEl);
        ch5TemplateParentEl.content.appendChild(stdDivEl);
    });
    it('do not mess up something without {{}}', () => {
        const attributeName = 'sendeventonclick';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = '1234';
        const expectedValue = providedValue;
        ch5ButtonEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5ButtonEl.getAttribute(attributeName), expectedValue);
    });
    it('should update attribute value from "101{{idx}}" when idx=3 to 104', () => {
        const attributeName = 'sendeventonclick';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `101{{${indexId}}}`;
        const expectedValue = '104';
        ch5ButtonEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5ButtonEl.getAttribute(attributeName), expectedValue);
    });
    it('should update attribute value from "101+{{idx}}" when idx=3 to 104', () => {
        const attributeName = 'sendeventonclick';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `101+{{${indexId}}}`;
        const expectedValue = '104';
        ch5ButtonEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5ButtonEl.getAttribute(attributeName), expectedValue);
    });
    it('should update attribute value from "100+10*{{idx}}" when idx=3 to 130', () => {
        const attributeName = 'booleanjoinoffset';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `100+10*{{${indexId}}}`;
        const expectedValue = '130';
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should update attribute value from "{{idx}}101" when idx=3 to 104', () => {
        const attributeName = 'sendeventonclick';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `{{${indexId}}}101`;
        const expectedValue = '104';
        ch5ButtonEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5ButtonEl.getAttribute(attributeName), expectedValue);
    });
    it('should update attribute value from "MyList[{{idx}}].Click" when idx=3 to MyList[3].Click', () => {
        const attributeName = 'sendeventonclick';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `MyList[{{${indexId}}}].Click`;
        const expectedValue = 'MyList[3].Click';
        ch5ButtonEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5ButtonEl.getAttribute(attributeName), expectedValue);
    });
    it('template context should not mess up something without {{}}', () => {
        const attributeName = 'context';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = 'MYTEMPLATE_clickjoin:1234;MYTEMPLATE_selectedjoin:1234;';
        const expectedValue = providedValue;
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should update context value from "MYTEMPLATE_clickjoin:101{{idx}}" when idx=3" to 104', () => {
        const attributeName = 'context';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `MYTEMPLATE_clickjoin:101{{${indexId}}}`;
        const expectedValue = 'MYTEMPLATE_clickjoin:104';
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should update context value from "MYTEMPLATE_clickjoin:101{{idx}};" when idx=3" to 104', () => {
        const attributeName = 'context';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `MYTEMPLATE_clickjoin:101{{${indexId}}};`;
        const expectedValue = 'MYTEMPLATE_clickjoin:104;';
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should update context value from "MYTEMPLATE_clickjoin:101{{idx}};MYTEMPLATE_selectedjoin:101{{idx}};" when idx=3" to 104', () => {
        const attributeName = 'context';
        const indexId = 'idx';
        const indexValue = 3;
        const providedValue = `MYTEMPLATE_clickjoin:101{{${indexId}}};MYTEMPLATE_selectedjoin:101{{${indexId}}};`;
        const expectedValue = 'MYTEMPLATE_clickjoin:104;MYTEMPLATE_selectedjoin:104;';
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should update context value from "DIFFTMPLT_cj:AList[{{idx}}].Click;DIFFTMPLT_sj:AList[{{idx}}].Selected" when idx=8" to AList[8]...', () => {
        const attributeName = 'context';
        const indexId = 'idx';
        const indexValue = 8;
        const providedValue = `DIFFTMPLT_cj:AList[{{${indexId}}}].Click;DIFFTMPLT_sj:AList[{{${indexId}}}].Selected`;
        const expectedValue = 'DIFFTMPLT_cj:AList[8].Click;DIFFTMPLT_sj:AList[8].Selected';
        ch5TemplateChildEl.setAttribute(attributeName, providedValue);
        Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(ch5TemplateParentEl, indexValue, indexId);
        assert.equal(ch5TemplateChildEl.getAttribute(attributeName), expectedValue);
    });
    it('should increment simple digital join number', () => {
        const attributeName = 'sendeventonclick';
        const providedValue = 25;
        const incrementValue = 31;
        const expectedValue = `${providedValue + incrementValue}`;
        const contractName = "ContractPrefix.";
        ch5ButtonEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, incrementValue, 0, 0);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should increment digital join number with {{index}} postfix in a ch5-common attribute', () => {
        const attributeName = 'receivestateshow';
        const providedValue = 17;
        const incrementValue = 31;
        const indexName = 'index';
        const expectedValue = `${providedValue + incrementValue}{{${indexName}}}`;
        ch5ButtonEl.setAttribute(attributeName, `${providedValue}{{${indexName}}}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, "", incrementValue, 0, 0);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should increment simple serial join number', () => {
        const attributeName = 'receivestatelabel';
        const providedValue = 16;
        const incrementValue = 29;
        const expectedValue = `${providedValue + incrementValue}`;
        ch5ButtonEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, "", 0, 0, incrementValue);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should increment digital join in div data-ch5-show', () => {
        const attributeName = 'data-ch5-show';
        const providedValue = 22;
        const incrementValue = 100;
        const expectedValue = `${providedValue + incrementValue}`;
        stdDivEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[2].getAttribute(attributeName), stdDivEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, "", incrementValue, 0, 0);
        assert.equal(theClone.children[2].getAttribute(attributeName), expectedValue);
    });
    it('should increment serial join in div data-ch5-textcontent', () => {
        const attributeName = 'data-ch5-textcontent';
        const providedValue = 21;
        const incrementValue = 50;
        const expectedValue = `${providedValue + incrementValue}`;
        stdDivEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[2].getAttribute(attributeName), stdDivEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, "", 0, 0, incrementValue);
        assert.equal(theClone.children[2].getAttribute(attributeName), expectedValue);
    });
    it('should increment simple serial join number with white space', () => {
        const attributeName = 'receivestatelabel';
        const providedValue = 16;
        const incrementValue = 29;
        const expectedValue = `${providedValue + incrementValue}`;
        ch5ButtonEl.setAttribute(attributeName, ` ${providedValue} `);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, "", 0, 0, incrementValue);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should not increment when 0 provided as increment and simple digital join number', () => {
        const attributeName = 'sendeventonclick';
        const providedValue = 25;
        const incrementValue = 0;
        const expectedValue = `${providedValue + incrementValue}`;
        const contractName = "ContractPrefix.";
        ch5ButtonEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, incrementValue, 0, 0);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should increment serial join number with {{index}} prefix', () => {
        const attributeName = 'receivestatelabel';
        const providedValue = 16;
        const incrementValue = 110;
        const contractName = "ContractPrefix.";
        const indexName = 'index';
        const expectedValue = `${providedValue + incrementValue}{{${indexName}}}`;
        ch5ButtonEl.setAttribute(attributeName, `{{${indexName}}}${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 0, 0, incrementValue);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should prefix contract name on digital signal name ', () => {
        const attributeName = 'sendeventonclick';
        const providedValue = "Clicked";
        const contractName = "ContractPrefix.";
        const expectedValue = `${contractName}${providedValue}`;
        ch5ButtonEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[0].getAttribute(attributeName), ch5ButtonEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 0, 0);
        assert.equal(theClone.children[0].getAttribute(attributeName), expectedValue);
    });
    it('should prefix contract name on serial signal name custom attribute data-ch5-appendclass', () => {
        const attributeName = Ch5AttrsAppendclass.DATA_CH5_ATTR_NAME;
        const providedValue = "ClassName";
        const contractName = "ContractPrefix.";
        const expectedValue = `${contractName}${providedValue}`;
        stdDivEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[2].getAttribute(attributeName), stdDivEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 0, 11);
        assert.equal(theClone.children[2].getAttribute(attributeName), expectedValue);
    });
    it('should update ch5-template "contractname" attribute when prefix is provided', () => {
        const attributeName = 'contractname';
        const providedValue = "InnerContractPrefix.";
        const contractName = "OuterContractPrefix.";
        const expectedValue = `${contractName}${providedValue}`;
        ch5TemplateChildEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[1].getAttribute(attributeName), ch5TemplateChildEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 100, 101);
        assert.equal(theClone.children[1].getAttribute(attributeName), expectedValue);
    });
    it('should update ch5-template "contractname" attribute when prefix is not empty', () => {
        const attributeName = 'contractname';
        const providedValue = "";
        const contractName = "OuterContractPrefix.";
        const expectedValue = `${contractName}${providedValue}`;
        ch5TemplateChildEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        assert.equal(theClone.children[1].getAttribute(attributeName), ch5TemplateChildEl.getAttribute(attributeName));
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 100, 101);
        assert.equal(theClone.children[1].getAttribute(attributeName), expectedValue);
    });
    it('should create ch5-template  "contractname" attribute when attribute is not provided', () => {
        const attributeName = 'contractname';
        const contractName = "OuterContractPrefix.";
        const expectedValue = `${contractName}`;
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 100, 101);
        assert.equal(theClone.children[1].getAttribute(attributeName), expectedValue);
    });
    it('should not create ch5-template "contractname" attribute when attribute and contractname are not provided ', () => {
        const attributeName = 'contractname';
        const contractName = "";
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, 99, 100, 101);
        assert.isNull(theClone.children[1].getAttribute(attributeName));
    });
    it('should update ch5-template booleanjoinoffset attribute when incrementValue is provided', () => {
        const attributeName = 'booleanjoinoffset';
        const providedValue = 15;
        const incrementValue = 100;
        const contractName = "OuterContractPrefix.";
        const expectedValue = `${providedValue + incrementValue}`;
        ch5TemplateChildEl.setAttribute(attributeName, `${providedValue}`);
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, incrementValue, 100, 101);
        assert.equal(theClone.children[1].getAttribute(attributeName), expectedValue);
    });
    it('should create ch5-template booleanjoinoffset attribute when increment is provided ', () => {
        const attributeName = 'booleanjoinoffset';
        const incrementValue = 100;
        const contractName = "OuterContractPrefix.";
        const expectedValue = `${incrementValue}`;
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, incrementValue, 100, 101);
        assert.equal(theClone.children[1].getAttribute(attributeName), expectedValue);
    });
    it('should not create ch5-template booleanjoinoffset attribute when increment is not provided ', () => {
        const attributeName = 'booleanjoinoffset';
        const incrementValue = 0;
        const contractName = "OuterContractPrefix.";
        const theClone = ch5TemplateParentEl.content.cloneNode(true);
        Ch5AugmentVarSignalsNames.differentiateTmplElemsAttrs(theClone, contractName, incrementValue, 100, 101);
        assert.isNull(theClone.children[1].getAttribute(attributeName));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF1Z21lbnQtdmFyLXNpZ25hbHMtbmFtZXMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vY2g1LWF1Z21lbnQtdmFyLXNpZ25hbHMtbmFtZXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQVUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDakMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFakYsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxJQUFJLG1CQUF3QyxDQUFDO0lBQzdDLElBQUksV0FBd0IsQ0FBQztJQUM3QixJQUFJLFFBQXdCLENBQUM7SUFDN0IsSUFBSSxrQkFBK0IsQ0FBQztJQUVwQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1IsWUFBWSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDNUMsbUJBQW1CLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNuRCxtQkFBbUIsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ25ELFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3pDLFdBQVcsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQzNDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFBO0lBRUYsVUFBVSxD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