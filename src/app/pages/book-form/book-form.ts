import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, LucideArrowLeft } from 'lucide-angular';
import { BooksService } from '../../core/services/books.service';
import { Alert } from '../../shared/alert/alert';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { Input } from '../../shared/input/input';
import { Layout } from '../../shared/layout/layout';
import { Select } from '../../shared/select/select';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    Layout,
    Card,
    Input,
    Select,
    Button,
    Alert,
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  private readonly router = inject(Router);
  private readonly booksService = inject(BooksService);

  protected readonly iconArrowLeft = LucideArrowLeft;
  protected readonly currentYear = new Date().getFullYear();

  success = false;
  formData = {
    title: '',
    author: '',
    isbn: '',
    genre: 'Ficção',
    year: this.currentYear.toString(),
    copies: '1',
  };

  protected readonly genres = Array.from(
    new Set(this.booksService.getBooks().map((book) => book.genre)),
  );

  protected get genreOptions(): Array<{ value: string; label: string }> {
    return [
      ...this.genres.map((genre) => ({ value: genre, label: genre })),
      { value: 'Outro', label: 'Outro' },
    ];
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.success = true;

    setTimeout(() => {
      void this.router.navigate(['/books']);
    }, 2000);
  }

  navigateToBooks(): void {
    void this.router.navigate(['/books']);
  }

  handleChange(field: keyof typeof this.formData, value: string): void {
    this.formData = { ...this.formData, [field]: value };
  }

}
