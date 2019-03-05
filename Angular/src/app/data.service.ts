import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Issue } from './models/issue';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  private readonly API_URL = 'http://localhost:3000/routes/';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  toasterService: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  // addIssue (issue: Issue): void {
  //   this.dialogData = issue;
  // }

  // updateIssue (issue: Issue): void {
  //   this.dialogData = issue;
  // }

  // deleteIssue (id: number): void {
  //   console.log(id);
  // }


  //  REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:


  // ADD, POST METHOD
  addItem(kanbanItem: any): void {
    console.log(kanbanItem);
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      // this.toasterService.showToaster('Successfully added', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }
  // UPDATE, PUT METHOD

  updateItem(kanbanItem: any): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully edited', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }

  // DELETE METHOD

  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
      this.toasterService.showToaster('Successfully deleted', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }



  // tslint:disable-next-line:member-ordering
  issue: any;
  Dataload(issue) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get('http://localhost:3000/routes/issue', { headers: headers });
  }
  // tslint:disable-next-line:member-ordering
  category: any;
  loadData(category) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get('http://localhost:3000/routes/get', { headers: headers })
      .map(res => res);
  }
  // tslint:disable-next-line:member-ordering
  assigne: any;
  load(assigne) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get('http://localhost:3000/routes/assigne', { headers: headers })
      .map(res => res);
  }
  // tslint:disable-next-line:member-ordering
  reporte: any;
  Rload(reporte) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get('http://localhost:3000/routes/reporte', { headers: headers })
      .map(res => res);
  }
  register(body: any) {
    return this.httpClient.post('http://localhost:3000/routes/signup', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  login(body: any) {
    return this.httpClient.post('http://localhost:3000/routes/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    }).pipe(map(response => {
      console.log(response);
      let isAuthenticated: boolean = (<any>response).status === '1';
      if (isAuthenticated) {
        localStorage.setItem('username', body.username);
      }
      return isAuthenticated;
    }));
  }
}
