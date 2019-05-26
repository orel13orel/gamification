import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

export class NewAction {
  name: string;
}

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  action: Observable<any[]>;
  public newAction: NewAction;
  public delAction: string;
  contextRef: string;
  // @Input() childContextID: string;
  constructor( private db: AngularFireDatabase) {
    this.newAction = new NewAction();
    // console.log(this.childContextID);
   // this.action = db.list('Context/' + this.childContextID + '/Action').snapshotChanges();
    // this.action = db.list('Context/-Lbr-1NUNlyOVz4qRj2p/Action').snapshotChanges();
  }

  ngOnInit() {
   // this.action = this.db.list('Context/' + this.childContextID + '/Action').snapshotChanges();
  }
   public showAction(event: string) {
    this.action = this.db.list('Context/' + event + '/Action').snapshotChanges();
    this.contextRef = event;
    console.log( this.contextRef);
   }

  addAction() {
    this.db.list('/Context/' + this.contextRef + '/Action').push(this.newAction);
    console.log(this.contextRef);

  }

  deleteAction() {
    this.db.list('/Context/' + this.contextRef + '/Action').remove(this.delAction);
  }


}
