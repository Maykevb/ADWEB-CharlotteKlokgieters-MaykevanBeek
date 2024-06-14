import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HuidshoudboekjeLijstComponent } from './huidshoudboekje-lijst.component';
import { HuishoudboekjeService } from '../../services/huishoudboekje.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { Huishoudboekje } from '../../models/huishoudboekje.model';
import { HuishoudboekjeCreeerComponent } from "../huishoudboekje-creeer/huishoudboekje-creeer.component";
import { HuishoudboekjeZoekPipe } from "../../services/huishoudboekje-zoek.pipe";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

describe('HuidshoudboekjeLijstComponent', () => {
  let component: HuidshoudboekjeLijstComponent;
  let fixture: ComponentFixture<HuidshoudboekjeLijstComponent>;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockHuishoudboekjes: Huishoudboekje[] = [
    { id: '1', naam: 'Testboekje 1', omschrijving: 'Dit is testboekje 1', gearchiveerd: false, editMode: false, ownerId: '1' },
    { id: '2', naam: 'Testboekje 2', omschrijving: 'Dit is testboekje 2', gearchiveerd: true, editMode: false, ownerId: '1'}
  ];

  beforeEach(async () => {
    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService',
      ['getHuishoudboekjes', 'updateHuishoudboekje']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['signOut', 'getCurrentUserId']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [
        HuidshoudboekjeLijstComponent,
        HuishoudboekjeCreeerComponent,
        HuishoudboekjeZoekPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterModule,
        HttpClientModule,
        AngularFireAuthModule
      ],
      providers: [
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuidshoudboekjeLijstComponent);
    component = fixture.componentInstance;

    mockHuishoudboekjeService.getHuishoudboekjes.and.returnValue(of(mockHuishoudboekjes));
    mockAuthService.getCurrentUserId.and.returnValue(of('mockUserId'));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize with activeTab set to "active"', () => {
    // Assert
    expect(component.activeTab).toEqual('active');
  });

  it('should fetch huishoudboekjes on component initialization', () => {
    // Assert
    expect(component.huishoudboekjes).toEqual(mockHuishoudboekjes);
  });

  it('should switch activeTab correctly', () => {
    // Act
    component.setActiveTab('archived');

    // Assert
    expect(component.activeTab).toEqual('archived');
  });

  it('should toggle edit mode of huishoudboekje', () => {
    // Arrange
    const testHuishoudboekje = mockHuishoudboekjes[0];

    // Act
    component.toggleEdit(testHuishoudboekje);

    // Assert
    expect(testHuishoudboekje.editMode).toBeTrue();

    // Act
    component.toggleEdit(testHuishoudboekje);

    // Assert
    expect(testHuishoudboekje.editMode).toBeFalse();
  });

  it('should save changes to huishoudboekje', () => {
    // Arrange
    const testHuishoudboekje = mockHuishoudboekjes[0];

    // Act
    component.onSave(testHuishoudboekje);

    // Assert
    expect(testHuishoudboekje.editMode).toBeFalse();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);
  });

  it('should archive/dearchive huishoudboekje', () => {
    // Arrange
    const testHuishoudboekje = mockHuishoudboekjes[0];

    // Act
    component.onArchive(testHuishoudboekje, true);

    // Assert
    expect(testHuishoudboekje.gearchiveerd).toBeTrue();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);

    // Act
    component.onArchive(testHuishoudboekje, false);

    // Assert
    expect(testHuishoudboekje.gearchiveerd).toBeFalse();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);
  });

  it('should call signOut method on logout button click', () => {
    // Arrange
    const logoutButton = fixture.debugElement.nativeElement.querySelector('#log-out-btn');

    // Act
    logoutButton.click();
    fixture.detectChanges();

    // Assert
    expect(mockAuthService.signOut).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    // Arrange
    spyOn(component.subscriptions, 'unsubscribe');

    // Act
    component.ngOnDestroy();

    // Assert
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
