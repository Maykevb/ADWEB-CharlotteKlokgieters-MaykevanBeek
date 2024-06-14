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
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle sign in failure', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'testpassword';
    component.signInForm.setValue({ email, password });

    const errorMessage = 'Authentication failed';
    mockAuthService.signInEmailAndPass.and.returnValue(Promise.reject(errorMessage));

    spyOn(console, 'error');

    component.signInWithEmailAndPass();
    tick(); // Wacht tot asynchrone taken zijn voltooid

    expect(mockAuthService.signInEmailAndPass).toHaveBeenCalledWith({ email, password });
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  }));
});
