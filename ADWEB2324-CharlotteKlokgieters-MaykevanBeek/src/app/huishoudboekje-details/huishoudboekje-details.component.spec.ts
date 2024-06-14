import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Voeg FormsModule toe
import { ActivatedRoute } from '@angular/router';
import { HuishoudboekjeDetailsComponent } from './huishoudboekje-details.component';
import { CategorieCreeerComponent } from '../categorie-creeer/categorie-creeer.component';
import { SaldoCreeerComponent } from '../saldo-creeer/saldo-creeer.component';
import { CategorieLijstComponent } from '../categorie-lijst/categorie-lijst.component';
import { SaldoLijstComponent } from '../saldo-lijst/saldo-lijst.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HuishoudboekjeDetailsComponent', () => {
  let component: HuishoudboekjeDetailsComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsComponent>;
  let mockActivatedRoute: any; // Declare mockActivatedRoute

  beforeEach(async () => {
    // Create a mock ActivatedRoute with a snapshot of paramMap
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'test-id' // Simulate 'id' parameter in route
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [
        HuishoudboekjeDetailsComponent,
        CategorieCreeerComponent,
        SaldoCreeerComponent,
        CategorieLijstComponent,
        SaldoLijstComponent
      ],
      imports: [
        FormsModule,
        AngularFireAuthModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [
        NO_ERRORS_SCHEMA // Voeg NO_ERRORS_SCHEMA toe aan schemas
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuishoudboekjeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize huidigHuishoudboekjeID with route parameter', () => {
    expect(component.huidigHuishoudboekjeID).toEqual('test-id');
  });
});
