import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MapsService {

    public getLocation(): Observable<Position> {
        const subject = new Subject<Position>();

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    subject.next(position);
                },
                (error) => {
                    if (error.code === 1) {
                        alert('Location Services are disabled for this browser.');
                    }
                }
            );
        }

        return subject.asObservable();
    }
}
