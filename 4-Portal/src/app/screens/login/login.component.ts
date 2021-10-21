import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  fCEmail = new FormControl('');
  fCPassword = new FormControl('');

  login() {
    this.nav('home');
  }

  gotoRegister() {
    this.nav('register');
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
