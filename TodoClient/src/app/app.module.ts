import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { NavBarComponent } from './Nav-bar/nav-bar.component';
import { Error404Component } from './Error404/error404.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AboutComponent } from './About/about.component';
import { HttpClientModule } from '@angular/common/http';
import { NotloggedinComponent } from './notloggedin/notloggedin.component';

import { TODOComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    Error404Component,
    LoginComponent,
    LogoutComponent,
    AboutComponent,
    NotloggedinComponent,
    TODOComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
