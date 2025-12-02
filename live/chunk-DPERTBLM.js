import {
  ActivatedRoute,
  AlertController,
  AnnouncementService,
  BooleanValueAccessorDirective,
  CREATE_APPLICANT,
  CREATE_CASE,
  CREATE_FRA,
  CREATE_REFERRAL,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DELETE_APPLICANT,
  DELETE_APPLICANT_MEMORY,
  DELETE_CASE,
  DELETE_FRA,
  DELETE_REFERRAL,
  DatabaseService,
  DatePipe,
  EncryptionService,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  GET_ADMIN_USER_BY_EMAIL,
  GET_APPLICANTS,
  GET_APPLICANT_BY_ID,
  GET_APPLICANT_STATUSES,
  GET_CASES,
  GET_CASE_BY_ID,
  GET_FRAS,
  GET_FRA_BY_ID,
  GET_REFERRALS,
  GET_REFERRAL_BY_ID,
  HttpClient,
  INSERT_APPLICANT_HISTORY,
  Injectable,
  IonApp,
  IonBackButton2 as IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRouterOutlet2 as IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonicModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgModule,
  NumericValueAccessorDirective,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterLinkDelegateDirective2 as RouterLinkDelegateDirective,
  RouterModule,
  SelectValueAccessorDirective,
  SlicePipe,
  TextValueAccessorDirective,
  TitleCasePipe,
  ToastController,
  UPDATE_APPLICANT,
  UPDATE_CASE,
  UPDATE_FRA,
  UPDATE_REFERRAL,
  Validators,
  ViewChild,
  concatMap,
  firstValueFrom,
  inject,
  lastValueFrom,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
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
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-VIDBDYUJ.js";
import "./chunk-B7UJR2GH.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-HTLDGIIN.js";
import "./chunk-4VSZYFMW.js";
import "./chunk-WFMQ6FSS.js";
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
import "./chunk-CEAAMTO4.js";
import "./chunk-GZ5BDCOT.js";
import "./chunk-HUY7ESWV.js";
import "./chunk-GXFEW35R.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-C7TRL22M.js";

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
          const adminSession = { userId: user.id, email: user.email, user_type: user.user_type };
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(adminSession));
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
  getUserType() {
    const adminSession = this.getCurrentUser();
    return adminSession ? adminSession.user_type : null;
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
function AdminLoginComponent_ion_text_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLoginComponent, selectors: [["app-admin-login"]], decls: 15, vars: 3, consts: [[1, "ion-padding"], [1, "ion-text-center", "ion-padding"], [3, "ngSubmit"], ["label", "Email", "type", "email", "name", "email", "placeholder", "admin@example.com", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Password", "type", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 3, "ngModelChange", "ngModel"], ["expand", "block", "type", "submit", 1, "ion-margin-top"], ["color", "danger", "class", "ion-padding-top", 4, "ngIf"], ["color", "danger", 1, "ion-padding-top"]], template: function AdminLoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
      \u0275\u0275text(5, "Admin Login");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "ion-card-content")(7, "form", 2);
      \u0275\u0275listener("ngSubmit", function AdminLoginComponent_Template_form_ngSubmit_7_listener() {
        return ctx.login();
      });
      \u0275\u0275elementStart(8, "ion-item")(9, "ion-input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AdminLoginComponent_Template_ion_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "ion-item")(11, "ion-input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminLoginComponent_Template_ion_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "ion-button", 5);
      \u0275\u0275text(13, "Login");
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, AdminLoginComponent_ion_text_14_Template, 2, 1, "ion-text", 6);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.errorMessage);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, IonicModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonText, TextValueAccessorDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLoginComponent, [{
    type: Component,
    args: [{ selector: "app-admin-login", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: '<ion-content class="ion-padding">\n  <div class="ion-text-center ion-padding">\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>Admin Login</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <form (ngSubmit)="login()">\n          <ion-item>\n            <ion-input label="Email" type="email" [(ngModel)]="email" name="email" placeholder="admin@example.com" required></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input label="Password" type="password" [(ngModel)]="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required></ion-input>\n          </ion-item>\n          <ion-button expand="block" type="submit" class="ion-margin-top">Login</ion-button>\n          <ion-text color="danger" *ngIf="errorMessage" class="ion-padding-top">{{ errorMessage }}</ion-text>\n        </form>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLoginComponent, { className: "AdminLoginComponent", filePath: "src/app/admin/pages/admin-login/admin-login.ts", lineNumber: 15 });
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
    await firstValueFrom(this.db.query(DELETE_APPLICANT_MEMORY, [id]));
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
var _c0 = (a0) => ["/admin/applicants/status", a0];
function SidebarComponent_ion_list_14_ion_menu_toggle_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-menu-toggle", 0)(1, "ion-item", 23);
    \u0275\u0275element(2, "ion-icon", 24);
    \u0275\u0275elementStart(3, "ion-label");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "titlecase");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const status_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, status_r1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, status_r1));
  }
}
function SidebarComponent_ion_list_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-menu-toggle", 0)(2, "ion-item", 20);
    \u0275\u0275element(3, "ion-icon", 21);
    \u0275\u0275elementStart(4, "ion-label");
    \u0275\u0275text(5, "All Applicants");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(6, SidebarComponent_ion_list_14_ion_menu_toggle_6_Template, 6, 6, "ion-menu-toggle", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.applicantStatuses);
  }
}
function SidebarComponent_ion_menu_toggle_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-menu-toggle", 0)(1, "ion-item", 25);
    \u0275\u0275element(2, "ion-icon", 26);
    \u0275\u0275elementStart(3, "ion-label");
    \u0275\u0275text(4, "Admin Users");
    \u0275\u0275elementEnd()()();
  }
}
var SidebarComponent = class _SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  applicantService = inject(ApplicantService);
  isApplicantMenuOpen = false;
  applicantStatuses = [];
  isAdmin = false;
  // New property for admin status
  ngOnInit() {
    this.applicantService.getStatuses().then((statuses) => {
      this.applicantStatuses = statuses;
    });
    this.isAdmin = this.authService.getUserType() === "admin";
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 46, vars: 3, consts: [["autoHide", "false"], ["routerLink", "/admin/dashboard", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "apps"], ["button", "", 3, "click"], ["slot", "start", "name", "people"], ["slot", "end", 3, "name"], [4, "ngIf"], ["routerLink", "/admin/cases", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "folder-open"], ["routerLink", "/admin/fras", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "business"], ["routerLink", "/admin/referrals", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "people-outline"], ["routerLink", "/admin/announcements", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "megaphone-outline"], ["autoHide", "false", 4, "ngIf"], ["routerLink", "/", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "home-outline"], ["expand", "full", "color", "danger", 3, "click"], ["slot", "start", "name", "log-out"], ["routerLink", "/admin/applicants", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "list"], ["autoHide", "false", 4, "ngFor", "ngForOf"], ["routerLinkActive", "selected", "routerDirection", "root", "detail", "false", 3, "routerLink"], ["slot", "start", "name", "person"], ["routerLink", "/admin/users", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "people-circle-outline"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-list")(1, "ion-list-header")(2, "ion-label");
      \u0275\u0275text(3, "Admin Panel");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "ion-menu-toggle", 0)(5, "ion-item", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275elementStart(7, "ion-label");
      \u0275\u0275text(8, "Dashboard");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "ion-item", 3);
      \u0275\u0275listener("click", function SidebarComponent_Template_ion_item_click_9_listener() {
        return ctx.toggleApplicantMenu();
      });
      \u0275\u0275element(10, "ion-icon", 4);
      \u0275\u0275elementStart(11, "ion-label");
      \u0275\u0275text(12, "Applicants");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "ion-icon", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, SidebarComponent_ion_list_14_Template, 7, 1, "ion-list", 6);
      \u0275\u0275elementStart(15, "ion-menu-toggle", 0)(16, "ion-item", 7);
      \u0275\u0275element(17, "ion-icon", 8);
      \u0275\u0275elementStart(18, "ion-label");
      \u0275\u0275text(19, "Cases");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "ion-menu-toggle", 0)(21, "ion-item", 9);
      \u0275\u0275element(22, "ion-icon", 10);
      \u0275\u0275elementStart(23, "ion-label");
      \u0275\u0275text(24, "FRAs");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "ion-menu-toggle", 0)(26, "ion-item", 11);
      \u0275\u0275element(27, "ion-icon", 12);
      \u0275\u0275elementStart(28, "ion-label");
      \u0275\u0275text(29, "Referrals");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "ion-menu-toggle", 0)(31, "ion-item", 13);
      \u0275\u0275element(32, "ion-icon", 14);
      \u0275\u0275elementStart(33, "ion-label");
      \u0275\u0275text(34, "Announcements");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(35, SidebarComponent_ion_menu_toggle_35_Template, 5, 0, "ion-menu-toggle", 15);
      \u0275\u0275elementStart(36, "ion-menu-toggle", 0)(37, "ion-item", 16);
      \u0275\u0275element(38, "ion-icon", 17);
      \u0275\u0275elementStart(39, "ion-label");
      \u0275\u0275text(40, "Go back to Home");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "ion-footer")(42, "ion-toolbar")(43, "ion-button", 18);
      \u0275\u0275listener("click", function SidebarComponent_Template_ion_button_click_43_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(44, "ion-icon", 19);
      \u0275\u0275text(45, " Logout ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275property("name", ctx.isApplicantMenuOpen ? "chevron-up-outline" : "chevron-down-outline");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isApplicantMenuOpen);
      \u0275\u0275advance(21);
      \u0275\u0275property("ngIf", ctx.isAdmin);
    }
  }, dependencies: [RouterModule, RouterLink, RouterLinkActive, CommonModule, NgForOf, NgIf, IonicModule, IonButton, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuToggle, IonToolbar, RouterLinkDelegateDirective, TitleCasePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [RouterModule, CommonModule, IonicModule], template: `<ion-list>
  <ion-list-header>
    <ion-label>Admin Panel</ion-label>
  </ion-list-header>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/admin/dashboard" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="apps"></ion-icon>
      <ion-label>Dashboard</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-item button (click)="toggleApplicantMenu()">
    <ion-icon slot="start" name="people"></ion-icon>
    <ion-label>Applicants</ion-label>
    <ion-icon slot="end" [name]="isApplicantMenuOpen ? 'chevron-up-outline' : 'chevron-down-outline'"></ion-icon>
  </ion-item>

  <ion-list *ngIf="isApplicantMenuOpen">
    <ion-menu-toggle autoHide="false">
      <ion-item routerLink="/admin/applicants" routerLinkActive="selected" routerDirection="root" detail="false">
        <ion-icon slot="start" name="list"></ion-icon>
        <ion-label>All Applicants</ion-label>
      </ion-item>
    </ion-menu-toggle>
    <ion-menu-toggle autoHide="false" *ngFor="let status of applicantStatuses">
      <ion-item [routerLink]="['/admin/applicants/status', status]" routerLinkActive="selected" routerDirection="root" detail="false">
        <ion-icon slot="start" name="person"></ion-icon>
        <ion-label>{{ status | titlecase }}</ion-label>
      </ion-item>
    </ion-menu-toggle>
  </ion-list>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/admin/cases" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="folder-open"></ion-icon>
      <ion-label>Cases</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/admin/fras" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="business"></ion-icon>
      <ion-label>FRAs</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/admin/referrals" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="people-outline"></ion-icon>
      <ion-label>Referrals</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/admin/announcements" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="megaphone-outline"></ion-icon>
      <ion-label>Announcements</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-menu-toggle autoHide="false" *ngIf="isAdmin">
    <ion-item routerLink="/admin/users" routerLinkActive="selected" routerDirection="root" detail="false">
      <ion-icon slot="start" name="people-circle-outline"></ion-icon>
      <ion-label>Admin Users</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-menu-toggle autoHide="false">
    <ion-item routerLink="/" routerDirection="root" detail="false">
      <ion-icon slot="start" name="home-outline"></ion-icon>
      <ion-label>Go back to Home</ion-label>
    </ion-item>
  </ion-menu-toggle>

  <ion-footer>
    <ion-toolbar>
      <ion-button expand="full" color="danger" (click)="logout()">
        <ion-icon slot="start" name="log-out"></ion-icon>
        Logout
      </ion-button>
    </ion-toolbar>
  </ion-footer>
</ion-list>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/admin/components/sidebar/sidebar.ts", lineNumber: 15 });
})();

// src/app/admin/layouts/admin-layout/admin-layout.ts
var AdminLayoutComponent = class _AdminLayoutComponent {
  static \u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], decls: 17, vars: 0, consts: [["contentId", "main-content"], ["id", "main-content", 1, "ion-page"], ["slot", "start"]], template: function AdminLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-app")(1, "ion-menu", 0)(2, "ion-header")(3, "ion-toolbar")(4, "ion-title");
      \u0275\u0275text(5, "Admin Menu");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content");
      \u0275\u0275element(7, "app-sidebar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 1)(9, "ion-header")(10, "ion-toolbar")(11, "ion-buttons", 2);
      \u0275\u0275element(12, "ion-menu-button");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "ion-title");
      \u0275\u0275text(14, "Admin Dashboard");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "ion-content");
      \u0275\u0275element(16, "ion-router-outlet");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterModule, SidebarComponent, IonicModule, IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonRouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-admin-layout", standalone: true, imports: [RouterModule, SidebarComponent, IonicModule], template: '<ion-app>\n  <ion-menu contentId="main-content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Admin Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <!-- Original SidebarComponent will be placed here -->\n      <app-sidebar></app-sidebar>\n    </ion-content>\n  </ion-menu>\n\n  <div class="ion-page" id="main-content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-buttons slot="start">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n        <ion-title>Admin Dashboard</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <ion-router-outlet></ion-router-outlet>\n    </ion-content>\n  </div>\n</ion-app>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src/app/admin/layouts/admin-layout/admin-layout.ts", lineNumber: 13 });
})();

// src/app/admin/pages/admin-dashboard/admin-dashboard.ts
var AdminDashboardComponent = class _AdminDashboardComponent {
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 3, vars: 0, consts: [[1, "glass-card", "p-0", "text-white", "rounded-xl", "h-full"], ["src", \u0275\u0275trustConstantResourceUrl`https://welfare.reviewcenterphil.com/api/dashboard.php`, 1, "w-full", "h-full", "border-none", "rounded-xl"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-content")(1, "div", 0);
      \u0275\u0275element(2, "iframe", 1);
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [IonicModule, IonContent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [IonicModule], template: '<ion-content>\n  <div class="glass-card p-0 text-white rounded-xl h-full">\n    <iframe src="https://welfare.reviewcenterphil.com/api/dashboard.php" class="w-full h-full border-none rounded-xl"></iframe>\n  </div>\n</ion-content>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/admin/pages/admin-dashboard/admin-dashboard.ts", lineNumber: 11 });
})();

