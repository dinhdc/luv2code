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

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(
    private fb: FormBuilder,
    private service: OrderFormService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetail();
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
          ShopValidators.notOnlyWhiteSpace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.fb.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
      }),
      billingAddress: this.fb.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
      }),
      creditCard: this.fb.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
      }),
    });

    // card month

    this.service
      .getCreditCardMonths(new Date().getMonth() + 1)
      .subscribe((data) => (this.creditCardMonths = data));

    this.service
      .getCreditCardYears()
      .subscribe((data) => (this.creditCardYears = data));

    // countries
    this.service.getCountries().subscribe((data) => (this.countries = data));
  }

  reviewCartDetail() {
    this.cartService.totalQuantity.subscribe((data) => this.totalQuantity = data);
    this.cartService.totalPrice.subscribe(
      (data) => (this.totalPrice = data)
    );
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
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
