import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CartGuard } from './guards/cart.guard';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CartGuard] },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
