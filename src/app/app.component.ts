import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { User } from './user.class';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnChanges{
	userID: number;

	constructor() {
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.userID = JSON.parse(localStorage.getItem('loggedIn')).id;
		console.log(this.userID);
	}
}
