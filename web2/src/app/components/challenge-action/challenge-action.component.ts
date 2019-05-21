import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-challenge-action',
  templateUrl: './challenge-action.component.html',
  styleUrls: ['./challenge-action.component.css']
})
export class ChallengeActionComponent implements OnInit {
  challengeAction: Observable<any[]>;
  // @Input() childContextID: string;
  constructor( private db: AngularFireDatabase) { }

  ngOnInit() {
   // this.challengeAction = this.db.list('Context/' + this.childContextID + '/Action').snapshotChanges();
  }
  public showChallengeAction(event: string) {
    this.challengeAction = this.db.list('Challenge/' + event + '/Actions').snapshotChanges();
  }


}
