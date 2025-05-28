import {IProduct} from './IProduct';

export interface ICartItem extends IProduct {
  numberOfUnits: number;
}
