# Design Update Plan

This document outlines the plan for improving the readability and overall design of the application.

## Pages to Review:

### Root Level
- [ ] Home Page (ChatComponent - `/`)
- [ ] Admin Module Routes (accessed via `/admin`)

### Admin Module Pages
*   [x] Admin Login Page (AdminLoginComponent - `/admin/login`)
    *   **Objective**: Ensure the login form has a clear, modern, and readable design, consistent with the "glass-card" aesthetic mentioned in the `GEMINI.md` context.
    *   **Login Card**:
        *   [x] Confirm or apply the `.glass-card` styling to the `ion-card` to provide a consistent visual theme. This includes a semi-transparent background, `backdrop-filter` blur, and a subtle border.
        *   [x] Adjust padding and spacing within the card for better readability and a less cramped appearance.
    *   **Input Fields (`ion-input`)**:
        *   Ensure clear separation between the label and the input area.
        *   Verify that text input is highly readable against the card's background in both light and dark modes. Adjust text color if necessary.
        *   Consider adding a subtle hover/focus effect to inputs for better user feedback.
    *   **Login Button (`ion-button`)**:
        *   Ensure the button's background and text colors provide sufficient contrast for readability in both themes.
        *   Consider if the `ion-button` should also adopt a "glassy" appearance or if it should stand out as a primary action.
    *   **Error Message (`ion-text[color="danger"]`)**:
        *   Ensure the error message (`errorMessage`) is prominently displayed and easily readable. Confirm `color="danger"` provides good contrast.
*   [x] Admin Dashboard Page (AdminDashboardComponent - `/admin/dashboard`)
    *   **Objective**: Ensure the dashboard container is visually appealing and consistent with the overall application design, even though the content is external.
    *   **Dashboard Container (`div` with `glass-card`)**:
        *   [x] Confirm the `.glass-card` styling is correctly applied and enhances the visual presentation of the iframe.
        *   [x] Ensure the `iframe` within the `glass-card` container has a seamless integration, without visible borders or scrollbars unless necessary for the content. The `border-none` class is already present on the `iframe`, which is good.
        *   [x] Review the padding (`p-0`) and corner rounding (`rounded-xl`) to ensure they are aesthetically pleasing and consistent.
    *   **External Content**:
        *   Note that any design improvements *within* the dashboard (e.g., charts, tables, text readability) would require modifications to the `https://welfare.reviewcenterphil.com/api/dashboard.php` file, which is outside the scope of this project. This should be communicated if a comprehensive redesign of the dashboard content is desired.
*   [x] Applicant List Page (ApplicantListComponent - `/admin/applicants`, `/admin/applicants/status/:status`)
    *   **Objective**: Enhance readability and user experience for managing applicant data. Ensure a clean, organized, and responsive layout.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   [x] Confirm the header styling (title, buttons) is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   [x] Ensure "New Applicant" button is clearly visible and accessible.
    *   **Search Bar (`ion-searchbar`)**:
        *   [x] Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
        *   [x] Consider adding a subtle border or shadow to visually separate it from the content.
    *   **Loading Indicator (`ion-spinner`)**:
        *   [x] Ensure the loading message and spinner are visually clear and centrally located.
    *   **Applicant List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: The `ion-item-divider` and `ion-item` are acting like table headers and rows.
            *   [x] **Readability**: Improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` to enhance readability, especially for longer names or data.
            *   [x] **Hover/Focus States**: Add subtle hover/focus effects to `ion-item` for better interactivity.
            *   [x] **Text Overflow**: Ensure long text in `ion-label` (`h2`, `p`) is handled gracefully (e.g., ellipsis or wrapping) without breaking the layout.
            *   [x] **Status Badge**: Ensure the `ion-badge` for status is visually distinct and uses colors effectively to convey status (success, warning, danger).
        *   **Action Buttons (`ion-buttons`, `ion-button`, `a` tags for history)**:
            *   [x] **Icon Size/Clarity**: Ensure icons (`fa-solid fa-pen-to-square`, `fa-solid fa-trash`, `fa-solid fa-comments`, `fa-solid fa-file-lines`) are appropriately sized and clearly visible.
            *   [x] **Spacing**: Adjust spacing between action buttons for easier tapping/clicking.
            *   [x] **Consistency**: Ensure consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-item` for "No applicants found")**:
        *   [x] Ensure this message is clearly displayed and centered when no applicants are present.
