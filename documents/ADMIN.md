# Admin Panel Documentation

This document outlines the architecture, authentication flow, and features of the admin panel.

## Authentication

Admin authentication is handled via a dedicated login page at `/admin/login`.
*   Login Page Component: [`src/app/admin/pages/admin-login/admin-login.ts`](src/app/admin/pages/admin-login/admin-login.ts)

- **Flow**:
  1. The user enters their email and password.
  2. The application queries the `admin_users` table to find a user with the matching email.
      *   SQL Query: [`src/app/queries.ts`](src/app/queries.ts)
      *   Service Interaction: [`src/app/admin/services/admin-users.service.ts`](src/app/admin/services/admin-users.service.ts)
  3. The entered password is compared against the plaintext password stored in the database.
  4. Upon successful authentication, the user's `user_type` and an auth token are stored in the browser's `localStorage`.
      *   Auth Service: [`src/app/admin/services/auth.service.ts`](src/app/admin/services/auth.service.ts)
      *   `localStorage` usage: [`src/app/admin/services/auth.service.ts`](src/app/admin/services/auth.service.ts)
  5. The user is redirected to the admin dashboard at `/admin/dashboard`.

- **Logout**:
  - Logging out clears the `localStorage` token (and `user_type`) and redirects the user back to the `/admin/login` page.
  *   Logout Logic: [`src/app/admin/services/auth.service.ts`](src/app/admin/services/auth.service.ts)

## User Types and Permissions

A new `user_type` column has been introduced in the `admin_users` table to manage different levels of administrative access.
*   Admin Users Service: [`src/app/admin/services/admin-users.service.ts`](src/app/admin/services/admin-users.service.ts)

- **`admin`**: Full administrative privileges, including the ability to create, read, update, and delete all resources.
- **`staff`**: Limited administrative privileges. Staff users can create, read, and update resources, but **do not have the ability to delete** any resources within the admin panel.

## Admin User Management (CRUD)

Admin users now have dedicated functionality to manage other admin and staff accounts. This includes:

- **Viewing Users**: A list of all registered admin and staff users, accessible via `/admin/users`.
- **Creating Users**: A form to add new admin or staff accounts, accessible via `/admin/users/new`.
- **Editing Users**: Functionality to modify existing user details (full name, email, password, user type), accessible via `/admin/users/edit/:id`.
- **Deleting Users**: Only 'admin' type users can delete other admin or staff accounts. This operation is protected by a confirmation dialog.

This functionality is implemented through `UserListComponent` and `UserFormComponent` within the `AdminModule`.
*   User List Component: [`src/app/admin/pages/user-list/user-list.ts`](src/app/admin/pages/user-list/user-list.ts)
*   User Form Component: [`src/app/admin/components/user-form/user-form.ts`](src/app/admin/components/user-form/user-form.ts)
*   Admin Module: [`src/app/admin/admin.module.ts`](src/app/admin/admin.module.ts)

## Routing Implementation

The admin panel routes are defined within a lazy-loaded `AdminModule` ([`src/app/admin/admin.module.ts`](src/app/admin/admin.module.ts)), which is loaded when the `/admin` path is accessed in [`src/app/app.routes.ts`](src/app/app.routes.ts).

Key aspects of the admin routing include:
*   **Lazy Loading:** The `AdminModule` and its associated components are lazy-loaded to optimize initial application load time.
*   **Route Structure:** Admin routes are defined using the `ADMIN_ROUTES` constant within `AdminModule` and are configured with `RouterModule.forChild()`.
    *   Admin Routes Definition: [`src/app/admin/admin.module.ts`](src/app/admin/admin.module.ts)
*   **Authentication Guard:** Navigation to protected admin routes (e.g., `/admin/dashboard`) is secured using the `authGuard`. This guard is implemented as a modern Angular functional guard (`CanActivateFn`), which checks for an authentication token in `localStorage` before allowing access. If no valid token is found, it redirects the user to `/admin/login`.
    *   Auth Guard Implementation: [`src/app/admin/guards/auth.guard.ts`](src/app/admin/guards/auth.guard.ts)
    *   `localStorage` usage: [`src/app/admin/guards/auth.guard.ts`](src/app/admin/guards/auth.guard.ts)
