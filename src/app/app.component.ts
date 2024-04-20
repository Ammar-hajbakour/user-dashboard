import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-dashboard';

  async onActivate(outlet: any) {

    const { snapshot } = outlet.activatedRoute
    const { navbarClass } = snapshot.data
    console.log(outlet as RouterOutlet);

  }
}
