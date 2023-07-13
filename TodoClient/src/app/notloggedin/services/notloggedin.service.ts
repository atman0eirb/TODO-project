import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotloggedinService {

  UserLoggedIn : boolean = false;

  constructor() {
    this.UserLoggedIn = localStorage.getItem('UserLoggedIn') === 'true';
   }

  islogin() : boolean{
    
    return this.UserLoggedIn;
  }

  login(){
    this.UserLoggedIn = true;
    localStorage.setItem('UserLoggedIn', 'true');
    
  }

  logout(){
    this.UserLoggedIn = false;
    localStorage.setItem('UserLoggedIn', 'false');
    
  }
}
