import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [ListItemComponent ],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.scss'
})
export class GridListComponent {
  @Input() items!: User[];
  constructor() { }

}
