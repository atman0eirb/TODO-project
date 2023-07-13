import { Component } from '@angular/core';
import { NotloggedinService } from '../notloggedin/services/notloggedin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  isUserLoggedIn : boolean = false;

  constructor(private notloggedinservice : NotloggedinService){
    this.isUserLoggedIn = this.notloggedinservice.UserLoggedIn;
  }

}
