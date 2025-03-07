

export class BowlingGame {
	scores: number[] = []

	constructor(private splitFrames: (scores: number[]) => number[][]) { }

	totalScore(): number {
		const frames = this.splitFrames(this.scores);
		
		if (frames.length === 0) {
			return 0;
		}

		let totalScore = 0;
		
		for (let frameIndex = 0; frameIndex < frames.length; frameIndex++) {
			const frame = frames[frameIndex];
			const isLastFrame = frameIndex === 9;
			
			// First, add the base score of the frame
			const frameBaseScore = frame.reduce((sum, score) => sum + score, 0);
			totalScore += frameBaseScore;
			
			// Handle strike bonus (not for the last frame)
			if (!isLastFrame && frame.length === 1 && frame[0] === 10) {
				// It's a strike, add bonus from next two rolls
				totalScore += this.getNextTwoBallsAfterFrame(frames, frameIndex);
			}
			// Handle spare bonus (not for the last frame)
			else if (!isLastFrame && frame.length === 2 && frame[0] + frame[1] === 10) {
				// It's a spare, add bonus from next roll
				totalScore += this.getNextBallAfterFrame(frames, frameIndex);
			}
		}
		
		return totalScore;
	}
	
	private getNextBallAfterFrame(frames: number[][], frameIndex: number): number {
		const nextFrameIndex = frameIndex + 1;
		
		if (nextFrameIndex < frames.length) {
			return frames[nextFrameIndex][0];
		}
		
		return 0;
	}
	
	private getNextTwoBallsAfterFrame(frames: number[][], frameIndex: number): number {
		const nextFrameIndex = frameIndex + 1;
		
		if (nextFrameIndex >= frames.length) {
			return 0;
		}
		
		const nextFrame = frames[nextFrameIndex];
		
		// If next frame is a strike and not the last frame
		if (nextFrame.length === 1 && nextFrame[0] === 10 && nextFrameIndex < 9) {
			// We need the strike + first ball of the frame after
			return 10 + this.getNextBallAfterFrame(frames, nextFrameIndex);
		} 
		// Otherwise use the first two balls of next frame (or just what's available)
		else {
			return nextFrame[0] + (nextFrame.length > 1 ? nextFrame[1] : 0);
		}
	}
}
