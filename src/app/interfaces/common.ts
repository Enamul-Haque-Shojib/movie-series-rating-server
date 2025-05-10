import { AuthRole } from "@prisma/client";


export type IAuthUser = {
    email: string;
    role: AuthRole
} | null;