import { MAX_PINS_PER_FRAME } from "../constants";

export abstract class BowlingFrame {
  protected readonly rolls: number[] = [];

  addRoll(pins: number): void {
    if (!this.canAcceptRoll()) {
      throw new Error("Game is already complete");
    }

    if (pins > this.maxPinsForNextRoll()) {
      throw new Error("Invalid roll for current frame");
    }

    this.rolls.push(pins);
  }

  isComplete(): boolean {
    return !this.canAcceptRoll();
  }

  isStrike(): boolean {
    return this.firstRoll() === MAX_PINS_PER_FRAME;
  }

  isSpare(): boolean {
    const first = this.firstRoll();
    const second = this.secondRoll();

    return (
      first !== undefined &&
      second !== undefined &&
      first !== MAX_PINS_PER_FRAME &&
      first + second === MAX_PINS_PER_FRAME
    );
  }

  baseScore(): number {
    return this.rolls.reduce((sum, roll) => sum + roll, 0);
  }

  consumedRollsForScoring(): number {
    if (this.isStrike()) {
      return 1;
    }

    return Math.min(2, this.rolls.length);
  }

  firstRoll(): number | undefined {
    return this.rolls[0];
  }

  secondRoll(): number | undefined {
    return this.rolls[1];
  }

  allRolls(): readonly number[] {
    return this.rolls;
  }

  // These methods are implemented differently for regular frames and the last frame
  protected abstract canAcceptRoll(): boolean;
  protected abstract maxPinsForNextRoll(): number;
}
