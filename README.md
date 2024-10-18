# E-Commerce Comic Book Store REST API

## Overview

The E-Commerce Comic Book Store REST API is designed to empower store owners with the tools needed to efficiently manage and display comic books as inventory items. This API enables seamless CRUD (Create, Read, Update, Delete) functionality, allowing for comprehensive control over comic book listings and facilitating an intuitive experience for both managers and customers.

## Features

- **Create**: Add new comic books to the inventory.
- **Read**: Retrieve details of comic books and listings.
- **Update**: Modify existing comic book information.
- **Delete**: Remove comic books from the inventory.

## Getting Started

### Prerequisites

- Node.js installed
- Express.js framework
- MongoDB or any other database of choice

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/comic-book-store-api.git
2. Navigate to the project directory:
   ```bash
   cd comic-book-store-api
3. Install dependencies:
   ```bash
   npm install
4. Start the server:
   ```bash
   npm run dev


   ## API Endpoints

- **POST /comics**: Create a new comic book entry.
    /api/v1/comics/create

    {
    "bookName": "Captain Marvel",
    "authorName": "Kelly Sue DeConnick",
    "yearOfPublication": 2016,
    "price": 17.99,
    "numberOfPages": 120,
    "condition": "used",
    "quantity": 6
    }
  
- **GET /comics**: Retrieve a list of all comic books.
    /api/v1/comics/get-all

- **GET /comics**: Retrieve a list of all comic books.
    /api/v1/comics/get?id=670ee177f55f789f3390f6f0

- **GET /comics/**: Retrieve comic books with filter and sort options.
    /api/v1/comics/get?page=1&limit=10&yearOfPublication=2003&price_min=10&price_max=50&sort_by=price&sort_order=asc

- **PUT /comics/:id**: Update a comic book entry by ID.
    /api/v1/comics/update?id=670ee07987c0d11989dcd18d
  
    {
    "bookName": "The Amazing Spider-Man",
    "authorName": "Stan Lee (the Legend)",
    "yearOfPublication": 1963,
    "price": 19.99,
    "discount": 5,
    "numberOfPages": 32,
    "condition": "new",
    "quantity": 10,
    "description": ""
    }
    

- **DELETE /comics/:id**: Delete a comic book entry by ID.
    /api/v1/comics/delete?id=670ee19ef55f789f3390f6f9
