import { RefreshToken } from "./refresh-token";
import { Role } from "./role";

export interface User {
    userId: number;
    fullName: string;
    email: string;
    role: Role;
  }
  