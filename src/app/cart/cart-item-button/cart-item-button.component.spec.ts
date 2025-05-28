import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemButtonComponent } from './cart-item-button.component';

describe('CartItemButtonComponent', () => {
  let component: CartItemButtonComponent;
  let fixture: ComponentFixture<CartItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
