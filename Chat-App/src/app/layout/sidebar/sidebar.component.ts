import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CRUDReturn } from 'src/app/shared/crud_return.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user: any;

  constructor(
    private router: Router,
    private api: ApiService,
    public authServ: AuthService
  ) {}

  id: string | undefined;
  isExpanded = false;
  showFiller = false;
  uid!: string;
  active: number = 1;

  getUID() {}
  nav(destination: any) {
    this.router.navigate([destination]);
  }

  async getUserData() {
    try {
      var result: any = await this.api.get(`/user/${this.id}`);
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output?.success === true) {
        this.user = output.data;
      }
      console.log('user');
      console.log(this.user.id);
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnInit() {
    // await this.getUserData();
  }

  logouts() {
    console.log('logout');
    // this.afAuth.signOut().then(() => {
    //   this.user = null;
    // });
    this.nav('login');
  }

  setActive(active: number) {
    this.active = active;
  }

  getActive(): number {
    return this.active;
  }
}
