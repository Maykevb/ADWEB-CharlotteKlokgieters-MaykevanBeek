import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HuishoudboekjeCreeerComponent } from './huishoudboekje-creeer.component';
import { HuishoudboekjeService } from '../../services/huishoudboekje.service';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs";

describe('HuishoudboekjeCreeerComponent', () => {
  let component: HuishoudboekjeCreeerComponent;
  let fixture: ComponentFixture<HuishoudboekjeCreeerComponent>;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService', ['addHuishoudboekje']);
    mockAuthService = jasmine.createSpyObj('AuthService', { getCurrentUserId: of('test-user-id') });

    await TestBed.configureTestingModule({
      declarations: [HuishoudboekjeCreeerComponent],
      imports: [
        FormsModule,
        AngularFireAuthModule,
      ],
      providers: [
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService },
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuishoudboekjeCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize huishoudboekje correctly', () => {
    // Assert
    expect(component.huishoudboekje).toBeDefined();
    expect(component.huishoudboekje.naam).toEqual('');
    expect(component.huishoudboekje.omschrijving).toEqual('');
  });

  it('should add huishoudboekje when naam is not empty', () => {
    // Arrange
    component.huishoudboekje.naam = 'Test Huishoudboekje';

    // Act
    component.onAdd();

    // Assert
    const expectedHuishoudboekje = {
      id: '',
      naam: 'Test Huishoudboekje',
      omschrijving: '',
      gearchiveerd: false,
      ownerId: 'test-user-id'
    };

    expect(mockHuishoudboekjeService.addHuishoudboekje)
      .toHaveBeenCalledWith(jasmine.objectContaining(expectedHuishoudboekje));
    expect(component.huishoudboekje.naam).toEqual('');
  });

  it('should not add huishoudboekje when naam is empty', () => {
    // Arrange
    component.huishoudboekje.naam = '';

    // Act
    component.onAdd();

    // Assert
    expect(mockHuishoudboekjeService.addHuishoudboekje).not.toHaveBeenCalled();
    expect(component.huishoudboekje.naam).toEqual('');
  });

  it('should initialize ownerId and huishoudboekje correctly on ngOnInit', () => {
    // Arrange
    const userId = 'test-user-id';
    mockAuthService.getCurrentUserId.and.returnValue(of(userId));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(component.ownerId).toEqual(userId);
    expect(component.huishoudboekje).toEqual(jasmine.objectContaining({
      naam: '',
      omschrijving: '',
      ownerId: userId
    }));
  });
});
