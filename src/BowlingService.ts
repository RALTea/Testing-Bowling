export type BowlingService = {
	splitFrames: (scores: number[]) => number[][]
}
export const BowlingService = (): BowlingService => {
	return {
		splitFrames: (scores: number[]): number[][] => {
			const frames: number[][] = [];
			let i = 0;
			
			while (i < scores.length && frames.length < 10) {
				// Handle a strike
				if (scores[i] === 10) {
					frames.push([10]);
					i++;
				} 
				// Handle a regular frame or spare
				else {
					// Make sure we have two rolls available
					if (i + 1 < scores.length) {
						frames.push([scores[i], scores[i + 1]]);
						i += 2;
					} 
					// Handle case where we have only one roll left
					else {
						frames.push([scores[i]]);
						i++;
					}
				}
			}
			
			// Handle the 10th frame special case (if we have enough scores)
			if (frames.length === 10 && i < scores.length) {
				const tenthFrame = frames[9];
				
				// If 10th frame is a strike, we get two more rolls
				if (tenthFrame[0] === 10) {
					if (i < scores.length) tenthFrame.push(scores[i++]);
					if (i < scores.length) tenthFrame.push(scores[i++]);
				}
				// If 10th frame is a spare, we get one more roll
				else if (tenthFrame[0] + tenthFrame[1] === 10) {
					if (i < scores.length) tenthFrame.push(scores[i++]);
				}
			}
			
			return frames;
		}
	};
};
