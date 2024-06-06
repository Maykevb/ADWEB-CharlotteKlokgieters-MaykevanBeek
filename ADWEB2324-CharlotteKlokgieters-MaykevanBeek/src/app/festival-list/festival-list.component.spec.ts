import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalListComponent } from './festival-list.component';
import { FestivalSearchPipe } from '../festival-search.pipe';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FestivalService } from '../festival.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

let festivalService = { getFestivals: () => of([{ name: 'Test festival 1' }, { name: 'Test festival 2' }, { name: 'Test festival 3' }]) }

describe('FestivalListComponent', () => {
  let component: FestivalListComponent;
  let fixture: ComponentFixture<FestivalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalListComponent, FestivalSearchPipe],
      imports: [FormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },
        { provide: FestivalService, useValue: festivalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FestivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Test festival', () => {
    expect(component.festivals.length).toEqual(3);
    expect(component.festivals[0].name).toEqual('Test festival 1');
    expect(component.festivals[1].name).toEqual('Test festival 2');
    expect(component.festivals[2].name).toEqual('Test festival 3');
  });

  it('should render Test festival', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('a')[0].textContent).toContain('Test festival 1');
    expect(compiled.querySelectorAll('a')[1].textContent).toContain('Test festival 2');
    expect(compiled.querySelectorAll('a')[2].textContent).toContain('Test festival 3');
  });
});
