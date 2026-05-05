export interface Loan {
    id: string;
    bookId: string;
    userId: string;
    loanDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: 'ativo' | 'devolvido' | 'atrasado';
    fine?: number;
}
