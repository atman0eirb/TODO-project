import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent  {

  constructor(private authService : AuthService, private router: Router) {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
