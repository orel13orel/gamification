import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web2';
  class: Observable<any>;
  students: Observable<any[]>;

  context: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.class = db.object('class').valueChanges();
    this.students = db.list('class/student').snapshotChanges();

    this.context = db.list('Context').snapshotChanges();
  }
}
