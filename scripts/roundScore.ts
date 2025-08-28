type Suit = "spades" | "clubs" | "diamonds" | "hearts" | "no_trumps";

interface ScoreEntry {
  tricks: number;
  suits: { suit: Suit; score: number }[];
}

const scoringTable: ScoreEntry[] = [
  {
    tricks: 6,
    suits: [
      { suit: "spades", score: 40 },
      { suit: "clubs", score: 60 },
      { suit: "diamonds", score: 80 },
      { suit: "hearts", score: 100 },
      { suit: "no_trumps", score: 120 }
    ]
  },
  {
    tricks: 7,
    suits: [
      { suit: "spades", score: 140 },
      { suit: "clubs", score: 160 },
      { suit: "diamonds", score: 180 },
      { suit: "hearts", score: 200 },
      { suit: "no_trumps", score: 220 }
    ]
  },
  {
    tricks: 8,
    suits: [
      { suit: "spades", score: 240 },
      { suit: "clubs", score: 260 },
      { suit: "diamonds", score: 280 },
      { suit: "hearts", score: 300 },
      { suit: "no_trumps", score: 320 }
    ]
  },
  {
    tricks: 9,
    suits: [
      { suit: "spades", score: 340 },
      { suit: "clubs", score: 360 },
      { suit: "diamonds", score: 380 },
      { suit: "hearts", score: 400 },
      { suit: "no_trumps", score: 420 }
    ]
  },
  {
    tricks: 10,
    suits: [
      { suit: "spades", score: 440 },
      { suit: "clubs", score: 460 },
      { suit: "diamonds", score: 480 },
      { suit: "hearts", score: 500 },
      { suit: "no_trumps", score: 520 }
    ]
  }
];

function calculateScore(bidTricks: number, suit: Suit, wonTricks: number): number {
  const entry = scoringTable.find(e => e.tricks === bidTricks);
  if (!entry) throw new Error(`Invalid bid: ${bidTricks} tricks`);

  const suitEntry = entry.suits.find(s => s.suit === suit);
  if (!suitEntry) throw new Error(`Invalid suit: ${suit}`);

  // win/lose base rule
  let score = wonTricks >= bidTricks ? suitEntry.score : -suitEntry.score;

  // special rule: if all 10 tricks are won and base score < 250 → return 250
  if (wonTricks === 10 && score > 0 && score < 250) {
    score = 250;
  }

  return score;
}

export { calculateScore };

