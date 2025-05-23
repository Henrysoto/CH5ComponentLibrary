import { Ch5Common } from '../ch5-common/ch5-common';
import { Subject } from 'rxjs';
export interface ICh5PressableOptions {
    cssTargetElement: HTMLElement;
    cssPressedClass: string;
}
export declare class Ch5PressableButton {
    private static FingerState;
    private _fingerState;
    private _ch5Component;
    private _options;
    private _pressEvent;
    private _releaseEvent;
    _pressed: boolean;
    _released: boolean;
    _isDestroyed: boolean;
    observablePressed: Subject<boolean>;
    private readonly TOUCH_TIMEOUT;
    private readonly PRESS_MOVE_THRESHOLD;
    private readonly CLICK_MOVE_THRESHOLD;
    constructor(component: Ch5Common, options?: ICh5PressableOptions);
    get ch5Component(): Ch5Common;
    get options(): ICh5PressableOptions | null;
    init(): void;
    setPressed(value: boolean): void;
    destroy(): void;
    private _attachEvents;
    private _removeEvents;
    private _onClick;
    private _onContextMenu;
    private _onMouseDown;
    private _onMouseMove;
    private resetFingerObject;
    private _onMouseUp;
    private _onMouseLeave;
    private _onTouchHoldTimer;
    private _fingerIsDownActions;
    private fingerStateActions;
    private _onHold;
    private _onRelease;
    private _onReleaseAsap;
    private addCssPressClass;
    private removeCssPressClass;
}
