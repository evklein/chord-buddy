import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StartPageComponent } from '../start-page/start-page.component';
import { ViewProgressionsPageComponent } from '../view-progressions-page/view-progressions-page.component';
import { CreateProgressionPageComponent } from '../create-progression-page/create-progression-page.component';

const appRoutes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'view-progressions', component: ViewProgressionsPageComponent },
  { path: 'create-progression', component: CreateProgressionPageComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
