import {
  ActivatedRoute,
  CREATE_EMPLOYEE,
  CommonModule,
  Component,
  DELETE_EMPLOYEE,
  DatabaseService,
  DefaultValueAccessor,
  FormsModule,
  GET_ADMIN_USER_BY_EMAIL,
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  Injectable,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  UPDATE_EMPLOYEE,
  __spreadProps,
  __spreadValues,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-LW45ETEE.js";

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
  async login() {
    this.errorMessage = "";
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(["/admin/dashboard"]);
      } else {
        this.errorMessage = "Invalid email or password.";
      }
    } catch (error) {
      this.errorMessage = "An unexpected error occurred. Please try again.";
      console.error("Login error:", error);
    }
  }
  static \u0275fac = function AdminLoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLoginComponent, selectors: [["app-admin-login"]], decls: 16, vars: 3, consts: [[1, "flex", "items-center", "justify-center", "h-screen", "w-screen"], [1, "w-full", "max-w-md", "bg-white/10", "backdrop-blur-lg", "rounded-xl", "shadow-lg", "p-8", "text-white", "border", "border-white/10", "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"], [1, "text-3xl", "font-bold", "text-center", "mb-8"], [3, "ngSubmit"], [1, "mb-4"], ["for", "email", 1, "block", "text-sm", "font-medium", "mb-2"], ["type", "email", "id", "email", "name", "email", "placeholder", "admin@example.com", "required", "", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "mb-6"], ["for", "password", 1, "block", "text-sm", "font-medium", "mb-2"], ["type", "password", "id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "w-full", "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], ["class", "mt-4 text-red-400 text-center bg-red-500/20 p-2 rounded-md", 4, "ngIf"], [1, "mt-4", "text-red-400", "text-center", "bg-red-500/20", "p-2", "rounded-md"]], template: function AdminLoginComponent_Template(rf, ctx) {
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
    args: [{ selector: "app-admin-login", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="flex items-center justify-center h-screen w-screen">\n  <div class="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">\n    <h2 class="text-3xl font-bold text-center mb-8">Admin Login</h2>\n    <form (ngSubmit)="login()">\n      <div class="mb-4">\n        <label for="email" class="block text-sm font-medium mb-2">Email</label>\n        <input type="email" id="email" name="email" [(ngModel)]="email"\n               class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"\n               placeholder="admin@example.com" required>\n      </div>\n      <div class="mb-6">\n        <label for="password" class="block text-sm font-medium mb-2">Password</label>\n        <input type="password" id="password" name="password" [(ngModel)]="password"\n               class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"\n               placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>\n      </div>\n      <button type="submit"\n              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">\n        Login\n      </button>\n      <div *ngIf="errorMessage" class="mt-4 text-red-400 text-center bg-red-500/20 p-2 rounded-md">\n        {{ errorMessage }}\n      </div>\n    </form>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLoginComponent, { className: "AdminLoginComponent", filePath: "src/app/admin/pages/admin-login/admin-login.ts", lineNumber: 14 });
})();

// src/app/admin/components/sidebar/sidebar.ts
var SidebarComponent = class _SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  logout() {
    this.authService.logout();
    this.router.navigate(["/admin/login"]);
  }
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 20, vars: 0, consts: [[1, "w-64", "bg-black/30", "backdrop-blur-xl", "p-6", "flex", "flex-col", "text-white"], [1, "text-2xl", "font-bold", "mb-10", "text-center"], [1, "mb-4"], ["routerLink", "/admin/dashboard", "routerLinkActive", "bg-white/20", 1, "flex", "items-center", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-6", "h-6", "mr-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"], ["routerLink", "/admin/employees", "routerLinkActive", "bg-white/20", 1, "flex", "items-center", "p-3", "rounded-lg", "hover:bg-white/10", "transition-colors", "duration-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197"], [1, "mt-auto"], [1, "w-full", "flex", "items-center", "justify-center", "p-3", "rounded-lg", "bg-red-600/80", "hover:bg-red-700/80", "transition-colors", "duration-200", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Admin Panel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "nav")(4, "ul")(5, "li", 2)(6, "a", 3);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 4);
      \u0275\u0275element(8, "path", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " Dashboard ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(10, "li", 2)(11, "a", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(12, "svg", 4);
      \u0275\u0275element(13, "path", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Employees ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "div", 8)(16, "button", 9);
      \u0275\u0275listener("click", function SidebarComponent_Template_button_click_16_listener() {
        return ctx.logout();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(17, "svg", 4);
      \u0275\u0275element(18, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Logout ");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterModule, RouterLink, RouterLinkActive], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [RouterModule], template: '<div class="w-64 bg-black/30 backdrop-blur-xl p-6 flex flex-col text-white">\n  <h1 class="text-2xl font-bold mb-10 text-center">Admin Panel</h1>\n  <nav>\n    <ul>\n      <li class="mb-4">\n        <a routerLink="/admin/dashboard" routerLinkActive="bg-white/20"\n           class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">\n          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>\n          Dashboard\n        </a>\n      </li>\n      <li class="mb-4">\n        <a routerLink="/admin/employees" routerLinkActive="bg-white/20"\n           class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">\n          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197"></path></svg>\n          Employees\n        </a>\n      </li>\n    </ul>\n  </nav>\n  <div class="mt-auto">\n    <button (click)="logout()"\n            class="w-full flex items-center justify-center p-3 rounded-lg bg-red-600/80 hover:bg-red-700/80 transition-colors duration-200">\n      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>\n      Logout\n    </button>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/admin/components/sidebar/sidebar.ts", lineNumber: 12 });
})();

// src/app/admin/layouts/admin-layout/admin-layout.ts
var AdminLayoutComponent = class _AdminLayoutComponent {
  static \u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], decls: 5, vars: 0, consts: [[1, "flex", "h-screen"], [1, "flex-1", "p-8", "overflow-y-auto"], [1, "w-full", "h-full", "bg-white/10", "backdrop-blur-lg", "rounded-xl", "shadow-lg", "p-8", "text-white"]], template: function AdminLayoutComponent_Template(rf, ctx) {
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
    args: [{ selector: "app-admin-layout", standalone: true, imports: [RouterModule, SidebarComponent], template: '<div class="flex h-screen">\n  <app-sidebar></app-sidebar>\n  <main class="flex-1 p-8 overflow-y-auto">\n    <div class="w-full h-full bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white">\n      <router-outlet></router-outlet>\n    </div>\n  </main>\n</div>\n' }]
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 7, vars: 0, consts: [[1, "w-full", "h-full", "bg-white/10", "backdrop-blur-lg", "rounded-xl", "shadow-lg", "p-8", "text-white", "border", "border-white/10", "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"], [1, "text-4xl", "font-bold", "mb-4"], [1, "text-lg"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Dashboard");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "p", 2);
      \u0275\u0275text(4, "Welcome to the Admin Panel.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p");
      \u0275\u0275text(6, "From here you can manage employees and other parts of the application.");
      \u0275\u0275domElementEnd()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [], template: '<div class="w-full h-full bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">\n  <h1 class="text-4xl font-bold mb-4">Dashboard</h1>\n  <p class="text-lg">Welcome to the Admin Panel.</p>\n  <p>From here you can manage employees and other parts of the application.</p>\n</div>\n' }]
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

// src/app/admin/services/employee.service.ts
var EmployeeService = class _EmployeeService {
  db = inject(DatabaseService);
  async getEmployees() {
    return await firstValueFrom(this.db.query(GET_EMPLOYEES));
  }
  async getEmployeeById(id) {
    const res = await firstValueFrom(this.db.query(GET_EMPLOYEE_BY_ID, [id]));
    return res?.[0] ?? null;
  }
  async createEmployee(employee) {
    const params = this.mapEmployeeToParams(employee);
    return firstValueFrom(this.db.query(CREATE_EMPLOYEE, params));
  }
  async updateEmployee(employee) {
    const params = this.mapEmployeeToParams(employee);
    return firstValueFrom(this.db.query(UPDATE_EMPLOYEE, [...params, employee.id]));
  }
  async deleteEmployee(id) {
    return firstValueFrom(this.db.query(DELETE_EMPLOYEE, [id]));
  }
  mapEmployeeToParams(employee) {
    return [
      employee.first_name,
      employee.middle_name,
      employee.last_name,
      employee.passport_number,
      employee.date_of_birth,
      employee.address,
      employee.phone_number,
      employee.email,
      employee.is_support,
      employee.token,
      employee.user_id,
      employee.date_deployment,
      employee.fra_id,
      employee.main_status,
      employee.applicant_type,
      employee.created_date_of_report,
      employee.country,
      employee.facebook,
      employee.whatsapp,
      employee.consistency_percentage,
      employee.agency_id,
      employee.emergency_contact_name,
      employee.emergency_contact_phone
    ];
  }
  static \u0275fac = function EmployeeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeeService, factory: _EmployeeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/admin/pages/employee-list/employee-list.ts
var _c0 = (a0, a1, a2) => ({ "bg-green-600": a0, "bg-yellow-600": a1, "bg-red-600": a2 });
var _c1 = (a0) => ["/admin/employees/edit", a0];
function EmployeeListComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 13)(1, "td", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 14)(8, "span", 15);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 16)(11, "a", 17);
    \u0275\u0275text(12, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 18);
    \u0275\u0275listener("click", function EmployeeListComponent_tr_23_Template_button_click_13_listener() {
      const emp_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteEmployee(emp_r2.id));
    });
    \u0275\u0275text(14, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const emp_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", emp_r2.last_name, ", ", emp_r2.first_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r2.passport_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r2.country);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(7, _c0, emp_r2.main_status === "active", emp_r2.main_status === "with_complain", emp_r2.main_status === "inactive"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", emp_r2.main_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c1, emp_r2.id));
  }
}
function EmployeeListComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, "No employees found.");
    \u0275\u0275elementEnd()();
  }
}
var EmployeeListComponent = class _EmployeeListComponent {
  employeeService = inject(EmployeeService);
  allEmployees = [];
  filteredEmployees = [];
  searchTerm = "";
  sortDirection = {};
  ngOnInit() {
    this.loadEmployees();
  }
  async loadEmployees() {
    try {
      this.allEmployees = await this.employeeService.getEmployees();
      this.filteredEmployees = [...this.allEmployees];
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }
  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.allEmployees.filter((emp) => (emp.first_name?.toLowerCase() ?? "").includes(term) || (emp.last_name?.toLowerCase() ?? "").includes(term) || (emp.passport_number?.toLowerCase() ?? "").includes(term) || (emp.country?.toLowerCase() ?? "").includes(term));
  }
  sort(field) {
    const direction = this.sortDirection[field] === "asc" ? "desc" : "asc";
    this.sortDirection = { [field]: direction };
    this.filteredEmployees.sort((a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB)
        return direction === "asc" ? -1 : 1;
      if (valA > valB)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  async deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        await this.employeeService.deleteEmployee(id);
        this.loadEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  }
  static \u0275fac = function EmployeeListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeListComponent, selectors: [["app-employee-list"]], decls: 25, vars: 3, consts: [[1, "w-full", "h-full", "bg-white/10", "backdrop-blur-lg", "rounded-xl", "shadow-lg", "p-8", "text-white", "border", "border-white/10", "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-3xl", "font-bold"], ["routerLink", "/admin/employees/new", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded-md", "transition", "duration-300"], [1, "mb-4"], ["type", "text", "placeholder", "Search employees...", 1, "w-full", "px-4", "py-2", "bg-white/20", "rounded-md", "border", "border-transparent", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-gray-800", 3, "ngModelChange", "input", "ngModel"], [1, "overflow-x-auto", "bg-black/30", "backdrop-blur-xl", "rounded-lg", "shadow-lg"], [1, "min-w-full"], [1, "border-b", "border-white/20"], [1, "px-6", "py-3", "text-left", "text-sm", "font-medium", "uppercase", "tracking-wider", "cursor-pointer", 3, "click"], [1, "px-6", "py-3", "text-right", "text-sm", "font-medium", "uppercase", "tracking-wider"], ["class", "border-b border-white/10 hover:bg-white/5", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "border-b", "border-white/10", "hover:bg-white/5"], [1, "px-6", "py-4", "whitespace-nowrap"], [1, "px-2", "inline-flex", "text-xs", "leading-5", "font-semibold", "rounded-full", 3, "ngClass"], [1, "px-6", "py-4", "whitespace-nowrap", "text-right", "text-sm", "font-medium"], [1, "text-indigo-400", "hover:text-indigo-300", "mr-4", 3, "routerLink"], [1, "text-red-400", "hover:text-red-300", 3, "click"], ["colspan", "5", 1, "text-center", "py-8"]], template: function EmployeeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Employees");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3);
      \u0275\u0275text(5, " New Employee ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeListComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function EmployeeListComponent_Template_input_input_7_listener() {
        return ctx.filterEmployees();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6)(9, "table", 7)(10, "thead")(11, "tr", 8)(12, "th", 9);
      \u0275\u0275listener("click", function EmployeeListComponent_Template_th_click_12_listener() {
        return ctx.sort("last_name");
      });
      \u0275\u0275text(13, " Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "th", 9);
      \u0275\u0275listener("click", function EmployeeListComponent_Template_th_click_14_listener() {
        return ctx.sort("passport_number");
      });
      \u0275\u0275text(15, " Passport ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "th", 9);
      \u0275\u0275listener("click", function EmployeeListComponent_Template_th_click_16_listener() {
        return ctx.sort("country");
      });
      \u0275\u0275text(17, " Country ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "th", 9);
      \u0275\u0275listener("click", function EmployeeListComponent_Template_th_click_18_listener() {
        return ctx.sort("main_status");
      });
      \u0275\u0275text(19, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 10);
      \u0275\u0275text(21, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "tbody");
      \u0275\u0275template(23, EmployeeListComponent_tr_23_Template, 15, 13, "tr", 11)(24, EmployeeListComponent_tr_24_Template, 3, 0, "tr", 12);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(16);
      \u0275\u0275property("ngForOf", ctx.filteredEmployees);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.filteredEmployees || ctx.filteredEmployees.length === 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeListComponent, [{
    type: Component,
    args: [{ selector: "app-employee-list", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="w-full h-full bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Employees</h1>
    <a routerLink="/admin/employees/new"
       class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
      New Employee
    </a>
  </div>

  <div class="mb-4">
    <input type="text" placeholder="Search employees..." [(ngModel)]="searchTerm" (input)="filterEmployees()"
           class="w-full px-4 py-2 bg-white/20 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
  </div>

  <div class="overflow-x-auto bg-black/30 backdrop-blur-xl rounded-lg shadow-lg">
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
        <tr *ngFor="let emp of filteredEmployees" class="border-b border-white/10 hover:bg-white/5">
          <td class="px-6 py-4 whitespace-nowrap">{{ emp.last_name }}, {{ emp.first_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ emp.passport_number }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ emp.country }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  [ngClass]="{
                    'bg-green-600': emp.main_status === 'active',
                    'bg-yellow-600': emp.main_status === 'with_complain',
                    'bg-red-600': emp.main_status === 'inactive'
                  }">
              {{ emp.main_status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a [routerLink]="['/admin/employees/edit', emp.id]" class="text-indigo-400 hover:text-indigo-300 mr-4">Edit</a>
            <button (click)="deleteEmployee(emp.id)" class="text-red-400 hover:text-red-300">Delete</button>
          </td>
        </tr>
        <tr *ngIf="!filteredEmployees || filteredEmployees.length === 0">
          <td colspan="5" class="text-center py-8">No employees found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeListComponent, { className: "EmployeeListComponent", filePath: "src/app/admin/pages/employee-list/employee-list.ts", lineNumber: 15 });
})();

// src/app/admin/components/employee-form/employee-form.ts
var EmployeeFormComponent = class _EmployeeFormComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employee = {};
  isEditMode = false;
  employeeId = null;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployeeData(this.employeeId);
    }
  }
  async loadEmployeeData(id) {
    try {
      const data = await this.employeeService.getEmployeeById(id);
      if (data) {
        this.employee = data;
      } else {
        this.router.navigate(["/admin/employees"]);
      }
    } catch (error) {
      console.error("Error loading employee data:", error);
    }
  }
  async saveEmployee() {
    try {
      if (this.isEditMode && this.employeeId) {
        await this.employeeService.updateEmployee(__spreadProps(__spreadValues({}, this.employee), { id: this.employeeId }));
      } else {
        await this.employeeService.createEmployee(this.employee);
      }
      this.router.navigate(["/admin/employees"]);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  }
  static \u0275fac = function EmployeeFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeFormComponent, selectors: [["app-employee-form"]], decls: 88, vars: 16, consts: [["employeeForm", "ngForm"], [1, "w-full", "h-full", "bg-white/10", "backdrop-blur-lg", "rounded-xl", "shadow-lg", "p-8", "text-white", "border", "border-white/10", "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"], [1, "text-3xl", "font-bold", "mb-6"], [3, "ngSubmit"], [1, "bg-black/30", "backdrop-blur-xl", "rounded-lg", "shadow-lg", "p-6", "mb-6"], [1, "text-xl", "font-semibold", "mb-4", "border-b", "border-white/20", "pb-2"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "form-group"], ["for", "first_name"], ["type", "text", "id", "first_name", "name", "first_name", "required", "", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "middle_name"], ["type", "text", "id", "middle_name", "name", "middle_name", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "last_name"], ["type", "text", "id", "last_name", "name", "last_name", "required", "", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "passport_number"], ["type", "text", "id", "passport_number", "name", "passport_number", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "date_of_birth"], ["type", "date", "id", "date_of_birth", "name", "date_of_birth", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "country"], ["type", "text", "id", "country", "name", "country", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], ["for", "email"], ["type", "email", "id", "email", "name", "email", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "phone_number"], ["type", "text", "id", "phone_number", "name", "phone_number", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "whatsapp"], ["type", "text", "id", "whatsapp", "name", "whatsapp", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "facebook"], ["type", "url", "id", "facebook", "name", "facebook", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "form-group", "md:col-span-2"], ["for", "address"], ["id", "address", "name", "address", "rows", "3", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "main_status"], ["id", "main_status", "name", "main_status", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "applicant_type"], ["id", "applicant_type", "name", "applicant_type", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], ["for", "date_deployment"], ["type", "date", "id", "date_deployment", "name", "date_deployment", 1, "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "items-center", "mt-8"], ["routerLink", "/admin/employees", 1, "text-gray-300", "hover:text-white", "mr-6"], ["type", "submit", 1, "bg-blue-600", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-6", "rounded-md", "transition", "duration-300", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"]], template: function EmployeeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "h1", 2);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 3, 0);
      \u0275\u0275listener("ngSubmit", function EmployeeFormComponent_Template_form_ngSubmit_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.saveEmployee());
      });
      \u0275\u0275elementStart(5, "div", 4)(6, "h2", 5);
      \u0275\u0275text(7, "Personal Information");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "label", 8);
      \u0275\u0275text(11, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.first_name, $event) || (ctx.employee.first_name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 7)(14, "label", 10);
      \u0275\u0275text(15, "Middle Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.middle_name, $event) || (ctx.employee.middle_name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 7)(18, "label", 12);
      \u0275\u0275text(19, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.last_name, $event) || (ctx.employee.last_name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 7)(22, "label", 14);
      \u0275\u0275text(23, "Passport Number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.passport_number, $event) || (ctx.employee.passport_number = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 7)(26, "label", 16);
      \u0275\u0275text(27, "Date of Birth");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.date_of_birth, $event) || (ctx.employee.date_of_birth = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 7)(30, "label", 18);
      \u0275\u0275text(31, "Country");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "input", 19);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.country, $event) || (ctx.employee.country = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(33, "div", 4)(34, "h2", 5);
      \u0275\u0275text(35, "Contact Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 20)(37, "div", 7)(38, "label", 21);
      \u0275\u0275text(39, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.email, $event) || (ctx.employee.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 7)(42, "label", 23);
      \u0275\u0275text(43, "Phone Number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "input", 24);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_44_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.phone_number, $event) || (ctx.employee.phone_number = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 7)(46, "label", 25);
      \u0275\u0275text(47, "WhatsApp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.whatsapp, $event) || (ctx.employee.whatsapp = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 7)(50, "label", 27);
      \u0275\u0275text(51, "Facebook URL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "input", 28);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_52_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.facebook, $event) || (ctx.employee.facebook = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 29)(54, "label", 30);
      \u0275\u0275text(55, "Address");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "textarea", 31);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_textarea_ngModelChange_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.address, $event) || (ctx.employee.address = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(57, "div", 4)(58, "h2", 5);
      \u0275\u0275text(59, "Employment Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 6)(61, "div", 7)(62, "label", 32);
      \u0275\u0275text(63, "Main Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "select", 33);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_select_ngModelChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.main_status, $event) || (ctx.employee.main_status = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(65, "option");
      \u0275\u0275text(66, "active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "option");
      \u0275\u0275text(68, "with_complain");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "option");
      \u0275\u0275text(70, "inactive");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(71, "div", 7)(72, "label", 34);
      \u0275\u0275text(73, "Applicant Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "select", 35);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_select_ngModelChange_74_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.applicant_type, $event) || (ctx.employee.applicant_type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(75, "option");
      \u0275\u0275text(76, "household");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "option");
      \u0275\u0275text(78, "skilled");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(79, "div", 7)(80, "label", 36);
      \u0275\u0275text(81, "Deployment Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeFormComponent_Template_input_ngModelChange_82_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.employee.date_deployment, $event) || (ctx.employee.date_deployment = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(83, "div", 38)(84, "a", 39);
      \u0275\u0275text(85, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "button", 40);
      \u0275\u0275text(87, " Save ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      const employeeForm_r2 = \u0275\u0275reference(4);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.isEditMode ? "Edit" : "Create", " Employee");
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.first_name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.middle_name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.last_name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.passport_number);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.date_of_birth);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.country);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.phone_number);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.whatsapp);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.facebook);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.address);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.main_status);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.applicant_type);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.employee.date_deployment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !employeeForm_r2.form.valid);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeFormComponent, [{
    type: Component,
    args: [{ selector: "app-employee-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="w-full h-full bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
  <h1 class="text-3xl font-bold mb-6">{{ isEditMode ? 'Edit' : 'Create' }} Employee</h1>

  <form (ngSubmit)="saveEmployee()" #employeeForm="ngForm">
    <!-- Personal Information -->
    <div class="bg-black/30 backdrop-blur-xl rounded-lg shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Personal Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input type="text" id="first_name" name="first_name" [(ngModel)]="employee.first_name" required class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="middle_name">Middle Name</label>
          <input type="text" id="middle_name" name="middle_name" [(ngModel)]="employee.middle_name" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input type="text" id="last_name" name="last_name" [(ngModel)]="employee.last_name" required class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="passport_number">Passport Number</label>
          <input type="text" id="passport_number" name="passport_number" [(ngModel)]="employee.passport_number" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="date_of_birth">Date of Birth</label>
          <input type="date" id="date_of_birth" name="date_of_birth" [(ngModel)]="employee.date_of_birth" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" id="country" name="country" [(ngModel)]="employee.country" class="text-gray-800">
        </div>
      </div>
    </div>

    <!-- Contact Details -->
    <div class="bg-black/30 backdrop-blur-xl rounded-lg shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Contact Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" [(ngModel)]="employee.email" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="phone_number">Phone Number</label>
          <input type="text" id="phone_number" name="phone_number" [(ngModel)]="employee.phone_number" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="whatsapp">WhatsApp</label>
          <input type="text" id="whatsapp" name="whatsapp" [(ngModel)]="employee.whatsapp" class="text-gray-800">
        </div>
        <div class="form-group">
          <label for="facebook">Facebook URL</label>
          <input type="url" id="facebook" name="facebook" [(ngModel)]="employee.facebook" class="text-gray-800">
        </div>
        <div class="form-group md:col-span-2">
          <label for="address">Address</label>
          <textarea id="address" name="address" [(ngModel)]="employee.address" rows="3" class="text-gray-800"></textarea>
        </div>
      </div>
    </div>

    <!-- Employment Details -->
    <div class="bg-black/30 backdrop-blur-xl rounded-lg shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Employment Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="form-group">
          <label for="main_status">Main Status</label>
          <select id="main_status" name="main_status" [(ngModel)]="employee.main_status" class="text-gray-800">
            <option>active</option>
            <option>with_complain</option>
            <option>inactive</option>
          </select>
        </div>
        <div class="form-group">
          <label for="applicant_type">Applicant Type</label>
          <select id="applicant_type" name="applicant_type" [(ngModel)]="employee.applicant_type" class="text-gray-800">
            <option>household</option>
            <option>skilled</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date_deployment">Deployment Date</label>
          <input type="date" id="date_deployment" name="date_deployment" [(ngModel)]="employee.date_deployment" class="text-gray-800">
        </div>
      </div>
    </div>

    <div class="flex justify-end items-center mt-8">
      <a routerLink="/admin/employees" class="text-gray-300 hover:text-white mr-6">Cancel</a>
      <button type="submit" [disabled]="!employeeForm.form.valid"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Save
      </button>
    </div>
  </form>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeFormComponent, { className: "EmployeeFormComponent", filePath: "src/app/admin/components/employee-form/employee-form.ts", lineNumber: 15 });
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
      { path: "employees", component: EmployeeListComponent },
      { path: "employees/new", component: EmployeeFormComponent },
      { path: "employees/edit/:id", component: EmployeeFormComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-NXLSR3ES.js.map
