import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuishoudboekjeDetailsComponent } from './huishoudboekje-details.component';

describe('HuishoudboekjeDetailsComponent', () => {
  let component: HuishoudboekjeDetailsComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuishoudboekjeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuishoudboekjeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
