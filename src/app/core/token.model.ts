export class Token {
    constructor(
        public authToken: string = '',
        public isAuthenticated: boolean = false,
        public expires: string = '',
        public refreshToken: string = '',
        // public role: Roles = null,
        public isRegistered: boolean = false,
        public isEmailVerified: boolean = false
    ) { }
}
