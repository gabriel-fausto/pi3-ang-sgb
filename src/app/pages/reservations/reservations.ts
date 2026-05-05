import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  LucideBookMarked,
  LucideBookOpen,
  LucideBookmarkPlus,
  LucideCheckCircle,
  LucideClock,
  LucideSearch,
  LucideUserCheck,
  LucideX,
} from 'lucide-angular';
import { Book } from '../../core/models/book.model';
import { Reservation } from '../../core/models/reservation.model';
import { AuthService } from '../../core/services/auth';
import { BooksService } from '../../core/services/books.service';
import { ReservationsService } from '../../core/services/reservations.service';
import { UsersService } from '../../core/services/users.service';
import { Alert } from '../../shared/alert/alert';
import { Badge } from '../../shared/badge/badge';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { CardContent } from '../../shared/card-content/card-content';
import { CardHeader } from '../../shared/card-header/card-header';
import { CardTitle } from '../../shared/card-title/card-title';
import { Input } from '../../shared/input/input';
import { Layout } from '../../shared/layout/layout';
import { Table } from '../../shared/table/table';
import { TableBody } from '../../shared/table-body/table-body';
import { TableCell } from '../../shared/table-cell/table-cell';
import { TableHead } from '../../shared/table-head/table-head';
import { TableHeader } from '../../shared/table-header/table-header';
import { TableRow } from '../../shared/table-row/table-row';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    Layout,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Alert,
    Input,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  ],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations {
  private readonly authService = inject(AuthService);
  private readonly reservationsService = inject(ReservationsService);
  private readonly booksService = inject(BooksService);
  private readonly usersService = inject(UsersService);

  protected readonly iconBookmarkPlus = LucideBookmarkPlus;
  protected readonly iconX = LucideX;
  protected readonly iconSearch = LucideSearch;
  protected readonly iconCheckCircle = LucideCheckCircle;
  protected readonly iconUserCheck = LucideUserCheck;
  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly iconClock = LucideClock;
  protected readonly iconBookMarked = LucideBookMarked;
  protected readonly headerImageUrl = 'https://images.unsplash.com/photo-1713891896907-b1ce4ee8c341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwcmVzZXJ2YXRpb24lMjBkZXNrJTIwYm9va3MlMjB3YWl0aW5nfGVufDF8fHx8MTc3Njg5NzM3OXww&ixlib=rb-4.1.0&q=80&w=1080';

  protected readonly canceledReservations = signal<string[]>([]);
  protected readonly showCancelSuccess = signal(false);
  protected readonly userSearch = signal('');
  protected readonly bookSearch = signal('');
  protected readonly selectedUserId = signal('');
  protected readonly selectedBookId = signal('');
  protected readonly showFormSuccess = signal(false);
  protected readonly newReservations = signal<Reservation[]>([]);

  private readonly books = this.booksService.getBooks();
  private readonly users = this.usersService.getUsers();
  private readonly baseReservations = this.reservationsService.getReservations();

  protected readonly user = this.authService.userSignal;
  protected readonly isReceptionist = computed(() => this.user()?.role === 'recepcionista');
  protected readonly isAdmin = computed(() => {
    const role = this.user()?.role;
    return role === 'bibliotecario' || role === 'recepcionista';
  });

  protected readonly selectedUser = computed(() => {
    const selectedUserId = this.selectedUserId();
    return selectedUserId ? this.usersService.getUserById(selectedUserId) ?? null : null;
  });

  protected readonly selectedBook = computed(() => {
    const selectedBookId = this.selectedBookId();
    return selectedBookId ? this.booksService.getBookById(selectedBookId) ?? null : null;
  });

  protected readonly availableUsers = computed(() => {
    const searchTerm = this.userSearch().toLowerCase();
    const rawSearchTerm = this.userSearch();

    return this.users.filter(
      (user) =>
        user.role === 'leitor' &&
        user.status === 'ativo' &&
        (user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.cpf.includes(rawSearchTerm)),
    );
  });

  protected readonly reservableBooks = computed(() => {
    const searchTerm = this.bookSearch().toLowerCase();
    const rawSearchTerm = this.bookSearch();

    return this.books.filter(
      (book) =>
        book.availableCopies === 0 &&
        (book.title.toLowerCase().includes(searchTerm) || book.isbn.includes(rawSearchTerm)),
    );
  });

  protected readonly allReservations = computed(() => [
    ...this.baseReservations,
    ...this.newReservations(),
  ]);

  protected readonly userReservations = computed(() => {
    const currentUser = this.user();
    const reservations = this.allReservations();

    if (this.isAdmin()) {
      return reservations;
    }

    return reservations.filter((reservation) => reservation.userId === currentUser?.id);
  });

  protected readonly activeReservations = computed(() => {
    const canceled = this.canceledReservations();

    return this.userReservations().filter(
      (reservation) => !canceled.includes(reservation.id) && reservation.status === 'ativa',
    );
  });

  protected readonly headerTitle = computed(() => {
    if (this.isReceptionist()) {
      return 'Gerenciar Reservas';
    }

    if (this.isAdmin()) {
      return 'Gerenciar Reservas';
    }

    return 'Minhas Reservas';
  });

  protected readonly headerDescription = computed(() => {
    if (this.isReceptionist()) {
      return 'Registre novas reservas e gerencie a fila de espera dos leitores';
    }

    if (this.isAdmin()) {
      return 'Visualize e gerencie todas as reservas ativas do sistema';
    }

    return 'Acompanhe suas reservas e a posição na fila de espera';
  });

  protected readonly listTitle = computed(() =>
    this.isAdmin() ? 'Todas as Reservas Ativas' : 'Suas Reservas Ativas',
  );

  protected readonly emptyListMessage = computed(() =>
    this.isAdmin() ? 'Nenhuma reserva ativa no momento.' : 'Você não possui reservas ativas.',
  );

  protected readonly waitingReservationsCount = computed(
    () => this.activeReservations().filter((reservation) => reservation.status === 'ativa').length,
  );

  protected readonly pickupReservationsCount = computed(
    () => this.activeReservations().filter((reservation) => reservation.status === 'disponivel').length,
  );

  protected readonly queuePosition = computed(() => {
    const selectedBookId = this.selectedBookId();

    if (!selectedBookId) {
      return 0;
    }

    return this.activeReservations().filter((reservation) => reservation.bookId === selectedBookId).length + 1;
  });

  protected readonly today = new Date();

  protected updateUserSearch(value: string): void {
    this.userSearch.set(value);
  }

  protected updateBookSearch(value: string): void {
    this.bookSearch.set(value);
  }

  protected selectUser(userId: string): void {
    this.selectedUserId.set(userId);
  }

  protected selectBook(bookId: string): void {
    this.selectedBookId.set(bookId);
  }

  protected clearSelectedUser(): void {
    this.selectedUserId.set('');
  }

  protected clearSelectedBook(): void {
    this.selectedBookId.set('');
  }

  protected clearSelections(): void {
    this.selectedUserId.set('');
    this.selectedBookId.set('');
  }

  protected handleCancelReservation(reservationId: string): void {
    this.canceledReservations.update((current) => [...current, reservationId]);
    this.showCancelSuccess.set(true);

    setTimeout(() => {
      this.showCancelSuccess.set(false);
    }, 3000);
  }

  protected handleConfirmReservation(event: Event): void {
    event.preventDefault();

    const selectedUserId = this.selectedUserId();
    const selectedBookId = this.selectedBookId();

    if (!selectedUserId || !selectedBookId) {
      return;
    }

    const newReservation: Reservation = {
      id: `new-${Date.now()}`,
      bookId: selectedBookId,
      userId: selectedUserId,
      reservationDate: new Date(),
      status: 'ativa',
      position: this.activeReservations().filter((reservation) => reservation.bookId === selectedBookId).length + 1,
    };

    this.newReservations.update((current) => [...current, newReservation]);
    this.showFormSuccess.set(true);

    setTimeout(() => {
      this.showFormSuccess.set(false);
      this.userSearch.set('');
      this.bookSearch.set('');
      this.selectedUserId.set('');
      this.selectedBookId.set('');
    }, 3000);
  }

  protected getBookById(bookId: string): Book | undefined {
    return this.booksService.getBookById(bookId);
  }

  protected getUserName(userId: string): string | undefined {
    return this.usersService.getUserById(userId)?.name;
  }

  protected getUserEmail(userId: string): string | undefined {
    return this.usersService.getUserById(userId)?.email;
  }

  protected formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  protected getBookStatusLabel(bookStatus: Book['status']): string {
    return bookStatus === 'emprestado' ? 'Emprestado' : 'Reservado';
  }

  protected getBookStatusBadgeClass(bookStatus: Book['status']): string {
    return bookStatus === 'emprestado'
      ? 'bg-gray-300 text-gray-800'
      : 'bg-gray-100 text-gray-700';
  }

  protected getStatusLabel(status: Reservation['status']): string {
    switch (status) {
      case 'ativa':
        return 'Ativa';
      case 'disponivel':
        return 'Disponível';
      case 'expirada':
        return 'Expirada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  }

  protected getStatusVariant(status: Reservation['status']): 'default' | 'success' | 'error' | 'info' {
    switch (status) {
      case 'ativa':
        return 'info';
      case 'disponivel':
        return 'success';
      case 'expirada':
        return 'error';
      case 'cancelada':
      default:
        return 'default';
    }
  }

}
