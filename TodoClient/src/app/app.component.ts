import { Component } from '@angular/core';
import { NotloggedinService } from './notloggedin/services/notloggedin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isUserLoggedIn : boolean = false;

  constructor(private notloggedinservice : NotloggedinService){

    this.isUserLoggedIn = this.notloggedinservice.UserLoggedIn;
    
  }
}
