import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'src/app/services/authentification.service';

describe('AuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
