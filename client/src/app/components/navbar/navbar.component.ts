import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  user: any = 'null';
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.loginUser;
  }
  public logout() {
    this.login.logout();
    window.location.reload();
  }
  public isLoggedIn(): boolean {
    return this.login.isLoggedIn();
  }

  public getUser() {
    return this.login.showUser;
  }
}
