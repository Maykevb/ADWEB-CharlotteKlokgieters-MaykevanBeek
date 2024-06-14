import { CategorieLijstComponent } from "./categorie-lijst.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Categorie } from "../models/categorie.model";
import { CategorieService } from '../categorie.service';
import { SaldoService } from "../saldo.service";
import { of } from "rxjs";
import { FormsModule } from '@angular/forms';
import {Saldo} from "../models/saldo.model";

describe('CategorieLijstComponent', () => {
  let component: CategorieLijstComponent;
  let fixture: ComponentFixture<CategorieLijstComponent>;
  let mockCategorieService: jasmine.SpyObj<CategorieService>;
  let mockSaldoService: jasmine.SpyObj<SaldoService>;

  beforeEach(async () => {
    mockCategorieService = jasmine.createSpyObj('CategorieService', ['getCategorieen', 'updateCategorie', 'deleteCategorie']);
    mockSaldoService = jasmine.createSpyObj('SaldoService', ['updateCategorieOfSaldo']);

    mockCategorieService.getCategorieen.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [CategorieLijstComponent],
      imports: [FormsModule],
      providers: [
        { provide: CategorieService, useValue: mockCategorieService },
        { provide: SaldoService, useValue: mockSaldoService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categorieen correctly on ngOnInit', () => {
    const mockCategorieen: Categorie[] = [
      {
        id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: false,
        huidigBudget: 0,
        huishoudboekje: undefined,
        ownerId: undefined
      },
      {
        id: '2', naam: 'Category 2', budget: 200, eindDatum: null, editMode: false,
        huidigBudget: 0,
        huishoudboekje: undefined,
        ownerId: undefined
      }
    ];

    mockCategorieService.getCategorieen.and.returnValue(of(mockCategorieen));

    component.huishoudboekje = 'test-huishoudboekje';
    component.ngOnInit();

    expect(component.categorieen).toEqual(mockCategorieen);
    expect(mockCategorieService.getCategorieen).toHaveBeenCalledWith('test-huishoudboekje');
  });

  it('should toggle edit mode of categorie', () => {
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: false,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    component.toggleEdit(mockCategorie);
    expect(mockCategorie.editMode).toBe(true);

    component.toggleEdit(mockCategorie);
    expect(mockCategorie.editMode).toBe(false);
  });

  it('should save categorie when valid', () => {
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: true,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    component.onSave(mockCategorie);

    expect(mockCategorie.editMode).toBe(false);
  });

  it('should delete categorie', () => {
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: false,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    component.onDelete(mockCategorie);

    expect(mockCategorieService.deleteCategorie).toHaveBeenCalledWith(mockCategorie);
  });

  it('should call preventDefault on dragOver event', () => {
    const event = document.createEvent('DragEvent');
    event.initEvent('dragover', true, true);
    const preventDefaultSpy = spyOn(event, 'preventDefault');

    component.dragOver(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should call preventDefault on dragEnter event', () => {
    const event = document.createEvent('DragEvent');
    event.initEvent('dragover', true, true);
    const preventDefaultSpy = spyOn(event, 'preventDefault');

    component.dragEnter(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
