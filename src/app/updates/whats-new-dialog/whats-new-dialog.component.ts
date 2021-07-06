import { Component, OnInit } from '@angular/core';
import { LANGUAGES } from '@npl-shared/languages.const';

@Component({
    selector: 'app-whats-new-dialog',
    templateUrl: './whats-new-dialog.component.html',
    styleUrls: ['./whats-new-dialog.component.scss']
})
export class WhatsNewDialogComponent implements OnInit {

    public languages = LANGUAGES;

    constructor() { }

    ngOnInit() {
    }
}
