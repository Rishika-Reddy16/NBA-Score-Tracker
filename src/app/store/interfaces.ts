export interface ITeamNamesResponse {
  data: ITeamsList[];
  meta: IMeta;
}

export interface ITeamCardDetails {
  name: string;
  abbreviation: string;
  conference: string;
  derivedResults: IResults;
  concededTeamAverage: number;
  scoredTeamAverage: number;
  id: number;
  winOrLose: string[];
}

export interface ITeamsList {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: string;
  name: string;
}
  
export interface ITeamCardsList {
  scoredTeamAverage: number;
  concededTeamAverage: number;
  winOrLose: Array<string>;
  name: string;
  conference: string;
  abbreviation: string;
  id: string;
  derivedResults: IResults;
}
  
export interface IDateID {
  dates: string[];
  teamId: string;
}

export interface IScores {
  homeTeam: string;
  visitorTeam: string;
  homeTeamScore: string;
  visitorTeamScore: string;
}
  
export interface IResults {
  homeTeam: string[];
  visitorTeam: string[];
  homeTeamScore: string[];
  visitorTeamScore: string[];
}
  
export interface IGame {
  id: number;
  date: string;
  home_team: IVisitorOrHomeTeam;
  home_team_score: string;
  visitor_team: IVisitorOrHomeTeam;
  visitor_team_score: string;
  season: number;
  period: number;
  postseason: boolean;
  status: string;
  time: string;
}
  
export interface IGameDetails {
  data: IGame[];
  meta: IMeta;
}

export interface IVisitorOrHomeTeam {
  id: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}
  
export interface IMeta {
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_count: number;
  total_pages: number;
}