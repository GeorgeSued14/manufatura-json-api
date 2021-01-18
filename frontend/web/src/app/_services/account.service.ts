import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  index() {
    return this.http.get(`${environment.apiUrl}/user/home`);
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/user/${id}`, params).pipe(
      map((element) => {
        if (id == this.userValue.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          this.userSubject.next(user);
        }
        return element;
      })
    );
  }

  changePassword(id: number, params: any) {
    return this.http
      .patch(`${environment.apiUrl}/user/change-password/`, params)
      .pipe(
        map((element) => {
          if (id == this.userValue.id) {
            const user = { ...this.userValue, ...params };
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return element;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`).pipe(
      map((element) => {
        if (id == this.userValue.id) {
          this.logout();
        }
        return element;
      })
    );
  }
}
