import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { mapApiReservation } from '../helpers/api-mappers.helper';
import { ApiReservation, ApiReservationPayload } from '../models/api.model';
import { Reservation } from '../models/reservation.model';
import { API_BASE_URL } from '../config/api.config';

export interface CreateReservationInput {
  userId: string;
  bookId: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/reservas`;
  private readonly reservationsState = signal<Reservation[]>([]);

  readonly reservations = this.reservationsState.asReadonly();

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.http.get<ApiReservation[]>(this.apiUrl).pipe(
      map((reservations) => reservations.map(mapApiReservation)),
      catchError(() => of([])),
    ).subscribe((reservations) => this.reservationsState.set(reservations));
  }

  getReservations(): Reservation[] {
    return this.reservationsState();
  }

  getReservationsByUserId(userId: string): Reservation[] {
    return this.reservationsState().filter((reservation) => reservation.userId === userId);
  }

  createReservation(input: CreateReservationInput): Observable<Reservation> {
    const payload: ApiReservationPayload = {
      matriculaUsuario: Number(input.userId),
      isbnLivro: input.bookId,
    };

    return this.http.post<ApiReservation>(this.apiUrl, payload).pipe(
      map(mapApiReservation),
      tap((reservation) => {
        this.reservationsState.update((current) => [...current, reservation]);
      }),
    );
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.http.patch<ApiReservation>(`${this.apiUrl}/${id}/cancelamento`, {}).pipe(
      map(mapApiReservation),
      tap((updatedReservation) => {
        this.reservationsState.update((current) =>
          current.map((reservation) => reservation.id === updatedReservation.id ? updatedReservation : reservation),
        );
      }),
    );
  }
}
