import Section from './Section';
import Logger from './Logger';
import CliAnimator from './CliAnimator';
export default class TerminalMod {
    /**
     * @var { Section } section Sections separator class
     */
    public section: Section;

    public logger: Logger;

    public cliAnimator: CliAnimator;

    /**
     * Customize the user experience in your CLI applications with absolute ease
     */
    public constructor() {
        // Initialize
        this.section = new Section(this);
        this.logger = new Logger(this);
        this.cliAnimator = new CliAnimator(this);
    }
}