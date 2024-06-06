import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCreateComponent } from './festival-create.component';
import { FormsModule } from '@angular/forms';
import { FestivalService } from '../festival.service';
import { Festival } from '../models/festival.model';

let festivalService = { addFestival: () => {} };

describe('FestivalCreateComponent', () => {
  let component: FestivalCreateComponent;
  let fixture: ComponentFixture<FestivalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalCreateComponent],
      imports: [FormsModule],
      providers: [{ provide: FestivalService, useValue: festivalService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FestivalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addFestival', () => {
    component.festival = new Festival("", "name", "", "");

    let spy = spyOn(festivalService, 'addFestival');

    component.onAdd();

    expect(spy).toHaveBeenCalled();
  });
});
