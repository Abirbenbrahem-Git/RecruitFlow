import { TestBed } from '@angular/core/testing';

import { GouvernoratService } from './gouvernorat.service';

describe('GouvernoratService', () => {
  let service: GouvernoratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GouvernoratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
