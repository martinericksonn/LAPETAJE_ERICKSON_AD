import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { CRUDReturn } from 'src/app/shared/crud_return.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  id: string | undefined;
  data: any;

  constructor(_activatedRoute: ActivatedRoute, private api: ApiService) {
    _activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  async getUserData() {
    var result: any = await this.api.get(`/user/${this.id}`);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.data = output.data;
    }
  }
  ngOnInit(): void {
    this.getUserData();
  }
}
