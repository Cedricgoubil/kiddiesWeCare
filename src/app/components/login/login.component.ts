import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('Sie sind jetzt eingeloggt', {
          cssClass: 'alert-success', timeout: 3000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show('Falsche E-Mail-Adresse und / oder falsches Passwort', {
          cssClass: 'alert-danger', timeout: 3000
        });
      });
  }
}
