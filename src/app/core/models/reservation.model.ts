export interface Reservation {
    id: string;
    bookId: string;
    userId: string;
    reservationDate: Date;
    status: 'ativa' | 'disponivel' | 'expirada' | 'cancelada';
    position: number;
}
