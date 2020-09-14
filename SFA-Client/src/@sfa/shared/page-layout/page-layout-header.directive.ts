import { Directive } from '@angular/core';

@Directive({
  selector: '[sfaPageLayoutHeader],sfa-page-layout-header',
  host: {
    class: 'sfa-page-layout-header'
  }
})
export class PageLayoutHeaderDirective {

  constructor() { }

}

