import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';
@Injectable()
export class FirebaseAdminService {
    private readonly app: admin.app.App;

    constructor() {
        if (admin.apps.length === 0) {
            this.app = admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        } else {
            this.app = admin.app();
        }
    }

    auth() {
        return admin.auth(this.app);
    }
    firestore() {
        return admin.firestore(this.app);
    }
    // Nếu muốn truy cập thẳng namespace:
    get sdk() {
        return admin;
    }
}
