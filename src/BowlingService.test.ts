import { describe, expect, test } from "vitest";
import { BowlingService } from "./BowlingService";

describe("BowlingService", () => {
	test("Should split frames where each total score is 9 or less", () => {
		const bowlingService = BowlingService();
		const scores = [1, 2, 3, 4, 5, 6, 7, 8];

		const frames = bowlingService.splitFrames(scores);
		expect(frames).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
		]);
	});

	test("If strike not in last frame, should have a single score in frame", () => {
		const bowlingService = BowlingService();
		const scores = [10, 2, 3, 4, 5, 6, 7];

		const frames = bowlingService.splitFrames(scores);
		expect(frames).toEqual([[10], [2, 3], [4, 5], [6, 7]]);
	});

	test("If strike in 10th frame, should have two scores", () => {
		const bowlingService = BowlingService();
		const scores = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 10, 2, 7];

		const frames = bowlingService.splitFrames(scores);
		expect(frames).toEqual([
			[2, 3],
			[4, 5],
			[2, 3],
			[4, 5],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[10, 2, 7],
		]);
	});
});
