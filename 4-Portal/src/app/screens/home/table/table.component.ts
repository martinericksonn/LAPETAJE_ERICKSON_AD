import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchValue: string = '';

  @ViewChild('close', { static: true })
  close: ElementRef | undefined;

  readonly PATH_ALL = '/user/all';
  readonly PATH_SEARCH = '/user/search/';
  readonly PATH_DELETE = '/user/delete/';
  readonly PATH_REGISTER = '/user/register';

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

  openSuc = false;

  openSuccessModal(content: any) {
    if (this.openSuc) {
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

  async createAccount(suc: any, modal: any) {
    if (!this.isFormValid()) return;
    if (!this.isPasswordEqual()) return;

    var result: any = await this.registerUser();
    this.createAccountResult(result, suc, modal);
  }

  closeModal(modal: any) {
    modal.click();
  }
  private createAccountResult(result: any, suc?: any, modal?: any) {
    if (result.success) {
      this.openSuc = true;
      this.openSuccessModal(suc);
      console.log('suc');
      this.closeModal(modal);
      this.clearFields();
    } else {
      console.log('fuc');
      this.openSuc = false;
      this.requestResult = result.data;
    }
  }

  private clearFields() {
    this.registerForm.controls.fcName.reset();
    this.registerForm.controls.fcAge.reset();
    this.registerForm.controls.fcEmail.reset();
    this.registerForm.controls.fcPassword.reset();
    this.registerForm.controls.fcPassword2.reset();
    this.registerForm.controls.fcPassword2.reset();
    this.requestResult = '';
  }
  private async registerUser(): Promise<any> {
    return await this.api
      .post(environment.API_URL + this.PATH_REGISTER, {
        name: this.registerForm.value.fcName,
        email: this.registerForm.value.fcEmail,
        age: this.registerForm.value.fcAge,
        password: this.registerForm.value.fcPassword,
      })
      .toPromise();
  }

  private async editUser(): Promise<any> {
    return await this.api
      .patch(environment.API_URL + this.PATH_REGISTER, {
        name: this.registerForm.value.fcName,
        email: this.registerForm.value.fcEmail,
        age: this.registerForm.value.fcAge,
        password: this.registerForm.value.fcPassword,
      })
      .toPromise();
  }

  private isPasswordEqual(): boolean {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.requestResult = 'Password doesnt match!';
      return false;
    }

    this.requestResult = '';
    return true;
  }

  private isFormValid(): boolean {
    if (!this.registerForm.valid) {
      this.requestResult = 'invalid or missing credentials';
      return false;
    }
    return true;
  }
}
