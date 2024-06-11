import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieLijstComponent } from './categorie-lijst.component';

describe('CategorieLijstComponent', () => {
  let component: CategorieLijstComponent;
  let fixture: ComponentFixture<CategorieLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieLijstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
