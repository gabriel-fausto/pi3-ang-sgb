import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate a valid user', async () => {
    const success = await service.login('admin@sgb.com', 'admin123');

    expect(success).toBeTrue();
    expect(service.user?.email).toBe('admin@sgb.com');
    expect(service.isAuthenticated).toBeTrue();
  });

  it('should clear the authenticated user on logout', async () => {
    await service.login('admin@sgb.com', 'admin123');

    service.logout();

    expect(service.user).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });
});
