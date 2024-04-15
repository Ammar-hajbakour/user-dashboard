import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersCache = new Map<number, Observable<any>>();

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number): Observable<any> {

    const cachedUser$ = this.usersCache.get(pageNumber);

    if (cachedUser$) {
      return cachedUser$;
    }

    const user$: Observable<any> = this.http.get('https://reqres.in/api/users?page=' + pageNumber)
      .pipe(
        tap(users => this.usersCache.set(pageNumber, user$)),
        shareReplay(1)
      );

    return user$;
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

}


