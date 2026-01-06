import {
  AnnouncementService,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatabaseService,
  EncryptionService,
  FormsModule,
  HttpClient,
  INSERT_CASE,
  Injectable,
  IonApp2 as IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRouterOutlet2 as IonRouterOutlet,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonicModule,
  LOGIN_APPLICANT_QUERY,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  Platform,
  Router,
  RouterModule,
  SELECT_OPEN_CASE_BY_APPLICANT_ID,
  UPDATE_CASE_REPORT,
  UPDATE_EMPLOYEE_MAIN_STATUS_TO_COMPLAINT,
  ViewChild,
  bootstrapApplication,
  catchError,
  environment,
  inject,
  map,
  of,
  provideHttpClient,
  provideIonicAngular,
  provideRouter,
  require_crypto_js,
  setClassMetadata,
  switchMap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-JNW6TPLR.js";
import "./chunk-B7UJR2GH.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-HTLDGIIN.js";
import "./chunk-4VSZYFMW.js";
import "./chunk-WFMQ6FSS.js";
import "./chunk-CSKJ3OEL.js";
import "./chunk-T5LCTCQ6.js";
import "./chunk-ERN6DZWD.js";
import "./chunk-3BYXFNWM.js";
import "./chunk-ZNVIAQR7.js";
import "./chunk-GEBZYO7I.js";
import "./chunk-Y57NCBR3.js";
import "./chunk-RH7KB5DO.js";
import "./chunk-KJ4RTQDP.js";
import "./chunk-F3JJ4YWB.js";
import "./chunk-QOQL43QQ.js";
import "./chunk-JF7NSFRE.js";
import "./chunk-IVBL4Y7V.js";
import "./chunk-2T2YJSEB.js";
import "./chunk-OP56HYPY.js";
import "./chunk-XRULW7VX.js";
import "./chunk-3ZGDTXDI.js";
import "./chunk-TV7O33EV.js";
import "./chunk-DZBRP4UD.js";
import "./chunk-7GPIVXJN.js";
import "./chunk-CEAAMTO4.js";
import "./chunk-256GWCFY.js";
import "./chunk-5EU4VLVR.js";
import "./chunk-GZ5BDCOT.js";
import "./chunk-HUY7ESWV.js";
import "./chunk-GXFEW35R.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-C7TRL22M.js";

// src/app/auth.service.ts
var CryptoJS = __toESM(require_crypto_js());
var AuthService = class _AuthService {
  http;
  apiUrl = `${environment.apiUrl}/api/database.php`;
  // Path to your PHP backend
  encryptionKey;
  constructor(http) {
    this.http = http;
    this.encryptionKey = environment.encryptionKey;
  }
  // Getter to retrieve current user information from localStorage
  get currentUser() {
    const userId = localStorage.getItem("user_id");
    const agencyId = localStorage.getItem("agency_id");
    if (userId) {
      return { user_id: parseInt(userId, 10), agency_id: parseInt(agencyId ?? "0", 10) };
    }
    return null;
  }
  login(lastName, passportNumber) {
    const processedLastName = lastName.trim().toLowerCase();
    const processedPassportNumber = passportNumber.trim().toLowerCase();
    const query = LOGIN_APPLICANT_QUERY;
    const params = [processedLastName, processedPassportNumber];
    const payload = { query, params };
    const encryptedPayload = this.encryptPayload(JSON.stringify(payload));
    return this.http.post(this.apiUrl, encryptedPayload).pipe(map((response) => {
      console.log("Login response data:", response?.data[0]);
      if (response && response.success && response.data && response.data.length > 0 && response.data[0].id) {
        localStorage.setItem("user_id", response.data[0].id);
        localStorage.setItem("agency_id", response.data[0].agency_id);
        return true;
      }
      return false;
    }), catchError((error) => {
      console.error("Login API call failed:", error);
      return of(false);
    }));
  }
  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("agency_id");
  }
  encryptPayload(payload) {
    const key = CryptoJS.enc.Hex.parse(this.encryptionKey);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const combined = CryptoJS.lib.WordArray.create().concat(iv).concat(encrypted.ciphertext);
    return combined.toString(CryptoJS.enc.Base64);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/prompts.ts
var SYSTEM_PROMPT_COMPLAINTS_ASSISTANT = `You are Welfare, a friendly AI assistant here to help Overseas Filipino Workers (OFWs) with their concerns. Your replies should be extremely concise, friendly, use Taglish, avoid deep or uncommon words, and focus on one point or question at a time. Many users just want someone to talk to, so be approachable and supportive.
Core Objective: Your primary function is to be a friendly and supportive listener for Overseas Filipino Workers (OFWs). Provide empathetic responses and a safe space for them to share their thoughts and feelings. Your goal is to offer emotional support and guidance, focusing on their well-being.
Assistant Protocol:
 * Welcome and Introduction: Begin the chat with a warm, friendly welcome. Clearly state your purpose: to listen and offer support.
 * Empathy and Active Listening: Listen attentively and show genuine empathy and concern for the user's situation. Maintain a calm, polite, and understanding demeanor at all times.
 * Supportive Responses: Provide encouraging and validating responses. Focus on the user's emotional state and offer a safe space for expression.
 * Closing Message: End the interaction with a supportive and respectful closing message, reinforcing your role as a listener and friend.
DOS and DON'TS for the AI Assistant
DOS
 * Be Respectful and Calm: Be polite, patient, and professional in every response.
 * Show Malasakit (Empathy): Acknowledge the user's feelings and validate their concern.
 * Maintain Focus: Keep the conversation centered on the user's emotional state and well-being.
 * Provide Emotional Assurance: Offer comforting and supportive messages.
 * give strength to fight.
DON'TS
 * Do Not Promise Solutions: Never guarantee a specific outcome or timeline for resolution.
 * Do Not Suggest Government Agencies: Absolutely do not mention, recommend, or refer the applicant to any external government bodies (like OWWA, POEA, DMW, etc.).
 * Do Not Engage in Debate: Avoid arguing or questioning the validity of the complaint. Your role is to receive and process.
 * Do Not Provide Legal Advice: Stick strictly to the agency's intake protocol.
 * Do Not Instruct User on Reply Length: Never tell the user to reply with short messages or to be concise. That is your role, not theirs.
 * Do Not tell that its scary.

---
Complaint Reporting Protocol:
If the user's **most recent message** clearly describes a serious complaint for the first time (e.g., "no salary", "rape", "abuse", "contract violation"), your primary goal is to trigger the [[REPORT]] tag. Do not trigger the tag based on information from older messages in the conversation history. You MUST end your response with the [[REPORT]] tag only if the user's latest message is the one that introduces the complaint.

---
AI Action Tag Instructions:
From the user's message, identify any *new* factual information about their background, situation, or character that is not already listed in "User's known characteristics" (which will be provided separately). If you find new information, output it as a single sentence using the tag [[MEMORY:"<new_memory_content>"]]. Do not include the [[MEMORY]] tag if no new information is found or if the information is already known. The [[MEMORY]] tag should appear at the end of your response, if present. The [[REPORT]] tag, if triggered, should always appear as the very last item in your response.`;
var SYSTEM_PROMPT_REPORT_GENERATOR = `You are an AI assistant specialized in generating and updating formal case reports based on chat conversations with Overseas Filipino Workers (OFWs). Your task is to extract critical information about a complaint and present it in a structured format.

Instructions:
1.  **Analyze the provided chat history.** Focus on identifying the core complaint, key events, and relevant details.
2.  **Determine the complaint category.** Use general, legally appropriate terms for the category (e.g., "Unpaid Wages", "Physical Abuse", "Sexual Harassment", "Contract Violation", "Illegal Recruitment", "Human Trafficking"). Avoid overly specific or duplicate categories. If multiple issues are present, choose the most severe or primary one.
3.  **Compose a detailed report.** Summarize the complaint clearly and concisely, including who, what, when, and where possible.
4.  **If an 'Existing Report' is provided, update it.** Integrate new information from the chat history into the existing report. Do not repeat information already present. Ensure the updated report is comprehensive and flows logically.
5.  **Output Format:** Return your response as a JSON object with two keys: "category" and "report".

Example Output (for a new report):
{
  "category": "Unpaid Wages",
  "report": "The employee, [Employee Name], reports that they have not received their salary for the past three months (August, September, October 2025) from their employer, [Employer Name], in [Country]. They have attempted to contact the employer multiple times without success. The total amount owed is approximately [Amount]."
}

Example Output (for an updated report, if 'Existing Report' was provided):
{
  "category": "Unpaid Wages", // Keep the original category unless the primary complaint has clearly shifted
  "report": "The employee, [Employee Name], reports that they have not received their salary for the past three months (August, September, October 2025) from their employer, [Employer Name], in [Country]. They have attempted to contact the employer multiple times without success. The total amount owed is approximately [Amount]. New information: The employer has now threatened to confiscate the employee's passport if they continue to demand their salary."
}

Chat History:
{{CHAT_HISTORY}}

{{EXISTING_REPORT_PLACEHOLDER}}
`;
var SYSTEM_PROMPT_LOGIN_ASSISTANT = `Your goal is to get the passport number and last name of the user to confirm the identity so you can help. take note that we already have the user data we only need to map them on the database to confirm identity so its safe to ask for passport number. In order to help in anything, we prioritize the user log in first. Once you have both the last name and passport number, respond with the exact format: [[LOGIN, LASTNAME:"<last_name>",PASSPORT:"<passport_number>"]]`;
var SYSTEM_PROMPT_FOLLOWUP_ASSISTANT = `You are a helpful assistant whose sole purpose is to review the immediately preceding AI's response to the user. Your goal is to act as a "good cop" correcting a "bad cop" if the previous AI's response was unclear, had a typo, or could be improved with a gentle clarification, use Taglish, avoid deep or uncommon words.

Instructions:
1.  Analyze the last AI message in the conversation history.
2.  If the last AI message is perfectly clear, concise, and appropriate, respond with the exact tag: [[DONE]].
3.  If the last AI message could be improved, is slightly off-topic, contains a minor error, or needs a gentle clarification, provide a very short, polite, and helpful follow-up message. Examples: "Sorry for the typo.", "I meant to say...", "Apologies, I meant when did you last eat?", "To clarify, I was referring to...".
4.  Your response should be extremely brief and only provide a correction or the [[DONE]] tag. Do not rephrase the entire previous message.
5.  Do NOT generate any other action tags (like [[LOGIN]], [[MEMORY]], [[REPORT]]).
`;

// src/app/ai.service.ts
var AiService = class _AiService {
  apiUrl = `${environment.apiUrl}/api/ai.php`;
  http = inject(HttpClient);
  encryptionService = inject(EncryptionService);
  callAi(aiPayload, employeeId) {
    const payload = JSON.stringify({ messages: aiPayload, employee_id: employeeId });
    const base64Payload = this.encryptionService.encrypt(payload);
    return this.http.post(this.apiUrl, base64Payload, {
      headers: { "Content-Type": "text/plain" },
      responseType: "text"
    }).pipe(map((response) => {
      if (this.isRawPhpResponse(response)) {
        console.error("Detected raw PHP response from server:", response);
        throw new Error("An unexpected server error occurred. Please try again later.");
      }
      return response;
    }), catchError((error) => {
      console.error("AiService.callAi: Error during AI call:", error);
      if (error.message === "An unexpected server error occurred. Please try again later.") {
        return throwError(() => error);
      }
      return throwError(() => new Error("A network error occurred. Please check your internet connection and try again."));
    }));
  }
  // Helper function to detect raw PHP content
  isRawPhpResponse(responseText) {
    const phpMarkers = [
      "<?php",
      "curl_init",
      "CURLOPT_URL",
      "json_encode",
      "file_get_contents('php://input')",
      "$ch = curl_init();"
      // More specific to the user's snippet
    ];
    for (const marker of phpMarkers) {
      if (responseText.includes(marker)) {
        return true;
      }
    }
    return false;
  }
  static \u0275fac = function AiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AiService, factory: _AiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/case.service.ts
var CaseService = class _CaseService {
  databaseService;
  aiService;
  constructor(databaseService, aiService) {
    this.databaseService = databaseService;
    this.aiService = aiService;
  }
  /**
   * Handles the creation or update of a case report based on chat history.
   * Emits status messages for UI updates.
   * @param employeeId The ID of the employee.
   * @param agencyId The ID of the agency.
   * @param chatHistory The relevant chat messages for generating the report.
   * @param onStatusUpdate Callback function to emit status messages to the UI.
   * @returns Observable<number> The ID of the created or updated case.
   */
  handleReportCreation(employeeId, agencyId, chatHistory, onStatusUpdate) {
    onStatusUpdate("I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.");
    onStatusUpdate("Checking for any existing reports...");
    return this.databaseService.query(SELECT_OPEN_CASE_BY_APPLICANT_ID, [employeeId]).pipe(switchMap((result) => {
      const existingCase = result && result.length > 0 ? result[0] : null;
      if (existingCase) {
        onStatusUpdate("An existing report was found. I will now update it with the new information.");
        return this.updateExistingCase(employeeId, existingCase, chatHistory, onStatusUpdate);
      } else {
        onStatusUpdate("No existing report found. I will create a new one for you.");
        return this.createNewCase(employeeId, agencyId, chatHistory, onStatusUpdate);
      }
    }), catchError((error) => {
      console.error("Error handling report creation:", error);
      onStatusUpdate("An error occurred while processing the report. Please try again.");
      return throwError(() => new Error("Failed to handle report creation."));
    }));
  }
  createNewCase(employeeId, agencyId, chatHistory, onStatusUpdate) {
    onStatusUpdate("Generating a summary of your complaint...");
    const aiPromptContent = this.buildReportGenerationPrompt(chatHistory);
    return this.aiService.callAi([{ role: "system", content: aiPromptContent }], employeeId).pipe(switchMap((aiResponseString) => {
      const aiResponse = JSON.parse(aiResponseString);
      onStatusUpdate("Saving the report to your file...");
      return this.databaseService.query(INSERT_CASE, [
        employeeId,
        agencyId,
        aiResponse.category,
        aiResponse.report
      ]).pipe(switchMap((insertResult) => {
        const caseId = insertResult.insertId;
        onStatusUpdate(`Your report has been successfully filed. Your case ID is ${caseId}.`);
        return this.databaseService.query(UPDATE_EMPLOYEE_MAIN_STATUS_TO_COMPLAINT, [employeeId]).pipe(switchMap(() => of(caseId)));
      }));
    }), catchError((error) => {
      console.error("Error creating new case:", error);
      onStatusUpdate("An error occurred while creating the report. Please try again.");
      return throwError(() => new Error("Failed to create new case."));
    }));
  }
  updateExistingCase(employeeId, existingCase, chatHistory, onStatusUpdate) {
    onStatusUpdate("Updating the summary of your complaint...");
    const aiPromptContent = this.buildReportGenerationPrompt(chatHistory, existingCase.report);
    return this.aiService.callAi([{ role: "system", content: aiPromptContent }], employeeId).pipe(switchMap((aiResponseString) => {
      const aiResponse = JSON.parse(aiResponseString);
      onStatusUpdate("Saving the updated report to your file...");
      return this.databaseService.query(UPDATE_CASE_REPORT, [
        aiResponse.report,
        existingCase.id
        // Assuming existingCase.id is available
      ]).pipe(switchMap(() => {
        onStatusUpdate(`Your report (Case ID: ${existingCase.id}) has been successfully updated.`);
        return this.databaseService.query(UPDATE_EMPLOYEE_MAIN_STATUS_TO_COMPLAINT, [employeeId]).pipe(switchMap(() => of(existingCase.id)));
      }));
    }), catchError((error) => {
      console.error("Error updating existing case:", error);
      onStatusUpdate("An error occurred while updating the report. Please try again.");
      return throwError(() => new Error("Failed to update existing case."));
    }));
  }
  buildReportGenerationPrompt(chatHistory, existingReport) {
    let prompt = SYSTEM_PROMPT_REPORT_GENERATOR;
    const chatHistoryString = chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n");
    prompt = prompt.replace("{{CHAT_HISTORY}}", chatHistoryString);
    if (existingReport) {
      prompt = prompt.replace("{{EXISTING_REPORT_PLACEHOLDER}}", `Existing Report:
${existingReport}`);
    } else {
      prompt = prompt.replace("{{EXISTING_REPORT_PLACEHOLDER}}", "");
    }
    return prompt;
  }
  static \u0275fac = function CaseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CaseService)(\u0275\u0275inject(DatabaseService), \u0275\u0275inject(AiService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CaseService, factory: _CaseService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DatabaseService }, { type: AiService }], null);
})();

