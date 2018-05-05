import { TokenService } from '@core/token.service';
import { Token } from '../token.model';
import { BehaviorSubject } from 'rxjs';

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
