"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hide_terminal_cursor_1 = __importDefault(require("hide-terminal-cursor"));
var chalk_1 = __importDefault(require("chalk"));
var CliAnimator = /** @class */ (function () {
    /**
     * Create animations inside of the command line
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    function CliAnimator(terminalMod) {
        this.terminalMod = terminalMod;
        this.renderedFrames = [];
        this.currentFrameIndex = 0;
        this.animatorLoopRunning = false;
        this.frameChangeDelay = 100;
        this.message = "";
        this.animatorLoopRendering = false;
    }
    /**
     * Print an animation to the command line
     * @param { string } rawMessage Message to print with the animation
     * @param { object } rawOptions options
     */
    CliAnimator.prototype.print = function (rawMessage, rawOptions) {
        if (rawOptions === void 0) { rawOptions = {}; }
        hide_terminal_cursor_1.default();
        var templateOptions = {
            frames: [
                chalk_1.default.hex("#50ffab")("⠋"),
                chalk_1.default.hex("#50ffab")("⠙"),
                chalk_1.default.hex("#50ffab")("⠹"),
                chalk_1.default.hex("#50ffab")("⠸"),
                chalk_1.default.hex("#50ffab")("⠼"),
                chalk_1.default.hex("#50ffab")("⠴"),
                chalk_1.default.hex("#50ffab")("⠦"),
                chalk_1.default.hex("#50ffab")("⠧"),
                chalk_1.default.hex("#50ffab")("⠇"),
                chalk_1.default.hex("#50ffab")("⠏")
            ],
            interval: 50
        };
        var options = Object.assign(templateOptions, rawOptions);
        this.frameChangeDelay = options.interval;
        var newRenderedFrames = [];
        options.frames.forEach(function (value, index) {
            newRenderedFrames.push(value + " " + rawMessage);
        });
        this.renderedFrames = newRenderedFrames;
        this.message = rawMessage;
        this.animatorLoopRendering = true;
        if (!this.animatorLoopRunning) {
            this.animatorLoopRunning = true;
            this.startAnimatorLoop();
        }
    };
    /**
     * Start the frame animation loop
     */
    CliAnimator.prototype.startAnimatorLoop = function () {
        var _this = this;
        var nextFrameRender = function () {
            if (_this.animatorLoopRunning) {
                setTimeout(function () {
                    if (_this.animatorLoopRendering) {
                        process.stdout.write("\r" + _this.renderedFrames[_this.currentFrameIndex]);
                    }
                    _this.currentFrameIndex++;
                    if (_this.currentFrameIndex > _this.renderedFrames.length - 1) {
                        _this.currentFrameIndex = 0;
                        nextFrameRender();
                        return;
                    }
                    nextFrameRender();
                }, _this.frameChangeDelay);
            }
        };
        nextFrameRender();
    };
    /**
     * Set the spinner to its success state
     * @param { string | null } rawMessage Message to change to
     * @param { object } rawOptions Options
     */
    CliAnimator.prototype.success = function (rawMessage, rawOptions) {
        if (rawMessage === void 0) { rawMessage = null; }
        if (rawOptions === void 0) { rawOptions = {}; }
        this.animatorLoopRendering = false;
        this.frameChangeDelay = 50;
        this.renderedFrames = [];
        var templateOptions = {
            successIcon: chalk_1.default.hex("#50ffab")("✓")
        };
        var options = Object.assign(templateOptions, rawOptions);
        var successIcon = options.successIcon;
        var message = this.message;
        if (rawMessage) {
            message = rawMessage;
        }
        var frame = successIcon + " " + message;
        process.stdout.write("\r" + frame + " ".repeat(this.message.length) + "\n");
    };
    return CliAnimator;
}());
exports.default = CliAnimator;
