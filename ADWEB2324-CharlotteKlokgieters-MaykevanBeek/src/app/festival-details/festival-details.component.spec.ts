import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalDetailsComponent } from './festival-details.component';
import { ActivatedRoute } from '@angular/router';

describe('FestivalDetailsComponent', () => {
  let component: FestivalDetailsComponent;
  let fixture: ComponentFixture<FestivalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
