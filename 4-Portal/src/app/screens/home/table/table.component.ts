import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchValue: string = '';

  readonly PATH_ALL = '/user/all';
  readonly PATH_SEARCH = '/user/search/';
  readonly PATH_DELETE = '/user/delete/';

  apiResult = Object.keys;
  users: any[] = [];
  userSelected: any;

  requestResult = '';
  isEmptySearch = false;

  page = 1;
  pageSize = 10;

  closeResult: string | undefined;

  constructor(private api: HttpClient, private modalService: NgbModal) {}

  clearSearch() {
    this.searchValue = '';
  }

  rowSelected(row: any) {
    this.userSelected = row;
  }

  async delete(): Promise<any> {
    await this.api.get(environment.API_URL + this.userSelected.id).toPromise();
  }

  async ngOnInit() {
    this.displayAllUsers();
  }

  async searchClear() {
    this.isEmptySearch = false;
  }

  async search(query: string) {
    if (query.trim() == '') return;
    this.getResult(await this.getSearch(query));
  }

  private async displayAllUsers() {
    this.getResult(await this.getUsers());
  }

  private async getSearch(term: string): Promise<any> {
    try {
      return await this.api
        .get(environment.API_URL + this.PATH_SEARCH + term)
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  private async getUsers(): Promise<any> {
    return await this.api.get(environment.API_URL + this.PATH_ALL).toPromise();
  }

  private getResult(result: any) {
    if (result.success) {
      this.users = this.toArray(result.data);
      this.isEmptySearch = false;
    } else {
      this.isEmptySearch = true;
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

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  alerts!: Alert[];

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
  // style="z-index: 999; width: 100%;"
  success = 'success';
}

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'success',
    message: 'This is an success alert',
  },
  {
    type: 'info',
    message: 'This is an info alert',
  },
  {
    type: 'warning',
    message: 'This is a warning alert',
  },
  {
    type: 'danger',
    message: 'This is a danger alert',
  },
  {
    type: 'primary',
    message: 'This is a primary alert',
  },
  {
    type: 'secondary',
    message: 'This is a secondary alert',
  },
  {
    type: 'light',
    message: 'This is a light alert',
  },
  {
    type: 'dark',
    message: 'This is a dark alert',
  },
];
