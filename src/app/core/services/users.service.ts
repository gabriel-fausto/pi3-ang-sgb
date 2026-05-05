import { Injectable } from '@angular/core';
import { mockUsersData } from '../mocks/users.mock';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    getUsers(): User[] {
        return [...mockUsersData];
    }

    getUserById(id: string): User | undefined {
        return mockUsersData.find((user) => user.id === id);
    }
}
