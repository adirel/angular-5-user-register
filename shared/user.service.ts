import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Output } from '@angular/core/src/metadata/directives';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {
  selectedUser: User;
  usersList: User[];

  constructor(private http: Http) {

  }
  getSelectedUser() {
    return this.selectedUser;
  }
  postUser(usr: User) {
    console.log(usr);
    const body = JSON.stringify(usr);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:59660/api/users', body, requestOptions).map(x => x.json());
  }
  putUser(id, usr: User) {
    console.log(usr);
    const body = JSON.stringify(usr);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:59660/api/users/' + id, body, requestOptions).map(x => x.json());
  }
  getUsersList() {
    this.http.get('http://localhost:59660/api/users')
      .map((data: Response) => {
        return data.json() as User[];
      }).toPromise().then(x => {
        this.usersList = x;
      });
  }
  deleteUser(usr: User) {
    return this.http.delete('http://localhost:59660/api/users/' + usr.ID).map(x => x.json());
  }

}
