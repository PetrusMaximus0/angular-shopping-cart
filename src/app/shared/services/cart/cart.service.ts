import {Injectable, signal } from '@angular/core';
import {ICartItem} from '../../interfaces/ICartItem';
import clamp from '../../utils/clamp';
import {IProduct} from '../../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private _cartItems = signal<ICartItem[]>([]);

  public getCartItems() {
    return this._cartItems.asReadonly();
  }

  private addItem(item :ICartItem) {
    console.log(item);
    const newValues = [...this._cartItems()]
    const indexOfItem = newValues.findIndex(cartItem=>cartItem.id === item.id);
    if(indexOfItem > -1) {
      newValues[indexOfItem].numberOfUnits = clamp(newValues[indexOfItem].numberOfUnits + item.numberOfUnits,1,10);
    }else{
      newValues.push(item);
    }
    return newValues;
  }

  public addItemToCart(item: IProduct, amount: number) {
    this._cartItems.update(()=>this.addItem({...item, numberOfUnits: amount}))
  }

  // Remove Item
  public removeItemFromCart(id: string) {}

  // Change Item number of units
  public setItemNumberOfUnits(id: string, amount: number) {
    const newValues = [...this._cartItems()]
    const indexOfItem = newValues.findIndex(cartItem=>cartItem.id === id);
    if(indexOfItem > -1) {
      newValues[indexOfItem].numberOfUnits = clamp(amount, 1, 10);
    }
  }

  // Get cart price total
  public getTotalPrice() {
    return 0;
  }

  // Get cart total number of unique items
  public getTotalNumberOfItems() {
    return 1;
  }
}
