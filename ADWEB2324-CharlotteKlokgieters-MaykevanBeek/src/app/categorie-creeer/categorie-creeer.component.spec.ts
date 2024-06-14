import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorieCreeerComponent } from './categorie-creeer.component';

describe('CategorieCreeerComponent', () => {
  let component: CategorieCreeerComponent;
  let fixture: ComponentFixture<CategorieCreeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieCreeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieCreeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
