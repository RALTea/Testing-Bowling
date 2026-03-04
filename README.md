# Module Testing - Bowling Scoring

## Run the tests
```bash
pnpm install
pnpm run vitest
```
(or `pnpm run vitest --ui` for using vitest UI)

## Why this architecture
- We model the game with small domain objects to keep rules readable and testable.
- We use a very light Domain-Driven Design (DDD) idea: code names should match bowling words (`game`, `frame`, `roll`, `strike`, `spare`).
- Keeping this business vocabulary is important because tests, code, and team discussions all speak the same language.
- `BowlingGame` orchestrates the match (roll flow + total score) and delegates frame-specific constraints.
- `BowlingFrame` is an abstract rule holder, then two concrete implementations split behavior:
  - `RegularFrame`: frames 1 to 9
  - `LastFrame`: frame 10 with bonus-roll edge cases
- This avoids putting all bowling exceptions in one large method and keeps each rule close to where it applies.

## What happens when you call the API
1. `game.roll(pins)` validates basic input (`0..10`, integer).
2. The current frame validates whether the roll is legal for that frame state.
3. The roll is stored in that frame.
4. If the frame is complete, the game moves to the next frame.
5. `game.score()` recomputes total score from frames:
   - strike: 10 + next 2 rolls
   - spare: 10 + next 1 roll
   - open frame: sum of frame rolls

## Test strategy used in this repo
- Tests are written as game scenarios (gutter game, spare, strike chain, perfect game, 10th-frame bonuses, invalid rolls).
- This acts as executable documentation: each rule is demonstrated by a concrete sequence of rolls.
- The goal is to make edge cases explicit and prevent regressions when the team would refactor the implementation.

## Instructions
This lab aims to make you practice your testing skills on a simple bowling scoring game.
The actual implementation is a bit tricky, so you really need to implement your test cases step by step, case by case.

> **Note:** Using TDD is very efficient when couple with LLMs such as Claude Opus 4.6, Gemini Pro 3.1, or OpenAI Codex 5.3
Your goal here is to write tests, handling as much edge cases as possible.
The actual implementation does not really matter here, so you're free to use your preferred approach and tools you like.
