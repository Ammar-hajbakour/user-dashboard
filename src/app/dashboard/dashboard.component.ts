import { Component, WritableSignal, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { GridListComponent } from '../components/grid-list/grid-list.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { ReplaySubject, Subject, combineLatest, debounceTime, firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, HeaderComponent, GridListComponent, PaginatorComponent, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private dataService: DataService, private searchService: SearchService) {
  }



  users: WritableSignal<User[]> = signal([]);
  page: WritableSignal<any> = signal(1);
  per_page = signal(0);
  total = signal(0);

  paginator = signal(false);

  query = signal('');
  ngOnInit() {
    this.searchService.searchValue$.subscribe((q: string) => {
      this.search(q)
    })
  }
  fetchUsers() {
    this.dataService.getUsers(this.page()).subscribe(((data: any) => {
      this.users.set(data.data.map((user: User) => ({ ...user, email: this.replaceAtSignWithEntity(user.email) })));
      this.page.set(data.page);
      this.per_page.set(data.per_page);
      this.total.set(data.total);
      this.paginator.set(true)
    })
    )
  }
  replaceAtSignWithEntity(email: string) {
    return email.replace('@', '&#64;');
  }
  changePage(page: number) {
    this.page.set(page);
    this.fetchUsers()
  }

  async search(q: string) {
    if (q === '') {
      this.fetchUsers();
      return
    }
    this.users.set([await this.dataService.getUser(q)]);
    this.paginator.set(false)
  }
}
