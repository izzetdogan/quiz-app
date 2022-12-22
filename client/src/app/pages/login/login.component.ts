import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  loginData = {
    email: '',
    password: '',
  };

  //SnackMessage
  private snackOpen = (value: string) => {
    this.snack.open(`${value} is required`, '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  };

  formSubmit() {
    if (this.loginData.email.trim() == '' || this.loginData.email == null) {
      this.snackOpen('Email');
      return;
    }
    if (this.loginData.password == '' || this.loginData.password == null) {
      this.snackOpen('Password');
      return;
    }

    this.userService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.snackOpen('success');

        //setLocal
        const a = this.userService.loginUser(data.access_token);
        this.userService.getCurrentUser().subscribe({
          next: (user: any) => {
            this.userService.setUser(user);
            console.log(user);

            //redirect admin

            if (this.userService.getUserRole() == 'ADMIN') {
              this.router.navigate(['admin']);
            } else if (this.userService.getUserRole() == 'NORMAL') {
              this.router.navigate(['user-dashboard/0']);
            } else {
              this.userService.logout();

              location.reload();
            }
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      error: (e) => {
        console.log(e);
        if (e.error.message) {
          this.snackOpen('invalid detail');
        } else {
          this.snack.open('something went wrong');
        }
      },
      complete: () => console.info('completed'),
    });
  }
}
