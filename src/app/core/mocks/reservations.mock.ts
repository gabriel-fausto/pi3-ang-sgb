import { Reservation } from '../models/reservation.model';

export const mockReservations: Reservation[] = [
    {
        id: '1',
        bookId: '2',
        userId: '4',
        reservationDate: new Date('2026-03-20'),
        status: 'ativa',
        position: 1,
    },
    {
        id: '2',
        bookId: '5',
        userId: '3',
        reservationDate: new Date('2026-03-22'),
        status: 'ativa',
        position: 1,
    },
    {
        id: '3',
        bookId: '8',
        userId: '3',
        reservationDate: new Date('2026-03-25'),
        status: 'ativa',
        position: 1,
    },
];
