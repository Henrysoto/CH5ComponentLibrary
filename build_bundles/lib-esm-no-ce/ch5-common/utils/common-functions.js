import _ from 'lodash';
export const noop = () => undefined;
export const isNil = (value, validateWithTrim = true) => {
    if (validateWithTrim === true) {
        return _.isNil(value) || (value === "") || value.toString().trim() === "";
    }
    else {
        return _.isNil(value) || (value === "");
    }
};
export const isNotNil = (value, validateWithTrim = true) => {
    return !isNil(value, validateWithTrim);
};
export const getMeasurementUnitFromSizeValue = (sizeValue) => {
    const pattern = new RegExp("^(?:[0-9]+)(\\w*|%)$");
    let measurementUnit = 'px';
    if (isNotNil(sizeValue)) {
        const matchedValues = sizeValue.match(pattern);
        if (matchedValues !== null) {
            if (isNotNil(matchedValues[1])) {
                measurementUnit = matchedValues[1];
            }
        }
    }
    return measurementUnit;
};
export const getMeasurementPxNumber = (sizeValue) => {
    const actualUnit = getMeasurementUnitFromSizeValue(sizeValue);
    return actualUnit !== 'px'
        ? convertAltUnitsToPx(sizeValue)
        : Math.round(extractMeasurementNumber(sizeValue));
};
export const convertAltUnitsToPx = (sizeValue) => {
    const measurementUnit = getMeasurementUnitFromSizeValue(sizeValue);
    const size = parseFloat(sizeValue);
    let _size = size;
    switch (measurementUnit) {
        case 'vh':
            _size = convertVhUnitsToPx(size);
            break;
        case 'vw':
            _size = convertVwUnitsToPx(size);
            break;
    }
    return Math.round(_size);
};
export const convertPxUnitToAlt = (px, measurementUnit) => {
    let altValue = px;
    switch (measurementUnit) {
        case 'vw':
            altValue = convertPxUnitToVw(px);
            break;
        case 'vh':
            altValue = convertPxUnitToVh(px);
            break;
    }
    return Math.ceil(altValue);
};
export const convertVhUnitsToPx = (vh) => {
    const height = window.innerHeight || document.documentElement.clientHeight;
    return (vh * height) / 100;
};
export const convertVwUnitsToPx = (vw) => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    return (vw * width) / 100;
};
export const convertPxUnitToVh = (px) => {
    const height = window.innerHeight || document.documentElement.clientHeight;
    return (px / height) * 100;
};
export const convertPxUnitToVw = (px) => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    return (px / width) * 100;
};
export const extractMeasurementNumber = (sizeValue) => {
    const pattern = new RegExp("^-?\\d+\\.?\\d*");
    let n = 0;
    if (sizeValue !== null && sizeValue !== undefined) {
        const matchedValues = sizeValue.match(pattern);
        if (matchedValues !== null && matchedValues[0] !== undefined) {
            n = Number(matchedValues[0]);
        }
    }
    return n;
};
export const handlingTextTransformValue = (value, textTransform) => {
    let processedValue = value;
    if (value === undefined || value === null) {
        return '';
    }
    switch (textTransform) {
        case 'capitalize':
            processedValue = processedValue.replace(/\b\w/g, (firstLetterOfWord) => firstLetterOfWord.toUpperCase());
            break;
        case 'uppercase':
            processedValue = processedValue.toUpperCase();
            break;
        case 'lowercase':
            processedValue = processedValue.toLowerCase();
            break;
        default:
            break;
    }
    return processedValue;
};
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            window.clearTimeout(timeout);
            func(...args);
        };
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
};
export const toBoolean = (val, isEmptyValueEqualToTrue = false) => {
    const str = String(val).toLowerCase().trim();
    switch (str) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
            return false;
        case "":
        case null:
        case undefined:
        case "null":
        case "undefined":
            if (isEmptyValueEqualToTrue === true) {
                return true;
            }
            else {
                return false;
            }
        default:
            return false;
    }
};
export const checkIfValueIsTruey = (str = '') => {
    return (!!str && str.length > 0 && str !== 'false' && str !== '0' && str !== null);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vdXRpbHMvY29tbW9uLWZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFLdkIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFVLEVBQUUsbUJBQTRCLElBQUksRUFBRSxFQUFFO0lBQ3BFLElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQzNFO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFVLEVBQUUsbUJBQTRCLElBQUksRUFBRSxFQUFFO0lBQ3ZFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFBO0FBT0QsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7SUFDM0UsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNuRCxJQUFJLGVBQWUsR0FBVyxJQUFJLENBQUM7SUFDbkMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLEtB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