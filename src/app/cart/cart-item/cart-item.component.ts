import {Component, input} from '@angular/core';
import {ICartItem} from '../../shared/interfaces/ICartItem';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CartService} from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})

export class CartItemComponent {
  constructor(private cartService: CartService){}

  item = input.required<ICartItem>();

  protected handleNumChange($event: Event){
    const newAmount = parseInt(($event.target as HTMLInputElement).value);
    this.cartService.setItemNumberOfUnits(this.item().id, isNaN(newAmount) ? 1 : newAmount);
  }

  protected removeItem(){
    this.cartService.removeItemFromCart(this.item().id);
  }

  protected incrementNum(){
    this.cartService.addItemToCart(this.item(), 1);
  }

  protected decrementNum(){
    this.cartService.addItemToCart(this.item(), -1);
  }
}
