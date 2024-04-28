import { Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { GridListComponent } from '../components/grid-list/grid-list.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { SearchService } from '../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, HeaderComponent, GridListComponent, PaginatorComponent, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  destroyRef = inject(DestroyRef);

  constructor(private dataService: DataService, private searchService: SearchService) {
  }

  users: WritableSignal<User[]> = signal([]);
  page = signal(1);
  per_page = 6;
  total = 0;

  needPaginator = signal(false)
  async ngOnInit(): Promise<void> {
    this.searchService.searchValue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((q: string) => this.search(q))
    await this.fetch();

  }
  async fetch(): Promise<any> {
    try {
      const { total, data } = await firstValueFrom(this.dataService.getUsers(this.page()))
      this.total = total;
      this.needPaginator.set(true);
      this.setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

  }
  setUsers(data: User[]) {
    this.users.set(data.map((user: User) => ({ ...user, email: this.replaceAtSignWithEntity(user?.email) })));
  }
  replaceAtSignWithEntity(email: string) {
    return email?.replace('@', '&#64;');
  }
  async changePage(page: number) {
    this.page.set(page);
    await this.fetch()
  }

  async search(q: string) {

    if (!!q) {
      try {
        this.setUsers([await this.dataService.getUser(q)]);
        this.needPaginator.set(false);
      } catch (error: any) {
        if (error.status === 404) {
          this.setUsers([])
          this.needPaginator.set(false);
        }
      }
      return
    }
    await this.fetch();

  }
}
