// This file will be used to store all database queries for the application.
// Centralizing queries here helps in managing and reusing them across different services.

export const LOGIN_QUERY = 'SELECT id, agency_id FROM employee_employee WHERE last_name = ? AND passport_number = ?';

export const GET_CHAT_HISTORY = 'SELECT message, sender FROM chats_chat WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 20';
export const INSERT_CHAT_MESSAGE = 'INSERT INTO chats_chat (employee_id, agency_id, message, sender, timestamp) VALUES (?, ?, ?, ?, NOW())';