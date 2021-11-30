import { Component, OnInit } from '@angular/core';
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

  editProfile: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
  });

  constructor(
    _auth: AuthService,
    _activatedRoute: ActivatedRoute,
    private api: ApiService,
    private authServ: AuthService
  ) {
    _activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
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