*   [x] Applicant Form Page (ApplicantFormComponent - `/admin/applicants/new`, `/admin/applicants/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing applicant details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   [x] Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   [x] Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container (`ion-card` within `ion-grid`)**:
        *   [x] Apply the `.glass-card` styling to the `ion-card` to maintain consistency with the admin panel's aesthetic.
        *   [x] Review the responsiveness of the `ion-grid` (`size-xl`, `size-lg`, etc.) to ensure the form looks good on various screen sizes.
        *   [x] Adjust `ion-card-content` padding for optimal spacing of form elements.
    *   **Form Sections (`ion-card-title`, `ion-list`)**:
        *   [x] Ensure section titles (`ion-card-title`) are clear and visually distinct.
        *   [x] Review spacing between sections for better organization.
    *   **Input Fields (`ion-item`, `ion-input`, `ion-select`, `ion-textarea`)**:
        *   [x] **Apply Custom Styles or Reconcile**: The custom styles defined in `applicant-form.css` (`form-group`, `form-label`, `form-field`) are not currently applied to the Ionic components.
            *   **Option 1 (Recommended)**: Adapt the styling within `applicant-form.css` to target Ionic components directly (e.g., style `ion-item`, `ion-input`, `ion-select`, `ion-textarea` using their Shadow Parts or CSS Custom Properties) to achieve the desired "glassy" effect for inputs. This would ensure consistency while leveraging Ionic's components.
            *   **Option 2**: Apply the existing custom classes from `applicant-form.css` to `ion-item` or `ion-input` if Ionic's structure allows, but this might require overriding Ionic's default styles more aggressively.
        *   [x] **Labels and Placeholders**: Ensure labels are clearly associated with their inputs and placeholder text is legible.
        *   [x] **Readability**: Verify text input and selection options are highly readable in both light and dark modes.
        *   [x] **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Buttons (Cancel and Save)**:
        *   [x] Ensure the "Cancel" and "Save" buttons are clearly distinguishable and their styling (fill, color) is consistent with application-wide button guidelines.
        *   [x] The `[disabled]="applicantForm.invalid"` attribute on the "Save" button provides good user feedback.
*   [x] Applicant Complaints List Page (ApplicantComplaintsListComponent - `/admin/applicants/complaints`)
    *   **Objective**: Provide a clear and efficient interface for reviewing and managing applicants with complaints, ensuring easy identification of critical information.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm the header styling (title "Applicants with Complaints") is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
    *   **Search Bar (`ion-searchbar`)**:
        *   Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **Applicant List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: Similar to the general applicant list, improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` for enhanced readability.
            *   **Text Overflow**: Handle long text gracefully.
            *   **Status Badge**: Emphasize the `ion-badge` for status, ensuring it clearly highlights "complaint" statuses with appropriate and distinct colors (e.g., a more prominent warning/danger color than 'active').
            *   **Action Buttons**: Ensure icon size, clarity, and spacing are good. The "chat" icon (`fa-solid fa-comments`) specifically for complaint cases should be clearly visible and functional.
    *   **Empty State (`ion-item` for "No applicants found")**:
        *   Ensure this message is clearly displayed and centered when no applicants with complaints are present.
*   [x] Case List Page (CaseListComponent - `/admin/cases`)
    *   **Objective**: Provide a clear and efficient interface for reviewing and managing reported cases, ensuring easy identification of critical information.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm the header styling (title "Cases", "New Case" button) is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   Ensure "New Case" button is clearly visible and accessible.
    *   **Search Bar (`ion-searchbar`)**:
        *   Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **Case List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: Improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` for enhanced readability, similar to applicant lists.
            *   **Text Overflow**: Handle long text gracefully in `ion-label` (`h2`, `p`).
            *   **Status Badge**: Ensure the `ion-badge` for report status is visually distinct and uses colors effectively (e.g., 'open' in success, others in danger/warning).
        *   **Action Buttons (`ion-buttons`, `ion-button`)**:
            *   Ensure icon size, clarity, and spacing are good.
            *   Consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-item` for "No cases found")**:
        *   Ensure this message is clearly displayed and centered when no cases are present.
