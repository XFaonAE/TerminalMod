"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TerminalMod_1 = __importDefault(require("../src/TerminalMod"));
var tm = new TerminalMod_1.default();
tm.section.create("Testing environment");
tm.cliAnimator.print("Hello, TerminalMod!");
setTimeout(function () {
    tm.cliAnimator.success("Done");
    tm.cliAnimator.print("Loading renderer engine...");
    tm.cliAnimator.success();
    tm.section.create("This is a customized section", {
        barHex: "#50ffab",
        titleHex: "#50ffab"
    });
}, 1000);
