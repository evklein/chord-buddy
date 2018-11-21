import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ViewProgressionsPageComponent } from './view-progressions-page/view-progressions-page.component';
import { CreateProgressionPageComponent } from './create-progression-page/create-progression-page.component';
import { GeneralService } from './general.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    HeaderComponent,
    ViewProgressionsPageComponent,
    CreateProgressionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
