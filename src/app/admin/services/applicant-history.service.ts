import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { INSERT_APPLICANT_HISTORY } from '../../queries';
import { ApplicantHistory } from '../../schemas';

@Injectable({
  providedIn: 'root'
})
export class ApplicantHistoryService {
  private databaseService = inject(DatabaseService);

  constructor() { }

  async addHistoryEntry(history: Omit<ApplicantHistory, 'ids' | 'created_at'>): Promise<void> {
    console.log('ApplicantHistoryService: addHistoryEntry called with history:', history);
    const params = [
      history.applicant_id,
      history.remarks,
      history.attachment,
      history.status
    ];
    await this.databaseService.query(INSERT_APPLICANT_HISTORY, params);
    console.log('ApplicantHistoryService: History entry inserted into DB.');
  }
}
