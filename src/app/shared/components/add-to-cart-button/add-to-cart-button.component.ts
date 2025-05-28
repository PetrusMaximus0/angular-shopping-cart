import {Component, inject, input, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import clamp from '../../utils/clamp';
import {CartService} from '../../services/cart/cart.service';
import {IProduct} from '../../interfaces/IProduct';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})

export class AddToCartButtonComponent {
  private cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
    this.addItemsForm = this.fb.group({
      itemNumber: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          (control : FormControl)=> {
            return Number.isInteger(control.value) ? null : {...control.errors, error: "Not a whole number" }
          },
        ]
      ],
      hiddenSecret: "Abracadabra"
    })

    // Leave this here as an example.
    this.addItemsForm
      .get("itemNumber")?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          //console.log(this.addItemsForm.get("itemNumber")?.errors)
        }
      })
  }

  private fb = inject(FormBuilder);

  public addItemsForm: FormGroup;

  protected altBtnText = signal<string|null>(null);

  protected btnText = input<string>("add");

  public itemData = input.required<IProduct>();

  protected handleSubmit(){
    // use cart service to update the number of items on cart.
    // Only add to the cart if the number of items of this kind in the cart is less than 10.

    this.cartService.addItemToCart(this.itemData(), this.addItemsForm.value.itemNumber);
    this.altBtnText.set("Item Added");
    this.addItemsForm.reset({...this.addItemsForm.value, itemNumber: 1});

    const interval = setTimeout(() => {
      this.altBtnText.set(null);
      clearTimeout(interval);
    },2000)
  }

  protected handleIncNum(){
    this.setItemNumber(parseInt(this.addItemsForm.value.itemNumber) + 1);
    this.addItemsForm.get("itemNumber")?.markAsTouched();

  }

  protected handleDecNum() {
    this.setItemNumber(parseInt(this.addItemsForm.value.itemNumber) - 1);
    this.addItemsForm.get("itemNumber")?.markAsTouched();
  }

  private setItemNumber(value: number) {
    if(Number.isNaN(value)) { value = 1 }
    this.addItemsForm.setValue({
      ...this.addItemsForm.value,
      itemNumber: clamp(value, 1, 10),
    })
  }

  protected handleOnFocus($event: FocusEvent) {
    ($event.target as HTMLInputElement).select();
  }
}
