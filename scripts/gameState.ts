import { calculateScore } from "./roundScore";

type Suit = "spades" | "clubs" | "diamonds" | "hearts" | "no_trumps";

interface ScoreEntry {
  tricks: number;
  suits: { suit: Suit; score: number }[];
}

// reuse scoringTable + calculateScore from earlier...
// (omitted here for brevity — same as before)

interface TeamState {
  roundScore: number; // current round tally
  wins: number;       // number of matches won
}

interface GameState {
  team_1: TeamState;
  team_2: TeamState;
}

function createGameState(): GameState {
  return {
    team_1: { roundScore: 0, wins: 0 },
    team_2: { roundScore: 0, wins: 0 }
  };
}

function updateScore(
  game: GameState,
  team: "team_1" | "team_2",
  bidTricks: number,
  suit: Suit,
  wonTricks: number,
): GameState {
  const score = calculateScore(bidTricks, suit, wonTricks);

  // apply score to chosen team
  const teamState = team === "team_1" ? game.team_1 : game.team_2;
  teamState.roundScore += score;

  // check for front door win
  if (teamState.roundScore >= 500) {
    teamState.wins += 1;
    game.team_1.roundScore = 0;
    game.team_2.roundScore = 0;
  }

  // check for back door loss
  if (teamState.roundScore <= -500) {
    const otherTeam = team === "team_1" ? game.team_2 : game.team_1;
    otherTeam.wins += 1;
    game.team_1.roundScore = 0;
    game.team_2.roundScore = 0;
  }

  return game;
}

export { createGameState, updateScore };

