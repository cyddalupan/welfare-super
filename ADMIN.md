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

## Routing Implementation

The admin panel routes are defined within a lazy-loaded `AdminModule` (`src/app/admin/admin.module.ts`), which is loaded when the `/admin` path is accessed in `src/app/app.routes.ts`.

Key aspects of the admin routing include:
*   **Lazy Loading:** The `AdminModule` and its associated components are lazy-loaded to optimize initial application load time.
*   **Route Structure:** Admin routes are defined using the `ADMIN_ROUTES` constant within `AdminModule` and are configured with `RouterModule.forChild()`.
*   **Authentication Guard:** Navigation to protected admin routes (e.g., `/admin/dashboard`) is secured using the `authGuard`. This guard is implemented as a modern Angular functional guard (`CanActivateFn`), which checks for an authentication token in `localStorage` before allowing access. If no valid token is found, it redirects the user to `/admin/login`.
*   **Default Redirect:** Accessing the base `/admin` path will automatically redirect to `/admin/dashboard`.

