import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { LowerCasePattern, NumberPattern, SpecialCharacterPattern, UpperCasePattern } from './utils';

// we don't check for string here so it also works with arrays
export const IsEmptyInputValue = (value: any): boolean => value == null || value.length === 0;

// non-strict comparison is intentional, to check for both `null` and `undefined` values
export const HasValidLength = (value: any): boolean => value != null && typeof value.length === 'number';

export const LowerCaseValidator = (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (!LowerCasePattern.test(control.value)) {
        return { lowerCase: true };
    }

    return null;
};

export const UpperCaseValidator = (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (!UpperCasePattern.test(control.value)) {
        return { upperCase: true };
    }
    return null;
};

export const NumberValidator = (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (!NumberPattern.test(control.value)) {
        // eslint-disable-next-line id-blacklist
        return { number: true };
    }
    return null;
};

export const SpecialCharacterValidator = (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (!SpecialCharacterPattern.test(control.value)) {
        return { specialCharacter: true };
    }

    return null;
};

export const NoWhitespaceValidator = (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (/\s/g.test(control.value)) {
        return { whitespace: true };
    }

    return null;
};

export const ControlMatchValidator = (siblingControlName: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    if (control.parent?.get(siblingControlName)?.value !== control.value) {
        return { noMatch: true };
    }

    return null;
};


export const UniqueTextValidator = (strings: string[]): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    if (IsEmptyInputValue(control.value) || !HasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
    }

    const name = control.value.toLowerCase();
    const found = strings.indexOf(name) > -1;

    if (found) {
        return { duplicateText: true };
    }

    return null;
};

