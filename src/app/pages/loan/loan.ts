import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  LucideBookOpen,
  LucideBookUp,
  LucideCheckCircle,
  LucideSearch,
  LucideUserCheck,
} from 'lucide-angular';
import { Book } from '../../core/models/book.model';
import { User } from '../../core/models/user.model';
import { BooksService } from '../../core/services/books.service';
import { LoansService } from '../../core/services/loans.service';
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

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    Layout,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Button,
    Alert,
    Badge,
  ],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan {
  private readonly booksService = inject(BooksService);
  private readonly usersService = inject(UsersService);
  private readonly loansService = inject(LoansService);

  protected readonly step = signal<'search' | 'confirm' | 'success'>('search');
  protected readonly userSearch = signal('');
  protected readonly bookSearch = signal('');
  protected readonly selectedUserId = signal('');
  protected readonly selectedBookId = signal('');
  protected readonly dueDate = signal(this.createDefaultDueDate());

  protected readonly iconSearch = LucideSearch;
  protected readonly iconCheckCircle = LucideCheckCircle;
  protected readonly iconBookUp = LucideBookUp;
  protected readonly iconUserCheck = LucideUserCheck;
  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly headerImageUrl = 'https://images.unsplash.com/photo-1600715490141-e00d10cce391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwY2hlY2tvdXQlMjBkZXNrfGVufDF8fHx8MTc3Njg5NzAzNnww&ixlib=rb-4.1.0&q=80&w=1080';

  private readonly books = this.booksService.books;
  private readonly users = this.usersService.users;

  protected readonly selectedUser = computed(() => {
    const selectedUserId = this.selectedUserId();
    return selectedUserId ? this.users().find((user) => user.id === selectedUserId) ?? null : null;
  });

  protected readonly selectedBook = computed(() => {
    const selectedBookId = this.selectedBookId();
    return selectedBookId ? this.books().find((book) => book.id === selectedBookId) ?? null : null;
  });

  protected readonly availableUsers = computed(() => {
    const searchTerm = this.userSearch().toLowerCase();

    return this.users().filter(
      (user) =>
        user.role === 'leitor' &&
        user.status === 'ativo' &&
        (user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.cpf.includes(this.userSearch())),
    );
  });

  protected readonly availableBooks = computed(() => {
    const searchTerm = this.bookSearch().toLowerCase();

    return this.books().filter(
      (book) =>
        book.availableCopies > 0 &&
        (book.title.toLowerCase().includes(searchTerm) || book.isbn.includes(this.bookSearch())),
    );
  });

  protected get todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

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

  protected updateDueDate(value: string): void {
    this.dueDate.set(value);
  }

  protected handleConfirmLoan(event: Event): void {
    event.preventDefault();
    const selectedUserId = this.selectedUserId();
    const selectedBookId = this.selectedBookId();

    if (!selectedUserId || !selectedBookId) {
      return;
    }

    this.loansService.createLoan({
      userId: selectedUserId,
      bookId: selectedBookId,
      dueDate: this.dueDate(),
    }).subscribe({
      next: () => {
        this.booksService.refresh();
        this.loansService.refresh();
        this.step.set('success');

        setTimeout(() => {
          this.step.set('search');
          this.userSearch.set('');
          this.bookSearch.set('');
          this.selectedUserId.set('');
          this.selectedBookId.set('');
          this.dueDate.set(this.createDefaultDueDate());
        }, 3000);
      },
    });
  }

  protected formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  private createDefaultDueDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    return today.toISOString().split('T')[0];
  }

}
