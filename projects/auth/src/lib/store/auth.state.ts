import { AuthUser } from '../auth.module';

export const authFeatureName = 'auth';

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
};
