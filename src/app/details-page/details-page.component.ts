import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe, Location, NgIf } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  userId!: number
  user = signal<User | null>(null)

  private async getUser(id: string) {
    try {
      const user = await this.dataService.getUser(id)
      this.user.set(user)
    } catch (error: any) {
      console.error(error)
      if (error.status === 404) {
        this.router.navigate(['/404'])
      }
    }

  }
  ngOnInit() {


    this.route.params.subscribe(({ id }) => {
      this.userId = +id
      this.getUser(id)
    })
  }

  back() {
    this.router.navigate(['/dashboard'])
  }
  previous() {
    if (this.userId < 2) return
    this.router.navigate(['/user', this.userId - 1])
  }

  next() {

    this.router.navigate(['/user', this.userId + 1])
  }

}
