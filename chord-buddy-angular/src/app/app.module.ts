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
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { authEnvironment } from '../environments/auth.environment';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    HeaderComponent,
    ViewProgressionsPageComponent,
    CreateProgressionPageComponent,
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(authEnvironment),
    AngularFireAuthModule,
    AngularFireModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, GeneralService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
