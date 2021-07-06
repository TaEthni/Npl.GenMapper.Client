import { createAction, props } from '@ngrx/store';

import { TeamCreateDto, TeamUpdateDto } from '../../dtos';
import { Team } from '../../models';

export const TeamUiActions = {
    select: createAction(
        '[Team UI] Select Team',
        props<{ id: string }>()
    ),

    loadUserTeams: createAction(
        '[Teams UI] Load User Teams'
    ),

    lazyLoadUserTeams: createAction(
        '[Teams UI] Lazy Load User Teams'
    ),

    create: createAction(
        '[Team UI] Create Team',
        props<{ dto: TeamCreateDto, onComplete?: () => void }>()
    ),

    update: createAction(
        '[Team UI] Update Team',
        props<{ id: string, dto: TeamUpdateDto, onComplete?: () => void }>()
    ),
};

export const TeamApiActions = {
    loadUserTeamsSuccess: createAction(
        '[Team API] Load User Teams Success',
        props<{ entities: Team[] }>()
    ),
    lazyLoadUserTeamsSuccess: createAction(
        '[Team UI] Lazy Load User Teams Success',
    ),
    loadUserTeamsFailure: createAction(
        '[Team API] Load User Teams Failure',
        props<{ error: string }>()
    ),

    createSuccess: createAction(
        '[Team API] Create Team Success',
        props<{ entity: Team }>()
    ),
    createFailure: createAction(
        '[Team API] Create Team Failure',
        props<{ error: string }>()
    ),

    updateSuccess: createAction(
        '[Team API] Update Team Success',
        props<{ entity: Team }>()
    ),
    updateFailure: createAction(
        '[Team API] Update Team Failure',
        props<{ error: string }>()
    )
};
