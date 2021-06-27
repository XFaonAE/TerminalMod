"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var nextFrameRender;
            var _this = this;
            return __generator(this, function (_a) {
                nextFrameRender = function () {
                    if (_this.animatorLoopRunning) {
                        setTimeout(function () {
                            if (_this.animatorLoopRunning) {
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
                return [2 /*return*/];
            });
        }); })();
    };
    /**
     * Set the spinner to its success state
     * @param { string | null } rawMessage Message to change to
     * @param { object } rawOptions Options
     */
    CliAnimator.prototype.success = function (rawMessage, rawOptions) {
        if (rawMessage === void 0) { rawMessage = null; }
        if (rawOptions === void 0) { rawOptions = {}; }
        this.animatorLoopRunning = false;
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
