import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/UserDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  users: UserDto[];
  // user: UserDto;


  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        // this.loggedInUser = auth.uid;
        this.userService.getUsers().subscribe(users => this.users = users.filter(x => x.email !== auth.email));
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
