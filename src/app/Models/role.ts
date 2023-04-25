import { User } from "./user";

export interface Role{
    roleId: number;
    roleName: string;
    user: User[];
}