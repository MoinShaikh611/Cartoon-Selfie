import { TestBed } from '@angular/core/testing';

import { CartoonImageService } from './cartoon-image.service';

describe('CartoonImageService', () => {
  let service: CartoonImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartoonImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
