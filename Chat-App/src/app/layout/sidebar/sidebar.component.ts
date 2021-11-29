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
  id: string | undefined;
  isExpanded = false;
  showFiller = false;
  public user?: User | null;
  uid!: string;

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
    console.log('innn' + this.uid);
    console.log('innn' + this.uid);
    console.log('innn' + this.uid);
    console.log('innn' + this.uid);
  }

  logouts() {
    console.log('logout');
    this.afAuth.signOut().then(() => {
      this.user = null;
    });
    this.nav('login');
  }
}
