# Admin Chat Functionality

This document details the manual chat functionality available to administrators, specifically focusing on how administrators can interact directly with applicants and manage the AI's auto-reply behavior.

## Overview

Administrators can initiate a manual chat with an applicant, particularly those marked with a "complaint" status. This feature allows direct communication with the applicant, bypassing the AI's automated responses for a temporary period.

## Accessing Admin Chat

The manual chat interface is accessible from the "Applicants" list in the admin panel:

*   **Location**: `Admin Panel > Applicants` (`/admin/applicants`)
*   **Trigger**: A chat icon button (`<ion-icon name="chatbubbles-outline"></ion-icon>`) appears next to an applicant's entry in the list if their `main_status` indicates a complaint.
*   **Condition**: The button is displayed when `app.main_status` contains the word "complaint" (case-insensitive).
    *   **Code Reference**: [`src/app/admin/pages/applicant-list/applicant-list.html`](src/app/admin/pages/applicant-list/applicant-list.html)
    ```html
            <ion-button *ngIf="app.main_status && app.main_status.toLowerCase().includes('complaint')" [routerLink]="['/admin/manual-chat', app.id]" fill="clear" color="primary">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </ion-button>
    ```
*   **Route**: Clicking the button navigates to the manual chat page for that specific applicant.
    *   **Route Definition**: `/admin/manual-chat/:id`
    *   **Code Reference**: [`src/app/admin/admin.module.ts`](src/app/admin/admin.module.ts#L59)

## Admin Chat Interface (`ManualChatComponent`)

This component provides the interface for administrators to view an applicant's chat history and send messages.

*   **Component Files**:
    *   [`src/app/admin/pages/manual-chat/manual-chat.ts`](src/app/admin/pages/manual-chat/manual-chat.ts)
    *   [`src/app/admin/pages/manual-chat/manual-chat.html`](src/app/admin/pages/manual-chat/manual-chat.html)
    *   [`src/app/admin/pages/manual-chat/manual-chat.css`](src/app/admin/pages/manual-chat/manual-chat.css)
*   **Functionality**:
    *   **Applicant Details**: Fetches and displays the applicant's name in the header.
        *   **Code Reference**: [`src/app/admin/pages/manual-chat/manual-chat.ts`](src/app/admin/pages/manual-chat/manual-chat.ts#L41-L46,L65-L67) (methods `ngOnInit` and `loadApplicantDetails`)
    *   **Chat History Display**: Presents the conversation history. For the administrator's view, messages sent by the applicant appear on the left, and messages sent by the admin (or previous AI responses) appear on the right.
        *   **Code Reference**: [`src/app/admin/pages/manual-chat/manual-chat.html`](src/app/admin/pages/manual-chat/manual-chat.html#L14-L19)
        ```html
          <div *ngFor="let message of messages" class="flex mb-4" [class.justify-end]="message.role === 'assistant'" [class.justify-start]="message.role === 'user'">
            <div class="p-3 rounded-lg max-w-[70%]"
                 [class.admin-message-bubble]="message.role === 'assistant'"
                 [class.applicant-message-bubble]="message.role === 'user'">
              <div class="chat-message-content" [innerHTML]="message.content"></div>
            </div>
          </div>
        ```
        *   **Styling**: [`src/app/admin/pages/manual-chat/manual-chat.css`](src/app/admin/pages/manual-chat/manual-chat.css#L42-L56)
    *   **Sending Messages**: Administrators can type and send messages. This action triggers the AI disablement for the applicant.

## AI Auto-Reply Disablement

A key feature of the admin chat is the ability to temporarily disable the AI's auto-reply for a specific applicant when an administrator manually intervenes. This ensures that the applicant receives direct human communication without interference from the AI.

*   **Trigger**: When an administrator sends a message from the `ManualChatComponent`. **There is no separate button for disabling the AI; this action occurs automatically upon sending a message.**
*   **Mechanism**:
    1.  **Save Admin Message**: The message sent by the admin is saved to the chat history.
        *   **Note**: Admin messages are internally tagged with `[[ADMIN]]` for identification, but this tag is not displayed in the chat UI.
        *   **Code Reference**: [`src/app/admin/pages/manual-chat/manual-chat.ts`](src/app/admin/pages/manual-chat/manual-chat.ts#L100-L110) (method `sendMessage` calls `saveAdminMessageToDb`)
        *   **Database Service**: [`src/app/database.service.ts`](src/app/database.service.ts#L72-L75) (method `saveChatMessage`)
    2.  **Update AI Status**: Immediately after saving the message, the `ai_enabled_until` timestamp for the applicant is updated in the database to a point 10 minutes in the future.
        *   **Code Reference**: [`src/app/admin/pages/manual-chat/manual-chat.ts`](src/app/admin/pages/manual-chat/manual-chat.ts#L110, L129-L135) (within `saveAdminMessageToDb` using `concatMap`)
        *   **Database Service**: [`src/app/database.service.ts`](src/app/database.service.ts#L77-L80) (method `disableAiForApplicant`)
        *   **SQL Query**: [`src/app/queries.ts`](src/app/queries.ts#L113) (`UPDATE_AI_ENABLED_UNTIL`)
        *   **Schema**: [`src/app/schemas.ts`](src/app/schemas.ts#L34) (`Applicant` interface `ai_enabled_until`)
        *   **Database Schema**: [`DATABASE.md`](DATABASE.md) (`employee_employee` table `ai_enabled_until`)
*   **Applicant-Side Behavior**:
    *   The applicant's `ChatComponent` checks their `ai_enabled_until` status upon initialization and before sending each message.
    *   If `ai_enabled_until` is in the future, the `ChatComponent` will:
        *   Prevent calling the AI service.
        *   Display a message to the applicant indicating that the AI is temporarily paused and that a human team member is assisting.
    *   **Code Reference**: [`src/app/chat/chat.ts`](src/app/chat/chat.ts#L47-L61,L180-L200) (methods `ngOnInit` and `sendMessage`)
    *   **Fetching Status**: [`src/app/database.service.ts`](src/app/database.service.ts#L82-L85) (method `getApplicantAiEnabledUntil`)
    *   **SQL Query**: [`src/app/queries.ts`](src/app/queries.ts#L116) (`GET_APPLICANT_AI_ENABLED_UNTIL`)

This ensures that once an admin steps in, the AI politely steps aside for a defined period, allowing the human agent to take over the conversation seamlessly.
