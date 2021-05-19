import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService, isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { API_BASE_URL, AppState, Invite, InviteAcceptDto } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-accept-invite',
    templateUrl: './accept-invite.component.html',
    styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent extends Unsubscribable implements OnInit {
    public readonly isAuthenticated$ = this.store.select(isAuthenticated);

    public isSaving: boolean;
    public isLoading: boolean = true;
    public invite: Invite;
    public showError: boolean;
    public isExistingMember: boolean;
    public isExpired: boolean;
    public isInvalid: boolean;
    private code: string;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private http: HttpClient,
        private snackBar: MatSnackBar,

        @Inject(API_BASE_URL) private baseUrl: string
    ) { super(); }

    public ngOnInit(): void {
        this.store.select(isAuthenticated).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            if (result) {
                this.load();
            }
        });
    }

    public login(): void {
        this.authService.setPostAuthorizeUrl(window.location.pathname);
        this.authService.login();
    }

    public register(): void {
        this.authService.setPostAuthorizeUrl(window.location.pathname);
        this.router.navigate(['/account/register']);
    }

    public load(): void {
        this.code = this.route.snapshot.params.code;
        this.http.get<Invite>(`${this.baseUrl}invites/${this.code}`).subscribe(
            invite => {
                this.isLoading = false;
                this.invite = invite;
            },
            error => {
                this.showError = true;
                this.isLoading = false;
                console.log(error);
                error = error || {};

                switch (error.error) {
                    case 'TeamMemberExists':
                        this.isExistingMember = true;
                        break;
                    case 'InviteExpired':
                        this.isExpired = true;
                        break;
                    default:
                        this.isInvalid = true;
                        break;
                }
            }
        );
    }

    public acceptInvite(): void {
        const dto: InviteAcceptDto = {
            code: this.code
        };

        this.isSaving = true;
        this.http.post<void>(`${this.baseUrl}invites/accept`, dto).subscribe(
            () => {
                this.isSaving = false;
                this.router.navigate(['/']);
            },
            error => {
                this.isSaving = false;
                this.snackBar.open('Error accepting the invite', 'OK');
            }
        );
    }
}
