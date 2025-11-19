import { Component } from '@angular/core';
import { MatLegacySnackBarConfig as MatSnackBarConfig, MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition } from '@angular/material/legacy-snack-bar';

export class SavingSnackBarConfig extends MatSnackBarConfig {
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    panelClass = 'white-snack-bar'
}

@Component({
    selector: 'app-saving-snackbar',
    templateUrl: './saving-snackbar.component.html',
    styleUrls: ['./saving-snackbar.component.scss']
})
export class SavingSnackbarComponent {
    constructor() { }
}
