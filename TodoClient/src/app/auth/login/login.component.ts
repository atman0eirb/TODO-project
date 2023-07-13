import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  islogin: boolean = true;

  userName: string = '';
  password: string = '';
  errormessage: string = '';

  formData: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) { }

  Submitlogin(data: any) {
    this.userName = data.userName;
    this.password = data.password;
    if (this.userName && this.password) {
      if (this.authService.isValidEmail(this.userName)) {
        this.authService.login(this.userName, this.password).then((result) => this.errormessage = result );
      }
      else {
        this.errormessage = "mail format is not valid";
      }
    }
    else {
      this.errormessage = "Please fill the form";
    }
  }

  Submitsignup(data: any) {

    this.userName = data.userName;
    this.password = data.password;
    if (this.userName && this.password) {
      if (this.authService.isValidEmail(this.userName)) {
        this.authService.signup(this.userName, this.password).then((result) => this.errormessage = result);
      }
      else {
        this.errormessage = "mail format is not valid";
      }
    }
    else {
      this.errormessage = "Please fill the form";
    }
  }

  getsignup() {
    this.islogin = false;
    this.errormessage = '';

  }
  getsignin() {
    this.islogin = true;
    this.errormessage = '';
  }
}