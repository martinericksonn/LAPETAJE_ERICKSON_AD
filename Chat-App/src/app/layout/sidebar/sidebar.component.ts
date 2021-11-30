import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user?: User | null;
  id: string | undefined;
  isExpanded = false;
  showFiller = false;
  uid!: string;
  active: number = 2;

  constructor(
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  getUID() {}
  nav(destination: any) {
    this.router.navigate([destination]);
  }

  ngOnInit() {
    this.uid = AuthService.uid;
  }

  logouts() {
    console.log('logout');
    this.afAuth.signOut().then(() => {
      this.user = null;
    });
    this.nav('login');
  }

  setActive(active: number) {
    console.log('setActive ' + active);
    this.active = active;
  }

  getActive(): number {
    console.log('getActive ' + this.active);
    return this.active;
  }
}