// src/app/admin/pages/applicant-list/applicant-list.ts
var _c02 = (a0) => ["/admin/applicants/edit", a0];
var _c1 = (a0) => ["/admin/manual-chat", a0];
function ApplicantListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading applicants...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function ApplicantListComponent_ion_list_11_ion_item_16_ion_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 19);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_ion_item_16_ion_button_13_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const app_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteApplicant(app_r4.id));
    });
    \u0275\u0275element(1, "ion-icon", 20);
    \u0275\u0275elementEnd();
  }
}
function ApplicantListComponent_ion_list_11_ion_item_16_ion_button_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-button", 21);
    \u0275\u0275element(1, "ion-icon", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c1, app_r4.id));
  }
}
function ApplicantListComponent_ion_list_11_ion_item_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "ion-badge", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ion-buttons", 0)(11, "ion-button", 13);
    \u0275\u0275element(12, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ApplicantListComponent_ion_list_11_ion_item_16_ion_button_13_Template, 2, 0, "ion-button", 15)(14, ApplicantListComponent_ion_list_11_ion_item_16_ion_button_14_Template, 2, 3, "ion-button", 16);
    \u0275\u0275elementStart(15, "a", 17);
    \u0275\u0275element(16, "ion-icon", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const app_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", app_r4.last_name, ", ", app_r4.first_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r4.passport_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r4.country);
    \u0275\u0275advance();
    \u0275\u0275property("color", app_r4.main_status === "active" ? "success" : app_r4.main_status === "with_complain" ? "warning" : "danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", app_r4.main_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c02, app_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdminUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.main_status && app_r4.main_status.toLowerCase().includes("complaint"));
    \u0275\u0275advance();
    \u0275\u0275property("href", \u0275\u0275interpolate1("https://welfare.reviewcenterphil.com/api/history.php?app_id=", app_r4.id), \u0275\u0275sanitizeUrl);
  }
}
function ApplicantListComponent_ion_list_11_ion_item_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 23);
    \u0275\u0275text(2, "No applicants found.");
    \u0275\u0275elementEnd()();
  }
}
function ApplicantListComponent_ion_list_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-item-divider")(2, "ion-label", 8);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_Template_ion_label_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("last_name"));
    });
    \u0275\u0275text(3, "Name ");
    \u0275\u0275element(4, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-label", 8);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_Template_ion_label_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("passport_number"));
    });
    \u0275\u0275text(6, "Passport ");
    \u0275\u0275element(7, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-label", 8);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_Template_ion_label_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("country"));
    });
    \u0275\u0275text(9, "Country ");
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-label", 8);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_Template_ion_label_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("main_status"));
    });
    \u0275\u0275text(12, "Status ");
    \u0275\u0275element(13, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-label", 10);
    \u0275\u0275text(15, "Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, ApplicantListComponent_ion_list_11_ion_item_16_Template, 17, 13, "ion-item", 11)(17, ApplicantListComponent_ion_list_11_ion_item_17_Template, 3, 0, "ion-item", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.filteredApplicants);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredApplicants || ctx_r1.filteredApplicants.length === 0);
  }
}
var ApplicantListComponent = class _ApplicantListComponent {
  applicantService = inject(ApplicantService);
  cdr = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  // Inject AuthService
  allApplicants = [];
  filteredApplicants = [];
  searchTerm = "";
  isLoading = false;
  currentStatus = null;
  isAdminUser = false;
  // New property for admin status
  sortDirection = {};
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.currentStatus = params.get("status");
      this.loadApplicants(this.currentStatus ?? void 0);
    });
    this.isAdminUser = this.authService.getUserType() === "admin";
  }
  ionViewWillEnter() {
    this.loadApplicants(this.currentStatus ?? void 0);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantListComponent, selectors: [["app-employee-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/applicants/new"], ["name", "add-outline"], ["placeholder", "Search applicants...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["slot", "end", 3, "color"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "clear", "color", "primary", 3, "routerLink", 4, "ngIf"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["name", "document-text-outline"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], ["fill", "clear", "color", "primary", 3, "routerLink"], ["name", "chatbubbles-outline"], [1, "ion-text-center"]], template: function ApplicantListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      \u0275\u0275text(3, "Applicants");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275text(7, " New Applicant ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "ion-content")(9, "ion-searchbar", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ApplicantListComponent_Template_ion_searchbar_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ionChange", function ApplicantListComponent_Template_ion_searchbar_ionChange_9_listener() {
        return ctx.filterApplicants();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, ApplicantListComponent_div_10_Template, 4, 0, "div", 4)(11, ApplicantListComponent_ion_list_11_Template, 18, 2, "ion-list", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, RouterModule, RouterLink, IonicModule, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonSearchbar, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, RouterLinkDelegateDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantListComponent, [{
    type: Component,
    args: [{ selector: "app-employee-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Applicants</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/admin/applicants/new">
        <ion-icon name="add-outline"></ion-icon>
        New Applicant
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterApplicants()" placeholder="Search applicants..."></ion-searchbar>

  <div *ngIf="isLoading" class="ion-padding ion-text-center">
    <p>Loading applicants...</p>
    <ion-spinner name="crescent"></ion-spinner>
  </div>

  <ion-list *ngIf="!isLoading">
    <ion-item-divider>
      <ion-label (click)="sort('last_name')">Name <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('passport_number')">Passport <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('country')">Country <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('main_status')">Status <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label class="ion-text-right">Actions</ion-label>
    </ion-item-divider>

    <ion-item *ngFor="let app of filteredApplicants">
      <ion-label>
        <h2>{{ app.last_name }}, {{ app.first_name }}</h2>
        <p>{{ app.passport_number }}</p>
        <p>{{ app.country }}</p>
      </ion-label>
      <ion-badge slot="end" [color]="app.main_status === 'active' ? 'success' : (app.main_status === 'with_complain' ? 'warning' : 'danger')">
        {{ app.main_status }}
      </ion-badge>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/admin/applicants/edit', app.id]" fill="clear">
          <ion-icon name="create-outline"></ion-icon>
        </ion-button>
        <ion-button (click)="deleteApplicant(app.id)" fill="clear" color="danger" *ngIf="isAdminUser">
          <ion-icon name="trash-outline"></ion-icon>
        </ion-button>
        <ion-button *ngIf="app.main_status && app.main_status.toLowerCase().includes('complaint')" [routerLink]="['/admin/manual-chat', app.id]" fill="clear" color="primary">
          <ion-icon name="chatbubbles-outline"></ion-icon>
        </ion-button>
        <!-- History link might need to open in a browser or a webview, so it's kept as a regular link for now -->
        <a href="https://welfare.reviewcenterphil.com/api/history.php?app_id={{ app.id }}" target="_blank" rel="noopener noreferrer">
          <ion-icon name="document-text-outline"></ion-icon>
        </a>
      </ion-buttons>
    </ion-item>

    <ion-item *ngIf="!filteredApplicants || filteredApplicants.length === 0">
      <ion-label class="ion-text-center">No applicants found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicantListComponent, { className: "ApplicantListComponent", filePath: "src/app/admin/pages/applicant-list/applicant-list.ts", lineNumber: 17 });
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
function ApplicantFormComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2, "Loading applicant data...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 8);
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "First Name is required.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "First Name cannot exceed 100 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_6_span_1_Template, 2, 0, "span", 70)(2, ApplicantFormComponent_form_13_div_6_span_2_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("first_name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.applicantForm.get("first_name")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_9_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Middle Name cannot exceed 100 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_9_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("middle_name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_12_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Last Name is required.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_12_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Last Name cannot exceed 100 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_12_span_1_Template, 2, 0, "span", 70)(2, ApplicantFormComponent_form_13_div_12_span_2_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("last_name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.applicantForm.get("last_name")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_15_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Passport Number cannot exceed 50 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_15_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("passport_number")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_80_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Country cannot exceed 50 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_80_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("country")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_86_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_86_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_86_span_1_Template, 2, 0, "span", 70)(2, ApplicantFormComponent_form_13_div_86_span_2_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["email"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.applicantForm.get("email")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_89_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Phone Number cannot exceed 20 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_89_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("phone_number")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_92_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "WhatsApp number cannot exceed 20 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_92_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("whatsapp")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_95_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid URL.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_95_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("facebook")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["pattern"]);
  }
}
function ApplicantFormComponent_form_13_div_98_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Address cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_98_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("address")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_ion_select_option_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 61);
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
function ApplicantFormComponent_form_13_div_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275text(1, " Main Status is required. ");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275text(1, " Applicant Type is required. ");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_ion_select_option_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 61);
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
function ApplicantFormComponent_form_13_div_124_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Consistency Percentage must be at least 0.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_124_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Consistency Percentage cannot exceed 100.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_124_span_1_Template, 2, 0, "span", 70)(2, ApplicantFormComponent_form_13_div_124_span_2_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("consistency_percentage")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["min"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.applicantForm.get("consistency_percentage")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["max"]);
  }
}
function ApplicantFormComponent_form_13_div_127_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Emergency Contact Name cannot exceed 100 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_127_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("emergency_contact_name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_div_130_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Emergency Contact Phone cannot exceed 20 characters.");
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_div_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ApplicantFormComponent_form_13_div_130_span_1_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.applicantForm.get("emergency_contact_phone")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function ApplicantFormComponent_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 9);
    \u0275\u0275listener("ngSubmit", function ApplicantFormComponent_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveApplicant());
    });
    \u0275\u0275elementStart(1, "ion-card-title", 10);
    \u0275\u0275text(2, "Personal Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-list", 11)(4, "ion-item");
    \u0275\u0275element(5, "ion-input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ApplicantFormComponent_form_13_div_6_Template, 3, 2, "div", 13);
    \u0275\u0275elementStart(7, "ion-item");
    \u0275\u0275element(8, "ion-input", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ApplicantFormComponent_form_13_div_9_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(10, "ion-item");
    \u0275\u0275element(11, "ion-input", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, ApplicantFormComponent_form_13_div_12_Template, 3, 2, "div", 13);
    \u0275\u0275elementStart(13, "ion-item");
    \u0275\u0275element(14, "ion-input", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, ApplicantFormComponent_form_13_div_15_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(16, "ion-item");
    \u0275\u0275element(17, "ion-input", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-item")(19, "ion-select", 18)(20, "ion-select-option", 19);
    \u0275\u0275text(21, "Select Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "ion-select-option", 20);
    \u0275\u0275text(23, "United States");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ion-select-option", 21);
    \u0275\u0275text(25, "Canada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "ion-select-option", 22);
    \u0275\u0275text(27, "Mexico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "ion-select-option", 23);
    \u0275\u0275text(29, "Brazil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "ion-select-option", 24);
    \u0275\u0275text(31, "United Kingdom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "ion-select-option", 25);
    \u0275\u0275text(33, "France");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "ion-select-option", 26);
    \u0275\u0275text(35, "Germany");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "ion-select-option", 27);
    \u0275\u0275text(37, "Italy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "ion-select-option", 28);
    \u0275\u0275text(39, "Spain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "ion-select-option", 29);
    \u0275\u0275text(41, "China");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "ion-select-option", 30);
    \u0275\u0275text(43, "India");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "ion-select-option", 31);
    \u0275\u0275text(45, "Japan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "ion-select-option", 32);
    \u0275\u0275text(47, "South Korea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "ion-select-option", 33);
    \u0275\u0275text(49, "Australia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "ion-select-option", 34);
    \u0275\u0275text(51, "New Zealand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "ion-select-option", 35);
    \u0275\u0275text(53, "Philippines");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "ion-select-option", 36);
    \u0275\u0275text(55, "Saudi Arabia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "ion-select-option", 37);
    \u0275\u0275text(57, "United Arab Emirates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "ion-select-option", 38);
    \u0275\u0275text(59, "Qatar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "ion-select-option", 39);
    \u0275\u0275text(61, "Kuwait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "ion-select-option", 40);
    \u0275\u0275text(63, "Bahrain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "ion-select-option", 41);
    \u0275\u0275text(65, "Oman");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "ion-select-option", 42);
    \u0275\u0275text(67, "Egypt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "ion-select-option", 43);
    \u0275\u0275text(69, "Jordan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "ion-select-option", 44);
    \u0275\u0275text(71, "Lebanon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "ion-select-option", 45);
    \u0275\u0275text(73, "Iraq");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "ion-select-option", 46);
    \u0275\u0275text(75, "Iran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "ion-select-option", 47);
    \u0275\u0275text(77, "Turkey");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "ion-select-option", 48);
    \u0275\u0275text(79, "Israel");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(80, ApplicantFormComponent_form_13_div_80_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "ion-card-title", 49);
    \u0275\u0275text(82, "Contact Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "ion-list", 11)(84, "ion-item");
    \u0275\u0275element(85, "ion-input", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275template(86, ApplicantFormComponent_form_13_div_86_Template, 3, 2, "div", 13);
    \u0275\u0275elementStart(87, "ion-item");
    \u0275\u0275element(88, "ion-input", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275template(89, ApplicantFormComponent_form_13_div_89_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(90, "ion-item");
    \u0275\u0275element(91, "ion-input", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275template(92, ApplicantFormComponent_form_13_div_92_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(93, "ion-item");
    \u0275\u0275element(94, "ion-input", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275template(95, ApplicantFormComponent_form_13_div_95_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(96, "ion-item");
    \u0275\u0275element(97, "ion-textarea", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275template(98, ApplicantFormComponent_form_13_div_98_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "ion-card-title", 49);
    \u0275\u0275text(100, "Employment Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "ion-list", 11)(102, "ion-item")(103, "ion-select", 55)(104, "ion-select-option", 19);
    \u0275\u0275text(105, "Select Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(106, ApplicantFormComponent_form_13_ion_select_option_106_Template, 2, 2, "ion-select-option", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(107, ApplicantFormComponent_form_13_div_107_Template, 2, 0, "div", 13);
    \u0275\u0275elementStart(108, "ion-item")(109, "ion-select", 57)(110, "ion-select-option", 58);
    \u0275\u0275text(111, "Household");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "ion-select-option", 59);
    \u0275\u0275text(113, "Skion-select-option");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(114, ApplicantFormComponent_form_13_div_114_Template, 2, 0, "div", 13);
    \u0275\u0275elementStart(115, "ion-item")(116, "ion-select", 60)(117, "ion-select-option", 61);
    \u0275\u0275text(118, "Select Agency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(119, ApplicantFormComponent_form_13_ion_select_option_119_Template, 2, 2, "ion-select-option", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(120, "ion-item");
    \u0275\u0275element(121, "ion-input", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "ion-item");
    \u0275\u0275element(123, "ion-input", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275template(124, ApplicantFormComponent_form_13_div_124_Template, 3, 2, "div", 13);
    \u0275\u0275elementStart(125, "ion-item");
    \u0275\u0275element(126, "ion-input", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275template(127, ApplicantFormComponent_form_13_div_127_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(128, "ion-item");
    \u0275\u0275element(129, "ion-input", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275template(130, ApplicantFormComponent_form_13_div_130_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "div", 66)(132, "ion-button", 67);
    \u0275\u0275text(133, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "ion-button", 68);
    \u0275\u0275text(135, "Save");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.applicantForm);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.applicantForm.get("first_name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.applicantForm.get("first_name")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.applicantForm.get("middle_name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.applicantForm.get("middle_name")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.applicantForm.get("last_name")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.applicantForm.get("last_name")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.applicantForm.get("passport_number")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.applicantForm.get("passport_number")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(65);
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.applicantForm.get("country")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.applicantForm.get("country")) == null ? null : tmp_6_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.applicantForm.get("email")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r1.applicantForm.get("email")) == null ? null : tmp_7_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_8_0 = ctx_r1.applicantForm.get("phone_number")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r1.applicantForm.get("phone_number")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r1.applicantForm.get("whatsapp")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r1.applicantForm.get("whatsapp")) == null ? null : tmp_9_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_10_0 = ctx_r1.applicantForm.get("facebook")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx_r1.applicantForm.get("facebook")) == null ? null : tmp_10_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_11_0 = ctx_r1.applicantForm.get("address")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx_r1.applicantForm.get("address")) == null ? null : tmp_11_0.touched));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.statuses);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_13_0 = ctx_r1.applicantForm.get("main_status")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx_r1.applicantForm.get("main_status")) == null ? null : tmp_13_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_14_0 = ctx_r1.applicantForm.get("applicant_type")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx_r1.applicantForm.get("applicant_type")) == null ? null : tmp_14_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.fras);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_17_0 = ctx_r1.applicantForm.get("consistency_percentage")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx_r1.applicantForm.get("consistency_percentage")) == null ? null : tmp_17_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_18_0 = ctx_r1.applicantForm.get("emergency_contact_name")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx_r1.applicantForm.get("emergency_contact_name")) == null ? null : tmp_18_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_19_0 = ctx_r1.applicantForm.get("emergency_contact_phone")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = ctx_r1.applicantForm.get("emergency_contact_phone")) == null ? null : tmp_19_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.applicantForm.invalid);
  }
}
var ApplicantFormComponent = class _ApplicantFormComponent {
  applicantService = inject(ApplicantService);
  fraService = inject(FraService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  applicantForm;
  isEditMode = false;
  applicantId = null;
  isLoading = false;
  statuses = [];
  fras = [];
  ngOnInit() {
    this.applicantForm = this.fb.group({
      first_name: ["", [Validators.required, Validators.maxLength(100)]],
      middle_name: ["", Validators.maxLength(100)],
      last_name: ["", [Validators.required, Validators.maxLength(100)]],
      passport_number: ["", Validators.maxLength(50)],
      date_of_birth: [null],
      address: ["", Validators.maxLength(255)],
      phone_number: ["", Validators.maxLength(20)],
      email: ["", [Validators.email, Validators.maxLength(255)]],
      is_support: [false],
      token: ["", Validators.maxLength(255)],
      user_id: [null],
      date_deployment: [null],
      fra_id: [null],
      main_status: ["", Validators.required],
      applicant_type: ["", Validators.required],
      created_date_of_report: [null],
      country: ["", Validators.maxLength(50)],
      // Assuming max 50 for country name
      facebook: ["", Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)],
      whatsapp: ["", Validators.maxLength(20)],
      consistency_percentage: [0, [Validators.min(0), Validators.max(100)]],
      agency_id: [null],
      emergency_contact_name: ["", Validators.maxLength(100)],
      emergency_contact_phone: ["", Validators.maxLength(20)]
    });
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
        this.applicantForm.patchValue(data);
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
    if (this.applicantForm.invalid) {
      this.applicantForm.markAllAsTouched();
      return;
    }
    try {
      const applicantData = this.applicantForm.value;
      if (this.isEditMode && this.applicantId) {
        await this.applicantService.updateApplicant(__spreadProps(__spreadValues({}, applicantData), { id: this.applicantId }));
      } else {
        await this.applicantService.createApplicant(applicantData);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantFormComponent, selectors: [["app-applicant-form"]], decls: 14, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/applicants"], [1, "ion-padding"], [1, "ion-justify-content-center"], ["size-xl", "8", "size-lg", "10", "size-md", "12", "size-sm", "12", "size", "12"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit", "formGroup"], [1, "ion-padding-bottom"], ["lines", "full"], ["label", "First Name", "type", "text", "formControlName", "first_name", "placeholder", "Enter first name"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], ["label", "Middle Name", "type", "text", "formControlName", "middle_name", "placeholder", "Enter middle name"], ["label", "Last Name", "type", "text", "formControlName", "last_name", "placeholder", "Enter last name"], ["label", "Passport Number", "type", "text", "formControlName", "passport_number", "placeholder", "Enter passport number"], ["label", "Date of Birth", "type", "date", "formControlName", "date_of_birth"], ["label", "Country", "formControlName", "country", "placeholder", "Select Country"], ["value", ""], ["value", "US"], ["value", "CA"], ["value", "MX"], ["value", "BR"], ["value", "GB"], ["value", "FR"], ["value", "DE"], ["value", "IT"], ["value", "ES"], ["value", "CN"], ["value", "IN"], ["value", "JP"], ["value", "KR"], ["value", "AU"], ["value", "NZ"], ["value", "PH"], ["value", "SA"], ["value", "AE"], ["value", "QA"], ["value", "KW"], ["value", "BH"], ["value", "OM"], ["value", "EG"], ["value", "JO"], ["value", "LB"], ["value", "IQ"], ["value", "IR"], ["value", "TR"], ["value", "IL"], [1, "ion-padding-top", "ion-padding-bottom"], ["label", "Email", "type", "email", "formControlName", "email", "placeholder", "Enter email"], ["label", "Phone Number", "type", "text", "formControlName", "phone_number", "placeholder", "Enter phone number"], ["label", "WhatsApp", "type", "text", "formControlName", "whatsapp", "placeholder", "Enter WhatsApp number"], ["label", "Facebook URL", "type", "url", "formControlName", "facebook", "placeholder", "Enter Facebook URL"], ["label", "Address", "rows", "3", "formControlName", "address", "placeholder", "Enter address"], ["label", "Main Status", "formControlName", "main_status", "placeholder", "Select Status"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Applicant Type", "formControlName", "applicant_type", "placeholder", "Select Applicant Type"], ["value", "household"], ["value", "skilled"], ["label", "Foreign Recruitment Agency", "formControlName", "fra_id", "placeholder", "Select Agency"], [3, "value"], ["label", "Deployment Date", "type", "date", "formControlName", "date_deployment"], ["label", "Consistency Percentage", "type", "number", "formControlName", "consistency_percentage"], ["label", "Emergency Contact Name", "type", "text", "formControlName", "emergency_contact_name"], ["label", "Emergency Contact Phone", "type", "text", "formControlName", "emergency_contact_phone"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", "routerLink", "/admin/applicants"], ["type", "submit", 3, "disabled"], [1, "ion-padding-start", "ion-text-danger"], [4, "ngIf"]], template: function ApplicantFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-content")(1, "ion-header")(2, "ion-toolbar")(3, "ion-buttons", 0);
      \u0275\u0275element(4, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "ion-title");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "ion-grid", 2)(8, "ion-row", 3)(9, "ion-col", 4)(10, "ion-card")(11, "ion-card-content");
      \u0275\u0275template(12, ApplicantFormComponent_div_12_Template, 4, 0, "div", 5)(13, ApplicantFormComponent_form_13_Template, 136, 20, "form", 6);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.isEditMode ? "Edit" : "Create", " Applicant");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RouterModule, RouterLink, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonRow, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton, RouterLinkDelegateDirective, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  color: #D1D5DB;\n}\n.form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  border-width: 0;\n  border-bottom-width: 2px;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  padding: 0.625rem;\n  color: white;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n.form-field[_ngcontent-%COMP%]::placeholder {\n  color: #9CA3AF;\n}\n.form-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  --tw-ring-shadow: 0 0 #0000;\n  border-color: #60A5FA;\n}\n.form-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background-color: #1F2937;\n  color: white;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n/*# sourceMappingURL=applicant-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantFormComponent, [{
    type: Component,
    args: [{ selector: "app-applicant-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule, ReactiveFormsModule], template: `<ion-content>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/admin/applicants"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ isEditMode ? 'Edit' : 'Create' }} Applicant</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-grid class="ion-padding">
    <ion-row class="ion-justify-content-center">
      <ion-col size-xl="8" size-lg="10" size-md="12" size-sm="12" size="12">
        <ion-card>
          <ion-card-content>
            <div *ngIf="isLoading" class="ion-text-center ion-padding">
              <p>Loading applicant data...</p>
              <ion-spinner name="crescent"></ion-spinner>
            </div>

            <form *ngIf="!isLoading" [formGroup]="applicantForm" (ngSubmit)="saveApplicant()">
              <!-- Personal Information -->
              <ion-card-title class="ion-padding-bottom">Personal Information</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-input label="First Name" type="text" formControlName="first_name" placeholder="Enter first name"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('first_name')?.invalid && applicantForm.get('first_name')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('first_name')?.errors?.['required']">First Name is required.</span>
                  <span *ngIf="applicantForm.get('first_name')?.errors?.['maxlength']">First Name cannot exceed 100 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Middle Name" type="text" formControlName="middle_name" placeholder="Enter middle name"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('middle_name')?.invalid && applicantForm.get('middle_name')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('middle_name')?.errors?.['maxlength']">Middle Name cannot exceed 100 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Last Name" type="text" formControlName="last_name" placeholder="Enter last name"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('last_name')?.invalid && applicantForm.get('last_name')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('last_name')?.errors?.['required']">Last Name is required.</span>
                  <span *ngIf="applicantForm.get('last_name')?.errors?.['maxlength']">Last Name cannot exceed 100 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Passport Number" type="text" formControlName="passport_number" placeholder="Enter passport number"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('passport_number')?.invalid && applicantForm.get('passport_number')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('passport_number')?.errors?.['maxlength']">Passport Number cannot exceed 50 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Date of Birth" type="date" formControlName="date_of_birth"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-select label="Country" formControlName="country" placeholder="Select Country">
                    <ion-select-option value="">Select Country</ion-select-option>
                    <ion-select-option value="US">United States</ion-select-option>
                    <ion-select-option value="CA">Canada</ion-select-option>
                    <ion-select-option value="MX">Mexico</ion-select-option>
                    <ion-select-option value="BR">Brazil</ion-select-option>
                    <ion-select-option value="GB">United Kingdom</ion-select-option>
                    <ion-select-option value="FR">France</ion-select-option>
                    <ion-select-option value="DE">Germany</ion-select-option>
                    <ion-select-option value="IT">Italy</ion-select-option>
                    <ion-select-option value="ES">Spain</ion-select-option>
                    <ion-select-option value="CN">China</ion-select-option>
                    <ion-select-option value="IN">India</ion-select-option>
                    <ion-select-option value="JP">Japan</ion-select-option>
                    <ion-select-option value="KR">South Korea</ion-select-option>
                    <ion-select-option value="AU">Australia</ion-select-option>
                    <ion-select-option value="NZ">New Zealand</ion-select-option>
                    <ion-select-option value="PH">Philippines</ion-select-option>
                    <ion-select-option value="SA">Saudi Arabia</ion-select-option>
                    <ion-select-option value="AE">United Arab Emirates</ion-select-option>
                    <ion-select-option value="QA">Qatar</ion-select-option>
                    <ion-select-option value="KW">Kuwait</ion-select-option>
                    <ion-select-option value="BH">Bahrain</ion-select-option>
                    <ion-select-option value="OM">Oman</ion-select-option>
                    <ion-select-option value="EG">Egypt</ion-select-option>
                    <ion-select-option value="JO">Jordan</ion-select-option>
                    <ion-select-option value="LB">Lebanon</ion-select-option>
                    <ion-select-option value="IQ">Iraq</ion-select-option>
                    <ion-select-option value="IR">Iran</ion-select-option>
                    <ion-select-option value="TR">Turkey</ion-select-option>
                    <ion-select-option value="IL">Israel</ion-select-option>
                  </ion-select>
                </ion-item>
                <div *ngIf="applicantForm.get('country')?.invalid && applicantForm.get('country')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('country')?.errors?.['maxlength']">Country cannot exceed 50 characters.</span>
                </div>
              </ion-list>

              <!-- Contact Details -->
              <ion-card-title class="ion-padding-top ion-padding-bottom">Contact Details</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-input label="Email" type="email" formControlName="email" placeholder="Enter email"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('email')?.invalid && applicantForm.get('email')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('email')?.errors?.['email']">Please enter a valid email.</span>
                  <span *ngIf="applicantForm.get('email')?.errors?.['maxlength']">Email cannot exceed 255 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Phone Number" type="text" formControlName="phone_number" placeholder="Enter phone number"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('phone_number')?.invalid && applicantForm.get('phone_number')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('phone_number')?.errors?.['maxlength']">Phone Number cannot exceed 20 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="WhatsApp" type="text" formControlName="whatsapp" placeholder="Enter WhatsApp number"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('whatsapp')?.invalid && applicantForm.get('whatsapp')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('whatsapp')?.errors?.['maxlength']">WhatsApp number cannot exceed 20 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Facebook URL" type="url" formControlName="facebook" placeholder="Enter Facebook URL"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('facebook')?.invalid && applicantForm.get('facebook')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('facebook')?.errors?.['pattern']">Please enter a valid URL.</span>
                </div>

                <ion-item>
                  <ion-textarea label="Address" rows="3" formControlName="address" placeholder="Enter address"></ion-textarea>
                </ion-item>
                <div *ngIf="applicantForm.get('address')?.invalid && applicantForm.get('address')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('address')?.errors?.['maxlength']">Address cannot exceed 255 characters.</span>
                </div>
              </ion-list>

              <!-- Employment Details -->
              <ion-card-title class="ion-padding-top ion-padding-bottom">Employment Details</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-select label="Main Status" formControlName="main_status" placeholder="Select Status">
                    <ion-select-option value="">Select Status</ion-select-option>
                    <ion-select-option *ngFor="let status of statuses" [value]="status">{{ status }}</ion-select-option>
                  </ion-select>
                </ion-item>
                <div *ngIf="applicantForm.get('main_status')?.invalid && applicantForm.get('main_status')?.touched" class="ion-padding-start ion-text-danger">
                  Main Status is required.
                </div>

                <ion-item>
                  <ion-select label="Applicant Type" formControlName="applicant_type" placeholder="Select Applicant Type">
                    <ion-select-option value="household">Household</ion-select-option>
                    <ion-select-option value="skilled">Skion-select-option</ion-select-option>
                  </ion-select>
                </ion-item>
                <div *ngIf="applicantForm.get('applicant_type')?.invalid && applicantForm.get('applicant_type')?.touched" class="ion-padding-start ion-text-danger">
                  Applicant Type is required.
                </div>

                <ion-item>
                  <ion-select label="Foreign Recruitment Agency" formControlName="fra_id" placeholder="Select Agency">
                    <ion-select-option [value]="null">Select Agency</ion-select-option>
                    <ion-select-option *ngFor="let fra of fras" [value]="fra.id">{{ fra.name }}</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-input label="Deployment Date" type="date" formControlName="date_deployment"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input label="Consistency Percentage" type="number" formControlName="consistency_percentage"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('consistency_percentage')?.invalid && applicantForm.get('consistency_percentage')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('consistency_percentage')?.errors?.['min']">Consistency Percentage must be at least 0.</span>
                  <span *ngIf="applicantForm.get('consistency_percentage')?.errors?.['max']">Consistency Percentage cannot exceed 100.</span>
                </div>

                <ion-item>
                  <ion-input label="Emergency Contact Name" type="text" formControlName="emergency_contact_name"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('emergency_contact_name')?.invalid && applicantForm.get('emergency_contact_name')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('emergency_contact_name')?.errors?.['maxlength']">Emergency Contact Name cannot exceed 100 characters.</span>
                </div>

                <ion-item>
                  <ion-input label="Emergency Contact Phone" type="text" formControlName="emergency_contact_phone"></ion-input>
                </ion-item>
                <div *ngIf="applicantForm.get('emergency_contact_phone')?.invalid && applicantForm.get('emergency_contact_phone')?.touched" class="ion-padding-start ion-text-danger">
                  <span *ngIf="applicantForm.get('emergency_contact_phone')?.errors?.['maxlength']">Emergency Contact Phone cannot exceed 20 characters.</span>
                </div>
              </ion-list>

              <div class="ion-padding-top ion-text-right">
                <ion-button fill="clear" routerLink="/admin/applicants">Cancel</ion-button>
                <ion-button type="submit" [disabled]="applicantForm.invalid">Save</ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
`, styles: ["/* src/app/admin/components/applicant-form/applicant-form.css */\n.form-group {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n}\n.form-label {\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  color: #D1D5DB;\n}\n.form-field {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  border-width: 0;\n  border-bottom-width: 2px;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  padding: 0.625rem;\n  color: white;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n.form-field::placeholder {\n  color: #9CA3AF;\n}\n.form-field:focus {\n  outline: none;\n  --tw-ring-shadow: 0 0 #0000;\n  border-color: #60A5FA;\n}\n.form-field option {\n  background-color: #1F2937;\n  color: white;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n/*# sourceMappingURL=applicant-form.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicantFormComponent, { className: "ApplicantFormComponent", filePath: "src/app/admin/components/applicant-form/applicant-form.ts", lineNumber: 18 });
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
var _c03 = (a0) => ["/admin/cases/edit", a0];
function CaseListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading cases...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function CaseListComponent_ion_list_11_ion_item_16_ion_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 16);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_ion_item_16_ion_button_14_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const caseItem_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCase(caseItem_r4.id));
    });
    \u0275\u0275element(1, "ion-icon", 17);
    \u0275\u0275elementEnd();
  }
}
function CaseListComponent_ion_list_11_ion_item_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "ion-badge", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-buttons", 0)(12, "ion-button", 13);
    \u0275\u0275element(13, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CaseListComponent_ion_list_11_ion_item_16_ion_button_14_Template, 2, 0, "ion-button", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const caseItem_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(caseItem_r4.employee_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(caseItem_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 7, caseItem_r4.date_reported, "shortDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("color", caseItem_r4.report_status === "open" ? "success" : "danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", caseItem_r4.report_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c03, caseItem_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdminUser);
  }
}
function CaseListComponent_ion_list_11_ion_item_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 18);
    \u0275\u0275text(2, "No cases found.");
    \u0275\u0275elementEnd()();
  }
}
function CaseListComponent_ion_list_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-item-divider")(2, "ion-label", 8);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_Template_ion_label_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("employee_name"));
    });
    \u0275\u0275text(3, "Employee ");
    \u0275\u0275element(4, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-label", 8);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_Template_ion_label_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("category"));
    });
    \u0275\u0275text(6, "Category ");
    \u0275\u0275element(7, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-label", 8);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_Template_ion_label_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("report_status"));
    });
    \u0275\u0275text(9, "Status ");
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-label", 8);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_Template_ion_label_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("date_reported"));
    });
    \u0275\u0275text(12, "Date Reported ");
    \u0275\u0275element(13, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-label", 10);
    \u0275\u0275text(15, "Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, CaseListComponent_ion_list_11_ion_item_16_Template, 15, 12, "ion-item", 11)(17, CaseListComponent_ion_list_11_ion_item_17_Template, 3, 0, "ion-item", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.filteredCases);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredCases || ctx_r1.filteredCases.length === 0);
  }
}
var CaseListComponent = class _CaseListComponent {
  caseService = inject(CaseService);
  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  // Inject AuthService
  allCases = [];
  filteredCases = [];
  searchTerm = "";
  isLoading = false;
  // Add loading state
  isAdminUser = false;
  // New property for admin status
  sortDirection = {};
  ngOnInit() {
    this.loadCases();
    this.isAdminUser = this.authService.getUserType() === "admin";
  }
  ionViewWillEnter() {
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseListComponent, selectors: [["app-case-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/cases/new"], ["name", "add-outline"], ["placeholder", "Search cases...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["slot", "end", 3, "color"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function CaseListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      \u0275\u0275text(3, "Cases");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275text(7, " New Case ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "ion-content")(9, "ion-searchbar", 3);
      \u0275\u0275twoWayListener("ngModelChange", function CaseListComponent_Template_ion_searchbar_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ionChange", function CaseListComponent_Template_ion_searchbar_ionChange_9_listener() {
        return ctx.filterCases();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, CaseListComponent_div_10_Template, 4, 0, "div", 4)(11, CaseListComponent_ion_list_11_Template, 18, 2, "ion-list", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, RouterModule, RouterLink, IonicModule, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonSearchbar, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, RouterLinkDelegateDirective, DatePipe], styles: ["\n\n/*# sourceMappingURL=case-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseListComponent, [{
    type: Component,
    args: [{ selector: "app-case-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Cases</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/admin/cases/new">
        <ion-icon name="add-outline"></ion-icon>
        New Case
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterCases()" placeholder="Search cases..."></ion-searchbar>

  <div *ngIf="isLoading" class="ion-padding ion-text-center">
    <p>Loading cases...</p>
    <ion-spinner name="crescent"></ion-spinner>
  </div>

  <ion-list *ngIf="!isLoading">
    <ion-item-divider>
      <ion-label (click)="sort('employee_name')">Employee <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('category')">Category <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('report_status')">Status <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('date_reported')">Date Reported <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label class="ion-text-right">Actions</ion-label>
    </ion-item-divider>

    <ion-item *ngFor="let caseItem of filteredCases">
      <ion-label>
        <h2>{{ caseItem.employee_name }}</h2>
        <p>{{ caseItem.category }}</p>
        <p>{{ caseItem.date_reported | date:'shortDate' }}</p>
      </ion-label>
      <ion-badge slot="end" [color]="caseItem.report_status === 'open' ? 'success' : 'danger'">
        {{ caseItem.report_status }}
      </ion-badge>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/admin/cases/edit', caseItem.id]" fill="clear">
          <ion-icon name="create-outline"></ion-icon>
        </ion-button>
        <ion-button (click)="deleteCase(caseItem.id)" fill="clear" color="danger" *ngIf="isAdminUser">
          <ion-icon name="trash-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>

    <ion-item *ngIf="!filteredCases || filteredCases.length === 0">
      <ion-label class="ion-text-center">No cases found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
`, styles: ["/* src/app/admin/pages/case-list/case-list.css */\n/*# sourceMappingURL=case-list.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaseListComponent, { className: "CaseListComponent", filePath: "src/app/admin/pages/case-list/case-list.ts", lineNumber: 17 });
})();

// src/app/admin/pages/case-form/case-form.ts
function CaseFormComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p");
    \u0275\u0275text(2, "Loading case details...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 6);
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_ion_select_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r3 = ctx.$implicit;
    \u0275\u0275property("value", app_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", app_r3.last_name, ", ", app_r3.first_name, " (", app_r3.passport_number, ") ");
  }
}
function CaseFormComponent_form_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Employee is required. ");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Category is required.");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Category cannot exceed 50 characters.");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CaseFormComponent_form_10_div_10_span_1_Template, 2, 0, "span", 25)(2, CaseFormComponent_form_10_div_10_span_2_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.caseForm.get("category")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.caseForm.get("category")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function CaseFormComponent_form_10_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Report is required. ");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_22_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Status is required.");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_22_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Status cannot exceed 15 characters.");
    \u0275\u0275elementEnd();
  }
}
function CaseFormComponent_form_10_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CaseFormComponent_form_10_div_22_span_1_Template, 2, 0, "span", 25)(2, CaseFormComponent_form_10_div_22_span_2_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.caseForm.get("report_status")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.caseForm.get("report_status")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function CaseFormComponent_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function CaseFormComponent_form_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCase());
    });
    \u0275\u0275elementStart(1, "ion-list", 8)(2, "ion-item")(3, "ion-select", 9)(4, "ion-select-option", 10);
    \u0275\u0275text(5, "Select an Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CaseFormComponent_form_10_ion_select_option_6_Template, 2, 4, "ion-select-option", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, CaseFormComponent_form_10_div_7_Template, 2, 0, "div", 12);
    \u0275\u0275elementStart(8, "ion-item");
    \u0275\u0275element(9, "ion-input", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, CaseFormComponent_form_10_div_10_Template, 3, 2, "div", 12);
    \u0275\u0275elementStart(11, "ion-item");
    \u0275\u0275element(12, "ion-textarea", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, CaseFormComponent_form_10_div_13_Template, 2, 0, "div", 12);
    \u0275\u0275elementStart(14, "ion-item")(15, "ion-select", 15)(16, "ion-select-option", 16);
    \u0275\u0275text(17, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-select-option", 17);
    \u0275\u0275text(19, "Closed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ion-select-option", 18);
    \u0275\u0275text(21, "Pending");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(22, CaseFormComponent_form_10_div_22_Template, 3, 2, "div", 12);
    \u0275\u0275elementStart(23, "ion-item");
    \u0275\u0275element(24, "ion-input", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 20)(26, "ion-button", 21);
    \u0275\u0275listener("click", function CaseFormComponent_form_10_Template_ion_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/cases"]));
    });
    \u0275\u0275text(27, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "ion-button", 22);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.caseForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.applicants);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.caseForm.get("employee_id")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.caseForm.get("employee_id")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.caseForm.get("category")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.caseForm.get("category")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.caseForm.get("report")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.caseForm.get("report")) == null ? null : tmp_6_0.touched));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.caseForm.get("report_status")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r1.caseForm.get("report_status")) == null ? null : tmp_7_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.caseForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update Case" : "Create Case");
  }
}
var CaseFormComponent = class _CaseFormComponent {
  caseService = inject(CaseService);
  applicantService = inject(ApplicantService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  caseForm;
  applicants = [];
  // For the applicant dropdown
  isEditMode = false;
  isLoading = false;
  // Add loading state
  async ngOnInit() {
    this.caseForm = this.fb.group({
      employee_id: [null, Validators.required],
      category: ["", [Validators.required, Validators.maxLength(50)]],
      report: ["", Validators.required],
      report_status: ["open", [Validators.required, Validators.maxLength(15)]],
      // Default to 'open'
      agency_id: [null]
    });
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
        this.caseForm.patchValue({
          employee_id: fetchedCase.employee_id,
          category: fetchedCase.category,
          report: fetchedCase.report,
          report_status: fetchedCase.report_status,
          agency_id: fetchedCase.agency_id
        });
      } else {
        console.error("Case not found");
        this.router.navigate(["/admin/cases"]);
      }
    } catch (error) {
      console.error("Error loading case:", error);
    }
  }
  async saveCase() {
    if (this.caseForm.invalid) {
      this.caseForm.markAllAsTouched();
      return;
    }
    try {
      const caseData = this.caseForm.value;
      if (this.isEditMode) {
        await this.caseService.updateCase(__spreadProps(__spreadValues({}, caseData), { id: this.route.snapshot.params["id"] }));
      } else {
        await this.caseService.createCase(caseData);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseFormComponent, selectors: [["app-case-form"]], decls: 11, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/cases"], [1, "ion-padding"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit", "formGroup"], ["lines", "full"], ["label", "Employee", "formControlName", "employee_id", "placeholder", "Select an Employee"], ["disabled", "", 3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], ["label", "Category", "type", "text", "formControlName", "category", "placeholder", "Enter category"], ["label", "Report", "rows", "5", "formControlName", "report", "placeholder", "Enter report details"], ["label", "Status", "formControlName", "report_status", "placeholder", "Select Status"], ["value", "open"], ["value", "closed"], ["value", "pending"], ["label", "Agency ID (Optional)", "type", "number", "formControlName", "agency_id", "placeholder", "Enter agency ID"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", 3, "click"], ["type", "submit", 3, "disabled"], [3, "value"], [1, "ion-padding-start", "ion-text-danger"], [4, "ngIf"]], template: function CaseFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "ion-card")(8, "ion-card-content");
      \u0275\u0275template(9, CaseFormComponent_div_9_Template, 4, 0, "div", 3)(10, CaseFormComponent_form_10_Template, 30, 9, "form", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Case" : "New Case");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n/*# sourceMappingURL=case-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseFormComponent, [{
    type: Component,
    args: [{ selector: "app-case-form", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/cases"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ isEditMode ? 'Edit Case' : 'New Case' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-card>
    <ion-card-content>
      <div *ngIf="isLoading" class="ion-text-center ion-padding">
        <p>Loading case details...</p>
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <form *ngIf="!isLoading" [formGroup]="caseForm" (ngSubmit)="saveCase()">
        <ion-list lines="full">
          <ion-item>
            <ion-select label="Employee" formControlName="employee_id" placeholder="Select an Employee">
              <ion-select-option [value]="null" disabled>Select an Employee</ion-select-option>
              <ion-select-option *ngFor="let app of applicants" [value]="app.id">
                {{ app.last_name }}, {{ app.first_name }} ({{ app.passport_number }})
              </ion-select-option>
            </ion-select>
          </ion-item>
          <div *ngIf="caseForm.get('employee_id')?.invalid && caseForm.get('employee_id')?.touched" class="ion-padding-start ion-text-danger">
            Employee is required.
          </div>

          <ion-item>
            <ion-input label="Category" type="text" formControlName="category" placeholder="Enter category"></ion-input>
          </ion-item>
          <div *ngIf="caseForm.get('category')?.invalid && caseForm.get('category')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="caseForm.get('category')?.errors?.['required']">Category is required.</span>
            <span *ngIf="caseForm.get('category')?.errors?.['maxlength']">Category cannot exceed 50 characters.</span>
          </div>

          <ion-item>
            <ion-textarea label="Report" rows="5" formControlName="report" placeholder="Enter report details"></ion-textarea>
          </ion-item>
          <div *ngIf="caseForm.get('report')?.invalid && caseForm.get('report')?.touched" class="ion-padding-start ion-text-danger">
            Report is required.
          </div>

          <ion-item>
            <ion-select label="Status" formControlName="report_status" placeholder="Select Status">
              <ion-select-option value="open">Open</ion-select-option>
              <ion-select-option value="closed">Closed</ion-select-option>
              <ion-select-option value="pending">Pending</ion-select-option>
            </ion-select>
          </ion-item>
          <div *ngIf="caseForm.get('report_status')?.invalid && caseForm.get('report_status')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="caseForm.get('report_status')?.errors?.['required']">Status is required.</span>
            <span *ngIf="caseForm.get('report_status')?.errors?.['maxlength']">Status cannot exceed 15 characters.</span>
          </div>

          <ion-item>
            <ion-input label="Agency ID (Optional)" type="number" formControlName="agency_id" placeholder="Enter agency ID"></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding-top ion-text-right">
          <ion-button fill="clear" (click)="router.navigate(['/admin/cases'])">Cancel</ion-button>
          <ion-button type="submit" [disabled]="caseForm.invalid">{{ isEditMode ? 'Update Case' : 'Create Case' }}</ion-button>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</ion-content>
`, styles: ["/* src/app/admin/pages/case-form/case-form.css */\n/*# sourceMappingURL=case-form.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaseFormComponent, { className: "CaseFormComponent", filePath: "src/app/admin/pages/case-form/case-form.ts", lineNumber: 17 });
})();

// src/app/admin/pages/fra-list/fra-list.ts
var _c04 = (a0) => ["/admin/fras/edit", a0];
function FraListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading FRAs...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function FraListComponent_ion_list_11_ion_item_13_ion_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 15);
    \u0275\u0275listener("click", function FraListComponent_ion_list_11_ion_item_13_ion_button_11_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const fra_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteFra(fra_r4.id));
    });
    \u0275\u0275element(1, "ion-icon", 16);
    \u0275\u0275elementEnd();
  }
}
function FraListComponent_ion_list_11_ion_item_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "ion-buttons", 0)(9, "ion-button", 12);
    \u0275\u0275element(10, "ion-icon", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, FraListComponent_ion_list_11_ion_item_13_ion_button_11_Template, 2, 0, "ion-button", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fra_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(fra_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.contact);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.country);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c04, fra_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdminUser);
  }
}
function FraListComponent_ion_list_11_ion_item_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 17);
    \u0275\u0275text(2, "No FRAs found.");
    \u0275\u0275elementEnd()();
  }
}
function FraListComponent_ion_list_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-item-divider")(2, "ion-label", 8);
    \u0275\u0275listener("click", function FraListComponent_ion_list_11_Template_ion_label_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("name"));
    });
    \u0275\u0275text(3, "Name ");
    \u0275\u0275element(4, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-label", 8);
    \u0275\u0275listener("click", function FraListComponent_ion_list_11_Template_ion_label_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("contact"));
    });
    \u0275\u0275text(6, "Contact ");
    \u0275\u0275element(7, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-label", 8);
    \u0275\u0275listener("click", function FraListComponent_ion_list_11_Template_ion_label_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("country"));
    });
    \u0275\u0275text(9, "Country ");
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-label", 10);
    \u0275\u0275text(12, "Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, FraListComponent_ion_list_11_ion_item_13_Template, 12, 7, "ion-item", 11)(14, FraListComponent_ion_list_11_ion_item_14_Template, 3, 0, "ion-item", 5);
    \u0275\u0275elementEnd();
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
  authService = inject(AuthService);
  // Inject AuthService
  allFras = [];
  filteredFras = [];
  searchTerm = "";
  isLoading = false;
  isAdminUser = false;
  // New property for admin status
  sortDirection = {};
  ngOnInit() {
    this.loadFras();
    this.isAdminUser = this.authService.getUserType() === "admin";
  }
  ionViewWillEnter() {
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraListComponent, selectors: [["app-fra-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/fras/new"], ["name", "add-outline"], ["placeholder", "Search FRAs...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function FraListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      \u0275\u0275text(3, "Foreign Recruitment Agencies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275text(7, " New FRA ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "ion-content")(9, "ion-searchbar", 3);
      \u0275\u0275twoWayListener("ngModelChange", function FraListComponent_Template_ion_searchbar_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ionChange", function FraListComponent_Template_ion_searchbar_ionChange_9_listener() {
        return ctx.filterFras();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, FraListComponent_div_10_Template, 4, 0, "div", 4)(11, FraListComponent_ion_list_11_Template, 15, 2, "ion-list", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, RouterModule, RouterLink, IonicModule, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonSearchbar, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, RouterLinkDelegateDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraListComponent, [{
    type: Component,
    args: [{ selector: "app-fra-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Foreign Recruitment Agencies</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/admin/fras/new">
        <ion-icon name="add-outline"></ion-icon>
        New FRA
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterFras()" placeholder="Search FRAs..."></ion-searchbar>

  <div *ngIf="isLoading" class="ion-padding ion-text-center">
    <p>Loading FRAs...</p>
    <ion-spinner name="crescent"></ion-spinner>
  </div>

  <ion-list *ngIf="!isLoading">
    <ion-item-divider>
      <ion-label (click)="sort('name')">Name <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('contact')">Contact <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('country')">Country <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label class="ion-text-right">Actions</ion-label>
    </ion-item-divider>

    <ion-item *ngFor="let fra of filteredFras">
      <ion-label>
        <h2>{{ fra.name }}</h2>
        <p>{{ fra.contact }}</p>
        <p>{{ fra.country }}</p>
      </ion-label>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/admin/fras/edit', fra.id]" fill="clear">
          <ion-icon name="create-outline"></ion-icon>
        </ion-button>
        <ion-button (click)="deleteFra(fra.id)" fill="clear" color="danger" *ngIf="isAdminUser">
          <ion-icon name="trash-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>

    <ion-item *ngIf="!filteredFras || filteredFras.length === 0">
      <ion-label class="ion-text-center">No FRAs found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraListComponent, { className: "FraListComponent", filePath: "src/app/admin/pages/fra-list/fra-list.ts", lineNumber: 17 });
})();

// src/app/admin/components/fra-form/fra-form.ts
function FraFormComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p");
    \u0275\u0275text(2, "Loading FRA data...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 6);
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "FRA Name is required.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "FRA Name cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, FraFormComponent_form_10_div_4_span_1_Template, 2, 0, "span", 49)(2, FraFormComponent_form_10_div_4_span_2_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.fraForm.get("name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.fraForm.get("name")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function FraFormComponent_form_10_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Contact Person is required.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Contact Person cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, FraFormComponent_form_10_div_7_span_1_Template, 2, 0, "span", 49)(2, FraFormComponent_form_10_div_7_span_2_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.fraForm.get("contact")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.fraForm.get("contact")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function FraFormComponent_form_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1, " Address is required. ");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_73_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Country is required.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_73_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Country cannot exceed 50 characters.");
    \u0275\u0275elementEnd();
  }
}
function FraFormComponent_form_10_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, FraFormComponent_form_10_div_73_span_1_Template, 2, 0, "span", 49)(2, FraFormComponent_form_10_div_73_span_2_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.fraForm.get("country")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.fraForm.get("country")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function FraFormComponent_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function FraFormComponent_form_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveFra());
    });
    \u0275\u0275elementStart(1, "ion-list", 8)(2, "ion-item");
    \u0275\u0275element(3, "ion-input", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, FraFormComponent_form_10_div_4_Template, 3, 2, "div", 10);
    \u0275\u0275elementStart(5, "ion-item");
    \u0275\u0275element(6, "ion-input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, FraFormComponent_form_10_div_7_Template, 3, 2, "div", 10);
    \u0275\u0275elementStart(8, "ion-item");
    \u0275\u0275element(9, "ion-textarea", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, FraFormComponent_form_10_div_10_Template, 2, 0, "div", 10);
    \u0275\u0275elementStart(11, "ion-item")(12, "ion-select", 13)(13, "ion-select-option", 14);
    \u0275\u0275text(14, "Select Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-select-option", 15);
    \u0275\u0275text(16, "United States");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ion-select-option", 16);
    \u0275\u0275text(18, "Canada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "ion-select-option", 17);
    \u0275\u0275text(20, "Mexico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ion-select-option", 18);
    \u0275\u0275text(22, "Brazil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "ion-select-option", 19);
    \u0275\u0275text(24, "United Kingdom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "ion-select-option", 20);
    \u0275\u0275text(26, "France");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ion-select-option", 21);
    \u0275\u0275text(28, "Germany");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ion-select-option", 22);
    \u0275\u0275text(30, "Italy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ion-select-option", 23);
    \u0275\u0275text(32, "Spain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "ion-select-option", 24);
    \u0275\u0275text(34, "China");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "ion-select-option", 25);
    \u0275\u0275text(36, "India");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "ion-select-option", 26);
    \u0275\u0275text(38, "Japan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "ion-select-option", 27);
    \u0275\u0275text(40, "South Korea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "ion-select-option", 28);
    \u0275\u0275text(42, "Australia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "ion-select-option", 29);
    \u0275\u0275text(44, "New Zealand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "ion-select-option", 30);
    \u0275\u0275text(46, "Philippines");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "ion-select-option", 31);
    \u0275\u0275text(48, "Saudi Arabia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "ion-select-option", 32);
    \u0275\u0275text(50, "United Arab Emirates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "ion-select-option", 33);
    \u0275\u0275text(52, "Qatar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "ion-select-option", 34);
    \u0275\u0275text(54, "Kuwait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "ion-select-option", 35);
    \u0275\u0275text(56, "Bahrain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "ion-select-option", 36);
    \u0275\u0275text(58, "Oman");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "ion-select-option", 37);
    \u0275\u0275text(60, "Egypt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "ion-select-option", 38);
    \u0275\u0275text(62, "Jordan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "ion-select-option", 39);
    \u0275\u0275text(64, "Lebanon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "ion-select-option", 40);
    \u0275\u0275text(66, "Iraq");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "ion-select-option", 41);
    \u0275\u0275text(68, "Iran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "ion-select-option", 42);
    \u0275\u0275text(70, "Turkey");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "ion-select-option", 43);
    \u0275\u0275text(72, "Israel");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(73, FraFormComponent_form_10_div_73_Template, 3, 2, "div", 10);
    \u0275\u0275elementStart(74, "ion-item");
    \u0275\u0275element(75, "ion-input", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 45)(77, "ion-button", 46);
    \u0275\u0275listener("click", function FraFormComponent_form_10_Template_ion_button_click_77_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/fras"]));
    });
    \u0275\u0275text(78, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "ion-button", 47);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.fraForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.fraForm.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.fraForm.get("name")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.fraForm.get("contact")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.fraForm.get("contact")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.fraForm.get("address")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.fraForm.get("address")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(63);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.fraForm.get("country")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.fraForm.get("country")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.fraForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update FRA" : "Create FRA");
  }
}
var FraFormComponent = class _FraFormComponent {
  fraService = inject(FraService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  fraForm;
  isEditMode = false;
  fraId = null;
  isLoading = false;
  ngOnInit() {
    this.fraForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(255)]],
      contact: ["", [Validators.required, Validators.maxLength(255)]],
      address: ["", Validators.required],
      country: ["", [Validators.required, Validators.maxLength(50)]],
      agency_id: [null]
      // Assuming it's optional
    });
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
        this.fraForm.patchValue(data);
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
    if (this.fraForm.invalid) {
      this.fraForm.markAllAsTouched();
      return;
    }
    try {
      const fraData = this.fraForm.value;
      if (this.isEditMode && this.fraId) {
        await this.fraService.updateFra(__spreadProps(__spreadValues({}, fraData), { id: this.fraId }));
      } else {
        await this.fraService.createFra(fraData);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraFormComponent, selectors: [["app-fra-form"]], decls: 11, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/fras"], [1, "ion-padding"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit", "formGroup"], ["lines", "full"], ["label", "Name", "type", "text", "formControlName", "name", "placeholder", "Enter FRA name"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], ["label", "Contact Person", "type", "text", "formControlName", "contact", "placeholder", "Enter contact person"], ["label", "Address", "rows", "3", "formControlName", "address", "placeholder", "Enter address"], ["label", "Country", "formControlName", "country", "placeholder", "Select Country"], ["value", ""], ["value", "US"], ["value", "CA"], ["value", "MX"], ["value", "BR"], ["value", "GB"], ["value", "FR"], ["value", "DE"], ["value", "IT"], ["value", "ES"], ["value", "CN"], ["value", "IN"], ["value", "JP"], ["value", "KR"], ["value", "AU"], ["value", "NZ"], ["value", "PH"], ["value", "SA"], ["value", "AE"], ["value", "QA"], ["value", "KW"], ["value", "BH"], ["value", "OM"], ["value", "EG"], ["value", "JO"], ["value", "LB"], ["value", "IQ"], ["value", "IR"], ["value", "TR"], ["value", "IL"], ["label", "Agency ID", "type", "number", "formControlName", "agency_id", "placeholder", "Enter agency ID"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", 3, "click"], ["type", "submit", 3, "disabled"], [1, "ion-padding-start", "ion-text-danger"], [4, "ngIf"]], template: function FraFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "ion-card")(8, "ion-card-content");
      \u0275\u0275template(9, FraFormComponent_div_9_Template, 4, 0, "div", 3)(10, FraFormComponent_form_10_Template, 81, 7, "form", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit FRA" : "Add New FRA");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RouterModule, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton, ReactiveFormsModule, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraFormComponent, [{
    type: Component,
    args: [{ selector: "app-fra-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule, ReactiveFormsModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/fras"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ isEditMode ? 'Edit FRA' : 'Add New FRA' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-card>
    <ion-card-content>
      <div *ngIf="isLoading" class="ion-text-center ion-padding">
        <p>Loading FRA data...</p>
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <form *ngIf="!isLoading" [formGroup]="fraForm" (ngSubmit)="saveFra()">
        <ion-list lines="full">
          <ion-item>
            <ion-input label="Name" type="text" formControlName="name" placeholder="Enter FRA name"></ion-input>
          </ion-item>
          <div *ngIf="fraForm.get('name')?.invalid && fraForm.get('name')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="fraForm.get('name')?.errors?.['required']">FRA Name is required.</span>
            <span *ngIf="fraForm.get('name')?.errors?.['maxlength']">FRA Name cannot exceed 255 characters.</span>
          </div>

          <ion-item>
            <ion-input label="Contact Person" type="text" formControlName="contact" placeholder="Enter contact person"></ion-input>
          </ion-item>
          <div *ngIf="fraForm.get('contact')?.invalid && fraForm.get('contact')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="fraForm.get('contact')?.errors?.['required']">Contact Person is required.</span>
            <span *ngIf="fraForm.get('contact')?.errors?.['maxlength']">Contact Person cannot exceed 255 characters.</span>
          </div>

          <ion-item>
            <ion-textarea label="Address" rows="3" formControlName="address" placeholder="Enter address"></ion-textarea>
          </ion-item>
          <div *ngIf="fraForm.get('address')?.invalid && fraForm.get('address')?.touched" class="ion-padding-start ion-text-danger">
            Address is required.
          </div>

          <ion-item>
            <ion-select label="Country" formControlName="country" placeholder="Select Country">
              <ion-select-option value="">Select Country</ion-select-option>
              <ion-select-option value="US">United States</ion-select-option>
              <ion-select-option value="CA">Canada</ion-select-option>
              <ion-select-option value="MX">Mexico</ion-select-option>
              <ion-select-option value="BR">Brazil</ion-select-option>
              <ion-select-option value="GB">United Kingdom</ion-select-option>
              <ion-select-option value="FR">France</ion-select-option>
              <ion-select-option value="DE">Germany</ion-select-option>
              <ion-select-option value="IT">Italy</ion-select-option>
              <ion-select-option value="ES">Spain</ion-select-option>
              <ion-select-option value="CN">China</ion-select-option>
              <ion-select-option value="IN">India</ion-select-option>
              <ion-select-option value="JP">Japan</ion-select-option>
              <ion-select-option value="KR">South Korea</ion-select-option>
              <ion-select-option value="AU">Australia</ion-select-option>
              <ion-select-option value="NZ">New Zealand</ion-select-option>
              <ion-select-option value="PH">Philippines</ion-select-option>
              <ion-select-option value="SA">Saudi Arabia</ion-select-option>
              <ion-select-option value="AE">United Arab Emirates</ion-select-option>
              <ion-select-option value="QA">Qatar</ion-select-option>
              <ion-select-option value="KW">Kuwait</ion-select-option>
              <ion-select-option value="BH">Bahrain</ion-select-option>
              <ion-select-option value="OM">Oman</ion-select-option>
              <ion-select-option value="EG">Egypt</ion-select-option>
              <ion-select-option value="JO">Jordan</ion-select-option>
              <ion-select-option value="LB">Lebanon</ion-select-option>
              <ion-select-option value="IQ">Iraq</ion-select-option>
              <ion-select-option value="IR">Iran</ion-select-option>
              <ion-select-option value="TR">Turkey</ion-select-option>
              <ion-select-option value="IL">Israel</ion-select-option>
            </ion-select>
          </ion-item>
          <div *ngIf="fraForm.get('country')?.invalid && fraForm.get('country')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="fraForm.get('country')?.errors?.['required']">Country is required.</span>
            <span *ngIf="fraForm.get('country')?.errors?.['maxlength']">Country cannot exceed 50 characters.</span>
          </div>

          <ion-item>
            <ion-input label="Agency ID" type="number" formControlName="agency_id" placeholder="Enter agency ID"></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding-top ion-text-right">
          <ion-button fill="clear" (click)="router.navigate(['/admin/fras'])">Cancel</ion-button>
          <ion-button type="submit" [disabled]="fraForm.invalid">{{ isEditMode ? 'Update FRA' : 'Create FRA' }}</ion-button>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraFormComponent, { className: "FraFormComponent", filePath: "src/app/admin/components/fra-form/fra-form.ts", lineNumber: 17 });
})();

// src/app/admin/services/referral.service.ts
var ReferralService = class _ReferralService {
  db = inject(DatabaseService);
  async getReferrals() {
    const response = await firstValueFrom(this.db.query(GET_REFERRALS));
    return response && response.data ? response.data : [];
  }
  async getReferralById(id) {
    const res = await firstValueFrom(this.db.query(GET_REFERRAL_BY_ID, [id]));
    return res && res.data && res.data.length > 0 ? res.data[0] : null;
  }
  async createReferral(referral) {
    const params = this.mapReferralToParams(referral);
    return firstValueFrom(this.db.query(CREATE_REFERRAL, params));
  }
  async updateReferral(referral) {
    const params = this.mapReferralToParams(referral);
    return firstValueFrom(this.db.query(UPDATE_REFERRAL, [...params, referral.id]));
  }
  async deleteReferral(id) {
    return firstValueFrom(this.db.query(DELETE_REFERRAL, [id]));
  }
  mapReferralToParams(referral) {
    return [
      referral.name || "",
      referral.contact || "",
      referral.referred_by || ""
    ];
  }
  static \u0275fac = function ReferralService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReferralService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReferralService, factory: _ReferralService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReferralService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/pages/referral-list/referral-list.ts
var _c05 = (a0) => ["/admin/referrals/edit", a0];
function ReferralListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading Referrals...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function ReferralListComponent_ion_list_11_ion_item_13_ion_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 15);
    \u0275\u0275listener("click", function ReferralListComponent_ion_list_11_ion_item_13_ion_button_11_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const referral_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteReferral(referral_r4.id));
    });
    \u0275\u0275element(1, "ion-icon", 16);
    \u0275\u0275elementEnd();
  }
}
function ReferralListComponent_ion_list_11_ion_item_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "ion-buttons", 0)(9, "ion-button", 12);
    \u0275\u0275element(10, "ion-icon", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, ReferralListComponent_ion_list_11_ion_item_13_ion_button_11_Template, 2, 0, "ion-button", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const referral_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(referral_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(referral_r4.contact);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(referral_r4.referred_by);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c05, referral_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdminUser);
  }
}
function ReferralListComponent_ion_list_11_ion_item_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 17);
    \u0275\u0275text(2, "No Referrals found.");
    \u0275\u0275elementEnd()();
  }
}
function ReferralListComponent_ion_list_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-item-divider")(2, "ion-label", 8);
    \u0275\u0275listener("click", function ReferralListComponent_ion_list_11_Template_ion_label_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("name"));
    });
    \u0275\u0275text(3, "Name ");
    \u0275\u0275element(4, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-label", 8);
    \u0275\u0275listener("click", function ReferralListComponent_ion_list_11_Template_ion_label_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("contact"));
    });
    \u0275\u0275text(6, "Contact ");
    \u0275\u0275element(7, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-label", 8);
    \u0275\u0275listener("click", function ReferralListComponent_ion_list_11_Template_ion_label_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("referred_by"));
    });
    \u0275\u0275text(9, "Referred By ");
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-label", 10);
    \u0275\u0275text(12, "Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, ReferralListComponent_ion_list_11_ion_item_13_Template, 12, 7, "ion-item", 11)(14, ReferralListComponent_ion_list_11_ion_item_14_Template, 3, 0, "ion-item", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.filteredReferrals);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredReferrals || ctx_r1.filteredReferrals.length === 0);
  }
}
var ReferralListComponent = class _ReferralListComponent {
  referralService = inject(ReferralService);
  // Changed from fraService
  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  allReferrals = [];
  // Changed from allFras
  filteredReferrals = [];
  // Changed from filteredFras
  searchTerm = "";
  isLoading = false;
  isAdminUser = false;
  sortDirection = {};
  ngOnInit() {
    this.loadReferrals();
    this.isAdminUser = this.authService.getUserType() === "admin";
  }
  ionViewWillEnter() {
    this.loadReferrals();
  }
  async loadReferrals() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allReferrals = await this.referralService.getReferrals();
      this.filterReferrals();
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error loading Referrals:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  filterReferrals() {
    const term = this.searchTerm.toLowerCase();
    this.filteredReferrals = this.allReferrals.filter(
      (referral) => (
        // Changed from allFras.filter(fra
        (referral.name?.toLowerCase() ?? "").includes(term) || (referral.contact?.toLowerCase() ?? "").includes(term) || (referral.referred_by?.toLowerCase() ?? "").includes(term)
      )
      // Changed from country
    );
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredReferrals.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB)
        return direction === "asc" ? -1 : 1;
      if (valA > valB)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteReferral(id) {
    if (confirm("Are you sure you want to delete this Referral?")) {
      try {
        await this.referralService.deleteReferral(id);
        this.loadReferrals();
      } catch (error) {
        console.error("Error deleting Referral:", error);
        alert("Failed to delete Referral.");
      }
    }
  }
  static \u0275fac = function ReferralListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReferralListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReferralListComponent, selectors: [["app-referral-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/referrals/new"], ["name", "add-outline"], ["placeholder", "Search Referrals...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function ReferralListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      \u0275\u0275text(3, "Referrals");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275text(7, " New Referral ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "ion-content")(9, "ion-searchbar", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ReferralListComponent_Template_ion_searchbar_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ionChange", function ReferralListComponent_Template_ion_searchbar_ionChange_9_listener() {
        return ctx.filterReferrals();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, ReferralListComponent_div_10_Template, 4, 0, "div", 4)(11, ReferralListComponent_ion_list_11_Template, 15, 2, "ion-list", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, RouterModule, RouterLink, IonicModule, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonSearchbar, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, RouterLinkDelegateDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReferralListComponent, [{
    type: Component,
    args: [{ selector: "app-referral-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Referrals</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/admin/referrals/new">
        <ion-icon name="add-outline"></ion-icon>
        New Referral
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterReferrals()" placeholder="Search Referrals..."></ion-searchbar>

  <div *ngIf="isLoading" class="ion-padding ion-text-center">
    <p>Loading Referrals...</p>
    <ion-spinner name="crescent"></ion-spinner>
  </div>

  <ion-list *ngIf="!isLoading">
    <ion-item-divider>
      <ion-label (click)="sort('name')">Name <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('contact')">Contact <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('referred_by')">Referred By <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label class="ion-text-right">Actions</ion-label>
    </ion-item-divider>

    <ion-item *ngFor="let referral of filteredReferrals">
      <ion-label>
        <h2>{{ referral.name }}</h2>
        <p>{{ referral.contact }}</p>
        <p>{{ referral.referred_by }}</p>
      </ion-label>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/admin/referrals/edit', referral.id]" fill="clear">
          <ion-icon name="create-outline"></ion-icon>
        </ion-button>
        <ion-button (click)="deleteReferral(referral.id)" fill="clear" color="danger" *ngIf="isAdminUser">
          <ion-icon name="trash-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>

    <ion-item *ngIf="!filteredReferrals || filteredReferrals.length === 0">
      <ion-label class="ion-text-center">No Referrals found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReferralListComponent, { className: "ReferralListComponent", filePath: "src/app/admin/pages/referral-list/referral-list.ts", lineNumber: 17 });
})();

// src/app/admin/pages/referral-form/referral-form.ts
function ReferralFormComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p");
    \u0275\u0275text(2, "Loading Referral data...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 6);
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Name is required.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Name cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, ReferralFormComponent_form_10_div_4_span_1_Template, 2, 0, "span", 17)(2, ReferralFormComponent_form_10_div_4_span_2_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.referralForm.get("name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.referralForm.get("name")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ReferralFormComponent_form_10_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Contact is required.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Contact cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, ReferralFormComponent_form_10_div_7_span_1_Template, 2, 0, "span", 17)(2, ReferralFormComponent_form_10_div_7_span_2_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.referralForm.get("contact")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.referralForm.get("contact")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ReferralFormComponent_form_10_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Referred By is required.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Referred By cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function ReferralFormComponent_form_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, ReferralFormComponent_form_10_div_10_span_1_Template, 2, 0, "span", 17)(2, ReferralFormComponent_form_10_div_10_span_2_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.referralForm.get("referred_by")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.referralForm.get("referred_by")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function ReferralFormComponent_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function ReferralFormComponent_form_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveReferral());
    });
    \u0275\u0275elementStart(1, "ion-list", 8)(2, "ion-item");
    \u0275\u0275element(3, "ion-input", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ReferralFormComponent_form_10_div_4_Template, 3, 2, "div", 10);
    \u0275\u0275elementStart(5, "ion-item");
    \u0275\u0275element(6, "ion-input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ReferralFormComponent_form_10_div_7_Template, 3, 2, "div", 10);
    \u0275\u0275elementStart(8, "ion-item");
    \u0275\u0275element(9, "ion-input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, ReferralFormComponent_form_10_div_10_Template, 3, 2, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 13)(12, "ion-button", 14);
    \u0275\u0275listener("click", function ReferralFormComponent_form_10_Template_ion_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/referrals"]));
    });
    \u0275\u0275text(13, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-button", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.referralForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.referralForm.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.referralForm.get("name")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.referralForm.get("contact")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.referralForm.get("contact")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.referralForm.get("referred_by")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.referralForm.get("referred_by")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.referralForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update Referral" : "Create Referral");
  }
}
var ReferralFormComponent = class _ReferralFormComponent {
  referralService = inject(ReferralService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  referralForm;
  isEditMode = false;
  referralId = null;
  isLoading = false;
  ngOnInit() {
    this.referralForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(255)]],
      contact: ["", [Validators.required, Validators.maxLength(255)]],
      referred_by: ["", [Validators.required, Validators.maxLength(255)]]
    });
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.referralId = +id;
      this.loadReferralData(this.referralId);
    }
  }
  async loadReferralData(id) {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.referralService.getReferralById(id);
      if (data) {
        this.referralForm.patchValue(data);
      } else {
        this.router.navigate(["/admin/referrals"]);
      }
    } catch (error) {
      console.error("Error loading Referral data:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  async saveReferral() {
    if (this.referralForm.invalid) {
      this.referralForm.markAllAsTouched();
      return;
    }
    try {
      const referralData = this.referralForm.value;
      if (this.isEditMode && this.referralId) {
        await this.referralService.updateReferral(__spreadProps(__spreadValues({}, referralData), { id: this.referralId }));
      } else {
        await this.referralService.createReferral(referralData);
      }
      this.router.navigate(["/admin/referrals"]);
    } catch (error) {
      console.error("Error saving Referral:", error);
      alert("Failed to save Referral.");
    }
  }
  static \u0275fac = function ReferralFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReferralFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReferralFormComponent, selectors: [["app-referral-form"]], decls: 11, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/referrals"], [1, "ion-padding"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit", "formGroup"], ["lines", "full"], ["label", "Name", "type", "text", "formControlName", "name", "placeholder", "Enter name"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], ["label", "Contact", "type", "text", "formControlName", "contact", "placeholder", "Enter contact information"], ["label", "Referred By", "type", "text", "formControlName", "referred_by", "placeholder", "Enter referrer"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", 3, "click"], ["type", "submit", 3, "disabled"], [1, "ion-padding-start", "ion-text-danger"], [4, "ngIf"]], template: function ReferralFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "ion-card")(8, "ion-card-content");
      \u0275\u0275template(9, ReferralFormComponent_div_9_Template, 4, 0, "div", 3)(10, ReferralFormComponent_form_10_Template, 16, 6, "form", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Referral" : "Add New Referral");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RouterModule, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonList, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, IonBackButton, ReactiveFormsModule, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReferralFormComponent, [{
    type: Component,
    args: [{ selector: "app-referral-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule, ReactiveFormsModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/referrals"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ isEditMode ? 'Edit Referral' : 'Add New Referral' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-card>
    <ion-card-content>
      <div *ngIf="isLoading" class="ion-text-center ion-padding">
        <p>Loading Referral data...</p>
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <form *ngIf="!isLoading" [formGroup]="referralForm" (ngSubmit)="saveReferral()">
        <ion-list lines="full">
          <ion-item>
            <ion-input label="Name" type="text" formControlName="name" placeholder="Enter name"></ion-input>
          </ion-item>
          <div *ngIf="referralForm.get('name')?.invalid && referralForm.get('name')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="referralForm.get('name')?.errors?.['required']">Name is required.</span>
            <span *ngIf="referralForm.get('name')?.errors?.['maxlength']">Name cannot exceed 255 characters.</span>
          </div>

          <ion-item>
            <ion-input label="Contact" type="text" formControlName="contact" placeholder="Enter contact information"></ion-input>
          </ion-item>
          <div *ngIf="referralForm.get('contact')?.invalid && referralForm.get('contact')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="referralForm.get('contact')?.errors?.['required']">Contact is required.</span>
            <span *ngIf="referralForm.get('contact')?.errors?.['maxlength']">Contact cannot exceed 255 characters.</span>
          </div>

          <ion-item>
            <ion-input label="Referred By" type="text" formControlName="referred_by" placeholder="Enter referrer"></ion-input>
          </ion-item>
          <div *ngIf="referralForm.get('referred_by')?.invalid && referralForm.get('referred_by')?.touched" class="ion-padding-start ion-text-danger">
            <span *ngIf="referralForm.get('referred_by')?.errors?.['required']">Referred By is required.</span>
            <span *ngIf="referralForm.get('referred_by')?.errors?.['maxlength']">Referred By cannot exceed 255 characters.</span>
          </div>
        </ion-list>

        <div class="ion-padding-top ion-text-right">
          <ion-button fill="clear" (click)="router.navigate(['/admin/referrals'])">Cancel</ion-button>
          <ion-button type="submit" [disabled]="referralForm.invalid">{{ isEditMode ? 'Update Referral' : 'Create Referral' }}</ion-button>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReferralFormComponent, { className: "ReferralFormComponent", filePath: "src/app/admin/pages/referral-form/referral-form.ts", lineNumber: 16 });
})();

// src/app/admin/services/admin-users.service.ts
var AdminUsersService = class _AdminUsersService {
  apiUrl = "api/database.php";
  // Assuming this handles admin user CRUD
  http = inject(HttpClient);
  encryptionService = inject(EncryptionService);
  async executeQuery(query, params = []) {
    const payload = { query, params };
    const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(payload));
    return lastValueFrom(this.http.post(this.apiUrl, encryptedPayload));
  }
  async getUsers() {
    const query = "SELECT id, full_name, email, user_type, created_at, updated_at FROM admin_users";
    const response = await this.executeQuery(query);
    return response.data;
  }
  async getUserById(id) {
    const query = "SELECT id, full_name, email, user_type, created_at, updated_at FROM admin_users WHERE id = ?";
    const response = await this.executeQuery(query, [id]);
    return response.data[0];
  }
  async createUser(user) {
    const query = "INSERT INTO admin_users (full_name, email, password, user_type) VALUES (?, ?, ?, ?)";
    const response = await this.executeQuery(query, [user.full_name, user.email, user.password, user.user_type]);
    return response.success;
  }
  async updateUser(id, user) {
    let query = "UPDATE admin_users SET full_name = ?, email = ?, user_type = ?, updated_at = NOW() WHERE id = ?";
    let params = [user.full_name, user.email, user.user_type, id];
    if (user.password) {
      query = "UPDATE admin_users SET full_name = ?, email = ?, password = ?, user_type = ?, updated_at = NOW() WHERE id = ?";
      params = [user.full_name, user.email, user.password, user.user_type, id];
    }
    const response = await this.executeQuery(query, params);
    return response.success;
  }
  async deleteUser(id) {
    const query = "DELETE FROM admin_users WHERE id = ?";
    const response = await this.executeQuery(query, [id]);
    return response.success;
  }
  static \u0275fac = function AdminUsersService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUsersService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminUsersService, factory: _AdminUsersService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUsersService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/pages/user-list/user-list.ts
function UserListComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2, "Loading users...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 8);
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_ion_list_12_ion_item_1_ion_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 12);
    \u0275\u0275listener("click", function UserListComponent_ion_list_12_ion_item_1_ion_button_9_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const user_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteUser(user_r2.id));
    });
    \u0275\u0275element(1, "ion-icon", 13);
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_ion_list_12_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-buttons", 1)(7, "ion-button", 2);
    \u0275\u0275listener("click", function UserListComponent_ion_list_12_ion_item_1_Template_ion_button_click_7_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editUser(user_r2.id));
    });
    \u0275\u0275element(8, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, UserListComponent_ion_list_12_ion_item_1_ion_button_9_Template, 2, 0, "ion-button", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r2.full_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", user_r2.email, " - ", user_r2.user_type);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.isAdmin);
  }
}
function UserListComponent_ion_list_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-list");
    \u0275\u0275template(1, UserListComponent_ion_list_12_ion_item_1_Template, 10, 4, "ion-item", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.users);
  }
}
function UserListComponent_ion_card_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-card")(1, "ion-card-content")(2, "p", 14);
    \u0275\u0275text(3, "No admin users found.");
    \u0275\u0275elementEnd()()();
  }
}
var UserListComponent = class _UserListComponent {
  users = [];
  isAdmin = false;
  isLoading = false;
  // Add isLoading property
  authService = inject(AuthService);
  adminUsersService = inject(AdminUsersService);
  router = inject(Router);
  alertController = inject(AlertController);
  cdr = inject(ChangeDetectorRef);
  // Inject ChangeDetectorRef
  ngOnInit() {
    this.checkAdminStatus();
    this.loadUsers();
  }
  ionViewWillEnter() {
    this.loadUsers();
  }
  checkAdminStatus() {
    this.isAdmin = this.authService.getUserType() === "admin";
  }
  async loadUsers() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.users = await this.adminUsersService.getUsers();
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  editUser(userId) {
    this.router.navigate(["/admin/users/edit", userId]);
  }
  async deleteUser(userId) {
    if (!this.isAdmin) {
      this.presentAlert("Permission Denied", "You do not have permission to delete users.");
      return;
    }
    const alert2 = await this.alertController.create({
      header: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: async () => {
            try {
              await this.adminUsersService.deleteUser(userId);
              this.loadUsers();
            } catch (error) {
              console.error("Error deleting user:", error);
              this.presentAlert("Error", "Failed to delete user.");
            }
          }
        }
      ]
    });
    await alert2.present();
  }
  async presentAlert(header, message) {
    const alert2 = await this.alertController.create({
      header,
      message,
      buttons: ["OK"]
    });
    await alert2.present();
  }
  navigateToNewUser() {
    console.log("Attempting to navigate to /admin/users/new");
    this.router.navigate(["/admin/users/new"]);
  }
  static \u0275fac = function UserListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserListComponent, selectors: [["app-user-list"]], decls: 14, vars: 3, consts: [["slot", "start"], ["slot", "end"], [3, "click"], ["name", "add-circle-outline"], [1, "ion-padding"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [4, "ngFor", "ngForOf"], ["name", "create-outline"], ["color", "danger", 3, "click", 4, "ngIf"], ["color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function UserListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-menu-button");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5, "Admin Users");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "ion-buttons", 1)(7, "ion-button", 2);
      \u0275\u0275listener("click", function UserListComponent_Template_ion_button_click_7_listener() {
        return ctx.navigateToNewUser();
      });
      \u0275\u0275element(8, "ion-icon", 3);
      \u0275\u0275text(9, " New User ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "ion-content", 4);
      \u0275\u0275template(11, UserListComponent_div_11_Template, 4, 0, "div", 5)(12, UserListComponent_ion_list_12_Template, 2, 1, "ion-list", 6)(13, UserListComponent_ion_card_13_Template, 4, 0, "ion-card", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.users.length === 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonSpinner, IonTitle, IonToolbar], styles: ["\n\n/*# sourceMappingURL=user-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserListComponent, [{
    type: Component,
    args: [{ selector: "app-user-list", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: '<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot="start">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Admin Users</ion-title>\n    <ion-buttons slot="end">\n      <ion-button (click)="navigateToNewUser()">\n        <ion-icon name="add-circle-outline"></ion-icon>\n        New User\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="ion-padding">\n  <div *ngIf="isLoading" class="ion-padding ion-text-center">\n    <p>Loading users...</p>\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <ion-list *ngIf="!isLoading">\n    <ion-item *ngFor="let user of users">\n      <ion-label>\n        <h2>{{ user.full_name }}</h2>\n        <p>{{ user.email }} - {{ user.user_type }}</p>\n      </ion-label>\n      <ion-buttons slot="end">\n        <ion-button (click)="editUser(user.id)">\n          <ion-icon name="create-outline"></ion-icon>\n        </ion-button>\n        <ion-button color="danger" (click)="deleteUser(user.id)" *ngIf="isAdmin">\n          <ion-icon name="trash-outline"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-item>\n  </ion-list>\n\n  <ion-card *ngIf="users.length === 0">\n    <ion-card-content>\n      <p class="ion-text-center">No admin users found.</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n', styles: ["/* src/app/admin/pages/user-list/user-list.css */\n/*# sourceMappingURL=user-list.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: "src/app/admin/pages/user-list/user-list.ts", lineNumber: 16 });
})();

// src/app/admin/components/user-form/user-form.ts
function UserFormComponent_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Full Name is required.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Full Name cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, UserFormComponent_div_10_span_1_Template, 2, 0, "span", 13)(2, UserFormComponent_div_10_span_2_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r0.userForm.get("full_name")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r0.userForm.get("full_name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function UserFormComponent_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, UserFormComponent_div_13_span_1_Template, 2, 0, "span", 13)(2, UserFormComponent_div_13_span_2_Template, 2, 0, "span", 13)(3, UserFormComponent_div_13_span_3_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r0.userForm.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r0.userForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["email"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r0.userForm.get("email")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function UserFormComponent_div_16_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password is required for new users.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_16_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password cannot exceed 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, UserFormComponent_div_16_span_1_Template, 2, 0, "span", 13)(2, UserFormComponent_div_16_span_2_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r0.userForm.get("password")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r0.userForm.get("password")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function UserFormComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " User Type is required. ");
    \u0275\u0275elementEnd();
  }
}
var UserFormComponent = class _UserFormComponent {
  userId = null;
  userForm;
  isEdit = false;
  adminUsersService = inject(AdminUsersService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastController = inject(ToastController);
  fb = inject(FormBuilder);
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id") ? Number(this.route.snapshot.paramMap.get("id")) : null;
    this.isEdit = !!this.userId;
    this.userForm = this.fb.group({
      full_name: ["", [Validators.required, Validators.maxLength(255)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ["", [this.isEdit ? Validators.nullValidator : Validators.required, Validators.maxLength(255)]],
      user_type: ["staff", Validators.required]
    });
    if (this.isEdit) {
      this.loadUser(this.userId);
    }
  }
  async loadUser(id) {
    try {
      const user = await this.adminUsersService.getUserById(id);
      if (user) {
        this.userForm.patchValue({
          full_name: user.full_name,
          email: user.email,
          // Do not pre-fill password for security reasons
          user_type: user.user_type
        });
        this.userForm.get("password")?.setValue("");
      } else {
        this.presentToast("User not found.", "danger");
        this.router.navigate(["/admin/users"]);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      this.presentToast("Error loading user details.", "danger");
    }
  }
  async saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.presentToast("Please fill all required fields correctly.", "danger");
      return;
    }
    try {
      const user = this.userForm.value;
      if (this.isEdit) {
        await this.adminUsersService.updateUser(this.userId, user);
        this.presentToast("User updated successfully!", "success");
      } else {
        await this.adminUsersService.createUser(user);
        this.presentToast("User created successfully!", "success");
      }
      this.router.navigate(["/admin/users"]);
    } catch (error) {
      console.error("Error saving user:", error);
      this.presentToast("Failed to save user.", "danger");
    }
  }
  async presentToast(message, color = "primary") {
    const toast = await this.toastController.create({
      message,
      duration: 2e3,
      color
    });
    toast.present();
  }
  static \u0275fac = function UserFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormComponent, selectors: [["app-user-form"]], decls: 26, vars: 7, consts: [["slot", "start"], ["defaultHref", "/admin/users"], [1, "ion-padding"], [3, "ngSubmit", "formGroup"], ["label", "Full Name", "type", "text", "formControlName", "full_name", "placeholder", "Enter full name"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], ["label", "Email", "type", "email", "formControlName", "email", "placeholder", "Enter email"], ["label", "Password", "type", "password", "formControlName", "password", "placeholder", "Enter password"], ["label", "User Type", "formControlName", "user_type", "placeholder", "Select User Type"], ["value", "admin"], ["value", "staff"], ["expand", "block", "type", "submit", 1, "ion-margin-top", 3, "disabled"], [1, "ion-padding-start", "ion-text-danger"], [4, "ngIf"]], template: function UserFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "form", 3);
      \u0275\u0275listener("ngSubmit", function UserFormComponent_Template_form_ngSubmit_7_listener() {
        return ctx.saveUser();
      });
      \u0275\u0275elementStart(8, "ion-item");
      \u0275\u0275element(9, "ion-input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, UserFormComponent_div_10_Template, 3, 2, "div", 5);
      \u0275\u0275elementStart(11, "ion-item");
      \u0275\u0275element(12, "ion-input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, UserFormComponent_div_13_Template, 4, 3, "div", 5);
      \u0275\u0275elementStart(14, "ion-item");
      \u0275\u0275element(15, "ion-input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, UserFormComponent_div_16_Template, 3, 2, "div", 5);
      \u0275\u0275elementStart(17, "ion-item")(18, "ion-select", 8)(19, "ion-select-option", 9);
      \u0275\u0275text(20, "Admin");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "ion-select-option", 10);
      \u0275\u0275text(22, "Staff");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(23, UserFormComponent_div_23_Template, 2, 0, "div", 5);
      \u0275\u0275elementStart(24, "ion-button", 11);
      \u0275\u0275text(25, "Save User");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Edit User" : "Create User");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.userForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.userForm.get("full_name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.userForm.get("full_name")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.userForm.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.userForm.get("email")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.userForm.get("password")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.userForm.get("password")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.userForm.get("user_type")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.userForm.get("user_type")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.userForm.invalid);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonSelect, IonSelectOption, IonTitle, IonToolbar, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n/*# sourceMappingURL=user-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserFormComponent, [{
    type: Component,
    args: [{ selector: "app-user-form", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/users"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ isEdit ? 'Edit User' : 'Create User' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form [formGroup]="userForm" (ngSubmit)="saveUser()">
    <ion-item>
      <ion-input label="Full Name" type="text" formControlName="full_name" placeholder="Enter full name"></ion-input>
    </ion-item>
    <div *ngIf="userForm.get('full_name')?.invalid && userForm.get('full_name')?.touched" class="ion-padding-start ion-text-danger">
      <span *ngIf="userForm.get('full_name')?.errors?.['required']">Full Name is required.</span>
      <span *ngIf="userForm.get('full_name')?.errors?.['maxlength']">Full Name cannot exceed 255 characters.</span>
    </div>

    <ion-item>
      <ion-input label="Email" type="email" formControlName="email" placeholder="Enter email"></ion-input>
    </ion-item>
    <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" class="ion-padding-start ion-text-danger">
      <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required.</span>
      <span *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email.</span>
      <span *ngIf="userForm.get('email')?.errors?.['maxlength']">Email cannot exceed 255 characters.</span>
    </div>

    <ion-item>
      <ion-input label="Password" type="password" formControlName="password" placeholder="Enter password"></ion-input>
    </ion-item>
    <div *ngIf="userForm.get('password')?.invalid && userForm.get('password')?.touched" class="ion-padding-start ion-text-danger">
      <span *ngIf="userForm.get('password')?.errors?.['required']">Password is required for new users.</span>
      <span *ngIf="userForm.get('password')?.errors?.['maxlength']">Password cannot exceed 255 characters.</span>
    </div>

    <ion-item>
      <ion-select label="User Type" formControlName="user_type" placeholder="Select User Type">
        <ion-select-option value="admin">Admin</ion-select-option>
        <ion-select-option value="staff">Staff</ion-select-option>
      </ion-select>
    </ion-item>
    <div *ngIf="userForm.get('user_type')?.invalid && userForm.get('user_type')?.touched" class="ion-padding-start ion-text-danger">
      User Type is required.
    </div>

    <ion-button expand="block" type="submit" class="ion-margin-top" [disabled]="userForm.invalid">Save User</ion-button>
  </form>
</ion-content>
`, styles: ["/* src/app/admin/components/user-form/user-form.css */\n/*# sourceMappingURL=user-form.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormComponent, { className: "UserFormComponent", filePath: "src/app/admin/components/user-form/user-form.ts", lineNumber: 15 });
})();

// src/app/admin/pages/announcement-list/announcement-list.component.ts
var _c06 = (a0) => ["/admin/announcements/edit", a0];
function AnnouncementListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading announcements...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function AnnouncementListComponent_ion_list_11_ion_item_16_ion_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 16);
    \u0275\u0275listener("click", function AnnouncementListComponent_ion_list_11_ion_item_16_ion_button_18_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const announcement_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteAnnouncement(announcement_r4.id));
    });
    \u0275\u0275element(1, "ion-icon", 17);
    \u0275\u0275elementEnd();
  }
}
function AnnouncementListComponent_ion_list_11_ion_item_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "slice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "ion-label")(6, "ion-toggle", 12);
    \u0275\u0275listener("ionChange", function AnnouncementListComponent_ion_list_11_ion_item_16_Template_ion_toggle_ionChange_6_listener() {
      const announcement_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleActive(announcement_r4));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "ion-label")(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-label")(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ion-buttons", 0)(16, "ion-button", 13);
    \u0275\u0275element(17, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AnnouncementListComponent_ion_list_11_ion_item_16_ion_button_18_Template, 2, 0, "ion-button", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const announcement_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(4, 8, announcement_r4.message, 0, 50), "", announcement_r4.message.length > 50 ? "..." : "");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", announcement_r4.is_active)("disabled", !ctx_r1.isAdminUser);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 12, announcement_r4.created_at, "short"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 15, announcement_r4.updated_at, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c06, announcement_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdminUser);
  }
}
function AnnouncementListComponent_ion_list_11_ion_item_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 18);
    \u0275\u0275text(2, "No announcements found.");
    \u0275\u0275elementEnd()();
  }
}
function AnnouncementListComponent_ion_list_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-item-divider")(2, "ion-label", 8);
    \u0275\u0275listener("click", function AnnouncementListComponent_ion_list_11_Template_ion_label_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("message"));
    });
    \u0275\u0275text(3, "Message ");
    \u0275\u0275element(4, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-label", 8);
    \u0275\u0275listener("click", function AnnouncementListComponent_ion_list_11_Template_ion_label_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("is_active"));
    });
    \u0275\u0275text(6, "Active ");
    \u0275\u0275element(7, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-label", 8);
    \u0275\u0275listener("click", function AnnouncementListComponent_ion_list_11_Template_ion_label_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("created_at"));
    });
    \u0275\u0275text(9, "Created At ");
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-label", 8);
    \u0275\u0275listener("click", function AnnouncementListComponent_ion_list_11_Template_ion_label_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sort("updated_at"));
    });
    \u0275\u0275text(12, "Updated At ");
    \u0275\u0275element(13, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-label", 10);
    \u0275\u0275text(15, "Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, AnnouncementListComponent_ion_list_11_ion_item_16_Template, 19, 20, "ion-item", 11)(17, AnnouncementListComponent_ion_list_11_ion_item_17_Template, 3, 0, "ion-item", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.filteredAnnouncements);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filteredAnnouncements || ctx_r1.filteredAnnouncements.length === 0);
  }
}
var AnnouncementListComponent = class _AnnouncementListComponent {
  announcementService = inject(AnnouncementService);
  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  allAnnouncements = [];
  filteredAnnouncements = [];
  searchTerm = "";
  isLoading = false;
  isAdminUser = false;
  // To control delete permissions
  sortDirection = {};
  ngOnInit() {
    this.loadAnnouncements();
    this.isAdminUser = this.authService.getUserType() === "admin";
  }
  ionViewWillEnter() {
    this.loadAnnouncements();
  }
  async loadAnnouncements() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allAnnouncements = await this.announcementService.getAnnouncements();
      this.filterAnnouncements();
    } catch (error) {
      console.error("Error loading announcements:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  filterAnnouncements() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAnnouncements = this.allAnnouncements.filter((announcement) => (announcement.message?.toLowerCase() ?? "").includes(term));
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredAnnouncements.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (typeof valA === "boolean" && typeof valB === "boolean") {
        if (valA === valB)
          return 0;
        return direction === "asc" ? valA ? -1 : 1 : valA ? 1 : -1;
      }
      if (field === "created_at" || field === "updated_at") {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        if (dateA === dateB)
          return 0;
        return direction === "asc" ? dateA < dateB ? -1 : 1 : dateA < dateB ? 1 : -1;
      }
      if (String(valA) < String(valB))
        return direction === "asc" ? -1 : 1;
      if (String(valA) > String(valB))
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteAnnouncement(id) {
    if (confirm("Are you sure you want to delete this announcement?")) {
      try {
        await this.announcementService.deleteAnnouncement(id);
        this.loadAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
        alert("Failed to delete announcement.");
      }
    }
  }
  async toggleActive(announcement) {
    const originalStatus = announcement.is_active;
    announcement.is_active = !originalStatus;
    try {
      await this.announcementService.updateAnnouncement(announcement);
    } catch (error) {
      console.error("Error toggling announcement status:", error);
      announcement.is_active = originalStatus;
      alert("Failed to toggle announcement status.");
    }
  }
  static \u0275fac = function AnnouncementListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnnouncementListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementListComponent, selectors: [["app-announcement-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/announcements/new"], ["name", "add-outline"], ["placeholder", "Search announcements...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], [3, "ionChange", "checked", "disabled"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function AnnouncementListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      \u0275\u0275text(3, "Announcements");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
      \u0275\u0275element(6, "ion-icon", 2);
      \u0275\u0275text(7, " New Announcement ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "ion-content")(9, "ion-searchbar", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AnnouncementListComponent_Template_ion_searchbar_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ionChange", function AnnouncementListComponent_Template_ion_searchbar_ionChange_9_listener() {
        return ctx.filterAnnouncements();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, AnnouncementListComponent_div_10_Template, 4, 0, "div", 4)(11, AnnouncementListComponent_ion_list_11_Template, 18, 2, "ion-list", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, RouterModule, RouterLink, IonicModule, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonSearchbar, IonSpinner, IonTitle, IonToggle, IonToolbar, BooleanValueAccessorDirective, TextValueAccessorDirective, RouterLinkDelegateDirective, SlicePipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementListComponent, [{
    type: Component,
    args: [{ selector: "app-announcement-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Announcements</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/admin/announcements/new">
        <ion-icon name="add-outline"></ion-icon>
        New Announcement
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterAnnouncements()" placeholder="Search announcements..."></ion-searchbar>

  <div *ngIf="isLoading" class="ion-padding ion-text-center">
    <p>Loading announcements...</p>
    <ion-spinner name="crescent"></ion-spinner>
  </div>

  <ion-list *ngIf="!isLoading">
    <ion-item-divider>
      <ion-label (click)="sort('message')">Message <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('is_active')">Active <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('created_at')">Created At <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label (click)="sort('updated_at')">Updated At <ion-icon name="swap-vertical-outline"></ion-icon></ion-label>
      <ion-label class="ion-text-right">Actions</ion-label>
    </ion-item-divider>

    <ion-item *ngFor="let announcement of filteredAnnouncements">
      <ion-label>
        <h2>{{ announcement.message | slice:0:50 }}{{ announcement.message.length > 50 ? '...' : '' }}</h2>
      </ion-label>
      <ion-label>
        <ion-toggle [checked]="announcement.is_active" (ionChange)="toggleActive(announcement)" [disabled]="!isAdminUser"></ion-toggle>
      </ion-label>
      <ion-label>
        <p>{{ announcement.created_at | date:'short' }}</p>
      </ion-label>
      <ion-label>
        <p>{{ announcement.updated_at | date:'short' }}</p>
      </ion-label>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/admin/announcements/edit', announcement.id]" fill="clear">
          <ion-icon name="create-outline"></ion-icon>
        </ion-button>
        <ion-button (click)="deleteAnnouncement(announcement.id)" fill="clear" color="danger" *ngIf="isAdminUser">
          <ion-icon name="trash-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>

    <ion-item *ngIf="!filteredAnnouncements || filteredAnnouncements.length === 0">
      <ion-label class="ion-text-center">No announcements found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementListComponent, { className: "AnnouncementListComponent", filePath: "src/app/admin/pages/announcement-list/announcement-list.component.ts", lineNumber: 17 });
})();

// src/app/admin/pages/announcement-form/announcement-form.component.ts
function AnnouncementFormComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " Message is required. ");
    \u0275\u0275elementEnd();
  }
}
function AnnouncementFormComponent_ion_spinner_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 13);
  }
}
function AnnouncementFormComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.isEditMode ? "Update Announcement" : "Create Announcement");
  }
}
var AnnouncementFormComponent = class _AnnouncementFormComponent {
  fb = inject(FormBuilder);
  announcementService = inject(AnnouncementService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  announcementForm;
  isEditMode = false;
  announcementId = null;
  isLoading = false;
  ngOnInit() {
    this.announcementForm = this.fb.group({
      message: ["", Validators.required],
      is_active: [true]
      // Default to active
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.announcementId = +id;
        this.isEditMode = true;
        this.loadAnnouncement(this.announcementId);
      }
    });
  }
  async loadAnnouncement(id) {
    this.isLoading = true;
    try {
      const announcement = await this.announcementService.getAnnouncementById(id);
      if (announcement) {
        this.announcementForm.patchValue({
          message: announcement.message,
          is_active: announcement.is_active
        });
      } else {
        console.error("Announcement not found");
        this.router.navigate(["/admin/announcements"]);
      }
    } catch (error) {
      console.error("Error loading announcement:", error);
      alert("Failed to load announcement.");
      this.router.navigate(["/admin/announcements"]);
    } finally {
      this.isLoading = false;
    }
  }
  async saveAnnouncement() {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    try {
      const formValue = this.announcementForm.value;
      const announcementData = {
        message: formValue.message,
        is_active: formValue.is_active
      };
      if (this.isEditMode && this.announcementId !== null) {
        const fullAnnouncement = __spreadProps(__spreadValues({}, announcementData), {
          id: this.announcementId,
          created_at: "",
          // These will be ignored by mapAnnouncementToParams for update
          updated_at: ""
          // These will be ignored by mapAnnouncementToParams for update
        });
        await this.announcementService.updateAnnouncement(fullAnnouncement);
        alert("Announcement updated successfully!");
      } else {
        await this.announcementService.createAnnouncement(announcementData);
        alert("Announcement created successfully!");
      }
      this.router.navigate(["/admin/announcements"]);
    } catch (error) {
      console.error("Error saving announcement:", error);
      alert("Failed to save announcement.");
    } finally {
      this.isLoading = false;
    }
  }
  cancel() {
    this.router.navigate(["/admin/announcements"]);
  }
  static \u0275fac = function AnnouncementFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnnouncementFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementFormComponent, selectors: [["app-announcement-form"]], decls: 19, vars: 6, consts: [["slot", "start"], ["defaultHref", "/admin/announcements"], [1, "ion-padding"], [3, "ngSubmit", "formGroup"], ["label", "Message", "labelPlacement", "stacked", "formControlName", "message", "rows", "5", "placeholder", "Enter announcement message"], ["class", "ion-padding-start ion-text-danger", 4, "ngIf"], [1, "ion-margin-top"], ["formControlName", "is_active", "justify", "space-between"], ["expand", "block", "type", "submit", 1, "ion-margin-top", 3, "disabled"], ["name", "crescent", 4, "ngIf"], [4, "ngIf"], ["expand", "block", "color", "medium", 1, "ion-margin-top", 3, "click"], [1, "ion-padding-start", "ion-text-danger"], ["name", "crescent"]], template: function AnnouncementFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "form", 3);
      \u0275\u0275listener("ngSubmit", function AnnouncementFormComponent_Template_form_ngSubmit_7_listener() {
        return ctx.saveAnnouncement();
      });
      \u0275\u0275elementStart(8, "ion-item");
      \u0275\u0275element(9, "ion-textarea", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, AnnouncementFormComponent_div_10_Template, 2, 0, "div", 5);
      \u0275\u0275elementStart(11, "ion-item", 6)(12, "ion-toggle", 7);
      \u0275\u0275text(13, "Active");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "ion-button", 8);
      \u0275\u0275template(15, AnnouncementFormComponent_ion_spinner_15_Template, 1, 0, "ion-spinner", 9)(16, AnnouncementFormComponent_span_16_Template, 2, 1, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "ion-button", 11);
      \u0275\u0275listener("click", function AnnouncementFormComponent_Template_ion_button_click_17_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(18, " Cancel ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Announcement" : "New Announcement");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.announcementForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.announcementForm.get("message")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.announcementForm.get("message")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.announcementForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, IonicModule, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonSpinner, IonTextarea, IonTitle, IonToggle, IonToolbar, BooleanValueAccessorDirective, TextValueAccessorDirective, IonBackButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementFormComponent, [{
    type: Component,
    args: [{ selector: "app-announcement-form", standalone: true, imports: [CommonModule, ReactiveFormsModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/announcements"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ isEditMode ? 'Edit Announcement' : 'New Announcement' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form [formGroup]="announcementForm" (ngSubmit)="saveAnnouncement()">
    <ion-item>
      <ion-textarea label="Message" labelPlacement="stacked" formControlName="message" rows="5" placeholder="Enter announcement message"></ion-textarea>
    </ion-item>
    <div *ngIf="announcementForm.get('message')?.invalid && announcementForm.get('message')?.touched" class="ion-padding-start ion-text-danger">
      Message is required.
    </div>

    <ion-item class="ion-margin-top">
      <ion-toggle formControlName="is_active" justify="space-between">Active</ion-toggle>
    </ion-item>

    <ion-button expand="block" type="submit" [disabled]="announcementForm.invalid || isLoading" class="ion-margin-top">
      <ion-spinner *ngIf="isLoading" name="crescent"></ion-spinner>
      <span *ngIf="!isLoading">{{ isEditMode ? 'Update Announcement' : 'Create Announcement' }}</span>
    </ion-button>

    <ion-button expand="block" color="medium" (click)="cancel()" class="ion-margin-top">
      Cancel
    </ion-button>
  </form>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementFormComponent, { className: "AnnouncementFormComponent", filePath: "src/app/admin/pages/announcement-form/announcement-form.component.ts", lineNumber: 16 });
})();

// src/app/admin/pages/manual-chat/manual-chat.ts
var _c07 = ["chatContainer"];
var _c12 = ["messageInput"];
function ManualChatComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275element(2, "div", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const message_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("justify-end", message_r2.role === "assistant")("justify-start", message_r2.role === "user");
    \u0275\u0275advance();
    \u0275\u0275classProp("admin-message-bubble", message_r2.role === "assistant")("applicant-message-bubble", message_r2.role === "user");
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.getDisplayContent(message_r2), \u0275\u0275sanitizeHtml);
  }
}
function ManualChatComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "span");
    \u0275\u0275text(3, "Loading chat history...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "ion-spinner", 17);
    \u0275\u0275elementEnd()();
  }
}
var ManualChatComponent = class _ManualChatComponent {
  chatContainer;
  messageInput;
  content;
  messages = [];
  newMessage = "";
  isLoading = false;
  applicantId = null;
  applicantName = "Applicant";
  refreshInterval;
  databaseService = inject(DatabaseService);
  route = inject(ActivatedRoute);
  applicantService = inject(ApplicantService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  MAX_TEXTAREA_HEIGHT = 150;
  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get("id");
      if (id) {
        this.applicantId = parseInt(id, 10);
        await this.loadApplicantDetails(this.applicantId);
        this.loadChatHistory(this.applicantId);
        this.refreshInterval = setInterval(() => {
          if (!this.isLoading) {
            this.loadChatHistory(this.applicantId);
          }
        }, 1e4);
      }
    });
  }
  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
  async loadApplicantDetails(applicantId) {
    try {
      const applicant = await this.applicantService.getApplicantById(applicantId);
      if (applicant) {
        this.applicantName = `${applicant.first_name} ${applicant.last_name}`;
      }
    } catch (error) {
      console.error("Error loading applicant details:", error);
      this.applicantName = "Unknown Applicant";
    }
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  loadChatHistory(applicantId) {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.databaseService.getChatHistory(applicantId).subscribe({
      next: (history) => {
        this.messages = history;
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (error) => {
        console.error("Failed to load chat history:", error);
        this.messages.push({ role: "system", content: "Error: Could not load chat history for this applicant." });
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  sendMessage() {
    if (this.newMessage.trim() === "" || this.applicantId === null) {
      return;
    }
    const adminMessage = { role: "assistant", content: this.newMessage.trim() + " [[ADMIN]]" };
    this.messages.push(adminMessage);
    this.isLoading = true;
    this.saveAdminMessageToDb(adminMessage, this.applicantId).subscribe({
      next: () => {
        console.log("Admin message saved and AI disabled for applicant:", this.applicantId);
        this.newMessage = "";
        this.isLoading = false;
        this.adjustTextareaHeight();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error saving admin message or disabling AI:", error);
        this.isLoading = false;
      }
    });
  }
  saveAdminMessageToDb(message, applicantId) {
    const adminAgencyId = 0;
    return this.databaseService.saveChatMessage(message, applicantId, adminAgencyId).pipe(concatMap(() => this.databaseService.disableAiForApplicant(applicantId, 10)));
  }
  getDisplayContent(message) {
    if (message.role === "assistant" && message.content.includes(" [[ADMIN]]")) {
      return message.content.replace(" [[ADMIN]]", "");
    }
    return message.content;
  }
  adjustTextareaHeight() {
    if (this.messageInput && this.messageInput.nativeElement) {
      const element = this.messageInput.nativeElement;
      element.style.height = "auto";
      element.style.height = Math.min(element.scrollHeight, this.MAX_TEXTAREA_HEIGHT) + "px";
      element.style.overflowY = element.scrollHeight > this.MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }
  }
  scrollToBottom() {
    try {
      this.content.scrollToBottom(300);
    } catch (err) {
    }
  }
  static \u0275fac = function ManualChatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ManualChatComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManualChatComponent, selectors: [["app-manual-chat"]], viewQuery: function ManualChatComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c07, 5);
      \u0275\u0275viewQuery(_c12, 5);
      \u0275\u0275viewQuery(IonContent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chatContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messageInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
    }
  }, decls: 17, vars: 6, consts: [["chatContainer", ""], ["messageInput", ""], ["slot", "start"], ["defaultHref", "/admin/applicants"], ["fullscreen", "", 1, "ion-padding", "custom-scrollbar"], ["class", "flex mb-4", 3, "justify-end", "justify-start", 4, "ngFor", "ngForOf"], ["class", "flex justify-center mb-4", 4, "ngIf"], [1, "glass-toolbar"], [1, "flex", "items-center", "p-2"], ["rows", "1", "placeholder", "Type your message...", "autoGrow", "true", 1, "flex-1", "resize-none", "outline-none", "placeholder-gray-400", "p-2", "rounded-lg", "custom-scrollbar", 3, "ngModelChange", "ionInput", "keydown.enter", "ngModel", "disabled"], [1, "ml-2", 3, "click", "disabled"], ["name", "send"], [1, "flex", "mb-4"], [1, "p-3", "rounded-lg", "max-w-[70%]"], [1, "chat-message-content", 3, "innerHTML"], [1, "flex", "justify-center", "mb-4"], [1, "p-3", "rounded-lg", "max-w-xl", "flex", "items-center", "space-x-2", "text-white"], ["name", "crescent"]], template: function ManualChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 2);
      \u0275\u0275element(3, "ion-back-button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 4, 0);
      \u0275\u0275template(8, ManualChatComponent_div_8_Template, 3, 9, "div", 5)(9, ManualChatComponent_div_9_Template, 5, 0, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "ion-footer")(11, "ion-toolbar", 7)(12, "div", 8)(13, "ion-textarea", 9, 1);
      \u0275\u0275twoWayListener("ngModelChange", function ManualChatComponent_Template_ion_textarea_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.newMessage, $event) || (ctx.newMessage = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ionInput", function ManualChatComponent_Template_ion_textarea_ionInput_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.adjustTextareaHeight());
      })("keydown.enter", function ManualChatComponent_Template_ion_textarea_keydown_enter_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        ctx.sendMessage();
        return \u0275\u0275resetView($event.preventDefault());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "ion-button", 10);
      \u0275\u0275listener("click", function ManualChatComponent_Template_ion_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sendMessage());
      });
      \u0275\u0275element(16, "ion-icon", 11);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Manual Chat with ", ctx.applicantName);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.messages);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMessage);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, IonicModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonSpinner, IonTextarea, IonTitle, IonToolbar, TextValueAccessorDirective, IonBackButton], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  font-family: "Inter", sans-serif;\n  color: var(--ion-text-color);\n}\nion-header[_ngcontent-%COMP%], \nion-footer[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n  --color: var(--ion-text-color);\n  --border-color: transparent;\n  --min-height: 56px;\n  padding: 0 10px;\n}\nion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow-y: auto;\n}\nion-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  margin-bottom: 10px;\n}\nion-content[_ngcontent-%COMP%]    > div.justify-end[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\nion-content[_ngcontent-%COMP%]    > div.justify-start[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\nion-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border-radius: 20px;\n  max-width: 80%;\n  word-wrap: break-word;\n  color: var(--ion-text-color);\n}\n.admin-message-bubble[_ngcontent-%COMP%] {\n  background: var(--ion-color-tertiary);\n  color: var(--ion-color-tertiary-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border-bottom-right-radius: 5px;\n  margin-right: 10px;\n}\n.applicant-message-bubble[_ngcontent-%COMP%] {\n  background: var(--ion-color-medium);\n  color: var(--ion-color-medium-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--ion-color-step-300);\n  border-bottom-left-radius: 5px;\n  margin-left: 10px;\n}\n.chat-message-content[_ngcontent-%COMP%] {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n.chat-message-content[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-break: break-all;\n  background-color: var(--ion-color-step-200);\n  padding: 8px;\n  border-radius: 5px;\n  color: var(--ion-text-color);\n}\n.chat-message-content[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.chat-message-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.chat-message-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid var(--ion-color-step-300);\n  color: var(--ion-text-color);\n}\n.chat-message-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\nion-textarea[_ngcontent-%COMP%] {\n  --padding-start: 10px;\n  --padding-end: 10px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --background: var(--ion-background-color);\n  border-radius: 20px;\n  color: var(--ion-text-color);\n  min-height: 40px;\n  max-height: 150px;\n  overflow-y: auto;\n  font-size: 1rem;\n  --placeholder-color: rgba(var(--ion-text-color-rgb), 0.5);\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\nion-textarea.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\nion-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --background-activated: var(--ion-color-primary-tint);\n  --border-radius: 20px;\n  height: 40px;\n  font-size: 1rem;\n  margin-left: 10px;\n  text-transform: none;\n  color: var(--ion-color-primary-contrast);\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\n/*# sourceMappingURL=manual-chat.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ManualChatComponent, [{
    type: Component,
    args: [{ selector: "app-manual-chat", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: `<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/admin/applicants"></ion-back-button>
    </ion-buttons>
    <ion-title>Manual Chat with {{ applicantName }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content #chatContainer class="ion-padding custom-scrollbar" fullscreen>
  <!-- Chat messages will be rendered here dynamically -->
            <div *ngFor="let message of messages" class="flex mb-4" [class.justify-end]="message.role === 'assistant'" [class.justify-start]="message.role === 'user'">
              <div class="p-3 rounded-lg max-w-[70%]"
                   [class.admin-message-bubble]="message.role === 'assistant'"
                   [class.applicant-message-bubble]="message.role === 'user'">
                <div class="chat-message-content" [innerHTML]="getDisplayContent(message)"></div>
              </div>
            </div>
  <!-- Loading indicator -->
  <div *ngIf="isLoading" class="flex justify-center mb-4">
    <div class="p-3 rounded-lg max-w-xl flex items-center space-x-2 text-white">
      <span>Loading chat history...</span>
      <ion-spinner name="crescent"></ion-spinner>
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
        <ion-icon name="send"></ion-icon>
      </ion-button>
    </div>
  </ion-toolbar>
</ion-footer>
`, styles: ['/* src/app/admin/pages/manual-chat/manual-chat.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  font-family: "Inter", sans-serif;\n  color: var(--ion-text-color);\n}\nion-header,\nion-footer {\n  box-shadow: none !important;\n}\nion-toolbar {\n  --background: var(--ion-background-color);\n  --color: var(--ion-text-color);\n  --border-color: transparent;\n  --min-height: 56px;\n  padding: 0 10px;\n}\nion-content {\n  --background: var(--ion-background-color);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow-y: auto;\n}\nion-content > div {\n  width: 100%;\n  display: flex;\n  margin-bottom: 10px;\n}\nion-content > div.justify-end {\n  justify-content: flex-end;\n}\nion-content > div.justify-start {\n  justify-content: flex-start;\n}\nion-content > div > div {\n  padding: 10px 15px;\n  border-radius: 20px;\n  max-width: 80%;\n  word-wrap: break-word;\n  color: var(--ion-text-color);\n}\n.admin-message-bubble {\n  background: var(--ion-color-tertiary);\n  color: var(--ion-color-tertiary-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border-bottom-right-radius: 5px;\n  margin-right: 10px;\n}\n.applicant-message-bubble {\n  background: var(--ion-color-medium);\n  color: var(--ion-color-medium-contrast);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--ion-color-step-300);\n  border-bottom-left-radius: 5px;\n  margin-left: 10px;\n}\n.chat-message-content {\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  max-width: 100%;\n}\n.chat-message-content pre {\n  white-space: pre-wrap;\n  word-break: break-all;\n  background-color: var(--ion-color-step-200);\n  padding: 8px;\n  border-radius: 5px;\n  color: var(--ion-text-color);\n}\n.chat-message-content table {\n  width: 100% !important;\n  table-layout: fixed;\n  display: block;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.chat-message-content th,\n.chat-message-content td {\n  max-width: none;\n  word-break: break-word;\n  padding: 8px;\n  border: 1px solid var(--ion-color-step-300);\n  color: var(--ion-text-color);\n}\n.chat-message-content img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\nion-textarea {\n  --padding-start: 10px;\n  --padding-end: 10px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --background: var(--ion-background-color);\n  border-radius: 20px;\n  color: var(--ion-text-color);\n  min-height: 40px;\n  max-height: 150px;\n  overflow-y: auto;\n  font-size: 1rem;\n  --placeholder-color: rgba(var(--ion-text-color-rgb), 0.5);\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar {\n  width: 8px;\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\nion-textarea.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\nion-button {\n  --background: var(--ion-color-primary);\n  --background-activated: var(--ion-color-primary-tint);\n  --border-radius: 20px;\n  height: 40px;\n  font-size: 1rem;\n  margin-left: 10px;\n  text-transform: none;\n  color: var(--ion-color-primary-contrast);\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 8px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: var(--ion-color-step-50);\n  border-radius: 10px;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: var(--ion-color-step-200);\n  border-radius: 10px;\n}\n/*# sourceMappingURL=manual-chat.css.map */\n'] }]
  }], null, { chatContainer: [{
    type: ViewChild,
    args: ["chatContainer"]
  }], messageInput: [{
    type: ViewChild,
    args: ["messageInput"]
  }], content: [{
    type: ViewChild,
    args: [IonContent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManualChatComponent, { className: "ManualChatComponent", filePath: "src/app/admin/pages/manual-chat/manual-chat.ts", lineNumber: 20 });
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

// src/app/admin/admin.module.ts
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
      { path: "fras/new", component: FraFormComponent },
      { path: "fras/edit/:id", component: FraFormComponent },
      { path: "referrals", component: ReferralListComponent },
      // New route
      { path: "referrals/new", component: ReferralFormComponent },
      // New route
      { path: "referrals/edit/:id", component: ReferralFormComponent },
      // New route
      { path: "users", component: UserListComponent },
      { path: "users/new", component: UserFormComponent },
      { path: "users/edit/:id", component: UserFormComponent },
      { path: "announcements", component: AnnouncementListComponent },
      // New route
      { path: "announcements/new", component: AnnouncementFormComponent },
      // New route
      { path: "announcements/edit/:id", component: AnnouncementFormComponent },
      // New route
      { path: "manual-chat/:id", component: ManualChatComponent },
      // New route for manual chat with applicant
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];
var AdminModule = class _AdminModule {
  static \u0275fac = function AdminModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
    AdminUsersService
  ], imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(ADMIN_ROUTES),
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ApplicantListComponent,
    ApplicantFormComponent,
    CaseListComponent,
    CaseFormComponent,
    FraListComponent,
    FraFormComponent,
    ReferralListComponent,
    // New component import
    ReferralFormComponent,
    // New component import
    SidebarComponent,
    UserListComponent,
    UserFormComponent,
    AnnouncementListComponent,
    // New component import
    AnnouncementFormComponent,
    // New component import
    ManualChatComponent
    // New component import
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(ADMIN_ROUTES),
        AdminLoginComponent,
        AdminLayoutComponent,
        AdminDashboardComponent,
        ApplicantListComponent,
        ApplicantFormComponent,
        CaseListComponent,
        CaseFormComponent,
        FraListComponent,
        FraFormComponent,
        ReferralListComponent,
        // New component import
        ReferralFormComponent,
        // New component import
        SidebarComponent,
        UserListComponent,
        UserFormComponent,
        AnnouncementListComponent,
        // New component import
        AnnouncementFormComponent,
        // New component import
        ManualChatComponent
        // New component import
      ],
      declarations: [],
      providers: [
        AdminUsersService
      ]
    }]
  }], null, null);
})();
export {
  ADMIN_ROUTES,
  AdminModule
};
//# sourceMappingURL=chunk-DPERTBLM.js.map
