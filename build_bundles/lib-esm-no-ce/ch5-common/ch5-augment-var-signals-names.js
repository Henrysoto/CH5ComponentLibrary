import { Ch5Signal } from "../ch5-core";
import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
export class Ch5AugmentVarSignalsNames {
    static getUpdatedAttrIdxPlaceholderValue(value, placeholder, index) {
        const placeHolderRegEx = new RegExp(placeholder, 'g');
        if (!placeHolderRegEx.test(value)) {
            return value;
        }
        const valWithoutIndexIdPlaceholder = value.replace(placeHolderRegEx, '').trim();
        const joinMultiplierAndOffsetRegEx = /\s*(\d+)\s*\+{1}\s*(\d+)\s*\*{1}\s*/;
        const jmaoExec = joinMultiplierAndOffsetRegEx.exec(valWithoutIndexIdPlaceholder);
        if (jmaoExec !== null && jmaoExec[0] === valWithoutIndexIdPlaceholder) {
            const offset = parseInt(jmaoExec[1], 10);
            const multiplier = parseInt(jmaoExec[2], 10);
            return (multiplier * index + offset).toString();
        }
        const joinOffsetRegEx = /\s*(\d+)\s*\+{0,1}\s*/;
        const joExec = joinOffsetRegEx.exec(valWithoutIndexIdPlaceholder);
        if (joExec !== null && joExec[0] === valWithoutIndexIdPlaceholder) {
            const offset = parseInt(joExec[1], 10);
            return (index + offset).toString();
        }
        return value.replace(placeHolderRegEx, String(index)).trim();
    }
    static replaceAttrIdxPlaceholder(n, attrName, attrVal, index, indexId) {
        const placeholder = `{{${indexId}}}`;
        if (attrVal.indexOf(placeholder) > -1) {
            if (attrName === 'context') {
                const nameValuePairs = attrVal.split(';');
                for (let cnt = 0; cnt < nameValuePairs.length; cnt++) {
                    const nameValuePair = nameValuePairs[cnt];
                    const colonIdx = nameValuePair.indexOf(":");
                    if (colonIdx > 0 && nameValuePair.length > colonIdx + 1) {
                        const value = nameValuePair.substr(colonIdx + 1);
                        if (value.indexOf(placeholder) > -1) {
                            nameValuePairs[cnt] = nameValuePair.substring(0, colonIdx + 1)
                                + Ch5AugmentVarSignalsNames.getUpdatedAttrIdxPlaceholderValue(value, placeholder, index);
                        }
                    }
                }
                n.setAttribute(attrName, String(nameValuePairs.join(";")));
            }
            else {
                n.setAttribute(attrName, Ch5AugmentVarSignalsNames.getUpdatedAttrIdxPlaceholderValue(attrVal, placeholder, index));
            }
        }
    }
    static iterateAttributesInTemplate(templateContainer, attribCb, elementCb) {
        const variableSignalsElems = templateContainer.querySelectorAll('*');
        if (variableSignalsElems.length === 0) {
            return;
        }
        for (let cnt = 0; cnt < variableSignalsElems.length; cnt++) {
            const element = variableSignalsElems[cnt];
            if (elementCb !== undefined) {
                elementCb(element);
            }
            Array.from(element.attributes).forEach((attribute) => {
                const attribValue = attribute.value.trim();
                attribCb(element, attribute.name, attribValue);
            });
        }
    }
    static incrementOrPrependAttrValue(element, attrName, value, increment, contractNamePrefix) {
        const doubleMoustcheRe = /({{[\w\-]+}})/g;
        const valWithoutDoubleMoustaches = value.replace(doubleMoustcheRe, '');
        if (Ch5Signal.isIntegerSignalName(valWithoutDoubleMoustaches)) {
            if (increment > 0) {
                const incrementedValue = parseInt(valWithoutDoubleMoustaches, 10) + increment;
                const doubleMoustachesMatches = value.match(doubleMoustcheRe);
                const incrementedAttrValue = doubleMoustachesMatches !== null ?
                    `${incrementedValue}${doubleMoustachesMatches.join('')}` :
                    `${incrementedValue}`;
                element.setAttribute(attrName, incrementedAttrValue);
            }
        }
        else {
            element.setAttribute(attrName, `${contractNamePrefix}${value}`);
        }
    }
    static differentiateTmplElemsAttrs(templateContent, contractNamePrefix, booleanJoinOffset, numericJoinOffset, stringJoinOffset) {
        Ch5AugmentVarSignalsNames.iterateAttributesInTemplate(templateContent, (element, attrName, attrValue) => {
            const signalJoinTypes = Ch5SignalAttributeRegistry.instance.getElementAttributeEntry(element.tagName, attrName);
            if (signalJoinTypes !== undefined) {
                const effectiveContractNamePrefix = signalJoinTypes[Ch5SignalAttributeRegistry.CONTRACT_NAME] ? contractNamePrefix : "";
                let increment = 0;
                if (signalJoinTypes[Ch5SignalAttributeRegistry.BOOLEAN_JOIN] !== undefined) {
                    increment = booleanJoinOffset;
                }
                else if (signalJoinTypes[Ch5SignalAttributeRegistry.NUMERIC_JOIN] !== undefined) {
                    increment = numericJoinOffset;
                }
                else if (signalJoinTypes[Ch5SignalAttributeRegistry.STRING_JOIN] !== undefined) {
                    increment = stringJoinOffset;
                }
                Ch5AugmentVarSignalsNames.incrementOrPrependAttrValue(element, attrName, attrValue, increment, effectiveContractNamePrefix);
            }
        }, (element) => {
            const defaultAttributes = Ch5SignalAttributeRegistry.instance.getElementDefaultAttributeEntries(element.tagName);
            if (defaultAttributes !== undefined) {
                if (contractNamePrefix.length > 0) {
                    Ch5AugmentVarSignalsNames.addDefaultEntriesForDifferentiation(element, defaultAttributes.contractName);
                }
                if (booleanJoinOffset > 0) {
                    Ch5AugmentVarSignalsNames.addDefaultEntriesForDifferentiation(element, defaultAttributes.booleanJoin);
                }
                if (numericJoinOffset > 0) {
                    Ch5AugmentVarSignalsNames.addDefaultEntriesForDifferentiation(element, defaultAttributes.numericJoin);
                }
                if (stringJoinOffset > 0) {
                    Ch5AugmentVarSignalsNames.addDefaultEntriesForDifferentiation(element, defaultAttributes.stringJoin);
                }
            }
        });
    }
    static addDefaultEntriesForDifferentiation(element, defaultEntry) {
        if (defaultEntry !== undefined) {
            defaultEntry.attributes.forEach(attributeNameToBeDefaulted => {
                if (element.getAttribute(attributeNameToBeDefaulted) === null) {
                    element.setAttribute(attributeNameToBeDefaulted, defaultEntry.defaultValue);
                }
            });
        }
    }
    static replaceIndexIdInTmplElemsAttrs(documentContainer, index, indexId) {
        Ch5AugmentVarSignalsNames.iterateAttributesInTemplate(documentContainer.content, (element, attrName, attrValue) => {
            Ch5AugmentVarSignalsNames.replaceAttrIdxPlaceholder(element, attrName, attrValue, index, indexId);
        }, (element) => {
            if (element.tagName === 'TEMPLATE') {
                Ch5AugmentVarSignalsNames.replaceIndexIdInTmplElemsAttrs(element, index, indexId);
            }
        });
    }
    static replaceIndexIdInTmplElemsContent(documentContainer, index, indexId) {
        let html = documentContainer.innerHTML;
        const placeholder = `{{${indexId}}}`;
        if (html.indexOf(placeholder) > -1) {
            html = html.replace(new RegExp(placeholder, 'g'), String(index));
            documentContainer.innerHTML = html;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWF1Z21lbnQtdmFyLXNpZ25hbHMtbmFtZXMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29tbW9uL2NoNS1hdWdtZW50LXZhci1zaWduYWxzLW5hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLDBCQUEwQixFQUF5QyxNQUFNLDZDQUE2QyxDQUFBO0FBcUIvSCxNQUFNLE9BQU8seUJBQXlCO0lBVzVCLE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxLQUFhLEVBQUUsV0FBbUIsRUFBRSxLQUFhO1FBQ2hHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFFakMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQU1oRixNQUFNLDRCQUE0QixHQUFHLHFDQUFxQyxDQUFDO1FBQzNFLE1BQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2pGLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssNEJBQTRCLEVBQUU7WUFDckUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxD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