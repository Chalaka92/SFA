import { Directive } from '@angular/core';

@Directive({
  selector: '[sfaPage],sfa-page',
  host: {
    class: 'sfa-page'
  }
})
export class PageDirective {

  constructor() { }

}
