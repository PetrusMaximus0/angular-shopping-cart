import {Component, inject, input, OnInit, signal, Signal} from '@angular/core';
import {AddToCartButtonComponent} from '../../shared/components/add-to-cart-button/add-to-cart-button.component';
import {ProductsService} from '../../shared/services/products.service';
import {ActivatedRoute} from '@angular/router';
import {IProduct} from '../../shared/interfaces/IProduct';
import {ILoadingState} from '../../shared/interfaces/ILoadingState';

@Component({
  selector: 'app-product-detail',
  imports: [
    AddToCartButtonComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export default class ProductDetailComponent{
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);

  response: Signal<ILoadingState<IProduct>>;

  constructor() {
    const productId: string = this.route.snapshot.params["id"];
    this.response = this.productService.getProductById(productId);
  }

}
