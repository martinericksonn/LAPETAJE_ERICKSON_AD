import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly API_PATH = '/user/all';

  apiResult = Object.keys;
  data: any;
  requestResult = '';

  constructor(private router: Router, private api: HttpClient) {}

  async ngOnInit() {
    this.displayAllUsers();
  }

  gotoLogin() {
    this.nav('login');
  }

  private async displayAllUsers() {
    var result: any = await this.displayAll();
    this.displayResult(result);
  }

  private async displayAll(): Promise<any> {
    return await this.api.get(environment.API_URL + this.API_PATH).toPromise();
  }

  private displayResult(result: any) {
    if (result.success) {
      this.nav('home');
      this.data = result.data;
    } else {
      this.requestResult = result.data;
    }
  }

  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
