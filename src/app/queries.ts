// This file will be used to store all database queries for the application.
// Centralizing queries here helps in managing and reusing them across different services.

export const LOGIN_APPLICANT_QUERY = 'SELECT id, agency_id FROM employee_employee WHERE last_name = ? AND passport_number = ?';

export const GET_ADMIN_USER_BY_EMAIL = 'SELECT * FROM admin_users WHERE email = ?';

// Employee CRUD Queries
export const GET_APPLICANTS = 'SELECT id, first_name, last_name, passport_number, country, main_status FROM employee_employee ORDER BY last_name, first_name';
export const GET_APPLICANT_BY_ID = 'SELECT * FROM employee_employee WHERE id = ?';
export const CREATE_APPLICANT = `
  INSERT INTO employee_employee (
    first_name, middle_name, last_name, passport_number, date_of_birth, address,
    phone_number, email, is_support, token, user_id, date_deployment, fra_id,
    main_status, applicant_type, created_date_of_report, country, facebook,
    whatsapp, consistency_percentage, agency_id, emergency_contact_name,
    emergency_contact_phone
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
export const UPDATE_APPLICANT = `
  UPDATE employee_employee SET
    first_name = ?, middle_name = ?, last_name = ?, passport_number = ?,
    date_of_birth = ?, address = ?, phone_number = ?, email = ?, is_support = ?,
    token = ?, user_id = ?, date_deployment = ?, fra_id = ?, main_status = ?,
    applicant_type = ?, created_date_of_report = ?, country = ?, facebook = ?,
    whatsapp = ?, consistency_percentage = ?, agency_id = ?,
    emergency_contact_name = ?, emergency_contact_phone = ?
  WHERE id = ?
`;
export const DELETE_APPLICANT = 'DELETE FROM employee_employee WHERE id = ?';

// FRA CRUD Queries
export const GET_FRAS = 'SELECT id, name, contact, address, country, agency_id FROM fra_fra ORDER BY name';
export const GET_FRA_BY_ID = 'SELECT * FROM fra_fra WHERE id = ?';
export const CREATE_FRA = `
  INSERT INTO fra_fra (
    name, contact, address, country, agency_id
  ) VALUES (?, ?, ?, ?, ?)
`;
export const UPDATE_FRA = `
  UPDATE fra_fra SET
    name = ?, contact = ?, address = ?, country = ?, agency_id = ?
  WHERE id = ?
`;
export const DELETE_FRA = 'DELETE FROM fra_fra WHERE id = ?';

export const GET_APPLICANT_STATUSES = 'SELECT DISTINCT main_status FROM employee_employee WHERE main_status IS NOT NULL AND main_status != "" ORDER BY main_status';


// Case CRUD Queries
export const GET_CASES = `
  SELECT
    cc.id,
    cc.employee_id,
    ee.first_name,
    ee.last_name,
    cc.category,
    cc.report,
    cc.date_reported,
    cc.updated_date,
    cc.report_status,
    cc.agency_id
  FROM cases_case cc
  JOIN employee_employee ee ON cc.employee_id = ee.id
  ORDER BY cc.date_reported DESC
`;

export const GET_CASE_BY_ID = `
  SELECT
    cc.id,
    cc.employee_id,
    ee.first_name,
    ee.last_name,
    cc.category,
    cc.report,
    cc.date_reported,
    cc.updated_date,
    cc.report_status,
    cc.agency_id
  FROM cases_case cc
  JOIN employee_employee ee ON cc.employee_id = ee.id
  WHERE cc.id = ?
`;

export const CREATE_CASE = `
  INSERT INTO cases_case (
    employee_id, category, report, date_reported, updated_date, report_status, agency_id
  ) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)
`;

export const UPDATE_CASE = `
  UPDATE cases_case SET
    employee_id = ?,
    category = ?,
    report = ?,
    report_status = ?,
    agency_id = ?,
    updated_date = NOW()
  WHERE id = ?
`;

export const DELETE_CASE = 'DELETE FROM cases_case WHERE id = ?';

export const INSERT_APPLICANT_HISTORY = `
  INSERT INTO applicant_history (applicant_id, remarks, attachment, created_at, status)
  VALUES (?, ?, ?, NOW(), ?)
`;


export const GET_APPLICANT_CHAT_HISTORY = 'SELECT message, sender FROM chats_chat WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 20';
export const INSERT_APPLICANT_CHAT_MESSAGE = 'INSERT INTO chats_chat (employee_id, agency_id, message, sender, timestamp) VALUES (?, ?, ?, ?, NOW())';
export const INSERT_APPLICANT_MEMORY = 'INSERT INTO employee_employeememory (employee_id, note, created_at) VALUES (?, ?, NOW())';
export const GET_APPLICANT_MEMORIES = 'SELECT note FROM employee_employeememory WHERE employee_id = ? ORDER BY created_at ASC';

export const SELECT_OPEN_CASE_BY_APPLICANT_ID = `
  SELECT id, category, report, report_status
  FROM cases_case
  WHERE employee_id = ? AND report_status = 'open'
  ORDER BY date_reported DESC
  LIMIT 1
`;

export const INSERT_CASE = `
  INSERT INTO cases_case (
    employee_id, agency_id, category, report, date_reported, updated_date, report_status
  ) VALUES (?, ?, ?, ?, NOW(), NOW(), 'open')
`;

export const UPDATE_CASE_REPORT = `
  UPDATE cases_case
  SET report = ?, updated_date = NOW(), report_status = 'open'
  WHERE id = ?
`;