export interface Permission {
    resource: string;
    action: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    isEmailVerified: boolean;
    emailVerificationExpiresAt: string | null;
    role: Role | null;
    permissions: Permission[];
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}