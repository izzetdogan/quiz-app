import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  //SnackMessage
  private snackOpen = (value: string) => {
    this.snack.open(`${value} is required`, '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  };

  //Form
  formSubmit() {
    if (this.user.email == '' || this.user.email == null) {
      this.snackOpen('Email');
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snackOpen('Password');
      return;
    }
    if (this.user.firstname == '' || this.user.firstname == null) {
      this.snackOpen('Firstname');
      return;
    }
    if (this.user.lastname == '' || this.user.lastname == null) {
      this.snackOpen('Lastname');
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.snack.open('success');
      },
      error: (e) => {
        console.log(e);
        if (e.error.message) {
          this.snackOpen(e.error.message);
        } else {
          this.snackOpen('something went wrong');
        }
      },
      complete: () => console.info('completed'),
    });
  }
}
