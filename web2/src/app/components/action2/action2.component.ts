import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-action2',
  templateUrl: './action2.component.html',
  styleUrls: ['./action2.component.css']
})
export class Action2Component implements OnInit {
  action2: Observable<any[]>;
  @Input() childContext2ID: string;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.action2 = this.db.list('Context2/' + this.childContext2ID + '/Action').snapshotChanges();
  }

  public showAction2(event: string) {
    this.action2 = this.db.list('Context2/' + event + '/Action').snapshotChanges();
  }

}
