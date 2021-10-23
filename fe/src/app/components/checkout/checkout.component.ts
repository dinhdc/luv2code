import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country.interface';
import { State } from 'src/app/common/state.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderFormService } from 'src/app/services/order-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice!: number;
  totalQuantity!: number;

  creditCardMonths!: number[];
  creditCardYears!: number[];

  countries: Country[] = [];
  shippingAddressState!: State;
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(
    private fb: FormBuilder,
    private service: OrderFormService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.fb.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // card month

    this.service
      .getCreditCardMonths(new Date().getMonth() + 1)
      .subscribe((data) => (this.creditCardMonths = data));

    this.service
      .getCreditCardYears()
      .subscribe((data) => (this.creditCardYears = data));

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // countries
    this.service.getCountries().subscribe((data) => (this.countries = data));
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  onSubmit(): void {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
   }

  copyShippingToBilling(event: any): void {
    if (event.target.checked) {
      this.billingAddressStates = this.shippingAddressStates;
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );

    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears(): void {
    console.log('change year');
    const creditCardFormGroup = this.checkoutFormGroup.get(
      'creditCard'
    ) as AbstractControl;

    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.service.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
      (creditCardFormGroup.get('expirationMonth') as AbstractControl).setValue(
        data[0]
      );
    });
  }
  setShippingState(): void {
    const formGroup = this.checkoutFormGroup.get('shippingAddress');
    this.shippingAddressState = formGroup?.value.state;
    console.log(this.shippingAddressState);
  }
  getStates(formGroupName: string): void {
    const formGroup = this.checkoutFormGroup.get(
      formGroupName
    ) as AbstractControl;
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
    console.log(countryName + ' : ' + countryCode);
    this.service.getStatus(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
    });
  }
}
