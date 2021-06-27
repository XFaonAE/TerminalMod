"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Section_1 = __importDefault(require("./Section"));
var Logger_1 = __importDefault(require("./Logger"));
var CliAnimator_1 = __importDefault(require("./CliAnimator"));
var TerminalMod = /** @class */ (function () {
    /**
     * Customize the user experience in your CLI applications with absolute ease
     */
    function TerminalMod() {
        // Initialize
        this.section = new Section_1.default(this);
        this.logger = new Logger_1.default(this);
        this.cliAnimator = new CliAnimator_1.default(this);
    }
    return TerminalMod;
}());
exports.default = TerminalMod;
