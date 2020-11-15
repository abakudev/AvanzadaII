import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
export class CustomValidators {

    static forbiddenWords(forbiddenWords: RegExp): ValidatorFn {        
        return (control: AbstractControl): {[key: string]: any} | null => {
          const forbidden = forbiddenWords.test(control.value);

          return forbidden ? { 'forbiddenWords': {value: control.value} } : null;
        };
    }
    
    static numbersOnly(): ValidatorFn {
        let regExp: RegExp = /^[0-9]*$/;

        return (control: AbstractControl): {[key: string]: any} | null => {
            const lettersOnly = regExp.test(control.value);

            return !lettersOnly ? { 'numbersOnly': {value: control.value} } : null;
        };
    }



}
