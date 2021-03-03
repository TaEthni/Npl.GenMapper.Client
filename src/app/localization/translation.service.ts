import { Injectable } from '@angular/core';
import { translations as i18nTranslations } from '@npl-template';

export interface Key {
    key: string;
    value: string;
}

export interface Language {
    name: string;
    i18nName: string;
    code: string;
    keys: Key[];
    completion?: number;
}


@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    public languages: Language[] = [];
    public defaultLang: Language;

    constructor() {
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

    public getLanguage(code: string): Language {
        return this.languages.find(lang => lang.code === code);
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
