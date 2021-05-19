import { Invite } from '../models/Invite';

export interface InvitesCreateDto {
    teamId: string;
    emails: string[];
}

export interface InvitesCreateResponseDto {
    sentInvites: Invite[];
    unsentInvites: string[];
    unsentReason: string;
}

export interface InviteAcceptDto {
    code: string;
}

