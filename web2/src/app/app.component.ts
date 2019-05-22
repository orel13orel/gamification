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
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  posts: any;
  context = 'fff';
  constructor(private http: HttpClient) {

  }
  addContext() {
    console.log('post context');
    this.posts = this.http.get('https://us-central1-fashionistaapp-de817.cloudfunctions.net/hasin');
  }
}
