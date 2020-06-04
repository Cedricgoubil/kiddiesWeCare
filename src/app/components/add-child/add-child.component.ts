import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';
import { ChildDto } from 'src/app/dto/ChildDto';
import { UserDto } from 'src/app/dto/UserDto';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {
  id: string;
  user: UserDto;

  childUser: ChildDto = {
    name: '',
    age: 0,
    gender: '',
    comment: '',
    hobby: ''
  };

  @ViewChild('childForm', { static: false }) form: any;

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

  onSubmit({ value, valid }: { value: ChildDto, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Bitte füllen Sie das Formular korrekt aus', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      this.userService.newChild(value);
      this.flashMessage.show('Neues Kind hinzugefügt', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/profile/' + this.id]);
    }
  }
}

