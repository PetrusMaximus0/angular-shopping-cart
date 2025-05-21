import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import { IProduct } from '../shared/interfaces/IProduct';
import {catchError, map, Observable, of} from 'rxjs';
import {ILoadingState} from '../shared/interfaces/ILoadingState';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor() {
  }
  private productsEndpointUrl = "https://fakestoreapi.com/products/?limit=20";

  private http = inject(HttpClient);

  public getProducts() : Signal<ILoadingState<IProduct[]>> {
    return toSignal(this.fetchProducts(), {initialValue: {error: null, data: null}});
  }

  private fetchProducts() : Observable<ILoadingState<IProduct[]>> {
    return this.http
      .get<IProduct[]>(this.productsEndpointUrl)
      .pipe(
        map(this.mapThese),
        catchError(this.handleError),
      );
  }

  private mapThese (data : IProduct[]) : ILoadingState<IProduct[]> {
    return { error: null, data: [...data]}
  }

  private handleError(error: HttpErrorResponse) : Observable<ILoadingState<IProduct[]>> {
    return of({ error: new Error(error.message || "Unexpected Error"), data: null})
  }
}
