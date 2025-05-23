var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import isNil from 'lodash/isNil';
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5SignalAttributeRegistry } from '../ch5-common/ch5-signal-attribute-registry';
import { Ch5SignalFactory, publishEvent } from "../ch5-core";
export class Ch5ImportHtmlSnippet extends Ch5Common {
    constructor() {
        super();
        this._elContainer = {};
        this._url = '';
        this._sigNameReceiveState = '';
        this._subReceiveState = '';
        this._sigNameSendOnError = '';
        this.sigNameSendOnLoad = '';
        this._sendEventOnShowSigName = '';
        this._elContainer = document.createElement('div');
        this.errorEvent = new CustomEvent("error", {
            bubbles: true,
            cancelable: false
        });
        this._onError = this._onError.bind(this);
    }
    static registerSignalAttributeTypes() {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(Ch5ImportHtmlSnippet.ELEMENT_NAME, Ch5ImportHtmlSnippet.SIGNAL_ATTRIBUTE_TYPES);
    }
    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }
    get sendEventOnShow() {
        return this._sendEventOnShowSigName;
    }
    set sendEventOnShow(value) {
        this.info('set sendEventOnShow(\'' + value + '\')');
        if (value === '') {
            return;
        }
        if (this._sendEventOnShowSigName !== value) {
            this._sendEventOnShowSigName = value;
            this.setAttribute('sendeventonshow', value);
        }
    }
    static get observedAttributes() {
        const commonAttributes = Ch5Common.observedAttributes;
        const ch5ImportHtmlSnippetAttributes = [
            'url'
        ];
        return commonAttributes.concat(ch5ImportHtmlSnippetAttributes);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
            case 'url':
                if (this.hasAttribute('url') && !_.isNil(this.getAttribute('url')) && this.getAttribute('url') !== '' && this.url !== newValue) {
                    this.url = newValue;
                    this.loadHTMLContent(this.url);
                }
                else {
                    this.url = '';
                }
                break;
            case 'sendeventonshow':
                if (this.hasAttribute('sendeventonshow')) {
                    this.sendEventOnShow = newValue;
                }
                else {
                    this.sendEventOnShow = '';
                }
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }
    }
    unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
        const csf = Ch5SignalFactory.getInstance();
        if (!isNil(this._subReceiveState) && !isNil(this._sigNameReceiveState)) {
            const sigLabel = csf.getStringSignal(this._sigNameReceiveState);
            if (sigLabel) {
                sigLabel.unsubscribe(this._subReceiveState);
                this._sigNameReceiveState = '';
            }
        }
    }
    connectedCallback() {
        this.info(`Ch5ImportHTMLSnippet.connectedCallback()`);
        this.initAttributes();
        customElements.whenDefined('ch5-import-htmlsnippet').then(() => {
            this.cacheComponentChildrens();
            if (this.firstChild !== this._elContainer) {
                this.appendChild(this._elContainer);
            }
            this._sendSignalValueOnShow();
            this.info(`ch5-import-htmlsnippet connectedCallback() - end`);
        });
    }
    disconnectedCallback() {
        this.info(`Ch5ImportHTMLSnippet.disconnectedCallback()`);
        this.unsubscribeFromSignals();
    }
    sendValueOnLoadSignal(value) {
        let sigLoad = null;
        if (!isNil(this.sigNameSendOnLoad)) {
            sigLoad = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this.sigNameSendOnLoad);
            if (sigLoad) {
                sigLoad.publish(value);
            }
        }
    }
    onLoadAction(finalValue) {
        this.sigNameSendOnLoad = finalValue;
        let sigClick = null;
        if (!isNil(this.sigNameSendOnLoad)) {
            sigClick = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this.sigNameSendOnLoad);
            if (sigClick) {
                sigClick.publish(true);
                sigClick.publish(false);
            }
        }
        this.sendValueOnLoadSignal(false);
    }
    loadHTMLContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.asyncLoadContent(url);
                this._elContainer.innerHTML = response;
                publishEvent('object', `ch5-import-htmlsnippet:${this.id}`, { loaded: true, url, id: this.id });
            }
            catch (rejectionReason) {
                this.info(`ch5-import-htmlsnippet failed to load the URL: ${url}, ${rejectionReason}`);
            }
        });
    }
    asyncLoadContent(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.onload = () => {
                if (request.status < 300 && request.response !== null
                    && (request.responseType === "" || request.responseType === "text")) {
                    resolve(request.responseText);
                }
                else {
                    reject(`load failed with status ${request.status}, statusText ${request.statusText}, responseType ${request.responseType}`);
                }
            };
            request.onerror = () => {
                reject("There was a network error.");
            };
            request.send();
        });
    }
    _sendSignalValueOnShow() {
        this.info('Ch5ImportHTMLSnippet._sendSignalValueOnShow()');
        let sigShow = null;
        if (this._sendEventOnShowSigName !== ''
            && this._sendEventOnShowSigName !== undefined
            && this._sendEventOnShowSigName !== null) {
            sigShow = Ch5SignalFactory.getInstance()
                .getBooleanSignal(this._sendEventOnShowSigName);
            if (sigShow !== null) {
                sigShow.publish(true);
                sigShow.publish(false);
            }
        }
    }
    _onError(inEvent) {
        this.dispatchEvent(this.errorEvent);
        const message = `Error loading URL: ${this._url}`;
        this._sendValueForErrorSignal(message);
    }
    _sendValueForErrorSignal(errorMessage) {
        let sigError = null;
        if (!isNil(this._sigNameSendOnError)) {
            sigError = Ch5SignalFactory.getInstance()
                .getStringSignal(this._sigNameSendOnError);
            if (sigError) {
                sigError.publish(errorMessage);
            }
        }
    }
    initAttributes() {
        super.initAttributes();
        if (this.hasAttribute('url')) {
            this._url = this.getAttribute('url');
        }
    }
}
Ch5ImportHtmlSnippet.ELEMENT_NAME = 'ch5-import-htmlsnippet';
Ch5ImportHtmlSnippet.SIGNAL_ATTRIBUTE_TYPES = Object.assign({}, Ch5Common.SIGNAL_ATTRIBUTE_TYPES);
if (typeof window === "object" && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {
    window.customElements.define(Ch5ImportHtmlSnippet.ELEMENT_NAME, Ch5ImportHtmlSnippet);
}
Ch5ImportHtmlSnippet.registerSignalAttributeTypes();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWltcG9ydC1odG1sc25pcHBldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1pbXBvcnQtaHRtbHNuaXBwZXQvY2g1LWltcG9ydC1odG1sc25pcHBldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQTRDLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkksT0FBTyxFQUFhLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWN4RSxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsU0FBUztJQW1FbEQ7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQTVERCxpQkFBWSxHQUFnQixFQUFpQixDQUFDO1FBUTlDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFPbEIseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBS2xDLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUs5Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFvQmpDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQVMvQiw0QkFBdUIsR0FBVyxFQUFFLENBQUM7UUFPNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzFDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sTUFBTSxDQUFDLDRCQUE0QjtRQUN6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