import { Injectable } from '@angular/core';
import { mockLoans } from '../mocks/loans.mock';
import { Loan } from '../models/loan.model';

@Injectable({ providedIn: 'root' })
export class LoansService {
    getLoans(): Loan[] {
        return [...mockLoans];
    }

    getLoansByUserId(userId: string): Loan[] {
        return mockLoans.filter((loan) => loan.userId === userId);
    }
}
