import { TestBed } from '@angular/core/testing';

import { JugadorService } from './jugadores.service';

describe('JugadoresService', () => {
  let service: JugadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
