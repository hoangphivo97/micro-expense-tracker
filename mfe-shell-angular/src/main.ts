import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './app/services/RouteGuard/auth.interceptor';

providers:[
     { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true }
]

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
