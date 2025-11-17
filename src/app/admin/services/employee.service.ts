import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../../queries';
import { Employee } from '../../schemas';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private db = inject(DatabaseService);

  async getEmployees(): Promise<Employee[]> {
    const response: any = await firstValueFrom(this.db.query(GET_EMPLOYEES));
    return (response && response.data) ? response.data as Employee[] : [];
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const res = await firstValueFrom(this.db.query(GET_EMPLOYEE_BY_ID, [id])) as Employee[];
    return res?.[0] ?? null;
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    return firstValueFrom(this.db.query(CREATE_EMPLOYEE, params));
  }

  async updateEmployee(employee: Employee): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    return firstValueFrom(this.db.query(UPDATE_EMPLOYEE, [...params, employee.id]));
  }

  async deleteEmployee(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_EMPLOYEE, [id]));
  }

  private mapEmployeeToParams(employee: Partial<Employee>): any[] {
    return [
      employee.first_name || null,
      employee.middle_name || null,
      employee.last_name || null,
      employee.passport_number || null,
      employee.date_of_birth || null,
      employee.address || null,
      employee.phone_number || null,
      employee.email || null,
      employee.is_support || false, // Assuming default should be false for a boolean
      employee.token || null,
      employee.user_id || null,
      employee.date_deployment || null,
      employee.fra_id || null,
      employee.main_status || null,
      employee.applicant_type || null,
      employee.created_date_of_report || null,
      employee.country || null,
      employee.facebook || null,
      employee.whatsapp || null,
      employee.consistency_percentage || null,
      employee.agency_id || null,
      employee.emergency_contact_name || null,
      employee.emergency_contact_phone || null
    ];
  }
}
