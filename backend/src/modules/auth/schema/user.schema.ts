import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type Role = 'admin' | 'user';

@Schema({ timestamps: true, collection: 'users' })
export class User {
    @Prop({ required: true, unique: true, index: true })
    uid: string

    @Prop({ trim: true }) 
    displayName?: string

    @Prop({ lowercase: true, trim: true, unique: true, sparse: true })
    email?:string

    @Prop()
    photoUrl?:string;

    @Prop({type: [String], default: []})
    providers: string[]

    @Prop({type: [String], default: ['user']})
    roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);