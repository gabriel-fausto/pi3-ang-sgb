import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { mapApiUser, mapUserRoleToApi } from '../helpers/api-mappers.helper';
import { ApiUser, ApiUserPayload } from '../models/api.model';
import { User, UserRole } from '../models/user.model';
import { API_BASE_URL } from '../config/api.config';

export interface CreateUserInput {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/usuarios`;
  private readonly usersState = signal<User[]>([]);

  readonly users = this.usersState.asReadonly();

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.http.get<ApiUser[]>(this.apiUrl).pipe(
      map((users) => users.map(mapApiUser)),
      catchError(() => of([])),
    ).subscribe((users) => this.usersState.set(users));
  }

  getUsers(): User[] {
    return this.usersState();
  }

  getUserById(id: string): User | undefined {
    return this.usersState().find((user) => user.id === id);
  }

  createUser(input: CreateUserInput): Observable<User> {
    const payload: ApiUserPayload = {
      nome: input.name,
      email: input.email,
      cpf: input.cpf,
      telefone: input.phone,
      funcaoUsuario: mapUserRoleToApi(input.role),
      ativo: true,
    };

    return this.http.post<ApiUser>(this.apiUrl, payload).pipe(
      map(mapApiUser),
      tap((user) => {
        this.usersState.update((current) => [...current, user]);
      }),
    );
  }
}
