import { MAX_PINS_PER_FRAME } from "../constants";
import { BowlingFrame } from "./BowlingFrame";

export class LastFrame extends BowlingFrame {
	protected canAcceptRoll(): boolean {
		if (this.rolls.length < 2) {
			return true;
		}

		if (this.rolls.length > 2) {
			return false;
		}

		return this.hasBonusRoll();
	}

	protected maxPinsForNextRoll(): number {
		if (this.rolls.length === 0) {
			return MAX_PINS_PER_FRAME;
		}

		if (this.rolls.length === 1) {
			return this.rolls[0] === MAX_PINS_PER_FRAME
				? MAX_PINS_PER_FRAME
				: MAX_PINS_PER_FRAME - this.rolls[0];
		}

		if (!this.hasBonusRoll()) {
			return 0;
		}

		const first = this.rolls[0];
		const second = this.rolls[1];

		if (first === MAX_PINS_PER_FRAME) {
			return second === MAX_PINS_PER_FRAME
				? MAX_PINS_PER_FRAME
				: MAX_PINS_PER_FRAME - second;
		}

		return MAX_PINS_PER_FRAME;
	}

	private hasBonusRoll(): boolean {
		const first = this.rolls[0];
		const second = this.rolls[1];
		return first === MAX_PINS_PER_FRAME || first + second === MAX_PINS_PER_FRAME;
	}
}
