import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';

@Component({
  selector: 'sfa-order-item-batch',
  templateUrl: './order-item-batch.component.html',
  styleUrls: ['./order-item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderItemBatchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
