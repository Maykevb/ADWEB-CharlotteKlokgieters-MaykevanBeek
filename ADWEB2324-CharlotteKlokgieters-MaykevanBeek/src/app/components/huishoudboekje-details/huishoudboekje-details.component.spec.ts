import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HuishoudboekjeDetailsComponent } from './huishoudboekje-details.component';
import { CategorieCreeerComponent } from '../categorie-creeer/categorie-creeer.component';
import { SaldoCreeerComponent } from '../saldo-creeer/saldo-creeer.component';
import { CategorieLijstComponent } from '../categorie-lijst/categorie-lijst.component';
import { SaldoLijstComponent } from '../saldo-lijst/saldo-lijst.component';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs";
import { BaseChartDirective } from "ng2-charts";
import { HuishoudboekjeService } from "../../services/huishoudboekje.service";

describe('HuishoudboekjeDetailsComponent', () => {
  let component: HuishoudboekjeDetailsComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockHuishoudService: jasmine.SpyObj<HuishoudboekjeService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockAuthService = jasmine.createSpyObj('AuthService', { getCurrentUserId: of('test-user-id') });
    mockHuishoudService = jasmine.createSpyObj('HuishoudboekjeService', ['getHuishoudboekje']);

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
        AngularFireAuthModule,
        RouterTestingModule,
        RouterModule,
        BaseChartDirective,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuishoudboekjeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});
