import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmConfig {
    title?: string;
    alert?: string;
    prompt?: string;
    content?: string[];
    buttons?: string[];
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

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: ConfirmConfig
    ) {
        this.title = this.data.title;
        this.alert = this.data.alert;
        this.content = this.data.content || [];
        this.prompt = this.data.prompt || 'Are you sure you want to continue?';
        this.buttons = this.data.buttons || ['Continue', 'Cancel'];
    }

    public ngOnInit(): void {

    }
}
