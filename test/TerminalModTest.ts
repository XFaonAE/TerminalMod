import chalk from "chalk";
import TerminalMod from "../src/TerminalMod";

const tm = new TerminalMod();

tm.section.create("Testing environment");
tm.cliAnimator.print("Hello, TerminalMod!");

setTimeout(() => {
    tm.cliAnimator.success("Done");
    tm.cliAnimator.print("Loading renderer engine...");
    tm.cliAnimator.success();

    tm.section.create("This is a customized section", {
        barHex: "#50ffab",
        titleHex: "#50ffab"
    });
}, 1000);