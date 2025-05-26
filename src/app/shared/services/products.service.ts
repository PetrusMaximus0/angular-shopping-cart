import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IProduct } from '../interfaces/IProduct';
import {catchError, map, Observable, of} from 'rxjs';
import {ILoadingState} from '../interfaces/ILoadingState';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private productsEndpointUrl = "https://fakestoreapi.com/products";
  private http = inject(HttpClient);

  public getProductById(id: string) {
    return this.fetchProductById(id);
    //return toSignal(this.fetchProductById(id), {initialValue: {error: null, data: null}});
  }

  public getProducts() {
    return this.fetchProducts();
    //return toSignal(this.fetchProducts(), {initialValue: {error: null, data: null}});
  }

  private fetchProductById(id: string) : Observable<ILoadingState<IProduct>> {
    return this.http
      .get<IProduct>(`${this.productsEndpointUrl}/${id}`)
      .pipe(
        map(data=> {
          if(data===null){
            return {error: new Error('No product with id ' + id), data: null};
          }
          return {error: null, data: data}
        }),
        catchError(this.handleError)
      )
  }

  private fetchProducts() : Observable<ILoadingState<IProduct[]>> {
    return this.http
      .get<IProduct[]>(this.productsEndpointUrl+"/?limit=100")
      .pipe(
        map((data)=>{
          return { error: null, data: [...data]}
        }),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) : Observable<ILoadingState<any>> {
    return of({ error: new Error(error.message || "Unexpected Error"), data: null})
  }
}
