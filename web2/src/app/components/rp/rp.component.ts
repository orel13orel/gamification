import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-rp',
  templateUrl: './rp.component.html',
  styleUrls: ['./rp.component.css']
})
export class RpComponent implements OnInit {

  rp: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.rp = db.list('Rp').snapshotChanges();
  }

  ngOnInit() {
  }

}
