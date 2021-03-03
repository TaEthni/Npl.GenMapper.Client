import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export type CoreRouteReducerState = RouterReducerState<RouterStateUrl>;

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams };
    }
}
