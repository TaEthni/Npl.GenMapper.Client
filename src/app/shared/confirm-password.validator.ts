import { ValidatorFn, AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(controlKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const password = control.parent.get(controlKey).value;
        const match = password && control.value && password === control.value;
        return !match ? { 'invalidPasswordMatch': true } : null;
    };
}
