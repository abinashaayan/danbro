# API Requirements - Danbro Bakery Project

## Base URL
```
http://localhost:7979/api
```

---

## 1. Authentication APIs

### 1.1 User Login
- **Endpoint:** `POST /auth/login`
- **Description:** User login with email/username/mobile and password
- **Request Body:**
  ```json
  {
    "username": "string (email/username/mobile)",
    "password": "string",
    "recaptchaToken": "string",
    "agreeTerms": "boolean",
    "newsletter": "boolean"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "user": {
      "id": "number",
      "name": "string",
      "email": "string",
      "phone": "string"
    }
  }
  ```

### 1.2 User Registration
- **Endpoint:** `POST /auth/register`
- **Description:** New user registration
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string",
    "mobile": "string",
    "password": "string",
    "confirmPassword": "string",
    "recaptchaToken": "string",
    "agreeTerms": "boolean",
    "newsletter": "boolean"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "user": {
      "id": "number",
      "name": "string",
      "email": "string"
    }
  }
  ```

### 1.3 Google OAuth Login
- **Endpoint:** `POST /auth/google`
- **Description:** Login/Register with Google account
- **Request Body:**
  ```json
  {
    "googleToken": "string"
  }
  ```

### 1.4 Logout
- **Endpoint:** `POST /auth/logout`
- **Description:** User logout
- **Headers:** `Authorization: Bearer {token}`

---

## 2. Product APIs

### 2.1 Get All Products
- **Endpoint:** `GET /products`
- **Description:** Get list of all products with pagination
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 20)
  - `category`: string (optional)
  - `search`: string (optional)
  - `sort`: string (optional: "price_asc", "price_desc", "name_asc", "name_desc")
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "price": "number",
        "weight": "string",
        "image": "string",
        "category": "string",
        "stock": "number",
        "rating": "number",
        "reviewsCount": "number"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
  ```

### 2.2 Get Product by ID
- **Endpoint:** `GET /products/:id`
- **Description:** Get single product details
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "number",
      "name": "string",
      "description": "string",
      "price": "number",
      "weight": "string",
      "images": ["string"],
      "category": "string",
      "stock": "number",
      "rating": "number",
      "reviewsCount": "number",
      "nutritionFacts": {
        "calories": "string",
        "fat": "string",
        "carbohydrates": "string",
        "protein": "string",
        "sugar": "string"
      },
      "ingredients": "string",
      "allergenInfo": "string",
      "storageInstructions": "string"
    }
  }
  ```

### 2.3 Get Product Categories
- **Endpoint:** `GET /products/categories`
- **Description:** Get all product categories
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "name": "string",
        "slug": "string",
        "image": "string",
        "productCount": "number"
      }
    ]
  }
  ```

### 2.4 Search Products
- **Endpoint:** `GET /products/search`
- **Description:** Search products by query
- **Query Parameters:**
  - `q`: string (required)
  - `category`: string (optional)
- **Response:** Same as Get All Products

---

## 3. Cart APIs

### 3.1 Get Cart
- **Endpoint:** `GET /cart`
- **Description:** Get user's cart items
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": "number",
          "productId": "number",
          "name": "string",
          "price": "number",
          "quantity": "number",
          "weight": "string",
          "image": "string"
        }
      ],
      "subtotal": "number",
      "shipping": "number",
      "total": "number"
    }
  }
  ```

### 3.2 Add to Cart
- **Endpoint:** `POST /cart/add`
- **Description:** Add product to cart
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "productId": "number",
    "quantity": "number",
    "weight": "string"
  }
  ```

### 3.3 Update Cart Item
- **Endpoint:** `PUT /cart/update/:itemId`
- **Description:** Update cart item quantity
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "quantity": "number"
  }
  ```

### 3.4 Remove from Cart
- **Endpoint:** `DELETE /cart/remove/:itemId`
- **Description:** Remove item from cart
- **Headers:** `Authorization: Bearer {token}`

### 3.5 Clear Cart
- **Endpoint:** `DELETE /cart/clear`
- **Description:** Clear all items from cart
- **Headers:** `Authorization: Bearer {token}`

---

## 4. Order APIs

### 4.1 Place Order
- **Endpoint:** `POST /orders`
- **Description:** Create new order
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "items": [
      {
        "productId": "number",
        "quantity": "number",
        "price": "number",
        "weight": "string"
      }
    ],
    "shippingAddress": {
      "name": "string",
      "phone": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "pincode": "string"
    },
    "paymentMethod": "string",
    "couponCode": "string (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "orderId": "string",
      "orderNumber": "string",
      "total": "number",
      "status": "string",
      "estimatedDelivery": "datetime"
    }
  }
  ```

