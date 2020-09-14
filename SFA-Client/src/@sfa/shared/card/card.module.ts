import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SFACard,
  SFACardActions,
  SFACardContent,
  SFACardHeader,
  SFACardHeaderActions,
  SFACardHeaderSubTitle,
  SFACardHeaderTitle
} from './card.component';

const cardComponents = [
  SFACard,
  SFACardHeader,
  SFACardHeaderTitle,
  SFACardHeaderSubTitle,
  SFACardHeaderActions,
  SFACardContent,
  SFACardActions
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...cardComponents
  ],
  exports: [
    ...cardComponents
  ]
})
export class SFACardModule {
}
