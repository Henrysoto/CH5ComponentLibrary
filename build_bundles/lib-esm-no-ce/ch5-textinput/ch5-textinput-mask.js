export class Ch5TextInputMask {
    set didMounted(value) {
        this._didMounted = value;
    }
    get didMounted() {
        return this._didMounted;
    }
    set wasWrapped(value) {
        this._wasWrapped = value;
    }
    get wasWrapped() {
        return this._wasWrapped;
    }
    set wrapperId(value) {
        this._wrapperId = value;
    }
    get wrapperId() {
        return this._wrapperId;
    }
    set input(value) {
        this._input = value;
    }
    get input() {
        return this._input;
    }
    set maskElement(value) {
        this._maskElement = value;
    }
    get maskElement() {
        return this._maskElement;
    }
    set maskValue(value) {
        this._maskValue = value;
    }
    get maskValue() {
        return this._maskValue;
    }
    set lastValueLength(value) {
        this._lastValueLength = value;
    }
    get lastValueLength() {
        return this._lastValueLength;
    }
    set alwaysShow(value) {
        this._alwaysShow = value;
    }
    get alwaysShow() {
        return this._alwaysShow;
    }
    set show(value) {
        this._show = value;
        if (this.input.value.length === 0) {
            this.maskElement.style.zIndex = this.show === true ? '99' : '-1';
        }
    }
    get show() {
        return this._show;
    }
    set placeholder(value) {
        this._placeholder = value;
    }
    get placeholder() {
        return this._placeholder;
    }
    constructor(input, pattern, alwaysShow = false) {
        this._didMounted = false;
        this._wasWrapped = false;
        this._wrapperId = 0;
        this._maskValue = "";
        this._lastValueLength = 0;
        this._alwaysShow = false;
        this._show = false;
        this._placeholder = "";
        this._input = {};
        this._maskElement = {};
        this.prefix = 'ch5-textinput-mask';
        this.BLOCK_SEPARATOR = '--';
        this._onInputKeyDown = (inEvent) => {
            if (this._isUserTyping()) {
                this.addStaticCharactersToInputValue(this.input.value.length);
            }
            this.lastValueLength = this.input.value.length;
            if (this.input.selectionStart !== null && this.input.selectionStart < this.lastValueLength) {
                inEvent.preventDefault();
            }
        };
        this._onInput = (inputEvent) => {
            let key = inputEvent.data;
            if (key !== null && key.length > 1) {
                const keys = key.split('');
                key = keys[keys.length - 1];
            }
            if (this._isUserTyping() && (!this._isKeyAllowed(key) || !this._isValueLengthValid())) {
                this.input.value = this.input.value.substr(0, this.lastValueLength);
            }
            else {
                this.dispatchMaskUpdateEvent();
                this._updateCharactersInMask();
            }
            if (this._isUserTyping()) {
                this.lastValueLength = this.input.value.length;
            }
        };
        this._onInputKeyUp = (inEvent) => {
            this._isKeyAllowed(inEvent.key);
            this._isValueLengthValid();
            this._transformLetterCapsType(this.input.value.length);
        };
        this._onInputFocus = () => {
            if (this.alwaysShow === false) {
                this.show = true;
                this.togglePlaceholder();
            }
        };
        this._onInputBlur = () => {
            if (this.alwaysShow === false) {
                this.show = false;
                this.togglePlaceholder();
            }
            if (this.input.value.length === 0) {
                this.lastValueLength = 0;
            }
            this._transformLetterCapsType(this.input.value.length);
            this._isValueLengthValid();
        };
        this._onMaskUpdate = () => {
            this._isUserTyping() ? this._maskCharacterOnTyping(this.lastValueLength) : this._unmaskCharacterOnTyping(this.lastValueLength);
        };
        this.wrapperId = Math.random() * new Date().getTime();
        this.input = input;
        this.maskValue = pattern;
        this.alwaysShow = alwaysShow;
        this._cleanTheInput();
    }
    init() {
        if (!this.wasWrapped && !this.didMounted) {
            this._wrap();
        }
        if (this.alwaysShow === false) {
            this.show = false;
        }
        else {
            this.show = true;
        }
        this._attachEventListeners();
    }
    stop() {
        this._detachEventListeners();
    }
    dispatchMaskErrorEvent(errorType = 'invalidCharacter') {
        if (errorType !== 'invalidCharacter') {
            errorType = 'invalidLength';
        }
        const maskErrorEvent = this._createInputMaskErrorEvent(errorType);
        this.input.dispatchEvent(maskErrorEvent);
        this.maskElement.dispatchEvent(maskErrorEvent);
        this.input.setCustomValidity(errorType);
    }
    dispatchMaskUpdateEvent() {
        const maskUpdateEvent = this._createMaskUpdateEvent(this.input.value);
        this.maskElement.dispatchEvent(maskUpdateEvent);
        this.input.dispatchEvent(maskUpdateEvent);
    }
    dispatchMaskCompleteEvent() {
        const maskCompleteEvent = this._createInputMaskCompleteEvent();
        this.maskElement.dispatchEvent(maskCompleteEvent);
        this.input.dispatchEvent(maskCompleteEvent);
        this.input.setCustomValidity('');
    }
    _makeMaskElementLookAsInputPlaceholder() {
        this.maskElement.style.lineHeight = window.getComputedStyle(this.input).lineHeight;
    }
    addStaticCharactersToInputValue(letterIndex) {
        const nextLetter = this.maskValue.substr(letterIndex, 1) !== '' ?
            this.maskValue.substr(letterIndex, 1) : null;
        if (this._isUserTyping() &&
            nextLetter !== null &&
            nextLetter.match(/[-_#().,\\/=@$&\s+]/g) !== null) {
            this.dispatchMaskUpdateEvent();
            this.input.value = this.input.value + nextLetter;
            this.lastValueLength++;
            this.addStaticCharactersToInputValue(++letterIndex);
        }
    }
    _updateCharactersInMask() {
        const inputValueLength = this.lastValueLength - 1;
        const letter = this.maskElement.childNodes[inputValueLength] !== undefined ?
            this.maskElement.childNodes[inputValueLength] : null;
        let childNode = {};
        if ((letter !== undefined || letter !== null) && inputValueLength < this.maskValue.length) {
            let currentLetter;
            if (this._isUserTyping() === true && this.input.value.length > 0) {
                currentLetter = this.input.value.substr(inputValueLength, 1);
            }
            else {
                currentLetter = this.maskValue.substr(inputValueLength, 1);
            }
            childNode = this.maskElement.childNodes[inputValueLength];
            if (childNode !== undefined) {
                childNode.innerHTML = currentLetter;
            }
        }
    }
    togglePlaceholder() {
        if (this.alwaysShow === false) {
            if (this.show === false) {
                this.input.setAttribute('placeholder', this.placeholder);
            }
            else {
                this.input.removeAttribute('placeholder');
            }
        }
    }
    _attachEventListeners() {
        this.input.addEventListener('keydown', this._onInputKeyDown);
        this.input.addEventListener('input', this._onInput);
        this.input.addEventListener('keyup', this._onInputKeyUp);
        this.input.addEventListener('focus', this._onInputFocus);
        this.input.addEventListener('blur', this._onInputBlur);
        this.maskElement.addEventListener('update', this._onMaskUpdate);
    }
    _detachEventListeners() {
        this.input.removeEventListener('keydown', this._onInputKeyDown);
        this.input.removeEventListener('input', this._onInput);
        this.input.removeEventListener('keyup', this._onInputKeyUp);
        this.input.removeEventListener('focus', this._onInputFocus);
        this.input.removeEventListener('blur', this._onInputBlur);
        this.maskElement.removeEventListener('update', this._onMaskUpdate);
    }
    _mount(wrapper) {
        this._createTheMaskElement();
        Array.from(wrapper.children).forEach((child) => {
            if (child.classList.contains(this.prefix)) {
                child.remove();
            }
        });
        wrapper.appendChild(this.maskElement);
        this.didMounted = true;
    }
    _wrap() {
        var _a;
        let wrapper;
        if ((_a = this.input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('ch5-textinput--mask-wrapper-element')) {
            wrapper = this.input.parentElement;
            wrapper.id = 'ch5-textinput' + this.BLOCK_SEPARATOR + this.wrapperId;
        }
        else {
            wrapper = this._input.parentNode
                .appendChild(this._createTheWrapper());
            wrapper.appendChild(this.input);
        }
        this._mount(wrapper);
        this._makeMaskElementLookAsInputPlaceholder();
        this.wasWrapped = true;
    }
    _createTheWrapper() {
        const wrapper = document.createElement('span');
        wrapper.classList.add('ch5-textinput--mask-wrapper-element');
        wrapper.id = 'ch5-textinput' + this.BLOCK_SEPARATOR + this.wrapperId;
        return wrapper;
    }
    _createTheMaskElement() {
        const htmlMaskValue = this._wrapEachCharacter();
        this.maskElement = document.createElement('span');
        this.maskElement.setAttribute('data-mask', this.maskValue);
        this.maskElement.classList.add(this.prefix);
        this.maskElement.innerHTML = htmlMaskValue;
    }
    _cleanTheInput() {
        if (this.alwaysShow === true && this.input.hasAttribute('placeholder')) {
            this.input.removeAttribute('placeholder');
        }
        if (this.input.hasAttribute('pattern')) {
            this.input.removeAttribute('pattern');
        }
    }
    _wrapEachCharacter() {
        const letters = this.maskValue.split('');
        letters.forEach((value, i) => {
            letters[i] = '<span class="' + this.prefix + this.BLOCK_SEPARATOR + 'letter">' + value + '</span>';
        });
        return letters.join('');
    }
    _createMaskUpdateEvent(message) {
        const keydownEvent = new CustomEvent('update', {
            detail: {
                message,
                time: new Date().getTime()
            },
            bubbles: true,
            cancelable: true
        });
        return keydownEvent;
    }
    _createInputMaskErrorEvent(errorType) {
        const errorCustomEvent = new CustomEvent('maskerror', {
            detail: {
                errorType,
                time: new Date().getTime()
            },
            bubbles: true,
            cancelable: false
        });
        return errorCustomEvent;
    }
    _createInputMaskCompleteEvent() {
        const completeEvent = new CustomEvent('maskcomplete', {
            detail: {
                message: 'completed',
                time: new Date().getTime()
            },
            bubbles: true,
            cancelable: true
        });
        return completeEvent;
    }
    _maskCharacterOnTyping(letterIndex) {
        if (letterIndex > this.maskValue.length) {
            letterIndex = this.maskValue.length;
        }
        const letters = this.maskElement.childNodes;
        const letter = letters[letterIndex] !== undefined ? letters[letterIndex] : null;
        if (letter !== null) {
            letter.style.visibility = 'hidden';
            this._maskCharacterOnTyping(--letterIndex);
        }
    }
    _unmaskCharacterOnTyping(letterIndex) {
        if (letterIndex > this.maskValue.length) {
            letterIndex = this.maskValue.length;
        }
        const letters = this.maskElement.childNodes;
        const letter = letters[letterIndex] !== undefined ? letters[letterIndex] : null;
        if (letter !== null && letterIndex >= this.input.value.length) {
            letter.style.visibility = 'visible';
        }
        if (letterIndex >= 0) {
            this._unmaskCharacterOnTyping(--letterIndex);
        }
    }
    _isUserTyping() {
        if (this.input.value.length < this.lastValueLength) {
            return false;
        }
        return true;
    }
    _isKeyAllowed(key) {
        if (this.maskValue.substr(this.input.value.length - 1, 1) !== '') {
            const letter = this.maskValue.substr(this.input.value.length - 1, 1);
            let _key = key;
            if (letter.match(/[^a-zA-Z0-9*]/g) !== null) {
                return false;
            }
            if (isNaN(parseFloat(key)) === false && letter !== '*') {
                _key = parseFloat(key);
            }
            if (String(_key).match(/[^a-zA-Z0-9]/g) !== null ||
                typeof _key !== this._getDataType(letter)) {
                if (this.input.value.length > 0) {
                    this.dispatchMaskErrorEvent();
                }
                return false;
            }
        }
        return true;
    }
    _isValueLengthValid() {
        if (this.lastValueLength < this.maskValue.length) {
            if (this.lastValueLength > 0) {
                this.dispatchMaskErrorEvent('invalidLength');
            }
            else {
                this.input.setCustomValidity('');
            }
            return true;
        }
        else if (this.lastValueLength > 0) {
            this.dispatchMaskCompleteEvent();
        }
        return false;
    }
    _getDataType(character) {
        let dataType;
        switch (character) {
            case 'A':
            case 'a':
                dataType = 'string';
                break;
            case '9':
                dataType = 'number';
                break;
            default:
                dataType = 'string';
                break;
        }
        return dataType;
    }
    _getCapsType(character) {
        if (character !== null && character !== '*') {
            if (character === character.toUpperCase()) {
                return 'uppercase';
            }
            else if (character === character.toLowerCase()) {
                return 'lowercase';
            }
        }
        return 'normal';
    }
    _transformLetterCapsType(letterIndex) {
        if (letterIndex > this.maskValue.length - 1) {
            letterIndex = this.maskValue.length - 1;
        }
        const letter = this.maskValue.substr(letterIndex, 1) !== '' ?
            this.maskValue.substr(letterIndex, 1) : null;
        const character = this.input.value.split('')[letterIndex];
        const letterElement = this.maskElement.childNodes[letterIndex];
        if (letter !== null && character !== undefined) {
            const letterCapsType = this._getCapsType(letter);
            const typedKeyCapsType = this._getCapsType(character);
            const inputValue = this.input.value.substr(0, letterIndex);
            const currentLetter = this.input.value.substr(letterIndex, 1);
            const inputValueRight = this.input.value.substr(letterIndex + 1);
            if (letterCapsType === 'uppercase' && typedKeyCapsType !== 'uppercase') {
                this.input.value = inputValue + currentLetter.toUpperCase() + inputValueRight;
                letterElement.innerHTML = currentLetter.toUpperCase();
            }
            else if (letterCapsType === 'lowercase' && typedKeyCapsType !== 'lowercase') {
                this.input.value = inputValue + currentLetter.toLowerCase() + inputValueRight;
                letterElement.innerHTML = currentLetter.toLowerCase();
            }
            this._transformLetterCapsType(--letterIndex);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRleHRpbnB1dC1tYXNrLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRleHRpbnB1dC9jaDUtdGV4dGlucHV0LW1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxPQUFPLGdCQUFnQjtJQWMzQixJQUFXLFVBQVUsQ0FBQyxLQUFjO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFVBQVUsQ0FBQyxLQUFjO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUF1QjtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxLQUFrQjtRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBVyxTQUFTO1FBQ2xC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