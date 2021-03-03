import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-password-requirements',
    templateUrl: './password-requirements.component.html',
    styleUrls: ['./password-requirements.component.scss']
})
export class PasswordRequirementsComponent {
    @Input()
    public control: AbstractControl;

    @Input()
    public showNoMatch: boolean;

    @Input()
    public showMinlength: boolean;

    @Input()
    public showLowercase: boolean;

    @Input()
    public showUppercase: boolean;

    @Input()
    public showNumber: boolean;

    @Input()
    public showSpecialCharacter: boolean;
}
