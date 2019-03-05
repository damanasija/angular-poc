import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  issue: any;
  Dataload(issue) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/routes/issue', { headers: headers })
      .map(res => res);
  }

  // tslint:disable-next-line:member-ordering
  category: any;
  loadData(category) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/routes/get', { headers })
      .map(res => res);
  }

  // tslint:disable-next-line:member-ordering
  assigne: any;
  load(assigne) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/routes/assigne', { headers })
      .map(res => res);
  }

  // tslint:disable-next-line:member-ordering
  reporte: any;
  Rload(reporte) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/routes/reporte', { headers })
      .map(res => res);
  }

  register(body: any) {
    return this.http.post('http://localhost:3000/routes/signup', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  login(body: any) {
    return this.http.post('http://localhost:3000/routes/login', body, {
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

  ticket(body: any) {
    return this.http.post('http://localhost:3000/routes/Ticket', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
}
