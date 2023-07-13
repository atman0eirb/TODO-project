import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotloggedinService } from 'src/app/notloggedin/services/notloggedin.service';

interface ResponseData {
  access_token : string;
}

interface ResponseDataSignup {
  result: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  UserLoggedIn!: boolean;
  currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,private router:Router,private notloggedinservice : NotloggedinService) { 
    this.UserLoggedIn = this.notloggedinservice.UserLoggedIn;
  }
  login(userName: string, password: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.http
        .post<ResponseData>('http://localhost:3000/auth/signin', { email: userName, password: password }, { observe: 'response' })
        .subscribe(
          (response) => {
            localStorage.setItem('jwtToken', response.body?.access_token!);
            this.notloggedinservice.login();
            this.UserLoggedIn = true;
            this.router.navigate(['/home']);
            resolve(''); 
          },
          (error) => {
            resolve('Username or Password is incorrect');
          }
        );
    });
  }
  logout() {
    this.UserLoggedIn = false;
    this.notloggedinservice.logout();
  }

  signup(userName: string, password: string) :  Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http
        .post<ResponseDataSignup>('http://localhost:3000/auth/signup', { email: userName, password: password }, { observe: 'response' })
        .subscribe(
          (response) => {
            resolve(response.body?.result!); 
          },
          (error) => {
            reject('Something went wrong'); 
          }
        );
    });
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }


}
