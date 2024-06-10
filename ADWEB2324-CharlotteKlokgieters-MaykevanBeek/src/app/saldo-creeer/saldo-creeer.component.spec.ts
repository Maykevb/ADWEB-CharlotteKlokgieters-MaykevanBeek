import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCreeerComponent } from './saldo-creeer.component';

describe('SaldoCreeerComponent', () => {
  let component: SaldoCreeerComponent;
  let fixture: ComponentFixture<SaldoCreeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaldoCreeerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaldoCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
