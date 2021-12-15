import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogComponent } from 'src/app/layout/diaglog/diaglog.component';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  requestResult: any = '';
  constructor(
    public authServ: AuthService,
    public dialog: MatDialog,
    private api: ApiService
  ) {}

  fcEmail = new FormControl('', [Validators.email]);
  ngOnInit(): void {}
  openDialogResetPass() {
    this.dialog.open(DiaglogComponent);
  }

  async resetPass() {
    var request: any = await this.api.get('/user/search/' + this.fcEmail.value);
    if (!request.success) {
      this.requestResult = 'This email does not exist. Try creating an account';
      return;
    }

    this.dialog.open(DiaglogComponent);
    this.requestResult = '';
  }
}
