"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Section = /** @class */ (function () {
    /**
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    function Section(terminalMod) {
        this.terminalMod = terminalMod;
    }
    /**
     * Create a line separator
     * @param { string } rawTitle Title of the header
     * @param { object } rawOptions List of extra options
     */
    Section.prototype.create = function (rawTitle, rawOptions) {
        var _this = this;
        if (rawOptions === void 0) { rawOptions = {}; }
        // Setup options
        var templateOptions = {
            barHex: "#555555",
            titlePadding: 5,
            titlePaddingChar: " ",
            titleHex: "#ffffff",
            stemSize: 8,
            barChar: "─",
            maxWidth: process.stdout.columns
        };
        var options = Object.assign(templateOptions, rawOptions);
        // Validation
        var validateSize = function (columns) {
            if (columns <= 0) {
                _this.terminalMod.logger.error("Command line max width exceed");
            }
        };
        // Create bar
        var columnsLeft = options.maxWidth;
        validateSize(columnsLeft);
        var barStart = options.barChar.repeat(options.stemSize);
        columnsLeft -= barStart.length;
        validateSize(columnsLeft);
        var title = rawTitle;
        columnsLeft -= title.length;
        validateSize(columnsLeft);
        var titlePadding = options.titlePaddingChar.repeat(options.titlePadding);
        columnsLeft -= titlePadding.length * 2;
        validateSize(columnsLeft);
        var barTail = options.barChar.repeat(columnsLeft);
        columnsLeft -= barTail.length;
        var output = chalk_1.default.hex(options.barHex)(barStart) + titlePadding + chalk_1.default.hex(options.titleHex)(title) + titlePadding + chalk_1.default.hex(options.barHex)(barTail);
        console.log(output);
    };
    return Section;
}());
exports.default = Section;
