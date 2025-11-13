```sql
-- This is a generic SQL script generated from the Django models.
-- The exact syntax may vary depending on your database (e.g., MySQL, PostgreSQL, SQLite).
-- This script assumes that the standard Django `auth_user` table already exists.

-- =================================================================
-- `advance` App
-- =================================================================

CREATE TABLE `advance_aicategory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category_name` VARCHAR(100) NOT NULL UNIQUE,
    `welcome_message` TEXT NULL,
    `closing_message` TEXT NULL,
    `role` VARCHAR(500) NOT NULL,
    `function_description` VARCHAR(500) NOT NULL,
    `param_one_name` VARCHAR(100) NULL,
    `param_one_desc` VARCHAR(255) NULL,
    `param_one_enum` VARCHAR(255) NULL,
    `param_two_name` VARCHAR(100) NULL,
    `param_two_desc` VARCHAR(255) NULL,
    `param_two_enum` VARCHAR(255) NULL,
    `param_three_name` VARCHAR(100) NULL,
    `param_three_desc` VARCHAR(255) NULL,
    `param_three_enum` VARCHAR(255) NULL,
    `param_four_name` VARCHAR(100) NULL,
    `param_four_desc` VARCHAR(255) NULL,
    `param_four_enum` VARCHAR(255) NULL,
    `updated_at` DATETIME NOT NULL
);

CREATE TABLE `advance_setting` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `value` TEXT NOT NULL,
    `value_type` VARCHAR(50) NOT NULL DEFAULT 'str'
);

-- =================================================================
-- `fra` App
-- =================================================================

CREATE TABLE `fra_fra` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `agency_id` INT NOT NULL,
    FOREIGN KEY (`agency_id`) REFERENCES `auth_user` (`id`)
);

-- =================================================================
-- `employee` App
-- =================================================================

CREATE TABLE `employee_employee` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `passport_number` VARCHAR(50) NOT NULL UNIQUE,
    `date_of_birth` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `is_support` BOOLEAN NOT NULL DEFAULT FALSE,
    `token` VARCHAR(255) NOT NULL,
    `user_id` INT NULL UNIQUE,
    `date_deployment` DATE NULL,
    `fra_id` BIGINT NULL,
    `main_status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `applicant_type` VARCHAR(50) NOT NULL DEFAULT 'household',
    `created_date_of_report` DATE NULL,
    `country` VARCHAR(2) NOT NULL,
    `facebook` VARCHAR(255) NULL,
    `whatsapp` VARCHAR(20) NULL,
    `consistency_percentage` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `agency_id` INT NOT NULL,
    `emergency_contact_name` VARCHAR(100) NOT NULL,
    `emergency_contact_phone` VARCHAR(20) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
    FOREIGN KEY (`fra_id`) REFERENCES `fra_fra` (`id`),
    FOREIGN KEY (`agency_id`) REFERENCES `auth_user` (`id`)
);

CREATE TABLE `employee_employeememory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT NOT NULL,
    `note` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`)
);

-- =================================================================
-- `cases` App
-- =================================================================

CREATE TABLE `cases_case` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `report` TEXT NOT NULL,
    `date_reported` DATETIME NOT NULL,
    `updated_date` DATETIME NOT NULL,
    `report_status` VARCHAR(15) NOT NULL DEFAULT 'open',
    `agency_id` INT NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`),
    FOREIGN KEY (`agency_id`) REFERENCES `auth_user` (`id`)
);

CREATE TABLE `cases_casecomment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `case_id` BIGINT NOT NULL,
    `author_id` INT NOT NULL,
    `text` TEXT NOT NULL,
    `created_date` DATETIME NOT NULL,
    FOREIGN KEY (`case_id`) REFERENCES `cases_case` (`id`),
    FOREIGN KEY (`author_id`) REFERENCES `auth_user` (`id`)
);

-- =================================================================
-- `chats` App
-- =================================================================

CREATE TABLE `chats_chat` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT NOT NULL,
    `agency_id` INT NOT NULL,
    `message` TEXT NOT NULL,
    `sender` VARCHAR(10) NOT NULL,
    `is_support` BOOLEAN NOT NULL DEFAULT FALSE,
    `timestamp` DATETIME NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`),
    FOREIGN KEY (`agency_id`) REFERENCES `auth_user` (`id`)
);

-- =================================================================
-- `reviewhub` App
-- =================================================================

CREATE TABLE `reviewhub_statementoffact` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `employee_id` BIGINT NOT NULL,
    `creator_id` INT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'new',
    `score` INT UNSIGNED NULL,
    `suggestion` TEXT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`),
    FOREIGN KEY (`creator_id`) REFERENCES `auth_user` (`id`)
);

-- =================================================================
-- `statement_of_facts` App
-- =================================================================

CREATE TABLE `statement_of_facts_statementoffacts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT NOT NULL,
    `generated_text` TEXT NOT NULL,
    `emotion` VARCHAR(50) NOT NULL,
    `date_created` DATETIME NOT NULL,
    `date_updated` DATETIME NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `consistency_analysis_included` BOOLEAN NOT NULL DEFAULT FALSE,
    `consistency_analysis` TEXT NOT NULL,
    `ai_reference_link` VARCHAR(200) NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`)
);

-- =================================================================
-- `support` App
-- =================================================================

CREATE TABLE `support_chatsupport` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT NOT NULL,
    `last_message` TEXT NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_date` DATETIME NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employee_employee` (`id`)
);

```
