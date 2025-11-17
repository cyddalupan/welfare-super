import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { INSERT_APPLICANT_HISTORY } from '../../queries';
import { ApplicantHistory } from '../../schemas';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantHistoryService {
  private databaseService = inject(DatabaseService);

  constructor() { }

  async addHistoryEntry(history: Omit<ApplicantHistory, 'ids' | 'created_at'>): Promise<void> {
    const params = [
      history.applicant_id,
      history.remarks,
      history.attachment,
      history.status
    ];
    await firstValueFrom(this.databaseService.query(INSERT_APPLICANT_HISTORY, params));
  }
}
