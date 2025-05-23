import { isNil, isEmpty } from 'lodash';
export class Ch5ImageUriModel {
    constructor(schemas, user, password, location) {
        this._schemas = {};
        this._user = '';
        this._password = '';
        this._location = '';
        this._protocol = '';
        this.schemas = schemas;
        this._protocol = this.getProtocol(location);
        this.user = user;
        this.password = password;
        this.location = location;
    }
    set schemas(schemas) {
        if (isNil(schemas) || isEmpty(schemas)) {
            return;
        }
        this._schemas = schemas;
    }
    get schemas() {
        return this._schemas;
    }
    set user(user) {
        if (isNil(user) || isEmpty(user)) {
            return;
        }
        this._user = user;
    }
    get user() {
        return this._user;
    }
    set password(password) {
        if (isNil(password) || isEmpty(password)) {
            return;
        }
        this._password = password;
    }
    get password() {
        return this._password;
    }
    set location(location) {
        if (isNil(location) || isEmpty(location)) {
            return;
        }
        const protocolRegex = new RegExp('http(s?)[://]+(www\.)*');
        const matchedProtocol = location.match(protocolRegex);
        if (!isNil(matchedProtocol) && matchedProtocol.length > 0) {
            location = location.replace(matchedProtocol[0], '');
        }
        this._location = location;
    }
    get location() {
        return this._location;
    }
    toString() {
        if (!this.isValidAuthenticationUri()) {
            return '';
        }
        return `${this._protocol}://${this.user}:${this.password}@${this.location}`;
    }
    isValidAuthenticationUri() {
        if ((isNil(this.password) || isEmpty(this.password)) ||
            (isNil(this.user) || isEmpty(this.user)) ||
            (isNil(this.schemas) || isEmpty(this.schemas) && this.schemas.http)) {
            return false;
        }
        return true;
    }
    getProtocol(location) {
        const protocolRegex = new RegExp('^http(?:s?)');
        const matchedProtocol = location.match(protocolRegex);
        if (matchedProtocol && matchedProtocol[0] === 'https' && this.schemas.https) {
            return this.schemas.https;
        }
        return this.schemas.http;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWltYWdlLXVyaS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1pbWFnZS9jaDUtaW1hZ2UtdXJpLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBT3hDLE1BQU0sT0FBTyxnQkFBZ0I7SUFTekIsWUFDSSxPQUFpQixFQUNqQixJQUFZLEVBQ1osUUFBZ0IsRUFDaEIsUUFBZ0I7UUFYVixhQUFRLEdBQWEsRUFBYyxDQUFDO1FBQ3BDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFTN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBRTdCLENBQUM7SUFFRCxJQUFXLE9BQU8sQ0FBQyxPQUFpQjtRQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsSUFBWTtRQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFD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