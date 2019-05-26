import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {NewContext} from '../context/context.component';

export class NewRb {
  badge_id: string;
  context: string;
  valueOfPoints: string;
}

@Component({
  selector: 'app-rb',
  templateUrl: './rb.component.html',
  styleUrls: ['./rb.component.css']
})
export class RbComponent implements OnInit {
  rb: Observable<any[]>;
  public newRb: NewRb;
  public delRb: string;

  constructor(private db: AngularFireDatabase) {
    this.rb = db.list('Rb').snapshotChanges();
    this.newRb = new NewRb();
  }

  ngOnInit() {
  }
  addRb() {
    this.db.list('/Rb').push(this.newRb);
  }
  deleteRb() {
    this.db.list('/Context').remove(this.delRb);
  }
}
