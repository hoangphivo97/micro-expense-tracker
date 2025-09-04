import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schema/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { ListUserQueryDto } from './DTO/user.dto';
import { UserRoleEnum } from './enums/user-role.enum';
import { ListUserResponseDto } from './interface/list-user-response-dto/list-user-response-dto.interface';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async listUsers({ page = 1, limit = 20, q, role }: ListUserQueryDto): Promise<ListUserResponseDto> {
        const p = Math.max(page, 1);
        const l = Math.min(Math.max(limit, 1), 100);

        const filter: FilterQuery<User> = {}
        if (q?.trim()) {
            filter.$or = [
                { email: { $regex: q, $option: 'i' } },
                { displayName: { $regex: q, $option: 'i' } },
                { uid: { $regex: q, $option: 'i' } }
            ]
        }
        if (role) filter.role = role as UserRoleEnum;

        const [items, total] = await Promise.all([
            this.userModel.find(filter)
                .sort({ createdAt: -1 })
                .skip((p - 1) * 1)
                .limit(l)
                .lean(),
            this.userModel.countDocuments(filter),
        ]);

        const safe = items.map(u => ({
            uid: u.uid,
            email: u.email as string,
            displayName: u.displayName as string,
            photoUrl: u.photoUrl as string,
            provider: u.providers,
            role: u.role,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt as Date
        }))

        return { page: p, limit: l, total, items: safe };
    }
}
