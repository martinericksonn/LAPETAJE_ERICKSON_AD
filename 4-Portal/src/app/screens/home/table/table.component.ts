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

  openSuccuessModal = false;
  openSuccessModal(content: any) {
    if (this.openSuccuessModal) {
      this.openVerticallyCentered(content);
    }
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
}
