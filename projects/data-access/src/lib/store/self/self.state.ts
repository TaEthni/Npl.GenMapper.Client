import { Member } from '../../models';

export interface SelfState {
    self: Member;
    loaded: boolean;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
}

export const initialSelfState: SelfState = {
    self: null,
    loaded: false,
    isLoading: false,
    isUpdating: false,
    error: null,
};