### 4.2 Get Order History
- **Endpoint:** `GET /orders`
- **Description:** Get user's order history
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "orderNumber": "string",
        "date": "datetime",
        "items": "number",
        "total": "number",
        "status": "string"
      }
    ],
    "pagination": {}
  }
  ```

### 4.3 Get Order Details
- **Endpoint:** `GET /orders/:orderId`
- **Description:** Get detailed order information
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "orderNumber": "string",
      "date": "datetime",
      "items": [],
      "total": "number",
      "status": "string",
      "tracking": {
        "steps": [
          {
            "label": "string",
            "description": "string",
            "completed": "boolean",
            "timestamp": "datetime"
          }
        ],
        "currentStep": "number",
        "estimatedDelivery": "datetime"
      },
      "shippingAddress": {}
    }
  }
  ```

### 4.4 Track Order
- **Endpoint:** `GET /orders/:orderId/track`
- **Description:** Track order status
- **Headers:** `Authorization: Bearer {token}` (optional - can track by order number)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "orderNumber": "string",
      "status": "string",
      "steps": [],
      "currentStep": "number",
      "estimatedDelivery": "datetime",
      "shippingAddress": "string"
    }
  }
  ```

### 4.5 Cancel Order
- **Endpoint:** `POST /orders/:orderId/cancel`
- **Description:** Cancel an order
- **Headers:** `Authorization: Bearer {token}`

---

## 5. User Profile APIs

### 5.1 Get User Profile
- **Endpoint:** `GET /user/profile`
- **Description:** Get user profile information
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "number",
      "name": "string",
      "email": "string",
      "phone": "string",
      "avatar": "string",
      "loyaltyPoints": "number",
      "availableCoupons": "number"
    }
  }
  ```

### 5.2 Update User Profile
- **Endpoint:** `PUT /user/profile`
- **Description:** Update user profile
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
  ```

### 5.3 Change Password
- **Endpoint:** `POST /user/change-password`
- **Description:** Change user password
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "currentPassword": "string",
    "newPassword": "string",
    "confirmPassword": "string"
  }
  ```

### 5.4 Get User Dashboard
- **Endpoint:** `GET /user/dashboard`
- **Description:** Get user dashboard data
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "recentOrder": {},
      "loyaltyPoints": "number",
      "availableCoupons": "number",
      "favoriteItems": []
    }
  }
  ```

---

## 6. Address APIs

### 6.1 Get Saved Addresses
- **Endpoint:** `GET /user/addresses`
- **Description:** Get user's saved addresses
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "type": "string (Home/Work/Other)",
        "name": "string",
        "phone": "string",
        "address": "string",
        "city": "string",
        "state": "string",
        "pincode": "string",
        "isDefault": "boolean"
      }
    ]
  }
  ```

### 6.2 Add Address
- **Endpoint:** `POST /user/addresses`
- **Description:** Add new address
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "type": "string",
    "name": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "pincode": "string",
    "isDefault": "boolean"
  }
  ```

### 6.3 Update Address
- **Endpoint:** `PUT /user/addresses/:addressId`
- **Description:** Update address
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:** Same as Add Address

### 6.4 Delete Address
- **Endpoint:** `DELETE /user/addresses/:addressId`
- **Description:** Delete address
- **Headers:** `Authorization: Bearer {token}`

### 6.5 Set Default Address
- **Endpoint:** `POST /user/addresses/:addressId/set-default`
- **Description:** Set address as default
- **Headers:** `Authorization: Bearer {token}`

---

## 7. Wishlist APIs

### 7.1 Get Wishlist
- **Endpoint:** `GET /user/wishlist`
- **Description:** Get user's wishlist items
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "productId": "number",
        "name": "string",
        "price": "number",
        "image": "string"
      }
    ]
  }
  ```

### 7.2 Add to Wishlist
- **Endpoint:** `POST /user/wishlist`
- **Description:** Add product to wishlist
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "productId": "number"
  }
  ```

### 7.3 Remove from Wishlist
- **Endpoint:** `DELETE /user/wishlist/:itemId`
- **Description:** Remove item from wishlist
- **Headers:** `Authorization: Bearer {token}`

---

## 8. Coupon APIs

### 8.1 Get User Coupons
- **Endpoint:** `GET /user/coupons`
- **Description:** Get user's available coupons
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "code": "string",
        "discount": "string",
        "description": "string",
        "validUntil": "datetime",
        "status": "string"
      }
    ]
  }
  ```

