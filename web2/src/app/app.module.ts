import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import { environment } from '../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import { ContextComponent } from './components/context/context.component';
import { ActionComponent } from './components/action/action.component';

@NgModule({
  declarations: [
    AppComponent,
    ContextComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
   // AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
