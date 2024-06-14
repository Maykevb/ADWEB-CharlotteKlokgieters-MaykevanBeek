import { TestBed, ComponentFixture } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http'; // Add if HttpClient is used
import { HuidshoudboekjeLijstComponent } from './huidshoudboekje-lijst.component';
import { HuishoudboekjeService } from '../huishoudboekje.service';
import { AuthService } from '../auth.service';
import {Router, RouterModule} from '@angular/router';
import { of } from 'rxjs';
import { Huishoudboekje } from '../models/huishoudboekje.model';
import { HuishoudboekjeCreeerComponent } from "../huishoudboekje-creeer/huishoudboekje-creeer.component";
import { HuishoudboekjeZoekPipe } from "../huishoudboekje-zoek.pipe";

describe('HuidshoudboekjeLijstComponent', () => {
  let component: HuidshoudboekjeLijstComponent;
  let fixture: ComponentFixture<HuidshoudboekjeLijstComponent>;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockHuishoudboekjes: Huishoudboekje[] = [
    { id: '1', naam: 'Testboekje 1', omschrijving: 'Dit is testboekje 1', gearchiveerd: false, editMode: false },
    { id: '2', naam: 'Testboekje 2', omschrijving: 'Dit is testboekje 2', gearchiveerd: true, editMode: false }
  ];

  beforeEach(async () => {
    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService', ['getHuishoudboekjes', 'updateHuishoudboekje']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['signOut']);
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
        HttpClientModule
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

    // Configure mock service behavior
    mockHuishoudboekjeService.getHuishoudboekjes.and.returnValue(of(mockHuishoudboekjes));

    // Detect changes and initialize component
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it('should initialize with activeTab set to "active"', () => {
    expect(component.activeTab).toEqual('active');
  });

  it('should fetch huishoudboekjes on component initialization', () => {
    expect(component.huishoudboekjes).toEqual(mockHuishoudboekjes);
  });

  it('should switch activeTab correctly', () => {
    component.setActiveTab('archived');
    expect(component.activeTab).toEqual('archived');
  });

  it('should toggle edit mode of huishoudboekje', () => {
    const testHuishoudboekje = mockHuishoudboekjes[0];
    component.toggleEdit(testHuishoudboekje);
    expect(testHuishoudboekje.editMode).toBeTrue();

    component.toggleEdit(testHuishoudboekje);
    expect(testHuishoudboekje.editMode).toBeFalse();
  });

  it('should save changes to huishoudboekje', () => {
    const testHuishoudboekje = mockHuishoudboekjes[0];
    component.onSave(testHuishoudboekje);
    expect(testHuishoudboekje.editMode).toBeFalse();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);
  });

  it('should archive/dearchive huishoudboekje', () => {
    const testHuishoudboekje = mockHuishoudboekjes[0];

    // Archive
    component.onArchive(testHuishoudboekje, true);
    expect(testHuishoudboekje.gearchiveerd).toBeTrue();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);

    // De-archive
    component.onArchive(testHuishoudboekje, false);
    expect(testHuishoudboekje.gearchiveerd).toBeFalse();
    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(testHuishoudboekje);
  });

  it('should call signOut method on logout button click', () => {
    const logoutButton = fixture.debugElement.nativeElement.querySelector('#log-out-btn');
    logoutButton.click();
    fixture.detectChanges();

    expect(mockAuthService.signOut).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
  });*/
});
