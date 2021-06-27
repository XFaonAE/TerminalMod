"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Logger = /** @class */ (function () {
    function Logger(parent) {
        this.parent = parent;
    }
    /**
     * Get the current stack trace
     * @returns { Array<any> } Stack trace
     */
    Logger.prototype.getStackTrace = function () {
        // Get raw stack trace
        var stackLog = {};
        Error.captureStackTrace(stackLog);
        // Prepare stack to array
        var stackTrace = stackLog.stack.split("\n").splice(1);
        stackTrace.forEach(function (value, index) {
            var split = value.split("");
            split = split.splice(4);
            var done = split.join("");
            stackTrace[index] = done;
        });
        // Remove error traces and return
        stackTrace = stackTrace.splice(2);
        return stackTrace;
    };
    /**
     * Log an internal error
     * @param { string } message Message to define the error
     * @param { object } rawOptions Options for logging the error
     */
    Logger.prototype.error = function (message, rawOptions) {
        if (rawOptions === void 0) { rawOptions = {}; }
        var templateOptions = {
            noQuite: false
        };
        var options = Object.assign(templateOptions, rawOptions);
        var stack = this.getStackTrace();
        console.log(chalk_1.default.hex("#ff5555")("[ Internal Error ]"), message);
        console.log(chalk_1.default.hex("#555555")("─────") + chalk_1.default.hex("#ff5555")("─────") + chalk_1.default.hex("#555555")("─────"));
        stack.forEach(function (value, index) {
            var trace = value;
            trace = trace.replace(new RegExp(/at (.+?) \((.+?)\)/, "g"), "at " + chalk_1.default.hex("#555555")("$1") + " ( $2 )");
            var line = chalk_1.default.hex("#aaa")("[ " + chalk_1.default.hex("#ffffff")("#" + index) + " ] ") + trace;
            console.log(line);
        });
        console.log(chalk_1.default.hex("#555555")("─────") + chalk_1.default.hex("#ff5555")("─────") + chalk_1.default.hex("#555555")("─────"));
        if (!options.noQuite) {
            process.exit(0);
        }
    };
    return Logger;
}());
exports.default = Logger;
