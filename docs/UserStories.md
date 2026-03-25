# User Stories - Product API & Authentication

This document contains detailed user stories that can be used by an agent to implement features.

---

## Epic: PRODUCT API

### User Story 1: Active Listing

**Title:** View Active Product Listings

**Description:**
As a customer,
I want to see all active products available for purchase,
So that I can browse and find items I want to buy.

**Acceptance Criteria:**
- [ ] API endpoint `GET /api/product/` returns all active products
- [ ] Only products with `status: "active"` are returned
- [ ] Each product includes: id, name, description, price, image, category
- [ ] Response is returned in JSON format
- [ ] Proper error handling returns 500 status on server error

**Technical Notes:**
- Use MongoDB/Mongoose for product storage
- Add `status` field to Product schema with enum ["active", "inactive"]
- Implement in Express.js controller
- Return empty array if no products exist

**Dependencies:**
- Product Schema must exist in backend

---

### User Story 2: Featured Items

**Title:** Display Featured Products

**Description:**
As a customer,
I want to see featured/special products highlighted on the homepage,
So that I can quickly discover special offers and popular items.

**Acceptance Criteria:**
- [ ] API endpoint `GET /api/product/featured` returns featured products
- [ ] Products marked as `featured: true` are returned
- [ ] Maximum of 5-10 featured products returned
- [ ] Response includes same product fields as active listing

**Technical Notes:**
- Add `featured` boolean field to Product schema
- Create separate endpoint or filter parameter
- Consider adding `featuredAt` timestamp for sorting

**Dependencies:**
- Product Schema with featured field
- Active listing endpoint must work first

---

## Epic: AUTHENTICATION

### User Story 3: Authentication Layer

**Title:** User Authentication System

**Description:**
As a user,
I want to be able to register and login to the application,
So that I can access personalized features and my account.

**Acceptance Criteria:**
- [ ] API endpoint `POST /api/auth/register` creates new user account
- [ ] API endpoint `POST /api/auth/login` validates credentials and returns token
- [ ] API endpoint `POST /api/auth/logout` invalidates user session
- [ ] Passwords are hashed using bcrypt before storage
- [ ] JWT token returned on successful login
- [ ] User schema stores: name, email, password (hashed)
- [ ] Duplicate email registration returns 400 error

**Technical Notes:**
- Use bcryptjs for password hashing
- Use jsonwebtoken for JWT generation
- Token stored in Authorization header: `Bearer <token>`
- User schema fields: name (string), email (string, unique), password (string)

**Dependencies:**
- MongoDB/Mongoose for user storage
- JWT_SECRET_KEY in environment variables

---

## Implementation Order

1. **Authentication Layer** - Foundation for user management
2. **Active Listing** - Core product display
3. **Featured Items** - Enhanced product discovery

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/product/ | Get all active products |
| GET | /api/product/featured | Get featured products |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |

---

## Database Schemas Required

### User Schema
```
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- createdAt: Date
```

### Product Schema
```
- name: String (required)
- description: String
- price: Number (required)
- image: String
- category: String
- status: String (enum: "active", "inactive", default: "active")
- featured: Boolean (default: false)
- featuredAt: Date
- createdAt: Date
```
