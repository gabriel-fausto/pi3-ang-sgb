import { Component, inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink, Routes } from '@angular/router';
import { UserRole } from './core/models/user.model';
import { AuthService } from './core/services/auth';
import { BookForm } from './pages/book-form/book-form';
import { BooksList } from './pages/books-list/books-list';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Home } from './pages/home/home';
import { Loan } from './pages/loan/loan';
import { Login } from './pages/login/login';
import { Reservations } from './pages/reservations/reservations';
import { Return } from './pages/return/return';
import { UserForm } from './pages/user-form/user-form';
import { UsersList } from './pages/users-list/users-list';

type ProtectedRouteData = {
  allowedRoles?: UserRole[];
};

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-foreground mb-4">404</h1>
        <p class="text-[#718096] mb-6">Página não encontrada</p>
        <a routerLink="/login" class="text-primary hover:underline">
          Voltar para o login
        </a>
      </div>
    </div>
  `,
})
class NotFoundPage { }

const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated
    ? true
    : router.createUrlTree(['/login']);
};

const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data?.['allowedRoles'] as ProtectedRouteData['allowedRoles'];
  const userRole = authService.user?.role;

  if (!allowedRoles?.length) {
    return true;
  }

  return userRole && allowedRoles.includes(userRole)
    ? true
    : router.createUrlTree(['/dashboard']);
};

const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated
    ? router.createUrlTree(['/dashboard'])
    : true;
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    component: Home,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'books',
    component: BooksList,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'books/new',
    component: BookForm,
    canActivate: [authGuard, roleGuard],
    data: { allowedRoles: ['bibliotecario'] satisfies UserRole[] },
  },
  {
    path: 'users',
    component: UsersList,
    canActivate: [authGuard, roleGuard],
    data: { allowedRoles: ['bibliotecario'] satisfies UserRole[] },
  },
  {
    path: 'users/new',
    component: UserForm,
    canActivate: [authGuard, roleGuard],
    data: { allowedRoles: ['bibliotecario'] satisfies UserRole[] },
  },
  {
    path: 'loans',
    component: Loan,
    canActivate: [authGuard, roleGuard],
    data: { allowedRoles: ['recepcionista', 'bibliotecario'] satisfies UserRole[] },
  },
  {
    path: 'returns',
    component: Return,
    canActivate: [authGuard, roleGuard],
    data: { allowedRoles: ['recepcionista', 'bibliotecario'] satisfies UserRole[] },
  },
  {
    path: 'reservations',
    component: Reservations,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
