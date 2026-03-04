import { MAX_PINS_PER_FRAME, TOTAL_FRAMES } from "./domain/constants";
import { LastFrame } from "./domain/frames/LastFrame";
import { RegularFrame } from "./domain/frames/RegularFrame";
import { BowlingFrame } from "./domain/frames/BowlingFrame";

export class BowlingGame {
	private readonly frames: BowlingFrame[];
	private currentFrameIndex = 0;

	constructor() {
		this.frames = this.createFrames();
	}

	roll(pins: number): void {
		this.ensurePinsAreValid(pins);

		const frame = this.currentFrame();
		if (!frame) {
			throw new Error("Game is already complete");
		}

		frame.addRoll(pins);
		this.advanceFrameIfComplete();
	}

	score(): number {
		const allRolls = this.flattenedRolls();
		let total = 0;
		let rollCursor = 0;

		for (const frame of this.frames) {
			total += this.scoreFrame(frame, allRolls, rollCursor);
			rollCursor += frame.consumedRollsForScoring();
		}

		return total;
	}

	private createFrames(): BowlingFrame[] {
		const regularFrames = Array.from({ length: TOTAL_FRAMES - 1 }, () => new RegularFrame());
		return [...regularFrames, new LastFrame()];
	}

	private ensurePinsAreValid(pins: number): void {
		if (!Number.isInteger(pins)) {
			throw new Error("Pins must be an integer");
		}

		if (pins < 0 || pins > MAX_PINS_PER_FRAME) {
			throw new Error("Pins must be between 0 and 10");
		}
	}

	private currentFrame(): BowlingFrame | undefined {
		return this.frames[this.currentFrameIndex];
	}

	private advanceFrameIfComplete(): void {
		const frame = this.currentFrame();
		if (frame?.isComplete()) {
			this.currentFrameIndex += 1;
		}
	}

	private flattenedRolls(): number[] {
		return this.frames.flatMap((frame) => frame.allRolls());
	}

	private scoreFrame(frame: BowlingFrame, rolls: readonly number[], rollCursor: number): number {
		if (frame.isStrike()) {
			return MAX_PINS_PER_FRAME + this.sumNextRolls(rolls, rollCursor + 1, 2);
		}

		if (frame.isSpare()) {
			return MAX_PINS_PER_FRAME + this.sumNextRolls(rolls, rollCursor + 2, 1);
		}

		return frame.baseScore();
	}

	private sumNextRolls(rolls: readonly number[], startIndex: number, count: number): number {
		let total = 0;
		for (let i = 0; i < count; i++) {
			total += rolls[startIndex + i] ?? 0;
		}

		return total;
	}
}
