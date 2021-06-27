import TerminalMod from "./TerminalMod";
import hideCliCursor from "hide-terminal-cursor";
import chalk from "chalk";

export default class CliAnimator {
    /**
     * @var { TerminalMod } terminalMod TerminalMod class object
     */
    public terminalMod: TerminalMod;

    /**
     * Current frame number
     */
    public currentFrameIndex: number;

    /**
     * Rendered version of all frames being animated for the current print function
     */
    public renderedFrames: Array<string>;

    /**
     * @var { number } frameChangeDelay Delay between switching frames
     */
    public frameChangeDelay: number;

    /**
     * @var { boolean } animatorLoopRunning Is the frame animator loop running
     */
    public animatorLoopRunning: boolean;

    /**
     * @var { string } message Message to display with the spinner
     */
    public message: string;

    /**
     * @var { boolean} animatorLoopRunning Is the animator rendering
     */
    public animatorLoopRendering: boolean;

    /**
     * Create animations inside of the command line
     * @param { TerminalMod } terminalMod TerminalMod class object
     */
    public constructor(terminalMod: TerminalMod) {
        this.terminalMod = terminalMod;
        this.renderedFrames = [];
        this.currentFrameIndex = 0;
        this.animatorLoopRunning = false;
        this.frameChangeDelay = 100;
        this.message = "";
        this.animatorLoopRendering = false;
    }

    /**
     * Print an animation to the command line
     * @param { string } rawMessage Message to print with the animation
     * @param { object } rawOptions options
     */
    public print(rawMessage: string, rawOptions: object = {}) {
        hideCliCursor();
        interface Options {
            frames: Array<string>;
            interval: number;
        }

        var templateOptions: Options = {
            frames: [
                chalk.hex("#50ffab")("⠋"),
                chalk.hex("#50ffab")("⠙"),
                chalk.hex("#50ffab")("⠹"),
                chalk.hex("#50ffab")("⠸"),
                chalk.hex("#50ffab")("⠼"),
                chalk.hex("#50ffab")("⠴"),
                chalk.hex("#50ffab")("⠦"),
                chalk.hex("#50ffab")("⠧"),
                chalk.hex("#50ffab")("⠇"),
                chalk.hex("#50ffab")("⠏")
            ],
            interval: 50
        }

        var options: Options = Object.assign(templateOptions, rawOptions);

        this.frameChangeDelay = options.interval;
        var newRenderedFrames: Array<string> = [];
        options.frames.forEach((value: string, index: number) => {
            newRenderedFrames.push(value + " " + rawMessage);
        });
        this.renderedFrames = newRenderedFrames;
        
        this.message = rawMessage;

        this.animatorLoopRendering = true;
        if (!this.animatorLoopRunning) {
            this.animatorLoopRunning = true;
            this.startAnimatorLoop();
        }
    }

    /**
     * Start the frame animation loop
     */
    public startAnimatorLoop() {
        const nextFrameRender: CallableFunction = () => {
            if (this.animatorLoopRunning) {
                setTimeout(() => {
                    if (this.animatorLoopRendering) {
                        process.stdout.write("\r" + this.renderedFrames[this.currentFrameIndex]);
                    }
                    this.currentFrameIndex++;

                    if (this.currentFrameIndex > this.renderedFrames.length - 1) {
                        this.currentFrameIndex = 0;
                        nextFrameRender();
                        return;
                    }

                    nextFrameRender();
                }, this.frameChangeDelay);
            }
        };
        nextFrameRender();
    }

    /**
     * Set the spinner to its success state
     * @param { string | null } rawMessage Message to change to
     * @param { object } rawOptions Options
     */
    public success(rawMessage: string | null = null, rawOptions: object = {}) {
        this.animatorLoopRendering = false;
        this.frameChangeDelay = 50;
        this.renderedFrames = [];
        interface Options {
            successIcon: string
        }

        const templateOptions: Options = {
            successIcon: chalk.hex("#50ffab")("✓")
        };

        var options: Options = Object.assign(templateOptions, rawOptions);
        const successIcon = options.successIcon;

        var message: string = this.message;
        if (rawMessage) {
            message = rawMessage;
        }

        const frame: string = successIcon + " " + message;
        process.stdout.write("\r" + frame + " ".repeat(this.message.length) + "\n");
    }
}