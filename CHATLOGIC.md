# Chat Logic Documentation

This document outlines the core logic and workflow for the chat functionality within the `welfare-super` Angular application.

## 1. Chat Workflow and Authentication

### 1.1 Chat Initialization

The application's initial state is determined by the user's authentication status.

*   **User Session Check**: Upon initialization of the `ChatComponent`, the application checks `localStorage` for a stored `user_id`.
*   **Unauthenticated Users**:
    *   If no `user_id` is found, the user is considered unauthenticated.
    *   A static welcome message is displayed: "Welcome! To get started, please provide your last name and passport number so I can assist you."
    *   The chat then proceeds with the conversational authentication flow.
*   **Authenticated Users**:
    *   If a `user_id` is found, the user is considered authenticated.
    *   The application proceeds to load the user's chat history (see "Chat History and Persistence").

### 1.2 Conversational Authentication

The application employs a conversational authentication method to identify and log in users. This process is entirely managed by the Angular frontend.

*   **AI Prompting Strategy**:
    *   For unauthenticated users, the system prompt (`SYSTEM_PROMPT_LOGIN_ASSISTANT`) instructs the AI to prioritize gathering the user's last name and passport number.
    *   For authenticated users, the prompt switches to `SYSTEM_PROMPT_COMPLAINTS_ASSISTANT`.
    *   **Context Limit**: For every AI call, the payload includes the system prompt plus only the **10 most recent messages** from the conversation history.

*   **AI Response Tag Parsing**:
    *   The frontend parses AI responses for a `[[LOGIN, LASTNAME:"...",PASSPORT:"..."]]` tag.
    *   When this tag is detected, the `AuthService` is called to validate the credentials against the `employee_employee` table via the `api/database.php` endpoint.

*   **Login Result Handling**:
    *   **Successful Login**: If a matching user is found, the `user_id` is saved to `localStorage`. The current, unsaved conversation (the "logout conversation") is **cleared from the view**. The user's existing chat history is then fetched from the database and displayed.
    *   **Failed Login**: If no match is found, an error message is displayed, and the user remains in the unauthenticated flow.

## 2. Chat History and Persistence

*   **Storage**: All chat messages for authenticated users are stored in the `chats_chat` database table. Messages sent during an unauthenticated session are not saved.
*   **Saving Messages**: Once a user is authenticated, every message sent by the user or the assistant is saved to the `chats_chat` table. The `sender` column is populated with 'Employee' for user messages and 'AI' for assistant messages.
*   **Loading History**: When an authenticated user opens the chat, the **20 most recent messages** from their conversation history are fetched from the database and displayed.

## 3. Future Tags

The system is designed to accommodate additional action-triggering tags in the future, such as `[[REPORT]]`, which will follow a similar parsing and action execution pattern.