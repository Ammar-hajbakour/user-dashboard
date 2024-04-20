import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LightBoxDirective } from '../../directives/light-box.directive';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [LightBoxDirective],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() item: User = {} as User;
  @Input() pageNumber: number = 0;

  constructor(private router: Router) { }
  viewDetails(id: number) {
    this.router.navigate(['/user', this.pageNumber, id]);
  }

}
