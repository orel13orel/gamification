import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  badge: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.badge = db.list('Badges').snapshotChanges();
  }

  ngOnInit() {
  }

}
