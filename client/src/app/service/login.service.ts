import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  showUser = null;

  public getCurrentUser() {
    return this.httpClient.get(`${baseUrl}/auth/me`);
  }
  public generateToken(user: any) {
    return this.httpClient.post(`${baseUrl}/auth/signin`, user);
  }

  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  private logoutReq(token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.delete(`${baseUrl}/auth/logout`);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    const setUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    localStorage.setItem('user', JSON.stringify(setUser));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      this.showUser = JSON.parse(userStr).email;
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.role;
  }
  public getEmail() {
    let user = this.getUser();
    return user.email;
  }
}
