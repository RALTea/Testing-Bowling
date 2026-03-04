import { describe, expect, test } from "vitest";
import { BowlingGame } from "./BowlingGame";

const rollMany = (game: BowlingGame, rolls: number, pins: number): void => {
	for (let i = 0; i < rolls; i++) {
		game.roll(pins);
	}
};

describe("Unit:BowlingGame", () => {
	test("Gutter game should score 0", () => {
		const game = new BowlingGame();

		rollMany(game, 20, 0);

		expect(game.score()).toBe(0);
	});

	test("When all rolls are 1, score should be 20", () => {
		const game = new BowlingGame();

		rollMany(game, 20, 1);

		expect(game.score()).toBe(20);
	});

	test("Spare should add bonus from next roll", () => {
		const game = new BowlingGame();

		game.roll(5);
		game.roll(5);
		game.roll(3);
		rollMany(game, 17, 0);

		expect(game.score()).toBe(16);
	});

	test("Strike should add bonus from next two rolls", () => {
		const game = new BowlingGame();

		game.roll(10);
		game.roll(3);
		game.roll(4);
		rollMany(game, 16, 0);

		expect(game.score()).toBe(24);
	});

	test("Two strikes in a row should be scored correctly", () => {
		const game = new BowlingGame();

		game.roll(10);
		game.roll(10);
		game.roll(3);
		game.roll(4);
		rollMany(game, 14, 0);

		expect(game.score()).toBe(47);
	});

	test("10th frame spare should allow one bonus roll", () => {
		const game = new BowlingGame();

		rollMany(game, 18, 0);
		game.roll(7);
		game.roll(3);
		game.roll(5);

		expect(game.score()).toBe(15);
	});

	test("10th frame strike should allow two bonus rolls", () => {
		const game = new BowlingGame();

		rollMany(game, 18, 0);
		game.roll(10);
		game.roll(5);
		game.roll(4);

		expect(game.score()).toBe(19);
	});

	test("Perfect game should score 300", () => {
		const game = new BowlingGame();

		rollMany(game, 12, 10);

		expect(game.score()).toBe(300);
	});

	test("Roll should reject pin count lower than 0", () => {
		const game = new BowlingGame();

		expect(() => game.roll(-1)).toThrowError("Pins must be between 0 and 10");
	});

	test("Roll should reject pin count greater than 10", () => {
		const game = new BowlingGame();

		expect(() => game.roll(11)).toThrowError("Pins must be between 0 and 10");
	});

	test("A frame cannot knock down more than 10 pins", () => {
		const game = new BowlingGame();

		game.roll(8);

		expect(() => game.roll(3)).toThrowError("Invalid roll for current frame");
	});

	test("No rolls are allowed once the game is complete", () => {
		const game = new BowlingGame();

		rollMany(game, 20, 0);

		expect(() => game.roll(0)).toThrowError("Game is already complete");
	});

	test("After strike in 10th frame, third roll is constrained by second bonus roll", () => {
		const game = new BowlingGame();

		rollMany(game, 18, 0);
		game.roll(10);
		game.roll(7);

		expect(() => game.roll(4)).toThrowError("Invalid roll for current frame");
	});
});
