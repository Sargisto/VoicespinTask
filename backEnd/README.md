# 🛠️ Backend –  API

This is the backend service for the  web application, built using **Node.js** and **Express.js**. It provides RESTful APIs for managing products, placing orders, and viewing sales statistics.

---

##  Features

###  Product APIs
- `POST /api/products` – Add a new product (with validation)
- `GET /api/products` – List products with:
  - Search by name
  - Filter by category
  - Price range (`min`, `max`)
  - Sort (`sortBy`, `order`)
  - Pagination (`page`, `limit`)

###  Order APIs
- `POST /api/orders` – Place an order
  - Validates stock
  - Applies `SAVE5` discount (optional)
  - Updates stock
- `GET /api/orders/:id` – Get order with product names

###  Stats API
- `GET /api/stats/sales?from=YYYY-MM-DD&to=YYYY-MM-DD`  
  Returns:
  - Daily total sales
  - Top-selling category

---


##  Required Packages & Why They're Needed

This project uses several NPM packages to support routing, validation, database connection, and development utilities.

| Package         | Type          | Why It's Needed |
|-----------------|---------------|------------------|
| **express**      | Required      | Core web framework to build RESTful APIs |
| **mongoose**     | Required      | MongoDB ODM for defining schemas and querying data |
| **dotenv**       | Required      | Loads environment variables from `.env` file (e.g., DB connection string) |
| **cors**         | Required      | Enables Cross-Origin Resource Sharing so frontend (Angular) can access the API |
| **morgan**       | Optional (Dev) | Logs HTTP requests to the console for easier debugging |
| **nodemon**      | Dev Only      | Automatically restarts the server on code changes (used in development only) |
| **body-parser**  | Optional      | Parses incoming JSON request bodies (built-in in Express ≥ v4.16) |
| **joi** or **express-validator** | Optional | Used to validate incoming request data (e.g., product fields, order input) |

## For running seed
 npm run seed
