import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CRUDReturn } from 'src/app/shared/crud_return.interface';
import { User } from 'src/app/shared/user.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DiaglogComponent } from 'src/app/layout/diaglog/diaglog.component';
import { DialogProfileComponent } from 'src/app/layout/dialog-profile/dialog-profile.component';
import { DialogUpdateComponent } from 'src/app/layout/dialog-update/dialog-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  id: string | undefined;
  imagePath: string | undefined;
  fileName: any;
  message: string | undefined;
  url: Observable<string | null>;
  requestResult: string | undefined;
  isEmailVerifiedMsg: string | undefined;
  editProfile: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
  });

  public isEmailVerified: boolean = true;
  uploadPercent: any;
  constructor(
    _auth: AuthService,
    _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public authServ: AuthService,
    private api: ApiService,

    private storage: AngularFireStorage
  ) {
    _activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    var ref = this.storage.ref(`images/${this.id}/profile`);
    this.url = ref.getDownloadURL();

    // this.authServ.isEmailVerified().then((result) => {
    //   this.isEmailVerified = result;
    //   this.isEmailVerifiedMsg = result
    //     ? undefined
    //     : 'Please check your email to verify your Tabi account';
    //   console.log('bool ' + result);
    // });
  }

  openDialogResetPass() {
    this.dialog.open(DiaglogComponent);
  }

  async uploadFile(event: any) {
    const files = event.target.files;

    this.imagePath = `/images/${this.authServ.user?.id}/profile`;
    const task = await this.storage.upload(this.imagePath, files[0]);

    const ref = this.storage.ref(`images/${this.authServ.user?.id}/profile`);
    this.url = ref.getDownloadURL();

    this.dialog.open(DialogProfileComponent);
  }

  private async clearFields() {
    this.editProfile.controls['fcName'].reset();
    this.editProfile.controls['fcAge'].reset();
  }

  updateUser() {
    console.log('updateUser');
    var attributes = this.formToJson();

    if (attributes == null) return;
    this.editUser(attributes);
  }

  private async editUser(attributes: any): Promise<any> {
    console.log('editUser');
    var result: any = await this.api.patch(`/user/${this.id}`, attributes);

    if (result.success) {
      this.requestResult = '';
      this.dialog.open(DialogUpdateComponent);
      this.clearFields();
    } else {
      this.requestResult = result.data;
    }
  }

  async ngOnInit() {
    // await this.getUserData();
    console.log(this.isEmailVerified);
  }

  resetPass() {
    // this.authServ.resetPassword(this.user.email);
    console.log('password sent check your email');
  }

  private formToJson(): any {
    var attributes = new Map<string, any>();

    if (this.editProfile.value.fcName && this.editProfile.value.fcName.trim())
      attributes.set('name', this.editProfile.value.fcName.trim());

    if (this.editProfile.value.fcAge)
      attributes.set('age', this.editProfile.value.fcAge);

    if (attributes.size <= 0) {
      return null;
    }

    return this.mapToObject(attributes);
  }

  private mapToObject(map: any) {
    const out = Object.create(null);
    map.forEach((value: any, key: string | number) => {
      if (value instanceof Map) {
        out[key] = this.mapToObject(value);
      } else {
        out[key] = value;
      }
    });
    return out;
  }
}
