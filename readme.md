# Master E-commerce Backend

## Description

This project is a backend service for an e-commerce application built with Node.js, Express, and MongoDB. It provides various endpoints to manage products and orders.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Order Endpoints](#order-endpoints)
- [Development](#development)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shahadathossain4536/master-e-commerce-backend.git
   cd master-e-commerce-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   MONGODB_URI=<Your MongoDB URI>
   ```

   ```plaintext
   PORT=<Your Port>
   ```

4. Build the project:

   ```bash
   npm run build
   ```

## Usage

To start the server in production mode:

```bash
npm start
```

To start the server in development mode:

```bash
npm run start:dev
```

## API Endpoints

### Product Endpoints

- **Create a new product**

  ```http
  POST /api/products
  ```

  Request Body:

  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```

- **Get all products**

  ```http
  GET /api/products
  ```

- **Get a single product by ID**

  ```http
  GET /api/products/:productId
  ```

- **Update a product by ID**

  ```http
  PUT /api/products/:productId
  ```

- **Delete a product by ID**

  ```http
  DELETE /api/products/:productId
  ```

### Order Endpoints

- **Create a new order**

  ```http
  POST /api/orders
  ```

  Request Body:

  ```json
  {
    "email": "level2@programming-hero.com",
    "productId": "5fd67e890b60c903cd8544a3",
    "price": 999,
    "quantity": 1
  }
  ```

- **Get all orders**

  ```http
  GET /api/orders
  ```

- **Get orders by user email**

  ```http
  GET /api/orders?email=level2@programming-hero.com
  ```

## Development

To lint the code:

```bash
npm run lint
```

To fix linting errors:

```bash
npm run lint:fix
```

To format the code with Prettier:

```bash
npm run prettier
```

To fix formatting errors with Prettier:

```bash
npm run prettier:fix
```

## License

This project is licensed under the ISC License.

---
