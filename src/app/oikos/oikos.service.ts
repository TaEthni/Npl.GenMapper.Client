import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MigrateDto, Team, Workspace } from './oikos.interface';

@Injectable({
    providedIn: 'root',
})
export class OikosService {
    public url = environment.oikosApi;
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
}
