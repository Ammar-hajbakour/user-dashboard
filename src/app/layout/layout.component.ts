import { Component, HostBinding, inject } from '@angular/core';
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
  hasSearch$ = this.route.data.pipe(
    tap(data => console.log(data)),
    map((data) => data['searchByIdInput'] || false)
  )

  async onActivate(outlet: any) {

    // const { snapshot } = outlet.activatedRoute
    // const { navbarClass } = snapshot.data
    console.log(outlet as RouterOutlet);

  }
}
