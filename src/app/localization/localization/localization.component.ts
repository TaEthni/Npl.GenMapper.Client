import { Component, OnInit } from '@angular/core';
import { DownloadService } from '@core/download.service';
import { translations as i18nTranslations } from '@templates';
import { csvFormatRows } from 'd3';

interface Key {
    key: string;
    value: string;
}

interface Language {
    name: string;
    i18nName: string;
    code: string;
    keys: Key[];
    completion?: number;
}

@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {

    public languages: Language[] = [];
    public defaultLang: Language;

    constructor(
        private downloadService: DownloadService
    ) { }

    public ngOnInit(): void {
        Object.keys(i18nTranslations).forEach(code => {
            const translation = i18nTranslations[code];
            const keys = [];
            const model = {
                name: translation.translation.esName,
                i18nName: translation.translation.translationName,
                code: code,
                keys: this.collectKeys(translation.translation, keys)
            };
            this.languages.push(model);
        });

        this.defaultLang = this.languages.find(t => t.code === 'en');
        const max = this.defaultLang.keys.length;
        this.defaultLang.completion = 100;

        this.languages.forEach(lang => {
            lang.completion = ((100 / max) * lang.keys.length);
        });
    }

    public export(lang: Language): void {
        const header = `key,en-US,` + lang.code + '\n';

        const csv = header + csvFormatRows(
            this.defaultLang.keys.map(english => {
                const output = [];
                const translation = lang.keys.find(k => k.key === english.key);

                output.push(english.key);
                output.push(english.value);

                if (translation) {
                    output.push(translation.value);
                }

                return output;
            })
        );

        this.downloadService.downloadCSV(csv, 'Translation_en-US_' + lang.code);
    }

    private collectKeys(languages: Language, keys: Key[], prefix: string = ''): any[] {
        Object.keys(languages).forEach(key => {
            const value = languages[key];

            key = prefix ? `${prefix}.${key}` : key;

            if (typeof value === 'string') {
                keys.push({ key, value });
            } else {
                keys = this.collectKeys(value, keys, key);
            }
        });

        return keys;
    }
}
