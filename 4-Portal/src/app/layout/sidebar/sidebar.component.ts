import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoLogin() {
    this.nav('login');
  }

  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
