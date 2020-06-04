import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/dto/UserDto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: string;
  user: UserDto = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zip: 0,
    phone: '',
    email: ''
  };

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit({ value, valid }: { value: UserDto, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Bitte füllen Sie das Formular korrekt aus', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      value.id = this.id;
      this.userService.updateUser(value);
      this.flashMessage.show('Benutzer wurde aktualisiert', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/profile/' + this.id]);
    }
  }
}

