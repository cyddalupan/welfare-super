import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_FRAS,
  GET_FRA_BY_ID,
  CREATE_FRA,
  UPDATE_FRA,
  DELETE_FRA,
} from '../../queries';
import { Fra } from '../../schemas';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FraService {
  private db = inject(DatabaseService);

  async getFras(): Promise<Fra[]> {
    const response: any = await firstValueFrom(this.db.query(GET_FRAS));
    return (response && response.data) ? response.data as Fra[] : [];
  }

  async getFraById(id: number): Promise<Fra | null> {
    const res: any = await firstValueFrom(this.db.query(GET_FRA_BY_ID, [id]));
    return (res && res.data && res.data.length > 0) ? res.data[0] as Fra : null;
  }

  async createFra(fra: Omit<Fra, 'id'>): Promise<any> {
    const params = this.mapFraToParams(fra);
    return firstValueFrom(this.db.query(CREATE_FRA, params));
  }

  async updateFra(fra: Fra): Promise<any> {
    const params = this.mapFraToParams(fra);
    return firstValueFrom(this.db.query(UPDATE_FRA, [...params, fra.id]));
  }

  async deleteFra(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_FRA, [id]));
  }

  private mapFraToParams(fra: Partial<Fra>): any[] {
    return [
      fra.name || '',
      fra.contact || '',
      fra.address || '',
      fra.country || '',
      fra.agency_id || null,
    ];
  }
}
