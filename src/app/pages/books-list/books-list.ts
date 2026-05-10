import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  LucideBookOpen,
  LucideSearch,
} from 'lucide-angular';
import { Book } from '../../core/models/book.model';
import { AuthService } from '../../core/services/auth';
import { BooksService } from '../../core/services/books.service';
import { Badge } from '../../shared/badge/badge';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { CardContent } from '../../shared/card-content/card-content';
import { CardHeader } from '../../shared/card-header/card-header';
import { CardTitle } from '../../shared/card-title/card-title';
import { Input } from '../../shared/input/input';
import { Layout } from '../../shared/layout/layout';
import { Select } from '../../shared/select/select';

@Component({
  selector: 'app-books-list',
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
    Select,
    Badge,
    Button,
  ],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList {
  private readonly authService = inject(AuthService);
  private readonly booksService = inject(BooksService);

  protected readonly user = this.authService.userSignal;
  protected readonly searchTerm = signal('');
  protected readonly genreFilter = signal('all');
  protected readonly books = this.booksService.books;

  protected readonly iconSearch = LucideSearch;
  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly headerImageUrl = 'https://images.unsplash.com/photo-1761682708053-f3fa46cf5c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzQ4MjI5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080';
  protected readonly coverImageUrl = 'https://images.unsplash.com/photo-1772976811682-465df3b8c735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9vayUyMHNwaW5lJTIwbGlicmFyeXxlbnwxfHx8fDE3NzQ4MjI5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080';

  protected readonly isAdmin = computed(() => this.user()?.role === 'bibliotecario');
  protected readonly genres = computed(() => Array.from(new Set(this.books().map((book) => book.genre))));

  protected get genreOptions(): Array<{ value: string; label: string }> {
    return [
      { value: 'all', label: 'Todos os gêneros' },
      ...this.genres().map((genre) => ({ value: genre, label: genre })),
    ];
  }

  protected readonly filteredBooks = computed(() => {
    const currentSearchTerm = this.searchTerm();
    const normalizedSearchTerm = currentSearchTerm.toLowerCase();
    const currentGenreFilter = this.genreFilter();

    return this.books().filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(normalizedSearchTerm) ||
        book.author.toLowerCase().includes(normalizedSearchTerm) ||
        book.isbn.includes(currentSearchTerm);

      const matchesGenre = currentGenreFilter === 'all' || book.genre === currentGenreFilter;

      return matchesSearch && matchesGenre;
    });
  });

  protected getStatusBadgeVariant(book: Book): 'success' | 'error' | 'warning' {
    if (book.status === 'disponivel') {
      return 'success';
    }

    if (book.status === 'emprestado') {
      return 'error';
    }

    return 'warning';
  }

  protected getStatusBadgeLabel(book: Book): string {
    if (book.status === 'disponivel') {
      return 'Disponível';
    }

    if (book.status === 'emprestado') {
      return 'Emprestado';
    }

    return 'Reservado';
  }

  protected availabilityWidth(book: Book): number {
    return (book.availableCopies / book.copies) * 100;
  }

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected updateGenreFilter(value: string): void {
    this.genreFilter.set(value);
  }

  protected trackByBookId(_index: number, book: Book): string {
    return book.id;
  }

}
