import {Component, inject, input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})

export class AddToCartButtonComponent {
  constructor() {
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

  protected altBtnText = input<string>("");

  protected btnText = input<string>("add");

  protected handleSubmit(){
    // use cart service to update the number of items on cart.
    // Only add to the cart if the number of items of this kind in the cart is less than 10.
    alert("Added " + this.addItemsForm.value.itemNumber + " units to cart");
    this.addItemsForm.reset({...this.addItemsForm.value, itemNumber: 1});
  }

  protected handleIncNum(){
    this.setItemNumber(parseInt(this.addItemsForm.value.itemNumber) + 1);
    this.addItemsForm.get("itemNumber")?.markAsTouched();

  }

  protected handleDecNum() {
    this.setItemNumber(parseInt(this.addItemsForm.value.itemNumber) - 1);
    this.addItemsForm.get("itemNumber")?.markAsTouched();
  }

  private clamp(value: number, min: number, max: number) {
    return (Math.max(Math.min(value, max), min));
  }

  private setItemNumber(value: number) {
    if(Number.isNaN(value)) { value = 1 }
    this.addItemsForm.setValue({
      ...this.addItemsForm.value,
      itemNumber:this.clamp(value, 1, 10),
    })
  }
}
