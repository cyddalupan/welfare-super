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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private db = inject(DatabaseService);

  getEmployees(): Promise<Employee[]> {
    return this.db.executeQuery<Employee[]>(GET_EMPLOYEES);
  }

  getEmployeeById(id: number): Promise<Employee | null> {
    return this.db.executeQuery<Employee[]>(GET_EMPLOYEE_BY_ID, [id]).then(res => res?.[0] ?? null);
  }

  createEmployee(employee: Omit<Employee, 'id'>): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    return this.db.executeQuery(CREATE_EMPLOYEE, params);
  }

  updateEmployee(employee: Employee): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    return this.db.executeQuery(UPDATE_EMPLOYEE, [...params, employee.id]);
  }

  deleteEmployee(id: number): Promise<any> {
    return this.db.executeQuery(DELETE_EMPLOYEE, [id]);
  }

  private mapEmployeeToParams(employee: Omit<Employee, 'id'> | Employee): any[] {
    return [
      employee.first_name, employee.middle_name, employee.last_name, employee.passport_number,
      employee.date_of_birth, employee.address, employee.phone_number, employee.email,
      employee.is_support, employee.token, employee.user_id, employee.date_deployment,
      employee.fra_id, employee.main_status, employee.applicant_type,
      employee.created_date_of_report, employee.country, employee.facebook, employee.whatsapp,
      employee.consistency_percentage, employee.agency_id, employee.emergency_contact_name,
      employee.emergency_contact_phone
    ];
  }
}
