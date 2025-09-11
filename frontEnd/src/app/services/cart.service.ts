import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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

  addToCart(product: Product): void {
    const cart = this.cartSubject.getValue();
    const itemIndex = cart.findIndex((i) => i.product._id === product._id);

    if (itemIndex > -1) {
      cart[itemIndex].qty += 1;
    } else {
      cart.push({ product, qty: 1 });
    }

    this.cartSubject.next(cart);
    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject
      .getValue()
      .filter((i) => i.product._id !== productId);
    this.cartSubject.next(cart);
    this.saveCartToStorage();
  }

  setCart(items: CartItem[]): void {
    this.cartSubject.next(items);
  }

  clear(): void {
    this.cartSubject.next([]);
  }

  updateQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cart = this.cartSubject.getValue();
    const itemIndex = cart.findIndex((i) => i.product._id === productId);

    if (itemIndex > -1) {
      cart[itemIndex].qty = qty;
      this.cartSubject.next(cart);
      this.saveCartToStorage();
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToStorage();
  }

  getTotal(): number {
    return this.cartSubject
      .getValue()
      .reduce((acc, item) => acc + item.product.price * item.qty, 0);
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.getValue();
  }
}
