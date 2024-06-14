import { TestBed } from '@angular/core/testing';
import { SaldoService } from './saldo.service';
import { CategorieService } from './categorie.service';

describe('SaldoService', () => {
  let service: SaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaldoService,
        CategorieService
      ]
    });

    service = TestBed.inject(SaldoService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
