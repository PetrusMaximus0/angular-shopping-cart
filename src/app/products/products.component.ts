import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductsService} from '../shared/services/products/products.service';
import {ProductCardComponent} from './product-card/product-card.component';
import {ILoadingState} from '../shared/interfaces/ILoadingState';
import {IProduct} from '../shared/interfaces/IProduct';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);

  response = signal<ILoadingState<IProduct[]>>({error:null, data:null});

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(){
    this.productsService
      .getProducts()
      .subscribe({
        next: data => { this.response.set(data) },
      })
  }
}

