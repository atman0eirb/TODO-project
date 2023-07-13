import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotloggedinService } from './services/notloggedin.service';

@Component({
  selector: 'app-notloggedin',
  templateUrl: './notloggedin.component.html',
  styleUrls: ['./notloggedin.component.scss']
})
export class NotloggedinComponent {

  constructor(private router:Router,private notloginservice: NotloggedinService){}

  gologin(){
    this.router.navigate(['']);
  }
  
  islogin(){
    return this.notloginservice.islogin();
  }
}
