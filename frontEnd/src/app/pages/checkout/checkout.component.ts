import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})


export class CheckoutComponent {
  cartItems: CartItem[] = [];
  discountCode: string = '';
  isPlacingOrder = false;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);
  }

  get total(): number {
    let total = this.subtotal;
    if (this.discountCode === 'SAVE5') total *= 0.95;
    return total;
  }

  updateQty(productId: string, qty: number) {
    this.cartService.updateQty(productId, qty);
  }

  removeItem(productId: string) {
    const updated = this.cartItems.filter(i => i.product._id !== productId);
    this.cartService.setCart(updated);
  }

  placeOrder() {
    this.isPlacingOrder = true;
    this.errorMessage = '';

    const items = this.cartItems.map(item => ({
      productId: item.product._id,
      qty: item.qty
    }));

    const payload = {
      items,
      discountCode: this.discountCode || undefined
    };

    this.orderService.placeOrder(payload).subscribe({
      next: (order) => {
        this.cartService.clear();
        this.router.navigate(['/orders', order._id]);
      },
      error: (err) => {
        this.errorMessage = err?.error || 'Failed to place order.';
        this.isPlacingOrder = false;
      }
    });
  }
}

