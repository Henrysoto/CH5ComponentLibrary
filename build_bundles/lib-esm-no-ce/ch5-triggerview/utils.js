export function clamp(x, min = x, max = x) {
    let clamped = x;
    if (min > max) {
        throw new RangeError(`'min' ${min} should be lower than 'max' ${max}`);
    }
    if (x < min) {
        clamped = min;
    }
    if (x > max) {
        clamped = max;
    }
    return clamped;
}
export function booleanSetter(element, attributeName, flag) {
    element.setAttribute(attributeName, flag.toString());
}
export function booleanGetter(element, attributeName, defaultValue = false) {
    const value = element.getAttribute(attributeName);
    return value === null ? defaultValue : _toBoolean(value);
}
export function intSetter(element, attributeName, value) {
    element.setAttribute(attributeName, value.toString());
}
export function intGetter(element, attributeName, defaultValue = 0) {
    const value = element.getAttribute(attributeName);
    return value === null ? defaultValue : parseInt(value, 10);
}
export function normalizeEvent(ev) {
    if (ev.type === 'touchstart' ||
        ev.type === 'touchmove' ||
        ev.type === 'touchend') {
        const touch = ev.changedTouches[0];
        return {
            x: touch.clientX,
            y: touch.clientY,
            id: touch.identifier,
            event: ev,
            targetElement: touch.target
        };
    }
    else {
        return {
            x: ev.clientX,
            y: ev.clientY,
            id: null,
            event: ev,
            targetElement: ev.target
        };
    }
}
export function getCSSCustomProperty(element, propertyName) {
    const cssStyles = getComputedStyle(element);
    return String(cssStyles.getPropertyValue(propertyName)).trim();
}
function _toBoolean(val) {
    const str = String(val);
    switch (str.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1": return true;
        case "false":
        case "no":
        case "0":
        case null: return false;
        default: return Boolean(false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtdHJpZ2dlcnZpZXcvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUEsTUFBTSxVQUFVLEtBQUssQ0FBQyxDQUFTLEVBQUUsTUFBYyxDQUFDLEVBQUUsTUFBYyxDQUFDO0lBQ2hFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVoQixJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDZCxNQUFNLElBQUksVUFBVSxDQUFDLFNBQVMsR0FBRywrQkFBK0IsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN2RTtJQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtRQUNaLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDZDtJQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtRQUNaLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDZDtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2hCLENBQUM7QUFRRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQW9CLEVBQUUsYUFBcUIsRUFBRSxJQUFhO0lBQ3ZGLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFRRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQW9CLEVBQUUsYUFBcUIsRUFBRSxZQUFZLEdBQUcsS0FBSztJQUM5RixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQVFELE1BQU0sVUFBVSxTQUFTLENBQUMsT0FBb0IsRUFBRSxhQUFxQixFQUFFLEtBQWE7SUFDbkYsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQVNELE1BQU0sVUFBVSxTQUFTLENBQUMsT0FBb0IsRUFBRSxhQUFxQixFQUFFLFlBQVksR0FBRyxDQUFDO0lBQ3RGLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQU9ELE1BQU0sVUFBVSxjQUFjLENBQUMsRUFBTztJQUVyQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssWUFBWTtRQUMzQixFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVc7UUFDdkIsRUFBRSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPO1lBQ04sQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ2hCLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTztZQUNoQixFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDcEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxhQUFhLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDM0IsQ0FBQztLQUdGO1NBQU07UUFDTixPQUFPO1lBQ04sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixLQUFLLEVBQUUsRUFBRTtZQUNULGFBQWEsRUFBRSxFQUFFLENBQUMsTUFBTTtTQUN4QixDQUFDO0tBQ0Y7QUFDRixDQUFDO0FBUUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQW9CLEVBQUUsWUFBb0I7SUFDOUUsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDaEUsQ0FBQztBQVNELFNBQVMsVUFBVSxDQUFDLEdBQXFCO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxLQUFLLE1BQU0sQ0FBQztRQUFDLEtBQUssS0FBSyxDQUFDO1FBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQztRQUMvQyxLQUFLLE9BQU8sQ0FBQztRQUFDLEtBQUssSUFBSSxDQUFDO1FBQUMsS0FBSyxHQUFHLENBQUM7UUFBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0FBQ0YsQ0FBQyJ9