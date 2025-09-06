import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sort: string = 'price_asc';
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  private searchSubject = new Subject<string>();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(() => this.loadProducts())
    ).subscribe();

    this.loadProducts().subscribe();
  }

  onSearchChange(): void {
    this.page = 1;
    this.searchSubject.next(this.searchTerm);
  }

  filterProducts(): void {
    this.page = 1;
    this.loadProducts().subscribe();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts().subscribe();
  }

  loadProducts() {
    const filters = {
      search: this.searchTerm || undefined,
      category: this.selectedCategory || undefined,
      minPrice: this.minPrice != null ? this.minPrice : undefined,
      maxPrice: this.maxPrice != null ? this.maxPrice : undefined,
      sort: this.sort,
      page: this.page,
      limit: this.limit
    };
    return this.productService.getProducts(filters).pipe(
      switchMap(response => {
        this.products = response.products;
        this.totalItems = response.total;
        return [];
      })
    );
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`Added "${product.name}" to cart.`);
  }
}
