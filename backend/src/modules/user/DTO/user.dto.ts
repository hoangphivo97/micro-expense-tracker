import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { BaseListQueryDto } from 'src/modules/common/common.dto';

export class UserDto {
    @Expose()
    uid: string;

    @Expose()
    email: string;

    @Expose()
    username?: string;

    @Expose()
    displayName?: string;

    @Expose()
    photoURL?: string;

    @Expose()
    role: string[];

    @Expose()
    providers?: string[];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}

export class ListUserQueryDto extends BaseListQueryDto {
    @IsOptional() @IsString()
    role?: string;
}