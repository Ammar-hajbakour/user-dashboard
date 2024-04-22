import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValueSubject = new BehaviorSubject<string>('');

  searchValue$ = this.searchValueSubject.pipe(debounceTime(500));

  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
  }

}


