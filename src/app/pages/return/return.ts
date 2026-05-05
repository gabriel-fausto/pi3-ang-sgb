import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAlertCircle,
  LucideAngularModule,
  LucideCheckCircle,
  LucideSearch,
} from 'lucide-angular';
import { calculateFine } from '../../core/helpers/loan-fine.helper';
import { Book } from '../../core/models/book.model';
import { Loan } from '../../core/models/loan.model';
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
  selector: 'app-return',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    Layout,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Input,
    Button,
    Alert,
    Badge,
  ],
  templateUrl: './return.html',
  styleUrl: './return.css',
})
export class Return {
  private readonly loansService = inject(LoansService);
  private readonly booksService = inject(BooksService);
  private readonly usersService = inject(UsersService);

  protected readonly iconSearch = LucideSearch;
  protected readonly iconCheckCircle = LucideCheckCircle;
  protected readonly iconAlertCircle = LucideAlertCircle;
  protected readonly today = new Date();

  protected readonly bookSearch = signal('');
  protected readonly selectedLoanId = signal('');
  protected readonly success = signal(false);

  private readonly loans = this.loansService.getLoans();

  protected readonly activeLoans = computed(() =>
    this.loans.filter((loan) => loan.status === 'ativo' || loan.status === 'atrasado'),
  );

  protected readonly filteredLoans = computed(() => {
    const searchTerm = this.bookSearch().toLowerCase();
    const rawSearchTerm = this.bookSearch();

    return this.activeLoans().filter((loan) => {
      const book = this.booksService.getBookById(loan.bookId);

      return !!book &&
        (book.title.toLowerCase().includes(searchTerm) ||
          book.isbn.includes(rawSearchTerm) ||
          loan.id.includes(rawSearchTerm));
    });
  });

  protected readonly selectedLoan = computed(() => {
    const selectedLoanId = this.selectedLoanId();
    return selectedLoanId
      ? this.activeLoans().find((loan) => loan.id === selectedLoanId) ?? null
      : null;
  });

  protected readonly selectedBook = computed(() => {
    const loan = this.selectedLoan();
    return loan ? this.booksService.getBookById(loan.bookId) ?? null : null;
  });

  protected readonly selectedUser = computed(() => {
    const loan = this.selectedLoan();
    return loan ? this.usersService.getUserById(loan.userId) ?? null : null;
  });

  protected readonly fine = computed(() => {
    const loan = this.selectedLoan();
    return loan ? calculateFine(loan.dueDate) : 0;
  });

  protected readonly daysLate = computed(() => {
    const loan = this.selectedLoan();

    if (!loan) {
      return 0;
    }

    return Math.ceil(
      (new Date().getTime() - loan.dueDate.getTime()) / (1000 * 60 * 60 * 24),
    );
  });

  protected updateBookSearch(value: string): void {
    this.bookSearch.set(value);
  }

  protected selectLoan(loanId: string): void {
    this.selectedLoanId.set(loanId);
  }

  protected clearSelectedLoan(): void {
    this.selectedLoanId.set('');
  }

  protected handleReturn(event: Event): void {
    event.preventDefault();

    if (!this.selectedLoan()) {
      return;
    }

    this.success.set(true);

    setTimeout(() => {
      this.success.set(false);
      this.selectedLoanId.set('');
      this.bookSearch.set('');
    }, 3000);
  }

  protected getBookById(bookId: string): Book | undefined {
    return this.booksService.getBookById(bookId);
  }

  protected getUserById(userId: string): User | undefined {
    return this.usersService.getUserById(userId);
  }

  protected getLoanFine(loan: Loan): number {
    return calculateFine(loan.dueDate);
  }

  protected isOverdue(loan: Loan): boolean {
    return this.getLoanFine(loan) > 0;
  }

  protected formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

}
