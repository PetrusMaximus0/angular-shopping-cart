import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", redirectTo: "", pathMatch: "full" },
  { path: "products", loadComponent: () => import("./products/products.component"), pathMatch: "full" },
  { path: "products/:id", loadComponent: () => import("./products/product-detail/product-detail.component"), pathMatch: "full" },
  { path: "cart", loadComponent: () => import("./cart/cart.component"), pathMatch: "full" },
  { path: "**", redirectTo: "" }
];
