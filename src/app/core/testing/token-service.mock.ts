import { TokenService } from '@npl-core/token.service';
import { BehaviorSubject } from 'rxjs';

import { Token } from '../token.model';

export class TokenServiceMock {
    private subject = new BehaviorSubject<Token>(null);

    public static provide(): { provide: any, useClass: any } {
        return { provide: TokenService, useClass: TokenServiceMock };
    }

    public get(): BehaviorSubject<Token> {
        return this.subject;
    }

    public set(value: Token): void {
        this.subject.next(value);
    }

    public clear(): void {
        this.subject.next(null);
    }
}
