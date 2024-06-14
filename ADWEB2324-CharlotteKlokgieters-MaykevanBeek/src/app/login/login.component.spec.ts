import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['signInEmailAndPass']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signInForm.valid).toBeFalsy();
  });

  it('form validity', () => {
    // Arrange
    let errors = {};
    const email = component.signInForm.controls['email'];
    const password = component.signInForm.controls['password'];

    // Act
    email.setValue('test@test.com');
    password.setValue('123456');
    errors = component.signInForm.errors || {};

    // Assert
    expect(component.signInForm.valid).toBeTruthy();
    expect(errors).toEqual({});
  });

  it('should call signInWithEmailAndPass method', () => {
    // Arrange
    const userData = { email: 'test@test.com', password: '123456' };
    component.signInForm.setValue(userData);

    mockAuthService.signInEmailAndPass.and.returnValue(of({}));

    // Act
    component.signInWithEmailAndPass();

    // Assert
    expect(mockAuthService.signInEmailAndPass).toHaveBeenCalledWith(userData);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('huishoudboekjes-overzicht');
  });

  it('should handle invalid form submission', () => {
    // Arrange
    component.signInForm.setValue({ email: '', password: '' });

    // Act
    component.signInWithEmailAndPass();

    // Assert
    expect(mockAuthService.signInEmailAndPass).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should handle sign-in error', fakeAsync(() => {
    // Arrange
    const userData = { email: 'test@test.com', password: '123456' };
    component.signInForm.setValue(userData);
    mockAuthService.signInEmailAndPass.and.returnValue(throwError('Invalid credentials'));

    // Act
    component.signInWithEmailAndPass();
    tick();

    // Assert
    expect(mockAuthService.signInEmailAndPass).toHaveBeenCalledWith(userData);
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  }));
});
