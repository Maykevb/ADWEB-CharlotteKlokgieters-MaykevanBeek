import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorieCreeerComponent } from './categorie-creeer.component';
import { CategorieService } from '../categorie.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockCategorieService {
  getCategorieen() {
    return of([]);
  }

  addCategorie(categorie: any) {
    // Mock implementation
  }
}

describe('CategorieCreeerComponent', () => {
  let component: CategorieCreeerComponent;
  let fixture: ComponentFixture<CategorieCreeerComponent>;
  let mockService: MockCategorieService;

  beforeEach(async () => {
    mockService = new MockCategorieService();

    await TestBed.configureTestingModule({
      declarations: [ CategorieCreeerComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CategorieService, useValue: mockService }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore unrecognized elements and attributes
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
});
