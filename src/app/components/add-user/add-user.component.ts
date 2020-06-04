import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/dto/UserDto';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  id: string;

  user: UserDto = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zip: 0,
    phone: '',
    email: '',
  };

  @ViewChild('userForm', { static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe(user => this.user = user);
  }

  onSubmit({ value, valid }: { value: UserDto, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Bitte füllen Sie das Formular korrekt aus', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      this.userService.newUser(value);
      this.flashMessage.show('neuer Benutzer hinzugefügt', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/']);
    }
  }
}

