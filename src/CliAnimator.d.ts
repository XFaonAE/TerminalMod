import TerminalMod from "./TerminalMod";
export default class CliAnimator {
    /**
     * @var { TerminalMod } terminalMod TerminalMod class object
     */
    terminalMod: TerminalMod;
    /**
     * Current frame number
     */
    currentFrameIndex: number;
    /**
     * Rendered version of all frames being animated for the current print function
     */
    renderedFrames: Array<string>;
    /**
     * @var { number } frameChangeDelay Delay between switching frames
     */
    frameChangeDelay: number;
    /**
     * @var { boolean } animatorLoopRunning Is the frame animator loop running
     */
    animatorLoopRunning: boolean;
    /**
     * @var { string } message Message to display with the spinner
     */
    message: string;
    /**
     * Create animations inside of the command line
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    constructor(terminalMod: TerminalMod);
    /**
     * Print an animation to the command line
     * @param { string } rawMessage Message to print with the animation
     * @param { object } rawOptions options
     */
    print(rawMessage: string, rawOptions?: object): void;
    /**
     * Start the frame animation loop
     */
    startAnimatorLoop(): void;
    /**
     * Set the spinner to its success state
     * @param { string | null } rawMessage Message to change to
     * @param { object } rawOptions Options
     */
    success(rawMessage?: string | null, rawOptions?: object): void;
}
//# sourceMappingURL=CliAnimator.d.ts.map