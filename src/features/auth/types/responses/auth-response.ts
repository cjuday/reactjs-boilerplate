export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    isEmailVerified: boolean;
    emailVerificationExpiresAt: string | null;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}