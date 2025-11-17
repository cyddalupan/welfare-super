# Project Overview

This is an Angular web application that provides a chat interface for interacting with a database. The application uses a PHP backend to handle database operations and proxy requests to an external AI service. The frontend is built with Angular and styled with Tailwind CSS.

# Code Organization and Architecture

This project follows a specific architecture where the majority of the application logic resides within the Angular frontend, keeping the backend intentionally simple.

*   **Frontend-Driven Logic**: All business logic, state management, workflow orchestration, and the construction of database queries and AI prompts are handled within the Angular application (`src/app`).
*   **Minimalist Backend**: The backend consists of only two PHP scripts (`api/ai.php` and `api/database.php`). Their sole purpose is to act as secure proxies:
    *   `ai.php`: Decrypts requests from the frontend and forwards them to an external AI service.
    *   `database.php`: Decrypts requests and executes SQL queries against the database.
    *   This design avoids scattering business logic across both the frontend and backend.

To support this structure, prompts and queries are centralized in dedicated files within the frontend for easy management and reuse.

*   **AI Prompts (`src/app/prompts.ts`)**: All system prompts and instructions for the AI are stored as exported constants in this file. Components and services import prompts from here rather than hardcoding them.
*   **Database Queries (`src/app/queries.ts`)**: This file is reserved for storing all SQL query strings as exported constants. Services that interact with the `api/database.php` endpoint will import their queries from this file.

# Backend API Endpoints

*   **Database Endpoint (`api/database.php`)**
    *   **HTTP Method:** `POST`
    **Functionality:** Executes SQL queries (SELECT, INSERT, UPDATE, DELETE) against the database.
    *   **Request:** The body of the request contains a single encrypted and Base64-encoded string. When decrypted, this string reveals a JSON object with two keys:
        *   `query`: The SQL query string to be executed (e.g., "SELECT * FROM user WHERE email = ?").
        *   `params`: An optional array of parameters to be bound to the prepared statement (e.g., ["user@example.com"]).
    *   **Security:** All queries are executed using prepared statements to prevent SQL injection.
*   **AI Endpoint (`api/ai.php`)**
    *   **HTTP Method:** `POST`
    *   **Functionality:** Forwards user prompts to an external AI service for processing.
    *   **Request:** The body of the request contains an encrypted and Base64-encoded JSON object with the user's prompt.

# Configuration

*   **`api/config.php`**: Contains sensitive database credentials and encryption keys (`ENCRYPTION_KEY`, `ENCRYPTION_IV`). This file is **`.gitignore`d` and should not be committed to the repository.
*   **`api/config.example.php`**: A template file for `config.php`, providing an example structure with placeholder values. This file **is** committed to the repository.
*   **`DATABASE.md`**: Documents the detailed database schema and table structures.

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
Always run this after changing an angular code.

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
*   **API Interaction:** For every interaction with the `api/database.php` endpoint, a dedicated Angular service should be created. These services must use strict typings for all request payloads and expected responses to ensure type safety and maintainability.
*   **Styling:** The project uses Tailwind CSS for styling.
*   **AI Workflow:** The application uses a simplified workflow where the frontend directly calls the backend AI endpoint. The `AiService` encrypts the entire chat message history and sends it to `api/ai.php`, which then proxies the request to an external AI service (e.g., OpenAI).
*   **Strict Typing:** This project enforces strict TypeScript checking. All code contributions, modifications, and generations **must** adhere to this policy.
    *   **Rule:** Avoid using the `any` type. Always define explicit types for variables, function parameters, and return values.
    *   **Encapsulation:** Prioritize encapsulating code, data, and content within strictly typed objects to ensure proper containment, organization, and maintainability.
    *   **Rationale:** This prevents runtime errors and improves code maintainability and clarity. Refer to the `tsconfig.json` for specific compiler options.
*   **Input Normalization (Frontend-Driven):** When user input needs to be standardized (e.g., for case-insensitive comparison or to remove extraneous whitespace) before being sent to the backend, this normalization should primarily occur on the Angular frontend. This ensures that the data sent to the backend is already in a consistent format, simplifying backend logic. Common normalization steps include:
    *   Trimming leading/trailing whitespace (`.trim()`).
    *   Converting the string to a consistent case (`.toLowerCase()` or `.toUpperCase()`).
    The PHP backend should then expect and process these already-normalized values without needing to re-apply such transformations for specific parameters.
*   **Testing:** All testing will be performed manually by the user. Automated unit tests are not required for new features or bug fixes at this stage.
*   **Font Awesome:** Included via CDN in `src/index.html` for icon usage across the application.

## Chat Functionality Details

For detailed information on the chat logic, including conversational authentication and special tag parsing (e.g., `[[LOGIN, ...]]`), please refer to `CHATLOGIC.md`.

## Admin Panel

For details on the admin panel, including authentication, database tables, and CRUD operations, please refer to `ADMIN.md`.

### Routing

*   **Home Page (`/`)**: The main entry point of the application is the `ChatComponent` (`src/app/chat/chat.ts`), which provides the chat interface.
*   **Admin Login (`/admin/login`)**: A separate route is defined for an admin login page, handled by `AdminLoginComponent` (`src/app/admin-login/admin-login.ts`).

### Core Components and Services

*   **`ChatComponent` (`src/app/chat/chat.ts`)**:
    *   Manages the chat UI, user input, and conversation history.
    *   Initializes the chat with a system prompt imported from `src/app/prompts.ts`.
*   **`AiService` (`src/app/ai.service.ts`)**:
    *   Handles communication with the backend `api/ai.php` endpoint.
    *   Encrypts the chat payload using `AES-256-CBC` with a randomly generated IV for each request. The IV is prepended to the ciphertext and then Base64-encoded before sending.
*   **`ai.php` (`api/ai.php`)**:
    *   Receives the encrypted, Base64-encoded payload from the frontend.
    *   Base64-decodes the payload, extracts the IV, and decrypts the content.
    *   Proxies the decrypted chat messages to the OpenAI API (using the `gpt-5-mini` model).
    *   Returns the AI's response directly to the frontend as plain text.

### End-to-End Chat Workflow

1.  **Initialization**: `ChatComponent` loads and initializes the message history with a system prompt from `src/app/prompts.ts`.
2.  **User Interaction**: User types a message in `ChatComponent`.
3.  **Frontend Processing**: `ChatComponent` adds the message to its history and calls `AiService.callAi()` with the full message history.
4.  **Encryption**: `AiService` serializes the message history, encrypts it with a unique IV, and Base64-encodes the result.
5.  **Backend Request**: `AiService` sends the encrypted payload via POST to `api/ai.php`.
6.  **Backend Decryption**: `ai.php` decodes, extracts IV, and decrypts the content.
7.  **OpenAI Integration**: `ai.php` forwards the messages to the OpenAI API.
8.  **OpenAI Response**: OpenAI processes the request and sends back a response.
9.  **Backend Response**: `ai.php` extracts the AI's message and sends it as plain text back to the frontend.
10. **Frontend Display**: `ChatComponent` receives the AI's message and updates the UI.
