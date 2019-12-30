import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material';

export class SavingErrorSnackBarConfig extends MatSnackBarConfig {
    public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    public panelClass = 'white-snack-bar';
}

@Component({
    selector: 'app-saving-error-snackbar',
    templateUrl: './saving-error-snackbar.component.html',
    styleUrls: ['./saving-error-snackbar.component.scss']
})
export class SavingErrorSnackbarComponent implements OnInit {
    constructor() { }
    public ngOnInit(): void {
    }
}
