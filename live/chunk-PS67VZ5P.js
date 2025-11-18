import {
  ActivatedRoute,
  CREATE_APPLICANT,
  CREATE_CASE,
  CREATE_FRA,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DELETE_APPLICANT,
  DELETE_CASE,
  DELETE_FRA,
  DatabaseService,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  GET_ADMIN_USER_BY_EMAIL,
  GET_APPLICANTS,
  GET_APPLICANT_BY_ID,
  GET_APPLICANT_STATUSES,
  GET_CASES,
  GET_CASE_BY_ID,
  GET_FRAS,
  GET_FRA_BY_ID,
  INSERT_APPLICANT_HISTORY,
  Injectable,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  TitleCasePipe,
  UPDATE_APPLICANT,
  UPDATE_CASE,
  UPDATE_FRA,
  __spreadProps,
  __spreadValues,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtrustConstantResourceUrl,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OPAAVTWJ.js";

// src/app/admin/services/auth.service.ts
var AuthService = class _AuthService {
  db = inject(DatabaseService);
  TOKEN_KEY = "admin_auth_token";
  async login(email, password) {
    try {
      const result = await firstValueFrom(this.db.query(GET_ADMIN_USER_BY_EMAIL, [email]));
      if (result && result.data && result.data.length > 0) {
        const user = result.data[0];
        if (user.password === password) {
          const token = JSON.stringify({ userId: user.id, email: user.email });
          localStorage.setItem(this.TOKEN_KEY, token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("AuthService: Error during login:", error);
      return false;
    }
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUser() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        return JSON.parse(token);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/pages/admin-login/admin-login.ts
function AdminLoginComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
var AdminLoginComponent = class _AdminLoginComponent {
  email = "";
  password = "";
  errorMessage = "";
  authService = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  // Inject ChangeDetectorRef
  async login() {
    this.errorMessage = "";
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(["/admin/dashboard"]);
      } else {
        this.errorMessage = "Invalid email or password.";
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.errorMessage = "An unexpected error occurred. Please try again.";
      console.error("Login error:", error);
      this.cdr.detectChanges();
    }
  }
  static \u0275fac = function AdminLoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLoginComponent, selectors: [["app-admin-login"]], decls: 16, vars: 3, consts: [[1, "flex", "items-center", "justify-center", "h-screen", "w-screen", "bg-transparent"], [1, "w-full", "max-w-md", "glass-card", "p-8", "text-white", "rounded-xl"], [1, "text-3xl", "font-bold", "text-center", "mb-8"], [3, "ngSubmit"], [1, "mb-4"], ["for", "email", 1, "block", "text-sm", "font-medium", "mb-2"], ["type", "email", "id", "email", "name", "email", "placeholder", "admin@example.com", "required", "", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "mb-6"], ["for", "password", 1, "block", "text-sm", "font-medium", "mb-2"], ["type", "password", "id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "w-full", "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], ["class", "mt-4 text-red-200 text-center bg-red-500/40 p-2 rounded-md", 4, "ngIf"], [1, "mt-4", "text-red-200", "text-center", "bg-red-500/40", "p-2", "rounded-md"]], template: function AdminLoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Admin Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 3);
      \u0275\u0275listener("ngSubmit", function AdminLoginComponent_Template_form_ngSubmit_4_listener() {
        return ctx.login();
      });
      \u0275\u0275elementStart(5, "div", 4)(6, "label", 5);
      \u0275\u0275text(7, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function AdminLoginComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7)(10, "label", 8);
      \u0275\u0275text(11, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function AdminLoginComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 10);
      \u0275\u0275text(14, " Login ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, AdminLoginComponent_div_15_Template, 2, 1, "div", 11);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.errorMessage);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLoginComponent, [{
    type: Component,
    args: [{ selector: "app-admin-login", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="flex items-center justify-center h-screen w-screen bg-transparent">\n  <div class="w-full max-w-md glass-card p-8 text-white rounded-xl">\n    <h2 class="text-3xl font-bold text-center mb-8">Admin Login</h2>\n    <form (ngSubmit)="login()">\n      <div class="mb-4">\n        <label for="email" class="block text-sm font-medium mb-2">Email</label>\n        <input type="email" id="email" name="email" [(ngModel)]="email"\n               class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"\n               placeholder="admin@example.com" required>\n      </div>\n      <div class="mb-6">\n        <label for="password" class="block text-sm font-medium mb-2">Password</label>\n        <input type="password" id="password" name="password" [(ngModel)]="password"\n               class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"\n               placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>\n      </div>\n      <button type="submit"\n              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">\n        Login\n      </button>\n      <div *ngIf="errorMessage" class="mt-4 text-red-200 text-center bg-red-500/40 p-2 rounded-md">\n        {{ errorMessage }}\n      </div>\n    </form>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLoginComponent, { className: "AdminLoginComponent", filePath: "src/app/admin/pages/admin-login/admin-login.ts", lineNumber: 14 });
})();

// src/app/admin/services/applicant-history.service.ts
var ApplicantHistoryService = class _ApplicantHistoryService {
  databaseService = inject(DatabaseService);
  constructor() {
  }
  async addHistoryEntry(history) {
    const params = [
      history.applicant_id,
      history.remarks,
      history.attachment,
      history.status
    ];
    await firstValueFrom(this.databaseService.query(INSERT_APPLICANT_HISTORY, params));
  }
  static \u0275fac = function ApplicantHistoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicantHistoryService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApplicantHistoryService, factory: _ApplicantHistoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantHistoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/admin/services/applicant.service.ts
var ApplicantService = class _ApplicantService {
  db = inject(DatabaseService);
  applicantHistoryService = inject(ApplicantHistoryService);
  async getApplicants(status) {
    let query = GET_APPLICANTS;
    const params = [];
    if (status) {
      query = "SELECT id, first_name, last_name, passport_number, country, main_status FROM employee_employee WHERE main_status = ? ORDER BY last_name, first_name";
      params.push(status);
    }
    const response = await firstValueFrom(this.db.query(query, params));
    return response && response.data ? response.data : [];
  }
  async getApplicantById(id) {
    const res = await firstValueFrom(this.db.query(GET_APPLICANT_BY_ID, [id]));
    return res && res.data && res.data.length > 0 ? res.data[0] : null;
  }
  async getStatuses() {
    const res = await firstValueFrom(this.db.query(GET_APPLICANT_STATUSES));
    if (res && res.data && Array.isArray(res.data)) {
      return res.data.map((item) => item.status_name);
    }
    return [];
  }
  async createApplicant(applicant) {
    const params = this.mapApplicantToParams(applicant);
    const result = await firstValueFrom(this.db.query(CREATE_APPLICANT, params));
    if (result && result.insertId) {
      const newApplicantId = result.insertId;
      await this.applicantHistoryService.addHistoryEntry({
        applicant_id: newApplicantId,
        remarks: `Applicant created with status: ${applicant.main_status}`,
        attachment: "",
        status: applicant.main_status || "Created"
      });
    }
    return result;
  }
  async updateApplicant(applicant) {
    const oldApplicant = await this.getApplicantById(applicant.id);
    const params = this.mapApplicantToParams(applicant);
    const result = await firstValueFrom(this.db.query(UPDATE_APPLICANT, [...params, applicant.id]));
    if (applicant.id) {
      const oldStatus = oldApplicant ? oldApplicant.main_status || "" : "";
      const newStatus = applicant.main_status || "";
      if (oldApplicant && oldStatus !== newStatus) {
        await this.applicantHistoryService.addHistoryEntry({
          applicant_id: applicant.id,
          remarks: `Applicant status changed from '${oldApplicant.main_status}' to '${applicant.main_status}'`,
          attachment: "",
          status: applicant.main_status || "Unknown"
        });
      } else {
        await this.applicantHistoryService.addHistoryEntry({
          applicant_id: applicant.id,
          remarks: "Applicant updated.",
          attachment: "",
          status: "Updated"
        });
      }
    }
    return result;
  }
  async deleteApplicant(id) {
    return firstValueFrom(this.db.query(DELETE_APPLICANT, [id]));
  }
  mapApplicantToParams(applicant) {
    return [
      applicant.first_name || "",
      applicant.middle_name || "",
      applicant.last_name || "",
      applicant.passport_number || "",
      applicant.date_of_birth || null,
      applicant.address || "",
      applicant.phone_number || "",
      applicant.email || "",
      applicant.is_support ? 1 : 0,
      applicant.token || "",
      applicant.user_id || null,
      applicant.date_deployment || null,
      applicant.fra_id || null,
      applicant.main_status || "",
      applicant.applicant_type || "",
      applicant.created_date_of_report || null,
      applicant.country || "",
      applicant.facebook || "",
      applicant.whatsapp || "",
      applicant.consistency_percentage || 0,
      applicant.agency_id || 1,
      applicant.emergency_contact_name || "",
      applicant.emergency_contact_phone || ""
    ];
  }
  static \u0275fac = function ApplicantService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicantService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApplicantService, factory: _ApplicantService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/components/sidebar/sidebar.ts
var _c0 = () => ({ exact: true });
var _c1 = (a0) => ["/admin/applicants/status", a0];
function SidebarComponent_div_15_li_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 18)(1, "a", 21);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const status_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c1, status_r1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, status_r1), " ");
  }
}
function SidebarComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "ul")(2, "li", 18)(3, "a", 19);
    \u0275\u0275text(4, " All Applicants ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, SidebarComponent_div_15_li_5_Template, 4, 6, "li", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(2, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.applicantStatuses);
  }
}
var SidebarComponent = class _SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  applicantService = inject(ApplicantService);
  isApplicantMenuOpen = false;
  applicantStatuses = [];
  ngOnInit() {
    this.applicantService.getStatuses().then((statuses) => {
      this.applicantStatuses = statuses;
    });
  }
  toggleApplicantMenu() {
    this.isApplicantMenuOpen = !this.isApplicantMenuOpen;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/admin/login"]);
  }
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 28, vars: 3, consts: [[1, "w-64", "glass-card", "p-6", "flex", "flex-col", "text-white", "rounded-xl"], [1, "text-2xl", "font-bold", "mb-10", "text-center"], [1, "mb-4"], ["routerLink", "/admin/dashboard", "routerLinkActive", "bg-white/20", 1, "flex", "items-center", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200"], [1, "fas", "fa-tachometer-alt", "w-6", "h-6", "mr-3"], [1, "w-full", "flex", "items-center", "justify-between", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200", 3, "click"], [1, "flex", "items-center"], [1, "fas", "fa-users", "w-6", "h-6", "mr-3"], [1, "fas", "fa-chevron-down", "w-4", "h-4", "transition-transform", "duration-200"], ["class", "mt-2 ml-4 pl-3 border-l-2 border-white/20", 4, "ngIf"], ["routerLink", "/admin/cases", "routerLinkActive", "bg-white/20", 1, "flex", "items-center", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200"], [1, "fas", "fa-folder-open", "w-6", "h-6", "mr-3"], ["routerLink", "/admin/fras", "routerLinkActive", "bg-white/20", 1, "flex", "items-center", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200"], [1, "fas", "fa-building", "w-6", "h-6", "mr-3"], [1, "mt-auto"], [1, "w-full", "flex", "items-center", "justify-center", "p-3", "rounded-lg", "bg-red-600/80", "hover:bg-red-700/60", "transition-colors", "duration-200", 3, "click"], [1, "fas", "fa-sign-out-alt", "w-6", "h-6", "mr-3"], [1, "mt-2", "ml-4", "pl-3", "border-l-2", "border-white/20"], [1, "mb-2"], ["routerLink", "/admin/applicants", "routerLinkActive", "bg-white/20", 1, "block", "p-2", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200", 3, "routerLinkActiveOptions"], ["class", "mb-2", 4, "ngFor", "ngForOf"], ["routerLinkActive", "bg-white/20", 1, "block", "p-2", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200", 3, "routerLink"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Admin Panel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "nav")(4, "ul")(5, "li", 2)(6, "a", 3);
      \u0275\u0275element(7, "i", 4);
      \u0275\u0275text(8, " Dashboard ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "li", 2)(10, "button", 5);
      \u0275\u0275listener("click", function SidebarComponent_Template_button_click_10_listener() {
        return ctx.toggleApplicantMenu();
      });
      \u0275\u0275elementStart(11, "span", 6);
      \u0275\u0275element(12, "i", 7);
      \u0275\u0275text(13, " Applicants ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "i", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, SidebarComponent_div_15_Template, 6, 3, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "li", 2)(17, "a", 10);
      \u0275\u0275element(18, "i", 11);
      \u0275\u0275text(19, " Cases ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "li", 2)(21, "a", 12);
      \u0275\u0275element(22, "i", 13);
      \u0275\u0275text(23, " FRAs ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 14)(25, "button", 15);
      \u0275\u0275listener("click", function SidebarComponent_Template_button_click_25_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(26, "i", 16);
      \u0275\u0275text(27, " Logout ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275classProp("rotate-180", ctx.isApplicantMenuOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isApplicantMenuOpen);
    }
  }, dependencies: [RouterModule, RouterLink, RouterLinkActive, CommonModule, NgForOf, NgIf, TitleCasePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [RouterModule, CommonModule], template: `<div class="w-64 glass-card p-6 flex flex-col text-white rounded-xl">
  <h1 class="text-2xl font-bold mb-10 text-center">Admin Panel</h1>
  <nav>
    <ul>
      <li class="mb-4">
        <a routerLink="/admin/dashboard" routerLinkActive="bg-white/20"
           class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <i class="fas fa-tachometer-alt w-6 h-6 mr-3"></i>
          Dashboard
        </a>
      </li>
      <li class="mb-4">
        <button (click)="toggleApplicantMenu()"
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <span class="flex items-center">
            <i class="fas fa-users w-6 h-6 mr-3"></i>
            Applicants
          </span>
          <i class="fas fa-chevron-down w-4 h-4 transition-transform duration-200"
             [class.rotate-180]="isApplicantMenuOpen"></i>
        </button>
        <div *ngIf="isApplicantMenuOpen" class="mt-2 ml-4 pl-3 border-l-2 border-white/20">
          <ul>
            <li class="mb-2">
              <a routerLink="/admin/applicants" routerLinkActive="bg-white/20" [routerLinkActiveOptions]="{exact: true}"
                 class="block p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
                All Applicants
              </a>
            </li>
            <li *ngFor="let status of applicantStatuses" class="mb-2">
              <a [routerLink]="['/admin/applicants/status', status]" routerLinkActive="bg-white/20"
                 class="block p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
                {{ status | titlecase }}
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-4">
        <a routerLink="/admin/cases" routerLinkActive="bg-white/20"
           class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <i class="fas fa-folder-open w-6 h-6 mr-3"></i>
          Cases
        </a>
      </li>
      <li class="mb-4">
        <a routerLink="/admin/fras" routerLinkActive="bg-white/20"
           class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <i class="fas fa-building w-6 h-6 mr-3"></i> <!-- Using a building icon for agencies -->
          FRAs
        </a>
      </li>
    </ul>
  </nav>
  <div class="mt-auto">
    <button (click)="logout()"
            class="w-full flex items-center justify-center p-3 rounded-lg bg-red-600/80 hover:bg-red-700/60 transition-colors duration-200">
      <i class="fas fa-sign-out-alt w-6 h-6 mr-3"></i>
      Logout
    </button>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/admin/components/sidebar/sidebar.ts", lineNumber: 14 });
})();

// src/app/admin/layouts/admin-layout/admin-layout.ts
var AdminLayoutComponent = class _AdminLayoutComponent {
  static \u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], decls: 5, vars: 0, consts: [[1, "flex", "h-screen", "p-8", "bg-transparent"], [1, "flex-1", "overflow-y-auto"], [1, "w-full", "h-full", "bg-transparent", "px-8"]], template: function AdminLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-sidebar");
      \u0275\u0275elementStart(2, "main", 1)(3, "div", 2);
      \u0275\u0275element(4, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterModule, RouterOutlet, SidebarComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-admin-layout", standalone: true, imports: [RouterModule, SidebarComponent], template: '<div class="flex h-screen p-8 bg-transparent">\n  <app-sidebar></app-sidebar>\n  <main class="flex-1 overflow-y-auto">\n    <div class="w-full h-full bg-transparent px-8">\n      <router-outlet></router-outlet>\n    </div>\n  </main>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src/app/admin/layouts/admin-layout/admin-layout.ts", lineNumber: 12 });
})();

// src/app/admin/pages/admin-dashboard/admin-dashboard.ts
var AdminDashboardComponent = class _AdminDashboardComponent {
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 2, vars: 0, consts: [[1, "glass-card", "p-0", "text-white", "rounded-xl", "h-full"], ["src", \u0275\u0275trustConstantResourceUrl`https://welfare.reviewcenterphil.com/api/dashboard.php`, 1, "w-full", "h-full", "border-none", "rounded-xl"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "iframe", 1);
      \u0275\u0275domElementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [], template: '<div class="glass-card p-0 text-white rounded-xl h-full">\n  <iframe src="https://welfare.reviewcenterphil.com/api/dashboard.php" class="w-full h-full border-none rounded-xl"></iframe>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/admin/pages/admin-dashboard/admin-dashboard.ts", lineNumber: 10 });
})();

// src/app/admin/guards/auth.guard.ts
var authGuard = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("admin_auth_token");
  if (token) {
    return true;
  } else {
    router.navigate(["/admin/login"]);
    return false;
  }
};

// src/app/admin/pages/applicant-list/applicant-list.ts
var _c02 = (a0, a1, a2) => ({ "bg-green-600": a0, "bg-yellow-600": a1, "bg-red-600": a2 });
var _c12 = (a0) => ["/admin/applicants/edit", a0];
function ApplicantListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p");
    \u0275\u0275text(2, "Loading applicants...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 9);
    \u0275\u0275elementEnd();
  }
}
function ApplicantListComponent_div_9_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 18)(8, "span", 19);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 20)(11, "a", 21);
    \u0275\u0275text(12, "History");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "a", 22);
    \u0275\u0275text(14, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 23);
    \u0275\u0275listener("click", function ApplicantListComponent_div_9_tr_15_Template_button_click_15_listener() {
      const app_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteApplicant(app_r4.id));
    });
    \u0275\u0275text(16, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const app_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", app_r4.last_name, ", ", app_r4.first_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r4.passport_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r4.country);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(9, _c02, app_r4.main_status === "active", app_r4.main_status === "with_complain", app_r4.main_status === "inactive"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", app_r4.main_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("href", \u0275\u0275interpolate1("https://welfare.reviewcenterphil.com/api/history.php?app_id=", app_r4.id), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c12, app_r4.id));
  }
}
function ApplicantListComponent_div_9_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 24);
    \u0275\u0275text(2, "No applicants found.");
    \u0275\u0275elementEnd()();
  }
}
function ApplicantListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "table", 11)(2, "thead")(3, "tr", 12)(4, "th", 13);
    \u0275\u0275listener("click", function ApplicantListComponent_div_9_Template_th_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("last_name"));
    });
    \u0275\u0275text(5, " Name ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 13);
    \u0275\u0275listener("click", function ApplicantListComponent_div_9_Template_th_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("passport_number"));
    });
    \u0275\u0275text(7, " Passport ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 13);
    \u0275\u0275listener("click", function ApplicantListComponent_div_9_Template_th_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("country"));
    });
    \u0275\u0275text(9, " Country ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 13);
    \u0275\u0275listener("click", function ApplicantListComponent_div_9_Template_th_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("main_status"));
    });
    \u0275\u0275text(11, " Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 14);
    \u0275\u0275text(13, " Actions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, ApplicantListComponent_div_9_tr_15_Template, 17, 15, "tr", 15)(16, ApplicantListComponent_div_9_tr_16_Template, 3, 0, "tr", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.filteredApplicants);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredApplicants || ctx_r1.filteredApplicants.length === 0);
  }
}
var ApplicantListComponent = class _ApplicantListComponent {
  applicantService = inject(ApplicantService);
  cdr = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  allApplicants = [];
  filteredApplicants = [];
  searchTerm = "";
  isLoading = false;
  currentStatus = null;
  sortDirection = {};
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.currentStatus = params.get("status");
      this.loadApplicants(this.currentStatus ?? void 0);
    });
  }
  async loadApplicants(status) {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allApplicants = await this.applicantService.getApplicants(status);
      this.filterApplicants();
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error loading applicants:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  filterApplicants() {
    const term = this.searchTerm.toLowerCase();
    this.filteredApplicants = this.allApplicants.filter((app) => (app.first_name?.toLowerCase() ?? "").includes(term) || (app.last_name?.toLowerCase() ?? "").includes(term) || (app.passport_number?.toLowerCase() ?? "").includes(term) || (app.country?.toLowerCase() ?? "").includes(term));
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredApplicants.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB)
        return direction === "asc" ? -1 : 1;
      if (valA > valB)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteApplicant(id) {
    if (confirm("Are you sure you want to delete this applicant?")) {
      try {
        await this.applicantService.deleteApplicant(id);
        this.loadApplicants();
      } catch (error) {
        console.error("Error deleting applicant:", error);
        alert("Failed to delete applicant.");
      }
    }
  }
  static \u0275fac = function ApplicantListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicantListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantListComponent, selectors: [["app-employee-list"]], decls: 10, vars: 3, consts: [[1, "glass-card", "p-8", "text-white", "rounded-xl"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-3xl", "font-bold"], ["routerLink", "/admin/applicants/new", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], [1, "mb-4"], ["type", "text", "placeholder", "Search applicants...", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], ["class", "text-center py-8", 4, "ngIf"], ["class", "overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg", 4, "ngIf"], [1, "text-center", "py-8"], [1, "fas", "fa-spinner", "fa-spin", "text-4xl", "mt-4"], [1, "overflow-x-auto", "bg-black/30", "backdrop-blur-xl", "rounded-lg", "shadow-lg"], [1, "min-w-full"], [1, "border-b", "border-white/20"], [1, "px-6", "py-3", "text-left", "text-sm", "font-medium", "uppercase", "tracking-wider", "cursor-pointer", 3, "click"], [1, "px-6", "py-3", "text-right", "text-sm", "font-medium", "uppercase", "tracking-wider"], ["class", "border-b border-white/10 hover:bg-white/5", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "border-b", "border-white/10", "hover:bg-white/5"], [1, "px-6", "py-4", "whitespace-nowrap"], [1, "px-2", "inline-flex", "text-xs", "leading-5", "font-semibold", "rounded-full", 3, "ngClass"], [1, "px-6", "py-4", "whitespace-nowrap", "text-right", "text-sm", "font-medium"], ["target", "_blank", 1, "text-blue-400", "hover:text-blue-300", "mr-4", 3, "href"], [1, "text-indigo-400", "hover:text-indigo-300", "mr-4", 3, "routerLink"], [1, "text-red-400", "hover:text-red-300", 3, "click"], ["colspan", "5", 1, "text-center", "py-8"]], template: function ApplicantListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Applicants");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3);
      \u0275\u0275text(5, " New Applicant ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function ApplicantListComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function ApplicantListComponent_Template_input_ngModelChange_7_listener() {
        return ctx.filterApplicants();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, ApplicantListComponent_div_8_Template, 4, 0, "div", 6)(9, ApplicantListComponent_div_9_Template, 17, 2, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantListComponent, [{
    type: Component,
    args: [{ selector: "app-employee-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="glass-card p-8 text-white rounded-xl">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Applicants</h1>
    <a routerLink="/admin/applicants/new"
       class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
      New Applicant
    </a>
  </div>

  <div class="mb-4">
    <input type="text" placeholder="Search applicants..." [(ngModel)]="searchTerm" (ngModelChange)="filterApplicants()"
           class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
  </div>

  <div *ngIf="isLoading" class="text-center py-8">
    <p>Loading applicants...</p>
    <!-- You can add a spinner icon here if Font Awesome is available -->
    <i class="fas fa-spinner fa-spin text-4xl mt-4"></i>
  </div>

  <div *ngIf="!isLoading" class="overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-white/20">
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('last_name')">
            Name
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('passport_number')">
            Passport
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('country')">
            Country
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('main_status')">
            Status
          </th>
          <th class="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let app of filteredApplicants" class="border-b border-white/10 hover:bg-white/5">
          <td class="px-6 py-4 whitespace-nowrap">{{ app.last_name }}, {{ app.first_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ app.passport_number }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ app.country }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  [ngClass]="{
                    'bg-green-600': app.main_status === 'active',
                    'bg-yellow-600': app.main_status === 'with_complain',
                    'bg-red-600': app.main_status === 'inactive'
                  }">
              {{ app.main_status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="https://welfare.reviewcenterphil.com/api/history.php?app_id={{ app.id }}" target="_blank" class="text-blue-400 hover:text-blue-300 mr-4">History</a>
            <a [routerLink]="['/admin/applicants/edit', app.id]" class="text-indigo-400 hover:text-indigo-300 mr-4">Edit</a>
            <button (click)="deleteApplicant(app.id)" class="text-red-400 hover:text-red-300">Delete</button>
          </td>
        </tr>
        <tr *ngIf="!filteredApplicants || filteredApplicants.length === 0">
          <td colspan="5" class="text-center py-8">No applicants found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicantListComponent, { className: "ApplicantListComponent", filePath: "src/app/admin/pages/applicant-list/applicant-list.ts", lineNumber: 15 });
})();

// src/app/admin/services/fra.service.ts
var FraService = class _FraService {
  db = inject(DatabaseService);
  async getFras() {
    const response = await firstValueFrom(this.db.query(GET_FRAS));
    return response && response.data ? response.data : [];
  }
  async getFraById(id) {
    const res = await firstValueFrom(this.db.query(GET_FRA_BY_ID, [id]));
    return res && res.data && res.data.length > 0 ? res.data[0] : null;
  }
  async createFra(fra) {
    const params = this.mapFraToParams(fra);
    return firstValueFrom(this.db.query(CREATE_FRA, params));
  }
  async updateFra(fra) {
    const params = this.mapFraToParams(fra);
    return firstValueFrom(this.db.query(UPDATE_FRA, [...params, fra.id]));
  }
  async deleteFra(id) {
    return firstValueFrom(this.db.query(DELETE_FRA, [id]));
  }
  mapFraToParams(fra) {
    return [
      fra.name || "",
      fra.contact || "",
      fra.address || "",
      fra.country || "",
      fra.agency_id || null
    ];
  }
  static \u0275fac = function FraService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FraService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FraService, factory: _FraService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/components/applicant-form/applicant-form.ts
function ApplicantFormComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p");
    \u0275\u0275text(2, "Loading applicant data...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 6);
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_4_option_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    \u0275\u0275property("value", status_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r3);
  }
}
function ApplicantFormComponent_form_4_option_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fra_r4 = ctx.$implicit;
    \u0275\u0275property("value", fra_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(fra_r4.name);
  }
}
function ApplicantFormComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7, 0);
    \u0275\u0275listener("ngSubmit", function ApplicantFormComponent_form_4_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveApplicant());
    });
    \u0275\u0275elementStart(2, "div", 8)(3, "h2", 9);
    \u0275\u0275text(4, "Personal Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 10)(6, "div", 11)(7, "label", 12);
    \u0275\u0275text(8, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.first_name, $event) || (ctx_r1.applicant.first_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 11)(11, "label", 14);
    \u0275\u0275text(12, "Middle Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.middle_name, $event) || (ctx_r1.applicant.middle_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 11)(15, "label", 16);
    \u0275\u0275text(16, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.last_name, $event) || (ctx_r1.applicant.last_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 11)(19, "label", 18);
    \u0275\u0275text(20, "Passport Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.passport_number, $event) || (ctx_r1.applicant.passport_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 11)(23, "label", 20);
    \u0275\u0275text(24, "Date of Birth");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.date_of_birth, $event) || (ctx_r1.applicant.date_of_birth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 11)(27, "label", 22);
    \u0275\u0275text(28, "Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_select_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.country, $event) || (ctx_r1.applicant.country = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(30, "option", 24);
    \u0275\u0275text(31, "Select Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 25);
    \u0275\u0275text(33, "United States");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 26);
    \u0275\u0275text(35, "Canada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 27);
    \u0275\u0275text(37, "Mexico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 28);
    \u0275\u0275text(39, "Brazil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 29);
    \u0275\u0275text(41, "United Kingdom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 30);
    \u0275\u0275text(43, "France");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 31);
    \u0275\u0275text(45, "Germany");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "option", 32);
    \u0275\u0275text(47, "Italy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "option", 33);
    \u0275\u0275text(49, "Spain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "option", 34);
    \u0275\u0275text(51, "China");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "option", 35);
    \u0275\u0275text(53, "India");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "option", 36);
    \u0275\u0275text(55, "Japan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "option", 37);
    \u0275\u0275text(57, "South Korea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "option", 38);
    \u0275\u0275text(59, "Australia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "option", 39);
    \u0275\u0275text(61, "New Zealand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "option", 40);
    \u0275\u0275text(63, "Philippines");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "option", 41);
    \u0275\u0275text(65, "Saudi Arabia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "option", 42);
    \u0275\u0275text(67, "United Arab Emirates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "option", 43);
    \u0275\u0275text(69, "Qatar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "option", 44);
    \u0275\u0275text(71, "Kuwait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "option", 45);
    \u0275\u0275text(73, "Bahrain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "option", 46);
    \u0275\u0275text(75, "Oman");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "option", 47);
    \u0275\u0275text(77, "Egypt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "option", 48);
    \u0275\u0275text(79, "Jordan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "option", 49);
    \u0275\u0275text(81, "Lebanon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "option", 50);
    \u0275\u0275text(83, "Iraq");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "option", 51);
    \u0275\u0275text(85, "Iran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "option", 52);
    \u0275\u0275text(87, "Turkey");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "option", 53);
    \u0275\u0275text(89, "Israel");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(90, "div", 8)(91, "h2", 9);
    \u0275\u0275text(92, "Contact Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "div", 54)(94, "div", 11)(95, "label", 55);
    \u0275\u0275text(96, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_97_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.email, $event) || (ctx_r1.applicant.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 11)(99, "label", 57);
    \u0275\u0275text(100, "Phone Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_101_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.phone_number, $event) || (ctx_r1.applicant.phone_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 11)(103, "label", 59);
    \u0275\u0275text(104, "WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_105_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.whatsapp, $event) || (ctx_r1.applicant.whatsapp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 11)(107, "label", 61);
    \u0275\u0275text(108, "Facebook URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_109_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.facebook, $event) || (ctx_r1.applicant.facebook = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "div", 63)(111, "label", 64);
    \u0275\u0275text(112, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "textarea", 65);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_textarea_ngModelChange_113_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.address, $event) || (ctx_r1.applicant.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(114, "div", 8)(115, "h2", 9);
    \u0275\u0275text(116, "Employment Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "div", 10)(118, "div", 11)(119, "label", 66);
    \u0275\u0275text(120, "Main Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "select", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_select_ngModelChange_121_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.main_status, $event) || (ctx_r1.applicant.main_status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(122, "option", 24);
    \u0275\u0275text(123, "Select Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(124, ApplicantFormComponent_form_4_option_124_Template, 2, 2, "option", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(125, "div", 11)(126, "label", 69);
    \u0275\u0275text(127, "Applicant Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "select", 70);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_select_ngModelChange_128_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.applicant_type, $event) || (ctx_r1.applicant.applicant_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(129, "option");
    \u0275\u0275text(130, "household");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "option");
    \u0275\u0275text(132, "skilled");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(133, "div", 11)(134, "label", 71);
    \u0275\u0275text(135, "Foreign Recruitment Agency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(136, "select", 72);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_select_ngModelChange_136_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.fra_id, $event) || (ctx_r1.applicant.fra_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(137, "option", 73);
    \u0275\u0275text(138, "Select Agency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(139, ApplicantFormComponent_form_4_option_139_Template, 2, 2, "option", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(140, "div", 11)(141, "label", 74);
    \u0275\u0275text(142, "Deployment Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_4_Template_input_ngModelChange_143_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.date_deployment, $event) || (ctx_r1.applicant.date_deployment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(144, "div", 76)(145, "a", 77);
    \u0275\u0275text(146, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "button", 78);
    \u0275\u0275text(148, " Save ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const applicantForm_r5 = \u0275\u0275reference(1);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.first_name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.middle_name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.last_name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.passport_number);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.date_of_birth);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.country);
    \u0275\u0275advance(68);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.phone_number);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.whatsapp);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.facebook);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.address);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.main_status);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.statuses);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.applicant_type);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.fra_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.fras);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.date_deployment);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !applicantForm_r5.form.valid);
  }
}
var ApplicantFormComponent = class _ApplicantFormComponent {
  applicantService = inject(ApplicantService);
  fraService = inject(FraService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  // Inject ChangeDetectorRef
  applicant = {};
  isEditMode = false;
  applicantId = null;
  isLoading = false;
  // Add loading state
  statuses = [];
  // Add statuses property
  fras = [];
  ngOnInit() {
    this.loadStatuses();
    this.loadFras();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.applicantId = +id;
      this.loadApplicantData(this.applicantId);
    }
  }
  async loadFras() {
    try {
      this.fras = await this.fraService.getFras();
    } catch (error) {
      console.error("Error loading FRAs:", error);
    }
  }
  async loadStatuses() {
    try {
      this.statuses = await this.applicantService.getStatuses();
    } catch (error) {
      console.error("Error loading statuses:", error);
    }
  }
  async loadApplicantData(id) {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.applicantService.getApplicantById(id);
      if (data) {
        this.applicant = data;
        this.cdr.detectChanges();
      } else {
        this.router.navigate(["/admin/applicants"]);
      }
    } catch (error) {
      console.error("Error loading applicant data:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  async saveApplicant() {
    try {
      if (this.isEditMode && this.applicantId) {
        await this.applicantService.updateApplicant(__spreadProps(__spreadValues({}, this.applicant), { id: this.applicantId }));
      } else {
        await this.applicantService.createApplicant(this.applicant);
      }
      this.router.navigate(["/admin/applicants"]);
    } catch (error) {
      console.error("Error saving applicant:", error);
      alert("Failed to save applicant.");
    }
  }
  static \u0275fac = function ApplicantFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicantFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantFormComponent, selectors: [["app-applicant-form"]], decls: 5, vars: 3, consts: [["applicantForm", "ngForm"], [1, "glass-card", "w-full", "p-8", "text-white"], [1, "text-3xl", "font-bold", "mb-6"], ["class", "text-center py-8", 4, "ngIf"], [3, "ngSubmit", 4, "ngIf"], [1, "text-center", "py-8"], [1, "fas", "fa-spinner", "fa-spin", "text-4xl", "mt-4"], [3, "ngSubmit"], [1, "mb-8"], [1, "text-xl", "font-semibold", "mb-4", "border-b", "border-white/20", "pb-2"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-x-6"], [1, "form-group"], ["for", "first_name", 1, "form-label"], ["type", "text", "id", "first_name", "name", "first_name", "required", "", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "middle_name", 1, "form-label"], ["type", "text", "id", "middle_name", "name", "middle_name", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "last_name", 1, "form-label"], ["type", "text", "id", "last_name", "name", "last_name", "required", "", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "passport_number", 1, "form-label"], ["type", "text", "id", "passport_number", "name", "passport_number", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "date_of_birth", 1, "form-label"], ["type", "date", "id", "date_of_birth", "name", "date_of_birth", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "country", 1, "form-label"], ["id", "country", "name", "country", 1, "form-field", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "US"], ["value", "CA"], ["value", "MX"], ["value", "BR"], ["value", "GB"], ["value", "FR"], ["value", "DE"], ["value", "IT"], ["value", "ES"], ["value", "CN"], ["value", "IN"], ["value", "JP"], ["value", "KR"], ["value", "AU"], ["value", "NZ"], ["value", "PH"], ["value", "SA"], ["value", "AE"], ["value", "QA"], ["value", "KW"], ["value", "BH"], ["value", "OM"], ["value", "EG"], ["value", "JO"], ["value", "LB"], ["value", "IQ"], ["value", "IR"], ["value", "TR"], ["value", "IL"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-x-6"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "phone_number", 1, "form-label"], ["type", "text", "id", "phone_number", "name", "phone_number", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "whatsapp", 1, "form-label"], ["type", "text", "id", "whatsapp", "name", "whatsapp", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "facebook", 1, "form-label"], ["type", "url", "id", "facebook", "name", "facebook", 1, "form-field", 3, "ngModelChange", "ngModel"], [1, "form-group", "md:col-span-2"], ["for", "address", 1, "form-label"], ["id", "address", "name", "address", "rows", "3", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "main_status", 1, "form-label"], ["id", "main_status", "name", "main_status", 1, "form-field", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "applicant_type", 1, "form-label"], ["id", "applicant_type", "name", "applicant_type", 1, "form-field", 3, "ngModelChange", "ngModel"], ["for", "fra_id", 1, "form-label"], ["id", "fra_id", "name", "fra_id", 1, "form-field", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["for", "date_deployment", 1, "form-label"], ["type", "date", "id", "date_deployment", "name", "date_deployment", 1, "form-field", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "items-center", "mt-8"], ["routerLink", "/admin/applicants", 1, "text-gray-300", "hover:text-white", "mr-6"], ["type", "submit", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-6", "rounded-md", "transition", "duration-300", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"], [3, "value"]], template: function ApplicantFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "h1", 2);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, ApplicantFormComponent_div_3_Template, 4, 0, "div", 3)(4, ApplicantFormComponent_form_4_Template, 149, 19, "form", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.isEditMode ? "Edit" : "Create", " Applicant");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink], styles: ["\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  color: #D1D5DB;\n}\n.form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  border-width: 0;\n  border-bottom-width: 2px;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  padding: 0.625rem;\n  color: white;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n.form-field[_ngcontent-%COMP%]::placeholder {\n  color: #9CA3AF;\n}\n.form-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  --tw-ring-shadow: 0 0 #0000;\n  border-color: #60A5FA;\n}\n.form-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background-color: #1F2937;\n  color: white;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n/*# sourceMappingURL=applicant-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantFormComponent, [{
    type: Component,
    args: [{ selector: "app-applicant-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="glass-card w-full p-8 text-white">
  <h1 class="text-3xl font-bold mb-6">{{ isEditMode ? 'Edit' : 'Create' }} Applicant</h1>

  <div *ngIf="isLoading" class="text-center py-8">
    <p>Loading applicant data...</p>
    <!-- You can add a spinner icon here if Font Awesome is available -->
    <i class="fas fa-spinner fa-spin text-4xl mt-4"></i>
  </div>

  <form *ngIf="!isLoading" (ngSubmit)="saveApplicant()" #applicantForm="ngForm">
    <!-- Personal Information -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Personal Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <div class="form-group">
          <label for="first_name" class="form-label">First Name</label>
          <input type="text" id="first_name" name="first_name" [(ngModel)]="applicant.first_name" required class="form-field">
        </div>
        <div class="form-group">
          <label for="middle_name" class="form-label">Middle Name</label>
          <input type="text" id="middle_name" name="middle_name" [(ngModel)]="applicant.middle_name" class="form-field">
        </div>
        <div class="form-group">
          <label for="last_name" class="form-label">Last Name</label>
          <input type="text" id="last_name" name="last_name" [(ngModel)]="applicant.last_name" required class="form-field">
        </div>
        <div class="form-group">
          <label for="passport_number" class="form-label">Passport Number</label>
          <input type="text" id="passport_number" name="passport_number" [(ngModel)]="applicant.passport_number" class="form-field">
        </div>
        <div class="form-group">
          <label for="date_of_birth" class="form-label">Date of Birth</label>
          <input type="date" id="date_of_birth" name="date_of_birth" [(ngModel)]="applicant.date_of_birth" class="form-field">
        </div>
        <div class="form-group">
          <label for="country" class="form-label">Country</label>
          <select id="country" name="country" [(ngModel)]="applicant.country" class="form-field">
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="BR">Brazil</option>
            <option value="GB">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="CN">China</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
            <option value="PH">Philippines</option>
            <option value="SA">Saudi Arabia</option>
            <option value="AE">United Arab Emirates</option>
            <option value="QA">Qatar</option>
            <option value="KW">Kuwait</option>
            <option value="BH">Bahrain</option>
            <option value="OM">Oman</option>
            <option value="EG">Egypt</option>
            <option value="JO">Jordan</option>
            <option value="LB">Lebanon</option>
            <option value="IQ">Iraq</option>
            <option value="IR">Iran</option>
            <option value="TR">Turkey</option>
            <option value="IL">Israel</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Contact Details -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Contact Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" name="email" [(ngModel)]="applicant.email" class="form-field">
        </div>
        <div class="form-group">
          <label for="phone_number" class="form-label">Phone Number</label>
          <input type="text" id="phone_number" name="phone_number" [(ngModel)]="applicant.phone_number" class="form-field">
        </div>
        <div class="form-group">
          <label for="whatsapp" class="form-label">WhatsApp</label>
          <input type="text" id="whatsapp" name="whatsapp" [(ngModel)]="applicant.whatsapp" class="form-field">
        </div>
        <div class="form-group">
          <label for="facebook" class="form-label">Facebook URL</label>
          <input type="url" id="facebook" name="facebook" [(ngModel)]="applicant.facebook" class="form-field">
        </div>
        <div class="form-group md:col-span-2">
          <label for="address" class="form-label">Address</label>
          <textarea id="address" name="address" [(ngModel)]="applicant.address" rows="3" class="form-field"></textarea>
        </div>
      </div>
    </div>

    <!-- Employment Details -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Employment Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <div class="form-group">
          <label for="main_status" class="form-label">Main Status</label>
          <select id="main_status" name="main_status" [(ngModel)]="applicant.main_status" class="form-field">
            <option value="">Select Status</option>
            <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="applicant_type" class="form-label">Applicant Type</label>
          <select id="applicant_type" name="applicant_type" [(ngModel)]="applicant.applicant_type" class="form-field">
            <option>household</option>
            <option>skilled</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fra_id" class="form-label">Foreign Recruitment Agency</label>
          <select id="fra_id" name="fra_id" [(ngModel)]="applicant.fra_id" class="form-field">
            <option [ngValue]="null">Select Agency</option>
            <option *ngFor="let fra of fras" [value]="fra.id">{{ fra.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date_deployment" class="form-label">Deployment Date</label>
          <input type="date" id="date_deployment" name="date_deployment" [(ngModel)]="applicant.date_deployment" class="form-field">
        </div>
      </div>
    </div>

    <div class="flex justify-end items-center mt-8">
      <a routerLink="/admin/applicants" class="text-gray-300 hover:text-white mr-6">Cancel</a>
      <button type="submit" [disabled]="!applicantForm.form.valid"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Save
      </button>
    </div>
  </form>
</div>
`, styles: ["/* src/app/admin/components/applicant-form/applicant-form.css */\n.form-group {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n}\n.form-label {\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  color: #D1D5DB;\n}\n.form-field {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  border-width: 0;\n  border-bottom-width: 2px;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  padding: 0.625rem;\n  color: white;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n.form-field::placeholder {\n  color: #9CA3AF;\n}\n.form-field:focus {\n  outline: none;\n  --tw-ring-shadow: 0 0 #0000;\n  border-color: #60A5FA;\n}\n.form-field option {\n  background-color: #1F2937;\n  color: white;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n/*# sourceMappingURL=applicant-form.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicantFormComponent, { className: "ApplicantFormComponent", filePath: "src/app/admin/components/applicant-form/applicant-form.ts", lineNumber: 17 });
})();

// src/app/admin/services/case.service.ts
var CaseService = class _CaseService {
  db = inject(DatabaseService);
  async getCases() {
    const response = await firstValueFrom(this.db.query(GET_CASES));
    if (response && response.data) {
      return response.data.map((item) => __spreadProps(__spreadValues({}, item), {
        employee_name: `${item.last_name}, ${item.first_name}`
      }));
    }
    return [];
  }
  async getCaseById(id) {
    const res = await firstValueFrom(this.db.query(GET_CASE_BY_ID, [id]));
    if (res && res.data && res.data.length > 0) {
      const caseItem = res.data[0];
      return __spreadProps(__spreadValues({}, caseItem), {
        employee_name: `${caseItem.last_name}, ${caseItem.first_name}`
      });
    }
    return null;
  }
  async createCase(caseData) {
    const params = this.mapCaseToParams(caseData);
    return firstValueFrom(this.db.query(CREATE_CASE, params));
  }
  async updateCase(caseData) {
    const params = this.mapCaseToParams(caseData);
    return firstValueFrom(this.db.query(UPDATE_CASE, [...params, caseData.id]));
  }
  async deleteCase(id) {
    return firstValueFrom(this.db.query(DELETE_CASE, [id]));
  }
  mapCaseToParams(caseData) {
    return [
      caseData.employee_id || null,
      caseData.category || "",
      caseData.report || "",
      caseData.report_status || "open",
      // Default to 'open' if not provided
      caseData.agency_id || null
    ];
  }
  static \u0275fac = function CaseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CaseService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CaseService, factory: _CaseService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/pages/case-list/case-list.ts
var _c03 = (a0, a1) => ({ "bg-green-600": a0, "bg-red-600": a1 });
var _c13 = (a0) => ["/admin/cases/edit", a0];
function CaseListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p");
    \u0275\u0275text(2, "Loading cases...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 9);
    \u0275\u0275elementEnd();
  }
}
function CaseListComponent_div_9_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 18)(6, "span", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 18);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 20)(12, "a", 21);
    \u0275\u0275text(13, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 22);
    \u0275\u0275listener("click", function CaseListComponent_div_9_tr_15_Template_button_click_14_listener() {
      const caseItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCase(caseItem_r4.id));
    });
    \u0275\u0275text(15, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const caseItem_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(caseItem_r4.employee_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(caseItem_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(9, _c03, caseItem_r4.report_status === "open", caseItem_r4.report_status === "closed"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", caseItem_r4.report_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 6, caseItem_r4.date_reported, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c13, caseItem_r4.id));
  }
}
function CaseListComponent_div_9_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2, "No cases found.");
    \u0275\u0275elementEnd()();
  }
}
function CaseListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "table", 11)(2, "thead")(3, "tr", 12)(4, "th", 13);
    \u0275\u0275listener("click", function CaseListComponent_div_9_Template_th_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("employee_name"));
    });
    \u0275\u0275text(5, " Employee ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 13);
    \u0275\u0275listener("click", function CaseListComponent_div_9_Template_th_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("category"));
    });
    \u0275\u0275text(7, " Category ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 13);
    \u0275\u0275listener("click", function CaseListComponent_div_9_Template_th_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("report_status"));
    });
    \u0275\u0275text(9, " Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 13);
    \u0275\u0275listener("click", function CaseListComponent_div_9_Template_th_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("date_reported"));
    });
    \u0275\u0275text(11, " Date Reported ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 14);
    \u0275\u0275text(13, " Actions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, CaseListComponent_div_9_tr_15_Template, 16, 14, "tr", 15)(16, CaseListComponent_div_9_tr_16_Template, 3, 0, "tr", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.filteredCases);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredCases || ctx_r1.filteredCases.length === 0);
  }
}
var CaseListComponent = class _CaseListComponent {
  caseService = inject(CaseService);
  cdr = inject(ChangeDetectorRef);
  allCases = [];
  filteredCases = [];
  searchTerm = "";
  isLoading = false;
  // Add loading state
  sortDirection = {};
  ngOnInit() {
    this.loadCases();
  }
  async loadCases() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allCases = await this.caseService.getCases();
      this.filteredCases = [...this.allCases];
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error loading cases:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  filterCases() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCases = this.allCases.filter((c) => (c.employee_name?.toLowerCase() ?? "").includes(term) || (c.category?.toLowerCase() ?? "").includes(term) || (c.report_status?.toLowerCase() ?? "").includes(term));
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredCases.sort((a, b) => {
      let valA;
      let valB;
      if (field === "employee_name") {
        valA = a.employee_name ?? "";
        valB = b.employee_name ?? "";
      } else {
        valA = a[field] ?? "";
        valB = b[field] ?? "";
      }
      if (valA < valB)
        return direction === "asc" ? -1 : 1;
      if (valA > valB)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteCase(id) {
    if (confirm("Are you sure you want to delete this case?")) {
      try {
        await this.caseService.deleteCase(id);
        this.loadCases();
      } catch (error) {
        console.error("Error deleting case:", error);
        alert("Failed to delete case.");
      }
    }
  }
  static \u0275fac = function CaseListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CaseListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseListComponent, selectors: [["app-case-list"]], decls: 10, vars: 3, consts: [[1, "glass-card", "p-8", "text-white", "rounded-xl"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-3xl", "font-bold"], ["routerLink", "/admin/cases/new", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], [1, "mb-4"], ["type", "text", "placeholder", "Search cases...", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], ["class", "text-center py-8", 4, "ngIf"], ["class", "overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg", 4, "ngIf"], [1, "text-center", "py-8"], [1, "fas", "fa-spinner", "fa-spin", "text-4xl", "mt-4"], [1, "overflow-x-auto", "bg-black/30", "backdrop-blur-xl", "rounded-lg", "shadow-lg"], [1, "min-w-full"], [1, "border-b", "border-white/20"], [1, "px-6", "py-3", "text-left", "text-sm", "font-medium", "uppercase", "tracking-wider", "cursor-pointer", 3, "click"], [1, "px-6", "py-3", "text-right", "text-sm", "font-medium", "uppercase", "tracking-wider"], ["class", "border-b border-white/10 hover:bg-white/5", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "border-b", "border-white/10", "hover:bg-white/5"], [1, "px-6", "py-4", "whitespace-nowrap"], [1, "px-2", "inline-flex", "text-xs", "leading-5", "font-semibold", "rounded-full", 3, "ngClass"], [1, "px-6", "py-4", "whitespace-nowrap", "text-right", "text-sm", "font-medium"], [1, "text-indigo-400", "hover:text-indigo-300", "mr-4", 3, "routerLink"], [1, "text-red-400", "hover:text-red-300", 3, "click"], ["colspan", "5", 1, "text-center", "py-8"]], template: function CaseListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Cases");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3);
      \u0275\u0275text(5, " New Case ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CaseListComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CaseListComponent_Template_input_ngModelChange_7_listener() {
        return ctx.filterCases();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, CaseListComponent_div_8_Template, 4, 0, "div", 6)(9, CaseListComponent_div_9_Template, 17, 2, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink, DatePipe], styles: ["\n\n/*# sourceMappingURL=case-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseListComponent, [{
    type: Component,
    args: [{ selector: "app-case-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="glass-card p-8 text-white rounded-xl">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Cases</h1>
    <a routerLink="/admin/cases/new"
       class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
      New Case
    </a>
  </div>

  <div class="mb-4">
    <input type="text" placeholder="Search cases..." [(ngModel)]="searchTerm" (ngModelChange)="filterCases()"
           class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
  </div>

  <div *ngIf="isLoading" class="text-center py-8">
    <p>Loading cases...</p>
    <!-- You can add a spinner icon here if Font Awesome is available -->
    <i class="fas fa-spinner fa-spin text-4xl mt-4"></i>
  </div>

  <div *ngIf="!isLoading" class="overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-white/20">
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('employee_name')">
            Employee
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('category')">
            Category
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('report_status')">
            Status
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('date_reported')">
            Date Reported
          </th>
          <th class="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let caseItem of filteredCases" class="border-b border-white/10 hover:bg-white/5">
          <td class="px-6 py-4 whitespace-nowrap">{{ caseItem.employee_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ caseItem.category }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  [ngClass]="{
                    'bg-green-600': caseItem.report_status === 'open',
                    'bg-red-600': caseItem.report_status === 'closed'
                  }">
              {{ caseItem.report_status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ caseItem.date_reported | date:'shortDate' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a [routerLink]="['/admin/cases/edit', caseItem.id]" class="text-indigo-400 hover:text-indigo-300 mr-4">Edit</a>
            <button (click)="deleteCase(caseItem.id)" class="text-red-400 hover:text-red-300">Delete</button>
          </td>
        </tr>
        <tr *ngIf="!filteredCases || filteredCases.length === 0">
          <td colspan="5" class="text-center py-8">No cases found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`, styles: ["/* src/app/admin/pages/case-list/case-list.css */\n/*# sourceMappingURL=case-list.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaseListComponent, { className: "CaseListComponent", filePath: "src/app/admin/pages/case-list/case-list.ts", lineNumber: 15 });
})();

// src/app/admin/pages/case-form/case-form.ts
function CaseFormComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p");
    \u0275\u0275text(2, "Loading case details...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 5);
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_4_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", app_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", app_r3.last_name, ", ", app_r3.first_name, " (", app_r3.passport_number, ") ");
  }
}
function CaseFormComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 6);
    \u0275\u0275listener("ngSubmit", function CaseFormComponent_form_4_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCase());
    });
    \u0275\u0275elementStart(1, "div")(2, "label", 7);
    \u0275\u0275text(3, "Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 8);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_4_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.employee_id, $event) || (ctx_r1.caseItem.employee_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 9);
    \u0275\u0275text(6, "Select an Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, CaseFormComponent_form_4_option_7_Template, 2, 4, "option", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 11);
    \u0275\u0275text(10, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_4_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.category, $event) || (ctx_r1.caseItem.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 13);
    \u0275\u0275text(14, "Report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 14);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_4_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.report, $event) || (ctx_r1.caseItem.report = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "label", 15);
    \u0275\u0275text(18, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_4_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.report_status, $event) || (ctx_r1.caseItem.report_status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 17);
    \u0275\u0275text(21, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 18);
    \u0275\u0275text(23, "Closed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 19);
    \u0275\u0275text(25, "Pending");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div")(27, "label", 20);
    \u0275\u0275text(28, "Agency ID (Optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_4_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.agency_id, $event) || (ctx_r1.caseItem.agency_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 22)(31, "button", 23);
    \u0275\u0275listener("click", function CaseFormComponent_form_4_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/cases"]));
    });
    \u0275\u0275text(32, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 24);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.employee_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.applicants);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.category);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.report);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.report_status);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.agency_id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditMode ? "Update Case" : "Create Case", " ");
  }
}
var CaseFormComponent = class _CaseFormComponent {
  caseService = inject(CaseService);
  applicantService = inject(ApplicantService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  // Inject ChangeDetectorRef
  caseItem = {
    report_status: "open"
    // Default status
  };
  applicants = [];
  // For the applicant dropdown
  isEditMode = false;
  isLoading = false;
  // Add loading state
  async ngOnInit() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      await this.loadApplicants();
      this.route.paramMap.subscribe(async (params) => {
        const id = params.get("id");
        if (id) {
          this.isEditMode = true;
          await this.loadCase(+id);
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error("Error during initialization:", error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  async loadApplicants() {
    try {
      this.applicants = await this.applicantService.getApplicants();
    } catch (error) {
      console.error("Error loading applicants:", error);
    }
  }
  async loadCase(id) {
    try {
      const fetchedCase = await this.caseService.getCaseById(id);
      if (fetchedCase) {
        this.caseItem = fetchedCase;
      } else {
        console.error("Case not found");
        this.router.navigate(["/admin/cases"]);
      }
    } catch (error) {
      console.error("Error loading case:", error);
    }
  }
  async saveCase() {
    try {
      if (this.isEditMode) {
        await this.caseService.updateCase(this.caseItem);
      } else {
        await this.caseService.createCase(this.caseItem);
      }
      this.router.navigate(["/admin/cases"]);
    } catch (error) {
      console.error("Error saving case:", error);
      alert("Failed to save case.");
    }
  }
  static \u0275fac = function CaseFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CaseFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseFormComponent, selectors: [["app-case-form"]], decls: 5, vars: 3, consts: [[1, "glass-card", "p-8", "text-white", "rounded-xl"], [1, "text-3xl", "font-bold", "mb-6"], ["class", "text-center py-8", 4, "ngIf"], ["class", "space-y-4", 3, "ngSubmit", 4, "ngIf"], [1, "text-center", "py-8"], [1, "fas", "fa-spinner", "fa-spin", "text-4xl", "mt-4"], [1, "space-y-4", 3, "ngSubmit"], ["for", "employee_id", 1, "block", "text-sm", "font-medium", "text-gray-300"], ["id", "employee_id", "name", "employee_id", "required", "", 1, "mt-1", "block", "w-full", "px-3", "py-2", "bg-white/20", "border", "border-transparent", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "sm:text-sm", "text-gray-800", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["for", "category", 1, "block", "text-sm", "font-medium", "text-gray-300"], ["type", "text", "id", "category", "name", "category", "required", "", 1, "mt-1", "block", "w-full", "px-3", "py-2", "bg-white/20", "border", "border-transparent", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "sm:text-sm", "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "report", 1, "block", "text-sm", "font-medium", "text-gray-300"], ["id", "report", "name", "report", "rows", "5", "required", "", 1, "mt-1", "block", "w-full", "px-3", "py-2", "bg-white/20", "border", "border-transparent", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "sm:text-sm", "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "report_status", 1, "block", "text-sm", "font-medium", "text-gray-300"], ["id", "report_status", "name", "report_status", "required", "", 1, "mt-1", "block", "w-full", "px-3", "py-2", "bg-white/20", "border", "border-transparent", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "sm:text-sm", "text-gray-800", 3, "ngModelChange", "ngModel"], ["value", "open"], ["value", "closed"], ["value", "pending"], ["for", "agency_id", 1, "block", "text-sm", "font-medium", "text-gray-300"], ["type", "number", "id", "agency_id", "name", "agency_id", 1, "mt-1", "block", "w-full", "px-3", "py-2", "bg-white/20", "border", "border-transparent", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "sm:text-sm", "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "space-x-3"], ["type", "button", 1, "px-4", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", 3, "click"], ["type", "submit", 1, "inline-flex", "justify-center", "py-2", "px-4", "border", "border-transparent", "shadow-sm", "text-sm", "font-medium", "rounded-md", "text-white", "bg-blue-600", "hover:bg-blue-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-blue-500"], [3, "ngValue"]], template: function CaseFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, CaseFormComponent_div_3_Template, 4, 0, "div", 2)(4, CaseFormComponent_form_4_Template, 35, 8, "form", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Case" : "New Case");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n/*# sourceMappingURL=case-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseFormComponent, [{
    type: Component,
    args: [{ selector: "app-case-form", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="glass-card p-8 text-white rounded-xl">
  <h1 class="text-3xl font-bold mb-6">{{ isEditMode ? 'Edit Case' : 'New Case' }}</h1>

  <div *ngIf="isLoading" class="text-center py-8">
    <p>Loading case details...</p>
    <!-- You can add a spinner icon here if Font Awesome is available -->
    <i class="fas fa-spinner fa-spin text-4xl mt-4"></i>
  </div>

  <form *ngIf="!isLoading" (ngSubmit)="saveCase()" class="space-y-4">
    <div>
      <label for="employee_id" class="block text-sm font-medium text-gray-300">Employee</label>
      <select id="employee_id" name="employee_id" [(ngModel)]="caseItem.employee_id" required
              class="mt-1 block w-full px-3 py-2 bg-white/20 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800">
        <option [ngValue]="null" disabled>Select an Employee</option>
        <option *ngFor="let app of applicants" [ngValue]="app.id">
          {{ app.last_name }}, {{ app.first_name }} ({{ app.passport_number }})
        </option>
      </select>
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-300">Category</label>
      <input type="text" id="category" name="category" [(ngModel)]="caseItem.category" required
             class="mt-1 block w-full px-3 py-2 bg-white/20 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800">
    </div>

    <div>
      <label for="report" class="block text-sm font-medium text-gray-300">Report</label>
      <textarea id="report" name="report" [(ngModel)]="caseItem.report" rows="5" required
                class="mt-1 block w-full px-3 py-2 bg-white/20 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"></textarea>
    </div>

    <div>
      <label for="report_status" class="block text-sm font-medium text-gray-300">Status</label>
      <select id="report_status" name="report_status" [(ngModel)]="caseItem.report_status" required
              class="mt-1 block w-full px-3 py-2 bg-white/20 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <div>
      <label for="agency_id" class="block text-sm font-medium text-gray-300">Agency ID (Optional)</label>
      <input type="number" id="agency_id" name="agency_id" [(ngModel)]="caseItem.agency_id"
             class="mt-1 block w-full px-3 py-2 bg-white/20 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800">
    </div>

    <div class="flex justify-end space-x-3">
      <button type="button" (click)="router.navigate(['/admin/cases'])"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cancel
      </button>
      <button type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {{ isEditMode ? 'Update Case' : 'Create Case' }}
      </button>
    </div>
  </form>
</div>
`, styles: ["/* src/app/admin/pages/case-form/case-form.css */\n/*# sourceMappingURL=case-form.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaseFormComponent, { className: "CaseFormComponent", filePath: "src/app/admin/pages/case-form/case-form.ts", lineNumber: 16 });
})();

// src/app/admin/pages/fra-list/fra-list.ts
var _c04 = (a0) => ["/admin/fras/edit", a0];
function FraListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p");
    \u0275\u0275text(2, "Loading FRAs...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 9);
    \u0275\u0275elementEnd();
  }
}
function FraListComponent_div_9_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 19)(8, "a", 20);
    \u0275\u0275text(9, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 21);
    \u0275\u0275listener("click", function FraListComponent_div_9_tr_13_Template_button_click_10_listener() {
      const fra_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteFra(fra_r4.id));
    });
    \u0275\u0275text(11, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fra_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.contact);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.country);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c04, fra_r4.id));
  }
}
function FraListComponent_div_9_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275text(2, "No FRAs found.");
    \u0275\u0275elementEnd()();
  }
}
function FraListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "table", 11)(2, "thead")(3, "tr", 12)(4, "th", 13);
    \u0275\u0275listener("click", function FraListComponent_div_9_Template_th_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("name"));
    });
    \u0275\u0275text(5, " Name ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 13);
    \u0275\u0275listener("click", function FraListComponent_div_9_Template_th_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("contact"));
    });
    \u0275\u0275text(7, " Contact ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 13);
    \u0275\u0275listener("click", function FraListComponent_div_9_Template_th_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("country"));
    });
    \u0275\u0275text(9, " Country ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 14);
    \u0275\u0275text(11, " Actions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, FraListComponent_div_9_tr_13_Template, 12, 6, "tr", 15)(14, FraListComponent_div_9_tr_14_Template, 3, 0, "tr", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.filteredFras);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredFras || ctx_r1.filteredFras.length === 0);
  }
}
var FraListComponent = class _FraListComponent {
  fraService = inject(FraService);
  cdr = inject(ChangeDetectorRef);
  allFras = [];
  filteredFras = [];
  searchTerm = "";
  isLoading = false;
  sortDirection = {};
  ngOnInit() {
    this.loadFras();
  }
  async loadFras() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allFras = await this.fraService.getFras();
      this.filterFras();
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error loading FRAs:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  filterFras() {
    const term = this.searchTerm.toLowerCase();
    this.filteredFras = this.allFras.filter((fra) => (fra.name?.toLowerCase() ?? "").includes(term) || (fra.contact?.toLowerCase() ?? "").includes(term) || (fra.country?.toLowerCase() ?? "").includes(term));
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredFras.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB)
        return direction === "asc" ? -1 : 1;
      if (valA > valB)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteFra(id) {
    if (confirm("Are you sure you want to delete this FRA?")) {
      try {
        await this.fraService.deleteFra(id);
        this.loadFras();
      } catch (error) {
        console.error("Error deleting FRA:", error);
        alert("Failed to delete FRA.");
      }
    }
  }
  static \u0275fac = function FraListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FraListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraListComponent, selectors: [["app-fra-list"]], decls: 10, vars: 3, consts: [[1, "glass-card", "p-8", "text-white", "rounded-xl"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-3xl", "font-bold"], ["routerLink", "/admin/fras/new", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], [1, "mb-4"], ["type", "text", "placeholder", "Search FRAs...", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], ["class", "text-center py-8", 4, "ngIf"], ["class", "overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg", 4, "ngIf"], [1, "text-center", "py-8"], [1, "fas", "fa-spinner", "fa-spin", "text-4xl", "mt-4"], [1, "overflow-x-auto", "bg-black/30", "backdrop-blur-xl", "rounded-lg", "shadow-lg"], [1, "min-w-full"], [1, "border-b", "border-white/20"], [1, "px-6", "py-3", "text-left", "text-sm", "font-medium", "uppercase", "tracking-wider", "cursor-pointer", 3, "click"], [1, "px-6", "py-3", "text-right", "text-sm", "font-medium", "uppercase", "tracking-wider"], ["class", "border-b border-white/10 hover:bg-white/5", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "border-b", "border-white/10", "hover:bg-white/5"], [1, "px-6", "py-4", "whitespace-nowrap"], [1, "px-6", "py-4", "whitespace-nowrap", "text-right", "text-sm", "font-medium"], [1, "text-indigo-400", "hover:text-indigo-300", "mr-4", 3, "routerLink"], [1, "text-red-400", "hover:text-red-300", 3, "click"], ["colspan", "4", 1, "text-center", "py-8"]], template: function FraListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Foreign Recruitment Agencies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3);
      \u0275\u0275text(5, " New FRA ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function FraListComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function FraListComponent_Template_input_ngModelChange_7_listener() {
        return ctx.filterFras();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, FraListComponent_div_8_Template, 4, 0, "div", 6)(9, FraListComponent_div_9_Template, 15, 2, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraListComponent, [{
    type: Component,
    args: [{ selector: "app-fra-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="glass-card p-8 text-white rounded-xl">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Foreign Recruitment Agencies</h1>
    <a routerLink="/admin/fras/new"
       class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
      New FRA
    </a>
  </div>

  <div class="mb-4">
    <input type="text" placeholder="Search FRAs..." [(ngModel)]="searchTerm" (ngModelChange)="filterFras()"
           class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
  </div>

  <div *ngIf="isLoading" class="text-center py-8">
    <p>Loading FRAs...</p>
    <!-- You can add a spinner icon here if Font Awesome is available -->
    <i class="fas fa-spinner fa-spin text-4xl mt-4"></i>
  </div>

  <div *ngIf="!isLoading" class="overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-white/20">
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('name')">
            Name
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('contact')">
            Contact
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" (click)="sort('country')">
            Country
          </th>
          <th class="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let fra of filteredFras" class="border-b border-white/10 hover:bg-white/5">
          <td class="px-6 py-4 whitespace-nowrap">{{ fra.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ fra.contact }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ fra.country }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a [routerLink]="['/admin/fras/edit', fra.id]" class="text-indigo-400 hover:text-indigo-300 mr-4">Edit</a>
            <button (click)="deleteFra(fra.id)" class="text-red-400 hover:text-red-300">Delete</button>
          </td>
        </tr>
        <tr *ngIf="!filteredFras || filteredFras.length === 0">
          <td colspan="4" class="text-center py-8">No FRAs found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraListComponent, { className: "FraListComponent", filePath: "src/app/admin/pages/fra-list/fra-list.ts", lineNumber: 15 });
})();

// src/app/admin/components/fra-form/fra-form.ts
function FraFormComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Loading FRA data...");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 5);
    \u0275\u0275listener("ngSubmit", function FraFormComponent_form_4_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveFra());
    });
    \u0275\u0275elementStart(1, "div", 6)(2, "label", 7);
    \u0275\u0275text(3, "Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_4_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.name, $event) || (ctx_r1.fra.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 6)(6, "label", 9);
    \u0275\u0275text(7, "Contact Person:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_4_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.contact, $event) || (ctx_r1.fra.contact = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "label", 11);
    \u0275\u0275text(11, "Address:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 12);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_4_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.address, $event) || (ctx_r1.fra.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 6)(14, "label", 13);
    \u0275\u0275text(15, "Country:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_4_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.country, $event) || (ctx_r1.fra.country = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 6)(18, "label", 15);
    \u0275\u0275text(19, "Agency ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_4_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.agency_id, $event) || (ctx_r1.fra.agency_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 17)(22, "button", 18);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 19);
    \u0275\u0275listener("click", function FraFormComponent_form_4_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/fras"]));
    });
    \u0275\u0275text(25, " Cancel ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.contact);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.address);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.country);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.agency_id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditMode ? "Update FRA" : "Create FRA", " ");
  }
}
var FraFormComponent = class _FraFormComponent {
  fraService = inject(FraService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  fra = {};
  isEditMode = false;
  fraId = null;
  isLoading = false;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.fraId = +id;
      this.loadFraData(this.fraId);
    }
  }
  async loadFraData(id) {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.fraService.getFraById(id);
      if (data) {
        this.fra = data;
        this.cdr.detectChanges();
      } else {
        this.router.navigate(["/admin/fras"]);
      }
    } catch (error) {
      console.error("Error loading FRA data:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  async saveFra() {
    try {
      if (this.isEditMode && this.fraId) {
        await this.fraService.updateFra(__spreadProps(__spreadValues({}, this.fra), { id: this.fraId }));
      } else {
        await this.fraService.createFra(this.fra);
      }
      this.router.navigate(["/admin/fras"]);
    } catch (error) {
      console.error("Error saving FRA:", error);
      alert("Failed to save FRA.");
    }
  }
  static \u0275fac = function FraFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FraFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraFormComponent, selectors: [["app-fra-form"]], decls: 5, vars: 3, consts: [[1, "container", "mx-auto", "p-4"], [1, "text-2xl", "font-bold", "mb-4"], ["class", "text-center py-4", 4, "ngIf"], ["class", "bg-white shadow-md rounded-lg p-6", 3, "ngSubmit", 4, "ngIf"], [1, "text-center", "py-4"], [1, "bg-white", "shadow-md", "rounded-lg", "p-6", 3, "ngSubmit"], [1, "mb-4"], ["for", "name", 1, "block", "text-gray-700", "text-sm", "font-bold", "mb-2"], ["type", "text", "id", "name", "name", "name", "required", "", 1, "shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline", 3, "ngModelChange", "ngModel"], ["for", "contact", 1, "block", "text-gray-700", "text-sm", "font-bold", "mb-2"], ["type", "text", "id", "contact", "name", "contact", "required", "", 1, "shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline", 3, "ngModelChange", "ngModel"], ["for", "address", 1, "block", "text-gray-700", "text-sm", "font-bold", "mb-2"], ["id", "address", "name", "address", "required", "", "rows", "3", 1, "shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline", 3, "ngModelChange", "ngModel"], ["for", "country", 1, "block", "text-gray-700", "text-sm", "font-bold", "mb-2"], ["type", "text", "id", "country", "name", "country", "required", "", 1, "shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline", 3, "ngModelChange", "ngModel"], ["for", "agency_id", 1, "block", "text-gray-700", "text-sm", "font-bold", "mb-2"], ["type", "number", "id", "agency_id", "name", "agency_id", 1, "shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "justify-between"], ["type", "submit", 1, "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline"], ["type", "button", 1, "bg-gray-500", "hover:bg-gray-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", 3, "click"]], template: function FraFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, FraFormComponent_div_3_Template, 2, 0, "div", 2)(4, FraFormComponent_form_4_Template, 26, 6, "form", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit FRA" : "Add New FRA");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraFormComponent, [{
    type: Component,
    args: [{ selector: "app-fra-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Edit FRA' : 'Add New FRA' }}</h2>

  <div *ngIf="isLoading" class="text-center py-4">Loading FRA data...</div>

  <form *ngIf="!isLoading" (ngSubmit)="saveFra()" class="bg-white shadow-md rounded-lg p-6">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        [(ngModel)]="fra.name"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label for="contact" class="block text-gray-700 text-sm font-bold mb-2">Contact Person:</label>
      <input
        type="text"
        id="contact"
        name="contact"
        [(ngModel)]="fra.contact"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label for="address" class="block text-gray-700 text-sm font-bold mb-2">Address:</label>
      <textarea
        id="address"
        name="address"
        [(ngModel)]="fra.address"
        required
        rows="3"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
    </div>

    <div class="mb-4">
      <label for="country" class="block text-gray-700 text-sm font-bold mb-2">Country:</label>
      <input
        type="text"
        id="country"
        name="country"
        [(ngModel)]="fra.country"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label for="agency_id" class="block text-gray-700 text-sm font-bold mb-2">Agency ID:</label>
      <input
        type="number"
        id="agency_id"
        name="agency_id"
        [(ngModel)]="fra.agency_id"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {{ isEditMode ? 'Update FRA' : 'Create FRA' }}
      </button>
      <button
        type="button"
        (click)="router.navigate(['/admin/fras'])"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
    </div>
  </form>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraFormComponent, { className: "FraFormComponent", filePath: "src/app/admin/components/fra-form/fra-form.ts", lineNumber: 15 });
})();

// src/app/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "login",
    component: AdminLoginComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "applicants", component: ApplicantListComponent },
      { path: "applicants/status/:status", component: ApplicantListComponent },
      { path: "applicants/new", component: ApplicantFormComponent },
      { path: "applicants/edit/:id", component: ApplicantFormComponent },
      { path: "cases", component: CaseListComponent },
      { path: "cases/new", component: CaseFormComponent },
      { path: "cases/edit/:id", component: CaseFormComponent },
      { path: "fras", component: FraListComponent },
      // New route for FRA list
      { path: "fras/new", component: FraFormComponent },
      // New route for adding FRA
      { path: "fras/edit/:id", component: FraFormComponent },
      // New route for editing FRA
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-PS67VZ5P.js.map
