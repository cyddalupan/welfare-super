# Database Schema

## `user` Table

Stores user information.

| Column       | Type          | Description                 |
|--------------|---------------|-----------------------------|
| `id`         | `INT`         | Unique user ID.             |
| `email`      | `VARCHAR(255)`| User's email (unique).      |
| `password`   | `VARCHAR(255)`| Hashed password.            |
| `user_type`  | `VARCHAR(50)` | User role (e.g., 'admin').  |
| `created_at` | `TIMESTAMP`   | Account creation timestamp. |
