import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuishoudboekjeCreeerComponent } from './huishoudboekje-creeer.component';

describe('HuishoudboekjeCreeerComponent', () => {
  let component: HuishoudboekjeCreeerComponent;
  let fixture: ComponentFixture<HuishoudboekjeCreeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuishoudboekjeCreeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuishoudboekjeCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
