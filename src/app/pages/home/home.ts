import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  LucideAlertCircle,
  LucideAngularModule,
  LucideBookCopy,
  LucideBookOpen,
  LucideSparkles,
  LucideUsers,
} from 'lucide-angular';
import { Book } from '../../core/models/book.model';
import { Loan } from '../../core/models/loan.model';
import { Reservation } from '../../core/models/reservation.model';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth';
import { BooksService } from '../../core/services/books.service';
import { LoansService } from '../../core/services/loans.service';
import { ReservationsService } from '../../core/services/reservations.service';
import { UsersService } from '../../core/services/users.service';
import { Badge } from '../../shared/badge/badge';
import { Card } from '../../shared/card/card';
import { CardContent } from '../../shared/card-content/card-content';
import { CardHeader } from '../../shared/card-header/card-header';
import { CardTitle } from '../../shared/card-title/card-title';
import { Layout } from '../../shared/layout/layout';
import { StatCard } from '../../shared/stat-card/stat-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    Layout,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Badge,
    StatCard,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly booksService = inject(BooksService);
  private readonly usersService = inject(UsersService);
  private readonly loansService = inject(LoansService);
  private readonly reservationsService = inject(ReservationsService);

  protected readonly user = this.authService.userSignal;
  protected readonly books = this.booksService.getBooks();
  protected readonly loans = this.loansService.getLoans();
  protected readonly reservations = this.reservationsService.getReservations();

  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly iconUsers = LucideUsers;
  protected readonly iconBookCopy = LucideBookCopy;
  protected readonly iconAlertCircle = LucideAlertCircle;
  protected readonly iconSparkles = LucideSparkles;

  protected readonly heroImageUrl = 'https://images.unsplash.com/photo-1708306807653-a12c46503cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc2hlbHZlcyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzQ4MjI4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080';

  protected readonly isAdmin = computed(() => {
    const role = this.user()?.role;
    return role === 'bibliotecario' || role === 'recepcionista';
  });

  protected readonly userLoans = computed(() => {
    const currentUser = this.user();
    return currentUser ? this.loansService.getLoansByUserId(currentUser.id) : [];
  });

  protected readonly userReservations = computed(() => {
    const currentUser = this.user();
    return currentUser ? this.reservationsService.getReservationsByUserId(currentUser.id) : [];
  });

  protected readonly displayedLoans = computed(() => {
    return this.isAdmin() ? this.loans.slice(0, 5) : this.userLoans();
  });

  protected readonly totalBooks = this.books.length;
  protected readonly availableBooks = this.books.filter((book) => book.status === 'disponivel').length;
  protected readonly activeLoans = this.loans.filter((loan) => loan.status === 'ativo').length;
  protected readonly overdueLoans = this.loans.filter((loan) => loan.status === 'atrasado').length;
  protected readonly activeReservations = this.reservations.filter((reservation) => reservation.status === 'ativa').length;
  protected readonly availableBooksDescription = `${this.availableBooks} disponíveis`;

  protected get welcomeTitle(): string {
    const name = this.user()?.name;
    return name ? `Bem-vindo, ${name}!` : 'Bem-vindo!';
  }

  protected get welcomeMessage(): string {
    return this.isAdmin()
      ? 'Aqui está um resumo das atividades da biblioteca'
      : 'Confira seus empréstimos e reservas ativas';
  }

  protected get loansHeading(): string {
    return this.isAdmin() ? 'Empréstimos Recentes' : 'Meus Empréstimos';
  }

  protected get emptyLoansMessage(): string {
    return this.isAdmin()
      ? 'Nenhum empréstimo registrado no momento.'
      : 'Você não possui empréstimos ativos.';
  }

  protected getBookById(bookId: string): Book | undefined {
    return this.booksService.getBookById(bookId);
  }

  protected getLoanUser(userId: string): User | null | undefined {
    return this.isAdmin() ? this.usersService.getUserById(userId) : this.user();
  }

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  protected formatFine(fine: number): string {
    return fine.toFixed(2);
  }

  protected trackByLoanId(_index: number, loan: Loan): string {
    return loan.id;
  }

  protected trackByReservationId(_index: number, reservation: Reservation): string {
    return reservation.id;
  }

}
