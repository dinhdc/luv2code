import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {

    // whitespace validator
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors{
        if((control.value != null) && (control.value.trim().length === 0)){
            return {'notOnlyWhiteSpace': true};
        }
        return { 'notOnlyWhiteSpace': null};
    }
}
