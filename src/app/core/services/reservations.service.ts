import { Injectable } from '@angular/core';
import { mockReservations } from '../mocks/reservations.mock';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
    getReservations(): Reservation[] {
        return [...mockReservations];
    }

    getReservationsByUserId(userId: string): Reservation[] {
        return mockReservations.filter((reservation) => reservation.userId === userId);
    }
}
