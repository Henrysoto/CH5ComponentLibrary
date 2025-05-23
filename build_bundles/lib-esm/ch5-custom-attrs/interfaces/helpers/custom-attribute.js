export class CustomAttribute {
    constructor() {
        this._type = null;
    }
    get type() {
        const self = this;
        if (!self._type) {
            throw new Error("Type is null ");
        }
        return self._type;
    }
    set type(value) {
        this._type = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jdXN0b20tYXR0cnMvaW50ZXJmYWNlcy9oZWxwZXJzL2N1c3RvbS1hdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsTUFBTSxPQUFnQixlQUFlO0lBQXJDO1FBQ1ksVUFBSyxHQUFhLElBQUksQ0FBQztJQWFuQyxDQUFDO0lBWEcsSUFBVyxJQUFJO1FBQ1gsTUFBTSxJQUFJLEdBQXVCLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQVE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztDQUNKIn0=