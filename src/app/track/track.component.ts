import { Component, OnInit } from '@angular/core';
import { ITeamCardsList, IDateID, IGame, IGameDetails, ITeamsList, ITeamNamesResponse } from '../store/interfaces';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  teamNames: ITeamsList[] = [];
  selectedTeam: string = '';
  pastTwelveDays: string[] = [];
  teamCards: ITeamCardsList[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTeams();
    for (let i = 0; i < 12; i++) {
      var date = new Date();
      date.setDate(date.getDate() - (i+1));
      this.pastTwelveDays.push(date.toISOString().slice(0, 10))
    }    
    if (sessionStorage.getItem('gameResult') != null) {
      this.teamCards = JSON.parse(sessionStorage.getItem('gameResult')!);
    }
  }

  getAllTeams(): void {
    this.apiService.getTeamNames().subscribe({
      next: (result : ITeamNamesResponse) => {
        this.teamNames = result.data;
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
  }

  track(): void {
    if(this.selectedTeam){
      let data: IDateID = {
        dates: this.pastTwelveDays,
        teamId: this.selectedTeam,
      };
      let isTracked: boolean = false;
      this.teamCards.forEach((team: ITeamCardsList) => {
        if (team.id == data.teamId) {
          isTracked = true;
        }
      });
      if (!isTracked) {      
        this.fetchResults(data);
      }
    }
  }

  fetchResults(data: IDateID): void {
    this.apiService.previousGames(data).subscribe({
      next: (resp: IGameDetails) => {
        let name: string = '';
        let abbreviation: string = '';
        let conference: string = '';
        let visitorTeamScore: string[] = [];
        let visitorTeamDetails: string[] = [];
        let homeTeamScore: string[] = [];
        let homeTeamDetails: string[] = [];
        let id: string = '';
        let winOrLose: string[] = [];
        let scoredTeam : number = 0;
        let concededTeam: number = 0;
  
        resp.data.forEach((value: IGame) => {
          if (value.home_team.id == this.selectedTeam) {            
            name = value.home_team.full_name;
            abbreviation = value.home_team.abbreviation;
            conference = value.home_team.conference;
            id = value.home_team.id;
            scoredTeam += Number(value.home_team_score);
            concededTeam += Number(value.visitor_team_score);
            if (value.home_team_score > value.visitor_team_score) {
              winOrLose.push('W');
            } else if (value.home_team_score < value.visitor_team_score) {
              winOrLose.push('L');
            }
          } 
          else {
            name = value.visitor_team.full_name;
            abbreviation = value.visitor_team.abbreviation;
            conference = value.visitor_team.conference;
            id = value.visitor_team.id;
            scoredTeam += Number(value.visitor_team_score);
            concededTeam += Number(value.home_team_score);
            if (value.home_team_score < value.visitor_team_score) {
              winOrLose.push('W');
            } else if (value.home_team_score > value.visitor_team_score) {
              winOrLose.push('L');
            } else {
              return;
            }
          }
          homeTeamDetails.push(value.home_team.abbreviation);
          homeTeamScore.push(value.home_team_score);
          visitorTeamDetails.push(value.visitor_team.abbreviation);
          visitorTeamScore.push(value.visitor_team_score);
        });
  
        this.teamCards.push({
          name: name,
          conference: conference,
          abbreviation: abbreviation,
          id: id,
          derivedResults: {
            visitorTeamScore: visitorTeamScore,
            homeTeamScore: homeTeamScore,
            homeTeam: homeTeamDetails,
            visitorTeam: visitorTeamDetails,
          },
          scoredTeamAverage: Math.round(scoredTeam / resp.data.length),
          concededTeamAverage: Math.round(concededTeam / resp.data.length),
          winOrLose: winOrLose
        });
        sessionStorage.setItem('gameResult', JSON.stringify(this.teamCards)) 
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
  }

  removeTeam(cardIndex: number): void {
    this.teamCards.splice(cardIndex, 1);
    sessionStorage.setItem('gameResult', JSON.stringify(this.teamCards));
  }

  resultsPage(cardData: ITeamCardsList): void {
    this.router.navigate([`/results/${cardData.id}`]);
  }

}
