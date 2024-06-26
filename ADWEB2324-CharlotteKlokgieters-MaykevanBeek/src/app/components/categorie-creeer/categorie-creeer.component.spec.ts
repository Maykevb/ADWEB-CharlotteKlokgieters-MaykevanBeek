import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorieCreeerComponent } from './categorie-creeer.component';
import { CategorieService } from '../../services/categorie.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthService } from "../../services/auth.service";

class MockCategorieService {
  getCategorieen() {
    return of([]);
  }

  addCategorie = jasmine.createSpy('addCategorie');
}

describe('CategorieCreeerComponent', () => {
  let component: CategorieCreeerComponent;
  let fixture: ComponentFixture<CategorieCreeerComponent>;
  let mockService: MockCategorieService;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockService = new MockCategorieService();
    mockAuthService = jasmine.createSpyObj('AuthService', {
      getCurrentUserId: of('test-user-id')
    });

    await TestBed.configureTestingModule({
      declarations: [ CategorieCreeerComponent ],
      imports: [
        FormsModule,
        AngularFireAuthModule,
      ],
      providers: [
        { provide: CategorieService, useValue: mockService },
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should not add category when name is empty', () => {
    // Arrange
    component.categorie.naam = '';

    // Act
    component.onAdd();

    // Assert
    expect(mockService.addCategorie).not.toHaveBeenCalled();
    expect(component.categorie.naam).toEqual('');
  });

  it('should add category when name is not empty', async () => {
    // Arrange
    component.categorie.naam = 'test';
    component.categorie.budget = 5;
    mockService.addCategorie.and.returnValue(Promise.resolve());

    // Act
    component.onAdd();

    // Assert
    expect(mockService.addCategorie).toHaveBeenCalled();
    expect(component.categorie.naam).toEqual('test');
  });
});
