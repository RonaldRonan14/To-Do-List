export interface User {
    id: string;
    email: string;
    surname: string;
    photoData?: string | null;
}

export interface CreateUser {
    email: string;
    password: string;
    surname: string;
    photoData: File | null;
}

export interface UpdateUser {
    email: string;
    password?: string | null;
    surname: string;
    photoData: File | null;
    currentPassword: string | null;
}