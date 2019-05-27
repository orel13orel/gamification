import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {NewAction} from '../action/action.component';

export class NewChallengeAction {
  action_id: string;
  amount: string;
}
@Component({
  selector: 'app-challenge-action',
  templateUrl: './challenge-action.component.html',
  styleUrls: ['./challenge-action.component.css']
})
export class ChallengeActionComponent implements OnInit {
  challengeAction: Observable<any[]>;
  public newChallengeAction: NewChallengeAction;
  public delChallengeAction: string;
  challengeRef: string;
  // @Input() childContextID: string;
  constructor( private db: AngularFireDatabase) {
    this.newChallengeAction = new NewChallengeAction();
  }

  ngOnInit() {
   // this.challengeAction = this.db.list('Context/' + this.childContextID + '/Action').snapshotChanges();
  }
  public showChallengeAction(event: string) {
    this.challengeAction = this.db.list('Challenge/' + event + '/Actions').snapshotChanges();
    this.challengeRef = event;
  }


  addChallengeAction() {
    this.db.list('/Challenge/' + this.challengeRef + '/Actions').push(this.newChallengeAction);
    console.log(this.challengeRef);

  }

  deleteChallengeAction() {
    this.db.list('/Challenge/' + this.challengeRef + '/Actions').remove(this.delChallengeAction);
  }



}
