import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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
import { Badge } from '../../shared/badge/badge';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { CardContent } from '../../shared/card-content/card-content';
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
    RouterLink,
    LucideAngularModule,
    Layout,
    Card,
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

  private readonly users = this.usersService.getUsers();

  protected readonly filteredUsers = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    const rawSearchTerm = this.searchTerm();
    const roleFilter = this.roleFilter();
    const statusFilter = this.statusFilter();

    return this.users.filter((user) => {
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

}
