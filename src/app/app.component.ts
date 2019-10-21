import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public thing: string = 'strng';

    constructor(private http: HttpClient) {

    }

    public ngOnInit(): void {
        this.http.get('http://localhost:8000/api/groups')
    }
}
