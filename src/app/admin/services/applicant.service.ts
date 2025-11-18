import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_APPLICANTS,
  GET_APPLICANT_BY_ID,
  CREATE_APPLICANT,
  UPDATE_APPLICANT,
  DELETE_APPLICANT,
  GET_APPLICANT_STATUSES
} from '../../queries';
import { Applicant, ApplicantHistory } from '../../schemas';
import { firstValueFrom } from 'rxjs';
import { ApplicantHistoryService } from './applicant-history.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private db = inject(DatabaseService);
  private applicantHistoryService = inject(ApplicantHistoryService);

  async getApplicants(status?: string): Promise<Applicant[]> {
    let query = GET_APPLICANTS;
    const params: any[] = [];

    if (status) {
      query = 'SELECT id, first_name, last_name, passport_number, country, main_status FROM employee_employee WHERE main_status = ? ORDER BY last_name, first_name';
      params.push(status);
    }
    const response: any = await firstValueFrom(this.db.query(query, params));
    return (response && response.data) ? response.data as Applicant[] : [];
  }

  async getApplicantById(id: number): Promise<Applicant | null> {
    const res: any = await firstValueFrom(this.db.query(GET_APPLICANT_BY_ID, [id]));
    return (res && res.data && res.data.length > 0) ? res.data[0] as Applicant : null;
  }

  async getStatuses(): Promise<string[]> {
    const res: any = await firstValueFrom(this.db.query(GET_APPLICANT_STATUSES));
    if (res && res.data && Array.isArray(res.data)) {
      return res.data.map((item: any) => item.status_name);
    }
    return [];
  }

  async createApplicant(applicant: Omit<Applicant, 'id'>): Promise<any> {
    const params = this.mapApplicantToParams(applicant);
    const result = await firstValueFrom(this.db.query(CREATE_APPLICANT, params));
    if (result && result.insertId) {
        const newApplicantId = result.insertId;
        await this.applicantHistoryService.addHistoryEntry({
            applicant_id: newApplicantId,
            remarks: `Applicant created with status: ${applicant.main_status}`,
            attachment: '',
            status: applicant.main_status || 'Created'
        });
    }
    return result;
  }

  async updateApplicant(applicant: Applicant): Promise<any> {
    const oldApplicant = await this.getApplicantById(applicant.id);
    const params = this.mapApplicantToParams(applicant);
    const result = await firstValueFrom(this.db.query(UPDATE_APPLICANT, [...params, applicant.id]));

    if (applicant.id) {
      const oldStatus = oldApplicant ? oldApplicant.main_status || '' : '';
      const newStatus = applicant.main_status || '';

      if (oldApplicant && oldStatus !== newStatus) {
        await this.applicantHistoryService.addHistoryEntry({
          applicant_id: applicant.id,
          remarks: `Applicant status changed from '${oldApplicant.main_status}' to '${applicant.main_status}'`,
          attachment: '',
          status: applicant.main_status || 'Unknown'
        });
      } else {
        await this.applicantHistoryService.addHistoryEntry({
          applicant_id: applicant.id,
          remarks: 'Applicant updated.',
          attachment: '',
          status: 'Updated'
        });
      }
    }
    return result;
  }

  async deleteApplicant(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_APPLICANT, [id]));
  }

  private mapApplicantToParams(applicant: Partial<Applicant>): any[] {
    return [
      applicant.first_name || '',
      applicant.middle_name || '',
      applicant.last_name || '',
      applicant.passport_number || '',
      applicant.date_of_birth || null,
      applicant.address || '',
      applicant.phone_number || '',
      applicant.email || '',
      (applicant.is_support ? 1 : 0),
      applicant.token || '',
      applicant.user_id || null,
      applicant.date_deployment || null,
      applicant.fra_id || null,
      applicant.main_status || '',
      applicant.applicant_type || '',
      applicant.created_date_of_report || null,
      applicant.country || '',
      applicant.facebook || '',
      applicant.whatsapp || '',
      applicant.consistency_percentage || 0,
      applicant.agency_id || 1,
      applicant.emergency_contact_name || '',
      applicant.emergency_contact_phone || ''
    ];
  }
}
