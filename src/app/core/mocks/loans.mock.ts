import { Loan } from '../models/loan.model';

export const mockLoans: Loan[] = [
    {
        id: '1',
        bookId: '2',
        userId: '3',
        loanDate: new Date('2026-03-15'),
        dueDate: new Date('2026-03-29'),
        status: 'ativo',
    },
    {
        id: '2',
        bookId: '5',
        userId: '4',
        loanDate: new Date('2026-03-10'),
        dueDate: new Date('2026-03-24'),
        status: 'atrasado',
        fine: 15.0,
    },
    {
        id: '3',
        bookId: '1',
        userId: '3',
        loanDate: new Date('2026-02-15'),
        dueDate: new Date('2026-03-01'),
        returnDate: new Date('2026-02-28'),
        status: 'devolvido',
    },
];
