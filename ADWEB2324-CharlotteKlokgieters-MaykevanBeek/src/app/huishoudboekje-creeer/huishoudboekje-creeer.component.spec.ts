import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HuishoudboekjeCreeerComponent } from './huishoudboekje-creeer.component';
import { HuishoudboekjeService } from '../huishoudboekje.service';
import { Huishoudboekje } from '../models/huishoudboekje.model';

describe('HuishoudboekjeCreeerComponent', () => {
  let component: HuishoudboekjeCreeerComponent;
  let fixture: ComponentFixture<HuishoudboekjeCreeerComponent>;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;

  beforeEach(async () => {
    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService', ['addHuishoudboekje']);

    await TestBed.configureTestingModule({
      declarations: [HuishoudboekjeCreeerComponent],
      imports: [FormsModule], // Importeer FormsModule voor ngModel binding
      providers: [
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuishoudboekjeCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize huishoudboekje correctly', () => {
    expect(component.huishoudboekje).toBeDefined();
    expect(component.huishoudboekje.naam).toEqual('');
    expect(component.huishoudboekje.omschrijving).toEqual('');
  });
});
