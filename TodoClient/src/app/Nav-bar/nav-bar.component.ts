import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { NotloggedinService } from '../notloggedin/services/notloggedin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private authservice:AuthService,private router :Router){}

  logout() : void {
    this.authservice.logout();
    this.router.navigate(['']);
  }

  toggleSidebar() {

    const sidebar = document.querySelector('.msb');
    sidebar?.classList.contains('sidebar-show') ? 
    ( sidebar?.classList.remove('sidebar-show'), sidebar?.classList.add('sidebar-hidden')) : 
    ( sidebar?.classList.remove('sidebar-hidden'), sidebar?.classList.add('sidebar-show') );


    const Home = document.querySelector('.Homecontainer');
    Home?.classList.contains('showSide') ? Home?.classList.remove('showSide') : Home?.classList.add('showSide') ;
    
  }
}
