import _ from 'lodash';
export default class HtmlCallback {
    constructor(context, callbacks) {
        this._pattern = new RegExp('([\\w\\.]*)\\((.*)\\)', 'i');
        this._callbacks = [];
        this._context = {};
        this.context = context;
        this.prepareCallbacks(callbacks);
    }
    run(target) {
        this._callbacks.forEach((callback) => {
            const methodReference = this.getNestedMethod(callback.reference);
            if (!_.isNil(methodReference)) {
                if (this.isNativeMethod(methodReference)) {
                    methodReference.apply(null, callback.arguments);
                }
                else {
                    let args = callback.arguments;
                    if (_.isNil(target)) {
                        args = callback.arguments;
                    }
                    else {
                        args[0] = target;
                    }
                    methodReference.apply(this.context, args);
                }
            }
        });
    }
    set callbacks(callbacks) {
        this._callbacks = callbacks;
    }
    get callbacks() {
        return this._callbacks;
    }
    set context(element) {
        this._context = element;
    }
    get context() {
        return this._context;
    }
    prepareCallbacks(callbacks) {
        if (_.isNil(callbacks)) {
            return;
        }
        const _window = window;
        const callbacksList = callbacks.split(';');
        this._callbacks = callbacksList.filter(callback => {
            if (this._pattern.test(callback)) {
                const callbackMethodSplitted = callback.match(this._pattern);
                const callbackMethodName = !_.isNil(callbackMethodSplitted) ? callbackMethodSplitted[1] : '';
                if (!_.isUndefined(this.getNestedMethod(callbackMethodName))) {
                    return true;
                }
                else {
                    console.warn('Undefined method ' + callback);
                }
            }
            return false;
        }).map(callback => {
            const callbackMethodSplitted = callback.match(this._pattern);
            const callbackMethodName = !_.isNil(callbackMethodSplitted) ? callbackMethodSplitted[1] : '';
            const callbackMethodArguments = !_.isNil(callbackMethodSplitted) && !_.isNil(callbackMethodSplitted[2]) ? callbackMethodSplitted[2] : '';
            let methodArguments = callbackMethodArguments.split(',');
            methodArguments = methodArguments.map(stringArgument => {
                const _stringArgument = stringArgument.replace(/['"]/g, '');
                if (stringArgument.indexOf('\'') > -1) {
                    return _stringArgument;
                }
                else if (!_.isNaN(parseFloat(stringArgument))) {
                    return parseFloat(_stringArgument);
                }
                if (_stringArgument === "true" || _stringArgument === "false") {
                    return _stringArgument === "true";
                }
                return _window[_stringArgument];
            });
            return {
                reference: callbackMethodName,
                arguments: methodArguments
            };
        });
    }
    getNestedMethod(_nestedObject, ref) {
        const _window = window;
        if (_.isNil(_nestedObject)) {
            return;
        }
        const nestedObject = _nestedObject.split('.');
        let methodReference = null;
        if (!_.isUndefined(ref)) {
            methodReference = ref[nestedObject[0]];
        }
        else {
            methodReference = _window[nestedObject[0]];
        }
        if (_.isObject(methodReference) && !_.isFunction(methodReference)) {
            methodReference = this.getNestedMethod(nestedObject[1], methodReference);
        }
        return methodReference;
    }
    isNativeMethod(methodReference) {
        const methodString = methodReference.toString();
        if (methodString.indexOf('[native code]') === -1) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1jYWxsYmFjay5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vdXRpbHMvaHRtbC1jYWxsYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFPdkIsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBTS9CLFlBQVksT0FBb0IsRUFBRSxTQUFpQjtRQUp6QyxhQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsdUJBQXVCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsZUFBVSxHQUFnQixFQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFnQixFQUFpQixDQUFDO1FBR2xELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sR0FBRyxDQUFDLE1BQXVDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFO1lBRTlDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBRXhDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFlLENBQUMsQ0FBQztpQkFDdkQ7cUJBQU07b0JBQ0wsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUNuQixJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDM0I7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLENBQUMs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