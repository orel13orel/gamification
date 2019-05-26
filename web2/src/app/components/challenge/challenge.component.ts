import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {NewRb} from '../rb/rb.component';

export class NewChallenge {
  badge_id: string;
  end_time: string;
  name: string;
  points: string;
  start_time: string;
  constructor() {
    this.badge_id = '';
    this.end_time = '';
    this.name = '';
    this.points = '';
    this.start_time = new Date().toDateString();
  }
}

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenge: Observable<any[]>;
  @Output() clicked = new EventEmitter<string>();
  public newChallenge: NewChallenge;
  public delChallenge: string;

  constructor(private db: AngularFireDatabase) {
    this.challenge = db.list('Challenge').snapshotChanges();
    this.newChallenge = new NewChallenge();
  }

  ngOnInit() {
  }

  updateChallengeID(key: any) {
    // this.contextID = key;
    // console.log(this.contextID);
    this.clicked.emit(key);
  }

  addChallenge() {
    console.log(this.newChallenge.end_time);
    this.db.list('/Challenge').push(this.newChallenge);
  }
  deleteChallenge() {
    this.db.list('/Challenge').remove(this.delChallenge);
  }

}
