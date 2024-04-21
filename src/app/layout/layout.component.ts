import { Component, HostBinding, inject, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute, Event, EventType, RouterModule, RouterOutlet } from '@angular/router';
import { tap, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @HostBinding('class') panelClass = 'h-screen flex flex-col'

  private readonly route = inject(ActivatedRoute)
  hasSearch = signal(false)
  sQuery = signal('')
  search(e: any) {
    this.sQuery.set(e)
  }

  async onActivate(outlet: any) {
    const { snapshot } = outlet.activatedRoute
    const { hasSearchInput } = snapshot.data
    this.hasSearch.set(hasSearchInput === true)
  }
}
