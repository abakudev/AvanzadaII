import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CategoryListComponent } from '../components/category/category-list/category-list.component';
// import { StudentAsyncService } from "../services/student-async.service";

export class CustomValidators {
    static forbiddenWords(forbiddenWords: RegExp): ValidatorFn {        
        return (control: AbstractControl): {[key: string]: any} | null => {
          const forbidden = forbiddenWords.test(control.value);

          return forbidden ? { 'forbiddenWords': {value: control.value} } : null;
        };
    }

    static lettersOnly(): ValidatorFn {
        // let regExp: RegExp = /^[a-zA-Z\s]*$/;
        let regExp: RegExp = /^([^0-9]*)$/;

        return (control: AbstractControl): {[key: string]: any} | null => {                     
            const lettersOnly = regExp.test(control.value);

            return !lettersOnly ? { 'lettersOnly': {value: control.value} } : null;
        };
    }

    static numbersOnly(): ValidatorFn {
        // let regExp: RegExp = /^[a-zA-Z\s]*$/;
        let regExp: RegExp = /^\d{1,3}(\.\d{1,3})?$/;


        return (control: AbstractControl): {[key: string]: any} | null => {                     
            const lettersOnly = regExp.test(control.value);

            return !lettersOnly ? { 'lettersOnly': {value: control.value} } : null;
        };
    }
    
    // static emailExists(studentService: StudentAsyncService): AsyncValidatorFn {       
    //     return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    //       if (control.value == '') {
    //         return null;
    //       }
    //       else {
    //         return studentService.getByEmail(control.value)
    //             .then(response => {
    //                 return response ? { 'emailExists': { value: control.value } } : null;
    //             })
    //       }                  
    //     };
    //   }
}
