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
    *   The frontend parses AI responses for specific "AI Action Tags".
    *   Currently, this includes the `[[LOGIN, LASTNAME:"...",PASSPORT:"..."]]` tag for authentication and the `[[MEMORY:"..."]]` tag for storing user memories.
    *   When a `[[LOGIN, LASTNAME:"...",PASSPORT:"..."]]` tag is detected, the `AuthService` is called to validate the credentials against the `employee_employee` table via the `api/database.php` endpoint.
    *   When this tag is detected, the `AuthService` is called to validate the credentials against the `employee_employee` table via the `api/database.php` endpoint.

*   **Login Result Handling**:
    *   **Successful Login**: If a matching user is found, the `user_id` is saved to `localStorage`. The current, unsaved conversation (the "logout conversation") is **cleared from the view**. The user's existing chat history is then fetched from the database and displayed.
    *   **Failed Login**: If no match is found, an error message is displayed, and the user remains in the unauthenticated flow.

## 2. Chat History and Persistence

*   **Storage**: All chat messages for authenticated users are stored in the `chats_chat` database table. Messages sent during an unauthenticated session are not saved.
*   **Saving Messages**: Once a user is authenticated, every message sent by the user or the assistant is saved to the `chats_chat` table. The `sender` column is populated with 'Employee' for user messages and 'AI' for assistant messages.
*   **Loading History**: When an authenticated user opens the chat, the **20 most recent messages** from their conversation history are fetched from the database and displayed.

## 3. AI Action Tags

The system utilizes special "AI Action Tags" within AI responses to trigger specific frontend actions or convey structured information. These tags are designed to be parsed and processed by the frontend and are generally not displayed directly to the user.

The system is designed to accommodate additional action-triggering tags in the future, such as `[[REPORT]]`, which will follow a similar parsing and action execution pattern.

### 3.1 AI Memory Tag

To enable the AI to store and retrieve key information about the user, a special tagging mechanism called "AI Memory Tag" is introduced.

*   **Tag Format**: `[[MEMORY:"<memory_content>"]]`
    *   `<memory_content>`: A single sentence description of a user's characteristic or a new piece of factual information learned about the user.
    *   Example: `[[MEMORY:"graduated as a nurse"]]`
*   **Purpose**: The AI will use this tag to communicate new memories to the frontend for storage in the `employee_employeememory` database table.
*   **UI Display**: Any content within an `[[MEMORY:"..."]]` tag in the AI's response **must not** be displayed in the chat UI. The frontend is responsible for parsing and removing these tags before rendering the AI's message.
*   **Duplication**: The AI will be instructed to only generate `[[MEMORY]]` tags for *new* information, avoiding duplication of existing memories.

### 3.2 AI Report Tag

To enable the AI to initiate a formal case report for serious complaints, a special tagging mechanism called "AI Report Tag" is introduced.

*   **Tag Format**: `[[REPORT]]`
*   **Purpose**: When the AI detects a serious complaint from the user and has gathered sufficient details, it will include this tag in its response. The `ChatComponent` will parse this tag and trigger the case reporting workflow via the `CaseService`.
*   **Workflow**:
    *   The `ChatComponent` detects the `[[REPORT]]` tag.
    *   It calls `CaseService.handleReportCreation()`, passing the employee ID and relevant chat history.
    *   The `CaseService` checks for existing open cases for the employee.
    *   It then uses a separate AI call (with `SYSTEM_PROMPT_REPORT_GENERATOR`) to either create a new report or update an existing one based on the chat history.
    *   During this process, the `CaseService` sends step-by-step status updates back to the `ChatComponent`, which are displayed to the user in the chat interface.
*   **UI Display**: The `[[REPORT]]` tag itself is not displayed in the chat UI. The frontend is responsible for parsing and removing this tag before rendering the AI's message, and instead displays the status messages from the reporting workflow.

## 4. Relevant Chat Code Locations

*   **Chat Component**: `src/app/chat/chat.ts`
*   **AI Service**: `src/app/ai.service.ts`
*   **Prompts**: `src/app/prompts.ts`
*   **Authentication Service**: `src/app/auth.service.ts`