import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  faCoffee = faCoffee;
  constructor(
    private dialogRef: MatDialogRef<SignInComponent>,
    public authService: AuthService

  ) { }

  async Login(userName: string, password: string) {

    await this.authService.Login(userName, password);

    if (this.authService.isLoggedIn) {
      this.dialogRef.close();
    }

  }

  ngOnInit() { }
}
