import { Component, OnInit } from '@angular/core';
import { GMTemplate } from '@templates';
import { TemplateService } from '../../core/template.service';

interface ViewTemplate {
    name: string;
    icon: string;
}

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    public templatesWithIcons: GMTemplate[];
    public templateWithoutIcons: GMTemplate[];

    constructor(
        private templateService: TemplateService
    ) { }

    public ngOnInit(): void {
        const templates = this.templateService.getTemplates();
        this.templatesWithIcons = templates.filter(t => t.settings.iconUrl);
        this.templateWithoutIcons = templates.filter(t => !t.settings.iconUrl);
    }
}
