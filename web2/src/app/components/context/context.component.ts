import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  context: Observable<any[]>;
  contextID = '-Lbr-1NUNlyOVz4qRj2p';
  @Output() clicked = new EventEmitter<string>();
  constructor(private db: AngularFireDatabase) {
    this.context = db.list('Context').snapshotChanges();
  }

  ngOnInit() {
  }

  updateContextID(key: any) {
    this.contextID = key;
    console.log(this.contextID);
    this.clicked.emit(this.contextID);
  }
}

