import { ApiBook, ApiLoan, ApiReservation, ApiUser } from '../models/api.model';
import { Book } from '../models/book.model';
import { Loan } from '../models/loan.model';
import { Reservation } from '../models/reservation.model';
import { User, UserRole } from '../models/user.model';

export function mapApiUser(apiUser: ApiUser): User {
    return {
        id: String(apiUser.matricula),
        name: apiUser.nome,
        email: apiUser.email,
        cpf: apiUser.cpf,
        phone: apiUser.telefone,
        role: mapUserRoleFromApi(apiUser.funcaoUsuario),
        status: apiUser.ativo ? 'ativo' : 'inativo',
    };
}

export function mapUserRoleFromApi(funcaoUsuario: number): UserRole {
    switch (funcaoUsuario) {
        case 2:
            return 'recepcionista';
        case 3:
            return 'bibliotecario';
        case 1:
        default:
            return 'leitor';
    }
}

export function mapUserRoleToApi(role: UserRole): number {
    switch (role) {
        case 'recepcionista':
            return 2;
        case 'bibliotecario':
            return 3;
        case 'leitor':
        default:
            return 1;
    }
}

export function mapApiBook(apiBook: ApiBook): Book {
    return {
        id: apiBook.isbn,
        title: apiBook.titulo,
        author: apiBook.autor,
        isbn: apiBook.isbn,
        genre: apiBook.genero,
        year: apiBook.anoPublicacao,
        status: apiBook.status,
        copies: apiBook.unidades,
        availableCopies: apiBook.unidadesDisponiveis,
    };
}

export function mapApiLoan(apiLoan: ApiLoan): Loan {
    return {
        id: String(apiLoan.id),
        bookId: apiLoan.isbnLivro,
        userId: String(apiLoan.matriculaUsuario),
        loanDate: new Date(apiLoan.dataInicio),
        dueDate: new Date(apiLoan.dataFim),
        returnDate: apiLoan.dataDevolucao ? new Date(apiLoan.dataDevolucao) : undefined,
        status: apiLoan.status,
        fine: apiLoan.multa,
    };
}

export function mapApiReservation(apiReservation: ApiReservation): Reservation {
    return {
        id: String(apiReservation.idReserva),
        bookId: apiReservation.isbnLivro,
        userId: String(apiReservation.matriculaUsuario),
        reservationDate: new Date(apiReservation.dataReserva),
        status: apiReservation.statusReserva,
        position: apiReservation.posicao,
    };
}
