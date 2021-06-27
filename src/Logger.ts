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
        var templateOptions: any = {
            noQuite: false
        }
        var options: any = Object.assign(templateOptions, rawOptions);
        const stack: Array<any> = this.getStackTrace();
        
        console.log(chalk.hex("#ff5555")("[ Internal Error ]"), message);
        console.log(chalk.hex("#555555")("─────") + chalk.hex("#ff5555")("─────") + chalk.hex("#555555")("─────"));

        stack.forEach((value: string, index: number) => {
            var trace: string = value;
            trace = trace.replace(new RegExp(/at (.+?) \((.+?)\)/, "g"), "at " + chalk.hex("#555555")("$1") + " ( $2 )");
            
            var line: string = chalk.hex("#aaa")("[ " + chalk.hex("#ffffff")("#" + index) + " ] ") + trace;
            console.log(line);
        });
        console.log(chalk.hex("#555555")("─────") + chalk.hex("#ff5555")("─────") + chalk.hex("#555555")("─────"));

        if (!options.noQuite) {
            process.exit(0);
        }
    }
}