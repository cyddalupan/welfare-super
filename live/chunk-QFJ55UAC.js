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
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterLinkDelegateDirective2 as RouterLinkDelegateDirective,
  RouterModule,
  SelectValueAccessorDirective,
  TextValueAccessorDirective,
  TitleCasePipe,
  UPDATE_APPLICANT,
  UPDATE_CASE,
  UPDATE_FRA,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
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
} from "./chunk-PPZUU5BC.js";
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
    \u0275\u0275elementStart(0, "ion-menu-toggle", 0)(1, "ion-item", 16);
    \u0275\u0275element(2, "ion-icon", 17);
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
    \u0275\u0275elementStart(0, "ion-list")(1, "ion-menu-toggle", 0)(2, "ion-item", 13);
    \u0275\u0275element(3, "ion-icon", 14);
    \u0275\u0275elementStart(4, "ion-label");
    \u0275\u0275text(5, "All Applicants");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(6, SidebarComponent_ion_list_14_ion_menu_toggle_6_Template, 6, 6, "ion-menu-toggle", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 30, vars: 2, consts: [["autoHide", "false"], ["routerLink", "/admin/dashboard", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "apps"], ["button", "", 3, "click"], ["slot", "start", "name", "people"], ["slot", "end", 3, "name"], [4, "ngIf"], ["routerLink", "/admin/cases", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "folder-open"], ["routerLink", "/admin/fras", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "business"], ["expand", "full", "color", "danger", 3, "click"], ["slot", "start", "name", "log-out"], ["routerLink", "/admin/applicants", "routerLinkActive", "selected", "routerDirection", "root", "detail", "false"], ["slot", "start", "name", "list"], ["autoHide", "false", 4, "ngFor", "ngForOf"], ["routerLinkActive", "selected", "routerDirection", "root", "detail", "false", 3, "routerLink"], ["slot", "start", "name", "person"]], template: function SidebarComponent_Template(rf, ctx) {
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
      \u0275\u0275elementStart(25, "ion-footer")(26, "ion-toolbar")(27, "ion-button", 11);
      \u0275\u0275listener("click", function SidebarComponent_Template_ion_button_click_27_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(28, "ion-icon", 12);
      \u0275\u0275text(29, " Logout ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275property("name", ctx.isApplicantMenuOpen ? "chevron-up-outline" : "chevron-down-outline");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isApplicantMenuOpen);
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
function ApplicantListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Loading applicants...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function ApplicantListComponent_ion_list_11_ion_item_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementStart(13, "ion-button", 15);
    \u0275\u0275listener("click", function ApplicantListComponent_ion_list_11_ion_item_16_Template_ion_button_click_13_listener() {
      const app_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteApplicant(app_r4.id));
    });
    \u0275\u0275element(14, "ion-icon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 17);
    \u0275\u0275element(16, "ion-icon", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const app_r4 = ctx.$implicit;
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
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c02, app_r4.id));
    \u0275\u0275advance(4);
    \u0275\u0275property("href", \u0275\u0275interpolate1("https://welfare.reviewcenterphil.com/api/history.php?app_id=", app_r4.id), \u0275\u0275sanitizeUrl);
  }
}
function ApplicantListComponent_ion_list_11_ion_item_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 19);
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
    \u0275\u0275template(16, ApplicantListComponent_ion_list_11_ion_item_16_Template, 17, 11, "ion-item", 11)(17, ApplicantListComponent_ion_list_11_ion_item_17_Template, 3, 0, "ion-item", 5);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantListComponent, selectors: [["app-employee-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/applicants/new"], ["name", "add-outline"], ["placeholder", "Search applicants...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["slot", "end", 3, "color"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["name", "document-text-outline"], [1, "ion-text-center"]], template: function ApplicantListComponent_Template(rf, ctx) {
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
        <ion-button (click)="deleteApplicant(app.id)" fill="clear" color="danger">
          <ion-icon name="trash-outline"></ion-icon>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicantListComponent, { className: "ApplicantListComponent", filePath: "src/app/admin/pages/applicant-list/applicant-list.ts", lineNumber: 16 });
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
    \u0275\u0275elementStart(0, "div", 8)(1, "p");
    \u0275\u0275text(2, "Loading applicant data...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-spinner", 9);
    \u0275\u0275elementEnd();
  }
}
function ApplicantFormComponent_form_13_ion_select_option_97_Template(rf, ctx) {
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
function ApplicantFormComponent_form_13_ion_select_option_108_Template(rf, ctx) {
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
function ApplicantFormComponent_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 10, 0);
    \u0275\u0275listener("ngSubmit", function ApplicantFormComponent_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveApplicant());
    });
    \u0275\u0275elementStart(2, "ion-card-title", 11);
    \u0275\u0275text(3, "Personal Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-list", 12)(5, "ion-item")(6, "ion-input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.first_name, $event) || (ctx_r1.applicant.first_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "ion-item")(8, "ion-input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.middle_name, $event) || (ctx_r1.applicant.middle_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "ion-item")(10, "ion-input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.last_name, $event) || (ctx_r1.applicant.last_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-item")(12, "ion-input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.passport_number, $event) || (ctx_r1.applicant.passport_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "ion-item")(14, "ion-input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.date_of_birth, $event) || (ctx_r1.applicant.date_of_birth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ion-item")(16, "ion-select", 18);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.country, $event) || (ctx_r1.applicant.country = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(17, "ion-select-option", 19);
    \u0275\u0275text(18, "Select Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "ion-select-option", 20);
    \u0275\u0275text(20, "United States");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ion-select-option", 21);
    \u0275\u0275text(22, "Canada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "ion-select-option", 22);
    \u0275\u0275text(24, "Mexico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "ion-select-option", 23);
    \u0275\u0275text(26, "Brazil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ion-select-option", 24);
    \u0275\u0275text(28, "United Kingdom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ion-select-option", 25);
    \u0275\u0275text(30, "France");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ion-select-option", 26);
    \u0275\u0275text(32, "Germany");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "ion-select-option", 27);
    \u0275\u0275text(34, "Italy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "ion-select-option", 28);
    \u0275\u0275text(36, "Spain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "ion-select-option", 29);
    \u0275\u0275text(38, "China");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "ion-select-option", 30);
    \u0275\u0275text(40, "India");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "ion-select-option", 31);
    \u0275\u0275text(42, "Japan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "ion-select-option", 32);
    \u0275\u0275text(44, "South Korea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "ion-select-option", 33);
    \u0275\u0275text(46, "Australia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "ion-select-option", 34);
    \u0275\u0275text(48, "New Zealand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "ion-select-option", 35);
    \u0275\u0275text(50, "Philippines");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "ion-select-option", 36);
    \u0275\u0275text(52, "Saudi Arabia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "ion-select-option", 37);
    \u0275\u0275text(54, "United Arab Emirates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "ion-select-option", 38);
    \u0275\u0275text(56, "Qatar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "ion-select-option", 39);
    \u0275\u0275text(58, "Kuwait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "ion-select-option", 40);
    \u0275\u0275text(60, "Bahrain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "ion-select-option", 41);
    \u0275\u0275text(62, "Oman");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "ion-select-option", 42);
    \u0275\u0275text(64, "Egypt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "ion-select-option", 43);
    \u0275\u0275text(66, "Jordan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "ion-select-option", 44);
    \u0275\u0275text(68, "Lebanon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "ion-select-option", 45);
    \u0275\u0275text(70, "Iraq");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "ion-select-option", 46);
    \u0275\u0275text(72, "Iran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "ion-select-option", 47);
    \u0275\u0275text(74, "Turkey");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "ion-select-option", 48);
    \u0275\u0275text(76, "Israel");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(77, "ion-card-title", 49);
    \u0275\u0275text(78, "Contact Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "ion-list", 12)(80, "ion-item")(81, "ion-input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.email, $event) || (ctx_r1.applicant.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "ion-item")(83, "ion-input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_83_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.phone_number, $event) || (ctx_r1.applicant.phone_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "ion-item")(85, "ion-input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_85_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.whatsapp, $event) || (ctx_r1.applicant.whatsapp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "ion-item")(87, "ion-input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_87_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.facebook, $event) || (ctx_r1.applicant.facebook = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(88, "ion-item")(89, "ion-textarea", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_textarea_ngModelChange_89_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.address, $event) || (ctx_r1.applicant.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(90, "ion-card-title", 49);
    \u0275\u0275text(91, "Employment Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "ion-list", 12)(93, "ion-item")(94, "ion-select", 55);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_select_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.main_status, $event) || (ctx_r1.applicant.main_status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(95, "ion-select-option", 19);
    \u0275\u0275text(96, "Select Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(97, ApplicantFormComponent_form_13_ion_select_option_97_Template, 2, 2, "ion-select-option", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "ion-item")(99, "ion-select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_select_ngModelChange_99_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.applicant_type, $event) || (ctx_r1.applicant.applicant_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(100, "ion-select-option", 58);
    \u0275\u0275text(101, "Household");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "ion-select-option", 59);
    \u0275\u0275text(103, "Skilled");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(104, "ion-item")(105, "ion-select", 60);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_select_ngModelChange_105_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.fra_id, $event) || (ctx_r1.applicant.fra_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(106, "ion-select-option", 61);
    \u0275\u0275text(107, "Select Agency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(108, ApplicantFormComponent_form_13_ion_select_option_108_Template, 2, 2, "ion-select-option", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "ion-item")(110, "ion-input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ApplicantFormComponent_form_13_Template_ion_input_ngModelChange_110_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.applicant.date_deployment, $event) || (ctx_r1.applicant.date_deployment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(111, "div", 63)(112, "ion-button", 64);
    \u0275\u0275text(113, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "ion-button", 65);
    \u0275\u0275text(115, "Save");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const applicantForm_r5 = \u0275\u0275reference(1);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.first_name);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.middle_name);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.last_name);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.passport_number);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.date_of_birth);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.country);
    \u0275\u0275advance(65);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.email);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.phone_number);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.whatsapp);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.facebook);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.address);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.main_status);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.statuses);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.applicant_type);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.applicant.fra_id);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.fras);
    \u0275\u0275advance(2);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicantFormComponent, selectors: [["app-applicant-form"]], decls: 14, vars: 3, consts: [["applicantForm", "ngForm"], ["slot", "start"], ["defaultHref", "/admin/applicants"], [1, "ion-padding"], [1, "ion-justify-content-center"], ["size-xl", "8", "size-lg", "10", "size-md", "12", "size-sm", "12", "size", "12"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit"], [1, "ion-padding-bottom"], ["lines", "full"], ["label", "First Name", "type", "text", "name", "first_name", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Middle Name", "type", "text", "name", "middle_name", 3, "ngModelChange", "ngModel"], ["label", "Last Name", "type", "text", "name", "last_name", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Passport Number", "type", "text", "name", "passport_number", 3, "ngModelChange", "ngModel"], ["label", "Date of Birth", "type", "date", "name", "date_of_birth", 3, "ngModelChange", "ngModel"], ["label", "Country", "name", "country", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "US"], ["value", "CA"], ["value", "MX"], ["value", "BR"], ["value", "GB"], ["value", "FR"], ["value", "DE"], ["value", "IT"], ["value", "ES"], ["value", "CN"], ["value", "IN"], ["value", "JP"], ["value", "KR"], ["value", "AU"], ["value", "NZ"], ["value", "PH"], ["value", "SA"], ["value", "AE"], ["value", "QA"], ["value", "KW"], ["value", "BH"], ["value", "OM"], ["value", "EG"], ["value", "JO"], ["value", "LB"], ["value", "IQ"], ["value", "IR"], ["value", "TR"], ["value", "IL"], [1, "ion-padding-top", "ion-padding-bottom"], ["label", "Email", "type", "email", "name", "email", 3, "ngModelChange", "ngModel"], ["label", "Phone Number", "type", "text", "name", "phone_number", 3, "ngModelChange", "ngModel"], ["label", "WhatsApp", "type", "text", "name", "whatsapp", 3, "ngModelChange", "ngModel"], ["label", "Facebook URL", "type", "url", "name", "facebook", 3, "ngModelChange", "ngModel"], ["label", "Address", "rows", "3", "name", "address", 3, "ngModelChange", "ngModel"], ["label", "Main Status", "name", "main_status", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Applicant Type", "name", "applicant_type", 3, "ngModelChange", "ngModel"], ["value", "household"], ["value", "skilled"], ["label", "Foreign Recruitment Agency", "name", "fra_id", 3, "ngModelChange", "ngModel"], [3, "value"], ["label", "Deployment Date", "type", "date", "name", "date_deployment", 3, "ngModelChange", "ngModel"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", "routerLink", "/admin/applicants"], ["type", "submit", 3, "disabled"]], template: function ApplicantFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-content")(1, "ion-header")(2, "ion-toolbar")(3, "ion-buttons", 1);
      \u0275\u0275element(4, "ion-back-button", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "ion-title");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "ion-grid", 3)(8, "ion-row", 4)(9, "ion-col", 5)(10, "ion-card")(11, "ion-card-content");
      \u0275\u0275template(12, ApplicantFormComponent_div_12_Template, 4, 0, "div", 6)(13, ApplicantFormComponent_form_13_Template, 116, 19, "form", 7);
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
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonRow, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton, RouterLinkDelegateDirective], styles: ["\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  color: #D1D5DB;\n}\n.form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  border-width: 0;\n  border-bottom-width: 2px;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  padding: 0.625rem;\n  color: white;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n.form-field[_ngcontent-%COMP%]::placeholder {\n  color: #9CA3AF;\n}\n.form-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  --tw-ring-shadow: 0 0 #0000;\n  border-color: #60A5FA;\n}\n.form-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background-color: #1F2937;\n  color: white;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n/*# sourceMappingURL=applicant-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicantFormComponent, [{
    type: Component,
    args: [{ selector: "app-applicant-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-content>
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

            <form *ngIf="!isLoading" (ngSubmit)="saveApplicant()" #applicantForm="ngForm">
              <!-- Personal Information -->
              <ion-card-title class="ion-padding-bottom">Personal Information</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-input label="First Name" type="text" [(ngModel)]="applicant.first_name" name="first_name" required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Middle Name" type="text" [(ngModel)]="applicant.middle_name" name="middle_name"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Last Name" type="text" [(ngModel)]="applicant.last_name" name="last_name" required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Passport Number" type="text" [(ngModel)]="applicant.passport_number" name="passport_number"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Date of Birth" type="date" [(ngModel)]="applicant.date_of_birth" name="date_of_birth"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-select label="Country" [(ngModel)]="applicant.country" name="country">
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
              </ion-list>

              <!-- Contact Details -->
              <ion-card-title class="ion-padding-top ion-padding-bottom">Contact Details</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-input label="Email" type="email" [(ngModel)]="applicant.email" name="email"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Phone Number" type="text" [(ngModel)]="applicant.phone_number" name="phone_number"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="WhatsApp" type="text" [(ngModel)]="applicant.whatsapp" name="whatsapp"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Facebook URL" type="url" [(ngModel)]="applicant.facebook" name="facebook"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-textarea label="Address" rows="3" [(ngModel)]="applicant.address" name="address"></ion-textarea>
                </ion-item>
              </ion-list>

              <!-- Employment Details -->
              <ion-card-title class="ion-padding-top ion-padding-bottom">Employment Details</ion-card-title>
              <ion-list lines="full">
                <ion-item>
                  <ion-select label="Main Status" [(ngModel)]="applicant.main_status" name="main_status">
                    <ion-select-option value="">Select Status</ion-select-option>
                    <ion-select-option *ngFor="let status of statuses" [value]="status">{{ status }}</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-select label="Applicant Type" [(ngModel)]="applicant.applicant_type" name="applicant_type">
                    <ion-select-option value="household">Household</ion-select-option>
                    <ion-select-option value="skilled">Skilled</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-select label="Foreign Recruitment Agency" [(ngModel)]="applicant.fra_id" name="fra_id">
                    <ion-select-option [value]="null">Select Agency</ion-select-option>
                    <ion-select-option *ngFor="let fra of fras" [value]="fra.id">{{ fra.name }}</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-input label="Deployment Date" type="date" [(ngModel)]="applicant.date_deployment" name="date_deployment"></ion-input>
                </ion-item>
              </ion-list>

              <div class="ion-padding-top ion-text-right">
                <ion-button fill="clear" routerLink="/admin/applicants">Cancel</ion-button>
                <ion-button type="submit" [disabled]="!applicantForm.form.valid">Save</ion-button>
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
function CaseListComponent_ion_list_11_ion_item_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementStart(14, "ion-button", 15);
    \u0275\u0275listener("click", function CaseListComponent_ion_list_11_ion_item_16_Template_ion_button_click_14_listener() {
      const caseItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCase(caseItem_r4.id));
    });
    \u0275\u0275element(15, "ion-icon", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const caseItem_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(caseItem_r4.employee_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(caseItem_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, caseItem_r4.date_reported, "shortDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("color", caseItem_r4.report_status === "open" ? "success" : "danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", caseItem_r4.report_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c03, caseItem_r4.id));
  }
}
function CaseListComponent_ion_list_11_ion_item_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 17);
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
    \u0275\u0275template(16, CaseListComponent_ion_list_11_ion_item_16_Template, 16, 11, "ion-item", 11)(17, CaseListComponent_ion_list_11_ion_item_17_Template, 3, 0, "ion-item", 5);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseListComponent, selectors: [["app-case-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/cases/new"], ["name", "add-outline"], ["placeholder", "Search cases...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["slot", "end", 3, "color"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function CaseListComponent_Template(rf, ctx) {
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
        <ion-button (click)="deleteCase(caseItem.id)" fill="clear" color="danger">
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaseListComponent, { className: "CaseListComponent", filePath: "src/app/admin/pages/case-list/case-list.ts", lineNumber: 16 });
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
    \u0275\u0275elementStart(0, "ion-select-option", 22);
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
function CaseFormComponent_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function CaseFormComponent_form_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCase());
    });
    \u0275\u0275elementStart(1, "ion-list", 8)(2, "ion-item")(3, "ion-select", 9);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_10_Template_ion_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.employee_id, $event) || (ctx_r1.caseItem.employee_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "ion-select-option", 10);
    \u0275\u0275text(5, "Select an Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CaseFormComponent_form_10_ion_select_option_6_Template, 2, 4, "ion-select-option", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "ion-item")(8, "ion-input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_10_Template_ion_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.category, $event) || (ctx_r1.caseItem.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "ion-item")(10, "ion-textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_10_Template_ion_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.report, $event) || (ctx_r1.caseItem.report = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-item")(12, "ion-select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_10_Template_ion_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.report_status, $event) || (ctx_r1.caseItem.report_status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "ion-select-option", 15);
    \u0275\u0275text(14, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-select-option", 16);
    \u0275\u0275text(16, "Closed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ion-select-option", 17);
    \u0275\u0275text(18, "Pending");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "ion-item")(20, "ion-input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function CaseFormComponent_form_10_Template_ion_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.caseItem.agency_id, $event) || (ctx_r1.caseItem.agency_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 19)(22, "ion-button", 20);
    \u0275\u0275listener("click", function CaseFormComponent_form_10_Template_ion_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/cases"]));
    });
    \u0275\u0275text(23, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ion-button", 21);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.employee_id);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.applicants);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.category);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.report);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.report_status);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.caseItem.agency_id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update Case" : "Create Case");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaseFormComponent, selectors: [["app-case-form"]], decls: 11, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/cases"], [1, "ion-padding"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit"], ["lines", "full"], ["label", "Employee", "name", "employee_id", "required", "", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Category", "type", "text", "name", "category", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Report", "rows", "5", "name", "report", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Status", "name", "report_status", "required", "", 3, "ngModelChange", "ngModel"], ["value", "open"], ["value", "closed"], ["value", "pending"], ["label", "Agency ID (Optional)", "type", "number", "name", "agency_id", 3, "ngModelChange", "ngModel"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", 3, "click"], ["type", "submit"], [3, "value"]], template: function CaseFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "ion-card")(8, "ion-card-content");
      \u0275\u0275template(9, CaseFormComponent_div_9_Template, 4, 0, "div", 3)(10, CaseFormComponent_form_10_Template, 26, 8, "form", 4);
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
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, IonBackButton], styles: ["\n\n/*# sourceMappingURL=case-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaseFormComponent, [{
    type: Component,
    args: [{ selector: "app-case-form", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: `<ion-header>
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

      <form *ngIf="!isLoading" (ngSubmit)="saveCase()">
        <ion-list lines="full">
          <ion-item>
            <ion-select label="Employee" [(ngModel)]="caseItem.employee_id" name="employee_id" required>
              <ion-select-option [value]="null" disabled>Select an Employee</ion-select-option>
              <ion-select-option *ngFor="let app of applicants" [value]="app.id">
                {{ app.last_name }}, {{ app.first_name }} ({{ app.passport_number }})
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-input label="Category" type="text" [(ngModel)]="caseItem.category" name="category" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-textarea label="Report" rows="5" [(ngModel)]="caseItem.report" name="report" required></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-select label="Status" [(ngModel)]="caseItem.report_status" name="report_status" required>
              <ion-select-option value="open">Open</ion-select-option>
              <ion-select-option value="closed">Closed</ion-select-option>
              <ion-select-option value="pending">Pending</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-input label="Agency ID (Optional)" type="number" [(ngModel)]="caseItem.agency_id" name="agency_id"></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding-top ion-text-right">
          <ion-button fill="clear" (click)="router.navigate(['/admin/cases'])">Cancel</ion-button>
          <ion-button type="submit">{{ isEditMode ? 'Update Case' : 'Create Case' }}</ion-button>
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
function FraListComponent_ion_list_11_ion_item_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementStart(11, "ion-button", 14);
    \u0275\u0275listener("click", function FraListComponent_ion_list_11_ion_item_13_Template_ion_button_click_11_listener() {
      const fra_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteFra(fra_r4.id));
    });
    \u0275\u0275element(12, "ion-icon", 15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fra_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(fra_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.contact);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fra_r4.country);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c04, fra_r4.id));
  }
}
function FraListComponent_ion_list_11_ion_item_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label", 16);
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
    \u0275\u0275template(13, FraListComponent_ion_list_11_ion_item_13_Template, 13, 6, "ion-item", 11)(14, FraListComponent_ion_list_11_ion_item_14_Template, 3, 0, "ion-item", 5);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraListComponent, selectors: [["app-fra-list"]], decls: 12, vars: 3, consts: [["slot", "end"], ["routerLink", "/admin/fras/new"], ["name", "add-outline"], ["placeholder", "Search FRAs...", 3, "ngModelChange", "ionChange", "ngModel"], ["class", "ion-padding ion-text-center", 4, "ngIf"], [4, "ngIf"], [1, "ion-padding", "ion-text-center"], ["name", "crescent"], [3, "click"], ["name", "swap-vertical-outline"], [1, "ion-text-right"], [4, "ngFor", "ngForOf"], ["fill", "clear", 3, "routerLink"], ["name", "create-outline"], ["fill", "clear", "color", "danger", 3, "click"], ["name", "trash-outline"], [1, "ion-text-center"]], template: function FraListComponent_Template(rf, ctx) {
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
        <ion-button (click)="deleteFra(fra.id)" fill="clear" color="danger">
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraListComponent, { className: "FraListComponent", filePath: "src/app/admin/pages/fra-list/fra-list.ts", lineNumber: 16 });
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
function FraFormComponent_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function FraFormComponent_form_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveFra());
    });
    \u0275\u0275elementStart(1, "ion-list", 8)(2, "ion-item")(3, "ion-input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_10_Template_ion_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.name, $event) || (ctx_r1.fra.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "ion-item")(5, "ion-input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_10_Template_ion_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.contact, $event) || (ctx_r1.fra.contact = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-item")(7, "ion-textarea", 11);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_10_Template_ion_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.address, $event) || (ctx_r1.fra.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "ion-item")(9, "ion-input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_10_Template_ion_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.country, $event) || (ctx_r1.fra.country = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "ion-item")(11, "ion-input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function FraFormComponent_form_10_Template_ion_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fra.agency_id, $event) || (ctx_r1.fra.agency_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "ion-button", 15);
    \u0275\u0275listener("click", function FraFormComponent_form_10_Template_ion_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/admin/fras"]));
    });
    \u0275\u0275text(14, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-button", 16);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.name);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.contact);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.address);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.country);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fra.agency_id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update FRA" : "Create FRA");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FraFormComponent, selectors: [["app-fra-form"]], decls: 11, vars: 3, consts: [["slot", "start"], ["defaultHref", "/admin/fras"], [1, "ion-padding"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [3, "ngSubmit", 4, "ngIf"], [1, "ion-text-center", "ion-padding"], ["name", "crescent"], [3, "ngSubmit"], ["lines", "full"], ["label", "Name", "type", "text", "name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Contact Person", "type", "text", "name", "contact", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Address", "rows", "3", "name", "address", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Country", "type", "text", "name", "country", "required", "", 3, "ngModelChange", "ngModel"], ["label", "Agency ID", "type", "number", "name", "agency_id", 3, "ngModelChange", "ngModel"], [1, "ion-padding-top", "ion-text-right"], ["fill", "clear", 3, "click"], ["type", "submit"]], template: function FraFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      \u0275\u0275element(3, "ion-back-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "ion-title");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "ion-content", 2)(7, "ion-card")(8, "ion-card-content");
      \u0275\u0275template(9, FraFormComponent_div_9_Template, 4, 0, "div", 3)(10, FraFormComponent_form_10_Template, 17, 6, "form", 4);
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
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, IonicModule, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonList, IonSpinner, IonTextarea, IonTitle, IonToolbar, NumericValueAccessorDirective, TextValueAccessorDirective, IonBackButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FraFormComponent, [{
    type: Component,
    args: [{ selector: "app-fra-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, IonicModule], template: `<ion-header>
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

      <form *ngIf="!isLoading" (ngSubmit)="saveFra()">
        <ion-list lines="full">
          <ion-item>
            <ion-input label="Name" type="text" [(ngModel)]="fra.name" name="name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input label="Contact Person" type="text" [(ngModel)]="fra.contact" name="contact" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-textarea label="Address" rows="3" [(ngModel)]="fra.address" name="address" required></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-input label="Country" type="text" [(ngModel)]="fra.country" name="country" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input label="Agency ID" type="number" [(ngModel)]="fra.agency_id" name="agency_id"></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding-top ion-text-right">
          <ion-button fill="clear" (click)="router.navigate(['/admin/fras'])">Cancel</ion-button>
          <ion-button type="submit">{{ isEditMode ? 'Update FRA' : 'Create FRA' }}</ion-button>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FraFormComponent, { className: "FraFormComponent", filePath: "src/app/admin/components/fra-form/fra-form.ts", lineNumber: 16 });
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
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];
var AdminModule = class _AdminModule {
  static \u0275fac = function AdminModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
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
    SidebarComponent
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
        SidebarComponent
      ],
      declarations: [],
      providers: [
        // Providers specific to the admin module, if any
      ]
    }]
  }], null, null);
})();
export {
  ADMIN_ROUTES,
  AdminModule
};
//# sourceMappingURL=chunk-QFJ55UAC.js.map
