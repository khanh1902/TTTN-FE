import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { LoginRequest } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const loginData = this.loginForm.value;
    
    const loginRequest = new LoginRequest(loginData.username, loginData.password);
    console.log(loginRequest);
    this.authService.login(loginRequest).subscribe(
      (response) => {
        localStorage.setItem('token', response.data.token);
        this.authService.getCurrentUser(response.data.token).subscribe(
          (result) => {
            localStorage.setItem('role', result.data.roles[0].roleName);
            localStorage.setItem('fullName', result.data.fullName);
          }
        )
        this.router.navigate(['/dashboard']);
        this.showSnackbar(response.message);
      },
      (error) => {
        // console.error('Error updating Scores', error);

        this.showSnackbar(error.error.message);
      }
    )
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1500,
      verticalPosition: 'bottom',
    });
  }
}
