import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';


export class NewContext {
  name: string;
}

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  context: Observable<any[]>;
  contextID = '-Lbr-1NUNlyOVz4qRj2p';
  @Output() clicked = new EventEmitter<string>();
  public newContext: NewContext;
  public delContext: string;
  constructor(private db: AngularFireDatabase) {
    this.context = db.list('Context').snapshotChanges();
    this.newContext = new NewContext();
  }

  ngOnInit() {
  }

  updateContextID(key: any) {
    this.contextID = key;
    console.log(this.contextID);
    this.clicked.emit(this.contextID);
  }
  addContext() {
    this.db.list('/Context').push(this.newContext);
  }
  deleteContext() {
    this.db.list('/Context').remove(this.delContext);
  }
}

