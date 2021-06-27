"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TerminalMod_1 = __importDefault(require("../src/TerminalMod"));
var tm = new TerminalMod_1.default();
tm.section.create("Testing environment");
tm.cliAnimator.print("Hello, TerminalMod!", {
    interval: 50
});
setTimeout(function () {
    tm.cliAnimator.success("Done");
    tm.cliAnimator.print("Loading renderer engine...", {
        interval: 50
    });
}, 1000);
