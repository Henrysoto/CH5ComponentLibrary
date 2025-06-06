export type subscribeInViewPortChangeCallback = (isInViewPort: boolean) => void;
export declare function subscribeInViewPortChange(el: HTMLElement, callback: subscribeInViewPortChangeCallback): void;
export declare function unSubscribeInViewPortChange(el: HTMLElement): void;
