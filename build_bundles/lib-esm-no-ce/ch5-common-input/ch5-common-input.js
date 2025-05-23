import { Ch5Common } from "../ch5-common/ch5-common";
import HtmlCallback from "../ch5-common/utils/html-callback";
export class Ch5CommonInput extends Ch5Common {
    constructor() {
        super();
        this._elInput = {};
        this._signalValueSyncTimeout = 1500;
        this._cleanValue = '';
        this._clean = true;
        this._dirtyValue = '';
        this._dirty = false;
        this._submitted = false;
        this._dirtyTimerHandle = null;
        this._feedbackMode = '';
        this._value = '';
        this._required = false;
        this._ondirtyCallback = {};
        this._oncleanCallback = {};
    }
    getDirty() {
        if (this.feedbackMode === 'submit') {
            return this._dirty;
        }
        return false;
    }
    get feedbackMode() {
        return this._feedbackMode;
    }
    set feedbackMode(mode) {
        if (this._feedbackMode !== mode) {
            if (Ch5CommonInput.FEEDBACKMODES.indexOf(mode) < 0) {
                mode = Ch5CommonInput.FEEDBACKMODES[0];
            }
            this.setAttribute('feedbackMode', mode);
            this._feedbackMode = mode;
        }
    }
    get signalValueSyncTimeout() {
        return this._signalValueSyncTimeout;
    }
    set signalValueSyncTimeout(value) {
        value = Number(value);
        if (isNaN(value)) {
            value = 1500;
        }
        if (this._signalValueSyncTimeout !== value) {
            this.setAttribute('signalValueSyncTimeout', value + '');
            this._signalValueSyncTimeout = value;
        }
    }
    set cleanValue(value) {
        if (this.cleanValue !== value && (value === undefined || value === null)) {
            value = '';
        }
        this._cleanValue = value;
    }
    get cleanValue() {
        return this._cleanValue;
    }
    set dirtyValue(value) {
        if (this.dirtyValue !== value && (value === undefined || value === null)) {
            value = '';
        }
        this._dirtyValue = value;
    }
    get dirtyValue() {
        return this._dirtyValue;
    }
    set value(value) {
        this.info("Set input value (" + value + ")");
        if (this.value !== value) {
            if (value === undefined || value === null) {
                value = '';
            }
        }
        this._value = value;
        this.setAttribute('value', this.value);
    }
    get value() {
        return this._value;
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    set required(required) {
        if (this.required !== required &&
            (required === undefined || required === null)) {
            required = false;
        }
        this._required = required;
        if (!(this._elInput instanceof HTMLElement)) {
            return;
        }
        if (this._required === true) {
            this._elInput.required = this._required;
            return;
        }
        this._elInput.removeAttribute('required');
    }
    get required() {
        return this._required;
    }
    set oncleanCallback(callback) {
        if (callback === undefined || callback === null) {
            callback = {};
        }
        this._oncleanCallback = callback;
    }
    get oncleanCallback() {
        return this._oncleanCallback;
    }
    set onclean(callback) {
        this.oncleanCallback = callback;
    }
    get onclean() {
        return this.oncleanCallback;
    }
    set ondirtyCallback(callback) {
        if (callback === undefined || callback === null) {
            callback = {};
        }
        this._ondirtyCallback = callback;
    }
    get ondirtyCallback() {
        return this._ondirtyCallback;
    }
    set ondirty(callback) {
        this.ondirtyCallback = callback;
    }
    get ondirty() {
        return this.ondirtyCallback;
    }
    setClean() {
        this._clean = true;
        this._dirty = false;
        this._submitted = false;
    }
    setDirty() {
        this._dirty = true;
        this._clean = false;
    }
    getValid() {
        return true;
    }
    static get observedAttributes() {
        return [
            'required',
            'signalvaluesynctimeout',
            'feedbackmode',
            'onclean',
            'ondirty'
        ];
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        super.attributeChangedCallback(attr, oldValue, newValue);
        switch (attr) {
            case 'required':
                this.required = newValue === 'false' ? false : true;
                break;
            case 'signalvaluesynctimeout':
                if (this.hasAttribute('signalvaluesynctimeout')) {
                    this.signalValueSyncTimeout = newValue;
                }
                else {
                    this.signalValueSyncTimeout = '';
                }
                break;
            case 'feedbackmode':
                if (this.hasAttribute('feedbackmode')) {
                    this.feedbackMode = newValue;
                }
                else {
                    this.feedbackMode = Ch5CommonInput.FEEDBACKMODES[0];
                }
                break;
            case 'onclean':
                this.onclean = new HtmlCallback(this, newValue);
                break;
            case 'ondirty':
                this.ondirty = new HtmlCallback(this, newValue);
                break;
        }
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('tabindex')) {
            this.tabIndex = Number(this.getAttribute('tabindex'));
        }
        if (this.hasAttribute('feedbackmode')) {
            this.feedbackMode = this.getAttribute('feedbackmode');
        }
        else {
            this.feedbackMode = Ch5CommonInput.FEEDBACKMODES[0];
        }
        if (this.hasAttribute('required')) {
            const required = this.getAttribute('required') === 'false' ? false : true;
            this.required = required;
        }
        if (this.hasAttribute('onclean')) {
            this.onclean = new HtmlCallback(this, this.getAttribute('onclean'));
        }
        if (this.hasAttribute('ondirty')) {
            this.ondirty = new HtmlCallback(this, this.getAttribute('ondirty'));
        }
    }
    runEventHandlers(handler, event) {
        switch (handler) {
            case 'clean':
                this.runOncleanHandler(event);
                break;
            case 'dirty':
                this.runOndirtyHandler(event);
                break;
        }
    }
    runOncleanHandler(event) {
        if (this.onclean instanceof HtmlCallback) {
            this.onclean.run(event);
        }
        else if (this.onclean instanceof Function) {
            this.onclean.call(this, event);
        }
    }
    runOndirtyHandler(event) {
        if (this.ondirty instanceof HtmlCallback) {
            this.ondirty.run(event);
        }
        else if (this.ondirty instanceof Function) {
            this.ondirty.call(this, event);
        }
    }
}
Ch5CommonInput.FEEDBACKMODES = ["direct", "submit"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbW1vbi1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24taW5wdXQvY2g1LWNvbW1vbi1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFPN0QsTUFBTSxPQUFnQixjQUFlLFNBQVEsU0FBUztJQWlIckQ7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQWxHQyxhQUFRLEdBQXFCLEVBQXNCLENBQUM7UUFZcEQsNEJBQXVCLEdBQVcsSUFBSSxDQUFDO1FBU3ZDLGdCQUFXLEdBQWdDLEVBQWlDLENBQUM7UUFTN0UsV0FBTSxHQUFZLElBQWUsQ0FBQztRQVNsQyxnQkFBVyxHQUFnQyxFQUFpQyxDQUFDO1FBUzdFLFdBQU0sR0FBWSxLQUFnQixDQUFDO1FBU25DLGVBQVUsR0FBWSxLQUFnQixDQUFDO1FBRXZDLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFjeEMsa0JBQWEsR0FBaUMsRUFBa0MsQ0FBQztRQVNqRixXQUFNLEdBQWdDLEVBQWlDLENBQUM7UUFTeEUsY0FBUyxHQUFZLEtBQWdCLENBQUM7UUFFdEMscUJBQWdCLEdBQXNCLEVBQWtCLENBQUM7UUFFekQscUJBQWdCLEdBQXNCLEVBQWtCLENBQUM7SUFJbkUsQ0FBQztJQXVCTSxRQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbkI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFPRCxJQUFXLFlBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNCLENBQUM7SUFPRCxJQUFXLFlBQVksQ0FBQyxJQUFrQztRQUN6RCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQ2hDLElB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