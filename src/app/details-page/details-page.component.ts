import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgIf, AsyncPipe,JsonPipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent {

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  $user = this.route.paramMap.pipe(
    switchMap((params) => this.dataService.getUser(+params.get('id')!)),
    map((user:any)=> user.data as User)
  );

  back(){
    window.history.back();
  }

}
