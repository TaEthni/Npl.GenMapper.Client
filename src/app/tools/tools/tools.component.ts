import { Component, OnInit } from '@angular/core';
import { GenMapperTemplates } from '@templates';

interface ViewTemplate {
    name: string;
    title: string;
    icon: string;
}

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    public templatesWithIcons: ViewTemplate[];
    public templateWithoutIcons: ViewTemplate[];

    public ngOnInit(): void {

        this.templatesWithIcons = GenMapperTemplates.filter(t => t.icon).map(t => ({ name: t.name, title: t.title, icon: t.icon }));
        this.templateWithoutIcons = GenMapperTemplates.filter(t => !t.icon).map(t => ({ name: t.name, title: t.title, icon: t.icon }));
    }
}