*   [x] Case Form Page (CaseFormComponent - `/admin/cases/new`, `/admin/cases/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing case details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container (`ion-card`)**:
        *   Apply the `.glass-card` styling to the `ion-card` to maintain consistency with the admin panel's aesthetic.
        *   Adjust `ion-card-content` padding for optimal spacing of form elements.
    *   **Input Fields (`ion-item`, `ion-input`, `ion-select`, `ion-textarea`)**:
        *   **Styling**: Apply consistent styling to all form fields to ensure a uniform appearance. Consider leveraging Ionic's CSS Custom Properties or Shadow Parts to achieve a desired "glassy" or modern input style that is consistent with the `.glass-card` aesthetic.
        *   **Labels and Placeholders**: Ensure labels are clearly associated with their inputs and placeholder text is legible.
        *   **Readability**: Verify text input and selection options are highly readable in both light and dark modes.
        *   **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Buttons (Cancel and Save)**:
        *   Ensure the "Cancel" and "Save" buttons are clearly distinguishable and their styling (fill, color) is consistent with application-wide button guidelines.
        *   The `[disabled]="caseForm.invalid"` attribute on the "Save" button provides good user feedback.
*   [x] FRA List Page (FraListComponent - `/admin/fras`)
    *   **Objective**: Provide a clear and efficient interface for managing Foreign Recruitment Agencies (FRAs), ensuring easy identification of critical information.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm the header styling (title "Foreign Recruitment Agencies", "New FRA" button) is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   Ensure "New FRA" button is clearly visible and accessible.
    *   **Search Bar (`ion-searchbar`)**:
        *   Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **FRA List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: Improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` for enhanced readability, consistent with other list views.
            *   **Text Overflow**: Handle long text gracefully in `ion-label` (`h2`, `p`).
        *   **Action Buttons (`ion-buttons`, `ion-button`)**:
            *   Ensure icon size, clarity, and spacing are good.
            *   Consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-item` for "No FRAs found")**:
        *   Ensure this message is clearly displayed and centered when no FRAs are present.
*   [x] FRA Form Page (FraFormComponent - `/admin/fras/new`, `/admin/fras/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing Foreign Recruitment Agency details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container (`ion-card`)**:
        *   Apply the `.glass-card` styling to the `ion-card` to maintain consistency with the admin panel's aesthetic.
        *   Adjust `ion-card-content` padding for optimal spacing of form elements.
    *   **Input Fields (`ion-item`, `ion-input`, `ion-select`, `ion-textarea`)**:
        *   **Styling**: Apply consistent styling to all form fields to ensure a uniform appearance. Consider leveraging Ionic's CSS Custom Properties or Shadow Parts to achieve a desired "glassy" or modern input style that is consistent with the `.glass-card` aesthetic.
        *   **Labels and Placeholders**: Ensure labels are clearly associated with their inputs and placeholder text is legible.
        *   **Readability**: Verify text input and selection options are highly readable in both light and dark modes.
        *   **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Buttons (Cancel and Save)**:
        *   Ensure the "Cancel" and "Save" buttons are clearly distinguishable and their styling (fill, color) is consistent with application-wide button guidelines.
        *   The `[disabled]="fraForm.invalid"` attribute on the "Save" button provides good user feedback.
*   [x] Referral List Page (ReferralListComponent - `/admin/referrals`)
    *   **Objective**: Provide a clear and efficient interface for managing referrals, ensuring easy identification of critical information.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm the header styling (title "Referrals", "New Referral" button) is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   Ensure "New Referral" button is clearly visible and accessible.
    *   **Search Bar (`ion-searchbar`)**:
        *   Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **Referral List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: Improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` for enhanced readability, consistent with other list views.
            *   **Text Overflow**: Handle long text gracefully in `ion-label` (`h2`, `p`).
        *   **Action Buttons (`ion-buttons`, `ion-button`)**:
            *   Ensure icon size, clarity, and spacing are good.
            *   Consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-item` for "No Referrals found")**:
        *   Ensure this message is clearly displayed and centered when no referrals are present.
