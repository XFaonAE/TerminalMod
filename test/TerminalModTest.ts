import chalk from "chalk";
import TerminalMod from "../src/TerminalMod";

const tm = new TerminalMod();

tm.section.create("Testing environment");
tm.cliAnimator.print("Hello, TerminalMod!", {
    interval: 50
});

setTimeout(() => {
    tm.cliAnimator.success("Done");
    tm.cliAnimator.print("Loading renderer engine...", {
        interval: 50
    });
}, 1000)