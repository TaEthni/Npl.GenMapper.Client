import { Injectable } from '@angular/core';
import { translations } from '@templates';
import * as i18next from 'i18next';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TranslationType {
    label: string;
    id: string;
}

@Injectable()
export class LocaleService {
    private _translations: BehaviorSubject<TranslationType[]> = new BehaviorSubject<TranslationType[]>(null);
    private _locale: BehaviorSubject<string> = new BehaviorSubject<string>('en');

    constructor() {
        i18next.on('languageChanged', (lang: string) => {
            this._locale.next(lang);
        });

        const _translations: TranslationType[] = [];
        Object.keys(translations).forEach(t => {
            const label = translations[t].translation.translationName;
            const id = t;
            _translations.push({ label, id });
        });

        this._translations.next(_translations);
    }

    public getTranslations(): Observable<TranslationType[]> {
        return this._translations.asObservable();
    }

    public get(): Observable<string> {
        return this._locale.asObservable();
    }

    public set(lang: string): void {
        i18next.changeLanguage(lang);
    }

    public t(key: string, props: any = {}): string {
        return i18next.t(key, props);
    }
}
