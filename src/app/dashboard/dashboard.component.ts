import { Component, WritableSignal, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { GridListComponent } from '../components/grid-list/grid-list.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { ReplaySubject, Subject, combineLatest, debounceTime, firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, HeaderComponent, GridListComponent, PaginatorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private dataService: DataService) {
  }



  users: WritableSignal<User[]> = signal([]);
  page: WritableSignal<any> = signal(1);
  per_page = signal(0);
  total = signal(0);

  paginator = signal(false);

  query = signal('');
  ngOnInit() {
    this.fetchUsers()
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
    if (q === '' || +q > this.total() || +q < 1) {
      this.fetchUsers();
      return
    }
    this.query.set(q);
    const data = [await firstValueFrom(this.dataService.getUser(+q))] as any[];
    this.users.set([data[0].data]);
    this.paginator.set(false)
  }
}
