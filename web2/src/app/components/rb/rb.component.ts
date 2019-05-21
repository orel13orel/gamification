import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-rb',
  templateUrl: './rb.component.html',
  styleUrls: ['./rb.component.css']
})
export class RbComponent implements OnInit {
  rb: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.rb = db.list('Rb').snapshotChanges();
  }

  ngOnInit() {
  }

}
