import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public addUser(user: any) {
    return this.httpClient.post(`${baseUrl}/auth/signup`, user);
  }

  /// Login
}
