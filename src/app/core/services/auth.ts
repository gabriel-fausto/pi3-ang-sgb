import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { mapApiUser } from '../helpers/api-mappers.helper';
import { ApiUser } from '../models/api.model';
import { User } from '../models/user.model';
import { API_BASE_URL } from '../config/api.config';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthContextType {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/auth/login`;
  private readonly userState = signal<User | null>(null);

  readonly userSignal = this.userState.asReadonly();
  readonly isAuthenticatedSignal = computed(() => this.userState() !== null);

  get user(): User | null {
    return this.userState();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.http.post<ApiUser>(this.apiUrl, {
        email,
        senha: password,
      }));
      this.userState.set(mapApiUser(user));
      return true;
    } catch {
      return false;
    }
  }

  logout(): void {
    this.userState.set(null);
  }
}
