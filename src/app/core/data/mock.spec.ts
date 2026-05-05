import { TestBed } from '@angular/core/testing';
import { calculateFine } from '../helpers/loan-fine.helper';
import { mockBooks } from '../mocks/books.mock';
import { mockLoans } from '../mocks/loans.mock';
import { mockReservations } from '../mocks/reservations.mock';
import { mockUsersData } from '../mocks/users.mock';
import { BooksService } from '../services/books.service';
import { LoansService } from '../services/loans.service';
import { ReservationsService } from '../services/reservations.service';
import { UsersService } from '../services/users.service';

describe('Mock domain structure', () => {
  let booksService: BooksService;
  let usersService: UsersService;
  let loansService: LoansService;
  let reservationsService: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    booksService = TestBed.inject(BooksService);
    usersService = TestBed.inject(UsersService);
    loansService = TestBed.inject(LoansService);
    reservationsService = TestBed.inject(ReservationsService);
  });

  it('should preserve all mock collections', () => {
    expect(booksService.getBooks().length).toBe(mockBooks.length);
    expect(usersService.getUsers().length).toBe(mockUsersData.length);
    expect(loansService.getLoans().length).toBe(mockLoans.length);
    expect(reservationsService.getReservations().length).toBe(mockReservations.length);
  });

  it('should find a book by id', () => {
    expect(booksService.getBookById('2')?.title).toBe('1984');
  });

  it('should find a user by id', () => {
    expect(usersService.getUserById('3')?.name).toBe('Maria Leitora');
  });

  it('should filter loans by user id', () => {
    expect(loansService.getLoansByUserId('3').map((loan) => loan.id)).toEqual(['1', '3']);
  });

  it('should filter reservations by user id', () => {
    expect(reservationsService.getReservationsByUserId('3').map((reservation) => reservation.id)).toEqual(['2', '3']);
  });

  it('should calculate overdue fines with the existing rule', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2026-04-10T12:00:00.000Z'));

    expect(calculateFine(new Date('2026-04-08T12:00:00.000Z'))).toBe(6);
    expect(calculateFine(new Date('2026-04-12T12:00:00.000Z'))).toBe(0);

    jasmine.clock().uninstall();
  });
});
