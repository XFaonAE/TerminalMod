import TerminalMod from "./TerminalMod";

export default class CliAnimator {
    /**
     * @var { TerminalMod } terminalMod TerminalMod class object
     */
    public terminalMod: TerminalMod;

    public constructor(terminalMod: TerminalMod) {
        // Initialize
        this.terminalMod = terminalMod;
    }
}