*   **Default Redirect:** Accessing the base `/admin` path will automatically redirect to `/admin/dashboard`.

## Admin Pages

The admin panel includes the following pages, accessible via the sidebar navigation:
*   Sidebar Navigation Template: [`src/app/admin/components/sidebar/sidebar.html`](src/app/admin/components/sidebar/sidebar.html)
*   Sidebar Component Logic: [`src/app/admin/components/sidebar/sidebar.ts`](src/app/admin/components/sidebar/sidebar.ts)

-   **Dashboard** (`/admin/dashboard`)
    *   Component: [`src/app/admin/pages/dashboard/dashboard.ts`](src/app/admin/pages/dashboard/dashboard.ts)
-   **Applicants**
    -   **All Applicants** (`/admin/applicants`)
        *   Component: [`src/app/admin/pages/applicant-list/applicant-list.ts`](src/app/admin/pages/applicant-list/applicant-list.ts)
    -   **Applicants by Status** (`/admin/applicants/status/:status`)
        *   Component: [`src/app/admin/pages/applicant-list/applicant-list.ts`](src/app/admin/pages/applicant-list/applicant-list.ts)
    -   **Applicants with Complaints** (`/admin/applicants/complaints`)
        *   Component: [`src/app/admin/pages/applicant-complaints-list/applicant-complaints-list.ts`](src/app/admin/pages/applicant-complaints-list/applicant-complaints-list.ts)
        *   **Description:** This page lists all applicants whose `main_status` contains the word "complain" (e.g., 'with_complain', 'Complaint'). The data is fetched using an enhanced `ApplicantService` method that supports `LIKE` queries for status.
-   **Cases** (`/admin/cases`)
    *   Component: [`src/app/admin/pages/case-list/case-list.ts`](src/app/admin/pages/case-list/case-list.ts)
-   **FRAs** (`/admin/fras`)
    *   Component: [`src/app/admin/pages/fra-list/fra-list.ts`](src/app/admin/pages/fra-list/fra-list.ts)
-   **Referrals** (`/admin/referrals`)
    *   Component: [`src/app/admin/pages/referral-list/referral-list.ts`](src/app/admin/pages/referral-list/referral-list.ts)
-   **Announcements** (`/admin/announcements`)
    *   Component: [`src/app/admin/pages/announcement-list/announcement-list.component.ts`](src/app/admin/pages/announcement-list/announcement-list.component.ts)
-   **Admin Users** (`/admin/users`) - *Visible only to admin users*
    *   Component: [`src/app/admin/pages/user-list/user-list.ts`](src/app/admin/pages/user-list/user-list.ts)
-   **Applicant Statuses**
    *   **Description:** Applicants have a `main_status` field which categorizes their current state. This status is dynamically managed from the `status` database table.
    *   **Key Statuses:**
        *   `active`: Indicates an applicant is actively managed or deployed.
        *   `with_complain`: Indicates an applicant has an active complaint.
        *   Statuses containing "arriv" (e.g., "arrived", "on arrival") are also recognized by the system for specific internal logic and charting.
    *   **Note on Case Sensitivity:** The Angular frontend (`applicant-list.html`) currently performs a case-sensitive check for `'active'` and `'with_complain'`. While the system may internally treat variations (e.g., "ACTIVE_COMPLAIN", "active complain") as equivalent in some contexts, the frontend display logic requires an exact match to `'active'` or `'with_complain'` for specific styling. Ensure consistent casing from the backend for correct display in the UI.

### Notification Features

*   **Complaint Notification Bell**: A bell icon is now present in the main admin header (`src/app/admin/layouts/admin-layout/admin-layout.html`).
    *   This icon displays a real-time count of applicants whose `main_status` contains "complain".
    *   Clicking the bell icon navigates to the dedicated "Applicants with Complaints" page (`/admin/applicants/complaints`).
    *   The count is dynamically fetched using `ApplicantService.countApplicantsWithComplaints()`.
    *   `ApplicantService.getApplicants()` was also updated to support filtering by `main_status LIKE '%<status>%'` to power the new complaints list page.