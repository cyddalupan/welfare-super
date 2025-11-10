# Project Overview

This is an Angular web application that provides a chat interface for interacting with a database. The application uses a PHP backend to handle database operations and proxy requests to an external AI service. The frontend is built with Angular and styled with Tailwind CSS.

# Architecture

*   **Frontend:** Built with Angular and styled with Tailwind CSS.
*   **Backend:** A PHP API located in the `live/api/` directory.
*   **Build & Deployment:** The `npm run build` command compiles the Angular app into the `live/` directory, which serves as the web root for deployment. The backend PHP files reside within `live/api/` and are served from there.

# Backend API Endpoints

*   **Database Endpoint (`api/database.php`)**
    *   **HTTP Method:** `POST`
    *   **Functionality:** Executes SQL queries (SELECT, INSERT, UPDATE, DELETE) against the database.
    *   **Request:** The body of the request contains a single encrypted and Base64-encoded string. When decrypted, this string reveals a JSON object with two keys:
        *   `query`: The SQL query string to be executed (e.g., "SELECT * FROM user WHERE email = ?").
        *   `params`: An optional array of parameters to be bound to the prepared statement (e.g., ["user@example.com"]).
    *   **Security:** All queries are executed using prepared statements to prevent SQL injection.
*   **AI Endpoint (`api/ai.php`)**
    *   **HTTP Method:** `POST`
    *   **Functionality:** Forwards user prompts to an external AI service for processing.
    *   **Request:** The body of the request contains an encrypted and Base64-encoded JSON object with the user's prompt.

# Configuration

*   **`live/api/config.php`**: Contains sensitive database credentials and encryption keys (`ENCRYPTION_KEY`, `ENCRYPTION_IV`). This file is **`.gitignore`d** and should not be committed to the repository.
*   **`live/api/config.example.php`**: A template file for `config.php`, providing an example structure with placeholder values. This file **is** committed to the repository.
*   **`DATABASE.md`**: Documents the database schema and table structures.

# API Security: Request Encryption

*   **Algorithm:** `AES-256-CBC`.
*   **Workflow:**
    1.  The Angular frontend prepares a JSON payload.
    2.  This payload is encrypted using AES-256-CBC.
    3.  The resulting encrypted data is **Base64 encoded** to ensure it can be safely transmitted as a string.
    4.  The PHP backend receives the request, Base64 decodes the data, and then decrypts it to access the original JSON payload.
*   **Key Management:** The shared secret `key` and `IV` (Initialization Vector) must be securely stored in environment variables on both the frontend and backend servers. They must not be hardcoded in the source code.
*   **API Responses:** Responses sent from the backend back to the frontend are **not** encrypted.

# Building and Running

## Development Server

To start the local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

To build the project for deployment, run:

```bash
npm run build
```

This command compiles the Angular application and copies the necessary files to the `live` directory.

## Running Unit Tests

To run unit tests with Karma, use the following command:

```bash
ng test
```

# Deployment

The `live` folder is the main deployment directory. It contains the compiled Angular application and a dedicated `api/` subfolder for backend PHP scripts. The `live` folder is not ignored by Git, allowing the PHP API files to be committed to the repository.

The `npm run build` command handles the entire build process:

1.  **`ng build`**: Compiles the application into the `dist/welfareph` directory.
2.  **`mkdir -p live/api`**: Ensures the `live/api` directory exists.
3.  **`cp -R dist/welfareph/browser/. live/`**: Copies the compiled Angular app to the root of the `live` folder.

This setup allows backend PHP files to persist in `live/api` across builds.

# Development Conventions

*   **Database Structure:** The detailed database schema is documented in `DATABASE.md`.
*   **API Interaction:** For every interaction with the `database.php` endpoint, a dedicated Angular service should be created. These services must use strict typings for all request payloads and expected responses to ensure type safety and maintainability.
*   **Styling:** The project uses Tailwind CSS for styling.
*   **AI Workflow:** The application will use a simplified workflow where the frontend directly calls the backend AI endpoint, replacing the previous multi-step orchestrator logic.
*   **Strict Typing:** This project enforces strict TypeScript checking. All code contributions, modifications, and generations **must** adhere to this policy.
    *   **Rule:** Avoid using the `any` type. Always define explicit types for variables, function parameters, and return values.
    *   **Rationale:** This prevents runtime errors and improves code maintainability and clarity. Refer to the `tsconfig.json` for specific compiler options.