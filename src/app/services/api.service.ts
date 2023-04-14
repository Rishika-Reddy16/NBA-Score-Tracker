import { Injectable } from '@angular/core';
import { ITeamNamesResponse, IDateID, IGameDetails } from '../store/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.KEY,
    'X-RapidAPI-Host': environment.HOST,
  });

  getTeamNames(): Observable<ITeamNamesResponse> {
    return this.http.get<ITeamNamesResponse>(`${environment.BASE_URL}/teams`, {
      headers: this.headers,
    });
  }

  previousGames(details: IDateID): Observable<IGameDetails> {
    let params: HttpParams = new HttpParams();
    details.dates.forEach((date: string) => {
      params = params.append('dates[]', date);
    });
    params = params.append('team_ids[]', details.teamId);
    return this.http.get<IGameDetails>(`${environment.BASE_URL}/games`, {
      headers: this.headers,
      params: params,
    });
  }
}
