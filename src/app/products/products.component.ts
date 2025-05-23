import {Component, inject, Signal} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {ILoadingState} from '../shared/interfaces/ILoadingState';
import {IProduct} from '../shared/interfaces/IProduct';
import {ProductCardComponent} from './ui/product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  private productsService = inject(ProductsService);
  response : Signal<ILoadingState<IProduct[]>>;
  constructor() {
    this.response = this.productsService.getProducts();
  }
}
