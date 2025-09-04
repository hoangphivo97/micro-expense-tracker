import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AuthProviderEnum, UserRoleEnum } from "src/modules/user/enums/user-role.enum";

@Schema({ timestamps: true, collection: 'users' })
export class User {
    @Prop({ required: true, unique: true, index: true })
    uid: string

    @Prop({ trim: true })
    displayName?: string

    @Prop({ lowercase: true, trim: true, unique: true, sparse: true })
    email?: string

    @Prop()
    photoUrl?: string;

    @Prop({ type: String, enum: AuthProviderEnum, required: true })
    providers: AuthProviderEnum

    @Prop({ type: String, enum: UserRoleEnum, default: UserRoleEnum.USER })
    role: UserRoleEnum

    @Prop({type: Date})
    createdAt: Date;

    @Prop({type:Date})
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);