import { ValidatorFn, Validators } from '@angular/forms';

export enum htmlInputTypes {
    text,
    number,
    email,
    website,
    date
}

export class ValidationUtils {
    public static readonly maxTextFieldLength = 255;
    public static readonly maxNumberSize = 1000000000;
    public static readonly maxWebsiteLength = 2048;
    // tslint:disable-next-line
    public static readonly urlRegEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    // tslint:disable-next-line
    public static readonly emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    public static getDefaultInputValidators(type: htmlInputTypes, required: boolean = false): Array<ValidatorFn> {
        const validators = new Array<ValidatorFn>();

        if (required) {
            validators.push(Validators.required);
        }

        switch (type) {
            case htmlInputTypes.website:
                validators.push(Validators.pattern(ValidationUtils.urlRegEx));
                validators.push(Validators.maxLength(ValidationUtils.maxWebsiteLength));
                break;

            case htmlInputTypes.number:
                validators.push(Validators.max(ValidationUtils.maxNumberSize));
                break;

            case htmlInputTypes.text:
                validators.push(Validators.maxLength(ValidationUtils.maxTextFieldLength));
                break;

            case htmlInputTypes.email:
                validators.push(Validators.pattern(ValidationUtils.emailRegEx));
                break;
        }

        return validators;
    }
}