*   [x] Referral Form Page (ReferralFormComponent - `/admin/referrals/new`, `/admin/referrals/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing referral details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container (`ion-card`)**:
        *   Apply the `.glass-card` styling to the `ion-card` to maintain consistency with the admin panel's aesthetic.
        *   Adjust `ion-card-content` padding for optimal spacing of form elements.
    *   **Input Fields (`ion-item`, `ion-input`)**:
        *   **Styling**: Apply consistent styling to all form fields to ensure a uniform appearance. Consider leveraging Ionic's CSS Custom Properties or Shadow Parts to achieve a desired "glassy" or modern input style that is consistent with the `.glass-card` aesthetic.
        *   **Labels and Placeholders**: Ensure labels are clearly associated with their inputs and placeholder text is legible.
        *   **Readability**: Verify text input and selection options are highly readable in both light and dark modes.
        *   **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Buttons (Cancel and Save)**:
        *   Ensure the "Cancel" and "Save" buttons are clearly distinguishable and their styling (fill, color) is consistent with application-wide button guidelines.
        *   The `[disabled]="referralForm.invalid"` attribute on the "Save" button provides good user feedback.
*   [x] User List Page (UserListComponent - `/admin/users`)
    *   **Objective**: Provide a clear and efficient interface for managing admin users.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm consistent header styling (title "Admin Users", "New User" button, `ion-menu-button`) with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   Ensure "New User" button is clearly visible and accessible.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **User List (`ion-list`, `ion-item`)**:
        *   **Readability**: Improve the alignment and spacing of elements within `ion-item` for enhanced readability.
            *   **Text Overflow**: Handle long names or emails gracefully in `ion-label` (`h2`, `p`).
        *   **Action Buttons (`ion-buttons`, `ion-button`)**:
            *   Ensure icon size, clarity, and spacing are good.
            *   Consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-card` for "No admin users found")**:
        *   Ensure this message is clearly displayed and centered. The use of `ion-card` for the empty state might be slightly inconsistent with `ion-item` for other empty lists; consider standardizing.