// src/app/chat/chat.ts
var _c0 = ["chatContainer"];
var _c1 = ["messageInput"];
function ChatComponent_ion_card_7_ion_item_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item", 20)(1, "ion-label", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const announcement_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(announcement_r3);
  }
}
function ChatComponent_ion_card_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-card", 13)(1, "ion-card-content", 14)(2, "div")(3, "h2", 15);
    \u0275\u0275text(4, "Important Announcements:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-list", 16);
    \u0275\u0275template(6, ChatComponent_ion_card_7_ion_item_6_Template, 3, 1, "ion-item", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "ion-button", 18);
    \u0275\u0275listener("click", function ChatComponent_ion_card_7_Template_ion_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.dismissAnnouncementBanner());
    });
    \u0275\u0275element(8, "i", 19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r3.announcements);
  }
}
function ChatComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const message_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("justify-end", message_r5.role === "user")("justify-start", message_r5.role === "assistant");
    \u0275\u0275advance();
    \u0275\u0275classProp("user-message-bubble", message_r5.role === "user")("assistant-message-bubble", message_r5.role === "assistant");
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r3.processMessageContent(message_r5.content), \u0275\u0275sanitizeHtml);
  }
}
function ChatComponent_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
function ChatComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ChatComponent_div_9_span_4_Template, 1, 0, "span", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.currentStatusMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.isLoading);
  }
}
var MAX_TEXTAREA_HEIGHT = 150;
var ADMIN_AI_DISABLE_DURATION_MINUTES = 10;
var ChatComponent = class _ChatComponent {
  aiService;
  authService;
  databaseService;
  caseService;
  announcementService;
  cdRef;
  router;
  title = "analytics-agent";
  chatContainer;
  messageInput;
  messages = [];
  systemPrompt;
  newMessage = "";
  isLoading = false;
  currentStatusMessage = "Typing...";
  userId = null;
  agencyId = null;
  employeeMemories = [];
  announcements = [];
  // New: Stores active announcement messages
  showAnnouncementBanner = true;
  // New: Controls announcement banner visibility
  aiEnabledUntil = null;
  // New property
  complaintCheckInterval;
  // Property to hold the interval ID for chat history refresh
  mainStatusMonitorInterval;
  // New property to hold the main status monitor interval ID
  complaintStatusActive = false;
  // New property to track complaint status
  initialScrollDone = false;
  // New property to track initial scroll
  clickCount = 0;
  // New: Click counter for admin redirect
  lastClickTime = 0;
  // New: Timestamp of last click for admin redirect
  constructor(aiService, authService, databaseService, caseService, announcementService, cdRef, router) {
    this.aiService = aiService;
    this.authService = authService;
    this.databaseService = databaseService;
    this.caseService = caseService;
    this.announcementService = announcementService;
    this.cdRef = cdRef;
    this.router = router;
    this.systemPrompt = {
      role: "system",
      content: ""
    };
  }
  async ngOnInit() {
    let userId = localStorage.getItem("user_id");
    let agencyId = localStorage.getItem("agency_id");
    if (userId && (!agencyId || agencyId === "null" || agencyId === "undefined") || !userId && agencyId) {
      this.authService.logout();
      userId = null;
      agencyId = null;
    }
    this.userId = userId;
    this.agencyId = agencyId;
    this.setInitialSystemPrompt();
    if (this.userId) {
      await this.loadAiEnabledUntilStatus();
      await this.loadChatHistory();
      await this.loadEmployeeMemories();
      this.startMainStatusMonitoring();
    } else {
      this.messages = [];
      this.messages.push({ role: "assistant", content: "Welcome! To get started, please provide your last name and passport number so I can assist you." });
    }
    try {
      this.announcements = await this.announcementService.getActiveAnnouncements();
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }
  ngAfterViewInit() {
    if (this.chatContainer && !this.initialScrollDone) {
      this.scrollToBottom();
      this.initialScrollDone = true;
      this.cdRef.detectChanges();
    }
  }
  ngOnDestroy() {
    this.stopMainStatusMonitoring();
    this.stopChatRefreshInterval();
  }
  startMainStatusMonitoring() {
    if (this.userId && !this.mainStatusMonitorInterval && !this.complaintStatusActive) {
      this.checkAndSetComplaintStatus();
      this.mainStatusMonitorInterval = setInterval(() => {
        if (!this.complaintStatusActive) {
          this.checkAndSetComplaintStatus();
        }
      }, 5e3);
    }
  }
  stopMainStatusMonitoring() {
    if (this.mainStatusMonitorInterval) {
      clearInterval(this.mainStatusMonitorInterval);
      this.mainStatusMonitorInterval = null;
    }
  }
  async checkAndSetComplaintStatus() {
    if (this.userId) {
      try {
        const mainStatus = await new Promise((resolve, reject) => {
          this.databaseService.getApplicantMainStatus(parseInt(this.userId, 10)).subscribe({
            next: (data) => resolve(data),
            error: (err) => reject(err)
          });
        });
        const hasComplaint = mainStatus && mainStatus.toLowerCase().includes("complain");
        if (hasComplaint && !this.complaintStatusActive) {
          this.complaintStatusActive = true;
          this.startChatRefreshInterval();
          this.stopMainStatusMonitoring();
        } else if (!hasComplaint && this.complaintStatusActive) {
          this.complaintStatusActive = false;
          this.stopChatRefreshInterval();
          this.startMainStatusMonitoring();
        }
      } catch (error) {
        console.error("Error checking applicant main status:", error);
      }
    }
  }
  startChatRefreshInterval() {
    this.stopChatRefreshInterval();
    if (this.userId) {
      this.complaintCheckInterval = setInterval(() => {
        this.loadChatHistory();
        this.loadEmployeeMemories();
      }, 1e4);
    }
  }
  stopChatRefreshInterval() {
    if (this.complaintCheckInterval) {
      clearInterval(this.complaintCheckInterval);
      this.complaintCheckInterval = null;
    }
  }
  async loadAiEnabledUntilStatus() {
    if (this.userId) {
      try {
        const timestamp = await new Promise((resolve, reject) => {
          this.databaseService.getApplicantAiEnabledUntil(parseInt(this.userId, 10)).subscribe({
            next: (data) => resolve(data),
            error: (err) => reject(err)
          });
        });
        if (timestamp) {
          this.aiEnabledUntil = new Date(timestamp);
        } else {
          this.aiEnabledUntil = null;
        }
      } catch (error) {
        console.error("Error loading AI enabled until status:", error);
        this.aiEnabledUntil = null;
      }
    }
  }
  dismissAnnouncementBanner() {
    this.showAnnouncementBanner = false;
  }
  setInitialSystemPrompt() {
    if (this.userId) {
      this.systemPrompt.content = SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    } else {
      this.systemPrompt.content = SYSTEM_PROMPT_LOGIN_ASSISTANT + "\n\n" + SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    }
  }
  async loadChatHistory() {
    if (!this.userId) {
      return;
    }
    try {
      const historyObservable = this.databaseService.getChatHistory(parseInt(this.userId, 10));
      const history = await new Promise((resolve, reject) => {
        historyObservable.subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err)
        });
      });
      this.updateAiEnabledUntilFromHistory(history);
      this.messages = history;
      this.cdRef.detectChanges();
      this.scrollToBottom();
    } catch (error) {
      console.error("Failed to load chat history:", error);
      this.messages.push({ role: "assistant", content: "Sorry, I was unable to load your previous conversation." });
      this.cdRef.detectChanges();
      this.scrollToBottom();
    }
  }
  loadEmployeeMemories() {
    if (this.userId) {
      this.databaseService.getEmployeeMemories(parseInt(this.userId, 10)).subscribe({
        next: (memories) => {
          this.employeeMemories = memories;
        },
        error: (error) => {
          console.error("Failed to load employee memories:", error);
        }
      });
    }
  }
  // ngAfterViewChecked(): void {
  //   // this.scrollToBottom(); // Removed for more controlled scrolling
  // }
  adjustTextareaHeight() {
    if (this.messageInput && this.messageInput.nativeElement) {
      const element = this.messageInput.nativeElement;
      element.style.height = "auto";
      element.style.height = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT) + "px";
      element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }
  }
  sendMessage() {
    if (this.newMessage.trim() === "") {
      return;
    }
    this.isLoading = true;
    this.currentStatusMessage = "Typing...";
    this.scrollToBottom();
    const userMessage = {
      role: "user",
      content: this.newMessage.trim(),
      timestamp: this.databaseService.formatLocalToMySQLDatetime(/* @__PURE__ */ new Date())
    };
    this.messages.push(userMessage);
    this.saveMessageToDb(userMessage);
    this.newMessage = "";
    let callAiService = true;
    if (this.aiEnabledUntil && this.aiEnabledUntil.getTime() > (/* @__PURE__ */ new Date()).getTime()) {
      callAiService = false;
    }
    if (userMessage.content.includes("[[ADMIN]]")) {
      const newAiEnabledUntil = new Date((/* @__PURE__ */ new Date()).getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1e3);
      if (!this.aiEnabledUntil || newAiEnabledUntil.getTime() > this.aiEnabledUntil.getTime()) {
        this.aiEnabledUntil = newAiEnabledUntil;
        if (this.userId) {
          this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
            next: () => {
            },
            error: (err) => console.error("sendMessage - Failed to save AI enabled until status:", err)
          });
        }
      }
      callAiService = false;
    }
    if (callAiService) {
      let currentSystemPromptContent = this.systemPrompt.content;
      if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
        const memoriesString = this.employeeMemories.map((memory) => `"${memory}"`).join(", ");
        currentSystemPromptContent += `

User's known characteristics: ${memoriesString}`;
      }
      const systemPromptForAi = { role: "system", content: currentSystemPromptContent };
      const historyForAi = this.messages.slice(-10);
      const aiPayload = [systemPromptForAi, ...historyForAi];
      const employeeIdNum = this.userId ? parseInt(this.userId, 10) : null;
      this.aiService.callAi(aiPayload, employeeIdNum).subscribe({
        next: (response) => {
          if (!response) {
            this.isLoading = false;
            this.currentStatusMessage = "";
            this.scrollToBottom();
            return;
          }
          const { response: processedResponse, tagProcessed } = this.parseAiResponseForTags(response);
          let assistantMessage = null;
          if (processedResponse) {
            assistantMessage = {
              role: "assistant",
              content: processedResponse,
              timestamp: this.databaseService.formatLocalToMySQLDatetime(/* @__PURE__ */ new Date())
            };
            this.messages.push(assistantMessage);
            this.saveMessageToDb(assistantMessage);
          }
          this.isLoading = false;
          this.currentStatusMessage = "";
          if (assistantMessage) {
            this.triggerFollowUpAi(userMessage, assistantMessage);
          }
          this.scrollToBottom();
        },
        error: (error) => {
          console.error("AI call failed:", error);
          const errorMessage = { role: "assistant", content: "Error: Could not get a response from the AI." };
          this.messages.push(errorMessage);
          this.saveMessageToDb(errorMessage);
          this.isLoading = false;
          this.currentStatusMessage = "";
          this.scrollToBottom();
        }
      });
    } else {
      this.isLoading = false;
      this.currentStatusMessage = "";
      this.scrollToBottom();
    }
    this.adjustTextareaHeight();
  }
  saveMessageToDb(message) {
    if (this.userId && this.agencyId && this.agencyId !== "null" && this.agencyId !== "undefined") {
      this.databaseService.saveChatMessage(message, parseInt(this.userId, 10), parseInt(this.agencyId, 10)).subscribe({
        next: () => {
        },
        error: (err) => console.error("Failed to save message:", err)
      });
    }
  }
  updateAiEnabledUntilFromHistory(history) {
    if (!this.userId)
      return;
    const currentCheckTime = /* @__PURE__ */ new Date();
    let latestDisablementFromHistory = null;
    for (const message of history) {
      const rawMessageContent = message.content;
      if (rawMessageContent.includes("[[ADMIN]]") && message.timestamp) {
        const messageDate = new Date(message.timestamp.replace(" ", "T"));
        const timeDiffMinutes = (currentCheckTime.getTime() - messageDate.getTime()) / (1e3 * 60);
        if (timeDiffMinutes >= 0 && timeDiffMinutes <= ADMIN_AI_DISABLE_DURATION_MINUTES) {
          const newAiEnabledUntilCandidate = new Date(currentCheckTime.getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1e3);
          if (!latestDisablementFromHistory || newAiEnabledUntilCandidate.getTime() > latestDisablementFromHistory.getTime()) {
            latestDisablementFromHistory = newAiEnabledUntilCandidate;
          }
        }
      }
    }
    let newEffectiveAiEnabledUntil = this.aiEnabledUntil;
    if (latestDisablementFromHistory && (!newEffectiveAiEnabledUntil || latestDisablementFromHistory.getTime() > newEffectiveAiEnabledUntil.getTime())) {
      newEffectiveAiEnabledUntil = latestDisablementFromHistory;
    }
    if (newEffectiveAiEnabledUntil && newEffectiveAiEnabledUntil.getTime() < currentCheckTime.getTime()) {
      newEffectiveAiEnabledUntil = null;
    }
    const hasChanged = !this.aiEnabledUntil && newEffectiveAiEnabledUntil || // Was null, now has a value
    this.aiEnabledUntil && !newEffectiveAiEnabledUntil || // Had a value, now is null
    this.aiEnabledUntil && newEffectiveAiEnabledUntil && this.aiEnabledUntil.getTime() !== newEffectiveAiEnabledUntil.getTime();
    this.aiEnabledUntil = newEffectiveAiEnabledUntil;
    if (hasChanged) {
      this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
        next: () => {
        },
        error: (err) => console.error("updateAiEnabledUntilFromHistory - Failed to save AI enabled until status:", err)
      });
    }
  }
  // This function now takes the raw message content string and returns a cleaned string
  // with action tags completely removed, suitable for display.
  processMessageContent(content) {
    let cleanedContent = content;
    cleanedContent = cleanedContent.replace(/\[\[ADMIN\]\]/g, "");
    cleanedContent = cleanedContent.replace(/\[\[MEMORY:"([^"]+)"\]\]/g, "");
    cleanedContent = cleanedContent.replace(/\[\[REPORT\]\]/g, "");
    return cleanedContent.trim();
  }
  parseAiResponseForTags(response) {
    const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
    const memoryTagRegex = /\[\[MEMORY:"([^"]+)"\]\]/g;
    const reportTagRegex = /\[\[REPORT\]\]/;
    let modifiedResponse = response;
    let tagProcessed = false;
    const loginMatch = modifiedResponse.match(loginTagRegex);
    if (loginMatch) {
      const lastName = loginMatch[1];
      const passportNumber = loginMatch[2];
      this.authService.login(lastName, passportNumber).subscribe({
        next: (success) => {
          if (success) {
            this.userId = localStorage.getItem("user_id");
            this.agencyId = localStorage.getItem("agency_id");
            this.setInitialSystemPrompt();
            this.messages = [];
            this.loadChatHistory();
            this.loadEmployeeMemories();
          } else {
            const loginFailMessage = { role: "assistant", content: "Account does not exist, please double check if input is correct." };
            this.messages.push(loginFailMessage);
            this.saveMessageToDb(loginFailMessage);
            this.scrollToBottom();
          }
        },
        error: (error) => {
          console.error("Login failed:", error);
          const loginErrorMessage = { role: "assistant", content: "An error occurred during login. Please try again later." };
          this.messages.push(loginErrorMessage);
          this.saveMessageToDb(loginErrorMessage);
          this.scrollToBottom();
        }
      });
      modifiedResponse = modifiedResponse.replace(loginTagRegex, "").trim();
      tagProcessed = true;
    }
    const memoryMatches = [...modifiedResponse.matchAll(memoryTagRegex)];
    for (const memoryMatch of memoryMatches) {
      const memoryContent = memoryMatch[1];
      if (this.userId) {
        this.databaseService.saveEmployeeMemory(parseInt(this.userId, 10), memoryContent).subscribe({
          next: () => {
            this.employeeMemories.push(memoryContent);
          },
          error: (err) => console.error("Failed to save memory:", err)
        });
      }
      tagProcessed = true;
    }
    modifiedResponse = modifiedResponse.replace(memoryTagRegex, "").trim();
    const reportMatch = modifiedResponse.match(reportTagRegex);
    if (reportMatch) {
      tagProcessed = true;
      modifiedResponse = modifiedResponse.replace(reportTagRegex, "").trim();
      if (this.userId) {
        this.handleReportTag();
      } else {
        const unauthReportMessage = { role: "assistant", content: "Please log in to file a report." };
        this.messages.push(unauthReportMessage);
        this.saveMessageToDb(unauthReportMessage);
        this.scrollToBottom();
      }
    }
    return {
      response: modifiedResponse,
      tagProcessed
    };
  }
  handleReportTag() {
    if (!this.userId || !this.agencyId) {
      return;
    }
    this.isLoading = true;
    this.currentStatusMessage = "I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.";
    this.scrollToBottom();
    const onStatusUpdate = (message) => {
      this.currentStatusMessage = message;
      this.scrollToBottom();
    };
    const historyForReport = this.messages.slice(-10);
    this.caseService.handleReportCreation(parseInt(this.userId, 10), parseInt(this.agencyId, 10), historyForReport, onStatusUpdate).subscribe({
      next: (caseId) => {
        this.isLoading = false;
        this.currentStatusMessage = "";
        this.scrollToBottom();
      },
      error: (error) => {
        console.error("Error during report processing:", error);
        this.currentStatusMessage = "An unexpected error occurred during report processing. Please try again.";
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }
  triggerFollowUpAi(userMessage, assistantMessage) {
    let currentSystemPromptContent = this.systemPrompt.content;
    if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
      const memoriesString = this.employeeMemories.map((memory) => `"${memory}"`).join(", ");
      currentSystemPromptContent += `

User's known characteristics: ${memoriesString}`;
    }
    currentSystemPromptContent += `

${SYSTEM_PROMPT_FOLLOWUP_ASSISTANT}`;
    const systemPromptForAi = { role: "system", content: currentSystemPromptContent };
    const historyForAi = this.messages.slice(-10);
    const followUpPayload = [systemPromptForAi, ...historyForAi];
    const employeeIdNum = this.userId ? parseInt(this.userId, 10) : null;
    this.aiService.callAi(followUpPayload, employeeIdNum).subscribe({
      next: (response) => {
        if (!response) {
          return;
        }
        const doneTagRegex = /\[\[DONE\]\]/;
        const doneMatch = response.match(doneTagRegex);
        if (!doneMatch) {
          const followUpMessage = { role: "assistant", content: response.trim() };
          this.messages.push(followUpMessage);
          this.saveMessageToDb(followUpMessage);
          this.scrollToBottom();
        }
      },
      error: (error) => {
        console.error("Follow-up AI call failed:", error);
        this.scrollToBottom();
      }
    });
  }
  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.scrollToBottom(50);
    }
  }
  // New method to handle clicks on the ion-title for admin redirection
  onTitleClick() {
    const currentTime = Date.now();
    const clickThreshold = 500;
    if (currentTime - this.lastClickTime < clickThreshold) {
      this.clickCount++;
    } else {
      this.clickCount = 1;
    }
    this.lastClickTime = currentTime;
    if (this.clickCount === 3) {
      this.router.navigate(["/admin"]);
      this.clickCount = 0;
    }
  }
  static \u0275fac = function ChatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChatComponent)(\u0275\u0275directiveInject(AiService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(DatabaseService), \u0275\u0275directiveInject(CaseService), \u0275\u0275directiveInject(AnnouncementService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChatComponent, selectors: [["app-chat"]], viewQuery: function ChatComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chatContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messageInput = _t.first);
    }
  }, decls: 17, vars: 6, consts: [["chatContainer", ""], ["messageInput", ""], [1, "glass-toolbar"], [3, "click"], [1, "fas", "fa-hands-helping", "mr-2"], [1, "ion-padding", "custom-scrollbar"], ["class", "glass-card ion-no-margin ion-margin-bottom", 4, "ngIf"], ["class", "flex mb-4", 3, "justify-end", "justify-start", 4, "ngFor", "ngForOf"], ["class", "flex justify-center mb-4", 4, "ngIf"], [1, "flex", "items-center", "p-2"], ["rows", "1", "placeholder", "Type your message...", "autoGrow", "true", 1, "flex-1", "resize-none", "outline-none", "placeholder-gray-400", "p-2", "rounded-lg", "custom-scrollbar", 3, "ngModelChange", "ionInput", "keydown.enter", "ngModel", "disabled"], [1, "ml-2", 3, "click", "disabled"], [1, "fa-solid", "fa-paper-plane"], [1, "glass-card", "ion-no-margin", "ion-margin-bottom"], [1, "flex", "items-start", "justify-between"], [1, "font-bold", "text-lg", "mb-2"], ["lines", "none", 1, "bg-transparent"], ["class", "bg-transparent ion-no-padding", 4, "ngFor", "ngForOf"], ["fill", "clear", "color", "dark", 3, "click"], ["size", "large", 1, "fa-solid", "fa-circle-xmark"], [1, "bg-transparent", "ion-no-padding"], [1, "ion-text-wrap"], [1, "flex", "mb-4"], [1, "p-3", "rounded-lg", "max-w-[70%]"], [1, "chat-message-content", 3, "innerHTML"], [1, "flex", "justify-center", "mb-4"], [1, "p-3", "rounded-lg", "max-w-xl", "flex", "items-center", "space-x-2", "text-white"], ["class", "animate-spin rounded-full h-4 w-4 border-b-2 border-white", 4, "ngIf"], [1, "animate-spin", "rounded-full", "h-4", "w-4", "border-b-2", "border-white"]], template: function ChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar", 2)(2, "ion-title", 3);
      \u0275\u0275listener("click", function ChatComponent_Template_ion_title_click_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTitleClick());
      });
      \u0275\u0275element(3, "i", 4);
      \u0275\u0275text(4, "Welfare ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(5, "ion-content", 5, 0);
      \u0275\u0275template(7, ChatComponent_ion_card_7_Template, 9, 1, "ion-card", 6)(8, ChatComponent_div_8_Template, 3, 9, "div", 7)(9, ChatComponent_div_9_Template, 5, 2, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "ion-footer")(11, "ion-toolbar", 2)(12, "div", 9)(13, "ion-textarea", 10, 1);
      \u0275\u0275twoWayListener("ngModelChange", function ChatComponent_Template_ion_textarea_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.newMessage, $event) || (ctx.newMessage = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ionInput", function ChatComponent_Template_ion_textarea_ionInput_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.adjustTextareaHeight());
      })("keydown.enter", function ChatComponent_Template_ion_textarea_keydown_enter_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        ctx.sendMessage();
        return \u0275\u0275resetView($event.preventDefault());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "ion-button", 11);
      \u0275\u0275listener("click", function ChatComponent_Template_ion_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sendMessage());
      });
      \u0275\u0275element(16, "i", 12);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.showAnnouncementBanner && ctx.announcements.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.messages);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading || ctx.currentStatusMessage !== "Typing...");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMessage);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    NgControlStatus,
    NgModel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonFooter,
    IonTextarea
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  font-family: "Inter", sans-serif;\n  color: var(--ion-text-color);\n}\nion-header[_ngcontent-%COMP%], \nion-footer[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n  --color: var(--ion-text-color);\n  --border-color: transparent;\n  --min-height: 56px;\n  padding: 0 10px;\n}\nion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow-y: auto;\n}\nion-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  margin-bottom: 10px;\n}\nion-content[_ngcontent-%COMP%]    > div.justify-end[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\nion-content[_ngcontent-%COMP%]    > div.justify-start[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\nion-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border-radius: 20px;\n  max-width: 80%;\n  word-wrap: break-word;\n  color: var(--ion-text-color);\n}\n.user-message-bubble[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border-bottom-right-radius: 5px;\n  margin-right: 10px;\n}\n.assistant-message-bubble[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n  color: var(--ion-color-success-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--ion-color-step-300);\n  border-bottom-left-radius: 5px;\n  margin-left: 10px;\n}\n.chat-message-content[_ngcontent-%COMP%] {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n.chat-message-content[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-break: break-all;\n  background-color: var(--ion-color-step-200);\n  padding: 8px;\n  border-radius: 5px;\n  color: var(--ion-text-color);\n}\n.chat-message-content[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.chat-message-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.chat-message-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid var(--ion-color-step-300);\n  color: var(--ion-text-color);\n}\n.chat-message-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n.ion-content[_ngcontent-%COMP%]    > .flex.justify-center[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nion-textarea[_ngcontent-%COMP%] {\n  --padding-start: 10px;\n  --padding-end: 10px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --background: var(--ion-background-color);\n  border-radius: 20px;\n  color: var(--ion-text-color);\n  min-height: 40px;\n  max-height: 150px;\n  overflow-y: auto;\n  font-size: 1rem;\n  --placeholder-color: rgba(var(--ion-text-color-rgb), 0.5);\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\nion-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-tertiary);\n  --background-activated: var(--ion-color-tertiary-tint);\n  --border-radius: 20px;\n  height: 40px;\n  font-size: 1rem;\n  margin-left: 10px;\n  text-transform: none;\n  color: var(--ion-color-tertiary-contrast);\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\n/*# sourceMappingURL=chat.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChatComponent, [{
    type: Component,
    args: [{ selector: "app-chat", standalone: true, imports: [
      CommonModule,
      FormsModule,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardContent,
      IonList,
      IonItem,
      IonLabel,
      IonButton,
      IonFooter,
      IonTextarea
    ], template: `<ion-header>
  <ion-toolbar class="glass-toolbar">
    <ion-title (click)="onTitleClick()">
      <i class="fas fa-hands-helping mr-2"></i>Welfare
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content #chatContainer class="ion-padding custom-scrollbar">
  <ion-card *ngIf="showAnnouncementBanner && announcements.length > 0" class="glass-card ion-no-margin ion-margin-bottom">
    <ion-card-content class="flex items-start justify-between">
      <div>
        <h2 class="font-bold text-lg mb-2">Important Announcements:</h2>
        <ion-list lines="none" class="bg-transparent">
          <ion-item *ngFor="let announcement of announcements" class="bg-transparent ion-no-padding">
            <ion-label class="ion-text-wrap">{{ announcement }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
      <ion-button fill="clear" color="dark" (click)="dismissAnnouncementBanner()">
        <i class="fa-solid fa-circle-xmark" size="large"></i>
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- Chat messages will be rendered here dynamically -->
<div *ngFor="let message of messages" class="flex mb-4" [class.justify-end]="message.role === 'user'" [class.justify-start]="message.role === 'assistant'">
    <div class="p-3 rounded-lg max-w-[70%]"
         [class.user-message-bubble]="message.role === 'user'"
         [class.assistant-message-bubble]="message.role === 'assistant'">
      <!-- Call processMessageContent to hide tags visually -->
      <div class="chat-message-content" [innerHTML]="processMessageContent(message.content)"></div>
    </div>
  </div>

  <!-- Status and Thinking Indicator -->
  <div *ngIf="isLoading || currentStatusMessage !== 'Typing...'" class="flex justify-center mb-4">
    <div class="p-3 rounded-lg max-w-xl flex items-center space-x-2 text-white">
      <span>{{ currentStatusMessage }}</span>
      <span *ngIf="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
    </div>
  </div>
</ion-content>

<ion-footer>
  <ion-toolbar class="glass-toolbar">
    <div class="flex items-center p-2">
      <ion-textarea
        #messageInput
        rows="1"
        class="flex-1 resize-none outline-none placeholder-gray-400 p-2 rounded-lg custom-scrollbar"
        placeholder="Type your message..."
        [(ngModel)]="newMessage"
        (ionInput)="adjustTextareaHeight()"
        (keydown.enter)="sendMessage(); $event.preventDefault();"
        [disabled]="isLoading"
        autoGrow="true"
      ></ion-textarea>
      <ion-button (click)="sendMessage()" [disabled]="isLoading" class="ml-2">
        <i class="fa-solid fa-paper-plane"></i>
      </ion-button>
    </div>
  </ion-toolbar>
</ion-footer>`, styles: ['/* src/app/chat/chat.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  font-family: "Inter", sans-serif;\n  color: var(--ion-text-color);\n}\nion-header,\nion-footer {\n  box-shadow: none !important;\n}\nion-toolbar {\n  --background: var(--ion-background-color);\n  --color: var(--ion-text-color);\n  --border-color: transparent;\n  --min-height: 56px;\n  padding: 0 10px;\n}\nion-content {\n  --background: var(--ion-background-color);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow-y: auto;\n}\nion-content > div {\n  width: 100%;\n  display: flex;\n  margin-bottom: 10px;\n}\nion-content > div.justify-end {\n  justify-content: flex-end;\n}\nion-content > div.justify-start {\n  justify-content: flex-start;\n}\nion-content > div > div {\n  padding: 10px 15px;\n  border-radius: 20px;\n  max-width: 80%;\n  word-wrap: break-word;\n  color: var(--ion-text-color);\n}\n.user-message-bubble {\n  background: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border-bottom-right-radius: 5px;\n  margin-right: 10px;\n}\n.assistant-message-bubble {\n  background: var(--ion-color-success);\n  color: var(--ion-color-success-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--ion-color-step-300);\n  border-bottom-left-radius: 5px;\n  margin-left: 10px;\n}\n.chat-message-content {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n.chat-message-content pre {\n  white-space: pre-wrap;\n  word-break: break-all;\n  background-color: var(--ion-color-step-200);\n  padding: 8px;\n  border-radius: 5px;\n  color: var(--ion-text-color);\n}\n.chat-message-content table {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.chat-message-content th,\n.chat-message-content td {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid var(--ion-color-step-300);\n  color: var(--ion-text-color);\n}\n.chat-message-content img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n.ion-content > .flex.justify-center {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nion-textarea {\n  --padding-start: 10px;\n  --padding-end: 10px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --background: var(--ion-background-color);\n  border-radius: 20px;\n  color: var(--ion-text-color);\n  min-height: 40px;\n  max-height: 150px;\n  overflow-y: auto;\n  font-size: 1rem;\n  --placeholder-color: rgba(var(--ion-text-color-rgb), 0.5);\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar {\n  width: 8px;\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\nion-button {\n  --background: var(--ion-color-tertiary);\n  --background-activated: var(--ion-color-tertiary-tint);\n  --border-radius: 20px;\n  height: 40px;\n  font-size: 1rem;\n  margin-left: 10px;\n  text-transform: none;\n  color: var(--ion-color-tertiary-contrast);\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 8px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\n/*# sourceMappingURL=chat.css.map */\n'] }]
  }], () => [{ type: AiService }, { type: AuthService }, { type: DatabaseService }, { type: CaseService }, { type: AnnouncementService }, { type: ChangeDetectorRef }, { type: Router }], { chatContainer: [{
    type: ViewChild,
    args: ["chatContainer", { static: false }]
  }], messageInput: [{
    type: ViewChild,
    args: ["messageInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChatComponent, { className: "ChatComponent", filePath: "src/app/chat/chat.ts", lineNumber: 41 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "", component: ChatComponent },
  {
    path: "admin",
    loadChildren: () => import("./chunk-PTKSYW35.js").then((m) => m.AdminModule)
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideIonicAngular({}),
    provideRouter(routes),
    provideHttpClient(),
    AuthService
    // Provide AuthService
  ]
};

// node_modules/@capacitor/core/dist/index.js
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
var CapacitorException = class extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
};
var getPlatformId = (win) => {
  var _a, _b;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
var createCapacitor = (win) => {
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const getPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const isNativePlatform = () => getPlatform() !== "web";
  const isPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const getPluginHeader = (pluginName) => {
    var _a;
    return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
  };
  const handleError = (err) => win.console.error(err);
  const registeredPlugins = /* @__PURE__ */ new Map();
  const registerPlugin2 = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = async () => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    };
    const createPluginMethod = (impl, prop) => {
      var _a, _b;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
        }
      } else if (impl) {
        return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove;
      const wrapper = (...args) => {
        const p = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p2 = fn(...args);
            remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
            return p2;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p.remove = async () => remove();
        }
        return p;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call = addListener({ eventName }, callback);
      const remove = async () => {
        const callbackId = await call;
        removeListener({
          eventName,
          callbackId
        }, callback);
      };
      const p = new Promise((resolve) => call.then(() => resolve({ remove })));
      p.remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove();
      };
      return p;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          // https://github.com/facebook/react/issues/20030
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
    });
    return proxy;
  };
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  return cap;
};
var initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
var Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
var registerPlugin = Capacitor.registerPlugin;
var WebPlugin = class {
  constructor() {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove = async () => this.removeListener(eventName, listenerFunc);
    const p = Promise.resolve({ remove });
    return p;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const listener in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[listener]);
    }
    this.windowListeners = {};
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    var _a;
    return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  async removeListener(eventName, listenerFunc) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
};
var encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
var decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
var CapacitorCookiesPluginWeb = class extends WebPlugin {
  async getCookies() {
    const cookies = document.cookie;
    const cookieMap = {};
    cookies.split(";").forEach((cookie) => {
      if (cookie.length <= 0)
        return;
      let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key = decode(key).trim();
      value = decode(value).trim();
      cookieMap[key] = value;
    });
    return cookieMap;
  }
  async setCookie(options) {
    try {
      const encodedKey = encode(options.key);
      const encodedValue = encode(options.value);
      const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCookie(options) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
var CapacitorCookies = registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
var readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(blob);
});
var normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key, index) => {
    acc[key] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
var buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
var buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key) => {
        form.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        form.append(key, options.data[key]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
var CapacitorHttpPluginWeb = class extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  async request(options) {
    const requestInit = buildRequestInit(options, options.webFetchExtra);
    const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
    const url = urlParams ? `${options.url}?${urlParams}` : options.url;
    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";
    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) {
      responseType = "json";
    }
    let data;
    let blob;
    switch (responseType) {
      case "arraybuffer":
      case "blob":
        blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      data,
      headers,
      status: response.status,
      url: response.url
    };
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  async get(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  async post(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  async put(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  async patch(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  async delete(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
  }
};
var CapacitorHttp = registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
var SystemBarsStyle;
(function(SystemBarsStyle2) {
  SystemBarsStyle2["Dark"] = "DARK";
  SystemBarsStyle2["Light"] = "LIGHT";
  SystemBarsStyle2["Default"] = "DEFAULT";
})(SystemBarsStyle || (SystemBarsStyle = {}));
var SystemBarType;
(function(SystemBarType2) {
  SystemBarType2["StatusBar"] = "StatusBar";
  SystemBarType2["NavigationBar"] = "NavigationBar";
})(SystemBarType || (SystemBarType = {}));
var SystemBarsPluginWeb = class extends WebPlugin {
  async setStyle() {
    this.unavailable("not available for web");
  }
  async setAnimation() {
    this.unavailable("not available for web");
  }
  async show() {
    this.unavailable("not available for web");
  }
  async hide() {
    this.unavailable("not available for web");
  }
};
var SystemBars = registerPlugin("SystemBars", {
  web: () => new SystemBarsPluginWeb()
});

// node_modules/@capacitor/push-notifications/dist/esm/index.js
var PushNotifications = registerPlugin("PushNotifications", {});

// src/app/app.ts
var AppComponent = class _AppComponent {
  databaseService;
  aiService;
  platform;
  authService;
  title = "welfare-super";
  constructor(databaseService, aiService, platform, authService) {
    this.databaseService = databaseService;
    this.aiService = aiService;
    this.platform = platform;
    this.authService = authService;
    this.initializeApp();
  }
  ngOnInit() {
  }
  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("android") || this.platform.is("ios")) {
        this.registerPush();
      }
    });
  }
  registerPush() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
      } else {
        console.log("Push permission denied:", result.receive);
      }
    });
    PushNotifications.addListener("registration", (token) => {
      const userId = this.authService.currentUser?.user_id;
      if (userId) {
        this.databaseService.savePushToken(userId, token.value).subscribe({
          next: (response) => {
            console.log("Push token saved successfully:", response);
          },
          error: (error) => {
            console.error("Error saving push token:", error);
          }
        });
      } else {
        console.warn("Cannot save push token: No authenticated user found.");
      }
    });
    PushNotifications.addListener("registrationError", (error) => {
      console.log("Registration error: " + JSON.stringify(error));
    });
  }
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)(\u0275\u0275directiveInject(DatabaseService), \u0275\u0275directiveInject(AiService), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-app");
      \u0275\u0275element(1, "ion-router-outlet");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [RouterModule, CommonModule, IonicModule, IonApp, IonRouterOutlet], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background-size: cover;\n  background-position: center;\n  font-family: "Inter", sans-serif;\n}\n.glass-container[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\n}\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}\n[_nghost-%COMP%]  .chat-message-content {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n[_nghost-%COMP%]  .chat-message-content pre {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n[_nghost-%COMP%]  .chat-message-content table {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n[_nghost-%COMP%]  .chat-message-content th, \n[_nghost-%COMP%]  .chat-message-content td {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n[_nghost-%COMP%]  .chat-message-content img {\n  max-width: 100%;\n  height: auto;\n}\n.user-message-bubble[_ngcontent-%COMP%] {\n  background: rgba(0, 123, 255, 0.3);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(0, 123, 255, 0.25);\n}\n.glass-input[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n  color: white;\n}\n.glass-input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(255, 255, 255, 0.7);\n}\n.glass-button[_ngcontent-%COMP%] {\n  background: rgba(76, 175, 80, 0.2);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(76, 175, 80, 0.3);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n.glass-button[_ngcontent-%COMP%]:hover {\n  background: rgba(76, 175, 80, 0.3);\n}\n.log-container-plan[_ngcontent-%COMP%], \n.log-container-execution[_ngcontent-%COMP%] {\n  max-height: 60vh;\n}\n@media (max-width: 768px) {\n  .log-container-plan[_ngcontent-%COMP%], \n   .log-container-execution[_ngcontent-%COMP%] {\n    max-height: 30vh;\n  }\n}\n/*# sourceMappingURL=app.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterModule, CommonModule, IonicModule], template: "<ion-app>\n  <ion-router-outlet></ion-router-outlet>\n\n</ion-app>\n", styles: ['/* src/app/app.css */\n:host {\n  display: block;\n  min-height: 100vh;\n  background-size: cover;\n  background-position: center;\n  font-family: "Inter", sans-serif;\n}\n.glass-container {\n  background: rgba(255, 255, 255, 0.1);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\n}\n.glass-card {\n  background: rgba(255, 255, 255, 0.2);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}\n:host::ng-deep .chat-message-content {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n:host::ng-deep .chat-message-content pre {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n:host::ng-deep .chat-message-content table {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n:host::ng-deep .chat-message-content th,\n:host::ng-deep .chat-message-content td {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n:host::ng-deep .chat-message-content img {\n  max-width: 100%;\n  height: auto;\n}\n.user-message-bubble {\n  background: rgba(0, 123, 255, 0.3);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(0, 123, 255, 0.25);\n}\n.glass-input {\n  background: rgba(255, 255, 255, 0.15);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n  color: white;\n}\n.glass-input::placeholder {\n  color: rgba(255, 255, 255, 0.7);\n}\n.glass-button {\n  background: rgba(76, 175, 80, 0.2);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(76, 175, 80, 0.3);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n.glass-button:hover {\n  background: rgba(76, 175, 80, 0.3);\n}\n.log-container-plan,\n.log-container-execution {\n  max-height: 60vh;\n}\n@media (max-width: 768px) {\n  .log-container-plan,\n  .log-container-execution {\n    max-height: 30vh;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n'] }]
  }], () => [{ type: DatabaseService }, { type: AiService }, { type: Platform }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.ts", lineNumber: 18 });
})();

// node_modules/zone.js/fesm2015/zone.js
var global2 = globalThis;
function __symbol__(name) {
  const symbolPrefix = global2["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
function initZone() {
  const performance = global2["performance"];
  function mark(name) {
    performance && performance["mark"] && performance["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance && performance["measure"] && performance["measure"](name, label);
  }
  mark("Zone");
  class ZoneImpl {
    static __symbol__ = __symbol__;
    static assertZonePatched() {
      if (global2["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = ZoneImpl.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global2["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global2, ZoneImpl, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    _parent;
    _name;
    _properties;
    _zoneDelegate;
    constructor(parent, zoneSpec) {
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      const zoneTask = task;
      const { type, data: { isPeriodic = false, isRefreshable = false } = {} } = task;
      if (task.state === notScheduled && (type === eventTask || type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && zoneTask._transitionTo(running, scheduled);
      const previousTask = _currentTask;
      _currentTask = zoneTask;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (type == macroTask && task.data && !isPeriodic && !isRefreshable) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, zoneTask, applyThis, applyArgs);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        const state = task.state;
        if (state !== notScheduled && state !== unknown) {
          if (type == eventTask || isPeriodic || isRefreshable && state === scheduling) {
            reEntryGuard && zoneTask._transitionTo(scheduled, running, scheduling);
          } else {
            const zoneDelegates = zoneTask._zoneDelegates;
            this._updateTaskCount(zoneTask, -1);
            reEntryGuard && zoneTask._transitionTo(notScheduled, running, notScheduled);
            if (isRefreshable) {
              zoneTask._zoneDelegates = zoneDelegates;
            }
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = -1;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  }
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    get zone() {
      return this._zone;
    }
    _zone;
    _taskCounts = {
      "microTask": 0,
      "macroTask": 0,
      "eventTask": 0
    };
    _parentDelegate;
    _forkDlgt;
    _forkZS;
    _forkCurrZone;
    _interceptDlgt;
    _interceptZS;
    _interceptCurrZone;
    _invokeDlgt;
    _invokeZS;
    _invokeCurrZone;
    _handleErrorDlgt;
    _handleErrorZS;
    _handleErrorCurrZone;
    _scheduleTaskDlgt;
    _scheduleTaskZS;
    _scheduleTaskCurrZone;
    _invokeTaskDlgt;
    _invokeTaskZS;
    _invokeTaskCurrZone;
    _cancelTaskDlgt;
    _cancelTaskZS;
    _cancelTaskCurrZone;
    _hasTaskDlgt;
    _hasTaskDlgtOwner;
    _hasTaskZS;
    _hasTaskCurrZone;
    constructor(zone, parentDelegate, zoneSpec) {
      this._zone = zone;
      this._parentDelegate = parentDelegate;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this._zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this._zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this._zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this._zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this._zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this._zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this._zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = this._zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this._zone;
        }
      }
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new ZoneImpl(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this._zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    type;
    source;
    invoke;
    callback;
    data;
    scheduleFn;
    cancelFn;
    _zone = null;
    runCount = 0;
    _zoneDelegates = null;
    _state = "notScheduled";
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global2, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames == 1) {
          drainMicroTaskQueue();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    if (!nativeMicroTaskQueuePromise) {
      if (global2[symbolPromise]) {
        nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0);
      }
    }
    if (nativeMicroTaskQueuePromise) {
      let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
      if (!nativeThen) {
        nativeThen = nativeMicroTaskQueuePromise["then"];
      }
      nativeThen.call(nativeMicroTaskQueuePromise, func);
    } else {
      global2[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
      nativeScheduleMicroTask(drainMicroTaskQueue);
    }
    task && _microTaskQueue.push(task);
  }
  function drainMicroTaskQueue() {
    if (!_isDrainingMicrotaskQueue) {
      _isDrainingMicrotaskQueue = true;
      while (_microTaskQueue.length) {
        const queue = _microTaskQueue;
        _microTaskQueue = [];
        for (let i = 0; i < queue.length; i++) {
          const task = queue[i];
          try {
            task.zone.runTask(task, null, null);
          } catch (error) {
            _api.onUnhandledError(error);
          }
        }
      }
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !ZoneImpl[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    isIEOrEdge: () => false,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new ZoneImpl(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return ZoneImpl;
}
function loadZone() {
  const global3 = globalThis;
  const checkDuplicate = global3[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global3["Zone"] && (checkDuplicate || typeof global3["Zone"].__symbol__ !== "function")) {
    throw new Error("Zone already loaded.");
  }
  global3["Zone"] ??= initZone();
  return global3["Zone"];
}
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = __symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = __symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = __symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = __symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global = isWindowExists && internalWindow || globalThis;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && _global.process.toString() === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global.process !== "undefined" && _global.process.toString() === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames$1 = {};
var enableBeforeunloadSymbol = zoneSymbol("enable_beforeunload");
var wrapFn = function(event) {
  event = event || _global.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames$1[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (
      // https://github.com/angular/angular/issues/47579
      // https://www.w3.org/TR/2011/WD-html5-20110525/history.html#beforeunloadevent
      // This is the only specific case we should check for. The spec defines that the
      // `returnValue` attribute represents the message to show the user. When the event
      // is created, this attribute must be set to the empty string.
      event.type === "beforeunload" && // To prevent any breaking changes resulting from this change, given that
      // it was already causing a significant number of failures in G3, we have hidden
      // that behavior behind a global configuration flag. Consumers can enable this
      // flag explicitly if they want the `beforeunload` event to be handled as defined
      // in the specification.
      _global[enableBeforeunloadSymbol] && // The IDL event definition is `attribute DOMString returnValue`, so we check whether
      // `typeof result` is a string.
      typeof result === "string"
    ) {
      event.returnValue = result;
    } else if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames$1[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet?.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global[className];
  if (!OriginalClass)
    return;
  _global[zoneSymbol(className)] = OriginalClass;
  _global[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global[className][prop] = OriginalClass[prop];
    }
  }
}
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
  if (isDetectedIEOrEdge) {
    return ieOrEdge;
  }
  isDetectedIEOrEdge = true;
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
      ieOrEdge = true;
    }
  } catch (error) {
  }
  return ieOrEdge;
}
function isFunction(value) {
  return typeof value === "function";
}
function isNumber(value) {
  return typeof value === "number";
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames[eventName] = {};
  zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global2, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global2.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global2;
    const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return __spreadProps(__spreadValues({}, options), { passive: true });
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (task.removeAbortListener) {
                task.removeAbortListener();
                task.removeAbortListener = null;
              }
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = patchOptions2?.diff || compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")];
    function copyEventListenerOptions(options) {
      if (typeof options === "object" && options !== null) {
        const newOptions = __spreadValues({}, options);
        if (options.signal) {
          newOptions.signal = options.signal;
        }
        return newOptions;
      }
      return options;
    }
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global2;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isEventListenerObject = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isEventListenerObject = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = copyEventListenerOptions(buildEventListenerOptions(arguments[2], passive));
        const signal = options?.signal;
        if (signal?.aborted) {
          return;
        }
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        if (signal) {
          taskData.options.signal = void 0;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        if (signal) {
          taskData.options.signal = signal;
          const onAbort = () => task.zone.cancelTask(task);
          nativeListener.call(signal, "abort", onAbort, { once: true });
          task.removeAbortListener = () => signal.removeEventListener("abort", onAbort);
        }
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          taskData.options.once = true;
        }
        if (typeof task.options !== "boolean") {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isEventListenerObject) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (!capture && typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global3, api) {
  const Event = global3["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchQueueMicrotask(global3, api) {
  api.patchMethod(global3, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    const handleOrId = setNative.apply(window2, data.args);
    if (isNumber(handleOrId)) {
      data.handleId = handleOrId;
    } else {
      data.handle = handleOrId;
      data.isRefreshable = isFunction(handleOrId.refresh);
    }
    return task;
  }
  function clearTask(task) {
    const { handle, handleId } = task.data;
    return clearNative.call(window2, handle ?? handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    if (isFunction(args[0])) {
      const options = {
        isRefreshable: false,
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          const { handle: handle2, handleId: handleId2, isPeriodic: isPeriodic2, isRefreshable: isRefreshable2 } = options;
          if (!isPeriodic2 && !isRefreshable2) {
            if (handleId2) {
              delete tasksByHandleId[handleId2];
            } else if (handle2) {
              handle2[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const { handleId, handle, isRefreshable, isPeriodic } = task.data;
      if (handleId) {
        tasksByHandleId[handleId] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
        if (isRefreshable && !isPeriodic) {
          const originalRefresh = handle.refresh;
          handle.refresh = function() {
            const { zone, state } = task;
            if (state === "notScheduled") {
              task._state = "scheduled";
              zone._updateTaskCount(task, 1);
            } else if (state === "running") {
              task._state = "scheduling";
            }
            return originalRefresh.call(this);
          };
        }
      }
      return handle ?? handleId ?? task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (isNumber(id)) {
      task = tasksByHandleId[id];
      delete tasksByHandleId[id];
    } else {
      task = id?.[taskSymbol];
      if (task) {
        id[taskSymbol] = null;
      } else {
        task = id;
      }
    }
    if (task?.type) {
      if (task.cancelFn) {
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global2, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global2["customElements"] || !("customElements" in _global2)) {
    return;
  }
  const callbacks = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback"
  ];
  api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global2, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames2[eventName] = {};
    zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global2["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global2, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global3, api) {
  api.patchEventPrototype(global3, api);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global2) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global2["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    const ignoreErrorProperties = [];
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global2[patchTargets[i]];
    target?.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
function patchBrowser(Zone2) {
  Zone2.__load_patch("legacy", (global3) => {
    const legacyPatch = global3[Zone2.__symbol__("legacyPatch")];
    if (legacyPatch) {
      legacyPatch();
    }
  });
  Zone2.__load_patch("timers", (global3) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global3, set, clear, "Timeout");
    patchTimer(global3, set, clear, "Interval");
    patchTimer(global3, set, clear, "Immediate");
  });
  Zone2.__load_patch("requestAnimationFrame", (global3) => {
    patchTimer(global3, "request", "cancel", "AnimationFrame");
    patchTimer(global3, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global3, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone2.__load_patch("blocking", (global3, Zone3) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global3, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone3.current.run(delegate, global3, args, name2);
        };
      });
    }
  });
  Zone2.__load_patch("EventTarget", (global3, Zone3, api) => {
    patchEvent(global3, api);
    eventTargetPatch(global3, api);
    const XMLHttpRequestEventTarget = global3["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global3, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone2.__load_patch("MutationObserver", (global3, Zone3, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone2.__load_patch("IntersectionObserver", (global3, Zone3, api) => {
    patchClass("IntersectionObserver");
  });
  Zone2.__load_patch("FileReader", (global3, Zone3, api) => {
    patchClass("FileReader");
  });
  Zone2.__load_patch("on_property", (global3, Zone3, api) => {
    propertyDescriptorPatch(api, global3);
  });
  Zone2.__load_patch("customElements", (global3, Zone3, api) => {
    patchCustomElements(global3, api);
  });
  Zone2.__load_patch("XHR", (global3, Zone3) => {
    patchXHR(global3);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest = window2["XMLHttpRequest"];
      if (!XMLHttpRequest) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone3.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone3.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone3.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = {
            target: self2,
            url: self2[XHR_URL],
            isPeriodic: false,
            args,
            aborted: false
          };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone3.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone2.__load_patch("geolocation", (global3) => {
    if (global3["navigator"] && global3["navigator"].geolocation) {
      patchPrototype(global3["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone2.__load_patch("PromiseRejectionEvent", (global3, Zone3) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global3, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global3["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global3["PromiseRejectionEvent"]) {
      Zone3[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone3[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone2.__load_patch("queueMicrotask", (global3, Zone3, api) => {
    patchQueueMicrotask(global3, api);
  });
}
function patchPromise(Zone2) {
  Zone2.__load_patch("ZoneAwarePromise", (global3, Zone3, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__2 = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global3[__symbol__2("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__2("Promise");
    const symbolThen = __symbol__2("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__2("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone3[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && typeof value.then === "function";
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__2("state");
    const symbolValue = __symbol__2("value");
    const symbolFinally = __symbol__2("finally");
    const symbolParentPromiseValue = __symbol__2("parentPromiseValue");
    const symbolParentPromiseState = __symbol__2("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__2("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace = Zone3.currentTask && Zone3.currentTask.data && Zone3.currentTask.data[creationTrace];
            if (trace) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone3.current;
            uncaughtPromiseError.task = Zone3.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__2("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone3[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global3.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global3[symbolPromise] = global3["Promise"];
    global3["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__2("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      patchMethod(global3, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone3.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
}
function patchToString(Zone2) {
  Zone2.__load_patch("toString", (global3) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global3[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global3[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function patchUtil(Zone2) {
  Zone2.__load_patch("util", (global3, Zone3, api) => {
    const eventNames = getOnEventNames(global3);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone3.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone3.__symbol__("UNPATCHED_EVENTS");
    if (global3[SYMBOL_UNPATCHED_EVENTS]) {
      global3[SYMBOL_BLACK_LISTED_EVENTS] = global3[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global3[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone3[SYMBOL_BLACK_LISTED_EVENTS] = Zone3[SYMBOL_UNPATCHED_EVENTS] = global3[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames,
      eventNames,
      isBrowser,
      isMix,
      isNode,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
}
function patchCommon(Zone2) {
  patchPromise(Zone2);
  patchToString(Zone2);
  patchUtil(Zone2);
}
var Zone$1 = loadZone();
patchCommon(Zone$1);
patchBrowser(Zone$1);

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)

zone.js/fesm2015/zone.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
