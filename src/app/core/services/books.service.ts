import { Injectable } from '@angular/core';
import { mockBooks } from '../mocks/books.mock';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  getBooks(): Book[] {
    return [...mockBooks];
  }

  getBookById(id: string): Book | undefined {
    return mockBooks.find((book) => book.id === id);
  }
}