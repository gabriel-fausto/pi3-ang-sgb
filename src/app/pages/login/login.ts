import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, LucideBookOpen, LucideSparkles } from 'lucide-angular';
import { AuthService } from '../../core/services/auth';
import { Card } from '../../shared/card/card';
import { Input } from "../../shared/input/input";
import { Button } from "../../shared/button/button";
import { Alert } from "../../shared/alert/alert";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule, Card, Input, Button, Alert],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly iconSparkles = LucideSparkles;

  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) { }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.error = '';
    this.loading = true;

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        await this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Credenciais inválidas. Verifique seu e-mail e senha.';
      }
    } catch {
      this.error = 'Erro ao realizar login. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
