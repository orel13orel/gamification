import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

export class NewContext {
  name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
}

@Component({
  selector: 'app-context2',
  templateUrl: './context2.component.html',
  styleUrls: ['./context2.component.css']
})
export class Context2Component implements OnInit {
  context2: Observable<any[]>;
  context2ID = '-Lbr-1NUNlyOVz4qRj2p';
  public newContext: NewContext;
  public delContext: string;
  @Output() clicked = new EventEmitter<string>();

  constructor(private db: AngularFireDatabase) {
    this.context2 = db.list('Context2').snapshotChanges();
    this.newContext = new NewContext();
  }

  ngOnInit() {
  }

  updateContext2ID(key: any) {
    this.context2ID = key;
    console.log(this.context2ID);
    this.clicked.emit(this.context2ID);
  }
  addContext() {
    this.db.list('/Context2').push(this.newContext);
  }
  deleteContext(){
    this.db.list('/Context2').remove(this.delContext);
  }
}
