import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[lightBox]',
  standalone: true
})
export class LightBoxDirective implements OnChanges {
  @Input('lightBox') highLightColor = 'lightgrey';

  constructor(private elRef: ElementRef) {
  }

  ngOnChanges() {
    this.elRef.nativeElement.style.border = `2px solid ${this.highLightColor}`;
  }
}
