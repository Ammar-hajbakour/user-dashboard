import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements AfterViewInit {

  canGoNext = false
  canGoPrev = false


  @Output() pageChange = new EventEmitter<number>()

  private _page = new BehaviorSubject(1);
  @Input()
  public get page(): number {
      return this._page.value;
  }
  public set page(v: number) {
      if (v === this._page.value) return
      this._page.next(v);
  }



  private _total = new BehaviorSubject(0);
  @Input()
  public get total(): number | null {
      return this._total.value;
  }
  public set total(v: number|null) {
      if (v === this._total.value) return
      this._total.next(v ?? 0)
  }

  private _pageSize = new BehaviorSubject(0);
  @Input()
  public get pageSize(): number {
      return this._pageSize.value;
  }
  public set pageSize(v: number) {
      if (v === this._pageSize.value) return
      this._pageSize.next(v)
  }



  private _noOfPagesInView = new BehaviorSubject(5);
  @Input()
  public get noOfPagesInView(): number {
      return this._noOfPagesInView.value;
  }
  public set noOfPagesInView(v: number) {
      if (v === this._noOfPagesInView.value) return
      this._noOfPagesInView.next(v)
  }


  pagesBtns!: number[]

  inputsChange$ = combineLatest([this._page, this._total, this._pageSize, this._noOfPagesInView])
  //write a function that render the paginator


  constructor(private readonly cdRef: ChangeDetectorRef) { }



  ngAfterViewInit(): void {
      this.inputsChange$.pipe(debounceTime(150)).subscribe({
          next: ([p, t, _ps, n]) => {
              console.log(p, t, _ps, n);

              const total = isNaN(t) ? 0 : t
              const ps = isNaN(this.pageSize) ? 1 : this.pageSize
              if (total <= ps) return

              const totalPages = Math.ceil(total / ps)


              let nopiv = Math.min((isNaN(n) || n === 0) ? 5 : n, totalPages)
              this.pagesBtns ??= [p]
              const idx = this.pagesBtns.findIndex((p) => p == p)
              let start = 0
              if (idx === -1) start = 0
              else if (idx === 0) start = Math.max(0, this.page - nopiv - 1)
              else if (idx === nopiv - 1) start = this.page - 1
              else start = this.pagesBtns[0] - 1
              nopiv = totalPages - start > nopiv ? nopiv : totalPages - start
              this.pagesBtns = new Array(nopiv).fill(0).map((p, i) => i + start + 1)

              this.canGoPrev = this.pagesBtns[0] > 1
              this.canGoNext = this.pagesBtns[this.pagesBtns.length - 1] < totalPages

              this.cdRef.markForCheck()
          }
      })
  }


  changePage(p: number) {
      this.page = p
      this.pageChange.emit(p)
  }

}
