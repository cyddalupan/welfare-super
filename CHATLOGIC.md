# Chat Logic Documentation

This document outlines the core logic and workflow for the chat functionality within the `welfare-super` Angular application, with a specific focus on conversational authentication.

## 1. Conversational Authentication Flow

The application employs a conversational authentication method to identify and log in users. This process is entirely managed by the Angular frontend, which constructs database queries and AI prompts.

### 1.1 User Session Check

*   Upon initialization of the `ChatComponent`, the application checks `localStorage` for a stored `user_id`.
*   If a `user_id` is found, the user is considered authenticated, and the chat proceeds with the "Authenticated User" flow.
*   If no `user_id` is found, the user is considered unauthenticated, and the chat initiates the "Unauthenticated User" flow.

### 1.2 AI Prompting Strategy

The Angular frontend dynamically constructs the AI's system prompt based on the user's authentication status:

*   **Unauthenticated User Prompt:**
    *   The system prompt will prioritize obtaining user information for login.
    *   It will include an explicit instruction to the AI: "In order to help in anything, we prioritize the user log in first."
    *   The AI is expected to ask for the user's last name and passport number.
*   **Authenticated User Prompt:**
    *   The system prompt will be `SYSTEM_PROMPT_COMPLAINTS_ASSISTANT` (from `src/app/prompts.ts`).
    *   This prompt ensures the AI focuses on assisting with complaints and avoids recommending government agencies.

### 1.3 AI Response Tag Parsing

The Angular frontend actively monitors AI responses for special tags that trigger specific actions.

*   **`[[LOGIN, LASTNAME:"<last_name>",PASSPORT:"<passport_number>"]]` Tag:**
    *   When the AI successfully gathers the user's last name and passport number, it is expected to embed this information within the chat response using this specific tag format.
    *   The `ChatComponent` will parse the AI's message, detect this tag, and extract the `LASTNAME` and `PASSPORT` values.
    *   The raw tag will *not* be displayed in the chat UI.

### 1.4 Authentication with Backend

*   Upon extracting the `LASTNAME` and `PASSPORT` from the `[[LOGIN]]` tag, the Angular `AuthService` will construct an SQL `SELECT` query.
*   This query will target the `employee_employee` table (as defined in `DATABASE.md`) to find a matching record based on the provided `last_name` and `passport_number`.
*   The query and its parameters will be encrypted using AES-256-CBC and sent via a POST request to the `live/api/database.php` endpoint.
*   `database.php` will decrypt, execute the query using prepared statements, and return the result.

### 1.5 Login Result Handling

*   **Successful Login:**
    *   If `database.php` returns a matching `employee_employee` record, the `user_id` (employee `id`) will be extracted.
    *   This `user_id` will be saved to `localStorage`.
    *   The `ChatComponent`'s state will be updated to reflect the logged-in user, transitioning to the "Authenticated User" flow.
*   **Failed Login:**
    *   If no matching record is found, the frontend will display the error message: "Account does not exist and to double check their input if its correct."
    *   The user will remain in the "Unauthenticated User" flow, and the AI will continue to prompt for correct credentials.

## 2. Future Tags

The system is designed to accommodate additional action-triggering tags in the future, such as `[[REPORT]]`, which will follow a similar parsing and action execution pattern.
