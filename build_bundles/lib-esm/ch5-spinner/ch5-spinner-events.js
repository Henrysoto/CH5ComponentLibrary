import isNull from 'lodash/isNull';
import { Ch5SignalFactory } from '../ch5-core';
import HtmlCallback from '../ch5-common/utils/html-callback';
import { Ch5Common } from '../ch5-common/ch5-common';
export class Ch5SpinnerEvents {
    constructor(element) {
        this._element = {};
        this.element = element;
    }
    set element(element) {
        if (element !== undefined && element !== null) {
            this._element = element;
        }
    }
    get element() {
        return this._element;
    }
    dispatchFocus() {
        const sendEventOnFocus = this.element.sendEventOnFocus;
        if (Ch5Common.isNotNil(sendEventOnFocus)) {
            const sigFocus = Ch5SignalFactory.getInstance().getBooleanSignal(this.element.sendEventOnFocus);
            if (sigFocus !== null) {
                sigFocus.publish(true);
            }
        }
        this.dispatch('focus');
    }
    dispatchBlur() {
        const sendEventOnFocus = this.element.sendEventOnFocus;
        if (Ch5Common.isNotNil(sendEventOnFocus)) {
            const sigFocus = Ch5SignalFactory.getInstance().getBooleanSignal(sendEventOnFocus);
            if (!isNull(sigFocus)) {
                sigFocus.publish(false);
            }
        }
        this.dispatch('blur');
    }
    dispatchChange(message) {
        const sendEventOnChange = this.element.sendEventOnChange;
        if (this.element.feedbackMode === 'direct') {
            if ('' !== sendEventOnChange && null !== sendEventOnChange && undefined !== sendEventOnChange) {
                const sigClick = Ch5SignalFactory.getInstance()
                    .getNumberSignal(this.element.sendEventOnChange);
                if (sigClick !== null) {
                    sigClick.publish(parseFloat(message));
                }
            }
        }
        this.dispatch('change', message);
    }
    dispatchDirty(message) {
        const dirtyCustomEvent = this.dispatch('dirty', message, false);
        if (this.element.ondirty instanceof HtmlCallback) {
            this.element.ondirty.run(dirtyCustomEvent);
        }
        else if (this.element.ondirty instanceof Function) {
            this.element.ondirty.call(this.element, dirtyCustomEvent);
        }
    }
    dispatchClean() {
        const cleanCustomEvent = this.dispatch('clean');
        if (this.element.onclean instanceof HtmlCallback) {
            this.element.onclean.run(cleanCustomEvent);
        }
        else if (this.element.onclean instanceof Function) {
            this.element.onclean.call(this.element, cleanCustomEvent);
        }
    }
    dispatch(eventName, message = '', cancelable = true) {
        const event = this.createEvent(eventName, message, cancelable);
        this.element.dispatchEvent(event);
        return event;
    }
    createEvent(eventName, message, cancelable = true) {
        const event = new CustomEvent(eventName, {
            detail: {
                data: message
            },
            bubbles: true,
            cancelable
        });
        return event;
    }
    dispatchMouseUp() {
        this.dispatch('mouseup');
    }
    dispatchTouchEnd() {
        this.dispatch('touchend');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNwaW5uZXItZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXNwaW5uZXIvY2g1LXNwaW5uZXItZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFL0MsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE1BQU0sT0FBTyxnQkFBZ0I7SUFTM0IsWUFBWSxPQUFtQjtRQUZyQixhQUFRLEdBQWUsRUFBZ0IsQ0FBQztRQUdoRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsT0FBbUI7UUFDcEMsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBQ0QsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBTU0sYUFBYTtRQUNsQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDeEMsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hHLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDckIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEs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