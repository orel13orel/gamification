import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContextComponent } from './components/context/context.component';
import { ActionComponent } from './components/action/action.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { BadgesComponent } from './components/badges/badges.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeActionComponent } from './components/challenge-action/challenge-action.component';
import { RpComponent } from './components/rp/rp.component';
import { RbComponent } from './components/rb/rb.component';
import { Action2Component } from './components/action2/action2.component';
import { Context2Component } from './components/context2/context2.component';
import {FormsModule} from '@angular/forms';
import { DropzoneDirective } from './components/badges/dropzone.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ChartComponent } from './components/chart/chart.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'action', component : ActionComponent},
  {path: 'badge', component : BadgesComponent},
  {path: 'challengeAction', component : ChallengeActionComponent},
  {path: 'Rp', component : RpComponent},
  {path: 'Rb', component : RbComponent},
  {path: 'action2', component: Action2Component},
  {path: 'file-upload', component: FileUploadComponent},
  {path: 'chart', component: ChartComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ContextComponent,
    ActionComponent,
    NavbarComponent,
    HomeComponent,
    BadgesComponent,
    ChallengeComponent,
    ChallengeActionComponent,
    RpComponent,
    RbComponent,
    Action2Component,
    Context2Component,
    DropzoneDirective,
    FileUploadComponent,
    ChartComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    AngularFireStorageModule,
  ],
  exports : [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
