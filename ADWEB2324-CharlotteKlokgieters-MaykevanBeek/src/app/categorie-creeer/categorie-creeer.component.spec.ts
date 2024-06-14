import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorieCreeerComponent } from './categorie-creeer.component';
import { CategorieService } from '../categorie.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthService } from "../auth.service";

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
    expect(component).toBeTruthy();
  });

  it('should not add category when name is empty', () => {
    component.categorie.naam = '';

    component.onAdd();

    expect(mockService.addCategorie).not.toHaveBeenCalled();

    expect(component.categorie.naam).toEqual('');
  });

  it('should add category when name is not empty', async () => {
    component.categorie.naam = 'test';

    mockService.addCategorie.and.returnValue(Promise.resolve());

    component.onAdd();

    expect(mockService.addCategorie).toHaveBeenCalled();
    expect(component.categorie.naam).toEqual('test');
  });
});
