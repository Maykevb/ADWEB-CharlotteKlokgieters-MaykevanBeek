import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { SaldoLijstComponent } from './saldo-lijst.component';
import { SaldoService } from '../../services/saldo.service';
import { of } from 'rxjs';
import { Saldo } from '../../models/saldo.model';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from "ng2-charts";

class MockSaldoService {
  getInkomsten(huishoudboekje: string | null | undefined) {
    return of([
      { id: '1', bedrag: 100, huishoudboekje: 'A', datum: '2024-05-01' },
      { id: '2', bedrag: 50, huishoudboekje: 'A', datum: '2024-05-05' },
      { id: '3', bedrag: 75, huishoudboekje: 'A', datum: '2024-06-01' },
    ]);
  }

  getUitgaven(huishoudboekje: string | null | undefined) {
    return of([
      { id: '4', bedrag: -25, huishoudboekje: 'A', datum: '2024-05-10' },
      { id: '5', bedrag: -30, huishoudboekje: 'A', datum: '2024-06-05' },
    ]);
  }

  updateSaldo(saldo: Saldo) { }

  deleteSaldo(saldo: Saldo) { }
}

describe('SaldoLijstComponent', () => {
  let component: SaldoLijstComponent;
  let fixture: ComponentFixture<SaldoLijstComponent>;
  let mockService: MockSaldoService;

  beforeEach(async () => {
    mockService = new MockSaldoService();

    await TestBed.configureTestingModule({
      declarations: [SaldoLijstComponent],
      providers: [
        { provide: SaldoService, useValue: mockService }
      ],
      imports: [
        FormsModule,
        BaseChartDirective,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should fetch inkomsten and uitgaven on ngOnInit', () => {
    // Arrange
    component.huishoudboekje = 'A';

    // Act
    component.ngOnInit();

    // Assert
    expect(component.inkomsten.length).toBe(3);
    expect(component.uitgaven.length).toBe(2);
  });

  it('should filter data by selected month', () => {
    // Arrange
    component.huishoudboekje = 'A';
    component.ngOnInit();

    component.selectedMonth = '2024-05';
    component.filterByMonth();

    expect(component.filterInkomsten.length).toBe(2);
    expect(component.filterUitgaven.length).toBe(1);

    // Act
    component.selectedMonth = '2024-06';
    component.filterByMonth();

    // Assert
    expect(component.filterInkomsten.length).toBe(1);
    expect(component.filterUitgaven.length).toBe(1);
  });

  it('should calculate totals correctly', () => {
    // Arrange
    component.huishoudboekje = 'A';
    component.selectedMonth = '2024-05';

    // Act
    component.ngOnInit();
    component.filterByMonth();
    component.getTotals();

    // Assert
    expect(component.totalInkomsten).toBe(150);
    expect(component.totalUitgaven).toBe(-25);
    expect(component.totalSaldo).toBe(125);
  });

  it('should generate chart data correctly', () => {
    // Arrange
    component.huishoudboekje = 'A';
    component.ngOnInit();
    component.selectedMonth = '2024-05';
    component.filterByMonth();

    // Act
    component.generateChartData();

    // Assert
    // @ts-ignore
    expect(component.ChartData.labels.length).toBe(2);
    expect(component.ChartData.datasets.length).toBe(2);
    expect(component.ChartData.datasets[0].data.length).toBe(2);
    expect(component.ChartData.datasets[1].data.length).toBe(1);
  });

  it('should generate bar chart data correctly', () => {
    // Arrange
    component.huishoudboekje = 'A';
    component.ngOnInit();
    component.selectedMonth = '2024-05';
    component.filterByMonth();

    // Act
    component.generateBarChartData();

    // Assert
    // @ts-ignore
    expect(component.barChartData.labels.length).toBe(1);
    expect(component.barChartData.datasets.length).toBe(1);
    expect(component.barChartData.datasets[0].data.length).toBe(1);
  });
});

