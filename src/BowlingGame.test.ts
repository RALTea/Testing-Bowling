import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BowlingGame } from './BowlingGame';
import { BowlingService } from './BowlingService';

describe('BowlingGame', () => {

	const bowlingServiceMock = {
		splitFrames: vi.fn<BowlingService['splitFrames']>()
	}

	beforeEach(() => {
		vi.resetAllMocks()
	})

	test('should initialize with an empty scores array', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([])
		const game = new BowlingGame(bowlingServiceMock.splitFrames);

		const totalScore = game.totalScore();

		expect(totalScore).toEqual(0);
	});

	test('When no spare or strike, should return sum of scores', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[2,3], [2,3], [2,3]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		expect(totalScore).toEqual(15);
	});

	test('When strike, frame score should be 10 + next two scores', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[10], [2,3], [2,3]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		expect(totalScore).toEqual(25);
	});

	test('When spare, frame score should be 10 + next one', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[5, 5], [2,3], [2,3]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		expect(totalScore).toEqual(22);
	});

	test('When 2 strikes in a row, frame score should be 10 + 10 + next one', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[10], [10], [2,3]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		
		expect(totalScore).toEqual(42);
	});

	test('When strike on 10th frame, frame score should be 10 + 10 + next one', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[2,3], [2,3], [2,3], [2,3], [2,3], [2,3], [2,3], [2,3], [2,3], [10, 2, 3]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		
		expect(totalScore).toEqual(60);
	});

	test('Max score must be 300', () => {
		bowlingServiceMock.splitFrames.mockReturnValue([[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]])
		const game = new BowlingGame(bowlingServiceMock.splitFrames)

		const totalScore = game.totalScore();

		expect(totalScore).toEqual(300);
	})
});