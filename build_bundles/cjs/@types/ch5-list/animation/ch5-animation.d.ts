import { TCh5ListElementOrientation } from '../interfaces/t-ch5-list';
export type TAnimationCallback = () => void;
export declare abstract class Ch5Animation {
    private _duration;
    private _defaultDuration;
    private _easeMode;
    private _wrapper;
    constructor(duration: number, easeMode: string, wrapper: HTMLElement);
    set duration(duration: number);
    get duration(): number;
    set defaultDuration(duration: number);
    get defaultDuration(): number;
    set easeMode(easeMode: string);
    get easeMode(): string;
    set wrapper(wrapper: HTMLElement);
    get wrapper(): HTMLElement;
    abstract animate(element: HTMLElement, currentPosition: number, mode: TCh5ListElementOrientation, previousPosition?: number, callback?: TAnimationCallback): void;
}
