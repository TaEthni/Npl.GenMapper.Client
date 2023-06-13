export interface Workspace {
    name: string;
    id: string;
}

export interface Team {
    name: string;
    id: string;
    templates: TeamTemplate[];
}

export interface TeamTemplate {
    name: string;
    templateId: string;
    tags: string[];
}
