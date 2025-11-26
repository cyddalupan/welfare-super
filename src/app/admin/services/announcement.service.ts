import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {
  GET_ANNOUNCEMENTS,
  GET_ACTIVE_ANNOUNCEMENTS,
  GET_ANNOUNCEMENT_BY_ID,
  CREATE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
} from '../../queries';
import { Announcement } from '../../schemas/announcement';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private db = inject(DatabaseService);

  async getAnnouncements(): Promise<Announcement[]> {
    const response: any = await firstValueFrom(this.db.query(GET_ANNOUNCEMENTS));
    // The database returns a full Announcement object for admin view
    return (response && response.data) ? response.data as Announcement[] : [];
  }

  async getActiveAnnouncements(): Promise<Announcement['message'][]> {
    // This method is for the homepage, which only needs the message of active announcements
    const response: any = await firstValueFrom(this.db.query(GET_ACTIVE_ANNOUNCEMENTS));
    if (response && response.data && Array.isArray(response.data)) {
      // Map the results to an array of messages
      return response.data.map((item: any) => item.message as Announcement['message']);
    }
    return [];
  }

  async getAnnouncementById(id: number): Promise<Announcement | null> {
    const res: any = await firstValueFrom(this.db.query(GET_ANNOUNCEMENT_BY_ID, [id]));
    return (res && res.data && res.data.length > 0) ? res.data[0] as Announcement : null;
  }

  async createAnnouncement(announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>): Promise<any> {
    const params = this.mapAnnouncementToParams(announcement);
    return firstValueFrom(this.db.query(CREATE_ANNOUNCEMENT, params));
  }

  async updateAnnouncement(announcement: Announcement): Promise<any> {
    const params = this.mapAnnouncementToParams(announcement);
    // For update, the ID is the last parameter
    return firstValueFrom(this.db.query(UPDATE_ANNOUNCEMENT, [...params, announcement.id]));
  }

  async deleteAnnouncement(id: number): Promise<any> {
    return firstValueFrom(this.db.query(DELETE_ANNOUNCEMENT, [id]));
  }

  private mapAnnouncementToParams(announcement: Partial<Announcement>): any[] {
    // Ensure order matches the query parameters: message, is_active
    return [
      announcement.message || '',
      announcement.is_active ? 1 : 0, // Convert boolean to 1 or 0 for SQL TINYINT/BOOLEAN
    ];
  }
}
