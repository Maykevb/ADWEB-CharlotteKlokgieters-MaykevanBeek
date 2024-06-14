import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaldoLijstComponent } from './saldo-lijst.component';

describe('SaldoLijstComponent', () => {
  let component: SaldoLijstComponent;
  let fixture: ComponentFixture<SaldoLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaldoLijstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaldoLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
