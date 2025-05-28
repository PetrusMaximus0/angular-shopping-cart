import {Component, input} from '@angular/core';
import {ICartItem} from '../../shared/interfaces/ICartItem';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormSubmittedEvent} from '@angular/forms';
import {CartService} from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  constructor(private cartService: CartService){

  }

  item = input.required<ICartItem>();

  protected handleNumChange($event: Event){
    const newAmount = $event.target;
    console.log($event);
    this.cartService.setItemNumberOfUnits(this.item().id, 1);
  }

  protected removeItem(){
    this.cartService.removeItemFromCart(this.item().id);
  }

  protected incrementNum(){
    this.cartService.
  }
}
