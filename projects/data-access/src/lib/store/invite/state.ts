import { Invite } from '../../models/Invite';

export interface InviteState {
    entities: Invite[];
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;

    sentInvites: Invite[] | null;
    unsentInvites: string[] | null;
    error: string;
}

export const initialInviteState: InviteState = {
    entities: [],
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,

    sentInvites: null,
    unsentInvites: null,
    error: ''
};
