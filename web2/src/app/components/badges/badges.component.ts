import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

export class NewBadge {
  name: string;
  context_id: string;
  photoUrl: string;
}

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  badge: Observable<any[]>;
  delBadge: string;
  newBadge: NewBadge;

  constructor(private db: AngularFireDatabase) {
    this.badge = db.list('Badges').snapshotChanges();
    this.newBadge = new NewBadge();
  }

  ngOnInit() {
  }
  addBadge() {
    this.db.list('/Badges').push(this.newBadge);
  }
  deleteBadge() {
    this.db.list('/Badges').remove(this.delBadge);
  }

}
