import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[sfaPageLayout],sfa-page-layout',
  host: {
    class: 'sfa-page-layout'
  }
})
export class PageLayoutDirective {

  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() { }

  @HostBinding('class.sfa-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.sfa-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }

}
