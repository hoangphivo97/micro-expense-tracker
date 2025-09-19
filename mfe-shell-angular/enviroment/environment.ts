import { firebaseConfig } from "../src/app/environment/environment";

export const enviroment = {
    production: false,
    firebase: firebaseConfig,
    useAuthEmulator: true,           // <— flag cho test
    authEmulatorHost: 'http://localhost:9099'
}