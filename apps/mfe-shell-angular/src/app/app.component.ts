import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './services/RouteGuard/Akita/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'expense-tracker-app';
  authStore: AuthStore = inject(AuthStore);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.getToken();
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.authStore.setToken(token);
  }
}
