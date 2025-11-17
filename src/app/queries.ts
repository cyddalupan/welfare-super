// This file will be used to store all database queries for the application.
// Centralizing queries here helps in managing and reusing them across different services.

export const LOGIN_QUERY = 'SELECT id, agency_id FROM employee_employee WHERE last_name = ? AND passport_number = ?';

export const GET_ADMIN_USER_BY_EMAIL = 'SELECT * FROM admin_users WHERE email = ?';

// Employee CRUD Queries
export const GET_EMPLOYEES = 'SELECT id, first_name, last_name, passport_number, country, main_status FROM employee_employee ORDER BY last_name, first_name';
export const GET_EMPLOYEE_BY_ID = 'SELECT * FROM employee_employee WHERE id = ?';
export const CREATE_EMPLOYEE = `
  INSERT INTO employee_employee (
    first_name, middle_name, last_name, passport_number, date_of_birth, address,
    phone_number, email, is_support, token, user_id, date_deployment, fra_id,
    main_status, applicant_type, created_date_of_report, country, facebook,
    whatsapp, consistency_percentage, agency_id, emergency_contact_name,
    emergency_contact_phone
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
export const UPDATE_EMPLOYEE = `
  UPDATE employee_employee SET
    first_name = ?, middle_name = ?, last_name = ?, passport_number = ?,
    date_of_birth = ?, address = ?, phone_number = ?, email = ?, is_support = ?,
    token = ?, user_id = ?, date_deployment = ?, fra_id = ?, main_status = ?,
    applicant_type = ?, created_date_of_report = ?, country = ?, facebook = ?,
    whatsapp = ?, consistency_percentage = ?, agency_id = ?,
    emergency_contact_name = ?, emergency_contact_phone = ?
  WHERE id = ?
`;
export const DELETE_EMPLOYEE = 'DELETE FROM employee_employee WHERE id = ?';


export const GET_CHAT_HISTORY = 'SELECT message, sender FROM chats_chat WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 20';
export const INSERT_CHAT_MESSAGE = 'INSERT INTO chats_chat (employee_id, agency_id, message, sender, timestamp) VALUES (?, ?, ?, ?, NOW())';
export const INSERT_EMPLOYEE_MEMORY = 'INSERT INTO employee_employeememory (employee_id, note, created_at) VALUES (?, ?, NOW())';
export const GET_EMPLOYEE_MEMORIES = 'SELECT note FROM employee_employeememory WHERE employee_id = ? ORDER BY created_at ASC';

export const SELECT_OPEN_CASE_BY_EMPLOYEE_ID = `
  SELECT id, category, report, report_status
  FROM cases_case
  WHERE employee_id = ? AND report_status = 'open'
  ORDER BY date_reported DESC
  LIMIT 1
`;

export const INSERT_CASE = `
  INSERT INTO cases_case (
    employee_id, category, report, date_reported, updated_date, report_status
  ) VALUES (?, ?, ?, NOW(), NOW(), 'open')
`;

export const UPDATE_CASE_REPORT = `
  UPDATE cases_case
  SET report = ?, updated_date = NOW()
  WHERE id = ?
`;