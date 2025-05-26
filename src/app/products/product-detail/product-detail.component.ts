import {Component, inject, input, OnInit, signal, WritableSignal} from '@angular/core';
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
export default class ProductDetailComponent implements OnInit {
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);

  response: WritableSignal<ILoadingState<IProduct>> = signal({error: null, data: null});

  ngOnInit() {
    const productId: string = this.route.snapshot.params["id"];
    this.getProduct(productId);
  }

  private getProduct(id: string){
    this.productService
      .getProductById(id)
      .subscribe({
        next: data => { this.response.set(data) },
        complete: ()=> console.log("Completed fetch"),
        error: error => console.log(error), // Should never throw
      });
  }
}
