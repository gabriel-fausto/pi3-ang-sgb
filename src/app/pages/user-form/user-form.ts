import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, LucideArrowLeft } from 'lucide-angular';
import { UserRole } from '../../core/models/user.model';
import { Alert } from '../../shared/alert/alert';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { Input } from '../../shared/input/input';
import { Layout } from '../../shared/layout/layout';
import { Select } from '../../shared/select/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    Layout,
    Card,
    Input,
    Select,
    Button,
    Alert,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private readonly router = inject(Router);

  protected readonly iconArrowLeft = LucideArrowLeft;

  protected success = false;
  protected formData: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    role: UserRole;
  } = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      role: 'leitor',
    };

  protected readonly roleOptions: Array<{ value: UserRole; label: string }> = [
    { value: 'leitor', label: 'Leitor' },
    { value: 'recepcionista', label: 'Recepcionista' },
    { value: 'bibliotecario', label: 'Bibliotecario' },
  ];

  protected handleSubmit(event: Event): void {
    event.preventDefault();
    this.success = true;

    setTimeout(() => {
      void this.router.navigate(['/users']);
    }, 2000);
  }

  protected navigateToUsers(): void {
    void this.router.navigate(['/users']);
  }

  protected handleChange(field: keyof typeof this.formData, value: string): void {
    this.formData = { ...this.formData, [field]: value };
  }

  protected formatCPF(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    return value;
  }

  protected formatPhone(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    return value;
  }

}
