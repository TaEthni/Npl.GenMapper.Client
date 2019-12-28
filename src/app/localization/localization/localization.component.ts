import { Component, OnInit } from '@angular/core';
import { DownloadService } from '@core/download.service';
import { translations as i18nTranslations } from '@templates';
import { csvFormatRows } from 'd3';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TranslationService, Language, Key } from '../translation.service';


@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {

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

    public export(lang: Language): void {
        const header = `key,en-US,` + lang.code + '\n';

        const csv = header + csvFormatRows(
            this.defaultLang.keys.map(english => {
                const output = [];
                const translation = lang.keys.find(k => k.key === english.key);

                output.push(english.key);

                if (english.key === 'esName') {
                    output.push(lang.name);
                }
                else if (english.key === 'translationName') {
                    output.push(lang.i18nName);
                }
                else {
                    output.push(english.value);
                }

                if (translation) {
                    output.push(translation.value);
                }

                return output;
            })
        );

        this.downloadService.downloadCSV(csv, 'Translation_en-US_' + lang.code);
    }
}
