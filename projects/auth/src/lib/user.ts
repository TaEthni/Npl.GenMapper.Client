import { UserInfo } from 'angular-oauth2-oidc';

export interface AuthUser extends UserInfo {
    sub: string;
    email: string;
    name: string;
    role: string;
    is2FAEnabled: boolean;
    isExternal: boolean;
}
