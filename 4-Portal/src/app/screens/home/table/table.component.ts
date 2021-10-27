import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  readonly API_PATH = '/user/all';

  apiResult = Object.keys;
  users: any[] = [];
  requestResult = '';
  page = 1;
  pageSize = 5;

  constructor(private api: HttpClient) {}

  async ngOnInit() {
    this.displayAllUsers();
  }

  private async displayAllUsers() {
    var users: any = await this.getUsers();
    this.getResult(users);
  }

  private async getUsers(): Promise<any> {
    return await this.api.get(environment.API_URL + this.API_PATH).toPromise();
  }

  private getResult(result: any) {
    if (result.success) {
      this.users = this.toArray(result.data);
    } else {
      this.requestResult = result.data;
    }
  }

  private toArray(result: any): any[] {
    var list = [];
    for (var items in result) {
      list.push(result[items]);
    }

    return list;
  }
}