*   [x] User Form Page (UserFormComponent - `/admin/users/new`, `/admin/users/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing user details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container**:
        *   The form is directly within `ion-content`, without an `ion-card` wrapper like other forms. Consider wrapping the form in an `ion-card` to maintain visual consistency with other admin forms and leverage the `.glass-card` styling for a cohesive look.
        *   If not using `ion-card`, ensure adequate padding and spacing around the form elements.
    *   **Input Fields (`ion-item`, `ion-input`, `ion-select`)**:
        *   **Styling**: Apply consistent styling to all form fields to ensure a uniform appearance. Consider leveraging Ionic's CSS Custom Properties or Shadow Parts to achieve a desired "glassy" or modern input style.
        *   **Labels and Placeholders**: Ensure labels are clearly associated with their inputs and placeholder text is legible.
        *   **Readability**: Verify text input and selection options are highly readable in both light and dark modes.
        *   **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Button (Save User)**:
        *   Ensure the "Save User" button is clearly distinguishable and its styling (fill, color) is consistent with application-wide button guidelines.
        *   The `[disabled]="userForm.invalid"` attribute provides good user feedback.
*   [x] Announcement List Page (AnnouncementListComponent - `/admin/announcements`)
    *   **Objective**: Provide a clear and efficient interface for managing announcements, ensuring easy identification of active status and relevant details.
    *   **Header (`ion-header`, `ion-toolbar`)**:
        *   Confirm the header styling (title "Announcements", "New Announcement" button) is consistent with the `glass-toolbar` aesthetic or the new theme guidelines for headers.
        *   Ensure "New Announcement" button is clearly visible and accessible.
    *   **Search Bar (`ion-searchbar`)**:
        *   Ensure the search bar integrates well with the overall design, with clear placeholder text and good contrast for input.
    *   **Loading Indicator (`ion-spinner`)**:
        *   Ensure the loading message and spinner are visually clear and centrally located.
    *   **Announcement List (`ion-list`, `ion-item-divider`, `ion-item`)**:
        *   **Table-like Structure**: Improve the alignment and spacing of columns within `ion-item-divider` and `ion-item` for enhanced readability.
            *   **Message Preview**: The `slice:0:50` for `announcement.message` is good for a preview. Ensure the full message is accessible upon editing.
            *   **Active Toggle (`ion-toggle`)**: Ensure the toggle's appearance is clear and intuitive, indicating its state (on/off). Its interaction should be smooth.
            *   **Date Display**: Ensure `created_at` and `updated_at` dates are formatted consistently and are easily readable.
        *   **Action Buttons (`ion-buttons`, `ion-button`)**:
            *   Ensure icon size, clarity, and spacing are good.
            *   Consistency in button styling (fill, color) across all actions.
    *   **Empty State (`ion-item` for "No announcements found")**:
        *   Ensure this message is clearly displayed and centered when no announcements are present.
*   [x] Announcement Form Page (AnnouncementFormComponent - `/admin/announcements/new`, `/admin/announcements/edit/:id`)
    *   **Objective**: Create a clear, intuitive, and visually consistent form for managing announcement details. Ensure all input fields are easy to read, interact with, and that validation feedback is clear.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` or theme guidelines.
        *   Confirm the back button and title are clearly visible and appropriately sized.
    *   **Form Container**:
        *   The form is directly within `ion-content`, similar to the User Form. Consider wrapping the form in an `ion-card` to maintain visual consistency with other admin forms and leverage the `.glass-card` styling for a cohesive look.
        *   If not using `ion-card`, ensure adequate padding and spacing around the form elements.
    *   **Input Fields (`ion-item`, `ion-textarea`, `ion-toggle`)**:
        *   **Styling**: Apply consistent styling to `ion-textarea` to ensure a uniform appearance with other text input fields. Consider leveraging Ionic's CSS Custom Properties or Shadow Parts to achieve a desired "glassy" or modern input style.
        *   **Labels and Placeholders**: Ensure labels (`labelPlacement="stacked"`) are clearly associated with their inputs and placeholder text is legible.
        *   **Readability**: Verify text input is highly readable in both light and dark modes.
        *   **Toggle (`ion-toggle`)**: Ensure the toggle's visual feedback for its active/inactive state is clear. Its placement with `justify="space-between"` is good for clarity.
        *   **Validation Feedback**: The `div` elements with `ion-text-danger` clearly display validation errors. Ensure these error messages are distinct and do not interfere with the form layout.
    *   **Action Buttons (Save and Cancel)**:
        *   Ensure the "Save" and "Cancel" buttons are clearly distinguishable and their styling (fill, color, `expand="block"`) is consistent with application-wide button guidelines.
        *   The `ion-spinner` within the "Save" button for loading feedback is a good practice.
*   [x] Manual Chat Page (ManualChatComponent - `/admin/manual-chat/:id`)
    *   **Objective**: Provide a clear and distinct chat interface for administrators to communicate with applicants, ensuring readability and ease of use in both light and dark modes. Maintain visual consistency with the main chat page where appropriate, but differentiate admin-sent messages.
    *   **Header (`ion-header`, `ion-toolbar`, `ion-back-button`, `ion-title`)**:
        *   Ensure consistent header styling with other admin pages, respecting `glass-toolbar` aesthetic or new theme guidelines.
        *   Confirm the title "Manual Chat with [Applicant Name]" is clearly visible.
    *   **Chat Bubbles (`admin-message-bubble`, `applicant-message-bubble`)**:
        *   **Objective**: Similar to the main chat, ensure chat bubble colors and text contrast are optimized for readability in both light and dark modes, but with distinct colors for admin and applicant messages.
        *   **Light Mode**:
            *   Admin bubbles (`admin-message-bubble`): Lighter background color, black text.
            *   Applicant bubbles (`applicant-message-bubble`): Lighter background color, black text.
        *   **Dark Mode**:
            *   Admin bubbles: Darker background color, white text.
            *   Applicant bubbles: Darker background color, white text.
        *   **Implementation Strategy**:
            1.  Adapt the Ionic theme variables (e.g., in `theme/variables.scss`) or create custom variables that adapt to light and dark modes for `admin-message-bubble` (tertiary color) and `applicant-message-bubble` (medium color) backgrounds and text.
            2.  Apply these theme-aware variables to the respective bubble classes in `manual-chat.css`.
            3.  Potentially adjust `box-shadow` and `border` for better visual integration.
    *   **Message Input Area (`ion-textarea`, `ion-button`)**:
        *   Ensure the `ion-textarea` for message input has clear placeholder text and good contrast for input.
        *   The send button (`ion-button`) should be clearly visible and styled consistently with other action buttons.
    *   **Loading Indicator**:
        *   Ensure the loading message and spinner are visually clear and centrally located.

## Proposed Design Adjustments:

*   [x] Home Page (ChatComponent - `/`)
    *   **Chat bubbles (User and Assistant)**:
        *   **Objective**: Improve readability by ensuring appropriate contrast and visual comfort in both light and dark modes.
        *   **Light Mode**:
            *   User bubbles: Lighter background color, black text.
            *   Assistant bubbles: Lighter background color, black text.
        *   **Dark Mode**:
            *   User bubbles: Darker background color, white text.
            *   Assistant bubbles: Darker background color, white text.
        *   **Implementation Strategy**:
            1.  Review Ionic's theme variables (e.g., in `theme/variables.scss`) to identify or create custom variables that adapt to light and dark modes for chat bubble backgrounds and text.
            2.  Apply these theme-aware variables to `.user-message-bubble` and `.assistant-message-bubble` in `chat.css`.
            3.  Potentially adjust `box-shadow` and `border` for better visual integration with the new colors.