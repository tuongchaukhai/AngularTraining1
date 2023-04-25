import { RefreshToken } from "./refresh-token";
import { Role } from "./role";

export interface User {
    userId: number;
    fullName: string;
    email: string;
    password?: string;
    roleId: number;
    refreshTokens: RefreshToken[];
    role: Role;
  }
  