import { Component, OnInit } from '@angular/core';
import { Language, TranslationService } from '../translation.service';
import { DownloadService } from '@core/download.service';

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {

    public languages: Language[] = [];
    public defaultLang: Language;

    constructor(
        private translationService: TranslationService,
        private downloadService: DownloadService
    ) { }

    public ngOnInit(): void {
        this.languages = this.translationService.languages;
        this.defaultLang = this.translationService.defaultLang;
    }
}
