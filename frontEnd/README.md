# Frontend – E-Commerce App (Angular)

This is the **Angular frontend** of the E-Commerce application. It connects to the backend API to display products, manage the cart, handle checkout, and show orders.

Built with **Angular**, **RxJS**, and Angular Router.

---

##  Features

- `/products` page:
  - List products with search, category filter, and price range
  - Pagination and sorting
  - Uses `ProductCardComponent` to display each product
  - Custom Pipes: `priceWithTax`, `highlightSearch`
  - Emits `addToCart` event to parent component

- `/checkout` page:
  - Shows cart contents and allows quantity updates
  - Input for `discountCode` (e.g., `SAVE5`)
  - Submit order to backend API

- `/orders/:id` page:
  - Displays order details with product names, quantities, and total

- `CartService`:
  - Uses `BehaviorSubject` to manage cart state across components

- Route Guard:
  - Prevents access to `/checkout` if the cart is empty

---

##  Tech Stack

- Angular 15+ (or whichever version you use)
- RxJS for state management
- Angular Router for navigation
- Bootstrap or custom CSS for styling (optional)

---


