import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import { IProduct } from '../interfaces/IProduct';
import {catchError, map, Observable, of} from 'rxjs';
import {ILoadingState} from '../interfaces/ILoadingState';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor() {
  }
  private productsEndpointUrl = "https://fakestoreapi.com/products";

  private http = inject(HttpClient);

  public getProductById(id: string) : Signal<ILoadingState<IProduct>> {
    return toSignal(this.fetchProductById(id), {initialValue: {error: null, data: null}});
  }
  public getProducts() : Signal<ILoadingState<IProduct[]>> {
    return toSignal(this.fetchProducts(), {initialValue: {error: null, data: null}});
  }

  private fetchProductById(id: string) : Observable<ILoadingState<IProduct>> {
    return this.http
      .get<IProduct>(`${this.productsEndpointUrl}/${id}`)
      .pipe(
        map(data=> {
          return {error: null, data: data}
        }),
        catchError(this.handleError)
      )
  }

  private fetchProducts() : Observable<ILoadingState<IProduct[]>> {
    return this.http
      .get<IProduct[]>(this.productsEndpointUrl+"/?limit=20")
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
