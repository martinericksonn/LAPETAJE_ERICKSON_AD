import { Component, OnInit } from '@angular/core';
import { DiaglogComponent } from 'src/app/layout/diaglog/diaglog.component';
import { ApiService } from 'src/app/shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  requestResult: any = 'testdfd';
  fcEmail = new FormControl('', [Validators.email]);

  constructor(
    public authServ: AuthService,
    public dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {}
  async checkEmail() {
    var request: any = await this.api.get('/user/search/' + this.fcEmail.value);
    if (!request.success) {
      this.requestResult =
        'This email does not exist. Invite your friends to Tabi!';
      return;
    }

    this.dialog.open(DiaglogComponent);
    this.requestResult = '';
  }
}
