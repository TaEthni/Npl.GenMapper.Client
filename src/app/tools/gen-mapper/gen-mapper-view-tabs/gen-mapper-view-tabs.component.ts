import { Component, OnInit } from '@angular/core';

export enum GenMapperViews {
    GenMap = 'genMap',
    GoogleMap = 'googleMap'
}

export interface Tab {
    view: GenMapperViews;
}

@Component({
    selector: 'app-gen-mapper-view-tabs',
    templateUrl: './gen-mapper-view-tabs.component.html',
    styleUrls: ['./gen-mapper-view-tabs.component.scss']
})
export class GenMapperViewTabsComponent {
    public viewTypes = GenMapperViews;
    public tabs: Tab[] = [
        {
            view: GenMapperViews.GenMap
        }, {
            view: GenMapperViews.GoogleMap
        }
    ];

    public activeTab: Tab = this.tabs[0];

    public selectTab(view: GenMapperViews): void {
        this.activeTab = this.tabs.find(t => t.view === view);
    }
}
