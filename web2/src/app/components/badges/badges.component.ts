import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

export class NewBadge {
  name: string;
  context_id: string;
  photoUrl: string;
}

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  badge: Observable<any[]>;
  delBadge: string;
  newBadge: NewBadge;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  photoURL: string;


  constructor(private db: AngularFireDatabase , private storage: AngularFireStorage) {
    this.badge = db.list('Badges').snapshotChanges();
    this.newBadge = new NewBadge();
  }

  ngOnInit() {
  }
  addBadge() {
    this.db.list('/Badges').push(this.newBadge);
  }
  deleteBadge() {
    this.db.list('/Badges').remove(this.delBadge);
  }

  // file upload


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }
    const path = `badge/${new Date().getTime()}_${file.name}`;

    const customMetadata = {app: 'My AngularFire-powered PWA!'};

    this.task = this.storage.upload(path, file, { customMetadata } );

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() ))
      .subscribe();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes ;
  }
  printDownloadURL(url: any) {
    console.log(url);
    this.photoURL = url;
    this.newBadge.photoUrl = url;
  }


}
