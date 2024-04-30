import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'authorization': `Bearer Token`
    })
  }
  private usersCache = new Map<number, Observable<any>>();

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number): Observable<any> {
    // if (!this.usersCache.get(pageNumber)) this.usersCache.set(pageNumber, this.http.get<any>(`${environment.apiUrl}/users?page=${pageNumber}`));
    // return this.usersCache.get(pageNumber)!;

    return this.http.get<any>(`${environment.apiUrl}/users?page=${pageNumber}`);
  }

  getUser(id: string): Promise<User> {
    const user = firstValueFrom(this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      map(((res: any) => res.data as User))
    ));

    return user.catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

}


