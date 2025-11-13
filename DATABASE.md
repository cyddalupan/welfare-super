# Database Schema

This document outlines the database schema for the `expatcare` Django project. The table names are derived from the app and model names (e.g., `advance_aicategory`).

---

## `advance` App

### `advance_aicategory` Table
Stores configurations for different AI chat categories.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `category_name` | `CharField(100)` | The unique name of the category. |
| `welcome_message` | `TextField` | The initial message sent when this category is triggered. |
| `closing_message` | `TextField` | The concluding message for this category. |
| `role` | `CharField(500)` | The system role/prompt for the AI for this category. |
| `function_description` | `CharField(500)` | Description of the function to be called by the AI. |
| `param_one_name` | `CharField(100)` | Name of the first parameter for the AI function. |
| `param_one_desc` | `CharField(255)` | Description of the first parameter. |
| `param_one_enum` | `CharField(255)` | Comma-separated list of possible values for the first parameter. |
| `param_two_name` | `CharField(100)` | Name of the second parameter. |
| `param_two_desc` | `CharField(255)` | Description of the second parameter. |
| `param_two_enum` | `CharField(255)` | Enum values for the second parameter. |
| `param_three_name` | `CharField(100)` | Name of the third parameter. |
| `param_three_desc` | `CharField(255)` | Description of the third parameter. |
| `param_three_enum` | `CharField(255)` | Enum values for the third parameter. |
| `param_four_name` | `CharField(100)` | Name of the fourth parameter. |
| `param_four_desc` | `CharField(255)` | Description of the fourth parameter. |
| `param_four_enum` | `CharField(255)` | Enum values for the fourth parameter. |
| `updated_at` | `DateTimeField` | Timestamp of the last update. |

### `advance_setting` Table
Stores general-purpose settings for the application.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `name` | `CharField(255)` | The unique name of the setting. |
| `value` | `TextField` | The value of the setting. |
| `value_type` | `CharField(50)` | The data type of the value (e.g., 'str', 'int', 'bool'). |

---

## `cases` App

### `cases_case` Table
Stores case reports filed by employees.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `category` | `CharField(50)` | The category of the case (e.g., 'rape', 'unpaid_salary'). |
| `report` | `TextField` | The detailed report of the case. |
| `date_reported` | `DateTimeField` | Timestamp when the case was created. |
| `updated_date` | `DateTimeField` | Timestamp of the last update. |
| `report_status` | `CharField(15)` | The current status of the case (e.g., 'open', 'closed'). |
| `agency_id` | `ForeignKey` | Links to the `auth_user` table (the agency handling the case). |

### `cases_casecomment` Table
Stores comments made on cases, typically by admin or agency users.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `case_id` | `ForeignKey` | Links to the `cases_case` table. |
| `author_id` | `ForeignKey` | Links to the `auth_user` table (the user who made the comment). |
| `text` | `TextField` | The content of the comment. |
| `created_date` | `DateTimeField` | Timestamp when the comment was created. |

---

## `chats` App

