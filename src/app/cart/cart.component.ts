import {Component, computed, signal} from '@angular/core';
import {CartService} from '../shared/services/cart/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export default class CartComponent {
  constructor(private cartService: CartService) {
  }

  protected orderPlaced =  signal<boolean>(false);
  protected totalPrice = computed(()=>this.cartService.getTotalPrice())
  protected cartItems = computed(() => this.cartService.getCartItems()())

  private handleOrderSubmit(){
    alert("Not implemented handleOrderSubmit")
  }
}
