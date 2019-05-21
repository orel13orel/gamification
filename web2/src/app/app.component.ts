import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web2';
  readonly ROOT_URL = 'https://us-central1-fashionistaapp-de817.cloudfunctions.net';
  context: any;
  constructor(private http: HttpClient) {

  }
  addContext() {
    heders
    console.log('post context');
    this.http.post('https://us-central1-fashionistaapp-de817.cloudfunctions.net/addContext2?text=newcontext2', null, null );
  }
}
