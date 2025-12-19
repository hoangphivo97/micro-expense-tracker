import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Đây là nơi ứng dụng Angular Shell chính thức khởi chạy.
 * Toàn bộ logic nạp Component gốc và Cấu hình (Providers) được thực hiện ở đây.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));