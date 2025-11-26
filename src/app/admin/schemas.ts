export interface AdminUser {
    id: number;
    email: string;
    password?: string; // Optional because we don't always need to retrieve it
    full_name: string;
    user_type: string;
    created_at: string;
    updated_at: string;
}
