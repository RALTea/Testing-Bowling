import { MAX_PINS_PER_FRAME } from "../constants";
import { BowlingFrame } from "./BowlingFrame";

export class RegularFrame extends BowlingFrame {
	protected canAcceptRoll(): boolean {
		if (this.rolls.length === 0) {
			return true;
		}

		if (this.rolls[0] === MAX_PINS_PER_FRAME) {
			return false;
		}

		return this.rolls.length < 2;
	}

	protected maxPinsForNextRoll(): number {
		if (this.rolls.length === 0) {
			return MAX_PINS_PER_FRAME;
		}

		return MAX_PINS_PER_FRAME - this.rolls[0];
	}
}