### 8.2 Apply Coupon
- **Endpoint:** `POST /coupons/apply`
- **Description:** Apply coupon code
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "couponCode": "string"
  }
  ```

### 8.3 Validate Coupon
- **Endpoint:** `POST /coupons/validate`
- **Description:** Validate coupon code
- **Request Body:**
  ```json
  {
    "couponCode": "string"
  }
  ```

---

## 9. Blog APIs

### 9.1 Get All Blogs
- **Endpoint:** `GET /blogs`
- **Description:** Get list of all blog posts
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `category`: string (optional)
  - `search`: string (optional)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "image": "string",
        "category": "string",
        "author": "string",
        "date": "datetime",
        "slug": "string"
      }
    ],
    "pagination": {}
  }
  ```

### 9.2 Get Blog by ID/Slug
- **Endpoint:** `GET /blogs/:id`
- **Description:** Get single blog post details
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "number",
      "title": "string",
      "content": "string",
      "image": "string",
      "category": "string",
      "author": "string",
      "date": "datetime",
      "tags": ["string"]
    }
  }
  ```

### 9.3 Get Blog Categories
- **Endpoint:** `GET /blogs/categories`
- **Description:** Get blog categories
- **Response:**
  ```json
  {
    "success": true,
    "data": ["string"]
  }
  ```

### 9.4 Add Blog Comment
- **Endpoint:** `POST /blogs/:id/comments`
- **Description:** Add comment to blog post
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "website": "string (optional)",
    "comment": "string"
  }
  ```

### 9.5 Get Blog Comments
- **Endpoint:** `GET /blogs/:id/comments`
- **Description:** Get comments for a blog post
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "name": "string",
        "comment": "string",
        "date": "datetime"
      }
    ]
  }
  ```

---

## 10. Contact APIs

### 10.1 Submit Contact Form
- **Endpoint:** `POST /contact`
- **Description:** Submit contact form
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "message": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Contact form submitted successfully"
  }
  ```

### 10.2 Get Store Locations
- **Endpoint:** `GET /stores`
- **Description:** Get all store locations
- **Query Parameters:**
  - `city`: string (optional)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "name": "string",
        "address": "string",
        "city": "string",
        "phone": "string",
        "email": "string",
        "latitude": "number",
        "longitude": "number",
        "image": "string"
      }
    ]
  }
  ```

---

## 11. Delivery APIs

### 11.1 Check Delivery Availability
- **Endpoint:** `POST /delivery/check`
- **Description:** Check if delivery is available for pincode/area
- **Request Body:**
  ```json
  {
    "pincode": "string",
    "area": "string (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "available": "boolean",
      "message": "string",
      "estimatedDays": "number"
    }
  }
  ```

---

## 12. Offers & Schemes APIs

### 12.1 Get All Offers
- **Endpoint:** `GET /offers`
- **Description:** Get all active offers
- **Query Parameters:**
  - `category`: string (optional: "Pizza", "Cakes", "Danbro Special", "Others")
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "title": "string",
        "subtitle": "string",
        "discount": "string",
        "category": "string",
        "image": "string",
        "validUntil": "datetime"
      }
    ]
  }
  ```

### 12.2 Get Special Moments/Products
- **Endpoint:** `GET /offers/special-moments`
- **Description:** Get special moments products
- **Response:** Same format as Get All Offers

---

## 13. Catering & Events APIs

### 13.1 Get Catering Services
- **Endpoint:** `GET /catering/services`
- **Description:** Get catering services list
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "title": "string",
        "description": "string"
      }
    ]
  }
  ```

### 13.2 Get Event Types
- **Endpoint:** `GET /catering/event-types`
- **Description:** Get event types for catering
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "image": "string"
      }
    ]
  }
  ```

### 13.3 Request Catering Quote
- **Endpoint:** `POST /catering/quote`
- **Description:** Request quote for catering service
- **Request Body:**
  ```json
  {
    "eventType": "string",
    "eventDate": "datetime",
    "guestCount": "number",
    "location": "string",
    "requirements": "string",
    "contactName": "string",
    "contactEmail": "string",
    "contactPhone": "string"
  }
  ```

---

## 14. Downloads APIs

