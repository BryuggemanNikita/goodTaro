export class CustomException extends Error {
    public status: string;
    public error: Error;

    constructor(message: string, status: string = '500', err?: Error) {
        super(message);
        this.status = status;
        this.error = err;
    }
}
