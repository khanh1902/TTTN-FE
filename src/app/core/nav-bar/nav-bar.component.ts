import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  fullName: string | null;
  constructor(
    private snackBar : MatSnackBar,
    public authService: AuthService) {
    this.fullName = this.authService.getFullName();
  }

  onLogout() {
    this.authService.logout();
    this.showSnackbar("Logout Success")
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
