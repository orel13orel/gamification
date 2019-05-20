import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ContextComponent } from './components/context/context.component';
import { ActionComponent } from './components/action/action.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';


const appRoutes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'action', component : ActionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContextComponent,
    ActionComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
   RouterModule.forRoot(appRoutes)
  ],
  exports : [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
