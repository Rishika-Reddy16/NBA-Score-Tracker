import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IScores, ITeamCardDetails } from '../store/interfaces';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  cardData: ITeamCardDetails = {
    name: '',
    abbreviation: '',
    conference: '',
    derivedResults: {
      homeTeam: [],
      visitorTeam: [],
      homeTeamScore: [],
      visitorTeamScore: [],
    },
    concededTeamAverage: 0,
    scoredTeamAverage: 0,
    id: 0,
    winOrLose: [],
  };
  scores: IScores[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let gameResult: ITeamCardDetails[] = JSON.parse(sessionStorage.getItem('gameResult')!);
    let response: ITeamCardDetails[] = gameResult.filter((res: ITeamCardDetails) => {
      return res.id == Number(this.route.snapshot.paramMap.get('teamCode'));
    });
    this.cardData = response[0];
    for (let i = 0; i < this.cardData.derivedResults.homeTeam.length; i++) {
      let res: IScores = {
        homeTeam: '',
        visitorTeam: '',
        homeTeamScore: '',
        visitorTeamScore: '',
      };
      res['visitorTeam'] = this.cardData.derivedResults.visitorTeam[i];
      res['visitorTeamScore'] = this.cardData.derivedResults.visitorTeamScore[i];
      res['homeTeam'] = this.cardData.derivedResults.homeTeam[i];
      res['homeTeamScore'] = this.cardData.derivedResults.homeTeamScore[i];
      this.scores.push(res);
    }
  }
}
