import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';

export interface ConfirmConfig {
    title?: string;
    alert?: string;
    prompt?: string;
    content?: string[];
    buttons?: string[];
    items?: string[];
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    public title: string;
    public alert: string;
    public prompt: string;
    public content: string[];
    public buttons: string[];
    public items: string[];

    constructor(
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) private data: ConfirmConfig
    ) {
        this.title = this.data.title;
        this.alert = this.data.alert;
        this.content = this.data.content || [];
        this.items = this.data.items;
        this.prompt = this.data.prompt || this.translate.instant('Message_confirmContinue');
        this.buttons = this.data.buttons || [
            this.translate.instant('Common_Continue'),
            this.translate.instant('Common_Cancel')
        ];
    }

    public ngOnInit(): void {

    }
}
