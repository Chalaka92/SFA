import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[sfaClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public sfaClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.sfaClickOutside.emit(event);
    }
  }

}
