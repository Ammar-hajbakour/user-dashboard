import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, debounce, debounceTime, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() hasSearch = false;
  ngOnInit(): void {

    this.q$.pipe(debounceTime(1000)).subscribe((q) => this.seachInput.emit(q))

  }
  @Output() seachInput = new EventEmitter<string>();



  q$ = new BehaviorSubject('');
  search(e: any) {
    this.q$.next(e.target['value'])
  }
}
