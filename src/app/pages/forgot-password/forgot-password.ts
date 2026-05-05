import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideArrowLeft,
  LucideBookOpen,
  LucideMail,
} from 'lucide-angular';
import { Alert } from '../../shared/alert/alert';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { Input } from '../../shared/input/input';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    Button,
    Input,
    Card,
    Alert,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  protected readonly iconBookOpen = LucideBookOpen;
  protected readonly iconArrowLeft = LucideArrowLeft;
  protected readonly iconMail = LucideMail;

  email = '';
  success = false;
  error = '';
  loading = false;

  protected readonly heroImageUrl = 'https://images.unsplash.com/photo-1706195546853-a81b6a190daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9vayUyMGNvZmZlZSUyMGNvenl8ZW58MXx8fHwxNzc0NzQyMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080';

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.error = '';
    this.success = false;
    this.loading = true;

    setTimeout(() => {
      if (this.email.includes('@')) {
        this.success = true;
      } else {
        this.error = 'E-mail não encontrado no sistema.';
      }

      this.loading = false;
    }, 1000);
  }

}
