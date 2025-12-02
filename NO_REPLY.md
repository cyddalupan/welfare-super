# AI No-Reply Bug Investigation

This document outlines the debugging process for the issue where the AI does not stop replying after an `[[ADMIN]]` tag is introduced during a 10-second auto-refresh, requiring a manual page refresh to take effect.

## 1. Core Problem

The primary issue is that the AI disablement mechanism, triggered by an `[[ADMIN]]` tag, is not working in real-time within the same user session. The disablement only activates after a full page reload.

**User Observation:**
- An `[[ADMIN]]` tag is added to the chat history from an external source (e.g., the admin panel).
- The applicant's chat interface refreshes every 10 seconds, and the new message containing `[[ADMIN]]` is visibly loaded into the chat history.
- When the applicant sends their next message, the AI still replies, indicated by the "Typing..." status appearing immediately.
- The AI only stops replying after a manual F5 page refresh.

This proves that the logic works on initial load (`ngOnInit`) but fails during the background refresh (`complaintCheckInterval`).

## 2. Code Paths and Flow Analysis

The intended flow for the 10-second refresh is as follows:

1.  `complaintCheckInterval` (every 10 seconds) triggers `loadChatHistory()`.
    - **File:** `src/app/chat/chat.ts`
2.  `loadChatHistory()` calls `databaseService.getChatHistory()`.
    - **File:** `src/app/chat/chat.ts`
3.  `getChatHistory()` fetches the latest 20 messages from the database. The `timestamp` field is crucial.
    - **File:** `src/app/database.service.ts`
    - **SQL Query:** `GET_APPLICANT_CHAT_HISTORY` (`SELECT message, sender, timestamp FROM chats_chat ...`)
4.  `loadChatHistory()` then calls `updateAiEnabledUntilFromHistory(history)` with the new data.
    - **File:** `src/app/chat/chat.ts`
5.  `updateAiEnabledUntilFromHistory()` is supposed to:
    a. Iterate through the `history` array.
    b. Find any message with `[[ADMIN]]` in its `content`.
    c. Check if its `timestamp` is within the last 10 minutes.
    d. If it is, calculate a future disablement time (`aiEnabledUntil`).
    e. Update the component's `this.aiEnabledUntil` property and persist it to the database.
6.  When the user sends their next message, `sendMessage()` should check `this.aiEnabledUntil` and block the AI call.

**The failure occurs within Step 5.** The logs have shown that even when the `history` array contains a recent `[[ADMIN]]` message, the logic inside `updateAiEnabledUntilFromHistory` fails to detect it and update the state.

## 3. Issues, Hypotheses, and Fixes Attempted

We have cycled through several hypotheses and applied fixes, systematically addressing potential bugs.

### Issue 1: Race Condition on Initial Load
- **Hypothesis:** `loadChatHistory` was not `await`ed in `ngOnInit`, allowing other processes to run before the initial `aiEnabledUntil` state was set from history.
- **Fix Applied:** `ngOnInit` was refactored to `await` all initial data loading methods (`loadAiEnabledUntilStatus`, `loadChatHistory`, `loadEmployeeMemories`). This ensures a sequential, predictable startup.

### Issue 2: Unreliable Side-Effects in `.map()`
- **Hypothesis:** The original logic performed the `aiEnabledUntil` calculation inside the `.map()` function in `loadChatHistory`. This is bad practice and can be unreliable.
- **Fix Applied:** The logic was isolated into its own dedicated method, `updateAiEnabledUntilFromHistory`. `processMessageContent` was refactored to only strip tags for display.

### Issue 3: Timezone Mismatch (The `+ 'Z'` Bug)
- **Hypothesis:** Database timestamps (naive, local server time) were being parsed as UTC by adding `'Z'`, causing incorrect time difference calculations.
- **Log Proof:** The user provided logs showing a server time of `~23:52` and a browser time of `~13:55` the next day. The `+ 'Z'` bug would cause the code to misinterpret the server time by many hours.
- **Fix Applied:**
    1.  The `+ 'Z'` was removed from the `new Date()` constructor in `updateAiEnabledUntilFromHistory`, ensuring the database timestamp string is parsed in the browser's local timezone.
    2.  The `database.service.ts` was updated with a `formatLocalToMySQLDatetime` helper to ensure dates sent *to* the database are also consistently formatted as local time strings, preventing ambiguity.

### Issue 4: Flawed "Recent Message" Condition
- **Hypothesis:** The condition `timeDiffMinutes < 10` was logically incorrect for checking if a message was "within the last 10 minutes."
- **Fix Applied:** The condition inside `updateAiEnabledUntilFromHistory` was corrected to be `timeDiffMinutes >= 0 && timeDiffMinutes <= ADMIN_AI_DISABLE_DURATION_MINUTES`.

### Issue 5: State Overwriting by Stale History (Race Condition)
- **Hypothesis:** A `loadChatHistory` call from the 10-second refresh could fetch stale data (missing a newly sent `[[ADMIN]]` message) and overwrite the valid in-memory `aiEnabledUntil` with `null`.
- **Fix Applied:** The logic in `updateAiEnabledUntilFromHistory` was made more robust. It now calculates the latest time from history, and only updates the component's `this.aiEnabledUntil` if the new time is later than the current one, preventing premature nullification.

## 4. The Unresolved Mystery & The Final Diagnostic Step (Updated)

