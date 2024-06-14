import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HuishoudboekjeDetailsComponent } from './huishoudboekje-details.component';
import { CategorieCreeerComponent } from '../categorie-creeer/categorie-creeer.component';
import { SaldoCreeerComponent } from '../saldo-creeer/saldo-creeer.component';
import { CategorieLijstComponent } from '../categorie-lijst/categorie-lijst.component';
import { SaldoLijstComponent } from '../saldo-lijst/saldo-lijst.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { HuishoudboekjeService } from '../huishoudboekje.service';
import { of } from 'rxjs';

describe('HuishoudboekjeDetailsComponent', () => {
  let component: HuishoudboekjeDetailsComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsComponent>;
  let mockActivatedRoute: any;
  let authServiceMock: Partial<AuthService>;
  let huishoudServiceMock: Partial<HuishoudboekjeService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'test-id'
        }
      }
    };

    authServiceMock = {
      getCurrentUserId: () => of('mock-user-id')
    };

    huishoudServiceMock = {
      getHuishoudboekje: (id: string) => of({ ownerId: 'mock-owner-id' })
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: authServiceMock },
        { provide: HuishoudboekjeService, useValue: huishoudServiceMock }
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

  it('should initialize ownerId with mock user id', () => {
    expect(component.ownerId).toEqual('mock-user-id');
  });

  it('should initialize huidigHuishoudboekjeOwner with mock owner id', () => {
    expect(component.huidigHuishoudboekjeOwner).toEqual('mock-owner-id');
  });
});

