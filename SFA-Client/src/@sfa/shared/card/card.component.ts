import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'sfa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'sfa-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SFACard {
}

// noinspection TsLint
@Component({
  selector: 'sfa-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'sfa-card-header' },
  template: `
    <div class="sfa-card-header-heading-group">
      <ng-content select="sfa-card-header-heading"></ng-content>
      <ng-content select="sfa-card-header-subheading"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="sfa-card-header-actions"></ng-content>
  `
})
export class SFACardHeader {
}

// noinspection TsLint
@Component({
  selector: 'sfa-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'sfa-card-content' },
  template: `
    <ng-content></ng-content>`
})
export class SFACardContent {
}

// noinspection TsLint
@Directive({
  selector: 'sfa-card-header-heading',
  host: { 'class': 'sfa-card-header-heading' }
})
export class SFACardHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'sfa-card-header-subheading',
  host: { 'class': 'sfa-card-header-subheading' }
})
export class SFACardHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'sfa-card-header-actions',
  host: { 'class': 'sfa-card-header-actions' }
})
export class SFACardHeaderActions {
}

// noinspection TsLint
@Directive({
  selector: 'sfa-card-actions',
  host: {
    'class': 'sfa-card-actions',
    '[class.sfa-card-actions-align-end]': 'align === "end"',
  }
})
export class SFACardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}
