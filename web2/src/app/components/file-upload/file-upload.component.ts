import { Component, OnInit } from '@angular/core';
import { AngularFireStorage , AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  photoURL: string;


  constructor(private storage: AngularFireStorage ) {}

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
  }

}
