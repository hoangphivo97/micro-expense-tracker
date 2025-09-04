import { AuthProviderEnum, UserRoleEnum } from "../../enums/user-role.enum";

export interface ListUserResponseDto {
    page: number;
    limit: number;
    total: number;
    items: Array<{
        uid: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
        provider: AuthProviderEnum;
        role: UserRoleEnum;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
