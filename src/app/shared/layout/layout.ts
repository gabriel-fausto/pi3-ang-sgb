import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideBookCopy,
  LucideBookmarkPlus,
  LucideBookOpen,
  LucideBookPlus,
  LucideHome,
  LucideIconData,
  LucideLogOut,
  LucideMenu,
  LucideUserPlus,
  LucideUsers,
  LucideX,
} from 'lucide-angular';
import { UserRole } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth';
import { Button } from '../button/button';

interface MenuItem {
  label: string;
  icon: LucideIconData;
  path: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.userSignal;
  protected readonly sidebarOpen = signal(false);

  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly iconBookCopy = LucideBookCopy;
  protected readonly iconBookmarkPlus = LucideBookmarkPlus;
  protected readonly iconHome = LucideHome;
  protected readonly iconLogOut = LucideLogOut;
  protected readonly iconMenu = LucideMenu;
  protected readonly iconX = LucideX;
  protected readonly iconBookPlus = LucideBookPlus;
  protected readonly iconUserPlus = LucideUserPlus;
  protected readonly iconUsers = LucideUsers;

  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Início',
      icon: LucideHome,
      path: '/dashboard',
      roles: ['leitor', 'recepcionista', 'bibliotecario'],
    },
    {
      label: 'Catálogo de Livros',
      icon: LucideBookOpen,
      path: '/books',
      roles: ['leitor', 'recepcionista', 'bibliotecario'],
    },
    {
      label: 'Cadastrar Livro',
      icon: LucideBookPlus,
      path: '/books/new',
      roles: ['bibliotecario'],
    },
    {
      label: 'Empréstimos',
      icon: LucideBookCopy,
      path: '/loans',
      roles: ['recepcionista', 'bibliotecario'],
    },
    {
      label: 'Devoluções',
      icon: LucideBookCopy,
      path: '/returns',
      roles: ['recepcionista', 'bibliotecario'],
    },
    {
      label: 'Reservas',
      icon: LucideBookmarkPlus,
      path: '/reservations',
      roles: ['leitor', 'recepcionista', 'bibliotecario'],
    },
    {
      label: 'Usuários',
      icon: LucideUsers,
      path: '/users',
      roles: ['bibliotecario'],
    },
    {
      label: 'Cadastrar Usuário',
      icon: LucideUserPlus,
      path: '/users/new',
      roles: ['bibliotecario'],
    },
  ];

  protected readonly filteredMenuItems = computed(() => {
    const role = this.user()?.role;

    if (!role) {
      return [];
    }

    return this.menuItems.filter((item) => item.roles.includes(role));
  });

  protected async handleLogout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected isActivePath(path: string): boolean {
    return this.router.url === path;
  }

  protected trackByPath(_index: number, item: MenuItem): string {
    return item.path;
  }

  protected get sidebarTransformClass(): string {
    return this.sidebarOpen()
      ? 'translate-x-0'
      : '-translate-x-full md:translate-x-0';
  }

  protected getUserRoleLabel(role: UserRole | undefined): string {
    switch (role) {
      case 'leitor':
        return 'Leitor';
      case 'recepcionista':
        return 'Recepcionista';
      case 'bibliotecario':
        return 'Bibliotecário';
      default:
        return '';
    }
  }

}
