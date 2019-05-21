import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenge: Observable<any[]>;
  @Output() clicked = new EventEmitter<string>();
  constructor(private db: AngularFireDatabase) {
    this.challenge = db.list('Challenge').snapshotChanges();
  }

  ngOnInit() {
  }

  updateChallengeID(key: any) {
    // this.contextID = key;
    // console.log(this.contextID);
    this.clicked.emit(key);
  }

}
