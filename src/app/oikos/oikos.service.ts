import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MigrateDto, ProgressDto, Team, TeamQuery, TeamTemplate, Workspace } from './oikos.interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OikosService {
    public url = environment.apiBase + environment.oikosApi;
    public constructor(private http: HttpClient) {}

    public getSelf(): Observable<any> {
        return this.http.get(this.url + 'self');
    }

    public getWorkspaces(): Observable<Workspace[]> {
        return this.http.get<Workspace[]>(this.url + 'workspaces/gm-migration');
    }

    public getTeamsByWorkspaceId(workspaceId: string): Observable<Team[]> {
        return this.http.get<Team[]>(this.url + 'workspaces/' + workspaceId + '/teams/gm-migration');
    }

    public migrate(dto: MigrateDto): Observable<any> {
        return this.http.post(this.url + 'import', dto);
    }

    public getProgress(importId: string) {
        return this.http.get<ProgressDto>(this.url + 'import/progress/' + importId);
    }

    public queryTeams(params: TeamQuery): Observable<Team[]> {
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                if (key === 'search') params[key] = '';
                else delete params[key];
            }
        });
        return this.http
            .get<{ teams: Team[]; count: number }>(this.url + 'teams/query-simple', { params })
            .pipe(map((res) => res.teams));
    }

    public getTeamTemplates(teamId: string): Observable<TeamTemplate[]> {
        return this.http.get<TeamTemplate[]>(this.url + 'teamTemplates/' + teamId + '/simple', {
            params: { coreTask: 'ChurchFormation' },
        });
    }
}
