import { Ch5Signal } from './ch5-signal';
export class Ch5SignalFactory {
    static getInstance() {
        if (Ch5SignalFactory._instance === undefined) {
            Ch5SignalFactory._instance = new Ch5SignalFactory();
        }
        return Ch5SignalFactory._instance;
    }
    static clear() {
        if (Ch5SignalFactory._instance !== undefined) {
            Ch5SignalFactory._instance._signals = undefined;
            Ch5SignalFactory._instance = undefined;
        }
    }
    constructor() {
        this._signals = { 'boolean': {}, 'number': {}, 'string': {}, 'object': {} };
    }
    clearSignals(keepObjSignals) {
        if (this._signals) {
            keepObjSignals ? this._signals = { 'boolean': {}, 'number': {}, 'string': {}, 'object': this._signals.object }
                : this._signals = { 'boolean': {}, 'number': {}, 'string': {}, 'object': {} };
        }
    }
    getStates() {
        return this._signals;
    }
    getBooleanSignal(name, createNewIfNotFound = true) {
        return this.getState(name, false, createNewIfNotFound);
    }
    getObjectAsBooleanSignal(name, createNewIfNotFound = true) {
        return this.getState(name, false, createNewIfNotFound);
    }
    getNumberSignal(name, createNewIfNotFound = true) {
        return this.getState(name, 0, createNewIfNotFound);
    }
    getStringSignal(name, createNewIfNotFound = true) {
        return this.getState(name, '', createNewIfNotFound);
    }
    getObjectSignal(name, createNewIfNotFound = true) {
        return this.getState(name, {}, createNewIfNotFound);
    }
    getState(name, typeInstance, createNewIfNotFound = true) {
        if (name === undefined || this._signals === undefined) {
            return null;
        }
        const type = typeof (typeInstance);
        if (this._signals[type] === undefined) {
            return null;
        }
        if (this._signals[type][name] === undefined) {
            if (!createNewIfNotFound) {
                return null;
            }
            const newSignal = new Ch5Signal(name, typeInstance);
            this._signals[type][name] = newSignal;
            return newSignal;
        }
        else {
            const existingSignal = this._signals[type][name];
            if (existingSignal.type === typeof (typeInstance)) {
                return existingSignal;
            }
            else {
                return null;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvY2g1LXNpZ25hbC1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHekMsTUFBTSxPQUFPLGdCQUFnQjtJQUlsQixNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLGdCQUFnQixDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDMUMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUN2RDtRQUVELE9BQU8sZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSztRQUNmLElBQUksZ0JBQWdCLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMxQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUNoRCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUVEO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBR00sWUFBWSxDQUFDLGNBQXVCO1FBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxT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