import { Directive } from '@angular/core';

@Directive({
  selector: '[sfaTitle],sfa-title',
  host: {
    class: 'sfa-title'
  }
})
export class TitleDirective {

  constructor() { }

}
