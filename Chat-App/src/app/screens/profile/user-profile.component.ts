import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CRUDReturn } from 'src/app/shared/crud_return.interface';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  id: string | undefined;
  user!: User;
  imagePath: string | undefined;
  editProfile: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
  });
  fileName: any;
  message: string | undefined;
  url: string | ArrayBuffer | null | undefined;

  constructor(
    _auth: AuthService,
    _activatedRoute: ActivatedRoute,
    private api: ApiService,
    private authServ: AuthService,
    private storage: AngularFireStorage
  ) {
    _activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  async uploadFile(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };

    // this.fileName = await event.target.files[0];

    // const reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //     this.url = reader.result;
    // }

    // this.imagePath = `/images/${this.user.id}${Math.random()}`;
    // const task = await this.storage.upload(this.imagePath, file);
    console.log(this.fileName[0]);
    // console.log(task);
  }

  async getUserData() {
    var result: any = await this.api.get(`/user/${this.id}`);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = output.data;
    }
  }
  ngOnInit(): void {
    this.getUserData();
  }

  resetPass() {
    this.authServ.resetPassword(this.user.email);
    console.log('password sent check your email');
  }

  somefunc() {
    this.authServ.printme();
  }
}
