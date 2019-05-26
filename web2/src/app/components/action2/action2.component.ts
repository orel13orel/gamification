import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

export class NewAction {
  name: string;
}

@Component({
  selector: 'app-action2',
  templateUrl: './action2.component.html',
  styleUrls: ['./action2.component.css']
})
export class Action2Component implements OnInit {
  action2: Observable<any[]>;
  public newAction: NewAction;
  public delAction: string;
  context2ref: string;
  constructor(private db: AngularFireDatabase) {
   this.newAction = new NewAction();
  }

  ngOnInit() {
  }

  public showAction2(event: string) {
    this.action2 = this.db.list('Context2/' + event + '/Action').snapshotChanges();
    this.context2ref = event;
    console.log( this.context2ref);
  }

  addAction() {
    this.db.list('/Context2/' + this.context2ref + '/Action').push(this.newAction);
    console.log(this.context2ref);

  }

  deleteAction() {
    this.db.list('/Context2/' + this.context2ref + '/Action').remove(this.delAction);
  }

}
