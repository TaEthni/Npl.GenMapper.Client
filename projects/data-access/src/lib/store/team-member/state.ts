import { TeamMember } from '../../models/TeamMember';

export interface TeamMemberState {
    entities: TeamMember[];
    isLoading: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    error: string | null;
}

export const initialTeamMemberState: TeamMemberState = {
    entities: [],
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    error: null
};
