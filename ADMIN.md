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
