import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['registerEmailAndPass']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register with email and password when form is valid', fakeAsync(() => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    component.registerForm.setValue({ email, password });
    mockAuthService.registerEmailAndPass.and.returnValue(of({}));

    // Act
    component.registerWithEmailAndPass();
    tick();

    // Assert
    expect(component.submitted).toBeFalse();
    expect(mockAuthService.registerEmailAndPass).toHaveBeenCalledWith({ email, password });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('huishoudboekjes-overzicht');
  }));

  it('should not register when form is invalid', () => {
    // Arrange
    component.registerForm.setValue({ email: '', password: '' });
    mockAuthService.registerEmailAndPass.and.returnValue(of({}));

    // Act
    component.registerWithEmailAndPass();

    // Assert
    expect(component.submitted).toBeTrue();
    expect(mockAuthService.registerEmailAndPass).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should handle registration error', fakeAsync(() => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    component.registerForm.setValue({ email, password });
    mockAuthService.registerEmailAndPass.and.returnValue(throwError('Registration failed'));

    // Act
    component.registerWithEmailAndPass();
    tick();

    // Assert
    expect(mockAuthService.registerEmailAndPass).toHaveBeenCalledWith({ email, password });
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  }));
});

