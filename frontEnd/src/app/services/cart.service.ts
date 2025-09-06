import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject holds the current cart state
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartSubject.getValue()));
  }

  // Add product or increase qty if already in cart
  addToCart(product: Product): void {
    const cart = this.cartSubject.getValue();
    const itemIndex = cart.findIndex(i => i.product._id === product._id);

    if (itemIndex > -1) {
      // Increase qty
      cart[itemIndex].qty += 1;
    } else {
      cart.push({ product, qty: 1 });
    }

    this.cartSubject.next(cart);
    this.saveCartToStorage();
  }

  // Remove product completely from cart
  removeFromCart(productId: string): void {
    const cart = this.cartSubject.getValue().filter(i => i.product._id !== productId);
    this.cartSubject.next(cart);
    this.saveCartToStorage();
  }

  // Update quantity of a product in the cart
  updateQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cart = this.cartSubject.getValue();
    const itemIndex = cart.findIndex(i => i.product._id === productId);

    if (itemIndex > -1) {
      cart[itemIndex].qty = qty;
      this.cartSubject.next(cart);
      this.saveCartToStorage();
    }
  }

  // Clear all items from cart
  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToStorage();
  }

  // Calculate total price (without discount)
  getTotal(): number {
    return this.cartSubject.getValue()
      .reduce((acc, item) => acc + item.product.price * item.qty, 0);
  }

  // Get current cart value (snapshot)
  getCartItems(): CartItem[] {
    return this.cartSubject.getValue();
  }

  
}
