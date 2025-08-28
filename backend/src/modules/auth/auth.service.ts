import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/auth/schema/user.schema';
import { FirebaseAdminService } from 'src/common/firebase/firebase-admin.service';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly fb: FirebaseAdminService) {
    } s

    async findByUid(uid: string) {
        return await this.userModel.findOne({ uid });
    }

    async createUser(userData: Partial<User>) {
        const user = new this.userModel(userData);
        return await user.save();
    }

    async verifyAndGetUser(idToken: string) {
        let decoded;
        try {
            decoded = await this.fb.auth().verifyIdToken(idToken, true);
        } catch {
            throw new UnauthorizedException('Invalid or expired Firebase token');
        }

        // Tìm user theo uid
        let user = await this.findByUid(decoded.uid);

        // Nếu chưa có thì tạo mới
        if (!user) {
            user = await this.createUser({
                uid: decoded.uid,
                email: decoded.email?.toLowerCase(),
                displayName: decoded.name || decoded.displayName,
                photoUrl: decoded.picture,
                providers: [decoded.firebase?.sign_in_provider],
            });
        }

        return { decoded, user };
    }
}