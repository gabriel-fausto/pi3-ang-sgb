import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user.model';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock users for authentication
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin Sistema',
    email: 'admin@sgb.com',
    password: 'admin123',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    role: 'bibliotecario',
    status: 'ativo',
  },
  {
    id: '2',
    name: 'João Recepcionista',
    email: 'recepcao@sgb.com',
    password: 'recepcao123',
    cpf: '987.654.321-00',
    phone: '(11) 97654-3210',
    role: 'recepcionista',
    status: 'ativo',
  },
  {
    id: '3',
    name: 'Maria Leitora',
    email: 'maria@email.com',
    password: 'leitor123',
    cpf: '456.789.123-00',
    phone: '(11) 96543-2109',
    role: 'leitor',
    status: 'ativo',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthContextType {
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
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      this.userState.set(userWithoutPassword);
      return true;
    }

    return false;
  }

  logout(): void {
    this.userState.set(null);
  }
}
