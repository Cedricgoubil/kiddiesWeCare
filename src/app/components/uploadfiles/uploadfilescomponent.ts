import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
// import * firebase from 'firebase';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadFilesComponent implements OnInit {
  id: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private firebase: AngularFireDatabase) { }

  ngOnInit() {

  }

  uploadFile(event: any) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.storage.ref('/files/images/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    this.uploadProgress = this.task.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    // observe upload progress
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(finalize(() => this.downloadURL = this.ref.getDownloadURL())).subscribe();
    this.task.then((downloadURL: firebase.storage.UploadTaskSnapshot) => {
      console.log('File available at', downloadURL);
      // this.firebase.database().ref('/files/images').set(downloadURL);
    });
  }
}
