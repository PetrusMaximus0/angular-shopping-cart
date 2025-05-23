import {Component, input} from '@angular/core';
import {AddToCartButtonComponent} from '../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import {IProduct} from '../../../shared/interfaces/IProduct';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    AddToCartButtonComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  data = input.required<IProduct>();
}
