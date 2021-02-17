export const AccountLinks = [
    {
        i18nKey: 'Account',
        icon: 'account_circle',
        routerLink: '/account/home',
        routerLinkActiveOptions: { exact: true },
    },
    {
        i18nKey: 'Security',
        i18nDescriptionKey: 'Security information for logging into the app',
        i18nButtonKey: 'Manage your security settings',
        icon: 'lock',
        routerLink: '/account/security',
        routerLinkActiveOptions: { exact: false },
        internalOnly: true
    },
    {
        i18nKey: 'Personal Info',
        i18nDescriptionKey: 'Personal Information',
        i18nButtonKey: 'Manage your personal info',
        icon: 'admin_panel_settings',
        routerLink: '/account/personal-info',
        routerLinkActiveOptions: { exact: false },
        internalOnly: true
    },
    {
        i18nKey: 'User Agreement',
        i18nDescriptionKey: 'User Agreement',
        i18nButtonKey: 'Read the user agreement',
        icon: 'admin_panel_settings',
        routerLink: '/account/user-agreement',
        routerLinkActiveOptions: { exact: false },
        internalOnly: true
    }
];

export const LandingLinks = AccountLinks.filter(l => !!l.i18nButtonKey);
export const ExternalLinks = AccountLinks.filter(l => !l.internalOnly);
export const ExternalLandingLinks = ExternalLinks.filter(l => !!l.i18nButtonKey);
