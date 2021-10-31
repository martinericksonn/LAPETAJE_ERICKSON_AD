import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchValue: string = '';
  clearSearch() {
    this.searchValue = '';
  }

  readonly PATH_ALL = '/user/all';
  readonly PATH_SEARCH = '/user/search/';

  apiResult = Object.keys;
  users: any[] = [];
  userSelected: any;

  requestResult = '';
  searchRestult = '';

  page = 1;
  pageSize = 10;

  closeResult: string | undefined;

  constructor(private api: HttpClient, private modalService: NgbModal) {}

  async ngOnInit() {
    this.displayAllUsers();
  }

  rowSelected(row: any) {
    this.userSelected = row;
  }

  async searchClear() {
    this.displayAllUsers();
  }

  async search(query: string) {
    this.getResult(await this.searchTerm(query));
  }

  private async searchTerm(term: string): Promise<any> {
    try {
      return await this.api
        .get(environment.API_URL + this.PATH_SEARCH + term)
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  private async displayAllUsers() {
    this.getResult(await this.getUsers());
  }

  private async getUsers(): Promise<any> {
    return await this.api.get(environment.API_URL + this.PATH_ALL).toPromise();
  }

  private getResult(result: any) {
    if (result.success) {
      this.users = this.toArray(result.data);
      console.log(this.users);
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

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
