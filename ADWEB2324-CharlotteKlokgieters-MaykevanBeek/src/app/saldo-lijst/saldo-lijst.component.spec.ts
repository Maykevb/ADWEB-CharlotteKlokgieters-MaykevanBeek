import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaldoLijstComponent } from './saldo-lijst.component';
import { SaldoService } from '../saldo.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Saldo } from '../models/saldo.model';

class MockSaldoService {
  getInkomsten(huishoudboekje: string | null | undefined) {
    return of([]);
  }

  getUitgaven(huishoudboekje: string | null | undefined) {
    return of([]);
  }

  updateSaldo(saldo: Saldo) {
    // Mock implementation
  }

  deleteSaldo(saldo: Saldo) {
    // Mock implementation
  }
}

describe('SaldoLijstComponent', () => {
  let component: SaldoLijstComponent;
  let fixture: ComponentFixture<SaldoLijstComponent>;
  let mockService: MockSaldoService;

  beforeEach(async () => {
    mockService = new MockSaldoService();

    await TestBed.configureTestingModule({
      declarations: [SaldoLijstComponent],
      providers: [
        { provide: SaldoService, useValue: mockService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
