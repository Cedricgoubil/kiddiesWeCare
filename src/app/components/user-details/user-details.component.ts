import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/dto/UserDto';
import { ChildDto } from 'src/app/dto/ChildDto';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  // Get UserID
  id: string;
  // Get ChildId for delete
  user: UserDto;
  // Get Childs for dashboard
  childUsers: ChildDto[];

  gender: boolean;
  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe(user => {
      this.user = user;
    });

    this.userService.getChilds(this.id).subscribe(childUsers => this.childUsers = childUsers);

    // this.authService.getAuth().subscribe(auth => {
    //   if (auth) {
    //     this.isLoggedIn = true;
    //     this.loggedInUser = auth.email;
    //   }
    // });
  }

  onDeleteUser() {
    if (confirm('Möchten Sie Ihr Konto wirklich löschen?')) {
      this.userService.deleteUser(this.user);
      this.flashMessage.show('Ihr Konto wurde gelöscht', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
      // this.authService.deleteAuthentication(); NEED TO CREATE THAT FUNCTION
      this.authService.logOut();
      this.router.navigate(['/login']);
    }
  }
}
