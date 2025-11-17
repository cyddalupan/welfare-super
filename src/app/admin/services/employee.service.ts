import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../../queries';
import { Employee, ApplicantHistory } from '../../schemas';
import { firstValueFrom } from 'rxjs';
import { ApplicantHistoryService } from './applicant-history.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private db = inject(DatabaseService);
  private applicantHistoryService = inject(ApplicantHistoryService);

  async getEmployees(): Promise<Employee[]> {
    const response: any = await firstValueFrom(this.db.query(GET_EMPLOYEES));
    return (response && response.data) ? response.data as Employee[] : [];
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const res: any = await firstValueFrom(this.db.query(GET_EMPLOYEE_BY_ID, [id]));
    return (res && res.data && res.data.length > 0) ? res.data[0] as Employee : null;
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    const result = await firstValueFrom(this.db.query(CREATE_EMPLOYEE, params));
    if (result && result.insertId) {
        const newEmployeeId = result.insertId;
        await this.applicantHistoryService.addHistoryEntry({
            applicant_id: newEmployeeId,
            remarks: 'Applicant created.',
            attachment: '',
            status: 'Created'
        });
    }
    return result;
  }

  async updateEmployee(employee: Employee): Promise<any> {
    const params = this.mapEmployeeToParams(employee);
    const result = await firstValueFrom(this.db.query(UPDATE_EMPLOYEE, [...params, employee.id]));
    if (employee.id) {
        await this.applicantHistoryService.addHistoryEntry({
            applicant_id: employee.id,
            remarks: 'Applicant updated.',
            attachment: '',
            status: 'Updated'
        });
    }
    return result;
  }

  async deleteEmployee(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_EMPLOYEE, [id]));
  }

  private mapEmployeeToParams(employee: Partial<Employee>): any[] {
    return [
      employee.first_name || '',
      employee.middle_name || '',
      employee.last_name || '',
      employee.passport_number || '',
      employee.date_of_birth || null,
      employee.address || '',
      employee.phone_number || '',
      employee.email || '',
      (employee.is_support ? 1 : 0),
      employee.token || '',
      employee.user_id || null,
      employee.date_deployment || null,
      employee.fra_id || null,
      employee.main_status || '',
      employee.applicant_type || '',
      employee.created_date_of_report || null,
      employee.country || '',
      employee.facebook || '',
      employee.whatsapp || '',
      employee.consistency_percentage || 0,
      employee.agency_id || 1,
      employee.emergency_contact_name || '',
      employee.emergency_contact_phone || ''
    ];
  }
}
