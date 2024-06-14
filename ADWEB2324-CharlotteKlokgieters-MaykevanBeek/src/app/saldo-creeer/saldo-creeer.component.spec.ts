import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SaldoCreeerComponent } from './saldo-creeer.component';
import { SaldoService } from '../saldo.service';
import { Saldo } from '../models/saldo.model';
import { of } from 'rxjs';

describe('SaldoCreeerComponent', () => {
  let component: SaldoCreeerComponent;
  let fixture: ComponentFixture<SaldoCreeerComponent>;
  let mockSaldoService: jasmine.SpyObj<SaldoService>;

  beforeEach(async () => {
    mockSaldoService = jasmine.createSpyObj('SaldoService', ['addSaldo']);

    await TestBed.configureTestingModule({
      declarations: [SaldoCreeerComponent],
      imports: [FormsModule],
      providers: [{ provide: SaldoService, useValue: mockSaldoService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize saldo and submitted correctly', () => {
    expect(component.saldo).toEqual(new Saldo('', ''));
    expect(component.submitted).toBeFalse();
  });
});
