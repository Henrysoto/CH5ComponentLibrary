export type TSchemas = {
    http: string;
    https?: string;
};
export declare class Ch5ImageUriModel {
    protected _schemas: TSchemas;
    protected _user: string;
    protected _password: string;
    protected _location: string;
    protected _protocol: string;
    constructor(schemas: TSchemas, user: string, password: string, location: string);
    set schemas(schemas: TSchemas);
    get schemas(): TSchemas;
    set user(user: string);
    get user(): string;
    set password(password: string);
    get password(): string;
    set location(location: string);
    get location(): string;
    toString(): string;
    isValidAuthenticationUri(): boolean;
    private getProtocol;
}
