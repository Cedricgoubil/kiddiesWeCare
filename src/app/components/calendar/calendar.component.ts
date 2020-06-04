import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/dto/UserDto';
import { UserService } from 'src/app/services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataBase: AngularFireDatabase,
    private authService: AuthService,
    private userService: UserService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // console.log(file.name);
    const metaData = { contentType: file.type };
    const storageRef: firebase.storage.Reference = firebase.app('kiddieswecare').storage().ref('/photos/featured/url1');
    storageRef.put(file, metaData);
    console.log(file.name);
  }

}
