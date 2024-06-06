import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuidshoudboekjeLijstComponent } from './huidshoudboekje-lijst.component';

describe('HuidshoudboekjeLijstComponent', () => {
  let component: HuidshoudboekjeLijstComponent;
  let fixture: ComponentFixture<HuidshoudboekjeLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuidshoudboekjeLijstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuidshoudboekjeLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