### `chats_chat` Table
Logs all chat messages between employees and the AI/support.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `agency_id` | `ForeignKey` | Links to the `auth_user` table (the employee's agency). |
| `message` | `TextField` | The chat message content. |
| `sender` | `CharField(10)` | Who sent the message ('Employee' or 'AI'). |
| `is_support` | `BooleanField` | True if the message is part of a live support session. |
| `timestamp` | `DateTimeField` | Timestamp of the message. |

---

## `employee` App

### `employee_employee` Table
Stores information about the employees (applicants/OFWs). This is a central table.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `first_name` | `CharField(100)` | Employee's first name. |
| `middle_name` | `CharField(100)` | Employee's middle name. |
| `last_name` | `CharField(100)` | Employee's last name. |
| `passport_number` | `CharField(50)` | Employee's unique passport number. |
| `date_of_birth` | `DateField` | Employee's date of birth. |
| `address` | `CharField(255)` | Employee's address. |
| `phone_number` | `CharField(20)` | Employee's phone number. |
| `email` | `EmailField` | Employee's email address. |
| `is_support` | `BooleanField` | Flag indicating if the employee is currently in a live support chat. |
| `token` | `CharField(255)` | Authentication token for the employee. |
| `user_id` | `OneToOneField` | Links to the `auth_user` table, for employees who have a user account. |
| `date_deployment` | `DateField` | The date the employee was deployed. |
| `fra_id` | `ForeignKey` | Links to the `fra_fra` table (Foreign Recruitment Agency). |
| `main_status` | `CharField(50)` | The primary status of the employee (e.g., 'active', 'with_complain'). |
| `applicant_type` | `CharField(50)` | Type of applicant ('household' or 'skilled'). |
| `created_date_of_report` | `DateField` | Date a report was created for this employee. |
| `country` | `CountryField` | The country the employee is deployed to. |
| `facebook` | `URLField` | URL to the employee's Facebook profile. |
| `whatsapp` | `CharField(20)` | Employee's WhatsApp number. |
| `consistency_percentage` | `DecimalField` | AI-calculated score of statement consistency. |
| `agency_id` | `ForeignKey` | Links to the `auth_user` table (the employee's recruitment agency). |
| `emergency_contact_name` | `CharField(100)` | Name of the emergency contact. |
| `emergency_contact_phone` | `CharField(20)` | Phone number of the emergency contact. |

*Note: `EmployeeWithComplaints`, `EmployeeWithHearings`, etc., are proxy models and do not create separate database tables.*

### `employee_employeememory` Table
Stores notes or memories about an employee, saved by the AI or admin users.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `note` | `TextField` | The content of the memory/note. |
| `created_at` | `DateTimeField` | Timestamp when the memory was created. |

---

## `fra` App

### `fra_fra` Table
Stores information about Foreign Recruitment Agencies (FRAs).

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `name` | `CharField(255)` | Name of the FRA. |
| `contact` | `CharField(255)` | Contact person at the FRA. |
| `address` | `TextField` | Address of the FRA. |
| `country` | `CountryField` | Country where the FRA is located. |
| `agency_id` | `ForeignKey` | Links to the `auth_user` table (the local agency it partners with). |

---

## `reviewhub` App

### `reviewhub_statementoffact` Table
Stores formal "Statement of Fact" documents written by agency staff.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `title` | `CharField(255)` | The title of the document. |
| `content` | `TextField` | The main body of the statement. |
| `created_at` | `DateTimeField` | Timestamp of creation. |
| `updated_at` | `DateTimeField` | Timestamp of the last update. |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `creator_id` | `ForeignKey` | Links to the `auth_user` table (the staff member who wrote it). |
| `status` | `CharField(50)` | The workflow status of the document (e.g., 'draft', 'approved'). |
| `score` | `PositiveIntegerField` | AI-generated score based on adherence to rules. |
| `suggestion` | `TextField` | AI-generated suggestions for improvement. |

---

## `statement_of_facts` App

### `statement_of_facts_statementoffacts` Table
Stores AI-generated "Statement of Facts" summaries based on chat histories.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `generated_text` | `TextField` | The AI-generated summary text in Markdown format. |
| `emotion` | `CharField(50)` | The emotional tone used for generation (e.g., 'neutral', 'angry'). |
| `date_created` | `DateTimeField` | Timestamp of creation. |
| `date_updated` | `DateTimeField` | Timestamp of the last update. |
| `status` | `CharField(50)` | Status of the statement ('draft' or 'finalized'). |
| `consistency_analysis_included` | `BooleanField` | Flag if consistency analysis was performed. |
| `consistency_analysis` | `TextField` | The AI-generated consistency analysis text. |
| `ai_reference_link` | `URLField` | A reference link used during generation. |

---

## `support` App

### `support_chatsupport` Table
Manages live support tickets/sessions.

| Column | Type | Description |
|---|---|---|
| `id` | `BigAutoField` | Primary Key |
| `employee_id` | `ForeignKey` | Links to the `employee_employee` table. |
| `last_message` | `TextField` | The last message in the conversation before support was triggered. |
| `is_open` | `BooleanField` | True if the support ticket is currently open. |
| `created_date` | `DateTimeField` | Timestamp when the support session was initiated. |