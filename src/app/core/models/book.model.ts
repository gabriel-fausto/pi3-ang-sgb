export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    genre: string;
    year: number;
    status: 'disponivel' | 'emprestado' | 'reservado';
    copies: number;
    availableCopies: number;
}
