import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language, TranslationService } from '../translation.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

    private english: Language;
    private language: Language;

    private form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private translationService: TranslationService
    ) { }

    public ngOnInit(): void {
        const code = this.route.snapshot.params.code;
        this.language = this.translationService.getLanguage(code);
        this.english = this.english = this.translationService.getLanguage('en');

        this.form = new FormGroup({});

        this.english.keys.forEach(item => {
            const translation = this.language.keys.find(k => k.key === item.key);
            const value = translation ? translation.value : '';
            this.form.setControl(item.key, new FormControl(value));
        });

        console.log(this.language);
    }
}
