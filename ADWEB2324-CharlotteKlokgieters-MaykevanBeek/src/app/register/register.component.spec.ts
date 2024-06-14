import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import firebase from 'firebase/app';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['registerEmailAndPass']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle registration failure', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'testpassword';
    component.registerForm.setValue({ email, password });

    const errorMessage = 'Registration failed';
    mockAuthService.registerEmailAndPass.and.returnValue(Promise.reject(errorMessage));

    spyOn(console, 'error');

    component.registerWithEmailAndPass();
    tick(); // Wait for async tasks to complete

    expect(mockAuthService.registerEmailAndPass).toHaveBeenCalledWith({ email, password });
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled(); // Ensure router was not navigated
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  }));
});
