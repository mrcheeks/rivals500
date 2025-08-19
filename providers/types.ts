type Team = {
  $id: string;
  name: string;
  player_2: string;
  player: {
    $id: string;
    username: string;
  };
};

type Contract = {
  $id: string;
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs' | 'no-trumps';
  count: '6' | '7' | '8' | '9' | '10';
  outcome: 'in_progress' | 'won' | 'lost';
};

type Game = {
  $id: string;
  team_1_id: string;
  team_2_id: string;
  title: string;
  team_1_doors: number;
  team_2_doors: number;
  status: 'in_progress' | 'complete';
  contracts: Contract[]
};

type User = {
  id: string;
  name: string;
  email: string;
  teams: Team[];
  games: Game[];
};

export type { Contract, Game, Team, User };

