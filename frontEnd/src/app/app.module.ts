import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PriceWithTaxPipe } from './pipes/cart.pipe';
import { HighlightSearchPipe } from './pipes/search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PriceWithTaxPipe,
    HighlightSearchPipe,
    AppComponent,
    ProductsComponent,
    CheckoutComponent,
    OrderDetailComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
