import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';


export class NewRp {
  action_id: string;
  points: string;
  value: string;
}


@Component({
  selector: 'app-rp',
  templateUrl: './rp.component.html',
  styleUrls: ['./rp.component.css']
})
export class RpComponent implements OnInit {

  rp: Observable<any[]>;
  public newRp: NewRp;
  public delRp: string;

  constructor(private db: AngularFireDatabase) {
    this.rp = db.list('Rp').snapshotChanges();
    this.newRp = new NewRp();
  }

  ngOnInit() {
  }
  addRp() {
    this.db.list('/Rp').push(this.newRp);
  }
  deleteRp() {
    this.db.list('/Rp').remove(this.delRp);
  }
}
