import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, debounce, debounceTime, filter, map, tap } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() hasSearch = false;
  @Input() hasBackButton = false;

  private searchService = inject(SearchService)
  ngOnInit(): void {

    this.q$.subscribe((q: string) => {
      this.searchService.setSearchValue(q)
    })
  }



  q$ = new BehaviorSubject<string>('');
  search(e: any) {
    this.q$.next(e.target.value)
  }
}
