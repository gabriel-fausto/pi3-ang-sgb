import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { mapApiLoan } from '../helpers/api-mappers.helper';
import { ApiLoan, ApiLoanPayload } from '../models/api.model';
import { Loan } from '../models/loan.model';
import { API_BASE_URL } from '../config/api.config';

export interface CreateLoanInput {
  userId: string;
  bookId: string;
  dueDate: string;
}

@Injectable({ providedIn: 'root' })
export class LoansService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/emprestimos`;
  private readonly loansState = signal<Loan[]>([]);

  readonly loans = this.loansState.asReadonly();

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.http.get<ApiLoan[]>(this.apiUrl).pipe(
      map((loans) => loans.map(mapApiLoan)),
      catchError(() => of([])),
    ).subscribe((loans) => this.loansState.set(loans));
  }

  getLoans(): Loan[] {
    return this.loansState();
  }

  getLoansByUserId(userId: string): Loan[] {
    return this.loansState().filter((loan) => loan.userId === userId);
  }

  createLoan(input: CreateLoanInput): Observable<Loan> {
    const payload: ApiLoanPayload = {
      matriculaUsuario: Number(input.userId),
      isbnLivro: input.bookId,
      dataFim: `${input.dueDate}T23:59:59`,
    };

    return this.http.post<ApiLoan>(this.apiUrl, payload).pipe(
      map(mapApiLoan),
      tap((loan) => {
        this.loansState.update((current) => [loan, ...current]);
      }),
    );
  }

  returnLoan(id: string): Observable<Loan> {
    return this.http.patch<ApiLoan>(`${this.apiUrl}/${id}/devolucao`, {}).pipe(
      map(mapApiLoan),
      tap((updatedLoan) => {
        this.loansState.update((current) => current.map((loan) => loan.id === updatedLoan.id ? updatedLoan : loan));
      }),
    );
  }
}
