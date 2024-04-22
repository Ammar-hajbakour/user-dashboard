import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersCache = new Map<number, Observable<any>>();

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number): Observable<any> {
    if (!this.usersCache.get(pageNumber)) this.usersCache.set(pageNumber, this.http.get<any>('https://reqres.in/api/users?page=' + pageNumber));
    return this.usersCache.get(pageNumber)!;
  }

  getUser(id: string): Promise<User> {
    const user = firstValueFrom(this.http.get<User>(`https://reqres.in/api/users/${id}`).pipe(
      map(((res: any) => res.data as User))
    ));

    return user.catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

}


