import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SaldoCreeerComponent } from './saldo-creeer.component';
import { SaldoService } from '../saldo.service';
import { Saldo } from '../models/saldo.model';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import {AuthService} from "../auth.service";
import {of} from "rxjs";

describe('SaldoCreeerComponent', () => {
  let component: SaldoCreeerComponent;
  let fixture: ComponentFixture<SaldoCreeerComponent>;
  let mockSaldoService: jasmine.SpyObj<SaldoService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockSaldoService = jasmine.createSpyObj('SaldoService', ['addSaldo']);
    mockAuthService = jasmine.createSpyObj('AuthService', { getCurrentUserId: of('test-user-id') });

    await TestBed.configureTestingModule({
      declarations: [SaldoCreeerComponent],
      imports: [FormsModule],
      providers: [
        { provide: SaldoService, useValue: mockSaldoService },
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: mockAuthService }
      ]
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
});
