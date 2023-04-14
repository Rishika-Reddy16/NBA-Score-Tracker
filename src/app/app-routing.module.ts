import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackComponent } from './track/track.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'track',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'track',
        component: TrackComponent
      },
      {
        path: 'results/:teamCode',
        component: ResultsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
