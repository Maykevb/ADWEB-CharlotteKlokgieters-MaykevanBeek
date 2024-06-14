import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from '@angular/forms';
import { Categorie } from "../models/categorie.model";
import { CategorieService } from '../categorie.service';
import { SaldoService } from "../saldo.service";
import { of } from "rxjs";
import { CategorieLijstComponent } from "./categorie-lijst.component";

describe('CategorieLijstComponent', () => {
  let component: CategorieLijstComponent;
  let fixture: ComponentFixture<CategorieLijstComponent>;
  let mockCategorieService: jasmine.SpyObj<CategorieService>;
  let mockSaldoService: jasmine.SpyObj<SaldoService>;

  beforeEach(async () => {
    mockCategorieService = jasmine.createSpyObj('CategorieService',
      ['getCategorieen', 'updateCategorie', 'deleteCategorie']);
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
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize categorieen correctly on ngOnInit', () => {
    // Arrange
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

    // Act
    component.huishoudboekje = 'test-huishoudboekje';
    component.ngOnInit();

    // Assert
    expect(component.categorieen).toEqual(mockCategorieen);
    expect(mockCategorieService.getCategorieen).toHaveBeenCalledWith('test-huishoudboekje');
  });

  it('should toggle edit mode of categorie', () => {
    // Arrange
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: false,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    // Act
    component.toggleEdit(mockCategorie);

    // Assert
    expect(mockCategorie.editMode).toBe(true);

    // Act
    component.toggleEdit(mockCategorie);

    // Assert
    expect(mockCategorie.editMode).toBe(false);
  });

  it('should save categorie when valid', () => {
    // Arrange
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: true,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    // Act
    component.onSave(mockCategorie);

    // Assert
    expect(mockCategorie.editMode).toBe(false);
  });

  it('should delete categorie', () => {
    // Arrange
    const mockCategorie: Categorie = {
      id: '1', naam: 'Category 1', budget: 100, eindDatum: null, editMode: false,
      huidigBudget: 0,
      huishoudboekje: undefined,
      ownerId: undefined
    };

    // Act
    component.onDelete(mockCategorie);

    // Assert
    expect(mockCategorieService.deleteCategorie).toHaveBeenCalledWith(mockCategorie);
  });

  it('should call preventDefault on dragOver event', () => {
    // Arrange
    const event = document.createEvent('DragEvent');
    event.initEvent('dragover', true, true);
    const preventDefaultSpy = spyOn(event, 'preventDefault');

    // Act
    component.dragOver(event);

    // Assert
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should call preventDefault on dragEnter event', () => {
    // Arrange
    const event = document.createEvent('DragEvent');
    event.initEvent('dragover', true, true);
    const preventDefaultSpy = spyOn(event, 'preventDefault');

    // Act
    component.dragEnter(event);

    // Assert
    expect(preventDefaultSpy).toHaveBeenCalled();
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
