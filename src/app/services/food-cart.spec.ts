import { TestBed } from '@angular/core/testing';

import { FoodCart } from './food-cart';

describe('FoodCart', () => {
  let service: FoodCart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
