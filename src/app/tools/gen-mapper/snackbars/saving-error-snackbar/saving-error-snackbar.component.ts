import { Component } from '@angular/core';
import { MatLegacySnackBarConfig as MatSnackBarConfig, MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition, MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';

export class SavingErrorSnackBarConfig extends MatSnackBarConfig {
    public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    public panelClass = 'white-snack-bar';
}

@Component({
    selector: 'app-saving-error-snackbar',
    templateUrl: './saving-error-snackbar.component.html',
    styleUrls: ['./saving-error-snackbar.component.scss']
})
export class SavingErrorSnackbarComponent {
    constructor(private snackbarRef: MatSnackBarRef<SavingErrorSnackbarComponent>) { }

    public close(): void {
        this.snackbarRef.dismiss();
    }
}
