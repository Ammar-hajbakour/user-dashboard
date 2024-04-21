import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { LightBoxDirective } from '../../directives/light-box.directive';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [LightBoxDirective, RouterModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() item: User = {} as User;
}
