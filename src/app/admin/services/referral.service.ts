import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_REFERRALS,
  GET_REFERRAL_BY_ID,
  CREATE_REFERRAL,
  UPDATE_REFERRAL,
  DELETE_REFERRAL,
} from '../../queries';
import { Referral } from '../../schemas'; // Make sure this path is correct
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferralService {
  private db = inject(DatabaseService);

  async getReferrals(): Promise<Referral[]> {
    const response: any = await firstValueFrom(this.db.query(GET_REFERRALS));
    return (response && response.data) ? response.data as Referral[] : [];
  }

  async getReferralById(id: number): Promise<Referral | null> {
    const res: any = await firstValueFrom(this.db.query(GET_REFERRAL_BY_ID, [id]));
    return (res && res.data && res.data.length > 0) ? res.data[0] as Referral : null;
  }

  async createReferral(referral: Omit<Referral, 'id' | 'timestamp'>): Promise<any> {
    const params = this.mapReferralToParams(referral);
    return firstValueFrom(this.db.query(CREATE_REFERRAL, params));
  }

  async updateReferral(referral: Referral): Promise<any> {
    const params = this.mapReferralToParams(referral);
    return firstValueFrom(this.db.query(UPDATE_REFERRAL, [...params, referral.id]));
  }

  async deleteReferral(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_REFERRAL, [id]));
  }

  private mapReferralToParams(referral: Partial<Referral>): any[] {
    return [
      referral.name || '',
      referral.contact || '',
      referral.referred_by || '',
    ];
  }
}
