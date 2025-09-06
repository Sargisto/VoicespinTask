import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CartService } from "../services/cart.service";

@Injectable({ providedIn: 'root' })
export class CartGuard implements CanActivate {
  constructor(private cartSvc: CartService, private router: Router) {}
  canActivate(): boolean {
    const cart = this.cartSvc.getCartItems();
    if (cart.length) return true;
    this.router.navigate(['/products']);
    return false;
  }
}
