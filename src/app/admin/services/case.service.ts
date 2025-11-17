import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_CASES,
  GET_CASE_BY_ID,
  CREATE_CASE,
  UPDATE_CASE,
  DELETE_CASE
} from '../../queries';
import { Case } from '../../schemas';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  private db = inject(DatabaseService);

  async getCases(): Promise<Case[]> {
    const response: any = await firstValueFrom(this.db.query(GET_CASES));
    if (response && response.data) {
      return response.data.map((item: any) => ({
        ...item,
        employee_name: `${item.last_name}, ${item.first_name}`
      })) as Case[];
    }
    return [];
  }

  async getCaseById(id: number): Promise<Case | null> {
    const res: any = await firstValueFrom(this.db.query(GET_CASE_BY_ID, [id]));
    if (res && res.data && res.data.length > 0) {
      const caseItem = res.data[0];
      return {
        ...caseItem,
        employee_name: `${caseItem.last_name}, ${caseItem.first_name}`
      } as Case;
    }
    return null;
  }

  async createCase(caseData: Omit<Case, 'id' | 'date_reported' | 'updated_date'>): Promise<any> {
    const params = this.mapCaseToParams(caseData);
    // CREATE_CASE query already sets date_reported and updated_date to NOW()
    return firstValueFrom(this.db.query(CREATE_CASE, params));
  }

  async updateCase(caseData: Case): Promise<any> {
    const params = this.mapCaseToParams(caseData);
    // UPDATE_CASE query already sets updated_date to NOW()
    return firstValueFrom(this.db.query(UPDATE_CASE, [...params, caseData.id]));
  }

  async deleteCase(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_CASE, [id]));
  }

  private mapCaseToParams(caseData: Partial<Case>): any[] {
    // The order of parameters must match the CREATE_CASE and UPDATE_CASE queries
    // CREATE_CASE: employee_id, category, report, report_status, agency_id
    // UPDATE_CASE: employee_id, category, report, report_status, agency_id, id
    return [
      caseData.employee_id || null,
      caseData.category || '',
      caseData.report || '',
      caseData.report_status || 'open', // Default to 'open' if not provided
      caseData.agency_id || null,
    ];
  }
}