Despite all the above fixes being implemented in the code, the `[[ADMIN]]` tag was still not correctly triggering the AI disablement. Extensive logging was added throughout the frontend to trace the exact state of chat messages, particularly their content and timestamps, as they passed through the system.

**Initial Hypothesis Disproven:**
The original hypothesis that the `message.timestamp` property was `null`, `undefined`, or "falsy" was disproven by detailed logging. It was confirmed that messages consistently had valid timestamp strings.

**Key Findings from Detailed Logging:**
1.  **`[[ADMIN]]` Tag Retrieval:** It was definitively confirmed that `[[ADMIN]]` tags (e.g., "ano ba yun [[ADMIN]]", "ok tol [[ADMIN]]") were correctly retrieved by `database.service.ts` from the PHP backend. The logs showed the raw message content including the `[[ADMIN]]` tag.
2.  **`[[ADMIN]]` Tag Detection in Frontend:** The `updateAiEnabledUntilFromHistory` function correctly detected the `[[ADMIN]]` tag within the `message.content` property using `includes()`.
3.  **Timestamp Parsing:** `new Date(message.timestamp.replace(' ', 'T'))` correctly parsed the timestamp string from the database into a `Date` object, and `timeDiffMinutes` was calculated accurately.

**The Actual Problem Identified:**
The logs revealed that even for newly sent messages containing `[[ADMIN]]`, the `timeDiffMinutes` (difference between the message's timestamp and the current system time) was significantly large (e.g., 14 hours / 840 minutes). This caused the condition `timeDiffMinutes <= ADMIN_AI_DISABLE_DURATION_MINUTES` (where `ADMIN_AI_DISABLE_DURATION_MINUTES` is `10` minutes) to consistently evaluate to `false`.

Consequently, the AI disablement logic correctly determined that the `[[ADMIN]]` message was "NOT recent," and therefore, `this.aiEnabledUntil` was not updated, allowing the AI to continue replying.

## 5. Root Cause Identified and Frontend Solutions

### 5.1 Root Cause: Database Timestamp Discrepancy

The primary issue preventing the `[[ADMIN]]` tag from disabling the AI is a **discrepancy in timestamping at the database level**. Newly inserted chat messages using `NOW()` (or equivalent) are being recorded with timestamps that are significantly in the past (e.g., 14 hours prior) compared to the actual current time.

*   **Impact:** Even when a new message with `[[ADMIN]]` is sent, its recorded database timestamp makes it appear "too old" to the frontend's recency check, preventing AI disablement.
*   **Resolution (Backend/Database):** This issue requires investigation into the database server's time configuration, its timezone settings, and how the `NOW()` function behaves when inserting data. The database must record timestamps accurately reflecting the current time.

### 5.2 Frontend Solutions Implemented

While the root cause lies in the backend/database, several improvements were made to the frontend to ensure robust handling of action tags and a clear separation of data from display:

*   **`ChatMessage` Interface Refinement (`src/app/schemas.ts`):**
    *   The `ChatMessage` interface was confirmed to use its `content` property to store the raw message string, including all action tags (e.g., `[[ADMIN]]`, `[[MEMORY]]`, `[[REPORT]]`). This ensures the full, unstripped content is always available for internal logic.
*   **Action Tag Hiding for UI (`src/app/chat/chat.ts`, `src/app/chat/chat.html`):**
    *   The `processMessageContent` function was refactored to take the raw message `content` (string) and return a *new string* with all action tags *removed* (i.e., replaced with an empty string `''`). This ensures the tags are completely invisible in the rendered HTML.
    *   `chat.html` was updated to use `[innerHTML]="processMessageContent(message.content)"` to render messages, thereby displaying the cleaned content.
    *   Any corresponding CSS rules (`.hide-tag`) previously intended for visual hiding were removed as they became unnecessary.
*   **AI Service Logging (`src/app/ai.service.ts`):**
    *   Temporary diagnostic logs were added to `AiService.callAi()` to trace payload and responses, then removed after confirming the AI service call itself was not the primary issue.
*   **Comprehensive Debug Log Removal:** All extensive debug `console.log` statements added throughout `src/app/chat/chat.ts` and `src/app/database.service.ts` during the investigation were removed to clean up the codebase.

*   **Client-Side Timestamp Generation (`src/app/queries.ts`, `src/app/database.service.ts`, `src/app/chat/chat.ts`, `src/app/admin/pages/manual-chat/manual-chat.ts`):**
    *   To counteract the database timestamp discrepancy, the application was modified to generate timestamps on the frontend (client-side) and explicitly send them to the database.
    *   The `INSERT_APPLICANT_CHAT_MESSAGE` query in `src/app/queries.ts` was updated to accept a timestamp parameter instead of relying on `NOW()`.
    *   `database.service.ts`'s `saveChatMessage` method was updated to accept and pass this frontend-generated timestamp to the query, and `formatLocalToMySQLDatetime` was made public.
    *   Both `ChatComponent` and `ManualChatComponent` (for admin messages) were updated to generate a new `Date()` object and format it using `databaseService.formatLocalToMySQLDatetime()` before including it in the `ChatMessage` object for saving.
    *   This ensures that the timestamp recorded in the database accurately reflects the time the message was sent from the user's or admin's application, thereby resolving the "not recent" issue for `[[ADMIN]]` tags.

These frontend changes ensure the system correctly processes and displays messages, and is prepared to disable the AI once the underlying timestamp issue is resolved.