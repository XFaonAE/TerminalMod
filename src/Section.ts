import chalk from "chalk";
import TerminalMod from "./TerminalMod";

export default class Section {
    /**
     * @var { TerminalMod } parent TerminalMod class object
     */
    public terminalMod: TerminalMod;

    /**
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    public constructor(terminalMod: TerminalMod) {
        this.terminalMod = terminalMod;
    }

    /**
     * Create a line separator
     * @param { string } rawTitle Title of the header
     * @param { object } rawOptions List of extra options
     */
    public create(rawTitle: string, rawOptions: any = {}) {
        // Setup options
        var templateOptions: any = {
            barHex: "#555555",
            titlePadding: 5,
            titlePaddingChar: " ",
            titleHex: "#ffffff",
            stemSize: 8,
            barChar: "─",
            maxWidth: process.stdout.columns
        };
        var options: any = Object.assign(templateOptions, rawOptions);

        // Validation
        var validateSize = (columns: number) => {
            if (columns <= 0) {
                this.terminalMod.logger.error("Command line max width exceed");
            }
        }

        // Create bar
        var columnsLeft: number = options.maxWidth;
        validateSize(columnsLeft);

        const barStart: string = options.barChar.repeat(options.stemSize);
        columnsLeft -= barStart.length;
        validateSize(columnsLeft);

        const title: string = rawTitle;
        columnsLeft -= title.length;
        validateSize(columnsLeft);

        const titlePadding: string = options.titlePaddingChar.repeat(options.titlePadding);
        columnsLeft -= titlePadding.length * 2;
        validateSize(columnsLeft);

        const barTail: string = options.barChar.repeat(columnsLeft);
        columnsLeft -= barTail.length;

        var output: string = chalk.hex(options.barHex)(barStart) + titlePadding + chalk.hex(options.titleHex)(title) + titlePadding + chalk.hex(options.barHex)(barTail);
        console.log(output);
    }
}