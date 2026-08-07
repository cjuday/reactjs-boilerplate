import type { User } from "@/features/auth";

export interface ProfileResponse {
    message: string;
    user: User;
}