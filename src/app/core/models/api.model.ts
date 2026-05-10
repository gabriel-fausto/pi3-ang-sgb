import { Loan } from './loan.model';
import { Reservation } from './reservation.model';

export interface ApiUser {
    matricula: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    funcaoUsuario: number;
    ativo: boolean;
}

export interface ApiUserPayload {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    funcaoUsuario: number;
    ativo: boolean;
}

export interface ApiBook {
    isbn: string;
    titulo: string;
    autor: string;
    genero: string;
    anoPublicacao: number;
    unidades: number;
    unidadesDisponiveis: number;
    status: 'disponivel' | 'emprestado' | 'reservado';
}

export interface ApiBookPayload {
    isbn: string;
    titulo: string;
    autor: string;
    genero: string;
    anoPublicacao: number;
    unidades: number;
    unidadesDisponiveis: number;
}

export interface ApiLoan {
    id: number;
    matriculaUsuario: number;
    isbnLivro: string;
    dataInicio: string;
    dataFim: string;
    dataDevolucao: string | null;
    status: Loan['status'];
    multa: number;
}

export interface ApiLoanPayload {
    matriculaUsuario: number;
    isbnLivro: string;
    dataFim: string;
    dataInicio?: string;
}

export interface ApiReservation {
    idReserva: number;
    matriculaUsuario: number;
    isbnLivro: string;
    dataReserva: string;
    statusReserva: Reservation['status'];
    posicao: number;
}

export interface ApiReservationPayload {
    matriculaUsuario: number;
    isbnLivro: string;
}
