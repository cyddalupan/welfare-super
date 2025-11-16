# Admin Panel Documentation

This document outlines the architecture, authentication flow, and features of the admin panel.

## Authentication

Admin authentication is handled via a dedicated login page at `/admin/login`.

- **Flow**:
  1. The user enters their email and password.
  2. The application queries the `admin_users` table to find a user with the matching email.
  3. The entered password is compared against the plaintext password stored in the database.
  4. Upon successful authentication, an auth token is stored in the browser's `localStorage`.
  5. The user is redirected to the admin dashboard at `/admin/dashboard`.

- **Logout**:
  - Logging out clears the `localStorage` token and redirects the user back to the `/admin/login` page.

## Database

### `admin_users` Table

This table stores credentials for admin users.

**SQL Schema:**

```sql
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Dummy Admin User

Use this query to insert a temporary admin user for development purposes.

**SQL Query:**

```sql
INSERT INTO admin_users (email, password, full_name) VALUES ('admin@example.com', 'password123', 'Admin User');
```
