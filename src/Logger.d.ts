export default class Logger {
    parent: object;
    constructor(parent: object);
    /**
     * Get the current stack trace
     * @returns { Array<any> } Stack trace
     */
    getStackTrace(): any[];
    /**
     * Log an internal error
     * @param { string } message Message to define the error
     * @param { object } rawOptions Options for logging the error
     */
    error(message: string, rawOptions?: any): void;
}
//# sourceMappingURL=Logger.d.ts.map