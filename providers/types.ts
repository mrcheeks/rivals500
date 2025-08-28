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
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs' | 'no_trumps';
  count: '6' | '7' | '8' | '9' | '10';
  outcome: 'in_progress' | 'won' | 'lost';
  all_ten: boolean;
  game_id: string;
  team: 'team_1' | 'team_2';
};

type Game = {
  $id: string;
  team_1_id: string;
  team_2_id: string;
  title: string;
  team_1_doors: number;
  team_2_doors: number;
  team_1_score: number;
  team_2_score: number;
  non_player_team_2: boolean;
  status: 'in_progress' | 'active' | 'complete';
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