### 14.1 Get User Downloads
- **Endpoint:** `GET /user/downloads`
- **Description:** Get user's downloadable invoices/receipts
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "number",
        "name": "string",
        "type": "string",
        "date": "datetime",
        "downloadUrl": "string"
      }
    ]
  }
  ```

### 14.2 Download Invoice/Receipt
- **Endpoint:** `GET /user/downloads/:id`
- **Description:** Download invoice or receipt
- **Headers:** `Authorization: Bearer {token}`
- **Response:** File download

---

## 15. Reviews & Ratings APIs

### 15.1 Get Product Reviews
- **Endpoint:** `GET /products/:id/reviews`
- **Description:** Get reviews for a product
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "averageRating": "number",
      "totalReviews": "number",
      "ratingDistribution": {
        "5": "number",
        "4": "number",
        "3": "number",
        "2": "number",
        "1": "number"
      },
      "reviews": [
        {
          "id": "number",
          "userName": "string",
          "rating": "number",
          "comment": "string",
          "date": "datetime",
          "likes": "number",
          "dislikes": "number"
        }
      ]
    }
  }
  ```

### 15.2 Add Product Review
- **Endpoint:** `POST /products/:id/reviews`
- **Description:** Add review for a product
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "rating": "number (1-5)",
    "comment": "string"
  }
  ```

### 15.3 Like/Dislike Review
- **Endpoint:** `POST /reviews/:reviewId/like`
- **Description:** Like or dislike a review
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "action": "string (like/dislike)"
  }
  ```

---

## 16. Business/B2B APIs

### 16.1 Submit Business Inquiry
- **Endpoint:** `POST /business/inquire`
- **Description:** Submit business/B2B inquiry
- **Request Body:**
  ```json
  {
    "companyName": "string",
    "contactName": "string",
    "email": "string",
    "phone": "string",
    "message": "string"
  }
  ```

---

## 17. Newsletter APIs

### 17.1 Subscribe to Newsletter
- **Endpoint:** `POST /newsletter/subscribe`
- **Description:** Subscribe to newsletter
- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```

### 17.2 Unsubscribe from Newsletter
- **Endpoint:** `POST /newsletter/unsubscribe`
- **Description:** Unsubscribe from newsletter
- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```

---

## 18. Payment APIs

### 18.1 Initiate Payment
- **Endpoint:** `POST /payment/initiate`
- **Description:** Initiate payment for order
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "orderId": "string",
    "paymentMethod": "string",
    "amount": "number"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "paymentId": "string",
      "paymentUrl": "string (for redirect)",
      "transactionId": "string"
    }
  }
  ```

### 18.2 Verify Payment
- **Endpoint:** `POST /payment/verify`
- **Description:** Verify payment status
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "paymentId": "string",
    "transactionId": "string"
  }
  ```

---

## 19. Search APIs

### 19.1 Global Search
- **Endpoint:** `GET /search`
- **Description:** Global search across products, blogs, etc.
- **Query Parameters:**
  - `q`: string (required)
  - `type`: string (optional: "products", "blogs", "all")
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "products": [],
      "blogs": []
    }
  }
  ```

---

## 20. Settings APIs

### 20.1 Export User Data
- **Endpoint:** `GET /user/export-data`
- **Description:** Export user data
- **Headers:** `Authorization: Bearer {token}`
- **Response:** File download (JSON/CSV)

### 20.2 Delete Account
- **Endpoint:** `DELETE /user/account`
- **Description:** Delete user account
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "password": "string (for confirmation)"
  }
  ```

---

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "string (optional)"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

---

## Authentication

Most endpoints require authentication using JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Notes

1. All dates should be in ISO 8601 format
2. All prices should be in the base currency (INR/USD)
3. Images should be returned as full URLs
4. Pagination should be implemented for list endpoints
5. Rate limiting should be applied to prevent abuse
6. CORS should be configured properly
7. Input validation should be implemented on all endpoints
8. Error handling should be consistent across all endpoints

---

## Priority Order for Implementation

1. **High Priority:**
   - Authentication (Login, Register)
   - Products (List, Details, Categories)
   - Cart (Add, Update, Remove, Get)
   - Orders (Place, Track, History)
   - User Profile (Get, Update)

2. **Medium Priority:**
   - Addresses (CRUD)
   - Wishlist (Add, Remove, Get)
   - Coupons (Get, Apply, Validate)
   - Delivery Check
   - Contact Form

3. **Low Priority:**
   - Blog (List, Details, Comments)
   - Reviews & Ratings
   - Downloads
   - Business/B2B
   - Newsletter
   - Payment Integration

---

**Total APIs Required: ~80+ endpoints**

