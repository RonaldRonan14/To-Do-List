export interface Auth {
    accessToken: string;
    expiresAt: string;
    userId: string;
    surname: string;
    photoData?: string | null;
}