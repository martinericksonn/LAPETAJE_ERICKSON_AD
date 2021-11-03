import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoLogin() {
    this.nav('login');
  }

  gotoStats() {
    this.nav('statistics');
  }
  gotoDatabase() {
    this.nav('database');
  }
  gotoSettings() {
    this.nav('settings');
  }
  gotoHome() {
    this.nav('home');
  }
  gotoDashboard() {
    this.nav('dashboard');
  }
  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
