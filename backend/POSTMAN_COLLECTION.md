# eMunicipality API - Postman Collection

## Base URL
```
http://localhost:3000
```

## Sample Requests

### 1. Health Check
**GET** `/health`
```json
Response:
{
  "success": true,
  "message": "eMunicipality API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### 2. Users API

#### Get All Users
**GET** `/api/users`
```json
Response:
{
  "success": true,
  "data": [
    {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashedpassword",
      "role": "citizen",
      "address": "123 Main St",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### Create User
**POST** `/api/users`
```json
Headers:
Content-Type: application/json

Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "citizen",
  "address": "456 Oak Ave"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user_id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "citizen",
    "address": "456 Oak Ave",
    "created_at": "2024-01-15T10:35:00.000Z"
  }
}
```

#### Get User by ID
**GET** `/api/users/1`
```json
Response:
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "hashedpassword",
    "role": "citizen",
    "address": "123 Main St",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update User
**PUT** `/api/users/1`
```json
Headers:
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "address": "789 Pine St"
}

Response:
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user_id": 1,
    "name": "John Updated",
    "email": "john@example.com",
    "password": "hashedpassword",
    "role": "citizen",
    "address": "789 Pine St",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Delete User
**DELETE** `/api/users/1`
```json
Response:
{
  "success": true,
  "message": "User deleted successfully"
}
```

### 3. Document Types API

#### Get All Document Types
**GET** `/api/doctypes`
```json
Response:
{
  "success": true,
  "data": [
    {
      "doctype_id": 1,
      "name": "Birth Certificate",
      "description": "Official birth certificate"
    }
  ],
  "count": 1
}
```

#### Create Document Type
**POST** `/api/doctypes`
```json
Headers:
Content-Type: application/json

Body:
{
  "name": "Marriage Certificate",
  "description": "Official marriage certificate"
}

Response:
{
  "success": true,
  "message": "Document type created successfully",
  "data": {
    "doctype_id": 2,
    "name": "Marriage Certificate",
    "description": "Official marriage certificate"
  }
}
```

### 4. Documents API

#### Get All Documents
**GET** `/api/documents`
```json
Response:
{
  "success": true,
  "data": [
    {
      "document_id": 1,
      "user_id": 1,
      "doctype_id": 1,
      "request_date": "2024-01-15T10:30:00.000Z",
      "status": "pending",
      "notes": "Urgent request",
      "user_name": "John Doe",
      "user_email": "john@example.com",
      "doctype_name": "Birth Certificate",
      "doctype_description": "Official birth certificate"
    }
  ],
  "count": 1
}
```

#### Create Document
**POST** `/api/documents`
```json
Headers:
Content-Type: application/json

Body:
{
  "user_id": 1,
  "doctype_id": 1,
  "notes": "Need for passport application"
}

Response:
{
  "success": true,
  "message": "Document created successfully",
  "data": {
    "document_id": 1,
    "user_id": 1,
    "doctype_id": 1,
    "request_date": "2024-01-15T10:30:00.000Z",
    "status": "pending",
    "notes": "Need for passport application"
  }
}
```

#### Update Document Status
**PUT** `/api/documents/1`
```json
Headers:
Content-Type: application/json

Body:
{
  "status": "approved",
  "notes": "Document approved and ready for pickup"
}

Response:
{
  "success": true,
  "message": "Document updated successfully",
  "data": {
    "document_id": 1,
    "user_id": 1,
    "doctype_id": 1,
    "request_date": "2024-01-15T10:30:00.000Z",
    "status": "approved",
    "notes": "Document approved and ready for pickup"
  }
}
```

#### Get Documents by User
**GET** `/api/documents/user/1`
```json
Response:
{
  "success": true,
  "data": [
    {
      "document_id": 1,
      "user_id": 1,
      "doctype_id": 1,
      "request_date": "2024-01-15T10:30:00.000Z",
      "status": "approved",
      "notes": "Document approved and ready for pickup",
      "user_name": "John Doe",
      "user_email": "john@example.com",
      "doctype_name": "Birth Certificate",
      "doctype_description": "Official birth certificate"
    }
  ],
  "count": 1
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name, email, password, and role are required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error creating user",
  "error": "Detailed error message"
}
```

## Postman Collection Import
You can import this collection into Postman by creating a new collection and adding these requests with the specified methods, URLs, headers, and body content.
