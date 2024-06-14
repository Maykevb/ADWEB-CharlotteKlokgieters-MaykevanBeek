import { TestBed } from '@angular/core/testing';
import { HuishoudboekjeService } from './huishoudboekje.service';

describe('HuishoudboekjeService', () => {
  let service: HuishoudboekjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuishoudboekjeService]
    });
    service = TestBed.inject(HuishoudboekjeService);
  });

  it('should be created', () => {
    // Asserts
    expect(service).toBeTruthy();
  });
});
