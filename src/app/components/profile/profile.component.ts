import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/dto/UserDto';
import { ChildDto } from 'src/app/dto/ChildDto';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  user: UserDto;
  childUsers: ChildDto[];

  gender: boolean;
  loggedInUser: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.loggedInUser = auth.email;
    });
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe(user => {
      this.user = user;
    });
    this.userService.getChilds(this.id).subscribe(childUsers => this.childUsers = childUsers);
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
