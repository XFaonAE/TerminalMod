import chalk from "chalk";

export default class Logger {
    public parent: object;

    public constructor(parent: object) {
        this.parent = parent;
    }

    /**
     * Get the current stack trace
     * @returns { Array<any> } Stack trace
     */
    public getStackTrace() {
        // Get raw stack trace
        var stackLog: any = {};
        Error.captureStackTrace(stackLog);

        // Prepare stack to array
        var stackTrace: Array<any> = stackLog.stack.split("\n").splice(1);
        stackTrace.forEach((value: string, index: number) => {
            var split: Array<any> = value.split("");
            split = split.splice(4);
            
            var done: string = split.join("");
            stackTrace[index] = done;
        });

        // Remove error traces and return
        stackTrace = stackTrace.splice(2);
        return stackTrace;
    }

    /**
     * Log an internal error
     * @param { string } message Message to define the error 
     * @param { object } rawOptions Options for logging the error
     */
    public error(message: string, rawOptions: any = {}) {
        // Setup options
        var templateOptions: any = {
            noQuite: false
        }
        var options: any = Object.assign(templateOptions, rawOptions);

        // Create stack trace
        const stack: Array<any> = this.getStackTrace();
        
        // Log error
        console.log(chalk.hex("#ff5555")("[ Internal Error ]"), message);
        console.log(chalk.hex("#555555")("─────") + chalk.hex("#ff5555")("─────") + chalk.hex("#555555")("─────"));

        stack.forEach((value: string, index: number) => {
            console.log(chalk.hex("#555555")("[ " + chalk.hex("#ffffff")("#" + index) + " ]"), value);
        });
        console.log(chalk.hex("#555555")("─────") + chalk.hex("#ff5555")("─────") + chalk.hex("#555555")("─────"));

        // Stop is applicable
        if (!options.noQuite) {
            process.exit(0);
        }
    }
}