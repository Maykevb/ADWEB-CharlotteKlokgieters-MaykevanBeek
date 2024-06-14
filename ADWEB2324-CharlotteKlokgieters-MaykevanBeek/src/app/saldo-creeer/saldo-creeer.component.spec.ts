import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SaldoCreeerComponent } from './saldo-creeer.component';
import { SaldoService } from '../saldo.service';
import { Saldo } from '../models/saldo.model';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "../auth.service";
import { of } from "rxjs";

describe('SaldoCreeerComponent', () => {
  let component: SaldoCreeerComponent;
  let fixture: ComponentFixture<SaldoCreeerComponent>;
  let mockSaldoService: jasmine.SpyObj<SaldoService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockSaldoService = jasmine.createSpyObj('SaldoService', ['addSaldo']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUserId']);
    mockAuthService.getCurrentUserId.and.returnValue(of('test-user-id'));

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
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize ownerId on ngOnInit', () => {
    // Arrange
    const testUserId = 'test-user-id';

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.ownerId).toBe(testUserId);
    expect(component.saldo.ownerId).toBe(testUserId);
  });

  it('should add saldo correctly when onAdd is called', () => {
    // Arrange
    component.huishoudboekje = 'TestHuishoudboekje';
    component.saldo.bedrag = 100;

    // Act
    component.onAdd();

    // Assert
    expect(mockSaldoService.addSaldo).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      bedrag: 100,
      huishoudboekje: 'TestHuishoudboekje',
      ownerId: 'test-user-id'
    }));
    expect(component.submitted).toBeFalse();
  });
});
