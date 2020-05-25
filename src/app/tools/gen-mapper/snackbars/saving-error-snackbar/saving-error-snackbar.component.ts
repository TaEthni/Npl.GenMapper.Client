import { Component } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef } from '@angular/material';

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
