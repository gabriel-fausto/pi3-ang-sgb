import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { mapApiBook } from '../helpers/api-mappers.helper';
import { ApiBook, ApiBookPayload } from '../models/api.model';
import { Book } from '../models/book.model';
import { API_BASE_URL } from '../config/api.config';

export interface CreateBookInput {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  year: number;
  copies: number;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/livros`;
  private readonly booksState = signal<Book[]>([]);

  readonly books = this.booksState.asReadonly();

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.http.get<ApiBook[]>(this.apiUrl).pipe(
      map((books) => books.map(mapApiBook)),
      catchError(() => of([])),
    ).subscribe((books) => this.booksState.set(books));
  }

  getBooks(): Book[] {
    return this.booksState();
  }

  getBookById(id: string): Book | undefined {
    return this.booksState().find((book) => book.id === id);
  }

  createBook(input: CreateBookInput): Observable<Book> {
    const payload: ApiBookPayload = {
      isbn: input.isbn,
      titulo: input.title,
      autor: input.author,
      genero: input.genre,
      anoPublicacao: input.year,
      unidades: input.copies,
      unidadesDisponiveis: input.copies,
    };

    return this.http.post<ApiBook>(this.apiUrl, payload).pipe(
      map(mapApiBook),
      tap((book) => {
        this.booksState.update((current) => [...current, book]);
      }),
    );
  }
}
