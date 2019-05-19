import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  action: Observable<any[]>;
  constructor(contextID , private db: AngularFireDatabase) {
    this.action = db.list('Context/' + contextID + '/Action').snapshotChanges();
  }

  ngOnInit() {
  }

}
