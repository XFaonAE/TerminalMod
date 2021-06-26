import TerminalMod from "./TerminalMod";
export default class Section {
    /**
     * @var { TerminalMod } parent TerminalMod class object
     */
    terminalMod: TerminalMod;
    /**
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    constructor(terminalMod: TerminalMod);
    /**
     * Create a line separator
     * @param { string } rawTitle Title of the header
     * @param { object } rawOptions List of extra options
     */
    create(rawTitle: string, rawOptions?: any): void;
}
//# sourceMappingURL=Section.d.ts.map