import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideEdit,
  LucideSearch,
  LucideUserCheck,
  LucideUserX,
} from 'lucide-angular';
import { User } from '../../core/models/user.model';
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
import { Select } from '../../shared/select/select';
import { Table } from '../../shared/table/table';
import { TableBody } from '../../shared/table-body/table-body';
import { TableCell } from '../../shared/table-cell/table-cell';
import { TableHead } from '../../shared/table-head/table-head';
import { TableHeader } from '../../shared/table-header/table-header';
import { TableRow } from '../../shared/table-row/table-row';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    Layout,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Input,
    Select,
    Button,
    Badge,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Alert,
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  private readonly usersService = inject(UsersService);

  protected readonly iconSearch = LucideSearch;
  protected readonly iconEdit = LucideEdit;
  protected readonly iconUserX = LucideUserX;
  protected readonly iconUserCheck = LucideUserCheck;

  protected readonly searchTerm = signal('');
  protected readonly roleFilter = signal<'all' | User['role']>('all');
  protected readonly statusFilter = signal<'all' | User['status']>('all');

  protected readonly isEditDialogOpen = signal(false);
  protected readonly editingUser = signal<User | null>(null);
  protected readonly editName = signal('');
  protected readonly editEmail = signal('');
  protected readonly isLoadingEdit = signal(false);
  protected readonly editErrorMessage = signal('');

  protected readonly users = this.usersService.users;

  protected readonly filteredUsers = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    const rawSearchTerm = this.searchTerm();
    const roleFilter = this.roleFilter();
    const statusFilter = this.statusFilter();

    return this.users().filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.cpf.includes(rawSearchTerm);

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  protected readonly roleOptions: Array<{ value: 'all' | User['role']; label: string }> = [
    { value: 'all', label: 'Todos os perfis' },
    { value: 'leitor', label: 'Leitor' },
    { value: 'recepcionista', label: 'Recepcionista' },
    { value: 'bibliotecario', label: 'Bibliotecario' },
  ];

  protected readonly statusOptions: Array<{ value: 'all' | User['status']; label: string }> = [
    { value: 'all', label: 'Todos os status' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
  ];

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected updateRoleFilter(value: string): void {
    this.roleFilter.set(value as 'all' | User['role']);
  }

  protected updateStatusFilter(value: string): void {
    this.statusFilter.set(value as 'all' | User['status']);
  }

  protected getRoleVariant(role: User['role']): 'default' | 'info' {
    return role === 'bibliotecario' ? 'info' : 'default';
  }

  protected getRoleLabel(role: User['role']): string {
    if (role === 'bibliotecario') {
      return 'Bibliotecario';
    }

    if (role === 'recepcionista') {
      return 'Recepcionista';
    }

    return 'Leitor';
  }

  protected getStatusVariant(status: User['status']): 'success' | 'error' {
    return status === 'ativo' ? 'success' : 'error';
  }

  protected getStatusLabel(status: User['status']): string {
    return status === 'ativo' ? 'Ativo' : 'Inativo';
  }

  protected openEditDialog(user: User): void {
    this.editingUser.set(user);
    this.editName.set(user.name);
    this.editEmail.set(user.email);
    this.editErrorMessage.set('');
    this.isEditDialogOpen.set(true);
  }

  protected closeEditDialog(): void {
    this.isEditDialogOpen.set(false);
    this.editingUser.set(null);
    this.editName.set('');
    this.editEmail.set('');
    this.editErrorMessage.set('');
  }

  protected saveEditUser(): void {
    const user = this.editingUser();
    const name = this.editName().trim();
    const email = this.editEmail().trim();

    if (!name || !email) {
      this.editErrorMessage.set('Nome e e-mail são obrigatórios');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.editErrorMessage.set('E-mail inválido');
      return;
    }

    if (!user) {
      return;
    }

    this.isLoadingEdit.set(true);
    this.usersService.updateUser(user.id, name, email).subscribe({
      next: () => {
        this.isLoadingEdit.set(false);
        this.closeEditDialog();
      },
      error: () => {
        this.isLoadingEdit.set(false);
        this.editErrorMessage.set('Erro ao atualizar usuário. Tente novamente.');
      },
    });
  }

  protected toggleUserStatus(user: User): void {
    this.usersService.toggleUserStatus(user.id).subscribe({
      next: () => {
        this.usersService.refresh();
      },
      error: () => {
        console.error('Erro ao alternar status do usuário');
      },
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
