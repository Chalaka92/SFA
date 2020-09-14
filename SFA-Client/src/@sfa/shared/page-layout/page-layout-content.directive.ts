import { Directive } from '@angular/core';

@Directive({
  selector: '[sfaPageLayoutContent],sfa-page-layout-content',
  host: {
    class: 'sfa-page-layout-content'
  }
})
export class PageLayoutContentDirective {

  constructor() { }

}
