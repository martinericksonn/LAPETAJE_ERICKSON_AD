import { Component, OnInit } from '@angular/core';
import { nav } from 'src/app/app.api-request';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  gotoLogin() {
    nav('login');
  }
}
