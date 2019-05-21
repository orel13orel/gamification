import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-context2',
  templateUrl: './context2.component.html',
  styleUrls: ['./context2.component.css']
})
export class Context2Component implements OnInit {
  context2: Observable<any[]>;
  context2ID = '-Lbr-1NUNlyOVz4qRj2p';
  @Output() clicked = new EventEmitter<string>();
  constructor(private db: AngularFireDatabase) {
    this.context2 = db.list('Context2').snapshotChanges();
  }

  ngOnInit() {
  }

  updateContext2ID(key: any) {
    this.context2ID = key;
    console.log(this.context2ID);
    this.clicked.emit(this.context2ID);
  }
}
