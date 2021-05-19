import { Team } from '../../models/Team';

export interface TeamState {
    selectedId: string;
    entities: Team[];
    isLoading: boolean;
    isUpdating: boolean;
    isCreating: boolean;
    isDeleting: boolean;
    error: string | null;
}

export const initialTeamState: TeamState = {
    selectedId: null,
    entities: [],
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    error: null
};
